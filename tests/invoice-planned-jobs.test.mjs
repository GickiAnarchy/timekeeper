import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Invoice } from '../scripts/invoice-model.mjs';
import {
  groupInvoiceItemsByType,
  plannedJobsForCompletedShift
} from '../scripts/domain.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readProjectFile = (...parts) => readFileSync(join(projectRoot, ...parts), 'utf8');

function job(id, customerId, date, description = id, isComplete = false) {
  return {
    id,
    customer: { id: customerId, name: `Customer ${customerId}` },
    scheduledDate: date,
    description,
    isComplete
  };
}

test('Invoice.addItem accepts (name, type, value), defaults to General, and nets positive Payment amounts out', () => {
  const invoice = new Invoice({ id: 'customer-1' }, [], 'invoice-1');
  invoice.addItem('Service', 'general', 100);
  invoice.addItem('Materials', 'material', 20.5);
  invoice.addItem('Legacy two-argument item', 3.5);
  invoice.addItem('Legacy string amount', '4.5');
  invoice.addItem('Deposit received', 'payment', 25);

  assert.deepEqual(invoice.items.map(({ name, type, value }) => ({ name, type, value })), [
    { name: 'Service', type: 'general', value: 100 },
    { name: 'Materials', type: 'material', value: 20.5 },
    { name: 'Legacy two-argument item', type: 'general', value: 3.5 },
    { name: 'Legacy string amount', type: 'general', value: 4.5 },
    { name: 'Deposit received', type: 'payment', value: 25 }
  ]);
  assert.equal(invoice.totalBill(), 103.5);
  assert.throws(() => invoice.addItem('Invalid credit', 'payment', -5), /greater than zero/);
  assert.throws(() => invoice.addItem('Invalid amount', 'general', Number.NaN), /valid invoice item amount/);
});

test('invoice type groups retain original item indices and employee-grouped expandable labor data', () => {
  const items = [
    { name: 'General line', value: 10 },
    { name: 'Deposit', type: 'payment', value: 4 },
    { name: 'Shift A', shiftId: 's1', value: 50, billedHours: 1.25, shiftSnapshot: { employeeId: 'e1' } },
    { name: 'Shift B', shiftId: 's2', value: 30, billedHours: 0.75, shiftSnapshot: { employeeId: 'e2' } },
    { name: 'Shift C', shiftId: 's3', value: 25, billedHours: 0.5, shiftSnapshot: { employeeId: 'e1' } }
  ];
  const groups = groupInvoiceItemsByType(items, [], new Map([
    ['e1', { id: 'e1', name: 'Alice' }],
    ['e2', { id: 'e2', name: 'Ben' }]
  ]));

  assert.deepEqual(groups.map(group => group.type), ['general', 'labor', 'payment']);
  assert.equal(groups[0].label, 'General');
  assert.equal(groups[0].rows[0].indices[0], 0);
  assert.equal(groups[1].value, 105);
  assert.deepEqual(groups[1].rows.map(row => row.employeeName), ['Alice', 'Ben']);
  assert.deepEqual(groups[1].rows[0].indices, [2, 4]);
  assert.deepEqual(groups[1].rows[0].items.map(detail => detail.index), [2, 4]);
  assert.equal(groups[1].rows[0].items.length, 2);
  assert.equal(groups[2].value, -4);
  assert.equal(groups[2].rows[0].indices[0], 1);
});

test('invoice UI removes Add Payment, offers a Payment line type, and renders collapsible type sections', () => {
  const markup = readProjectFile('html', 'invoice.html');
  const script = readProjectFile('scripts', 'invoice.js');
  const styles = readProjectFile('styles', 'invoices.css');

  assert.doesNotMatch(markup, /payment-item-btn|Add Payment/);
  assert.match(markup, /<option value="general" selected>General<\/option>/);
  assert.match(markup, /<option value="payment">Payment<\/option>/);
  assert.match(script, /groupInvoiceItemsByType\(invoice\.items, store\.shifts, store\.employees\)/);
  assert.match(script, /className = 'invoice-type-details'/);
  assert.match(script, /invoiceItemSignedValue\(entry\.item\)/);
  assert.match(styles, /\.invoice-type-details\s*>\s*summary[^}]*cursor:\s*pointer/);
  assert.match(script, /className = 'invoice-shift-details'/);
});

test('planned-job candidates match the shift customer and include due dates on the same day or later', () => {
  const shiftDate = new Date(2026, 9, 24, 17, 30);
  const shift = {
    id: 'shift-1',
    isComplete: true,
    customer: { id: 'customer-1' },
    clockInTime: shiftDate,
    plannedJobsPrompted: false
  };
  const candidates = [
    job('due-same-day', 'customer-1', new Date(2026, 9, 24, 9), 'Same-day job'),
    job('due-later', 'customer-1', new Date(2026, 9, 28, 12), 'Later job'),
    job('due-earlier', 'customer-1', new Date(2026, 9, 23, 12)),
    job('other-customer', 'customer-2', new Date(2026, 9, 25, 12)),
    job('already-complete', 'customer-1', new Date(2026, 9, 25, 12), 'Done', true),
    job('date-tbd', 'customer-1', null)
  ];

  assert.deepEqual(plannedJobsForCompletedShift(shift, candidates).map(candidate => candidate.id), [
    'due-same-day', 'due-later'
  ]);
  assert.deepEqual(plannedJobsForCompletedShift({ ...shift, plannedJobsPrompted: true }, candidates), []);
  assert.deepEqual(plannedJobsForCompletedShift({ ...shift, isComplete: false }, candidates), []);
});

test('shift completion prompts are explicit, deduplicated, and persist across normal saves and backups', () => {
  const shifts = readProjectFile('scripts', 'shifts.js');
  const clock = readProjectFile('scripts', 'clock.js');
  const prompts = readProjectFile('scripts', 'planned-job-confirmation.mjs');
  const models = readProjectFile('scripts', 'models.js');
  const invoiceModel = readProjectFile('scripts', 'invoice-model.mjs');

  assert.match(shifts, /completedNow = !wasComplete && activeShift\.isComplete/);
  assert.match(shifts, /promptForCompletedPlannedJobs\(savedShift, store, window\)/);
  assert.match(clock, /promptForCompletedPlannedJobs\(shiftToStop, store, window\)/);
  assert.match(prompts, /ui\.confirm\(prompt\)/);
  assert.match(prompts, /markShiftPlannedJobsPrompted\(shift\.id\)/);
  assert.match(models, /shift\.plannedJobsPrompted = data\.plannedJobsPrompted === true/);
  assert.match(models, /plannedJobsPrompted: Boolean\(shift\.plannedJobsPrompted\)/);
  assert.match(models, /plannedJobsPrompted: Boolean\(shiftData\.plannedJobsPrompted\)/);
  assert.match(models, /async markShiftPlannedJobsPrompted\(shiftId\)/);
  assert.match(invoiceModel, /addItem\(name, type = 'general', value = undefined\)/);
  assert.match(models, /import \{ Invoice \} from '\.\/invoice-model\.mjs'/);
  assert.match(models, /export \{ Invoice \}/);
  execFileSync(process.execPath, ['--check', join(projectRoot, 'scripts', 'models.js')]);
  execFileSync(process.execPath, ['--check', join(projectRoot, 'scripts', 'invoice-model.mjs')]);
  execFileSync(process.execPath, ['--check', join(projectRoot, 'scripts', 'invoice.js')]);
  execFileSync(process.execPath, ['--check', join(projectRoot, 'scripts', 'shifts.js')]);
  execFileSync(process.execPath, ['--check', join(projectRoot, 'scripts', 'clock.js')]);
  execFileSync(process.execPath, ['--check', join(projectRoot, 'scripts', 'planned-job-confirmation.mjs')]);
});

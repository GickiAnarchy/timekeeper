import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { actualShiftHours } from '../scripts/domain.mjs';

const modelsSource = readFileSync(new URL('../scripts/models.js', import.meta.url), 'utf8');
const formatTime24 = date => {
  if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) return '';
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

function extractClass(source, className) {
  const start = source.indexOf(`export class ${className} {`);
  assert.notEqual(start, -1, `could not find ${className} in models.js`);
  const bodyStart = source.indexOf('{', start);
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = bodyStart; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'" || character === '`') {
      quote = character;
      continue;
    }
    if (character === '{') depth += 1;
    if (character === '}' && --depth === 0) return source.slice(start + 'export '.length, index + 1);
  }
  throw new Error(`could not parse ${className} from models.js`);
}

let uuid = 0;
const WorkShift = vm.runInNewContext(
  `${extractClass(modelsSource, 'WorkShift')}\nWorkShift`,
  {
    Date,
    actualShiftHours,
    crypto: { randomUUID: () => `generated-shift-${++uuid}` },
    formatTime24
  }
);

const employee = (id, wage) => ({
  id,
  wage,
  getPay(hours) {
    return Number((this.wage * hours).toFixed(2));
  }
});
const customer = { id: 'customer-1', name: 'Oak Street' };
const date = value => new Date(value);

function completedShift(paidHours = null) {
  const shift = new WorkShift(employee('source-employee', 20), customer, 'source-shift', 'Front lawn', true, [
    { start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }
  ], paidHours);
  shift.clockInTime = date('2026-10-08T22:00:00Z');
  shift.clockOutTime = date('2026-10-09T06:00:00Z');
  shift.ledgerEntryId = 'ledger-source';
  shift.invoiceId = 'invoice-source';
  return shift;
}

test('duplicateFor rejects missing, same, incomplete, and invalid source employees or times', () => {
  const source = completedShift();
  assert.throws(() => source.duplicateFor(), /different employee/);
  assert.throws(() => source.duplicateFor(null), /different employee/);
  assert.throws(() => source.duplicateFor(source.employee), /different employee/);
  assert.throws(() => source.duplicateFor(employee('source-employee', 30)), /different employee/);

  for (const configure of [
    shift => { shift.clockOutTime = null; },
    shift => { shift.clockInTime = date('invalid'); },
    shift => { shift.clockOutTime = date('2026-10-08T21:00:00Z'); },
    shift => { shift.clockInTime = '2026-10-08T22:00:00Z'; }
  ]) {
    const invalid = completedShift();
    configure(invalid);
    assert.throws(() => invalid.duplicateFor(employee('target-employee', 30)), /completed shift with valid start and end/);
  }
});

test('duplicateFor creates an independent completed shift for the target employee', () => {
  const source = completedShift();
  const target = employee('target-employee', 30);
  const duplicate = source.duplicateFor(target);

  assert.ok(duplicate instanceof WorkShift);
  assert.notStrictEqual(duplicate, source);
  assert.equal(duplicate.id, 'generated-shift-1');
  assert.notEqual(duplicate.id, source.id);
  assert.strictEqual(duplicate.employee, target);
  assert.strictEqual(duplicate.customer, source.customer);
  assert.equal(duplicate.note, source.note);
  assert.equal(duplicate.isPaid, false);
  assert.equal(duplicate.ledgerEntryId, undefined);
  assert.equal(duplicate.invoiceId, undefined);
  assert.notStrictEqual(duplicate.clockInTime, source.clockInTime);
  assert.notStrictEqual(duplicate.clockOutTime, source.clockOutTime);
  assert.equal(duplicate.clockInTime.toISOString(), source.clockInTime.toISOString());
  assert.equal(duplicate.clockOutTime.toISOString(), source.clockOutTime.toISOString());
  assert.notStrictEqual(duplicate.breaks, source.breaks);
  assert.notStrictEqual(duplicate.breaks[0], source.breaks[0]);
  assert.notStrictEqual(duplicate.breaks[0].start, source.breaks[0].start);
  assert.notStrictEqual(duplicate.breaks[0].end, source.breaks[0].end);

  duplicate.clockInTime.setUTCFullYear(2030);
  duplicate.clockOutTime.setUTCHours(7);
  duplicate.breaks[0].start.setUTCMinutes(45);
  duplicate.breaks.push({ start: date('2026-10-09T03:00:00Z'), end: date('2026-10-09T03:15:00Z') });
  assert.equal(source.clockInTime.toISOString(), '2026-10-08T22:00:00.000Z');
  assert.equal(source.clockOutTime.toISOString(), '2026-10-09T06:00:00.000Z');
  assert.equal(source.breaks.length, 1);
  assert.equal(source.breaks[0].start.toISOString(), '2026-10-09T01:00:00.000Z');
});

test('duplicateFor preserves null and zero paidHours while using the target wage and actual hours', () => {
  for (const paidHours of [null, 0]) {
    const source = completedShift(paidHours);
    const target = employee(`target-${paidHours ?? 'null'}`, 30);
    const duplicate = source.duplicateFor(target);

    assert.equal(duplicate.paidHours, paidHours);
    assert.equal(duplicate.getHoursWorked(), actualShiftHours(
      date('2026-10-08T22:00:00Z'),
      date('2026-10-09T06:00:00Z'),
      [{ start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }]
    ));
    assert.equal(duplicate.getHoursWorked(), 7.5);
    assert.equal(duplicate.getShiftPay(), paidHours === null ? 225 : 0);
    assert.equal(source.getShiftPay(), source.isPaid ? 0 : 0);
  }
});

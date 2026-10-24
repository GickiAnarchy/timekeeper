import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPayPeriodReview, currentWeekRange } from '../scripts/pay-period-review.mjs';

const base = {
  startDate: '2026-10-12', endDate: '2026-10-18',
  employees: [{ id: 'e1', name: 'Ada' }, { id: 'e2', name: 'No shifts' }]
};

test('currentWeekRange returns local Monday through Sunday', () => {
  assert.deepEqual(currentWeekRange(new Date(2026, 9, 18, 12)), { startDate: '2026-10-12', endDate: '2026-10-18' });
  assert.deepEqual(currentWeekRange(new Date(2026, 9, 12, 12)), { startDate: '2026-10-12', endDate: '2026-10-18' });
});

test('review classifies boundaries, overnight shifts, active and malformed shifts without mutation', () => {
  const shifts = [
    { id: 'first', employee: { id: 'e1', name: 'Ada' }, clockInTime: '2026-10-12T23:00:00', clockOutTime: '2026-10-13T01:00:00', breaks: [{ start: '2026-10-13T00:00:00', end: '2026-10-13T00:30:00' }] },
    { id: 'last', employee: { id: 'e1' }, clockInTime: '2026-10-18T23:00:00', clockOutTime: '2026-10-19T01:00:00' },
    { id: 'active', employee: { id: 'e1' }, clockInTime: '2026-10-15T09:00:00' },
    { id: 'bad', employee: { id: 'e1' }, clockInTime: '2026-10-16T09:00:00', clockOutTime: '2026-10-16T08:00:00' }
  ];
  const before = structuredClone(shifts);
  const result = buildPayPeriodReview({ ...base, shifts });
  assert.deepEqual(shifts, before);
  assert.deepEqual(result.shifts.map(row => row.id), ['last', 'first']);
  assert.equal(result.shifts.find(row => row.id === 'first').actualHours, 1.5);
  assert.equal(result.activeShiftCount, 1);
  assert.equal(result.invalidShiftCount, 1);
});

test('paid flag is independent from paid hours, and invoices support old/new links and zero rate', () => {
  const shifts = [
    { id: 'ready', employeeId: 'e1', customer: { id: 'c', name: 'Client', billingRate: 0 }, clockInTime: '2026-10-12T09:00:00', clockOutTime: '2026-10-12T10:00:00', isPaid: false, paidHours: 0 },
    { id: 'linked', employeeId: 'e1', clockInTime: '2026-10-13T09:00:00', clockOutTime: '2026-10-13T10:00:00', isPaid: true, paidHours: 2 },
    { id: 'missing', employeeId: 'e1', customer: { id: 'c2' }, clockInTime: '2026-10-14T09:00:00', clockOutTime: '2026-10-14T10:00:00' }
  ];
  const result = buildPayPeriodReview({ ...base, shifts, invoices: [{ id: 'paid', items: [{ shiftId: 'linked', value: 10 }] }] });
  assert.deepEqual(result.shifts.map(row => row.invoiceStatus), ['Missing billing rate', 'Linked', 'Ready']);
  assert.equal(result.shifts.find(row => row.id === 'ready').invoiceCents, 0);
  assert.equal(result.shifts.find(row => row.id === 'linked').invoiceCents, 1000);
  assert.equal(result.totals.paidShiftCount, 1);
  assert.equal(result.totals.unpaidHours, 1);
});

test('summaries retain all employees, missing references, and all-date ledger balances; filter narrows them', () => {
  const result = buildPayPeriodReview({ ...base,
    shifts: [{ id: 's', employeeId: 'missing', clockInTime: '2026-10-12T09:00:00', clockOutTime: '2026-10-12T10:00:00' }],
    ledgerEntries: [{ employeeId: 'missing', amount: 12 }, { employeeId: 'e1', amount: 4, date: '1900-01-01' }]
  });
  assert.deepEqual(result.employees.map(employee => employee.id), ['e1', 'e2', 'missing']);
  assert.equal(result.employees.find(employee => employee.id === 'e1').balanceCents, 400);
  assert.equal(result.employees.find(employee => employee.id === 'missing').shiftCount, 1);
  const filtered = buildPayPeriodReview({ ...base, employeeId: 'e1', ledgerEntries: [{ employeeId: 'e1', amount: 4 }], shifts: result.shifts });
  assert.equal(filtered.employees.length, 1);
  assert.equal(filtered.shifts.length, 0);
});

test('invalid and empty ranges are rejected strictly', () => {
  assert.throws(() => buildPayPeriodReview({ startDate: '2026-02-30', endDate: '2026-03-01' }), /YYYY-MM-DD/);
  assert.throws(() => buildPayPeriodReview({ startDate: '2026-10-19', endDate: '2026-10-18' }), /on or after/);
});

test('null, empty, and undefined rates are missing rather than free billing; zero remains valid', () => {
  const shifts = [null, '', undefined, 0].map((billingRate, index) => ({
    id: String(index), employeeId: 'e1', customer: { id: 'c', billingRate },
    clockInTime: '2026-10-12T09:00:00', clockOutTime: '2026-10-12T10:00:00'
  }));
  const review = buildPayPeriodReview({ ...base, shifts });
  assert.deepEqual(review.shifts.map(row => row.invoiceStatus), ['Missing billing rate', 'Missing billing rate', 'Missing billing rate', 'Ready']);
  assert.equal(review.totals.invoiceReadyCount, 1);
});

test('archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', () => {
  const shifts = ['archived', 'active', 'invoice-id', 'invoice-item'].map(id => ({
    id, employeeId: 'e1', customer: { id: 'c', billingRate: 30 },
    clockInTime: '2026-10-12T09:00:00', clockOutTime: '2026-10-12T10:00:00'
  }));
  const input = { ...base, shifts,
    ledgerArchiveRows: [{ sourceShiftId: 'archived', employeeId: 'e1', amount: 50 }, { sourceShiftId: 'active', employeeId: 'e1', amount: 50 }],
    ledgerEntries: [{ sourceShiftId: 'active', employeeId: 'e1', amount: 20 }, { employeeId: null, amount: 10 }],
    invoices: [{ isPaid: true, shiftIds: ['invoice-id'] }, { items: [{ shiftId: 'invoice-item', value: 30 }] }]
  };
  const before = structuredClone(input);
  const review = buildPayPeriodReview(input);
  assert.equal(review.shifts.find(row => row.id === 'archived').ledgerStatus, 'Archived ledger');
  assert.equal(review.shifts.find(row => row.id === 'active').ledgerStatus, 'Active ledger');
  assert.equal(review.totals.invoiceReadyCount, 2);
  assert.equal(review.employees.find(row => row.id === 'e1').balanceCents, 2000);
  assert.equal(review.employees.find(row => row.id === '').balanceCents, 1000);
  assert.deepEqual(input, before);
});

test('historical orphan employee IDs remain available even outside the current period', () => {
  const review = buildPayPeriodReview({ ...base, shifts: [{ employeeId: 'historical', clockInTime: '2020-01-01T08:00:00', clockOutTime: '2020-01-01T09:00:00' }] });
  assert.ok(review.employees.some(person => person.id === 'historical'));
  assert.equal(review.totals.shiftCount, 0);
});

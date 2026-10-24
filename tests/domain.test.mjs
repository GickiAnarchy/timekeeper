import test from 'node:test';
import assert from 'node:assert/strict';
import {
  actualShiftHours,
  ledgerBalanceCents,
  makeShiftLedgerEntryData,
  makeShiftInvoiceLine,
  plannedDateStatus,
  roundDown15Minutes,
  roundTo15Minutes,
  roundUp15Minutes,
  sortLedgerEntriesByDate,
  sortTableRows,
  sumLedgerHours,
  shiftInvoiceLineStatus,
  shiftIsAttachedElsewhere,
  repriceInvoiceShiftItems,
  groupInvoiceItemsByEmployee
} from '../scripts/domain.mjs';

const date = value => new Date(value);

test('ledger entries sort newest first, then by entry index, without mutating the source', () => {
  const entries = [
    { id: 'older', date: '2026-10-08', index: 4 },
    { id: 'newer-first', date: '2026-10-09', index: 2 },
    { id: 'newer-last', date: '2026-10-09', index: 5 },
    { id: 'invalid-date', date: 'not-a-date', index: 99 }
  ];

  assert.deepEqual(sortLedgerEntriesByDate(entries).map(entry => entry.id), [
    'newer-last', 'newer-first', 'older', 'invalid-date'
  ]);
  assert.equal(entries[0].id, 'older');
});

test('table sorting handles text, numeric, and date values without mutating rows or moving blanks first', () => {
  const rows = [
    { name: 'Item 12', amount: 12, date: '2026-10-09' },
    { name: 'item 2', amount: 2, date: '2026-01-12' },
    { name: 'Alpha', amount: null, date: '' }
  ];

  assert.deepEqual(sortTableRows(rows, { key: 'name', type: 'text' }).map(row => row.name), [
    'Alpha', 'item 2', 'Item 12'
  ]);
  assert.deepEqual(sortTableRows(rows, { key: 'amount', type: 'number' }).map(row => row.name), [
    'item 2', 'Item 12', 'Alpha'
  ]);
  assert.deepEqual(sortTableRows(rows, { key: 'date', type: 'date', direction: 'descending' }).map(row => row.name), [
    'Item 12', 'item 2', 'Alpha'
  ]);
  assert.deepEqual(rows.map(row => row.name), ['Item 12', 'item 2', 'Alpha']);
});

test('ledger hour totals exclude advances and ignore invalid hour values', () => {
  assert.equal(sumLedgerHours([
    { type: 'normal', hours: 3.5 },
    { type: 'advance', hours: 20 },
    { type: 'general', hours: 2 },
    { type: 'normal', hours: 'not a number' }
  ]), 5.5);
});

test('ledger balances are calculated in integer cents using existing credit and advance signs', () => {
  assert.equal(ledgerBalanceCents([
    { type: 'normal', amount: 10.10 },
    { type: 'general', amount: 2.25 },
    { type: 'advance', amount: 12.35 }
  ]), 0);
  assert.equal(ledgerBalanceCents([
    { type: 'normal', amount: 0.1 },
    { type: 'advance', amount: 0.09 }
  ]), 1);
});

test('completed shifts can be converted to payroll ledger entries without changing the source shift', () => {
  const start = new Date(2026, 9, 9, 9, 0);
  const end = new Date(2026, 9, 9, 12, 0);
  const shift = {
    id: 'shift-payroll-1',
    employee: { id: 'employee-1', wage: 23.5 },
    customer: { name: 'Oak Street' },
    clockInTime: start,
    clockOutTime: end,
    paidHours: 2.5,
    breaks: [],
    note: 'Front lawn'
  };

  assert.deepEqual(makeShiftLedgerEntryData(shift), {
    employeeId: 'employee-1',
    date: `${start.getFullYear()}-10-09`,
    type: 'normal',
    hours: 2.5,
    amount: 58.75,
    notes: 'Shift · Oak Street — Front lawn',
    sourceShiftId: 'shift-payroll-1'
  });
  assert.equal(shift.isPaid, undefined);
});

test('an incomplete or invalid shift cannot be converted to a ledger entry', () => {
  assert.throws(() => makeShiftLedgerEntryData({
    id: 'open-shift',
    employee: { id: 'employee-1', wage: 20 },
    clockInTime: new Date(2026, 9, 9, 9, 0),
    clockOutTime: null
  }), /completed shift with an employee/);
});

test('quarter-hour rounding preserves the nearest/down/up behavior at boundaries', () => {
  assert.equal(roundTo15Minutes(date('2026-10-09T09:07:00Z')).toISOString(), '2026-10-09T09:00:00.000Z');
  assert.equal(roundTo15Minutes(date('2026-10-09T09:08:00Z')).toISOString(), '2026-10-09T09:15:00.000Z');
  assert.equal(roundDown15Minutes(date('2026-10-09T09:14:59Z')).toISOString(), '2026-10-09T09:00:00.000Z');
  assert.equal(roundUp15Minutes(date('2026-10-09T09:00:01Z')).toISOString(), '2026-10-09T09:15:00.000Z');
});

test('actual shift hours support overnight shifts and subtract breaks across midnight', () => {
  const hours = actualShiftHours(
    '2026-10-08T22:00:00Z',
    '2026-10-09T06:00:00Z',
    [{ start: '2026-10-09T01:00:00Z', end: '2026-10-09T01:30:00Z' }]
  );
  assert.equal(hours, 7.5);
});

test('breaks are clipped to the shift and overlapping break records are not double-subtracted', () => {
  const hours = actualShiftHours(
    '2026-10-09T09:00:00Z',
    '2026-10-09T11:00:00Z',
    [
      { start: '2026-10-09T08:30:00Z', end: '2026-10-09T09:45:00Z' },
      { start: '2026-10-09T09:30:00Z', end: '2026-10-09T10:00:00Z' }
    ]
  );
  assert.equal(hours, 1);
});

test('a TBD date has no due or overdue state, including when the value is null', () => {
  const today = date('2026-10-09T12:00:00');
  assert.equal(plannedDateStatus(null, today), 'tbd');
  assert.equal(plannedDateStatus('', today), 'tbd');
  assert.equal(plannedDateStatus('2026-10-09T12:00:00', today), 'due-today');
  assert.equal(plannedDateStatus('2026-10-08T12:00:00', today), 'overdue');
});

test('a shift cannot be attached to two invoices and linked lines preserve audit snapshots', () => {
  const shift = {
    id: 'shift-1',
    employee: { id: 'employee-1' },
    customer: { id: 'customer-1' },
    clockInTime: date('2026-10-09T09:00:00Z'),
    clockOutTime: date('2026-10-09T12:00:00Z'),
    breaks: [{ start: date('2026-10-09T10:00:00Z'), end: date('2026-10-09T10:15:00Z') }]
  };
  const line = makeShiftInvoiceLine(shift, 60);
  line.name = 'Labor';
  const invoices = [{ id: 'invoice-1', items: [line] }];
  assert.equal(line.shiftId, 'shift-1');
  assert.equal(line.billedHours, 2.75);
  assert.equal(line.billingRate, 60);
  assert.equal(line.value, 165);
  assert.equal(shiftIsAttachedElsewhere(invoices, 'shift-1', 'invoice-2'), true);
  assert.equal(shiftIsAttachedElsewhere(invoices, 'shift-1', 'invoice-1'), false);
  assert.equal(shiftInvoiceLineStatus(line, shift), 'current');
  const editedShift = { ...shift, clockOutTime: date('2026-10-09T12:15:00Z') };
  assert.equal(shiftInvoiceLineStatus(line, editedShift), 'changed');
});

test('invoice display groups linked labor by employee while retaining each shift and exact totals', () => {
  const items = [
    { name: 'Labor · Oct 9 · Alice (1.25 h × $40.00/h)', value: 50, shiftId: 's1', billedHours: 1.25, shiftSnapshot: { employeeId: 'e1' } },
    { name: 'Travel', value: 12.5 },
    { name: 'Labor · Oct 10 · Alice (2.00 h × $40.00/h)', value: 80, shiftId: 's2', billedHours: 2, shiftSnapshot: { employeeId: 'e1' } },
    { name: 'Labor · Oct 10 · Ben (0.50 h × $45.00/h)', value: 22.5, shiftId: 's3', billedHours: 0.5, shiftSnapshot: { employeeId: 'e2' } }
  ];
  const rows = groupInvoiceItemsByEmployee(items, [{ id: 's1', employee: { id: 'e9', name: 'Reassigned' } }], new Map([
    ['e1', { id: 'e1', name: 'Alice' }], ['e2', { id: 'e2', name: 'Ben' }], ['e9', { id: 'e9', name: 'Reassigned' }]
  ]));

  assert.deepEqual(rows.map(row => row.kind), ['labor', 'item', 'labor']);
  assert.equal(rows[0].employeeName, 'Alice');
  assert.equal(rows[0].items.length, 2);
  assert.equal(rows[0].totalHours, 3.25);
  assert.equal(rows[0].value, 130);
  assert.equal(rows[0].items[1].item.shiftId, 's2');
  assert.equal(rows[1].item.name, 'Travel');
  assert.equal(rows[2].employeeName, 'Ben');
  assert.equal(rows[2].value, 22.5);
});

test('customer rate changes reprice linked shift items on paid invoices without changing saved hours or timestamps', () => {
  const line = makeShiftInvoiceLine({
    id: 'shift-rate-1',
    employee: { id: 'employee-1' },
    customer: { id: 'customer-1' },
    clockInTime: date('2026-10-09T09:00:00Z'),
    clockOutTime: date('2026-10-09T12:00:00Z'),
    breaks: [{ start: date('2026-10-09T10:00:00Z'), end: date('2026-10-09T10:15:00Z') }]
  }, 60);
  line.name = 'Labor · Oct 9 · Alice (2.75 h × $60.00/h)';
  const manual = { name: 'Materials', value: 15 };
  const invoice = { isPaid: true, items: [line, manual] };
  const originalSnapshot = structuredClone(line.shiftSnapshot);

  const repriced = repriceInvoiceShiftItems(invoice, 80);

  assert.equal(repriced[0].value, 220);
  assert.equal(repriced[0].billingRate, 80);
  assert.match(repriced[0].name, /2\.75 h × \$80\.00\/h/);
  assert.equal(repriced[0].billedHours, 2.75);
  assert.deepEqual(repriced[0].shiftSnapshot, originalSnapshot);
  assert.equal(repriced[1], manual);
  assert.equal(invoice.items[0].value, 165);
  assert.equal(invoice.isPaid, true);
});

test('legacy linked labor without saved hours can use its source shift to get repriced', () => {
  const shift = {
    id: 'legacy-shift',
    employee: { id: 'employee-1' },
    customer: { id: 'customer-1' },
    clockInTime: date('2026-10-09T09:00:00Z'),
    clockOutTime: date('2026-10-09T12:00:00Z'),
    breaks: [{ start: date('2026-10-09T10:00:00Z'), end: date('2026-10-09T10:15:00Z') }]
  };
  const [repriced] = repriceInvoiceShiftItems({ items: [{ name: 'Labor · Alice', shiftId: 'legacy-shift', value: 165 }] }, 80, [shift]);

  assert.equal(repriced.value, 220);
  assert.equal(repriced.billedHours, 2.75);
  assert.equal(repriced.billingRate, 80);
  assert.equal(repriced.shiftSnapshot.employeeId, 'employee-1');
});

test('repricing refuses to commit an unverifiable legacy shift with no saved or source hours', () => {
  assert.throws(
    () => repriceInvoiceShiftItems({ items: [{ shiftId: 'deleted-shift', value: 165 }] }, 80),
    /Cannot reprice linked shift deleted-shift/
  );
});

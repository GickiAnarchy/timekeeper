import test from 'node:test';
import assert from 'node:assert/strict';
import {
  actualShiftHours,
  makeShiftInvoiceLine,
  plannedDateStatus,
  roundDown15Minutes,
  roundTo15Minutes,
  roundUp15Minutes,
  sortLedgerEntriesByDate,
  shiftInvoiceLineStatus,
  shiftIsAttachedElsewhere
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

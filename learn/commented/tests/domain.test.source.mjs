// Original L1: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import test from 'node:test';
// Original L2: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import assert from 'node:assert/strict';
// Original L3: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import {
// Original L4: Imports actualShiftHours from the shared module; actualShiftHours is the name used in this file.
  actualShiftHours,
// Original L5: Imports ledgerBalanceCents from the shared module; ledgerBalanceCents is the name used in this file.
  ledgerBalanceCents,
// Original L6: Imports makeShiftLedgerEntryData from the shared module; makeShiftLedgerEntryData is the name used in this file.
  makeShiftLedgerEntryData,
// Original L7: Imports makeShiftInvoiceLine from the shared module; makeShiftInvoiceLine is the name used in this file.
  makeShiftInvoiceLine,
// Original L8: Imports plannedDateStatus from the shared module; plannedDateStatus is the name used in this file.
  plannedDateStatus,
// Original L9: Imports roundDown15Minutes from the shared module; roundDown15Minutes is the name used in this file.
  roundDown15Minutes,
// Original L10: Imports roundTo15Minutes from the shared module; roundTo15Minutes is the name used in this file.
  roundTo15Minutes,
// Original L11: Imports roundUp15Minutes from the shared module; roundUp15Minutes is the name used in this file.
  roundUp15Minutes,
// Original L12: Imports sortLedgerEntriesByDate from the shared module; sortLedgerEntriesByDate is the name used in this file.
  sortLedgerEntriesByDate,
// Original L13: Imports sortTableRows from the shared module; sortTableRows is the name used in this file.
  sortTableRows,
// Original L14: Imports sumLedgerHours from the shared module; sumLedgerHours is the name used in this file.
  sumLedgerHours,
// Original L15: Imports shiftInvoiceLineStatus from the shared module; shiftInvoiceLineStatus is the name used in this file.
  shiftInvoiceLineStatus,
// Original L16: Imports shiftIsAttachedElsewhere from the shared module; shiftIsAttachedElsewhere is the name used in this file.
  shiftIsAttachedElsewhere
// Original L17: Completes the named import list and tells the browser to resolve these shared helpers from ../scripts/domain.mjs. Imported bindings refer to exports of that module.
} from '../scripts/domain.mjs';
// Original L18: Blank line separates related setup or assertions for readability.

// Original L19: Defines the test fixture/helper date; its returned mock data represents the application state needed to exercise 'test setup'.
const date = value => new Date(value);
// Original L20: Blank line separates related setup or assertions for readability.

// Original L21: Starts an isolated test case whose title states the behavior being specified: ledger entries sort newest first, then by entry index, without mutating the source.
test('ledger entries sort newest first, then by entry index, without mutating the source', () => {
// Original L22: Builds entries, the concrete fixture collection/object used as input for 'ledger entries sort newest first, then by entry index, without mutating the source'; its fields model the relevant domain records or DOM state.
  const entries = [
// Original L23: Sets the object field index using 4. This field is read later through its property name.
    { id: 'older', date: '2026-10-08', index: 4 },
// Original L24: Sets the object field index using 2. This field is read later through its property name.
    { id: 'newer-first', date: '2026-10-09', index: 2 },
// Original L25: Sets the object field index using 5. This field is read later through its property name.
    { id: 'newer-last', date: '2026-10-09', index: 5 },
// Original L26: Sets the object field index using 99. This field is read later through its property name.
    { id: 'invalid-date', date: 'not-a-date', index: 99 }
// Original L27: Closes the fixture, callback, loop, or test block for 'ledger entries sort newest first, then by entry index, without mutating the source'.
  ];
// Original L28: Blank line separates related setup or assertions for readability.

// Original L29: Calls `assert.deepEqual` with transforms each item of calls `sortLedgerEntriesByDate` with `entries` (entries) using a callback taking entry that `entry.id` (the id property of entry) and returns a new array; an array containing "newer-last", "newer-first", "older", "invalid-date".
  assert.deepEqual(sortLedgerEntriesByDate(entries).map(entry => entry.id), [
// Original L30: In the test 'ledger entries sort newest first, then by entry index, without mutating the source', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortLedgerEntriesByDate(entries).map(entry => entry.id), [ 'newer-last', 'newer-first', 'older', 'invalid-date' ]);; array order and object fields are part of the contract.
    'newer-last', 'newer-first', 'older', 'invalid-date'
// Original L31: In the test 'ledger entries sort newest first, then by entry index, without mutating the source', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortLedgerEntriesByDate(entries).map(entry => entry.id), [ 'newer-last', 'newer-first', 'older', 'invalid-date' ]);; array order and object fields are part of the contract.
  ]);
// Original L32: In the test 'ledger entries sort newest first, then by entry index, without mutating the source', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(entries[0].id, 'older');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(entries[0].id, 'older');
// Original L33: Closes the fixture, callback, loop, or test block for 'ledger entries sort newest first, then by entry index, without mutating the source'.
});
// Original L34: Blank line separates related setup or assertions for readability.

// Original L35: Starts an isolated test case whose title states the behavior being specified: table sorting handles text, numeric, and date values without mutating rows or moving blanks first.
test('table sorting handles text, numeric, and date values without mutating rows or moving blanks first', () => {
// Original L36: Builds rows, the concrete fixture collection/object used as input for 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first'; its fields model the relevant domain records or DOM state.
  const rows = [
// Original L37: Sets the object field amount using 12. This field is read later through its property name.
    { name: 'Item 12', amount: 12, date: '2026-10-09' },
// Original L38: Sets the object field amount using 2. This field is read later through its property name.
    { name: 'item 2', amount: 2, date: '2026-01-12' },
// Original L39: Sets the object field date using ''. This field is read later through its property name.
    { name: 'Alpha', amount: null, date: '' }
// Original L40: Closes the fixture, callback, loop, or test block for 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first'.
  ];
// Original L41: Blank line separates related setup or assertions for readability.

// Original L42: Calls `assert.deepEqual` with transforms each item of calls `sortTableRows` with `rows` (rows); an object with fields key: "name"; type: "text" using a callback taking row that `row.name` (the name property of row) and returns a new array; an array containing "Alpha", "item 2", "Item 12".
  assert.deepEqual(sortTableRows(rows, { key: 'name', type: 'text' }).map(row => row.name), [
// Original L43: In the test 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortTableRows(rows, { key: 'name', type: 'text' }).map(row => row.name), [ 'Alpha', 'item 2', 'Item 12' ]);; array order and object fields are part of the contract.
    'Alpha', 'item 2', 'Item 12'
// Original L44: In the test 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortTableRows(rows, { key: 'name', type: 'text' }).map(row => row.name), [ 'Alpha', 'item 2', 'Item 12' ]);; array order and object fields are part of the contract.
  ]);
// Original L45: Calls `assert.deepEqual` with transforms each item of calls `sortTableRows` with `rows` (rows); an object with fields key: "amount"; type: "number" using a callback taking row that `row.name` (the name property of row) and returns a new array; an array containing "item 2", "Item 12", "Alpha".
  assert.deepEqual(sortTableRows(rows, { key: 'amount', type: 'number' }).map(row => row.name), [
// Original L46: In the test 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortTableRows(rows, { key: 'amount', type: 'number' }).map(row => row.name), [ 'item 2', 'Item 12', 'Alpha' ]);; array order and object fields are part of the contract.
    'item 2', 'Item 12', 'Alpha'
// Original L47: In the test 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortTableRows(rows, { key: 'amount', type: 'number' }).map(row => row.name), [ 'item 2', 'Item 12', 'Alpha' ]);; array order and object fields are part of the contract.
  ]);
// Original L48: Calls `assert.deepEqual` with transforms each item of calls `sortTableRows` with `rows` (rows); an object with fields key: "date"; type: "date"; direction: "descending" using a callback taking row that `row.name` (the name property of row) and returns a new array; an array containing "Item 12", "item 2", "Alpha".
  assert.deepEqual(sortTableRows(rows, { key: 'date', type: 'date', direction: 'descending' }).map(row => row.name), [
// Original L49: In the test 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortTableRows(rows, { key: 'date', type: 'date', direction: 'descending' }).map(row => row.name), [ 'Item 12', 'item 2', 'Alpha' ]);; array order and object fields are part of the contract.
    'Item 12', 'item 2', 'Alpha'
// Original L50: In the test 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortTableRows(rows, { key: 'date', type: 'date', direction: 'descending' }).map(row => row.name), [ 'Item 12', 'item 2', 'Alpha' ]);; array order and object fields are part of the contract.
  ]);
// Original L51: Calls `assert.deepEqual` with transforms each item of `rows` (rows) using a callback taking row that `row.name` (the name property of row) and returns a new array; an array containing "Item 12", "item 2", "Alpha".
  assert.deepEqual(rows.map(row => row.name), ['Item 12', 'item 2', 'Alpha']);
// Original L52: Closes the fixture, callback, loop, or test block for 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first'.
});
// Original L53: Blank line separates related setup or assertions for readability.

// Original L54: Starts an isolated test case whose title states the behavior being specified: ledger hour totals exclude advances and ignore invalid hour values.
test('ledger hour totals exclude advances and ignore invalid hour values', () => {
// Original L55: In the test 'ledger hour totals exclude advances and ignore invalid hour values', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sumLedgerHours([ { type: 'normal', hours: 3.5 }, { type: 'advance', hours: 20 }, { type: 'general', hours: 2 }, { type: 'normal', hours: 'not a number' } ]), 5.5);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(sumLedgerHours([
// Original L56: In the test 'ledger hour totals exclude advances and ignore invalid hour values', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sumLedgerHours([ { type: 'normal', hours: 3.5 }, { type: 'advance', hours: 20 }, { type: 'general', hours: 2 }, { type: 'normal', hours: 'not a number' } ]), 5.5);; the fixture therefore checks the concrete boundary/result contract.
    { type: 'normal', hours: 3.5 },
// Original L57: In the test 'ledger hour totals exclude advances and ignore invalid hour values', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sumLedgerHours([ { type: 'normal', hours: 3.5 }, { type: 'advance', hours: 20 }, { type: 'general', hours: 2 }, { type: 'normal', hours: 'not a number' } ]), 5.5);; the fixture therefore checks the concrete boundary/result contract.
    { type: 'advance', hours: 20 },
// Original L58: In the test 'ledger hour totals exclude advances and ignore invalid hour values', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sumLedgerHours([ { type: 'normal', hours: 3.5 }, { type: 'advance', hours: 20 }, { type: 'general', hours: 2 }, { type: 'normal', hours: 'not a number' } ]), 5.5);; the fixture therefore checks the concrete boundary/result contract.
    { type: 'general', hours: 2 },
// Original L59: In the test 'ledger hour totals exclude advances and ignore invalid hour values', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sumLedgerHours([ { type: 'normal', hours: 3.5 }, { type: 'advance', hours: 20 }, { type: 'general', hours: 2 }, { type: 'normal', hours: 'not a number' } ]), 5.5);; the fixture therefore checks the concrete boundary/result contract.
    { type: 'normal', hours: 'not a number' }
// Original L60: In the test 'ledger hour totals exclude advances and ignore invalid hour values', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sumLedgerHours([ { type: 'normal', hours: 3.5 }, { type: 'advance', hours: 20 }, { type: 'general', hours: 2 }, { type: 'normal', hours: 'not a number' } ]), 5.5);; the fixture therefore checks the concrete boundary/result contract.
  ]), 5.5);
// Original L61: Closes the fixture, callback, loop, or test block for 'ledger hour totals exclude advances and ignore invalid hour values'.
});
// Original L62: Blank line separates related setup or assertions for readability.

// Original L63: Starts an isolated test case whose title states the behavior being specified: ledger balances are calculated in integer cents using existing credit and advance signs.
test('ledger balances are calculated in integer cents using existing credit and advance signs', () => {
// Original L64: In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 10.10 }, { type: 'general', amount: 2.25 }, { type: 'advance', amount: 12.35 } ]), 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(ledgerBalanceCents([
// Original L65: In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 10.10 }, { type: 'general', amount: 2.25 }, { type: 'advance', amount: 12.35 } ]), 0);; the fixture therefore checks the concrete boundary/result contract.
    { type: 'normal', amount: 10.10 },
// Original L66: In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 10.10 }, { type: 'general', amount: 2.25 }, { type: 'advance', amount: 12.35 } ]), 0);; the fixture therefore checks the concrete boundary/result contract.
    { type: 'general', amount: 2.25 },
// Original L67: In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 10.10 }, { type: 'general', amount: 2.25 }, { type: 'advance', amount: 12.35 } ]), 0);; the fixture therefore checks the concrete boundary/result contract.
    { type: 'advance', amount: 12.35 }
// Original L68: In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 10.10 }, { type: 'general', amount: 2.25 }, { type: 'advance', amount: 12.35 } ]), 0);; the fixture therefore checks the concrete boundary/result contract.
  ]), 0);
// Original L69: In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 0.1 }, { type: 'advance', amount: 0.09 } ]), 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(ledgerBalanceCents([
// Original L70: In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 0.1 }, { type: 'advance', amount: 0.09 } ]), 1);; the fixture therefore checks the concrete boundary/result contract.
    { type: 'normal', amount: 0.1 },
// Original L71: In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 0.1 }, { type: 'advance', amount: 0.09 } ]), 1);; the fixture therefore checks the concrete boundary/result contract.
    { type: 'advance', amount: 0.09 }
// Original L72: In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 0.1 }, { type: 'advance', amount: 0.09 } ]), 1);; the fixture therefore checks the concrete boundary/result contract.
  ]), 1);
// Original L73: Closes the fixture, callback, loop, or test block for 'ledger balances are calculated in integer cents using existing credit and advance signs'.
});
// Original L74: Blank line separates related setup or assertions for readability.

// Original L75: Starts an isolated test case whose title states the behavior being specified: completed shifts can be converted to payroll ledger entries without changing the source shift.
test('completed shifts can be converted to payroll ledger entries without changing the source shift', () => {
// Original L76: Sets start to a deterministic date/time fixture so 'completed shifts can be converted to payroll ledger entries without changing the source shift' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.
  const start = new Date(2026, 9, 9, 9, 0);
// Original L77: Sets end to a deterministic date/time fixture so 'completed shifts can be converted to payroll ledger entries without changing the source shift' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.
  const end = new Date(2026, 9, 9, 12, 0);
// Original L78: Builds shift, the concrete fixture collection/object used as input for 'completed shifts can be converted to payroll ledger entries without changing the source shift'; its fields model the relevant domain records or DOM state.
  const shift = {
// Original L79: Sets the object field id using 'shift-payroll-1'. This field is read later through its property name.
    id: 'shift-payroll-1',
// Original L80: Sets the object field wage using 23.5. This field is read later through its property name.
    employee: { id: 'employee-1', wage: 23.5 },
// Original L81: Sets the object field name using 'Oak Street'. This field is read later through its property name.
    customer: { name: 'Oak Street' },
// Original L82: Sets the object field clockInTime using start. This field is read later through its property name.
    clockInTime: start,
// Original L83: Sets the object field clockOutTime using end. This field is read later through its property name.
    clockOutTime: end,
// Original L84: Sets the object field paidHours using 2.5. This field is read later through its property name.
    paidHours: 2.5,
// Original L85: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
    breaks: [],
// Original L86: Sets the object field note using 'Front lawn'. This field is read later through its property name.
    note: 'Front lawn'
// Original L87: Closes the fixture, callback, loop, or test block for 'completed shifts can be converted to payroll ledger entries without changing the source shift'.
  };
// Original L88: Blank line separates related setup or assertions for readability.

// Original L89: Calls `assert.deepEqual` with calls `makeShiftLedgerEntryData` with `shift` (shift); an object with fields employeeId: "employee-1"; date: a text template that combines fixed text with computed values calls `start.getFullYear` with no arguments; type: "normal"; hours: 2.5; amount: 58.75; notes: "Shift · Oak Street — Front lawn"; and further fields.
  assert.deepEqual(makeShiftLedgerEntryData(shift), {
// Original L90: Defines field employeeId as "employee-1".
    employeeId: 'employee-1',
// Original L91: Defines field date as a text template that combines fixed text with computed values calls `start.getFullYear` with no arguments.
    date: `${start.getFullYear()}-10-09`,
// Original L92: Defines field type as "normal".
    type: 'normal',
// Original L93: Defines field hours as 2.5.
    hours: 2.5,
// Original L94: Defines field amount as 58.75.
    amount: 58.75,
// Original L95: Defines field notes as "Shift · Oak Street — Front lawn".
    notes: 'Shift · Oak Street — Front lawn',
// Original L96: Defines field sourceShiftId as "shift-payroll-1".
    sourceShiftId: 'shift-payroll-1'
// Original L97: In the test 'completed shifts can be converted to payroll ledger entries without changing the source shift', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(makeShiftLedgerEntryData(shift), { employeeId: 'employee-1', date: `${start.getFullYear()}-10-09`, type: 'normal', hours: 2.5, amount: 58.75, notes: 'Shift · Oak Street — Front lawn', sourceShiftId: 'shift-payroll-1' });; array order and object fields are part of the contract.
  });
// Original L98: In the test 'completed shifts can be converted to payroll ledger entries without changing the source shift', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(shift.isPaid, undefined);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(shift.isPaid, undefined);
// Original L99: Closes the fixture, callback, loop, or test block for 'completed shifts can be converted to payroll ledger entries without changing the source shift'.
});
// Original L100: Blank line separates related setup or assertions for readability.

// Original L101: Starts an isolated test case whose title states the behavior being specified: an incomplete or invalid shift cannot be converted to a ledger entry.
test('an incomplete or invalid shift cannot be converted to a ledger entry', () => {
// Original L102: In the test 'an incomplete or invalid shift cannot be converted to a ledger entry', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => makeShiftLedgerEntryData({ id: 'open-shift', employee: { id: 'employee-1', wage: 20 }, clockInTime: new Date(2026, 9, 9, 9, 0), clockOutTime: null }), /completed shift with an employee/);; invalid domain input must be rejected rather than accepted.
  assert.throws(() => makeShiftLedgerEntryData({
// Original L103: In the test 'an incomplete or invalid shift cannot be converted to a ledger entry', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => makeShiftLedgerEntryData({ id: 'open-shift', employee: { id: 'employee-1', wage: 20 }, clockInTime: new Date(2026, 9, 9, 9, 0), clockOutTime: null }), /completed shift with an employee/);; invalid domain input must be rejected rather than accepted.
    id: 'open-shift',
// Original L104: In the test 'an incomplete or invalid shift cannot be converted to a ledger entry', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => makeShiftLedgerEntryData({ id: 'open-shift', employee: { id: 'employee-1', wage: 20 }, clockInTime: new Date(2026, 9, 9, 9, 0), clockOutTime: null }), /completed shift with an employee/);; invalid domain input must be rejected rather than accepted.
    employee: { id: 'employee-1', wage: 20 },
// Original L105: In the test 'an incomplete or invalid shift cannot be converted to a ledger entry', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => makeShiftLedgerEntryData({ id: 'open-shift', employee: { id: 'employee-1', wage: 20 }, clockInTime: new Date(2026, 9, 9, 9, 0), clockOutTime: null }), /completed shift with an employee/);; invalid domain input must be rejected rather than accepted.
    clockInTime: new Date(2026, 9, 9, 9, 0),
// Original L106: In the test 'an incomplete or invalid shift cannot be converted to a ledger entry', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => makeShiftLedgerEntryData({ id: 'open-shift', employee: { id: 'employee-1', wage: 20 }, clockInTime: new Date(2026, 9, 9, 9, 0), clockOutTime: null }), /completed shift with an employee/);; invalid domain input must be rejected rather than accepted.
    clockOutTime: null
// Original L107: In the test 'an incomplete or invalid shift cannot be converted to a ledger entry', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => makeShiftLedgerEntryData({ id: 'open-shift', employee: { id: 'employee-1', wage: 20 }, clockInTime: new Date(2026, 9, 9, 9, 0), clockOutTime: null }), /completed shift with an employee/);; invalid domain input must be rejected rather than accepted.
  }), /completed shift with an employee/);
// Original L108: Closes the fixture, callback, loop, or test block for 'an incomplete or invalid shift cannot be converted to a ledger entry'.
});
// Original L109: Blank line separates related setup or assertions for readability.

// Original L110: Starts an isolated test case whose title states the behavior being specified: quarter-hour rounding preserves the nearest/down/up behavior at boundaries.
test('quarter-hour rounding preserves the nearest/down/up behavior at boundaries', () => {
// Original L111: In the test 'quarter-hour rounding preserves the nearest/down/up behavior at boundaries', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(roundTo15Minutes(date('2026-10-09T09:07:00Z')).toISOString(), '2026-10-09T09:00:00.000Z');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(roundTo15Minutes(date('2026-10-09T09:07:00Z')).toISOString(), '2026-10-09T09:00:00.000Z');
// Original L112: In the test 'quarter-hour rounding preserves the nearest/down/up behavior at boundaries', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(roundTo15Minutes(date('2026-10-09T09:08:00Z')).toISOString(), '2026-10-09T09:15:00.000Z');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(roundTo15Minutes(date('2026-10-09T09:08:00Z')).toISOString(), '2026-10-09T09:15:00.000Z');
// Original L113: In the test 'quarter-hour rounding preserves the nearest/down/up behavior at boundaries', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(roundDown15Minutes(date('2026-10-09T09:14:59Z')).toISOString(), '2026-10-09T09:00:00.000Z');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(roundDown15Minutes(date('2026-10-09T09:14:59Z')).toISOString(), '2026-10-09T09:00:00.000Z');
// Original L114: In the test 'quarter-hour rounding preserves the nearest/down/up behavior at boundaries', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(roundUp15Minutes(date('2026-10-09T09:00:01Z')).toISOString(), '2026-10-09T09:15:00.000Z');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(roundUp15Minutes(date('2026-10-09T09:00:01Z')).toISOString(), '2026-10-09T09:15:00.000Z');
// Original L115: Closes the fixture, callback, loop, or test block for 'quarter-hour rounding preserves the nearest/down/up behavior at boundaries'.
});
// Original L116: Blank line separates related setup or assertions for readability.

// Original L117: Starts an isolated test case whose title states the behavior being specified: actual shift hours support overnight shifts and subtract breaks across midnight.
test('actual shift hours support overnight shifts and subtract breaks across midnight', () => {
// Original L118: Initializes hours for 'actual shift hours support overnight shifts and subtract breaks across midnight', supplying the value that the following test logic will inspect or mutate.
  const hours = actualShiftHours(
// Original L119: Continues the arguments for actualShiftHours. Each comma separates one argument that the function receives in this order.
    '2026-10-08T22:00:00Z',
// Original L120: Continues the arguments for actualShiftHours. Each comma separates one argument that the function receives in this order.
    '2026-10-09T06:00:00Z',
// Original L121: Sets the object field end using '2026-10-09T01:30:00Z'. This field is read later through its property name.
    [{ start: '2026-10-09T01:00:00Z', end: '2026-10-09T01:30:00Z' }]
// Original L122: Closes function call. The closing parenthesis completes the argument list/expression. The semicolon ends the statement.
  );
// Original L123: In the test 'actual shift hours support overnight shifts and subtract breaks across midnight', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(hours, 7.5);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(hours, 7.5);
// Original L124: Closes the fixture, callback, loop, or test block for 'actual shift hours support overnight shifts and subtract breaks across midnight'.
});
// Original L125: Blank line separates related setup or assertions for readability.

// Original L126: Starts an isolated test case whose title states the behavior being specified: breaks are clipped to the shift and overlapping break records are not double-subtracted.
test('breaks are clipped to the shift and overlapping break records are not double-subtracted', () => {
// Original L127: Initializes hours for 'breaks are clipped to the shift and overlapping break records are not double-subtracted', supplying the value that the following test logic will inspect or mutate.
  const hours = actualShiftHours(
// Original L128: Continues the arguments for actualShiftHours. Each comma separates one argument that the function receives in this order.
    '2026-10-09T09:00:00Z',
// Original L129: Continues the arguments for actualShiftHours. Each comma separates one argument that the function receives in this order.
    '2026-10-09T11:00:00Z',
// Original L130: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
    [
// Original L131: Sets the object field end using '2026-10-09T09:45:00Z'. This field is read later through its property name.
      { start: '2026-10-09T08:30:00Z', end: '2026-10-09T09:45:00Z' },
// Original L132: Sets the object field end using '2026-10-09T10:00:00Z'. This field is read later through its property name.
      { start: '2026-10-09T09:30:00Z', end: '2026-10-09T10:00:00Z' }
// Original L133: Closes the fixture, callback, loop, or test block for 'breaks are clipped to the shift and overlapping break records are not double-subtracted'.
    ]
// Original L134: Closes function call. The closing parenthesis completes the argument list/expression. The semicolon ends the statement.
  );
// Original L135: In the test 'breaks are clipped to the shift and overlapping break records are not double-subtracted', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(hours, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(hours, 1);
// Original L136: Closes the fixture, callback, loop, or test block for 'breaks are clipped to the shift and overlapping break records are not double-subtracted'.
});
// Original L137: Blank line separates related setup or assertions for readability.

// Original L138: Starts an isolated test case whose title states the behavior being specified: a TBD date has no due or overdue state, including when the value is null.
test('a TBD date has no due or overdue state, including when the value is null', () => {
// Original L139: Initializes today for 'a TBD date has no due or overdue state, including when the value is null', supplying the value that the following test logic will inspect or mutate.
  const today = date('2026-10-09T12:00:00');
// Original L140: In the test 'a TBD date has no due or overdue state, including when the value is null', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(plannedDateStatus(null, today), 'tbd');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(plannedDateStatus(null, today), 'tbd');
// Original L141: In the test 'a TBD date has no due or overdue state, including when the value is null', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(plannedDateStatus('', today), 'tbd');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(plannedDateStatus('', today), 'tbd');
// Original L142: In the test 'a TBD date has no due or overdue state, including when the value is null', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(plannedDateStatus('2026-10-09T12:00:00', today), 'due-today');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(plannedDateStatus('2026-10-09T12:00:00', today), 'due-today');
// Original L143: In the test 'a TBD date has no due or overdue state, including when the value is null', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(plannedDateStatus('2026-10-08T12:00:00', today), 'overdue');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(plannedDateStatus('2026-10-08T12:00:00', today), 'overdue');
// Original L144: Closes the fixture, callback, loop, or test block for 'a TBD date has no due or overdue state, including when the value is null'.
});
// Original L145: Blank line separates related setup or assertions for readability.

// Original L146: Starts an isolated test case whose title states the behavior being specified: a shift cannot be attached to two invoices and linked lines preserve audit snapshots.
test('a shift cannot be attached to two invoices and linked lines preserve audit snapshots', () => {
// Original L147: Builds shift, the concrete fixture collection/object used as input for 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots'; its fields model the relevant domain records or DOM state.
  const shift = {
// Original L148: Sets the object field id using 'shift-1'. This field is read later through its property name.
    id: 'shift-1',
// Original L149: Sets the object field id using 'employee-1'. This field is read later through its property name.
    employee: { id: 'employee-1' },
// Original L150: Sets the object field id using 'customer-1'. This field is read later through its property name.
    customer: { id: 'customer-1' },
// Original L151: Continues the arguments for date. Each comma separates one argument that the function receives in this order.
    clockInTime: date('2026-10-09T09:00:00Z'),
// Original L152: Continues the arguments for date. Each comma separates one argument that the function receives in this order.
    clockOutTime: date('2026-10-09T12:00:00Z'),
// Original L153: Continues the arguments for date. Each comma separates one argument that the function receives in this order.
    breaks: [{ start: date('2026-10-09T10:00:00Z'), end: date('2026-10-09T10:15:00Z') }]
// Original L154: Closes the fixture, callback, loop, or test block for 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots'.
  };
// Original L155: Initializes line for 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', supplying the value that the following test logic will inspect or mutate.
  const line = makeShiftInvoiceLine(shift, 60);
// Original L156: Sets `line.name` (the name property of line) to "Labor".
  line.name = 'Labor';
// Original L157: Builds invoices, the concrete fixture collection/object used as input for 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots'; its fields model the relevant domain records or DOM state.
  const invoices = [{ id: 'invoice-1', items: [line] }];
// Original L158: In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(line.shiftId, 'shift-1');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(line.shiftId, 'shift-1');
// Original L159: In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(line.billedHours, 2.75);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(line.billedHours, 2.75);
// Original L160: In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(line.billingRate, 60);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(line.billingRate, 60);
// Original L161: In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(line.value, 165);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(line.value, 165);
// Original L162: In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(shiftIsAttachedElsewhere(invoices, 'shift-1', 'invoice-2'), true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(shiftIsAttachedElsewhere(invoices, 'shift-1', 'invoice-2'), true);
// Original L163: In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(shiftIsAttachedElsewhere(invoices, 'shift-1', 'invoice-1'), false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(shiftIsAttachedElsewhere(invoices, 'shift-1', 'invoice-1'), false);
// Original L164: In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(shiftInvoiceLineStatus(line, shift), 'current');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(shiftInvoiceLineStatus(line, shift), 'current');
// Original L165: Builds editedShift, the concrete fixture collection/object used as input for 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots'; its fields model the relevant domain records or DOM state.
  const editedShift = { ...shift, clockOutTime: date('2026-10-09T12:15:00Z') };
// Original L166: In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(shiftInvoiceLineStatus(line, editedShift), 'changed');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(shiftInvoiceLineStatus(line, editedShift), 'changed');
// Original L167: Closes the fixture, callback, loop, or test block for 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots'.
});

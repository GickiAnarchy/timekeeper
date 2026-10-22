// Original L1: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import test from 'node:test';
// Original L2: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import assert from 'node:assert/strict';
// Original L3: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { buildPayPeriodReview, currentWeekRange } from '../scripts/pay-period-review.mjs';
// Original L4: Blank line separates related setup or assertions for readability.

// Original L5: Builds base, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
const base = {
// Original L6: Sets the object field endDate using '2026-10-18'. This field is read later through its property name.
  startDate: '2026-10-12', endDate: '2026-10-18',
// Original L7: Sets the object field id using 'e1'. This field is read later through its property name.
  employees: [{ id: 'e1', name: 'Ada' }, { id: 'e2', name: 'No shifts' }]
// Original L8: Closes the fixture, callback, loop, or test block for 'test setup'.
};
// Original L9: Blank line separates related setup or assertions for readability.

// Original L10: Starts an isolated test case whose title states the behavior being specified: currentWeekRange returns local Monday through Sunday.
test('currentWeekRange returns local Monday through Sunday', () => {
// Original L11: Calls `assert.deepEqual` with calls `currentWeekRange` with constructs a new instance of `Date` with 2026; 9; 18; 12; an object with fields startDate: "2026-10-12"; endDate: "2026-10-18".
  assert.deepEqual(currentWeekRange(new Date(2026, 9, 18, 12)), { startDate: '2026-10-12', endDate: '2026-10-18' });
// Original L12: Calls `assert.deepEqual` with calls `currentWeekRange` with constructs a new instance of `Date` with 2026; 9; 12; 12; an object with fields startDate: "2026-10-12"; endDate: "2026-10-18".
  assert.deepEqual(currentWeekRange(new Date(2026, 9, 12, 12)), { startDate: '2026-10-12', endDate: '2026-10-18' });
// Original L13: Closes the fixture, callback, loop, or test block for 'currentWeekRange returns local Monday through Sunday'.
});
// Original L14: Blank line separates related setup or assertions for readability.

// Original L15: Starts an isolated test case whose title states the behavior being specified: review classifies boundaries, overnight shifts, active and malformed shifts without mutation.
test('review classifies boundaries, overnight shifts, active and malformed shifts without mutation', () => {
// Original L16: Builds shifts, the concrete fixture collection/object used as input for 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation'; its fields model the relevant domain records or DOM state.
  const shifts = [
// Original L17: Sets the object field id using 'e1'. This field is read later through its property name.
    { id: 'first', employee: { id: 'e1', name: 'Ada' }, clockInTime: '2026-10-12T23:00:00', clockOutTime: '2026-10-13T01:00:00', breaks: [{ start: '2026-10-13T00:00:00', end: '2026-10-13T00:30:00' }] },
// Original L18: Sets the object field id using 'e1'. This field is read later through its property name.
    { id: 'last', employee: { id: 'e1' }, clockInTime: '2026-10-18T23:00:00', clockOutTime: '2026-10-19T01:00:00' },
// Original L19: Sets the object field id using 'e1'. This field is read later through its property name.
    { id: 'active', employee: { id: 'e1' }, clockInTime: '2026-10-15T09:00:00' },
// Original L20: Sets the object field id using 'e1'. This field is read later through its property name.
    { id: 'bad', employee: { id: 'e1' }, clockInTime: '2026-10-16T09:00:00', clockOutTime: '2026-10-16T08:00:00' }
// Original L21: Closes the fixture, callback, loop, or test block for 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation'.
  ];
// Original L22: Initializes before for 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation', supplying the value that the following test logic will inspect or mutate.
  const before = structuredClone(shifts);
// Original L23: Builds result, the concrete fixture collection/object used as input for 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation'; its fields model the relevant domain records or DOM state.
  const result = buildPayPeriodReview({ ...base, shifts });
// Original L24: Calls `assert.deepEqual` with `shifts` (shifts); `before` (before).
  assert.deepEqual(shifts, before);
// Original L25: Calls `assert.deepEqual` with transforms each item of `result.shifts` (the shifts property of result) using a callback taking row that `row.id` (the id property of row) and returns a new array; an array containing "last", "first".
  assert.deepEqual(result.shifts.map(row => row.id), ['last', 'first']);
// Original L26: In the test 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.shifts.find(row => row.id === 'first').actualHours, 1.5);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(result.shifts.find(row => row.id === 'first').actualHours, 1.5);
// Original L27: In the test 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.activeShiftCount, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(result.activeShiftCount, 1);
// Original L28: In the test 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.invalidShiftCount, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(result.invalidShiftCount, 1);
// Original L29: Closes the fixture, callback, loop, or test block for 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation'.
});
// Original L30: Blank line separates related setup or assertions for readability.

// Original L31: Starts an isolated test case whose title states the behavior being specified: paid flag is independent from paid hours, and invoices support old/new links and zero rate.
test('paid flag is independent from paid hours, and invoices support old/new links and zero rate', () => {
// Original L32: Builds shifts, the concrete fixture collection/object used as input for 'paid flag is independent from paid hours, and invoices support old/new links and zero rate'; its fields model the relevant domain records or DOM state.
  const shifts = [
// Original L33: Sets the object field id using 'c'. This field is read later through its property name.
    { id: 'ready', employeeId: 'e1', customer: { id: 'c', name: 'Client', billingRate: 0 }, clockInTime: '2026-10-12T09:00:00', clockOutTime: '2026-10-12T10:00:00', isPaid: false, paidHours: 0 },
// Original L34: Sets the object field id using 'linked'. This field is read later through its property name.
    { id: 'linked', employeeId: 'e1', clockInTime: '2026-10-13T09:00:00', clockOutTime: '2026-10-13T10:00:00', isPaid: true, paidHours: 2 },
// Original L35: Sets the object field id using 'c2'. This field is read later through its property name.
    { id: 'missing', employeeId: 'e1', customer: { id: 'c2' }, clockInTime: '2026-10-14T09:00:00', clockOutTime: '2026-10-14T10:00:00' }
// Original L36: Closes the fixture, callback, loop, or test block for 'paid flag is independent from paid hours, and invoices support old/new links and zero rate'.
  ];
// Original L37: Builds result, the concrete fixture collection/object used as input for 'paid flag is independent from paid hours, and invoices support old/new links and zero rate'; its fields model the relevant domain records or DOM state.
  const result = buildPayPeriodReview({ ...base, shifts, invoices: [{ id: 'paid', items: [{ shiftId: 'linked', value: 10 }] }] });
// Original L38: Calls `assert.deepEqual` with transforms each item of `result.shifts` (the shifts property of result) using a callback taking row that `row.invoiceStatus` (the invoice status property of row) and returns a new array; an array containing "Missing billing rate", "Linked", "Ready".
  assert.deepEqual(result.shifts.map(row => row.invoiceStatus), ['Missing billing rate', 'Linked', 'Ready']);
// Original L39: In the test 'paid flag is independent from paid hours, and invoices support old/new links and zero rate', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.shifts.find(row => row.id === 'ready').invoiceCents, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(result.shifts.find(row => row.id === 'ready').invoiceCents, 0);
// Original L40: In the test 'paid flag is independent from paid hours, and invoices support old/new links and zero rate', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.shifts.find(row => row.id === 'linked').invoiceCents, 1000);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(result.shifts.find(row => row.id === 'linked').invoiceCents, 1000);
// Original L41: In the test 'paid flag is independent from paid hours, and invoices support old/new links and zero rate', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.totals.paidShiftCount, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(result.totals.paidShiftCount, 1);
// Original L42: In the test 'paid flag is independent from paid hours, and invoices support old/new links and zero rate', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.totals.unpaidHours, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(result.totals.unpaidHours, 1);
// Original L43: Closes the fixture, callback, loop, or test block for 'paid flag is independent from paid hours, and invoices support old/new links and zero rate'.
});
// Original L44: Blank line separates related setup or assertions for readability.

// Original L45: Starts an isolated test case whose title states the behavior being specified: summaries retain all employees, missing references, and all-date ledger balances; filter narrows them.
test('summaries retain all employees, missing references, and all-date ledger balances; filter narrows them', () => {
// Original L46: Builds result, the concrete fixture collection/object used as input for 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them'; its fields model the relevant domain records or DOM state.
  const result = buildPayPeriodReview({ ...base,
// Original L47: Sets the object field id using 's'. This field is read later through its property name.
    shifts: [{ id: 's', employeeId: 'missing', clockInTime: '2026-10-12T09:00:00', clockOutTime: '2026-10-12T10:00:00' }],
// Original L48: Sets the object field amount using 4. This field is read later through its property name.
    ledgerEntries: [{ employeeId: 'missing', amount: 12 }, { employeeId: 'e1', amount: 4, date: '1900-01-01' }]
// Original L49: Closes the fixture, callback, loop, or test block for 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them'.
  });
// Original L50: Calls `assert.deepEqual` with transforms each item of `result.employees` (the employees property of result) using a callback taking employee that `employee.id` (the id property of employee) and returns a new array; an array containing "e1", "e2", "missing".
  assert.deepEqual(result.employees.map(employee => employee.id), ['e1', 'e2', 'missing']);
// Original L51: In the test 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.employees.find(employee => employee.id === 'e1').balanceCents, 400);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(result.employees.find(employee => employee.id === 'e1').balanceCents, 400);
// Original L52: In the test 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.employees.find(employee => employee.id === 'missing').shiftCount, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(result.employees.find(employee => employee.id === 'missing').shiftCount, 1);
// Original L53: Builds filtered, the concrete fixture collection/object used as input for 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them'; its fields model the relevant domain records or DOM state.
  const filtered = buildPayPeriodReview({ ...base, employeeId: 'e1', ledgerEntries: [{ employeeId: 'e1', amount: 4 }], shifts: result.shifts });
// Original L54: In the test 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(filtered.employees.length, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(filtered.employees.length, 1);
// Original L55: In the test 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(filtered.shifts.length, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(filtered.shifts.length, 0);
// Original L56: Closes the fixture, callback, loop, or test block for 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them'.
});
// Original L57: Blank line separates related setup or assertions for readability.

// Original L58: Starts an isolated test case whose title states the behavior being specified: invalid and empty ranges are rejected strictly.
test('invalid and empty ranges are rejected strictly', () => {
// Original L59: In the test 'invalid and empty ranges are rejected strictly', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => buildPayPeriodReview({ startDate: '2026-02-30', endDate: '2026-03-01' }), /YYYY-MM-DD/);; invalid domain input must be rejected rather than accepted.
  assert.throws(() => buildPayPeriodReview({ startDate: '2026-02-30', endDate: '2026-03-01' }), /YYYY-MM-DD/);
// Original L60: In the test 'invalid and empty ranges are rejected strictly', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => buildPayPeriodReview({ startDate: '2026-10-19', endDate: '2026-10-18' }), /on or after/);; invalid domain input must be rejected rather than accepted.
  assert.throws(() => buildPayPeriodReview({ startDate: '2026-10-19', endDate: '2026-10-18' }), /on or after/);
// Original L61: Closes the fixture, callback, loop, or test block for 'invalid and empty ranges are rejected strictly'.
});
// Original L62: Blank line separates related setup or assertions for readability.

// Original L63: Starts an isolated test case whose title states the behavior being specified: null, empty, and undefined rates are missing rather than free billing; zero remains valid.
test('null, empty, and undefined rates are missing rather than free billing; zero remains valid', () => {
// Original L64: Builds shifts, the concrete fixture collection/object used as input for 'null, empty, and undefined rates are missing rather than free billing; zero remains valid'; its fields model the relevant domain records or DOM state.
  const shifts = [null, '', undefined, 0].map((billingRate, index) => ({
// Original L65: Sets the object field id using 'c'. This field is read later through its property name.
    id: String(index), employeeId: 'e1', customer: { id: 'c', billingRate },
// Original L66: Sets the object field clockInTime using '2026-10-12T09:00:00'. This field is read later through its property name.
    clockInTime: '2026-10-12T09:00:00', clockOutTime: '2026-10-12T10:00:00'
// Original L67: Closes object literal and callback function and function call. The closing parenthesis completes the argument list/expression. The semicolon ends the statement.
  }));
// Original L68: Builds review, the concrete fixture collection/object used as input for 'null, empty, and undefined rates are missing rather than free billing; zero remains valid'; its fields model the relevant domain records or DOM state.
  const review = buildPayPeriodReview({ ...base, shifts });
// Original L69: Calls `assert.deepEqual` with transforms each item of `review.shifts` (the shifts property of review) using a callback taking row that `row.invoiceStatus` (the invoice status property of row) and returns a new array; an array containing "Missing billing rate", "Missing billing rate", "Missing billing rate", "Ready".
  assert.deepEqual(review.shifts.map(row => row.invoiceStatus), ['Missing billing rate', 'Missing billing rate', 'Missing billing rate', 'Ready']);
// Original L70: In the test 'null, empty, and undefined rates are missing rather than free billing; zero remains valid', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(review.totals.invoiceReadyCount, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(review.totals.invoiceReadyCount, 1);
// Original L71: Closes the fixture, callback, loop, or test block for 'null, empty, and undefined rates are missing rather than free billing; zero remains valid'.
});
// Original L72: Blank line separates related setup or assertions for readability.

// Original L73: Starts an isolated test case whose title states the behavior being specified: archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling.
test('archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', () => {
// Original L74: Builds shifts, the concrete fixture collection/object used as input for 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling'; its fields model the relevant domain records or DOM state.
  const shifts = ['archived', 'active', 'invoice-id', 'invoice-item'].map(id => ({
// Original L75: Sets the object field id using id. This field is read later through its property name.
    id, employeeId: 'e1', customer: { id: 'c', billingRate: 30 },
// Original L76: Sets the object field clockInTime using '2026-10-12T09:00:00'. This field is read later through its property name.
    clockInTime: '2026-10-12T09:00:00', clockOutTime: '2026-10-12T10:00:00'
// Original L77: Closes object literal and callback function and function call. The closing parenthesis completes the argument list/expression. The semicolon ends the statement.
  }));
// Original L78: Builds input, the concrete fixture collection/object used as input for 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling'; its fields model the relevant domain records or DOM state.
  const input = { ...base, shifts,
// Original L79: Sets the object field amount using 50. This field is read later through its property name.
    ledgerArchiveRows: [{ sourceShiftId: 'archived', employeeId: 'e1', amount: 50 }, { sourceShiftId: 'active', employeeId: 'e1', amount: 50 }],
// Original L80: Sets the object field amount using 20. This field is read later through its property name.
    ledgerEntries: [{ sourceShiftId: 'active', employeeId: 'e1', amount: 20 }, { employeeId: null, amount: 10 }],
// Original L81: Sets the object field value using 30. This field is read later through its property name.
    invoices: [{ isPaid: true, shiftIds: ['invoice-id'] }, { items: [{ shiftId: 'invoice-item', value: 30 }] }]
// Original L82: Closes the fixture, callback, loop, or test block for 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling'.
  };
// Original L83: Initializes before for 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', supplying the value that the following test logic will inspect or mutate.
  const before = structuredClone(input);
// Original L84: Initializes review for 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', supplying the value that the following test logic will inspect or mutate.
  const review = buildPayPeriodReview(input);
// Original L85: In the test 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(review.shifts.find(row => row.id === 'archived').ledgerStatus, 'Archived ledger');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(review.shifts.find(row => row.id === 'archived').ledgerStatus, 'Archived ledger');
// Original L86: In the test 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(review.shifts.find(row => row.id === 'active').ledgerStatus, 'Active ledger');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(review.shifts.find(row => row.id === 'active').ledgerStatus, 'Active ledger');
// Original L87: In the test 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(review.totals.invoiceReadyCount, 2);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(review.totals.invoiceReadyCount, 2);
// Original L88: In the test 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(review.employees.find(row => row.id === 'e1').balanceCents, 2000);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(review.employees.find(row => row.id === 'e1').balanceCents, 2000);
// Original L89: In the test 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(review.employees.find(row => row.id === '').balanceCents, 1000);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(review.employees.find(row => row.id === '').balanceCents, 1000);
// Original L90: Calls `assert.deepEqual` with `input` (input); `before` (before).
  assert.deepEqual(input, before);
// Original L91: Closes the fixture, callback, loop, or test block for 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling'.
});
// Original L92: Blank line separates related setup or assertions for readability.

// Original L93: Starts an isolated test case whose title states the behavior being specified: historical orphan employee IDs remain available even outside the current period.
test('historical orphan employee IDs remain available even outside the current period', () => {
// Original L94: Builds review, the concrete fixture collection/object used as input for 'historical orphan employee IDs remain available even outside the current period'; its fields model the relevant domain records or DOM state.
  const review = buildPayPeriodReview({ ...base, shifts: [{ employeeId: 'historical', clockInTime: '2020-01-01T08:00:00', clockOutTime: '2020-01-01T09:00:00' }] });
// Original L95: In the test 'historical orphan employee IDs remain available even outside the current period', this truthiness assertion requires the concrete condition to hold: assert.ok(review.employees.some(person => person.id === 'historical'));; it verifies the required presence, count, geometry, or invariant represented by the fixture.
  assert.ok(review.employees.some(person => person.id === 'historical'));
// Original L96: In the test 'historical orphan employee IDs remain available even outside the current period', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(review.totals.shiftCount, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(review.totals.shiftCount, 0);
// Original L97: Closes the fixture, callback, loop, or test block for 'historical orphan employee IDs remain available even outside the current period'.
});

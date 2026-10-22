// Original L1: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import test from 'node:test';
// Original L2: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import assert from 'node:assert/strict';
// Original L3: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { loadPayPeriodReviewData } from '../scripts/pay-period-data.mjs';
// Original L4: Blank line separates related setup or assertions for readability.

// Original L5: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function fixture() {
// Original L6: Builds calls, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const calls = [];
// Original L7: Builds store, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const store = {
// Original L8: Sets the object field id using 'e1'. This field is read later through its property name.
    employees: new Map([['e1', { id: 'e1', name: 'Test employee' }]]),
// Original L9: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
    shifts: [{ id: 's1' }], invoices: [], ledger: { entries: [{ id: 'row1' }] }, ledgerArchiveRows: [],
// Original L10: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
    loadFailures: ['old error'],
// Original L11: Throws constructs a new instance of `Error` with "Mutating initialization must not run"; normal execution stops until a matching catch handles it.
    async init() { throw new Error('Mutating initialization must not run'); },
// Original L12: Throws constructs a new instance of `Error` with "No archive writes allowed"; normal execution stops until a matching catch handles it.
    async archiveAlreadySettledLedgers() { throw new Error('No archive writes allowed'); },
// Original L13: Throws constructs a new instance of `Error` with "No archive writes allowed"; normal execution stops until a matching catch handles it.
    async resumePendingLedgerArchives() { throw new Error('No archive writes allowed'); }
// Original L14: Closes the fixture, callback, loop, or test block for 'test setup'.
  };
// Original L15: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
  for (const method of ['loadEmployees', 'loadCustomers', 'loadShifts', 'loadInvoices', 'loadLedger', 'loadLedgerArchives']) {
// Original L16: Begins a callback used by the 'test setup' test to model an event, loader, or transformation.
    store[method] = async () => { calls.push(method); };
// Original L17: Closes the fixture, callback, loop, or test block for 'test setup'.
  }
// Original L18: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
  return { calls, store };
// Original L19: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L20: Blank line separates related setup or assertions for readability.

// Original L21: Starts an isolated test case whose title states the behavior being specified: review loads only the six read methods, with people before linked shifts.
test('review loads only the six read methods, with people before linked shifts', async () => {
// Original L22: Initializes { for 'review loads only the six read methods, with people before linked shifts', supplying the value that the following test logic will inspect or mutate.
  const { calls, store } = fixture();
// Original L23: Initializes snapshot for 'review loads only the six read methods, with people before linked shifts', supplying the value that the following test logic will inspect or mutate.
  const snapshot = await loadPayPeriodReviewData(store);
// Original L24: Calls `assert.deepEqual` with `calls` (calls); an array containing "loadEmployees", "loadCustomers", "loadShifts", "loadInvoices", "loadLedger", and 1 more entries.
  assert.deepEqual(calls, ['loadEmployees', 'loadCustomers', 'loadShifts', 'loadInvoices', 'loadLedger', 'loadLedgerArchives']);
// Original L25: Calls `assert.deepEqual` with `snapshot.employees` (the employees property of snapshot); an array containing an object with fields id: "e1"; name: "Test employee".
  assert.deepEqual(snapshot.employees, [{ id: 'e1', name: 'Test employee' }]);
// Original L26: In the test 'review loads only the six read methods, with people before linked shifts', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(snapshot.shifts, store.shifts);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(snapshot.shifts, store.shifts);
// Original L27: In the test 'review loads only the six read methods, with people before linked shifts', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(snapshot.ledgerEntries, store.ledger.entries);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(snapshot.ledgerEntries, store.ledger.entries);
// Original L28: Calls `assert.deepEqual` with `store.loadFailures` (the load failures property of store); an array containing .
  assert.deepEqual(store.loadFailures, []);
// Original L29: Closes the fixture, callback, loop, or test block for 'review loads only the six read methods, with people before linked shifts'.
});
// Original L30: Blank line separates related setup or assertions for readability.

// Original L31: Starts an isolated test case whose title states the behavior being specified: a swallowed loader failure prevents a partial review snapshot.
test('a swallowed loader failure prevents a partial review snapshot', async () => {
// Original L32: Initializes { for 'a swallowed loader failure prevents a partial review snapshot', supplying the value that the following test logic will inspect or mutate.
  const { store } = fixture();
// Original L33: Begins a callback used by the 'a swallowed loader failure prevents a partial review snapshot' test to model an event, loader, or transformation.
  store.loadLedger = async () => { store.loadFailures.push(new Error('offline')); };
// Original L34: In the test 'a swallowed loader failure prevents a partial review snapshot', this asynchronous assertion requires the promise fixture to reject with the stated error pattern: await assert.rejects(loadPayPeriodReviewData(store), /No totals are shown/);; failures must propagate instead of producing a partial snapshot.
  await assert.rejects(loadPayPeriodReviewData(store), /No totals are shown/);
// Original L35: Closes the fixture, callback, loop, or test block for 'a swallowed loader failure prevents a partial review snapshot'.
});
// Original L36: Blank line separates related setup or assertions for readability.

// Original L37: Starts an isolated test case whose title states the behavior being specified: a thrown loader failure propagates without initialization or archiving.
test('a thrown loader failure propagates without initialization or archiving', async () => {
// Original L38: Initializes { for 'a thrown loader failure propagates without initialization or archiving', supplying the value that the following test logic will inspect or mutate.
  const { store, calls } = fixture();
// Original L39: Begins a callback used by the 'a thrown loader failure propagates without initialization or archiving' test to model an event, loader, or transformation.
  store.loadCustomers = async () => { throw new Error('offline'); };
// Original L40: In the test 'a thrown loader failure propagates without initialization or archiving', this asynchronous assertion requires the promise fixture to reject with the stated error pattern: await assert.rejects(loadPayPeriodReviewData(store), /offline/);; failures must propagate instead of producing a partial snapshot.
  await assert.rejects(loadPayPeriodReviewData(store), /offline/);
// Original L41: Calls `assert.deepEqual` with `calls` (calls); an array containing "loadEmployees".
  assert.deepEqual(calls, ['loadEmployees']);
// Original L42: Closes the fixture, callback, loop, or test block for 'a thrown loader failure propagates without initialization or archiving'.
});

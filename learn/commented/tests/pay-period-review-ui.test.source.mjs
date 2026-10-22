// Original L1: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import test from 'node:test';
// Original L2: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import assert from 'node:assert/strict';
// Original L3: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import vm from 'node:vm';
// Original L4: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { readFileSync } from 'node:fs';
// Original L5: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { buildPayPeriodReview, currentWeekRange } from '../scripts/pay-period-review.mjs';
// Original L6: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { loadPayPeriodReviewData } from '../scripts/pay-period-data.mjs';
// Original L7: Blank line separates related setup or assertions for readability.

// Original L8: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
class Node {
// Original L9: Continues the surrounding JavaScript expression or argument list. This line contributes constructor(tag = 'div', text = '') {; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
  constructor(tag = 'div', text = '') {
// Original L10: Sets `this.tagName` (the tag name property of this) to `tag` (tag).
    this.tagName = tag; this.textContent = text; this.children = []; this.listeners = new Map();
// Original L11: Sets `this.hidden` (the hidden property of this) to false.
    this.hidden = false; this.disabled = false; this.value = ''; this.className = '';
// Original L12: Closes the fixture, callback, loop, or test block for 'test setup'.
  }
// Original L13: Appends the expanded entries/properties from `nodes` (nodes) to `this.children` (the children property of this).
  append(...nodes) { this.children.push(...nodes); }
// Original L14: Sets `this.children` (the children property of this) to `nodes` (nodes).
  replaceChildren(...nodes) { this.children = nodes; }
// Original L15: Calls `this.append` with `node` (node).
  add(node) { this.append(node); }
// Original L16: Returns `this.children` (the children property of this) to the caller and exits this function.
  get options() { return this.children; }
// Original L17: Returns keeps only items of `this.children` (the children property of this) for which a callback taking node that checks that `node.value` (the value property of node) and `this.value` (the value property of this) have the same value and type returns truthy to the caller and exits this function.
  get selectedOptions() { return this.children.filter(node => node.value === this.value); }
// Original L18: Calls `this.listeners.set` with `type` (type); an array containing the expanded entries/properties from uses calls `this.listeners.get` with `type` (type) when it is truthy, otherwise falls back to an array containing , `callback` (callback).
  addEventListener(type, callback) { this.listeners.set(type, [...(this.listeners.get(type) || []), callback]); }
// Original L19: No value; stores the result in `callback`. const prevents reassignment of this binding, not mutation inside its object/array.
  async dispatch(type) { for (const callback of this.listeners.get(type) || []) await callback({ preventDefault() {} }); }
// Original L20: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L21: Blank line separates related setup or assertions for readability.

// Original L22: Defines `boot` (boot), a reusable asynchronous function taking { fail = false } = {}. Its body runs when called, not when declared.
async function boot({ fail = false } = {}) {
// Original L23: Builds ids, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const ids = [...readFileSync(new URL('../html/pay-period-review.html', import.meta.url), 'utf8').matchAll(/id="([^"]+)"/g)].map(match => match[1]);
// Original L24: Creates nodes, a test-side collection used to record listeners, DOM properties, calls, or unique results while testing 'test setup'.
  const nodes = new Map(ids.map(id => [id, new Node()]));
// Original L25: Initializes document for 'test setup', supplying the value that the following test logic will inspect or mutate.
  const document = new Node('document');
// Original L26: Sets `document.getElementById` (the get element by id property of document) to a callback taking id that calls `nodes.get` with `id` (id).
  document.getElementById = id => nodes.get(id);
// Original L27: Sets `document.createElement` (the create element property of document) to a callback taking tag that constructs a new instance of `Node` with `tag` (tag).
  document.createElement = tag => new Node(tag);
// Original L28: Sets now to a deterministic date/time fixture so 'test setup' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.
  const now = new Date();
// Original L29: Sets shiftStart to a deterministic date/time fixture so 'test setup' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.
  const shiftStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8);
// Original L30: Sets shiftEnd to a deterministic date/time fixture so 'test setup' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.
  const shiftEnd = new Date(shiftStart); shiftEnd.setHours(12);
// Original L31: Defines the test fixture/helper employee; its returned mock data represents the application state needed to exercise 'test setup'.
  const employee = { id: 'e1', name: '<script>Employee</script>', wage: 20 };
// Original L32: Defines the test fixture/helper customer; its returned mock data represents the application state needed to exercise 'test setup'.
  const customer = { id: 'c1', name: 'Test site', billingRate: 50 };
// Original L33: Builds sourceShift, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const sourceShift = { id: 's1', employee, customer, clockInTime: shiftStart, clockOutTime: shiftEnd, breaks: [], paidHours: 0, isPaid: false };
// Original L34: Builds calls, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const calls = [];
// Original L35: Builds store, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const store = {
// Original L36: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
    employees: new Map([[employee.id, employee]]), shifts: [sourceShift], invoices: [],
// Original L37: Sets the object field id using 'r1'. This field is read later through its property name.
    ledger: { entries: [{ id: 'r1', employeeId: 'e1', type: 'normal', amount: 100, date: '2020-01-01', sourceShiftId: 's1' }] },
// Original L38: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
    ledgerArchiveRows: [], ledgerArchives: [], loadFailures: [],
// Original L39: Throws constructs a new instance of `Error` with "Must not initialize or archive"; normal execution stops until a matching catch handles it.
    init() { throw new Error('Must not initialize or archive'); },
// Original L40: Throws constructs a new instance of `Error` with "Must not write"; normal execution stops until a matching catch handles it.
    saveShift() { throw new Error('Must not write'); }
// Original L41: Closes the fixture, callback, loop, or test block for 'test setup'.
  };
// Original L42: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
  for (const method of ['loadEmployees', 'loadCustomers', 'loadShifts', 'loadInvoices', 'loadLedger', 'loadLedgerArchives']) {
// Original L43: Begins a callback used by the 'test setup' test to model an event, loader, or transformation.
    store[method] = async () => { calls.push(method); };
// Original L44: Closes the fixture, callback, loop, or test block for 'test setup'.
  }
// Original L45: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
  if (fail) store.loadLedger = async () => { store.loadFailures.push(new Error('offline')); };
// Original L46: Initializes code for 'test setup', supplying the value that the following test logic will inspect or mutate.
  const code = readFileSync(new URL('../scripts/pay-period-review.js', import.meta.url), 'utf8').replace(/^import .*;\n/gm, '');
// Original L47: Calls `vm.runInNewContext` with `code` (code); an object with fields document: `document` (document); store: `store` (store); buildPayPeriodReview: `buildPayPeriodReview` (build pay period review); currentWeekRange: `currentWeekRange` (current week range); loadPayPeriodReviewData: `loadPayPeriodReviewData` (load pay period review data); Intl: `Intl` (intl); and further fields.
  vm.runInNewContext(code, {
// Original L48: Sets the object field Intl using Intl. This field is read later through its property name.
    document, store, buildPayPeriodReview, currentWeekRange, loadPayPeriodReviewData, Intl, Date, console,
// Original L49: Constructs a new instance of `Node` with "option"; `text` (text); stores the result in `option`. const prevents reassignment of this binding, not mutation inside its object/array.
    Option: function(text, value) { const option = new Node('option', text); option.value = value; return option; }
// Original L50: Closes the fixture, callback, loop, or test block for 'test setup'.
  });
// Original L51: Simulates the user/browser event in 'test setup' so production event handlers run against the mock DOM.
  await document.dispatch('DOMContentLoaded');
// Original L52: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
  return { nodes, store, calls, sourceShift };
// Original L53: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L54: Blank line separates related setup or assertions for readability.

// Original L55: Builds allText, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
const allText = node => [node.textContent, ...node.children.map(allText)].join(' ');
// Original L56: Blank line separates related setup or assertions for readability.

// Original L57: Starts an isolated test case whose title states the behavior being specified: review renders synthetic shifts, honors zero pay hours, and loads without init or writes.
test('review renders synthetic shifts, honors zero pay hours, and loads without init or writes', async () => {
// Original L58: Initializes { for 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', supplying the value that the following test logic will inspect or mutate.
  const { nodes, calls, sourceShift } = await boot();
// Original L59: In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-results').hidden, false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nodes.get('review-results').hidden, false);
// Original L60: In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(calls.length, 6);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(calls.length, 6);
// Original L61: In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-metrics')), /4.00 h/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(allText(nodes.get('review-metrics')), /4.00 h/);
// Original L62: In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-metrics')), /0.00 h/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(allText(nodes.get('review-metrics')), /0.00 h/);
// Original L63: In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-metrics')), /\$200.00/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(allText(nodes.get('review-metrics')), /\$200.00/);
// Original L64: In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-people')), /\$100.00/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(allText(nodes.get('review-people')), /\$100.00/);
// Original L65: In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-shifts')), /Active ledger/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(allText(nodes.get('review-shifts')), /Active ledger/);
// Original L66: In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-shifts')), /<script>Employee<\/script>/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(allText(nodes.get('review-shifts')), /<script>Employee<\/script>/);
// Original L67: In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sourceShift.paidHours, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(sourceShift.paidHours, 0);
// Original L68: In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sourceShift.isPaid, false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(sourceShift.isPaid, false);
// Original L69: Closes the fixture, callback, loop, or test block for 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes'.
});
// Original L70: Blank line separates related setup or assertions for readability.

// Original L71: Starts an isolated test case whose title states the behavior being specified: changing filters hides stale totals; invalid range displays an error instead of a result.
test('changing filters hides stale totals; invalid range displays an error instead of a result', async () => {
// Original L72: Initializes { for 'changing filters hides stale totals; invalid range displays an error instead of a result', supplying the value that the following test logic will inspect or mutate.
  const { nodes } = await boot();
// Original L73: Sets `nodes.get('review-start').value` (the value property of nodes.get('review-start')) to "2026-11-02".
  nodes.get('review-start').value = '2026-11-02';
// Original L74: Sets `nodes.get('review-end').value` (the value property of nodes.get('review-end')) to "2026-11-01".
  nodes.get('review-end').value = '2026-11-01';
// Original L75: Simulates the user/browser event in 'changing filters hides stale totals; invalid range displays an error instead of a result' so production event handlers run against the mock DOM.
  await nodes.get('review-start').dispatch('change');
// Original L76: In the test 'changing filters hides stale totals; invalid range displays an error instead of a result', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-results').hidden, true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nodes.get('review-results').hidden, true);
// Original L77: Simulates the user/browser event in 'changing filters hides stale totals; invalid range displays an error instead of a result' so production event handlers run against the mock DOM.
  await nodes.get('review-filters').dispatch('submit');
// Original L78: In the test 'changing filters hides stale totals; invalid range displays an error instead of a result', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-error').hidden, false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nodes.get('review-error').hidden, false);
// Original L79: In the test 'changing filters hides stale totals; invalid range displays an error instead of a result', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-results').hidden, true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nodes.get('review-results').hidden, true);
// Original L80: Closes the fixture, callback, loop, or test block for 'changing filters hides stale totals; invalid range displays an error instead of a result'.
});
// Original L81: Blank line separates related setup or assertions for readability.

// Original L82: Starts an isolated test case whose title states the behavior being specified: load failure never presents partial balances or shift totals.
test('load failure never presents partial balances or shift totals', async () => {
// Original L83: Builds {, the concrete fixture collection/object used as input for 'load failure never presents partial balances or shift totals'; its fields model the relevant domain records or DOM state.
  const { nodes } = await boot({ fail: true });
// Original L84: In the test 'load failure never presents partial balances or shift totals', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-results').hidden, true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nodes.get('review-results').hidden, true);
// Original L85: In the test 'load failure never presents partial balances or shift totals', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-error').hidden, false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nodes.get('review-error').hidden, false);
// Original L86: In the test 'load failure never presents partial balances or shift totals', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(nodes.get('review-error').textContent, /No totals are shown/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(nodes.get('review-error').textContent, /No totals are shown/);
// Original L87: In the test 'load failure never presents partial balances or shift totals', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-apply').disabled, true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nodes.get('review-apply').disabled, true);
// Original L88: In the test 'load failure never presents partial balances or shift totals', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-refresh').disabled, false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nodes.get('review-refresh').disabled, false);
// Original L89: Closes the fixture, callback, loop, or test block for 'load failure never presents partial balances or shift totals'.
});
// Original L90: Blank line separates related setup or assertions for readability.

// Original L91: Starts an isolated test case whose title states the behavior being specified: failed refresh hides the previous successful snapshot and offers retry.
test('failed refresh hides the previous successful snapshot and offers retry', async () => {
// Original L92: Initializes { for 'failed refresh hides the previous successful snapshot and offers retry', supplying the value that the following test logic will inspect or mutate.
  const { nodes, store } = await boot();
// Original L93: Begins a callback used by the 'failed refresh hides the previous successful snapshot and offers retry' test to model an event, loader, or transformation.
  store.loadLedger = async () => { throw new Error('connection lost'); };
// Original L94: Simulates the user/browser event in 'failed refresh hides the previous successful snapshot and offers retry' so production event handlers run against the mock DOM.
  await nodes.get('review-refresh').dispatch('click');
// Original L95: In the test 'failed refresh hides the previous successful snapshot and offers retry', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-results').hidden, true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nodes.get('review-results').hidden, true);
// Original L96: In the test 'failed refresh hides the previous successful snapshot and offers retry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(nodes.get('review-error').textContent, /connection lost/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(nodes.get('review-error').textContent, /connection lost/);
// Original L97: In the test 'failed refresh hides the previous successful snapshot and offers retry', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-refresh').disabled, false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nodes.get('review-refresh').disabled, false);
// Original L98: Closes the fixture, callback, loop, or test block for 'failed refresh hides the previous successful snapshot and offers retry'.
});
// Original L99: Blank line separates related setup or assertions for readability.

// Original L100: Starts an isolated test case whose title states the behavior being specified: date shortcut refreshes local results without making new data requests.
test('date shortcut refreshes local results without making new data requests', async () => {
// Original L101: Initializes { for 'date shortcut refreshes local results without making new data requests', supplying the value that the following test logic will inspect or mutate.
  const { nodes, calls } = await boot();
// Original L102: Simulates the user/browser event in 'date shortcut refreshes local results without making new data requests' so production event handlers run against the mock DOM.
  await nodes.get('review-last-week').dispatch('click');
// Original L103: In the test 'date shortcut refreshes local results without making new data requests', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(calls.length, 6);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(calls.length, 6);
// Original L104: In the test 'date shortcut refreshes local results without making new data requests', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-results').hidden, false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nodes.get('review-results').hidden, false);
// Original L105: In the test 'date shortcut refreshes local results without making new data requests', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-shifts')), /No completed shifts/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(allText(nodes.get('review-shifts')), /No completed shifts/);
// Original L106: In the test 'date shortcut refreshes local results without making new data requests', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-people')), /\$100.00/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(allText(nodes.get('review-people')), /\$100.00/);
// Original L107: Closes the fixture, callback, loop, or test block for 'date shortcut refreshes local results without making new data requests'.
});
// Original L108: Blank line separates related setup or assertions for readability.

// Original L109: Starts an isolated test case whose title states the behavior being specified: pending archives warn without attempting to finish archiving.
test('pending archives warn without attempting to finish archiving', async () => {
// Original L110: Initializes { for 'pending archives warn without attempting to finish archiving', supplying the value that the following test logic will inspect or mutate.
  const { nodes, store, calls } = await boot();
// Original L111: Sets `store.ledgerArchives` (the ledger archives property of store) to an array containing an object with fields employeeId: "e1"; status: "pending".
  store.ledgerArchives = [{ employeeId: 'e1', status: 'pending' }];
// Original L112: Simulates the user/browser event in 'pending archives warn without attempting to finish archiving' so production event handlers run against the mock DOM.
  await nodes.get('review-filters').dispatch('submit');
// Original L113: In the test 'pending archives warn without attempting to finish archiving', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(nodes.get('review-warnings').textContent, /pending/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(nodes.get('review-warnings').textContent, /pending/);
// Original L114: In the test 'pending archives warn without attempting to finish archiving', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-warnings').hidden, false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nodes.get('review-warnings').hidden, false);
// Original L115: In the test 'pending archives warn without attempting to finish archiving', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(calls.length, 6);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(calls.length, 6);
// Original L116: Closes the fixture, callback, loop, or test block for 'pending archives warn without attempting to finish archiving'.
});

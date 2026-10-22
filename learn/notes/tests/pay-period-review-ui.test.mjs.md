# tests/pay-period-review-ui.test.mjs

[Exact copy](../../original/tests/pay-period-review-ui.test.source.mjs)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import test from 'node:test';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 2

```text
import assert from 'node:assert/strict';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 3

```text
import vm from 'node:vm';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 4

```text
import { readFileSync } from 'node:fs';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 5

```text
import { buildPayPeriodReview, currentWeekRange } from '../scripts/pay-period-review.mjs';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 6

```text
import { loadPayPeriodReviewData } from '../scripts/pay-period-data.mjs';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 7

```text

```

Blank line separates related setup or assertions for readability.

### Line 8

```text
class Node {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 9

```text
  constructor(tag = 'div', text = '') {
```

Continues the surrounding JavaScript expression or argument list. This line contributes constructor(tag = 'div', text = '') {; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 10

```text
    this.tagName = tag; this.textContent = text; this.children = []; this.listeners = new Map();
```

Sets `this.tagName` (the tag name property of this) to `tag` (tag).

### Line 11

```text
    this.hidden = false; this.disabled = false; this.value = ''; this.className = '';
```

Sets `this.hidden` (the hidden property of this) to false.

### Line 12

```text
  }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 13

```text
  append(...nodes) { this.children.push(...nodes); }
```

Appends the expanded entries/properties from `nodes` (nodes) to `this.children` (the children property of this).

### Line 14

```text
  replaceChildren(...nodes) { this.children = nodes; }
```

Sets `this.children` (the children property of this) to `nodes` (nodes).

### Line 15

```text
  add(node) { this.append(node); }
```

Calls `this.append` with `node` (node).

### Line 16

```text
  get options() { return this.children; }
```

Returns `this.children` (the children property of this) to the caller and exits this function.

### Line 17

```text
  get selectedOptions() { return this.children.filter(node => node.value === this.value); }
```

Returns keeps only items of `this.children` (the children property of this) for which a callback taking node that checks that `node.value` (the value property of node) and `this.value` (the value property of this) have the same value and type returns truthy to the caller and exits this function.

### Line 18

```text
  addEventListener(type, callback) { this.listeners.set(type, [...(this.listeners.get(type) || []), callback]); }
```

Calls `this.listeners.set` with `type` (type); an array containing the expanded entries/properties from uses calls `this.listeners.get` with `type` (type) when it is truthy, otherwise falls back to an array containing , `callback` (callback).

### Line 19

```text
  async dispatch(type) { for (const callback of this.listeners.get(type) || []) await callback({ preventDefault() {} }); }
```

No value; stores the result in `callback`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 20

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 21

```text

```

Blank line separates related setup or assertions for readability.

### Line 22

```text
async function boot({ fail = false } = {}) {
```

Defines `boot` (boot), a reusable asynchronous function taking { fail = false } = {}. Its body runs when called, not when declared.

### Line 23

```text
  const ids = [...readFileSync(new URL('../html/pay-period-review.html', import.meta.url), 'utf8').matchAll(/id="([^"]+)"/g)].map(match => match[1]);
```

Builds ids, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 24

```text
  const nodes = new Map(ids.map(id => [id, new Node()]));
```

Creates nodes, a test-side collection used to record listeners, DOM properties, calls, or unique results while testing 'test setup'.

### Line 25

```text
  const document = new Node('document');
```

Initializes document for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 26

```text
  document.getElementById = id => nodes.get(id);
```

Sets `document.getElementById` (the get element by id property of document) to a callback taking id that calls `nodes.get` with `id` (id).

### Line 27

```text
  document.createElement = tag => new Node(tag);
```

Sets `document.createElement` (the create element property of document) to a callback taking tag that constructs a new instance of `Node` with `tag` (tag).

### Line 28

```text
  const now = new Date();
```

Sets now to a deterministic date/time fixture so 'test setup' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.

### Line 29

```text
  const shiftStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8);
```

Sets shiftStart to a deterministic date/time fixture so 'test setup' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.

### Line 30

```text
  const shiftEnd = new Date(shiftStart); shiftEnd.setHours(12);
```

Sets shiftEnd to a deterministic date/time fixture so 'test setup' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.

### Line 31

```text
  const employee = { id: 'e1', name: '<script>Employee</script>', wage: 20 };
```

Defines the test fixture/helper employee; its returned mock data represents the application state needed to exercise 'test setup'.

### Line 32

```text
  const customer = { id: 'c1', name: 'Test site', billingRate: 50 };
```

Defines the test fixture/helper customer; its returned mock data represents the application state needed to exercise 'test setup'.

### Line 33

```text
  const sourceShift = { id: 's1', employee, customer, clockInTime: shiftStart, clockOutTime: shiftEnd, breaks: [], paidHours: 0, isPaid: false };
```

Builds sourceShift, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 34

```text
  const calls = [];
```

Builds calls, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 35

```text
  const store = {
```

Builds store, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 36

```text
    employees: new Map([[employee.id, employee]]), shifts: [sourceShift], invoices: [],
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 37

```text
    ledger: { entries: [{ id: 'r1', employeeId: 'e1', type: 'normal', amount: 100, date: '2020-01-01', sourceShiftId: 's1' }] },
```

Sets the object field id using 'r1'. This field is read later through its property name.

### Line 38

```text
    ledgerArchiveRows: [], ledgerArchives: [], loadFailures: [],
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 39

```text
    init() { throw new Error('Must not initialize or archive'); },
```

Throws constructs a new instance of `Error` with "Must not initialize or archive"; normal execution stops until a matching catch handles it.

### Line 40

```text
    saveShift() { throw new Error('Must not write'); }
```

Throws constructs a new instance of `Error` with "Must not write"; normal execution stops until a matching catch handles it.

### Line 41

```text
  };
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 42

```text
  for (const method of ['loadEmployees', 'loadCustomers', 'loadShifts', 'loadInvoices', 'loadLedger', 'loadLedgerArchives']) {
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 43

```text
    store[method] = async () => { calls.push(method); };
```

Begins a callback used by the 'test setup' test to model an event, loader, or transformation.

### Line 44

```text
  }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 45

```text
  if (fail) store.loadLedger = async () => { store.loadFailures.push(new Error('offline')); };
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 46

```text
  const code = readFileSync(new URL('../scripts/pay-period-review.js', import.meta.url), 'utf8').replace(/^import .*;\n/gm, '');
```

Initializes code for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 47

```text
  vm.runInNewContext(code, {
```

Calls `vm.runInNewContext` with `code` (code); an object with fields document: `document` (document); store: `store` (store); buildPayPeriodReview: `buildPayPeriodReview` (build pay period review); currentWeekRange: `currentWeekRange` (current week range); loadPayPeriodReviewData: `loadPayPeriodReviewData` (load pay period review data); Intl: `Intl` (intl); and further fields.

### Line 48

```text
    document, store, buildPayPeriodReview, currentWeekRange, loadPayPeriodReviewData, Intl, Date, console,
```

Sets the object field Intl using Intl. This field is read later through its property name.

### Line 49

```text
    Option: function(text, value) { const option = new Node('option', text); option.value = value; return option; }
```

Constructs a new instance of `Node` with "option"; `text` (text); stores the result in `option`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 50

```text
  });
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 51

```text
  await document.dispatch('DOMContentLoaded');
```

Simulates the user/browser event in 'test setup' so production event handlers run against the mock DOM.

### Line 52

```text
  return { nodes, store, calls, sourceShift };
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 53

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 54

```text

```

Blank line separates related setup or assertions for readability.

### Line 55

```text
const allText = node => [node.textContent, ...node.children.map(allText)].join(' ');
```

Builds allText, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 56

```text

```

Blank line separates related setup or assertions for readability.

### Line 57

```text
test('review renders synthetic shifts, honors zero pay hours, and loads without init or writes', async () => {
```

Starts an isolated test case whose title states the behavior being specified: review renders synthetic shifts, honors zero pay hours, and loads without init or writes.

### Line 58

```text
  const { nodes, calls, sourceShift } = await boot();
```

Initializes { for 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', supplying the value that the following test logic will inspect or mutate.

### Line 59

```text
  assert.equal(nodes.get('review-results').hidden, false);
```

In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-results').hidden, false);; the fixture therefore checks the concrete boundary/result contract.

### Line 60

```text
  assert.equal(calls.length, 6);
```

In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(calls.length, 6);; the fixture therefore checks the concrete boundary/result contract.

### Line 61

```text
  assert.match(allText(nodes.get('review-metrics')), /4.00 h/);
```

In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-metrics')), /4.00 h/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 62

```text
  assert.match(allText(nodes.get('review-metrics')), /0.00 h/);
```

In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-metrics')), /0.00 h/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 63

```text
  assert.match(allText(nodes.get('review-metrics')), /\$200.00/);
```

In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-metrics')), /\$200.00/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 64

```text
  assert.match(allText(nodes.get('review-people')), /\$100.00/);
```

In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-people')), /\$100.00/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 65

```text
  assert.match(allText(nodes.get('review-shifts')), /Active ledger/);
```

In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-shifts')), /Active ledger/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 66

```text
  assert.match(allText(nodes.get('review-shifts')), /<script>Employee<\/script>/);
```

In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-shifts')), /<script>Employee<\/script>/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 67

```text
  assert.equal(sourceShift.paidHours, 0);
```

In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sourceShift.paidHours, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 68

```text
  assert.equal(sourceShift.isPaid, false);
```

In the test 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sourceShift.isPaid, false);; the fixture therefore checks the concrete boundary/result contract.

### Line 69

```text
});
```

Closes the fixture, callback, loop, or test block for 'review renders synthetic shifts, honors zero pay hours, and loads without init or writes'.

### Line 70

```text

```

Blank line separates related setup or assertions for readability.

### Line 71

```text
test('changing filters hides stale totals; invalid range displays an error instead of a result', async () => {
```

Starts an isolated test case whose title states the behavior being specified: changing filters hides stale totals; invalid range displays an error instead of a result.

### Line 72

```text
  const { nodes } = await boot();
```

Initializes { for 'changing filters hides stale totals; invalid range displays an error instead of a result', supplying the value that the following test logic will inspect or mutate.

### Line 73

```text
  nodes.get('review-start').value = '2026-11-02';
```

Sets `nodes.get('review-start').value` (the value property of nodes.get('review-start')) to "2026-11-02".

### Line 74

```text
  nodes.get('review-end').value = '2026-11-01';
```

Sets `nodes.get('review-end').value` (the value property of nodes.get('review-end')) to "2026-11-01".

### Line 75

```text
  await nodes.get('review-start').dispatch('change');
```

Simulates the user/browser event in 'changing filters hides stale totals; invalid range displays an error instead of a result' so production event handlers run against the mock DOM.

### Line 76

```text
  assert.equal(nodes.get('review-results').hidden, true);
```

In the test 'changing filters hides stale totals; invalid range displays an error instead of a result', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-results').hidden, true);; the fixture therefore checks the concrete boundary/result contract.

### Line 77

```text
  await nodes.get('review-filters').dispatch('submit');
```

Simulates the user/browser event in 'changing filters hides stale totals; invalid range displays an error instead of a result' so production event handlers run against the mock DOM.

### Line 78

```text
  assert.equal(nodes.get('review-error').hidden, false);
```

In the test 'changing filters hides stale totals; invalid range displays an error instead of a result', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-error').hidden, false);; the fixture therefore checks the concrete boundary/result contract.

### Line 79

```text
  assert.equal(nodes.get('review-results').hidden, true);
```

In the test 'changing filters hides stale totals; invalid range displays an error instead of a result', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-results').hidden, true);; the fixture therefore checks the concrete boundary/result contract.

### Line 80

```text
});
```

Closes the fixture, callback, loop, or test block for 'changing filters hides stale totals; invalid range displays an error instead of a result'.

### Line 81

```text

```

Blank line separates related setup or assertions for readability.

### Line 82

```text
test('load failure never presents partial balances or shift totals', async () => {
```

Starts an isolated test case whose title states the behavior being specified: load failure never presents partial balances or shift totals.

### Line 83

```text
  const { nodes } = await boot({ fail: true });
```

Builds {, the concrete fixture collection/object used as input for 'load failure never presents partial balances or shift totals'; its fields model the relevant domain records or DOM state.

### Line 84

```text
  assert.equal(nodes.get('review-results').hidden, true);
```

In the test 'load failure never presents partial balances or shift totals', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-results').hidden, true);; the fixture therefore checks the concrete boundary/result contract.

### Line 85

```text
  assert.equal(nodes.get('review-error').hidden, false);
```

In the test 'load failure never presents partial balances or shift totals', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-error').hidden, false);; the fixture therefore checks the concrete boundary/result contract.

### Line 86

```text
  assert.match(nodes.get('review-error').textContent, /No totals are shown/);
```

In the test 'load failure never presents partial balances or shift totals', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(nodes.get('review-error').textContent, /No totals are shown/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 87

```text
  assert.equal(nodes.get('review-apply').disabled, true);
```

In the test 'load failure never presents partial balances or shift totals', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-apply').disabled, true);; the fixture therefore checks the concrete boundary/result contract.

### Line 88

```text
  assert.equal(nodes.get('review-refresh').disabled, false);
```

In the test 'load failure never presents partial balances or shift totals', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-refresh').disabled, false);; the fixture therefore checks the concrete boundary/result contract.

### Line 89

```text
});
```

Closes the fixture, callback, loop, or test block for 'load failure never presents partial balances or shift totals'.

### Line 90

```text

```

Blank line separates related setup or assertions for readability.

### Line 91

```text
test('failed refresh hides the previous successful snapshot and offers retry', async () => {
```

Starts an isolated test case whose title states the behavior being specified: failed refresh hides the previous successful snapshot and offers retry.

### Line 92

```text
  const { nodes, store } = await boot();
```

Initializes { for 'failed refresh hides the previous successful snapshot and offers retry', supplying the value that the following test logic will inspect or mutate.

### Line 93

```text
  store.loadLedger = async () => { throw new Error('connection lost'); };
```

Begins a callback used by the 'failed refresh hides the previous successful snapshot and offers retry' test to model an event, loader, or transformation.

### Line 94

```text
  await nodes.get('review-refresh').dispatch('click');
```

Simulates the user/browser event in 'failed refresh hides the previous successful snapshot and offers retry' so production event handlers run against the mock DOM.

### Line 95

```text
  assert.equal(nodes.get('review-results').hidden, true);
```

In the test 'failed refresh hides the previous successful snapshot and offers retry', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-results').hidden, true);; the fixture therefore checks the concrete boundary/result contract.

### Line 96

```text
  assert.match(nodes.get('review-error').textContent, /connection lost/);
```

In the test 'failed refresh hides the previous successful snapshot and offers retry', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(nodes.get('review-error').textContent, /connection lost/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 97

```text
  assert.equal(nodes.get('review-refresh').disabled, false);
```

In the test 'failed refresh hides the previous successful snapshot and offers retry', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-refresh').disabled, false);; the fixture therefore checks the concrete boundary/result contract.

### Line 98

```text
});
```

Closes the fixture, callback, loop, or test block for 'failed refresh hides the previous successful snapshot and offers retry'.

### Line 99

```text

```

Blank line separates related setup or assertions for readability.

### Line 100

```text
test('date shortcut refreshes local results without making new data requests', async () => {
```

Starts an isolated test case whose title states the behavior being specified: date shortcut refreshes local results without making new data requests.

### Line 101

```text
  const { nodes, calls } = await boot();
```

Initializes { for 'date shortcut refreshes local results without making new data requests', supplying the value that the following test logic will inspect or mutate.

### Line 102

```text
  await nodes.get('review-last-week').dispatch('click');
```

Simulates the user/browser event in 'date shortcut refreshes local results without making new data requests' so production event handlers run against the mock DOM.

### Line 103

```text
  assert.equal(calls.length, 6);
```

In the test 'date shortcut refreshes local results without making new data requests', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(calls.length, 6);; the fixture therefore checks the concrete boundary/result contract.

### Line 104

```text
  assert.equal(nodes.get('review-results').hidden, false);
```

In the test 'date shortcut refreshes local results without making new data requests', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-results').hidden, false);; the fixture therefore checks the concrete boundary/result contract.

### Line 105

```text
  assert.match(allText(nodes.get('review-shifts')), /No completed shifts/);
```

In the test 'date shortcut refreshes local results without making new data requests', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-shifts')), /No completed shifts/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 106

```text
  assert.match(allText(nodes.get('review-people')), /\$100.00/);
```

In the test 'date shortcut refreshes local results without making new data requests', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(allText(nodes.get('review-people')), /\$100.00/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 107

```text
});
```

Closes the fixture, callback, loop, or test block for 'date shortcut refreshes local results without making new data requests'.

### Line 108

```text

```

Blank line separates related setup or assertions for readability.

### Line 109

```text
test('pending archives warn without attempting to finish archiving', async () => {
```

Starts an isolated test case whose title states the behavior being specified: pending archives warn without attempting to finish archiving.

### Line 110

```text
  const { nodes, store, calls } = await boot();
```

Initializes { for 'pending archives warn without attempting to finish archiving', supplying the value that the following test logic will inspect or mutate.

### Line 111

```text
  store.ledgerArchives = [{ employeeId: 'e1', status: 'pending' }];
```

Sets `store.ledgerArchives` (the ledger archives property of store) to an array containing an object with fields employeeId: "e1"; status: "pending".

### Line 112

```text
  await nodes.get('review-filters').dispatch('submit');
```

Simulates the user/browser event in 'pending archives warn without attempting to finish archiving' so production event handlers run against the mock DOM.

### Line 113

```text
  assert.match(nodes.get('review-warnings').textContent, /pending/);
```

In the test 'pending archives warn without attempting to finish archiving', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(nodes.get('review-warnings').textContent, /pending/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 114

```text
  assert.equal(nodes.get('review-warnings').hidden, false);
```

In the test 'pending archives warn without attempting to finish archiving', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nodes.get('review-warnings').hidden, false);; the fixture therefore checks the concrete boundary/result contract.

### Line 115

```text
  assert.equal(calls.length, 6);
```

In the test 'pending archives warn without attempting to finish archiving', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(calls.length, 6);; the fixture therefore checks the concrete boundary/result contract.

### Line 116

```text
});
```

Closes the fixture, callback, loop, or test block for 'pending archives warn without attempting to finish archiving'.

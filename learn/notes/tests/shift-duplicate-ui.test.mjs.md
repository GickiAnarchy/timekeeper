# tests/shift-duplicate-ui.test.mjs

[Exact copy](../../original/tests/shift-duplicate-ui.test.source.mjs)

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

```

Blank line separates related setup or assertions for readability.

### Line 6

```text
class FakeElement {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 7

```text
  constructor(tag = 'div', ownerDocument = null) {
```

Continues the surrounding JavaScript expression or argument list. This line contributes constructor(tag = 'div', ownerDocument = null) {; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 8

```text
    this.tagName = tag.toUpperCase();
```

Sets `this.tagName` (the tag name property of this) to converts `tag` (tag) to uppercase text.

### Line 9

```text
    this.ownerDocument = ownerDocument;
```

Sets `this.ownerDocument` (the owner document property of this) to `ownerDocument` (owner document).

### Line 10

```text
    this.children = [];
```

Sets `this.children` (the children property of this) to an array containing .

### Line 11

```text
    this.parentElement = null;
```

Sets `this.parentElement` (the parent element property of this) to null.

### Line 12

```text
    this.listeners = new Map();
```

Sets `this.listeners` (the listeners property of this) to constructs a new instance of `Map` with no arguments.

### Line 13

```text
    this.attributes = new Map();
```

Sets `this.attributes` (the attributes property of this) to constructs a new instance of `Map` with no arguments.

### Line 14

```text
    this.dataset = {};
```

Sets `this.dataset` (the dataset property of this) to an object with fields .

### Line 15

```text
    this.style = { setProperty() {}, removeProperty() {} };
```

Sets `this.style` (the style property of this) to an object with fields setProperty: a callback taking no parameters that runs its enclosed statements; removeProperty: a callback taking no parameters that runs its enclosed statements.

### Line 16

```text
    this.className = '';
```

Sets `this.className` (the class name property of this) to "".

### Line 17

```text
    this.textContent = '';
```

Sets `this.textContent` (the text content property of this) to "".

### Line 18

```text
    this.value = '';
```

Sets `this.value` (the value property of this) to "".

### Line 19

```text
    this.checked = false;
```

Sets `this.checked` (the checked property of this) to false.

### Line 20

```text
    this.disabled = false;
```

Sets `this.disabled` (the disabled property of this) to false.

### Line 21

```text
    this.hidden = false;
```

Sets `this.hidden` (the hidden property of this) to false.

### Line 22

```text
    this.open = false;
```

Sets `this.open` (the open property of this) to false.

### Line 23

```text
  }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 24

```text
  get classList() {
```

Mutates or reads mocked DOM style/class state in 'test setup' to verify the visible/accessibility effect of the production handler.

### Line 25

```text
    return {
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 26

```text
      contains: name => this.className.split(/\s+/).includes(name),
```

Defines field contains as a callback taking name that checks whether splits `this.className` (the class name property of this) into an array using separator the regular expression `/\s+/` used to match text contains `name` (name).

### Line 27

```text
      add: (...names) => { this.className = [...new Set(`${this.className} ${names.join(' ')}`.trim().split(/\s+/))].join(' '); },
```

Begins a callback used by the 'test setup' test to model an event, loader, or transformation.

### Line 28

```text
      remove: (...names) => { this.className = this.className.split(/\s+/).filter(name => !names.includes(name)).join(' '); }
```

Begins a callback used by the 'test setup' test to model an event, loader, or transformation.

### Line 29

```text
    };
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 30

```text
  }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 31

```text
  get options() { return this.children; }
```

Returns `this.children` (the children property of this) to the caller and exits this function.

### Line 32

```text
  append(...nodes) { nodes.flat().forEach(node => { if (node) { node.parentElement = this; this.children.push(node); } }); }
```

Begins a callback used by the 'test setup' test to model an event, loader, or transformation.

### Line 33

```text
  appendChild(node) { this.append(node); return node; }
```

Returns `node` (node) to the caller and exits this function.

### Line 34

```text
  replaceChildren(...nodes) { this.children = []; this.append(...nodes); }
```

Sets `this.children` (the children property of this) to an array containing .

### Line 35

```text
  addEventListener(type, callback) { (this.listeners.get(type) || (this.listeners.set(type, []), this.listeners.get(type))).push(callback); }
```

Appends `callback` (callback) to uses calls `this.listeners.get` with `type` (type) when it is truthy, otherwise falls back to calls `this.listeners.set` with `type` (type); an array containing , then calls `this.listeners.get` with `type` (type).

### Line 36

```text
  async dispatchEvent(event) {
```

Simulates the user/browser event in 'test setup' so production event handlers run against the mock DOM.

### Line 37

```text
    event.target ||= this;
```

Updates `event.target` (the target property of event) using this object instance.

### Line 38

```text
    const results = (this.listeners.get(event.type) || []).map(callback => callback(event));
```

Builds results, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 39

```text
    await Promise.all(results);
```

Waits for the asynchronous operation in 'test setup' to finish before subsequent assertions inspect its effects.

### Line 40

```text
    if (this.parentElement && !event.cancelBubble) await this.parentElement.dispatchEvent(event);
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 41

```text
  }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 42

```text
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
```

Calls `this.attributes.set` with `name` (name); converts `value` (value) to text.

### Line 43

```text
  insertAdjacentHTML() {}
```

Continues the surrounding JavaScript expression or argument list. This line contributes insertAdjacentHTML() {}; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 44

```text
  showModal() { this.open = true; }
```

Sets `this.open` (the open property of this) to true.

### Line 45

```text
  close() { this.open = false; void this.dispatchEvent({ type: 'close', target: this }); }
```

Simulates the user/browser event in 'test setup' so production event handlers run against the mock DOM.

### Line 46

```text
  focus() { if (this.ownerDocument) this.ownerDocument.activeElement = this; }
```

Checks whether `this.ownerDocument` (the owner document property of this); runs the following statement/block only when truthy.

### Line 47

```text
  contains(node) { return node === this || this.children.some(child => child.contains?.(node)); }
```

Returns uses checks that `node` (node) and this object instance have the same value and type when it is truthy, otherwise falls back to checks whether any item of `this.children` (the children property of this) passes a callback taking child that calls `child.contains` with `node` (node) only if the function exists; optional chaining stops with undefined if a guarded receiver is null or undefined to the caller and exits this function.

### Line 48

```text
  querySelectorAll(selector) {
```

Continues the surrounding JavaScript expression or argument list. This line contributes querySelectorAll(selector) {; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 49

```text
    const matches = [];
```

Builds matches, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 50

```text
    const match = node => selector.startsWith('.')
```

Initializes match for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 51

```text
      ? node.classList.contains(selector.slice(1))
```

Mutates or reads mocked DOM style/class state in 'test setup' to verify the visible/accessibility effect of the production handler.

### Line 52

```text
      : selector.startsWith('#') ? node.attributes.get('id') === selector.slice(1) : false;
```

Checks calls `selector.startsWith` with "#"; if true chooses checks that calls `node.attributes.get` with "id" and copies a portion of `selector` (selector), from 1 to the end have the same value and type, otherwise false.

### Line 53

```text
    const visit = node => { node.children.forEach(child => { if (match(child)) matches.push(child); visit(child); }); };
```

Builds visit, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 54

```text
    visit(this);
```

Calls `visit` with this object instance.

### Line 55

```text
    return matches;
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 56

```text
  }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 57

```text
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
```

Returns uses the entry at index/key 0 in finds all descendants of this object instance matching CSS selector `selector` (selector) when it is truthy, otherwise falls back to null to the caller and exits this function.

### Line 58

```text
  closest(selector) {
```

Continues the surrounding JavaScript expression or argument list. This line contributes closest(selector) {; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 59

```text
    let node = this;
```

Initializes node for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 60

```text
    while (node) {
```

Repeats its body while `node` (node) remains truthy.

### Line 61

```text
      if (selector === 'button[data-id]' && node.tagName === 'BUTTON' && node.dataset.id) return node;
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 62

```text
      if (selector === '.remove-break-button' && node.classList.contains('remove-break-button')) return node;
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 63

```text
      node = node.parentElement;
```

Sets `node` (node) to `node.parentElement` (the parent element property of node).

### Line 64

```text
    }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 65

```text
    return null;
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 66

```text
  }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 67

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 68

```text

```

Blank line separates related setup or assertions for readability.

### Line 69

```text
class FakeDocument extends FakeElement {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 70

```text
  constructor() { super('#document', null); this.ownerDocument = this; this.byId = new Map(); this.documentElement = { clientHeight: 800 }; this.activeElement = null; }
```

Calls `super` with "#document"; null.

### Line 71

```text
  createElement(tag) { return new FakeElement(tag, this); }
```

Returns constructs a new instance of `FakeElement` with `tag` (tag); this object instance to the caller and exits this function.

### Line 72

```text
  getElementById(id) { return this.byId.get(id) || null; }
```

Returns uses calls `this.byId.get` with `id` (id) when it is truthy, otherwise falls back to null to the caller and exits this function.

### Line 73

```text
  register(id, tag = 'div') { const element = this.createElement(tag); element.setAttribute('id', id); this.byId.set(id, element); return element; }
```

Calls `this.createElement` with `tag` (tag); stores the result in `element`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 74

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 75

```text

```

Blank line separates related setup or assertions for readability.

### Line 76

```text
function makeFixture() {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 77

```text
  const document = new FakeDocument();
```

Initializes document for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 78

```text
  for (const [id, tag] of [
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 79

```text
    ['shiftList', 'ul'], ['emp-filter', 'select'], ['cust-filter', 'select'], ['paid-filter', 'input'],
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 80

```text
    ['add-button', 'button'], ['viewShiftModal', 'dialog'], ['shift-emp', 'select'], ['shift-cust', 'select'],
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 81

```text
    ['shift-start', 'input'], ['shift-end', 'input'], ['total-hours', 'input'], ['paid-hours', 'input'],
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 82

```text
    ['note-view', 'textarea'], ['paid-checkbox-view', 'input'], ['breaks-list', 'ul'], ['shift-form-error', 'p'],
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 83

```text
    ['ok-btn', 'button'], ['cancel-btn', 'button'], ['add-break-button', 'button'], ['shift-modal-title', 'h2'],
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 84

```text
    ['shift-duplicate-hint', 'p']
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 85

```text
  ]) document.register(id, tag);
```

Calls `document.register` with `id` (id); `tag` (tag).

### Line 86

```text
  const sourceEmployee = { id: 'source', name: 'Source', wage: 20 };
```

Builds sourceEmployee, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 87

```text
  const targetEmployee = { id: 'target', name: 'Target', wage: 30 };
```

Builds targetEmployee, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 88

```text
  const customer = { id: 'customer', name: 'Customer' };
```

Defines the test fixture/helper customer; its returned mock data represents the application state needed to exercise 'test setup'.

### Line 89

```text
  const source = {
```

Builds source, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 90

```text
    id: 'source-shift', employee: sourceEmployee, customer, note: 'Keep note', isPaid: true, paidHours: 0,
```

Sets the object field customer using customer. This field is read later through its property name.

### Line 91

```text
    breaks: [], clockInTime: new Date('2026-10-09T09:00:00Z'), clockOutTime: new Date('2026-10-09T12:00:00Z'),
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 92

```text
    isComplete: true, getHoursWorked: () => 3, getPaidHours: () => 0,
```

Continues the body of callback function. The surrounding braces keep these statements in the same callable unit.

### Line 93

```text
    duplicateFor(employee) {
```

Defines field duplicateFor as a callback taking employee that runs its enclosed statements.

### Line 94

```text
      return { id: 'duplicate-shift', employee, customer, note: this.note, isPaid: false, paidHours: this.paidHours,
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 95

```text
        breaks: [], clockInTime: new Date(this.clockInTime), clockOutTime: new Date(this.clockOutTime),
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 96

```text
        isComplete: true, getHoursWorked: () => 3, getPaidHours: () => 0 };
```

Continues the body of callback function. The surrounding braces keep these statements in the same callable unit.

### Line 97

```text
    }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 98

```text
  };
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 99

```text
  const writes = { save: [], update: [] };
```

Builds writes, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 100

```text
  const store = {
```

Builds store, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 101

```text
    employees: new Map([[sourceEmployee.id, sourceEmployee], [targetEmployee.id, targetEmployee]]),
```

Defines field employees as constructs a new instance of `Map` with an array containing an array containing `sourceEmployee.id` (the id property of sourceEmployee), `sourceEmployee` (source employee), an array containing `targetEmployee.id` (the id property of targetEmployee), `targetEmployee` (target employee).

### Line 102

```text
    customers: new Map([[customer.id, customer]]),
```

Defines field customers as constructs a new instance of `Map` with an array containing an array containing `customer.id` (the id property of customer), `customer` (customer).

### Line 103

```text
    shifts: [source],
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 104

```text
    async init() {},
```

Defines field init as a callback taking no parameters that runs its enclosed statements.

### Line 105

```text
    async saveShift(shift) { writes.save.push(shift); },
```

Appends `shift` (shift) to `writes.save` (the save property of writes).

### Line 106

```text
    async updateShift(...args) { writes.update.push(args); }
```

Appends `args` (args) to `writes.update` (the update property of writes).

### Line 107

```text
  };
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 108

```text
  const populate = select => {
```

Builds populate, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 109

```text
    for (const employee of store.employees.values()) { const option = document.createElement('option'); option.value = employee.id; select.appendChild(option); }
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 110

```text
  };
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 111

```text
  const populateCustomers = select => { const option = document.createElement('option'); option.value = customer.id; select.appendChild(option); };
```

Builds populateCustomers, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 112

```text
  const window = { document, innerHeight: 800, visualViewport: null, addEventListener() {}, alert: message => { window.alerts.push(message); }, confirm: () => true, alerts: [] };
```

Builds window, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 113

```text
  return { document, window, store, source, targetEmployee, writes };
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 114

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 115

```text

```

Blank line separates related setup or assertions for readability.

### Line 116

```text
async function boot(fixture) {
```

Defines `boot` (boot), a reusable asynchronous function taking fixture. Its body runs when called, not when declared.

### Line 117

```text
  const source = readFileSync(new URL('../scripts/shifts.js', import.meta.url), 'utf8');
```

Initializes source for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 118

```text
  const script = source.split('\n').slice(8).join('\n');
```

Initializes script for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 119

```text
  vm.runInNewContext(script, {
```

Calls `vm.runInNewContext` with `script` (script); an object with fields console: `console` (console); Date: `Date` (date); document: `fixture.document` (the document property of fixture); window: `fixture.window` (the window property of fixture); store: `fixture.store` (the store property of fixture); populateEmployeeDropdowns: `fixture.populate` (the populate property of fixture); and further fields.

### Line 120

```text
    console,
```

Sets the object field console using console. This field is read later through its property name.

### Line 121

```text
    Date,
```

Sets the object field Date using Date. This field is read later through its property name.

### Line 122

```text
    document: fixture.document,
```

Defines field document as `fixture.document` (the document property of fixture).

### Line 123

```text
    window: fixture.window,
```

Defines field window as `fixture.window` (the window property of fixture).

### Line 124

```text
    store: fixture.store,
```

Defines field store as `fixture.store` (the store property of fixture).

### Line 125

```text
    populateEmployeeDropdowns: fixture.populate,
```

Defines field populateEmployeeDropdowns as `fixture.populate` (the populate property of fixture).

### Line 126

```text
    populateCustomerDropdowns: select => {
```

Begins a callback used by the 'test setup' test to model an event, loader, or transformation.

### Line 127

```text
      const option = fixture.document.createElement('option');
```

Initializes option for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 128

```text
      option.value = 'customer';
```

Sets `option.value` (the value property of option) to "customer".

### Line 129

```text
      select.appendChild(option);
```

Inserts `option` (option) as the last child of `select` (select).

### Line 130

```text
    },
```

Closes callback function. Control continues after this block.

### Line 131

```text
    WorkShift: class {},
```

Defines field WorkShift as `class {}`.

### Line 132

```text
    resetShiftDialogViewport() {},
```

Defines field resetShiftDialogViewport as a callback taking no parameters that runs its enclosed statements.

### Line 133

```text
    syncShiftDialogViewport() {},
```

Defines field syncShiftDialogViewport as a callback taking no parameters that runs its enclosed statements.

### Line 134

```text
    setTimeout
```

Sets the object field setTimeout using setTimeout. This field is read later through its property name.

### Line 135

```text
  });
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 136

```text
  await fixture.document.dispatchEvent({ type: 'DOMContentLoaded' });
```

Simulates the user/browser event in 'test setup' so production event handlers run against the mock DOM.

### Line 137

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 138

```text

```

Blank line separates related setup or assertions for readability.

### Line 139

```text
async function click(element) { await element.dispatchEvent({ type: 'click', target: element }); }
```

Simulates the user/browser event in 'test setup' so production event handlers run against the mock DOM.

### Line 140

```text

```

Blank line separates related setup or assertions for readability.

### Line 141

```text
test('duplicate UI requires a target, cancel does not write, and saves one unpaid copy', async () => {
```

Starts an isolated test case whose title states the behavior being specified: duplicate UI requires a target, cancel does not write, and saves one unpaid copy.

### Line 142

```text
  const fixture = makeFixture();
```

Defines the test fixture/helper fixture; its returned mock data represents the application state needed to exercise 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy'.

### Line 143

```text
  fixture.populate = select => { for (const employee of fixture.store.employees.values()) { const option = fixture.document.createElement('option'); option.value = employee.id; select.appendChild(option); } };
```

Begins a callback used by the 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy' test to model an event, loader, or transformation.

### Line 144

```text
  await boot(fixture);
```

Waits for the asynchronous operation in 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy' to finish before subsequent assertions inspect its effects.

### Line 145

```text
  const list = fixture.document.getElementById('shiftList');
```

Initializes list for 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', supplying the value that the following test logic will inspect or mutate.

### Line 146

```text
  assert.equal(list.children.length, 1);
```

In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(list.children.length, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 147

```text
  assert.equal(list.querySelector('.duplicate-btn').className, 'duplicate-btn');
```

In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(list.querySelector('.duplicate-btn').className, 'duplicate-btn');; the fixture therefore checks the concrete boundary/result contract.

### Line 148

```text
  assert.equal(list.querySelector('.duplicate-btn').dataset.id, 'source-shift');
```

In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(list.querySelector('.duplicate-btn').dataset.id, 'source-shift');; the fixture therefore checks the concrete boundary/result contract.

### Line 149

```text
  assert.equal(list.listeners.get('click').length, 1);
```

In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(list.listeners.get('click').length, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 150

```text
  await click(list.querySelector('.duplicate-btn'));
```

Waits for the asynchronous operation in 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy' to finish before subsequent assertions inspect its effects.

### Line 151

```text
  const empSelect = fixture.document.getElementById('shift-emp');
```

Initializes empSelect for 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', supplying the value that the following test logic will inspect or mutate.

### Line 152

```text
  const modal = fixture.document.getElementById('viewShiftModal');
```

Initializes modal for 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', supplying the value that the following test logic will inspect or mutate.

### Line 153

```text
  assert.equal(modal.open, true);
```

In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(modal.open, true);; the fixture therefore checks the concrete boundary/result contract.

### Line 154

```text
  assert.equal(empSelect.value, '', 'duplicate dialog must start without a target selection');
```

In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(empSelect.value, '', 'duplicate dialog must start without a target selection');; the fixture therefore checks the concrete boundary/result contract.

### Line 155

```text
  await click(fixture.document.getElementById('ok-btn'));
```

Waits for the asynchronous operation in 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy' to finish before subsequent assertions inspect its effects.

### Line 156

```text
  assert.match(fixture.document.getElementById('shift-form-error').textContent, /Choose an employee/);
```

In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(fixture.document.getElementById('shift-form-error').textContent, /Choose an employee/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 157

```text
  assert.equal(fixture.writes.save.length, 0);
```

In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.save.length, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 158

```text
  await click(fixture.document.getElementById('cancel-btn'));
```

Waits for the asynchronous operation in 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy' to finish before subsequent assertions inspect its effects.

### Line 159

```text
  assert.equal(fixture.writes.save.length, 0);
```

In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.save.length, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 160

```text
  assert.equal(modal.open, false);
```

In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(modal.open, false);; the fixture therefore checks the concrete boundary/result contract.

### Line 161

```text

```

Blank line separates related setup or assertions for readability.

### Line 162

```text
  await click(list.querySelector('.duplicate-btn'));
```

Waits for the asynchronous operation in 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy' to finish before subsequent assertions inspect its effects.

### Line 163

```text
  empSelect.value = 'target';
```

Sets `empSelect.value` (the value property of empSelect) to "target".

### Line 164

```text
  await click(fixture.document.getElementById('ok-btn'));
```

Waits for the asynchronous operation in 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy' to finish before subsequent assertions inspect its effects.

### Line 165

```text
  assert.equal(fixture.writes.save.length, 1);
```

In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.save.length, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 166

```text
  assert.equal(fixture.writes.save[0].employee.id, 'target');
```

In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.save[0].employee.id, 'target');; the fixture therefore checks the concrete boundary/result contract.

### Line 167

```text
  assert.equal(fixture.writes.save[0].isPaid, false);
```

In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.save[0].isPaid, false);; the fixture therefore checks the concrete boundary/result contract.

### Line 168

```text
  assert.equal(fixture.writes.save[0].id, 'duplicate-shift');
```

In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.save[0].id, 'duplicate-shift');; the fixture therefore checks the concrete boundary/result contract.

### Line 169

```text
  assert.equal(fixture.writes.update.length, 0);
```

In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.update.length, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 170

```text
});
```

Closes the fixture, callback, loop, or test block for 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy'.

### Line 171

```text

```

Blank line separates related setup or assertions for readability.

### Line 172

```text
test('failed duplicate save leaves source untouched and never updates it', async () => {
```

Starts an isolated test case whose title states the behavior being specified: failed duplicate save leaves source untouched and never updates it.

### Line 173

```text
  const fixture = makeFixture();
```

Defines the test fixture/helper fixture; its returned mock data represents the application state needed to exercise 'failed duplicate save leaves source untouched and never updates it'.

### Line 174

```text
  fixture.populate = select => { for (const employee of fixture.store.employees.values()) { const option = fixture.document.createElement('option'); option.value = employee.id; select.appendChild(option); } };
```

Begins a callback used by the 'failed duplicate save leaves source untouched and never updates it' test to model an event, loader, or transformation.

### Line 175

```text
  const original = { employee: fixture.source.employee, customer: fixture.source.customer, note: fixture.source.note, isPaid: fixture.source.isPaid, paidHours: fixture.source.paidHours, clockInTime: fixture.source.clockInTime, clockOutTime: fixture.source.clockOutTime };
```

Builds original, the concrete fixture collection/object used as input for 'failed duplicate save leaves source untouched and never updates it'; its fields model the relevant domain records or DOM state.

### Line 176

```text
  fixture.store.saveShift = async () => { throw new Error('offline'); };
```

Begins a callback used by the 'failed duplicate save leaves source untouched and never updates it' test to model an event, loader, or transformation.

### Line 177

```text
  await boot(fixture);
```

Waits for the asynchronous operation in 'failed duplicate save leaves source untouched and never updates it' to finish before subsequent assertions inspect its effects.

### Line 178

```text
  const list = fixture.document.getElementById('shiftList');
```

Initializes list for 'failed duplicate save leaves source untouched and never updates it', supplying the value that the following test logic will inspect or mutate.

### Line 179

```text
  await click(list.querySelector('.duplicate-btn'));
```

Waits for the asynchronous operation in 'failed duplicate save leaves source untouched and never updates it' to finish before subsequent assertions inspect its effects.

### Line 180

```text
  fixture.document.getElementById('shift-emp').value = 'target';
```

Sets `fixture.document.getElementById('shift-emp').value` (the value property of fixture.document.getElementById('shift-emp')) to "target".

### Line 181

```text
  await click(fixture.document.getElementById('ok-btn'));
```

Waits for the asynchronous operation in 'failed duplicate save leaves source untouched and never updates it' to finish before subsequent assertions inspect its effects.

### Line 182

```text
  assert.equal(fixture.writes.update.length, 0);
```

In the test 'failed duplicate save leaves source untouched and never updates it', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.update.length, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 183

```text
  assert.deepEqual({ employee: fixture.source.employee, customer: fixture.source.customer, note: fixture.source.note, isPaid: fixture.source.isPaid, paidHours: fixture.source.paidHours, clockInTime: fixture.source.clockInTime, clockOutTime: fixture.source.clockOutTime }, original);
```

Calls `assert.deepEqual` with an object with fields employee: `fixture.source.employee` (the employee property of fixture.source); customer: `fixture.source.customer` (the customer property of fixture.source); note: `fixture.source.note` (the note property of fixture.source); isPaid: `fixture.source.isPaid` (the is paid property of fixture.source); paidHours: `fixture.source.paidHours` (the paid hours property of fixture.source); clockInTime: `fixture.source.clockInTime` (the clock in time property of fixture.source); and further fields; `original` (original).

### Line 184

```text
  assert.match(fixture.document.getElementById('shift-form-error').textContent, /offline/);
```

In the test 'failed duplicate save leaves source untouched and never updates it', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(fixture.document.getElementById('shift-form-error').textContent, /offline/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 185

```text
});
```

Closes the fixture, callback, loop, or test block for 'failed duplicate save leaves source untouched and never updates it'.

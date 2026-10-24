// Original L1: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import test from 'node:test';
// Original L2: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import assert from 'node:assert/strict';
// Original L3: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import vm from 'node:vm';
// Original L4: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { readFileSync } from 'node:fs';
// Original L5: Blank line separates related setup or assertions for readability.

// Original L6: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
class FakeElement {
// Original L7: Continues the surrounding JavaScript expression or argument list. This line contributes constructor(tag = 'div', ownerDocument = null) {; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
  constructor(tag = 'div', ownerDocument = null) {
// Original L8: Sets `this.tagName` (the tag name property of this) to converts `tag` (tag) to uppercase text.
    this.tagName = tag.toUpperCase();
// Original L9: Sets `this.ownerDocument` (the owner document property of this) to `ownerDocument` (owner document).
    this.ownerDocument = ownerDocument;
// Original L10: Sets `this.children` (the children property of this) to an array containing .
    this.children = [];
// Original L11: Sets `this.parentElement` (the parent element property of this) to null.
    this.parentElement = null;
// Original L12: Sets `this.listeners` (the listeners property of this) to constructs a new instance of `Map` with no arguments.
    this.listeners = new Map();
// Original L13: Sets `this.attributes` (the attributes property of this) to constructs a new instance of `Map` with no arguments.
    this.attributes = new Map();
// Original L14: Sets `this.dataset` (the dataset property of this) to an object with fields .
    this.dataset = {};
// Original L15: Sets `this.style` (the style property of this) to an object with fields setProperty: a callback taking no parameters that runs its enclosed statements; removeProperty: a callback taking no parameters that runs its enclosed statements.
    this.style = { setProperty() {}, removeProperty() {} };
// Original L16: Sets `this.className` (the class name property of this) to "".
    this.className = '';
// Original L17: Sets `this.textContent` (the text content property of this) to "".
    this.textContent = '';
// Original L18: Sets `this.value` (the value property of this) to "".
    this.value = '';
// Original L19: Sets `this.checked` (the checked property of this) to false.
    this.checked = false;
// Original L20: Sets `this.disabled` (the disabled property of this) to false.
    this.disabled = false;
// Original L21: Sets `this.hidden` (the hidden property of this) to false.
    this.hidden = false;
// Original L22: Sets `this.open` (the open property of this) to false.
    this.open = false;
// Original L23: Closes the fixture, callback, loop, or test block for 'test setup'.
  }
// Original L24: Mutates or reads mocked DOM style/class state in 'test setup' to verify the visible/accessibility effect of the production handler.
  get classList() {
// Original L25: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
    return {
// Original L26: Defines field contains as a callback taking name that checks whether splits `this.className` (the class name property of this) into an array using separator the regular expression `/\s+/` used to match text contains `name` (name).
      contains: name => this.className.split(/\s+/).includes(name),
// Original L27: Begins a callback used by the 'test setup' test to model an event, loader, or transformation.
      add: (...names) => { this.className = [...new Set(`${this.className} ${names.join(' ')}`.trim().split(/\s+/))].join(' '); },
// Original L28: Begins a callback used by the 'test setup' test to model an event, loader, or transformation.
      remove: (...names) => { this.className = this.className.split(/\s+/).filter(name => !names.includes(name)).join(' '); }
// Original L29: Closes the fixture, callback, loop, or test block for 'test setup'.
    };
// Original L30: Closes the fixture, callback, loop, or test block for 'test setup'.
  }
// Original L31: Returns `this.children` (the children property of this) to the caller and exits this function.
  get options() { return this.children; }
// Original L32: Begins a callback used by the 'test setup' test to model an event, loader, or transformation.
  append(...nodes) { nodes.flat().forEach(node => { if (node) { node.parentElement = this; this.children.push(node); } }); }
// Original L33: Returns `node` (node) to the caller and exits this function.
  appendChild(node) { this.append(node); return node; }
// Original L34: Sets `this.children` (the children property of this) to an array containing .
  replaceChildren(...nodes) { this.children = []; this.append(...nodes); }
// Original L35: Appends `callback` (callback) to uses calls `this.listeners.get` with `type` (type) when it is truthy, otherwise falls back to calls `this.listeners.set` with `type` (type); an array containing , then calls `this.listeners.get` with `type` (type).
  addEventListener(type, callback) { (this.listeners.get(type) || (this.listeners.set(type, []), this.listeners.get(type))).push(callback); }
// Original L36: Simulates the user/browser event in 'test setup' so production event handlers run against the mock DOM.
  async dispatchEvent(event) {
// Original L37: Updates `event.target` (the target property of event) using this object instance.
    event.target ||= this;
// Original L38: Builds results, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
    const results = (this.listeners.get(event.type) || []).map(callback => callback(event));
// Original L39: Waits for the asynchronous operation in 'test setup' to finish before subsequent assertions inspect its effects.
    await Promise.all(results);
// Original L40: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
    if (this.parentElement && !event.cancelBubble) await this.parentElement.dispatchEvent(event);
// Original L41: Closes the fixture, callback, loop, or test block for 'test setup'.
  }
// Original L42: Calls `this.attributes.set` with `name` (name); converts `value` (value) to text.
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
// Original L43: Continues the surrounding JavaScript expression or argument list. This line contributes insertAdjacentHTML() {}; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
  insertAdjacentHTML() {}
// Original L44: Sets `this.open` (the open property of this) to true.
  showModal() { this.open = true; }
// Original L45: Simulates the user/browser event in 'test setup' so production event handlers run against the mock DOM.
  close() { this.open = false; void this.dispatchEvent({ type: 'close', target: this }); }
// Original L46: Checks whether `this.ownerDocument` (the owner document property of this); runs the following statement/block only when truthy.
  focus() { if (this.ownerDocument) this.ownerDocument.activeElement = this; }
// Original L47: Returns uses checks that `node` (node) and this object instance have the same value and type when it is truthy, otherwise falls back to checks whether any item of `this.children` (the children property of this) passes a callback taking child that calls `child.contains` with `node` (node) only if the function exists; optional chaining stops with undefined if a guarded receiver is null or undefined to the caller and exits this function.
  contains(node) { return node === this || this.children.some(child => child.contains?.(node)); }
// Original L48: Continues the surrounding JavaScript expression or argument list. This line contributes querySelectorAll(selector) {; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
  querySelectorAll(selector) {
// Original L49: Builds matches, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
    const matches = [];
// Original L50: Initializes match for 'test setup', supplying the value that the following test logic will inspect or mutate.
    const match = node => selector.startsWith('.')
// Original L51: Mutates or reads mocked DOM style/class state in 'test setup' to verify the visible/accessibility effect of the production handler.
      ? node.classList.contains(selector.slice(1))
// Original L52: Checks calls `selector.startsWith` with "#"; if true chooses checks that calls `node.attributes.get` with "id" and copies a portion of `selector` (selector), from 1 to the end have the same value and type, otherwise false.
      : selector.startsWith('#') ? node.attributes.get('id') === selector.slice(1) : false;
// Original L53: Builds visit, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
    const visit = node => { node.children.forEach(child => { if (match(child)) matches.push(child); visit(child); }); };
// Original L54: Calls `visit` with this object instance.
    visit(this);
// Original L55: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
    return matches;
// Original L56: Closes the fixture, callback, loop, or test block for 'test setup'.
  }
// Original L57: Returns uses the entry at index/key 0 in finds all descendants of this object instance matching CSS selector `selector` (selector) when it is truthy, otherwise falls back to null to the caller and exits this function.
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
// Original L58: Continues the surrounding JavaScript expression or argument list. This line contributes closest(selector) {; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
  closest(selector) {
// Original L59: Initializes node for 'test setup', supplying the value that the following test logic will inspect or mutate.
    let node = this;
// Original L60: Repeats its body while `node` (node) remains truthy.
    while (node) {
// Original L61: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
      if (selector === 'button[data-id]' && node.tagName === 'BUTTON' && node.dataset.id) return node;
// Original L62: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
      if (selector === '.remove-break-button' && node.classList.contains('remove-break-button')) return node;
// Original L63: Sets `node` (node) to `node.parentElement` (the parent element property of node).
      node = node.parentElement;
// Original L64: Closes the fixture, callback, loop, or test block for 'test setup'.
    }
// Original L65: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
    return null;
// Original L66: Closes the fixture, callback, loop, or test block for 'test setup'.
  }
// Original L67: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L68: Blank line separates related setup or assertions for readability.

// Original L69: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
class FakeDocument extends FakeElement {
// Original L70: Calls `super` with "#document"; null.
  constructor() { super('#document', null); this.ownerDocument = this; this.byId = new Map(); this.documentElement = { clientHeight: 800 }; this.activeElement = null; }
// Original L71: Returns constructs a new instance of `FakeElement` with `tag` (tag); this object instance to the caller and exits this function.
  createElement(tag) { return new FakeElement(tag, this); }
// Original L72: Returns uses calls `this.byId.get` with `id` (id) when it is truthy, otherwise falls back to null to the caller and exits this function.
  getElementById(id) { return this.byId.get(id) || null; }
// Original L73: Calls `this.createElement` with `tag` (tag); stores the result in `element`. const prevents reassignment of this binding, not mutation inside its object/array.
  register(id, tag = 'div') { const element = this.createElement(tag); element.setAttribute('id', id); this.byId.set(id, element); return element; }
// Original L74: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L75: Blank line separates related setup or assertions for readability.

// Original L76: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function makeFixture() {
// Original L77: Initializes document for 'test setup', supplying the value that the following test logic will inspect or mutate.
  const document = new FakeDocument();
// Original L78: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
  for (const [id, tag] of [
// Original L79: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
    ['shiftList', 'ul'], ['emp-filter', 'select'], ['cust-filter', 'select'], ['paid-filter', 'input'],
// Original L80: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
    ['add-button', 'button'], ['viewShiftModal', 'dialog'], ['shift-emp', 'select'], ['shift-cust', 'select'],
// Original L81: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
    ['shift-start', 'input'], ['shift-end', 'input'], ['total-hours', 'input'], ['paid-hours', 'input'],
// Original L82: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
    ['note-view', 'textarea'], ['paid-checkbox-view', 'input'], ['breaks-list', 'ul'], ['shift-form-error', 'p'],
// Original L83: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
    ['ok-btn', 'button'], ['cancel-btn', 'button'], ['add-break-button', 'button'], ['shift-modal-title', 'h2'],
// Original L84: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
    ['shift-duplicate-hint', 'p']
// Original L85: Calls `document.register` with `id` (id); `tag` (tag).
  ]) document.register(id, tag);
// Original L86: Builds sourceEmployee, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const sourceEmployee = { id: 'source', name: 'Source', wage: 20 };
// Original L87: Builds targetEmployee, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const targetEmployee = { id: 'target', name: 'Target', wage: 30 };
// Original L88: Defines the test fixture/helper customer; its returned mock data represents the application state needed to exercise 'test setup'.
  const customer = { id: 'customer', name: 'Customer' };
// Original L89: Builds source, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const source = {
// Original L90: Sets the object field customer using customer. This field is read later through its property name.
    id: 'source-shift', employee: sourceEmployee, customer, note: 'Keep note', isPaid: true, paidHours: 0,
// Original L91: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
    breaks: [], clockInTime: new Date('2026-10-09T09:00:00Z'), clockOutTime: new Date('2026-10-09T12:00:00Z'),
// Original L92: Continues the body of callback function. The surrounding braces keep these statements in the same callable unit.
    isComplete: true, getHoursWorked: () => 3, getPaidHours: () => 0,
// Original L93: Defines field duplicateFor as a callback taking employee that runs its enclosed statements.
    duplicateFor(employee) {
// Original L94: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
      return { id: 'duplicate-shift', employee, customer, note: this.note, isPaid: false, paidHours: this.paidHours,
// Original L95: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
        breaks: [], clockInTime: new Date(this.clockInTime), clockOutTime: new Date(this.clockOutTime),
// Original L96: Continues the body of callback function. The surrounding braces keep these statements in the same callable unit.
        isComplete: true, getHoursWorked: () => 3, getPaidHours: () => 0 };
// Original L97: Closes the fixture, callback, loop, or test block for 'test setup'.
    }
// Original L98: Closes the fixture, callback, loop, or test block for 'test setup'.
  };
// Original L99: Builds writes, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const writes = { save: [], update: [] };
// Original L100: Builds store, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const store = {
// Original L101: Defines field employees as constructs a new instance of `Map` with an array containing an array containing `sourceEmployee.id` (the id property of sourceEmployee), `sourceEmployee` (source employee), an array containing `targetEmployee.id` (the id property of targetEmployee), `targetEmployee` (target employee).
    employees: new Map([[sourceEmployee.id, sourceEmployee], [targetEmployee.id, targetEmployee]]),
// Original L102: Defines field customers as constructs a new instance of `Map` with an array containing an array containing `customer.id` (the id property of customer), `customer` (customer).
    customers: new Map([[customer.id, customer]]),
// Original L103: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
    shifts: [source],
// Original L104: Defines field init as a callback taking no parameters that runs its enclosed statements.
    async init() {},
// Original L105: Appends `shift` (shift) to `writes.save` (the save property of writes).
    async saveShift(shift) { writes.save.push(shift); },
// Original L106: Appends `args` (args) to `writes.update` (the update property of writes).
    async updateShift(...args) { writes.update.push(args); }
// Original L107: Closes the fixture, callback, loop, or test block for 'test setup'.
  };
// Original L108: Builds populate, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const populate = select => {
// Original L109: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
    for (const employee of store.employees.values()) { const option = document.createElement('option'); option.value = employee.id; select.appendChild(option); }
// Original L110: Closes the fixture, callback, loop, or test block for 'test setup'.
  };
// Original L111: Builds populateCustomers, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const populateCustomers = select => { const option = document.createElement('option'); option.value = customer.id; select.appendChild(option); };
// Original L112: Builds window, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const window = { document, innerHeight: 800, visualViewport: null, addEventListener() {}, alert: message => { window.alerts.push(message); }, confirm: () => true, alerts: [] };
// Original L113: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
  return { document, window, store, source, targetEmployee, writes };
// Original L114: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L115: Blank line separates related setup or assertions for readability.

// Original L116: Defines `boot` (boot), a reusable asynchronous function taking fixture. Its body runs when called, not when declared.
async function boot(fixture) {
// Original L117: Initializes source for 'test setup', supplying the value that the following test logic will inspect or mutate.
  const source = readFileSync(new URL('../scripts/shifts.js', import.meta.url), 'utf8');
// Original L118: Initializes script for 'test setup', supplying the value that the following test logic will inspect or mutate.
  const script = source.split('\n').slice(8).join('\n');
// Original L119: Calls `vm.runInNewContext` with `script` (script); an object with fields console: `console` (console); Date: `Date` (date); document: `fixture.document` (the document property of fixture); window: `fixture.window` (the window property of fixture); store: `fixture.store` (the store property of fixture); populateEmployeeDropdowns: `fixture.populate` (the populate property of fixture); and further fields.
  vm.runInNewContext(script, {
// Original L120: Sets the object field console using console. This field is read later through its property name.
    console,
// Original L121: Sets the object field Date using Date. This field is read later through its property name.
    Date,
// Original L122: Defines field document as `fixture.document` (the document property of fixture).
    document: fixture.document,
// Original L123: Defines field window as `fixture.window` (the window property of fixture).
    window: fixture.window,
// Original L124: Defines field store as `fixture.store` (the store property of fixture).
    store: fixture.store,
// Original L125: Defines field populateEmployeeDropdowns as `fixture.populate` (the populate property of fixture).
    populateEmployeeDropdowns: fixture.populate,
// Original L126: Begins a callback used by the 'test setup' test to model an event, loader, or transformation.
    populateCustomerDropdowns: select => {
// Original L127: Initializes option for 'test setup', supplying the value that the following test logic will inspect or mutate.
      const option = fixture.document.createElement('option');
// Original L128: Sets `option.value` (the value property of option) to "customer".
      option.value = 'customer';
// Original L129: Inserts `option` (option) as the last child of `select` (select).
      select.appendChild(option);
// Original L130: Closes callback function. Control continues after this block.
    },
// Original L131: Defines field WorkShift as `class {}`.
    WorkShift: class {},
// Original L132: Defines field resetShiftDialogViewport as a callback taking no parameters that runs its enclosed statements.
    resetShiftDialogViewport() {},
// Original L133: Defines field syncShiftDialogViewport as a callback taking no parameters that runs its enclosed statements.
    syncShiftDialogViewport() {},
// Original L134: Sets the object field setTimeout using setTimeout. This field is read later through its property name.
    setTimeout
// Original L135: Closes the fixture, callback, loop, or test block for 'test setup'.
  });
// Original L136: Simulates the user/browser event in 'test setup' so production event handlers run against the mock DOM.
  await fixture.document.dispatchEvent({ type: 'DOMContentLoaded' });
// Original L137: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L138: Blank line separates related setup or assertions for readability.

// Original L139: Simulates the user/browser event in 'test setup' so production event handlers run against the mock DOM.
async function click(element) { await element.dispatchEvent({ type: 'click', target: element }); }
// Original L140: Blank line separates related setup or assertions for readability.

// Original L141: Starts an isolated test case whose title states the behavior being specified: duplicate UI requires a target, cancel does not write, and saves one unpaid copy.
test('duplicate UI requires a target, cancel does not write, and saves one unpaid copy', async () => {
// Original L142: Defines the test fixture/helper fixture; its returned mock data represents the application state needed to exercise 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy'.
  const fixture = makeFixture();
// Original L143: Begins a callback used by the 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy' test to model an event, loader, or transformation.
  fixture.populate = select => { for (const employee of fixture.store.employees.values()) { const option = fixture.document.createElement('option'); option.value = employee.id; select.appendChild(option); } };
// Original L144: Waits for the asynchronous operation in 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy' to finish before subsequent assertions inspect its effects.
  await boot(fixture);
// Original L145: Initializes list for 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', supplying the value that the following test logic will inspect or mutate.
  const list = fixture.document.getElementById('shiftList');
// Original L146: In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(list.children.length, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(list.children.length, 1);
// Original L147: In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(list.querySelector('.duplicate-btn').className, 'duplicate-btn');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(list.querySelector('.duplicate-btn').className, 'duplicate-btn');
// Original L148: In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(list.querySelector('.duplicate-btn').dataset.id, 'source-shift');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(list.querySelector('.duplicate-btn').dataset.id, 'source-shift');
// Original L149: In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(list.listeners.get('click').length, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(list.listeners.get('click').length, 1);
// Original L150: Waits for the asynchronous operation in 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy' to finish before subsequent assertions inspect its effects.
  await click(list.querySelector('.duplicate-btn'));
// Original L151: Initializes empSelect for 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', supplying the value that the following test logic will inspect or mutate.
  const empSelect = fixture.document.getElementById('shift-emp');
// Original L152: Initializes modal for 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', supplying the value that the following test logic will inspect or mutate.
  const modal = fixture.document.getElementById('viewShiftModal');
// Original L153: In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(modal.open, true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(modal.open, true);
// Original L154: In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(empSelect.value, '', 'duplicate dialog must start without a target selection');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(empSelect.value, '', 'duplicate dialog must start without a target selection');
// Original L155: Waits for the asynchronous operation in 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy' to finish before subsequent assertions inspect its effects.
  await click(fixture.document.getElementById('ok-btn'));
// Original L156: In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(fixture.document.getElementById('shift-form-error').textContent, /Choose an employee/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(fixture.document.getElementById('shift-form-error').textContent, /Choose an employee/);
// Original L157: In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.save.length, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(fixture.writes.save.length, 0);
// Original L158: Waits for the asynchronous operation in 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy' to finish before subsequent assertions inspect its effects.
  await click(fixture.document.getElementById('cancel-btn'));
// Original L159: In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.save.length, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(fixture.writes.save.length, 0);
// Original L160: In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(modal.open, false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(modal.open, false);
// Original L161: Blank line separates related setup or assertions for readability.

// Original L162: Waits for the asynchronous operation in 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy' to finish before subsequent assertions inspect its effects.
  await click(list.querySelector('.duplicate-btn'));
// Original L163: Sets `empSelect.value` (the value property of empSelect) to "target".
  empSelect.value = 'target';
// Original L164: Waits for the asynchronous operation in 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy' to finish before subsequent assertions inspect its effects.
  await click(fixture.document.getElementById('ok-btn'));
// Original L165: In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.save.length, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(fixture.writes.save.length, 1);
// Original L166: In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.save[0].employee.id, 'target');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(fixture.writes.save[0].employee.id, 'target');
// Original L167: In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.save[0].isPaid, false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(fixture.writes.save[0].isPaid, false);
// Original L168: In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.save[0].id, 'duplicate-shift');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(fixture.writes.save[0].id, 'duplicate-shift');
// Original L169: In the test 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.update.length, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(fixture.writes.update.length, 0);
// Original L170: Closes the fixture, callback, loop, or test block for 'duplicate UI requires a target, cancel does not write, and saves one unpaid copy'.
});
// Original L171: Blank line separates related setup or assertions for readability.

// Original L172: Starts an isolated test case whose title states the behavior being specified: failed duplicate save leaves source untouched and never updates it.
test('failed duplicate save leaves source untouched and never updates it', async () => {
// Original L173: Defines the test fixture/helper fixture; its returned mock data represents the application state needed to exercise 'failed duplicate save leaves source untouched and never updates it'.
  const fixture = makeFixture();
// Original L174: Begins a callback used by the 'failed duplicate save leaves source untouched and never updates it' test to model an event, loader, or transformation.
  fixture.populate = select => { for (const employee of fixture.store.employees.values()) { const option = fixture.document.createElement('option'); option.value = employee.id; select.appendChild(option); } };
// Original L175: Builds original, the concrete fixture collection/object used as input for 'failed duplicate save leaves source untouched and never updates it'; its fields model the relevant domain records or DOM state.
  const original = { employee: fixture.source.employee, customer: fixture.source.customer, note: fixture.source.note, isPaid: fixture.source.isPaid, paidHours: fixture.source.paidHours, clockInTime: fixture.source.clockInTime, clockOutTime: fixture.source.clockOutTime };
// Original L176: Begins a callback used by the 'failed duplicate save leaves source untouched and never updates it' test to model an event, loader, or transformation.
  fixture.store.saveShift = async () => { throw new Error('offline'); };
// Original L177: Waits for the asynchronous operation in 'failed duplicate save leaves source untouched and never updates it' to finish before subsequent assertions inspect its effects.
  await boot(fixture);
// Original L178: Initializes list for 'failed duplicate save leaves source untouched and never updates it', supplying the value that the following test logic will inspect or mutate.
  const list = fixture.document.getElementById('shiftList');
// Original L179: Waits for the asynchronous operation in 'failed duplicate save leaves source untouched and never updates it' to finish before subsequent assertions inspect its effects.
  await click(list.querySelector('.duplicate-btn'));
// Original L180: Sets `fixture.document.getElementById('shift-emp').value` (the value property of fixture.document.getElementById('shift-emp')) to "target".
  fixture.document.getElementById('shift-emp').value = 'target';
// Original L181: Waits for the asynchronous operation in 'failed duplicate save leaves source untouched and never updates it' to finish before subsequent assertions inspect its effects.
  await click(fixture.document.getElementById('ok-btn'));
// Original L182: In the test 'failed duplicate save leaves source untouched and never updates it', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(fixture.writes.update.length, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(fixture.writes.update.length, 0);
// Original L183: Calls `assert.deepEqual` with an object with fields employee: `fixture.source.employee` (the employee property of fixture.source); customer: `fixture.source.customer` (the customer property of fixture.source); note: `fixture.source.note` (the note property of fixture.source); isPaid: `fixture.source.isPaid` (the is paid property of fixture.source); paidHours: `fixture.source.paidHours` (the paid hours property of fixture.source); clockInTime: `fixture.source.clockInTime` (the clock in time property of fixture.source); and further fields; `original` (original).
  assert.deepEqual({ employee: fixture.source.employee, customer: fixture.source.customer, note: fixture.source.note, isPaid: fixture.source.isPaid, paidHours: fixture.source.paidHours, clockInTime: fixture.source.clockInTime, clockOutTime: fixture.source.clockOutTime }, original);
// Original L184: In the test 'failed duplicate save leaves source untouched and never updates it', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(fixture.document.getElementById('shift-form-error').textContent, /offline/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(fixture.document.getElementById('shift-form-error').textContent, /offline/);
// Original L185: Closes the fixture, callback, loop, or test block for 'failed duplicate save leaves source untouched and never updates it'.
});

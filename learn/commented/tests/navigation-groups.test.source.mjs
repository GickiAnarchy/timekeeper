// Original L1: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import test from 'node:test';
// Original L2: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import assert from 'node:assert/strict';
// Original L3: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import fs from 'node:fs';
// Original L4: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import path from 'node:path';
// Original L5: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { fileURLToPath } from 'node:url';
// Original L6: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import vm from 'node:vm';
// Original L7: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { setupNavigationGroups, setupNavigationPicker } from '../scripts/index.js';
// Original L8: Blank line separates related setup or assertions for readability.

// Original L9: Initializes here for 'test setup', supplying the value that the following test logic will inspect or mutate.
const here = path.dirname(fileURLToPath(import.meta.url));
// Original L10: Initializes projectRoot for 'test setup', supplying the value that the following test logic will inspect or mutate.
const projectRoot = path.resolve(here, '..');
// Original L11: Blank line separates related setup or assertions for readability.

// Original L12: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
class ClassList {
// Original L13: Continues the surrounding JavaScript expression or argument list. This line contributes #values;; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
  #values;
// Original L14: Sets `this.#values` (the values property of this) to constructs a new instance of `Set` with `values` (values).
  constructor(values = []) { this.#values = new Set(values); }
// Original L15: Runs a callback taking value that calls `this.#values.add` with `value` (value) once per item of `values` (values).
  add(...values) { values.forEach(value => this.#values.add(value)); }
// Original L16: Runs a callback taking value that calls `this.#values.delete` with `value` (value) once per item of `values` (values).
  remove(...values) { values.forEach(value => this.#values.delete(value)); }
// Original L17: Returns calls `this.#values.has` with `value` (value) to the caller and exits this function.
  contains(value) { return this.#values.has(value); }
// Original L18: Returns `enabled` (enabled) to the caller and exits this function.
  toggle(value, enabled) { if (enabled) this.add(value); else this.remove(value); return enabled; }
// Original L19: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L20: Blank line separates related setup or assertions for readability.

// Original L21: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
class StubElement {
// Original L22: Continues the surrounding JavaScript expression or argument list. This line contributes #listeners = new Map();; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
  #listeners = new Map();
// Original L23: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
  constructor({ classes = [], attributes = {}, children = [] } = {}) {
// Original L24: Mutates or reads mocked DOM style/class state in 'test setup' to verify the visible/accessibility effect of the production handler.
    this.classList = new ClassList(classes);
// Original L25: Sets `this.attributes` (the attributes property of this) to constructs a new instance of `Map` with turns `attributes` (attributes) into [key, value] pairs.
    this.attributes = new Map(Object.entries(attributes));
// Original L26: Sets `this.children` (the children property of this) to an array containing .
    this.children = [];
// Original L27: Sets `this.parentElement` (the parent element property of this) to null.
    this.parentElement = null;
// Original L28: Sets `this.ownerDocument` (the owner document property of this) to null.
    this.ownerDocument = null;
// Original L29: Sets `this.hidden` (the hidden property of this) to false.
    this.hidden = false;
// Original L30: Sets `this.focusCount` (the focus count property of this) to 0.
    this.focusCount = 0;
// Original L31: Sets `this.textContent` (the text content property of this) to "".
    this.textContent = '';
// Original L32: Sets `this.dataset` (the dataset property of this) to an object with fields .
    this.dataset = {};
// Original L33: Runs a callback taking child that calls `this.append` with `child` (child) once per item of `children` (children).
    children.forEach(child => this.append(child));
// Original L34: Closes the fixture, callback, loop, or test block for 'test setup'.
  }
// Original L35: Returns `child` (child) to the caller and exits this function.
  append(child) { child.parentElement = this; child.ownerDocument = this.ownerDocument; this.children.push(child); return child; }
// Original L36: Returns uses checks that `node` (node) and this object instance have the same value and type when it is truthy, otherwise falls back to checks whether any item of `this.children` (the children property of this) passes a callback taking child that calls `child.contains` with `node` (node) to the caller and exits this function.
  contains(node) { return node === this || this.children.some(child => child.contains(node)); }
// Original L37: Returns checks calls `this.attributes.has` with `name` (name); if true chooses calls `this.attributes.get` with `name` (name), otherwise null to the caller and exits this function.
  getAttribute(name) { return this.attributes.has(name) ? this.attributes.get(name) : null; }
// Original L38: Returns calls `this.attributes.has` with `name` (name) to the caller and exits this function.
  hasAttribute(name) { return this.attributes.has(name); }
// Original L39: Calls `this.attributes.set` with `name` (name); converts `value` (value) to text.
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
// Original L40: Calls `this.attributes.delete` with `name` (name).
  removeAttribute(name) { this.attributes.delete(name); }
// Original L41: Uses calls `this.#listeners.get` with `type` (type) unless it is null or undefined, then falls back to an array containing ; stores the result in `listeners`. const prevents reassignment of this binding, not mutation inside its object/array.
  addEventListener(type, listener) { const listeners = this.#listeners.get(type) ?? []; listeners.push(listener); this.#listeners.set(type, listeners); }
// Original L42: Simulates the user/browser event in 'test setup' so production event handlers run against the mock DOM.
  dispatchEvent(event) { event.target ??= this; event.currentTarget = this; for (const listener of this.#listeners.get(event.type) ?? []) listener.call(this, event); return !event.defaultPrevented; }
// Original L43: Simulates the user/browser event in 'test setup' so production event handlers run against the mock DOM.
  click() { return this.dispatchEvent({ type: 'click', defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } }); }
// Original L44: Adds to `this.focusCount` (the focus count property of this) using 1.
  focus() { this.focusCount += 1; if (this.ownerDocument) this.ownerDocument.activeElement = this; }
// Original L45: Returns uses the entry at index/key 0 in finds all descendants of this object instance matching CSS selector `selector` (selector) unless it is null or undefined, then falls back to null to the caller and exits this function.
  querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; }
// Original L46: Begins a callback used by the 'test setup' test to model an event, loader, or transformation.
  querySelectorAll(selector) { const matches = []; const visit = node => { if (node.matches(selector)) matches.push(node); node.children.forEach(visit); }; this.children.forEach(visit); return matches; }
// Original L47: Continues the surrounding JavaScript expression or argument list. This line contributes matches(selector) {; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
  matches(selector) {
// Original L48: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
    if (selector.startsWith('.')) return this.classList.contains(selector.slice(1));
// Original L49: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
    return false;
// Original L50: Closes the fixture, callback, loop, or test block for 'test setup'.
  }
// Original L51: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L52: Blank line separates related setup or assertions for readability.

// Original L53: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
class StubRoot extends StubElement {
// Original L54: Calls `super` with an object with fields classes: an array containing "sidebar-nav"; children: `groups` (groups).
  constructor(groups) { super({ classes: ['sidebar-nav'], children: groups }); }
// Original L55: Returns `this.children` (the children property of this) to the caller and exits this function.
  querySelectorAll(selector) { if (selector === '.nav-group') return this.children; return super.querySelectorAll(selector); }
// Original L56: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L57: Blank line separates related setup or assertions for readability.

// Original L58: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function setOwnerDocument(node, document) { node.ownerDocument = document; node.children.forEach(child => setOwnerDocument(child, document)); return node; }
// Original L59: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function event(type, extra = {}) { return { type, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...extra }; }
// Original L60: Blank line separates related setup or assertions for readability.

// Original L61: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function makeGroup(name, { expanded = false } = {}) {
// Original L62: Builds toggle, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const toggle = new StubElement({ classes: ['nav-group-toggle'], attributes: { 'aria-controls': `${name}-panel`, 'aria-expanded': String(expanded) } });
// Original L63: Builds panel, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const panel = new StubElement({ classes: ['nav-group-pages'], attributes: { id: `${name}-panel` } });
// Original L64: Sets `panel.hidden` (the hidden property of panel) to negates the truthiness of `expanded` (expanded).
  panel.hidden = !expanded;
// Original L65: Calls `panel.append` with constructs a new instance of `StubElement` with an object with fields classes: an array containing "nav-link"; attributes: an object with fields 'data-page': a text template that combines fixed text with computed values `name` (name).
  panel.append(new StubElement({ classes: ['nav-link'], attributes: { 'data-page': `html/${name}.html` } }));
// Original L66: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
  return new StubElement({ classes: ['nav-group'], children: [toggle, panel] });
// Original L67: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L68: Blank line separates related setup or assertions for readability.

// Original L69: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function fixture() {
// Original L70: Builds groups, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const groups = [makeGroup('workspace', { expanded: true }), makeGroup('manage'), makeGroup('preferences')];
// Original L71: Initializes root for 'test setup', supplying the value that the following test logic will inspect or mutate.
  const root = new StubRoot(groups);
// Original L72: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
  return { root, groups, toggles: groups.map(group => group.querySelector('.nav-group-toggle')), panels: groups.map(group => group.querySelector('.nav-group-pages')) };
// Original L73: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L74: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function ariaExpanded(toggle) { return toggle.getAttribute('aria-expanded') === 'true'; }
// Original L75: Blank line separates related setup or assertions for readability.

// Original L76: Starts an isolated test case whose title states the behavior being specified: navigation initialization reveals one active category and marks its toggle current.
test('navigation initialization reveals one active category and marks its toggle current', () => {
// Original L77: Initializes { for 'navigation initialization reveals one active category and marks its toggle current', supplying the value that the following test logic will inspect or mutate.
  const { root, groups, toggles, panels } = fixture();
// Original L78: Initializes reveal for 'navigation initialization reveals one active category and marks its toggle current', supplying the value that the following test logic will inspect or mutate.
  const reveal = setupNavigationGroups(root);
// Original L79: Calls `reveal` with finds the first descendant of the entry at index/key 0 in `groups` (groups) matching CSS selector ".nav-link".
  reveal(groups[0].querySelector('.nav-link'));
// Original L80: In the test 'navigation initialization reveals one active category and marks its toggle current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ariaExpanded(toggles[0]), true); assert.equal(panels[0].hidden, false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(ariaExpanded(toggles[0]), true); assert.equal(panels[0].hidden, false);
// Original L81: In the test 'navigation initialization reveals one active category and marks its toggle current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ariaExpanded(toggles[1]), false); assert.equal(panels[1].hidden, true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(ariaExpanded(toggles[1]), false); assert.equal(panels[1].hidden, true);
// Original L82: In the test 'navigation initialization reveals one active category and marks its toggle current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ariaExpanded(toggles[2]), false); assert.equal(panels[2].hidden, true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(ariaExpanded(toggles[2]), false); assert.equal(panels[2].hidden, true);
// Original L83: In the test 'navigation initialization reveals one active category and marks its toggle current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggles[0].getAttribute('data-current'), 'true');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(toggles[0].getAttribute('data-current'), 'true');
// Original L84: In the test 'navigation initialization reveals one active category and marks its toggle current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggles[0].hasAttribute('aria-disabled'), false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(toggles[0].hasAttribute('aria-disabled'), false);
// Original L85: Closes the fixture, callback, loop, or test block for 'navigation initialization reveals one active category and marks its toggle current'.
});
// Original L86: Blank line separates related setup or assertions for readability.

// Original L87: Starts an isolated test case whose title states the behavior being specified: category toggles are regular accordion controls with only one open at once.
test('category toggles are regular accordion controls with only one open at once', () => {
// Original L88: Initializes { for 'category toggles are regular accordion controls with only one open at once', supplying the value that the following test logic will inspect or mutate.
  const { root, groups, toggles, panels } = fixture();
// Original L89: Builds reveal, the concrete fixture collection/object used as input for 'category toggles are regular accordion controls with only one open at once'; its fields model the relevant domain records or DOM state.
  const reveal = setupNavigationGroups(root); reveal(groups[0].querySelector('.nav-link'));
// Original L90: Simulates the user/browser event in 'category toggles are regular accordion controls with only one open at once' so production event handlers run against the mock DOM.
  toggles[1].click();
// Original L91: In the test 'category toggles are regular accordion controls with only one open at once', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ariaExpanded(toggles[1]), true); assert.equal(panels[1].hidden, false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(ariaExpanded(toggles[1]), true); assert.equal(panels[1].hidden, false);
// Original L92: In the test 'category toggles are regular accordion controls with only one open at once', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ariaExpanded(toggles[0]), false); assert.equal(panels[0].hidden, true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(ariaExpanded(toggles[0]), false); assert.equal(panels[0].hidden, true);
// Original L93: In the test 'category toggles are regular accordion controls with only one open at once', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: toggles[1].click(); assert.equal(ariaExpanded(toggles[1]), false); assert.equal(panels[1].hidden, true);; the fixture therefore checks the concrete boundary/result contract.
  toggles[1].click(); assert.equal(ariaExpanded(toggles[1]), false); assert.equal(panels[1].hidden, true);
// Original L94: In the test 'category toggles are regular accordion controls with only one open at once', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggles[0].hasAttribute('aria-disabled'), false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(toggles[0].hasAttribute('aria-disabled'), false);
// Original L95: Closes the fixture, callback, loop, or test block for 'category toggles are regular accordion controls with only one open at once'.
});
// Original L96: Blank line separates related setup or assertions for readability.

// Original L97: Starts an isolated test case whose title states the behavior being specified: reveal activates its category, closes others, and updates data-current.
test('reveal activates its category, closes others, and updates data-current', () => {
// Original L98: Initializes { for 'reveal activates its category, closes others, and updates data-current', supplying the value that the following test logic will inspect or mutate.
  const { root, groups, toggles, panels } = fixture();
// Original L99: Builds reveal, the concrete fixture collection/object used as input for 'reveal activates its category, closes others, and updates data-current'; its fields model the relevant domain records or DOM state.
  const reveal = setupNavigationGroups(root); reveal(groups[2].querySelector('.nav-link'));
// Original L100: In the test 'reveal activates its category, closes others, and updates data-current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ariaExpanded(toggles[2]), true); assert.equal(panels[2].hidden, false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(ariaExpanded(toggles[2]), true); assert.equal(panels[2].hidden, false);
// Original L101: In the test 'reveal activates its category, closes others, and updates data-current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ariaExpanded(toggles[0]), false); assert.equal(ariaExpanded(toggles[1]), false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(ariaExpanded(toggles[0]), false); assert.equal(ariaExpanded(toggles[1]), false);
// Original L102: In the test 'reveal activates its category, closes others, and updates data-current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggles[2].getAttribute('data-current'), 'true');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(toggles[2].getAttribute('data-current'), 'true');
// Original L103: In the test 'reveal activates its category, closes others, and updates data-current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggles[0].hasAttribute('data-current'), false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(toggles[0].hasAttribute('data-current'), false);
// Original L104: In the test 'reveal activates its category, closes others, and updates data-current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggles[1].hasAttribute('data-current'), false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(toggles[1].hasAttribute('data-current'), false);
// Original L105: Closes the fixture, callback, loop, or test block for 'reveal activates its category, closes others, and updates data-current'.
});
// Original L106: Blank line separates related setup or assertions for readability.

// Original L107: Starts an isolated test case whose title states the behavior being specified: reveal is inert for an unrelated button and does not steal focus or navigate.
test('reveal is inert for an unrelated button and does not steal focus or navigate', () => {
// Original L108: Initializes { for 'reveal is inert for an unrelated button and does not steal focus or navigate', supplying the value that the following test logic will inspect or mutate.
  const { root, groups } = fixture(); const reveal = setupNavigationGroups(root);
// Original L109: Builds link, the concrete fixture collection/object used as input for 'reveal is inert for an unrelated button and does not steal focus or navigate'; its fields model the relevant domain records or DOM state.
  const link = groups[0].querySelector('.nav-link'); const page = link.getAttribute('data-page'); reveal(link);
// Original L110: In the test 'reveal is inert for an unrelated button and does not steal focus or navigate', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(link.getAttribute('data-page'), page); assert.equal(link.focusCount, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(link.getAttribute('data-page'), page); assert.equal(link.focusCount, 0);
// Original L111: In the test 'reveal is inert for an unrelated button and does not steal focus or navigate', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: reveal(new StubElement()); assert.equal(link.getAttribute('data-page'), page);; the fixture therefore checks the concrete boundary/result contract.
  reveal(new StubElement()); assert.equal(link.getAttribute('data-page'), page);
// Original L112: Closes the fixture, callback, loop, or test block for 'reveal is inert for an unrelated button and does not steal focus or navigate'.
});
// Original L113: Blank line separates related setup or assertions for readability.

// Original L114: Declares a test-only helper/type that models the application behavior needed by 'reveal is inert for an unrelated button and does not steal focus or navigate'.
function pickerFixture() {
// Original L115: Initializes document for 'reveal is inert for an unrelated button and does not steal focus or navigate', supplying the value that the following test logic will inspect or mutate.
  const document = new StubElement(); document.ownerDocument = document; document.defaultView = document; document.activeElement = null;
// Original L116: Builds toggle, the concrete fixture collection/object used as input for 'reveal is inert for an unrelated button and does not steal focus or navigate'; its fields model the relevant domain records or DOM state.
  const toggle = new StubElement({ classes: ['nav-picker-toggle'], attributes: { 'aria-expanded': 'true' } });
// Original L117: Builds label, the concrete fixture collection/object used as input for 'reveal is inert for an unrelated button and does not steal focus or navigate'; its fields model the relevant domain records or DOM state.
  const label = new StubElement({ classes: ['nav-picker-label'] }); label.textContent = 'Home';
// Original L118: Builds nav, the concrete fixture collection/object used as input for 'reveal is inert for an unrelated button and does not steal focus or navigate'; its fields model the relevant domain records or DOM state.
  const nav = new StubRoot([]); nav.classList.add('sidebar-nav');
// Original L119: Builds root, the concrete fixture collection/object used as input for 'reveal is inert for an unrelated button and does not steal focus or navigate'; its fields model the relevant domain records or DOM state.
  const root = new StubElement({ classes: ['sidebar'], children: [toggle, label, nav] });
// Original L120: Calls `setOwnerDocument` with `root` (root); `document` (document).
  setOwnerDocument(root, document); document.append(root);
// Original L121: Returns the fixture/helper result needed by the 'reveal is inert for an unrelated button and does not steal focus or navigate' test, preserving the modeled state for its caller.
  return { document, root, toggle, label, nav };
// Original L122: Closes the fixture, callback, loop, or test block for 'reveal is inert for an unrelated button and does not steal focus or navigate'.
}
// Original L123: Declares a test-only helper/type that models the application behavior needed by 'reveal is inert for an unrelated button and does not steal focus or navigate'.
function pickerButton(title, page = `html/${title.toLowerCase()}.html`) {
// Original L124: Builds button, the concrete fixture collection/object used as input for 'reveal is inert for an unrelated button and does not steal focus or navigate'; its fields model the relevant domain records or DOM state.
  const button = new StubElement({ classes: ['nav-link'], attributes: { 'data-page': page } });
// Original L125: Returns `button` (button) to the caller and exits this function.
  button.dataset = { title, page }; return button;
// Original L126: Closes the fixture, callback, loop, or test block for 'reveal is inert for an unrelated button and does not steal focus or navigate'.
}
// Original L127: Blank line separates related setup or assertions for readability.

// Original L128: Starts an isolated test case whose title states the behavior being specified: compact picker starts closed, toggles with click, and closes on Escape restoring focus.
test('compact picker starts closed, toggles with click, and closes on Escape restoring focus', () => {
// Original L129: Initializes { for 'compact picker starts closed, toggles with click, and closes on Escape restoring focus', supplying the value that the following test logic will inspect or mutate.
  const { document, root, toggle, nav } = pickerFixture(); const select = setupNavigationPicker(root);
// Original L130: In the test 'compact picker starts closed, toggles with click, and closes on Escape restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nav.hidden, true); assert.equal(toggle.getAttribute('aria-expanded'), 'false');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nav.hidden, true); assert.equal(toggle.getAttribute('aria-expanded'), 'false');
// Original L131: In the test 'compact picker starts closed, toggles with click, and closes on Escape restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: toggle.click(); assert.equal(nav.hidden, false); assert.equal(toggle.getAttribute('aria-expanded'), 'true');; the fixture therefore checks the concrete boundary/result contract.
  toggle.click(); assert.equal(nav.hidden, false); assert.equal(toggle.getAttribute('aria-expanded'), 'true');
// Original L132: Simulates the user/browser event in 'compact picker starts closed, toggles with click, and closes on Escape restoring focus' so production event handlers run against the mock DOM.
  document.activeElement = toggle; const key = event('keydown', { key: 'Escape' }); root.dispatchEvent(key);
// Original L133: In the test 'compact picker starts closed, toggles with click, and closes on Escape restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(key.defaultPrevented, true); assert.equal(nav.hidden, true); assert.equal(toggle.getAttribute('aria-expanded'), 'false'); assert.equal(toggle.focusCount, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(key.defaultPrevented, true); assert.equal(nav.hidden, true); assert.equal(toggle.getAttribute('aria-expanded'), 'false'); assert.equal(toggle.focusCount, 1);
// Original L134: In the test 'compact picker starts closed, toggles with click, and closes on Escape restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(typeof select, 'function');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(typeof select, 'function');
// Original L135: Closes the fixture, callback, loop, or test block for 'compact picker starts closed, toggles with click, and closes on Escape restoring focus'.
});
// Original L136: Blank line separates related setup or assertions for readability.

// Original L137: Starts an isolated test case whose title states the behavior being specified: picker closes on outside pointerdown and focusout without restoring focus.
test('picker closes on outside pointerdown and focusout without restoring focus', () => {
// Original L138: Initializes { for 'picker closes on outside pointerdown and focusout without restoring focus', supplying the value that the following test logic will inspect or mutate.
  const { document, root, toggle, nav } = pickerFixture(); setupNavigationPicker(root); toggle.click();
// Original L139: Simulates the user/browser event in 'picker closes on outside pointerdown and focusout without restoring focus' so production event handlers run against the mock DOM.
  document.dispatchEvent(event('pointerdown', { target: new StubElement() }));
// Original L140: In the test 'picker closes on outside pointerdown and focusout without restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nav.hidden, true); assert.equal(toggle.focusCount, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nav.hidden, true); assert.equal(toggle.focusCount, 0);
// Original L141: Simulates the user/browser event in 'picker closes on outside pointerdown and focusout without restoring focus' so production event handlers run against the mock DOM.
  toggle.click(); root.dispatchEvent(event('focusout', { relatedTarget: new StubElement() }));
// Original L142: In the test 'picker closes on outside pointerdown and focusout without restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nav.hidden, true); assert.equal(toggle.focusCount, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nav.hidden, true); assert.equal(toggle.focusCount, 0);
// Original L143: Closes the fixture, callback, loop, or test block for 'picker closes on outside pointerdown and focusout without restoring focus'.
});
// Original L144: Blank line separates related setup or assertions for readability.

// Original L145: Starts an isolated test case whose title states the behavior being specified: picker closes on window blur without restoring focus.
test('picker closes on window blur without restoring focus', () => {
// Original L146: Initializes { for 'picker closes on window blur without restoring focus', supplying the value that the following test logic will inspect or mutate.
  const { document, root, toggle, nav } = pickerFixture();
// Original L147: Calls `setupNavigationPicker` with `root` (root).
  setupNavigationPicker(root);
// Original L148: Simulates the user/browser event in 'picker closes on window blur without restoring focus' so production event handlers run against the mock DOM.
  toggle.click();
// Original L149: Sets `document.activeElement` (the active element property of document) to constructs a new instance of `StubElement` with no arguments.
  document.activeElement = new StubElement();
// Original L150: Simulates the user/browser event in 'picker closes on window blur without restoring focus' so production event handlers run against the mock DOM.
  document.dispatchEvent(event('blur'));
// Original L151: In the test 'picker closes on window blur without restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nav.hidden, true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nav.hidden, true);
// Original L152: In the test 'picker closes on window blur without restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggle.focusCount, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(toggle.focusCount, 0);
// Original L153: Closes the fixture, callback, loop, or test block for 'picker closes on window blur without restoring focus'.
});
// Original L154: Blank line separates related setup or assertions for readability.

// Original L155: Starts an isolated test case whose title states the behavior being specified: picker select updates label and accessible name, closes, and restores focus only from inside panel.
test('picker select updates label and accessible name, closes, and restores focus only from inside panel', () => {
// Original L156: Initializes { for 'picker select updates label and accessible name, closes, and restores focus only from inside panel', supplying the value that the following test logic will inspect or mutate.
  const { document, root, toggle, label, nav } = pickerFixture(); const select = setupNavigationPicker(root);
// Original L157: Initializes button for 'picker select updates label and accessible name, closes, and restores focus only from inside panel', supplying the value that the following test logic will inspect or mutate.
  const button = pickerButton('Planned jobs'); nav.append(button); toggle.click(); document.activeElement = button;
// Original L158: Calls `select` with `button` (button).
  select(button);
// Original L159: In the test 'picker select updates label and accessible name, closes, and restores focus only from inside panel', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(label.textContent, 'Planned jobs'); assert.equal(toggle.getAttribute('aria-label'), 'Pages, current page: Planned jobs');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(label.textContent, 'Planned jobs'); assert.equal(toggle.getAttribute('aria-label'), 'Pages, current page: Planned jobs');
// Original L160: In the test 'picker select updates label and accessible name, closes, and restores focus only from inside panel', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nav.hidden, true); assert.equal(toggle.focusCount, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(nav.hidden, true); assert.equal(toggle.focusCount, 1);
// Original L161: Simulates the user/browser event in 'picker select updates label and accessible name, closes, and restores focus only from inside panel' so production event handlers run against the mock DOM.
  toggle.click(); const outside = new StubElement(); document.activeElement = outside; select(button);
// Original L162: In the test 'picker select updates label and accessible name, closes, and restores focus only from inside panel', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggle.focusCount, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(toggle.focusCount, 1);
// Original L163: Closes the fixture, callback, loop, or test block for 'picker select updates label and accessible name, closes, and restores focus only from inside panel'.
});
// Original L164: Blank line separates related setup or assertions for readability.

// Original L165: Starts an isolated test case whose title states the behavior being specified: missing navigation roots are graceful.
test('missing navigation roots are graceful', () => {
// Original L166: Asserts that calling setupNavigationGroups with no root element is safe and does not throw an error; optional navigation should tolerate a page without that UI.
  assert.doesNotThrow(() => setupNavigationGroups(null));
// Original L167: Asserts that setupNavigationPicker also tolerates a null root instead of crashing; this protects pages that do not include the compact page picker.
  assert.doesNotThrow(() => setupNavigationPicker(null));
// Original L168: In the test 'missing navigation roots are graceful', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(typeof setupNavigationGroups(null), 'function'); assert.equal(typeof setupNavigationPicker(null), 'function');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(typeof setupNavigationGroups(null), 'function'); assert.equal(typeof setupNavigationPicker(null), 'function');
// Original L169: Closes the fixture, callback, loop, or test block for 'missing navigation roots are graceful'.
});
// Original L170: Blank line separates related setup or assertions for readability.

// Original L171: Starts an isolated test case whose title states the behavior being specified: index keeps all ten routes and defines the three named navigation groups.
test('index keeps all ten routes and defines the three named navigation groups', () => {
// Original L172: Initializes html for 'index keeps all ten routes and defines the three named navigation groups', supplying the value that the following test logic will inspect or mutate.
  const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
// Original L173: Builds routes, the concrete fixture collection/object used as input for 'index keeps all ten routes and defines the three named navigation groups'; its fields model the relevant domain records or DOM state.
  const routes = [...html.matchAll(/data-page=["']([^"']+)["']/g)].map(match => match[1]);
// Original L174: Calls `assert.deepEqual` with `routes` (routes); an array containing "html/home.html", "html/clock.html", "html/viewshifts.html", "html/planned.html", "html/pay-period-review.html", and 5 more entries.
  assert.deepEqual(routes, ['html/home.html', 'html/clock.html', 'html/viewshifts.html', 'html/planned.html', 'html/pay-period-review.html', 'html/basic-data.html', 'html/payledger.html', 'html/ledger-archive.html', 'html/invoice.html', 'html/settings.html']);
// Original L175: Builds classAttributes, the concrete fixture collection/object used as input for 'index keeps all ten routes and defines the three named navigation groups'; its fields model the relevant domain records or DOM state.
  const classAttributes = [...html.matchAll(/class=["']([^"']+)["']/g)].map(match => match[1]);
// Original L176: In the test 'index keeps all ten routes and defines the three named navigation groups', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(classAttributes.filter(value => value.split(/\s+/).includes('nav-group')).length, 3);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(classAttributes.filter(value => value.split(/\s+/).includes('nav-group')).length, 3);
// Original L177: In the test 'index keeps all ten routes and defines the three named navigation groups', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(html, /Workspace/i); assert.match(html, /Manage/i); assert.match(html, /Preferences/i);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(html, /Workspace/i); assert.match(html, /Manage/i); assert.match(html, /Preferences/i);
// Original L178: Closes the fixture, callback, loop, or test block for 'index keeps all ten routes and defines the three named navigation groups'.
});
// Original L179: Blank line separates related setup or assertions for readability.

// Original L180: Starts an isolated test case whose title states the behavior being specified: compact navigation styles and versioned assets are present.
test('compact navigation styles and versioned assets are present', () => {
// Original L181: Initializes html for 'compact navigation styles and versioned assets are present', supplying the value that the following test logic will inspect or mutate.
  const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8'); const css = fs.readFileSync(path.join(projectRoot, 'styles/style.css'), 'utf8');
// Original L182: In the test 'compact navigation styles and versioned assets are present', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(html, /(?:index\.js|style\.css)\?v=compact-nav-1/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(html, /(?:index\.js|style\.css)\?v=compact-nav-1/);
// Original L183: In the test 'compact navigation styles and versioned assets are present', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(css, /\.sidebar-nav[^{}]*\[hidden\]|\[hidden\][^{}]*\.sidebar-nav/s);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(css, /\.sidebar-nav[^{}]*\[hidden\]|\[hidden\][^{}]*\.sidebar-nav/s);
// Original L184: In the test 'compact navigation styles and versioned assets are present', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(css, /@media[^{]*(?:max-width|min-width)[^{]*\{[\s\S]*?sidebar-nav/s);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
  assert.match(css, /@media[^{]*(?:max-width|min-width)[^{]*\{[\s\S]*?sidebar-nav/s);
// Original L185: Closes the fixture, callback, loop, or test block for 'compact navigation styles and versioned assets are present'.
});
// Original L186: Blank line separates related setup or assertions for readability.

// Original L187: Declares a test-only helper/type that models the application behavior needed by 'compact navigation styles and versioned assets are present'.
function shellFixture(readyState = 'loading') {
// Original L188: Initializes html for 'compact navigation styles and versioned assets are present', supplying the value that the following test logic will inspect or mutate.
  const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8'); const shell = fs.readFileSync(path.join(projectRoot, 'scripts/index.js'), 'utf8');
// Original L189: Builds {, the concrete fixture collection/object used as input for 'compact navigation styles and versioned assets are present'; its fields model the relevant domain records or DOM state.
  const { root: nav, groups, toggles, panels } = fixture(); panels.forEach(panel => { panel.children = []; });
// Original L190: Builds pickerToggle, the concrete fixture collection/object used as input for 'compact navigation styles and versioned assets are present'; its fields model the relevant domain records or DOM state.
  const pickerToggle = new StubElement({ classes: ['nav-picker-toggle'] }); const pickerLabel = new StubElement({ classes: ['nav-picker-label'] });
// Original L191: Builds sidebar, the concrete fixture collection/object used as input for 'compact navigation styles and versioned assets are present'; its fields model the relevant domain records or DOM state.
  const sidebar = new StubElement({ classes: ['sidebar'], children: [pickerToggle, pickerLabel, nav] });
// Original L192: Initializes document for 'compact navigation styles and versioned assets are present', supplying the value that the following test logic will inspect or mutate.
  const document = new StubElement(); document.ownerDocument = document; document.readyState = readyState; document.activeElement = null; setOwnerDocument(sidebar, document); document.append(sidebar);
// Original L193: Builds routes, the concrete fixture collection/object used as input for 'compact navigation styles and versioned assets are present'; its fields model the relevant domain records or DOM state.
  const routes = [...html.matchAll(/data-page="([^"]+)" data-title="([^"]+)"/g)];
// Original L194: Builds navigation, the concrete fixture collection/object used as input for 'compact navigation styles and versioned assets are present'; its fields model the relevant domain records or DOM state.
  const navigation = routes.map(([, page, title], index) => { const button = new StubElement({ classes: ['nav-link'] }); button.dataset = { page, title }; if (!index) button.setAttribute('aria-current', 'page'); panels[index < 4 ? 0 : index < 9 ? 1 : 2].append(button); return button; });
// Original L195: Builds title, the concrete fixture collection/object used as input for 'compact navigation styles and versioned assets are present'; its fields model the relevant domain records or DOM state.
  const title = { textContent: 'Home' }; const date = { textContent: '' }; const frame = new StubElement(); frame.src = 'html/home.html'; frame.contentWindow = { location: { href: 'https://local.test/timekeeper/html/home.html' }, postMessage() {} };
// Original L196: Mutates or reads mocked DOM style/class state in 'compact navigation styles and versioned assets are present' to verify the visible/accessibility effect of the production handler.
  document.documentElement = { style: { setProperty() {} }, dataset: {}, clientHeight: 800 }; document.body = { classList: new ClassList() }; document.querySelectorAll = selector => selector === '.nav-link[data-page]' ? navigation : [];
// Original L197: Sets `document.querySelector` (the query selector property of document) to a callback taking selector that checks checks that `selector` (selector) and ".sidebar" have the same value and type; if true chooses `sidebar` (sidebar), otherwise checks checks that `selector` (selector) and ".sidebar-nav" have the same value and type; if true chooses `nav` (nav), otherwise `frame` (frame).
  document.querySelector = selector => selector === '.sidebar' ? sidebar : selector === '.sidebar-nav' ? nav : frame; document.getElementById = id => id === 'active-page-title' ? title : date;
// Original L198: Builds window, the concrete fixture collection/object used as input for 'compact navigation styles and versioned assets are present'; its fields model the relevant domain records or DOM state.
  const window = { innerHeight: 800, location: { href: 'https://local.test/timekeeper/', origin: 'https://local.test' }, localStorage: { getItem() { return null; } }, addEventListener() {} };
// Original L199: Calls `vm.runInNewContext` with replaces matches of the regular expression `/^export /gm` used to match text in `shell` (shell) with ""; an object with fields document: `document` (document); window: `window` (window); Intl: `Intl` (intl); URL: `URL` (url); console: `console` (console).
  vm.runInNewContext(shell.replace(/^export /gm, ''), { document, window, Intl, URL, console });
// Original L200: Returns the fixture/helper result needed by the 'compact navigation styles and versioned assets are present' test, preserving the modeled state for its caller.
  return { document, frame, navigation, title, date, groups, toggles, panels, pickerToggle, pickerLabel };
// Original L201: Closes the fixture, callback, loop, or test block for 'compact navigation styles and versioned assets are present'.
}
// Original L202: Blank line separates related setup or assertions for readability.

// Original L203: Starts an isolated test case whose title states the behavior being specified: self-contained shell boots and every route updates the frame, title, active group, and picker label.
test('self-contained shell boots and every route updates the frame, title, active group, and picker label', () => {
// Original L204: In the test 'self-contained shell boots and every route updates the frame, title, active group, and picker label', this negative equality assertion requires the compared expressions to differ: const { document, frame, navigation, title, date, toggles, panels, pickerLabel } = shellFixture(); document.dispatchEvent(event('DOMContentLoaded')); assert.notEqual(date.textContent, '');; this verifies independence or a deliberate change in behavior.
  const { document, frame, navigation, title, date, toggles, panels, pickerLabel } = shellFixture(); document.dispatchEvent(event('DOMContentLoaded')); assert.notEqual(date.textContent, '');
// Original L205: In the test 'self-contained shell boots and every route updates the frame, title, active group, and picker label', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(navigation.length, 10);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(navigation.length, 10);
// Original L206: In the test 'self-contained shell boots and every route updates the frame, title, active group, and picker label', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: for (const [index, button] of navigation.entries()) { const groupIndex = index < 4 ? 0 : index < 9 ? 1 : 2; if (panels[groupIndex].hidden) toggles[groupIndex].click(); button.click(); assert.equal(frame.src, button.dataset.page); assert.equal(title.textContent, button.dataset.title); assert.equal(button.getAttribute('aria-current'), 'page'); assert.equal(navigation.filter(item => item.getAttribute('aria-current') === 'page').length, 1); assert.equal(panels[groupIndex].hidden, false); assert.equal(toggles[groupIndex].getAttribute('data-current'), 'true'); assert.equal(pickerLabel.textContent, button.dataset.title); } });; the fixture therefore checks the concrete boundary/result contract.
  for (const [index, button] of navigation.entries()) { const groupIndex = index < 4 ? 0 : index < 9 ? 1 : 2; if (panels[groupIndex].hidden) toggles[groupIndex].click(); button.click(); assert.equal(frame.src, button.dataset.page); assert.equal(title.textContent, button.dataset.title); assert.equal(button.getAttribute('aria-current'), 'page'); assert.equal(navigation.filter(item => item.getAttribute('aria-current') === 'page').length, 1); assert.equal(panels[groupIndex].hidden, false); assert.equal(toggles[groupIndex].getAttribute('data-current'), 'true'); assert.equal(pickerLabel.textContent, button.dataset.title); }
// Original L207: In the test 'self-contained shell boots and every route updates the frame, title, active group, and picker label', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: for (const [index, button] of navigation.entries()) { const groupIndex = index < 4 ? 0 : index < 9 ? 1 : 2; if (panels[groupIndex].hidden) toggles[groupIndex].click(); button.click(); assert.equal(frame.src, button.dataset.page); assert.equal(title.textContent, button.dataset.title); assert.equal(button.getAttribute('aria-current'), 'page'); assert.equal(navigation.filter(item => item.getAttribute('aria-current') === 'page').length, 1); assert.equal(panels[groupIndex].hidden, false); assert.equal(toggles[groupIndex].getAttribute('data-current'), 'true'); assert.equal(pickerLabel.textContent, button.dataset.title); } });; the fixture therefore checks the concrete boundary/result contract.
});
// Original L208: Blank line separates related setup or assertions for readability.

// Original L209: Starts an isolated test case whose title states the behavior being specified: shell initializes when loaded after DOMContentLoaded and follows in-frame navigation.
test('shell initializes when loaded after DOMContentLoaded and follows in-frame navigation', () => {
// Original L210: In the test 'shell initializes when loaded after DOMContentLoaded and follows in-frame navigation', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: const { frame, navigation, title, date, panels } = shellFixture('complete'); assert.notEqual(date.textContent, ''); frame.contentWindow.location.href = 'https://local.test/timekeeper/html/settings.html'; frame.dispatchEvent(event('load')); assert.equal(title.textContent, 'Settings'); assert.equal(navigation[9].getAttribute('aria-current'), 'page'); assert.equal(panels[2].hidden, false); assert.equal(panels[0].hidden, true);; the fixture therefore checks the concrete boundary/result contract.
  const { frame, navigation, title, date, panels } = shellFixture('complete'); assert.notEqual(date.textContent, ''); frame.contentWindow.location.href = 'https://local.test/timekeeper/html/settings.html'; frame.dispatchEvent(event('load')); assert.equal(title.textContent, 'Settings'); assert.equal(navigation[9].getAttribute('aria-current'), 'page'); assert.equal(panels[2].hidden, false); assert.equal(panels[0].hidden, true);
// Original L211: Closes the fixture, callback, loop, or test block for 'shell initializes when loaded after DOMContentLoaded and follows in-frame navigation'.
});

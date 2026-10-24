# tests/navigation-groups.test.mjs

[Exact copy](../../original/tests/navigation-groups.test.source.mjs)

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
import fs from 'node:fs';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 4

```text
import path from 'node:path';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 5

```text
import { fileURLToPath } from 'node:url';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 6

```text
import vm from 'node:vm';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 7

```text
import { setupNavigationGroups, setupNavigationPicker } from '../scripts/index.js';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 8

```text

```

Blank line separates related setup or assertions for readability.

### Line 9

```text
const here = path.dirname(fileURLToPath(import.meta.url));
```

Initializes here for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 10

```text
const projectRoot = path.resolve(here, '..');
```

Initializes projectRoot for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 11

```text

```

Blank line separates related setup or assertions for readability.

### Line 12

```text
class ClassList {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 13

```text
  #values;
```

Continues the surrounding JavaScript expression or argument list. This line contributes #values;; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 14

```text
  constructor(values = []) { this.#values = new Set(values); }
```

Sets `this.#values` (the values property of this) to constructs a new instance of `Set` with `values` (values).

### Line 15

```text
  add(...values) { values.forEach(value => this.#values.add(value)); }
```

Runs a callback taking value that calls `this.#values.add` with `value` (value) once per item of `values` (values).

### Line 16

```text
  remove(...values) { values.forEach(value => this.#values.delete(value)); }
```

Runs a callback taking value that calls `this.#values.delete` with `value` (value) once per item of `values` (values).

### Line 17

```text
  contains(value) { return this.#values.has(value); }
```

Returns calls `this.#values.has` with `value` (value) to the caller and exits this function.

### Line 18

```text
  toggle(value, enabled) { if (enabled) this.add(value); else this.remove(value); return enabled; }
```

Returns `enabled` (enabled) to the caller and exits this function.

### Line 19

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 20

```text

```

Blank line separates related setup or assertions for readability.

### Line 21

```text
class StubElement {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 22

```text
  #listeners = new Map();
```

Continues the surrounding JavaScript expression or argument list. This line contributes #listeners = new Map();; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 23

```text
  constructor({ classes = [], attributes = {}, children = [] } = {}) {
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 24

```text
    this.classList = new ClassList(classes);
```

Mutates or reads mocked DOM style/class state in 'test setup' to verify the visible/accessibility effect of the production handler.

### Line 25

```text
    this.attributes = new Map(Object.entries(attributes));
```

Sets `this.attributes` (the attributes property of this) to constructs a new instance of `Map` with turns `attributes` (attributes) into [key, value] pairs.

### Line 26

```text
    this.children = [];
```

Sets `this.children` (the children property of this) to an array containing .

### Line 27

```text
    this.parentElement = null;
```

Sets `this.parentElement` (the parent element property of this) to null.

### Line 28

```text
    this.ownerDocument = null;
```

Sets `this.ownerDocument` (the owner document property of this) to null.

### Line 29

```text
    this.hidden = false;
```

Sets `this.hidden` (the hidden property of this) to false.

### Line 30

```text
    this.focusCount = 0;
```

Sets `this.focusCount` (the focus count property of this) to 0.

### Line 31

```text
    this.textContent = '';
```

Sets `this.textContent` (the text content property of this) to "".

### Line 32

```text
    this.dataset = {};
```

Sets `this.dataset` (the dataset property of this) to an object with fields .

### Line 33

```text
    children.forEach(child => this.append(child));
```

Runs a callback taking child that calls `this.append` with `child` (child) once per item of `children` (children).

### Line 34

```text
  }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 35

```text
  append(child) { child.parentElement = this; child.ownerDocument = this.ownerDocument; this.children.push(child); return child; }
```

Returns `child` (child) to the caller and exits this function.

### Line 36

```text
  contains(node) { return node === this || this.children.some(child => child.contains(node)); }
```

Returns uses checks that `node` (node) and this object instance have the same value and type when it is truthy, otherwise falls back to checks whether any item of `this.children` (the children property of this) passes a callback taking child that calls `child.contains` with `node` (node) to the caller and exits this function.

### Line 37

```text
  getAttribute(name) { return this.attributes.has(name) ? this.attributes.get(name) : null; }
```

Returns checks calls `this.attributes.has` with `name` (name); if true chooses calls `this.attributes.get` with `name` (name), otherwise null to the caller and exits this function.

### Line 38

```text
  hasAttribute(name) { return this.attributes.has(name); }
```

Returns calls `this.attributes.has` with `name` (name) to the caller and exits this function.

### Line 39

```text
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
```

Calls `this.attributes.set` with `name` (name); converts `value` (value) to text.

### Line 40

```text
  removeAttribute(name) { this.attributes.delete(name); }
```

Calls `this.attributes.delete` with `name` (name).

### Line 41

```text
  addEventListener(type, listener) { const listeners = this.#listeners.get(type) ?? []; listeners.push(listener); this.#listeners.set(type, listeners); }
```

Uses calls `this.#listeners.get` with `type` (type) unless it is null or undefined, then falls back to an array containing ; stores the result in `listeners`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 42

```text
  dispatchEvent(event) { event.target ??= this; event.currentTarget = this; for (const listener of this.#listeners.get(event.type) ?? []) listener.call(this, event); return !event.defaultPrevented; }
```

Simulates the user/browser event in 'test setup' so production event handlers run against the mock DOM.

### Line 43

```text
  click() { return this.dispatchEvent({ type: 'click', defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } }); }
```

Simulates the user/browser event in 'test setup' so production event handlers run against the mock DOM.

### Line 44

```text
  focus() { this.focusCount += 1; if (this.ownerDocument) this.ownerDocument.activeElement = this; }
```

Adds to `this.focusCount` (the focus count property of this) using 1.

### Line 45

```text
  querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; }
```

Returns uses the entry at index/key 0 in finds all descendants of this object instance matching CSS selector `selector` (selector) unless it is null or undefined, then falls back to null to the caller and exits this function.

### Line 46

```text
  querySelectorAll(selector) { const matches = []; const visit = node => { if (node.matches(selector)) matches.push(node); node.children.forEach(visit); }; this.children.forEach(visit); return matches; }
```

Begins a callback used by the 'test setup' test to model an event, loader, or transformation.

### Line 47

```text
  matches(selector) {
```

Continues the surrounding JavaScript expression or argument list. This line contributes matches(selector) {; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 48

```text
    if (selector.startsWith('.')) return this.classList.contains(selector.slice(1));
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 49

```text
    return false;
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 50

```text
  }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 51

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 52

```text

```

Blank line separates related setup or assertions for readability.

### Line 53

```text
class StubRoot extends StubElement {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 54

```text
  constructor(groups) { super({ classes: ['sidebar-nav'], children: groups }); }
```

Calls `super` with an object with fields classes: an array containing "sidebar-nav"; children: `groups` (groups).

### Line 55

```text
  querySelectorAll(selector) { if (selector === '.nav-group') return this.children; return super.querySelectorAll(selector); }
```

Returns `this.children` (the children property of this) to the caller and exits this function.

### Line 56

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 57

```text

```

Blank line separates related setup or assertions for readability.

### Line 58

```text
function setOwnerDocument(node, document) { node.ownerDocument = document; node.children.forEach(child => setOwnerDocument(child, document)); return node; }
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 59

```text
function event(type, extra = {}) { return { type, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...extra }; }
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 60

```text

```

Blank line separates related setup or assertions for readability.

### Line 61

```text
function makeGroup(name, { expanded = false } = {}) {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 62

```text
  const toggle = new StubElement({ classes: ['nav-group-toggle'], attributes: { 'aria-controls': `${name}-panel`, 'aria-expanded': String(expanded) } });
```

Builds toggle, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 63

```text
  const panel = new StubElement({ classes: ['nav-group-pages'], attributes: { id: `${name}-panel` } });
```

Builds panel, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 64

```text
  panel.hidden = !expanded;
```

Sets `panel.hidden` (the hidden property of panel) to negates the truthiness of `expanded` (expanded).

### Line 65

```text
  panel.append(new StubElement({ classes: ['nav-link'], attributes: { 'data-page': `html/${name}.html` } }));
```

Calls `panel.append` with constructs a new instance of `StubElement` with an object with fields classes: an array containing "nav-link"; attributes: an object with fields 'data-page': a text template that combines fixed text with computed values `name` (name).

### Line 66

```text
  return new StubElement({ classes: ['nav-group'], children: [toggle, panel] });
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

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
function fixture() {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 70

```text
  const groups = [makeGroup('workspace', { expanded: true }), makeGroup('manage'), makeGroup('preferences')];
```

Builds groups, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 71

```text
  const root = new StubRoot(groups);
```

Initializes root for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 72

```text
  return { root, groups, toggles: groups.map(group => group.querySelector('.nav-group-toggle')), panels: groups.map(group => group.querySelector('.nav-group-pages')) };
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 73

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 74

```text
function ariaExpanded(toggle) { return toggle.getAttribute('aria-expanded') === 'true'; }
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 75

```text

```

Blank line separates related setup or assertions for readability.

### Line 76

```text
test('navigation initialization reveals one active category and marks its toggle current', () => {
```

Starts an isolated test case whose title states the behavior being specified: navigation initialization reveals one active category and marks its toggle current.

### Line 77

```text
  const { root, groups, toggles, panels } = fixture();
```

Initializes { for 'navigation initialization reveals one active category and marks its toggle current', supplying the value that the following test logic will inspect or mutate.

### Line 78

```text
  const reveal = setupNavigationGroups(root);
```

Initializes reveal for 'navigation initialization reveals one active category and marks its toggle current', supplying the value that the following test logic will inspect or mutate.

### Line 79

```text
  reveal(groups[0].querySelector('.nav-link'));
```

Calls `reveal` with finds the first descendant of the entry at index/key 0 in `groups` (groups) matching CSS selector ".nav-link".

### Line 80

```text
  assert.equal(ariaExpanded(toggles[0]), true); assert.equal(panels[0].hidden, false);
```

In the test 'navigation initialization reveals one active category and marks its toggle current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ariaExpanded(toggles[0]), true); assert.equal(panels[0].hidden, false);; the fixture therefore checks the concrete boundary/result contract.

### Line 81

```text
  assert.equal(ariaExpanded(toggles[1]), false); assert.equal(panels[1].hidden, true);
```

In the test 'navigation initialization reveals one active category and marks its toggle current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ariaExpanded(toggles[1]), false); assert.equal(panels[1].hidden, true);; the fixture therefore checks the concrete boundary/result contract.

### Line 82

```text
  assert.equal(ariaExpanded(toggles[2]), false); assert.equal(panels[2].hidden, true);
```

In the test 'navigation initialization reveals one active category and marks its toggle current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ariaExpanded(toggles[2]), false); assert.equal(panels[2].hidden, true);; the fixture therefore checks the concrete boundary/result contract.

### Line 83

```text
  assert.equal(toggles[0].getAttribute('data-current'), 'true');
```

In the test 'navigation initialization reveals one active category and marks its toggle current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggles[0].getAttribute('data-current'), 'true');; the fixture therefore checks the concrete boundary/result contract.

### Line 84

```text
  assert.equal(toggles[0].hasAttribute('aria-disabled'), false);
```

In the test 'navigation initialization reveals one active category and marks its toggle current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggles[0].hasAttribute('aria-disabled'), false);; the fixture therefore checks the concrete boundary/result contract.

### Line 85

```text
});
```

Closes the fixture, callback, loop, or test block for 'navigation initialization reveals one active category and marks its toggle current'.

### Line 86

```text

```

Blank line separates related setup or assertions for readability.

### Line 87

```text
test('category toggles are regular accordion controls with only one open at once', () => {
```

Starts an isolated test case whose title states the behavior being specified: category toggles are regular accordion controls with only one open at once.

### Line 88

```text
  const { root, groups, toggles, panels } = fixture();
```

Initializes { for 'category toggles are regular accordion controls with only one open at once', supplying the value that the following test logic will inspect or mutate.

### Line 89

```text
  const reveal = setupNavigationGroups(root); reveal(groups[0].querySelector('.nav-link'));
```

Builds reveal, the concrete fixture collection/object used as input for 'category toggles are regular accordion controls with only one open at once'; its fields model the relevant domain records or DOM state.

### Line 90

```text
  toggles[1].click();
```

Simulates the user/browser event in 'category toggles are regular accordion controls with only one open at once' so production event handlers run against the mock DOM.

### Line 91

```text
  assert.equal(ariaExpanded(toggles[1]), true); assert.equal(panels[1].hidden, false);
```

In the test 'category toggles are regular accordion controls with only one open at once', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ariaExpanded(toggles[1]), true); assert.equal(panels[1].hidden, false);; the fixture therefore checks the concrete boundary/result contract.

### Line 92

```text
  assert.equal(ariaExpanded(toggles[0]), false); assert.equal(panels[0].hidden, true);
```

In the test 'category toggles are regular accordion controls with only one open at once', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ariaExpanded(toggles[0]), false); assert.equal(panels[0].hidden, true);; the fixture therefore checks the concrete boundary/result contract.

### Line 93

```text
  toggles[1].click(); assert.equal(ariaExpanded(toggles[1]), false); assert.equal(panels[1].hidden, true);
```

In the test 'category toggles are regular accordion controls with only one open at once', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: toggles[1].click(); assert.equal(ariaExpanded(toggles[1]), false); assert.equal(panels[1].hidden, true);; the fixture therefore checks the concrete boundary/result contract.

### Line 94

```text
  assert.equal(toggles[0].hasAttribute('aria-disabled'), false);
```

In the test 'category toggles are regular accordion controls with only one open at once', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggles[0].hasAttribute('aria-disabled'), false);; the fixture therefore checks the concrete boundary/result contract.

### Line 95

```text
});
```

Closes the fixture, callback, loop, or test block for 'category toggles are regular accordion controls with only one open at once'.

### Line 96

```text

```

Blank line separates related setup or assertions for readability.

### Line 97

```text
test('reveal activates its category, closes others, and updates data-current', () => {
```

Starts an isolated test case whose title states the behavior being specified: reveal activates its category, closes others, and updates data-current.

### Line 98

```text
  const { root, groups, toggles, panels } = fixture();
```

Initializes { for 'reveal activates its category, closes others, and updates data-current', supplying the value that the following test logic will inspect or mutate.

### Line 99

```text
  const reveal = setupNavigationGroups(root); reveal(groups[2].querySelector('.nav-link'));
```

Builds reveal, the concrete fixture collection/object used as input for 'reveal activates its category, closes others, and updates data-current'; its fields model the relevant domain records or DOM state.

### Line 100

```text
  assert.equal(ariaExpanded(toggles[2]), true); assert.equal(panels[2].hidden, false);
```

In the test 'reveal activates its category, closes others, and updates data-current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ariaExpanded(toggles[2]), true); assert.equal(panels[2].hidden, false);; the fixture therefore checks the concrete boundary/result contract.

### Line 101

```text
  assert.equal(ariaExpanded(toggles[0]), false); assert.equal(ariaExpanded(toggles[1]), false);
```

In the test 'reveal activates its category, closes others, and updates data-current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ariaExpanded(toggles[0]), false); assert.equal(ariaExpanded(toggles[1]), false);; the fixture therefore checks the concrete boundary/result contract.

### Line 102

```text
  assert.equal(toggles[2].getAttribute('data-current'), 'true');
```

In the test 'reveal activates its category, closes others, and updates data-current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggles[2].getAttribute('data-current'), 'true');; the fixture therefore checks the concrete boundary/result contract.

### Line 103

```text
  assert.equal(toggles[0].hasAttribute('data-current'), false);
```

In the test 'reveal activates its category, closes others, and updates data-current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggles[0].hasAttribute('data-current'), false);; the fixture therefore checks the concrete boundary/result contract.

### Line 104

```text
  assert.equal(toggles[1].hasAttribute('data-current'), false);
```

In the test 'reveal activates its category, closes others, and updates data-current', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggles[1].hasAttribute('data-current'), false);; the fixture therefore checks the concrete boundary/result contract.

### Line 105

```text
});
```

Closes the fixture, callback, loop, or test block for 'reveal activates its category, closes others, and updates data-current'.

### Line 106

```text

```

Blank line separates related setup or assertions for readability.

### Line 107

```text
test('reveal is inert for an unrelated button and does not steal focus or navigate', () => {
```

Starts an isolated test case whose title states the behavior being specified: reveal is inert for an unrelated button and does not steal focus or navigate.

### Line 108

```text
  const { root, groups } = fixture(); const reveal = setupNavigationGroups(root);
```

Initializes { for 'reveal is inert for an unrelated button and does not steal focus or navigate', supplying the value that the following test logic will inspect or mutate.

### Line 109

```text
  const link = groups[0].querySelector('.nav-link'); const page = link.getAttribute('data-page'); reveal(link);
```

Builds link, the concrete fixture collection/object used as input for 'reveal is inert for an unrelated button and does not steal focus or navigate'; its fields model the relevant domain records or DOM state.

### Line 110

```text
  assert.equal(link.getAttribute('data-page'), page); assert.equal(link.focusCount, 0);
```

In the test 'reveal is inert for an unrelated button and does not steal focus or navigate', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(link.getAttribute('data-page'), page); assert.equal(link.focusCount, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 111

```text
  reveal(new StubElement()); assert.equal(link.getAttribute('data-page'), page);
```

In the test 'reveal is inert for an unrelated button and does not steal focus or navigate', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: reveal(new StubElement()); assert.equal(link.getAttribute('data-page'), page);; the fixture therefore checks the concrete boundary/result contract.

### Line 112

```text
});
```

Closes the fixture, callback, loop, or test block for 'reveal is inert for an unrelated button and does not steal focus or navigate'.

### Line 113

```text

```

Blank line separates related setup or assertions for readability.

### Line 114

```text
function pickerFixture() {
```

Declares a test-only helper/type that models the application behavior needed by 'reveal is inert for an unrelated button and does not steal focus or navigate'.

### Line 115

```text
  const document = new StubElement(); document.ownerDocument = document; document.defaultView = document; document.activeElement = null;
```

Initializes document for 'reveal is inert for an unrelated button and does not steal focus or navigate', supplying the value that the following test logic will inspect or mutate.

### Line 116

```text
  const toggle = new StubElement({ classes: ['nav-picker-toggle'], attributes: { 'aria-expanded': 'true' } });
```

Builds toggle, the concrete fixture collection/object used as input for 'reveal is inert for an unrelated button and does not steal focus or navigate'; its fields model the relevant domain records or DOM state.

### Line 117

```text
  const label = new StubElement({ classes: ['nav-picker-label'] }); label.textContent = 'Home';
```

Builds label, the concrete fixture collection/object used as input for 'reveal is inert for an unrelated button and does not steal focus or navigate'; its fields model the relevant domain records or DOM state.

### Line 118

```text
  const nav = new StubRoot([]); nav.classList.add('sidebar-nav');
```

Builds nav, the concrete fixture collection/object used as input for 'reveal is inert for an unrelated button and does not steal focus or navigate'; its fields model the relevant domain records or DOM state.

### Line 119

```text
  const root = new StubElement({ classes: ['sidebar'], children: [toggle, label, nav] });
```

Builds root, the concrete fixture collection/object used as input for 'reveal is inert for an unrelated button and does not steal focus or navigate'; its fields model the relevant domain records or DOM state.

### Line 120

```text
  setOwnerDocument(root, document); document.append(root);
```

Calls `setOwnerDocument` with `root` (root); `document` (document).

### Line 121

```text
  return { document, root, toggle, label, nav };
```

Returns the fixture/helper result needed by the 'reveal is inert for an unrelated button and does not steal focus or navigate' test, preserving the modeled state for its caller.

### Line 122

```text
}
```

Closes the fixture, callback, loop, or test block for 'reveal is inert for an unrelated button and does not steal focus or navigate'.

### Line 123

```text
function pickerButton(title, page = `html/${title.toLowerCase()}.html`) {
```

Declares a test-only helper/type that models the application behavior needed by 'reveal is inert for an unrelated button and does not steal focus or navigate'.

### Line 124

```text
  const button = new StubElement({ classes: ['nav-link'], attributes: { 'data-page': page } });
```

Builds button, the concrete fixture collection/object used as input for 'reveal is inert for an unrelated button and does not steal focus or navigate'; its fields model the relevant domain records or DOM state.

### Line 125

```text
  button.dataset = { title, page }; return button;
```

Returns `button` (button) to the caller and exits this function.

### Line 126

```text
}
```

Closes the fixture, callback, loop, or test block for 'reveal is inert for an unrelated button and does not steal focus or navigate'.

### Line 127

```text

```

Blank line separates related setup or assertions for readability.

### Line 128

```text
test('compact picker starts closed, toggles with click, and closes on Escape restoring focus', () => {
```

Starts an isolated test case whose title states the behavior being specified: compact picker starts closed, toggles with click, and closes on Escape restoring focus.

### Line 129

```text
  const { document, root, toggle, nav } = pickerFixture(); const select = setupNavigationPicker(root);
```

Initializes { for 'compact picker starts closed, toggles with click, and closes on Escape restoring focus', supplying the value that the following test logic will inspect or mutate.

### Line 130

```text
  assert.equal(nav.hidden, true); assert.equal(toggle.getAttribute('aria-expanded'), 'false');
```

In the test 'compact picker starts closed, toggles with click, and closes on Escape restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nav.hidden, true); assert.equal(toggle.getAttribute('aria-expanded'), 'false');; the fixture therefore checks the concrete boundary/result contract.

### Line 131

```text
  toggle.click(); assert.equal(nav.hidden, false); assert.equal(toggle.getAttribute('aria-expanded'), 'true');
```

In the test 'compact picker starts closed, toggles with click, and closes on Escape restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: toggle.click(); assert.equal(nav.hidden, false); assert.equal(toggle.getAttribute('aria-expanded'), 'true');; the fixture therefore checks the concrete boundary/result contract.

### Line 132

```text
  document.activeElement = toggle; const key = event('keydown', { key: 'Escape' }); root.dispatchEvent(key);
```

Simulates the user/browser event in 'compact picker starts closed, toggles with click, and closes on Escape restoring focus' so production event handlers run against the mock DOM.

### Line 133

```text
  assert.equal(key.defaultPrevented, true); assert.equal(nav.hidden, true); assert.equal(toggle.getAttribute('aria-expanded'), 'false'); assert.equal(toggle.focusCount, 1);
```

In the test 'compact picker starts closed, toggles with click, and closes on Escape restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(key.defaultPrevented, true); assert.equal(nav.hidden, true); assert.equal(toggle.getAttribute('aria-expanded'), 'false'); assert.equal(toggle.focusCount, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 134

```text
  assert.equal(typeof select, 'function');
```

In the test 'compact picker starts closed, toggles with click, and closes on Escape restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(typeof select, 'function');; the fixture therefore checks the concrete boundary/result contract.

### Line 135

```text
});
```

Closes the fixture, callback, loop, or test block for 'compact picker starts closed, toggles with click, and closes on Escape restoring focus'.

### Line 136

```text

```

Blank line separates related setup or assertions for readability.

### Line 137

```text
test('picker closes on outside pointerdown and focusout without restoring focus', () => {
```

Starts an isolated test case whose title states the behavior being specified: picker closes on outside pointerdown and focusout without restoring focus.

### Line 138

```text
  const { document, root, toggle, nav } = pickerFixture(); setupNavigationPicker(root); toggle.click();
```

Initializes { for 'picker closes on outside pointerdown and focusout without restoring focus', supplying the value that the following test logic will inspect or mutate.

### Line 139

```text
  document.dispatchEvent(event('pointerdown', { target: new StubElement() }));
```

Simulates the user/browser event in 'picker closes on outside pointerdown and focusout without restoring focus' so production event handlers run against the mock DOM.

### Line 140

```text
  assert.equal(nav.hidden, true); assert.equal(toggle.focusCount, 0);
```

In the test 'picker closes on outside pointerdown and focusout without restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nav.hidden, true); assert.equal(toggle.focusCount, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 141

```text
  toggle.click(); root.dispatchEvent(event('focusout', { relatedTarget: new StubElement() }));
```

Simulates the user/browser event in 'picker closes on outside pointerdown and focusout without restoring focus' so production event handlers run against the mock DOM.

### Line 142

```text
  assert.equal(nav.hidden, true); assert.equal(toggle.focusCount, 0);
```

In the test 'picker closes on outside pointerdown and focusout without restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nav.hidden, true); assert.equal(toggle.focusCount, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 143

```text
});
```

Closes the fixture, callback, loop, or test block for 'picker closes on outside pointerdown and focusout without restoring focus'.

### Line 144

```text

```

Blank line separates related setup or assertions for readability.

### Line 145

```text
test('picker closes on window blur without restoring focus', () => {
```

Starts an isolated test case whose title states the behavior being specified: picker closes on window blur without restoring focus.

### Line 146

```text
  const { document, root, toggle, nav } = pickerFixture();
```

Initializes { for 'picker closes on window blur without restoring focus', supplying the value that the following test logic will inspect or mutate.

### Line 147

```text
  setupNavigationPicker(root);
```

Calls `setupNavigationPicker` with `root` (root).

### Line 148

```text
  toggle.click();
```

Simulates the user/browser event in 'picker closes on window blur without restoring focus' so production event handlers run against the mock DOM.

### Line 149

```text
  document.activeElement = new StubElement();
```

Sets `document.activeElement` (the active element property of document) to constructs a new instance of `StubElement` with no arguments.

### Line 150

```text
  document.dispatchEvent(event('blur'));
```

Simulates the user/browser event in 'picker closes on window blur without restoring focus' so production event handlers run against the mock DOM.

### Line 151

```text
  assert.equal(nav.hidden, true);
```

In the test 'picker closes on window blur without restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nav.hidden, true);; the fixture therefore checks the concrete boundary/result contract.

### Line 152

```text
  assert.equal(toggle.focusCount, 0);
```

In the test 'picker closes on window blur without restoring focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggle.focusCount, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 153

```text
});
```

Closes the fixture, callback, loop, or test block for 'picker closes on window blur without restoring focus'.

### Line 154

```text

```

Blank line separates related setup or assertions for readability.

### Line 155

```text
test('picker select updates label and accessible name, closes, and restores focus only from inside panel', () => {
```

Starts an isolated test case whose title states the behavior being specified: picker select updates label and accessible name, closes, and restores focus only from inside panel.

### Line 156

```text
  const { document, root, toggle, label, nav } = pickerFixture(); const select = setupNavigationPicker(root);
```

Initializes { for 'picker select updates label and accessible name, closes, and restores focus only from inside panel', supplying the value that the following test logic will inspect or mutate.

### Line 157

```text
  const button = pickerButton('Planned jobs'); nav.append(button); toggle.click(); document.activeElement = button;
```

Initializes button for 'picker select updates label and accessible name, closes, and restores focus only from inside panel', supplying the value that the following test logic will inspect or mutate.

### Line 158

```text
  select(button);
```

Calls `select` with `button` (button).

### Line 159

```text
  assert.equal(label.textContent, 'Planned jobs'); assert.equal(toggle.getAttribute('aria-label'), 'Pages, current page: Planned jobs');
```

In the test 'picker select updates label and accessible name, closes, and restores focus only from inside panel', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(label.textContent, 'Planned jobs'); assert.equal(toggle.getAttribute('aria-label'), 'Pages, current page: Planned jobs');; the fixture therefore checks the concrete boundary/result contract.

### Line 160

```text
  assert.equal(nav.hidden, true); assert.equal(toggle.focusCount, 1);
```

In the test 'picker select updates label and accessible name, closes, and restores focus only from inside panel', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(nav.hidden, true); assert.equal(toggle.focusCount, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 161

```text
  toggle.click(); const outside = new StubElement(); document.activeElement = outside; select(button);
```

Simulates the user/browser event in 'picker select updates label and accessible name, closes, and restores focus only from inside panel' so production event handlers run against the mock DOM.

### Line 162

```text
  assert.equal(toggle.focusCount, 1);
```

In the test 'picker select updates label and accessible name, closes, and restores focus only from inside panel', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(toggle.focusCount, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 163

```text
});
```

Closes the fixture, callback, loop, or test block for 'picker select updates label and accessible name, closes, and restores focus only from inside panel'.

### Line 164

```text

```

Blank line separates related setup or assertions for readability.

### Line 165

```text
test('missing navigation roots are graceful', () => {
```

Starts an isolated test case whose title states the behavior being specified: missing navigation roots are graceful.

### Line 166

```text
  assert.doesNotThrow(() => setupNavigationGroups(null));
```

Asserts that calling setupNavigationGroups with no root element is safe and does not throw an error; optional navigation should tolerate a page without that UI.

### Line 167

```text
  assert.doesNotThrow(() => setupNavigationPicker(null));
```

Asserts that setupNavigationPicker also tolerates a null root instead of crashing; this protects pages that do not include the compact page picker.

### Line 168

```text
  assert.equal(typeof setupNavigationGroups(null), 'function'); assert.equal(typeof setupNavigationPicker(null), 'function');
```

In the test 'missing navigation roots are graceful', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(typeof setupNavigationGroups(null), 'function'); assert.equal(typeof setupNavigationPicker(null), 'function');; the fixture therefore checks the concrete boundary/result contract.

### Line 169

```text
});
```

Closes the fixture, callback, loop, or test block for 'missing navigation roots are graceful'.

### Line 170

```text

```

Blank line separates related setup or assertions for readability.

### Line 171

```text
test('index keeps all ten routes and defines the three named navigation groups', () => {
```

Starts an isolated test case whose title states the behavior being specified: index keeps all ten routes and defines the three named navigation groups.

### Line 172

```text
  const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
```

Initializes html for 'index keeps all ten routes and defines the three named navigation groups', supplying the value that the following test logic will inspect or mutate.

### Line 173

```text
  const routes = [...html.matchAll(/data-page=["']([^"']+)["']/g)].map(match => match[1]);
```

Builds routes, the concrete fixture collection/object used as input for 'index keeps all ten routes and defines the three named navigation groups'; its fields model the relevant domain records or DOM state.

### Line 174

```text
  assert.deepEqual(routes, ['html/home.html', 'html/clock.html', 'html/viewshifts.html', 'html/planned.html', 'html/pay-period-review.html', 'html/basic-data.html', 'html/payledger.html', 'html/ledger-archive.html', 'html/invoice.html', 'html/settings.html']);
```

Calls `assert.deepEqual` with `routes` (routes); an array containing "html/home.html", "html/clock.html", "html/viewshifts.html", "html/planned.html", "html/pay-period-review.html", and 5 more entries.

### Line 175

```text
  const classAttributes = [...html.matchAll(/class=["']([^"']+)["']/g)].map(match => match[1]);
```

Builds classAttributes, the concrete fixture collection/object used as input for 'index keeps all ten routes and defines the three named navigation groups'; its fields model the relevant domain records or DOM state.

### Line 176

```text
  assert.equal(classAttributes.filter(value => value.split(/\s+/).includes('nav-group')).length, 3);
```

In the test 'index keeps all ten routes and defines the three named navigation groups', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(classAttributes.filter(value => value.split(/\s+/).includes('nav-group')).length, 3);; the fixture therefore checks the concrete boundary/result contract.

### Line 177

```text
  assert.match(html, /Workspace/i); assert.match(html, /Manage/i); assert.match(html, /Preferences/i);
```

In the test 'index keeps all ten routes and defines the three named navigation groups', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(html, /Workspace/i); assert.match(html, /Manage/i); assert.match(html, /Preferences/i);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 178

```text
});
```

Closes the fixture, callback, loop, or test block for 'index keeps all ten routes and defines the three named navigation groups'.

### Line 179

```text

```

Blank line separates related setup or assertions for readability.

### Line 180

```text
test('compact navigation styles and versioned assets are present', () => {
```

Starts an isolated test case whose title states the behavior being specified: compact navigation styles and versioned assets are present.

### Line 181

```text
  const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8'); const css = fs.readFileSync(path.join(projectRoot, 'styles/style.css'), 'utf8');
```

Initializes html for 'compact navigation styles and versioned assets are present', supplying the value that the following test logic will inspect or mutate.

### Line 182

```text
  assert.match(html, /(?:index\.js|style\.css)\?v=compact-nav-1/);
```

In the test 'compact navigation styles and versioned assets are present', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(html, /(?:index\.js|style\.css)\?v=compact-nav-1/);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 183

```text
  assert.match(css, /\.sidebar-nav[^{}]*\[hidden\]|\[hidden\][^{}]*\.sidebar-nav/s);
```

In the test 'compact navigation styles and versioned assets are present', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(css, /\.sidebar-nav[^{}]*\[hidden\]|\[hidden\][^{}]*\.sidebar-nav/s);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 184

```text
  assert.match(css, /@media[^{]*(?:max-width|min-width)[^{]*\{[\s\S]*?sidebar-nav/s);
```

In the test 'compact navigation styles and versioned assets are present', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(css, /@media[^{]*(?:max-width|min-width)[^{]*\{[\s\S]*?sidebar-nav/s);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 185

```text
});
```

Closes the fixture, callback, loop, or test block for 'compact navigation styles and versioned assets are present'.

### Line 186

```text

```

Blank line separates related setup or assertions for readability.

### Line 187

```text
function shellFixture(readyState = 'loading') {
```

Declares a test-only helper/type that models the application behavior needed by 'compact navigation styles and versioned assets are present'.

### Line 188

```text
  const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8'); const shell = fs.readFileSync(path.join(projectRoot, 'scripts/index.js'), 'utf8');
```

Initializes html for 'compact navigation styles and versioned assets are present', supplying the value that the following test logic will inspect or mutate.

### Line 189

```text
  const { root: nav, groups, toggles, panels } = fixture(); panels.forEach(panel => { panel.children = []; });
```

Builds {, the concrete fixture collection/object used as input for 'compact navigation styles and versioned assets are present'; its fields model the relevant domain records or DOM state.

### Line 190

```text
  const pickerToggle = new StubElement({ classes: ['nav-picker-toggle'] }); const pickerLabel = new StubElement({ classes: ['nav-picker-label'] });
```

Builds pickerToggle, the concrete fixture collection/object used as input for 'compact navigation styles and versioned assets are present'; its fields model the relevant domain records or DOM state.

### Line 191

```text
  const sidebar = new StubElement({ classes: ['sidebar'], children: [pickerToggle, pickerLabel, nav] });
```

Builds sidebar, the concrete fixture collection/object used as input for 'compact navigation styles and versioned assets are present'; its fields model the relevant domain records or DOM state.

### Line 192

```text
  const document = new StubElement(); document.ownerDocument = document; document.readyState = readyState; document.activeElement = null; setOwnerDocument(sidebar, document); document.append(sidebar);
```

Initializes document for 'compact navigation styles and versioned assets are present', supplying the value that the following test logic will inspect or mutate.

### Line 193

```text
  const routes = [...html.matchAll(/data-page="([^"]+)" data-title="([^"]+)"/g)];
```

Builds routes, the concrete fixture collection/object used as input for 'compact navigation styles and versioned assets are present'; its fields model the relevant domain records or DOM state.

### Line 194

```text
  const navigation = routes.map(([, page, title], index) => { const button = new StubElement({ classes: ['nav-link'] }); button.dataset = { page, title }; if (!index) button.setAttribute('aria-current', 'page'); panels[index < 4 ? 0 : index < 9 ? 1 : 2].append(button); return button; });
```

Builds navigation, the concrete fixture collection/object used as input for 'compact navigation styles and versioned assets are present'; its fields model the relevant domain records or DOM state.

### Line 195

```text
  const title = { textContent: 'Home' }; const date = { textContent: '' }; const frame = new StubElement(); frame.src = 'html/home.html'; frame.contentWindow = { location: { href: 'https://local.test/timekeeper/html/home.html' }, postMessage() {} };
```

Builds title, the concrete fixture collection/object used as input for 'compact navigation styles and versioned assets are present'; its fields model the relevant domain records or DOM state.

### Line 196

```text
  document.documentElement = { style: { setProperty() {} }, dataset: {}, clientHeight: 800 }; document.body = { classList: new ClassList() }; document.querySelectorAll = selector => selector === '.nav-link[data-page]' ? navigation : [];
```

Mutates or reads mocked DOM style/class state in 'compact navigation styles and versioned assets are present' to verify the visible/accessibility effect of the production handler.

### Line 197

```text
  document.querySelector = selector => selector === '.sidebar' ? sidebar : selector === '.sidebar-nav' ? nav : frame; document.getElementById = id => id === 'active-page-title' ? title : date;
```

Sets `document.querySelector` (the query selector property of document) to a callback taking selector that checks checks that `selector` (selector) and ".sidebar" have the same value and type; if true chooses `sidebar` (sidebar), otherwise checks checks that `selector` (selector) and ".sidebar-nav" have the same value and type; if true chooses `nav` (nav), otherwise `frame` (frame).

### Line 198

```text
  const window = { innerHeight: 800, location: { href: 'https://local.test/timekeeper/', origin: 'https://local.test' }, localStorage: { getItem() { return null; } }, addEventListener() {} };
```

Builds window, the concrete fixture collection/object used as input for 'compact navigation styles and versioned assets are present'; its fields model the relevant domain records or DOM state.

### Line 199

```text
  vm.runInNewContext(shell.replace(/^export /gm, ''), { document, window, Intl, URL, console });
```

Calls `vm.runInNewContext` with replaces matches of the regular expression `/^export /gm` used to match text in `shell` (shell) with ""; an object with fields document: `document` (document); window: `window` (window); Intl: `Intl` (intl); URL: `URL` (url); console: `console` (console).

### Line 200

```text
  return { document, frame, navigation, title, date, groups, toggles, panels, pickerToggle, pickerLabel };
```

Returns the fixture/helper result needed by the 'compact navigation styles and versioned assets are present' test, preserving the modeled state for its caller.

### Line 201

```text
}
```

Closes the fixture, callback, loop, or test block for 'compact navigation styles and versioned assets are present'.

### Line 202

```text

```

Blank line separates related setup or assertions for readability.

### Line 203

```text
test('self-contained shell boots and every route updates the frame, title, active group, and picker label', () => {
```

Starts an isolated test case whose title states the behavior being specified: self-contained shell boots and every route updates the frame, title, active group, and picker label.

### Line 204

```text
  const { document, frame, navigation, title, date, toggles, panels, pickerLabel } = shellFixture(); document.dispatchEvent(event('DOMContentLoaded')); assert.notEqual(date.textContent, '');
```

In the test 'self-contained shell boots and every route updates the frame, title, active group, and picker label', this negative equality assertion requires the compared expressions to differ: const { document, frame, navigation, title, date, toggles, panels, pickerLabel } = shellFixture(); document.dispatchEvent(event('DOMContentLoaded')); assert.notEqual(date.textContent, '');; this verifies independence or a deliberate change in behavior.

### Line 205

```text
  assert.equal(navigation.length, 10);
```

In the test 'self-contained shell boots and every route updates the frame, title, active group, and picker label', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(navigation.length, 10);; the fixture therefore checks the concrete boundary/result contract.

### Line 206

```text
  for (const [index, button] of navigation.entries()) { const groupIndex = index < 4 ? 0 : index < 9 ? 1 : 2; if (panels[groupIndex].hidden) toggles[groupIndex].click(); button.click(); assert.equal(frame.src, button.dataset.page); assert.equal(title.textContent, button.dataset.title); assert.equal(button.getAttribute('aria-current'), 'page'); assert.equal(navigation.filter(item => item.getAttribute('aria-current') === 'page').length, 1); assert.equal(panels[groupIndex].hidden, false); assert.equal(toggles[groupIndex].getAttribute('data-current'), 'true'); assert.equal(pickerLabel.textContent, button.dataset.title); }
```

In the test 'self-contained shell boots and every route updates the frame, title, active group, and picker label', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: for (const [index, button] of navigation.entries()) { const groupIndex = index < 4 ? 0 : index < 9 ? 1 : 2; if (panels[groupIndex].hidden) toggles[groupIndex].click(); button.click(); assert.equal(frame.src, button.dataset.page); assert.equal(title.textContent, button.dataset.title); assert.equal(button.getAttribute('aria-current'), 'page'); assert.equal(navigation.filter(item => item.getAttribute('aria-current') === 'page').length, 1); assert.equal(panels[groupIndex].hidden, false); assert.equal(toggles[groupIndex].getAttribute('data-current'), 'true'); assert.equal(pickerLabel.textContent, button.dataset.title); } });; the fixture therefore checks the concrete boundary/result contract.

### Line 207

```text
});
```

In the test 'self-contained shell boots and every route updates the frame, title, active group, and picker label', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: for (const [index, button] of navigation.entries()) { const groupIndex = index < 4 ? 0 : index < 9 ? 1 : 2; if (panels[groupIndex].hidden) toggles[groupIndex].click(); button.click(); assert.equal(frame.src, button.dataset.page); assert.equal(title.textContent, button.dataset.title); assert.equal(button.getAttribute('aria-current'), 'page'); assert.equal(navigation.filter(item => item.getAttribute('aria-current') === 'page').length, 1); assert.equal(panels[groupIndex].hidden, false); assert.equal(toggles[groupIndex].getAttribute('data-current'), 'true'); assert.equal(pickerLabel.textContent, button.dataset.title); } });; the fixture therefore checks the concrete boundary/result contract.

### Line 208

```text

```

Blank line separates related setup or assertions for readability.

### Line 209

```text
test('shell initializes when loaded after DOMContentLoaded and follows in-frame navigation', () => {
```

Starts an isolated test case whose title states the behavior being specified: shell initializes when loaded after DOMContentLoaded and follows in-frame navigation.

### Line 210

```text
  const { frame, navigation, title, date, panels } = shellFixture('complete'); assert.notEqual(date.textContent, ''); frame.contentWindow.location.href = 'https://local.test/timekeeper/html/settings.html'; frame.dispatchEvent(event('load')); assert.equal(title.textContent, 'Settings'); assert.equal(navigation[9].getAttribute('aria-current'), 'page'); assert.equal(panels[2].hidden, false); assert.equal(panels[0].hidden, true);
```

In the test 'shell initializes when loaded after DOMContentLoaded and follows in-frame navigation', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: const { frame, navigation, title, date, panels } = shellFixture('complete'); assert.notEqual(date.textContent, ''); frame.contentWindow.location.href = 'https://local.test/timekeeper/html/settings.html'; frame.dispatchEvent(event('load')); assert.equal(title.textContent, 'Settings'); assert.equal(navigation[9].getAttribute('aria-current'), 'page'); assert.equal(panels[2].hidden, false); assert.equal(panels[0].hidden, true);; the fixture therefore checks the concrete boundary/result contract.

### Line 211

```text
});
```

Closes the fixture, callback, loop, or test block for 'shell initializes when loaded after DOMContentLoaded and follows in-frame navigation'.

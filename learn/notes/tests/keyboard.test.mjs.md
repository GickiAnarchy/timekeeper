# tests/keyboard.test.mjs

[Exact copy](../../original/tests/keyboard.test.source.mjs)

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
import { enableAutoScrollOnFocus } from '../scripts/keyboard.mjs';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 4

```text

```

Blank line separates related setup or assertions for readability.

### Line 5

```text
function createEventTarget() {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 6

```text
  const listeners = new Map();
```

Creates listeners, a test-side collection used to record listeners, DOM properties, calls, or unique results while testing 'test setup'.

### Line 7

```text
  return {
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 8

```text
    addEventListener(type, listener) {
```

Defines field addEventListener as a callback taking type, listener that runs its enclosed statements.

### Line 9

```text
      const callbacks = listeners.get(type) || [];
```

Builds callbacks, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 10

```text
      callbacks.push(listener);
```

Appends `listener` (listener) to `callbacks` (callbacks).

### Line 11

```text
      listeners.set(type, callbacks);
```

Calls `listeners.set` with `type` (type); `callbacks` (callbacks).

### Line 12

```text
    },
```

Closes callback function. Control continues after this block.

### Line 13

```text
    dispatch(type, event = {}) {
```

Defines field dispatch as a callback taking type, event = {} that runs its enclosed statements.

### Line 14

```text
      for (const listener of listeners.get(type) || []) listener(event);
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 15

```text
    },
```

Closes callback function. Control continues after this block.

### Line 16

```text
    listenerCount(type) {
```

Defines field listenerCount as a callback taking type that runs its enclosed statements.

### Line 17

```text
      return (listeners.get(type) || []).length;
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 18

```text
    }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 19

```text
  };
```

Closes the fixture, callback, loop, or test block for 'test setup'.

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
function createHarness() {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 23

```text
  const timers = [];
```

Builds timers, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 24

```text
  const viewport = Object.assign(createEventTarget(), { height: 800, width: 400, offsetTop: 0, offsetLeft: 0 });
```

Builds viewport, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 25

```text
  const view = Object.assign(createEventTarget(), {
```

Builds view, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 26

```text
    innerHeight: 800,
```

Sets the object field innerHeight using 800. This field is read later through its property name.

### Line 27

```text
    innerWidth: 400,
```

Sets the object field innerWidth using 400. This field is read later through its property name.

### Line 28

```text
    visualViewport: viewport,
```

Sets the object field visualViewport using viewport. This field is read later through its property name.

### Line 29

```text
    requestAnimationFrame(callback) { callback(); },
```

Calls `callback` with no arguments.

### Line 30

```text
    setTimeout(callback) { timers.push(callback); return timers.length; }
```

Returns `timers.length` (the length property of timers) to the caller and exits this function.

### Line 31

```text
  });
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 32

```text
  const document = Object.assign(createEventTarget(), {
```

Builds document, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 33

```text
    defaultView: view,
```

Sets the object field defaultView using view. This field is read later through its property name.

### Line 34

```text
    documentElement: { clientHeight: 800, clientWidth: 400 },
```

Sets the object field clientWidth using 400. This field is read later through its property name.

### Line 35

```text
    activeElement: null
```

Sets the object field activeElement using null. This field is read later through its property name.

### Line 36

```text
  });
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 37

```text
  return { document, view, viewport, timers };
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 38

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 39

```text

```

Blank line separates related setup or assertions for readability.

### Line 40

```text
function createControl(tagName, options = {}) {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 41

```text
  const { type = 'text', top = 760, bottom = 800, left = 10, right = 50, ...attributes } = options;
```

Initializes { for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 42

```text
  const scrollCalls = [];
```

Builds scrollCalls, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 43

```text
  return Object.assign({
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 44

```text
    tagName,
```

Sets the object field tagName using tagName. This field is read later through its property name.

### Line 45

```text
    type,
```

Sets the object field type using type. This field is read later through its property name.

### Line 46

```text
    disabled: false,
```

Sets the object field disabled using false. This field is read later through its property name.

### Line 47

```text
    readOnly: false,
```

Sets the object field readOnly using false. This field is read later through its property name.

### Line 48

```text
    isConnected: true,
```

Sets the object field isConnected using true. This field is read later through its property name.

### Line 49

```text
    scrollCalls,
```

Sets the object field scrollCalls using scrollCalls. This field is read later through its property name.

### Line 50

```text
    getBoundingClientRect() { return { top, bottom, left, right, height: bottom - top, width: right - left }; },
```

Returns an object with fields top: `top` (top); bottom: `bottom` (bottom); left: `left` (left); right: `right` (right); height: subtracts `top` (top) from `bottom` (bottom); width: subtracts `left` (left) from `right` (right) to the caller and exits this function.

### Line 51

```text
    hasAttribute(name) { return Object.hasOwn(attributes, name); },
```

Returns calls `Object.hasOwn` with `attributes` (attributes); `name` (name) to the caller and exits this function.

### Line 52

```text
    getAttribute(name) { return attributes[name] ?? null; },
```

Returns uses the entry at index/key `name` (name) in `attributes` (attributes) unless it is null or undefined, then falls back to null to the caller and exits this function.

### Line 53

```text
    scrollIntoView(options) { scrollCalls.push(options); }
```

Appends `options` (options) to `scrollCalls` (scroll calls).

### Line 54

```text
  }, attributes);
```

Continues the surrounding JavaScript expression or argument list. This line contributes }, attributes);; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 55

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 56

```text

```

Blank line separates related setup or assertions for readability.

### Line 57

```text
test('focused text fields and selects scroll into view when outside the viewport', () => {
```

Starts an isolated test case whose title states the behavior being specified: focused text fields and selects scroll into view when outside the viewport.

### Line 58

```text
  for (const control of [
```

Controls iteration/branching in the 'focused text fields and selects scroll into view when outside the viewport' test so each relevant fixture or environment condition is exercised.

### Line 59

```text
    createControl('INPUT', { top: 780, bottom: 820 }),
```

Sets the object field top using 780. This field is read later through its property name.

### Line 60

```text
    createControl('TEXTAREA', { top: 780, bottom: 820 }),
```

Sets the object field top using 780. This field is read later through its property name.

### Line 61

```text
    createControl('SELECT', { top: 780, bottom: 820 })
```

Sets the object field top using 780. This field is read later through its property name.

### Line 62

```text
  ]) {
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 63

```text
    const { document } = createHarness();
```

Initializes { for 'focused text fields and selects scroll into view when outside the viewport', supplying the value that the following test logic will inspect or mutate.

### Line 64

```text
    enableAutoScrollOnFocus(document);
```

Calls `enableAutoScrollOnFocus` with `document` (document).

### Line 65

```text
    document.activeElement = control;
```

Sets `document.activeElement` (the active element property of document) to `control` (control).

### Line 66

```text
    document.dispatch('focusin', { target: control });
```

Simulates the user/browser event in 'focused text fields and selects scroll into view when outside the viewport' so production event handlers run against the mock DOM.

### Line 67

```text

```

Blank line separates related setup or assertions for readability.

### Line 68

```text
    assert.equal(control.scrollCalls.length, 1);
```

In the test 'focused text fields and selects scroll into view when outside the viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(control.scrollCalls.length, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 69

```text
    assert.deepEqual(control.scrollCalls[0], {
```

Calls `assert.deepEqual` with the entry at index/key 0 in `control.scrollCalls` (the scroll calls property of control); an object with fields behavior: "auto"; block: "nearest"; inline: "nearest".

### Line 70

```text
      behavior: 'auto', block: 'nearest', inline: 'nearest'
```

Defines field behavior as "auto".

### Line 71

```text
    });
```

In the test 'focused text fields and selects scroll into view when outside the viewport', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(control.scrollCalls[0], { behavior: 'auto', block: 'nearest', inline: 'nearest' });; array order and object fields are part of the contract.

### Line 72

```text
  }
```

Closes the fixture, callback, loop, or test block for 'focused text fields and selects scroll into view when outside the viewport'.

### Line 73

```text
});
```

Closes the fixture, callback, loop, or test block for 'focused text fields and selects scroll into view when outside the viewport'.

### Line 74

```text

```

Blank line separates related setup or assertions for readability.

### Line 75

```text
test('buttons, non-text inputs, links, and tabindex elements are also revealed on focus', () => {
```

Starts an isolated test case whose title states the behavior being specified: buttons, non-text inputs, links, and tabindex elements are also revealed on focus.

### Line 76

```text
  const controls = [
```

Builds controls, the concrete fixture collection/object used as input for 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus'; its fields model the relevant domain records or DOM state.

### Line 77

```text
    createControl('BUTTON', { top: 780, bottom: 820 }),
```

Sets the object field top using 780. This field is read later through its property name.

### Line 78

```text
    createControl('INPUT', { type: 'checkbox', top: 780, bottom: 820 }),
```

Sets the object field top using 780. This field is read later through its property name.

### Line 79

```text
    createControl('INPUT', { type: 'radio', top: 780, bottom: 820 }),
```

Sets the object field top using 780. This field is read later through its property name.

### Line 80

```text
    createControl('A', { href: '/ledger', top: 780, bottom: 820 }),
```

Sets the object field top using 780. This field is read later through its property name.

### Line 81

```text
    createControl('DIV', { tabindex: '-1', top: 780, bottom: 820 }),
```

Sets the object field top using 780. This field is read later through its property name.

### Line 82

```text
    createControl('DIV', { contentEditable: 'true', top: 780, bottom: 820 })
```

Sets the object field top using 780. This field is read later through its property name.

### Line 83

```text
  ];
```

Closes the fixture, callback, loop, or test block for 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus'.

### Line 84

```text

```

Blank line separates related setup or assertions for readability.

### Line 85

```text
  for (const control of controls) {
```

Controls iteration/branching in the 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus' test so each relevant fixture or environment condition is exercised.

### Line 86

```text
    const { document } = createHarness();
```

Initializes { for 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus', supplying the value that the following test logic will inspect or mutate.

### Line 87

```text
    enableAutoScrollOnFocus(document);
```

Calls `enableAutoScrollOnFocus` with `document` (document).

### Line 88

```text
    document.activeElement = control;
```

Sets `document.activeElement` (the active element property of document) to `control` (control).

### Line 89

```text
    document.dispatch('focusin', { target: control });
```

Simulates the user/browser event in 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus' so production event handlers run against the mock DOM.

### Line 90

```text
    assert.equal(control.scrollCalls.length, 1, `${control.tagName} ${control.type || ''}`);
```

In the test 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(control.scrollCalls.length, 1, `${control.tagName} ${control.type || ''}`);; the fixture therefore checks the concrete boundary/result contract.

### Line 91

```text
    assert.deepEqual(control.scrollCalls[0], {
```

Calls `assert.deepEqual` with the entry at index/key 0 in `control.scrollCalls` (the scroll calls property of control); an object with fields behavior: "auto"; block: "nearest"; inline: "nearest".

### Line 92

```text
      behavior: 'auto', block: 'nearest', inline: 'nearest'
```

Defines field behavior as "auto".

### Line 93

```text
    });
```

In the test 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(control.scrollCalls[0], { behavior: 'auto', block: 'nearest', inline: 'nearest' });; array order and object fields are part of the contract.

### Line 94

```text
  }
```

Closes the fixture, callback, loop, or test block for 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus'.

### Line 95

```text
});
```

Closes the fixture, callback, loop, or test block for 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus'.

### Line 96

```text

```

Blank line separates related setup or assertions for readability.

### Line 97

```text
test('a visual viewport resize rechecks the focused control after the keyboard opens', () => {
```

Starts an isolated test case whose title states the behavior being specified: a visual viewport resize rechecks the focused control after the keyboard opens.

### Line 98

```text
  const { document, viewport } = createHarness();
```

Initializes { for 'a visual viewport resize rechecks the focused control after the keyboard opens', supplying the value that the following test logic will inspect or mutate.

### Line 99

```text
  const control = createControl('INPUT', { top: 780, bottom: 820 });
```

Builds control, the concrete fixture collection/object used as input for 'a visual viewport resize rechecks the focused control after the keyboard opens'; its fields model the relevant domain records or DOM state.

### Line 100

```text
  enableAutoScrollOnFocus(document);
```

Calls `enableAutoScrollOnFocus` with `document` (document).

### Line 101

```text
  document.activeElement = control;
```

Sets `document.activeElement` (the active element property of document) to `control` (control).

### Line 102

```text
  document.dispatch('focusin', { target: control });
```

Simulates the user/browser event in 'a visual viewport resize rechecks the focused control after the keyboard opens' so production event handlers run against the mock DOM.

### Line 103

```text
  assert.equal(control.scrollCalls.length, 1);
```

In the test 'a visual viewport resize rechecks the focused control after the keyboard opens', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(control.scrollCalls.length, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 104

```text

```

Blank line separates related setup or assertions for readability.

### Line 105

```text
  viewport.height = 420;
```

Sets `viewport.height` (the height property of viewport) to 420.

### Line 106

```text
  viewport.dispatch('resize');
```

Simulates the user/browser event in 'a visual viewport resize rechecks the focused control after the keyboard opens' so production event handlers run against the mock DOM.

### Line 107

```text
  assert.equal(control.scrollCalls.length, 2);
```

In the test 'a visual viewport resize rechecks the focused control after the keyboard opens', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(control.scrollCalls.length, 2);; the fixture therefore checks the concrete boundary/result contract.

### Line 108

```text
});
```

Closes the fixture, callback, loop, or test block for 'a visual viewport resize rechecks the focused control after the keyboard opens'.

### Line 109

```text

```

Blank line separates related setup or assertions for readability.

### Line 110

```text
test('a focused control already inside the visible area is not repositioned', () => {
```

Starts an isolated test case whose title states the behavior being specified: a focused control already inside the visible area is not repositioned.

### Line 111

```text
  const { document } = createHarness();
```

Initializes { for 'a focused control already inside the visible area is not repositioned', supplying the value that the following test logic will inspect or mutate.

### Line 112

```text
  const control = createControl('INPUT', { top: 300, bottom: 340 });
```

Builds control, the concrete fixture collection/object used as input for 'a focused control already inside the visible area is not repositioned'; its fields model the relevant domain records or DOM state.

### Line 113

```text
  enableAutoScrollOnFocus(document);
```

Calls `enableAutoScrollOnFocus` with `document` (document).

### Line 114

```text
  document.activeElement = control;
```

Sets `document.activeElement` (the active element property of document) to `control` (control).

### Line 115

```text
  document.dispatch('focusin', { target: control });
```

Simulates the user/browser event in 'a focused control already inside the visible area is not repositioned' so production event handlers run against the mock DOM.

### Line 116

```text

```

Blank line separates related setup or assertions for readability.

### Line 117

```text
  assert.equal(control.scrollCalls.length, 0);
```

In the test 'a focused control already inside the visible area is not repositioned', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(control.scrollCalls.length, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 118

```text
});
```

Closes the fixture, callback, loop, or test block for 'a focused control already inside the visible area is not repositioned'.

### Line 119

```text

```

Blank line separates related setup or assertions for readability.

### Line 120

```text
test('a control fully visible at the viewport edge is left in place', () => {
```

Starts an isolated test case whose title states the behavior being specified: a control fully visible at the viewport edge is left in place.

### Line 121

```text
  const { document } = createHarness();
```

Initializes { for 'a control fully visible at the viewport edge is left in place', supplying the value that the following test logic will inspect or mutate.

### Line 122

```text
  const control = createControl('BUTTON', { top: 760, bottom: 800 });
```

Builds control, the concrete fixture collection/object used as input for 'a control fully visible at the viewport edge is left in place'; its fields model the relevant domain records or DOM state.

### Line 123

```text
  enableAutoScrollOnFocus(document);
```

Calls `enableAutoScrollOnFocus` with `document` (document).

### Line 124

```text
  document.activeElement = control;
```

Sets `document.activeElement` (the active element property of document) to `control` (control).

### Line 125

```text
  document.dispatch('focusin', { target: control });
```

Simulates the user/browser event in 'a control fully visible at the viewport edge is left in place' so production event handlers run against the mock DOM.

### Line 126

```text

```

Blank line separates related setup or assertions for readability.

### Line 127

```text
  assert.equal(control.scrollCalls.length, 0);
```

In the test 'a control fully visible at the viewport edge is left in place', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(control.scrollCalls.length, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 128

```text
});
```

Closes the fixture, callback, loop, or test block for 'a control fully visible at the viewport edge is left in place'.

### Line 129

```text

```

Blank line separates related setup or assertions for readability.

### Line 130

```text
test('a focused control clipped horizontally is revealed', () => {
```

Starts an isolated test case whose title states the behavior being specified: a focused control clipped horizontally is revealed.

### Line 131

```text
  const { document } = createHarness();
```

Initializes { for 'a focused control clipped horizontally is revealed', supplying the value that the following test logic will inspect or mutate.

### Line 132

```text
  const control = createControl('BUTTON', { top: 300, bottom: 340, left: -10, right: 30 });
```

Builds control, the concrete fixture collection/object used as input for 'a focused control clipped horizontally is revealed'; its fields model the relevant domain records or DOM state.

### Line 133

```text
  enableAutoScrollOnFocus(document);
```

Calls `enableAutoScrollOnFocus` with `document` (document).

### Line 134

```text
  document.activeElement = control;
```

Sets `document.activeElement` (the active element property of document) to `control` (control).

### Line 135

```text
  document.dispatch('focusin', { target: control });
```

Simulates the user/browser event in 'a focused control clipped horizontally is revealed' so production event handlers run against the mock DOM.

### Line 136

```text

```

Blank line separates related setup or assertions for readability.

### Line 137

```text
  assert.equal(control.scrollCalls.length, 1);
```

In the test 'a focused control clipped horizontally is revealed', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(control.scrollCalls.length, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 138

```text
  assert.deepEqual(control.scrollCalls[0], {
```

Calls `assert.deepEqual` with the entry at index/key 0 in `control.scrollCalls` (the scroll calls property of control); an object with fields behavior: "auto"; block: "nearest"; inline: "nearest".

### Line 139

```text
    behavior: 'auto', block: 'nearest', inline: 'nearest'
```

Defines field behavior as "auto".

### Line 140

```text
  });
```

In the test 'a focused control clipped horizontally is revealed', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(control.scrollCalls[0], { behavior: 'auto', block: 'nearest', inline: 'nearest' });; array order and object fields are part of the contract.

### Line 141

```text
});
```

Closes the fixture, callback, loop, or test block for 'a focused control clipped horizontally is revealed'.

### Line 142

```text

```

Blank line separates related setup or assertions for readability.

### Line 143

```text
function createDialogFor(control) {
```

Declares a test-only helper/type that models the application behavior needed by 'a focused control clipped horizontally is revealed'.

### Line 144

```text
  const properties = new Map();
```

Creates properties, a test-side collection used to record listeners, DOM properties, calls, or unique results while testing 'a focused control clipped horizontally is revealed'.

### Line 145

```text
  const style = {
```

Builds style, the concrete fixture collection/object used as input for 'a focused control clipped horizontally is revealed'; its fields model the relevant domain records or DOM state.

### Line 146

```text
    setProperty(name, value, priority = '') { properties.set(name, { value, priority }); },
```

Calls `properties.set` with `name` (name); an object with fields value: `value` (value); priority: `priority` (priority).

### Line 147

```text
    getPropertyValue(name) { return properties.get(name)?.value || ''; },
```

Returns uses `properties.get(name)?.value` (the value property of properties.get(name)); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "" to the caller and exits this function.

### Line 148

```text
    getPropertyPriority(name) { return properties.get(name)?.priority || ''; },
```

Returns uses `properties.get(name)?.priority` (the priority property of properties.get(name)); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "" to the caller and exits this function.

### Line 149

```text
    removeProperty(name) { properties.delete(name); }
```

Calls `properties.delete` with `name` (name).

### Line 150

```text
  };
```

Closes the fixture, callback, loop, or test block for 'a focused control clipped horizontally is revealed'.

### Line 151

```text
  const dialog = Object.assign(createEventTarget(), {
```

Builds dialog, the concrete fixture collection/object used as input for 'a focused control clipped horizontally is revealed'; its fields model the relevant domain records or DOM state.

### Line 152

```text
    tagName: 'DIALOG',
```

Sets the object field tagName using 'DIALOG'. This field is read later through its property name.

### Line 153

```text
    open: true,
```

Sets the object field open using true. This field is read later through its property name.

### Line 154

```text
    style,
```

Sets the object field style using style. This field is read later through its property name.

### Line 155

```text
    parentElement: null
```

Sets the object field parentElement using null. This field is read later through its property name.

### Line 156

```text
  });
```

Closes the fixture, callback, loop, or test block for 'a focused control clipped horizontally is revealed'.

### Line 157

```text
  control.parentElement = dialog;
```

Sets `control.parentElement` (the parent element property of control) to `dialog` (dialog).

### Line 158

```text
  return { dialog, properties };
```

Returns the fixture/helper result needed by the 'a focused control clipped horizontally is revealed' test, preserving the modeled state for its caller.

### Line 159

```text
}
```

Closes the fixture, callback, loop, or test block for 'a focused control clipped horizontally is revealed'.

### Line 160

```text

```

Blank line separates related setup or assertions for readability.

### Line 161

```text
test('a focused dialog action button is revealed when it falls below the viewport', () => {
```

Starts an isolated test case whose title states the behavior being specified: a focused dialog action button is revealed when it falls below the viewport.

### Line 162

```text
  const { document } = createHarness();
```

Initializes { for 'a focused dialog action button is revealed when it falls below the viewport', supplying the value that the following test logic will inspect or mutate.

### Line 163

```text
  const button = createControl('BUTTON', { top: 780, bottom: 820 });
```

Builds button, the concrete fixture collection/object used as input for 'a focused dialog action button is revealed when it falls below the viewport'; its fields model the relevant domain records or DOM state.

### Line 164

```text
  createDialogFor(button);
```

Calls `createDialogFor` with `button` (button).

### Line 165

```text
  enableAutoScrollOnFocus(document);
```

Calls `enableAutoScrollOnFocus` with `document` (document).

### Line 166

```text
  document.activeElement = button;
```

Sets `document.activeElement` (the active element property of document) to `button` (button).

### Line 167

```text
  document.dispatch('focusin', { target: button });
```

Simulates the user/browser event in 'a focused dialog action button is revealed when it falls below the viewport' so production event handlers run against the mock DOM.

### Line 168

```text

```

Blank line separates related setup or assertions for readability.

### Line 169

```text
  assert.equal(button.scrollCalls.length, 1);
```

In the test 'a focused dialog action button is revealed when it falls below the viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(button.scrollCalls.length, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 170

```text
  assert.deepEqual(button.scrollCalls[0], {
```

Calls `assert.deepEqual` with the entry at index/key 0 in `button.scrollCalls` (the scroll calls property of button); an object with fields behavior: "auto"; block: "nearest"; inline: "nearest".

### Line 171

```text
    behavior: 'auto', block: 'nearest', inline: 'nearest'
```

Defines field behavior as "auto".

### Line 172

```text
  });
```

In the test 'a focused dialog action button is revealed when it falls below the viewport', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(button.scrollCalls[0], { behavior: 'auto', block: 'nearest', inline: 'nearest' });; array order and object fields are part of the contract.

### Line 173

```text
});
```

Closes the fixture, callback, loop, or test block for 'a focused dialog action button is revealed when it falls below the viewport'.

### Line 174

```text

```

Blank line separates related setup or assertions for readability.

### Line 175

```text
test('focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', () => {
```

Starts an isolated test case whose title states the behavior being specified: focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close.

### Line 176

```text
  const { document, viewport } = createHarness();
```

Initializes { for 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', supplying the value that the following test logic will inspect or mutate.

### Line 177

```text
  const control = createControl('TEXTAREA');
```

Initializes control for 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', supplying the value that the following test logic will inspect or mutate.

### Line 178

```text
  const { dialog, properties } = createDialogFor(control);
```

Initializes { for 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', supplying the value that the following test logic will inspect or mutate.

### Line 179

```text
  properties.set('margin-block', { value: '3px', priority: 'important' });
```

Calls `properties.set` with "margin-block"; an object with fields value: "3px"; priority: "important".

### Line 180

```text
  enableAutoScrollOnFocus(document);
```

Calls `enableAutoScrollOnFocus` with `document` (document).

### Line 181

```text
  viewport.height = 420;
```

Sets `viewport.height` (the height property of viewport) to 420.

### Line 182

```text
  document.activeElement = control;
```

Sets `document.activeElement` (the active element property of document) to `control` (control).

### Line 183

```text
  document.dispatch('focusin', { target: control });
```

Simulates the user/browser event in 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close' so production event handlers run against the mock DOM.

### Line 184

```text

```

Blank line separates related setup or assertions for readability.

### Line 185

```text
  assert.equal(properties.get('position').value, 'fixed');
```

In the test 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('position').value, 'fixed');; the fixture therefore checks the concrete boundary/result contract.

### Line 186

```text
  assert.equal(properties.get('inset-block-start').value, '8px');
```

In the test 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('inset-block-start').value, '8px');; the fixture therefore checks the concrete boundary/result contract.

### Line 187

```text
  assert.equal(properties.get('inset-block-end').value, '388px');
```

In the test 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('inset-block-end').value, '388px');; the fixture therefore checks the concrete boundary/result contract.

### Line 188

```text
  assert.equal(properties.get('max-height').value, '404px');
```

In the test 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('max-height').value, '404px');; the fixture therefore checks the concrete boundary/result contract.

### Line 189

```text
  assert.equal(properties.get('margin-block').value, 'auto');
```

In the test 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('margin-block').value, 'auto');; the fixture therefore checks the concrete boundary/result contract.

### Line 190

```text

```

Blank line separates related setup or assertions for readability.

### Line 191

```text
  dialog.open = true;
```

Sets `dialog.open` (the open property of dialog) to true.

### Line 192

```text
  dialog.dispatch('close');
```

Simulates the user/browser event in 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close' so production event handlers run against the mock DOM.

### Line 193

```text
  assert.equal(properties.get('position').value, 'fixed');
```

In the test 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('position').value, 'fixed');; the fixture therefore checks the concrete boundary/result contract.

### Line 194

```text

```

Blank line separates related setup or assertions for readability.

### Line 195

```text
  dialog.open = false;
```

Sets `dialog.open` (the open property of dialog) to false.

### Line 196

```text
  dialog.dispatch('close');
```

Simulates the user/browser event in 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close' so production event handlers run against the mock DOM.

### Line 197

```text
  assert.equal(properties.has('position'), false);
```

In the test 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.has('position'), false);; the fixture therefore checks the concrete boundary/result contract.

### Line 198

```text
  assert.deepEqual(properties.get('margin-block'), { value: '3px', priority: 'important' });
```

Calls `assert.deepEqual` with calls `properties.get` with "margin-block"; an object with fields value: "3px"; priority: "important".

### Line 199

```text
});
```

Closes the fixture, callback, loop, or test block for 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close'.

### Line 200

```text

```

Blank line separates related setup or assertions for readability.

### Line 201

```text
test('dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', () => {
```

Starts an isolated test case whose title states the behavior being specified: dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves.

### Line 202

```text
  const { document, viewport } = createHarness();
```

Initializes { for 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', supplying the value that the following test logic will inspect or mutate.

### Line 203

```text
  const control = createControl('INPUT');
```

Initializes control for 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', supplying the value that the following test logic will inspect or mutate.

### Line 204

```text
  const { properties } = createDialogFor(control);
```

Initializes { for 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', supplying the value that the following test logic will inspect or mutate.

### Line 205

```text
  enableAutoScrollOnFocus(document);
```

Calls `enableAutoScrollOnFocus` with `document` (document).

### Line 206

```text
  viewport.height = 400;
```

Sets `viewport.height` (the height property of viewport) to 400.

### Line 207

```text
  viewport.offsetTop = 120;
```

Sets `viewport.offsetTop` (the offset top property of viewport) to 120.

### Line 208

```text
  document.activeElement = control;
```

Sets `document.activeElement` (the active element property of document) to `control` (control).

### Line 209

```text
  document.dispatch('focusin', { target: control });
```

Simulates the user/browser event in 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves' so production event handlers run against the mock DOM.

### Line 210

```text
  assert.equal(properties.get('inset-block-start').value, '128px');
```

In the test 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('inset-block-start').value, '128px');; the fixture therefore checks the concrete boundary/result contract.

### Line 211

```text
  assert.equal(properties.get('inset-block-end').value, '288px');
```

In the test 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('inset-block-end').value, '288px');; the fixture therefore checks the concrete boundary/result contract.

### Line 212

```text

```

Blank line separates related setup or assertions for readability.

### Line 213

```text
  viewport.offsetTop = 150;
```

Sets `viewport.offsetTop` (the offset top property of viewport) to 150.

### Line 214

```text
  viewport.dispatch('scroll');
```

Simulates the user/browser event in 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves' so production event handlers run against the mock DOM.

### Line 215

```text
  assert.equal(properties.get('inset-block-start').value, '158px');
```

In the test 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('inset-block-start').value, '158px');; the fixture therefore checks the concrete boundary/result contract.

### Line 216

```text
  assert.equal(properties.get('inset-block-end').value, '258px');
```

In the test 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('inset-block-end').value, '258px');; the fixture therefore checks the concrete boundary/result contract.

### Line 217

```text

```

Blank line separates related setup or assertions for readability.

### Line 218

```text
  document.activeElement = null;
```

Sets `document.activeElement` (the active element property of document) to null.

### Line 219

```text
  document.dispatch('focusout');
```

Simulates the user/browser event in 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves' so production event handlers run against the mock DOM.

### Line 220

```text
  assert.equal(properties.size, 0);
```

In the test 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.size, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 221

```text
});
```

Closes the fixture, callback, loop, or test block for 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves'.

### Line 222

```text

```

Blank line separates related setup or assertions for readability.

### Line 223

```text
test('an open dialog adapts when the keyboard resize arrives after field focus', () => {
```

Starts an isolated test case whose title states the behavior being specified: an open dialog adapts when the keyboard resize arrives after field focus.

### Line 224

```text
  const { document, viewport } = createHarness();
```

Initializes { for 'an open dialog adapts when the keyboard resize arrives after field focus', supplying the value that the following test logic will inspect or mutate.

### Line 225

```text
  const control = createControl('TEXTAREA');
```

Initializes control for 'an open dialog adapts when the keyboard resize arrives after field focus', supplying the value that the following test logic will inspect or mutate.

### Line 226

```text
  const { properties } = createDialogFor(control);
```

Initializes { for 'an open dialog adapts when the keyboard resize arrives after field focus', supplying the value that the following test logic will inspect or mutate.

### Line 227

```text
  enableAutoScrollOnFocus(document);
```

Calls `enableAutoScrollOnFocus` with `document` (document).

### Line 228

```text
  document.activeElement = control;
```

Sets `document.activeElement` (the active element property of document) to `control` (control).

### Line 229

```text
  document.dispatch('focusin', { target: control });
```

Simulates the user/browser event in 'an open dialog adapts when the keyboard resize arrives after field focus' so production event handlers run against the mock DOM.

### Line 230

```text
  assert.equal(properties.size, 0);
```

In the test 'an open dialog adapts when the keyboard resize arrives after field focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.size, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 231

```text

```

Blank line separates related setup or assertions for readability.

### Line 232

```text
  viewport.height = 420;
```

Sets `viewport.height` (the height property of viewport) to 420.

### Line 233

```text
  viewport.dispatch('resize');
```

Simulates the user/browser event in 'an open dialog adapts when the keyboard resize arrives after field focus' so production event handlers run against the mock DOM.

### Line 234

```text
  assert.equal(properties.get('max-height').value, '404px');
```

In the test 'an open dialog adapts when the keyboard resize arrives after field focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('max-height').value, '404px');; the fixture therefore checks the concrete boundary/result contract.

### Line 235

```text
  assert.equal(properties.get('inset-block-end').value, '388px');
```

In the test 'an open dialog adapts when the keyboard resize arrives after field focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('inset-block-end').value, '388px');; the fixture therefore checks the concrete boundary/result contract.

### Line 236

```text
});
```

Closes the fixture, callback, loop, or test block for 'an open dialog adapts when the keyboard resize arrives after field focus'.

### Line 237

```text

```

Blank line separates related setup or assertions for readability.

### Line 238

```text
test('dialogs keep their original layout when the visual viewport has not reduced', () => {
```

Starts an isolated test case whose title states the behavior being specified: dialogs keep their original layout when the visual viewport has not reduced.

### Line 239

```text
  const { document } = createHarness();
```

Initializes { for 'dialogs keep their original layout when the visual viewport has not reduced', supplying the value that the following test logic will inspect or mutate.

### Line 240

```text
  const control = createControl('SELECT');
```

Initializes control for 'dialogs keep their original layout when the visual viewport has not reduced', supplying the value that the following test logic will inspect or mutate.

### Line 241

```text
  const { properties } = createDialogFor(control);
```

Initializes { for 'dialogs keep their original layout when the visual viewport has not reduced', supplying the value that the following test logic will inspect or mutate.

### Line 242

```text
  enableAutoScrollOnFocus(document);
```

Calls `enableAutoScrollOnFocus` with `document` (document).

### Line 243

```text
  document.activeElement = control;
```

Sets `document.activeElement` (the active element property of document) to `control` (control).

### Line 244

```text
  document.dispatch('focusin', { target: control });
```

Simulates the user/browser event in 'dialogs keep their original layout when the visual viewport has not reduced' so production event handlers run against the mock DOM.

### Line 245

```text
  assert.equal(properties.size, 0);
```

In the test 'dialogs keep their original layout when the visual viewport has not reduced', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.size, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 246

```text
});
```

Closes the fixture, callback, loop, or test block for 'dialogs keep their original layout when the visual viewport has not reduced'.

### Line 247

```text

```

Blank line separates related setup or assertions for readability.

### Line 248

```text
test('non-focusable controls are ignored and initialization is idempotent', () => {
```

Starts an isolated test case whose title states the behavior being specified: non-focusable controls are ignored and initialization is idempotent.

### Line 249

```text
  const { document } = createHarness();
```

Initializes { for 'non-focusable controls are ignored and initialization is idempotent', supplying the value that the following test logic will inspect or mutate.

### Line 250

```text
  enableAutoScrollOnFocus(document);
```

Calls `enableAutoScrollOnFocus` with `document` (document).

### Line 251

```text
  enableAutoScrollOnFocus(document);
```

Calls `enableAutoScrollOnFocus` with `document` (document).

### Line 252

```text
  assert.equal(document.listenerCount('focusin'), 1);
```

In the test 'non-focusable controls are ignored and initialization is idempotent', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(document.listenerCount('focusin'), 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 253

```text

```

Blank line separates related setup or assertions for readability.

### Line 254

```text
  const disabledButton = createControl('BUTTON', { top: 780, bottom: 820 });
```

Builds disabledButton, the concrete fixture collection/object used as input for 'non-focusable controls are ignored and initialization is idempotent'; its fields model the relevant domain records or DOM state.

### Line 255

```text
  disabledButton.disabled = true;
```

Sets `disabledButton.disabled` (the disabled property of disabledButton) to true.

### Line 256

```text
  document.activeElement = disabledButton;
```

Sets `document.activeElement` (the active element property of document) to `disabledButton` (disabled button).

### Line 257

```text
  document.dispatch('focusin', { target: disabledButton });
```

Simulates the user/browser event in 'non-focusable controls are ignored and initialization is idempotent' so production event handlers run against the mock DOM.

### Line 258

```text
  assert.equal(disabledButton.scrollCalls.length, 0);
```

In the test 'non-focusable controls are ignored and initialization is idempotent', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(disabledButton.scrollCalls.length, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 259

```text

```

Blank line separates related setup or assertions for readability.

### Line 260

```text
  const hiddenInput = createControl('INPUT', { type: 'hidden', top: 780, bottom: 820 });
```

Builds hiddenInput, the concrete fixture collection/object used as input for 'non-focusable controls are ignored and initialization is idempotent'; its fields model the relevant domain records or DOM state.

### Line 261

```text
  document.activeElement = hiddenInput;
```

Sets `document.activeElement` (the active element property of document) to `hiddenInput` (hidden input).

### Line 262

```text
  document.dispatch('focusin', { target: hiddenInput });
```

Simulates the user/browser event in 'non-focusable controls are ignored and initialization is idempotent' so production event handlers run against the mock DOM.

### Line 263

```text
  assert.equal(hiddenInput.scrollCalls.length, 0);
```

In the test 'non-focusable controls are ignored and initialization is idempotent', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(hiddenInput.scrollCalls.length, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 264

```text
});
```

Closes the fixture, callback, loop, or test block for 'non-focusable controls are ignored and initialization is idempotent'.

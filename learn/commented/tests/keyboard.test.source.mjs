// Original L1: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import test from 'node:test';
// Original L2: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import assert from 'node:assert/strict';
// Original L3: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { enableAutoScrollOnFocus } from '../scripts/keyboard.mjs';
// Original L4: Blank line separates related setup or assertions for readability.

// Original L5: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function createEventTarget() {
// Original L6: Creates listeners, a test-side collection used to record listeners, DOM properties, calls, or unique results while testing 'test setup'.
  const listeners = new Map();
// Original L7: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
  return {
// Original L8: Defines field addEventListener as a callback taking type, listener that runs its enclosed statements.
    addEventListener(type, listener) {
// Original L9: Builds callbacks, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
      const callbacks = listeners.get(type) || [];
// Original L10: Appends `listener` (listener) to `callbacks` (callbacks).
      callbacks.push(listener);
// Original L11: Calls `listeners.set` with `type` (type); `callbacks` (callbacks).
      listeners.set(type, callbacks);
// Original L12: Closes callback function. Control continues after this block.
    },
// Original L13: Defines field dispatch as a callback taking type, event = {} that runs its enclosed statements.
    dispatch(type, event = {}) {
// Original L14: Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.
      for (const listener of listeners.get(type) || []) listener(event);
// Original L15: Closes callback function. Control continues after this block.
    },
// Original L16: Defines field listenerCount as a callback taking type that runs its enclosed statements.
    listenerCount(type) {
// Original L17: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
      return (listeners.get(type) || []).length;
// Original L18: Closes the fixture, callback, loop, or test block for 'test setup'.
    }
// Original L19: Closes the fixture, callback, loop, or test block for 'test setup'.
  };
// Original L20: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L21: Blank line separates related setup or assertions for readability.

// Original L22: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function createHarness() {
// Original L23: Builds timers, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const timers = [];
// Original L24: Builds viewport, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const viewport = Object.assign(createEventTarget(), { height: 800, width: 400, offsetTop: 0, offsetLeft: 0 });
// Original L25: Builds view, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const view = Object.assign(createEventTarget(), {
// Original L26: Sets the object field innerHeight using 800. This field is read later through its property name.
    innerHeight: 800,
// Original L27: Sets the object field innerWidth using 400. This field is read later through its property name.
    innerWidth: 400,
// Original L28: Sets the object field visualViewport using viewport. This field is read later through its property name.
    visualViewport: viewport,
// Original L29: Calls `callback` with no arguments.
    requestAnimationFrame(callback) { callback(); },
// Original L30: Returns `timers.length` (the length property of timers) to the caller and exits this function.
    setTimeout(callback) { timers.push(callback); return timers.length; }
// Original L31: Closes the fixture, callback, loop, or test block for 'test setup'.
  });
// Original L32: Builds document, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const document = Object.assign(createEventTarget(), {
// Original L33: Sets the object field defaultView using view. This field is read later through its property name.
    defaultView: view,
// Original L34: Sets the object field clientWidth using 400. This field is read later through its property name.
    documentElement: { clientHeight: 800, clientWidth: 400 },
// Original L35: Sets the object field activeElement using null. This field is read later through its property name.
    activeElement: null
// Original L36: Closes the fixture, callback, loop, or test block for 'test setup'.
  });
// Original L37: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
  return { document, view, viewport, timers };
// Original L38: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L39: Blank line separates related setup or assertions for readability.

// Original L40: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function createControl(tagName, options = {}) {
// Original L41: Initializes { for 'test setup', supplying the value that the following test logic will inspect or mutate.
  const { type = 'text', top = 760, bottom = 800, left = 10, right = 50, ...attributes } = options;
// Original L42: Builds scrollCalls, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const scrollCalls = [];
// Original L43: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
  return Object.assign({
// Original L44: Sets the object field tagName using tagName. This field is read later through its property name.
    tagName,
// Original L45: Sets the object field type using type. This field is read later through its property name.
    type,
// Original L46: Sets the object field disabled using false. This field is read later through its property name.
    disabled: false,
// Original L47: Sets the object field readOnly using false. This field is read later through its property name.
    readOnly: false,
// Original L48: Sets the object field isConnected using true. This field is read later through its property name.
    isConnected: true,
// Original L49: Sets the object field scrollCalls using scrollCalls. This field is read later through its property name.
    scrollCalls,
// Original L50: Returns an object with fields top: `top` (top); bottom: `bottom` (bottom); left: `left` (left); right: `right` (right); height: subtracts `top` (top) from `bottom` (bottom); width: subtracts `left` (left) from `right` (right) to the caller and exits this function.
    getBoundingClientRect() { return { top, bottom, left, right, height: bottom - top, width: right - left }; },
// Original L51: Returns calls `Object.hasOwn` with `attributes` (attributes); `name` (name) to the caller and exits this function.
    hasAttribute(name) { return Object.hasOwn(attributes, name); },
// Original L52: Returns uses the entry at index/key `name` (name) in `attributes` (attributes) unless it is null or undefined, then falls back to null to the caller and exits this function.
    getAttribute(name) { return attributes[name] ?? null; },
// Original L53: Appends `options` (options) to `scrollCalls` (scroll calls).
    scrollIntoView(options) { scrollCalls.push(options); }
// Original L54: Continues the surrounding JavaScript expression or argument list. This line contributes }, attributes);; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
  }, attributes);
// Original L55: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L56: Blank line separates related setup or assertions for readability.

// Original L57: Starts an isolated test case whose title states the behavior being specified: focused text fields and selects scroll into view when outside the viewport.
test('focused text fields and selects scroll into view when outside the viewport', () => {
// Original L58: Controls iteration/branching in the 'focused text fields and selects scroll into view when outside the viewport' test so each relevant fixture or environment condition is exercised.
  for (const control of [
// Original L59: Sets the object field top using 780. This field is read later through its property name.
    createControl('INPUT', { top: 780, bottom: 820 }),
// Original L60: Sets the object field top using 780. This field is read later through its property name.
    createControl('TEXTAREA', { top: 780, bottom: 820 }),
// Original L61: Sets the object field top using 780. This field is read later through its property name.
    createControl('SELECT', { top: 780, bottom: 820 })
// Original L62: Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.
  ]) {
// Original L63: Initializes { for 'focused text fields and selects scroll into view when outside the viewport', supplying the value that the following test logic will inspect or mutate.
    const { document } = createHarness();
// Original L64: Calls `enableAutoScrollOnFocus` with `document` (document).
    enableAutoScrollOnFocus(document);
// Original L65: Sets `document.activeElement` (the active element property of document) to `control` (control).
    document.activeElement = control;
// Original L66: Simulates the user/browser event in 'focused text fields and selects scroll into view when outside the viewport' so production event handlers run against the mock DOM.
    document.dispatch('focusin', { target: control });
// Original L67: Blank line separates related setup or assertions for readability.

// Original L68: In the test 'focused text fields and selects scroll into view when outside the viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(control.scrollCalls.length, 1);; the fixture therefore checks the concrete boundary/result contract.
    assert.equal(control.scrollCalls.length, 1);
// Original L69: Calls `assert.deepEqual` with the entry at index/key 0 in `control.scrollCalls` (the scroll calls property of control); an object with fields behavior: "auto"; block: "nearest"; inline: "nearest".
    assert.deepEqual(control.scrollCalls[0], {
// Original L70: Defines field behavior as "auto".
      behavior: 'auto', block: 'nearest', inline: 'nearest'
// Original L71: In the test 'focused text fields and selects scroll into view when outside the viewport', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(control.scrollCalls[0], { behavior: 'auto', block: 'nearest', inline: 'nearest' });; array order and object fields are part of the contract.
    });
// Original L72: Closes the fixture, callback, loop, or test block for 'focused text fields and selects scroll into view when outside the viewport'.
  }
// Original L73: Closes the fixture, callback, loop, or test block for 'focused text fields and selects scroll into view when outside the viewport'.
});
// Original L74: Blank line separates related setup or assertions for readability.

// Original L75: Starts an isolated test case whose title states the behavior being specified: buttons, non-text inputs, links, and tabindex elements are also revealed on focus.
test('buttons, non-text inputs, links, and tabindex elements are also revealed on focus', () => {
// Original L76: Builds controls, the concrete fixture collection/object used as input for 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus'; its fields model the relevant domain records or DOM state.
  const controls = [
// Original L77: Sets the object field top using 780. This field is read later through its property name.
    createControl('BUTTON', { top: 780, bottom: 820 }),
// Original L78: Sets the object field top using 780. This field is read later through its property name.
    createControl('INPUT', { type: 'checkbox', top: 780, bottom: 820 }),
// Original L79: Sets the object field top using 780. This field is read later through its property name.
    createControl('INPUT', { type: 'radio', top: 780, bottom: 820 }),
// Original L80: Sets the object field top using 780. This field is read later through its property name.
    createControl('A', { href: '/ledger', top: 780, bottom: 820 }),
// Original L81: Sets the object field top using 780. This field is read later through its property name.
    createControl('DIV', { tabindex: '-1', top: 780, bottom: 820 }),
// Original L82: Sets the object field top using 780. This field is read later through its property name.
    createControl('DIV', { contentEditable: 'true', top: 780, bottom: 820 })
// Original L83: Closes the fixture, callback, loop, or test block for 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus'.
  ];
// Original L84: Blank line separates related setup or assertions for readability.

// Original L85: Controls iteration/branching in the 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus' test so each relevant fixture or environment condition is exercised.
  for (const control of controls) {
// Original L86: Initializes { for 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus', supplying the value that the following test logic will inspect or mutate.
    const { document } = createHarness();
// Original L87: Calls `enableAutoScrollOnFocus` with `document` (document).
    enableAutoScrollOnFocus(document);
// Original L88: Sets `document.activeElement` (the active element property of document) to `control` (control).
    document.activeElement = control;
// Original L89: Simulates the user/browser event in 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus' so production event handlers run against the mock DOM.
    document.dispatch('focusin', { target: control });
// Original L90: In the test 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(control.scrollCalls.length, 1, `${control.tagName} ${control.type || ''}`);; the fixture therefore checks the concrete boundary/result contract.
    assert.equal(control.scrollCalls.length, 1, `${control.tagName} ${control.type || ''}`);
// Original L91: Calls `assert.deepEqual` with the entry at index/key 0 in `control.scrollCalls` (the scroll calls property of control); an object with fields behavior: "auto"; block: "nearest"; inline: "nearest".
    assert.deepEqual(control.scrollCalls[0], {
// Original L92: Defines field behavior as "auto".
      behavior: 'auto', block: 'nearest', inline: 'nearest'
// Original L93: In the test 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(control.scrollCalls[0], { behavior: 'auto', block: 'nearest', inline: 'nearest' });; array order and object fields are part of the contract.
    });
// Original L94: Closes the fixture, callback, loop, or test block for 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus'.
  }
// Original L95: Closes the fixture, callback, loop, or test block for 'buttons, non-text inputs, links, and tabindex elements are also revealed on focus'.
});
// Original L96: Blank line separates related setup or assertions for readability.

// Original L97: Starts an isolated test case whose title states the behavior being specified: a visual viewport resize rechecks the focused control after the keyboard opens.
test('a visual viewport resize rechecks the focused control after the keyboard opens', () => {
// Original L98: Initializes { for 'a visual viewport resize rechecks the focused control after the keyboard opens', supplying the value that the following test logic will inspect or mutate.
  const { document, viewport } = createHarness();
// Original L99: Builds control, the concrete fixture collection/object used as input for 'a visual viewport resize rechecks the focused control after the keyboard opens'; its fields model the relevant domain records or DOM state.
  const control = createControl('INPUT', { top: 780, bottom: 820 });
// Original L100: Calls `enableAutoScrollOnFocus` with `document` (document).
  enableAutoScrollOnFocus(document);
// Original L101: Sets `document.activeElement` (the active element property of document) to `control` (control).
  document.activeElement = control;
// Original L102: Simulates the user/browser event in 'a visual viewport resize rechecks the focused control after the keyboard opens' so production event handlers run against the mock DOM.
  document.dispatch('focusin', { target: control });
// Original L103: In the test 'a visual viewport resize rechecks the focused control after the keyboard opens', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(control.scrollCalls.length, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(control.scrollCalls.length, 1);
// Original L104: Blank line separates related setup or assertions for readability.

// Original L105: Sets `viewport.height` (the height property of viewport) to 420.
  viewport.height = 420;
// Original L106: Simulates the user/browser event in 'a visual viewport resize rechecks the focused control after the keyboard opens' so production event handlers run against the mock DOM.
  viewport.dispatch('resize');
// Original L107: In the test 'a visual viewport resize rechecks the focused control after the keyboard opens', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(control.scrollCalls.length, 2);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(control.scrollCalls.length, 2);
// Original L108: Closes the fixture, callback, loop, or test block for 'a visual viewport resize rechecks the focused control after the keyboard opens'.
});
// Original L109: Blank line separates related setup or assertions for readability.

// Original L110: Starts an isolated test case whose title states the behavior being specified: a focused control already inside the visible area is not repositioned.
test('a focused control already inside the visible area is not repositioned', () => {
// Original L111: Initializes { for 'a focused control already inside the visible area is not repositioned', supplying the value that the following test logic will inspect or mutate.
  const { document } = createHarness();
// Original L112: Builds control, the concrete fixture collection/object used as input for 'a focused control already inside the visible area is not repositioned'; its fields model the relevant domain records or DOM state.
  const control = createControl('INPUT', { top: 300, bottom: 340 });
// Original L113: Calls `enableAutoScrollOnFocus` with `document` (document).
  enableAutoScrollOnFocus(document);
// Original L114: Sets `document.activeElement` (the active element property of document) to `control` (control).
  document.activeElement = control;
// Original L115: Simulates the user/browser event in 'a focused control already inside the visible area is not repositioned' so production event handlers run against the mock DOM.
  document.dispatch('focusin', { target: control });
// Original L116: Blank line separates related setup or assertions for readability.

// Original L117: In the test 'a focused control already inside the visible area is not repositioned', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(control.scrollCalls.length, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(control.scrollCalls.length, 0);
// Original L118: Closes the fixture, callback, loop, or test block for 'a focused control already inside the visible area is not repositioned'.
});
// Original L119: Blank line separates related setup or assertions for readability.

// Original L120: Starts an isolated test case whose title states the behavior being specified: a control fully visible at the viewport edge is left in place.
test('a control fully visible at the viewport edge is left in place', () => {
// Original L121: Initializes { for 'a control fully visible at the viewport edge is left in place', supplying the value that the following test logic will inspect or mutate.
  const { document } = createHarness();
// Original L122: Builds control, the concrete fixture collection/object used as input for 'a control fully visible at the viewport edge is left in place'; its fields model the relevant domain records or DOM state.
  const control = createControl('BUTTON', { top: 760, bottom: 800 });
// Original L123: Calls `enableAutoScrollOnFocus` with `document` (document).
  enableAutoScrollOnFocus(document);
// Original L124: Sets `document.activeElement` (the active element property of document) to `control` (control).
  document.activeElement = control;
// Original L125: Simulates the user/browser event in 'a control fully visible at the viewport edge is left in place' so production event handlers run against the mock DOM.
  document.dispatch('focusin', { target: control });
// Original L126: Blank line separates related setup or assertions for readability.

// Original L127: In the test 'a control fully visible at the viewport edge is left in place', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(control.scrollCalls.length, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(control.scrollCalls.length, 0);
// Original L128: Closes the fixture, callback, loop, or test block for 'a control fully visible at the viewport edge is left in place'.
});
// Original L129: Blank line separates related setup or assertions for readability.

// Original L130: Starts an isolated test case whose title states the behavior being specified: a focused control clipped horizontally is revealed.
test('a focused control clipped horizontally is revealed', () => {
// Original L131: Initializes { for 'a focused control clipped horizontally is revealed', supplying the value that the following test logic will inspect or mutate.
  const { document } = createHarness();
// Original L132: Builds control, the concrete fixture collection/object used as input for 'a focused control clipped horizontally is revealed'; its fields model the relevant domain records or DOM state.
  const control = createControl('BUTTON', { top: 300, bottom: 340, left: -10, right: 30 });
// Original L133: Calls `enableAutoScrollOnFocus` with `document` (document).
  enableAutoScrollOnFocus(document);
// Original L134: Sets `document.activeElement` (the active element property of document) to `control` (control).
  document.activeElement = control;
// Original L135: Simulates the user/browser event in 'a focused control clipped horizontally is revealed' so production event handlers run against the mock DOM.
  document.dispatch('focusin', { target: control });
// Original L136: Blank line separates related setup or assertions for readability.

// Original L137: In the test 'a focused control clipped horizontally is revealed', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(control.scrollCalls.length, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(control.scrollCalls.length, 1);
// Original L138: Calls `assert.deepEqual` with the entry at index/key 0 in `control.scrollCalls` (the scroll calls property of control); an object with fields behavior: "auto"; block: "nearest"; inline: "nearest".
  assert.deepEqual(control.scrollCalls[0], {
// Original L139: Defines field behavior as "auto".
    behavior: 'auto', block: 'nearest', inline: 'nearest'
// Original L140: In the test 'a focused control clipped horizontally is revealed', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(control.scrollCalls[0], { behavior: 'auto', block: 'nearest', inline: 'nearest' });; array order and object fields are part of the contract.
  });
// Original L141: Closes the fixture, callback, loop, or test block for 'a focused control clipped horizontally is revealed'.
});
// Original L142: Blank line separates related setup or assertions for readability.

// Original L143: Declares a test-only helper/type that models the application behavior needed by 'a focused control clipped horizontally is revealed'.
function createDialogFor(control) {
// Original L144: Creates properties, a test-side collection used to record listeners, DOM properties, calls, or unique results while testing 'a focused control clipped horizontally is revealed'.
  const properties = new Map();
// Original L145: Builds style, the concrete fixture collection/object used as input for 'a focused control clipped horizontally is revealed'; its fields model the relevant domain records or DOM state.
  const style = {
// Original L146: Calls `properties.set` with `name` (name); an object with fields value: `value` (value); priority: `priority` (priority).
    setProperty(name, value, priority = '') { properties.set(name, { value, priority }); },
// Original L147: Returns uses `properties.get(name)?.value` (the value property of properties.get(name)); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "" to the caller and exits this function.
    getPropertyValue(name) { return properties.get(name)?.value || ''; },
// Original L148: Returns uses `properties.get(name)?.priority` (the priority property of properties.get(name)); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "" to the caller and exits this function.
    getPropertyPriority(name) { return properties.get(name)?.priority || ''; },
// Original L149: Calls `properties.delete` with `name` (name).
    removeProperty(name) { properties.delete(name); }
// Original L150: Closes the fixture, callback, loop, or test block for 'a focused control clipped horizontally is revealed'.
  };
// Original L151: Builds dialog, the concrete fixture collection/object used as input for 'a focused control clipped horizontally is revealed'; its fields model the relevant domain records or DOM state.
  const dialog = Object.assign(createEventTarget(), {
// Original L152: Sets the object field tagName using 'DIALOG'. This field is read later through its property name.
    tagName: 'DIALOG',
// Original L153: Sets the object field open using true. This field is read later through its property name.
    open: true,
// Original L154: Sets the object field style using style. This field is read later through its property name.
    style,
// Original L155: Sets the object field parentElement using null. This field is read later through its property name.
    parentElement: null
// Original L156: Closes the fixture, callback, loop, or test block for 'a focused control clipped horizontally is revealed'.
  });
// Original L157: Sets `control.parentElement` (the parent element property of control) to `dialog` (dialog).
  control.parentElement = dialog;
// Original L158: Returns the fixture/helper result needed by the 'a focused control clipped horizontally is revealed' test, preserving the modeled state for its caller.
  return { dialog, properties };
// Original L159: Closes the fixture, callback, loop, or test block for 'a focused control clipped horizontally is revealed'.
}
// Original L160: Blank line separates related setup or assertions for readability.

// Original L161: Starts an isolated test case whose title states the behavior being specified: a focused dialog action button is revealed when it falls below the viewport.
test('a focused dialog action button is revealed when it falls below the viewport', () => {
// Original L162: Initializes { for 'a focused dialog action button is revealed when it falls below the viewport', supplying the value that the following test logic will inspect or mutate.
  const { document } = createHarness();
// Original L163: Builds button, the concrete fixture collection/object used as input for 'a focused dialog action button is revealed when it falls below the viewport'; its fields model the relevant domain records or DOM state.
  const button = createControl('BUTTON', { top: 780, bottom: 820 });
// Original L164: Calls `createDialogFor` with `button` (button).
  createDialogFor(button);
// Original L165: Calls `enableAutoScrollOnFocus` with `document` (document).
  enableAutoScrollOnFocus(document);
// Original L166: Sets `document.activeElement` (the active element property of document) to `button` (button).
  document.activeElement = button;
// Original L167: Simulates the user/browser event in 'a focused dialog action button is revealed when it falls below the viewport' so production event handlers run against the mock DOM.
  document.dispatch('focusin', { target: button });
// Original L168: Blank line separates related setup or assertions for readability.

// Original L169: In the test 'a focused dialog action button is revealed when it falls below the viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(button.scrollCalls.length, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(button.scrollCalls.length, 1);
// Original L170: Calls `assert.deepEqual` with the entry at index/key 0 in `button.scrollCalls` (the scroll calls property of button); an object with fields behavior: "auto"; block: "nearest"; inline: "nearest".
  assert.deepEqual(button.scrollCalls[0], {
// Original L171: Defines field behavior as "auto".
    behavior: 'auto', block: 'nearest', inline: 'nearest'
// Original L172: In the test 'a focused dialog action button is revealed when it falls below the viewport', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(button.scrollCalls[0], { behavior: 'auto', block: 'nearest', inline: 'nearest' });; array order and object fields are part of the contract.
  });
// Original L173: Closes the fixture, callback, loop, or test block for 'a focused dialog action button is revealed when it falls below the viewport'.
});
// Original L174: Blank line separates related setup or assertions for readability.

// Original L175: Starts an isolated test case whose title states the behavior being specified: focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close.
test('focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', () => {
// Original L176: Initializes { for 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', supplying the value that the following test logic will inspect or mutate.
  const { document, viewport } = createHarness();
// Original L177: Initializes control for 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', supplying the value that the following test logic will inspect or mutate.
  const control = createControl('TEXTAREA');
// Original L178: Initializes { for 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', supplying the value that the following test logic will inspect or mutate.
  const { dialog, properties } = createDialogFor(control);
// Original L179: Calls `properties.set` with "margin-block"; an object with fields value: "3px"; priority: "important".
  properties.set('margin-block', { value: '3px', priority: 'important' });
// Original L180: Calls `enableAutoScrollOnFocus` with `document` (document).
  enableAutoScrollOnFocus(document);
// Original L181: Sets `viewport.height` (the height property of viewport) to 420.
  viewport.height = 420;
// Original L182: Sets `document.activeElement` (the active element property of document) to `control` (control).
  document.activeElement = control;
// Original L183: Simulates the user/browser event in 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close' so production event handlers run against the mock DOM.
  document.dispatch('focusin', { target: control });
// Original L184: Blank line separates related setup or assertions for readability.

// Original L185: In the test 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('position').value, 'fixed');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.get('position').value, 'fixed');
// Original L186: In the test 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('inset-block-start').value, '8px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.get('inset-block-start').value, '8px');
// Original L187: In the test 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('inset-block-end').value, '388px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.get('inset-block-end').value, '388px');
// Original L188: In the test 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('max-height').value, '404px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.get('max-height').value, '404px');
// Original L189: In the test 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('margin-block').value, 'auto');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.get('margin-block').value, 'auto');
// Original L190: Blank line separates related setup or assertions for readability.

// Original L191: Sets `dialog.open` (the open property of dialog) to true.
  dialog.open = true;
// Original L192: Simulates the user/browser event in 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close' so production event handlers run against the mock DOM.
  dialog.dispatch('close');
// Original L193: In the test 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('position').value, 'fixed');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.get('position').value, 'fixed');
// Original L194: Blank line separates related setup or assertions for readability.

// Original L195: Sets `dialog.open` (the open property of dialog) to false.
  dialog.open = false;
// Original L196: Simulates the user/browser event in 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close' so production event handlers run against the mock DOM.
  dialog.dispatch('close');
// Original L197: In the test 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.has('position'), false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.has('position'), false);
// Original L198: Calls `assert.deepEqual` with calls `properties.get` with "margin-block"; an object with fields value: "3px"; priority: "important".
  assert.deepEqual(properties.get('margin-block'), { value: '3px', priority: 'important' });
// Original L199: Closes the fixture, callback, loop, or test block for 'focused fields constrain any open dialog to the reduced keyboard viewport and restore it on close'.
});
// Original L200: Blank line separates related setup or assertions for readability.

// Original L201: Starts an isolated test case whose title states the behavior being specified: dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves.
test('dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', () => {
// Original L202: Initializes { for 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', supplying the value that the following test logic will inspect or mutate.
  const { document, viewport } = createHarness();
// Original L203: Initializes control for 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', supplying the value that the following test logic will inspect or mutate.
  const control = createControl('INPUT');
// Original L204: Initializes { for 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', supplying the value that the following test logic will inspect or mutate.
  const { properties } = createDialogFor(control);
// Original L205: Calls `enableAutoScrollOnFocus` with `document` (document).
  enableAutoScrollOnFocus(document);
// Original L206: Sets `viewport.height` (the height property of viewport) to 400.
  viewport.height = 400;
// Original L207: Sets `viewport.offsetTop` (the offset top property of viewport) to 120.
  viewport.offsetTop = 120;
// Original L208: Sets `document.activeElement` (the active element property of document) to `control` (control).
  document.activeElement = control;
// Original L209: Simulates the user/browser event in 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves' so production event handlers run against the mock DOM.
  document.dispatch('focusin', { target: control });
// Original L210: In the test 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('inset-block-start').value, '128px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.get('inset-block-start').value, '128px');
// Original L211: In the test 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('inset-block-end').value, '288px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.get('inset-block-end').value, '288px');
// Original L212: Blank line separates related setup or assertions for readability.

// Original L213: Sets `viewport.offsetTop` (the offset top property of viewport) to 150.
  viewport.offsetTop = 150;
// Original L214: Simulates the user/browser event in 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves' so production event handlers run against the mock DOM.
  viewport.dispatch('scroll');
// Original L215: In the test 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('inset-block-start').value, '158px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.get('inset-block-start').value, '158px');
// Original L216: In the test 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('inset-block-end').value, '258px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.get('inset-block-end').value, '258px');
// Original L217: Blank line separates related setup or assertions for readability.

// Original L218: Sets `document.activeElement` (the active element property of document) to null.
  document.activeElement = null;
// Original L219: Simulates the user/browser event in 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves' so production event handlers run against the mock DOM.
  document.dispatch('focusout');
// Original L220: In the test 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.size, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.size, 0);
// Original L221: Closes the fixture, callback, loop, or test block for 'dialog bounds follow a panned visual viewport and remove constraints when keyboard focus leaves'.
});
// Original L222: Blank line separates related setup or assertions for readability.

// Original L223: Starts an isolated test case whose title states the behavior being specified: an open dialog adapts when the keyboard resize arrives after field focus.
test('an open dialog adapts when the keyboard resize arrives after field focus', () => {
// Original L224: Initializes { for 'an open dialog adapts when the keyboard resize arrives after field focus', supplying the value that the following test logic will inspect or mutate.
  const { document, viewport } = createHarness();
// Original L225: Initializes control for 'an open dialog adapts when the keyboard resize arrives after field focus', supplying the value that the following test logic will inspect or mutate.
  const control = createControl('TEXTAREA');
// Original L226: Initializes { for 'an open dialog adapts when the keyboard resize arrives after field focus', supplying the value that the following test logic will inspect or mutate.
  const { properties } = createDialogFor(control);
// Original L227: Calls `enableAutoScrollOnFocus` with `document` (document).
  enableAutoScrollOnFocus(document);
// Original L228: Sets `document.activeElement` (the active element property of document) to `control` (control).
  document.activeElement = control;
// Original L229: Simulates the user/browser event in 'an open dialog adapts when the keyboard resize arrives after field focus' so production event handlers run against the mock DOM.
  document.dispatch('focusin', { target: control });
// Original L230: In the test 'an open dialog adapts when the keyboard resize arrives after field focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.size, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.size, 0);
// Original L231: Blank line separates related setup or assertions for readability.

// Original L232: Sets `viewport.height` (the height property of viewport) to 420.
  viewport.height = 420;
// Original L233: Simulates the user/browser event in 'an open dialog adapts when the keyboard resize arrives after field focus' so production event handlers run against the mock DOM.
  viewport.dispatch('resize');
// Original L234: In the test 'an open dialog adapts when the keyboard resize arrives after field focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('max-height').value, '404px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.get('max-height').value, '404px');
// Original L235: In the test 'an open dialog adapts when the keyboard resize arrives after field focus', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.get('inset-block-end').value, '388px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.get('inset-block-end').value, '388px');
// Original L236: Closes the fixture, callback, loop, or test block for 'an open dialog adapts when the keyboard resize arrives after field focus'.
});
// Original L237: Blank line separates related setup or assertions for readability.

// Original L238: Starts an isolated test case whose title states the behavior being specified: dialogs keep their original layout when the visual viewport has not reduced.
test('dialogs keep their original layout when the visual viewport has not reduced', () => {
// Original L239: Initializes { for 'dialogs keep their original layout when the visual viewport has not reduced', supplying the value that the following test logic will inspect or mutate.
  const { document } = createHarness();
// Original L240: Initializes control for 'dialogs keep their original layout when the visual viewport has not reduced', supplying the value that the following test logic will inspect or mutate.
  const control = createControl('SELECT');
// Original L241: Initializes { for 'dialogs keep their original layout when the visual viewport has not reduced', supplying the value that the following test logic will inspect or mutate.
  const { properties } = createDialogFor(control);
// Original L242: Calls `enableAutoScrollOnFocus` with `document` (document).
  enableAutoScrollOnFocus(document);
// Original L243: Sets `document.activeElement` (the active element property of document) to `control` (control).
  document.activeElement = control;
// Original L244: Simulates the user/browser event in 'dialogs keep their original layout when the visual viewport has not reduced' so production event handlers run against the mock DOM.
  document.dispatch('focusin', { target: control });
// Original L245: In the test 'dialogs keep their original layout when the visual viewport has not reduced', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(properties.size, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(properties.size, 0);
// Original L246: Closes the fixture, callback, loop, or test block for 'dialogs keep their original layout when the visual viewport has not reduced'.
});
// Original L247: Blank line separates related setup or assertions for readability.

// Original L248: Starts an isolated test case whose title states the behavior being specified: non-focusable controls are ignored and initialization is idempotent.
test('non-focusable controls are ignored and initialization is idempotent', () => {
// Original L249: Initializes { for 'non-focusable controls are ignored and initialization is idempotent', supplying the value that the following test logic will inspect or mutate.
  const { document } = createHarness();
// Original L250: Calls `enableAutoScrollOnFocus` with `document` (document).
  enableAutoScrollOnFocus(document);
// Original L251: Calls `enableAutoScrollOnFocus` with `document` (document).
  enableAutoScrollOnFocus(document);
// Original L252: In the test 'non-focusable controls are ignored and initialization is idempotent', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(document.listenerCount('focusin'), 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(document.listenerCount('focusin'), 1);
// Original L253: Blank line separates related setup or assertions for readability.

// Original L254: Builds disabledButton, the concrete fixture collection/object used as input for 'non-focusable controls are ignored and initialization is idempotent'; its fields model the relevant domain records or DOM state.
  const disabledButton = createControl('BUTTON', { top: 780, bottom: 820 });
// Original L255: Sets `disabledButton.disabled` (the disabled property of disabledButton) to true.
  disabledButton.disabled = true;
// Original L256: Sets `document.activeElement` (the active element property of document) to `disabledButton` (disabled button).
  document.activeElement = disabledButton;
// Original L257: Simulates the user/browser event in 'non-focusable controls are ignored and initialization is idempotent' so production event handlers run against the mock DOM.
  document.dispatch('focusin', { target: disabledButton });
// Original L258: In the test 'non-focusable controls are ignored and initialization is idempotent', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(disabledButton.scrollCalls.length, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(disabledButton.scrollCalls.length, 0);
// Original L259: Blank line separates related setup or assertions for readability.

// Original L260: Builds hiddenInput, the concrete fixture collection/object used as input for 'non-focusable controls are ignored and initialization is idempotent'; its fields model the relevant domain records or DOM state.
  const hiddenInput = createControl('INPUT', { type: 'hidden', top: 780, bottom: 820 });
// Original L261: Sets `document.activeElement` (the active element property of document) to `hiddenInput` (hidden input).
  document.activeElement = hiddenInput;
// Original L262: Simulates the user/browser event in 'non-focusable controls are ignored and initialization is idempotent' so production event handlers run against the mock DOM.
  document.dispatch('focusin', { target: hiddenInput });
// Original L263: In the test 'non-focusable controls are ignored and initialization is idempotent', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(hiddenInput.scrollCalls.length, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(hiddenInput.scrollCalls.length, 0);
// Original L264: Closes the fixture, callback, loop, or test block for 'non-focusable controls are ignored and initialization is idempotent'.
});

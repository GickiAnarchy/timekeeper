// Original L1: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import test from 'node:test';
// Original L2: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import assert from 'node:assert/strict';
// Original L3: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { resetShiftDialogViewport, syncShiftDialogViewport } from '../scripts/shift-dialog-viewport.mjs';
// Original L4: Blank line separates related setup or assertions for readability.

// Original L5: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function createDialog(activeElement = null) {
// Original L6: Creates values, a test-side collection used to record listeners, DOM properties, calls, or unique results while testing 'test setup'.
  const values = new Map();
// Original L7: Creates classes, a test-side collection used to record listeners, DOM properties, calls, or unique results while testing 'test setup'.
  const classes = new Set();
// Original L8: Builds document, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const document = { activeElement, documentElement: { clientHeight: 800 } };
// Original L9: Builds dialog, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const dialog = {
// Original L10: Sets the object field open using true. This field is read later through its property name.
    open: true,
// Original L11: Sets the object field ownerDocument using document. This field is read later through its property name.
    ownerDocument: document,
// Original L12: Defines field style as an object with fields setProperty: a callback taking name, value that runs its enclosed statements; removeProperty: a callback taking name that runs its enclosed statements.
    style: {
// Original L13: Calls `values.set` with `name` (name); `value` (value).
      setProperty(name, value) { values.set(name, value); },
// Original L14: Calls `values.delete` with `name` (name).
      removeProperty(name) { values.delete(name); }
// Original L15: Closes object literal. Control continues after this block.
    },
// Original L16: Mutates or reads mocked DOM style/class state in 'test setup' to verify the visible/accessibility effect of the production handler.
    classList: {
// Original L17: Calls `classes.add` with `name` (name).
      add(name) { classes.add(name); },
// Original L18: Calls `classes.delete` with `name` (name).
      remove(name) { classes.delete(name); },
// Original L19: Returns calls `classes.has` with `name` (name) to the caller and exits this function.
      contains(name) { return classes.has(name); }
// Original L20: Closes object literal. Control continues after this block.
    },
// Original L21: Returns checks that `element` (element) and `activeElement` (active element) have the same value and type to the caller and exits this function.
    contains(element) { return element === activeElement; }
// Original L22: Closes the fixture, callback, loop, or test block for 'test setup'.
  };
// Original L23: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
  return { dialog, document, values, classes };
// Original L24: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L25: Blank line separates related setup or assertions for readability.

// Original L26: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function createView({ innerHeight = 800, visualHeight = 800, offsetTop = 0 } = {}) {
// Original L27: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
  return {
// Original L28: Sets the object field innerHeight using innerHeight. This field is read later through its property name.
    innerHeight,
// Original L29: Sets the object field offsetTop using offsetTop. This field is read later through its property name.
    visualViewport: { height: visualHeight, offsetTop },
// Original L30: Calls `callback` with no arguments.
    requestAnimationFrame(callback) { callback(); }
// Original L31: Closes the fixture, callback, loop, or test block for 'test setup'.
  };
// Original L32: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L33: Blank line separates related setup or assertions for readability.

// Original L34: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function createNotesControl({ tagName = 'TEXTAREA', top = 530, bottom = 570 } = {}) {
// Original L35: Builds scrollCalls, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.
  const scrollCalls = [];
// Original L36: Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.
  return {
// Original L37: Sets the object field tagName using tagName. This field is read later through its property name.
    tagName,
// Original L38: Sets the object field disabled using false. This field is read later through its property name.
    disabled: false,
// Original L39: Sets the object field readOnly using false. This field is read later through its property name.
    readOnly: false,
// Original L40: Sets the object field isConnected using true. This field is read later through its property name.
    isConnected: true,
// Original L41: Sets the object field scrollCalls using scrollCalls. This field is read later through its property name.
    scrollCalls,
// Original L42: Returns an object with fields top: `top` (top); bottom: `bottom` (bottom); height: subtracts `top` (top) from `bottom` (bottom) to the caller and exits this function.
    getBoundingClientRect() { return { top, bottom, height: bottom - top }; },
// Original L43: Appends `options` (options) to `scrollCalls` (scroll calls).
    scrollIntoView(options) { scrollCalls.push(options); }
// Original L44: Closes the fixture, callback, loop, or test block for 'test setup'.
  };
// Original L45: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L46: Blank line separates related setup or assertions for readability.

// Original L47: Starts an isolated test case whose title states the behavior being specified: Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport.
test('Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', () => {
// Original L48: Initializes notes for 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', supplying the value that the following test logic will inspect or mutate.
  const notes = createNotesControl();
// Original L49: Initializes { for 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', supplying the value that the following test logic will inspect or mutate.
  const { dialog, document, values, classes } = createDialog(notes);
// Original L50: Builds view, the concrete fixture collection/object used as input for 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport'; its fields model the relevant domain records or DOM state.
  const view = createView({ visualHeight: 420 });
// Original L51: Blank line separates related setup or assertions for readability.

// Original L52: In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(syncShiftDialogViewport(dialog, view), true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(syncShiftDialogViewport(dialog, view), true);
// Original L53: In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(document.activeElement, notes);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(document.activeElement, notes);
// Original L54: In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(classes.has('viewport-constrained'), true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(classes.has('viewport-constrained'), true);
// Original L55: In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-top'), '8px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(values.get('--shift-visible-top'), '8px');
// Original L56: In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-bottom'), '388px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(values.get('--shift-visible-bottom'), '388px');
// Original L57: In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-max-height'), '404px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(values.get('--shift-visible-max-height'), '404px');
// Original L58: Calls `assert.deepEqual` with `notes.scrollCalls` (the scroll calls property of notes); an array containing an object with fields behavior: "auto"; block: "nearest"; inline: "nearest".
  assert.deepEqual(notes.scrollCalls, [{
// Original L59: Defines field behavior as "auto".
    behavior: 'auto', block: 'nearest', inline: 'nearest'
// Original L60: In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(notes.scrollCalls, [{ behavior: 'auto', block: 'nearest', inline: 'nearest' }]);; array order and object fields are part of the contract.
  }]);
// Original L61: Blank line separates related setup or assertions for readability.

// Original L62: Initializes visibleDialogTop for 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', supplying the value that the following test logic will inspect or mutate.
  const visibleDialogTop = 8;
// Original L63: Initializes visibleDialogBottom for 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', supplying the value that the following test logic will inspect or mutate.
  const visibleDialogBottom = view.visualViewport.height - 8;
// Original L64: In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this truthiness assertion requires the concrete condition to hold: assert.ok(visibleDialogTop < visibleDialogBottom);; it verifies the required presence, count, geometry, or invariant represented by the fixture.
  assert.ok(visibleDialogTop < visibleDialogBottom);
// Original L65: In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this truthiness assertion requires the concrete condition to hold: assert.ok(Number.parseFloat(values.get('--shift-visible-max-height')) <= visibleDialogBottom - visibleDialogTop);; it verifies the required presence, count, geometry, or invariant represented by the fixture.
  assert.ok(Number.parseFloat(values.get('--shift-visible-max-height')) <= visibleDialogBottom - visibleDialogTop);
// Original L66: Closes the fixture, callback, loop, or test block for 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport'.
});
// Original L67: Blank line separates related setup or assertions for readability.

// Original L68: Starts an isolated test case whose title states the behavior being specified: Shift edit dialog accounts for a panned visual viewport and clears constraints after closing.
test('Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', () => {
// Original L69: Initializes notes for 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', supplying the value that the following test logic will inspect or mutate.
  const notes = createNotesControl();
// Original L70: Initializes { for 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', supplying the value that the following test logic will inspect or mutate.
  const { dialog, values, classes } = createDialog(notes);
// Original L71: Builds view, the concrete fixture collection/object used as input for 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing'; its fields model the relevant domain records or DOM state.
  const view = createView({ visualHeight: 400, offsetTop: 120 });
// Original L72: Blank line separates related setup or assertions for readability.

// Original L73: Calls `syncShiftDialogViewport` with `dialog` (dialog); `view` (view).
  syncShiftDialogViewport(dialog, view);
// Original L74: In the test 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-top'), '128px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(values.get('--shift-visible-top'), '128px');
// Original L75: In the test 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-bottom'), '288px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(values.get('--shift-visible-bottom'), '288px');
// Original L76: In the test 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-max-height'), '384px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(values.get('--shift-visible-max-height'), '384px');
// Original L77: Blank line separates related setup or assertions for readability.

// Original L78: Sets `dialog.open` (the open property of dialog) to false.
  dialog.open = false;
// Original L79: In the test 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(syncShiftDialogViewport(dialog, view), false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(syncShiftDialogViewport(dialog, view), false);
// Original L80: In the test 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(classes.has('viewport-constrained'), false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(classes.has('viewport-constrained'), false);
// Original L81: In the test 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.size, 0);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(values.size, 0);
// Original L82: In the test 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(notes.scrollCalls.length, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(notes.scrollCalls.length, 1);
// Original L83: Closes the fixture, callback, loop, or test block for 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing'.
});
// Original L84: Blank line separates related setup or assertions for readability.

// Original L85: Starts an isolated test case whose title states the behavior being specified: Shift dialog uses the layout viewport when VisualViewport is unavailable.
test('Shift dialog uses the layout viewport when VisualViewport is unavailable', () => {
// Original L86: Initializes { for 'Shift dialog uses the layout viewport when VisualViewport is unavailable', supplying the value that the following test logic will inspect or mutate.
  const { dialog, values } = createDialog();
// Original L87: In the test 'Shift dialog uses the layout viewport when VisualViewport is unavailable', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(syncShiftDialogViewport(dialog, { innerHeight: 800 }), true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(syncShiftDialogViewport(dialog, { innerHeight: 800 }), true);
// Original L88: In the test 'Shift dialog uses the layout viewport when VisualViewport is unavailable', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-top'), '8px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(values.get('--shift-visible-top'), '8px');
// Original L89: In the test 'Shift dialog uses the layout viewport when VisualViewport is unavailable', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-bottom'), '8px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(values.get('--shift-visible-bottom'), '8px');
// Original L90: In the test 'Shift dialog uses the layout viewport when VisualViewport is unavailable', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-max-height'), '784px');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(values.get('--shift-visible-max-height'), '784px');
// Original L91: Closes the fixture, callback, loop, or test block for 'Shift dialog uses the layout viewport when VisualViewport is unavailable'.
});
// Original L92: Blank line separates related setup or assertions for readability.

// Original L93: Starts an isolated test case whose title states the behavior being specified: Shift edit dialog reveals a focused action button that is outside the visible area.
test('Shift edit dialog reveals a focused action button that is outside the visible area', () => {
// Original L94: Builds button, the concrete fixture collection/object used as input for 'Shift edit dialog reveals a focused action button that is outside the visible area'; its fields model the relevant domain records or DOM state.
  const button = createNotesControl({ tagName: 'BUTTON', top: 790, bottom: 830 });
// Original L95: Initializes { for 'Shift edit dialog reveals a focused action button that is outside the visible area', supplying the value that the following test logic will inspect or mutate.
  const { dialog } = createDialog(button);
// Original L96: Initializes view for 'Shift edit dialog reveals a focused action button that is outside the visible area', supplying the value that the following test logic will inspect or mutate.
  const view = createView();
// Original L97: Blank line separates related setup or assertions for readability.

// Original L98: In the test 'Shift edit dialog reveals a focused action button that is outside the visible area', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(syncShiftDialogViewport(dialog, view), true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(syncShiftDialogViewport(dialog, view), true);
// Original L99: Calls `assert.deepEqual` with `button.scrollCalls` (the scroll calls property of button); an array containing an object with fields behavior: "auto"; block: "nearest"; inline: "nearest".
  assert.deepEqual(button.scrollCalls, [{
// Original L100: Defines field behavior as "auto".
    behavior: 'auto', block: 'nearest', inline: 'nearest'
// Original L101: In the test 'Shift edit dialog reveals a focused action button that is outside the visible area', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(button.scrollCalls, [{ behavior: 'auto', block: 'nearest', inline: 'nearest' }]);; array order and object fields are part of the contract.
  }]);
// Original L102: Closes the fixture, callback, loop, or test block for 'Shift edit dialog reveals a focused action button that is outside the visible area'.
});

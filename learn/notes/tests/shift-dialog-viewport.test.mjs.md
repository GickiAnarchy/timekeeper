# tests/shift-dialog-viewport.test.mjs

[Exact copy](../../original/tests/shift-dialog-viewport.test.source.mjs)

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
import { resetShiftDialogViewport, syncShiftDialogViewport } from '../scripts/shift-dialog-viewport.mjs';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 4

```text

```

Blank line separates related setup or assertions for readability.

### Line 5

```text
function createDialog(activeElement = null) {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 6

```text
  const values = new Map();
```

Creates values, a test-side collection used to record listeners, DOM properties, calls, or unique results while testing 'test setup'.

### Line 7

```text
  const classes = new Set();
```

Creates classes, a test-side collection used to record listeners, DOM properties, calls, or unique results while testing 'test setup'.

### Line 8

```text
  const document = { activeElement, documentElement: { clientHeight: 800 } };
```

Builds document, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 9

```text
  const dialog = {
```

Builds dialog, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 10

```text
    open: true,
```

Sets the object field open using true. This field is read later through its property name.

### Line 11

```text
    ownerDocument: document,
```

Sets the object field ownerDocument using document. This field is read later through its property name.

### Line 12

```text
    style: {
```

Defines field style as an object with fields setProperty: a callback taking name, value that runs its enclosed statements; removeProperty: a callback taking name that runs its enclosed statements.

### Line 13

```text
      setProperty(name, value) { values.set(name, value); },
```

Calls `values.set` with `name` (name); `value` (value).

### Line 14

```text
      removeProperty(name) { values.delete(name); }
```

Calls `values.delete` with `name` (name).

### Line 15

```text
    },
```

Closes object literal. Control continues after this block.

### Line 16

```text
    classList: {
```

Mutates or reads mocked DOM style/class state in 'test setup' to verify the visible/accessibility effect of the production handler.

### Line 17

```text
      add(name) { classes.add(name); },
```

Calls `classes.add` with `name` (name).

### Line 18

```text
      remove(name) { classes.delete(name); },
```

Calls `classes.delete` with `name` (name).

### Line 19

```text
      contains(name) { return classes.has(name); }
```

Returns calls `classes.has` with `name` (name) to the caller and exits this function.

### Line 20

```text
    },
```

Closes object literal. Control continues after this block.

### Line 21

```text
    contains(element) { return element === activeElement; }
```

Returns checks that `element` (element) and `activeElement` (active element) have the same value and type to the caller and exits this function.

### Line 22

```text
  };
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 23

```text
  return { dialog, document, values, classes };
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 24

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 25

```text

```

Blank line separates related setup or assertions for readability.

### Line 26

```text
function createView({ innerHeight = 800, visualHeight = 800, offsetTop = 0 } = {}) {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 27

```text
  return {
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 28

```text
    innerHeight,
```

Sets the object field innerHeight using innerHeight. This field is read later through its property name.

### Line 29

```text
    visualViewport: { height: visualHeight, offsetTop },
```

Sets the object field offsetTop using offsetTop. This field is read later through its property name.

### Line 30

```text
    requestAnimationFrame(callback) { callback(); }
```

Calls `callback` with no arguments.

### Line 31

```text
  };
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 32

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 33

```text

```

Blank line separates related setup or assertions for readability.

### Line 34

```text
function createNotesControl({ tagName = 'TEXTAREA', top = 530, bottom = 570 } = {}) {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 35

```text
  const scrollCalls = [];
```

Builds scrollCalls, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 36

```text
  return {
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 37

```text
    tagName,
```

Sets the object field tagName using tagName. This field is read later through its property name.

### Line 38

```text
    disabled: false,
```

Sets the object field disabled using false. This field is read later through its property name.

### Line 39

```text
    readOnly: false,
```

Sets the object field readOnly using false. This field is read later through its property name.

### Line 40

```text
    isConnected: true,
```

Sets the object field isConnected using true. This field is read later through its property name.

### Line 41

```text
    scrollCalls,
```

Sets the object field scrollCalls using scrollCalls. This field is read later through its property name.

### Line 42

```text
    getBoundingClientRect() { return { top, bottom, height: bottom - top }; },
```

Returns an object with fields top: `top` (top); bottom: `bottom` (bottom); height: subtracts `top` (top) from `bottom` (bottom) to the caller and exits this function.

### Line 43

```text
    scrollIntoView(options) { scrollCalls.push(options); }
```

Appends `options` (options) to `scrollCalls` (scroll calls).

### Line 44

```text
  };
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 45

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 46

```text

```

Blank line separates related setup or assertions for readability.

### Line 47

```text
test('Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', () => {
```

Starts an isolated test case whose title states the behavior being specified: Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport.

### Line 48

```text
  const notes = createNotesControl();
```

Initializes notes for 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', supplying the value that the following test logic will inspect or mutate.

### Line 49

```text
  const { dialog, document, values, classes } = createDialog(notes);
```

Initializes { for 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', supplying the value that the following test logic will inspect or mutate.

### Line 50

```text
  const view = createView({ visualHeight: 420 });
```

Builds view, the concrete fixture collection/object used as input for 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport'; its fields model the relevant domain records or DOM state.

### Line 51

```text

```

Blank line separates related setup or assertions for readability.

### Line 52

```text
  assert.equal(syncShiftDialogViewport(dialog, view), true);
```

In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(syncShiftDialogViewport(dialog, view), true);; the fixture therefore checks the concrete boundary/result contract.

### Line 53

```text
  assert.equal(document.activeElement, notes);
```

In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(document.activeElement, notes);; the fixture therefore checks the concrete boundary/result contract.

### Line 54

```text
  assert.equal(classes.has('viewport-constrained'), true);
```

In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(classes.has('viewport-constrained'), true);; the fixture therefore checks the concrete boundary/result contract.

### Line 55

```text
  assert.equal(values.get('--shift-visible-top'), '8px');
```

In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-top'), '8px');; the fixture therefore checks the concrete boundary/result contract.

### Line 56

```text
  assert.equal(values.get('--shift-visible-bottom'), '388px');
```

In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-bottom'), '388px');; the fixture therefore checks the concrete boundary/result contract.

### Line 57

```text
  assert.equal(values.get('--shift-visible-max-height'), '404px');
```

In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-max-height'), '404px');; the fixture therefore checks the concrete boundary/result contract.

### Line 58

```text
  assert.deepEqual(notes.scrollCalls, [{
```

Calls `assert.deepEqual` with `notes.scrollCalls` (the scroll calls property of notes); an array containing an object with fields behavior: "auto"; block: "nearest"; inline: "nearest".

### Line 59

```text
    behavior: 'auto', block: 'nearest', inline: 'nearest'
```

Defines field behavior as "auto".

### Line 60

```text
  }]);
```

In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(notes.scrollCalls, [{ behavior: 'auto', block: 'nearest', inline: 'nearest' }]);; array order and object fields are part of the contract.

### Line 61

```text

```

Blank line separates related setup or assertions for readability.

### Line 62

```text
  const visibleDialogTop = 8;
```

Initializes visibleDialogTop for 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', supplying the value that the following test logic will inspect or mutate.

### Line 63

```text
  const visibleDialogBottom = view.visualViewport.height - 8;
```

Initializes visibleDialogBottom for 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', supplying the value that the following test logic will inspect or mutate.

### Line 64

```text
  assert.ok(visibleDialogTop < visibleDialogBottom);
```

In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this truthiness assertion requires the concrete condition to hold: assert.ok(visibleDialogTop < visibleDialogBottom);; it verifies the required presence, count, geometry, or invariant represented by the fixture.

### Line 65

```text
  assert.ok(Number.parseFloat(values.get('--shift-visible-max-height')) <= visibleDialogBottom - visibleDialogTop);
```

In the test 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport', this truthiness assertion requires the concrete condition to hold: assert.ok(Number.parseFloat(values.get('--shift-visible-max-height')) <= visibleDialogBottom - visibleDialogTop);; it verifies the required presence, count, geometry, or invariant represented by the fixture.

### Line 66

```text
});
```

Closes the fixture, callback, loop, or test block for 'Shift edit Notes stays focused and is re-revealed when an overlay keyboard reduces the visual viewport'.

### Line 67

```text

```

Blank line separates related setup or assertions for readability.

### Line 68

```text
test('Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', () => {
```

Starts an isolated test case whose title states the behavior being specified: Shift edit dialog accounts for a panned visual viewport and clears constraints after closing.

### Line 69

```text
  const notes = createNotesControl();
```

Initializes notes for 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', supplying the value that the following test logic will inspect or mutate.

### Line 70

```text
  const { dialog, values, classes } = createDialog(notes);
```

Initializes { for 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', supplying the value that the following test logic will inspect or mutate.

### Line 71

```text
  const view = createView({ visualHeight: 400, offsetTop: 120 });
```

Builds view, the concrete fixture collection/object used as input for 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing'; its fields model the relevant domain records or DOM state.

### Line 72

```text

```

Blank line separates related setup or assertions for readability.

### Line 73

```text
  syncShiftDialogViewport(dialog, view);
```

Calls `syncShiftDialogViewport` with `dialog` (dialog); `view` (view).

### Line 74

```text
  assert.equal(values.get('--shift-visible-top'), '128px');
```

In the test 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-top'), '128px');; the fixture therefore checks the concrete boundary/result contract.

### Line 75

```text
  assert.equal(values.get('--shift-visible-bottom'), '288px');
```

In the test 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-bottom'), '288px');; the fixture therefore checks the concrete boundary/result contract.

### Line 76

```text
  assert.equal(values.get('--shift-visible-max-height'), '384px');
```

In the test 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-max-height'), '384px');; the fixture therefore checks the concrete boundary/result contract.

### Line 77

```text

```

Blank line separates related setup or assertions for readability.

### Line 78

```text
  dialog.open = false;
```

Sets `dialog.open` (the open property of dialog) to false.

### Line 79

```text
  assert.equal(syncShiftDialogViewport(dialog, view), false);
```

In the test 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(syncShiftDialogViewport(dialog, view), false);; the fixture therefore checks the concrete boundary/result contract.

### Line 80

```text
  assert.equal(classes.has('viewport-constrained'), false);
```

In the test 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(classes.has('viewport-constrained'), false);; the fixture therefore checks the concrete boundary/result contract.

### Line 81

```text
  assert.equal(values.size, 0);
```

In the test 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.size, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 82

```text
  assert.equal(notes.scrollCalls.length, 1);
```

In the test 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(notes.scrollCalls.length, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 83

```text
});
```

Closes the fixture, callback, loop, or test block for 'Shift edit dialog accounts for a panned visual viewport and clears constraints after closing'.

### Line 84

```text

```

Blank line separates related setup or assertions for readability.

### Line 85

```text
test('Shift dialog uses the layout viewport when VisualViewport is unavailable', () => {
```

Starts an isolated test case whose title states the behavior being specified: Shift dialog uses the layout viewport when VisualViewport is unavailable.

### Line 86

```text
  const { dialog, values } = createDialog();
```

Initializes { for 'Shift dialog uses the layout viewport when VisualViewport is unavailable', supplying the value that the following test logic will inspect or mutate.

### Line 87

```text
  assert.equal(syncShiftDialogViewport(dialog, { innerHeight: 800 }), true);
```

In the test 'Shift dialog uses the layout viewport when VisualViewport is unavailable', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(syncShiftDialogViewport(dialog, { innerHeight: 800 }), true);; the fixture therefore checks the concrete boundary/result contract.

### Line 88

```text
  assert.equal(values.get('--shift-visible-top'), '8px');
```

In the test 'Shift dialog uses the layout viewport when VisualViewport is unavailable', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-top'), '8px');; the fixture therefore checks the concrete boundary/result contract.

### Line 89

```text
  assert.equal(values.get('--shift-visible-bottom'), '8px');
```

In the test 'Shift dialog uses the layout viewport when VisualViewport is unavailable', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-bottom'), '8px');; the fixture therefore checks the concrete boundary/result contract.

### Line 90

```text
  assert.equal(values.get('--shift-visible-max-height'), '784px');
```

In the test 'Shift dialog uses the layout viewport when VisualViewport is unavailable', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(values.get('--shift-visible-max-height'), '784px');; the fixture therefore checks the concrete boundary/result contract.

### Line 91

```text
});
```

Closes the fixture, callback, loop, or test block for 'Shift dialog uses the layout viewport when VisualViewport is unavailable'.

### Line 92

```text

```

Blank line separates related setup or assertions for readability.

### Line 93

```text
test('Shift edit dialog reveals a focused action button that is outside the visible area', () => {
```

Starts an isolated test case whose title states the behavior being specified: Shift edit dialog reveals a focused action button that is outside the visible area.

### Line 94

```text
  const button = createNotesControl({ tagName: 'BUTTON', top: 790, bottom: 830 });
```

Builds button, the concrete fixture collection/object used as input for 'Shift edit dialog reveals a focused action button that is outside the visible area'; its fields model the relevant domain records or DOM state.

### Line 95

```text
  const { dialog } = createDialog(button);
```

Initializes { for 'Shift edit dialog reveals a focused action button that is outside the visible area', supplying the value that the following test logic will inspect or mutate.

### Line 96

```text
  const view = createView();
```

Initializes view for 'Shift edit dialog reveals a focused action button that is outside the visible area', supplying the value that the following test logic will inspect or mutate.

### Line 97

```text

```

Blank line separates related setup or assertions for readability.

### Line 98

```text
  assert.equal(syncShiftDialogViewport(dialog, view), true);
```

In the test 'Shift edit dialog reveals a focused action button that is outside the visible area', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(syncShiftDialogViewport(dialog, view), true);; the fixture therefore checks the concrete boundary/result contract.

### Line 99

```text
  assert.deepEqual(button.scrollCalls, [{
```

Calls `assert.deepEqual` with `button.scrollCalls` (the scroll calls property of button); an array containing an object with fields behavior: "auto"; block: "nearest"; inline: "nearest".

### Line 100

```text
    behavior: 'auto', block: 'nearest', inline: 'nearest'
```

Defines field behavior as "auto".

### Line 101

```text
  }]);
```

In the test 'Shift edit dialog reveals a focused action button that is outside the visible area', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(button.scrollCalls, [{ behavior: 'auto', block: 'nearest', inline: 'nearest' }]);; array order and object fields are part of the contract.

### Line 102

```text
});
```

Closes the fixture, callback, loop, or test block for 'Shift edit dialog reveals a focused action button that is outside the visible area'.

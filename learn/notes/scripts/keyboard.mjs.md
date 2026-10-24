# scripts/keyboard.mjs

[Exact copy](../../original/scripts/keyboard.mjs)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
const registeredDocuments = new WeakSet();
```

Stores registeredDocuments, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 2

```text
const FOCUSABLE_TAGS = new Set([
```

Stores FOCUSABLE_TAGS, a set of unique IDs used to prevent duplicate links; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 3

```text
  'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'IFRAME', 'OBJECT', 'EMBED', 'SUMMARY', 'AUDIO', 'VIDEO'
```

Continues the surrounding keyboard.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 4

```text
]);
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 5

```text
const NON_TEXT_INPUT_TYPES = new Set([
```

Stores NON_TEXT_INPUT_TYPES, a set of unique IDs used to prevent duplicate links; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 6

```text
  'button', 'checkbox', 'color', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'
```

Continues the surrounding keyboard.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 7

```text
]);
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 8

```text
const constrainedDialogs = new WeakMap();
```

Stores constrainedDialogs, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 9

```text
const watchedDialogs = new WeakSet();
```

Stores watchedDialogs, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 10

```text
const DIALOG_VIEWPORT_PROPERTIES = [
```

Stores DIALOG_VIEWPORT_PROPERTIES, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 11

```text
  'position', 'inset-block-start', 'inset-block-end', 'max-height', 'margin-block'
```

Continues the surrounding keyboard.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 12

```text
];
```

Continues the surrounding array literal of application options or data records.

### Line 13

```text
const VIEWPORT_GUTTER = 8;
```

Stores VIEWPORT_GUTTER, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 14

```text

```

Blank line separates related statements and has no runtime effect.

### Line 15

```text
function hasAttribute(target, name) {
```

Defines the private helper hasAttribute for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 16

```text
  if (typeof target?.hasAttribute === 'function') return target.hasAttribute(name);
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 17

```text
  return typeof target?.getAttribute === 'function' && target.getAttribute(name) != null;
```

Returns uses checks inequality between calls `target.getAttribute` with `name` (name) and null, allowing type conversion only if checks that gets the JavaScript type name of `target?.getAttribute` (the get attribute property of target); optional chaining stops with undefined if a guarded receiver is null or undefined and "function" have the same value and type is truthy; otherwise keeps the falsy first value to the caller and exits this function.

### Line 18

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 19

```text

```

Blank line separates related statements and has no runtime effect.

### Line 20

```text
export function isFocusableElement(target) {
```

Declares isFocusableElement(), which tests whether an element can receive keyboard focus.

### Line 21

```text
  if (!target || target.disabled || target.hidden || target.inert || target.isConnected === false) return false;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 22

```text
  const tagName = String(target.tagName || '').toUpperCase();
```

Stores tagName, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 23

```text
  if (tagName === 'INPUT' && String(target.type || 'text').toLowerCase() === 'hidden') return false;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 24

```text
  if (tagName === 'A' || tagName === 'AREA') return hasAttribute(target, 'href') || hasAttribute(target, 'tabindex');
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 25

```text
  if (FOCUSABLE_TAGS.has(tagName)) return true;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 26

```text
  if (target.isContentEditable || String(target.contentEditable || '').toLowerCase() === 'true') return true;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 27

```text
  return hasAttribute(target, 'tabindex') || Number(target.tabIndex) >= 0;
```

Returns uses calls `hasAttribute` with `target` (target); "tabindex" when it is truthy, otherwise falls back to checks whether converts `target.tabIndex` (the tab index property of target) to a number (invalid numeric text becomes NaN) is at least 0 to the caller and exits this function.

### Line 28

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 29

```text

```

Blank line separates related statements and has no runtime effect.

### Line 30

```text
function isKeyboardInput(target) {
```

Defines the private helper isKeyboardInput for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 31

```text
  if (!target || target.disabled || target.readOnly) return false;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 32

```text
  const tagName = String(target.tagName || '').toUpperCase();
```

Stores tagName, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 33

```text
  if (tagName === 'TEXTAREA' || tagName === 'SELECT') return true;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 34

```text
  if (tagName !== 'INPUT') return false;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 35

```text
  return !NON_TEXT_INPUT_TYPES.has(String(target.type || 'text').toLowerCase());
```

Returns negates the truthiness of calls `NON_TEXT_INPUT_TYPES.has` with converts converts uses `target.type` when it is truthy, otherwise falls back to "text" to text to lowercase text to the caller and exits this function.

### Line 36

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 37

```text

```

Blank line separates related statements and has no runtime effect.

### Line 38

```text
function findOpenDialog(target) {
```

Defines the private helper findOpenDialog for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 39

```text
  for (let element = target; element; element = element.parentElement) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 40

```text
    if (String(element.tagName || '').toUpperCase() === 'DIALOG') {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 41

```text
      return element.open ? element : null;
```

Returns checks `element.open` (the open property of element); if true chooses `element` (element), otherwise null to the caller and exits this function.

### Line 42

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 43

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 44

```text
  return null;
```

Returns null to the caller and exits this function.

### Line 45

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 46

```text

```

Blank line separates related statements and has no runtime effect.

### Line 47

```text
function resetDialogViewport(dialog) {
```

Defines the private helper resetDialogViewport for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 48

```text
  if (!dialog?.style) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 49

```text
  const original = constrainedDialogs.get(dialog);
```

Stores original, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 50

```text
  if (!original) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 51

```text
  for (const [property, saved] of original) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 52

```text
    if (saved.value) dialog.style.setProperty(property, saved.value, saved.priority);
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 53

```text
    else dialog.style.removeProperty(property);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 54

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 55

```text
  constrainedDialogs.delete(dialog);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 56

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 57

```text

```

Blank line separates related statements and has no runtime effect.

### Line 58

```text
function constrainDialogToViewport(dialog, layoutHeight, visibleTop, visibleBottom) {
```

Defines the private helper constrainDialogToViewport for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 59

```text
  if (!dialog?.style) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 60

```text
  let original = constrainedDialogs.get(dialog);
```

Creates mutable original state for this workflow; it changes as the user selects, edits, or loads records.

### Line 61

```text
  if (!original) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 62

```text
    original = new Map(DIALOG_VIEWPORT_PROPERTIES.map(property => [property, {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 63

```text
      value: dialog.style.getPropertyValue(property),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 64

```text
      priority: dialog.style.getPropertyPriority(property)
```

Sets the priority property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 65

```text
    }]));
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 66

```text
    constrainedDialogs.set(dialog, original);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 67

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 68

```text
  const availableHeight = Math.max(1, visibleBottom - visibleTop - VIEWPORT_GUTTER * 2);
```

Stores availableHeight, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 69

```text
  const bottomInset = Math.max(VIEWPORT_GUTTER, layoutHeight - visibleBottom + VIEWPORT_GUTTER);
```

Stores bottomInset, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 70

```text
  dialog.style.setProperty('position', 'fixed');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 71

```text
  dialog.style.setProperty('inset-block-start', `${visibleTop + VIEWPORT_GUTTER}px`);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 72

```text
  dialog.style.setProperty('inset-block-end', `${bottomInset}px`);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 73

```text
  dialog.style.setProperty('max-height', `${availableHeight}px`);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 74

```text
  dialog.style.setProperty('margin-block', 'auto');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 75

```text
  if (!watchedDialogs.has(dialog) && typeof dialog.addEventListener === 'function') {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 76

```text
    watchedDialogs.add(dialog);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 77

```text
    dialog.addEventListener('close', () => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 78

```text
      if (!dialog.open) resetDialogViewport(dialog);
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 79

```text
    });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 80

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 81

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 82

```text

```

Blank line separates related statements and has no runtime effect.

### Line 83

```text
export function enableAutoScrollOnFocus(doc = globalThis.document) {
```

Declares enableAutoScrollOnFocus(), which installs one document-level focus/viewport handler that keeps controls visible.

### Line 84

```text
  if (!doc || typeof doc.addEventListener !== 'function' || registeredDocuments.has(doc)) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 85

```text
  registeredDocuments.add(doc);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 86

```text
  const view = doc.defaultView;
```

Stores view, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 87

```text
  let focusedControl = null;
```

Creates mutable focusedControl state for this workflow; it changes as the user selects, edits, or loads records.

### Line 88

```text
  let constrainedDialog = null;
```

Creates mutable constrainedDialog state for this workflow; it changes as the user selects, edits, or loads records.

### Line 89

```text

```

Blank line separates related statements and has no runtime effect.

### Line 90

```text
  function viewportMetrics() {
```

Defines the private helper viewportMetrics for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 91

```text
    const documentHeight = Number(doc.documentElement?.clientHeight);
```

Stores documentHeight, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 92

```text
    const windowHeight = Number(view?.innerHeight);
```

Stores windowHeight, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 93

```text
    const layoutHeight = [windowHeight, documentHeight].find(value => Number.isFinite(value) && value > 0) || 0;
```

Stores layoutHeight, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 94

```text
    const documentWidth = Number(doc.documentElement?.clientWidth);
```

Stores documentWidth, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 95

```text
    const windowWidth = Number(view?.innerWidth);
```

Stores windowWidth, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 96

```text
    const layoutWidth = [windowWidth, documentWidth].find(value => Number.isFinite(value) && value > 0) || 0;
```

Stores layoutWidth, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 97

```text
    const reportedHeight = Number(view?.visualViewport?.height);
```

Stores reportedHeight, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 98

```text
    const visibleHeight = Number.isFinite(reportedHeight) && reportedHeight > 0
```

Stores visibleHeight, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 99

```text
      ? Math.min(layoutHeight || reportedHeight, reportedHeight)
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 100

```text
      : layoutHeight;
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 101

```text
    const reportedWidth = Number(view?.visualViewport?.width);
```

Stores reportedWidth, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 102

```text
    const visibleWidth = Number.isFinite(reportedWidth) && reportedWidth > 0
```

Stores visibleWidth, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 103

```text
      ? Math.min(layoutWidth || reportedWidth, reportedWidth)
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 104

```text
      : layoutWidth;
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 105

```text
    const reportedTop = Number(view?.visualViewport?.offsetTop);
```

Stores reportedTop, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 106

```text
    const visibleTop = Math.max(0, Math.min(layoutHeight, Number.isFinite(reportedTop) ? reportedTop : 0));
```

Stores visibleTop, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 107

```text
    const reportedLeft = Number(view?.visualViewport?.offsetLeft);
```

Stores reportedLeft, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 108

```text
    const visibleLeft = Math.max(0, Math.min(layoutWidth, Number.isFinite(reportedLeft) ? reportedLeft : 0));
```

Stores visibleLeft, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 109

```text
    const visibleBottom = Math.max(visibleTop, Math.min(layoutHeight || visibleTop + visibleHeight, visibleTop + visibleHeight));
```

Stores visibleBottom, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 110

```text
    const visibleRight = Math.max(visibleLeft, Math.min(layoutWidth || visibleLeft + visibleWidth, visibleLeft + visibleWidth));
```

Stores visibleRight, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 111

```text
    const overlayKeyboardHeight = Number(view?.navigator?.virtualKeyboard?.boundingRect?.height) || 0;
```

Stores overlayKeyboardHeight, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 112

```text
    return { layoutHeight, layoutWidth, visibleHeight, visibleWidth, visibleTop, visibleBottom, visibleLeft, visibleRight, overlayKeyboardHeight };
```

Returns an object with fields layoutHeight: `layoutHeight` (layout height); layoutWidth: `layoutWidth` (layout width); visibleHeight: `visibleHeight` (visible height); visibleWidth: `visibleWidth` (visible width); visibleTop: `visibleTop` (visible top); visibleBottom: `visibleBottom` (visible bottom); and further fields to the caller and exits this function.

### Line 113

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 114

```text

```

Blank line separates related statements and has no runtime effect.

### Line 115

```text
  let baselineViewportHeight = (() => {
```

Creates mutable baselineViewportHeight state for this workflow; it changes as the user selects, edits, or loads records.

### Line 116

```text
    const metrics = viewportMetrics();
```

Stores metrics, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 117

```text
    return Math.max(metrics.layoutHeight, metrics.visibleHeight);
```

Returns chooses the largest of `metrics.layoutHeight` (the layout height property of metrics), `metrics.visibleHeight` (the visible height property of metrics) to the caller and exits this function.

### Line 118

```text
  })();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 119

```text

```

Blank line separates related statements and has no runtime effect.

### Line 120

```text
  function revealIfNeeded(target = focusedControl) {
```

Defines the private helper revealIfNeeded for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 121

```text
    if (!isFocusableElement(target) || doc.activeElement !== target) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 122

```text
    const metrics = viewportMetrics();
```

Stores metrics, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 123

```text
    if (!Number.isFinite(metrics.visibleTop) || !Number.isFinite(metrics.visibleBottom) || metrics.visibleBottom <= metrics.visibleTop) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 124

```text
    const rect = target.getBoundingClientRect();
```

Stores rect, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 125

```text
    const outsideVerticalArea = rect.top < metrics.visibleTop || rect.bottom > metrics.visibleBottom;
```

Stores outsideVerticalArea, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 126

```text
    const hasHorizontalViewport = metrics.visibleRight > metrics.visibleLeft &&
```

Stores hasHorizontalViewport, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 127

```text
      Number.isFinite(rect.left) && Number.isFinite(rect.right);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 128

```text
    const outsideHorizontalArea = hasHorizontalViewport &&
```

Stores outsideHorizontalArea, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 129

```text
      (rect.left < metrics.visibleLeft || rect.right > metrics.visibleRight);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 130

```text
    const outsideVisibleArea = outsideVerticalArea || outsideHorizontalArea;
```

Stores outsideVisibleArea, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 131

```text
    if (outsideVisibleArea) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 132

```text
      target.scrollIntoView?.({ behavior: 'auto', block: 'nearest', inline: 'nearest' });
```

Sets the target.scrollIntoView?.({ behavior property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 133

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 134

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 135

```text

```

Blank line separates related statements and has no runtime effect.

### Line 136

```text
  function syncDialogViewport(target = focusedControl) {
```

Defines the private helper syncDialogViewport for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 137

```text
    const metrics = viewportMetrics();
```

Stores metrics, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 138

```text
    const keyboardControlFocused = Boolean(target && isKeyboardInput(target) && doc.activeElement === target);
```

Stores keyboardControlFocused, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 139

```text
    if (!keyboardControlFocused) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 140

```text
      baselineViewportHeight = Math.max(metrics.layoutHeight, metrics.visibleHeight);
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 141

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 142

```text
    const resizeThreshold = Math.max(100, baselineViewportHeight * 0.15);
```

Stores resizeThreshold, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 143

```text
    const keyboardIsVisible = keyboardControlFocused && (
```

Stores keyboardIsVisible, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 144

```text
      baselineViewportHeight - metrics.visibleHeight > resizeThreshold
```

Continues the surrounding keyboard.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 145

```text
      || metrics.overlayKeyboardHeight > resizeThreshold
```

Continues the surrounding keyboard.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 146

```text
    );
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 147

```text
    const dialog = keyboardIsVisible ? findOpenDialog(target) : null;
```

Stores dialog, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 148

```text
    if (constrainedDialog && constrainedDialog !== dialog) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 149

```text
      resetDialogViewport(constrainedDialog);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 150

```text
      constrainedDialog = null;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 151

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 152

```text
    if (dialog && metrics.layoutHeight > 0 && metrics.visibleBottom > metrics.visibleTop) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 153

```text
      constrainDialogToViewport(dialog, metrics.layoutHeight, metrics.visibleTop, metrics.visibleBottom);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 154

```text
      constrainedDialog = dialog;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 155

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 156

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 157

```text

```

Blank line separates related statements and has no runtime effect.

### Line 158

```text
  function scheduleReveal(target = focusedControl) {
```

Defines the private helper scheduleReveal for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 159

```text
    if (!target) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 160

```text
    const requestFrame = view?.requestAnimationFrame?.bind(view) || (callback => setTimeout(callback, 0));
```

Stores requestFrame, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 161

```text
    requestFrame(() => revealIfNeeded(target));
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 162

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 163

```text

```

Blank line separates related statements and has no runtime effect.

### Line 164

```text
  function handleViewportChange() {
```

Defines the private helper handleViewportChange for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 165

```text
    syncDialogViewport();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 166

```text
    scheduleReveal();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 167

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 168

```text

```

Blank line separates related statements and has no runtime effect.

### Line 169

```text
  doc.addEventListener('focusin', event => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 170

```text
    if (!isFocusableElement(event.target)) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 171

```text
    focusedControl = event.target;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 172

```text
    syncDialogViewport(focusedControl);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 173

```text
    scheduleReveal(focusedControl);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 174

```text
    // The keyboard and its viewport resize can arrive after the initial focus event.
```

This comment documents the design intent here: The keyboard and its viewport resize can arrive after the initial focus event..

### Line 175

```text
    if (isKeyboardInput(focusedControl)) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 176

```text
      const setDelay = view?.setTimeout?.bind(view) || setTimeout;
```

Stores setDelay, value; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 177

```text
      for (const delay of [150, 350, 700]) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 178

```text
        setDelay(() => scheduleReveal(focusedControl), delay);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 179

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 180

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 181

```text
  }, true);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 182

```text

```

Blank line separates related statements and has no runtime effect.

### Line 183

```text
  doc.addEventListener('focusout', () => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 184

```text
    const requestFrame = view?.requestAnimationFrame?.bind(view) || (callback => setTimeout(callback, 0));
```

Stores requestFrame, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the keyboard.mjs workflow stays consistent.

### Line 185

```text
    requestFrame(() => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 186

```text
      focusedControl = isFocusableElement(doc.activeElement) ? doc.activeElement : null;
```

Sets the focusedControl = isFocusableElement(doc.activeElement) ? doc.activeElement property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 187

```text
      syncDialogViewport(focusedControl);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 188

```text
    });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 189

```text
  }, true);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 190

```text

```

Blank line separates related statements and has no runtime effect.

### Line 191

```text
  view?.addEventListener('resize', handleViewportChange);
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 192

```text
  view?.visualViewport?.addEventListener('resize', handleViewportChange);
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 193

```text
  view?.visualViewport?.addEventListener('scroll', handleViewportChange);
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 194

```text
  view?.navigator?.virtualKeyboard?.addEventListener?.('geometrychange', handleViewportChange);
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 195

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 196

```text

```

Blank line separates related statements and has no runtime effect.

### Line 197

```text
// This module is also loaded directly by every page in the workspace iframe.
```

This comment documents the design intent here: This module is also loaded directly by every page in the workspace iframe..

### Line 198

```text
enableAutoScrollOnFocus();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

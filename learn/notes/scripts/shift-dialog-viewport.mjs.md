# scripts/shift-dialog-viewport.mjs

[Exact copy](../../original/scripts/shift-dialog-viewport.mjs)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import { isFocusableElement } from './keyboard.mjs';
```

Imports isFocusableElement from ./keyboard.mjs; these helpers provide the UI utility this module uses.

### Line 2

```text

```

Blank line separates related statements and has no runtime effect.

### Line 3

```text
const VIEWPORT_GUTTER = 8;
```

Stores VIEWPORT_GUTTER, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.

### Line 4

```text

```

Blank line separates related statements and has no runtime effect.

### Line 5

```text
export function resetShiftDialogViewport(dialog) {
```

Declares resetShiftDialogViewport(), which removes temporary mobile viewport constraints from a shift dialog.

### Line 6

```text
  if (!dialog) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 7

```text

```

Blank line separates related statements and has no runtime effect.

### Line 8

```text
  dialog.classList.remove('viewport-constrained');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 9

```text
  dialog.style.removeProperty('--shift-visible-top');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 10

```text
  dialog.style.removeProperty('--shift-visible-bottom');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 11

```text
  dialog.style.removeProperty('--shift-visible-max-height');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 12

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 13

```text

```

Blank line separates related statements and has no runtime effect.

### Line 14

```text
export function syncShiftDialogViewport(dialog, view = globalThis.window) {
```

Declares syncShiftDialogViewport(), which sizes an open shift dialog to the currently visible viewport.

### Line 15

```text
  if (!dialog || !view) return false;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 16

```text
  if (!dialog.open) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 17

```text
    resetShiftDialogViewport(dialog);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 18

```text
    return false;
```

Returns false to the caller and exits this function.

### Line 19

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 20

```text

```

Blank line separates related statements and has no runtime effect.

### Line 21

```text
  const doc = dialog.ownerDocument || view.document;
```

Stores doc, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.

### Line 22

```text
  const layoutHeight = Number(view.innerHeight) || Number(doc?.documentElement?.clientHeight);
```

Stores layoutHeight, a numeric value validated for payroll math; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.

### Line 23

```text
  if (!Number.isFinite(layoutHeight) || layoutHeight <= 0) return false;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 24

```text

```

Blank line separates related statements and has no runtime effect.

### Line 25

```text
  const viewport = view.visualViewport;
```

Stores viewport, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.

### Line 26

```text
  const reportedTop = Number(viewport?.offsetTop);
```

Stores reportedTop, a numeric value validated for payroll math; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.

### Line 27

```text
  const visibleTop = Math.max(0, Math.min(layoutHeight, Number.isFinite(reportedTop) ? reportedTop : 0));
```

Stores visibleTop, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.

### Line 28

```text
  const reportedHeight = Number(viewport?.height);
```

Stores reportedHeight, a numeric value validated for payroll math; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.

### Line 29

```text
  const visibleHeight = Number.isFinite(reportedHeight) && reportedHeight > 0
```

Stores visibleHeight, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.

### Line 30

```text
    ? reportedHeight
```

Continues the surrounding shift-dialog-viewport.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 31

```text
    : layoutHeight;
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 32

```text
  const visibleBottom = Math.min(layoutHeight, visibleTop + visibleHeight);
```

Stores visibleBottom, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.

### Line 33

```text
  const maxHeight = Math.max(1, visibleBottom - visibleTop - VIEWPORT_GUTTER * 2);
```

Stores maxHeight, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.

### Line 34

```text
  const bottomInset = Math.max(VIEWPORT_GUTTER, layoutHeight - visibleBottom + VIEWPORT_GUTTER);
```

Stores bottomInset, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.

### Line 35

```text

```

Blank line separates related statements and has no runtime effect.

### Line 36

```text
  dialog.style.setProperty('--shift-visible-top', `${visibleTop + VIEWPORT_GUTTER}px`);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 37

```text
  dialog.style.setProperty('--shift-visible-bottom', `${bottomInset}px`);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 38

```text
  dialog.style.setProperty('--shift-visible-max-height', `${maxHeight}px`);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 39

```text
  dialog.classList.add('viewport-constrained');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 40

```text

```

Blank line separates related statements and has no runtime effect.

### Line 41

```text
  const focusedControl = doc?.activeElement;
```

Stores focusedControl, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.

### Line 42

```text
  if (!dialog.contains(focusedControl) || !isFocusableElement(focusedControl)) return true;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 43

```text

```

Blank line separates related statements and has no runtime effect.

### Line 44

```text
  const setTimeout = view.setTimeout?.bind(view) || globalThis.setTimeout;
```

Stores setTimeout, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.

### Line 45

```text
  const requestFrame = view.requestAnimationFrame?.bind(view)
```

Stores requestFrame, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.

### Line 46

```text
    || (callback => setTimeout(callback, 0));
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 47

```text
  requestFrame(() => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 48

```text
    if (dialog.open && doc.activeElement === focusedControl && dialog.contains(focusedControl)) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 49

```text
      const rect = focusedControl.getBoundingClientRect?.();
```

Stores rect, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.

### Line 50

```text
      if (rect && (rect.top < visibleTop || rect.bottom > visibleBottom)) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 51

```text
        focusedControl.scrollIntoView?.({ behavior: 'auto', block: 'nearest', inline: 'nearest' });
```

Sets the focusedControl.scrollIntoView?.({ behavior property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 52

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 53

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 54

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 55

```text

```

Blank line separates related statements and has no runtime effect.

### Line 56

```text
  return true;
```

Returns true to the caller and exits this function.

### Line 57

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

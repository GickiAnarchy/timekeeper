// Original L1: Imports isFocusableElement from ./keyboard.mjs; these helpers provide the UI utility this module uses.
import { isFocusableElement } from './keyboard.mjs';
// Original L2: Blank line separates related statements and has no runtime effect.

// Original L3: Stores VIEWPORT_GUTTER, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.
const VIEWPORT_GUTTER = 8;
// Original L4: Blank line separates related statements and has no runtime effect.

// Original L5: Declares resetShiftDialogViewport(), which removes temporary mobile viewport constraints from a shift dialog.
export function resetShiftDialogViewport(dialog) {
// Original L6: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!dialog) return;
// Original L7: Blank line separates related statements and has no runtime effect.

// Original L8: Completes this application statement, applying the shown value or operation to the current page state/data record.
  dialog.classList.remove('viewport-constrained');
// Original L9: Completes this application statement, applying the shown value or operation to the current page state/data record.
  dialog.style.removeProperty('--shift-visible-top');
// Original L10: Completes this application statement, applying the shown value or operation to the current page state/data record.
  dialog.style.removeProperty('--shift-visible-bottom');
// Original L11: Completes this application statement, applying the shown value or operation to the current page state/data record.
  dialog.style.removeProperty('--shift-visible-max-height');
// Original L12: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L13: Blank line separates related statements and has no runtime effect.

// Original L14: Declares syncShiftDialogViewport(), which sizes an open shift dialog to the currently visible viewport.
export function syncShiftDialogViewport(dialog, view = globalThis.window) {
// Original L15: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!dialog || !view) return false;
// Original L16: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!dialog.open) {
// Original L17: Completes this application statement, applying the shown value or operation to the current page state/data record.
    resetShiftDialogViewport(dialog);
// Original L18: Returns false to the caller and exits this function.
    return false;
// Original L19: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L20: Blank line separates related statements and has no runtime effect.

// Original L21: Stores doc, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.
  const doc = dialog.ownerDocument || view.document;
// Original L22: Stores layoutHeight, a numeric value validated for payroll math; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.
  const layoutHeight = Number(view.innerHeight) || Number(doc?.documentElement?.clientHeight);
// Original L23: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!Number.isFinite(layoutHeight) || layoutHeight <= 0) return false;
// Original L24: Blank line separates related statements and has no runtime effect.

// Original L25: Stores viewport, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.
  const viewport = view.visualViewport;
// Original L26: Stores reportedTop, a numeric value validated for payroll math; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.
  const reportedTop = Number(viewport?.offsetTop);
// Original L27: Stores visibleTop, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.
  const visibleTop = Math.max(0, Math.min(layoutHeight, Number.isFinite(reportedTop) ? reportedTop : 0));
// Original L28: Stores reportedHeight, a numeric value validated for payroll math; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.
  const reportedHeight = Number(viewport?.height);
// Original L29: Stores visibleHeight, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.
  const visibleHeight = Number.isFinite(reportedHeight) && reportedHeight > 0
// Original L30: Continues the surrounding shift-dialog-viewport.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
    ? reportedHeight
// Original L31: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
    : layoutHeight;
// Original L32: Stores visibleBottom, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.
  const visibleBottom = Math.min(layoutHeight, visibleTop + visibleHeight);
// Original L33: Stores maxHeight, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.
  const maxHeight = Math.max(1, visibleBottom - visibleTop - VIEWPORT_GUTTER * 2);
// Original L34: Stores bottomInset, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.
  const bottomInset = Math.max(VIEWPORT_GUTTER, layoutHeight - visibleBottom + VIEWPORT_GUTTER);
// Original L35: Blank line separates related statements and has no runtime effect.

// Original L36: Completes this application statement, applying the shown value or operation to the current page state/data record.
  dialog.style.setProperty('--shift-visible-top', `${visibleTop + VIEWPORT_GUTTER}px`);
// Original L37: Completes this application statement, applying the shown value or operation to the current page state/data record.
  dialog.style.setProperty('--shift-visible-bottom', `${bottomInset}px`);
// Original L38: Completes this application statement, applying the shown value or operation to the current page state/data record.
  dialog.style.setProperty('--shift-visible-max-height', `${maxHeight}px`);
// Original L39: Completes this application statement, applying the shown value or operation to the current page state/data record.
  dialog.classList.add('viewport-constrained');
// Original L40: Blank line separates related statements and has no runtime effect.

// Original L41: Stores focusedControl, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.
  const focusedControl = doc?.activeElement;
// Original L42: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!dialog.contains(focusedControl) || !isFocusableElement(focusedControl)) return true;
// Original L43: Blank line separates related statements and has no runtime effect.

// Original L44: Stores setTimeout, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.
  const setTimeout = view.setTimeout?.bind(view) || globalThis.setTimeout;
// Original L45: Stores requestFrame, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.
  const requestFrame = view.requestAnimationFrame?.bind(view)
// Original L46: Completes this application statement, applying the shown value or operation to the current page state/data record.
    || (callback => setTimeout(callback, 0));
// Original L47: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
  requestFrame(() => {
// Original L48: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (dialog.open && doc.activeElement === focusedControl && dialog.contains(focusedControl)) {
// Original L49: Stores rect, value; later code reuses this result so the shift-dialog-viewport.mjs workflow stays consistent.
      const rect = focusedControl.getBoundingClientRect?.();
// Original L50: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (rect && (rect.top < visibleTop || rect.bottom > visibleBottom)) {
// Original L51: Sets the focusedControl.scrollIntoView?.({ behavior property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
        focusedControl.scrollIntoView?.({ behavior: 'auto', block: 'nearest', inline: 'nearest' });
// Original L52: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L53: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L54: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L55: Blank line separates related statements and has no runtime effect.

// Original L56: Returns true to the caller and exits this function.
  return true;
// Original L57: Closes the surrounding block or callback; no additional operation occurs on this line.
}

const VIEWPORT_GUTTER = 8;
const NON_TEXT_INPUT_TYPES = new Set([
  'button', 'checkbox', 'color', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'
]);

function isKeyboardInput(target) {
  if (!target || target.disabled || target.readOnly) return false;

  const tagName = String(target.tagName || '').toUpperCase();
  if (tagName === 'TEXTAREA' || tagName === 'SELECT') return true;
  if (tagName !== 'INPUT') return false;

  return !NON_TEXT_INPUT_TYPES.has(String(target.type || 'text').toLowerCase());
}

export function resetShiftDialogViewport(dialog) {
  if (!dialog) return;

  dialog.classList.remove('viewport-constrained');
  dialog.style.removeProperty('--shift-visible-top');
  dialog.style.removeProperty('--shift-visible-bottom');
  dialog.style.removeProperty('--shift-visible-max-height');
}

export function syncShiftDialogViewport(dialog, view = globalThis.window) {
  if (!dialog || !view) return false;
  if (!dialog.open) {
    resetShiftDialogViewport(dialog);
    return false;
  }

  const doc = dialog.ownerDocument || view.document;
  const layoutHeight = Number(view.innerHeight) || Number(doc?.documentElement?.clientHeight);
  if (!Number.isFinite(layoutHeight) || layoutHeight <= 0) return false;

  const viewport = view.visualViewport;
  const reportedTop = Number(viewport?.offsetTop);
  const visibleTop = Math.max(0, Math.min(layoutHeight, Number.isFinite(reportedTop) ? reportedTop : 0));
  const reportedHeight = Number(viewport?.height);
  const visibleHeight = Number.isFinite(reportedHeight) && reportedHeight > 0
    ? reportedHeight
    : layoutHeight;
  const visibleBottom = Math.min(layoutHeight, visibleTop + visibleHeight);
  const maxHeight = Math.max(1, visibleBottom - visibleTop - VIEWPORT_GUTTER * 2);
  const bottomInset = Math.max(VIEWPORT_GUTTER, layoutHeight - visibleBottom + VIEWPORT_GUTTER);

  dialog.style.setProperty('--shift-visible-top', `${visibleTop + VIEWPORT_GUTTER}px`);
  dialog.style.setProperty('--shift-visible-bottom', `${bottomInset}px`);
  dialog.style.setProperty('--shift-visible-max-height', `${maxHeight}px`);
  dialog.classList.add('viewport-constrained');

  const focusedControl = doc?.activeElement;
  if (!dialog.contains(focusedControl) || !isKeyboardInput(focusedControl)) return true;

  const setTimeout = view.setTimeout?.bind(view) || globalThis.setTimeout;
  const requestFrame = view.requestAnimationFrame?.bind(view)
    || (callback => setTimeout(callback, 0));
  requestFrame(() => {
    if (dialog.open && doc.activeElement === focusedControl && dialog.contains(focusedControl)) {
      focusedControl.scrollIntoView?.({ behavior: 'auto', block: 'nearest', inline: 'nearest' });
    }
  });

  return true;
}

const registeredDocuments = new WeakSet();
const NON_TEXT_INPUT_TYPES = new Set([
  'button', 'checkbox', 'color', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'
]);
const constrainedDialogs = new WeakMap();
const watchedDialogs = new WeakSet();
const DIALOG_VIEWPORT_PROPERTIES = [
  'position', 'inset-block-start', 'inset-block-end', 'max-height', 'margin-block'
];
const VIEWPORT_GUTTER = 8;

function isKeyboardInput(target) {
  if (!target || target.disabled || target.readOnly) return false;
  const tagName = String(target.tagName || '').toUpperCase();
  if (tagName === 'TEXTAREA' || tagName === 'SELECT') return true;
  if (tagName !== 'INPUT') return false;
  return !NON_TEXT_INPUT_TYPES.has(String(target.type || 'text').toLowerCase());
}

function findOpenDialog(target) {
  for (let element = target; element; element = element.parentElement) {
    if (String(element.tagName || '').toUpperCase() === 'DIALOG') {
      return element.open ? element : null;
    }
  }
  return null;
}

function resetDialogViewport(dialog) {
  if (!dialog?.style) return;
  const original = constrainedDialogs.get(dialog);
  if (!original) return;
  for (const [property, saved] of original) {
    if (saved.value) dialog.style.setProperty(property, saved.value, saved.priority);
    else dialog.style.removeProperty(property);
  }
  constrainedDialogs.delete(dialog);
}

function constrainDialogToViewport(dialog, layoutHeight, visibleTop, visibleBottom) {
  if (!dialog?.style) return;
  let original = constrainedDialogs.get(dialog);
  if (!original) {
    original = new Map(DIALOG_VIEWPORT_PROPERTIES.map(property => [property, {
      value: dialog.style.getPropertyValue(property),
      priority: dialog.style.getPropertyPriority(property)
    }]));
    constrainedDialogs.set(dialog, original);
  }
  const availableHeight = Math.max(1, visibleBottom - visibleTop - VIEWPORT_GUTTER * 2);
  const bottomInset = Math.max(VIEWPORT_GUTTER, layoutHeight - visibleBottom + VIEWPORT_GUTTER);
  dialog.style.setProperty('position', 'fixed');
  dialog.style.setProperty('inset-block-start', `${visibleTop + VIEWPORT_GUTTER}px`);
  dialog.style.setProperty('inset-block-end', `${bottomInset}px`);
  dialog.style.setProperty('max-height', `${availableHeight}px`);
  dialog.style.setProperty('margin-block', 'auto');
  if (!watchedDialogs.has(dialog) && typeof dialog.addEventListener === 'function') {
    watchedDialogs.add(dialog);
    dialog.addEventListener('close', () => {
      if (!dialog.open) resetDialogViewport(dialog);
    });
  }
}

export function enableAutoScrollOnFocus(doc = globalThis.document) {
  if (!doc || typeof doc.addEventListener !== 'function' || registeredDocuments.has(doc)) return;
  registeredDocuments.add(doc);
  const view = doc.defaultView;
  let focusedControl = null;
  let constrainedDialog = null;

  function viewportMetrics() {
    const documentHeight = Number(doc.documentElement?.clientHeight);
    const windowHeight = Number(view?.innerHeight);
    const layoutHeight = [windowHeight, documentHeight].find(value => Number.isFinite(value) && value > 0) || 0;
    const reportedHeight = Number(view?.visualViewport?.height);
    const visibleHeight = Number.isFinite(reportedHeight) && reportedHeight > 0
      ? Math.min(layoutHeight || reportedHeight, reportedHeight)
      : layoutHeight;
    const reportedTop = Number(view?.visualViewport?.offsetTop);
    const visibleTop = Math.max(0, Math.min(layoutHeight, Number.isFinite(reportedTop) ? reportedTop : 0));
    const visibleBottom = Math.max(visibleTop, Math.min(layoutHeight || visibleTop + visibleHeight, visibleTop + visibleHeight));
    const overlayKeyboardHeight = Number(view?.navigator?.virtualKeyboard?.boundingRect?.height) || 0;
    return { layoutHeight, visibleHeight, visibleTop, visibleBottom, overlayKeyboardHeight };
  }

  let baselineViewportHeight = (() => {
    const metrics = viewportMetrics();
    return Math.max(metrics.layoutHeight, metrics.visibleHeight);
  })();

  function revealIfNeeded(target = focusedControl) {
    if (!target || !isKeyboardInput(target) || !target.isConnected || doc.activeElement !== target) return;
    const viewport = view?.visualViewport;
    const viewportTop = Math.max(0, Number(viewport?.offsetTop) || 0);
    const viewportHeight = Number(viewport?.height) || Number(view?.innerHeight) || Number(doc.documentElement?.clientHeight);
    if (!Number.isFinite(viewportHeight) || viewportHeight <= 0) return;
    const rect = target.getBoundingClientRect();
    const margin = Math.min(24, Math.max(12, rect.height / 3));
    const viewportBottom = viewportTop + viewportHeight;
    const outsideVisibleArea = rect.top < viewportTop + margin || rect.bottom > viewportBottom - margin;
    if (outsideVisibleArea) {
      target.scrollIntoView?.({ behavior: 'auto', block: 'center', inline: 'nearest' });
    }
  }

  function syncDialogViewport(target = focusedControl) {
    const metrics = viewportMetrics();
    const keyboardControlFocused = Boolean(target && isKeyboardInput(target) && doc.activeElement === target);
    if (!keyboardControlFocused) {
      baselineViewportHeight = Math.max(metrics.layoutHeight, metrics.visibleHeight);
    }
    const resizeThreshold = Math.max(100, baselineViewportHeight * 0.15);
    const keyboardIsVisible = keyboardControlFocused && (
      baselineViewportHeight - metrics.visibleHeight > resizeThreshold
      || metrics.overlayKeyboardHeight > resizeThreshold
    );
    const dialog = keyboardIsVisible ? findOpenDialog(target) : null;
    if (constrainedDialog && constrainedDialog !== dialog) {
      resetDialogViewport(constrainedDialog);
      constrainedDialog = null;
    }
    if (dialog && metrics.layoutHeight > 0 && metrics.visibleBottom > metrics.visibleTop) {
      constrainDialogToViewport(dialog, metrics.layoutHeight, metrics.visibleTop, metrics.visibleBottom);
      constrainedDialog = dialog;
    }
  }

  function scheduleReveal(target = focusedControl) {
    if (!target) return;
    const requestFrame = view?.requestAnimationFrame?.bind(view) || (callback => setTimeout(callback, 0));
    requestFrame(() => revealIfNeeded(target));
  }

  function handleViewportChange() {
    syncDialogViewport();
    scheduleReveal();
  }

  doc.addEventListener('focusin', event => {
    if (!isKeyboardInput(event.target)) return;
    focusedControl = event.target;
    syncDialogViewport(focusedControl);
    scheduleReveal(focusedControl);
    // The keyboard and its viewport resize can arrive after the initial focus event.
    const setDelay = view?.setTimeout?.bind(view) || setTimeout;
    for (const delay of [150, 350, 700]) {
      setDelay(() => scheduleReveal(focusedControl), delay);
    }
  }, true);

  doc.addEventListener('focusout', () => {
    const requestFrame = view?.requestAnimationFrame?.bind(view) || (callback => setTimeout(callback, 0));
    requestFrame(() => {
      focusedControl = isKeyboardInput(doc.activeElement) ? doc.activeElement : null;
      syncDialogViewport(focusedControl);
    });
  }, true);

  view?.addEventListener('resize', handleViewportChange);
  view?.visualViewport?.addEventListener('resize', handleViewportChange);
  view?.visualViewport?.addEventListener('scroll', handleViewportChange);
  view?.navigator?.virtualKeyboard?.addEventListener?.('geometrychange', handleViewportChange);
}

// This module is also loaded directly by every page in the workspace iframe.
enableAutoScrollOnFocus();

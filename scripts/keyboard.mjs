const registeredDocuments = new WeakSet();
const FOCUSABLE_TAGS = new Set([
  'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'IFRAME', 'OBJECT', 'EMBED', 'SUMMARY', 'AUDIO', 'VIDEO'
]);
const NON_TEXT_INPUT_TYPES = new Set([
  'button', 'checkbox', 'color', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'
]);
const constrainedDialogs = new WeakMap();
const watchedDialogs = new WeakSet();
const DIALOG_VIEWPORT_PROPERTIES = [
  'position', 'inset-block-start', 'inset-block-end', 'max-height', 'margin-block'
];
const VIEWPORT_GUTTER = 8;

function hasAttribute(target, name) {
  if (typeof target?.hasAttribute === 'function') return target.hasAttribute(name);
  return typeof target?.getAttribute === 'function' && target.getAttribute(name) != null;
}

export function isFocusableElement(target) {
  if (!target || target.disabled || target.hidden || target.inert || target.isConnected === false) return false;
  const tagName = String(target.tagName || '').toUpperCase();
  if (tagName === 'INPUT' && String(target.type || 'text').toLowerCase() === 'hidden') return false;
  if (tagName === 'A' || tagName === 'AREA') return hasAttribute(target, 'href') || hasAttribute(target, 'tabindex');
  if (FOCUSABLE_TAGS.has(tagName)) return true;
  if (target.isContentEditable || String(target.contentEditable || '').toLowerCase() === 'true') return true;
  return hasAttribute(target, 'tabindex') || Number(target.tabIndex) >= 0;
}

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
    const documentWidth = Number(doc.documentElement?.clientWidth);
    const windowWidth = Number(view?.innerWidth);
    const layoutWidth = [windowWidth, documentWidth].find(value => Number.isFinite(value) && value > 0) || 0;
    const reportedHeight = Number(view?.visualViewport?.height);
    const visibleHeight = Number.isFinite(reportedHeight) && reportedHeight > 0
      ? Math.min(layoutHeight || reportedHeight, reportedHeight)
      : layoutHeight;
    const reportedWidth = Number(view?.visualViewport?.width);
    const visibleWidth = Number.isFinite(reportedWidth) && reportedWidth > 0
      ? Math.min(layoutWidth || reportedWidth, reportedWidth)
      : layoutWidth;
    const reportedTop = Number(view?.visualViewport?.offsetTop);
    const visibleTop = Math.max(0, Math.min(layoutHeight, Number.isFinite(reportedTop) ? reportedTop : 0));
    const reportedLeft = Number(view?.visualViewport?.offsetLeft);
    const visibleLeft = Math.max(0, Math.min(layoutWidth, Number.isFinite(reportedLeft) ? reportedLeft : 0));
    const visibleBottom = Math.max(visibleTop, Math.min(layoutHeight || visibleTop + visibleHeight, visibleTop + visibleHeight));
    const visibleRight = Math.max(visibleLeft, Math.min(layoutWidth || visibleLeft + visibleWidth, visibleLeft + visibleWidth));
    const overlayKeyboardHeight = Number(view?.navigator?.virtualKeyboard?.boundingRect?.height) || 0;
    return { layoutHeight, layoutWidth, visibleHeight, visibleWidth, visibleTop, visibleBottom, visibleLeft, visibleRight, overlayKeyboardHeight };
  }

  let baselineViewportHeight = (() => {
    const metrics = viewportMetrics();
    return Math.max(metrics.layoutHeight, metrics.visibleHeight);
  })();

  function revealIfNeeded(target = focusedControl) {
    if (!isFocusableElement(target) || doc.activeElement !== target) return;
    const metrics = viewportMetrics();
    if (!Number.isFinite(metrics.visibleTop) || !Number.isFinite(metrics.visibleBottom) || metrics.visibleBottom <= metrics.visibleTop) return;
    const rect = target.getBoundingClientRect();
    const outsideVerticalArea = rect.top < metrics.visibleTop || rect.bottom > metrics.visibleBottom;
    const hasHorizontalViewport = metrics.visibleRight > metrics.visibleLeft &&
      Number.isFinite(rect.left) && Number.isFinite(rect.right);
    const outsideHorizontalArea = hasHorizontalViewport &&
      (rect.left < metrics.visibleLeft || rect.right > metrics.visibleRight);
    const outsideVisibleArea = outsideVerticalArea || outsideHorizontalArea;
    if (outsideVisibleArea) {
      target.scrollIntoView?.({ behavior: 'auto', block: 'nearest', inline: 'nearest' });
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
    if (!isFocusableElement(event.target)) return;
    focusedControl = event.target;
    syncDialogViewport(focusedControl);
    scheduleReveal(focusedControl);
    // The keyboard and its viewport resize can arrive after the initial focus event.
    if (isKeyboardInput(focusedControl)) {
      const setDelay = view?.setTimeout?.bind(view) || setTimeout;
      for (const delay of [150, 350, 700]) {
        setDelay(() => scheduleReveal(focusedControl), delay);
      }
    }
  }, true);

  doc.addEventListener('focusout', () => {
    const requestFrame = view?.requestAnimationFrame?.bind(view) || (callback => setTimeout(callback, 0));
    requestFrame(() => {
      focusedControl = isFocusableElement(doc.activeElement) ? doc.activeElement : null;
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

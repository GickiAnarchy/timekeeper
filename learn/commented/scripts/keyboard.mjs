// Original L1: Stores registeredDocuments, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
const registeredDocuments = new WeakSet();
// Original L2: Stores FOCUSABLE_TAGS, a set of unique IDs used to prevent duplicate links; later code reuses this result so the keyboard.mjs workflow stays consistent.
const FOCUSABLE_TAGS = new Set([
// Original L3: Continues the surrounding keyboard.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
  'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'IFRAME', 'OBJECT', 'EMBED', 'SUMMARY', 'AUDIO', 'VIDEO'
// Original L4: Closes the surrounding block or callback; no additional operation occurs on this line.
]);
// Original L5: Stores NON_TEXT_INPUT_TYPES, a set of unique IDs used to prevent duplicate links; later code reuses this result so the keyboard.mjs workflow stays consistent.
const NON_TEXT_INPUT_TYPES = new Set([
// Original L6: Continues the surrounding keyboard.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
  'button', 'checkbox', 'color', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'
// Original L7: Closes the surrounding block or callback; no additional operation occurs on this line.
]);
// Original L8: Stores constrainedDialogs, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
const constrainedDialogs = new WeakMap();
// Original L9: Stores watchedDialogs, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
const watchedDialogs = new WeakSet();
// Original L10: Stores DIALOG_VIEWPORT_PROPERTIES, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
const DIALOG_VIEWPORT_PROPERTIES = [
// Original L11: Continues the surrounding keyboard.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
  'position', 'inset-block-start', 'inset-block-end', 'max-height', 'margin-block'
// Original L12: Continues the surrounding array literal of application options or data records.
];
// Original L13: Stores VIEWPORT_GUTTER, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
const VIEWPORT_GUTTER = 8;
// Original L14: Blank line separates related statements and has no runtime effect.

// Original L15: Defines the private helper hasAttribute for this page; keeping it local prevents unrelated pages from depending on UI details.
function hasAttribute(target, name) {
// Original L16: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (typeof target?.hasAttribute === 'function') return target.hasAttribute(name);
// Original L17: Returns uses checks inequality between calls `target.getAttribute` with `name` (name) and null, allowing type conversion only if checks that gets the JavaScript type name of `target?.getAttribute` (the get attribute property of target); optional chaining stops with undefined if a guarded receiver is null or undefined and "function" have the same value and type is truthy; otherwise keeps the falsy first value to the caller and exits this function.
  return typeof target?.getAttribute === 'function' && target.getAttribute(name) != null;
// Original L18: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L19: Blank line separates related statements and has no runtime effect.

// Original L20: Declares isFocusableElement(), which tests whether an element can receive keyboard focus.
export function isFocusableElement(target) {
// Original L21: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!target || target.disabled || target.hidden || target.inert || target.isConnected === false) return false;
// Original L22: Stores tagName, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
  const tagName = String(target.tagName || '').toUpperCase();
// Original L23: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (tagName === 'INPUT' && String(target.type || 'text').toLowerCase() === 'hidden') return false;
// Original L24: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (tagName === 'A' || tagName === 'AREA') return hasAttribute(target, 'href') || hasAttribute(target, 'tabindex');
// Original L25: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (FOCUSABLE_TAGS.has(tagName)) return true;
// Original L26: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (target.isContentEditable || String(target.contentEditable || '').toLowerCase() === 'true') return true;
// Original L27: Returns uses calls `hasAttribute` with `target` (target); "tabindex" when it is truthy, otherwise falls back to checks whether converts `target.tabIndex` (the tab index property of target) to a number (invalid numeric text becomes NaN) is at least 0 to the caller and exits this function.
  return hasAttribute(target, 'tabindex') || Number(target.tabIndex) >= 0;
// Original L28: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L29: Blank line separates related statements and has no runtime effect.

// Original L30: Defines the private helper isKeyboardInput for this page; keeping it local prevents unrelated pages from depending on UI details.
function isKeyboardInput(target) {
// Original L31: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!target || target.disabled || target.readOnly) return false;
// Original L32: Stores tagName, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
  const tagName = String(target.tagName || '').toUpperCase();
// Original L33: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (tagName === 'TEXTAREA' || tagName === 'SELECT') return true;
// Original L34: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (tagName !== 'INPUT') return false;
// Original L35: Returns negates the truthiness of calls `NON_TEXT_INPUT_TYPES.has` with converts converts uses `target.type` when it is truthy, otherwise falls back to "text" to text to lowercase text to the caller and exits this function.
  return !NON_TEXT_INPUT_TYPES.has(String(target.type || 'text').toLowerCase());
// Original L36: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L37: Blank line separates related statements and has no runtime effect.

// Original L38: Defines the private helper findOpenDialog for this page; keeping it local prevents unrelated pages from depending on UI details.
function findOpenDialog(target) {
// Original L39: Iterates through each matching record so the page can aggregate or render every item.
  for (let element = target; element; element = element.parentElement) {
// Original L40: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (String(element.tagName || '').toUpperCase() === 'DIALOG') {
// Original L41: Returns checks `element.open` (the open property of element); if true chooses `element` (element), otherwise null to the caller and exits this function.
      return element.open ? element : null;
// Original L42: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L43: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L44: Returns null to the caller and exits this function.
  return null;
// Original L45: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L46: Blank line separates related statements and has no runtime effect.

// Original L47: Defines the private helper resetDialogViewport for this page; keeping it local prevents unrelated pages from depending on UI details.
function resetDialogViewport(dialog) {
// Original L48: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!dialog?.style) return;
// Original L49: Stores original, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
  const original = constrainedDialogs.get(dialog);
// Original L50: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!original) return;
// Original L51: Iterates through each matching record so the page can aggregate or render every item.
  for (const [property, saved] of original) {
// Original L52: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (saved.value) dialog.style.setProperty(property, saved.value, saved.priority);
// Original L53: Completes this application statement, applying the shown value or operation to the current page state/data record.
    else dialog.style.removeProperty(property);
// Original L54: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L55: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
  constrainedDialogs.delete(dialog);
// Original L56: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L57: Blank line separates related statements and has no runtime effect.

// Original L58: Defines the private helper constrainDialogToViewport for this page; keeping it local prevents unrelated pages from depending on UI details.
function constrainDialogToViewport(dialog, layoutHeight, visibleTop, visibleBottom) {
// Original L59: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!dialog?.style) return;
// Original L60: Creates mutable original state for this workflow; it changes as the user selects, edits, or loads records.
  let original = constrainedDialogs.get(dialog);
// Original L61: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!original) {
// Original L62: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    original = new Map(DIALOG_VIEWPORT_PROPERTIES.map(property => [property, {
// Original L63: Supplies another named imported value in the module dependency list, giving this page access to that helper.
      value: dialog.style.getPropertyValue(property),
// Original L64: Sets the priority property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
      priority: dialog.style.getPropertyPriority(property)
// Original L65: Completes this application statement, applying the shown value or operation to the current page state/data record.
    }]));
// Original L66: Completes this application statement, applying the shown value or operation to the current page state/data record.
    constrainedDialogs.set(dialog, original);
// Original L67: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L68: Stores availableHeight, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the keyboard.mjs workflow stays consistent.
  const availableHeight = Math.max(1, visibleBottom - visibleTop - VIEWPORT_GUTTER * 2);
// Original L69: Stores bottomInset, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the keyboard.mjs workflow stays consistent.
  const bottomInset = Math.max(VIEWPORT_GUTTER, layoutHeight - visibleBottom + VIEWPORT_GUTTER);
// Original L70: Completes this application statement, applying the shown value or operation to the current page state/data record.
  dialog.style.setProperty('position', 'fixed');
// Original L71: Completes this application statement, applying the shown value or operation to the current page state/data record.
  dialog.style.setProperty('inset-block-start', `${visibleTop + VIEWPORT_GUTTER}px`);
// Original L72: Completes this application statement, applying the shown value or operation to the current page state/data record.
  dialog.style.setProperty('inset-block-end', `${bottomInset}px`);
// Original L73: Completes this application statement, applying the shown value or operation to the current page state/data record.
  dialog.style.setProperty('max-height', `${availableHeight}px`);
// Original L74: Completes this application statement, applying the shown value or operation to the current page state/data record.
  dialog.style.setProperty('margin-block', 'auto');
// Original L75: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!watchedDialogs.has(dialog) && typeof dialog.addEventListener === 'function') {
// Original L76: Completes this application statement, applying the shown value or operation to the current page state/data record.
    watchedDialogs.add(dialog);
// Original L77: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
    dialog.addEventListener('close', () => {
// Original L78: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (!dialog.open) resetDialogViewport(dialog);
// Original L79: Completes this application statement, applying the shown value or operation to the current page state/data record.
    });
// Original L80: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L81: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L82: Blank line separates related statements and has no runtime effect.

// Original L83: Declares enableAutoScrollOnFocus(), which installs one document-level focus/viewport handler that keeps controls visible.
export function enableAutoScrollOnFocus(doc = globalThis.document) {
// Original L84: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!doc || typeof doc.addEventListener !== 'function' || registeredDocuments.has(doc)) return;
// Original L85: Completes this application statement, applying the shown value or operation to the current page state/data record.
  registeredDocuments.add(doc);
// Original L86: Stores view, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
  const view = doc.defaultView;
// Original L87: Creates mutable focusedControl state for this workflow; it changes as the user selects, edits, or loads records.
  let focusedControl = null;
// Original L88: Creates mutable constrainedDialog state for this workflow; it changes as the user selects, edits, or loads records.
  let constrainedDialog = null;
// Original L89: Blank line separates related statements and has no runtime effect.

// Original L90: Defines the private helper viewportMetrics for this page; keeping it local prevents unrelated pages from depending on UI details.
  function viewportMetrics() {
// Original L91: Stores documentHeight, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const documentHeight = Number(doc.documentElement?.clientHeight);
// Original L92: Stores windowHeight, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const windowHeight = Number(view?.innerHeight);
// Original L93: Stores layoutHeight, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const layoutHeight = [windowHeight, documentHeight].find(value => Number.isFinite(value) && value > 0) || 0;
// Original L94: Stores documentWidth, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const documentWidth = Number(doc.documentElement?.clientWidth);
// Original L95: Stores windowWidth, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const windowWidth = Number(view?.innerWidth);
// Original L96: Stores layoutWidth, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const layoutWidth = [windowWidth, documentWidth].find(value => Number.isFinite(value) && value > 0) || 0;
// Original L97: Stores reportedHeight, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const reportedHeight = Number(view?.visualViewport?.height);
// Original L98: Stores visibleHeight, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const visibleHeight = Number.isFinite(reportedHeight) && reportedHeight > 0
// Original L99: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
      ? Math.min(layoutHeight || reportedHeight, reportedHeight)
// Original L100: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
      : layoutHeight;
// Original L101: Stores reportedWidth, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const reportedWidth = Number(view?.visualViewport?.width);
// Original L102: Stores visibleWidth, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const visibleWidth = Number.isFinite(reportedWidth) && reportedWidth > 0
// Original L103: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
      ? Math.min(layoutWidth || reportedWidth, reportedWidth)
// Original L104: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
      : layoutWidth;
// Original L105: Stores reportedTop, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const reportedTop = Number(view?.visualViewport?.offsetTop);
// Original L106: Stores visibleTop, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const visibleTop = Math.max(0, Math.min(layoutHeight, Number.isFinite(reportedTop) ? reportedTop : 0));
// Original L107: Stores reportedLeft, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const reportedLeft = Number(view?.visualViewport?.offsetLeft);
// Original L108: Stores visibleLeft, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const visibleLeft = Math.max(0, Math.min(layoutWidth, Number.isFinite(reportedLeft) ? reportedLeft : 0));
// Original L109: Stores visibleBottom, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const visibleBottom = Math.max(visibleTop, Math.min(layoutHeight || visibleTop + visibleHeight, visibleTop + visibleHeight));
// Original L110: Stores visibleRight, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const visibleRight = Math.max(visibleLeft, Math.min(layoutWidth || visibleLeft + visibleWidth, visibleLeft + visibleWidth));
// Original L111: Stores overlayKeyboardHeight, a numeric value validated for payroll math; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const overlayKeyboardHeight = Number(view?.navigator?.virtualKeyboard?.boundingRect?.height) || 0;
// Original L112: Returns an object with fields layoutHeight: `layoutHeight` (layout height); layoutWidth: `layoutWidth` (layout width); visibleHeight: `visibleHeight` (visible height); visibleWidth: `visibleWidth` (visible width); visibleTop: `visibleTop` (visible top); visibleBottom: `visibleBottom` (visible bottom); and further fields to the caller and exits this function.
    return { layoutHeight, layoutWidth, visibleHeight, visibleWidth, visibleTop, visibleBottom, visibleLeft, visibleRight, overlayKeyboardHeight };
// Original L113: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L114: Blank line separates related statements and has no runtime effect.

// Original L115: Creates mutable baselineViewportHeight state for this workflow; it changes as the user selects, edits, or loads records.
  let baselineViewportHeight = (() => {
// Original L116: Stores metrics, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const metrics = viewportMetrics();
// Original L117: Returns chooses the largest of `metrics.layoutHeight` (the layout height property of metrics), `metrics.visibleHeight` (the visible height property of metrics) to the caller and exits this function.
    return Math.max(metrics.layoutHeight, metrics.visibleHeight);
// Original L118: Completes this application statement, applying the shown value or operation to the current page state/data record.
  })();
// Original L119: Blank line separates related statements and has no runtime effect.

// Original L120: Defines the private helper revealIfNeeded for this page; keeping it local prevents unrelated pages from depending on UI details.
  function revealIfNeeded(target = focusedControl) {
// Original L121: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!isFocusableElement(target) || doc.activeElement !== target) return;
// Original L122: Stores metrics, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const metrics = viewportMetrics();
// Original L123: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!Number.isFinite(metrics.visibleTop) || !Number.isFinite(metrics.visibleBottom) || metrics.visibleBottom <= metrics.visibleTop) return;
// Original L124: Stores rect, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const rect = target.getBoundingClientRect();
// Original L125: Stores outsideVerticalArea, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const outsideVerticalArea = rect.top < metrics.visibleTop || rect.bottom > metrics.visibleBottom;
// Original L126: Stores hasHorizontalViewport, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const hasHorizontalViewport = metrics.visibleRight > metrics.visibleLeft &&
// Original L127: Completes this application statement, applying the shown value or operation to the current page state/data record.
      Number.isFinite(rect.left) && Number.isFinite(rect.right);
// Original L128: Stores outsideHorizontalArea, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const outsideHorizontalArea = hasHorizontalViewport &&
// Original L129: Completes this application statement, applying the shown value or operation to the current page state/data record.
      (rect.left < metrics.visibleLeft || rect.right > metrics.visibleRight);
// Original L130: Stores outsideVisibleArea, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const outsideVisibleArea = outsideVerticalArea || outsideHorizontalArea;
// Original L131: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (outsideVisibleArea) {
// Original L132: Sets the target.scrollIntoView?.({ behavior property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
      target.scrollIntoView?.({ behavior: 'auto', block: 'nearest', inline: 'nearest' });
// Original L133: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L134: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L135: Blank line separates related statements and has no runtime effect.

// Original L136: Defines the private helper syncDialogViewport for this page; keeping it local prevents unrelated pages from depending on UI details.
  function syncDialogViewport(target = focusedControl) {
// Original L137: Stores metrics, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const metrics = viewportMetrics();
// Original L138: Stores keyboardControlFocused, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const keyboardControlFocused = Boolean(target && isKeyboardInput(target) && doc.activeElement === target);
// Original L139: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!keyboardControlFocused) {
// Original L140: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
      baselineViewportHeight = Math.max(metrics.layoutHeight, metrics.visibleHeight);
// Original L141: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L142: Stores resizeThreshold, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const resizeThreshold = Math.max(100, baselineViewportHeight * 0.15);
// Original L143: Stores keyboardIsVisible, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const keyboardIsVisible = keyboardControlFocused && (
// Original L144: Continues the surrounding keyboard.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
      baselineViewportHeight - metrics.visibleHeight > resizeThreshold
// Original L145: Continues the surrounding keyboard.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
      || metrics.overlayKeyboardHeight > resizeThreshold
// Original L146: Closes the surrounding block or callback; no additional operation occurs on this line.
    );
// Original L147: Stores dialog, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const dialog = keyboardIsVisible ? findOpenDialog(target) : null;
// Original L148: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (constrainedDialog && constrainedDialog !== dialog) {
// Original L149: Completes this application statement, applying the shown value or operation to the current page state/data record.
      resetDialogViewport(constrainedDialog);
// Original L150: Completes this application statement, applying the shown value or operation to the current page state/data record.
      constrainedDialog = null;
// Original L151: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L152: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (dialog && metrics.layoutHeight > 0 && metrics.visibleBottom > metrics.visibleTop) {
// Original L153: Completes this application statement, applying the shown value or operation to the current page state/data record.
      constrainDialogToViewport(dialog, metrics.layoutHeight, metrics.visibleTop, metrics.visibleBottom);
// Original L154: Completes this application statement, applying the shown value or operation to the current page state/data record.
      constrainedDialog = dialog;
// Original L155: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L156: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L157: Blank line separates related statements and has no runtime effect.

// Original L158: Defines the private helper scheduleReveal for this page; keeping it local prevents unrelated pages from depending on UI details.
  function scheduleReveal(target = focusedControl) {
// Original L159: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!target) return;
// Original L160: Stores requestFrame, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const requestFrame = view?.requestAnimationFrame?.bind(view) || (callback => setTimeout(callback, 0));
// Original L161: Completes this application statement, applying the shown value or operation to the current page state/data record.
    requestFrame(() => revealIfNeeded(target));
// Original L162: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L163: Blank line separates related statements and has no runtime effect.

// Original L164: Defines the private helper handleViewportChange for this page; keeping it local prevents unrelated pages from depending on UI details.
  function handleViewportChange() {
// Original L165: Completes this application statement, applying the shown value or operation to the current page state/data record.
    syncDialogViewport();
// Original L166: Completes this application statement, applying the shown value or operation to the current page state/data record.
    scheduleReveal();
// Original L167: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L168: Blank line separates related statements and has no runtime effect.

// Original L169: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  doc.addEventListener('focusin', event => {
// Original L170: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!isFocusableElement(event.target)) return;
// Original L171: Completes this application statement, applying the shown value or operation to the current page state/data record.
    focusedControl = event.target;
// Original L172: Completes this application statement, applying the shown value or operation to the current page state/data record.
    syncDialogViewport(focusedControl);
// Original L173: Completes this application statement, applying the shown value or operation to the current page state/data record.
    scheduleReveal(focusedControl);
// Original L174: This comment documents the design intent here: The keyboard and its viewport resize can arrive after the initial focus event..
    // The keyboard and its viewport resize can arrive after the initial focus event.
// Original L175: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (isKeyboardInput(focusedControl)) {
// Original L176: Stores setDelay, value; later code reuses this result so the keyboard.mjs workflow stays consistent.
      const setDelay = view?.setTimeout?.bind(view) || setTimeout;
// Original L177: Iterates through each matching record so the page can aggregate or render every item.
      for (const delay of [150, 350, 700]) {
// Original L178: Completes this application statement, applying the shown value or operation to the current page state/data record.
        setDelay(() => scheduleReveal(focusedControl), delay);
// Original L179: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L180: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L181: Completes this application statement, applying the shown value or operation to the current page state/data record.
  }, true);
// Original L182: Blank line separates related statements and has no runtime effect.

// Original L183: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  doc.addEventListener('focusout', () => {
// Original L184: Stores requestFrame, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the keyboard.mjs workflow stays consistent.
    const requestFrame = view?.requestAnimationFrame?.bind(view) || (callback => setTimeout(callback, 0));
// Original L185: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    requestFrame(() => {
// Original L186: Sets the focusedControl = isFocusableElement(doc.activeElement) ? doc.activeElement property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
      focusedControl = isFocusableElement(doc.activeElement) ? doc.activeElement : null;
// Original L187: Completes this application statement, applying the shown value or operation to the current page state/data record.
      syncDialogViewport(focusedControl);
// Original L188: Completes this application statement, applying the shown value or operation to the current page state/data record.
    });
// Original L189: Completes this application statement, applying the shown value or operation to the current page state/data record.
  }, true);
// Original L190: Blank line separates related statements and has no runtime effect.

// Original L191: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  view?.addEventListener('resize', handleViewportChange);
// Original L192: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  view?.visualViewport?.addEventListener('resize', handleViewportChange);
// Original L193: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  view?.visualViewport?.addEventListener('scroll', handleViewportChange);
// Original L194: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  view?.navigator?.virtualKeyboard?.addEventListener?.('geometrychange', handleViewportChange);
// Original L195: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L196: Blank line separates related statements and has no runtime effect.

// Original L197: This comment documents the design intent here: This module is also loaded directly by every page in the workspace iframe..
// This module is also loaded directly by every page in the workspace iframe.
// Original L198: Completes this application statement, applying the shown value or operation to the current page state/data record.
enableAutoScrollOnFocus();

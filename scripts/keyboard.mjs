const registeredDocuments = new WeakSet();
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

export function enableAutoScrollOnFocus(doc = globalThis.document) {
  if (!doc || typeof doc.addEventListener !== 'function' || registeredDocuments.has(doc)) return;
  registeredDocuments.add(doc);

  const view = doc.defaultView;
  let focusedControl = null;

  function revealIfNeeded(target = focusedControl) {
    if (!target || !isKeyboardInput(target) || !target.isConnected || doc.activeElement !== target) return;

    const viewport = view?.visualViewport;
    const viewportTop = viewport?.offsetTop || 0;
    const viewportHeight = viewport?.height || view?.innerHeight || doc.documentElement?.clientHeight;
    if (!Number.isFinite(viewportHeight) || viewportHeight <= 0) return;

    const rect = target.getBoundingClientRect();
    const margin = Math.min(24, Math.max(12, rect.height / 3));
    const viewportBottom = viewportTop + viewportHeight;
    const outsideVisibleArea = rect.top < viewportTop + margin || rect.bottom > viewportBottom - margin;

    if (outsideVisibleArea) {
      target.scrollIntoView?.({ behavior: 'auto', block: 'center', inline: 'nearest' });
    }
  }

  function scheduleReveal(target = focusedControl) {
    if (!target) return;
    const requestFrame = view?.requestAnimationFrame?.bind(view) || (callback => setTimeout(callback, 0));
    requestFrame(() => revealIfNeeded(target));
  }

  doc.addEventListener('focusin', event => {
    if (!isKeyboardInput(event.target)) return;

    focusedControl = event.target;
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
    });
  }, true);

  view?.addEventListener('resize', () => scheduleReveal());
  view?.visualViewport?.addEventListener('resize', () => scheduleReveal());
}

// This module is also loaded directly by every page in the workspace iframe.
enableAutoScrollOnFocus();

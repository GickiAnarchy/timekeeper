const ADMIN_ONLY_SELECTOR = '[data-admin-only]';

export function watchAdminOnlyControls(root, initialIsAdmin = false) {
  if (!root?.querySelectorAll) throw new TypeError('An admin-control root is required.');

  let isAdmin = Boolean(initialIsAdmin);
  const originalDisabledStates = new Map();

  function synchronize() {
    const controls = new Set(root.querySelectorAll(ADMIN_ONLY_SELECTOR));

    for (const [control, originalDisabled] of originalDisabledStates) {
      if (controls.has(control)) continue;
      control.disabled = originalDisabled;
      originalDisabledStates.delete(control);
    }

    for (const control of controls) {
      if (!('disabled' in control)) continue;
      if (!originalDisabledStates.has(control)) {
        originalDisabledStates.set(control, Boolean(control.disabled));
      }
      control.disabled = !isAdmin || originalDisabledStates.get(control);
    }
  }

  const mutationObserverConstructor = root.defaultView?.MutationObserver || globalThis.MutationObserver;
  const target = root.documentElement || root;
  const observer = mutationObserverConstructor && target
    ? new mutationObserverConstructor(synchronize)
    : null;

  synchronize();
  observer?.observe(target, {
    attributes: true,
    attributeFilter: ['data-admin-only'],
    childList: true,
    subtree: true
  });

  return {
    setAdmin(nextIsAdmin) {
      isAdmin = Boolean(nextIsAdmin);
      synchronize();
    },
    disconnect() {
      observer?.disconnect();
      for (const [control, originalDisabled] of originalDisabledStates) {
        control.disabled = originalDisabled;
      }
      originalDisabledStates.clear();
    }
  };
}

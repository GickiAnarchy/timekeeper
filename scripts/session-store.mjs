const APP_DATA_STORE_KEY = '__timekeeperAppDataStore';

// A same-origin iframe can reuse the shell's store even though navigation
// replaces the iframe document and its module scope. Standalone pages still
// keep their own store, and cross-origin contexts never share a store.
export function getSessionStore(createStore, currentWindow = globalThis.window) {
  if (typeof createStore !== 'function') {
    throw new TypeError('A store factory is required.');
  }

  if (!currentWindow) return createStore();

  let storeHost = currentWindow;
  try {
    const parentWindow = currentWindow.parent;
    if (parentWindow && parentWindow !== currentWindow
      && parentWindow.location.origin === currentWindow.location.origin) {
      storeHost = parentWindow;
    }
  } catch (error) {
    // A cross-origin parent is not a shared session host; use this page instead.
  }

  try {
    if (!storeHost[APP_DATA_STORE_KEY]) {
      Object.defineProperty(storeHost, APP_DATA_STORE_KEY, {
        configurable: true,
        value: createStore(),
        writable: true
      });
    }
    return storeHost[APP_DATA_STORE_KEY];
  } catch (error) {
    // If a host window prevents attaching the shared object, fail safely with a
    // page-local store rather than breaking direct or embedded page use.
    return createStore();
  }
}

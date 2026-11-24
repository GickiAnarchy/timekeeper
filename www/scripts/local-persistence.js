export const LOCAL_STATE_KEY = 'timekeeper-rework-local-v1';

export function createEmptyState() {
  return { employees: [], customers: [], shifts: [], ledgerEntries: [] };
}

function isStateShape(value) {
  return value && typeof value === 'object' &&
    ['employees', 'customers', 'shifts', 'ledgerEntries'].every(key => Array.isArray(value[key]));
}

// This adapter intentionally uses only this browser's localStorage; it does not sync devices.
export class LocalStoragePersistence {
  constructor(storage = globalThis.localStorage, key = LOCAL_STATE_KEY) {
    if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') {
      throw new Error('Browser local storage is unavailable. Open this app in a browser with storage enabled.');
    }
    this.storage = storage;
    this.key = key;
  }

  load() {
    const saved = this.storage.getItem(this.key);
    if (saved === null) return createEmptyState();

    let state;
    try {
      state = JSON.parse(saved);
    } catch {
      throw new Error('Saved local Timekeeper data could not be read; it was left unchanged.');
    }
    if (!isStateShape(state)) {
      throw new Error('Saved local Timekeeper data has an unexpected format; it was left unchanged.');
    }
    return state;
  }

  save(state) {
    if (!isStateShape(state)) throw new TypeError('Cannot save malformed Timekeeper data.');
    // localStorage.setItem replaces one complete JSON snapshot or throws without partial writes.
    this.storage.setItem(this.key, JSON.stringify(state));
  }
}

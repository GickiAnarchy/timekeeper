import { createEmptyState } from './state.js';

const STATE_KEY = 'timekeeper-native-state-v1';

function isStateShape(value) {
  return value && typeof value === 'object' &&
    ['employees', 'customers', 'shifts', 'ledgerEntries'].every(key => Array.isArray(value[key]));
}

/** Stores the complete domain snapshot in one transactional SQLite row. */
export class SQLitePersistence {
  constructor(database) {
    if (!database || typeof database.getFirstSync !== 'function' || typeof database.runSync !== 'function') {
      throw new TypeError('SQLitePersistence requires an Expo SQLite database connection.');
    }
    this.database = database;
    this.database.execSync(
      'CREATE TABLE IF NOT EXISTS timekeeper_state (state_key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);'
    );
  }

  load() {
    const row = this.database.getFirstSync(
      'SELECT value FROM timekeeper_state WHERE state_key = ?',
      STATE_KEY,
    );
    if (!row) return createEmptyState();

    let state;
    try {
      state = JSON.parse(row.value);
    } catch {
      throw new Error('Saved Timekeeper data could not be read; it was left unchanged.');
    }
    if (!isStateShape(state)) {
      throw new Error('Saved Timekeeper data has an unexpected format; it was left unchanged.');
    }
    return state;
  }

  save(state) {
    if (!isStateShape(state)) throw new TypeError('Cannot save malformed Timekeeper data.');
    const json = JSON.stringify(state);
    const write = () => this.database.runSync(
      'INSERT INTO timekeeper_state (state_key, value) VALUES (?, ?) ' +
        'ON CONFLICT(state_key) DO UPDATE SET value = excluded.value',
      STATE_KEY,
      json,
    );

    // The service only publishes its draft after this transaction succeeds.
    if (typeof this.database.withTransactionSync === 'function') {
      this.database.withTransactionSync(write);
    } else {
      write();
    }
  }
}

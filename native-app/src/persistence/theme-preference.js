import { DEFAULT_THEME_ID, isThemeId } from '../theme/themes.js';

const THEME_KEY = 'timekeeper-theme-v1';

/** Stores the selected palette in its own SQLite row, separate from timekeeping records. */
export class ThemePreference {
  constructor(database) {
    if (!database || typeof database.getFirstSync !== 'function' || typeof database.runSync !== 'function') {
      throw new TypeError('ThemePreference requires an Expo SQLite database connection.');
    }
    this.database = database;
    this.database.execSync(
      'CREATE TABLE IF NOT EXISTS timekeeper_state (state_key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);'
    );
  }

  load() {
    const row = this.database.getFirstSync(
      'SELECT value FROM timekeeper_state WHERE state_key = ?',
      THEME_KEY,
    );
    return row && isThemeId(row.value) ? row.value : DEFAULT_THEME_ID;
  }

  save(themeId) {
    if (!isThemeId(themeId)) throw new RangeError(`Unknown Timekeeper theme: ${themeId}`);
    this.database.runSync(
      'INSERT INTO timekeeper_state (state_key, value) VALUES (?, ?) ' +
        'ON CONFLICT(state_key) DO UPDATE SET value = excluded.value',
      THEME_KEY,
      themeId,
    );
    return themeId;
  }
}

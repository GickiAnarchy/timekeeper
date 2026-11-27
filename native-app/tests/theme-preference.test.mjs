import assert from 'node:assert/strict';
import test from 'node:test';
import { DEFAULT_THEME_ID, THEMES } from '../src/theme/themes.js';
import { ThemePreference } from '../src/persistence/theme-preference.js';

class FakeSQLiteDatabase {
  constructor() {
    this.rows = new Map();
  }
  execSync() {}
  getFirstSync(_sql, key) {
    const value = this.rows.get(key);
    return value === undefined ? null : { value };
  }
  runSync(_sql, key, value) {
    this.rows.set(key, value);
  }
}

test('theme catalog offers dark-first palettes and a light option with complete color tokens', () => {
  assert.equal(THEMES[0].id, DEFAULT_THEME_ID);
  assert.equal(THEMES[0].mode, 'dark');
  assert.ok(THEMES.some(theme => theme.mode === 'light'));
  for (const theme of THEMES) {
    for (const token of ['background', 'header', 'surface', 'raised', 'border', 'text', 'muted', 'accent', 'accentText', 'accentSoft', 'hero', 'danger', 'dangerSurface', 'warning', 'warningSurface', 'input', 'ripple']) {
      assert.equal(typeof theme.colors[token], 'string', `${theme.id} is missing ${token}`);
    }
  }
});

test('theme selection persists across preference instances without changing the work-data row', () => {
  const database = new FakeSQLiteDatabase();
  const originalWorkData = JSON.stringify({ employees: [{ id: 'e1' }], customers: [], shifts: [], ledgerEntries: [] });
  database.rows.set('timekeeper-native-state-v1', originalWorkData);

  const firstPreference = new ThemePreference(database);
  assert.equal(firstPreference.load(), DEFAULT_THEME_ID);
  firstPreference.save('ocean');

  const reloadedPreference = new ThemePreference(database);
  assert.equal(reloadedPreference.load(), 'ocean');
  assert.equal(database.rows.get('timekeeper-native-state-v1'), originalWorkData);
  assert.equal(database.rows.get('timekeeper-theme-v1'), 'ocean');
});

test('missing or invalid saved theme IDs fall back to dark default and unknown selections are rejected', () => {
  const database = new FakeSQLiteDatabase();
  const preference = new ThemePreference(database);
  assert.equal(preference.load(), DEFAULT_THEME_ID);
  database.rows.set('timekeeper-theme-v1', 'not-a-theme');
  assert.equal(preference.load(), DEFAULT_THEME_ID);
  assert.throws(() => preference.save('not-a-theme'), /Unknown Timekeeper theme/);
});

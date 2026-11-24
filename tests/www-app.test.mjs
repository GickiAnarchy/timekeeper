import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../www/index.html', import.meta.url), 'utf8');
const app = await readFile(new URL('../www/scripts/index.js', import.meta.url), 'utf8');

test('www shell loads its module app and clearly labels browser-local persistence', () => {
  assert.match(html, /<script\s+type="module"\s+src="\.\/scripts\/index\.js"/);
  assert.match(html, /Saved on this browser only/);
  assert.match(html, /does not sync across devices/);
  assert.match(app, /new LocalStoragePersistence\(\)/);
  assert.match(app, /new ShiftService\(/);
});

test('www app exposes the core setup, clock, history, and payroll UI containers', () => {
  for (const id of ['employee-form', 'customer-form', 'clock-in-form', 'active-shifts', 'shift-history', 'payroll-ledger']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(app, /service\.startShift\(/);
  assert.match(app, /service\.stopShift\(/);
});

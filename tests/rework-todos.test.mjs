import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { Ledger, LedgerEntry } from '../www/scripts/models/ledger.js';

function makeEntry(id, note) {
  return new LedgerEntry({
    id,
    date: '2026-11-23',
    entryType: 'general',
    amount: 25,
    note,
  });
}

test('Ledger.addEntry accepts a valid ledger entry', () => {
  const ledger = new Ledger();
  const entry = makeEntry('entry-1', 'Job payment');

  assert.equal(ledger.addEntry(entry), true);
  assert.equal(ledger.entries.length, 1);
  assert.equal(ledger.entries[0].note, 'Job payment');
});

test('Ledger.addEntry rejects duplicate IDs without replacing the original', () => {
  const ledger = new Ledger();
  ledger.addEntry(makeEntry('entry-1', 'Original'));

  assert.equal(ledger.addEntry(makeEntry('entry-1', 'Duplicate')), false);
  assert.equal(ledger.entries.length, 1);
  assert.equal(ledger.entries[0].note, 'Original');
});

test('Ledger.addEntry rejects another row linked to the same source shift', () => {
  const ledger = new Ledger();
  ledger.addEntry(new LedgerEntry({ ...makeEntry('entry-1', 'Original'), sourceShiftId: 'shift-1' }));
  assert.equal(ledger.addEntry(new LedgerEntry({ ...makeEntry('entry-2', 'Retry'), sourceShiftId: 'shift-1' })), false);
  assert.equal(ledger.entries.length, 1);
});

test('Ledger.addEntry rejects non-entry values', () => {
  const ledger = new Ledger();

  assert.equal(ledger.addEntry({ id: 'entry-1', amount: 25 }), false);
  assert.equal(ledger.entries.length, 0);
});

test('maintenance note uses a full-height layout and centered bottom row', async () => {
  const css = await readFile(new URL('../www/styles/drunk.css', import.meta.url), 'utf8');

  assert.match(css, /min-height:\s*100dvh/);
  assert.match(css, /grid-template-rows:\s*minmax\(0,\s*1fr\)\s+auto/);
  assert.match(css, /body\s*>\s*p\s*\{[^}]*text-align:\s*center/s);
  assert.match(css, /\.small-print\s*\{[^}]*position:\s*static/s);
  assert.doesNotMatch(css, /TODO\s*:\s*Figure out how to move/);
});

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

// Load the legacy branch model in a small isolated context without changing its script format.
const ledgerSource = await readFile(new URL('../www/scripts/models/ledger.js', import.meta.url), 'utf8');
const modelContext = {
  crypto: { randomUUID: () => 'generated-ledger-entry-id' },
  console,
  Date,
};
runInNewContext(`${ledgerSource}\nglobalThis.LedgerForTest = Ledger; globalThis.LedgerEntryForTest = LedgerEntry;`, modelContext);

const Ledger = modelContext.LedgerForTest;
const LedgerEntry = modelContext.LedgerEntryForTest;

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

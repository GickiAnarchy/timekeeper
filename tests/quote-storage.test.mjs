import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { DAILY_QUOTES, normalizeDailyQuotes } from '../scripts/daily-quotes.mjs';

const modelSource = readFileSync(new URL('../scripts/models.js', import.meta.url), 'utf8');
const helperStart = modelSource.indexOf('const DAILY_QUOTES_DOCUMENT =');
const helperEnd = modelSource.indexOf('\nexport { roundTo15Minutes', helperStart);
assert.ok(helperStart >= 0 && helperEnd > helperStart, 'quote helper block must be present');
const helperSource = modelSource.slice(helperStart, helperEnd).replace(/^export /gm, '');

function createStorage(snapshot = { exists: () => false }) {
  const reads = [];
  const writes = [];
  const database = {};
  const context = vm.createContext({
    DAILY_QUOTES,
    normalizeDailyQuotes,
    db: database,
    doc: (db, ...parts) => ({ db, path: parts.join('/') }),
    getDoc: async reference => {
      reads.push(reference);
      return snapshot;
    },
    setDoc: async (reference, data) => {
      writes.push({ reference, data });
    }
  });
  vm.runInContext(`${helperSource}\nglobalThis.api = { loadDailyQuotes, saveDailyQuotes };`, context);
  return { ...context.api, reads, writes, database };
}

const sampleQuote = {
  id: ' saved-id ',
  text: ' A saved thought. ',
  author: ' Someone ',
  work: ' Notes ',
  source: ' https://example.com/notes '
};

test('loading missing dailyQuotes returns the built-in list without creating any Firestore data', async () => {
  const storage = createStorage();
  assert.deepEqual(await storage.loadDailyQuotes(), normalizeDailyQuotes(DAILY_QUOTES));
  assert.equal(storage.reads.length, 1);
  assert.equal(storage.reads[0].path, 'appSettings/dailyQuotes');
  assert.equal(storage.reads[0].db, storage.database);
  assert.equal(storage.writes.length, 0);
});

test('loading saved dailyQuotes normalizes only the settings list and performs no write', async () => {
  const storage = createStorage({ exists: () => true, data: () => ({ quotes: [sampleQuote] }) });
  assert.deepEqual(await storage.loadDailyQuotes(), normalizeDailyQuotes([sampleQuote]));
  assert.equal(storage.reads[0].path, 'appSettings/dailyQuotes');
  assert.equal(storage.writes.length, 0);
});

test('invalid saved settings fail safely without writing a replacement list', async () => {
  const storage = createStorage({ exists: () => true, data: () => ({ quotes: [] }) });
  await assert.rejects(storage.loadDailyQuotes(), /At least one daily quote/);
  assert.equal(storage.writes.length, 0);
});

test('saving quotes writes only appSettings/dailyQuotes and returns the validated list', async () => {
  const storage = createStorage();
  const normalized = normalizeDailyQuotes([sampleQuote]);
  assert.deepEqual(await storage.saveDailyQuotes([sampleQuote]), normalized);
  assert.equal(storage.writes.length, 1);
  assert.equal(storage.writes[0].reference.path, 'appSettings/dailyQuotes');
  assert.equal(storage.writes[0].reference.db, storage.database);
  assert.deepEqual(Object.keys(storage.writes[0].data), ['quotes']);
  assert.deepEqual(storage.writes[0].data.quotes, normalized);
  assert.equal(storage.reads.length, 0);
});

test('invalid or empty quote changes are rejected before any Firestore write', async () => {
  const storage = createStorage();
  await assert.rejects(storage.saveDailyQuotes([]), /At least one daily quote/);
  await assert.rejects(storage.saveDailyQuotes([{ ...sampleQuote, source: 'http://example.com' }]), /must use HTTPS/);
  assert.equal(storage.writes.length, 0);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSessionStore } from '../scripts/session-store.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readProjectFile = (...parts) => readFileSync(join(projectRoot, ...parts), 'utf8');
const modelSource = readProjectFile('scripts', 'models.js');

function extractMethod(startMarker, endMarker, methodName) {
  const start = modelSource.indexOf(startMarker);
  const end = modelSource.indexOf(endMarker, start);
  assert.ok(start >= 0 && end > start, `${methodName} should exist on AppDataStore`);
  return new Function(`return ({ ${modelSource.slice(start, end).trim()} }).${methodName};`)();
}

const init = extractMethod('  async init(', '\n\n  // Backup pages', 'init');
const ensureInitialized = extractMethod('  async ensureInitialized()', '  // LEDGER --', 'ensureInitialized');

function makeWindow(parent, origin = 'https://timekeeper.example') {
  return { parent, location: { origin } };
}

test('the first iframe boot creates one shell-owned store and later page boots reuse it', async () => {
  const shell = makeWindow(null);
  shell.parent = shell;
  let factoryCalls = 0;
  const loadCalls = [];
  let initCalls = 0;
  const store = {
    initPromise: null,
    loadFailures: [],
    records: new Map(),
    async loadPageData(options) {
      loadCalls.push(options);
      if (options.employees) this.records.set('employees', ['fresh employee read']);
      if (options.customers) this.records.set('customers', ['fresh customer read']);
    }
  };
  store.init = function (...args) {
    initCalls += 1;
    return init.apply(this, args);
  };
  store.ensureInitialized = ensureInitialized;

  const firstPage = makeWindow(shell);
  const firstStore = getSessionStore(() => {
    factoryCalls += 1;
    return store;
  }, firstPage);
  await firstStore.ensureInitialized();
  await firstStore.loadPageData({ employees: true });

  // A route change replaces the iframe window/document, but keeps the shell.
  const secondPage = makeWindow(shell);
  const secondStore = getSessionStore(() => {
    factoryCalls += 1;
    return { unexpected: true };
  }, secondPage);
  await secondStore.ensureInitialized();
  await secondStore.loadPageData({ customers: true });

  assert.equal(firstStore, secondStore, 'both page documents should use the same AppDataStore');
  assert.equal(factoryCalls, 1, 'the store factory should run only on the first page boot');
  assert.equal(initCalls, 1, 'the full init method should run only once for the app session');
  assert.equal(loadCalls.length, 3, 'first full init plus each page’s scoped fresh read should run');
  assert.deepEqual(loadCalls[0], {
    employees: true, customers: true, shifts: true, payments: true, invoices: true,
    ledger: true, ledgerArchives: true, planned: true, settleLedgerArchives: true
  });
  assert.deepEqual(loadCalls.slice(1), [{ employees: true }, { customers: true }]);
  assert.deepEqual(secondStore.records.get('employees'), ['fresh employee read']);
  assert.deepEqual(secondStore.records.get('customers'), ['fresh customer read']);

  // A write performed through one view remains visible from the next view.
  firstStore.records.set('written-record', { value: 'saved in the shared store' });
  assert.equal(secondStore, firstStore);
  assert.deepEqual(secondStore.records.get('written-record'), { value: 'saved in the shared store' });
});

test('a failed full initialization can retry, and explicit restore refresh can force a reload', async () => {
  let attempts = 0;
  const store = {
    initPromise: null,
    loadFailures: [],
    async loadPageData() {
      attempts += 1;
      this.loadFailures = attempts === 1 ? [new Error('temporary read failure')] : [];
    }
  };

  await init.call(store);
  assert.equal(store.initPromise, null, 'a failed init must not be cached as complete');
  await init.call(store);
  assert.ok(store.initPromise, 'a successful init should be cached');
  await init.call(store, { force: true });
  assert.equal(attempts, 3, 'an explicit force refresh should run the full loader again');
});

test('standalone and cross-origin pages do not share another window’s store', () => {
  const standalone = makeWindow(null);
  standalone.parent = standalone;
  const standaloneStore = getSessionStore(() => ({}), standalone);
  assert.equal(getSessionStore(() => ({ unexpected: true }), standalone), standaloneStore);

  const outsideParent = makeWindow(null, 'https://other.example');
  outsideParent.parent = outsideParent;
  const embedded = makeWindow(outsideParent);
  const embeddedStore = getSessionStore(() => ({ ownedBy: 'embedded page' }), embedded);
  assert.equal(embeddedStore.ownedBy, 'embedded page');
  assert.equal(outsideParent.__timekeeperAppDataStore, undefined);
});

test('the first iframe page registers the shared store, and Settings uses the full initializer', () => {
  const markup = readProjectFile('index.html');
  const settings = readProjectFile('scripts', 'settings.js');
  const models = readProjectFile('scripts', 'models.js');

  assert.match(markup, /<iframe[^>]+name="main-content"[^>]+src="html\/home\.html"/);
  assert.match(models, /getSessionStore\(\(\) => new AppDataStore\(\)\)/);
  assert.match(settings, /await store\.ensureInitialized\(\)/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readProjectFile = (...parts) => readFileSync(join(projectRoot, ...parts), 'utf8');
const modelSource = readProjectFile('scripts', 'models.js');

// Extract the real class method so its coordination behavior can be tested without importing browser-only Firebase URLs.
const methodStart = modelSource.indexOf('  async loadPageData(');
const methodEnd = modelSource.indexOf('\n\n  async init()', methodStart);
assert.ok(methodStart >= 0 && methodEnd > methodStart, 'AppDataStore.loadPageData should exist');
const loadPageData = new Function(`return ({ ${modelSource.slice(methodStart, methodEnd).trim()} }).loadPageData;`)();

function makeStore({ failedLoad = null } = {}) {
  const calls = [];
  const store = {
    loadFailures: [new Error('stale failure')],
    pendingLedgerSettlements: new Set(['stale employee']),
    recentlyArchivedLedgerIds: ['stale archive'],
    calls,
    async loadEmployees() { calls.push('employees'); },
    async loadCustomers() { calls.push('customers'); },
    async loadShifts() { calls.push('shifts'); },
    async loadPayments() { calls.push('payments'); },
    async loadInvoices() { calls.push('invoices'); },
    async loadLedger() {
      calls.push('ledger');
      if (failedLoad === 'ledger') this.loadFailures.push(new Error('ledger read failed'));
    },
    async loadLedgerArchives() { calls.push('ledgerArchives'); },
    async loadPlanned() { calls.push('planned'); },
    async resumePendingLedgerArchives() { calls.push('resumeArchives'); },
    async archiveAlreadySettledLedgers() { calls.push('scanSettledLedgers'); }
  };
  store.loadPageData = loadPageData;
  return store;
}

test('page loader parallelizes independent reads before dependent hydration and archive recovery', async () => {
  const store = makeStore();
  await store.loadPageData({
    customers: true,
    shifts: true,
    payments: true,
    invoices: true,
    ledger: true,
    ledgerArchives: true,
    planned: true,
    settleLedgerArchives: true
  });

  assert.deepEqual(store.calls, [
    'employees', 'customers', 'payments', 'ledger', 'ledgerArchives',
    'shifts', 'invoices', 'planned', 'resumeArchives', 'scanSettledLedgers'
  ]);
  assert.deepEqual(store.loadFailures, []);
  assert.deepEqual([...store.pendingLedgerSettlements], []);
  assert.deepEqual(store.recentlyArchivedLedgerIds, []);
});

test('read-only page loads fetch only requested records and never run ledger archive side effects', async () => {
  const store = makeStore();
  await store.loadPageData({ employees: true, customers: true });

  assert.deepEqual(store.calls, ['employees', 'customers']);
  assert.deepEqual(store.loadFailures, []);
  assert.deepEqual([...store.pendingLedgerSettlements], []);
  assert.deepEqual(store.recentlyArchivedLedgerIds, []);
});

test('a failed required collection read prevents ledger archive recovery', async () => {
  const store = makeStore({ failedLoad: 'ledger' });
  await store.loadPageData({ employees: true, ledger: true, settleLedgerArchives: true });

  assert.ok(store.loadFailures.some(error => error.message === 'ledger read failed'));
  assert.ok(!store.calls.includes('resumeArchives'));
  assert.ok(!store.calls.includes('scanSettledLedgers'));
});

test('page startup uses narrowly scoped fresh loads while backup retains the full initializer', () => {
  const expectedLoads = new Map([
    ['data.js', /loadPageData\(\{ employees: true, customers: true \}\)/],
    ['clock.js', /loadPageData\(\{ employees: true, customers: true, shifts: true, planned: true \}\)/],
    ['shifts.js', /loadPageData\(\{ employees: true, customers: true, shifts: true, planned: true \}\)/],
    ['planned.js', /loadPageData\(\{ customers: true, planned: true \}\)/],
    ['invoice.js', /loadPageData\(\{ employees: true, customers: true, shifts: true, invoices: true \}\)/],
    ['admin.js', /loadPageData\(\{ employees: true, customers: true, shifts: true, invoices: true \}\)/],
    ['home.js', /loadPageData\(\{ employees: true, customers: true, shifts: true, ledger: true, planned: true \}\)/],
    ['pay-period-review.js', /loadPageData\([\s\S]*?ledgerArchives: true[\s\S]*?\}\)/]
  ]);

  for (const [file, expected] of expectedLoads) {
    const source = readProjectFile('scripts', file);
    assert.match(source, expected, `${file} should declare its required collections`);
    assert.doesNotMatch(source, /store\.init\s*\(/, `${file} should not invoke the full-workspace initializer`);
  }

  for (const file of ['ledger.js', 'ledger-archive.js']) {
    const source = readProjectFile('scripts', file);
    assert.match(source, /settleLedgerArchives: true/, `${file} must preserve ledger archive recovery`);
    assert.doesNotMatch(source, /store\.init\s*\(/, `${file} should use the narrowed settlement-aware loader`);
  }
  assert.match(readProjectFile('scripts', 'settings.js'), /await store\.init\(\)/,
    'full backup must retain full-workspace loading');
  assert.doesNotMatch(readProjectFile('calendar', 'cal.js'), /store\.init\s*\(/,
    'Calendar must remain a shift-only read-only page');
});

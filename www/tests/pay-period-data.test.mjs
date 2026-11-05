import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const reviewSource = readFileSync(new URL('../scripts/pay-period-review.js', import.meta.url), 'utf8');
const loaderSection = reviewSource.match(/\/\/ PAY-PERIOD READ-ONLY DATA LOADER\n([\s\S]*?)\n\/\/ END PAY-PERIOD READ-ONLY DATA LOADER/);
assert.ok(loaderSection, 'read-only loader should stay in pay-period-review.js');
const loadPayPeriodReviewData = new Function(`${loaderSection[1].replace('export async function ', 'async function ')}\nreturn loadPayPeriodReviewData;`)();

function fixture() {
  const calls = [];
  const store = {
    employees: new Map([['e1', { id: 'e1', name: 'Test employee' }]]),
    shifts: [{ id: 's1' }], invoices: [], ledger: { entries: [{ id: 'row1' }] }, ledgerArchiveRows: [],
    loadFailures: ['old error'],
    async init() { throw new Error('Mutating initialization must not run'); },
    async archiveAlreadySettledLedgers() { throw new Error('No archive writes allowed'); },
    async resumePendingLedgerArchives() { throw new Error('No archive writes allowed'); }
  };
  for (const method of ['loadEmployees', 'loadCustomers', 'loadShifts', 'loadInvoices', 'loadLedger', 'loadLedgerArchives']) {
    store[method] = async () => { calls.push(method); };
  }
  return { calls, store };
}

test('review loads only the six read methods, with people before linked shifts', async () => {
  const { calls, store } = fixture();
  const snapshot = await loadPayPeriodReviewData(store);
  assert.deepEqual(calls, ['loadEmployees', 'loadCustomers', 'loadShifts', 'loadInvoices', 'loadLedger', 'loadLedgerArchives']);
  assert.deepEqual(snapshot.employees, [{ id: 'e1', name: 'Test employee' }]);
  assert.equal(snapshot.shifts, store.shifts);
  assert.equal(snapshot.ledgerEntries, store.ledger.entries);
  assert.deepEqual(store.loadFailures, []);
});

test('a swallowed loader failure prevents a partial review snapshot', async () => {
  const { store } = fixture();
  store.loadLedger = async () => { store.loadFailures.push(new Error('offline')); };
  await assert.rejects(loadPayPeriodReviewData(store), /No totals are shown/);
});

test('a thrown loader failure propagates without initialization or archiving', async () => {
  const { store, calls } = fixture();
  store.loadCustomers = async () => { throw new Error('offline'); };
  await assert.rejects(loadPayPeriodReviewData(store), /offline/);
  assert.deepEqual(calls, ['loadEmployees']);
});

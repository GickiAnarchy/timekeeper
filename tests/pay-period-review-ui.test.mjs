import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { buildPayPeriodReview, currentWeekRange } from '../scripts/pay-period-review.mjs';
import { loadPayPeriodReviewData } from '../scripts/pay-period-data.mjs';

class Node {
  constructor(tag = 'div', text = '') {
    this.tagName = tag; this.textContent = text; this.children = []; this.listeners = new Map();
    this.hidden = false; this.disabled = false; this.value = ''; this.className = '';
  }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children = nodes; }
  add(node) { this.append(node); }
  get options() { return this.children; }
  get selectedOptions() { return this.children.filter(node => node.value === this.value); }
  addEventListener(type, callback) { this.listeners.set(type, [...(this.listeners.get(type) || []), callback]); }
  async dispatch(type) { for (const callback of this.listeners.get(type) || []) await callback({ preventDefault() {} }); }
}

async function boot({ fail = false } = {}) {
  const ids = [...readFileSync(new URL('../html/pay-period-review.html', import.meta.url), 'utf8').matchAll(/id="([^"]+)"/g)].map(match => match[1]);
  const nodes = new Map(ids.map(id => [id, new Node()]));
  const document = new Node('document');
  document.getElementById = id => nodes.get(id);
  document.createElement = tag => new Node(tag);
  const now = new Date();
  const shiftStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8);
  const shiftEnd = new Date(shiftStart); shiftEnd.setHours(12);
  const employee = { id: 'e1', name: '<script>Employee</script>', wage: 20 };
  const customer = { id: 'c1', name: 'Test site', billingRate: 50 };
  const sourceShift = { id: 's1', employee, customer, clockInTime: shiftStart, clockOutTime: shiftEnd, breaks: [], paidHours: 0, isPaid: false };
  const calls = [];
  const store = {
    employees: new Map([[employee.id, employee]]), shifts: [sourceShift], invoices: [],
    ledger: { entries: [{ id: 'r1', employeeId: 'e1', type: 'normal', amount: 100, date: '2020-01-01', sourceShiftId: 's1' }] },
    ledgerArchiveRows: [], ledgerArchives: [], loadFailures: [],
    init() { throw new Error('Must not initialize or archive'); },
    saveShift() { throw new Error('Must not write'); }
  };
  for (const method of ['loadEmployees', 'loadCustomers', 'loadShifts', 'loadInvoices', 'loadLedger', 'loadLedgerArchives']) {
    store[method] = async () => { calls.push(method); };
  }
  if (fail) store.loadLedger = async () => { store.loadFailures.push(new Error('offline')); };
  const code = readFileSync(new URL('../scripts/pay-period-review.js', import.meta.url), 'utf8').replace(/^import .*;\n/gm, '');
  vm.runInNewContext(code, {
    document, store, buildPayPeriodReview, currentWeekRange, loadPayPeriodReviewData, Intl, Date, console,
    Option: function(text, value) { const option = new Node('option', text); option.value = value; return option; }
  });
  await document.dispatch('DOMContentLoaded');
  return { nodes, store, calls, sourceShift };
}

const allText = node => [node.textContent, ...node.children.map(allText)].join(' ');

test('review renders synthetic shifts, honors zero pay hours, and loads without init or writes', async () => {
  const { nodes, calls, sourceShift } = await boot();
  assert.equal(nodes.get('review-results').hidden, false);
  assert.equal(calls.length, 6);
  assert.match(allText(nodes.get('review-metrics')), /4.00 h/);
  assert.match(allText(nodes.get('review-metrics')), /0.00 h/);
  assert.match(allText(nodes.get('review-metrics')), /\$200.00/);
  assert.match(allText(nodes.get('review-people')), /\$100.00/);
  assert.match(allText(nodes.get('review-shifts')), /Active ledger/);
  assert.match(allText(nodes.get('review-shifts')), /<script>Employee<\/script>/);
  assert.equal(sourceShift.paidHours, 0);
  assert.equal(sourceShift.isPaid, false);
});

test('changing filters hides stale totals; invalid range displays an error instead of a result', async () => {
  const { nodes } = await boot();
  nodes.get('review-start').value = '2026-11-02';
  nodes.get('review-end').value = '2026-11-01';
  await nodes.get('review-start').dispatch('change');
  assert.equal(nodes.get('review-results').hidden, true);
  await nodes.get('review-filters').dispatch('submit');
  assert.equal(nodes.get('review-error').hidden, false);
  assert.equal(nodes.get('review-results').hidden, true);
});

test('load failure never presents partial balances or shift totals', async () => {
  const { nodes } = await boot({ fail: true });
  assert.equal(nodes.get('review-results').hidden, true);
  assert.equal(nodes.get('review-error').hidden, false);
  assert.match(nodes.get('review-error').textContent, /No totals are shown/);
  assert.equal(nodes.get('review-apply').disabled, true);
  assert.equal(nodes.get('review-refresh').disabled, false);
});

test('failed refresh hides the previous successful snapshot and offers retry', async () => {
  const { nodes, store } = await boot();
  store.loadLedger = async () => { throw new Error('connection lost'); };
  await nodes.get('review-refresh').dispatch('click');
  assert.equal(nodes.get('review-results').hidden, true);
  assert.match(nodes.get('review-error').textContent, /connection lost/);
  assert.equal(nodes.get('review-refresh').disabled, false);
});

test('date shortcut refreshes local results without making new data requests', async () => {
  const { nodes, calls } = await boot();
  await nodes.get('review-last-week').dispatch('click');
  assert.equal(calls.length, 6);
  assert.equal(nodes.get('review-results').hidden, false);
  assert.match(allText(nodes.get('review-shifts')), /No completed shifts/);
  assert.match(allText(nodes.get('review-people')), /\$100.00/);
});

test('pending archives warn without attempting to finish archiving', async () => {
  const { nodes, store, calls } = await boot();
  store.ledgerArchives = [{ employeeId: 'e1', status: 'pending' }];
  await nodes.get('review-filters').dispatch('submit');
  assert.match(nodes.get('review-warnings').textContent, /pending/);
  assert.equal(nodes.get('review-warnings').hidden, false);
  assert.equal(calls.length, 6);
});

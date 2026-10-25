import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { promptForCompletedPlannedJobs } from '../scripts/planned-job-confirmation.mjs';

class FakeElement {
  constructor(tag = 'div', ownerDocument = null) {
    this.tagName = tag.toUpperCase();
    this.ownerDocument = ownerDocument;
    this.children = [];
    this.parentElement = null;
    this.listeners = new Map();
    this.attributes = new Map();
    this.dataset = {};
    this.style = { setProperty() {}, removeProperty() {} };
    this.className = '';
    this.textContent = '';
    this.value = '';
    this.checked = false;
    this.disabled = false;
    this.hidden = false;
    this.open = false;
  }
  get classList() {
    return {
      contains: name => this.className.split(/\s+/).includes(name),
      add: (...names) => { this.className = [...new Set(`${this.className} ${names.join(' ')}`.trim().split(/\s+/))].join(' '); },
      remove: (...names) => { this.className = this.className.split(/\s+/).filter(name => !names.includes(name)).join(' '); }
    };
  }
  get options() { return this.children; }
  append(...nodes) { nodes.flat().forEach(node => { if (node) { node.parentElement = this; this.children.push(node); } }); }
  appendChild(node) { this.append(node); return node; }
  replaceChildren(...nodes) { this.children = []; this.append(...nodes); }
  addEventListener(type, callback) { (this.listeners.get(type) || (this.listeners.set(type, []), this.listeners.get(type))).push(callback); }
  async dispatchEvent(event) {
    event.target ||= this;
    const results = (this.listeners.get(event.type) || []).map(callback => callback(event));
    await Promise.all(results);
    if (this.parentElement && !event.cancelBubble) await this.parentElement.dispatchEvent(event);
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  insertAdjacentHTML() {}
  showModal() { this.open = true; }
  close() { this.open = false; void this.dispatchEvent({ type: 'close', target: this }); }
  focus() { if (this.ownerDocument) this.ownerDocument.activeElement = this; }
  contains(node) { return node === this || this.children.some(child => child.contains?.(node)); }
  querySelectorAll(selector) {
    const matches = [];
    const match = node => selector.startsWith('.')
      ? node.classList.contains(selector.slice(1))
      : selector.startsWith('#') ? node.attributes.get('id') === selector.slice(1) : false;
    const visit = node => { node.children.forEach(child => { if (match(child)) matches.push(child); visit(child); }); };
    visit(this);
    return matches;
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  closest(selector) {
    let node = this;
    while (node) {
      if (selector === 'button[data-id]' && node.tagName === 'BUTTON' && node.dataset.id) return node;
      if (selector === '.remove-break-button' && node.classList.contains('remove-break-button')) return node;
      node = node.parentElement;
    }
    return null;
  }
}

class FakeDocument extends FakeElement {
  constructor() { super('#document', null); this.ownerDocument = this; this.byId = new Map(); this.documentElement = { clientHeight: 800 }; this.activeElement = null; }
  createElement(tag) { return new FakeElement(tag, this); }
  getElementById(id) { return this.byId.get(id) || null; }
  register(id, tag = 'div') { const element = this.createElement(tag); element.setAttribute('id', id); this.byId.set(id, element); return element; }
}

function makeFixture() {
  const document = new FakeDocument();
  for (const [id, tag] of [
    ['shiftList', 'ul'], ['emp-filter', 'select'], ['cust-filter', 'select'], ['paid-filter', 'input'],
    ['add-button', 'button'], ['viewShiftModal', 'dialog'], ['shift-emp', 'select'], ['shift-cust', 'select'],
    ['shift-start', 'input'], ['shift-end', 'input'], ['total-hours', 'input'], ['paid-hours', 'input'],
    ['note-view', 'textarea'], ['paid-checkbox-view', 'input'], ['breaks-list', 'ul'], ['shift-form-error', 'p'],
    ['ok-btn', 'button'], ['cancel-btn', 'button'], ['add-break-button', 'button'], ['shift-modal-title', 'h2'],
    ['shift-duplicate-hint', 'p']
  ]) document.register(id, tag);
  const sourceEmployee = { id: 'source', name: 'Source', wage: 20 };
  const targetEmployee = { id: 'target', name: 'Target', wage: 30 };
  const customer = { id: 'customer', name: 'Customer' };
  const source = {
    id: 'source-shift', employee: sourceEmployee, customer, note: 'Keep note', isPaid: true, paidHours: 0,
    breaks: [], clockInTime: new Date('2026-10-09T09:00:00Z'), clockOutTime: new Date('2026-10-09T12:00:00Z'),
    isComplete: true, getHoursWorked: () => 3, getPaidHours: () => 0,
    duplicateFor(employee) {
      return { id: 'duplicate-shift', employee, customer, note: this.note, isPaid: false, paidHours: this.paidHours,
        breaks: [], clockInTime: new Date(this.clockInTime), clockOutTime: new Date(this.clockOutTime),
        isComplete: true, getHoursWorked: () => 3, getPaidHours: () => 0 };
    }
  };
  const writes = { save: [], update: [] };
  const store = {
    employees: new Map([[sourceEmployee.id, sourceEmployee], [targetEmployee.id, targetEmployee]]),
    customers: new Map([[customer.id, customer]]),
    shifts: [source],
    plannedJobs: [],
    async init() {},
    async saveShift(shift) { writes.save.push(shift); },
    async updateShift(...args) { writes.update.push(args); },
    async markShiftPlannedJobsPrompted(shiftId) {
      const shift = this.shifts.find(candidate => candidate.id === shiftId);
      shift.plannedJobsPrompted = true;
    },
    async setPlannedComplete(jobId, isComplete) {
      const job = this.plannedJobs.find(candidate => candidate.id === jobId);
      job.isComplete = isComplete;
    }
  };
  const populate = select => {
    for (const employee of store.employees.values()) { const option = document.createElement('option'); option.value = employee.id; select.appendChild(option); }
  };
  const populateCustomers = select => { const option = document.createElement('option'); option.value = customer.id; select.appendChild(option); };
  const window = { document, innerHeight: 800, visualViewport: null, addEventListener() {}, alert: message => { window.alerts.push(message); }, confirm: message => { window.confirmations.push(message); return true; }, alerts: [], confirmations: [] };
  return { document, window, store, source, targetEmployee, writes };
}

async function boot(fixture) {
  const source = readFileSync(new URL('../scripts/shifts.js', import.meta.url), 'utf8');
  const script = source.split('\n').slice(8).join('\n');
  vm.runInNewContext(script, {
    console,
    Date,
    document: fixture.document,
    window: fixture.window,
    store: fixture.store,
    populateEmployeeDropdowns: fixture.populate,
    populateCustomerDropdowns: select => {
      const option = fixture.document.createElement('option');
      option.value = 'customer';
      select.appendChild(option);
    },
    WorkShift: class {},
    promptForCompletedPlannedJobs,
    resetShiftDialogViewport() {},
    syncShiftDialogViewport() {},
    setTimeout
  });
  await fixture.document.dispatchEvent({ type: 'DOMContentLoaded' });
}

async function click(element) { await element.dispatchEvent({ type: 'click', target: element }); }

test('duplicate UI requires a target, cancel does not write, and saves one unpaid copy', async () => {
  const fixture = makeFixture();
  fixture.populate = select => { for (const employee of fixture.store.employees.values()) { const option = fixture.document.createElement('option'); option.value = employee.id; select.appendChild(option); } };
  await boot(fixture);
  const list = fixture.document.getElementById('shiftList');
  assert.equal(list.children.length, 1);
  assert.equal(list.querySelector('.duplicate-btn').className, 'duplicate-btn');
  assert.equal(list.querySelector('.duplicate-btn').dataset.id, 'source-shift');
  assert.equal(list.listeners.get('click').length, 1);
  await click(list.querySelector('.duplicate-btn'));
  const empSelect = fixture.document.getElementById('shift-emp');
  const modal = fixture.document.getElementById('viewShiftModal');
  assert.equal(modal.open, true);
  assert.equal(empSelect.value, '', 'duplicate dialog must start without a target selection');
  await click(fixture.document.getElementById('ok-btn'));
  assert.match(fixture.document.getElementById('shift-form-error').textContent, /Choose an employee/);
  assert.equal(fixture.writes.save.length, 0);
  await click(fixture.document.getElementById('cancel-btn'));
  assert.equal(fixture.writes.save.length, 0);
  assert.equal(modal.open, false);

  await click(list.querySelector('.duplicate-btn'));
  empSelect.value = 'target';
  await click(fixture.document.getElementById('ok-btn'));
  assert.equal(fixture.writes.save.length, 1);
  assert.equal(fixture.writes.save[0].employee.id, 'target');
  assert.equal(fixture.writes.save[0].isPaid, false);
  assert.equal(fixture.writes.save[0].id, 'duplicate-shift');
  assert.equal(fixture.writes.update.length, 0);
});

test('failed duplicate save leaves source untouched and never updates it', async () => {
  const fixture = makeFixture();
  fixture.populate = select => { for (const employee of fixture.store.employees.values()) { const option = fixture.document.createElement('option'); option.value = employee.id; select.appendChild(option); } };
  const original = { employee: fixture.source.employee, customer: fixture.source.customer, note: fixture.source.note, isPaid: fixture.source.isPaid, paidHours: fixture.source.paidHours, clockInTime: fixture.source.clockInTime, clockOutTime: fixture.source.clockOutTime };
  fixture.store.saveShift = async () => { throw new Error('offline'); };
  await boot(fixture);
  const list = fixture.document.getElementById('shiftList');
  await click(list.querySelector('.duplicate-btn'));
  fixture.document.getElementById('shift-emp').value = 'target';
  await click(fixture.document.getElementById('ok-btn'));
  assert.equal(fixture.writes.update.length, 0);
  assert.deepEqual({ employee: fixture.source.employee, customer: fixture.source.customer, note: fixture.source.note, isPaid: fixture.source.isPaid, paidHours: fixture.source.paidHours, clockInTime: fixture.source.clockInTime, clockOutTime: fixture.source.clockOutTime }, original);
  assert.match(fixture.document.getElementById('shift-form-error').textContent, /offline/);
});

test('a newly completed shift prompts for matching due jobs once and marks confirmed jobs complete', async () => {
  const fixture = makeFixture();
  fixture.populate = select => { for (const employee of fixture.store.employees.values()) { const option = fixture.document.createElement('option'); option.value = employee.id; select.appendChild(option); } };
  fixture.store.plannedJobs.push({
    id: 'job-1', description: 'Trim the hedge', customer: { id: 'customer', name: 'Customer' },
    scheduledDate: new Date('2026-10-10T12:00:00'), isComplete: false
  }, {
    id: 'job-2', description: 'Clean the driveway', customer: { id: 'customer', name: 'Customer' },
    scheduledDate: new Date('2026-10-11T12:00:00'), isComplete: false
  });
  const answers = [true, false];
  fixture.window.confirm = message => {
    fixture.window.confirmations.push(message);
    return answers.shift();
  };
  await boot(fixture);
  const list = fixture.document.getElementById('shiftList');
  await click(list.querySelector('.duplicate-btn'));
  fixture.document.getElementById('shift-emp').value = 'target';
  await click(fixture.document.getElementById('ok-btn'));

  assert.equal(fixture.window.confirmations.length, 2);
  assert.match(fixture.window.confirmations[0], /Trim the hedge/);
  assert.match(fixture.window.confirmations[0], /1 of 2/);
  assert.match(fixture.window.confirmations[1], /2 of 2/);
  assert.match(fixture.window.confirmations[1], /Clean the driveway/);
  assert.equal(fixture.store.plannedJobs[0].isComplete, true);
  assert.equal(fixture.store.plannedJobs[1].isComplete, false, 'a declined candidate must not be completed automatically');
  const duplicate = fixture.store.shifts.find(shift => shift.id === 'duplicate-shift');
  assert.equal(duplicate.plannedJobsPrompted, true);

  const duplicateCard = [...list.children].find(card => card.querySelector('.view-btn')?.dataset.id === 'duplicate-shift');
  await click(duplicateCard.querySelector('.view-btn'));
  await click(fixture.document.getElementById('ok-btn'));
  assert.equal(fixture.window.confirmations.length, 2, 'editing an already-completed shift must not prompt again');
});

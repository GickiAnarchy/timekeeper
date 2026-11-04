import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

class FakeElement {
  constructor(tag = 'div') {
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.parentElement = null;
    this.className = '';
    this.dataset = {};
    this.attributes = new Map();
    this.listeners = new Map();
    this.textContent = '';
    this.value = '';
    this.disabled = false;
    this.selectedOptions = [];
  }

  get classList() {
    return {
      contains: name => this.className.split(/\s+/).includes(name),
      add: (...names) => { this.className = [...new Set(`${this.className} ${names.join(' ')}`.trim().split(/\s+/))].join(' '); },
      remove: (...names) => { this.className = this.className.split(/\s+/).filter(name => !names.includes(name)).join(' '); }
    };
  }

  append(...nodes) {
    nodes.flat().forEach(node => {
      if (!node) return;
      node.parentElement = this;
      this.children.push(node);
    });
  }
  appendChild(node) { this.append(node); return node; }
  replaceChildren(...nodes) {
    this.children.forEach(child => { child.parentElement = null; });
    this.children = [];
    this.append(...nodes);
  }
  addEventListener(type, callback) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(callback);
  }
  async dispatchEvent(event) {
    event.target ||= this;
    const callbacks = this.listeners.get(event.type) || [];
    await Promise.all(callbacks.map(callback => callback(event)));
    if (this.parentElement && !event.cancelBubble) await this.parentElement.dispatchEvent(event);
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) {
    if (name === 'data-id') return this.dataset.id ?? null;
    return this.attributes.get(name) ?? null;
  }
  querySelectorAll(selector) {
    const matches = [];
    const className = selector.startsWith('.') ? selector.slice(1) : null;
    const visit = node => {
      for (const child of node.children) {
        if (className && child.classList.contains(className)) matches.push(child);
        visit(child);
      }
    };
    visit(this);
    return matches;
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
}

class FakeDocument extends FakeElement {
  constructor() {
    super('#document');
    this.byId = new Map();
  }
  createElement(tag) { return new FakeElement(tag); }
  getElementById(id) { return this.byId.get(id) || null; }
  register(id, tag = 'div') {
    const element = this.createElement(tag);
    element.setAttribute('id', id);
    this.byId.set(id, element);
    return element;
  }
}

function makeShiftClass(getRoundedTime) {
  let nextId = 0;
  return class FakeWorkShift {
    constructor(employee, customer) {
      this.id = `synthetic-shift-${++nextId}`;
      this.employee = employee;
      this.customer = customer;
      this.clockInTime = null;
      this.clockOutTime = null;
      this.breaks = [];
    }
    startShift(time) { this.clockInTime = new Date(time); }
    stopShift() {
      if (this.isOnBreak) this.stopBreak();
      this.clockOutTime = getRoundedTime();
    }
    startBreak() { this.breaks.push({ start: getRoundedTime(), end: null }); }
    stopBreak() {
      const active = this.breaks.find(item => item.start && !item.end);
      if (!active) return;
      const end = getRoundedTime();
      if (active.start.getTime() === end.getTime()) this.breaks = this.breaks.filter(item => item !== active);
      else active.end = end;
    }
    get isOnBreak() { return this.breaks.some(item => item.start && !item.end); }
    get isComplete() { return Boolean(this.clockInTime && this.clockOutTime); }
  };
}

function makeFixture() {
  const document = new FakeDocument();
  const employeeSelect = document.register('emp-select', 'select');
  const customerSelect = document.register('cust-select', 'select');
  const clockInButton = document.register('clock-in-button', 'button');
  const activeShiftsList = document.register('activeShiftsList', 'ul');
  const shiftError = document.register('shift-error', 'p');
  const employees = new Map([
    ['employee-1', { id: 'employee-1', name: 'Alice' }],
    ['employee-2', { id: 'employee-2', name: 'Bob' }]
  ]);
  const customer = { id: 'customer-1', name: 'Oak Street' };
  const writes = { batches: [], individual: [] };
  const store = {
    employees,
    customers: new Map([[customer.id, customer]]),
    shifts: [],
    async init() {},
    async saveShifts(shifts) { writes.batches.push([...shifts]); },
    async saveShift(shift) { writes.individual.push(shift.id); }
  };
  let currentTime = '2026-10-09T09:00:00.000Z';
  const roundedNow = () => new Date(currentTime);
  const WorkShift = makeShiftClass(roundedNow);
  const window = { setInterval() { return 1; } };

  return {
    document, employeeSelect, customerSelect, clockInButton, activeShiftsList, shiftError,
    store, writes, window, WorkShift, setCurrentTime(value) { currentTime = value; }, roundedNow
  };
}

async function boot(fixture) {
  const source = readFileSync(new URL('../scripts/clock.js', import.meta.url), 'utf8');
  const script = source.replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];\s*/gm, '');
  let onReady;
  fixture.document.addEventListener = (type, callback) => {
    if (type === 'DOMContentLoaded') onReady = callback;
  };
  vm.runInNewContext(script, {
    console,
    Date,
    document: fixture.document,
    window: fixture.window,
    store: fixture.store,
    WorkShift: fixture.WorkShift,
    roundTo15Minutes: fixture.roundedNow,
    populateEmployeeDropdowns() {},
    populateCustomerDropdowns() {},
    confirm: () => true
  });
  await onReady();
}

async function click(element) {
  await element.dispatchEvent({ type: 'click', target: element });
}

test('clock flow batches multiple employees, prevents duplicate active shifts, records breaks, and clocks out', async () => {
  const fixture = makeFixture();
  fixture.employeeSelect.selectedOptions = [{ value: 'employee-1' }, { value: 'employee-2' }];
  fixture.customerSelect.value = 'customer-1';
  await boot(fixture);

  await click(fixture.clockInButton);
  assert.equal(fixture.writes.batches.length, 1);
  assert.equal(fixture.writes.batches[0].length, 2);
  assert.equal(fixture.store.shifts.length, 2);
  assert.ok(fixture.store.shifts.every(shift => shift.clockInTime.toISOString() === '2026-10-09T09:00:00.000Z'));

  fixture.employeeSelect.selectedOptions = [{ value: 'employee-1' }];
  await click(fixture.clockInButton);
  assert.match(fixture.shiftError.textContent, /Alice is already clocked in/);
  assert.equal(fixture.writes.batches.length, 1, 'a duplicate active shift must not be saved');

  fixture.setCurrentTime('2026-10-09T09:30:00.000Z');
  await click(fixture.activeShiftsList.querySelector('.start-break-btn'));
  const alice = fixture.store.shifts.find(shift => shift.employee.id === 'employee-1');
  assert.equal(alice.isOnBreak, true);
  assert.equal(alice.breaks[0].start.toISOString(), '2026-10-09T09:30:00.000Z');

  fixture.setCurrentTime('2026-10-09T09:45:00.000Z');
  await click(fixture.activeShiftsList.querySelector('.stop-break-btn'));
  assert.equal(alice.isOnBreak, false);
  assert.equal(alice.breaks[0].end.toISOString(), '2026-10-09T09:45:00.000Z');

  fixture.setCurrentTime('2026-10-09T10:00:00.000Z');
  while (fixture.store.shifts.some(shift => !shift.isComplete)) {
    await click(fixture.activeShiftsList.querySelector('.stop-btn'));
  }
  assert.ok(fixture.store.shifts.every(shift => shift.clockOutTime.toISOString() === '2026-10-09T10:00:00.000Z'));
  assert.equal(fixture.writes.individual.length, 4, 'two break changes and two clock-outs should be saved');
  assert.deepEqual(fixture.activeShiftsList.children.map(item => item.textContent), ['No active shifts right now.']);
});

import assert from 'node:assert/strict';
import test from 'node:test';
import { LocalStoragePersistence, LOCAL_STATE_KEY } from '../www/scripts/local-persistence.js';
import { ShiftService } from '../www/scripts/services/shift-service.js';

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

class MemoryPersistence {
  constructor(state = null) { this.state = state; }
  load() { return this.state ? clone(this.state) : { employees: [], customers: [], shifts: [], ledgerEntries: [] }; }
  save(state) { this.state = clone(state); }
}

function setup({ now = '2026-11-24T09:07:00Z' } = {}) {
  const persistence = new MemoryPersistence();
  let nextId = 0;
  const service = new ShiftService({
    persistence,
    now: () => new Date(now),
    idFactory: () => `id-${++nextId}`,
  });
  const employee = service.addEmployee('Alex', 20);
  const customer = service.addCustomer('Maple Street', 60);
  return { service, persistence, employee, customer };
}

test('starting a shift rounds clock-in forward and prevents a second active shift per employee', () => {
  const { service, employee, customer } = setup();
  const shift = service.startShift({ employeeId: employee.id, customerId: customer.id });
  assert.equal(shift.startTime, '2026-11-24T09:15:00.000Z');
  assert.equal(service.getActiveShiftForEmployee(employee.id).id, shift.id);
  assert.throws(() => service.startShift({ employeeId: employee.id, customerId: customer.id }), /already has an active shift/);

  const secondEmployee = service.addEmployee('Riley', 25);
  assert.doesNotThrow(() => service.startShift({ employeeId: secondEmployee.id, customerId: customer.id }));
});

test('clock-out applies quarter-hour breaks and posts payroll using Employee.wage, not Customer.hourlyRate', () => {
  const { service, employee, customer } = setup();
  const shift = service.startShift({ employeeId: employee.id, customerId: customer.id });
  const completed = service.stopShift(employee.id, {
    endedAt: new Date('2026-11-24T11:08:00Z'),
    breakDurationMinutes: 15,
  });
  assert.equal(completed.shift.endTime, '2026-11-24T11:00:00.000Z');
  assert.equal(completed.shift.paidHours, 1.5);
  assert.equal(completed.ledgerEntry.employeeId, employee.id);
  assert.equal(completed.ledgerEntry.hours, 1.5);
  assert.equal(completed.ledgerEntry.amount, 30);
  assert.equal(completed.ledgerEntry.sourceShiftId, shift.id);
  assert.equal(completed.ledgerEntry.entryType, 'general');
  assert.equal(service.getLedgerEntries(employee.id).length, 1);
  assert.equal(service.getActiveShiftForEmployee(employee.id), null);
});

test('posting a completed shift repeatedly is idempotent by sourceShiftId, including after reloading', () => {
  const { service, persistence, employee, customer } = setup();
  const shift = service.startShift({ employeeId: employee.id, customerId: customer.id });
  service.stopShift(employee.id, { endedAt: new Date('2026-11-24T11:00:00Z') });
  const first = service.postShiftToLedger(shift.id);
  const second = service.postShiftToLedger(shift.id);
  const reloaded = new ShiftService({ persistence, now: () => new Date('2026-11-24T11:05:00Z'), idFactory: () => 'new-id' });
  const afterReload = reloaded.postShiftToLedger(shift.id);
  assert.equal(first.id, second.id);
  assert.equal(first.id, afterReload.id);
  assert.equal(reloaded.getLedgerEntries(employee.id).filter(entry => entry.sourceShiftId === shift.id).length, 1);
});

test('active shifts and directory records survive a local persistence reload', () => {
  const { service, persistence, employee, customer } = setup();
  const shift = service.startShift({ employeeId: employee.id, customerId: customer.id });
  const reloaded = new ShiftService({ persistence, now: () => new Date('2026-11-24T10:00:00Z'), idFactory: () => 'reload-id' });
  assert.equal(reloaded.getEmployee(employee.id).wage, 20);
  assert.equal(reloaded.getCustomer(customer.id).hourlyRate, 60);
  assert.equal(reloaded.getActiveShiftForEmployee(employee.id).id, shift.id);
  assert.throws(() => reloaded.startShift({ employeeId: employee.id, customerId: customer.id }), /already has an active shift/);
});

test('a failed persistence save leaves the last in-memory state intact', () => {
  const persistence = new MemoryPersistence();
  let id = 0;
  const service = new ShiftService({ persistence, now: () => new Date('2026-11-24T09:00:00Z'), idFactory: () => `id-${++id}` });
  const employee = service.addEmployee('Alex', 20);
  const customer = service.addCustomer('Maple Street', 60);
  const before = service.getSnapshot();
  persistence.save = () => { throw new Error('storage full'); };
  assert.throws(() => service.startShift({ employeeId: employee.id, customerId: customer.id }), /storage full/);
  assert.deepEqual(service.getSnapshot(), before);
});

test('localStorage adapter round-trips state and refuses corrupt data without replacing it', () => {
  const map = new Map();
  const storage = {
    getItem: key => map.has(key) ? map.get(key) : null,
    setItem: (key, value) => map.set(key, value),
  };
  const adapter = new LocalStoragePersistence(storage);
  const initial = adapter.load();
  assert.deepEqual(initial, { employees: [], customers: [], shifts: [], ledgerEntries: [] });
  initial.employees.push({ id: 'employee-1', name: 'Alex', wage: 20 });
  adapter.save(initial);
  assert.deepEqual(adapter.load(), initial);
  assert.equal(LOCAL_STATE_KEY, 'timekeeper-rework-local-v1');

  map.set(LOCAL_STATE_KEY, '{broken');
  assert.throws(() => adapter.load(), /could not be read/);
  assert.equal(map.get(LOCAL_STATE_KEY), '{broken');
});

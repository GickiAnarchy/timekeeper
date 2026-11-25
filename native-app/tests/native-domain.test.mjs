import assert from 'node:assert/strict';
import test from 'node:test';
import { ShiftService } from '../src/services/shift-service.js';
import { SQLitePersistence } from '../src/persistence/sqlite-persistence.js';

class FakeSQLiteDatabase {
  constructor() {
    this.value = null;
    this.failWrites = false;
  }
  execSync() {}
  getFirstSync(_sql, key) {
    return key === 'timekeeper-native-state-v1' && this.value !== null ? { value: this.value } : null;
  }
  runSync(_sql, key, value) {
    if (this.failWrites) throw new Error('disk unavailable');
    if (key !== 'timekeeper-native-state-v1') throw new Error('unexpected state key');
    this.value = value;
  }
  withTransactionSync(task) {
    const original = this.value;
    try {
      task();
    } catch (error) {
      this.value = original;
      throw error;
    }
  }
}

function setup(now = '2026-11-24T09:07:00Z') {
  const database = new FakeSQLiteDatabase();
  const persistence = new SQLitePersistence(database);
  let nextId = 0;
  const idFactory = () => `native-id-${++nextId}`;
  const makeService = () => new ShiftService({ persistence, idFactory, now: () => new Date(now) });
  const service = makeService();
  const employee = service.addEmployee('Alex', 20);
  const customer = service.addCustomer('Maple Street', 60, { loc: 'North side', note: 'Back gate' });
  return { database, persistence, makeService, service, employee, customer };
}

test('native SQLite adapter starts empty and round-trips the complete domain snapshot', () => {
  const database = new FakeSQLiteDatabase();
  const persistence = new SQLitePersistence(database);
  assert.deepEqual(persistence.load(), { employees: [], customers: [], shifts: [], ledgerEntries: [] });
  const state = persistence.load();
  state.employees.push({ id: 'employee-1', name: 'Alex', wage: 20 });
  persistence.save(state);
  assert.deepEqual(persistence.load(), state);
});

test('clock-in/out preserve quarter-hour rounding, breaks, and wage-only payroll', () => {
  const { service, employee, customer } = setup();
  const shift = service.startShift({ employeeId: employee.id, customerId: customer.id });
  assert.equal(shift.startTime, '2026-11-24T09:15:00.000Z');
  assert.throws(() => service.startShift({ employeeId: employee.id, customerId: customer.id }), /already has an active shift/);

  const completed = service.stopShift(employee.id, {
    endedAt: '2026-11-24T11:08:00Z',
    breakDurationMinutes: 15,
  });
  assert.equal(completed.shift.endTime, '2026-11-24T11:00:00.000Z');
  assert.equal(completed.shift.paidHours, 1.5);
  assert.equal(completed.ledgerEntry.hours, 1.5);
  assert.equal(completed.ledgerEntry.amount, 30);
  assert.equal(completed.ledgerEntry.sourceShiftId, shift.id);
  assert.equal(completed.ledgerEntry.note, 'Shift payroll · Maple Street');
  assert.equal(completed.shift.customerId, customer.id);
  assert.notEqual(completed.ledgerEntry.amount, 90);
});

test('completed shift and active shift survive reload, while payroll posting stays idempotent', () => {
  const { service, makeService, employee, customer } = setup();
  const active = service.startShift({ employeeId: employee.id, customerId: customer.id });
  const reloadedWithActive = makeService();
  assert.equal(reloadedWithActive.getActiveShiftForEmployee(employee.id).id, active.id);
  reloadedWithActive.stopShift(employee.id, { endedAt: '2026-11-24T11:00:00Z' });

  const reloadedCompleted = makeService();
  const first = reloadedCompleted.postShiftToLedger(active.id);
  const second = reloadedCompleted.postShiftToLedger(active.id);
  assert.equal(first.id, second.id);
  assert.equal(reloadedCompleted.getLedgerEntries(employee.id).filter(row => row.sourceShiftId === active.id).length, 1);
  assert.equal(reloadedCompleted.getSnapshot().shifts.filter(row => row.endTime).length, 1);
  assert.equal(customer.hourlyRate, 60);
});

test('invalid breaks are rejected and failed SQLite writes do not replace the in-memory snapshot', () => {
  const { database, service, employee, customer } = setup();
  const before = service.getSnapshot();
  database.failWrites = true;
  assert.throws(() => service.startShift({ employeeId: employee.id, customerId: customer.id }), /disk unavailable/);
  assert.deepEqual(service.getSnapshot(), before);
  database.failWrites = false;
  service.startShift({ employeeId: employee.id, customerId: customer.id });
  const withActiveShift = service.getSnapshot();
  database.failWrites = true;
  assert.throws(() => service.stopShift(employee.id, { endedAt: '2026-11-24T10:00:00Z', breakDurationMinutes: 10 }), /multiple of 15 minutes/);
  assert.deepEqual(service.getSnapshot(), withActiveShift);
  assert.throws(() => service.stopShift(employee.id, { endedAt: '2026-11-24T10:00:00Z', breakDurationMinutes: 0 }), /disk unavailable/);
  assert.deepEqual(service.getSnapshot(), withActiveShift);
});

test('malformed stored SQLite data is rejected without overwriting it', () => {
  const database = new FakeSQLiteDatabase();
  const persistence = new SQLitePersistence(database);
  database.value = '{broken';
  assert.throws(() => persistence.load(), /could not be read/);
  assert.equal(database.value, '{broken');
});

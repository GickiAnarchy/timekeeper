import { Customer } from '../models/customer.js';
import { Employee } from '../models/employee.js';
import { Ledger, LedgerEntry } from '../models/ledger.js';
import { Workshift, roundDownToQuarterHour, roundUpToQuarterHour } from '../models/workshift.js';

function copy(value) {
  return JSON.parse(JSON.stringify(value));
}

function requireDate(value, label) {
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value);
  if (!Number.isFinite(date.getTime())) throw new RangeError(`${label} must be a valid date and time.`);
  return date;
}

function requireRate(value, label) {
  const rate = Number(value);
  if (!Number.isFinite(rate) || rate < 0) throw new RangeError(`${label} must be a non-negative number.`);
  return rate;
}

function localDate(value) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function plainLedgerEntry(entry) {
  return {
    id: entry.id,
    employeeId: entry.employeeId,
    date: entry.date,
    entryType: entry.entryType,
    amount: entry.amount,
    note: entry.note,
    hours: entry.hours,
    sourceShiftId: entry.sourceShiftId,
  };
}

export class ShiftService {
  constructor({ persistence, now = () => new Date(), idFactory = () => crypto.randomUUID() }) {
    if (!persistence || typeof persistence.load !== 'function' || typeof persistence.save !== 'function') {
      throw new TypeError('ShiftService requires a persistence adapter with load() and save().');
    }
    this.persistence = persistence;
    this.now = now;
    this.idFactory = idFactory;
    this.state = persistence.load();
  }

  // Commit from a draft so a failed localStorage write does not alter in-memory state.
  commit(change) {
    const draft = copy(this.state);
    const result = change(draft);
    this.persistence.save(draft);
    this.state = draft;
    return result;
  }

  getSnapshot() {
    return copy(this.state);
  }

  getEmployee(employeeId) {
    const record = this.state.employees.find(employee => employee.id === employeeId);
    if (!record) return null;
    const entries = this.state.ledgerEntries
      .filter(entry => entry.employeeId === employeeId)
      .map(entry => new LedgerEntry(entry));
    return new Employee(record.name, record.wage, new Ledger(entries), record.id);
  }

  getCustomer(customerId) {
    const record = this.state.customers.find(customer => customer.id === customerId);
    return record ? new Customer(record.id, record.name, record.loc, record.note, record.hourlyRate) : null;
  }

  getActiveShifts() {
    return copy(this.state.shifts.filter(shift => !shift.endTime));
  }

  getActiveShiftForEmployee(employeeId) {
    const active = this.state.shifts.find(shift => shift.employeeId === employeeId && !shift.endTime);
    return active ? copy(active) : null;
  }

  getLedgerEntries(employeeId = null) {
    const entries = employeeId
      ? this.state.ledgerEntries.filter(entry => entry.employeeId === employeeId)
      : this.state.ledgerEntries;
    return copy(entries).sort((a, b) => `${b.date}${b.id}`.localeCompare(`${a.date}${a.id}`));
  }

  addEmployee(name, wage) {
    const cleanName = String(name ?? '').trim();
    if (!cleanName) throw new Error('Enter an employee name.');
    const cleanWage = requireRate(wage, 'Employee wage');
    const id = this.idFactory();
    if (this.state.employees.some(employee => employee.id === id)) throw new Error('Generated duplicate employee ID.');
    const employee = new Employee(cleanName, cleanWage, new Ledger(), id);
    this.commit(state => state.employees.push({ id: employee.id, name: employee.name, wage: employee.wage }));
    return this.getEmployee(id);
  }

  addCustomer(name, hourlyRate, { loc = '', note = '' } = {}) {
    const cleanName = String(name ?? '').trim();
    if (!cleanName) throw new Error('Enter a customer name.');
    const billingRate = requireRate(hourlyRate, 'Customer billing rate');
    const id = this.idFactory();
    if (this.state.customers.some(customer => customer.id === id)) throw new Error('Generated duplicate customer ID.');
    const customer = new Customer(id, cleanName, loc, note, billingRate);
    this.commit(state => state.customers.push({
      id: customer.id,
      name: customer.name,
      loc: customer.loc,
      note: customer.note,
      hourlyRate: customer.hourlyRate,
    }));
    return this.getCustomer(id);
  }

  startShift({ employeeId, customerId, startedAt = this.now() }) {
    const employee = this.getEmployee(employeeId);
    const customer = this.getCustomer(customerId);
    if (!employee) throw new Error('Choose a saved employee before clocking in.');
    if (!customer) throw new Error('Choose a saved customer before clocking in.');
    if (this.getActiveShiftForEmployee(employeeId)) {
      throw new Error(`${employee.name} already has an active shift. Clock it out before starting another.`);
    }

    const id = this.idFactory();
    if (this.state.shifts.some(shift => shift.id === id)) throw new Error('Generated duplicate shift ID.');
    const shift = {
      id,
      employeeId: employee.id,
      customerId: customer.id,
      startTime: roundUpToQuarterHour(requireDate(startedAt, 'Clock-in time')).toISOString(),
      endTime: null,
      breakDurationMinutes: 0,
    };
    this.commit(state => state.shifts.push(shift));
    return copy(shift);
  }

  stopShift(employeeId, { endedAt = this.now(), breakDurationMinutes = 0 } = {}) {
    const active = this.state.shifts.find(shift => shift.employeeId === employeeId && !shift.endTime);
    if (!active) throw new Error('There is no active shift for this employee.');

    const endTime = roundDownToQuarterHour(requireDate(endedAt, 'Clock-out time'));
    const workshift = new Workshift(
      active.id,
      active.employeeId,
      active.customerId,
      new Date(active.startTime),
      endTime,
      breakDurationMinutes,
    );
    const hours = workshift.getDuration();
    const employee = this.getEmployee(employeeId);
    if (hours === null || !employee || workshift.getTotalPay(employee.wage) === null) {
      throw new Error('Clock-out time and break minutes must leave a valid, non-negative paid duration.');
    }

    return this.commit(state => {
      const index = state.shifts.findIndex(shift => shift.id === active.id);
      const completed = {
        ...state.shifts[index],
        endTime: endTime.toISOString(),
        breakDurationMinutes: workshift.breakDurationMinutes,
        paidHours: hours,
      };
      state.shifts[index] = completed;
      const entry = this.makePayrollEntry(state, completed);
      if (!state.ledgerEntries.some(saved => saved.sourceShiftId === completed.id)) {
        state.ledgerEntries.push(plainLedgerEntry(entry));
      }
      return { shift: copy(completed), ledgerEntry: plainLedgerEntry(entry) };
    });
  }

  // This public retry path is safe after reload: sourceShiftId prevents a second payroll row.
  postShiftToLedger(shiftId) {
    return this.commit(state => {
      const shift = state.shifts.find(record => record.id === shiftId);
      if (!shift || !shift.endTime) throw new Error('Only a completed shift can be posted to payroll.');
      const entry = this.makePayrollEntry(state, shift);
      if (!state.ledgerEntries.some(saved => saved.sourceShiftId === shift.id)) {
        state.ledgerEntries.push(plainLedgerEntry(entry));
      }
      return plainLedgerEntry(entry);
    });
  }

  makePayrollEntry(state, shift) {
    const existing = state.ledgerEntries.find(entry => entry.sourceShiftId === shift.id);
    if (existing) return new LedgerEntry(existing);

    const employeeRecord = state.employees.find(employee => employee.id === shift.employeeId);
    const customer = state.customers.find(record => record.id === shift.customerId);
    if (!employeeRecord || !customer) throw new Error('The shift must reference a saved employee and customer.');
    const employee = new Employee(employeeRecord.name, employeeRecord.wage, new Ledger(
      state.ledgerEntries.filter(entry => entry.employeeId === employeeRecord.id).map(entry => new LedgerEntry(entry)),
    ), employeeRecord.id);
    const workshift = new Workshift(
      shift.id,
      shift.employeeId,
      shift.customerId,
      new Date(shift.startTime),
      new Date(shift.endTime),
      shift.breakDurationMinutes,
    );
    const hours = workshift.getDuration();
    // Apply only the saved employee wage; no overtime or special-rate rules are assumed.
    const rawAmount = workshift.getTotalPay(employee.wage);
    if (hours === null || rawAmount === null) throw new Error('The completed shift has invalid paid hours or employee wage.');

    const entry = new LedgerEntry({
      id: this.idFactory(),
      employeeId: employee.id,
      date: localDate(shift.startTime),
      entryType: 'general',
      amount: Math.round((rawAmount + Number.EPSILON) * 100) / 100,
      note: `Shift payroll · ${customer.name}`,
      hours,
      sourceShiftId: shift.id,
    });
    // Use the same Ledger guard used by employee records before persisting its plain snapshot.
    if (!employee.ledger.addEntry(entry)) throw new Error('This shift already has a payroll ledger entry.');
    return entry;
  }
}

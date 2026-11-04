import { actualShiftHours, roundTo15Minutes } from './domain.mjs';

export { roundTo15Minutes };

// Keep the existing Firebase project and canonical collections; the 2.0 skeleton
// reads and writes only the people and shift data needed for timekeeping.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import {
  collection,
  deleteDoc as firestoreDeleteDoc,
  doc,
  getDocs as firestoreGetDocs,
  getFirestore,
  setDoc as firestoreSetDoc,
  updateDoc as firestoreUpdateDoc,
  writeBatch
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDn_y846YGhK689a3-2S6VvO46uElD1JXw',
  authDomain: 'timekeeper-ad253.firebaseapp.com',
  projectId: 'timekeeper-ad253',
  storageBucket: 'timekeeper-ad253.firebasestorage.app',
  messagingSenderId: '516577372091',
  appId: '1:516577372091:web:3bb56f8017058ffcd9869e'
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function showFirestoreError(message, retryOperation) {
  if (!globalThis.document?.body) return;
  let banner = document.getElementById('firestore-error-banner');
  if (!banner) {
    banner = document.createElement('section');
    banner.id = 'firestore-error-banner';
    banner.setAttribute('role', 'alert');
    banner.setAttribute('aria-live', 'assertive');
    Object.assign(banner.style, {
      position: 'fixed', inset: '12px 12px auto', zIndex: '2147483647',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: '12px', padding: '12px 16px', color: '#521b1b', background: '#fff0ee',
      border: '1px solid #d98b83', borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,.18)',
      font: '600 14px/1.4 system-ui, sans-serif'
    });
    const text = document.createElement('span');
    text.dataset.errorMessage = 'true';
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.textContent = 'Retry';
    Object.assign(retry.style, {
      padding: '8px 13px', color: '#fff', background: '#8f302b', border: '0',
      borderRadius: '7px', font: 'inherit', cursor: 'pointer'
    });
    retry.addEventListener('click', async () => {
      retry.disabled = true;
      retry.textContent = 'Retrying…';
      try {
        for (const operation of retry._retryOperations || []) await operation();
        banner.remove();
        globalThis.location?.reload();
      } catch (error) {
        console.error('Firestore retry failed:', error);
        text.textContent = 'A retry did not succeed. Check your connection, then retry again.';
        retry.disabled = false;
        retry.textContent = 'Retry';
      }
    });
    banner.append(text, retry);
    document.body.appendChild(banner);
  }
  const text = banner.querySelector('[data-error-message]');
  const retry = banner.querySelector('button');
  retry._retryOperations ||= new Set();
  retry._messages ||= new Set();
  retry._retryOperations.add(retryOperation);
  retry._messages.add(message);
  text.textContent = `${[...retry._messages].join(' ')} Press Retry to repeat the failed operations.`;
}

function firestoreRequest(message, operation) {
  return operation().catch(error => {
    console.error(message, error);
    showFirestoreError(message, operation);
    throw error;
  });
}

const setDoc = (...args) => firestoreRequest('Saving data to Firestore failed.', () => firestoreSetDoc(...args));
const getDocs = (...args) => firestoreRequest('Loading data from Firestore failed.', () => firestoreGetDocs(...args));
const updateDoc = (...args) => firestoreRequest('Updating data in Firestore failed.', () => firestoreUpdateDoc(...args));
const deleteDoc = (...args) => firestoreRequest('Deleting data from Firestore failed.', () => firestoreDeleteDoc(...args));
const commitBatch = batch => firestoreRequest('Saving shifts to Firestore failed.', () => batch.commit());

const cleanName = value => String(value ?? '').trim();
const normalize = value => cleanName(value).toLocaleLowerCase();
const asDate = value => {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export function formatTime24(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

export class Employee {
  constructor(id, name, wage = 0) {
    this.id = id || crypto.randomUUID();
    this.name = String(name || '').trim();
    this.wage = Number(wage);
  }

  getPay(hours) {
    return Number((this.wage * hours).toFixed(2));
  }
}

export class Customer {
  constructor(id, name, location = '', note = null, billingRate = null) {
    this.id = id || crypto.randomUUID();
    this.name = String(name || '').trim();
    this.location = String(location || '').trim();
    this.note = note || null;
    const rate = billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate);
    this.billingRate = Number.isFinite(rate) && rate >= 0 ? rate : null;
  }

  customInfo() {
    return this.location ? `${this.name} · ${this.location}` : this.name;
  }
}

export class WorkShift {
  constructor(employee, customer, id = null, note = null, isPaid = false, breaks = [], paidHours = null) {
    this.id = id || crypto.randomUUID();
    this.employee = employee;
    this.customer = customer;
    this.clockInTime = null;
    this.clockOutTime = null;
    this.breaks = Array.isArray(breaks) ? breaks : [];
    this.note = note;
    this.isPaid = Boolean(isPaid);
    // Preserve blank versus zero paid-hours values from existing shift documents.
    this.paidHours = paidHours === null || paidHours === undefined || paidHours === '' ? null : Number(paidHours);
    this.plannedJobsPrompted = false;
  }

  startBreak() {
    this.breaks.push({ start: roundTo15Minutes(), end: null });
  }

  stopBreak() {
    const activeBreak = this.breaks.find(item => item.start && !item.end);
    if (!activeBreak) return;
    const endTime = roundTo15Minutes();
    if (asDate(activeBreak.start)?.getTime() === endTime.getTime()) {
      this.breaks = this.breaks.filter(item => item !== activeBreak);
    } else {
      activeBreak.end = endTime;
    }
  }

  get isOnBreak() {
    return this.breaks.some(item => item.start && !item.end);
  }

  getTotalBreakTimeMs() {
    return this.breaks.reduce((total, item) => {
      const start = asDate(item.start);
      const end = asDate(item.end);
      return start && end ? total + Math.max(0, end - start) : total;
    }, 0);
  }

  startShift(clockInTime = roundTo15Minutes()) {
    this.clockInTime = clockInTime;
    this.clockOutTime = null;
  }

  stopShift() {
    if (!this.clockInTime) return;
    if (this.isOnBreak) this.stopBreak();
    this.clockOutTime = roundTo15Minutes();
  }

  addNote(note) {
    const nextNote = cleanName(note);
    if (nextNote) this.note = this.note ? `${this.note}\n${nextNote}` : nextNote;
  }

  get isComplete() {
    return Boolean(this.clockInTime && this.clockOutTime);
  }

  duplicateFor(employee) {
    if (!employee?.id || employee.id === this.employee?.id) {
      throw new Error('Choose a different employee for the duplicate shift.');
    }
    const start = asDate(this.clockInTime);
    const end = asDate(this.clockOutTime);
    if (!this.isComplete || !(this.clockInTime instanceof Date) || !(this.clockOutTime instanceof Date) || !start || !end || end <= start) {
      throw new Error('Only a completed shift with valid start and end times can be duplicated.');
    }
    const duplicate = new WorkShift(employee, this.customer, null, this.note, false, this.breaks.map(item => ({
      start: asDate(item.start) ? new Date(item.start) : null,
      end: asDate(item.end) ? new Date(item.end) : null
    })), this.paidHours);
    duplicate.clockInTime = new Date(start);
    duplicate.clockOutTime = new Date(end);
    return duplicate;
  }

  getHoursWorked() {
    if (!this.isComplete) return 0;
    return actualShiftHours(this.clockInTime, this.clockOutTime, this.breaks);
  }

  getPaidHours() {
    return Number.isFinite(this.paidHours) ? this.paidHours : this.getHoursWorked();
  }

  getShiftPay() {
    return this.isPaid || !this.employee ? 0 : this.employee.getPay(this.getPaidHours());
  }
}

function serializeShift(shift) {
  return {
    employeeId: shift.employee?.id || null,
    custId: shift.customer?.id || null,
    clockInTime: shift.clockInTime ? new Date(shift.clockInTime).toISOString() : null,
    clockOutTime: shift.clockOutTime ? new Date(shift.clockOutTime).toISOString() : null,
    note: shift.note || null,
    isPaid: Boolean(shift.isPaid),
    breaks: (shift.breaks || []).map(item => ({
      start: item.start ? new Date(item.start).toISOString() : null,
      end: item.end ? new Date(item.end).toISOString() : null
    })),
    paidHours: Number.isFinite(shift.paidHours) ? shift.paidHours : null,
    // Retain this legacy field when editing old shifts; the skeleton no longer
    // loads planned jobs or runs completion prompts.
    plannedJobsPrompted: Boolean(shift.plannedJobsPrompted)
  };
}

export class AppDataStore {
  constructor() {
    this.employees = new Map();
    this.customers = new Map();
    this.shifts = [];
    this.loadFailures = [];
  }

  async init() {
    this.loadFailures = [];
    // Only read records required by shift logging; this avoids unrelated archive
    // processing and never writes production data simply because a page opened.
    await Promise.all([this.loadEmployees(), this.loadCustomers()]);
    await this.loadShifts();
  }

  async loadEmployees() {
    this.employees.clear();
    try {
      const snapshot = await getDocs(collection(db, 'employees'));
      snapshot.forEach(docSnapshot => {
        const data = docSnapshot.data();
        this.employees.set(docSnapshot.id, new Employee(docSnapshot.id, data.name, data.wage));
      });
    } catch (error) {
      console.error('Error loading employees from Firestore:', error);
      this.loadFailures.push(error);
    }
  }

  async addEmployee(name, wage = 0) {
    const employeeName = cleanName(name);
    const employeeWage = Number(wage);
    if (!employeeName) throw new Error('Employee name cannot be empty.');
    if (!Number.isFinite(employeeWage) || employeeWage < 0) throw new Error('Employee wage must be a non-negative number.');
    if ([...this.employees.values()].some(employee => normalize(employee.name) === normalize(employeeName))) return null;

    const employee = new Employee(null, employeeName, employeeWage);
    await setDoc(doc(db, 'employees', employee.id), { name: employee.name, wage: employee.wage });
    this.employees.set(employee.id, employee);
    return employee;
  }

  async deleteEmployee(id) {
    if (!this.employees.has(id)) return false;
    await deleteDoc(doc(db, 'employees', id));
    this.employees.delete(id);
    return true;
  }

  async loadCustomers() {
    this.customers.clear();
    try {
      const snapshot = await getDocs(collection(db, 'customers'));
      snapshot.forEach(docSnapshot => {
        const data = docSnapshot.data();
        this.customers.set(docSnapshot.id, new Customer(
          docSnapshot.id, data.name, data.location, data.note, data.billingRate
        ));
      });
    } catch (error) {
      console.error('Error loading customers from Firestore:', error);
      this.loadFailures.push(error);
    }
  }

  async addCustomer(name, location, note = null, billingRate = null) {
    const customerName = cleanName(name);
    const customerLocation = cleanName(location);
    const rate = billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate);
    if (!customerName) throw new Error('Customer name cannot be empty.');
    if (!customerLocation) throw new Error('Customer location cannot be empty.');
    if (rate !== null && (!Number.isFinite(rate) || rate < 0)) throw new Error('Hourly billing rate must be a non-negative number.');
    if ([...this.customers.values()].some(customer =>
      normalize(customer.name) === normalize(customerName) && normalize(customer.location) === normalize(customerLocation)
    )) return null;

    const customer = new Customer(null, customerName, customerLocation, note, rate);
    await setDoc(doc(db, 'customers', customer.id), {
      name: customer.name,
      location: customer.location,
      note: customer.note,
      billingRate: customer.billingRate
    });
    this.customers.set(customer.id, customer);
    return customer;
  }

  async deleteCustomer(id) {
    if (!this.customers.has(id)) return false;
    await deleteDoc(doc(db, 'customers', id));
    this.customers.delete(id);
    return true;
  }

  async loadShifts() {
    this.shifts = [];
    try {
      const snapshot = await getDocs(collection(db, 'shifts'));
      snapshot.forEach(docSnapshot => {
        const data = docSnapshot.data();
        const employee = this.employees.get(data.employeeId)
          || new Employee(data.employeeId, 'Unknown Employee', 0);
        const customer = this.customers.get(data.custId)
          || new Customer(data.custId, 'Unknown Site');
        const breaks = (data.breaks || []).map(item => ({
          start: item.start ? new Date(item.start) : null,
          end: item.end ? new Date(item.end) : null
        }));
        const shift = new WorkShift(
          employee, customer, docSnapshot.id, data.note || null,
          data.isPaid, breaks, data.paidHours
        );
        shift.clockInTime = data.clockInTime ? new Date(data.clockInTime) : null;
        shift.clockOutTime = data.clockOutTime ? new Date(data.clockOutTime) : null;
        shift.plannedJobsPrompted = data.plannedJobsPrompted === true;
        this.shifts.push(shift);
      });
    } catch (error) {
      console.error('Error loading shifts from Firestore:', error);
      this.loadFailures.push(error);
    }
  }

  async saveShift(shift) {
    await setDoc(doc(db, 'shifts', shift.id), serializeShift(shift));
    return shift;
  }

  async saveShifts(shifts) {
    if (!Array.isArray(shifts) || shifts.length === 0) return;
    if (shifts.length > 500) throw new Error('A single clock-in batch cannot contain more than 500 shifts.');
    const ids = shifts.map(shift => String(shift.id));
    if (new Set(ids).size !== ids.length) throw new Error('A shift appears more than once in this clock-in batch.');
    const batch = writeBatch(db);
    shifts.forEach(shift => batch.set(doc(db, 'shifts', shift.id), serializeShift(shift)));
    await commitBatch(batch);
  }

  async deleteShift(shiftId) {
    await deleteDoc(doc(db, 'shifts', shiftId));
    this.shifts = this.shifts.filter(shift => shift.id !== shiftId);
  }

  async updateShift(shiftId, employee, customer, clockInTime, clockOutTime, note = null, isPaid = false, breaks = null, paidHours = undefined) {
    const shift = this.shifts.find(candidate => candidate.id === shiftId);
    if (!shift) throw new Error('Shift could not be found.');
    if (!employee || !customer) throw new Error('Please select an employee and customer.');

    const start = asDate(clockInTime);
    const end = asDate(clockOutTime);
    if (!start || !end) throw new Error('Please provide valid start and end times.');
    if (end <= start) throw new Error('End time must be after start time.');

    const normalizedBreaks = (Array.isArray(breaks) ? breaks : shift.breaks).map((item, index) => {
      const breakStart = asDate(item.start);
      const breakEnd = asDate(item.end);
      if (!breakStart || !breakEnd) throw new Error(`Break ${index + 1} needs both a valid start and end time.`);
      if (breakEnd <= breakStart) throw new Error(`Break ${index + 1} must end after it starts.`);
      if (breakStart < start || breakEnd > end) throw new Error(`Break ${index + 1} must fall within the shift.`);
      return { start: breakStart, end: breakEnd };
    }).sort((a, b) => a.start - b.start);
    for (let index = 1; index < normalizedBreaks.length; index += 1) {
      if (normalizedBreaks[index].start < normalizedBreaks[index - 1].end) {
        throw new Error('Break times cannot overlap.');
      }
    }

    const nextPaidHours = paidHours === undefined ? shift.paidHours
      : paidHours === null || paidHours === '' ? null : Number(paidHours);
    if (nextPaidHours !== null && (!Number.isFinite(nextPaidHours) || nextPaidHours < 0)) {
      throw new Error('Paid hours must be a valid non-negative number, or left blank to use worked hours.');
    }

    const updates = {
      employeeId: employee.id,
      custId: customer.id,
      clockInTime: start.toISOString(),
      clockOutTime: end.toISOString(),
      note: note ? String(note).trim() : null,
      isPaid: Boolean(isPaid),
      breaks: normalizedBreaks.map(item => ({ start: item.start.toISOString(), end: item.end.toISOString() })),
      paidHours: nextPaidHours,
      plannedJobsPrompted: Boolean(shift.plannedJobsPrompted)
    };
    await updateDoc(doc(db, 'shifts', shiftId), updates);

    Object.assign(shift, {
      employee, customer, clockInTime: start, clockOutTime: end,
      note: updates.note, isPaid: updates.isPaid,
      breaks: normalizedBreaks, paidHours: nextPaidHours
    });
    return shift;
  }

  async howManyActive() {
    return this.shifts.filter(shift => !shift.isComplete).length;
  }
}

export const store = new AppDataStore();

const nameCollator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true });

export function compareByFirstName(a, b) {
  const nameA = cleanName(a?.name);
  const nameB = cleanName(b?.name);
  const firstA = nameA.split(/\s+/)[0] || '';
  const firstB = nameB.split(/\s+/)[0] || '';
  return nameCollator.compare(firstA, firstB) || nameCollator.compare(nameA, nameB);
}

export function populateEmployeeDropdowns(element) {
  if (!element) return;
  element.innerHTML = '<option value="">--Employee--</option>';
  [...store.employees.values()].sort(compareByFirstName).forEach(employee => {
    const option = document.createElement('option');
    option.value = employee.id;
    option.textContent = employee.name;
    element.appendChild(option);
  });
}

export function populateCustomerDropdowns(element) {
  if (!element) return;
  element.innerHTML = '<option value="">--Customer--</option>';
  [...store.customers.values()].sort(compareByFirstName).forEach(customer => {
    const option = document.createElement('option');
    option.value = customer.id;
    option.textContent = customer.customInfo();
    element.appendChild(option);
  });
}

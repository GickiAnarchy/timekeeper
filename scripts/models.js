import {
  actualShiftHours,
  invoiceShiftIds,
  roundDown15Minutes,
  roundTo15Minutes,
  roundUp15Minutes,
  shiftIsAttachedElsewhere
} from './domain.mjs';
import { enableAutoScrollOnFocus } from './keyboard.mjs';

export { enableAutoScrollOnFocus };

/*
  Firebase Setup
*/

// 1. Import Firebase & Firestore Modular SDKs (CDN Links)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  setDoc as firestoreSetDoc,
  getDocs as firestoreGetDocs,
  doc, 
  updateDoc as firestoreUpdateDoc,
  deleteDoc as firestoreDeleteDoc,
  writeBatch
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn_y846YGhK689a3-2S6VvO46uElD1JXw",
  authDomain: "timekeeper-ad253.firebaseapp.com",
  projectId: "timekeeper-ad253",
  storageBucket: "timekeeper-ad253.firebasestorage.app",
  messagingSenderId: "516577372091",
  appId: "1:516577372091:web:3bb56f8017058ffcd9869e"
};

// 3. Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
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
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
      padding: '12px 16px', color: '#521b1b', background: '#fff0ee',
      border: '1px solid #d98b83', borderRadius: '10px',
      boxShadow: '0 8px 24px rgba(0,0,0,.18)', font: '600 14px/1.4 system-ui, sans-serif'
    });
    const text = document.createElement('span');
    text.dataset.errorMessage = 'true';
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.textContent = 'Retry';
    Object.assign(retry.style, {
      padding: '8px 13px', color: '#fff', background: '#8f302b',
      border: '0', borderRadius: '7px', font: 'inherit', cursor: 'pointer'
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
        text.textContent = `A retry did not succeed. Check your connection, then retry the failed Firestore operations again.`;
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
  text.textContent = `${[...retry._messages].join(' ')} Press Retry to repeat the failed operations and reload if they succeed.`;
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
const commitBatch = (batch, message = 'Saving this group of changes to Firestore failed.') =>
  firestoreRequest(message, () => batch.commit());


/*
  HELPER FUNCTIONS
*/

function changeHeader(text = '') {
  const header = document.querySelector('header h1') || document.querySelector('header');
  if (header && text) {
    header.dataset.originalText = header.dataset.originalText || header.textContent;
  }
}

export { roundTo15Minutes, roundDown15Minutes, roundUp15Minutes };

// Normalizes the name string
const normalize = (str) => (str ? str.trim().toLowerCase() : '');

// Formats the datetime object
export const toLocalISO = (date) => {
  if (!date) return '';
  const off = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - off).toISOString().slice(0, 16);
};

export function formatTime24(date) {
  if (!date || !(date instanceof Date) || isNaN(date)) return '';
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${hours}:${minutes}`;
}

// JSON downloader
const downloadJSON = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};


/*
  DATA MODELS
*/

export class Employee {
  constructor(id, name, wage = 15) {
    this.id = id || crypto.randomUUID();
    this.name = name;
    this.wage = Number(wage);
  }

  getPay(hours) {
    return Number((this.wage * hours).toFixed(2));
  }
}

export class Customer {
  constructor(id, name, location, note = null, billingRate = null) {
    this.id = id || crypto.randomUUID();
    this.name = name;
    this.location = location;
    this.note = note;
    const rate = billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate);
    this.billingRate = Number.isFinite(rate) && rate >= 0 ? rate : null;
  }

  customInfo() {
    const noteString = this.note ? ` - ${this.note}` : '';
    const locString = this.location ? ` - ${this.location}` : '';
    return `${this.name} - ${locString}`;
  }
}

export class WorkShift {
  constructor(employee, customer, id = null, note = null, isPaid = false, breaks = [], paidHours = null) {
    this.id = id || crypto.randomUUID();
    this.employee = employee;
    this.customer = customer;
    this.clockInTime = null;
    this.clockOutTime = null;
    this.breaks = breaks;
    this.note = note;
    this.isPaid = isPaid;
    this.paidHours = paidHours === null || paidHours === undefined || paidHours === ''
      ? null
      : Number(paidHours);
  }
  
  startBreak() {
    const breakIn = roundTo15Minutes();
    this.breaks.push({ start: breakIn, end: null });
  }
  
  stopBreak() {
    const activeBreak = this.breaks.find(b => b.start && !b.end);
    const endTime = roundTo15Minutes();
    if (activeBreak) {
      if (formatTime24(activeBreak.start) === formatTime24(endTime)) {
        this.breaks = this.breaks.filter(b => b !== activeBreak);
      } else {
        activeBreak.end = endTime;
      }
    }
  }
  
  get isOnBreak() {
    return Boolean(this.breaks.find(b => b.start && !b.end));
  }
  
  getTotalBreakTimeMs() {
    return this.breaks.reduce((total, b) => {
      if (b.start && b.end) {
        return total + (b.end - b.start);
      }
      return total;
    }, 0);
  }

  startShift(clockInTime = roundTo15Minutes()) {
    this.clockInTime = clockInTime;
    this.clockOutTime = null;
  }

  stopShift() {
    if (!this.clockInTime) return;
    if (this.isOnBreak) { 
      this.stopBreak();
    }
    this.clockOutTime = roundTo15Minutes();
  }
  
  addNote(newnote) {
    if (!this.note) {
      this.note = newnote;
    } else {
      this.note = `${this.note}\n${newnote}`;
    }
  }

  get isComplete() {
    return Boolean(this.clockInTime && this.clockOutTime);
  }

  getHoursWorked() {
    if (!this.isComplete) return 0;
    return actualShiftHours(this.clockInTime, this.clockOutTime, this.breaks);
  }

  getPaidHours() {
    return Number.isFinite(this.paidHours) ? this.paidHours : this.getHoursWorked();
  }

  getShiftPay() {
    if (this.isPaid) return 0;
    return this.employee ? this.employee.getPay(this.getPaidHours()) : 0;
  }
}

export class Payment {
  constructor(employeeId, amount, date = null, note = '', id = null) {
    this.id = id || crypto.randomUUID();
    this.employeeId = employeeId;
    this.amount = Number(amount);
    this.date = date ? new Date(date) : new Date();
    this.note = note;
  }
}

function todayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export class Invoice {
  constructor(cust, items = [], id = null, isPaid = false, date = todayDateString(), shiftIds = []) {
    this.id = id || crypto.randomUUID();
    this.customer = cust;
    this.items = items;
    this.isPaid = Boolean(isPaid);
    this.date = date || null;
    this.shiftIds = Array.isArray(shiftIds) ? [...new Set(shiftIds.map(String))] : [];
  }
  
  addItem(name, value) {
    this.items.push({ name: name, value: Number(value) });
  }
  
  deleteItem(name, value) {
    const dItem = this.items.find(i => i.name === name && i.value === value);
    this.items = this.items.filter(i => i !== dItem);
  }
  
  totalBill() {
    const total = this.items.reduce((sum, item) => sum + Number(item.value || 0), 0);
    return Number(total.toFixed(2));
  }
}

export class Ledger {
  constructor(initialEntries = []) {
    this.entries = [];
    if (Array.isArray(initialEntries) && initialEntries.length > 0) {
      initialEntries.forEach(data => this.addEntry(data));
    }
  }

  addEntry(data = {}) {
    const employeeId = data.employeeId || null;
    const nextIndex = this.entries.filter(entry => entry.employeeId === employeeId).length + 1;
    const entry = {
      id: data.id || crypto.randomUUID(),
      index: Number(data.index) > 0 ? Number(data.index) : nextIndex,
      employeeId,
      date: data.date ?? null,
      type: data.type ?? null,
      hours: data.hours ?? null,
      amount: data.amount ?? null,
      notes: data.notes ?? null
    };

    this.entries.push(entry);
    return entry;
  }

  updateEntry(id, updates = {}) {
    const entry = this.getEntry(id);
    if (!entry) return null;

    Object.assign(entry, updates);
    return entry;
  }

  deleteEntry(id) {
    const initialLength = this.entries.length;
    const entry = this.getEntry(id);
    this.entries = this.entries.filter(entry => entry.id !== id);
    
    if (this.entries.length !== initialLength) {
      this.reindex(entry?.employeeId ?? null);
      return true;
    }
    return false;
  }

  getEntry(id) {
    return this.entries.find(entry => entry.id === id) || null;
  }

  reindex(employeeId = undefined) {
    const entries = employeeId === undefined
      ? this.entries
      : this.entries.filter(entry => entry.employeeId === employeeId);
    entries.forEach((entry, i) => { entry.index = i + 1; });
  }

  getTotal() {
    return this.entries.reduce((total, { type = '', amount = 0 }) => {
      const entryType = type.toLowerCase();
      const amt = Number(amount) || 0;

      if (entryType === 'normal' || entryType === 'general') return total + amt;
      if (entryType === 'advance') return total - amt;
      return total;
    }, 0);
  }

  toJSON() {
    return this.entries;
  }
}

export class PlannedJob {
  constructor(description, scheduledDate, customer = null, isComplete = false, id = null) {
    this.description = String(description || '').trim();
    const date = scheduledDate === null || scheduledDate === undefined || scheduledDate === ''
      ? null
      : scheduledDate instanceof Date ? scheduledDate : new Date(scheduledDate);
    this.scheduledDate = date && !Number.isNaN(date.getTime()) ? date : null;
    this.customer = customer;
    this.isComplete = Boolean(isComplete);
    this.id = id || crypto.randomUUID();
  }

  getDate() {
    return this.scheduledDate;
  }
}


/*
  DATA STORE
*/

export class AppDataStore {
  constructor() {
    this.employees = new Map();
    this.customers = new Map();
    this.payments = [];
    this.shifts = [];
    this.invoices = [];
    this.ledger = new Ledger();
    this.plannedJobs = [];
    this.loadFailures = [];
    this.isAdmin = null;
  }

  async init() {
    changeHeader("Loading");
    this.loadFailures = [];
    await this.loadEmployees();
    await this.loadCustomers();
    await this.loadShifts();
    await this.loadPayments();
    await this.loadInvoices();
    await this.loadLedger();
    await this.loadPlanned();
    changeHeader();
  }

  // LEDGER --
  async loadLedger() {
    this.ledger = new Ledger();
    try {
      const querySnapshot = await getDocs(collection(db, "ledgerRows"));
      const loadedEntries = [];
      
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        loadedEntries.push({ ...data, id: docSnap.id });
      });

      loadedEntries.sort((a, b) => (a.index || 0) - (b.index || 0));
      loadedEntries.forEach(data => this.ledger.addEntry(data));

    } catch (e) {
      console.error("Error loading Ledger from Firestore:", e);
      this.loadFailures.push(e);
    }
  }

  async saveLedgerEntry(data) {
    const employeeId = data.employeeId || null;
    if (!employeeId || !this.employees.has(employeeId)) {
      throw new Error("Choose an employee for this ledger entry.");
    }
    const entry = this.ledger.addEntry({ ...data, employeeId });
    try {
      await setDoc(doc(db, "ledgerRows", entry.id), entry);
    } catch (error) {
      this.ledger.deleteEntry(entry.id);
      throw error;
    }
    return entry;
  }

  async updateLedgerEntry(entryId, updates) {
    const current = this.ledger.getEntry(entryId);
    if (!current) throw new Error("Ledger entry not found.");
    const previous = { ...current };
    const entry = this.ledger.updateEntry(entryId, updates);
    try {
      // Apply only the edited fields so any unrelated Firestore data remains untouched.
      await updateDoc(doc(db, "ledgerRows", entryId), updates);
    } catch (error) {
      Object.assign(entry, previous);
      throw error;
    }
    return entry;
  }

  async deleteLedgerEntry(entryId) {
    const entry = this.ledger.getEntry(entryId);
    if (!entry) return;
    const isDeleted = this.ledger.deleteEntry(entryId);
    if (!isDeleted) return;

    await deleteDoc(doc(db, "ledgerRows", entryId));

    // Batch update updated index numbers in Firestore efficiently
    const batch = writeBatch(db);
    const affectedEntries = this.ledger.entries.filter(candidate => candidate.employeeId === (entry.employeeId || null));
    affectedEntries.forEach((candidate) => {
      const ref = doc(db, "ledgerRows", candidate.id);
      batch.update(ref, { index: candidate.index });
    });
    if (affectedEntries.length) await commitBatch(batch);
  }

  // INVOICE --
  async loadInvoices() {
    this.invoices = [];
    try {
      const querySnapshot = await getDocs(collection(db, "invoices"));
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const customer = (this.customers && this.customers.get(data.custId)) || new Customer(data.custId, 'Unknown');
        const items = data.items || [];
        const isPaid = data.isPaid || false;
        
        const inv = new Invoice(customer, items, docSnap.id, isPaid, data.date || null, data.shiftIds || []);
        
        this.invoices.push(inv);
      });
    } catch (e) {
      console.error("Error loading invoices from Firestore:", e);
      this.loadFailures.push(e);
    }
  }
  
  async saveInvoice(invoice) {
    const linkedShiftIds = invoiceShiftIds(invoice);
    const linkedLineIds = (invoice.items || []).filter(item => item?.shiftId).map(item => String(item.shiftId));
    if (new Set(linkedLineIds).size !== linkedLineIds.length) {
      throw new Error('This invoice contains the same work shift more than once. Remove the duplicate before saving.');
    }
    const duplicateShiftId = [...linkedShiftIds].find(shiftId =>
      shiftIsAttachedElsewhere(this.invoices, shiftId, invoice.id)
    );
    if (duplicateShiftId) {
      throw new Error(`Shift ${duplicateShiftId} is already attached to another invoice.`);
    }
    invoice.shiftIds = [...linkedShiftIds];
    await setDoc(doc(db, "invoices", invoice.id), {
      custId: invoice.customer ? invoice.customer.id : null,
      items: invoice.items,
      isPaid: Boolean(invoice.isPaid),
      date: invoice.date || null,
      shiftIds: Array.isArray(invoice.shiftIds) ? invoice.shiftIds : []
    });
  }
  
  async deleteInvoice(invoiceId) {
    await deleteDoc(doc(db, "invoices", invoiceId));
    this.invoices = this.invoices.filter(s => s.id !== invoiceId);
  }

  // EMPLOYEE --
  async loadEmployees() {
    this.employees.clear();
    try {
      const querySnapshot = await getDocs(collection(db, "employees"));
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        this.employees.set(docSnap.id, new Employee(docSnap.id, data.name, data.wage));
      });
    } catch (e) {
      console.error("Error loading employees from Firestore:", e);
      this.loadFailures.push(e);
    }
  }

  async addEmployee(name, wage) {
    const cleanName = normalize(name);
    if (!cleanName) throw new Error("Employee name cannot be empty.");

    const isDuplicate = Array.from(this.employees.values()).some(
      (emp) => normalize(emp.name) === cleanName
    );
    if (isDuplicate) return null;

    const emp = new Employee(null, name.trim(), wage);
    await setDoc(doc(db, "employees", emp.id), {
      name: emp.name,
      wage: emp.wage
    });
    this.employees.set(emp.id, emp);
    return emp;
  }

  async updateEmployee(id, name, wage) {
    const employee = this.employees.get(id);
    if (!employee) throw new Error("Employee not found.");

    const cleanName = String(name ?? '').trim();
    const cleanWage = Number(wage);
    if (!cleanName) throw new Error("Employee name cannot be empty.");
    if (!Number.isFinite(cleanWage) || cleanWage < 0) {
      throw new Error("Employee wage must be a non-negative number.");
    }
    const duplicate = Array.from(this.employees.values()).some(
      candidate => candidate.id !== id && normalize(candidate.name) === normalize(cleanName)
    );
    if (duplicate) throw new Error("An employee with that name already exists.");

    await updateDoc(doc(db, "employees", id), { name: cleanName, wage: cleanWage });
    employee.name = cleanName;
    employee.wage = cleanWage;
    return employee;
  }

  async deleteEmployee(id) {
    if (this.employees.has(id)) {
      await deleteDoc(doc(db, "employees", id));
      this.employees.delete(id);
      return true;
    }
    return false;
  }

  // CUSTOMER --
  async loadCustomers() {
    this.customers.clear();
    try {
      const querySnapshot = await getDocs(collection(db, "customers"));
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        this.customers.set(docSnap.id, new Customer(docSnap.id, data.name, data.location, data.note, data.billingRate));
      });
    } catch (e) {
      console.error("Error loading customers from Firestore:", e);
      this.loadFailures.push(e);
    }
  }
  
  async addCustomer(name, location, note = null, billingRate = null) {
    const cleanName = normalize(name);
    const cleanLocation = normalize(location);
    if (!cleanName) throw new Error("Customer name cannot be empty.");
    const rate = billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate);
    if (rate !== null && (!Number.isFinite(rate) || rate < 0)) {
      throw new Error("Hourly billing rate must be a non-negative number.");
    }

    const isDuplicate = Array.from(this.customers.values()).some(
      (site) => normalize(site.name) === cleanName && normalize(site.location) === cleanLocation
    );
    if (isDuplicate) return null;

    const site = new Customer(null, name.trim(), location ? location.trim() : null, note, rate);
    await setDoc(doc(db, "customers", site.id), {
      name: site.name,
      location: site.location,
      note: site.note,
      billingRate: site.billingRate
    });
    this.customers.set(site.id, site);
    return site;
  }

  async updateCustomer(id, name, location, note, billingRate = undefined) {
    const customer = this.customers.get(id);
    if (!customer) throw new Error("Customer not found.");

    const cleanName = String(name ?? '').trim();
    const cleanLocation = String(location ?? '').trim();
    const cleanNote = String(note ?? '').trim() || null;
    if (!cleanName) throw new Error("Customer name cannot be empty.");
    if (!cleanLocation) throw new Error("Customer location cannot be empty.");
    const duplicate = Array.from(this.customers.values()).some(candidate =>
      candidate.id !== id &&
      normalize(candidate.name) === normalize(cleanName) &&
      normalize(candidate.location) === normalize(cleanLocation)
    );
    if (duplicate) throw new Error("A customer with that name and location already exists.");

    const updates = {
      name: cleanName,
      location: cleanLocation,
      note: cleanNote
    };
    let cleanRate;
    if (billingRate !== undefined) {
      cleanRate = billingRate === null || billingRate === '' ? null : Number(billingRate);
      if (cleanRate !== null && (!Number.isFinite(cleanRate) || cleanRate < 0)) {
        throw new Error("Hourly billing rate must be a non-negative number.");
      }
      updates.billingRate = cleanRate;
    }

    await updateDoc(doc(db, "customers", id), updates);
    customer.name = cleanName;
    customer.location = cleanLocation;
    customer.note = cleanNote;
    if (billingRate !== undefined) customer.billingRate = cleanRate;
    return true;
  }

  async updateCustomerBillingRate(id, billingRate) {
    const customer = this.customers.get(id);
    if (!customer) throw new Error("Customer not found.");
    const rate = billingRate === null || billingRate === undefined || billingRate === '' ? null : Number(billingRate);
    if (rate !== null && (!Number.isFinite(rate) || rate < 0)) {
      throw new Error("Hourly billing rate must be a non-negative number.");
    }
    const previousRate = customer.billingRate;
    customer.billingRate = rate;
    try {
      await updateDoc(doc(db, "customers", id), { billingRate: rate });
    } catch (error) {
      customer.billingRate = previousRate;
      throw error;
    }
    return customer;
  }

  async deleteCustomer(id) {
    if (this.customers.has(id)) {
      await deleteDoc(doc(db, "customers", id));
      this.customers.delete(id);
      return true;
    }
    return false;
  }

  // WORKSHIFT --
  async loadShifts() {
    this.shifts = [];
    try {
      const querySnapshot = await getDocs(collection(db, "shifts"));
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const emp = (this.employees && this.employees.get(data.employeeId)) || new Employee(data.employeeId, 'Unknown Employee', 0);
        const site = (this.customers && this.customers.get(data.custId)) || new Customer(data.custId, 'Unknown Site');
        const parsedBreaks = (data.breaks || []).map(b => ({start: b.start ? new Date(b.start) : null, end: b.end ? new Date(b.end) : null}));

        const shift = new WorkShift(emp, site, docSnap.id, data.note || null, data.isPaid, parsedBreaks, data.paidHours);

        shift.clockInTime = data.clockInTime ? new Date(data.clockInTime) : null;
        shift.clockOutTime = data.clockOutTime ? new Date(data.clockOutTime) : null;
        
        this.shifts.push(shift);
      });
    } catch (e) {
      console.error("Error loading shifts from Firestore:", e);
      this.loadFailures.push(e);
    }
  }

  async saveShift(shift) {
    const formattedBreaks = shift.breaks.map(b => ({
      start: b.start instanceof Date ? b.start.toISOString() : b.start, 
      end: b.end instanceof Date ? b.end.toISOString() : b.end
    }));
    
    await setDoc(doc(db, "shifts", shift.id), {
      employeeId: shift.employee ? shift.employee.id : null,
      custId: shift.customer ? shift.customer.id : null,
      clockInTime: shift.clockInTime ? shift.clockInTime.toISOString() : null,
      clockOutTime: shift.clockOutTime ? shift.clockOutTime.toISOString() : null,
      note: shift.note || null,
      isPaid: shift.isPaid || false,
      breaks: formattedBreaks,
      paidHours: Number.isFinite(shift.paidHours) ? shift.paidHours : null
    }); 
  }

  async saveShifts(shifts) {
    if (!Array.isArray(shifts) || shifts.length === 0) return;
    if (shifts.length > 500) throw new Error("A single clock-in batch cannot contain more than 500 shifts.");
    const ids = shifts.map(shift => String(shift.id));
    if (new Set(ids).size !== ids.length) throw new Error("A shift appears more than once in this clock-in batch.");
    const batch = writeBatch(db);
    shifts.forEach(shift => {
      const formattedBreaks = (shift.breaks || []).map(b => ({
        start: b.start instanceof Date ? b.start.toISOString() : b.start,
        end: b.end instanceof Date ? b.end.toISOString() : b.end
      }));
      batch.set(doc(db, "shifts", shift.id), {
        employeeId: shift.employee ? shift.employee.id : null,
        custId: shift.customer ? shift.customer.id : null,
        clockInTime: shift.clockInTime ? shift.clockInTime.toISOString() : null,
        clockOutTime: shift.clockOutTime ? shift.clockOutTime.toISOString() : null,
        note: shift.note || null,
        isPaid: Boolean(shift.isPaid),
        breaks: formattedBreaks,
        paidHours: Number.isFinite(shift.paidHours) ? shift.paidHours : null
      });
    });
    await commitBatch(batch, 'Clocking in the selected employees failed.');
  }
  
  async deleteShift(shiftId) {
    await deleteDoc(doc(db, "shifts", shiftId));
    this.shifts = this.shifts.filter(s => s.id !== shiftId);
  }

  async updateShift(shiftId, employee, customer, clockInTime, clockOutTime, note = null, isPaid = false, breaks = null, paidHours = undefined) {
    const shift = this.shifts.find(s => s.id === shiftId);
    if (!shift) throw new Error("Shift could not be found.");
    if (!employee || !customer) throw new Error("Please select an employee and customer.");

    const start = clockInTime instanceof Date ? clockInTime : new Date(clockInTime);
    const end = clockOutTime instanceof Date ? clockOutTime : new Date(clockOutTime);
    const sourceBreaks = Array.isArray(breaks) ? breaks : shift.breaks;
    
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new Error("Please provide valid start and end times.");
    }
    if (end <= start) throw new Error("End time must be after start time.");

    const normalizedBreaks = sourceBreaks.map((breakItem, index) => {
      const breakStart = breakItem.start instanceof Date ? breakItem.start : new Date(breakItem.start);
      const breakEnd = breakItem.end instanceof Date ? breakItem.end : new Date(breakItem.end);
      if (Number.isNaN(breakStart.getTime()) || Number.isNaN(breakEnd.getTime())) {
        throw new Error(`Break ${index + 1} needs both a valid start and end time.`);
      }
      if (breakEnd <= breakStart) throw new Error(`Break ${index + 1} must end after it starts.`);
      if (breakStart < start || breakEnd > end) {
        throw new Error(`Break ${index + 1} must fall within the shift.`);
      }
      return { start: breakStart, end: breakEnd };
    }).sort((a, b) => a.start - b.start);

    for (let index = 1; index < normalizedBreaks.length; index += 1) {
      if (normalizedBreaks[index].start < normalizedBreaks[index - 1].end) {
        throw new Error("Break times cannot overlap.");
      }
    }

    const nextPaidHours = paidHours === undefined ? shift.paidHours :
      (paidHours === null || paidHours === '' ? null : Number(paidHours));
    if (nextPaidHours !== null && (!Number.isFinite(nextPaidHours) || nextPaidHours < 0)) {
      throw new Error("Paid hours must be a valid non-negative number, or left blank to use worked hours.");
    }

    await updateDoc(doc(db, "shifts", shiftId), {
      employeeId: employee.id,
      custId: customer.id,
      clockInTime: start.toISOString(),
      clockOutTime: end.toISOString(),
      note: note ? String(note).trim() : null,
      isPaid: Boolean(isPaid),
      breaks: normalizedBreaks.map(b => ({ start: b.start.toISOString(), end: b.end.toISOString() })),
      paidHours: nextPaidHours
    });

    shift.employee = employee;
    shift.customer = customer;
    shift.clockInTime = start;
    shift.clockOutTime = end;
    shift.note = note ? String(note).trim() : null;
    shift.isPaid = Boolean(isPaid);
    shift.breaks = normalizedBreaks;
    shift.paidHours = nextPaidHours;
    return shift;
  }

  async howManyActive() {
    const activeShifts = this.shifts.filter(s => !s.isComplete);
    return activeShifts.length;
  }

  // PAYMENT --
  async loadPayments() {
    this.payments = [];
    try {
      const querySnapshot = await getDocs(collection(db, "payments"));
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const payment = new Payment(
          data.employeeId,
          data.amount,
          data.date,
          data.note,
          docSnap.id
        );
        this.payments.push(payment);
      });
    } catch (e) {
      console.error("Error loading payments from Firestore:", e);
      this.loadFailures.push(e);
    }
  }

  async addPayment(employeeId, amount, note = '') {
    const payment = new Payment(employeeId, amount, new Date(), note);
    await setDoc(doc(db, "payments", payment.id), {
      employeeId: payment.employeeId,
      amount: payment.amount,
      date: payment.date.toISOString(),
      note: payment.note
    });
    this.payments.push(payment);
    return payment;
  }
  
  async deletePayment(paymentId) {
    await deleteDoc(doc(db, "payments", paymentId));
    this.payments = this.payments.filter(p => p.id !== paymentId);
  }

  // CALCULATE BALANCES FOR AN EMPLOYEE
  getEmployeeLedger(employeeId) {
    const empShifts = this.shifts.filter(
      s => s.employee && s.employee.id === employeeId && s.isComplete
    );
    const empPayments = this.payments.filter(
      p => p.employeeId === employeeId
    );

    const totalEarned = empShifts.reduce((sum, s) => sum + Number(s.getShiftPay()), 0);
    const totalPaid = empPayments.reduce((sum, p) => sum + p.amount, 0);
    const balanceOwed = Number((totalEarned - totalPaid).toFixed(2));

    return {
      shifts: empShifts,
      payments: empPayments,
      totalEarned,
      totalPaid,
      balanceOwed
    };
  }

  // IMPORT & EXPORT
  exportDirectoryData() {
    return {
      employees: Object.fromEntries(this.employees),
      customers: Object.fromEntries(this.customers)
    };
  }

  async importDirectoryData(jsonString) {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object' || !parsed.employees || !parsed.customers) {
      throw new Error("Invalid format. File must contain 'employees' and 'customers'.");
    }
    for (const [id, emp] of Object.entries(parsed.employees)) {
      await setDoc(doc(db, "employees", id), { name: emp.name, wage: emp.wage });
    }
    for (const [id, cust] of Object.entries(parsed.customers)) {
      const billingRate = Object.prototype.hasOwnProperty.call(cust, 'billingRate')
        ? cust.billingRate
        : this.customers.get(id)?.billingRate ?? null;
      await setDoc(doc(db, "customers", id), {
        name: cust.name,
        location: cust.location,
        note: cust.note,
        billingRate
      });
    }
    await this.init();
  }

  exportShiftData() {
    return this.shifts.map(s => ({
      id: s.id,
      employeeId: s.employee ? s.employee.id : null,
      custId: s.customer ? s.customer.id : null,
      clockInTime: s.clockInTime ? s.clockInTime.toISOString() : null,
      clockOutTime: s.clockOutTime ? s.clockOutTime.toISOString() : null,
      note: s.note || null,
      isPaid: s.isPaid || null,
      breaks: s.breaks.map(b => ({
        start: b.start ? new Date(b.start).toISOString() : null,
        end: b.end ? new Date(b.end).toISOString() : null
      })),
      paidHours: Number.isFinite(s.paidHours) ? s.paidHours : null
    }));
  }

  async importShiftData(jsonString) {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      throw new Error("Invalid format. File must be a JSON list of shifts.");
    }

    for (const shiftData of parsed) {
      await setDoc(doc(db, "shifts", shiftData.id), {
        employeeId: shiftData.employeeId,
        custId: shiftData.custId,
        clockInTime: shiftData.clockInTime,
        clockOutTime: shiftData.clockOutTime,
        note: shiftData.note || null,
        isPaid: shiftData.isPaid,
        breaks: shiftData.breaks || [],
        paidHours: shiftData.paidHours ?? null
      });
    }
    await this.loadShifts();
  }

  exportFullBackup() {
    const copy = value => JSON.parse(JSON.stringify(value));
    return {
      format: 'timekeeper-full-backup',
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      data: {
        employees: [...this.employees.values()].map(employee => ({
          id: employee.id, name: employee.name, wage: employee.wage
        })),
        customers: [...this.customers.values()].map(customer => ({
          id: customer.id, name: customer.name, location: customer.location || null,
          note: customer.note || null, billingRate: customer.billingRate ?? null
        })),
        shifts: this.shifts.map(shift => ({
          id: shift.id,
          employeeId: shift.employee?.id || null,
          custId: shift.customer?.id || null,
          clockInTime: shift.clockInTime?.toISOString?.() || null,
          clockOutTime: shift.clockOutTime?.toISOString?.() || null,
          note: shift.note || null,
          isPaid: Boolean(shift.isPaid),
          breaks: (shift.breaks || []).map(item => ({
            start: item.start?.toISOString?.() || item.start || null,
            end: item.end?.toISOString?.() || item.end || null
          })),
          paidHours: Number.isFinite(shift.paidHours) ? shift.paidHours : null
        })),
        invoices: this.invoices.map(invoice => ({
          id: invoice.id,
          custId: invoice.customer?.id || null,
          items: copy(invoice.items || []),
          isPaid: Boolean(invoice.isPaid),
          date: invoice.date || null,
          shiftIds: [...invoiceShiftIds(invoice)]
        })),
        payments: this.payments.map(payment => ({
          id: payment.id,
          employeeId: payment.employeeId || null,
          amount: payment.amount,
          date: payment.date?.toISOString?.() || null,
          note: payment.note || ''
        })),
        plannedJobs: this.plannedJobs.map(job => ({
          id: job.id,
          custId: job.customer?.id || null,
          description: job.description || '',
          isComplete: Boolean(job.isComplete),
          scheduledDate: job.scheduledDate?.toISOString?.() || null
        })),
        ledger: this.ledger.entries.map(entry => ({ ...entry }))
      }
    };
  }

  previewFullBackup(backup) {
    const keys = ['employees', 'customers', 'shifts', 'invoices', 'payments', 'plannedJobs', 'ledger'];
    if (!backup || typeof backup !== 'object' || backup.format !== 'timekeeper-full-backup' || backup.schemaVersion !== 1) {
      throw new Error('This is not a supported Timekeeper backup (expected schema version 1).');
    }
    if (!backup.data || typeof backup.data !== 'object' || keys.some(key => !Array.isArray(backup.data[key]))) {
      throw new Error('The backup is incomplete. It must contain employees, customers, shifts, invoices, payments, planned jobs, and ledger records.');
    }
    for (const key of keys) {
      const ids = new Set();
      for (const [index, record] of backup.data[key].entries()) {
        if (!record || typeof record !== 'object' || typeof record.id !== 'string' || !record.id.trim() || record.id.includes('/')) {
          throw new Error(`The ${key} list has an invalid record at row ${index + 1}.`);
        }
        if (ids.has(record.id)) throw new Error(`The ${key} list contains duplicate ID ${record.id}.`);
        ids.add(record.id);
      }
    }

    const validDateOrNull = value => value === null || value === undefined ||
      (typeof value === 'string' && value.length > 0 && !Number.isNaN(Date.parse(value)));
    const finiteOrNull = value => value === null || value === undefined || Number.isFinite(Number(value));
    for (const employee of backup.data.employees) {
      if (typeof employee.name !== 'string' || typeof employee.wage !== 'number' || !Number.isFinite(employee.wage) || employee.wage < 0) {
        throw new Error(`Employee ${employee.id} needs a name and a non-negative wage.`);
      }
    }
    for (const customer of backup.data.customers) {
      if (typeof customer.name !== 'string' || !finiteOrNull(customer.billingRate) ||
          (customer.billingRate !== null && customer.billingRate !== undefined &&
            (typeof customer.billingRate !== 'number' || customer.billingRate < 0))) {
        throw new Error(`Customer ${customer.id} has invalid name or billing-rate data.`);
      }
    }
    for (const shift of backup.data.shifts) {
      if (!validDateOrNull(shift.clockInTime) || !validDateOrNull(shift.clockOutTime) ||
          !Array.isArray(shift.breaks || []) || !finiteOrNull(shift.paidHours) || typeof shift.isPaid !== 'boolean' ||
          (shift.paidHours !== null && shift.paidHours !== undefined && typeof shift.paidHours !== 'number') ||
          (shift.breaks || []).some(item => !item || typeof item !== 'object' ||
            !validDateOrNull(item.start) || !validDateOrNull(item.end))) {
        throw new Error(`Shift ${shift.id} has invalid date, break, or paid-hours data.`);
      }
    }
    for (const invoice of backup.data.invoices) {
      if (!Array.isArray(invoice.items) || !validDateOrNull(invoice.date) || typeof invoice.isPaid !== 'boolean' ||
          invoice.items.some(item => !item || typeof item.name !== 'string' || typeof item.value !== 'number' || !Number.isFinite(item.value))) {
        throw new Error(`Invoice ${invoice.id} has invalid item or date data.`);
      }
      const laborShiftIds = invoice.items.filter(item => item.shiftId).map(item => String(item.shiftId));
      if (new Set(laborShiftIds).size !== laborShiftIds.length) {
        throw new Error(`Invoice ${invoice.id} attaches the same shift more than once.`);
      }
    }
    const shiftOwners = new Map();
    for (const invoice of backup.data.invoices) {
      const linkedIds = new Set([...(Array.isArray(invoice.shiftIds) ? invoice.shiftIds : []),
        ...invoice.items.filter(item => item.shiftId).map(item => String(item.shiftId))].map(String));
      for (const shiftId of linkedIds) {
        const owner = shiftOwners.get(shiftId);
        if (owner && owner !== invoice.id) throw new Error(`Shift ${shiftId} is attached to more than one invoice in this backup.`);
        shiftOwners.set(shiftId, invoice.id);
      }
    }
    for (const payment of backup.data.payments) {
      if (typeof payment.amount !== 'number' || !Number.isFinite(payment.amount) || !validDateOrNull(payment.date)) {
        throw new Error(`Payment ${payment.id} has invalid amount or date data.`);
      }
    }
    for (const job of backup.data.plannedJobs) {
      if (typeof job.description !== 'string' || !validDateOrNull(job.scheduledDate) || typeof job.isComplete !== 'boolean') {
        throw new Error(`Planned job ${job.id} has invalid description or date data.`);
      }
    }

    return {
      format: backup.format,
      schemaVersion: backup.schemaVersion,
      exportedAt: validDateOrNull(backup.exportedAt) ? backup.exportedAt : null,
      counts: Object.fromEntries(keys.map(key => [key, backup.data[key].length]))
    };
  }

  async restoreFullBackup(backup) {
    this.previewFullBackup(backup);
    const collectionByKey = {
      employees: 'employees', customers: 'customers', shifts: 'shifts',
      invoices: 'invoices', payments: 'payments', plannedJobs: 'planned', ledger: 'ledgerRows'
    };
    const snapshots = await Promise.all(Object.values(collectionByKey).map(name => getDocs(collection(db, name))));
    const batch = writeBatch(db);
    let operationCount = 0;

    Object.entries(collectionByKey).forEach(([key, collectionName], index) => {
      const savedRecords = backup.data[key];
      const savedIds = new Set(savedRecords.map(record => record.id));
      snapshots[index].forEach(docSnap => {
        if (!savedIds.has(docSnap.id)) {
          batch.delete(doc(db, collectionName, docSnap.id));
          operationCount += 1;
        }
      });
      savedRecords.forEach(record => {
        const { id, ...documentData } = record;
        batch.set(doc(db, collectionName, id), documentData);
        operationCount += 1;
      });
    });

    if (operationCount > 500) {
      throw new Error(`This restore needs ${operationCount} Firestore writes; one atomic restore is limited to 500. No data was changed.`);
    }
    if (operationCount) await commitBatch(batch, 'Restoring the selected backup failed.');
    await this.init();
  }


  // PLANNED JOBS
  async loadPlanned() {
    this.plannedJobs = [];
    try {
      const querySnapshot = await getDocs(collection(db, "planned"));
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const customer = (data.custId && this.customers.get(data.custId)) ||
          (data.custId ? new Customer(data.custId, 'Unknown Site') : null);
        const storedDate = data.scheduledDate?.toDate?.() || data.scheduledDate || null;
        const planned = new PlannedJob(data.description, storedDate, customer, data.isComplete, docSnap.id);
        this.plannedJobs.push(planned);
      });
      this.plannedJobs.sort((a, b) => {
        const dateA = a.scheduledDate?.getTime() ?? null;
        const dateB = b.scheduledDate?.getTime() ?? null;
        if (dateA === null && dateB !== null) return 1;
        if (dateA !== null && dateB === null) return -1;
        return (dateA ?? 0) - (dateB ?? 0);
      });
    } catch (e) {
      console.error("Error loading planned jobs from Firestore:", e);
      this.loadFailures.push(e);
    }
  }
  
  async savePlanned(planned) {
    let scheduledDate = null;
    if (planned.scheduledDate !== null && planned.scheduledDate !== undefined && planned.scheduledDate !== '') {
      scheduledDate = planned.scheduledDate instanceof Date ? planned.scheduledDate : new Date(planned.scheduledDate);
      if (Number.isNaN(scheduledDate.getTime())) {
        throw new Error("Planned job needs a valid scheduled date or no date.");
      }
    }
    await setDoc(doc(db, "planned", planned.id), {
      custId: planned.customer ? planned.customer.id : null,
      description: planned.description || '',
      isComplete: Boolean(planned.isComplete),
      scheduledDate
    });
    return planned;
  }

  async setPlannedComplete(plannedId, isComplete) {
    const planned = this.plannedJobs.find(job => job.id === plannedId);
    if (!planned) throw new Error("Planned job not found.");
    const previousValue = planned.isComplete;
    planned.isComplete = Boolean(isComplete);
    try {
      await this.savePlanned(planned);
      return planned;
    } catch (error) {
      planned.isComplete = previousValue;
      throw error;
    }
  }

  async updatePlanned(plannedId, description, scheduledDate, customer) {
    const planned = this.plannedJobs.find(job => job.id === plannedId);
    if (!planned) throw new Error("Planned job not found.");
    const cleanDescription = String(description || '').trim();
    const nextDate = scheduledDate === null || scheduledDate === undefined || scheduledDate === ''
      ? null
      : scheduledDate instanceof Date ? scheduledDate : new Date(scheduledDate);
    if (!cleanDescription) throw new Error("Add a job description before saving.");
    if (nextDate && Number.isNaN(nextDate.getTime())) throw new Error("Planned job needs a valid scheduled date or no date.");
    if (!customer) throw new Error("Choose a customer before saving this job.");

    const previous = {
      description: planned.description,
      scheduledDate: planned.scheduledDate,
      customer: planned.customer
    };
    planned.description = cleanDescription;
    planned.scheduledDate = nextDate;
    planned.customer = customer;
    try {
      await this.savePlanned(planned);
      return planned;
    } catch (error) {
      Object.assign(planned, previous);
      throw error;
    }
  }

  async deletePlanned(plannedId) {
    await deleteDoc(doc(db, "planned", plannedId));
    this.plannedJobs = this.plannedJobs.filter(job => job.id !== plannedId);
  }
  
}

export const store = new AppDataStore();

const nameCollator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true });

export function compareByFirstName(a, b) {
  const nameA = String(a?.name || '').trim();
  const nameB = String(b?.name || '').trim();
  const firstA = nameA.split(/\s+/)[0] || '';
  const firstB = nameB.split(/\s+/)[0] || '';
  return nameCollator.compare(firstA, firstB) || nameCollator.compare(nameA, nameB);
}

export function populateEmployeeDropdowns(empDropdownElement) {
  if (!empDropdownElement) return;
  empDropdownElement.innerHTML = '<option value="">--Employee--</option>';
  [...store.employees.values()].sort(compareByFirstName).forEach((emp) => {
    const opt = document.createElement('option');
    opt.value = emp.id;
    opt.textContent = `${emp.name} -- ($${emp.wage}/hr)`;
    empDropdownElement.appendChild(opt);
  });
}

export function populateCustomerDropdowns(custDropdownElement) {
  if (!custDropdownElement) return;
  custDropdownElement.innerHTML = '<option value="">--Customer--</option>';
  [...store.customers.values()].sort(compareByFirstName).forEach((cust) => {
    const opt = document.createElement('option');
    opt.value = cust.id;
    opt.textContent = cust.customInfo();
    custDropdownElement.appendChild(opt);
  });
}

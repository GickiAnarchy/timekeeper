import {
  actualShiftHours,
  invoiceShiftIds,
  roundDown15Minutes,
  roundTo15Minutes,
  roundUp15Minutes,
  shiftIsAttachedElsewhere
} from './domain.mjs';

/*
  Firebase Setup
*/

// 1. Import Firebase & Firestore Modular SDKs (CDN Links)
import {
  collection,
  setDoc as firestoreSetDoc,
  getDocs as firestoreGetDocs,
  doc,
  updateDoc as firestoreUpdateDoc,
  deleteDoc as firestoreDeleteDoc,
  writeBatch as firestoreWriteBatch,
  getDoc as firestoreGetDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db, getCurrentOwner, requireRecentOwnerReauthentication } from './firebase.js';
import { publicCustomerData, publicEmployeeData, publicShiftData } from './guest-data.mjs';

const REQUESTABLE_COLLECTIONS = new Set([
  'employees', 'customers', 'payments', 'invoices', 'ledgerRows', 'planned', 'shifts'
]);

export class PendingRequestSubmittedError extends Error {
  constructor(requestId) {
    super(`Request ${requestId} was sent to the owner. No workspace data has changed.`);
    this.name = 'PendingRequestSubmittedError';
    this.requestId = requestId;
    this.pending = true;
  }
}

function requestSafeValue(value) {
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(requestSafeValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value)
      .filter(([, entry]) => entry !== undefined)
      .map(([key, entry]) => [key, requestSafeValue(entry)]));
  }
  return value;
}

function operationForReference(operation, reference, data = undefined) {
  const [collectionName, documentId] = String(reference.path || '').split('/');
  if (!REQUESTABLE_COLLECTIONS.has(collectionName) || !documentId || documentId.includes('/')) {
    throw new Error('This change cannot be submitted from guest access.');
  }
  const item = { operation, collection: collectionName, documentId };
  if (data !== undefined) item.data = requestSafeValue(data);
  return item;
}

async function submitPendingRequest(operations, kind = 'write') {
  const requestId = globalThis.crypto?.randomUUID?.();
  if (!requestId) throw new Error('This browser cannot create a secure change-request ID.');
  const requestData = {
    kind,
    status: 'pending',
    submittedAt: new Date().toISOString(),
    requester: 'Shared kiosk',
    ...(kind === 'write' ? operations[0] : { operations })
  };
  await firestoreRequest('Submitting this change request failed.', () =>
    firestoreSetDoc(doc(db, 'changeRequests', requestId), requestData));
  throw new PendingRequestSubmittedError(requestId);
}

async function writeWithAccess(operation, reference, data, options = undefined) {
  if (!await getCurrentOwner()) {
    await submitPendingRequest([operationForReference(operation, reference, data)]);
  }
  await requireRecentOwnerReauthentication('Saving workspace data');
  const writer = operation === 'set' ? firestoreSetDoc : operation === 'update' ? firestoreUpdateDoc : firestoreDeleteDoc;
  const args = operation === 'delete' ? [reference] : [reference, data, ...(options === undefined ? [] : [options])];
  return firestoreRequest('Saving data to Firestore failed.', () => writer(...args));
}

const setDoc = (reference, data, options) => writeWithAccess('set', reference, data, options);
const updateDoc = (reference, data) => writeWithAccess('update', reference, data);
const deleteDoc = reference => writeWithAccess('delete', reference);
const getDocs = (...args) => firestoreRequest('Loading data from Firestore failed.', () => firestoreGetDocs(...args));

function writeBatch(database) {
  const batch = firestoreWriteBatch(database);
  const operations = [];
  const api = {
    set(reference, data, options) {
      operations.push(operationForReference('set', reference, data));
      if (options === undefined) batch.set(reference, data);
      else batch.set(reference, data, options);
      return api;
    },
    update(reference, data) {
      operations.push(operationForReference('update', reference, data));
      batch.update(reference, data);
      return api;
    },
    delete(reference) {
      operations.push(operationForReference('delete', reference));
      batch.delete(reference);
      return api;
    },
    commit() { return batch.commit(); },
    _operations: operations,
    _rawBatch: batch
  };
  return api;
}

async function commitBatch(batch, message = 'Saving this group of changes to Firestore failed.') {
  if (!await getCurrentOwner()) await submitPendingRequest(batch._operations || [], 'batch');
  await requireRecentOwnerReauthentication(message);
  return firestoreRequest(message, () => batch._rawBatch.commit());
}

const commitRoutineBatch = (batch, message) => firestoreRequest(message, () => batch._rawBatch.commit());

async function tryUpdateGuestProjection(operation, description) {
  try {
    await operation();
  } catch (error) {
    console.warn(`Guest-safe projection update skipped (${description}). Deploy the separately reviewed guest-access rules before refreshing projections.`, error?.code || error);
  }
}
function showFirestoreError(message, retryOperation) {
  if (!globalThis.document?.body) return;
  let banner = document.getElementById('firestore-error-banner');
  if (!banner) {
    banner = document.createElement('section');
    banner.id = 'firestore-error-banner';
    banner.setAttribute('role', 'alert');
    banner.setAttribute('aria-live', 'assertive');
    Object.assign(banner.style, {
      position: 'fixed',
      inset: '12px 12px auto',
      zIndex: '2147483647',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      padding: '12px 16px',
      color: '#521b1b',
      background: '#fff0ee',
      border: '1px solid #d98b83',
      borderRadius: '10px',
      boxShadow: '0 8px 24px rgba(0,0,0,.18)',
      font: '600 14px/1.4 system-ui, sans-serif'
    });
    const text = document.createElement('span');
    text.dataset.errorMessage = 'true';
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.textContent = 'Retry';
    Object.assign(retry.style, {
      padding: '8px 13px',
      color: '#fff',
      background: '#8f302b',
      border: '0',
      borderRadius: '7px',
      font: 'inherit',
      cursor: 'pointer'
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
    this.paidHours = paidHours === null || paidHours === undefined || paidHours === '' ?
      null :
      Number(paidHours);
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
    const entries = employeeId === undefined ?
      this.entries :
      this.entries.filter(entry => entry.employeeId === employeeId);
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
    const date = scheduledDate === null || scheduledDate === undefined || scheduledDate === '' ?
      null :
      scheduledDate instanceof Date ? scheduledDate : new Date(scheduledDate);
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
    this.privateShiftIds = new Set();
    this.invoices = [];
    this.ledger = new Ledger();
    this.plannedJobs = [];
    this.loadFailures = [];
    this.isOwner = false;
    this.authRequired = false;
  }
  
  async init() {
    this.loadFailures = [];
    const owner = await getCurrentOwner();
    this.isOwner = Boolean(owner);
    this.authRequired = !this.isOwner;
    globalThis.document?.body?.setAttribute('data-owner', String(this.isOwner));
    if (!this.isOwner) {
      this.payments = [];
      this.invoices = [];
      this.ledger = new Ledger();
      this.plannedJobs = [];
      await this.loadEmployees();
      await this.loadCustomers();
      await this.loadShifts();
      return;
    }
    await this.loadEmployees();
    await this.loadCustomers();
    await this.loadShifts();
    await this.loadPayments();
    await this.loadInvoices();
    await this.loadLedger();
    await this.loadPlanned();
  }

  async loadPendingRequests() {
    if (!await getCurrentOwner()) throw new Error('Owner sign-in is required to review pending requests.');
    const snapshot = await getDocs(collection(db, 'changeRequests'));
    return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }))
      .sort((a, b) => String(b.submittedAt || '').localeCompare(String(a.submittedAt || '')));
  }

  async resolvePendingRequest(requestId, decision, reviewerNote = '') {
    if (!await getCurrentOwner()) throw new Error('Owner sign-in is required to review pending requests.');
    if (!['approved', 'denied'].includes(decision)) throw new Error('Choose approve or deny.');
    const requestRef = doc(db, 'changeRequests', requestId);
    const requestSnap = await firestoreRequest('Loading this request failed.', () => firestoreGetDoc(requestRef));
    if (!requestSnap.exists() || requestSnap.data().status !== 'pending') {
      throw new Error('This request is no longer pending. Refresh the request list.');
    }

    const request = requestSnap.data();
    const operations = request.kind === 'batch' ? request.operations : [request];
    if (decision === 'approved' && (!Array.isArray(operations) || operations.length === 0 || operations.length > 499)) {
      throw new Error('This request has an invalid or oversized change list.');
    }
    const allowedOperations = new Set(['set', 'update', 'delete']);
    const batch = firestoreWriteBatch(db);
    if (decision === 'approved') {
      for (const operation of operations) {
        if (!operation || !REQUESTABLE_COLLECTIONS.has(operation.collection) ||
          typeof operation.documentId !== 'string' || !operation.documentId || operation.documentId.includes('/') ||
          !allowedOperations.has(operation.operation)) {
          throw new Error('This request contains a change that cannot be applied.');
        }
        const reference = doc(db, operation.collection, operation.documentId);
        if (operation.operation === 'set') batch.set(reference, operation.data || {});
        else if (operation.operation === 'update') batch.update(reference, operation.data || {});
        else batch.delete(reference);
      }
    }
    batch.update(requestRef, {
      status: decision,
      reviewedAt: new Date().toISOString(),
      reviewerNote: String(reviewerNote || '').trim().slice(0, 500)
    });
    await requireRecentOwnerReauthentication(decision === 'approved'
      ? 'Approving this guest change request'
      : 'Denying this guest change request');
    await firestoreRequest('Resolving this change request failed.', () => batch.commit());

    if (decision === 'approved') {
      await this.init();
      await this.refreshGuestProjections();
    }
    return decision;
  }

  async refreshGuestProjections() {
    if (!await getCurrentOwner()) throw new Error('Owner sign-in is required to refresh guest data.');
    await requireRecentOwnerReauthentication('Refreshing the safe guest-data projections');
    const collections = ['publicEmployees', 'publicCustomers', 'publicShifts'];
    const snapshots = await Promise.all(collections.map(name =>
      firestoreRequest('Loading the existing guest-data projections failed.', () => firestoreGetDocs(collection(db, name)))
    ));
    const desired = new Map([
      ['publicEmployees', new Map([...this.employees].map(([id, employee]) => [id, publicEmployeeData(employee)]))],
      ['publicCustomers', new Map([...this.customers].map(([id, customer]) => [id, publicCustomerData(customer)]))],
      ['publicShifts', new Map(this.shifts.map(shift => [shift.id, publicShiftData(shift)]))]
    ]);
    const writes = [];
    collections.forEach((name, index) => {
      const records = desired.get(name);
      for (const [id, data] of records) writes.push({ type: 'set', ref: doc(db, name, id), data });
      for (const docSnap of snapshots[index].docs) {
        if (!records.has(docSnap.id)) writes.push({ type: 'delete', ref: doc(db, name, docSnap.id) });
      }
    });
    for (let offset = 0; offset < writes.length; offset += 450) {
      const batch = firestoreWriteBatch(db);
      for (const write of writes.slice(offset, offset + 450)) {
        if (write.type === 'set') batch.set(write.ref, write.data);
        else batch.delete(write.ref);
      }
      await firestoreRequest('Refreshing safe guest data failed.', () => batch.commit());
    }
    return {
      employees: this.employees.size,
      customers: this.customers.size,
      shifts: this.shifts.length,
      writes: writes.length
    };
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
    if (!this.isOwner) {
      const nextEntries = this.ledger.entries
        .filter(candidate => candidate.employeeId === (entry.employeeId || null) && candidate.id !== entryId)
        .sort((a, b) => Number(a.index || 0) - Number(b.index || 0));
      const operations = [operationForReference('delete', doc(db, 'ledgerRows', entryId))];
      nextEntries.forEach((candidate, index) => {
        const nextIndex = index + 1;
        if (candidate.index !== nextIndex) {
          operations.push(operationForReference('update', doc(db, 'ledgerRows', candidate.id), { index: nextIndex }));
        }
      });
      await submitPendingRequest(operations, 'batch');
    }
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
      const querySnapshot = await getDocs(collection(db, this.isOwner ? "employees" : "publicEmployees"));
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        this.employees.set(docSnap.id, new Employee(docSnap.id, data.name, this.isOwner ? data.wage : 0));
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
    if (this.isOwner) await tryUpdateGuestProjection(
      () => firestoreSetDoc(doc(db, 'publicEmployees', emp.id), publicEmployeeData(emp)),
      'employee create'
    );
    this.employees.set(emp.id, emp);
    return emp;
  }
  
  async updateEmployee(id, name, wage) {
    const employee = this.employees.get(id);
    if (!employee) throw new Error("Employee not found.");
    
    const cleanName = String(name ?? '').trim();
    const hasWage = String(wage ?? '').trim() !== '';
    const cleanWage = hasWage ? Number(wage) : null;
    if (!cleanName) throw new Error("Employee name cannot be empty.");
    if ((this.isOwner && !hasWage) || (hasWage && (!Number.isFinite(cleanWage) || cleanWage < 0))) {
      throw new Error("Employee wage must be a non-negative number.");
    }
    const duplicate = Array.from(this.employees.values()).some(
      candidate => candidate.id !== id && normalize(candidate.name) === normalize(cleanName)
    );
    if (duplicate) throw new Error("An employee with that name already exists.");
    
    const updates = { name: cleanName };
    if (hasWage) updates.wage = cleanWage;
    await updateDoc(doc(db, "employees", id), updates);
    if (this.isOwner) await tryUpdateGuestProjection(
      () => firestoreSetDoc(doc(db, 'publicEmployees', id), publicEmployeeData({ name: cleanName })),
      'employee update'
    );
    employee.name = cleanName;
    if (hasWage) employee.wage = cleanWage;
    return employee;
  }
  
  async deleteEmployee(id) {
    if (this.employees.has(id)) {
      await deleteDoc(doc(db, "employees", id));
      if (this.isOwner) await tryUpdateGuestProjection(
        () => firestoreDeleteDoc(doc(db, 'publicEmployees', id)),
        'employee delete'
      );
      this.employees.delete(id);
      return true;
    }
    return false;
  }
  
  // CUSTOMER --
  async loadCustomers() {
    this.customers.clear();
    try {
      const querySnapshot = await getDocs(collection(db, this.isOwner ? "customers" : "publicCustomers"));
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        this.customers.set(docSnap.id, new Customer(
          docSnap.id,
          data.name,
          data.location,
          this.isOwner ? data.note : null,
          this.isOwner ? data.billingRate : null
        ));
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
    if (this.isOwner) await tryUpdateGuestProjection(
      () => firestoreSetDoc(doc(db, 'publicCustomers', site.id), publicCustomerData(site)),
      'customer create'
    );
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
    
    const updates = { name: cleanName, location: cleanLocation };
    if (this.isOwner || cleanNote) updates.note = cleanNote;
    let cleanRate;
    if (billingRate !== undefined) {
      cleanRate = billingRate === null || billingRate === '' ? null : Number(billingRate);
      if (cleanRate !== null && (!Number.isFinite(cleanRate) || cleanRate < 0)) {
        throw new Error("Hourly billing rate must be a non-negative number.");
      }
      updates.billingRate = cleanRate;
    }
    
    await updateDoc(doc(db, "customers", id), updates);
    if (this.isOwner) {
      await tryUpdateGuestProjection(() => firestoreSetDoc(doc(db, 'publicCustomers', id), publicCustomerData({
        name: cleanName,
        location: cleanLocation
      })), 'customer update');
    }
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
      if (this.isOwner) await tryUpdateGuestProjection(
        () => firestoreDeleteDoc(doc(db, 'publicCustomers', id)),
        'customer delete'
      );
      this.customers.delete(id);
      return true;
    }
    return false;
  }
  
  // WORKSHIFT --
  async loadShifts() {
    this.shifts = [];
    try {
      const privateSnapshot = this.isOwner ? await getDocs(collection(db, 'shifts')) : null;
      let publicSnapshot;
      try {
        publicSnapshot = await firestoreGetDocs(collection(db, 'publicShifts'));
      } catch (error) {
        if (!this.isOwner) throw error;
        console.warn('Safe kiosk shifts are unavailable until the reviewed guest-access rules are deployed.', error?.code || error);
        publicSnapshot = { docs: [], forEach() {} };
      }
      const records = new Map();
      privateSnapshot?.forEach(docSnap => records.set(docSnap.id, docSnap.data()));
      this.privateShiftIds = new Set(records.keys());
      publicSnapshot.forEach(docSnap => {
        const publicData = docSnap.data();
        const privateData = records.get(docSnap.id) || {};
        records.set(docSnap.id, this.isOwner ? { ...privateData, ...publicData } : publicData);
      });
      records.forEach((data, shiftId) => {
        const emp = (this.employees && this.employees.get(data.employeeId)) || new Employee(data.employeeId, 'Unknown Employee', 0);
        const site = (this.customers && this.customers.get(data.custId)) || new Customer(data.custId, 'Unknown Site');
        const parsedBreaks = (data.breaks || []).map(b => ({ start: b.start ? new Date(b.start) : null, end: b.end ? new Date(b.end) : null }));
        const savedClockOut = data.clockOutTime ? new Date(data.clockOutTime) : null;
        if (savedClockOut) parsedBreaks.forEach(item => {
          if (item.start && !item.end) item.end = savedClockOut;
        });
        
        const shift = new WorkShift(
          emp,
          site,
          shiftId,
          this.isOwner ? data.note || null : null,
          this.isOwner ? data.isPaid : false,
          parsedBreaks,
          this.isOwner ? data.paidHours : null
        );
        
        shift.clockInTime = data.clockInTime ? new Date(data.clockInTime) : null;
        shift.clockOutTime = savedClockOut;
        
        this.shifts.push(shift);
      });
    } catch (e) {
      console.error("Error loading shifts from Firestore:", e);
      this.loadFailures.push(e);
    }
  }
  
  async saveShift(shift, { routine = false, action = '' } = {}) {
    const formattedBreaks = shift.breaks.map(b => ({
      start: b.start instanceof Date ? b.start.toISOString() : b.start,
      end: b.end instanceof Date ? b.end.toISOString() : b.end
    }));
    const shiftData = {
      employeeId: shift.employee ? shift.employee.id : null,
      custId: shift.customer ? shift.customer.id : null,
      clockInTime: shift.clockInTime ? shift.clockInTime.toISOString() : null,
      clockOutTime: shift.clockOutTime ? shift.clockOutTime.toISOString() : null,
      note: shift.note || null,
      isPaid: shift.isPaid || false,
      breaks: formattedBreaks,
      paidHours: Number.isFinite(shift.paidHours) ? shift.paidHours : null
    };
    const shiftRef = doc(db, "shifts", shift.id);
    if (!this.isOwner) {
      const publicData = publicShiftData(shiftData);
      const existing = this.shifts.find(candidate => candidate.id === shift.id);
      if (routine && existing) {
        const previous = publicShiftData(existing);
        if (action === 'clockOut' && previous.clockInTime && publicData.clockOutTime) {
          await firestoreRequest('Saving routine clock-out failed.', () =>
            firestoreUpdateDoc(doc(db, 'publicShifts', shift.id), { clockOutTime: publicData.clockOutTime }));
          return;
        }
        const sameExceptClockOut = previous.employeeId === publicData.employeeId &&
          previous.custId === publicData.custId && previous.clockInTime === publicData.clockInTime &&
          JSON.stringify(previous.breaks) === JSON.stringify(publicData.breaks) &&
          previous.clockOutTime === null && typeof publicData.clockOutTime === 'string';
        if (sameExceptClockOut) {
          await firestoreRequest('Saving routine clock-out failed.', () =>
            firestoreUpdateDoc(doc(db, 'publicShifts', shift.id), { clockOutTime: publicData.clockOutTime }));
          return;
        }

        const sameExceptBreaks = previous.employeeId === publicData.employeeId &&
          previous.custId === publicData.custId && previous.clockInTime === publicData.clockInTime &&
          previous.clockOutTime === publicData.clockOutTime;
        const changes = sameExceptBreaks ? { breaks: publicData.breaks } : publicData;
        await submitPendingRequest([operationForReference('update', shiftRef, changes)]);
      }
      const requestedData = { ...publicData };
      if (shiftData.note) requestedData.note = shiftData.note;
      await submitPendingRequest([operationForReference('set', shiftRef, requestedData)]);
    }
    if (routine) {
      await firestoreRequest('Saving routine clock activity failed.', () => firestoreSetDoc(shiftRef, shiftData));
    } else {
      await setDoc(shiftRef, shiftData);
    }
    if (this.isOwner) await tryUpdateGuestProjection(
      () => firestoreSetDoc(doc(db, 'publicShifts', shift.id), publicShiftData(shiftData)),
      'shift update'
    );
  }
  
  async saveShifts(shifts) {
    if (!Array.isArray(shifts) || shifts.length === 0) return;
    if (shifts.length > 500) throw new Error("A single clock-in batch cannot contain more than 500 shifts.");
    const ids = shifts.map(shift => String(shift.id));
    if (new Set(ids).size !== ids.length) throw new Error("A shift appears more than once in this clock-in batch.");
    const batch = firestoreWriteBatch(db);
    shifts.forEach(shift => {
      const formattedBreaks = (shift.breaks || []).map(b => ({
        start: b.start instanceof Date ? b.start.toISOString() : b.start,
        end: b.end instanceof Date ? b.end.toISOString() : b.end
      }));
      const shiftData = {
        employeeId: shift.employee ? shift.employee.id : null,
        custId: shift.customer ? shift.customer.id : null,
        clockInTime: shift.clockInTime ? shift.clockInTime.toISOString() : null,
        clockOutTime: shift.clockOutTime ? shift.clockOutTime.toISOString() : null,
        note: shift.note || null,
        isPaid: Boolean(shift.isPaid),
        breaks: formattedBreaks,
        paidHours: Number.isFinite(shift.paidHours) ? shift.paidHours : null
      };
      if (!this.isOwner) batch.set(doc(db, 'publicShifts', shift.id), publicShiftData(shiftData));
    });
    if (this.isOwner) {
      // Keep the established owner clock-in batch independent of optional guest rules.
      const ownerBatch = firestoreWriteBatch(db);
      shifts.forEach(shift => {
        const data = {
          employeeId: shift.employee ? shift.employee.id : null,
          custId: shift.customer ? shift.customer.id : null,
          clockInTime: shift.clockInTime ? shift.clockInTime.toISOString() : null,
          clockOutTime: shift.clockOutTime ? shift.clockOutTime.toISOString() : null,
          note: shift.note || null,
          isPaid: Boolean(shift.isPaid),
          breaks: (shift.breaks || []).map(item => ({
            start: item.start instanceof Date ? item.start.toISOString() : item.start,
            end: item.end instanceof Date ? item.end.toISOString() : item.end
          })),
          paidHours: Number.isFinite(shift.paidHours) ? shift.paidHours : null
        };
        ownerBatch.set(doc(db, 'shifts', shift.id), data);
      });
      await firestoreRequest('Clocking in the selected employees failed.', () => ownerBatch.commit());
      for (const shift of shifts) await tryUpdateGuestProjection(
        () => firestoreSetDoc(doc(db, 'publicShifts', shift.id), publicShiftData(shift)),
        'shift clock-in'
      );
    } else {
      await commitRoutineBatch(batch, 'Clocking in the selected employees failed.');
    }
  }
  
  async deleteShift(shiftId) {
    await deleteDoc(doc(db, "shifts", shiftId));
    if (this.isOwner) await tryUpdateGuestProjection(
      () => firestoreDeleteDoc(doc(db, 'publicShifts', shiftId)),
      'shift delete'
    );
    this.shifts = this.shifts.filter(s => s.id !== shiftId);
    this.privateShiftIds.delete(shiftId);
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
    
    const updates = {
      employeeId: employee.id,
      custId: customer.id,
      clockInTime: start.toISOString(),
      clockOutTime: end.toISOString(),
      note: note ? String(note).trim() : null,
      isPaid: Boolean(isPaid),
      breaks: normalizedBreaks.map(b => ({ start: b.start.toISOString(), end: b.end.toISOString() })),
      paidHours: nextPaidHours
    };
    if (!this.isOwner) {
      await submitPendingRequest([operationForReference('update', doc(db, 'shifts', shiftId), {
        employeeId: updates.employeeId,
        custId: updates.custId,
        clockInTime: updates.clockInTime,
        clockOutTime: updates.clockOutTime,
        breaks: updates.breaks,
        ...(updates.note ? { note: updates.note } : {})
      })]);
    }
    if (this.privateShiftIds.has(shiftId)) {
      await updateDoc(doc(db, "shifts", shiftId), updates);
    } else {
      await setDoc(doc(db, "shifts", shiftId), updates);
      this.privateShiftIds.add(shiftId);
    }
    if (this.isOwner) await tryUpdateGuestProjection(
      () => firestoreSetDoc(doc(db, 'publicShifts', shiftId), publicShiftData(updates)),
      'shift edit'
    );
    
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
      const billingRate = Object.prototype.hasOwnProperty.call(cust, 'billingRate') ?
        cust.billingRate :
        this.customers.get(id)?.billingRate ?? null;
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
          id: employee.id,
          name: employee.name,
          wage: employee.wage
        })),
        customers: [...this.customers.values()].map(customer => ({
          id: customer.id,
          name: customer.name,
          location: customer.location || null,
          note: customer.note || null,
          billingRate: customer.billingRate ?? null
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
        ...invoice.items.filter(item => item.shiftId).map(item => String(item.shiftId))
      ].map(String));
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
      employees: 'employees',
      customers: 'customers',
      shifts: 'shifts',
      invoices: 'invoices',
      payments: 'payments',
      plannedJobs: 'planned',
      ledger: 'ledgerRows'
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
    const nextDate = scheduledDate === null || scheduledDate === undefined || scheduledDate === '' ?
      null :
      scheduledDate instanceof Date ? scheduledDate : new Date(scheduledDate);
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
    opt.textContent = store.isOwner ? `${emp.name} -- ($${emp.wage}/hr)` : emp.name;
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

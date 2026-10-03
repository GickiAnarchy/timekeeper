import { changeHeader, roundTo15Minutes, formatTime24 } from './utils.js';
import { db } from './firebase.js';

/*
  Firebase Setup
*/

import {
  collection, 
  setDoc, 
  getDocs,
  doc, 
  updateDoc, 
  deleteDoc,
  writeBatch,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


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
  constructor(id, name, location, note = null) {
    this.id = id || crypto.randomUUID();
    this.name = name;
    this.location = location;
    this.note = note;
  }

  customInfo(maxLocLength = 15) {
    const noteString = this.note ? ` - ${this.note}` : '';
    let locString = '';
    
    if (this.location) {
      const truncated = this.location.length > maxLocLength 
        ? `${this.location.slice(0, maxLocLength - 2)}..` 
        : this.location;
      locString = ` - ${truncated}`;
    }
    
    return `${this.name}${locString}${noteString}`;
  }
}

export class WorkShift {
  constructor(employee, customer, id = null, note = null, isPaid = false, breaks = []) {
    this.id = id || crypto.randomUUID();
    this.employee = employee;
    this.customer = customer;
    this.clockInTime = null;
    this.clockOutTime = null;
    this.breaks = breaks;
    this.note = note;
    this.isPaid = isPaid;
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
    this.note = this.note ? `${this.note}\n${newnote}` : newnote;
  }

  get isComplete() {
    return Boolean(this.clockInTime && this.clockOutTime);
  }

  getHoursWorked() {
    if (!this.isComplete) return 0;
    const diffInMs = this.clockOutTime - this.clockInTime;
    const netMs = diffInMs - this.getTotalBreakTimeMs();
    return Number((Math.max(0, netMs) / (1000 * 60 * 60)).toFixed(2));
  }

  getShiftPay() {
    if (this.isPaid) return 0;
    return this.employee ? this.employee.getPay(this.getHoursWorked()) : 0;
  }
}

export class Invoice {
  constructor(cust, items = [], id = null, isPaid = false) {
    this.id = id || crypto.randomUUID();
    this.customer = cust;
    this.items = items;
    this.isPaid = Boolean(isPaid);
  }
  
  addItem(name, value) {
    this.items.push({ name, value: Number(value) });
  }
  
  deleteItem(name, value) {
    this.items = this.items.filter(i => !(i.name === name && i.value === value));
  }
  
  totalBill() {
    const total = this.items.reduce((sum, item) => sum + Number(item.value || 0), 0);
    return Number(total.toFixed(2));
  }
}

export class Ledger {
  constructor(emp = null, initialEntries = []) {
    this.employee = emp;
    this.entries = [];
    if (Array.isArray(initialEntries) && initialEntries.length > 0) {
      initialEntries.forEach(data => this.addEntry(data));
    }
  }

  addEntry(data = {}) {
    const entry = {
      id: data.id || crypto.randomUUID(),
      index: this.entries.length + 1,
      date: data.date ?? null,
      type: data.type ?? 'general',
      hours: data.hours != null ? Number(data.hours) : null,
      amount: data.amount != null ? Number(data.amount) : 0,
      notes: data.notes ?? null
    };

    this.entries.push(entry);
    return entry;
  }

  updateEntry(id, updates = {}) {
    const entry = this.getEntry(id);
    if (!entry) return null;

    if (updates.amount != null) updates.amount = Number(updates.amount);
    if (updates.hours != null) updates.hours = Number(updates.hours);

    Object.assign(entry, updates);
    return entry;
  }

  deleteEntry(id) {
    const indexToRemove = this.entries.findIndex(entry => entry.id === id);
    if (indexToRemove === -1) return false;

    this.entries.splice(indexToRemove, 1);
    this.reindex();
    return true;
  }

  getEntry(id) {
    return this.entries.find(entry => entry.id === id) || null;
  }

  reindex() {
    this.entries.forEach((entry, i) => {
      entry.index = i + 1;
    });
  }

  getTotal() {
    return this.entries.reduce((total, entry) => {
      const entryType = (entry.type || '').toLowerCase();
      const amt = entry.amount || 0;

      if (entryType === 'advance') return total - amt;
      return total + amt;
    }, 0);
  }

  toJSON() {
    return {
      employeeId: this.employee ? this.employee.id : null,
      entries: this.entries
    };
  }
}


/*
  DATA STORE
*/

export class AppDataStore {
  constructor() {
    this.employees = new Map();
    this.customers = new Map();
    this.shifts = [];
    this.invoices = [];
    this.ledgers = [];
    this.loadErrors = [];
  }

  reset() {
    this.employees.clear();
    this.customers.clear();
    this.shifts = [];
    this.invoices = [];
    this.ledgers = [];
    this.loadErrors = [];
  }

  async init() {
    this.loadErrors = [];
    changeHeader("Loading");
    await this.loadEmployees();
    await this.loadCustomers();
    await this.loadShifts();
    await this.loadInvoices();
    await this.loadAllLedgers();
    changeHeader();
    if (this.loadErrors.length > 0) {
      const failedCollections = [...new Set(this.loadErrors.map(({ collection }) => collection))];
      throw new Error(`Failed to load Firestore data: ${failedCollections.join(', ')}.`);
    }
  }

  // LEDGERS --
  getLedgerForEmployee(employeeId) {
    return this.ledgers.find(l => l.employee && l.employee.id === employeeId) || null;
  }

  async loadLedger(employeeId) {
    if (!employeeId) return null;

    const emp = this.employees.get(employeeId) || new Employee(employeeId, 'Unknown Employee', 0);
    const ledger = new Ledger(emp);

    try {
      const q = query(collection(db, "ledgerRows"), where("employeeId", "==", employeeId));
      const querySnapshot = await getDocs(q);
      const loadedEntries = [];
      
      querySnapshot.forEach((docSnap) => {
        loadedEntries.push({ ...docSnap.data(), id: docSnap.id });
      });

      loadedEntries.sort((a, b) => (a.index || 0) - (b.index || 0));
      loadedEntries.forEach(data => ledger.addEntry(data));

      // Update or add ledger to store list
      const existingIdx = this.ledgers.findIndex(l => l.employee && l.employee.id === employeeId);
      if (existingIdx !== -1) {
        this.ledgers[existingIdx] = ledger;
      } else {
        this.ledgers.push(ledger);
      }

      return ledger;
    } catch (e) {
      console.error("Error loading Ledger from Firestore:", e);
      this.loadErrors.push({ collection: "ledgerRows", error: e });
      return null;
    }
  }

  async loadAllLedgers() {
    this.ledgers = [];
    for (const [employeeId] of this.employees) {
      await this.loadLedger(employeeId);
    }
  }

  async saveLedgerEntry(employeeId, data) {
    let ledger = this.getLedgerForEmployee(employeeId);
    if (!ledger) {
      ledger = await this.loadLedger(employeeId);
    }

    const entry = ledger.addEntry(data);
    
    const payload = {
      ...entry,
      employeeId: employeeId
    };

    await setDoc(doc(db, "ledgerRows", entry.id), payload);
    return entry;
  }

  async updateLedgerEntry(employeeId, entryId, updates) {
    const ledger = this.getLedgerForEmployee(employeeId);
    if (!ledger) throw new Error("Ledger not found for employee.");

    const entry = ledger.updateEntry(entryId, updates);
    if (!entry) throw new Error("Ledger entry not found.");

    await updateDoc(doc(db, "ledgerRows", entryId), entry);
    return entry;
  }

  async deleteLedgerEntry(employeeId, entryId) {
    const ledger = this.getLedgerForEmployee(employeeId);
    if (!ledger) return;

    const isDeleted = ledger.deleteEntry(entryId);
    if (!isDeleted) return;

    await deleteDoc(doc(db, "ledgerRows", entryId));

    // Batch update remaining indexes
    const batch = writeBatch(db);
    ledger.entries.forEach((entry) => {
      const ref = doc(db, "ledgerRows", entry.id);
      batch.update(ref, { index: entry.index });
    });
    await batch.commit();
  }

  // INVOICE --
  async loadInvoices() {
    this.invoices = [];
    try {
      const querySnapshot = await getDocs(collection(db, "invoices"));
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const customer = this.customers.get(data.custId) || new Customer(data.custId, 'Unknown');
        const items = data.items || [];
        const isPaid = data.isPaid || false;
        
        this.invoices.push(new Invoice(customer, items, docSnap.id, isPaid));
      });
    } catch (e) {
      console.error("Error loading invoices from Firestore:", e);
      this.loadErrors.push({ collection: "invoices", error: e });
    }
  }
  
  async saveInvoice(invoice) {
    await setDoc(doc(db, "invoices", invoice.id), {
      custId: invoice.customer ? invoice.customer.id : null,
      items: invoice.items,
      isPaid: Boolean(invoice.isPaid)
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
      this.loadErrors.push({ collection: "employees", error: e });
    }
  }

  async addEmployee(name, wage) {
    const cleanName = name ? name.trim() : '';
    if (!cleanName) throw new Error("Employee name cannot be empty.");

    const isDuplicate = Array.from(this.employees.values()).some(
      (emp) => emp.name.toLowerCase() === cleanName.toLowerCase()
    );
    if (isDuplicate) return null;

    const emp = new Employee(null, cleanName, wage);
    await setDoc(doc(db, "employees", emp.id), {
      name: emp.name,
      wage: emp.wage
    });
    this.employees.set(emp.id, emp);
    
    // Initialize ledger for new employee
    this.ledgers.push(new Ledger(emp));
    return emp;
  }

  async deleteEmployee(id) {
    if (this.employees.has(id)) {
      await deleteDoc(doc(db, "employees", id));
      this.employees.delete(id);
      this.ledgers = this.ledgers.filter(l => !l.employee || l.employee.id !== id);
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
        this.customers.set(docSnap.id, new Customer(docSnap.id, data.name, data.location, data.note));
      });
    } catch (e) {
      console.error("Error loading customers from Firestore:", e);
      this.loadErrors.push({ collection: "customers", error: e });
    }
  }
  
  async addCustomer(name, location, note = null) {
    const cleanName = name ? name.trim() : '';
    if (!cleanName) throw new Error("Customer name cannot be empty.");

    const site = new Customer(null, cleanName, location ? location.trim() : null, note);
    await setDoc(doc(db, "customers", site.id), {
      name: site.name,
      location: site.location,
      note: site.note
    });
    this.customers.set(site.id, site);
    return site;
  }

  async updateCustomer(id, name, location, note) {
    const customer = this.customers.get(id);
    if (customer) {
      customer.name = name.trim();
      customer.location = location ? location.trim() : null;
      customer.note = note ? note.trim() : null;

      await updateDoc(doc(db, "customers", id), {
        name: customer.name,
        location: customer.location,
        note: customer.note
      });
      return true;
    }
    return false;
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
        const emp = this.employees.get(data.employeeId) || new Employee(data.employeeId, 'Unknown Employee', 0);
        const site = this.customers.get(data.custId) || new Customer(data.custId, 'Unknown Site');
        const parsedBreaks = (data.breaks || []).map(b => ({
          start: b.start ? new Date(b.start) : null, 
          end: b.end ? new Date(b.end) : null
        }));

        const shift = new WorkShift(emp, site, docSnap.id, data.note || null, data.isPaid, parsedBreaks);
        shift.clockInTime = data.clockInTime ? new Date(data.clockInTime) : null;
        shift.clockOutTime = data.clockOutTime ? new Date(data.clockOutTime) : null;
        
        this.shifts.push(shift);
      });
    } catch (e) {
      console.error("Error loading shifts from Firestore:", e);
      this.loadErrors.push({ collection: "shifts", error: e });
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
      breaks: formattedBreaks
    }); 
  }
  
  async deleteShift(shiftId) {
    await deleteDoc(doc(db, "shifts", shiftId));
    this.shifts = this.shifts.filter(s => s.id !== shiftId);
  }

  async updateShift(shiftId, employee, customer, clockInTime, clockOutTime, note = null, isPaid = false) {
    const shift = this.shifts.find(s => s.id === shiftId);
    if (!shift) throw new Error("Shift could not be found.");
    if (!employee || !customer) throw new Error("Please select an employee and customer.");

    const start = clockInTime instanceof Date ? clockInTime : new Date(clockInTime);
    const end = clockOutTime instanceof Date ? clockOutTime : new Date(clockOutTime);
    const formattedBreaks = shift.breaks.map(b => ({
      start: b.start instanceof Date ? b.start.toISOString() : b.start, 
      end: b.end instanceof Date ? b.end.toISOString() : b.end
    }));
    
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new Error("Please provide valid start and end times.");
    }
    if (end <= start) throw new Error("End time must be after start time.");

    shift.employee = employee;
    shift.customer = customer;
    shift.clockInTime = start;
    shift.clockOutTime = end;
    shift.note = note ? String(note).trim() : null;
    shift.isPaid = Boolean(isPaid);

    await updateDoc(doc(db, "shifts", shiftId), {
      employeeId: employee.id,
      custId: customer.id,
      clockInTime: start.toISOString(),
      clockOutTime: end.toISOString(),
      note: shift.note,
      isPaid: shift.isPaid,
      breaks: formattedBreaks
    });
    return shift;
  }

  getActiveShifts() {
    if (this.shifts) {
      return this.shifts.filter(s => s.clockInTime && !s.clockOutTime);
    }
  }

  hasActiveShifts() {
    return this.getActiveShifts().length > 0;
  }

  getActiveShiftCount() {
    return this.getActiveShifts().length;
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
      await setDoc(doc(db, "customers", id), { name: cust.name, location: cust.location, note: cust.note });
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
      isPaid: s.isPaid || null
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
        isPaid: shiftData.isPaid
      });
    }
    await this.loadShifts();
  }
}

export const store = new AppDataStore();

import { changeHeader, roundTo15Minutes, formatTime24 } from './utils.js';


/*
  Firebase Setup
*/

// 1. Import Firebase & Firestore Modular SDKs (CDN Links)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  setDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
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


/*
  HELPER FUNCTIONS
*/




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

  customInfo() {
    const noteString = this.note ? ` - ${this.note}` : '';
    const locString = this.location ? ` - ${this.location}` : '';
    return `${this.name}${noteString}${locString}`;
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
    const diffInMs = this.clockOutTime - this.clockInTime;
    const netMs = diffInMs - this.getTotalBreakTimeMs();
    return Number((Math.max(0, netMs) / (1000 * 60 * 60)).toFixed(2));
  }

  getShiftPay() {
    if (this.isPaid) return 0;
    return this.employee ? this.employee.getPay(this.getHoursWorked()) : 0;
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

export class Invoice {
  constructor(cust, items = [], id = null, isPaid = false) {
    this.id = id || crypto.randomUUID();
    this.customer = cust;
    this.items = items;
    this.isPaid = Boolean(isPaid);
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
    const entry = {
      id: data.id || crypto.randomUUID(),
      index: this.entries.length + 1,
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
    this.entries = this.entries.filter(entry => entry.id !== id);
    
    if (this.entries.length !== initialLength) {
      this.reindex();
      return true;
    }
    return false;
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
    this.isAdmin = null;
  }

  async init() {
    changeHeader("Loading");
    await this.loadEmployees();
    await this.loadCustomers();
    await this.loadShifts();
    await this.loadPayments();
    await this.loadInvoices();
    await this.loadLedger();
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
    }
  }

  async saveLedgerEntry(data) {
    const entry = this.ledger.addEntry(data);
    await setDoc(doc(db, "ledgerRows", entry.id), entry);
    return entry;
  }

  async updateLedgerEntry(entryId, updates) {
    const entry = this.ledger.updateEntry(entryId, updates);
    if (!entry) throw new Error("Ledger entry not found.");

    await updateDoc(doc(db, "ledgerRows", entryId), entry);
    return entry;
  }

  async deleteLedgerEntry(entryId) {
    const isDeleted = this.ledger.deleteEntry(entryId);
    if (!isDeleted) return;

    await deleteDoc(doc(db, "ledgerRows", entryId));

    // Batch update updated index numbers in Firestore efficiently
    const batch = writeBatch(db);
    this.ledger.entries.forEach((entry) => {
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
        const customer = (this.customers && this.customers.get(data.custId)) || new Customer(data.custId, 'Unknown');
        const items = data.items || [];
        const isPaid = data.isPaid || false;
        
        const inv = new Invoice(customer, items, docSnap.id, isPaid);
        
        this.invoices.push(inv);
      });
    } catch (e) {
      console.error("Error loading invoices from Firestore:", e);
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
        this.customers.set(docSnap.id, new Customer(docSnap.id, data.name, data.location, data.note));
      });
    } catch (e) {
      console.error("Error loading customers from Firestore:", e);
    }
  }
  
  async addCustomer(name, location, note = null) {
    const cleanName = normalize(name);
    const cleanLocation = normalize(location);
    if (!cleanName) throw new Error("Customer name cannot be empty.");

    const isDuplicate = Array.from(this.customers.values()).some(
      (site) => normalize(site.name) === cleanName && normalize(site.location) === cleanLocation
    );
    if (isDuplicate) return null;

    const site = new Customer(null, name.trim(), location ? location.trim() : null, note);
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
        const emp = (this.employees && this.employees.get(data.employeeId)) || new Employee(data.employeeId, 'Unknown Employee', 0);
        const site = (this.customers && this.customers.get(data.custId)) || new Customer(data.custId, 'Unknown Site');
        const parsedBreaks = (data.breaks || []).map(b => ({start: b.start ? new Date(b.start) : null, end: b.end ? new Date(b.end) : null}));

        const shift = new WorkShift(emp, site, docSnap.id, data.note || null, data.isPaid, parsedBreaks);

        shift.clockInTime = data.clockInTime ? new Date(data.clockInTime) : null;
        shift.clockOutTime = data.clockOutTime ? new Date(data.clockOutTime) : null;
        
        this.shifts.push(shift);
      });
    } catch (e) {
      console.error("Error loading shifts from Firestore:", e);
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



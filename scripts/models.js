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
  deleteDoc 
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

//Normalizes the name string
const normalize = (str) => (str ? str.trim().toLowerCase() : '');

//Formats the datetime object
export const toLocalISO = (date) => {
  if (!date) return '';
  const off = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - off).toISOString().slice(0, 16);
};

//JSON downloader
const downloadJSON = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
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
  constructor(id, name, location, note = null) {
    this.id = id || crypto.randomUUID();
    this.name = name;
    this.location = location;
    this.note = note;
  }

  customInfo() {
    const noteString = this.note ? ` - ${this.note}` : '';
    return `${this.name}${noteString} - ${this.location}`;
  }
}

export class WorkShift {
  constructor(employee, customer, id = null, note = null, isPaid = false) {
    this.id = id || crypto.randomUUID();
    this.employee = employee;
    this.customer = customer;
    
    this.clockInTime = null;
    this.clockOutTime = null;
    
    this.note = note;
    this.isPaid = isPaid;
  }

  startShift() {
    this.clockInTime = new Date();
    this.clockOutTime = null;
  }

  stopShift() {
    if (!this.clockInTime) return;
    this.clockOutTime = new Date();
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
    return Number((diffInMs / (1000 * 60 * 60)).toFixed(2));
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



/*
  DATA STORE
*/

export class AppDataStore {
  constructor() {
    this.employees = new Map();
    this.customers = new Map();
    this.payments = []
    this.shifts = [];
    this.isAdmin = null;
  }

  async init() {
    await this.loadEmployees();
    await this.loadCustomers();
    await this.loadShifts();
    await this.loadPayments();
  }

  //  EMPLOYEE --
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

  //  CUSTOMER --
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

        const shift = new WorkShift(emp, site, docSnap.id, data.note || null, data.isPaid);

        shift.clockInTime = data.clockInTime ? new Date(data.clockInTime) : null;
        shift.clockOutTime = data.clockOutTime ? new Date(data.clockOutTime) : null;
        
        this.shifts.push(shift);
      });
    } catch (e) {
      console.error("Error loading shifts from Firestore:", e);
    }
  }

  async saveShift(shift) {
    await setDoc(doc(db, "shifts", shift.id), {
      employeeId: shift.employee ? shift.employee.id : null,
      custId: shift.customer ? shift.customer.id : null,
      clockInTime: shift.clockInTime ? shift.clockInTime.toISOString() : null,
      clockOutTime: shift.clockOutTime ? shift.clockOutTime.toISOString() : null,
      note: shift.note || null,
      isPaid: shift.isPaid || false
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
      isPaid: shift.isPaid
    });
    return shift;
  }

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

export function populateEmployeeDropdowns(empDropdownElement) {
  empDropdownElement.innerHTML = '<option value="">--Employee--</option>';
  store.employees.forEach((emp) => {
    const opt = document.createElement('option');
    opt.value = emp.id;
    opt.textContent = `${emp.name} -- ($${emp.wage}/hr)`;
    empDropdownElement.appendChild(opt);
  });
  console.log("populated employees");
  }
  
export function populateCustomerDropdowns(custDropdownElement) {
  custDropdownElement.innerHTML = '<option value="">--Customer--</option>';
  store.customers.forEach((cust) => {
    const opt = document.createElement('option');
    opt.value = cust.id;
    opt.textContent = cust.customInfo();
    custDropdownElement.appendChild(opt);
  });
  console.log("populated customers");
}


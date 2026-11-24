import { LocalStoragePersistence } from './local-persistence.js';
import { ShiftService } from './services/shift-service.js';

const $ = selector => document.querySelector(selector);
const statusNode = $('#app-status');
const employeeForm = $('#employee-form');
const customerForm = $('#customer-form');
const clockForm = $('#clock-in-form');
const employeeSelect = $('#clock-employee');
const customerSelect = $('#clock-customer');
const clockInButton = $('#clock-in-button');
const employeeList = $('#employee-list');
const customerList = $('#customer-list');
const activeShifts = $('#active-shifts');
const shiftHistory = $('#shift-history');
const payrollLedger = $('#payroll-ledger');

let service;

function node(tag, className = '', text = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function setStatus(message, isError = false) {
  statusNode.textContent = message;
  statusNode.classList.toggle('is-error', isError);
}

function money(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value) || 0);
}

function dateTime(value) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

function fillSelect(select, records, placeholder, selectedValue) {
  select.replaceChildren(new Option(placeholder, ''));
  for (const record of records) select.add(new Option(record.name, record.id));
  if (records.some(record => record.id === selectedValue)) select.value = selectedValue;
}

function emptyMessage(text) {
  return node('p', 'empty-state', text);
}

function renderDirectories(state) {
  employeeList.replaceChildren();
  customerList.replaceChildren();
  if (!state.employees.length) employeeList.append(emptyMessage('No employees saved yet.'));
  for (const employee of state.employees) {
    const row = node('li');
    row.append(node('span', '', employee.name), node('small', '', `${money(employee.wage)} / hour payroll`));
    employeeList.append(row);
  }
  if (!state.customers.length) customerList.append(emptyMessage('No customers saved yet.'));
  for (const customer of state.customers) {
    const row = node('li');
    row.append(node('span', '', customer.name), node('small', '', `${money(customer.hourlyRate)} / hour billing only`));
    customerList.append(row);
  }

  const selectedEmployee = employeeSelect.value;
  const selectedCustomer = customerSelect.value;
  fillSelect(employeeSelect, state.employees, 'Choose an employee', selectedEmployee);
  fillSelect(customerSelect, state.customers, 'Choose a customer / job', selectedCustomer);
  clockInButton.disabled = !employeeSelect.value || !customerSelect.value || Boolean(service.getActiveShiftForEmployee(employeeSelect.value));
}

function renderActive(state) {
  activeShifts.replaceChildren();
  const active = state.shifts.filter(shift => !shift.endTime);
  if (!active.length) {
    activeShifts.append(emptyMessage('No active shifts. Choose an employee and customer above to clock in.'));
    return;
  }

  for (const shift of active) {
    const employee = state.employees.find(record => record.id === shift.employeeId);
    const customer = state.customers.find(record => record.id === shift.customerId);
    const card = node('article', 'record-card');
    card.append(node('h3', '', `${employee?.name || 'Unknown employee'} · ${customer?.name || 'Unknown customer'}`));
    card.append(node('p', '', `Clocked in ${dateTime(shift.startTime)}. Payroll uses this employee’s saved wage.`));

    const form = node('form');
    const label = node('label', '', 'Break taken (minutes; 15-minute steps)');
    const input = node('input');
    input.type = 'number';
    input.name = 'breakDurationMinutes';
    input.min = '0';
    input.step = '15';
    input.value = '0';
    input.required = true;
    label.append(input);
    const button = node('button', '', 'Clock out & post payroll');
    button.type = 'submit';
    form.append(label, button);
    form.addEventListener('submit', event => {
      event.preventDefault();
      try {
        const result = service.stopShift(shift.employeeId, { breakDurationMinutes: Number(input.value) });
        setStatus(`Shift completed: ${result.ledgerEntry.hours.toFixed(2)} paid hours, ${money(result.ledgerEntry.amount)} added to ${employee?.name || 'the employee'}’s ledger.`);
        render();
      } catch (error) {
        setStatus(error.message, true);
      }
    });
    card.append(form);
    activeShifts.append(card);
  }
}

function renderHistory(state) {
  shiftHistory.replaceChildren();
  const completed = state.shifts.filter(shift => shift.endTime).slice().sort((a, b) => b.endTime.localeCompare(a.endTime));
  if (!completed.length) {
    shiftHistory.append(emptyMessage('Completed shifts will appear here.'));
    return;
  }
  for (const shift of completed) {
    const employee = state.employees.find(record => record.id === shift.employeeId);
    const customer = state.customers.find(record => record.id === shift.customerId);
    const payroll = state.ledgerEntries.find(entry => entry.sourceShiftId === shift.id);
    const card = node('article', 'record-card');
    card.append(node('h3', '', `${employee?.name || 'Unknown employee'} · ${customer?.name || 'Unknown customer'}`));
    card.append(node('p', '', `${dateTime(shift.startTime)} – ${dateTime(shift.endTime)}`));
    card.append(node('p', '', `${Number(shift.paidHours).toFixed(2)} paid hours · ${shift.breakDurationMinutes} break minutes`));
    card.append(node('p', 'record-amount', payroll ? money(payroll.amount) : 'Payroll entry missing'));
    shiftHistory.append(card);
  }
}

function renderLedger(state) {
  payrollLedger.replaceChildren();
  const entries = state.ledgerEntries.slice().sort((a, b) => `${b.date}${b.id}`.localeCompare(`${a.date}${a.id}`));
  if (!entries.length) {
    payrollLedger.append(emptyMessage('A payroll ledger entry is added when a shift is completed.'));
    return;
  }
  for (const entry of entries) {
    const employee = state.employees.find(record => record.id === entry.employeeId);
    const card = node('article', 'record-card');
    card.append(node('h3', '', employee?.name || 'Unknown employee'));
    card.append(node('p', '', `${entry.date} · ${entry.note}`));
    card.append(node('p', '', `${Number(entry.hours).toFixed(2)} hours · Source shift ${entry.sourceShiftId}`));
    card.append(node('p', 'record-amount', money(entry.amount)));
    payrollLedger.append(card);
  }
}

function render() {
  const state = service.getSnapshot();
  renderDirectories(state);
  renderActive(state);
  renderHistory(state);
  renderLedger(state);
}

employeeForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(employeeForm);
  try {
    const employee = service.addEmployee(formData.get('name'), formData.get('wage'));
    employeeForm.reset();
    render();
    employeeSelect.value = employee.id;
    setStatus(`${employee.name} saved with a payroll wage of ${money(employee.wage)} per hour.`);
    renderDirectories(service.getSnapshot());
  } catch (error) {
    setStatus(error.message, true);
  }
});

customerForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(customerForm);
  try {
    const customer = service.addCustomer(formData.get('name'), formData.get('hourlyRate'));
    customerForm.reset();
    render();
    customerSelect.value = customer.id;
    setStatus(`${customer.name} saved. Its hourly rate is for customer billing only.`);
    renderDirectories(service.getSnapshot());
  } catch (error) {
    setStatus(error.message, true);
  }
});

clockForm.addEventListener('submit', event => {
  event.preventDefault();
  try {
    const shift = service.startShift({ employeeId: employeeSelect.value, customerId: customerSelect.value });
    setStatus(`Shift started at ${dateTime(shift.startTime)}.`);
    render();
  } catch (error) {
    setStatus(error.message, true);
    render();
  }
});

employeeSelect.addEventListener('change', () => {
  clockInButton.disabled = !employeeSelect.value || !customerSelect.value || Boolean(service.getActiveShiftForEmployee(employeeSelect.value));
});
customerSelect.addEventListener('change', () => {
  clockInButton.disabled = !employeeSelect.value || !customerSelect.value || Boolean(service.getActiveShiftForEmployee(employeeSelect.value));
});

try {
  // The app has one explicit persistence adapter, and it stays inside this browser profile.
  service = new ShiftService({ persistence: new LocalStoragePersistence() });
  render();
} catch (error) {
  setStatus(error.message, true);
  for (const button of document.querySelectorAll('button')) button.disabled = true;
}

import {
  actualShiftHours,
  invoiceShiftIds,
  ledgerBalanceCents
} from './domain.mjs';

function dateOnly(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date : null;
}

function localDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function idOf(value) {
  return value === null || value === undefined || value === '' ? '' : String(value);
}

function asDate(value) {
  if (value instanceof Date) {
    const copy = new Date(value);
    return Number.isNaN(copy.getTime()) ? null : copy;
  }
  if (value && typeof value.toDate === 'function') return asDate(value.toDate());
  if (value === null || value === undefined || value === '') return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function arrayValue(value) {
  return Array.isArray(value) ? value : [];
}

function employeeIdOf(shift) {
  return idOf(shift?.employeeId ?? shift?.employee?.id);
}

function employeeNameOf(shift, employeeMap) {
  const id = employeeIdOf(shift);
  return shift?.employeeName ?? shift?.employee?.name ?? employeeMap.get(id)?.name ?? (id ? 'Unknown employee' : 'Unassigned employee');
}

function customerIdOf(shift) {
  return idOf(shift?.customerId ?? shift?.customer?.id);
}

function customerNameOf(shift) {
  return shift?.customerName ?? shift?.customer?.name ?? (customerIdOf(shift) ? 'Unknown customer' : '');
}

function customerRateOf(shift) {
  return shift?.billingRate ?? shift?.customerBillingRate ?? shift?.customer?.billingRate;
}

function emptyResult() {
  return {
    shifts: [], employees: [],
    totals: { shiftCount: 0, actualHours: 0, paidHours: 0, paidShiftCount: 0, unpaidShiftCount: 0, unpaidHours: 0, invoiceReadyCount: 0, invoiceReadyHours: 0, invoiceReadyCents: 0 },
    activeShiftCount: 0,
    invalidShiftCount: 0
  };
}

export function currentWeekRange(now = new Date()) {
  const date = asDate(now);
  if (!date) throw new TypeError('A valid date is required.');
  const day = date.getDay();
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (day === 0 ? 6 : day - 1));
  const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
  return { startDate: localDateKey(monday), endDate: localDateKey(sunday) };
}

export function buildPayPeriodReview({
  shifts = [], employees = [], ledgerEntries = [], ledgerArchiveRows = [], invoices = [], startDate, endDate, employeeId = ''
} = {}) {
  const start = dateOnly(startDate);
  const end = dateOnly(endDate);
  if (!start || !end) throw new TypeError('Choose valid From and Through dates (YYYY-MM-DD).');
  if (end < start) throw new RangeError('The Through date must be on or after the From date.');

  const result = emptyResult();
  const employeeFilter = idOf(employeeId);
  const employeeList = employees instanceof Map ? [...employees.values()] : arrayValue(employees);
  const employeeMap = new Map(employeeList.map(employee => [idOf(employee?.id), employee]));
  const activeLedger = arrayValue(ledgerEntries);
  const archiveRows = arrayValue(ledgerArchiveRows);
  const ledgerStatusByShift = new Map();
  for (const entry of archiveRows) {
    const id = idOf(entry?.sourceShiftId);
    if (id && !ledgerStatusByShift.has(id)) ledgerStatusByShift.set(id, 'Archived ledger');
  }
  for (const entry of activeLedger) {
    const id = idOf(entry?.sourceShiftId);
    if (id) ledgerStatusByShift.set(id, 'Active ledger');
  }
  const invoiceByShift = new Map();
  for (const invoice of arrayValue(invoices)) {
    const ids = invoiceShiftIds(invoice);
    for (const id of ids) {
      if (!invoiceByShift.has(id)) invoiceByShift.set(id, []);
      invoiceByShift.get(id).push(invoice);
    }
  }

  const inRange = key => key >= startDate && key <= endDate;
  const summaryIds = new Set(employeeList.map(employee => idOf(employee?.id)));
  activeLedger.forEach(entry => summaryIds.add(idOf(entry?.employeeId)));
  archiveRows.forEach(entry => summaryIds.add(idOf(entry?.employeeId)));
  const consideredShifts = [];
  for (const shift of arrayValue(shifts)) {
    const shiftEmployeeId = employeeIdOf(shift);
    summaryIds.add(shiftEmployeeId);
    const clockIn = asDate(shift?.clockInTime);
    if (!clockIn || !inRange(localDateKey(clockIn)) || (employeeFilter && shiftEmployeeId !== employeeFilter)) continue;
    const clockOutValue = shift?.clockOutTime;
    const hasEnd = clockOutValue !== null && clockOutValue !== undefined && clockOutValue !== '';
    const clockOut = asDate(clockOutValue);
    if (!clockOut && !hasEnd) { result.activeShiftCount++; continue; }
    if (!clockOut || clockOut <= clockIn) { result.invalidShiftCount++; continue; }
    const actualHours = actualShiftHours(clockIn, clockOut, shift?.breaks);
    const paidHours = Number.isFinite(shift?.paidHours) ? Number(shift.paidHours) : actualHours;
    const id = idOf(shift?.id);
    const linkedInvoices = invoiceByShift.get(id) || [];
    const customerId = customerIdOf(shift);
    const rawRate = customerRateOf(shift);
    const rate = Number(rawRate);
    const hasRate = rawRate !== null && rawRate !== undefined && rawRate !== '' && Number.isFinite(rate) && rate >= 0;
    let invoiceStatus = 'Missing customer';
    let invoiceCents = 0;
    if (linkedInvoices.length) {
      invoiceStatus = 'Linked';
      for (const invoice of linkedInvoices) {
        for (const item of arrayValue(invoice?.items)) {
          if (idOf(item?.shiftId) === id && Number.isFinite(Number(item?.value))) invoiceCents += Math.round(Number(item.value) * 100);
        }
      }
    } else if (customerId && hasRate) {
      invoiceStatus = 'Ready';
      invoiceCents = Math.round(actualHours * rate * 100);
    } else if (customerId) {
      invoiceStatus = 'Missing billing rate';
    }
    consideredShifts.push({
      id: shift?.id, employeeId: shiftEmployeeId, employeeName: employeeNameOf(shift, employeeMap), customerName: customerNameOf(shift),
      start: new Date(clockIn), actualHours, paidHours, isPaid: Boolean(shift?.isPaid),
      ledgerStatus: ledgerStatusByShift.get(id) || 'Not linked', invoiceStatus, invoiceCents
    });
  }

  result.shifts = consideredShifts.sort((a, b) => b.start - a.start);
  result.shifts.forEach(row => {
    result.totals.shiftCount++;
    result.totals.actualHours += row.actualHours;
    result.totals.paidHours += row.paidHours;
    if (row.isPaid) result.totals.paidShiftCount++; else { result.totals.unpaidShiftCount++; result.totals.unpaidHours += row.paidHours; }
    if (row.invoiceStatus === 'Ready') { result.totals.invoiceReadyCount++; result.totals.invoiceReadyHours += row.actualHours; result.totals.invoiceReadyCents += row.invoiceCents; }
  });

  const summaryOrder = employeeFilter ? [employeeFilter] : [...summaryIds];
  result.employees = summaryOrder.filter(id => !employeeFilter || id === employeeFilter).map(id => {
    const employee = employeeMap.get(id);
    const rows = result.shifts.filter(row => row.employeeId === id);
    const entries = activeLedger.filter(entry => idOf(entry?.employeeId) === id);
    return {
      id, name: employee?.name ?? (id ? (rows[0]?.employeeName || 'Unknown employee') : 'Unassigned employee'),
      shiftCount: rows.length, actualHours: rows.reduce((sum, row) => sum + row.actualHours, 0), paidHours: rows.reduce((sum, row) => sum + row.paidHours, 0),
      unpaidHours: rows.filter(row => !row.isPaid).reduce((sum, row) => sum + row.paidHours, 0), balanceCents: ledgerBalanceCents(entries), ledgerEntryCount: entries.length
    };
  });
  result.employees.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}

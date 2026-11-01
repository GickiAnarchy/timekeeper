import { store } from './models.js';
import {
  actualShiftHours,
  invoiceShiftIds,
  ledgerBalanceCents
} from './domain.mjs';

// Keep the calculation and data-loading rules with this page's entrypoint. The
// loader below intentionally uses only the six read methods; it must not call
// store.init(), which can resume or create ledger archives.
// PAY-PERIOD REVIEW CALCULATIONS
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
// END PAY-PERIOD REVIEW CALCULATIONS

// PAY-PERIOD READ-ONLY DATA LOADER
export async function loadPayPeriodReviewData(store) {
  store.loadFailures = [];
  await store.loadEmployees();
  await store.loadCustomers();
  await store.loadShifts();
  await store.loadInvoices();
  await store.loadLedger();
  await store.loadLedgerArchives();
  // Existing loaders report failures instead of throwing. Never show a partial
  // snapshot as a complete review (especially an apparently zero ledger balance).
  if (store.loadFailures.length) {
    throw new Error('Some review data could not be loaded. No totals are shown; refresh to try again.');
  }
  return {
    employees: [...store.employees.values()],
    shifts: store.shifts,
    invoices: store.invoices,
    ledgerEntries: store.ledger.entries,
    ledgerArchiveRows: store.ledgerArchiveRows
  };
}
// END PAY-PERIOD READ-ONLY DATA LOADER

const hours = value => Number(value).toFixed(2);
const money = cents => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(cents / 100);
const dateFormat = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function emptyRow(body, columns, text) {
  const row = element('tr');
  const cell = element('td', text, 'review-empty');
  cell.colSpan = columns;
  row.append(cell);
  body.append(row);
}

function reviewCard(title, subtitle, fields) {
  const card = element('details', undefined, 'review-mobile-card');
  const summary = element('summary');
  summary.append(element('strong', title), element('span', subtitle));
  const details = element('dl', undefined, 'review-mobile-fields');
  for (const [label, value, className = ''] of fields) {
    const field = element('div');
    field.append(element('dt', label), element('dd', value, className));
    details.append(field);
  }
  card.append(summary, details);
  return card;
}

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('review-filters');
  const start = document.getElementById('review-start');
  const end = document.getElementById('review-end');
  const employee = document.getElementById('review-employee');
  const results = document.getElementById('review-results');
  const status = document.getElementById('review-status');
  const error = document.getElementById('review-error');
  const refresh = document.getElementById('review-refresh');
  const apply = document.getElementById('review-apply');
  const thisWeek = document.getElementById('review-this-week');
  const lastWeek = document.getElementById('review-last-week');
  let snapshot = null;
  let loadedAt = '';

  function setRange(now) {
    const range = currentWeekRange(now);
    start.value = range.startDate;
    end.value = range.endDate;
  }
  setRange(new Date());

  function render() {
    if (!snapshot) return;
    error.hidden = true;
    results.hidden = true;
    try {
      const review = buildPayPeriodReview({ ...snapshot, startDate: start.value, endDate: end.value, employeeId: employee.value });
      const totals = review.totals;
      const metrics = document.getElementById('review-metrics');
      metrics.replaceChildren();
      for (const [title, value, note] of [
        ['Completed work', `${hours(totals.actualHours)} h`, `${totals.shiftCount} completed shifts · breaks deducted`],
        ['Pay hours', `${hours(totals.paidHours)} h`, 'Includes paid and unpaid shifts'],
        ['Not marked paid', `${hours(totals.unpaidHours)} h`, `${totals.unpaidShiftCount} unpaid · ${totals.paidShiftCount} marked paid`],
        ['Invoice-ready estimate', money(totals.invoiceReadyCents), `${totals.invoiceReadyCount} shifts · ${hours(totals.invoiceReadyHours)} actual h`]
      ]) {
        const card = element('article', undefined, 'review-metric');
        card.append(element('p', title), element('strong', value), element('small', note));
        metrics.append(card);
      }

      const people = document.getElementById('review-people');
      const peopleMobile = document.getElementById('review-people-mobile');
      people.replaceChildren();
      peopleMobile.replaceChildren();
      for (const person of review.employees) {
        const row = element('tr');
        const balance = element('td', money(person.balanceCents));
        balance.append(element('small', `${person.ledgerEntryCount} active entries · all dates`));
        row.append(element('td', person.name), element('td', person.shiftCount), element('td', hours(person.actualHours)), element('td', hours(person.paidHours)), element('td', hours(person.unpaidHours)), balance);
        people.append(row);
        peopleMobile.append(reviewCard(person.name, `${money(person.balanceCents)} current ledger balance`, [
          ['Shifts', String(person.shiftCount)],
          ['Actual hours', `${hours(person.actualHours)} h`],
          ['Pay hours', `${hours(person.paidHours)} h`],
          ['Not marked paid', `${hours(person.unpaidHours)} h`],
          ['Current ledger balance', `${money(person.balanceCents)} · ${person.ledgerEntryCount} active entries · all dates`]
        ]));
      }
      if (!review.employees.length) {
        emptyRow(people, 6, 'No employees or ledger balances to review.');
        peopleMobile.append(element('p', 'No employees or ledger balances to review.', 'review-mobile-empty'));
      }

      const shifts = document.getElementById('review-shifts');
      const shiftsMobile = document.getElementById('review-shifts-mobile');
      shifts.replaceChildren();
      shiftsMobile.replaceChildren();
      for (const shift of review.shifts) {
        const row = element('tr');
        const person = element('td', shift.employeeName);
        person.append(element('small', shift.customerName));
        row.append(
          element('td', dateFormat.format(shift.start)), person,
          element('td', hours(shift.actualHours)), element('td', hours(shift.paidHours)),
          element('td', shift.isPaid ? 'Marked paid' : 'Not marked paid', shift.isPaid ? '' : 'review-needs-attention'),
          element('td', shift.ledgerStatus),
          element('td', shift.invoiceStatus, shift.invoiceStatus === 'Ready' ? 'review-ready' : shift.invoiceStatus.startsWith('Missing') ? 'review-needs-attention' : ''),
          element('td', shift.invoiceStatus === 'Ready' ? money(shift.invoiceCents) : '—')
        );
        shifts.append(row);
        const paymentStatus = shift.isPaid ? 'Marked paid' : 'Not marked paid';
        const invoiceClass = shift.invoiceStatus === 'Ready' ? 'review-ready' : shift.invoiceStatus.startsWith('Missing') ? 'review-needs-attention' : '';
        shiftsMobile.append(reviewCard(`${shift.employeeName} · ${shift.customerName}`, `${dateFormat.format(shift.start)} · ${paymentStatus}`, [
          ['Started', dateFormat.format(shift.start)],
          ['Employee', shift.employeeName],
          ['Customer', shift.customerName || 'Not set'],
          ['Actual hours', `${hours(shift.actualHours)} h`],
          ['Pay hours', `${hours(shift.paidHours)} h`],
          ['Payment status', paymentStatus, shift.isPaid ? '' : 'review-needs-attention'],
          ['Ledger link', shift.ledgerStatus],
          ['Invoice status', shift.invoiceStatus, invoiceClass],
          ['Ready estimate', shift.invoiceStatus === 'Ready' ? money(shift.invoiceCents) : '—']
        ]));
      }
      if (!review.shifts.length) {
        const message = 'No completed shifts in this period for the selected employee filter. Current ledger balances are still shown above.';
        emptyRow(shifts, 8, message);
        shiftsMobile.append(element('p', message, 'review-mobile-empty'));
      }

      const warnings = [];
      if (review.activeShiftCount) warnings.push(`${review.activeShiftCount} active shift(s) started in this period are excluded from totals.`);
      if (review.invalidShiftCount) warnings.push(`${review.invalidShiftCount} shift(s) with invalid completion times were excluded.`);
      const blocked = review.shifts.filter(shift => shift.invoiceStatus.startsWith('Missing')).length;
      if (blocked) warnings.push(`${blocked} unlinked shift(s) need a customer or billing rate before invoicing.`);
      const pendingArchives = store.ledgerArchives.filter(archive => archive.status === 'pending' && (!employee.value || String(archive.employeeId) === employee.value)).length;
      if (pendingArchives) warnings.push(`${pendingArchives} ledger archive(s) are pending. Current balances may include entries awaiting archival; this review does not finish archiving.`);
      const warning = document.getElementById('review-warnings');
      warning.textContent = warnings.join(' ');
      warning.hidden = !warnings.length;
      status.textContent = `${start.value} through ${end.value} · ${employee.selectedOptions[0]?.textContent || 'All employees'} · Data loaded ${loadedAt}. Refresh for changes.`;
      results.hidden = false;
    } catch (problem) {
      error.textContent = problem.message || 'Choose a valid date range to review.';
      error.hidden = false;
      status.textContent = 'Review not shown. Check the selected dates.';
    }
  }

  async function load() {
    snapshot = null;
    results.hidden = true;
    error.hidden = true;
    status.textContent = 'Loading review data…';
    for (const control of [apply, refresh, thisWeek, lastWeek, start, end, employee]) control.disabled = true;
    try {
      snapshot = await loadPayPeriodReviewData(store);
      loadedAt = new Date().toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
      const selected = employee.value;
      employee.replaceChildren(new Option('All employees', ''));
      // Include orphaned employee IDs so old shifts and balances remain reviewable.
      const summaries = buildPayPeriodReview({ ...snapshot, ...currentWeekRange() }).employees;
      for (const person of summaries) {
        if (person.id) employee.add(new Option(person.name, person.id));
      }
      employee.value = [...employee.options].some(option => option.value === selected) ? selected : '';
      render();
    } catch (problem) {
      snapshot = null;
      results.hidden = true;
      status.textContent = 'Review unavailable. No partial totals are shown.';
      error.textContent = problem.message || 'Could not load review data. Refresh to try again.';
      error.hidden = false;
    } finally {
      refresh.disabled = false;
      for (const control of [apply, thisWeek, lastWeek, start, end, employee]) control.disabled = !snapshot;
    }
  }

  form.addEventListener('submit', event => { event.preventDefault(); render(); });
  // Hide the previous result immediately when filters change, preventing stale
  // totals from appearing to describe a newly selected range or employee.
  for (const control of [start, end, employee]) control.addEventListener('change', () => {
    results.hidden = true;
    status.textContent = 'Filters changed. Choose Review period to update the totals.';
    error.hidden = true;
  });
  thisWeek.addEventListener('click', () => { setRange(new Date()); render(); });
  lastWeek.addEventListener('click', () => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    setRange(date);
    render();
  });
  refresh.addEventListener('click', load);
  await load();
});

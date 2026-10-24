// Original L1: Loads the named module so its side effects or exports are available to this page.
import {
// Original L2: Supplies another named imported value in the module dependency list, giving this page access to that helper.
  actualShiftHours,
// Original L3: Supplies another named imported value in the module dependency list, giving this page access to that helper.
  invoiceShiftIds,
// Original L4: Continues the surrounding pay-period-review.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
  ledgerBalanceCents
// Original L5: Completes this application statement, applying the shown value or operation to the current page state/data record.
} from './domain.mjs';
// Original L6: Blank line separates related statements and has no runtime effect.

// Original L7: Defines the private helper dateOnly for this page; keeping it local prevents unrelated pages from depending on UI details.
function dateOnly(value) {
// Original L8: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
// Original L9: Stores destructured values, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const [year, month, day] = value.split('-').map(Number);
// Original L10: Stores date, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const date = new Date(year, month - 1, day);
// Original L11: Returns checks uses checks that calls `date.getDate` with no arguments and `day` (day) have the same value and type only if uses checks that calls `date.getMonth` with no arguments and subtracts 1 from `month` (month) have the same value and type only if checks that calls `date.getFullYear` with no arguments and `year` (year) have the same value and type is truthy; otherwise keeps the falsy first value is truthy; otherwise keeps the falsy first value; if true chooses `date` (date), otherwise null to the caller and exits this function.
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
// Original L12: Sets the ? date property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
    ? date : null;
// Original L13: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L14: Blank line separates related statements and has no runtime effect.

// Original L15: Defines the private helper localDateKey for this page; keeping it local prevents unrelated pages from depending on UI details.
function localDateKey(date) {
// Original L16: Stores year, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const year = date.getFullYear();
// Original L17: Stores month, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const month = String(date.getMonth() + 1).padStart(2, '0');
// Original L18: Stores day, a date value used for local-day or period calculations; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const day = String(date.getDate()).padStart(2, '0');
// Original L19: Returns a text template that combines fixed text with computed values `year` (year), `month` (month), `day` (day) to the caller and exits this function.
  return `${year}-${month}-${day}`;
// Original L20: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L21: Blank line separates related statements and has no runtime effect.

// Original L22: Defines the private helper idOf for this page; keeping it local prevents unrelated pages from depending on UI details.
function idOf(value) {
// Original L23: Returns checks uses uses checks that `value` (value) and null have the same value and type when it is truthy, otherwise falls back to checks that `value` (value) and `undefined` (undefined) have the same value and type when it is truthy, otherwise falls back to checks that `value` (value) and "" have the same value and type; if true chooses "", otherwise converts `value` (value) to text to the caller and exits this function.
  return value === null || value === undefined || value === '' ? '' : String(value);
// Original L24: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L25: Blank line separates related statements and has no runtime effect.

// Original L26: Defines the private helper asDate for this page; keeping it local prevents unrelated pages from depending on UI details.
function asDate(value) {
// Original L27: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (value instanceof Date) {
// Original L28: Stores copy, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const copy = new Date(value);
// Original L29: Returns checks checks whether gets `copy` (copy) as milliseconds since 1970-01-01 UTC is the special invalid-number value NaN; if true chooses null, otherwise `copy` (copy) to the caller and exits this function.
    return Number.isNaN(copy.getTime()) ? null : copy;
// Original L30: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L31: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (value && typeof value.toDate === 'function') return asDate(value.toDate());
// Original L32: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (value === null || value === undefined || value === '') return null;
// Original L33: Stores date, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const date = new Date(value);
// Original L34: Returns checks checks whether gets `date` (date) as milliseconds since 1970-01-01 UTC is the special invalid-number value NaN; if true chooses null, otherwise `date` (date) to the caller and exits this function.
  return Number.isNaN(date.getTime()) ? null : date;
// Original L35: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L36: Blank line separates related statements and has no runtime effect.

// Original L37: Defines the private helper arrayValue for this page; keeping it local prevents unrelated pages from depending on UI details.
function arrayValue(value) {
// Original L38: Returns checks checks whether `value` (value) is an array; if true chooses `value` (value), otherwise an array containing  to the caller and exits this function.
  return Array.isArray(value) ? value : [];
// Original L39: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L40: Blank line separates related statements and has no runtime effect.

// Original L41: Defines the private helper employeeIdOf for this page; keeping it local prevents unrelated pages from depending on UI details.
function employeeIdOf(shift) {
// Original L42: Returns calls `idOf` with uses `shift?.employeeId` (the employee id property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to `shift?.employee?.id` (the id property of shift?.employee); optional chaining stops with undefined if a guarded receiver is null or undefined to the caller and exits this function.
  return idOf(shift?.employeeId ?? shift?.employee?.id);
// Original L43: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L44: Blank line separates related statements and has no runtime effect.

// Original L45: Defines the private helper employeeNameOf for this page; keeping it local prevents unrelated pages from depending on UI details.
function employeeNameOf(shift, employeeMap) {
// Original L46: Stores id, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const id = employeeIdOf(shift);
// Original L47: Returns uses uses uses `shift?.employeeName` (the employee name property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to `shift?.employee?.name` (the name property of shift?.employee); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to `employeeMap.get(id)?.name` (the name property of employeeMap.get(id)); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to checks `id` (id); if true chooses "Unknown employee", otherwise "Unassigned employee" to the caller and exits this function.
  return shift?.employeeName ?? shift?.employee?.name ?? employeeMap.get(id)?.name ?? (id ? 'Unknown employee' : 'Unassigned employee');
// Original L48: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L49: Blank line separates related statements and has no runtime effect.

// Original L50: Defines the private helper customerIdOf for this page; keeping it local prevents unrelated pages from depending on UI details.
function customerIdOf(shift) {
// Original L51: Returns calls `idOf` with uses `shift?.customerId` (the customer id property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to `shift?.customer?.id` (the id property of shift?.customer); optional chaining stops with undefined if a guarded receiver is null or undefined to the caller and exits this function.
  return idOf(shift?.customerId ?? shift?.customer?.id);
// Original L52: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L53: Blank line separates related statements and has no runtime effect.

// Original L54: Defines the private helper customerNameOf for this page; keeping it local prevents unrelated pages from depending on UI details.
function customerNameOf(shift) {
// Original L55: Returns uses uses `shift?.customerName` (the customer name property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to `shift?.customer?.name` (the name property of shift?.customer); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to checks calls `customerIdOf` with `shift` (shift); if true chooses "Unknown customer", otherwise "" to the caller and exits this function.
  return shift?.customerName ?? shift?.customer?.name ?? (customerIdOf(shift) ? 'Unknown customer' : '');
// Original L56: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L57: Blank line separates related statements and has no runtime effect.

// Original L58: Defines the private helper customerRateOf for this page; keeping it local prevents unrelated pages from depending on UI details.
function customerRateOf(shift) {
// Original L59: Returns uses uses `shift?.billingRate` (the billing rate property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to `shift?.customerBillingRate` (the customer billing rate property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to `shift?.customer?.billingRate` (the billing rate property of shift?.customer); optional chaining stops with undefined if a guarded receiver is null or undefined to the caller and exits this function.
  return shift?.billingRate ?? shift?.customerBillingRate ?? shift?.customer?.billingRate;
// Original L60: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L61: Blank line separates related statements and has no runtime effect.

// Original L62: Defines the private helper emptyResult for this page; keeping it local prevents unrelated pages from depending on UI details.
function emptyResult() {
// Original L63: Returns an object with fields shifts: an array containing ; employees: an array containing ; totals: an object with fields shiftCount: 0; actualHours: 0; paidHours: 0; paidShiftCount: 0; unpaidShiftCount: 0; unpaidHours: 0; and further fields; activeShiftCount: 0; invalidShiftCount: 0 to the caller and exits this function.
  return {
// Original L64: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    shifts: [], employees: [],
// Original L65: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    totals: { shiftCount: 0, actualHours: 0, paidHours: 0, paidShiftCount: 0, unpaidShiftCount: 0, unpaidHours: 0, invoiceReadyCount: 0, invoiceReadyHours: 0, invoiceReadyCents: 0 },
// Original L66: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    activeShiftCount: 0,
// Original L67: Sets the invalidShiftCount property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
    invalidShiftCount: 0
// Original L68: Closes the surrounding block or callback; no additional operation occurs on this line.
  };
// Original L69: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L70: Blank line separates related statements and has no runtime effect.

// Original L71: Declares currentWeekRange(), which returns Monday-through-Sunday local date keys for a week.
export function currentWeekRange(now = new Date()) {
// Original L72: Stores date, a date value used for local-day or period calculations; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const date = asDate(now);
// Original L73: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!date) throw new TypeError('A valid date is required.');
// Original L74: Stores day, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const day = date.getDay();
// Original L75: Stores monday, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (day === 0 ? 6 : day - 1));
// Original L76: Stores sunday, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
// Original L77: Returns an object with fields startDate: calls `localDateKey` with `monday` (monday); endDate: calls `localDateKey` with `sunday` (sunday) to the caller and exits this function.
  return { startDate: localDateKey(monday), endDate: localDateKey(sunday) };
// Original L78: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L79: Blank line separates related statements and has no runtime effect.

// Original L80: Declares buildPayPeriodReview(), which filters shifts and combines payroll, ledger, and invoice status into review totals.
export function buildPayPeriodReview({
// Original L81: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
  shifts = [], employees = [], ledgerEntries = [], ledgerArchiveRows = [], invoices = [], startDate, endDate, employeeId = ''
// Original L82: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
} = {}) {
// Original L83: Stores start, a date value used for local-day or period calculations; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const start = dateOnly(startDate);
// Original L84: Stores end, a date value used for local-day or period calculations; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const end = dateOnly(endDate);
// Original L85: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!start || !end) throw new TypeError('Choose valid From and Through dates (YYYY-MM-DD).');
// Original L86: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (end < start) throw new RangeError('The Through date must be on or after the From date.');
// Original L87: Blank line separates related statements and has no runtime effect.

// Original L88: Stores result, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const result = emptyResult();
// Original L89: Stores employeeFilter, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const employeeFilter = idOf(employeeId);
// Original L90: Stores employeeList, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const employeeList = employees instanceof Map ? [...employees.values()] : arrayValue(employees);
// Original L91: Stores employeeMap, a lookup map for fast employee/archive matching; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const employeeMap = new Map(employeeList.map(employee => [idOf(employee?.id), employee]));
// Original L92: Stores activeLedger, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const activeLedger = arrayValue(ledgerEntries);
// Original L93: Stores archiveRows, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const archiveRows = arrayValue(ledgerArchiveRows);
// Original L94: Stores ledgerStatusByShift, a lookup map for fast employee/archive matching; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const ledgerStatusByShift = new Map();
// Original L95: Iterates through each matching record so the page can aggregate or render every item.
  for (const entry of archiveRows) {
// Original L96: Stores id, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const id = idOf(entry?.sourceShiftId);
// Original L97: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (id && !ledgerStatusByShift.has(id)) ledgerStatusByShift.set(id, 'Archived ledger');
// Original L98: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L99: Iterates through each matching record so the page can aggregate or render every item.
  for (const entry of activeLedger) {
// Original L100: Stores id, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const id = idOf(entry?.sourceShiftId);
// Original L101: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (id) ledgerStatusByShift.set(id, 'Active ledger');
// Original L102: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L103: Stores invoiceByShift, a lookup map for fast employee/archive matching; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const invoiceByShift = new Map();
// Original L104: Iterates through each matching record so the page can aggregate or render every item.
  for (const invoice of arrayValue(invoices)) {
// Original L105: Stores ids, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const ids = invoiceShiftIds(invoice);
// Original L106: Iterates through each matching record so the page can aggregate or render every item.
    for (const id of ids) {
// Original L107: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (!invoiceByShift.has(id)) invoiceByShift.set(id, []);
// Original L108: Completes this application statement, applying the shown value or operation to the current page state/data record.
      invoiceByShift.get(id).push(invoice);
// Original L109: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L110: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L111: Blank line separates related statements and has no runtime effect.

// Original L112: Stores inRange, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const inRange = key => key >= startDate && key <= endDate;
// Original L113: Stores summaryIds, a set of unique IDs used to prevent duplicate links; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const summaryIds = new Set(employeeList.map(employee => idOf(employee?.id)));
// Original L114: Completes this application statement, applying the shown value or operation to the current page state/data record.
  activeLedger.forEach(entry => summaryIds.add(idOf(entry?.employeeId)));
// Original L115: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
  archiveRows.forEach(entry => summaryIds.add(idOf(entry?.employeeId)));
// Original L116: Stores consideredShifts, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const consideredShifts = [];
// Original L117: Iterates through each matching record so the page can aggregate or render every item.
  for (const shift of arrayValue(shifts)) {
// Original L118: Stores shiftEmployeeId, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const shiftEmployeeId = employeeIdOf(shift);
// Original L119: Completes this application statement, applying the shown value or operation to the current page state/data record.
    summaryIds.add(shiftEmployeeId);
// Original L120: Stores clockIn, a date value used for local-day or period calculations; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const clockIn = asDate(shift?.clockInTime);
// Original L121: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!clockIn || !inRange(localDateKey(clockIn)) || (employeeFilter && shiftEmployeeId !== employeeFilter)) continue;
// Original L122: Stores clockOutValue, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const clockOutValue = shift?.clockOutTime;
// Original L123: Stores hasEnd, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const hasEnd = clockOutValue !== null && clockOutValue !== undefined && clockOutValue !== '';
// Original L124: Stores clockOut, a date value used for local-day or period calculations; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const clockOut = asDate(clockOutValue);
// Original L125: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!clockOut && !hasEnd) { result.activeShiftCount++; continue; }
// Original L126: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!clockOut || clockOut <= clockIn) { result.invalidShiftCount++; continue; }
// Original L127: Stores actualHours, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const actualHours = actualShiftHours(clockIn, clockOut, shift?.breaks);
// Original L128: Stores paidHours, a numeric value validated for payroll math; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const paidHours = Number.isFinite(shift?.paidHours) ? Number(shift.paidHours) : actualHours;
// Original L129: Stores id, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const id = idOf(shift?.id);
// Original L130: Stores linkedInvoices, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const linkedInvoices = invoiceByShift.get(id) || [];
// Original L131: Stores customerId, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const customerId = customerIdOf(shift);
// Original L132: Stores rawRate, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const rawRate = customerRateOf(shift);
// Original L133: Stores rate, a numeric value validated for payroll math; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const rate = Number(rawRate);
// Original L134: Stores hasRate, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const hasRate = rawRate !== null && rawRate !== undefined && rawRate !== '' && Number.isFinite(rate) && rate >= 0;
// Original L135: Creates mutable invoiceStatus state for this workflow; it changes as the user selects, edits, or loads records.
    let invoiceStatus = 'Missing customer';
// Original L136: Creates mutable invoiceCents state for this workflow; it changes as the user selects, edits, or loads records.
    let invoiceCents = 0;
// Original L137: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (linkedInvoices.length) {
// Original L138: Completes this application statement, applying the shown value or operation to the current page state/data record.
      invoiceStatus = 'Linked';
// Original L139: Iterates through each matching record so the page can aggregate or render every item.
      for (const invoice of linkedInvoices) {
// Original L140: Iterates through each matching record so the page can aggregate or render every item.
        for (const item of arrayValue(invoice?.items)) {
// Original L141: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
          if (idOf(item?.shiftId) === id && Number.isFinite(Number(item?.value))) invoiceCents += Math.round(Number(item.value) * 100);
// Original L142: Closes the surrounding block or callback; no additional operation occurs on this line.
        }
// Original L143: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L144: Provides the alternate branch when the preceding condition is not satisfied.
    } else if (customerId && hasRate) {
// Original L145: Completes this application statement, applying the shown value or operation to the current page state/data record.
      invoiceStatus = 'Ready';
// Original L146: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
      invoiceCents = Math.round(actualHours * rate * 100);
// Original L147: Provides the alternate branch when the preceding condition is not satisfied.
    } else if (customerId) {
// Original L148: Completes this application statement, applying the shown value or operation to the current page state/data record.
      invoiceStatus = 'Missing billing rate';
// Original L149: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L150: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    consideredShifts.push({
// Original L151: Supplies another named imported value in the module dependency list, giving this page access to that helper.
      id: shift?.id, employeeId: shiftEmployeeId, employeeName: employeeNameOf(shift, employeeMap), customerName: customerNameOf(shift),
// Original L152: Supplies another named imported value in the module dependency list, giving this page access to that helper.
      start: new Date(clockIn), actualHours, paidHours, isPaid: Boolean(shift?.isPaid),
// Original L153: Sets the ledgerStatus property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
      ledgerStatus: ledgerStatusByShift.get(id) || 'Not linked', invoiceStatus, invoiceCents
// Original L154: Completes this application statement, applying the shown value or operation to the current page state/data record.
    });
// Original L155: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L156: Blank line separates related statements and has no runtime effect.

// Original L157: Completes this application statement, applying the shown value or operation to the current page state/data record.
  result.shifts = consideredShifts.sort((a, b) => b.start - a.start);
// Original L158: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
  result.shifts.forEach(row => {
// Original L159: Completes this application statement, applying the shown value or operation to the current page state/data record.
    result.totals.shiftCount++;
// Original L160: Completes this application statement, applying the shown value or operation to the current page state/data record.
    result.totals.actualHours += row.actualHours;
// Original L161: Completes this application statement, applying the shown value or operation to the current page state/data record.
    result.totals.paidHours += row.paidHours;
// Original L162: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (row.isPaid) result.totals.paidShiftCount++; else { result.totals.unpaidShiftCount++; result.totals.unpaidHours += row.paidHours; }
// Original L163: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (row.invoiceStatus === 'Ready') { result.totals.invoiceReadyCount++; result.totals.invoiceReadyHours += row.actualHours; result.totals.invoiceReadyCents += row.invoiceCents; }
// Original L164: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L165: Blank line separates related statements and has no runtime effect.

// Original L166: Stores summaryOrder, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
  const summaryOrder = employeeFilter ? [employeeFilter] : [...summaryIds];
// Original L167: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
  result.employees = summaryOrder.filter(id => !employeeFilter || id === employeeFilter).map(id => {
// Original L168: Stores employee, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const employee = employeeMap.get(id);
// Original L169: Stores rows, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const rows = result.shifts.filter(row => row.employeeId === id);
// Original L170: Stores entries, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the pay-period-review.mjs workflow stays consistent.
    const entries = activeLedger.filter(entry => idOf(entry?.employeeId) === id);
// Original L171: Returns an object with fields id: `id` (id); name: uses `employee?.name` (the name property of employee); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to checks `id` (id); if true chooses uses `rows[0]?.employeeName`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "Unknown employee", otherwise "Unassigned employee"; shiftCount: `rows.length` (the length property of rows); actualHours: combines the items of `rows` (rows) with a callback taking sum, row that adds `sum` (sum) and `row.actualHours` (the actual hours property of row) (or joins them if a value is text), starting with 0; paidHours: combines the items of `rows` (rows) with a callback taking sum, row that adds `sum` (sum) and `row.paidHours` (the paid hours property of row) (or joins them if a value is text), starting with 0; unpaidHours: combines the items of keeps only items of `rows` (rows) for which a callback taking row that negates the truthiness of `row.isPaid` returns truthy with a callback taking sum, row that adds `sum` (sum) and `row.paidHours` (the paid hours property of row) (or joins them if a value is text), starting with 0; and further fields to the caller and exits this function.
    return {
// Original L172: Supplies another named imported value in the module dependency list, giving this page access to that helper.
      id, name: employee?.name ?? (id ? (rows[0]?.employeeName || 'Unknown employee') : 'Unassigned employee'),
// Original L173: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
      shiftCount: rows.length, actualHours: rows.reduce((sum, row) => sum + row.actualHours, 0), paidHours: rows.reduce((sum, row) => sum + row.paidHours, 0),
// Original L174: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
      unpaidHours: rows.filter(row => !row.isPaid).reduce((sum, row) => sum + row.paidHours, 0), balanceCents: ledgerBalanceCents(entries), ledgerEntryCount: entries.length
// Original L175: Closes the surrounding block or callback; no additional operation occurs on this line.
    };
// Original L176: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L177: Completes this application statement, applying the shown value or operation to the current page state/data record.
  result.employees.sort((a, b) => a.name.localeCompare(b.name));
// Original L178: Returns `result` (result) to the caller and exits this function.
  return result;
// Original L179: Closes the surrounding block or callback; no additional operation occurs on this line.
}

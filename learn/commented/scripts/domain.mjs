// Original L1: Declares asValidDate(), which normalizes Date, Firestore Timestamp, and date-like input while returning null for invalid values.
export function asValidDate(value) {
// Original L2: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (value === null || value === undefined || value === '') return null;
// Original L3: Stores source, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.
  const source = typeof value?.toDate === 'function' ? value.toDate() : value;
// Original L4: Stores date, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the domain.mjs workflow stays consistent.
  const date = source instanceof Date ? new Date(source) : new Date(source);
// Original L5: Returns checks checks whether gets `date` (date) as milliseconds since 1970-01-01 UTC is the special invalid-number value NaN; if true chooses null, otherwise `date` (date) to the caller and exits this function.
  return Number.isNaN(date.getTime()) ? null : date;
// Original L6: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L7: Blank line separates related statements and has no runtime effect.

// Original L8: Declares sortLedgerEntriesByDate(), which returns ledger entries newest-first with index and id tie-breakers.
export function sortLedgerEntriesByDate(entries = []) {
// Original L9: Stores dateValue, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the domain.mjs workflow stays consistent.
  const dateValue = value => asValidDate(value)?.getTime() ?? Number.NEGATIVE_INFINITY;
// Original L10: Returns sorts an array containing the expanded entries/properties from `entries` (entries) in place using comparison a callback taking a, b that runs its enclosed statements to the caller and exits this function.
  return [...entries].sort((a, b) => {
// Original L11: Stores dateDifference, value; later code reuses this result so the domain.mjs workflow stays consistent.
    const dateDifference = dateValue(b?.date) - dateValue(a?.date);
// Original L12: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (dateDifference) return dateDifference;
// Original L13: Stores indexDifference, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.
    const indexDifference = Number(b?.index || 0) - Number(a?.index || 0);
// Original L14: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (indexDifference) return indexDifference;
// Original L15: Returns calls `String(a?.id || '').localeCompare` with converts uses `b?.id` (the id property of b); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "" to text to the caller and exits this function.
    return String(a?.id || '').localeCompare(String(b?.id || ''));
// Original L16: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L17: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L18: Blank line separates related statements and has no runtime effect.

// Original L19: Declares sumLedgerHours(), which totals payable hours while deliberately excluding advances.
export function sumLedgerHours(entries = []) {
// Original L20: Returns the accumulated total produced from the selected records.
  return (Array.isArray(entries) ? entries : []).reduce((sum, entry) => {
// Original L21: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (String(entry?.type || '').toLowerCase() === 'advance') return sum;
// Original L22: Stores hours, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.
    const hours = Number(entry?.hours || 0);
// Original L23: Returns checks checks that `hours` (hours) is a finite number, excluding NaN and infinity; if true chooses adds `sum` (sum) and `hours` (hours) (or joins them if a value is text), otherwise `sum` (sum) to the caller and exits this function.
    return Number.isFinite(hours) ? sum + hours : sum;
// Original L24: Completes this application statement, applying the shown value or operation to the current page state/data record.
  }, 0);
// Original L25: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L26: Blank line separates related statements and has no runtime effect.

// Original L27: Declares ledgerBalanceCents(), which computes the ledger balance in integer cents, subtracting advances.
export function ledgerBalanceCents(entries = []) {
// Original L28: Returns the accumulated total produced from the selected records.
  return (Array.isArray(entries) ? entries : []).reduce((balance, entry) => {
// Original L29: Stores amount, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.
    const amount = Number(entry?.amount || 0);
// Original L30: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!Number.isFinite(amount)) return balance;
// Original L31: Stores cents, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the domain.mjs workflow stays consistent.
    const cents = Math.round(amount * 100);
// Original L32: Stores type, value; later code reuses this result so the domain.mjs workflow stays consistent.
    const type = String(entry?.type || '').toLowerCase();
// Original L33: Returns adds `balance` (balance) and checks checks that `type` (type) and "advance" have the same value and type; if true chooses changes the numeric sign of `cents` (cents), otherwise `cents` (cents) (or joins them if a value is text) to the caller and exits this function.
    return balance + (type === 'advance' ? -cents : cents);
// Original L34: Completes this application statement, applying the shown value or operation to the current page state/data record.
  }, 0);
// Original L35: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L36: Blank line separates related statements and has no runtime effect.

// Original L37: Declares sortTableRows(), which stably sorts rows by typed values and keeps blank values at the bottom.
export function sortTableRows(rows = [], { key, direction = 'ascending', type = 'text', getValue = row => row?.[key] } = {}) {
// Original L38: Stores source, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const source = Array.isArray(rows) ? rows : [];
// Original L39: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!key || !['ascending', 'descending'].includes(direction)) return [...source];
// Original L40: Blank line separates related statements and has no runtime effect.

// Original L41: Stores normalizedType, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const normalizedType = ['number', 'date'].includes(type) ? type : 'text';
// Original L42: Stores comparable, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the domain.mjs workflow stays consistent.
  const comparable = value => {
// Original L43: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) return null;
// Original L44: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (normalizedType === 'number') {
// Original L45: Stores number, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.
      const number = Number(value);
// Original L46: Returns checks checks that `number` (number) is a finite number, excluding NaN and infinity; if true chooses `number` (number), otherwise null to the caller and exits this function.
      return Number.isFinite(number) ? number : null;
// Original L47: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L48: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (normalizedType === 'date') return asValidDate(value)?.getTime() ?? null;
// Original L49: Returns removes leading and trailing whitespace from converts `value` (value) to text to the caller and exits this function.
    return String(value).trim();
// Original L50: Closes the surrounding block or callback; no additional operation occurs on this line.
  };
// Original L51: Blank line separates related statements and has no runtime effect.

// Original L52: Returns transforms each item of sorts transforms each item of `source` (source) using a callback taking row, index that an object with fields row: `row` (row); index: `index` (index); value: `comparable(getValue(row, key))` and returns a new array in place using comparison a callback taking a, b that runs its enclosed statements using a callback taking item that `item.row` (the row property of item) and returns a new array to the caller and exits this function.
  return source.map((row, index) => ({ row, index, value: comparable(getValue(row, key)) }))
// Original L53: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    .sort((a, b) => {
// Original L54: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (a.value === null || b.value === null) {
// Original L55: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
        if (a.value === null && b.value === null) return a.index - b.index;
// Original L56: Returns checks checks that `a.value` (the value property of a) and null have the same value and type; if true chooses 1, otherwise changes the numeric sign of 1 to the caller and exits this function.
        return a.value === null ? 1 : -1;
// Original L57: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L58: Stores comparison, value; later code reuses this result so the domain.mjs workflow stays consistent.
      const comparison = normalizedType === 'text'
// Original L59: Sets the ? a.value.localeCompare(b.value, undefined, { numeric property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
        ? a.value.localeCompare(b.value, undefined, { numeric: true, sensitivity: 'base' })
// Original L60: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
        : a.value - b.value;
// Original L61: Returns checks checks that `comparison` (comparison) and 0 have the same value and type; if true chooses subtracts `b.index` (the index property of b) from `a.index` (the index property of a), otherwise checks checks that `direction` (direction) and "descending" have the same value and type; if true chooses changes the numeric sign of `comparison` (comparison), otherwise `comparison` (comparison) to the caller and exits this function.
      return comparison === 0 ? a.index - b.index : direction === 'descending' ? -comparison : comparison;
// Original L62: Closes the surrounding block or callback; no additional operation occurs on this line.
    })
// Original L63: Completes this application statement, applying the shown value or operation to the current page state/data record.
    .map(item => item.row);
// Original L64: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L65: Blank line separates related statements and has no runtime effect.

// Original L66: Declares roundTo15Minutes(), which rounds a timestamp to the nearest quarter hour.
export function roundTo15Minutes(date = new Date()) {
// Original L67: Stores source, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.
  const source = asValidDate(date);
// Original L68: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!source) throw new TypeError('A valid date is required.');
// Original L69: Stores interval, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the domain.mjs workflow stays consistent.
  const interval = 15 * 60 * 1000;
// Original L70: Returns constructs a new instance of `Date` with multiplies rounds divides gets `source` (source) as milliseconds since 1970-01-01 UTC by `interval` (interval) to the nearest whole number by `interval` (interval) to the caller and exits this function.
  return new Date(Math.round(source.getTime() / interval) * interval);
// Original L71: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L72: Blank line separates related statements and has no runtime effect.

// Original L73: Declares roundDown15Minutes(), which rounds a timestamp down to a quarter-hour boundary.
export function roundDown15Minutes(date = new Date()) {
// Original L74: Stores source, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.
  const source = asValidDate(date);
// Original L75: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!source) throw new TypeError('A valid date is required.');
// Original L76: Stores interval, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the domain.mjs workflow stays consistent.
  const interval = 15 * 60 * 1000;
// Original L77: Returns constructs a new instance of `Date` with multiplies rounds divides gets `source` (source) as milliseconds since 1970-01-01 UTC by `interval` (interval) down to the next whole number by `interval` (interval) to the caller and exits this function.
  return new Date(Math.floor(source.getTime() / interval) * interval);
// Original L78: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L79: Blank line separates related statements and has no runtime effect.

// Original L80: Declares roundUp15Minutes(), which rounds a timestamp up to a quarter-hour boundary.
export function roundUp15Minutes(date = new Date()) {
// Original L81: Stores source, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.
  const source = asValidDate(date);
// Original L82: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!source) throw new TypeError('A valid date is required.');
// Original L83: Stores interval, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the domain.mjs workflow stays consistent.
  const interval = 15 * 60 * 1000;
// Original L84: Returns constructs a new instance of `Date` with multiplies rounds divides gets `source` (source) as milliseconds since 1970-01-01 UTC by `interval` (interval) up to the next whole number by `interval` (interval) to the caller and exits this function.
  return new Date(Math.ceil(source.getTime() / interval) * interval);
// Original L85: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L86: Blank line separates related statements and has no runtime effect.

// Original L87: Declares actualShiftHours(), which calculates completed shift duration minus the union of overlapping breaks.
export function actualShiftHours(clockInTime, clockOutTime, breaks = []) {
// Original L88: Stores start, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.
  const start = asValidDate(clockInTime);
// Original L89: Stores end, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.
  const end = asValidDate(clockOutTime);
// Original L90: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!start || !end || end <= start) return 0;
// Original L91: Blank line separates related statements and has no runtime effect.

// Original L92: Stores intervals, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const intervals = (Array.isArray(breaks) ? breaks : [])
// Original L93: Sets the .map(item => ({ start property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
    .map(item => ({ start: asValidDate(item?.start), end: asValidDate(item?.end) }))
// Original L94: Continues the surrounding domain.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
    .filter(item => item.start && item.end && item.end > item.start)
// Original L95: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    .map(item => ({
// Original L96: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
      start: Math.max(start.getTime(), item.start.getTime()),
// Original L97: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
      end: Math.min(end.getTime(), item.end.getTime())
// Original L98: Continues the surrounding domain.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
    }))
// Original L99: Continues the surrounding domain.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
    .filter(item => item.end > item.start)
// Original L100: Completes this application statement, applying the shown value or operation to the current page state/data record.
    .sort((a, b) => a.start - b.start);
// Original L101: Blank line separates related statements and has no runtime effect.

// Original L102: Creates mutable breakMs state for this workflow; it changes as the user selects, edits, or loads records.
  let breakMs = 0;
// Original L103: Creates mutable current state for this workflow; it changes as the user selects, edits, or loads records.
  let current = null;
// Original L104: Iterates through each matching record so the page can aggregate or render every item.
  for (const interval of intervals) {
// Original L105: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!current || interval.start > current.end) {
// Original L106: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (current) breakMs += current.end - current.start;
// Original L107: Completes this application statement, applying the shown value or operation to the current page state/data record.
      current = { ...interval };
// Original L108: Provides the alternate branch when the preceding condition is not satisfied.
    } else {
// Original L109: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
      current.end = Math.max(current.end, interval.end);
// Original L110: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L111: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L112: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (current) breakMs += current.end - current.start;
// Original L113: Blank line separates related statements and has no runtime effect.

// Original L114: Returns converts formats divides chooses the largest of 0, subtracts `breakMs` (break ms) from `end.getTime() - start.getTime()` by 3600000 as text with 2 digits after the decimal point to a number (invalid numeric text becomes NaN) to the caller and exits this function.
  return Number((Math.max(0, end.getTime() - start.getTime() - breakMs) / 3_600_000).toFixed(2));
// Original L115: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L116: Blank line separates related statements and has no runtime effect.

// Original L117: Declares plannedDateStatus(), which classifies a scheduled job relative to today using calendar days.
export function plannedDateStatus(scheduledDate, today = new Date()) {
// Original L118: Stores date, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.
  const date = asValidDate(scheduledDate);
// Original L119: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!date) return 'tbd';
// Original L120: Stores todayDate, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the domain.mjs workflow stays consistent.
  const todayDate = asValidDate(today) || new Date();
// Original L121: Stores dayNumber, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the domain.mjs workflow stays consistent.
  const dayNumber = value => Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()) / 86_400_000;
// Original L122: Stores difference, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.
  const difference = dayNumber(date) - dayNumber(todayDate);
// Original L123: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (difference < 0) return 'overdue';
// Original L124: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (difference === 0) return 'due-today';
// Original L125: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (difference === 1) return 'tomorrow';
// Original L126: Returns "upcoming" to the caller and exits this function.
  return 'upcoming';
// Original L127: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L128: Blank line separates related statements and has no runtime effect.

// Original L129: Declares invoiceShiftIds(), which collects linked shift IDs from both invoice metadata and labor items.
export function invoiceShiftIds(invoice) {
// Original L130: Stores ids, a set of unique IDs used to prevent duplicate links; later code reuses this result so the domain.mjs workflow stays consistent.
  const ids = new Set((Array.isArray(invoice?.shiftIds) ? invoice.shiftIds : []).filter(Boolean).map(String));
// Original L131: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
  (Array.isArray(invoice?.items) ? invoice.items : []).forEach(item => {
// Original L132: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (item?.shiftId) ids.add(String(item.shiftId));
// Original L133: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L134: Returns `ids` (ids) to the caller and exits this function.
  return ids;
// Original L135: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L136: Blank line separates related statements and has no runtime effect.

// Original L137: Declares shiftIsAttachedElsewhere(), which checks whether another invoice already claims the shift.
export function shiftIsAttachedElsewhere(invoices, shiftId, invoiceId) {
// Original L138: Stores targetShiftId, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const targetShiftId = String(shiftId);
// Original L139: Returns checks whether any item of checks checks whether `invoices` (invoices) is an array; if true chooses `invoices` (invoices), otherwise an array containing  passes a callback taking invoice that uses calls `invoiceShiftIds(invoice).has` with `targetShiftId` (target shift id) only if checks that converts `invoice?.id` to text and converts `invoiceId` (invoice id) to text differ in value or type is truthy; otherwise keeps the falsy first value to the caller and exits this function.
  return (Array.isArray(invoices) ? invoices : []).some(invoice =>
// Original L140: Converts `invoice?.id` (the id property of invoice); optional chaining stops with undefined if a guarded receiver is null or undefined to text.
    String(invoice?.id) !== String(invoiceId) && invoiceShiftIds(invoice).has(targetShiftId)
// Original L141: Closes the surrounding block or callback; no additional operation occurs on this line.
  );
// Original L142: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L143: Blank line separates related statements and has no runtime effect.

// Original L144: Declares shiftSnapshot(), which creates a stable, ISO-date snapshot used to detect later shift edits.
export function shiftSnapshot(shift) {
// Original L145: Stores asIso, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the domain.mjs workflow stays consistent.
  const asIso = value => asValidDate(value)?.toISOString() || null;
// Original L146: Stores breaks, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const breaks = (Array.isArray(shift?.breaks) ? shift.breaks : [])
// Original L147: Sets the .map(item => ({ start property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
    .map(item => ({ start: asIso(item?.start), end: asIso(item?.end) }))
// Original L148: Completes this application statement, applying the shown value or operation to the current page state/data record.
    .sort((a, b) => String(a.start || '').localeCompare(String(b.start || '')) || String(a.end || '').localeCompare(String(b.end || '')));
// Original L149: Returns an object with fields employeeId: checks compares `shift?.employee?.id` (the id property of shift?.employee); optional chaining stops with undefined if a guarded receiver is null or undefined and null, allowing JavaScript to convert types; if true chooses null, otherwise converts `shift.employee.id` (the id property of shift.employee) to text; customerId: checks compares `shift?.customer?.id` (the id property of shift?.customer); optional chaining stops with undefined if a guarded receiver is null or undefined and null, allowing JavaScript to convert types; if true chooses null, otherwise converts `shift.customer.id` (the id property of shift.customer) to text; clockInTime: calls `asIso` with `shift?.clockInTime` (the clock in time property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined; clockOutTime: calls `asIso` with `shift?.clockOutTime` (the clock out time property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined; breaks: `breaks` (breaks); billedHours: calls `actualShiftHours` with `shift?.clockInTime` (the clock in time property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined; `shift?.clockOutTime` (the clock out time property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined; `shift?.breaks` (the breaks property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined to the caller and exits this function.
  return {
// Original L150: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    employeeId: shift?.employee?.id == null ? null : String(shift.employee.id),
// Original L151: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    customerId: shift?.customer?.id == null ? null : String(shift.customer.id),
// Original L152: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    clockInTime: asIso(shift?.clockInTime),
// Original L153: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    clockOutTime: asIso(shift?.clockOutTime),
// Original L154: Stops this switch/loop branch after its work is complete.
    breaks,
// Original L155: Sets the billedHours property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
    billedHours: actualShiftHours(shift?.clockInTime, shift?.clockOutTime, shift?.breaks)
// Original L156: Closes the surrounding block or callback; no additional operation occurs on this line.
  };
// Original L157: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L158: Blank line separates related statements and has no runtime effect.

// Original L159: Declares makeShiftInvoiceLine(), which builds a labor invoice line from break-adjusted hours and a customer rate.
export function makeShiftInvoiceLine(shift, billingRate) {
// Original L160: Stores rate, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.
  const rate = Number(billingRate);
// Original L161: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!Number.isFinite(rate) || rate < 0) throw new TypeError('A valid non-negative customer billing rate is required.');
// Original L162: Stores snapshot, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const snapshot = shiftSnapshot(shift);
// Original L163: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!snapshot.clockInTime || !snapshot.clockOutTime || !Number.isFinite(snapshot.billedHours) || snapshot.billedHours < 0) {
// Original L164: Rejects invalid application data immediately so callers cannot save misleading payroll or billing results.
    throw new TypeError('A completed shift with valid break-adjusted hours is required.');
// Original L165: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L166: Returns an object with fields name: ""; value: converts formats multiplies `snapshot.billedHours` (the billed hours property of snapshot) by `rate` (rate) as text with 2 digits after the decimal point to a number (invalid numeric text becomes NaN); shiftId: converts `shift.id` (the id property of shift) to text; actualHours: `snapshot.billedHours` (the billed hours property of snapshot); billedHours: `snapshot.billedHours` (the billed hours property of snapshot); billingRate: `rate` (rate); and further fields to the caller and exits this function.
  return {
// Original L167: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    name: '',
// Original L168: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
    value: Number((snapshot.billedHours * rate).toFixed(2)),
// Original L169: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    shiftId: String(shift.id),
// Original L170: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    actualHours: snapshot.billedHours,
// Original L171: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    billedHours: snapshot.billedHours,
// Original L172: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    billingRate: rate,
// Original L173: Sets the shiftSnapshot property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
    shiftSnapshot: snapshot
// Original L174: Closes the surrounding block or callback; no additional operation occurs on this line.
  };
// Original L175: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L176: Blank line separates related statements and has no runtime effect.

// Original L177: Declares makeShiftLedgerEntryData(), which builds the employee-pay ledger record for a completed shift.
export function makeShiftLedgerEntryData(shift) {
// Original L178: Stores start, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.
  const start = asValidDate(shift?.clockInTime);
// Original L179: Stores end, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.
  const end = asValidDate(shift?.clockOutTime);
// Original L180: Stores employeeId, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const employeeId = shift?.employee?.id;
// Original L181: Stores shiftId, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const shiftId = shift?.id;
// Original L182: Stores hours, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.
  const hours = Number(typeof shift?.getPaidHours === 'function'
// Original L183: Calls `shift.getPaidHours` with no arguments.
    ? shift.getPaidHours()
// Original L184: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
    : Number.isFinite(shift?.paidHours)
// Original L185: Continues the surrounding domain.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
      ? shift.paidHours
// Original L186: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
      : actualShiftHours(start, end, shift?.breaks));
// Original L187: Stores wage, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.
  const wage = Number(shift?.employee?.wage);
// Original L188: Blank line separates related statements and has no runtime effect.

// Original L189: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!start || !end || end <= start || !employeeId || !shiftId) {
// Original L190: Rejects invalid application data immediately so callers cannot save misleading payroll or billing results.
    throw new TypeError('A completed shift with an employee is required.');
// Original L191: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L192: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!Number.isFinite(hours) || hours < 0 || !Number.isFinite(wage) || wage < 0) {
// Original L193: Rejects invalid application data immediately so callers cannot save misleading payroll or billing results.
    throw new TypeError('The shift must have valid non-negative paid hours and an employee wage.');
// Original L194: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L195: Blank line separates related statements and has no runtime effect.

// Original L196: Stores year, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const year = start.getFullYear();
// Original L197: Stores month, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const month = String(start.getMonth() + 1).padStart(2, '0');
// Original L198: Stores day, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.
  const day = String(start.getDate()).padStart(2, '0');
// Original L199: Stores customerName, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const customerName = String(shift.customer?.name || '').trim();
// Original L200: Stores shiftNote, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const shiftNote = String(shift.note || '').trim();
// Original L201: Stores notes, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const notes = [customerName ? `Shift · ${customerName}` : 'Shift pay', shiftNote]
// Original L202: Continues the surrounding domain.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
    .filter(Boolean)
// Original L203: Completes this application statement, applying the shown value or operation to the current page state/data record.
    .join(' — ');
// Original L204: Stores amount, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the domain.mjs workflow stays consistent.
  const amount = Number((wage * hours).toFixed(2));
// Original L205: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!Number.isFinite(amount)) throw new TypeError('The shift pay amount is not valid.');
// Original L206: Blank line separates related statements and has no runtime effect.

// Original L207: Returns an object with fields employeeId: converts `employeeId` (employee id) to text; date: a text template that combines fixed text with computed values `year` (year), `month` (month), `day` (day); type: "normal"; hours: `hours` (hours); amount: `amount` (amount); notes: `notes` (notes); and further fields to the caller and exits this function.
  return {
// Original L208: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    employeeId: String(employeeId),
// Original L209: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    date: `${year}-${month}-${day}`,
// Original L210: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    type: 'normal',
// Original L211: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    hours,
// Original L212: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    amount,
// Original L213: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    notes,
// Original L214: Sets the sourceShiftId property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
    sourceShiftId: String(shiftId)
// Original L215: Closes the surrounding block or callback; no additional operation occurs on this line.
  };
// Original L216: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L217: Blank line separates related statements and has no runtime effect.

// Original L218: Declares shiftInvoiceLineStatus(), which compares a billed labor snapshot with the current source shift.
export function shiftInvoiceLineStatus(line, currentShift) {
// Original L219: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!currentShift) return 'missing';
// Original L220: Stores recorded, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const recorded = line?.shiftSnapshot;
// Original L221: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!recorded || typeof recorded !== 'object') return 'unverified';
// Original L222: Stores current, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const current = shiftSnapshot(currentShift);
// Original L223: Stores sameBreaks, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const sameBreaks = Array.isArray(recorded.breaks) && recorded.breaks.length === current.breaks.length &&
// Original L224: Completes this application statement, applying the shown value or operation to the current page state/data record.
    recorded.breaks.every((item, index) => item?.start === current.breaks[index].start && item?.end === current.breaks[index].end);
// Original L225: Stores same, value; later code reuses this result so the domain.mjs workflow stays consistent.
  const same = String(recorded.employeeId ?? '') === String(current.employeeId ?? '') &&
// Original L226: Converts uses `recorded.customerId` (the customer id property of recorded) unless it is null or undefined, then falls back to "" to text.
    String(recorded.customerId ?? '') === String(current.customerId ?? '') &&
// Original L227: Continues the surrounding domain.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
    recorded.clockInTime === current.clockInTime && recorded.clockOutTime === current.clockOutTime &&
// Original L228: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
    Number(recorded.billedHours) === current.billedHours && sameBreaks;
// Original L229: Returns checks `same` (same); if true chooses "current", otherwise "changed" to the caller and exits this function.
  return same ? 'current' : 'changed';
// Original L230: Closes the surrounding block or callback; no additional operation occurs on this line.
}

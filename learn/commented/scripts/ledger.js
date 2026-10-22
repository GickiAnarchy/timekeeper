// Original L1: Loads the named module so its side effects or exports are available to this page.
import {
// Original L2: Supplies another named imported value in the module dependency list, giving this page access to that helper.
  store,
// Original L3: Supplies another named imported value in the module dependency list, giving this page access to that helper.
  populateEmployeeDropdowns,
// Original L4: Continues the surrounding ledger.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
  compareByFirstName
// Original L5: Completes this application statement, applying the shown value or operation to the current page state/data record.
} from './models.js';
// Original L6: Imports sortLedgerEntriesByDate, sumLedgerHours from ./domain.mjs; these helpers provide the domain calculations this module uses.
import { sortLedgerEntriesByDate, sumLedgerHours } from './domain.mjs';
// Original L7: Imports initializeTableSorting, sortTableRows from ./table-sort.mjs; these helpers provide the UI utility this module uses.
import { initializeTableSorting, sortTableRows } from './table-sort.mjs';
// Original L8: Blank line separates related statements and has no runtime effect.

// Original L9: Defines the private helper localDateInputValue for this page; keeping it local prevents unrelated pages from depending on UI details.
function localDateInputValue(date = new Date()) {
// Original L10: Stores year, value; later code reuses this result so the ledger.js workflow stays consistent.
  const year = date.getFullYear();
// Original L11: Stores month, value; later code reuses this result so the ledger.js workflow stays consistent.
  const month = String(date.getMonth() + 1).padStart(2, '0');
// Original L12: Stores day, a date value used for local-day or period calculations; later code reuses this result so the ledger.js workflow stays consistent.
  const day = String(date.getDate()).padStart(2, '0');
// Original L13: Returns a text template that combines fixed text with computed values `year` (year), `month` (month), `day` (day) to the caller and exits this function.
  return `${year}-${month}-${day}`;
// Original L14: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L15: Blank line separates related statements and has no runtime effect.

// Original L16: Defines the private helper makeCell for this page; keeping it local prevents unrelated pages from depending on UI details.
function makeCell(text) {
// Original L17: Stores cell, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.
  const cell = document.createElement('td');
// Original L18: Writes user-visible status/markup into the page, reflecting the current data or validation result.
  cell.textContent = text ?? '';
// Original L19: Returns `cell` (cell) to the caller and exits this function.
  return cell;
// Original L20: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L21: Blank line separates related statements and has no runtime effect.

// Original L22: Waits until the page DOM exists, then runs the page controller so element lookups and event wiring are safe.
document.addEventListener('DOMContentLoaded', async () => {
// Original L23: Completes this application statement, applying the shown value or operation to the current page state/data record.
  await store.init();
// Original L24: Blank line separates related statements and has no runtime effect.

// Original L25: Stores form, DOM reference to the form control; later code reuses this result so the ledger.js workflow stays consistent.
  const form = document.getElementById('ledger-form');
// Original L26: Stores dateInput, DOM reference to the dateInput control; later code reuses this result so the ledger.js workflow stays consistent.
  const dateInput = document.getElementById('date');
// Original L27: Stores typeSelect, DOM reference to the typeSelect control; later code reuses this result so the ledger.js workflow stays consistent.
  const typeSelect = document.getElementById('type');
// Original L28: Stores hoursInput, DOM reference to the hoursInput control; later code reuses this result so the ledger.js workflow stays consistent.
  const hoursInput = document.getElementById('hours');
// Original L29: Stores amountInput, DOM reference to the amountInput control; later code reuses this result so the ledger.js workflow stays consistent.
  const amountInput = document.getElementById('amount');
// Original L30: Stores employeeSelect, DOM reference to the employeeSelect control; later code reuses this result so the ledger.js workflow stays consistent.
  const employeeSelect = document.getElementById('employee-select');
// Original L31: Stores ledgerFilter, DOM reference to the ledgerFilter control; later code reuses this result so the ledger.js workflow stays consistent.
  const ledgerFilter = document.getElementById('ledger-employee-filter');
// Original L32: Stores shiftLedgerForm, DOM reference to the shiftLedgerForm control; later code reuses this result so the ledger.js workflow stays consistent.
  const shiftLedgerForm = document.getElementById('shift-ledger-form');
// Original L33: Stores shiftSelect, DOM reference to the shiftSelect control; later code reuses this result so the ledger.js workflow stays consistent.
  const shiftSelect = document.getElementById('ledger-shift-select');
// Original L34: Stores shiftLedgerStatus, DOM reference to the shiftLedgerStatus control; later code reuses this result so the ledger.js workflow stays consistent.
  const shiftLedgerStatus = document.getElementById('shift-ledger-status');
// Original L35: Stores addShiftButton, DOM reference to the addShiftButton control; later code reuses this result so the ledger.js workflow stays consistent.
  const addShiftButton = document.getElementById('add-shift-to-ledger');
// Original L36: Stores ledgerEntryStatus, DOM reference to the ledgerEntryStatus control; later code reuses this result so the ledger.js workflow stays consistent.
  const ledgerEntryStatus = document.getElementById('ledger-entry-status');
// Original L37: Stores ledgerOwner, DOM reference to the ledgerOwner control; later code reuses this result so the ledger.js workflow stays consistent.
  const ledgerOwner = document.getElementById('ledger-owner');
// Original L38: Stores tableBody, DOM reference to the tableBody control; later code reuses this result so the ledger.js workflow stays consistent.
  const tableBody = document.getElementById('ledger-body');
// Original L39: Stores totalRow, DOM reference to the totalRow control; later code reuses this result so the ledger.js workflow stays consistent.
  const totalRow = document.getElementById('ledger-total');
// Original L40: Stores hoursTotal, DOM reference to the hoursTotal control; later code reuses this result so the ledger.js workflow stays consistent.
  const hoursTotal = document.getElementById('ledger-hours-total');
// Original L41: Stores ledgerTable, DOM reference to the ledgerTable control; later code reuses this result so the ledger.js workflow stays consistent.
  const ledgerTable = document.getElementById('ledger-table');
// Original L42: Stores editDialog, DOM reference to the editDialog control; later code reuses this result so the ledger.js workflow stays consistent.
  const editDialog = document.getElementById('ledger-edit-modal');
// Original L43: Stores editForm, DOM reference to the editForm control; later code reuses this result so the ledger.js workflow stays consistent.
  const editForm = document.getElementById('ledger-edit-form');
// Original L44: Stores editTitle, DOM reference to the editTitle control; later code reuses this result so the ledger.js workflow stays consistent.
  const editTitle = document.getElementById('ledger-edit-title');
// Original L45: Stores editError, DOM reference to the editError control; later code reuses this result so the ledger.js workflow stays consistent.
  const editError = document.getElementById('ledger-edit-error');
// Original L46: Stores editSave, DOM reference to the editSave control; later code reuses this result so the ledger.js workflow stays consistent.
  const editSave = document.getElementById('ledger-edit-save');
// Original L47: Stores editCancel, DOM reference to the editCancel control; later code reuses this result so the ledger.js workflow stays consistent.
  const editCancel = document.getElementById('ledger-edit-cancel');
// Original L48: Stores editDate, DOM reference to the editDate control; later code reuses this result so the ledger.js workflow stays consistent.
  const editDate = document.getElementById('edit-ledger-date');
// Original L49: Stores editType, DOM reference to the editType control; later code reuses this result so the ledger.js workflow stays consistent.
  const editType = document.getElementById('edit-ledger-type');
// Original L50: Stores editHours, DOM reference to the editHours control; later code reuses this result so the ledger.js workflow stays consistent.
  const editHours = document.getElementById('edit-ledger-hours');
// Original L51: Stores editAmount, DOM reference to the editAmount control; later code reuses this result so the ledger.js workflow stays consistent.
  const editAmount = document.getElementById('edit-ledger-amount');
// Original L52: Stores editNotes, DOM reference to the editNotes control; later code reuses this result so the ledger.js workflow stays consistent.
  const editNotes = document.getElementById('edit-ledger-notes');
// Original L53: Creates mutable editingEntryId state for this workflow; it changes as the user selects, edits, or loads records.
  let editingEntryId = null;
// Original L54: Creates mutable editingEntryEmployeeId state for this workflow; it changes as the user selects, edits, or loads records.
  let editingEntryEmployeeId = null;
// Original L55: Creates mutable editTrigger state for this workflow; it changes as the user selects, edits, or loads records.
  let editTrigger = null;
// Original L56: Creates mutable ledgerSort state for this workflow; it changes as the user selects, edits, or loads records.
  let ledgerSort = { key: 'date', direction: 'descending', type: 'date' };
// Original L57: Blank line separates related statements and has no runtime effect.

// Original L58: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
  initializeTableSorting(ledgerTable, {
// Original L59: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    initialSort: ledgerSort,
// Original L60: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    onSort: sort => {
// Original L61: Completes this application statement, applying the shown value or operation to the current page state/data record.
      ledgerSort = sort;
// Original L62: Completes this application statement, applying the shown value or operation to the current page state/data record.
      renderLedger();
// Original L63: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L64: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L65: Blank line separates related statements and has no runtime effect.

// Original L66: Completes this application statement, applying the shown value or operation to the current page state/data record.
  populateEmployeeDropdowns(employeeSelect);
// Original L67: Builds the page structure from DOM nodes and replaces stale results with the current records.
  ledgerFilter.replaceChildren(new Option('Choose an employee', ''));
// Original L68: Iterates through each matching record so the page can aggregate or render every item.
  for (const employee of [...store.employees.values()].sort(compareByFirstName)) {
// Original L69: Completes this application statement, applying the shown value or operation to the current page state/data record.
    ledgerFilter.add(new Option(employee.name, employee.id));
// Original L70: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L71: Stores hasUnassignedEntries, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the ledger.js workflow stays consistent.
  const hasUnassignedEntries = store.ledger.entries.some(entry => !entry.employeeId);
// Original L72: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (hasUnassignedEntries) ledgerFilter.add(new Option('Unassigned legacy entries', 'unassigned'));
// Original L73: Blank line separates related statements and has no runtime effect.

// Original L74: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
  dateInput.value = localDateInputValue();
// Original L75: Blank line separates related statements and has no runtime effect.

// Original L76: Defines the private helper updateTypeInputs for this page; keeping it local prevents unrelated pages from depending on UI details.
  function updateTypeInputs() {
// Original L77: Stores isHourlyPay, value; later code reuses this result so the ledger.js workflow stays consistent.
    const isHourlyPay = typeSelect.value === 'normal';
// Original L78: Completes this application statement, applying the shown value or operation to the current page state/data record.
    hoursInput.disabled = !isHourlyPay;
// Original L79: Completes this application statement, applying the shown value or operation to the current page state/data record.
    amountInput.disabled = isHourlyPay;
// Original L80: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (isHourlyPay) amountInput.value = '0';
// Original L81: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
    else hoursInput.value = '0';
// Original L82: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L83: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  typeSelect.addEventListener('change', updateTypeInputs);
// Original L84: Blank line separates related statements and has no runtime effect.

// Original L85: Defines the private helper selectedEmployeeId for this page; keeping it local prevents unrelated pages from depending on UI details.
  function selectedEmployeeId() {
// Original L86: Returns checks checks that `ledgerFilter.value` (the value property of ledgerFilter) and "unassigned" have the same value and type; if true chooses null, otherwise `ledgerFilter.value` (the value property of ledgerFilter) to the caller and exits this function.
    return ledgerFilter.value === 'unassigned' ? null : ledgerFilter.value;
// Original L87: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L88: Blank line separates related statements and has no runtime effect.

// Original L89: Defines the private helper filteredEntries for this page; keeping it local prevents unrelated pages from depending on UI details.
  function filteredEntries() {
// Original L90: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!ledgerFilter.value) return [];
// Original L91: Stores employeeId, value; later code reuses this result so the ledger.js workflow stays consistent.
    const employeeId = selectedEmployeeId();
// Original L92: Stores entries, value; later code reuses this result so the ledger.js workflow stays consistent.
    const entries = store.ledger.entries
// Original L93: Sets the .filter(entry => employeeId ? entry.employeeId === employeeId property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
      .filter(entry => employeeId ? entry.employeeId === employeeId : !entry.employeeId);
// Original L94: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (ledgerSort.key === 'date' && ledgerSort.direction === 'descending') {
// Original L95: Returns calls `sortLedgerEntriesByDate` with `entries` (entries) to the caller and exits this function.
      return sortLedgerEntriesByDate(entries);
// Original L96: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L97: Returns calls `sortTableRows` with `entries` (entries); an object with fields copied from `ledgerSort` (ledger sort); getValue: a callback taking entry, key that runs its enclosed statements to the caller and exits this function.
    return sortTableRows(entries, {
// Original L98: Continues the surrounding ledger.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
      ...ledgerSort,
// Original L99: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
      getValue: (entry, key) => {
// Original L100: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
        switch (key) {
// Original L101: Handles this requested sort/display field and supplies the corresponding ledger value.
          case 'index': return entry.index;
// Original L102: Handles this requested sort/display field and supplies the corresponding ledger value.
          case 'date': return entry.date;
// Original L103: Handles this requested sort/display field and supplies the corresponding ledger value.
          case 'type': return entry.type;
// Original L104: Handles this requested sort/display field and supplies the corresponding ledger value.
          case 'hours': return entry.hours;
// Original L105: Handles this requested sort/display field and supplies the corresponding ledger value.
          case 'amount': {
// Original L106: Stores amount, a numeric value validated for payroll math; later code reuses this result so the ledger.js workflow stays consistent.
            const amount = Number(entry.amount || 0);
// Original L107: Returns checks checks that converts converts uses `entry.type` when it is truthy, otherwise falls back to "" to text to lowercase text and "advance" have the same value and type; if true chooses changes the numeric sign of gets the nonnegative magnitude of `amount` (amount), otherwise `amount` (amount) to the caller and exits this function.
            return String(entry.type || '').toLowerCase() === 'advance' ? -Math.abs(amount) : amount;
// Original L108: Closes the surrounding block or callback; no additional operation occurs on this line.
          }
// Original L109: Handles this requested sort/display field and supplies the corresponding ledger value.
          case 'notes': return entry.notes;
// Original L110: Uses an empty fallback for unknown fields rather than exposing undefined data to the sorter.
          default: return '';
// Original L111: Closes the surrounding block or callback; no additional operation occurs on this line.
        }
// Original L112: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L113: Completes this application statement, applying the shown value or operation to the current page state/data record.
    });
// Original L114: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L115: Blank line separates related statements and has no runtime effect.

// Original L116: Defines the private helper updateEditTypeInputs for this page; keeping it local prevents unrelated pages from depending on UI details.
  function updateEditTypeInputs() {
// Original L117: Stores isHourlyPay, value; later code reuses this result so the ledger.js workflow stays consistent.
    const isHourlyPay = editType.value === 'normal';
// Original L118: Completes this application statement, applying the shown value or operation to the current page state/data record.
    editHours.disabled = !isHourlyPay;
// Original L119: Completes this application statement, applying the shown value or operation to the current page state/data record.
    editAmount.disabled = isHourlyPay;
// Original L120: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L121: Blank line separates related statements and has no runtime effect.

// Original L122: Defines the private helper renderShiftOptions for this page; keeping it local prevents unrelated pages from depending on UI details.
  function renderShiftOptions(preserveStatus = false) {
// Original L123: Stores employeeId, value; later code reuses this result so the ledger.js workflow stays consistent.
    const employeeId = ledgerFilter.value;
// Original L124: Stores employee, value; later code reuses this result so the ledger.js workflow stays consistent.
    const employee = store.employees.get(employeeId);
// Original L125: Stores ledgeredShiftIds, a set of unique IDs used to prevent duplicate links; later code reuses this result so the ledger.js workflow stays consistent.
    const ledgeredShiftIds = new Set(store.ledger.entries
// Original L126: Converts uses `entry.sourceShiftId` (the source shift id property of entry) when it is truthy, otherwise falls back to "" to text.
      .map(entry => String(entry.sourceShiftId || ''))
// Original L127: Completes this application statement, applying the shown value or operation to the current page state/data record.
      .filter(Boolean));
// Original L128: Stores availableShifts, value; later code reuses this result so the ledger.js workflow stays consistent.
    const availableShifts = employee
// Original L129: Sorts keeps only items of `store.shifts` (the shifts property of store) for which a callback taking shift that uses negates the truthiness of `ledgeredShiftIds.has(String(shift.id))` only if uses `shift.employee?.id === employeeId` only if `shift.isComplete` is truthy; otherwise keeps the falsy first value is truthy; otherwise keeps the falsy first value returns truthy in place using comparison a callback taking a, b that subtracts uses `a.clockInTime?.getTime()`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to 0 from uses `b.clockInTime?.getTime()`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to 0.
      ? store.shifts
// Original L130: Calls `ledgeredShiftIds.has` with converts `shift.id` (the id property of shift) to text.
        .filter(shift => shift.isComplete && shift.employee?.id === employeeId && !ledgeredShiftIds.has(String(shift.id)))
// Original L131: Gets `b.clockInTime` (the clock in time property of b) as milliseconds since 1970-01-01 UTC.
        .sort((a, b) => (b.clockInTime?.getTime() || 0) - (a.clockInTime?.getTime() || 0))
// Original L132: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
      : [];
// Original L133: Blank line separates related statements and has no runtime effect.

// Original L134: Builds the page structure from DOM nodes and replaces stale results with the current records.
    shiftSelect.replaceChildren(new Option('Choose a completed shift', ''));
// Original L135: Iterates through each matching record so the page can aggregate or render every item.
    for (const shift of availableShifts) {
// Original L136: Stores date, a localized display value for the current date or amount; later code reuses this result so the ledger.js workflow stays consistent.
      const date = shift.clockInTime?.toLocaleDateString() || 'Unknown date';
// Original L137: Stores customer, value; later code reuses this result so the ledger.js workflow stays consistent.
      const customer = shift.customer?.name || 'Unknown customer';
// Original L138: Stores hours, a numeric value validated for payroll math; later code reuses this result so the ledger.js workflow stays consistent.
      const hours = Number(shift.getPaidHours());
// Original L139: Stores hoursLabel, value; later code reuses this result so the ledger.js workflow stays consistent.
      const hoursLabel = Number.isFinite(hours) ? hours.toFixed(2) : '0.00';
// Original L140: Completes this application statement, applying the shown value or operation to the current page state/data record.
      shiftSelect.add(new Option(`${date} · ${customer} · ${hoursLabel} paid hours`, shift.id));
// Original L141: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L142: Blank line separates related statements and has no runtime effect.

// Original L143: Completes this application statement, applying the shown value or operation to the current page state/data record.
    shiftSelect.disabled = !employee || availableShifts.length === 0;
// Original L144: Completes this application statement, applying the shown value or operation to the current page state/data record.
    addShiftButton.disabled = shiftSelect.disabled;
// Original L145: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!preserveStatus) {
// Original L146: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      shiftLedgerStatus.textContent = !employee
// Original L147: Continues the surrounding ledger.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
        ? 'Choose an employee above to find completed shifts.'
// Original L148: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
        : availableShifts.length
// Original L149: Sets the ? `${availableShifts.length} completed shift${availableShifts.length === 1 ? '' property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
          ? `${availableShifts.length} completed shift${availableShifts.length === 1 ? '' : 's'} available to add.`
// Original L150: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
          : 'No completed shifts are available to add for this employee.';
// Original L151: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L152: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L153: Blank line separates related statements and has no runtime effect.

// Original L154: Defines the private helper renderLedger for this page; keeping it local prevents unrelated pages from depending on UI details.
  function renderLedger() {
// Original L155: Completes this application statement, applying the shown value or operation to the current page state/data record.
    renderShiftOptions();
// Original L156: Builds the page structure from DOM nodes and replaces stale results with the current records.
    tableBody.replaceChildren();
// Original L157: Stores filterValue, value; later code reuses this result so the ledger.js workflow stays consistent.
    const filterValue = ledgerFilter.value;
// Original L158: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!filterValue) {
// Original L159: Stores row, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.
      const row = document.createElement('tr');
// Original L160: Stores message, value; later code reuses this result so the ledger.js workflow stays consistent.
      const message = makeCell('Choose an employee to view their ledger.');
// Original L161: Completes this application statement, applying the shown value or operation to the current page state/data record.
      message.colSpan = 7;
// Original L162: Builds the page structure from DOM nodes and replaces stale results with the current records.
      row.appendChild(message);
// Original L163: Builds the page structure from DOM nodes and replaces stale results with the current records.
      tableBody.appendChild(row);
// Original L164: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      ledgerOwner.textContent = 'Choose an employee to view their ledger.';
// Original L165: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      totalRow.innerHTML = '<strong>Total: $0.00</strong>';
// Original L166: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      hoursTotal.innerHTML = '<strong>0.00</strong>';
// Original L167: Completes this application statement, applying the shown value or operation to the current page state/data record.
      return;
// Original L168: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L169: Blank line separates related statements and has no runtime effect.

// Original L170: Stores employee, value; later code reuses this result so the ledger.js workflow stays consistent.
    const employee = store.employees.get(filterValue);
// Original L171: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    ledgerOwner.textContent = filterValue === 'unassigned'
// Original L172: Continues the surrounding ledger.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
      ? 'Legacy entries without an employee assignment'
// Original L173: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
      : `Ledger for ${employee?.name || 'this employee'}`;
// Original L174: Blank line separates related statements and has no runtime effect.

// Original L175: Stores entries, value; later code reuses this result so the ledger.js workflow stays consistent.
    const entries = filteredEntries();
// Original L176: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (entries.length === 0) {
// Original L177: Stores row, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.
      const row = document.createElement('tr');
// Original L178: Stores message, value; later code reuses this result so the ledger.js workflow stays consistent.
      const message = makeCell('No entries for this employee yet.');
// Original L179: Completes this application statement, applying the shown value or operation to the current page state/data record.
      message.colSpan = 7;
// Original L180: Builds the page structure from DOM nodes and replaces stale results with the current records.
      row.appendChild(message);
// Original L181: Builds the page structure from DOM nodes and replaces stale results with the current records.
      tableBody.appendChild(row);
// Original L182: Provides the alternate branch when the preceding condition is not satisfied.
    } else {
// Original L183: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
      entries.forEach(entry => {
// Original L184: Stores row, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.
        const row = document.createElement('tr');
// Original L185: Stores type, value; later code reuses this result so the ledger.js workflow stays consistent.
        const type = String(entry.type || '').toLowerCase();
// Original L186: Stores amount, a numeric value validated for payroll math; later code reuses this result so the ledger.js workflow stays consistent.
        const amount = Number(entry.amount || 0);
// Original L187: Stores typeLabel, value; later code reuses this result so the ledger.js workflow stays consistent.
        const typeLabel = entry.sourceShiftId && type === 'normal'
// Original L188: Continues the surrounding ledger.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
          ? 'Shift pay'
// Original L189: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
          : type ? type.charAt(0).toUpperCase() + type.slice(1) : '';
// Original L190: Stores amountCell, value; later code reuses this result so the ledger.js workflow stays consistent.
        const amountCell = makeCell(type === 'advance'
// Original L191: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
          ? `-$${Math.abs(amount).toFixed(2)}`
// Original L192: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
          : `$${amount.toFixed(2)}`);
// Original L193: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
        if (type === 'advance') amountCell.classList.add('advance-amount');
// Original L194: Builds the page structure from DOM nodes and replaces stale results with the current records.
        row.append(
// Original L195: Supplies another named imported value in the module dependency list, giving this page access to that helper.
          makeCell(entry.index),
// Original L196: Supplies another named imported value in the module dependency list, giving this page access to that helper.
          makeCell(entry.date || ''),
// Original L197: Supplies another named imported value in the module dependency list, giving this page access to that helper.
          makeCell(typeLabel),
// Original L198: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
          makeCell(Number(entry.hours || 0).toFixed(2)),
// Original L199: Supplies another named imported value in the module dependency list, giving this page access to that helper.
          amountCell,
// Original L200: Calls `makeCell` with uses `entry.notes` (the notes property of entry) when it is truthy, otherwise falls back to "".
          makeCell(entry.notes || '')
// Original L201: Closes the surrounding block or callback; no additional operation occurs on this line.
        );
// Original L202: Stores actionCell, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.
        const actionCell = document.createElement('td');
// Original L203: Stores rowActions, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.
        const rowActions = document.createElement('div');
// Original L204: Completes this application statement, applying the shown value or operation to the current page state/data record.
        rowActions.className = 'ledger-row-actions';
// Original L205: Stores editButton, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.
        const editButton = document.createElement('button');
// Original L206: Completes this application statement, applying the shown value or operation to the current page state/data record.
        editButton.type = 'button';
// Original L207: Completes this application statement, applying the shown value or operation to the current page state/data record.
        editButton.className = 'edit-ledger-btn';
// Original L208: Completes this application statement, applying the shown value or operation to the current page state/data record.
        editButton.dataset.id = entry.id;
// Original L209: Completes this application statement, applying the shown value or operation to the current page state/data record.
        editButton.setAttribute('aria-label', `Edit ledger entry ${entry.index}`);
// Original L210: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        editButton.textContent = 'Edit';
// Original L211: Stores deleteButton, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.
        const deleteButton = document.createElement('button');
// Original L212: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
        deleteButton.type = 'button';
// Original L213: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
        deleteButton.className = 'delete-btn';
// Original L214: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
        deleteButton.dataset.id = entry.id;
// Original L215: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
        deleteButton.setAttribute('aria-label', `Delete ledger entry ${entry.index}`);
// Original L216: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        deleteButton.textContent = 'Delete';
// Original L217: Builds the page structure from DOM nodes and replaces stale results with the current records.
        rowActions.append(editButton, deleteButton);
// Original L218: Builds the page structure from DOM nodes and replaces stale results with the current records.
        actionCell.appendChild(rowActions);
// Original L219: Builds the page structure from DOM nodes and replaces stale results with the current records.
        row.appendChild(actionCell);
// Original L220: Builds the page structure from DOM nodes and replaces stale results with the current records.
        tableBody.appendChild(row);
// Original L221: Completes this application statement, applying the shown value or operation to the current page state/data record.
      });
// Original L222: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L223: Blank line separates related statements and has no runtime effect.

// Original L224: Stores total, an aggregate total calculated from the selected records; later code reuses this result so the ledger.js workflow stays consistent.
    const total = entries.reduce((sum, entry) => {
// Original L225: Stores amount, a numeric value validated for payroll math; later code reuses this result so the ledger.js workflow stays consistent.
      const amount = Number(entry.amount || 0);
// Original L226: Returns adds `sum` (sum) and checks checks that converts converts `entry.type || ''` to text to lowercase text and "advance" have the same value and type; if true chooses changes the numeric sign of `amount` (amount), otherwise `amount` (amount) (or joins them if a value is text) to the caller and exits this function.
      return sum + (String(entry.type || '').toLowerCase() === 'advance' ? -amount : amount);
// Original L227: Completes this application statement, applying the shown value or operation to the current page state/data record.
    }, 0);
// Original L228: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    totalRow.innerHTML = `<strong>Balance: $${total.toFixed(2)}</strong>`;
// Original L229: Stores totalHours, value; later code reuses this result so the ledger.js workflow stays consistent.
    const totalHours = sumLedgerHours(entries);
// Original L230: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    hoursTotal.innerHTML = `<strong>${totalHours.toFixed(2)}</strong>`;
// Original L231: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L232: Blank line separates related statements and has no runtime effect.

// Original L233: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  ledgerFilter.addEventListener('change', () => {
// Original L234: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (store.employees.has(ledgerFilter.value)) employeeSelect.value = ledgerFilter.value;
// Original L235: Completes this application statement, applying the shown value or operation to the current page state/data record.
    renderLedger();
// Original L236: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L237: Blank line separates related statements and has no runtime effect.

// Original L238: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (store.recentlyArchivedLedgerIds.length) {
// Original L239: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    ledgerEntryStatus.textContent = 'A zero-balance ledger was archived. View archived ledger history to review it.';
// Original L240: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L241: Blank line separates related statements and has no runtime effect.

// Original L242: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  shiftLedgerForm.addEventListener('submit', async event => {
// Original L243: Completes this application statement, applying the shown value or operation to the current page state/data record.
    event.preventDefault();
// Original L244: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!shiftLedgerForm.reportValidity()) return;
// Original L245: Blank line separates related statements and has no runtime effect.

// Original L246: Stores shiftId, value; later code reuses this result so the ledger.js workflow stays consistent.
    const shiftId = shiftSelect.value;
// Original L247: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    ledgerEntryStatus.textContent = '';
// Original L248: Completes this application statement, applying the shown value or operation to the current page state/data record.
    addShiftButton.disabled = true;
// Original L249: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    addShiftButton.textContent = 'Adding…';
// Original L250: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    shiftLedgerStatus.textContent = 'Adding the shift to the ledger…';
// Original L251: Creates mutable entryWasSaved state for this workflow; it changes as the user selects, edits, or loads records.
    let entryWasSaved = false;
// Original L252: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    try {
// Original L253: Stores entry, value; later code reuses this result so the ledger.js workflow stays consistent.
      const entry = await store.saveShiftToLedger(shiftId);
// Original L254: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      entryWasSaved = true;
// Original L255: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (ledgerFilter.value !== entry.employeeId) ledgerFilter.value = entry.employeeId;
// Original L256: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
      employeeSelect.value = entry.employeeId;
// Original L257: Completes this application statement, applying the shown value or operation to the current page state/data record.
      renderLedger();
// Original L258: Completes this application statement, applying the shown value or operation to the current page state/data record.
      shiftLedgerForm.reset();
// Original L259: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      shiftLedgerStatus.textContent = 'Shift added to the ledger.';
// Original L260: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (window.confirm('Shift added to the ledger. Would you like to adjust this ledger entry?')) {
// Original L261: Stores trigger, DOM query used to find the trigger elements; later code reuses this result so the ledger.js workflow stays consistent.
        const trigger = [...tableBody.querySelectorAll('.edit-ledger-btn[data-id]')]
// Original L262: Completes this application statement, applying the shown value or operation to the current page state/data record.
          .find(button => button.dataset.id === entry.id);
// Original L263: Completes this application statement, applying the shown value or operation to the current page state/data record.
        openEditDialog(entry, trigger);
// Original L264: Provides the alternate branch when the preceding condition is not satisfied.
      } else {
// Original L265: Stores archive, value; later code reuses this result so the ledger.js workflow stays consistent.
        const archive = await store.archiveSettledLedger(entry.employeeId);
// Original L266: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
        if (archive) {
// Original L267: Completes this application statement, applying the shown value or operation to the current page state/data record.
          renderLedger();
// Original L268: Writes user-visible status/markup into the page, reflecting the current data or validation result.
          shiftLedgerStatus.textContent = 'The balance is $0.00. Ledger history was archived.';
// Original L269: Writes user-visible status/markup into the page, reflecting the current data or validation result.
          ledgerEntryStatus.textContent = 'Balance settled at $0.00. View archived ledger history to review it.';
// Original L270: Closes the surrounding block or callback; no additional operation occurs on this line.
        }
// Original L271: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L272: Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.
    } catch (error) {
// Original L273: Sets the console.error('Unable to add shift to ledger property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
      console.error('Unable to add shift to ledger:', error);
// Original L274: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      entryWasSaved ||= Boolean(error.entrySaved);
// Original L275: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (entryWasSaved) {
// Original L276: Completes this application statement, applying the shown value or operation to the current page state/data record.
        shiftLedgerForm.reset();
// Original L277: Completes this application statement, applying the shown value or operation to the current page state/data record.
        renderLedger();
// Original L278: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        shiftLedgerStatus.textContent = `Shift was added, but its settled ledger could not be fully archived. ${error.message || ''}`.trim();
// Original L279: Provides the alternate branch when the preceding condition is not satisfied.
      } else {
// Original L280: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        shiftLedgerStatus.textContent = error.message || 'Unable to add this shift to the ledger. Please try again.';
// Original L281: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L282: Runs cleanup regardless of success, such as restoring button text or re-enabling controls.
    } finally {
// Original L283: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      addShiftButton.textContent = 'Add shift to ledger';
// Original L284: Completes this application statement, applying the shown value or operation to the current page state/data record.
      renderShiftOptions(true);
// Original L285: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L286: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L287: Blank line separates related statements and has no runtime effect.

// Original L288: Completes this application statement, applying the shown value or operation to the current page state/data record.
  renderLedger();
// Original L289: Completes this application statement, applying the shown value or operation to the current page state/data record.
  updateTypeInputs();
// Original L290: Blank line separates related statements and has no runtime effect.

// Original L291: Defines the private helper openEditDialog for this page; keeping it local prevents unrelated pages from depending on UI details.
  function openEditDialog(entry, trigger) {
// Original L292: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!editDialog || !editForm || !entry) return;
// Original L293: Completes this application statement, applying the shown value or operation to the current page state/data record.
    editingEntryId = entry.id;
// Original L294: Completes this application statement, applying the shown value or operation to the current page state/data record.
    editingEntryEmployeeId = entry.employeeId;
// Original L295: Completes this application statement, applying the shown value or operation to the current page state/data record.
    editTrigger = trigger;
// Original L296: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    editError.textContent = '';
// Original L297: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    editTitle.textContent = `Edit ledger entry ${entry.index}`;
// Original L298: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
    editDate.value = entry.date || '';
// Original L299: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
    editType.value = String(entry.type || 'normal').toLowerCase();
// Original L300: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
    editHours.value = String(Number(entry.hours || 0));
// Original L301: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
    editAmount.value = String(Math.abs(Number(entry.amount || 0)));
// Original L302: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
    editNotes.value = entry.notes || '';
// Original L303: Completes this application statement, applying the shown value or operation to the current page state/data record.
    updateEditTypeInputs();
// Original L304: Completes this application statement, applying the shown value or operation to the current page state/data record.
    editDialog.showModal();
// Original L305: Completes this application statement, applying the shown value or operation to the current page state/data record.
    editDate.focus();
// Original L306: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L307: Blank line separates related statements and has no runtime effect.

// Original L308: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  editType.addEventListener('change', updateEditTypeInputs);
// Original L309: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  editCancel.addEventListener('click', () => editDialog.close());
// Original L310: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  editDialog.addEventListener('close', async () => {
// Original L311: Stores entryId, value; later code reuses this result so the ledger.js workflow stays consistent.
    const entryId = editingEntryId;
// Original L312: Stores employeeId, value; later code reuses this result so the ledger.js workflow stays consistent.
    const employeeId = editingEntryEmployeeId;
// Original L313: Stores trigger, value; later code reuses this result so the ledger.js workflow stays consistent.
    const trigger = editTrigger;
// Original L314: Completes this application statement, applying the shown value or operation to the current page state/data record.
    editingEntryId = null;
// Original L315: Completes this application statement, applying the shown value or operation to the current page state/data record.
    editingEntryEmployeeId = null;
// Original L316: Completes this application statement, applying the shown value or operation to the current page state/data record.
    editTrigger = null;
// Original L317: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (employeeId && store.pendingLedgerSettlements.has(String(employeeId))) {
// Original L318: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
      try {
// Original L319: Stores archive, value; later code reuses this result so the ledger.js workflow stays consistent.
        const archive = await store.archiveSettledLedger(employeeId);
// Original L320: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
        if (archive) {
// Original L321: Completes this application statement, applying the shown value or operation to the current page state/data record.
          renderLedger();
// Original L322: Writes user-visible status/markup into the page, reflecting the current data or validation result.
          ledgerEntryStatus.textContent = 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.';
// Original L323: Closes the surrounding block or callback; no additional operation occurs on this line.
        }
// Original L324: Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.
      } catch (error) {
// Original L325: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
        console.error('Unable to archive the settled ledger:', error);
// Original L326: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        ledgerEntryStatus.textContent = error.message || 'The ledger is settled, but archiving is pending. Retry from Ledger archive.';
// Original L327: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L328: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L329: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (trigger?.isConnected) {
// Original L330: Completes this application statement, applying the shown value or operation to the current page state/data record.
      trigger.focus();
// Original L331: Completes this application statement, applying the shown value or operation to the current page state/data record.
      return;
// Original L332: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L333: Stores replacementTrigger, DOM query used to find the replacementTrigger elements; later code reuses this result so the ledger.js workflow stays consistent.
    const replacementTrigger = [...tableBody.querySelectorAll('.edit-ledger-btn[data-id]')]
// Original L334: Completes this application statement, applying the shown value or operation to the current page state/data record.
      .find(button => button.dataset.id === entryId);
// Original L335: Completes this application statement, applying the shown value or operation to the current page state/data record.
    (replacementTrigger || ledgerFilter).focus();
// Original L336: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L337: Blank line separates related statements and has no runtime effect.

// Original L338: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  editForm.addEventListener('submit', async event => {
// Original L339: Completes this application statement, applying the shown value or operation to the current page state/data record.
    event.preventDefault();
// Original L340: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    editError.textContent = '';
// Original L341: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!editForm.reportValidity() || !editingEntryId) return;
// Original L342: Blank line separates related statements and has no runtime effect.

// Original L343: Stores entry, value; later code reuses this result so the ledger.js workflow stays consistent.
    const entry = store.ledger.getEntry(editingEntryId);
// Original L344: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!entry) {
// Original L345: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      editError.textContent = 'This ledger entry could not be found. Close the dialog and try again.';
// Original L346: Completes this application statement, applying the shown value or operation to the current page state/data record.
      return;
// Original L347: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L348: Blank line separates related statements and has no runtime effect.

// Original L349: Stores type, value; later code reuses this result so the ledger.js workflow stays consistent.
    const type = editType.value;
// Original L350: Stores updates, value; later code reuses this result so the ledger.js workflow stays consistent.
    const updates = {
// Original L351: Supplies another named imported value in the module dependency list, giving this page access to that helper.
      date: editDate.value,
// Original L352: Supplies another named imported value in the module dependency list, giving this page access to that helper.
      type,
// Original L353: Sets the notes property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
      notes: editNotes.value.trim()
// Original L354: Closes the surrounding block or callback; no additional operation occurs on this line.
    };
// Original L355: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (type === 'normal') {
// Original L356: Stores hours, a numeric value validated for payroll math; later code reuses this result so the ledger.js workflow stays consistent.
      const hours = Number(editHours.value);
// Original L357: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (!Number.isFinite(hours) || hours < 0) {
// Original L358: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        editError.textContent = 'Hours must be a valid number of zero or more.';
// Original L359: Completes this application statement, applying the shown value or operation to the current page state/data record.
        editHours.focus();
// Original L360: Completes this application statement, applying the shown value or operation to the current page state/data record.
        return;
// Original L361: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L362: Completes this application statement, applying the shown value or operation to the current page state/data record.
      updates.hours = hours;
// Original L363: Stores employee, value; later code reuses this result so the ledger.js workflow stays consistent.
      const employee = entry.employeeId ? store.employees.get(entry.employeeId) : null;
// Original L364: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
      updates.amount = employee ? employee.getPay(hours) : Number(entry.amount || 0);
// Original L365: Provides the alternate branch when the preceding condition is not satisfied.
    } else {
// Original L366: Stores amount, a numeric value validated for payroll math; later code reuses this result so the ledger.js workflow stays consistent.
      const amount = Number(editAmount.value);
// Original L367: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (!Number.isFinite(amount) || amount < 0) {
// Original L368: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        editError.textContent = 'Amount must be a valid number of zero or more.';
// Original L369: Completes this application statement, applying the shown value or operation to the current page state/data record.
        editAmount.focus();
// Original L370: Completes this application statement, applying the shown value or operation to the current page state/data record.
        return;
// Original L371: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L372: Completes this application statement, applying the shown value or operation to the current page state/data record.
      updates.amount = amount;
// Original L373: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (String(entry.type || '').toLowerCase() === 'normal') updates.hours = 0;
// Original L374: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L375: Blank line separates related statements and has no runtime effect.

// Original L376: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
    editSave.disabled = true;
// Original L377: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    editSave.textContent = 'Saving…';
// Original L378: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    try {
// Original L379: Stores updatedEntry, value; later code reuses this result so the ledger.js workflow stays consistent.
      const updatedEntry = await store.updateLedgerEntry(editingEntryId, updates);
// Original L380: Completes this application statement, applying the shown value or operation to the current page state/data record.
      renderLedger();
// Original L381: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (updatedEntry.archivedOnZero) {
// Original L382: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        ledgerEntryStatus.textContent = 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.';
// Original L383: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L384: Completes this application statement, applying the shown value or operation to the current page state/data record.
      editDialog.close();
// Original L385: Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.
    } catch (error) {
// Original L386: Sets the console.error('Unable to update ledger entry property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
      console.error('Unable to update ledger entry:', error);
// Original L387: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (error.entrySaved) {
// Original L388: Completes this application statement, applying the shown value or operation to the current page state/data record.
        renderLedger();
// Original L389: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        ledgerEntryStatus.textContent = error.message;
// Original L390: Completes this application statement, applying the shown value or operation to the current page state/data record.
        editDialog.close();
// Original L391: Completes this application statement, applying the shown value or operation to the current page state/data record.
        return;
// Original L392: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L393: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      editError.textContent = error.message || 'Unable to save changes. Please try again.';
// Original L394: Runs cleanup regardless of success, such as restoring button text or re-enabling controls.
    } finally {
// Original L395: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      editSave.disabled = false;
// Original L396: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      editSave.textContent = 'Save changes';
// Original L397: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L398: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L399: Blank line separates related statements and has no runtime effect.

// Original L400: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  form.addEventListener('submit', async event => {
// Original L401: Completes this application statement, applying the shown value or operation to the current page state/data record.
    event.preventDefault();
// Original L402: Writes user-visible status/markup into the page, reflecting the current data or validation result.
    ledgerEntryStatus.textContent = '';
// Original L403: Stores employeeId, value; later code reuses this result so the ledger.js workflow stays consistent.
    const employeeId = employeeSelect.value;
// Original L404: Stores employee, value; later code reuses this result so the ledger.js workflow stays consistent.
    const employee = store.employees.get(employeeId);
// Original L405: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!employee) {
// Original L406: Completes this application statement, applying the shown value or operation to the current page state/data record.
      window.alert('Choose an employee before adding a ledger entry.');
// Original L407: Completes this application statement, applying the shown value or operation to the current page state/data record.
      return;
// Original L408: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L409: Blank line separates related statements and has no runtime effect.

// Original L410: Stores type, value; later code reuses this result so the ledger.js workflow stays consistent.
    const type = typeSelect.value;
// Original L411: Stores notes, DOM reference to the notes control; later code reuses this result so the ledger.js workflow stays consistent.
    const notes = document.getElementById('notes').value.trim();
// Original L412: Creates mutable hours state for this workflow; it changes as the user selects, edits, or loads records.
    let hours = 0;
// Original L413: Creates mutable amount state for this workflow; it changes as the user selects, edits, or loads records.
    let amount = 0;
// Original L414: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (type === 'normal') {
// Original L415: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
      hours = Number(hoursInput.value);
// Original L416: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (!Number.isFinite(hours) || hours < 0) {
// Original L417: Completes this application statement, applying the shown value or operation to the current page state/data record.
        window.alert('Hours must be a valid number of zero or more.');
// Original L418: Completes this application statement, applying the shown value or operation to the current page state/data record.
        return;
// Original L419: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L420: Completes this application statement, applying the shown value or operation to the current page state/data record.
      amount = employee.getPay(hours);
// Original L421: Provides the alternate branch when the preceding condition is not satisfied.
    } else {
// Original L422: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
      amount = Number(amountInput.value);
// Original L423: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (!Number.isFinite(amount) || amount < 0) {
// Original L424: Completes this application statement, applying the shown value or operation to the current page state/data record.
        window.alert('Amount must be a valid number of zero or more.');
// Original L425: Completes this application statement, applying the shown value or operation to the current page state/data record.
        return;
// Original L426: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L427: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L428: Blank line separates related statements and has no runtime effect.

// Original L429: Stores submitButton, DOM query used to find the submitButton elements; later code reuses this result so the ledger.js workflow stays consistent.
    const submitButton = form.querySelector('button[type="submit"]');
// Original L430: Completes this application statement, applying the shown value or operation to the current page state/data record.
    submitButton.disabled = true;
// Original L431: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    try {
// Original L432: Stores entry, value; later code reuses this result so the ledger.js workflow stays consistent.
      const entry = await store.saveLedgerEntry({
// Original L433: Supplies another named imported value in the module dependency list, giving this page access to that helper.
        employeeId,
// Original L434: Supplies another named imported value in the module dependency list, giving this page access to that helper.
        date: dateInput.value,
// Original L435: Supplies another named imported value in the module dependency list, giving this page access to that helper.
        type,
// Original L436: Supplies another named imported value in the module dependency list, giving this page access to that helper.
        hours,
// Original L437: Supplies another named imported value in the module dependency list, giving this page access to that helper.
        amount,
// Original L438: Defines field notes as `notes` (notes).
        notes
// Original L439: Completes this application statement, applying the shown value or operation to the current page state/data record.
      });
// Original L440: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (ledgerFilter.value !== employeeId) ledgerFilter.value = employeeId;
// Original L441: Completes this application statement, applying the shown value or operation to the current page state/data record.
      renderLedger();
// Original L442: Completes this application statement, applying the shown value or operation to the current page state/data record.
      form.reset();
// Original L443: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
      dateInput.value = localDateInputValue();
// Original L444: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
      typeSelect.value = 'normal';
// Original L445: Completes this application statement, applying the shown value or operation to the current page state/data record.
      updateTypeInputs();
// Original L446: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
      employeeSelect.value = employeeId;
// Original L447: Writes user-visible status/markup into the page, reflecting the current data or validation result.
      ledgerEntryStatus.textContent = entry.archivedOnZero
// Original L448: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
        ? 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.'
// Original L449: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
        : '';
// Original L450: Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.
    } catch (error) {
// Original L451: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      console.error('Unable to save ledger entry:', error);
// Original L452: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (error.entrySaved) {
// Original L453: Completes this application statement, applying the shown value or operation to the current page state/data record.
        form.reset();
// Original L454: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
        dateInput.value = localDateInputValue();
// Original L455: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
        typeSelect.value = 'normal';
// Original L456: Completes this application statement, applying the shown value or operation to the current page state/data record.
        updateTypeInputs();
// Original L457: Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.
        employeeSelect.value = employeeId;
// Original L458: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
        if (ledgerFilter.value !== employeeId) ledgerFilter.value = employeeId;
// Original L459: Completes this application statement, applying the shown value or operation to the current page state/data record.
        renderLedger();
// Original L460: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        ledgerEntryStatus.textContent = error.message;
// Original L461: Completes this application statement, applying the shown value or operation to the current page state/data record.
        return;
// Original L462: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L463: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      window.alert(error.message || 'Unable to save this ledger entry. Please try again.');
// Original L464: Runs cleanup regardless of success, such as restoring button text or re-enabling controls.
    } finally {
// Original L465: Completes this application statement, applying the shown value or operation to the current page state/data record.
      submitButton.disabled = false;
// Original L466: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L467: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L468: Blank line separates related statements and has no runtime effect.

// Original L469: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  tableBody.addEventListener('click', async event => {
// Original L470: Stores editButton, value; later code reuses this result so the ledger.js workflow stays consistent.
    const editButton = event.target.closest('.edit-ledger-btn[data-id]');
// Original L471: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (editButton) {
// Original L472: Stores entry, value; later code reuses this result so the ledger.js workflow stays consistent.
      const entry = store.ledger.getEntry(editButton.dataset.id);
// Original L473: Completes this application statement, applying the shown value or operation to the current page state/data record.
      openEditDialog(entry, editButton);
// Original L474: Completes this application statement, applying the shown value or operation to the current page state/data record.
      return;
// Original L475: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L476: Stores button, value; later code reuses this result so the ledger.js workflow stays consistent.
    const button = event.target.closest('.delete-btn[data-id]');
// Original L477: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!button) return;
// Original L478: Completes this application statement, applying the shown value or operation to the current page state/data record.
    button.disabled = true;
// Original L479: Stores previousArchiveCount, value; later code reuses this result so the ledger.js workflow stays consistent.
    const previousArchiveCount = store.recentlyArchivedLedgerIds.length;
// Original L480: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    try {
// Original L481: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      await store.deleteLedgerEntry(button.dataset.id);
// Original L482: Completes this application statement, applying the shown value or operation to the current page state/data record.
      renderLedger();
// Original L483: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (store.recentlyArchivedLedgerIds.length > previousArchiveCount) {
// Original L484: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        ledgerEntryStatus.textContent = 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.';
// Original L485: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L486: Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.
    } catch (error) {
// Original L487: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      console.error('Unable to delete ledger entry:', error);
// Original L488: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (error.entrySaved) {
// Original L489: Completes this application statement, applying the shown value or operation to the current page state/data record.
        renderLedger();
// Original L490: Writes user-visible status/markup into the page, reflecting the current data or validation result.
        ledgerEntryStatus.textContent = error.message;
// Original L491: Completes this application statement, applying the shown value or operation to the current page state/data record.
        return;
// Original L492: Closes the surrounding block or callback; no additional operation occurs on this line.
      }
// Original L493: Completes this application statement, applying the shown value or operation to the current page state/data record.
      button.disabled = false;
// Original L494: Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.
      window.alert('This ledger entry could not be deleted. Please try again.');
// Original L495: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L496: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L497: Completes this application statement, applying the shown value or operation to the current page state/data record.
});

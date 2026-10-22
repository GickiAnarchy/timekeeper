# scripts/ledger.js

[Exact copy](../../original/scripts/ledger.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import {
```

Loads the named module so its side effects or exports are available to this page.

### Line 2

```text
  store,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 3

```text
  populateEmployeeDropdowns,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 4

```text
  compareByFirstName
```

Continues the surrounding ledger.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 5

```text
} from './models.js';
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 6

```text
import { sortLedgerEntriesByDate, sumLedgerHours } from './domain.mjs';
```

Imports sortLedgerEntriesByDate, sumLedgerHours from ./domain.mjs; these helpers provide the domain calculations this module uses.

### Line 7

```text
import { initializeTableSorting, sortTableRows } from './table-sort.mjs';
```

Imports initializeTableSorting, sortTableRows from ./table-sort.mjs; these helpers provide the UI utility this module uses.

### Line 8

```text

```

Blank line separates related statements and has no runtime effect.

### Line 9

```text
function localDateInputValue(date = new Date()) {
```

Defines the private helper localDateInputValue for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 10

```text
  const year = date.getFullYear();
```

Stores year, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 11

```text
  const month = String(date.getMonth() + 1).padStart(2, '0');
```

Stores month, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 12

```text
  const day = String(date.getDate()).padStart(2, '0');
```

Stores day, a date value used for local-day or period calculations; later code reuses this result so the ledger.js workflow stays consistent.

### Line 13

```text
  return `${year}-${month}-${day}`;
```

Returns a text template that combines fixed text with computed values `year` (year), `month` (month), `day` (day) to the caller and exits this function.

### Line 14

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 15

```text

```

Blank line separates related statements and has no runtime effect.

### Line 16

```text
function makeCell(text) {
```

Defines the private helper makeCell for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 17

```text
  const cell = document.createElement('td');
```

Stores cell, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.

### Line 18

```text
  cell.textContent = text ?? '';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 19

```text
  return cell;
```

Returns `cell` (cell) to the caller and exits this function.

### Line 20

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 21

```text

```

Blank line separates related statements and has no runtime effect.

### Line 22

```text
document.addEventListener('DOMContentLoaded', async () => {
```

Waits until the page DOM exists, then runs the page controller so element lookups and event wiring are safe.

### Line 23

```text
  await store.init();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 24

```text

```

Blank line separates related statements and has no runtime effect.

### Line 25

```text
  const form = document.getElementById('ledger-form');
```

Stores form, DOM reference to the form control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 26

```text
  const dateInput = document.getElementById('date');
```

Stores dateInput, DOM reference to the dateInput control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 27

```text
  const typeSelect = document.getElementById('type');
```

Stores typeSelect, DOM reference to the typeSelect control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 28

```text
  const hoursInput = document.getElementById('hours');
```

Stores hoursInput, DOM reference to the hoursInput control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 29

```text
  const amountInput = document.getElementById('amount');
```

Stores amountInput, DOM reference to the amountInput control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 30

```text
  const employeeSelect = document.getElementById('employee-select');
```

Stores employeeSelect, DOM reference to the employeeSelect control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 31

```text
  const ledgerFilter = document.getElementById('ledger-employee-filter');
```

Stores ledgerFilter, DOM reference to the ledgerFilter control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 32

```text
  const shiftLedgerForm = document.getElementById('shift-ledger-form');
```

Stores shiftLedgerForm, DOM reference to the shiftLedgerForm control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 33

```text
  const shiftSelect = document.getElementById('ledger-shift-select');
```

Stores shiftSelect, DOM reference to the shiftSelect control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 34

```text
  const shiftLedgerStatus = document.getElementById('shift-ledger-status');
```

Stores shiftLedgerStatus, DOM reference to the shiftLedgerStatus control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 35

```text
  const addShiftButton = document.getElementById('add-shift-to-ledger');
```

Stores addShiftButton, DOM reference to the addShiftButton control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 36

```text
  const ledgerEntryStatus = document.getElementById('ledger-entry-status');
```

Stores ledgerEntryStatus, DOM reference to the ledgerEntryStatus control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 37

```text
  const ledgerOwner = document.getElementById('ledger-owner');
```

Stores ledgerOwner, DOM reference to the ledgerOwner control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 38

```text
  const tableBody = document.getElementById('ledger-body');
```

Stores tableBody, DOM reference to the tableBody control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 39

```text
  const totalRow = document.getElementById('ledger-total');
```

Stores totalRow, DOM reference to the totalRow control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 40

```text
  const hoursTotal = document.getElementById('ledger-hours-total');
```

Stores hoursTotal, DOM reference to the hoursTotal control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 41

```text
  const ledgerTable = document.getElementById('ledger-table');
```

Stores ledgerTable, DOM reference to the ledgerTable control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 42

```text
  const editDialog = document.getElementById('ledger-edit-modal');
```

Stores editDialog, DOM reference to the editDialog control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 43

```text
  const editForm = document.getElementById('ledger-edit-form');
```

Stores editForm, DOM reference to the editForm control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 44

```text
  const editTitle = document.getElementById('ledger-edit-title');
```

Stores editTitle, DOM reference to the editTitle control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 45

```text
  const editError = document.getElementById('ledger-edit-error');
```

Stores editError, DOM reference to the editError control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 46

```text
  const editSave = document.getElementById('ledger-edit-save');
```

Stores editSave, DOM reference to the editSave control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 47

```text
  const editCancel = document.getElementById('ledger-edit-cancel');
```

Stores editCancel, DOM reference to the editCancel control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 48

```text
  const editDate = document.getElementById('edit-ledger-date');
```

Stores editDate, DOM reference to the editDate control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 49

```text
  const editType = document.getElementById('edit-ledger-type');
```

Stores editType, DOM reference to the editType control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 50

```text
  const editHours = document.getElementById('edit-ledger-hours');
```

Stores editHours, DOM reference to the editHours control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 51

```text
  const editAmount = document.getElementById('edit-ledger-amount');
```

Stores editAmount, DOM reference to the editAmount control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 52

```text
  const editNotes = document.getElementById('edit-ledger-notes');
```

Stores editNotes, DOM reference to the editNotes control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 53

```text
  let editingEntryId = null;
```

Creates mutable editingEntryId state for this workflow; it changes as the user selects, edits, or loads records.

### Line 54

```text
  let editingEntryEmployeeId = null;
```

Creates mutable editingEntryEmployeeId state for this workflow; it changes as the user selects, edits, or loads records.

### Line 55

```text
  let editTrigger = null;
```

Creates mutable editTrigger state for this workflow; it changes as the user selects, edits, or loads records.

### Line 56

```text
  let ledgerSort = { key: 'date', direction: 'descending', type: 'date' };
```

Creates mutable ledgerSort state for this workflow; it changes as the user selects, edits, or loads records.

### Line 57

```text

```

Blank line separates related statements and has no runtime effect.

### Line 58

```text
  initializeTableSorting(ledgerTable, {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 59

```text
    initialSort: ledgerSort,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 60

```text
    onSort: sort => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 61

```text
      ledgerSort = sort;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 62

```text
      renderLedger();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 63

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 64

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 65

```text

```

Blank line separates related statements and has no runtime effect.

### Line 66

```text
  populateEmployeeDropdowns(employeeSelect);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 67

```text
  ledgerFilter.replaceChildren(new Option('Choose an employee', ''));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 68

```text
  for (const employee of [...store.employees.values()].sort(compareByFirstName)) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 69

```text
    ledgerFilter.add(new Option(employee.name, employee.id));
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 70

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 71

```text
  const hasUnassignedEntries = store.ledger.entries.some(entry => !entry.employeeId);
```

Stores hasUnassignedEntries, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the ledger.js workflow stays consistent.

### Line 72

```text
  if (hasUnassignedEntries) ledgerFilter.add(new Option('Unassigned legacy entries', 'unassigned'));
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 73

```text

```

Blank line separates related statements and has no runtime effect.

### Line 74

```text
  dateInput.value = localDateInputValue();
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 75

```text

```

Blank line separates related statements and has no runtime effect.

### Line 76

```text
  function updateTypeInputs() {
```

Defines the private helper updateTypeInputs for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 77

```text
    const isHourlyPay = typeSelect.value === 'normal';
```

Stores isHourlyPay, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 78

```text
    hoursInput.disabled = !isHourlyPay;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 79

```text
    amountInput.disabled = isHourlyPay;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 80

```text
    if (isHourlyPay) amountInput.value = '0';
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 81

```text
    else hoursInput.value = '0';
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 82

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 83

```text
  typeSelect.addEventListener('change', updateTypeInputs);
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 84

```text

```

Blank line separates related statements and has no runtime effect.

### Line 85

```text
  function selectedEmployeeId() {
```

Defines the private helper selectedEmployeeId for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 86

```text
    return ledgerFilter.value === 'unassigned' ? null : ledgerFilter.value;
```

Returns checks checks that `ledgerFilter.value` (the value property of ledgerFilter) and "unassigned" have the same value and type; if true chooses null, otherwise `ledgerFilter.value` (the value property of ledgerFilter) to the caller and exits this function.

### Line 87

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 88

```text

```

Blank line separates related statements and has no runtime effect.

### Line 89

```text
  function filteredEntries() {
```

Defines the private helper filteredEntries for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 90

```text
    if (!ledgerFilter.value) return [];
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 91

```text
    const employeeId = selectedEmployeeId();
```

Stores employeeId, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 92

```text
    const entries = store.ledger.entries
```

Stores entries, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 93

```text
      .filter(entry => employeeId ? entry.employeeId === employeeId : !entry.employeeId);
```

Sets the .filter(entry => employeeId ? entry.employeeId === employeeId property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 94

```text
    if (ledgerSort.key === 'date' && ledgerSort.direction === 'descending') {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 95

```text
      return sortLedgerEntriesByDate(entries);
```

Returns calls `sortLedgerEntriesByDate` with `entries` (entries) to the caller and exits this function.

### Line 96

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 97

```text
    return sortTableRows(entries, {
```

Returns calls `sortTableRows` with `entries` (entries); an object with fields copied from `ledgerSort` (ledger sort); getValue: a callback taking entry, key that runs its enclosed statements to the caller and exits this function.

### Line 98

```text
      ...ledgerSort,
```

Continues the surrounding ledger.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 99

```text
      getValue: (entry, key) => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 100

```text
        switch (key) {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 101

```text
          case 'index': return entry.index;
```

Handles this requested sort/display field and supplies the corresponding ledger value.

### Line 102

```text
          case 'date': return entry.date;
```

Handles this requested sort/display field and supplies the corresponding ledger value.

### Line 103

```text
          case 'type': return entry.type;
```

Handles this requested sort/display field and supplies the corresponding ledger value.

### Line 104

```text
          case 'hours': return entry.hours;
```

Handles this requested sort/display field and supplies the corresponding ledger value.

### Line 105

```text
          case 'amount': {
```

Handles this requested sort/display field and supplies the corresponding ledger value.

### Line 106

```text
            const amount = Number(entry.amount || 0);
```

Stores amount, a numeric value validated for payroll math; later code reuses this result so the ledger.js workflow stays consistent.

### Line 107

```text
            return String(entry.type || '').toLowerCase() === 'advance' ? -Math.abs(amount) : amount;
```

Returns checks checks that converts converts uses `entry.type` when it is truthy, otherwise falls back to "" to text to lowercase text and "advance" have the same value and type; if true chooses changes the numeric sign of gets the nonnegative magnitude of `amount` (amount), otherwise `amount` (amount) to the caller and exits this function.

### Line 108

```text
          }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 109

```text
          case 'notes': return entry.notes;
```

Handles this requested sort/display field and supplies the corresponding ledger value.

### Line 110

```text
          default: return '';
```

Uses an empty fallback for unknown fields rather than exposing undefined data to the sorter.

### Line 111

```text
        }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 112

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 113

```text
    });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 114

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 115

```text

```

Blank line separates related statements and has no runtime effect.

### Line 116

```text
  function updateEditTypeInputs() {
```

Defines the private helper updateEditTypeInputs for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 117

```text
    const isHourlyPay = editType.value === 'normal';
```

Stores isHourlyPay, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 118

```text
    editHours.disabled = !isHourlyPay;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 119

```text
    editAmount.disabled = isHourlyPay;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 120

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 121

```text

```

Blank line separates related statements and has no runtime effect.

### Line 122

```text
  function renderShiftOptions(preserveStatus = false) {
```

Defines the private helper renderShiftOptions for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 123

```text
    const employeeId = ledgerFilter.value;
```

Stores employeeId, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 124

```text
    const employee = store.employees.get(employeeId);
```

Stores employee, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 125

```text
    const ledgeredShiftIds = new Set(store.ledger.entries
```

Stores ledgeredShiftIds, a set of unique IDs used to prevent duplicate links; later code reuses this result so the ledger.js workflow stays consistent.

### Line 126

```text
      .map(entry => String(entry.sourceShiftId || ''))
```

Converts uses `entry.sourceShiftId` (the source shift id property of entry) when it is truthy, otherwise falls back to "" to text.

### Line 127

```text
      .filter(Boolean));
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 128

```text
    const availableShifts = employee
```

Stores availableShifts, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 129

```text
      ? store.shifts
```

Sorts keeps only items of `store.shifts` (the shifts property of store) for which a callback taking shift that uses negates the truthiness of `ledgeredShiftIds.has(String(shift.id))` only if uses `shift.employee?.id === employeeId` only if `shift.isComplete` is truthy; otherwise keeps the falsy first value is truthy; otherwise keeps the falsy first value returns truthy in place using comparison a callback taking a, b that subtracts uses `a.clockInTime?.getTime()`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to 0 from uses `b.clockInTime?.getTime()`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to 0.

### Line 130

```text
        .filter(shift => shift.isComplete && shift.employee?.id === employeeId && !ledgeredShiftIds.has(String(shift.id)))
```

Calls `ledgeredShiftIds.has` with converts `shift.id` (the id property of shift) to text.

### Line 131

```text
        .sort((a, b) => (b.clockInTime?.getTime() || 0) - (a.clockInTime?.getTime() || 0))
```

Gets `b.clockInTime` (the clock in time property of b) as milliseconds since 1970-01-01 UTC.

### Line 132

```text
      : [];
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 133

```text

```

Blank line separates related statements and has no runtime effect.

### Line 134

```text
    shiftSelect.replaceChildren(new Option('Choose a completed shift', ''));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 135

```text
    for (const shift of availableShifts) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 136

```text
      const date = shift.clockInTime?.toLocaleDateString() || 'Unknown date';
```

Stores date, a localized display value for the current date or amount; later code reuses this result so the ledger.js workflow stays consistent.

### Line 137

```text
      const customer = shift.customer?.name || 'Unknown customer';
```

Stores customer, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 138

```text
      const hours = Number(shift.getPaidHours());
```

Stores hours, a numeric value validated for payroll math; later code reuses this result so the ledger.js workflow stays consistent.

### Line 139

```text
      const hoursLabel = Number.isFinite(hours) ? hours.toFixed(2) : '0.00';
```

Stores hoursLabel, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 140

```text
      shiftSelect.add(new Option(`${date} · ${customer} · ${hoursLabel} paid hours`, shift.id));
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 141

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 142

```text

```

Blank line separates related statements and has no runtime effect.

### Line 143

```text
    shiftSelect.disabled = !employee || availableShifts.length === 0;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 144

```text
    addShiftButton.disabled = shiftSelect.disabled;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 145

```text
    if (!preserveStatus) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 146

```text
      shiftLedgerStatus.textContent = !employee
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 147

```text
        ? 'Choose an employee above to find completed shifts.'
```

Continues the surrounding ledger.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 148

```text
        : availableShifts.length
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 149

```text
          ? `${availableShifts.length} completed shift${availableShifts.length === 1 ? '' : 's'} available to add.`
```

Sets the ? `${availableShifts.length} completed shift${availableShifts.length === 1 ? '' property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 150

```text
          : 'No completed shifts are available to add for this employee.';
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 151

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 152

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 153

```text

```

Blank line separates related statements and has no runtime effect.

### Line 154

```text
  function renderLedger() {
```

Defines the private helper renderLedger for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 155

```text
    renderShiftOptions();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 156

```text
    tableBody.replaceChildren();
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 157

```text
    const filterValue = ledgerFilter.value;
```

Stores filterValue, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 158

```text
    if (!filterValue) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 159

```text
      const row = document.createElement('tr');
```

Stores row, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.

### Line 160

```text
      const message = makeCell('Choose an employee to view their ledger.');
```

Stores message, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 161

```text
      message.colSpan = 7;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 162

```text
      row.appendChild(message);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 163

```text
      tableBody.appendChild(row);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 164

```text
      ledgerOwner.textContent = 'Choose an employee to view their ledger.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 165

```text
      totalRow.innerHTML = '<strong>Total: $0.00</strong>';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 166

```text
      hoursTotal.innerHTML = '<strong>0.00</strong>';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 167

```text
      return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 168

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 169

```text

```

Blank line separates related statements and has no runtime effect.

### Line 170

```text
    const employee = store.employees.get(filterValue);
```

Stores employee, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 171

```text
    ledgerOwner.textContent = filterValue === 'unassigned'
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 172

```text
      ? 'Legacy entries without an employee assignment'
```

Continues the surrounding ledger.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 173

```text
      : `Ledger for ${employee?.name || 'this employee'}`;
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 174

```text

```

Blank line separates related statements and has no runtime effect.

### Line 175

```text
    const entries = filteredEntries();
```

Stores entries, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 176

```text
    if (entries.length === 0) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 177

```text
      const row = document.createElement('tr');
```

Stores row, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.

### Line 178

```text
      const message = makeCell('No entries for this employee yet.');
```

Stores message, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 179

```text
      message.colSpan = 7;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 180

```text
      row.appendChild(message);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 181

```text
      tableBody.appendChild(row);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 182

```text
    } else {
```

Provides the alternate branch when the preceding condition is not satisfied.

### Line 183

```text
      entries.forEach(entry => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 184

```text
        const row = document.createElement('tr');
```

Stores row, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.

### Line 185

```text
        const type = String(entry.type || '').toLowerCase();
```

Stores type, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 186

```text
        const amount = Number(entry.amount || 0);
```

Stores amount, a numeric value validated for payroll math; later code reuses this result so the ledger.js workflow stays consistent.

### Line 187

```text
        const typeLabel = entry.sourceShiftId && type === 'normal'
```

Stores typeLabel, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 188

```text
          ? 'Shift pay'
```

Continues the surrounding ledger.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 189

```text
          : type ? type.charAt(0).toUpperCase() + type.slice(1) : '';
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 190

```text
        const amountCell = makeCell(type === 'advance'
```

Stores amountCell, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 191

```text
          ? `-$${Math.abs(amount).toFixed(2)}`
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 192

```text
          : `$${amount.toFixed(2)}`);
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 193

```text
        if (type === 'advance') amountCell.classList.add('advance-amount');
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 194

```text
        row.append(
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 195

```text
          makeCell(entry.index),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 196

```text
          makeCell(entry.date || ''),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 197

```text
          makeCell(typeLabel),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 198

```text
          makeCell(Number(entry.hours || 0).toFixed(2)),
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 199

```text
          amountCell,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 200

```text
          makeCell(entry.notes || '')
```

Calls `makeCell` with uses `entry.notes` (the notes property of entry) when it is truthy, otherwise falls back to "".

### Line 201

```text
        );
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 202

```text
        const actionCell = document.createElement('td');
```

Stores actionCell, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.

### Line 203

```text
        const rowActions = document.createElement('div');
```

Stores rowActions, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.

### Line 204

```text
        rowActions.className = 'ledger-row-actions';
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 205

```text
        const editButton = document.createElement('button');
```

Stores editButton, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.

### Line 206

```text
        editButton.type = 'button';
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 207

```text
        editButton.className = 'edit-ledger-btn';
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 208

```text
        editButton.dataset.id = entry.id;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 209

```text
        editButton.setAttribute('aria-label', `Edit ledger entry ${entry.index}`);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 210

```text
        editButton.textContent = 'Edit';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 211

```text
        const deleteButton = document.createElement('button');
```

Stores deleteButton, a browser object used to build or update this page; later code reuses this result so the ledger.js workflow stays consistent.

### Line 212

```text
        deleteButton.type = 'button';
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 213

```text
        deleteButton.className = 'delete-btn';
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 214

```text
        deleteButton.dataset.id = entry.id;
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 215

```text
        deleteButton.setAttribute('aria-label', `Delete ledger entry ${entry.index}`);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 216

```text
        deleteButton.textContent = 'Delete';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 217

```text
        rowActions.append(editButton, deleteButton);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 218

```text
        actionCell.appendChild(rowActions);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 219

```text
        row.appendChild(actionCell);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 220

```text
        tableBody.appendChild(row);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 221

```text
      });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 222

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 223

```text

```

Blank line separates related statements and has no runtime effect.

### Line 224

```text
    const total = entries.reduce((sum, entry) => {
```

Stores total, an aggregate total calculated from the selected records; later code reuses this result so the ledger.js workflow stays consistent.

### Line 225

```text
      const amount = Number(entry.amount || 0);
```

Stores amount, a numeric value validated for payroll math; later code reuses this result so the ledger.js workflow stays consistent.

### Line 226

```text
      return sum + (String(entry.type || '').toLowerCase() === 'advance' ? -amount : amount);
```

Returns adds `sum` (sum) and checks checks that converts converts `entry.type || ''` to text to lowercase text and "advance" have the same value and type; if true chooses changes the numeric sign of `amount` (amount), otherwise `amount` (amount) (or joins them if a value is text) to the caller and exits this function.

### Line 227

```text
    }, 0);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 228

```text
    totalRow.innerHTML = `<strong>Balance: $${total.toFixed(2)}</strong>`;
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 229

```text
    const totalHours = sumLedgerHours(entries);
```

Stores totalHours, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 230

```text
    hoursTotal.innerHTML = `<strong>${totalHours.toFixed(2)}</strong>`;
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 231

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 232

```text

```

Blank line separates related statements and has no runtime effect.

### Line 233

```text
  ledgerFilter.addEventListener('change', () => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 234

```text
    if (store.employees.has(ledgerFilter.value)) employeeSelect.value = ledgerFilter.value;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 235

```text
    renderLedger();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 236

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 237

```text

```

Blank line separates related statements and has no runtime effect.

### Line 238

```text
  if (store.recentlyArchivedLedgerIds.length) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 239

```text
    ledgerEntryStatus.textContent = 'A zero-balance ledger was archived. View archived ledger history to review it.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 240

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 241

```text

```

Blank line separates related statements and has no runtime effect.

### Line 242

```text
  shiftLedgerForm.addEventListener('submit', async event => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 243

```text
    event.preventDefault();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 244

```text
    if (!shiftLedgerForm.reportValidity()) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 245

```text

```

Blank line separates related statements and has no runtime effect.

### Line 246

```text
    const shiftId = shiftSelect.value;
```

Stores shiftId, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 247

```text
    ledgerEntryStatus.textContent = '';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 248

```text
    addShiftButton.disabled = true;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 249

```text
    addShiftButton.textContent = 'Adding…';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 250

```text
    shiftLedgerStatus.textContent = 'Adding the shift to the ledger…';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 251

```text
    let entryWasSaved = false;
```

Creates mutable entryWasSaved state for this workflow; it changes as the user selects, edits, or loads records.

### Line 252

```text
    try {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 253

```text
      const entry = await store.saveShiftToLedger(shiftId);
```

Stores entry, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 254

```text
      entryWasSaved = true;
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 255

```text
      if (ledgerFilter.value !== entry.employeeId) ledgerFilter.value = entry.employeeId;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 256

```text
      employeeSelect.value = entry.employeeId;
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 257

```text
      renderLedger();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 258

```text
      shiftLedgerForm.reset();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 259

```text
      shiftLedgerStatus.textContent = 'Shift added to the ledger.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 260

```text
      if (window.confirm('Shift added to the ledger. Would you like to adjust this ledger entry?')) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 261

```text
        const trigger = [...tableBody.querySelectorAll('.edit-ledger-btn[data-id]')]
```

Stores trigger, DOM query used to find the trigger elements; later code reuses this result so the ledger.js workflow stays consistent.

### Line 262

```text
          .find(button => button.dataset.id === entry.id);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 263

```text
        openEditDialog(entry, trigger);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 264

```text
      } else {
```

Provides the alternate branch when the preceding condition is not satisfied.

### Line 265

```text
        const archive = await store.archiveSettledLedger(entry.employeeId);
```

Stores archive, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 266

```text
        if (archive) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 267

```text
          renderLedger();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 268

```text
          shiftLedgerStatus.textContent = 'The balance is $0.00. Ledger history was archived.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 269

```text
          ledgerEntryStatus.textContent = 'Balance settled at $0.00. View archived ledger history to review it.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 270

```text
        }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 271

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 272

```text
    } catch (error) {
```

Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.

### Line 273

```text
      console.error('Unable to add shift to ledger:', error);
```

Sets the console.error('Unable to add shift to ledger property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 274

```text
      entryWasSaved ||= Boolean(error.entrySaved);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 275

```text
      if (entryWasSaved) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 276

```text
        shiftLedgerForm.reset();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 277

```text
        renderLedger();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 278

```text
        shiftLedgerStatus.textContent = `Shift was added, but its settled ledger could not be fully archived. ${error.message || ''}`.trim();
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 279

```text
      } else {
```

Provides the alternate branch when the preceding condition is not satisfied.

### Line 280

```text
        shiftLedgerStatus.textContent = error.message || 'Unable to add this shift to the ledger. Please try again.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 281

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 282

```text
    } finally {
```

Runs cleanup regardless of success, such as restoring button text or re-enabling controls.

### Line 283

```text
      addShiftButton.textContent = 'Add shift to ledger';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 284

```text
      renderShiftOptions(true);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 285

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 286

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 287

```text

```

Blank line separates related statements and has no runtime effect.

### Line 288

```text
  renderLedger();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 289

```text
  updateTypeInputs();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 290

```text

```

Blank line separates related statements and has no runtime effect.

### Line 291

```text
  function openEditDialog(entry, trigger) {
```

Defines the private helper openEditDialog for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 292

```text
    if (!editDialog || !editForm || !entry) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 293

```text
    editingEntryId = entry.id;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 294

```text
    editingEntryEmployeeId = entry.employeeId;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 295

```text
    editTrigger = trigger;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 296

```text
    editError.textContent = '';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 297

```text
    editTitle.textContent = `Edit ledger entry ${entry.index}`;
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 298

```text
    editDate.value = entry.date || '';
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 299

```text
    editType.value = String(entry.type || 'normal').toLowerCase();
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 300

```text
    editHours.value = String(Number(entry.hours || 0));
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 301

```text
    editAmount.value = String(Math.abs(Number(entry.amount || 0)));
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 302

```text
    editNotes.value = entry.notes || '';
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 303

```text
    updateEditTypeInputs();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 304

```text
    editDialog.showModal();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 305

```text
    editDate.focus();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 306

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 307

```text

```

Blank line separates related statements and has no runtime effect.

### Line 308

```text
  editType.addEventListener('change', updateEditTypeInputs);
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 309

```text
  editCancel.addEventListener('click', () => editDialog.close());
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 310

```text
  editDialog.addEventListener('close', async () => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 311

```text
    const entryId = editingEntryId;
```

Stores entryId, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 312

```text
    const employeeId = editingEntryEmployeeId;
```

Stores employeeId, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 313

```text
    const trigger = editTrigger;
```

Stores trigger, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 314

```text
    editingEntryId = null;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 315

```text
    editingEntryEmployeeId = null;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 316

```text
    editTrigger = null;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 317

```text
    if (employeeId && store.pendingLedgerSettlements.has(String(employeeId))) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 318

```text
      try {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 319

```text
        const archive = await store.archiveSettledLedger(employeeId);
```

Stores archive, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 320

```text
        if (archive) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 321

```text
          renderLedger();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 322

```text
          ledgerEntryStatus.textContent = 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 323

```text
        }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 324

```text
      } catch (error) {
```

Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.

### Line 325

```text
        console.error('Unable to archive the settled ledger:', error);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 326

```text
        ledgerEntryStatus.textContent = error.message || 'The ledger is settled, but archiving is pending. Retry from Ledger archive.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 327

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 328

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 329

```text
    if (trigger?.isConnected) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 330

```text
      trigger.focus();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 331

```text
      return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 332

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 333

```text
    const replacementTrigger = [...tableBody.querySelectorAll('.edit-ledger-btn[data-id]')]
```

Stores replacementTrigger, DOM query used to find the replacementTrigger elements; later code reuses this result so the ledger.js workflow stays consistent.

### Line 334

```text
      .find(button => button.dataset.id === entryId);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 335

```text
    (replacementTrigger || ledgerFilter).focus();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 336

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 337

```text

```

Blank line separates related statements and has no runtime effect.

### Line 338

```text
  editForm.addEventListener('submit', async event => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 339

```text
    event.preventDefault();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 340

```text
    editError.textContent = '';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 341

```text
    if (!editForm.reportValidity() || !editingEntryId) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 342

```text

```

Blank line separates related statements and has no runtime effect.

### Line 343

```text
    const entry = store.ledger.getEntry(editingEntryId);
```

Stores entry, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 344

```text
    if (!entry) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 345

```text
      editError.textContent = 'This ledger entry could not be found. Close the dialog and try again.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 346

```text
      return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 347

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 348

```text

```

Blank line separates related statements and has no runtime effect.

### Line 349

```text
    const type = editType.value;
```

Stores type, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 350

```text
    const updates = {
```

Stores updates, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 351

```text
      date: editDate.value,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 352

```text
      type,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 353

```text
      notes: editNotes.value.trim()
```

Sets the notes property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 354

```text
    };
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 355

```text
    if (type === 'normal') {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 356

```text
      const hours = Number(editHours.value);
```

Stores hours, a numeric value validated for payroll math; later code reuses this result so the ledger.js workflow stays consistent.

### Line 357

```text
      if (!Number.isFinite(hours) || hours < 0) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 358

```text
        editError.textContent = 'Hours must be a valid number of zero or more.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 359

```text
        editHours.focus();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 360

```text
        return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 361

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 362

```text
      updates.hours = hours;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 363

```text
      const employee = entry.employeeId ? store.employees.get(entry.employeeId) : null;
```

Stores employee, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 364

```text
      updates.amount = employee ? employee.getPay(hours) : Number(entry.amount || 0);
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 365

```text
    } else {
```

Provides the alternate branch when the preceding condition is not satisfied.

### Line 366

```text
      const amount = Number(editAmount.value);
```

Stores amount, a numeric value validated for payroll math; later code reuses this result so the ledger.js workflow stays consistent.

### Line 367

```text
      if (!Number.isFinite(amount) || amount < 0) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 368

```text
        editError.textContent = 'Amount must be a valid number of zero or more.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 369

```text
        editAmount.focus();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 370

```text
        return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 371

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 372

```text
      updates.amount = amount;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 373

```text
      if (String(entry.type || '').toLowerCase() === 'normal') updates.hours = 0;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 374

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 375

```text

```

Blank line separates related statements and has no runtime effect.

### Line 376

```text
    editSave.disabled = true;
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 377

```text
    editSave.textContent = 'Saving…';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 378

```text
    try {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 379

```text
      const updatedEntry = await store.updateLedgerEntry(editingEntryId, updates);
```

Stores updatedEntry, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 380

```text
      renderLedger();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 381

```text
      if (updatedEntry.archivedOnZero) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 382

```text
        ledgerEntryStatus.textContent = 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 383

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 384

```text
      editDialog.close();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 385

```text
    } catch (error) {
```

Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.

### Line 386

```text
      console.error('Unable to update ledger entry:', error);
```

Sets the console.error('Unable to update ledger entry property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 387

```text
      if (error.entrySaved) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 388

```text
        renderLedger();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 389

```text
        ledgerEntryStatus.textContent = error.message;
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 390

```text
        editDialog.close();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 391

```text
        return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 392

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 393

```text
      editError.textContent = error.message || 'Unable to save changes. Please try again.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 394

```text
    } finally {
```

Runs cleanup regardless of success, such as restoring button text or re-enabling controls.

### Line 395

```text
      editSave.disabled = false;
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 396

```text
      editSave.textContent = 'Save changes';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 397

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 398

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 399

```text

```

Blank line separates related statements and has no runtime effect.

### Line 400

```text
  form.addEventListener('submit', async event => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 401

```text
    event.preventDefault();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 402

```text
    ledgerEntryStatus.textContent = '';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 403

```text
    const employeeId = employeeSelect.value;
```

Stores employeeId, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 404

```text
    const employee = store.employees.get(employeeId);
```

Stores employee, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 405

```text
    if (!employee) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 406

```text
      window.alert('Choose an employee before adding a ledger entry.');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 407

```text
      return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 408

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 409

```text

```

Blank line separates related statements and has no runtime effect.

### Line 410

```text
    const type = typeSelect.value;
```

Stores type, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 411

```text
    const notes = document.getElementById('notes').value.trim();
```

Stores notes, DOM reference to the notes control; later code reuses this result so the ledger.js workflow stays consistent.

### Line 412

```text
    let hours = 0;
```

Creates mutable hours state for this workflow; it changes as the user selects, edits, or loads records.

### Line 413

```text
    let amount = 0;
```

Creates mutable amount state for this workflow; it changes as the user selects, edits, or loads records.

### Line 414

```text
    if (type === 'normal') {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 415

```text
      hours = Number(hoursInput.value);
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 416

```text
      if (!Number.isFinite(hours) || hours < 0) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 417

```text
        window.alert('Hours must be a valid number of zero or more.');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 418

```text
        return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 419

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 420

```text
      amount = employee.getPay(hours);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 421

```text
    } else {
```

Provides the alternate branch when the preceding condition is not satisfied.

### Line 422

```text
      amount = Number(amountInput.value);
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 423

```text
      if (!Number.isFinite(amount) || amount < 0) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 424

```text
        window.alert('Amount must be a valid number of zero or more.');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 425

```text
        return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 426

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 427

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 428

```text

```

Blank line separates related statements and has no runtime effect.

### Line 429

```text
    const submitButton = form.querySelector('button[type="submit"]');
```

Stores submitButton, DOM query used to find the submitButton elements; later code reuses this result so the ledger.js workflow stays consistent.

### Line 430

```text
    submitButton.disabled = true;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 431

```text
    try {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 432

```text
      const entry = await store.saveLedgerEntry({
```

Stores entry, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 433

```text
        employeeId,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 434

```text
        date: dateInput.value,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 435

```text
        type,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 436

```text
        hours,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 437

```text
        amount,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 438

```text
        notes
```

Defines field notes as `notes` (notes).

### Line 439

```text
      });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 440

```text
      if (ledgerFilter.value !== employeeId) ledgerFilter.value = employeeId;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 441

```text
      renderLedger();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 442

```text
      form.reset();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 443

```text
      dateInput.value = localDateInputValue();
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 444

```text
      typeSelect.value = 'normal';
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 445

```text
      updateTypeInputs();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 446

```text
      employeeSelect.value = employeeId;
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 447

```text
      ledgerEntryStatus.textContent = entry.archivedOnZero
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 448

```text
        ? 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.'
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 449

```text
        : '';
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 450

```text
    } catch (error) {
```

Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.

### Line 451

```text
      console.error('Unable to save ledger entry:', error);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 452

```text
      if (error.entrySaved) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 453

```text
        form.reset();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 454

```text
        dateInput.value = localDateInputValue();
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 455

```text
        typeSelect.value = 'normal';
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 456

```text
        updateTypeInputs();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 457

```text
        employeeSelect.value = employeeId;
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 458

```text
        if (ledgerFilter.value !== employeeId) ledgerFilter.value = employeeId;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 459

```text
        renderLedger();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 460

```text
        ledgerEntryStatus.textContent = error.message;
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 461

```text
        return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 462

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 463

```text
      window.alert(error.message || 'Unable to save this ledger entry. Please try again.');
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 464

```text
    } finally {
```

Runs cleanup regardless of success, such as restoring button text or re-enabling controls.

### Line 465

```text
      submitButton.disabled = false;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 466

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 467

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 468

```text

```

Blank line separates related statements and has no runtime effect.

### Line 469

```text
  tableBody.addEventListener('click', async event => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 470

```text
    const editButton = event.target.closest('.edit-ledger-btn[data-id]');
```

Stores editButton, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 471

```text
    if (editButton) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 472

```text
      const entry = store.ledger.getEntry(editButton.dataset.id);
```

Stores entry, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 473

```text
      openEditDialog(entry, editButton);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 474

```text
      return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 475

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 476

```text
    const button = event.target.closest('.delete-btn[data-id]');
```

Stores button, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 477

```text
    if (!button) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 478

```text
    button.disabled = true;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 479

```text
    const previousArchiveCount = store.recentlyArchivedLedgerIds.length;
```

Stores previousArchiveCount, value; later code reuses this result so the ledger.js workflow stays consistent.

### Line 480

```text
    try {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 481

```text
      await store.deleteLedgerEntry(button.dataset.id);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 482

```text
      renderLedger();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 483

```text
      if (store.recentlyArchivedLedgerIds.length > previousArchiveCount) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 484

```text
        ledgerEntryStatus.textContent = 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 485

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 486

```text
    } catch (error) {
```

Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.

### Line 487

```text
      console.error('Unable to delete ledger entry:', error);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 488

```text
      if (error.entrySaved) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 489

```text
        renderLedger();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 490

```text
        ledgerEntryStatus.textContent = error.message;
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 491

```text
        return;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 492

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 493

```text
      button.disabled = false;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 494

```text
      window.alert('This ledger entry could not be deleted. Please try again.');
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 495

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 496

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 497

```text
});
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

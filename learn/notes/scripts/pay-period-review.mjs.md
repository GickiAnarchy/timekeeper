# scripts/pay-period-review.mjs

[Exact copy](../../original/scripts/pay-period-review.mjs)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import {
```

Loads the named module so its side effects or exports are available to this page.

### Line 2

```text
  actualShiftHours,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 3

```text
  invoiceShiftIds,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 4

```text
  ledgerBalanceCents
```

Continues the surrounding pay-period-review.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 5

```text
} from './domain.mjs';
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 6

```text

```

Blank line separates related statements and has no runtime effect.

### Line 7

```text
function dateOnly(value) {
```

Defines the private helper dateOnly for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 8

```text
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 9

```text
  const [year, month, day] = value.split('-').map(Number);
```

Stores destructured values, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 10

```text
  const date = new Date(year, month - 1, day);
```

Stores date, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 11

```text
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
```

Returns checks uses checks that calls `date.getDate` with no arguments and `day` (day) have the same value and type only if uses checks that calls `date.getMonth` with no arguments and subtracts 1 from `month` (month) have the same value and type only if checks that calls `date.getFullYear` with no arguments and `year` (year) have the same value and type is truthy; otherwise keeps the falsy first value is truthy; otherwise keeps the falsy first value; if true chooses `date` (date), otherwise null to the caller and exits this function.

### Line 12

```text
    ? date : null;
```

Sets the ? date property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 13

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 14

```text

```

Blank line separates related statements and has no runtime effect.

### Line 15

```text
function localDateKey(date) {
```

Defines the private helper localDateKey for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 16

```text
  const year = date.getFullYear();
```

Stores year, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 17

```text
  const month = String(date.getMonth() + 1).padStart(2, '0');
```

Stores month, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 18

```text
  const day = String(date.getDate()).padStart(2, '0');
```

Stores day, a date value used for local-day or period calculations; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 19

```text
  return `${year}-${month}-${day}`;
```

Returns a text template that combines fixed text with computed values `year` (year), `month` (month), `day` (day) to the caller and exits this function.

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
function idOf(value) {
```

Defines the private helper idOf for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 23

```text
  return value === null || value === undefined || value === '' ? '' : String(value);
```

Returns checks uses uses checks that `value` (value) and null have the same value and type when it is truthy, otherwise falls back to checks that `value` (value) and `undefined` (undefined) have the same value and type when it is truthy, otherwise falls back to checks that `value` (value) and "" have the same value and type; if true chooses "", otherwise converts `value` (value) to text to the caller and exits this function.

### Line 24

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 25

```text

```

Blank line separates related statements and has no runtime effect.

### Line 26

```text
function asDate(value) {
```

Defines the private helper asDate for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 27

```text
  if (value instanceof Date) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 28

```text
    const copy = new Date(value);
```

Stores copy, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 29

```text
    return Number.isNaN(copy.getTime()) ? null : copy;
```

Returns checks checks whether gets `copy` (copy) as milliseconds since 1970-01-01 UTC is the special invalid-number value NaN; if true chooses null, otherwise `copy` (copy) to the caller and exits this function.

### Line 30

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 31

```text
  if (value && typeof value.toDate === 'function') return asDate(value.toDate());
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 32

```text
  if (value === null || value === undefined || value === '') return null;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 33

```text
  const date = new Date(value);
```

Stores date, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 34

```text
  return Number.isNaN(date.getTime()) ? null : date;
```

Returns checks checks whether gets `date` (date) as milliseconds since 1970-01-01 UTC is the special invalid-number value NaN; if true chooses null, otherwise `date` (date) to the caller and exits this function.

### Line 35

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 36

```text

```

Blank line separates related statements and has no runtime effect.

### Line 37

```text
function arrayValue(value) {
```

Defines the private helper arrayValue for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 38

```text
  return Array.isArray(value) ? value : [];
```

Returns checks checks whether `value` (value) is an array; if true chooses `value` (value), otherwise an array containing  to the caller and exits this function.

### Line 39

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 40

```text

```

Blank line separates related statements and has no runtime effect.

### Line 41

```text
function employeeIdOf(shift) {
```

Defines the private helper employeeIdOf for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 42

```text
  return idOf(shift?.employeeId ?? shift?.employee?.id);
```

Returns calls `idOf` with uses `shift?.employeeId` (the employee id property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to `shift?.employee?.id` (the id property of shift?.employee); optional chaining stops with undefined if a guarded receiver is null or undefined to the caller and exits this function.

### Line 43

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 44

```text

```

Blank line separates related statements and has no runtime effect.

### Line 45

```text
function employeeNameOf(shift, employeeMap) {
```

Defines the private helper employeeNameOf for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 46

```text
  const id = employeeIdOf(shift);
```

Stores id, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 47

```text
  return shift?.employeeName ?? shift?.employee?.name ?? employeeMap.get(id)?.name ?? (id ? 'Unknown employee' : 'Unassigned employee');
```

Returns uses uses uses `shift?.employeeName` (the employee name property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to `shift?.employee?.name` (the name property of shift?.employee); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to `employeeMap.get(id)?.name` (the name property of employeeMap.get(id)); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to checks `id` (id); if true chooses "Unknown employee", otherwise "Unassigned employee" to the caller and exits this function.

### Line 48

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 49

```text

```

Blank line separates related statements and has no runtime effect.

### Line 50

```text
function customerIdOf(shift) {
```

Defines the private helper customerIdOf for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 51

```text
  return idOf(shift?.customerId ?? shift?.customer?.id);
```

Returns calls `idOf` with uses `shift?.customerId` (the customer id property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to `shift?.customer?.id` (the id property of shift?.customer); optional chaining stops with undefined if a guarded receiver is null or undefined to the caller and exits this function.

### Line 52

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 53

```text

```

Blank line separates related statements and has no runtime effect.

### Line 54

```text
function customerNameOf(shift) {
```

Defines the private helper customerNameOf for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 55

```text
  return shift?.customerName ?? shift?.customer?.name ?? (customerIdOf(shift) ? 'Unknown customer' : '');
```

Returns uses uses `shift?.customerName` (the customer name property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to `shift?.customer?.name` (the name property of shift?.customer); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to checks calls `customerIdOf` with `shift` (shift); if true chooses "Unknown customer", otherwise "" to the caller and exits this function.

### Line 56

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 57

```text

```

Blank line separates related statements and has no runtime effect.

### Line 58

```text
function customerRateOf(shift) {
```

Defines the private helper customerRateOf for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 59

```text
  return shift?.billingRate ?? shift?.customerBillingRate ?? shift?.customer?.billingRate;
```

Returns uses uses `shift?.billingRate` (the billing rate property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to `shift?.customerBillingRate` (the customer billing rate property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to `shift?.customer?.billingRate` (the billing rate property of shift?.customer); optional chaining stops with undefined if a guarded receiver is null or undefined to the caller and exits this function.

### Line 60

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 61

```text

```

Blank line separates related statements and has no runtime effect.

### Line 62

```text
function emptyResult() {
```

Defines the private helper emptyResult for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 63

```text
  return {
```

Returns an object with fields shifts: an array containing ; employees: an array containing ; totals: an object with fields shiftCount: 0; actualHours: 0; paidHours: 0; paidShiftCount: 0; unpaidShiftCount: 0; unpaidHours: 0; and further fields; activeShiftCount: 0; invalidShiftCount: 0 to the caller and exits this function.

### Line 64

```text
    shifts: [], employees: [],
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 65

```text
    totals: { shiftCount: 0, actualHours: 0, paidHours: 0, paidShiftCount: 0, unpaidShiftCount: 0, unpaidHours: 0, invoiceReadyCount: 0, invoiceReadyHours: 0, invoiceReadyCents: 0 },
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 66

```text
    activeShiftCount: 0,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 67

```text
    invalidShiftCount: 0
```

Sets the invalidShiftCount property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 68

```text
  };
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 69

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 70

```text

```

Blank line separates related statements and has no runtime effect.

### Line 71

```text
export function currentWeekRange(now = new Date()) {
```

Declares currentWeekRange(), which returns Monday-through-Sunday local date keys for a week.

### Line 72

```text
  const date = asDate(now);
```

Stores date, a date value used for local-day or period calculations; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 73

```text
  if (!date) throw new TypeError('A valid date is required.');
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 74

```text
  const day = date.getDay();
```

Stores day, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 75

```text
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (day === 0 ? 6 : day - 1));
```

Stores monday, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 76

```text
  const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
```

Stores sunday, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 77

```text
  return { startDate: localDateKey(monday), endDate: localDateKey(sunday) };
```

Returns an object with fields startDate: calls `localDateKey` with `monday` (monday); endDate: calls `localDateKey` with `sunday` (sunday) to the caller and exits this function.

### Line 78

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 79

```text

```

Blank line separates related statements and has no runtime effect.

### Line 80

```text
export function buildPayPeriodReview({
```

Declares buildPayPeriodReview(), which filters shifts and combines payroll, ledger, and invoice status into review totals.

### Line 81

```text
  shifts = [], employees = [], ledgerEntries = [], ledgerArchiveRows = [], invoices = [], startDate, endDate, employeeId = ''
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 82

```text
} = {}) {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 83

```text
  const start = dateOnly(startDate);
```

Stores start, a date value used for local-day or period calculations; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 84

```text
  const end = dateOnly(endDate);
```

Stores end, a date value used for local-day or period calculations; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 85

```text
  if (!start || !end) throw new TypeError('Choose valid From and Through dates (YYYY-MM-DD).');
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 86

```text
  if (end < start) throw new RangeError('The Through date must be on or after the From date.');
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 87

```text

```

Blank line separates related statements and has no runtime effect.

### Line 88

```text
  const result = emptyResult();
```

Stores result, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 89

```text
  const employeeFilter = idOf(employeeId);
```

Stores employeeFilter, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 90

```text
  const employeeList = employees instanceof Map ? [...employees.values()] : arrayValue(employees);
```

Stores employeeList, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 91

```text
  const employeeMap = new Map(employeeList.map(employee => [idOf(employee?.id), employee]));
```

Stores employeeMap, a lookup map for fast employee/archive matching; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 92

```text
  const activeLedger = arrayValue(ledgerEntries);
```

Stores activeLedger, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 93

```text
  const archiveRows = arrayValue(ledgerArchiveRows);
```

Stores archiveRows, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 94

```text
  const ledgerStatusByShift = new Map();
```

Stores ledgerStatusByShift, a lookup map for fast employee/archive matching; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 95

```text
  for (const entry of archiveRows) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 96

```text
    const id = idOf(entry?.sourceShiftId);
```

Stores id, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 97

```text
    if (id && !ledgerStatusByShift.has(id)) ledgerStatusByShift.set(id, 'Archived ledger');
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 98

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 99

```text
  for (const entry of activeLedger) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 100

```text
    const id = idOf(entry?.sourceShiftId);
```

Stores id, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 101

```text
    if (id) ledgerStatusByShift.set(id, 'Active ledger');
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 102

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 103

```text
  const invoiceByShift = new Map();
```

Stores invoiceByShift, a lookup map for fast employee/archive matching; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 104

```text
  for (const invoice of arrayValue(invoices)) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 105

```text
    const ids = invoiceShiftIds(invoice);
```

Stores ids, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 106

```text
    for (const id of ids) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 107

```text
      if (!invoiceByShift.has(id)) invoiceByShift.set(id, []);
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 108

```text
      invoiceByShift.get(id).push(invoice);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 109

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 110

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 111

```text

```

Blank line separates related statements and has no runtime effect.

### Line 112

```text
  const inRange = key => key >= startDate && key <= endDate;
```

Stores inRange, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 113

```text
  const summaryIds = new Set(employeeList.map(employee => idOf(employee?.id)));
```

Stores summaryIds, a set of unique IDs used to prevent duplicate links; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 114

```text
  activeLedger.forEach(entry => summaryIds.add(idOf(entry?.employeeId)));
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 115

```text
  archiveRows.forEach(entry => summaryIds.add(idOf(entry?.employeeId)));
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 116

```text
  const consideredShifts = [];
```

Stores consideredShifts, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 117

```text
  for (const shift of arrayValue(shifts)) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 118

```text
    const shiftEmployeeId = employeeIdOf(shift);
```

Stores shiftEmployeeId, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 119

```text
    summaryIds.add(shiftEmployeeId);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 120

```text
    const clockIn = asDate(shift?.clockInTime);
```

Stores clockIn, a date value used for local-day or period calculations; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 121

```text
    if (!clockIn || !inRange(localDateKey(clockIn)) || (employeeFilter && shiftEmployeeId !== employeeFilter)) continue;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 122

```text
    const clockOutValue = shift?.clockOutTime;
```

Stores clockOutValue, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 123

```text
    const hasEnd = clockOutValue !== null && clockOutValue !== undefined && clockOutValue !== '';
```

Stores hasEnd, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 124

```text
    const clockOut = asDate(clockOutValue);
```

Stores clockOut, a date value used for local-day or period calculations; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 125

```text
    if (!clockOut && !hasEnd) { result.activeShiftCount++; continue; }
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 126

```text
    if (!clockOut || clockOut <= clockIn) { result.invalidShiftCount++; continue; }
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 127

```text
    const actualHours = actualShiftHours(clockIn, clockOut, shift?.breaks);
```

Stores actualHours, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 128

```text
    const paidHours = Number.isFinite(shift?.paidHours) ? Number(shift.paidHours) : actualHours;
```

Stores paidHours, a numeric value validated for payroll math; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 129

```text
    const id = idOf(shift?.id);
```

Stores id, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 130

```text
    const linkedInvoices = invoiceByShift.get(id) || [];
```

Stores linkedInvoices, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 131

```text
    const customerId = customerIdOf(shift);
```

Stores customerId, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 132

```text
    const rawRate = customerRateOf(shift);
```

Stores rawRate, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 133

```text
    const rate = Number(rawRate);
```

Stores rate, a numeric value validated for payroll math; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 134

```text
    const hasRate = rawRate !== null && rawRate !== undefined && rawRate !== '' && Number.isFinite(rate) && rate >= 0;
```

Stores hasRate, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 135

```text
    let invoiceStatus = 'Missing customer';
```

Creates mutable invoiceStatus state for this workflow; it changes as the user selects, edits, or loads records.

### Line 136

```text
    let invoiceCents = 0;
```

Creates mutable invoiceCents state for this workflow; it changes as the user selects, edits, or loads records.

### Line 137

```text
    if (linkedInvoices.length) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 138

```text
      invoiceStatus = 'Linked';
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 139

```text
      for (const invoice of linkedInvoices) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 140

```text
        for (const item of arrayValue(invoice?.items)) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 141

```text
          if (idOf(item?.shiftId) === id && Number.isFinite(Number(item?.value))) invoiceCents += Math.round(Number(item.value) * 100);
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 142

```text
        }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 143

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 144

```text
    } else if (customerId && hasRate) {
```

Provides the alternate branch when the preceding condition is not satisfied.

### Line 145

```text
      invoiceStatus = 'Ready';
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 146

```text
      invoiceCents = Math.round(actualHours * rate * 100);
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 147

```text
    } else if (customerId) {
```

Provides the alternate branch when the preceding condition is not satisfied.

### Line 148

```text
      invoiceStatus = 'Missing billing rate';
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 149

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 150

```text
    consideredShifts.push({
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 151

```text
      id: shift?.id, employeeId: shiftEmployeeId, employeeName: employeeNameOf(shift, employeeMap), customerName: customerNameOf(shift),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 152

```text
      start: new Date(clockIn), actualHours, paidHours, isPaid: Boolean(shift?.isPaid),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 153

```text
      ledgerStatus: ledgerStatusByShift.get(id) || 'Not linked', invoiceStatus, invoiceCents
```

Sets the ledgerStatus property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 154

```text
    });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 155

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 156

```text

```

Blank line separates related statements and has no runtime effect.

### Line 157

```text
  result.shifts = consideredShifts.sort((a, b) => b.start - a.start);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 158

```text
  result.shifts.forEach(row => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 159

```text
    result.totals.shiftCount++;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 160

```text
    result.totals.actualHours += row.actualHours;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 161

```text
    result.totals.paidHours += row.paidHours;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 162

```text
    if (row.isPaid) result.totals.paidShiftCount++; else { result.totals.unpaidShiftCount++; result.totals.unpaidHours += row.paidHours; }
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 163

```text
    if (row.invoiceStatus === 'Ready') { result.totals.invoiceReadyCount++; result.totals.invoiceReadyHours += row.actualHours; result.totals.invoiceReadyCents += row.invoiceCents; }
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 164

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 165

```text

```

Blank line separates related statements and has no runtime effect.

### Line 166

```text
  const summaryOrder = employeeFilter ? [employeeFilter] : [...summaryIds];
```

Stores summaryOrder, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 167

```text
  result.employees = summaryOrder.filter(id => !employeeFilter || id === employeeFilter).map(id => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 168

```text
    const employee = employeeMap.get(id);
```

Stores employee, value; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 169

```text
    const rows = result.shifts.filter(row => row.employeeId === id);
```

Stores rows, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 170

```text
    const entries = activeLedger.filter(entry => idOf(entry?.employeeId) === id);
```

Stores entries, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the pay-period-review.mjs workflow stays consistent.

### Line 171

```text
    return {
```

Returns an object with fields id: `id` (id); name: uses `employee?.name` (the name property of employee); optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to checks `id` (id); if true chooses uses `rows[0]?.employeeName`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "Unknown employee", otherwise "Unassigned employee"; shiftCount: `rows.length` (the length property of rows); actualHours: combines the items of `rows` (rows) with a callback taking sum, row that adds `sum` (sum) and `row.actualHours` (the actual hours property of row) (or joins them if a value is text), starting with 0; paidHours: combines the items of `rows` (rows) with a callback taking sum, row that adds `sum` (sum) and `row.paidHours` (the paid hours property of row) (or joins them if a value is text), starting with 0; unpaidHours: combines the items of keeps only items of `rows` (rows) for which a callback taking row that negates the truthiness of `row.isPaid` returns truthy with a callback taking sum, row that adds `sum` (sum) and `row.paidHours` (the paid hours property of row) (or joins them if a value is text), starting with 0; and further fields to the caller and exits this function.

### Line 172

```text
      id, name: employee?.name ?? (id ? (rows[0]?.employeeName || 'Unknown employee') : 'Unassigned employee'),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 173

```text
      shiftCount: rows.length, actualHours: rows.reduce((sum, row) => sum + row.actualHours, 0), paidHours: rows.reduce((sum, row) => sum + row.paidHours, 0),
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 174

```text
      unpaidHours: rows.filter(row => !row.isPaid).reduce((sum, row) => sum + row.paidHours, 0), balanceCents: ledgerBalanceCents(entries), ledgerEntryCount: entries.length
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 175

```text
    };
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 176

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 177

```text
  result.employees.sort((a, b) => a.name.localeCompare(b.name));
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 178

```text
  return result;
```

Returns `result` (result) to the caller and exits this function.

### Line 179

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

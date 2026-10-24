# scripts/domain.mjs

[Exact copy](../../original/scripts/domain.mjs)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
export function asValidDate(value) {
```

Declares asValidDate(), which normalizes Date, Firestore Timestamp, and date-like input while returning null for invalid values.

### Line 2

```text
  if (value === null || value === undefined || value === '') return null;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 3

```text
  const source = typeof value?.toDate === 'function' ? value.toDate() : value;
```

Stores source, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 4

```text
  const date = source instanceof Date ? new Date(source) : new Date(source);
```

Stores date, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 5

```text
  return Number.isNaN(date.getTime()) ? null : date;
```

Returns checks checks whether gets `date` (date) as milliseconds since 1970-01-01 UTC is the special invalid-number value NaN; if true chooses null, otherwise `date` (date) to the caller and exits this function.

### Line 6

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 7

```text

```

Blank line separates related statements and has no runtime effect.

### Line 8

```text
export function sortLedgerEntriesByDate(entries = []) {
```

Declares sortLedgerEntriesByDate(), which returns ledger entries newest-first with index and id tie-breakers.

### Line 9

```text
  const dateValue = value => asValidDate(value)?.getTime() ?? Number.NEGATIVE_INFINITY;
```

Stores dateValue, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 10

```text
  return [...entries].sort((a, b) => {
```

Returns sorts an array containing the expanded entries/properties from `entries` (entries) in place using comparison a callback taking a, b that runs its enclosed statements to the caller and exits this function.

### Line 11

```text
    const dateDifference = dateValue(b?.date) - dateValue(a?.date);
```

Stores dateDifference, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 12

```text
    if (dateDifference) return dateDifference;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 13

```text
    const indexDifference = Number(b?.index || 0) - Number(a?.index || 0);
```

Stores indexDifference, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 14

```text
    if (indexDifference) return indexDifference;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 15

```text
    return String(a?.id || '').localeCompare(String(b?.id || ''));
```

Returns calls `String(a?.id || '').localeCompare` with converts uses `b?.id` (the id property of b); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "" to text to the caller and exits this function.

### Line 16

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 17

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 18

```text

```

Blank line separates related statements and has no runtime effect.

### Line 19

```text
export function sumLedgerHours(entries = []) {
```

Declares sumLedgerHours(), which totals payable hours while deliberately excluding advances.

### Line 20

```text
  return (Array.isArray(entries) ? entries : []).reduce((sum, entry) => {
```

Returns the accumulated total produced from the selected records.

### Line 21

```text
    if (String(entry?.type || '').toLowerCase() === 'advance') return sum;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 22

```text
    const hours = Number(entry?.hours || 0);
```

Stores hours, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 23

```text
    return Number.isFinite(hours) ? sum + hours : sum;
```

Returns checks checks that `hours` (hours) is a finite number, excluding NaN and infinity; if true chooses adds `sum` (sum) and `hours` (hours) (or joins them if a value is text), otherwise `sum` (sum) to the caller and exits this function.

### Line 24

```text
  }, 0);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 25

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 26

```text

```

Blank line separates related statements and has no runtime effect.

### Line 27

```text
export function ledgerBalanceCents(entries = []) {
```

Declares ledgerBalanceCents(), which computes the ledger balance in integer cents, subtracting advances.

### Line 28

```text
  return (Array.isArray(entries) ? entries : []).reduce((balance, entry) => {
```

Returns the accumulated total produced from the selected records.

### Line 29

```text
    const amount = Number(entry?.amount || 0);
```

Stores amount, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 30

```text
    if (!Number.isFinite(amount)) return balance;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 31

```text
    const cents = Math.round(amount * 100);
```

Stores cents, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 32

```text
    const type = String(entry?.type || '').toLowerCase();
```

Stores type, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 33

```text
    return balance + (type === 'advance' ? -cents : cents);
```

Returns adds `balance` (balance) and checks checks that `type` (type) and "advance" have the same value and type; if true chooses changes the numeric sign of `cents` (cents), otherwise `cents` (cents) (or joins them if a value is text) to the caller and exits this function.

### Line 34

```text
  }, 0);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

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
export function sortTableRows(rows = [], { key, direction = 'ascending', type = 'text', getValue = row => row?.[key] } = {}) {
```

Declares sortTableRows(), which stably sorts rows by typed values and keeps blank values at the bottom.

### Line 38

```text
  const source = Array.isArray(rows) ? rows : [];
```

Stores source, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 39

```text
  if (!key || !['ascending', 'descending'].includes(direction)) return [...source];
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 40

```text

```

Blank line separates related statements and has no runtime effect.

### Line 41

```text
  const normalizedType = ['number', 'date'].includes(type) ? type : 'text';
```

Stores normalizedType, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 42

```text
  const comparable = value => {
```

Stores comparable, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 43

```text
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) return null;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 44

```text
    if (normalizedType === 'number') {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 45

```text
      const number = Number(value);
```

Stores number, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 46

```text
      return Number.isFinite(number) ? number : null;
```

Returns checks checks that `number` (number) is a finite number, excluding NaN and infinity; if true chooses `number` (number), otherwise null to the caller and exits this function.

### Line 47

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 48

```text
    if (normalizedType === 'date') return asValidDate(value)?.getTime() ?? null;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 49

```text
    return String(value).trim();
```

Returns removes leading and trailing whitespace from converts `value` (value) to text to the caller and exits this function.

### Line 50

```text
  };
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 51

```text

```

Blank line separates related statements and has no runtime effect.

### Line 52

```text
  return source.map((row, index) => ({ row, index, value: comparable(getValue(row, key)) }))
```

Returns transforms each item of sorts transforms each item of `source` (source) using a callback taking row, index that an object with fields row: `row` (row); index: `index` (index); value: `comparable(getValue(row, key))` and returns a new array in place using comparison a callback taking a, b that runs its enclosed statements using a callback taking item that `item.row` (the row property of item) and returns a new array to the caller and exits this function.

### Line 53

```text
    .sort((a, b) => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 54

```text
      if (a.value === null || b.value === null) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 55

```text
        if (a.value === null && b.value === null) return a.index - b.index;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 56

```text
        return a.value === null ? 1 : -1;
```

Returns checks checks that `a.value` (the value property of a) and null have the same value and type; if true chooses 1, otherwise changes the numeric sign of 1 to the caller and exits this function.

### Line 57

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 58

```text
      const comparison = normalizedType === 'text'
```

Stores comparison, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 59

```text
        ? a.value.localeCompare(b.value, undefined, { numeric: true, sensitivity: 'base' })
```

Sets the ? a.value.localeCompare(b.value, undefined, { numeric property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 60

```text
        : a.value - b.value;
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 61

```text
      return comparison === 0 ? a.index - b.index : direction === 'descending' ? -comparison : comparison;
```

Returns checks checks that `comparison` (comparison) and 0 have the same value and type; if true chooses subtracts `b.index` (the index property of b) from `a.index` (the index property of a), otherwise checks checks that `direction` (direction) and "descending" have the same value and type; if true chooses changes the numeric sign of `comparison` (comparison), otherwise `comparison` (comparison) to the caller and exits this function.

### Line 62

```text
    })
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 63

```text
    .map(item => item.row);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 64

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 65

```text

```

Blank line separates related statements and has no runtime effect.

### Line 66

```text
export function roundTo15Minutes(date = new Date()) {
```

Declares roundTo15Minutes(), which rounds a timestamp to the nearest quarter hour.

### Line 67

```text
  const source = asValidDate(date);
```

Stores source, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 68

```text
  if (!source) throw new TypeError('A valid date is required.');
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 69

```text
  const interval = 15 * 60 * 1000;
```

Stores interval, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 70

```text
  return new Date(Math.round(source.getTime() / interval) * interval);
```

Returns constructs a new instance of `Date` with multiplies rounds divides gets `source` (source) as milliseconds since 1970-01-01 UTC by `interval` (interval) to the nearest whole number by `interval` (interval) to the caller and exits this function.

### Line 71

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 72

```text

```

Blank line separates related statements and has no runtime effect.

### Line 73

```text
export function roundDown15Minutes(date = new Date()) {
```

Declares roundDown15Minutes(), which rounds a timestamp down to a quarter-hour boundary.

### Line 74

```text
  const source = asValidDate(date);
```

Stores source, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 75

```text
  if (!source) throw new TypeError('A valid date is required.');
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 76

```text
  const interval = 15 * 60 * 1000;
```

Stores interval, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 77

```text
  return new Date(Math.floor(source.getTime() / interval) * interval);
```

Returns constructs a new instance of `Date` with multiplies rounds divides gets `source` (source) as milliseconds since 1970-01-01 UTC by `interval` (interval) down to the next whole number by `interval` (interval) to the caller and exits this function.

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
export function roundUp15Minutes(date = new Date()) {
```

Declares roundUp15Minutes(), which rounds a timestamp up to a quarter-hour boundary.

### Line 81

```text
  const source = asValidDate(date);
```

Stores source, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 82

```text
  if (!source) throw new TypeError('A valid date is required.');
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 83

```text
  const interval = 15 * 60 * 1000;
```

Stores interval, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 84

```text
  return new Date(Math.ceil(source.getTime() / interval) * interval);
```

Returns constructs a new instance of `Date` with multiplies rounds divides gets `source` (source) as milliseconds since 1970-01-01 UTC by `interval` (interval) up to the next whole number by `interval` (interval) to the caller and exits this function.

### Line 85

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 86

```text

```

Blank line separates related statements and has no runtime effect.

### Line 87

```text
export function actualShiftHours(clockInTime, clockOutTime, breaks = []) {
```

Declares actualShiftHours(), which calculates completed shift duration minus the union of overlapping breaks.

### Line 88

```text
  const start = asValidDate(clockInTime);
```

Stores start, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 89

```text
  const end = asValidDate(clockOutTime);
```

Stores end, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 90

```text
  if (!start || !end || end <= start) return 0;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 91

```text

```

Blank line separates related statements and has no runtime effect.

### Line 92

```text
  const intervals = (Array.isArray(breaks) ? breaks : [])
```

Stores intervals, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 93

```text
    .map(item => ({ start: asValidDate(item?.start), end: asValidDate(item?.end) }))
```

Sets the .map(item => ({ start property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 94

```text
    .filter(item => item.start && item.end && item.end > item.start)
```

Continues the surrounding domain.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 95

```text
    .map(item => ({
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 96

```text
      start: Math.max(start.getTime(), item.start.getTime()),
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 97

```text
      end: Math.min(end.getTime(), item.end.getTime())
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 98

```text
    }))
```

Continues the surrounding domain.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 99

```text
    .filter(item => item.end > item.start)
```

Continues the surrounding domain.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 100

```text
    .sort((a, b) => a.start - b.start);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 101

```text

```

Blank line separates related statements and has no runtime effect.

### Line 102

```text
  let breakMs = 0;
```

Creates mutable breakMs state for this workflow; it changes as the user selects, edits, or loads records.

### Line 103

```text
  let current = null;
```

Creates mutable current state for this workflow; it changes as the user selects, edits, or loads records.

### Line 104

```text
  for (const interval of intervals) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 105

```text
    if (!current || interval.start > current.end) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 106

```text
      if (current) breakMs += current.end - current.start;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 107

```text
      current = { ...interval };
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 108

```text
    } else {
```

Provides the alternate branch when the preceding condition is not satisfied.

### Line 109

```text
      current.end = Math.max(current.end, interval.end);
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 110

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 111

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 112

```text
  if (current) breakMs += current.end - current.start;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 113

```text

```

Blank line separates related statements and has no runtime effect.

### Line 114

```text
  return Number((Math.max(0, end.getTime() - start.getTime() - breakMs) / 3_600_000).toFixed(2));
```

Returns converts formats divides chooses the largest of 0, subtracts `breakMs` (break ms) from `end.getTime() - start.getTime()` by 3600000 as text with 2 digits after the decimal point to a number (invalid numeric text becomes NaN) to the caller and exits this function.

### Line 115

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 116

```text

```

Blank line separates related statements and has no runtime effect.

### Line 117

```text
export function plannedDateStatus(scheduledDate, today = new Date()) {
```

Declares plannedDateStatus(), which classifies a scheduled job relative to today using calendar days.

### Line 118

```text
  const date = asValidDate(scheduledDate);
```

Stores date, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 119

```text
  if (!date) return 'tbd';
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 120

```text
  const todayDate = asValidDate(today) || new Date();
```

Stores todayDate, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 121

```text
  const dayNumber = value => Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()) / 86_400_000;
```

Stores dayNumber, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 122

```text
  const difference = dayNumber(date) - dayNumber(todayDate);
```

Stores difference, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 123

```text
  if (difference < 0) return 'overdue';
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 124

```text
  if (difference === 0) return 'due-today';
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 125

```text
  if (difference === 1) return 'tomorrow';
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 126

```text
  return 'upcoming';
```

Returns "upcoming" to the caller and exits this function.

### Line 127

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 128

```text

```

Blank line separates related statements and has no runtime effect.

### Line 129

```text
export function invoiceShiftIds(invoice) {
```

Declares invoiceShiftIds(), which collects linked shift IDs from both invoice metadata and labor items.

### Line 130

```text
  const ids = new Set((Array.isArray(invoice?.shiftIds) ? invoice.shiftIds : []).filter(Boolean).map(String));
```

Stores ids, a set of unique IDs used to prevent duplicate links; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 131

```text
  (Array.isArray(invoice?.items) ? invoice.items : []).forEach(item => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 132

```text
    if (item?.shiftId) ids.add(String(item.shiftId));
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 133

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 134

```text
  return ids;
```

Returns `ids` (ids) to the caller and exits this function.

### Line 135

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 136

```text

```

Blank line separates related statements and has no runtime effect.

### Line 137

```text
export function shiftIsAttachedElsewhere(invoices, shiftId, invoiceId) {
```

Declares shiftIsAttachedElsewhere(), which checks whether another invoice already claims the shift.

### Line 138

```text
  const targetShiftId = String(shiftId);
```

Stores targetShiftId, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 139

```text
  return (Array.isArray(invoices) ? invoices : []).some(invoice =>
```

Returns checks whether any item of checks checks whether `invoices` (invoices) is an array; if true chooses `invoices` (invoices), otherwise an array containing  passes a callback taking invoice that uses calls `invoiceShiftIds(invoice).has` with `targetShiftId` (target shift id) only if checks that converts `invoice?.id` to text and converts `invoiceId` (invoice id) to text differ in value or type is truthy; otherwise keeps the falsy first value to the caller and exits this function.

### Line 140

```text
    String(invoice?.id) !== String(invoiceId) && invoiceShiftIds(invoice).has(targetShiftId)
```

Converts `invoice?.id` (the id property of invoice); optional chaining stops with undefined if a guarded receiver is null or undefined to text.

### Line 141

```text
  );
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 142

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 143

```text

```

Blank line separates related statements and has no runtime effect.

### Line 144

```text
export function shiftSnapshot(shift) {
```

Declares shiftSnapshot(), which creates a stable, ISO-date snapshot used to detect later shift edits.

### Line 145

```text
  const asIso = value => asValidDate(value)?.toISOString() || null;
```

Stores asIso, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 146

```text
  const breaks = (Array.isArray(shift?.breaks) ? shift.breaks : [])
```

Stores breaks, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 147

```text
    .map(item => ({ start: asIso(item?.start), end: asIso(item?.end) }))
```

Sets the .map(item => ({ start property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 148

```text
    .sort((a, b) => String(a.start || '').localeCompare(String(b.start || '')) || String(a.end || '').localeCompare(String(b.end || '')));
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 149

```text
  return {
```

Returns an object with fields employeeId: checks compares `shift?.employee?.id` (the id property of shift?.employee); optional chaining stops with undefined if a guarded receiver is null or undefined and null, allowing JavaScript to convert types; if true chooses null, otherwise converts `shift.employee.id` (the id property of shift.employee) to text; customerId: checks compares `shift?.customer?.id` (the id property of shift?.customer); optional chaining stops with undefined if a guarded receiver is null or undefined and null, allowing JavaScript to convert types; if true chooses null, otherwise converts `shift.customer.id` (the id property of shift.customer) to text; clockInTime: calls `asIso` with `shift?.clockInTime` (the clock in time property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined; clockOutTime: calls `asIso` with `shift?.clockOutTime` (the clock out time property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined; breaks: `breaks` (breaks); billedHours: calls `actualShiftHours` with `shift?.clockInTime` (the clock in time property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined; `shift?.clockOutTime` (the clock out time property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined; `shift?.breaks` (the breaks property of shift); optional chaining stops with undefined if a guarded receiver is null or undefined to the caller and exits this function.

### Line 150

```text
    employeeId: shift?.employee?.id == null ? null : String(shift.employee.id),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 151

```text
    customerId: shift?.customer?.id == null ? null : String(shift.customer.id),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 152

```text
    clockInTime: asIso(shift?.clockInTime),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 153

```text
    clockOutTime: asIso(shift?.clockOutTime),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 154

```text
    breaks,
```

Stops this switch/loop branch after its work is complete.

### Line 155

```text
    billedHours: actualShiftHours(shift?.clockInTime, shift?.clockOutTime, shift?.breaks)
```

Sets the billedHours property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 156

```text
  };
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 157

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 158

```text

```

Blank line separates related statements and has no runtime effect.

### Line 159

```text
export function makeShiftInvoiceLine(shift, billingRate) {
```

Declares makeShiftInvoiceLine(), which builds a labor invoice line from break-adjusted hours and a customer rate.

### Line 160

```text
  const rate = Number(billingRate);
```

Stores rate, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 161

```text
  if (!Number.isFinite(rate) || rate < 0) throw new TypeError('A valid non-negative customer billing rate is required.');
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 162

```text
  const snapshot = shiftSnapshot(shift);
```

Stores snapshot, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 163

```text
  if (!snapshot.clockInTime || !snapshot.clockOutTime || !Number.isFinite(snapshot.billedHours) || snapshot.billedHours < 0) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 164

```text
    throw new TypeError('A completed shift with valid break-adjusted hours is required.');
```

Rejects invalid application data immediately so callers cannot save misleading payroll or billing results.

### Line 165

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 166

```text
  return {
```

Returns an object with fields name: ""; value: converts formats multiplies `snapshot.billedHours` (the billed hours property of snapshot) by `rate` (rate) as text with 2 digits after the decimal point to a number (invalid numeric text becomes NaN); shiftId: converts `shift.id` (the id property of shift) to text; actualHours: `snapshot.billedHours` (the billed hours property of snapshot); billedHours: `snapshot.billedHours` (the billed hours property of snapshot); billingRate: `rate` (rate); and further fields to the caller and exits this function.

### Line 167

```text
    name: '',
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 168

```text
    value: Number((snapshot.billedHours * rate).toFixed(2)),
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 169

```text
    shiftId: String(shift.id),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 170

```text
    actualHours: snapshot.billedHours,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 171

```text
    billedHours: snapshot.billedHours,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 172

```text
    billingRate: rate,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 173

```text
    shiftSnapshot: snapshot
```

Sets the shiftSnapshot property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 174

```text
  };
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 175

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 176

```text

```

Blank line separates related statements and has no runtime effect.

### Line 177

```text
export function makeShiftLedgerEntryData(shift) {
```

Declares makeShiftLedgerEntryData(), which builds the employee-pay ledger record for a completed shift.

### Line 178

```text
  const start = asValidDate(shift?.clockInTime);
```

Stores start, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 179

```text
  const end = asValidDate(shift?.clockOutTime);
```

Stores end, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 180

```text
  const employeeId = shift?.employee?.id;
```

Stores employeeId, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 181

```text
  const shiftId = shift?.id;
```

Stores shiftId, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 182

```text
  const hours = Number(typeof shift?.getPaidHours === 'function'
```

Stores hours, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 183

```text
    ? shift.getPaidHours()
```

Calls `shift.getPaidHours` with no arguments.

### Line 184

```text
    : Number.isFinite(shift?.paidHours)
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 185

```text
      ? shift.paidHours
```

Continues the surrounding domain.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 186

```text
      : actualShiftHours(start, end, shift?.breaks));
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 187

```text
  const wage = Number(shift?.employee?.wage);
```

Stores wage, a numeric value validated for payroll math; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 188

```text

```

Blank line separates related statements and has no runtime effect.

### Line 189

```text
  if (!start || !end || end <= start || !employeeId || !shiftId) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 190

```text
    throw new TypeError('A completed shift with an employee is required.');
```

Rejects invalid application data immediately so callers cannot save misleading payroll or billing results.

### Line 191

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 192

```text
  if (!Number.isFinite(hours) || hours < 0 || !Number.isFinite(wage) || wage < 0) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 193

```text
    throw new TypeError('The shift must have valid non-negative paid hours and an employee wage.');
```

Rejects invalid application data immediately so callers cannot save misleading payroll or billing results.

### Line 194

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 195

```text

```

Blank line separates related statements and has no runtime effect.

### Line 196

```text
  const year = start.getFullYear();
```

Stores year, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 197

```text
  const month = String(start.getMonth() + 1).padStart(2, '0');
```

Stores month, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 198

```text
  const day = String(start.getDate()).padStart(2, '0');
```

Stores day, a date value used for local-day or period calculations; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 199

```text
  const customerName = String(shift.customer?.name || '').trim();
```

Stores customerName, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 200

```text
  const shiftNote = String(shift.note || '').trim();
```

Stores shiftNote, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 201

```text
  const notes = [customerName ? `Shift · ${customerName}` : 'Shift pay', shiftNote]
```

Stores notes, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 202

```text
    .filter(Boolean)
```

Continues the surrounding domain.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 203

```text
    .join(' — ');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 204

```text
  const amount = Number((wage * hours).toFixed(2));
```

Stores amount, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 205

```text
  if (!Number.isFinite(amount)) throw new TypeError('The shift pay amount is not valid.');
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 206

```text

```

Blank line separates related statements and has no runtime effect.

### Line 207

```text
  return {
```

Returns an object with fields employeeId: converts `employeeId` (employee id) to text; date: a text template that combines fixed text with computed values `year` (year), `month` (month), `day` (day); type: "normal"; hours: `hours` (hours); amount: `amount` (amount); notes: `notes` (notes); and further fields to the caller and exits this function.

### Line 208

```text
    employeeId: String(employeeId),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 209

```text
    date: `${year}-${month}-${day}`,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 210

```text
    type: 'normal',
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 211

```text
    hours,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 212

```text
    amount,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 213

```text
    notes,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 214

```text
    sourceShiftId: String(shiftId)
```

Sets the sourceShiftId property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 215

```text
  };
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 216

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 217

```text

```

Blank line separates related statements and has no runtime effect.

### Line 218

```text
export function shiftInvoiceLineStatus(line, currentShift) {
```

Declares shiftInvoiceLineStatus(), which compares a billed labor snapshot with the current source shift.

### Line 219

```text
  if (!currentShift) return 'missing';
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 220

```text
  const recorded = line?.shiftSnapshot;
```

Stores recorded, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 221

```text
  if (!recorded || typeof recorded !== 'object') return 'unverified';
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 222

```text
  const current = shiftSnapshot(currentShift);
```

Stores current, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 223

```text
  const sameBreaks = Array.isArray(recorded.breaks) && recorded.breaks.length === current.breaks.length &&
```

Stores sameBreaks, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 224

```text
    recorded.breaks.every((item, index) => item?.start === current.breaks[index].start && item?.end === current.breaks[index].end);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 225

```text
  const same = String(recorded.employeeId ?? '') === String(current.employeeId ?? '') &&
```

Stores same, value; later code reuses this result so the domain.mjs workflow stays consistent.

### Line 226

```text
    String(recorded.customerId ?? '') === String(current.customerId ?? '') &&
```

Converts uses `recorded.customerId` (the customer id property of recorded) unless it is null or undefined, then falls back to "" to text.

### Line 227

```text
    recorded.clockInTime === current.clockInTime && recorded.clockOutTime === current.clockOutTime &&
```

Continues the surrounding domain.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 228

```text
    Number(recorded.billedHours) === current.billedHours && sameBreaks;
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 229

```text
  return same ? 'current' : 'changed';
```

Returns checks `same` (same); if true chooses "current", otherwise "changed" to the caller and exits this function.

### Line 230

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

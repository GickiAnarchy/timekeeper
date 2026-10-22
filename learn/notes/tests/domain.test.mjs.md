# tests/domain.test.mjs

[Exact copy](../../original/tests/domain.test.source.mjs)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import test from 'node:test';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 2

```text
import assert from 'node:assert/strict';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 3

```text
import {
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 4

```text
  actualShiftHours,
```

Imports actualShiftHours from the shared module; actualShiftHours is the name used in this file.

### Line 5

```text
  ledgerBalanceCents,
```

Imports ledgerBalanceCents from the shared module; ledgerBalanceCents is the name used in this file.

### Line 6

```text
  makeShiftLedgerEntryData,
```

Imports makeShiftLedgerEntryData from the shared module; makeShiftLedgerEntryData is the name used in this file.

### Line 7

```text
  makeShiftInvoiceLine,
```

Imports makeShiftInvoiceLine from the shared module; makeShiftInvoiceLine is the name used in this file.

### Line 8

```text
  plannedDateStatus,
```

Imports plannedDateStatus from the shared module; plannedDateStatus is the name used in this file.

### Line 9

```text
  roundDown15Minutes,
```

Imports roundDown15Minutes from the shared module; roundDown15Minutes is the name used in this file.

### Line 10

```text
  roundTo15Minutes,
```

Imports roundTo15Minutes from the shared module; roundTo15Minutes is the name used in this file.

### Line 11

```text
  roundUp15Minutes,
```

Imports roundUp15Minutes from the shared module; roundUp15Minutes is the name used in this file.

### Line 12

```text
  sortLedgerEntriesByDate,
```

Imports sortLedgerEntriesByDate from the shared module; sortLedgerEntriesByDate is the name used in this file.

### Line 13

```text
  sortTableRows,
```

Imports sortTableRows from the shared module; sortTableRows is the name used in this file.

### Line 14

```text
  sumLedgerHours,
```

Imports sumLedgerHours from the shared module; sumLedgerHours is the name used in this file.

### Line 15

```text
  shiftInvoiceLineStatus,
```

Imports shiftInvoiceLineStatus from the shared module; shiftInvoiceLineStatus is the name used in this file.

### Line 16

```text
  shiftIsAttachedElsewhere
```

Imports shiftIsAttachedElsewhere from the shared module; shiftIsAttachedElsewhere is the name used in this file.

### Line 17

```text
} from '../scripts/domain.mjs';
```

Completes the named import list and tells the browser to resolve these shared helpers from ../scripts/domain.mjs. Imported bindings refer to exports of that module.

### Line 18

```text

```

Blank line separates related setup or assertions for readability.

### Line 19

```text
const date = value => new Date(value);
```

Defines the test fixture/helper date; its returned mock data represents the application state needed to exercise 'test setup'.

### Line 20

```text

```

Blank line separates related setup or assertions for readability.

### Line 21

```text
test('ledger entries sort newest first, then by entry index, without mutating the source', () => {
```

Starts an isolated test case whose title states the behavior being specified: ledger entries sort newest first, then by entry index, without mutating the source.

### Line 22

```text
  const entries = [
```

Builds entries, the concrete fixture collection/object used as input for 'ledger entries sort newest first, then by entry index, without mutating the source'; its fields model the relevant domain records or DOM state.

### Line 23

```text
    { id: 'older', date: '2026-10-08', index: 4 },
```

Sets the object field index using 4. This field is read later through its property name.

### Line 24

```text
    { id: 'newer-first', date: '2026-10-09', index: 2 },
```

Sets the object field index using 2. This field is read later through its property name.

### Line 25

```text
    { id: 'newer-last', date: '2026-10-09', index: 5 },
```

Sets the object field index using 5. This field is read later through its property name.

### Line 26

```text
    { id: 'invalid-date', date: 'not-a-date', index: 99 }
```

Sets the object field index using 99. This field is read later through its property name.

### Line 27

```text
  ];
```

Closes the fixture, callback, loop, or test block for 'ledger entries sort newest first, then by entry index, without mutating the source'.

### Line 28

```text

```

Blank line separates related setup or assertions for readability.

### Line 29

```text
  assert.deepEqual(sortLedgerEntriesByDate(entries).map(entry => entry.id), [
```

Calls `assert.deepEqual` with transforms each item of calls `sortLedgerEntriesByDate` with `entries` (entries) using a callback taking entry that `entry.id` (the id property of entry) and returns a new array; an array containing "newer-last", "newer-first", "older", "invalid-date".

### Line 30

```text
    'newer-last', 'newer-first', 'older', 'invalid-date'
```

In the test 'ledger entries sort newest first, then by entry index, without mutating the source', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortLedgerEntriesByDate(entries).map(entry => entry.id), [ 'newer-last', 'newer-first', 'older', 'invalid-date' ]);; array order and object fields are part of the contract.

### Line 31

```text
  ]);
```

In the test 'ledger entries sort newest first, then by entry index, without mutating the source', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortLedgerEntriesByDate(entries).map(entry => entry.id), [ 'newer-last', 'newer-first', 'older', 'invalid-date' ]);; array order and object fields are part of the contract.

### Line 32

```text
  assert.equal(entries[0].id, 'older');
```

In the test 'ledger entries sort newest first, then by entry index, without mutating the source', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(entries[0].id, 'older');; the fixture therefore checks the concrete boundary/result contract.

### Line 33

```text
});
```

Closes the fixture, callback, loop, or test block for 'ledger entries sort newest first, then by entry index, without mutating the source'.

### Line 34

```text

```

Blank line separates related setup or assertions for readability.

### Line 35

```text
test('table sorting handles text, numeric, and date values without mutating rows or moving blanks first', () => {
```

Starts an isolated test case whose title states the behavior being specified: table sorting handles text, numeric, and date values without mutating rows or moving blanks first.

### Line 36

```text
  const rows = [
```

Builds rows, the concrete fixture collection/object used as input for 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first'; its fields model the relevant domain records or DOM state.

### Line 37

```text
    { name: 'Item 12', amount: 12, date: '2026-10-09' },
```

Sets the object field amount using 12. This field is read later through its property name.

### Line 38

```text
    { name: 'item 2', amount: 2, date: '2026-01-12' },
```

Sets the object field amount using 2. This field is read later through its property name.

### Line 39

```text
    { name: 'Alpha', amount: null, date: '' }
```

Sets the object field date using ''. This field is read later through its property name.

### Line 40

```text
  ];
```

Closes the fixture, callback, loop, or test block for 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first'.

### Line 41

```text

```

Blank line separates related setup or assertions for readability.

### Line 42

```text
  assert.deepEqual(sortTableRows(rows, { key: 'name', type: 'text' }).map(row => row.name), [
```

Calls `assert.deepEqual` with transforms each item of calls `sortTableRows` with `rows` (rows); an object with fields key: "name"; type: "text" using a callback taking row that `row.name` (the name property of row) and returns a new array; an array containing "Alpha", "item 2", "Item 12".

### Line 43

```text
    'Alpha', 'item 2', 'Item 12'
```

In the test 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortTableRows(rows, { key: 'name', type: 'text' }).map(row => row.name), [ 'Alpha', 'item 2', 'Item 12' ]);; array order and object fields are part of the contract.

### Line 44

```text
  ]);
```

In the test 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortTableRows(rows, { key: 'name', type: 'text' }).map(row => row.name), [ 'Alpha', 'item 2', 'Item 12' ]);; array order and object fields are part of the contract.

### Line 45

```text
  assert.deepEqual(sortTableRows(rows, { key: 'amount', type: 'number' }).map(row => row.name), [
```

Calls `assert.deepEqual` with transforms each item of calls `sortTableRows` with `rows` (rows); an object with fields key: "amount"; type: "number" using a callback taking row that `row.name` (the name property of row) and returns a new array; an array containing "item 2", "Item 12", "Alpha".

### Line 46

```text
    'item 2', 'Item 12', 'Alpha'
```

In the test 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortTableRows(rows, { key: 'amount', type: 'number' }).map(row => row.name), [ 'item 2', 'Item 12', 'Alpha' ]);; array order and object fields are part of the contract.

### Line 47

```text
  ]);
```

In the test 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortTableRows(rows, { key: 'amount', type: 'number' }).map(row => row.name), [ 'item 2', 'Item 12', 'Alpha' ]);; array order and object fields are part of the contract.

### Line 48

```text
  assert.deepEqual(sortTableRows(rows, { key: 'date', type: 'date', direction: 'descending' }).map(row => row.name), [
```

Calls `assert.deepEqual` with transforms each item of calls `sortTableRows` with `rows` (rows); an object with fields key: "date"; type: "date"; direction: "descending" using a callback taking row that `row.name` (the name property of row) and returns a new array; an array containing "Item 12", "item 2", "Alpha".

### Line 49

```text
    'Item 12', 'item 2', 'Alpha'
```

In the test 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortTableRows(rows, { key: 'date', type: 'date', direction: 'descending' }).map(row => row.name), [ 'Item 12', 'item 2', 'Alpha' ]);; array order and object fields are part of the contract.

### Line 50

```text
  ]);
```

In the test 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(sortTableRows(rows, { key: 'date', type: 'date', direction: 'descending' }).map(row => row.name), [ 'Item 12', 'item 2', 'Alpha' ]);; array order and object fields are part of the contract.

### Line 51

```text
  assert.deepEqual(rows.map(row => row.name), ['Item 12', 'item 2', 'Alpha']);
```

Calls `assert.deepEqual` with transforms each item of `rows` (rows) using a callback taking row that `row.name` (the name property of row) and returns a new array; an array containing "Item 12", "item 2", "Alpha".

### Line 52

```text
});
```

Closes the fixture, callback, loop, or test block for 'table sorting handles text, numeric, and date values without mutating rows or moving blanks first'.

### Line 53

```text

```

Blank line separates related setup or assertions for readability.

### Line 54

```text
test('ledger hour totals exclude advances and ignore invalid hour values', () => {
```

Starts an isolated test case whose title states the behavior being specified: ledger hour totals exclude advances and ignore invalid hour values.

### Line 55

```text
  assert.equal(sumLedgerHours([
```

In the test 'ledger hour totals exclude advances and ignore invalid hour values', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sumLedgerHours([ { type: 'normal', hours: 3.5 }, { type: 'advance', hours: 20 }, { type: 'general', hours: 2 }, { type: 'normal', hours: 'not a number' } ]), 5.5);; the fixture therefore checks the concrete boundary/result contract.

### Line 56

```text
    { type: 'normal', hours: 3.5 },
```

In the test 'ledger hour totals exclude advances and ignore invalid hour values', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sumLedgerHours([ { type: 'normal', hours: 3.5 }, { type: 'advance', hours: 20 }, { type: 'general', hours: 2 }, { type: 'normal', hours: 'not a number' } ]), 5.5);; the fixture therefore checks the concrete boundary/result contract.

### Line 57

```text
    { type: 'advance', hours: 20 },
```

In the test 'ledger hour totals exclude advances and ignore invalid hour values', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sumLedgerHours([ { type: 'normal', hours: 3.5 }, { type: 'advance', hours: 20 }, { type: 'general', hours: 2 }, { type: 'normal', hours: 'not a number' } ]), 5.5);; the fixture therefore checks the concrete boundary/result contract.

### Line 58

```text
    { type: 'general', hours: 2 },
```

In the test 'ledger hour totals exclude advances and ignore invalid hour values', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sumLedgerHours([ { type: 'normal', hours: 3.5 }, { type: 'advance', hours: 20 }, { type: 'general', hours: 2 }, { type: 'normal', hours: 'not a number' } ]), 5.5);; the fixture therefore checks the concrete boundary/result contract.

### Line 59

```text
    { type: 'normal', hours: 'not a number' }
```

In the test 'ledger hour totals exclude advances and ignore invalid hour values', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sumLedgerHours([ { type: 'normal', hours: 3.5 }, { type: 'advance', hours: 20 }, { type: 'general', hours: 2 }, { type: 'normal', hours: 'not a number' } ]), 5.5);; the fixture therefore checks the concrete boundary/result contract.

### Line 60

```text
  ]), 5.5);
```

In the test 'ledger hour totals exclude advances and ignore invalid hour values', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(sumLedgerHours([ { type: 'normal', hours: 3.5 }, { type: 'advance', hours: 20 }, { type: 'general', hours: 2 }, { type: 'normal', hours: 'not a number' } ]), 5.5);; the fixture therefore checks the concrete boundary/result contract.

### Line 61

```text
});
```

Closes the fixture, callback, loop, or test block for 'ledger hour totals exclude advances and ignore invalid hour values'.

### Line 62

```text

```

Blank line separates related setup or assertions for readability.

### Line 63

```text
test('ledger balances are calculated in integer cents using existing credit and advance signs', () => {
```

Starts an isolated test case whose title states the behavior being specified: ledger balances are calculated in integer cents using existing credit and advance signs.

### Line 64

```text
  assert.equal(ledgerBalanceCents([
```

In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 10.10 }, { type: 'general', amount: 2.25 }, { type: 'advance', amount: 12.35 } ]), 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 65

```text
    { type: 'normal', amount: 10.10 },
```

In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 10.10 }, { type: 'general', amount: 2.25 }, { type: 'advance', amount: 12.35 } ]), 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 66

```text
    { type: 'general', amount: 2.25 },
```

In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 10.10 }, { type: 'general', amount: 2.25 }, { type: 'advance', amount: 12.35 } ]), 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 67

```text
    { type: 'advance', amount: 12.35 }
```

In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 10.10 }, { type: 'general', amount: 2.25 }, { type: 'advance', amount: 12.35 } ]), 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 68

```text
  ]), 0);
```

In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 10.10 }, { type: 'general', amount: 2.25 }, { type: 'advance', amount: 12.35 } ]), 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 69

```text
  assert.equal(ledgerBalanceCents([
```

In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 0.1 }, { type: 'advance', amount: 0.09 } ]), 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 70

```text
    { type: 'normal', amount: 0.1 },
```

In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 0.1 }, { type: 'advance', amount: 0.09 } ]), 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 71

```text
    { type: 'advance', amount: 0.09 }
```

In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 0.1 }, { type: 'advance', amount: 0.09 } ]), 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 72

```text
  ]), 1);
```

In the test 'ledger balances are calculated in integer cents using existing credit and advance signs', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(ledgerBalanceCents([ { type: 'normal', amount: 0.1 }, { type: 'advance', amount: 0.09 } ]), 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 73

```text
});
```

Closes the fixture, callback, loop, or test block for 'ledger balances are calculated in integer cents using existing credit and advance signs'.

### Line 74

```text

```

Blank line separates related setup or assertions for readability.

### Line 75

```text
test('completed shifts can be converted to payroll ledger entries without changing the source shift', () => {
```

Starts an isolated test case whose title states the behavior being specified: completed shifts can be converted to payroll ledger entries without changing the source shift.

### Line 76

```text
  const start = new Date(2026, 9, 9, 9, 0);
```

Sets start to a deterministic date/time fixture so 'completed shifts can be converted to payroll ledger entries without changing the source shift' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.

### Line 77

```text
  const end = new Date(2026, 9, 9, 12, 0);
```

Sets end to a deterministic date/time fixture so 'completed shifts can be converted to payroll ledger entries without changing the source shift' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.

### Line 78

```text
  const shift = {
```

Builds shift, the concrete fixture collection/object used as input for 'completed shifts can be converted to payroll ledger entries without changing the source shift'; its fields model the relevant domain records or DOM state.

### Line 79

```text
    id: 'shift-payroll-1',
```

Sets the object field id using 'shift-payroll-1'. This field is read later through its property name.

### Line 80

```text
    employee: { id: 'employee-1', wage: 23.5 },
```

Sets the object field wage using 23.5. This field is read later through its property name.

### Line 81

```text
    customer: { name: 'Oak Street' },
```

Sets the object field name using 'Oak Street'. This field is read later through its property name.

### Line 82

```text
    clockInTime: start,
```

Sets the object field clockInTime using start. This field is read later through its property name.

### Line 83

```text
    clockOutTime: end,
```

Sets the object field clockOutTime using end. This field is read later through its property name.

### Line 84

```text
    paidHours: 2.5,
```

Sets the object field paidHours using 2.5. This field is read later through its property name.

### Line 85

```text
    breaks: [],
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 86

```text
    note: 'Front lawn'
```

Sets the object field note using 'Front lawn'. This field is read later through its property name.

### Line 87

```text
  };
```

Closes the fixture, callback, loop, or test block for 'completed shifts can be converted to payroll ledger entries without changing the source shift'.

### Line 88

```text

```

Blank line separates related setup or assertions for readability.

### Line 89

```text
  assert.deepEqual(makeShiftLedgerEntryData(shift), {
```

Calls `assert.deepEqual` with calls `makeShiftLedgerEntryData` with `shift` (shift); an object with fields employeeId: "employee-1"; date: a text template that combines fixed text with computed values calls `start.getFullYear` with no arguments; type: "normal"; hours: 2.5; amount: 58.75; notes: "Shift · Oak Street — Front lawn"; and further fields.

### Line 90

```text
    employeeId: 'employee-1',
```

Defines field employeeId as "employee-1".

### Line 91

```text
    date: `${start.getFullYear()}-10-09`,
```

Defines field date as a text template that combines fixed text with computed values calls `start.getFullYear` with no arguments.

### Line 92

```text
    type: 'normal',
```

Defines field type as "normal".

### Line 93

```text
    hours: 2.5,
```

Defines field hours as 2.5.

### Line 94

```text
    amount: 58.75,
```

Defines field amount as 58.75.

### Line 95

```text
    notes: 'Shift · Oak Street — Front lawn',
```

Defines field notes as "Shift · Oak Street — Front lawn".

### Line 96

```text
    sourceShiftId: 'shift-payroll-1'
```

Defines field sourceShiftId as "shift-payroll-1".

### Line 97

```text
  });
```

In the test 'completed shifts can be converted to payroll ledger entries without changing the source shift', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(makeShiftLedgerEntryData(shift), { employeeId: 'employee-1', date: `${start.getFullYear()}-10-09`, type: 'normal', hours: 2.5, amount: 58.75, notes: 'Shift · Oak Street — Front lawn', sourceShiftId: 'shift-payroll-1' });; array order and object fields are part of the contract.

### Line 98

```text
  assert.equal(shift.isPaid, undefined);
```

In the test 'completed shifts can be converted to payroll ledger entries without changing the source shift', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(shift.isPaid, undefined);; the fixture therefore checks the concrete boundary/result contract.

### Line 99

```text
});
```

Closes the fixture, callback, loop, or test block for 'completed shifts can be converted to payroll ledger entries without changing the source shift'.

### Line 100

```text

```

Blank line separates related setup or assertions for readability.

### Line 101

```text
test('an incomplete or invalid shift cannot be converted to a ledger entry', () => {
```

Starts an isolated test case whose title states the behavior being specified: an incomplete or invalid shift cannot be converted to a ledger entry.

### Line 102

```text
  assert.throws(() => makeShiftLedgerEntryData({
```

In the test 'an incomplete or invalid shift cannot be converted to a ledger entry', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => makeShiftLedgerEntryData({ id: 'open-shift', employee: { id: 'employee-1', wage: 20 }, clockInTime: new Date(2026, 9, 9, 9, 0), clockOutTime: null }), /completed shift with an employee/);; invalid domain input must be rejected rather than accepted.

### Line 103

```text
    id: 'open-shift',
```

In the test 'an incomplete or invalid shift cannot be converted to a ledger entry', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => makeShiftLedgerEntryData({ id: 'open-shift', employee: { id: 'employee-1', wage: 20 }, clockInTime: new Date(2026, 9, 9, 9, 0), clockOutTime: null }), /completed shift with an employee/);; invalid domain input must be rejected rather than accepted.

### Line 104

```text
    employee: { id: 'employee-1', wage: 20 },
```

In the test 'an incomplete or invalid shift cannot be converted to a ledger entry', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => makeShiftLedgerEntryData({ id: 'open-shift', employee: { id: 'employee-1', wage: 20 }, clockInTime: new Date(2026, 9, 9, 9, 0), clockOutTime: null }), /completed shift with an employee/);; invalid domain input must be rejected rather than accepted.

### Line 105

```text
    clockInTime: new Date(2026, 9, 9, 9, 0),
```

In the test 'an incomplete or invalid shift cannot be converted to a ledger entry', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => makeShiftLedgerEntryData({ id: 'open-shift', employee: { id: 'employee-1', wage: 20 }, clockInTime: new Date(2026, 9, 9, 9, 0), clockOutTime: null }), /completed shift with an employee/);; invalid domain input must be rejected rather than accepted.

### Line 106

```text
    clockOutTime: null
```

In the test 'an incomplete or invalid shift cannot be converted to a ledger entry', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => makeShiftLedgerEntryData({ id: 'open-shift', employee: { id: 'employee-1', wage: 20 }, clockInTime: new Date(2026, 9, 9, 9, 0), clockOutTime: null }), /completed shift with an employee/);; invalid domain input must be rejected rather than accepted.

### Line 107

```text
  }), /completed shift with an employee/);
```

In the test 'an incomplete or invalid shift cannot be converted to a ledger entry', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => makeShiftLedgerEntryData({ id: 'open-shift', employee: { id: 'employee-1', wage: 20 }, clockInTime: new Date(2026, 9, 9, 9, 0), clockOutTime: null }), /completed shift with an employee/);; invalid domain input must be rejected rather than accepted.

### Line 108

```text
});
```

Closes the fixture, callback, loop, or test block for 'an incomplete or invalid shift cannot be converted to a ledger entry'.

### Line 109

```text

```

Blank line separates related setup or assertions for readability.

### Line 110

```text
test('quarter-hour rounding preserves the nearest/down/up behavior at boundaries', () => {
```

Starts an isolated test case whose title states the behavior being specified: quarter-hour rounding preserves the nearest/down/up behavior at boundaries.

### Line 111

```text
  assert.equal(roundTo15Minutes(date('2026-10-09T09:07:00Z')).toISOString(), '2026-10-09T09:00:00.000Z');
```

In the test 'quarter-hour rounding preserves the nearest/down/up behavior at boundaries', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(roundTo15Minutes(date('2026-10-09T09:07:00Z')).toISOString(), '2026-10-09T09:00:00.000Z');; the fixture therefore checks the concrete boundary/result contract.

### Line 112

```text
  assert.equal(roundTo15Minutes(date('2026-10-09T09:08:00Z')).toISOString(), '2026-10-09T09:15:00.000Z');
```

In the test 'quarter-hour rounding preserves the nearest/down/up behavior at boundaries', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(roundTo15Minutes(date('2026-10-09T09:08:00Z')).toISOString(), '2026-10-09T09:15:00.000Z');; the fixture therefore checks the concrete boundary/result contract.

### Line 113

```text
  assert.equal(roundDown15Minutes(date('2026-10-09T09:14:59Z')).toISOString(), '2026-10-09T09:00:00.000Z');
```

In the test 'quarter-hour rounding preserves the nearest/down/up behavior at boundaries', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(roundDown15Minutes(date('2026-10-09T09:14:59Z')).toISOString(), '2026-10-09T09:00:00.000Z');; the fixture therefore checks the concrete boundary/result contract.

### Line 114

```text
  assert.equal(roundUp15Minutes(date('2026-10-09T09:00:01Z')).toISOString(), '2026-10-09T09:15:00.000Z');
```

In the test 'quarter-hour rounding preserves the nearest/down/up behavior at boundaries', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(roundUp15Minutes(date('2026-10-09T09:00:01Z')).toISOString(), '2026-10-09T09:15:00.000Z');; the fixture therefore checks the concrete boundary/result contract.

### Line 115

```text
});
```

Closes the fixture, callback, loop, or test block for 'quarter-hour rounding preserves the nearest/down/up behavior at boundaries'.

### Line 116

```text

```

Blank line separates related setup or assertions for readability.

### Line 117

```text
test('actual shift hours support overnight shifts and subtract breaks across midnight', () => {
```

Starts an isolated test case whose title states the behavior being specified: actual shift hours support overnight shifts and subtract breaks across midnight.

### Line 118

```text
  const hours = actualShiftHours(
```

Initializes hours for 'actual shift hours support overnight shifts and subtract breaks across midnight', supplying the value that the following test logic will inspect or mutate.

### Line 119

```text
    '2026-10-08T22:00:00Z',
```

Continues the arguments for actualShiftHours. Each comma separates one argument that the function receives in this order.

### Line 120

```text
    '2026-10-09T06:00:00Z',
```

Continues the arguments for actualShiftHours. Each comma separates one argument that the function receives in this order.

### Line 121

```text
    [{ start: '2026-10-09T01:00:00Z', end: '2026-10-09T01:30:00Z' }]
```

Sets the object field end using '2026-10-09T01:30:00Z'. This field is read later through its property name.

### Line 122

```text
  );
```

Closes function call. The closing parenthesis completes the argument list/expression. The semicolon ends the statement.

### Line 123

```text
  assert.equal(hours, 7.5);
```

In the test 'actual shift hours support overnight shifts and subtract breaks across midnight', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(hours, 7.5);; the fixture therefore checks the concrete boundary/result contract.

### Line 124

```text
});
```

Closes the fixture, callback, loop, or test block for 'actual shift hours support overnight shifts and subtract breaks across midnight'.

### Line 125

```text

```

Blank line separates related setup or assertions for readability.

### Line 126

```text
test('breaks are clipped to the shift and overlapping break records are not double-subtracted', () => {
```

Starts an isolated test case whose title states the behavior being specified: breaks are clipped to the shift and overlapping break records are not double-subtracted.

### Line 127

```text
  const hours = actualShiftHours(
```

Initializes hours for 'breaks are clipped to the shift and overlapping break records are not double-subtracted', supplying the value that the following test logic will inspect or mutate.

### Line 128

```text
    '2026-10-09T09:00:00Z',
```

Continues the arguments for actualShiftHours. Each comma separates one argument that the function receives in this order.

### Line 129

```text
    '2026-10-09T11:00:00Z',
```

Continues the arguments for actualShiftHours. Each comma separates one argument that the function receives in this order.

### Line 130

```text
    [
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 131

```text
      { start: '2026-10-09T08:30:00Z', end: '2026-10-09T09:45:00Z' },
```

Sets the object field end using '2026-10-09T09:45:00Z'. This field is read later through its property name.

### Line 132

```text
      { start: '2026-10-09T09:30:00Z', end: '2026-10-09T10:00:00Z' }
```

Sets the object field end using '2026-10-09T10:00:00Z'. This field is read later through its property name.

### Line 133

```text
    ]
```

Closes the fixture, callback, loop, or test block for 'breaks are clipped to the shift and overlapping break records are not double-subtracted'.

### Line 134

```text
  );
```

Closes function call. The closing parenthesis completes the argument list/expression. The semicolon ends the statement.

### Line 135

```text
  assert.equal(hours, 1);
```

In the test 'breaks are clipped to the shift and overlapping break records are not double-subtracted', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(hours, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 136

```text
});
```

Closes the fixture, callback, loop, or test block for 'breaks are clipped to the shift and overlapping break records are not double-subtracted'.

### Line 137

```text

```

Blank line separates related setup or assertions for readability.

### Line 138

```text
test('a TBD date has no due or overdue state, including when the value is null', () => {
```

Starts an isolated test case whose title states the behavior being specified: a TBD date has no due or overdue state, including when the value is null.

### Line 139

```text
  const today = date('2026-10-09T12:00:00');
```

Initializes today for 'a TBD date has no due or overdue state, including when the value is null', supplying the value that the following test logic will inspect or mutate.

### Line 140

```text
  assert.equal(plannedDateStatus(null, today), 'tbd');
```

In the test 'a TBD date has no due or overdue state, including when the value is null', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(plannedDateStatus(null, today), 'tbd');; the fixture therefore checks the concrete boundary/result contract.

### Line 141

```text
  assert.equal(plannedDateStatus('', today), 'tbd');
```

In the test 'a TBD date has no due or overdue state, including when the value is null', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(plannedDateStatus('', today), 'tbd');; the fixture therefore checks the concrete boundary/result contract.

### Line 142

```text
  assert.equal(plannedDateStatus('2026-10-09T12:00:00', today), 'due-today');
```

In the test 'a TBD date has no due or overdue state, including when the value is null', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(plannedDateStatus('2026-10-09T12:00:00', today), 'due-today');; the fixture therefore checks the concrete boundary/result contract.

### Line 143

```text
  assert.equal(plannedDateStatus('2026-10-08T12:00:00', today), 'overdue');
```

In the test 'a TBD date has no due or overdue state, including when the value is null', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(plannedDateStatus('2026-10-08T12:00:00', today), 'overdue');; the fixture therefore checks the concrete boundary/result contract.

### Line 144

```text
});
```

Closes the fixture, callback, loop, or test block for 'a TBD date has no due or overdue state, including when the value is null'.

### Line 145

```text

```

Blank line separates related setup or assertions for readability.

### Line 146

```text
test('a shift cannot be attached to two invoices and linked lines preserve audit snapshots', () => {
```

Starts an isolated test case whose title states the behavior being specified: a shift cannot be attached to two invoices and linked lines preserve audit snapshots.

### Line 147

```text
  const shift = {
```

Builds shift, the concrete fixture collection/object used as input for 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots'; its fields model the relevant domain records or DOM state.

### Line 148

```text
    id: 'shift-1',
```

Sets the object field id using 'shift-1'. This field is read later through its property name.

### Line 149

```text
    employee: { id: 'employee-1' },
```

Sets the object field id using 'employee-1'. This field is read later through its property name.

### Line 150

```text
    customer: { id: 'customer-1' },
```

Sets the object field id using 'customer-1'. This field is read later through its property name.

### Line 151

```text
    clockInTime: date('2026-10-09T09:00:00Z'),
```

Continues the arguments for date. Each comma separates one argument that the function receives in this order.

### Line 152

```text
    clockOutTime: date('2026-10-09T12:00:00Z'),
```

Continues the arguments for date. Each comma separates one argument that the function receives in this order.

### Line 153

```text
    breaks: [{ start: date('2026-10-09T10:00:00Z'), end: date('2026-10-09T10:15:00Z') }]
```

Continues the arguments for date. Each comma separates one argument that the function receives in this order.

### Line 154

```text
  };
```

Closes the fixture, callback, loop, or test block for 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots'.

### Line 155

```text
  const line = makeShiftInvoiceLine(shift, 60);
```

Initializes line for 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', supplying the value that the following test logic will inspect or mutate.

### Line 156

```text
  line.name = 'Labor';
```

Sets `line.name` (the name property of line) to "Labor".

### Line 157

```text
  const invoices = [{ id: 'invoice-1', items: [line] }];
```

Builds invoices, the concrete fixture collection/object used as input for 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots'; its fields model the relevant domain records or DOM state.

### Line 158

```text
  assert.equal(line.shiftId, 'shift-1');
```

In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(line.shiftId, 'shift-1');; the fixture therefore checks the concrete boundary/result contract.

### Line 159

```text
  assert.equal(line.billedHours, 2.75);
```

In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(line.billedHours, 2.75);; the fixture therefore checks the concrete boundary/result contract.

### Line 160

```text
  assert.equal(line.billingRate, 60);
```

In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(line.billingRate, 60);; the fixture therefore checks the concrete boundary/result contract.

### Line 161

```text
  assert.equal(line.value, 165);
```

In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(line.value, 165);; the fixture therefore checks the concrete boundary/result contract.

### Line 162

```text
  assert.equal(shiftIsAttachedElsewhere(invoices, 'shift-1', 'invoice-2'), true);
```

In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(shiftIsAttachedElsewhere(invoices, 'shift-1', 'invoice-2'), true);; the fixture therefore checks the concrete boundary/result contract.

### Line 163

```text
  assert.equal(shiftIsAttachedElsewhere(invoices, 'shift-1', 'invoice-1'), false);
```

In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(shiftIsAttachedElsewhere(invoices, 'shift-1', 'invoice-1'), false);; the fixture therefore checks the concrete boundary/result contract.

### Line 164

```text
  assert.equal(shiftInvoiceLineStatus(line, shift), 'current');
```

In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(shiftInvoiceLineStatus(line, shift), 'current');; the fixture therefore checks the concrete boundary/result contract.

### Line 165

```text
  const editedShift = { ...shift, clockOutTime: date('2026-10-09T12:15:00Z') };
```

Builds editedShift, the concrete fixture collection/object used as input for 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots'; its fields model the relevant domain records or DOM state.

### Line 166

```text
  assert.equal(shiftInvoiceLineStatus(line, editedShift), 'changed');
```

In the test 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(shiftInvoiceLineStatus(line, editedShift), 'changed');; the fixture therefore checks the concrete boundary/result contract.

### Line 167

```text
});
```

Closes the fixture, callback, loop, or test block for 'a shift cannot be attached to two invoices and linked lines preserve audit snapshots'.

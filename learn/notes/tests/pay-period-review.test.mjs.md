# tests/pay-period-review.test.mjs

[Exact copy](../../original/tests/pay-period-review.test.source.mjs)

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
import { buildPayPeriodReview, currentWeekRange } from '../scripts/pay-period-review.mjs';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 4

```text

```

Blank line separates related setup or assertions for readability.

### Line 5

```text
const base = {
```

Builds base, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 6

```text
  startDate: '2026-10-12', endDate: '2026-10-18',
```

Sets the object field endDate using '2026-10-18'. This field is read later through its property name.

### Line 7

```text
  employees: [{ id: 'e1', name: 'Ada' }, { id: 'e2', name: 'No shifts' }]
```

Sets the object field id using 'e1'. This field is read later through its property name.

### Line 8

```text
};
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 9

```text

```

Blank line separates related setup or assertions for readability.

### Line 10

```text
test('currentWeekRange returns local Monday through Sunday', () => {
```

Starts an isolated test case whose title states the behavior being specified: currentWeekRange returns local Monday through Sunday.

### Line 11

```text
  assert.deepEqual(currentWeekRange(new Date(2026, 9, 18, 12)), { startDate: '2026-10-12', endDate: '2026-10-18' });
```

Calls `assert.deepEqual` with calls `currentWeekRange` with constructs a new instance of `Date` with 2026; 9; 18; 12; an object with fields startDate: "2026-10-12"; endDate: "2026-10-18".

### Line 12

```text
  assert.deepEqual(currentWeekRange(new Date(2026, 9, 12, 12)), { startDate: '2026-10-12', endDate: '2026-10-18' });
```

Calls `assert.deepEqual` with calls `currentWeekRange` with constructs a new instance of `Date` with 2026; 9; 12; 12; an object with fields startDate: "2026-10-12"; endDate: "2026-10-18".

### Line 13

```text
});
```

Closes the fixture, callback, loop, or test block for 'currentWeekRange returns local Monday through Sunday'.

### Line 14

```text

```

Blank line separates related setup or assertions for readability.

### Line 15

```text
test('review classifies boundaries, overnight shifts, active and malformed shifts without mutation', () => {
```

Starts an isolated test case whose title states the behavior being specified: review classifies boundaries, overnight shifts, active and malformed shifts without mutation.

### Line 16

```text
  const shifts = [
```

Builds shifts, the concrete fixture collection/object used as input for 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation'; its fields model the relevant domain records or DOM state.

### Line 17

```text
    { id: 'first', employee: { id: 'e1', name: 'Ada' }, clockInTime: '2026-10-12T23:00:00', clockOutTime: '2026-10-13T01:00:00', breaks: [{ start: '2026-10-13T00:00:00', end: '2026-10-13T00:30:00' }] },
```

Sets the object field id using 'e1'. This field is read later through its property name.

### Line 18

```text
    { id: 'last', employee: { id: 'e1' }, clockInTime: '2026-10-18T23:00:00', clockOutTime: '2026-10-19T01:00:00' },
```

Sets the object field id using 'e1'. This field is read later through its property name.

### Line 19

```text
    { id: 'active', employee: { id: 'e1' }, clockInTime: '2026-10-15T09:00:00' },
```

Sets the object field id using 'e1'. This field is read later through its property name.

### Line 20

```text
    { id: 'bad', employee: { id: 'e1' }, clockInTime: '2026-10-16T09:00:00', clockOutTime: '2026-10-16T08:00:00' }
```

Sets the object field id using 'e1'. This field is read later through its property name.

### Line 21

```text
  ];
```

Closes the fixture, callback, loop, or test block for 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation'.

### Line 22

```text
  const before = structuredClone(shifts);
```

Initializes before for 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation', supplying the value that the following test logic will inspect or mutate.

### Line 23

```text
  const result = buildPayPeriodReview({ ...base, shifts });
```

Builds result, the concrete fixture collection/object used as input for 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation'; its fields model the relevant domain records or DOM state.

### Line 24

```text
  assert.deepEqual(shifts, before);
```

Calls `assert.deepEqual` with `shifts` (shifts); `before` (before).

### Line 25

```text
  assert.deepEqual(result.shifts.map(row => row.id), ['last', 'first']);
```

Calls `assert.deepEqual` with transforms each item of `result.shifts` (the shifts property of result) using a callback taking row that `row.id` (the id property of row) and returns a new array; an array containing "last", "first".

### Line 26

```text
  assert.equal(result.shifts.find(row => row.id === 'first').actualHours, 1.5);
```

In the test 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.shifts.find(row => row.id === 'first').actualHours, 1.5);; the fixture therefore checks the concrete boundary/result contract.

### Line 27

```text
  assert.equal(result.activeShiftCount, 1);
```

In the test 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.activeShiftCount, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 28

```text
  assert.equal(result.invalidShiftCount, 1);
```

In the test 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.invalidShiftCount, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 29

```text
});
```

Closes the fixture, callback, loop, or test block for 'review classifies boundaries, overnight shifts, active and malformed shifts without mutation'.

### Line 30

```text

```

Blank line separates related setup or assertions for readability.

### Line 31

```text
test('paid flag is independent from paid hours, and invoices support old/new links and zero rate', () => {
```

Starts an isolated test case whose title states the behavior being specified: paid flag is independent from paid hours, and invoices support old/new links and zero rate.

### Line 32

```text
  const shifts = [
```

Builds shifts, the concrete fixture collection/object used as input for 'paid flag is independent from paid hours, and invoices support old/new links and zero rate'; its fields model the relevant domain records or DOM state.

### Line 33

```text
    { id: 'ready', employeeId: 'e1', customer: { id: 'c', name: 'Client', billingRate: 0 }, clockInTime: '2026-10-12T09:00:00', clockOutTime: '2026-10-12T10:00:00', isPaid: false, paidHours: 0 },
```

Sets the object field id using 'c'. This field is read later through its property name.

### Line 34

```text
    { id: 'linked', employeeId: 'e1', clockInTime: '2026-10-13T09:00:00', clockOutTime: '2026-10-13T10:00:00', isPaid: true, paidHours: 2 },
```

Sets the object field id using 'linked'. This field is read later through its property name.

### Line 35

```text
    { id: 'missing', employeeId: 'e1', customer: { id: 'c2' }, clockInTime: '2026-10-14T09:00:00', clockOutTime: '2026-10-14T10:00:00' }
```

Sets the object field id using 'c2'. This field is read later through its property name.

### Line 36

```text
  ];
```

Closes the fixture, callback, loop, or test block for 'paid flag is independent from paid hours, and invoices support old/new links and zero rate'.

### Line 37

```text
  const result = buildPayPeriodReview({ ...base, shifts, invoices: [{ id: 'paid', items: [{ shiftId: 'linked', value: 10 }] }] });
```

Builds result, the concrete fixture collection/object used as input for 'paid flag is independent from paid hours, and invoices support old/new links and zero rate'; its fields model the relevant domain records or DOM state.

### Line 38

```text
  assert.deepEqual(result.shifts.map(row => row.invoiceStatus), ['Missing billing rate', 'Linked', 'Ready']);
```

Calls `assert.deepEqual` with transforms each item of `result.shifts` (the shifts property of result) using a callback taking row that `row.invoiceStatus` (the invoice status property of row) and returns a new array; an array containing "Missing billing rate", "Linked", "Ready".

### Line 39

```text
  assert.equal(result.shifts.find(row => row.id === 'ready').invoiceCents, 0);
```

In the test 'paid flag is independent from paid hours, and invoices support old/new links and zero rate', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.shifts.find(row => row.id === 'ready').invoiceCents, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 40

```text
  assert.equal(result.shifts.find(row => row.id === 'linked').invoiceCents, 1000);
```

In the test 'paid flag is independent from paid hours, and invoices support old/new links and zero rate', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.shifts.find(row => row.id === 'linked').invoiceCents, 1000);; the fixture therefore checks the concrete boundary/result contract.

### Line 41

```text
  assert.equal(result.totals.paidShiftCount, 1);
```

In the test 'paid flag is independent from paid hours, and invoices support old/new links and zero rate', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.totals.paidShiftCount, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 42

```text
  assert.equal(result.totals.unpaidHours, 1);
```

In the test 'paid flag is independent from paid hours, and invoices support old/new links and zero rate', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.totals.unpaidHours, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 43

```text
});
```

Closes the fixture, callback, loop, or test block for 'paid flag is independent from paid hours, and invoices support old/new links and zero rate'.

### Line 44

```text

```

Blank line separates related setup or assertions for readability.

### Line 45

```text
test('summaries retain all employees, missing references, and all-date ledger balances; filter narrows them', () => {
```

Starts an isolated test case whose title states the behavior being specified: summaries retain all employees, missing references, and all-date ledger balances; filter narrows them.

### Line 46

```text
  const result = buildPayPeriodReview({ ...base,
```

Builds result, the concrete fixture collection/object used as input for 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them'; its fields model the relevant domain records or DOM state.

### Line 47

```text
    shifts: [{ id: 's', employeeId: 'missing', clockInTime: '2026-10-12T09:00:00', clockOutTime: '2026-10-12T10:00:00' }],
```

Sets the object field id using 's'. This field is read later through its property name.

### Line 48

```text
    ledgerEntries: [{ employeeId: 'missing', amount: 12 }, { employeeId: 'e1', amount: 4, date: '1900-01-01' }]
```

Sets the object field amount using 4. This field is read later through its property name.

### Line 49

```text
  });
```

Closes the fixture, callback, loop, or test block for 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them'.

### Line 50

```text
  assert.deepEqual(result.employees.map(employee => employee.id), ['e1', 'e2', 'missing']);
```

Calls `assert.deepEqual` with transforms each item of `result.employees` (the employees property of result) using a callback taking employee that `employee.id` (the id property of employee) and returns a new array; an array containing "e1", "e2", "missing".

### Line 51

```text
  assert.equal(result.employees.find(employee => employee.id === 'e1').balanceCents, 400);
```

In the test 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.employees.find(employee => employee.id === 'e1').balanceCents, 400);; the fixture therefore checks the concrete boundary/result contract.

### Line 52

```text
  assert.equal(result.employees.find(employee => employee.id === 'missing').shiftCount, 1);
```

In the test 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(result.employees.find(employee => employee.id === 'missing').shiftCount, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 53

```text
  const filtered = buildPayPeriodReview({ ...base, employeeId: 'e1', ledgerEntries: [{ employeeId: 'e1', amount: 4 }], shifts: result.shifts });
```

Builds filtered, the concrete fixture collection/object used as input for 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them'; its fields model the relevant domain records or DOM state.

### Line 54

```text
  assert.equal(filtered.employees.length, 1);
```

In the test 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(filtered.employees.length, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 55

```text
  assert.equal(filtered.shifts.length, 0);
```

In the test 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(filtered.shifts.length, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 56

```text
});
```

Closes the fixture, callback, loop, or test block for 'summaries retain all employees, missing references, and all-date ledger balances; filter narrows them'.

### Line 57

```text

```

Blank line separates related setup or assertions for readability.

### Line 58

```text
test('invalid and empty ranges are rejected strictly', () => {
```

Starts an isolated test case whose title states the behavior being specified: invalid and empty ranges are rejected strictly.

### Line 59

```text
  assert.throws(() => buildPayPeriodReview({ startDate: '2026-02-30', endDate: '2026-03-01' }), /YYYY-MM-DD/);
```

In the test 'invalid and empty ranges are rejected strictly', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => buildPayPeriodReview({ startDate: '2026-02-30', endDate: '2026-03-01' }), /YYYY-MM-DD/);; invalid domain input must be rejected rather than accepted.

### Line 60

```text
  assert.throws(() => buildPayPeriodReview({ startDate: '2026-10-19', endDate: '2026-10-18' }), /on or after/);
```

In the test 'invalid and empty ranges are rejected strictly', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => buildPayPeriodReview({ startDate: '2026-10-19', endDate: '2026-10-18' }), /on or after/);; invalid domain input must be rejected rather than accepted.

### Line 61

```text
});
```

Closes the fixture, callback, loop, or test block for 'invalid and empty ranges are rejected strictly'.

### Line 62

```text

```

Blank line separates related setup or assertions for readability.

### Line 63

```text
test('null, empty, and undefined rates are missing rather than free billing; zero remains valid', () => {
```

Starts an isolated test case whose title states the behavior being specified: null, empty, and undefined rates are missing rather than free billing; zero remains valid.

### Line 64

```text
  const shifts = [null, '', undefined, 0].map((billingRate, index) => ({
```

Builds shifts, the concrete fixture collection/object used as input for 'null, empty, and undefined rates are missing rather than free billing; zero remains valid'; its fields model the relevant domain records or DOM state.

### Line 65

```text
    id: String(index), employeeId: 'e1', customer: { id: 'c', billingRate },
```

Sets the object field id using 'c'. This field is read later through its property name.

### Line 66

```text
    clockInTime: '2026-10-12T09:00:00', clockOutTime: '2026-10-12T10:00:00'
```

Sets the object field clockInTime using '2026-10-12T09:00:00'. This field is read later through its property name.

### Line 67

```text
  }));
```

Closes object literal and callback function and function call. The closing parenthesis completes the argument list/expression. The semicolon ends the statement.

### Line 68

```text
  const review = buildPayPeriodReview({ ...base, shifts });
```

Builds review, the concrete fixture collection/object used as input for 'null, empty, and undefined rates are missing rather than free billing; zero remains valid'; its fields model the relevant domain records or DOM state.

### Line 69

```text
  assert.deepEqual(review.shifts.map(row => row.invoiceStatus), ['Missing billing rate', 'Missing billing rate', 'Missing billing rate', 'Ready']);
```

Calls `assert.deepEqual` with transforms each item of `review.shifts` (the shifts property of review) using a callback taking row that `row.invoiceStatus` (the invoice status property of row) and returns a new array; an array containing "Missing billing rate", "Missing billing rate", "Missing billing rate", "Ready".

### Line 70

```text
  assert.equal(review.totals.invoiceReadyCount, 1);
```

In the test 'null, empty, and undefined rates are missing rather than free billing; zero remains valid', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(review.totals.invoiceReadyCount, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 71

```text
});
```

Closes the fixture, callback, loop, or test block for 'null, empty, and undefined rates are missing rather than free billing; zero remains valid'.

### Line 72

```text

```

Blank line separates related setup or assertions for readability.

### Line 73

```text
test('archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', () => {
```

Starts an isolated test case whose title states the behavior being specified: archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling.

### Line 74

```text
  const shifts = ['archived', 'active', 'invoice-id', 'invoice-item'].map(id => ({
```

Builds shifts, the concrete fixture collection/object used as input for 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling'; its fields model the relevant domain records or DOM state.

### Line 75

```text
    id, employeeId: 'e1', customer: { id: 'c', billingRate: 30 },
```

Sets the object field id using id. This field is read later through its property name.

### Line 76

```text
    clockInTime: '2026-10-12T09:00:00', clockOutTime: '2026-10-12T10:00:00'
```

Sets the object field clockInTime using '2026-10-12T09:00:00'. This field is read later through its property name.

### Line 77

```text
  }));
```

Closes object literal and callback function and function call. The closing parenthesis completes the argument list/expression. The semicolon ends the statement.

### Line 78

```text
  const input = { ...base, shifts,
```

Builds input, the concrete fixture collection/object used as input for 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling'; its fields model the relevant domain records or DOM state.

### Line 79

```text
    ledgerArchiveRows: [{ sourceShiftId: 'archived', employeeId: 'e1', amount: 50 }, { sourceShiftId: 'active', employeeId: 'e1', amount: 50 }],
```

Sets the object field amount using 50. This field is read later through its property name.

### Line 80

```text
    ledgerEntries: [{ sourceShiftId: 'active', employeeId: 'e1', amount: 20 }, { employeeId: null, amount: 10 }],
```

Sets the object field amount using 20. This field is read later through its property name.

### Line 81

```text
    invoices: [{ isPaid: true, shiftIds: ['invoice-id'] }, { items: [{ shiftId: 'invoice-item', value: 30 }] }]
```

Sets the object field value using 30. This field is read later through its property name.

### Line 82

```text
  };
```

Closes the fixture, callback, loop, or test block for 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling'.

### Line 83

```text
  const before = structuredClone(input);
```

Initializes before for 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', supplying the value that the following test logic will inspect or mutate.

### Line 84

```text
  const review = buildPayPeriodReview(input);
```

Initializes review for 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', supplying the value that the following test logic will inspect or mutate.

### Line 85

```text
  assert.equal(review.shifts.find(row => row.id === 'archived').ledgerStatus, 'Archived ledger');
```

In the test 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(review.shifts.find(row => row.id === 'archived').ledgerStatus, 'Archived ledger');; the fixture therefore checks the concrete boundary/result contract.

### Line 86

```text
  assert.equal(review.shifts.find(row => row.id === 'active').ledgerStatus, 'Active ledger');
```

In the test 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(review.shifts.find(row => row.id === 'active').ledgerStatus, 'Active ledger');; the fixture therefore checks the concrete boundary/result contract.

### Line 87

```text
  assert.equal(review.totals.invoiceReadyCount, 2);
```

In the test 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(review.totals.invoiceReadyCount, 2);; the fixture therefore checks the concrete boundary/result contract.

### Line 88

```text
  assert.equal(review.employees.find(row => row.id === 'e1').balanceCents, 2000);
```

In the test 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(review.employees.find(row => row.id === 'e1').balanceCents, 2000);; the fixture therefore checks the concrete boundary/result contract.

### Line 89

```text
  assert.equal(review.employees.find(row => row.id === '').balanceCents, 1000);
```

In the test 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(review.employees.find(row => row.id === '').balanceCents, 1000);; the fixture therefore checks the concrete boundary/result contract.

### Line 90

```text
  assert.deepEqual(input, before);
```

Calls `assert.deepEqual` with `input` (input); `before` (before).

### Line 91

```text
});
```

Closes the fixture, callback, loop, or test block for 'archive links remain visible, active links win overlaps, and all invoice link forms prevent rebilling'.

### Line 92

```text

```

Blank line separates related setup or assertions for readability.

### Line 93

```text
test('historical orphan employee IDs remain available even outside the current period', () => {
```

Starts an isolated test case whose title states the behavior being specified: historical orphan employee IDs remain available even outside the current period.

### Line 94

```text
  const review = buildPayPeriodReview({ ...base, shifts: [{ employeeId: 'historical', clockInTime: '2020-01-01T08:00:00', clockOutTime: '2020-01-01T09:00:00' }] });
```

Builds review, the concrete fixture collection/object used as input for 'historical orphan employee IDs remain available even outside the current period'; its fields model the relevant domain records or DOM state.

### Line 95

```text
  assert.ok(review.employees.some(person => person.id === 'historical'));
```

In the test 'historical orphan employee IDs remain available even outside the current period', this truthiness assertion requires the concrete condition to hold: assert.ok(review.employees.some(person => person.id === 'historical'));; it verifies the required presence, count, geometry, or invariant represented by the fixture.

### Line 96

```text
  assert.equal(review.totals.shiftCount, 0);
```

In the test 'historical orphan employee IDs remain available even outside the current period', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(review.totals.shiftCount, 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 97

```text
});
```

Closes the fixture, callback, loop, or test block for 'historical orphan employee IDs remain available even outside the current period'.

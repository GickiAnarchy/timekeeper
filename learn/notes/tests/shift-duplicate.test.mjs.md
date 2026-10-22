# tests/shift-duplicate.test.mjs

[Exact copy](../../original/tests/shift-duplicate.test.source.mjs)

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
import vm from 'node:vm';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 4

```text
import { readFileSync } from 'node:fs';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 5

```text
import { actualShiftHours } from '../scripts/domain.mjs';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 6

```text

```

Blank line separates related setup or assertions for readability.

### Line 7

```text
const modelsSource = readFileSync(new URL('../scripts/models.js', import.meta.url), 'utf8');
```

Initializes modelsSource for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 8

```text
const formatTime24 = date => {
```

Builds formatTime24, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 9

```text
  if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) return '';
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 10

```text
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 11

```text
};
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 12

```text

```

Blank line separates related setup or assertions for readability.

### Line 13

```text
function extractClass(source, className) {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 14

```text
  const start = source.indexOf(`export class ${className} {`);
```

Builds start, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 15

```text
  assert.notEqual(start, -1, `could not find ${className} in models.js`);
```

In the test 'test setup', this negative equality assertion requires the compared expressions to differ: assert.notEqual(start, -1, `could not find ${className} in models.js`);; this verifies independence or a deliberate change in behavior.

### Line 16

```text
  const bodyStart = source.indexOf('{', start);
```

Builds bodyStart, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 17

```text
  let depth = 0;
```

Initializes depth for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 18

```text
  let quote = null;
```

Initializes quote for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 19

```text
  let escaped = false;
```

Initializes escaped for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 20

```text
  for (let index = bodyStart; index < source.length; index += 1) {
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 21

```text
    const character = source[index];
```

Builds character, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 22

```text
    if (quote) {
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 23

```text
      if (escaped) escaped = false;
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 24

```text
      else if (character === '\\') escaped = true;
```

Checks whether checks that `character` (character) and "\\" have the same value and type; runs the following statement/block only when truthy, otherwise runs the else branch.

### Line 25

```text
      else if (character === quote) quote = null;
```

Checks whether checks that `character` (character) and `quote` (quote) have the same value and type; runs the following statement/block only when truthy.

### Line 26

```text
      continue;
```

Continues the surrounding JavaScript expression or argument list. This line contributes continue;; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 27

```text
    }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 28

```text
    if (character === '"' || character === "'" || character === '`') {
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 29

```text
      quote = character;
```

Sets `quote` (quote) to `character` (character).

### Line 30

```text
      continue;
```

Continues the surrounding JavaScript expression or argument list. This line contributes continue;; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 31

```text
    }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 32

```text
    if (character === '{') depth += 1;
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 33

```text
    if (character === '}' && --depth === 0) return source.slice(start + 'export '.length, index + 1);
```

Controls iteration/branching in the 'test setup' test so each relevant fixture or environment condition is exercised.

### Line 34

```text
  }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 35

```text
  throw new Error(`could not parse ${className} from models.js`);
```

Throws constructs a new instance of `Error` with a text template that combines fixed text with computed values `className` (class name); normal execution stops until a matching catch handles it.

### Line 36

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 37

```text

```

Blank line separates related setup or assertions for readability.

### Line 38

```text
let uuid = 0;
```

Initializes uuid for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 39

```text
const WorkShift = vm.runInNewContext(
```

Initializes WorkShift for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 40

```text
  `${extractClass(modelsSource, 'WorkShift')}\nWorkShift`,
```

Calls `extractClass` with `modelsSource` (models source); "WorkShift".

### Line 41

```text
  {
```

Continues the surrounding JavaScript expression or argument list. This line contributes {; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 42

```text
    Date,
```

Sets the object field Date using Date. This field is read later through its property name.

### Line 43

```text
    actualShiftHours,
```

Sets the object field actualShiftHours using actualShiftHours. This field is read later through its property name.

### Line 44

```text
    crypto: { randomUUID: () => `generated-shift-${++uuid}` },
```

Defines field crypto as an object with fields randomUUID: a callback taking no parameters that a text template that combines fixed text with computed values increases `uuid` (uuid) by 1.

### Line 45

```text
    formatTime24
```

Sets the object field formatTime24 using formatTime24. This field is read later through its property name.

### Line 46

```text
  }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 47

```text
);
```

Closes function call. The closing parenthesis completes the argument list/expression. The semicolon ends the statement.

### Line 48

```text

```

Blank line separates related setup or assertions for readability.

### Line 49

```text
const employee = (id, wage) => ({
```

Defines the test fixture/helper employee; its returned mock data represents the application state needed to exercise 'test setup'.

### Line 50

```text
  id,
```

Sets the object field id using id. This field is read later through its property name.

### Line 51

```text
  wage,
```

Sets the object field wage using wage. This field is read later through its property name.

### Line 52

```text
  getPay(hours) {
```

Defines field getPay as a callback taking hours that runs its enclosed statements.

### Line 53

```text
    return Number((this.wage * hours).toFixed(2));
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 54

```text
  }
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 55

```text
});
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 56

```text
const customer = { id: 'customer-1', name: 'Oak Street' };
```

Defines the test fixture/helper customer; its returned mock data represents the application state needed to exercise 'test setup'.

### Line 57

```text
const date = value => new Date(value);
```

Defines the test fixture/helper date; its returned mock data represents the application state needed to exercise 'test setup'.

### Line 58

```text

```

Blank line separates related setup or assertions for readability.

### Line 59

```text
function completedShift(paidHours = null) {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 60

```text
  const shift = new WorkShift(employee('source-employee', 20), customer, 'source-shift', 'Front lawn', true, [
```

Builds shift, the concrete fixture collection/object used as input for 'test setup'; its fields model the relevant domain records or DOM state.

### Line 61

```text
    { start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }
```

Continues the arguments for date. Each comma separates one argument that the function receives in this order.

### Line 62

```text
  ], paidHours);
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 63

```text
  shift.clockInTime = date('2026-10-08T22:00:00Z');
```

Sets `shift.clockInTime` (the clock in time property of shift) to calls `date` with "2026-10-08T22:00:00Z".

### Line 64

```text
  shift.clockOutTime = date('2026-10-09T06:00:00Z');
```

Sets `shift.clockOutTime` (the clock out time property of shift) to calls `date` with "2026-10-09T06:00:00Z".

### Line 65

```text
  shift.ledgerEntryId = 'ledger-source';
```

Sets `shift.ledgerEntryId` (the ledger entry id property of shift) to "ledger-source".

### Line 66

```text
  shift.invoiceId = 'invoice-source';
```

Sets `shift.invoiceId` (the invoice id property of shift) to "invoice-source".

### Line 67

```text
  return shift;
```

Returns the fixture/helper result needed by the 'test setup' test, preserving the modeled state for its caller.

### Line 68

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 69

```text

```

Blank line separates related setup or assertions for readability.

### Line 70

```text
test('duplicateFor rejects missing, same, incomplete, and invalid source employees or times', () => {
```

Starts an isolated test case whose title states the behavior being specified: duplicateFor rejects missing, same, incomplete, and invalid source employees or times.

### Line 71

```text
  const source = completedShift();
```

Initializes source for 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times', supplying the value that the following test logic will inspect or mutate.

### Line 72

```text
  assert.throws(() => source.duplicateFor(), /different employee/);
```

In the test 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => source.duplicateFor(), /different employee/);; invalid domain input must be rejected rather than accepted.

### Line 73

```text
  assert.throws(() => source.duplicateFor(null), /different employee/);
```

In the test 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => source.duplicateFor(null), /different employee/);; invalid domain input must be rejected rather than accepted.

### Line 74

```text
  assert.throws(() => source.duplicateFor(source.employee), /different employee/);
```

In the test 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => source.duplicateFor(source.employee), /different employee/);; invalid domain input must be rejected rather than accepted.

### Line 75

```text
  assert.throws(() => source.duplicateFor(employee('source-employee', 30)), /different employee/);
```

In the test 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => source.duplicateFor(employee('source-employee', 30)), /different employee/);; invalid domain input must be rejected rather than accepted.

### Line 76

```text

```

Blank line separates related setup or assertions for readability.

### Line 77

```text
  for (const configure of [
```

Controls iteration/branching in the 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times' test so each relevant fixture or environment condition is exercised.

### Line 78

```text
    shift => { shift.clockOutTime = null; },
```

Begins a callback used by the 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times' test to model an event, loader, or transformation.

### Line 79

```text
    shift => { shift.clockInTime = date('invalid'); },
```

Begins a callback used by the 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times' test to model an event, loader, or transformation.

### Line 80

```text
    shift => { shift.clockOutTime = date('2026-10-08T21:00:00Z'); },
```

Begins a callback used by the 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times' test to model an event, loader, or transformation.

### Line 81

```text
    shift => { shift.clockInTime = '2026-10-08T22:00:00Z'; }
```

Begins a callback used by the 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times' test to model an event, loader, or transformation.

### Line 82

```text
  ]) {
```

Adds the listed value(s) to the surrounding array. Commas separate entries, and their written order determines array indices.

### Line 83

```text
    const invalid = completedShift();
```

Initializes invalid for 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times', supplying the value that the following test logic will inspect or mutate.

### Line 84

```text
    configure(invalid);
```

Calls `configure` with `invalid` (invalid).

### Line 85

```text
    assert.throws(() => invalid.duplicateFor(employee('target-employee', 30)), /completed shift with valid start and end/);
```

In the test 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times', this assertion requires the callback fixture to throw an error matching the stated regular expression: assert.throws(() => invalid.duplicateFor(employee('target-employee', 30)), /completed shift with valid start and end/);; invalid domain input must be rejected rather than accepted.

### Line 86

```text
  }
```

Closes the fixture, callback, loop, or test block for 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times'.

### Line 87

```text
});
```

Closes the fixture, callback, loop, or test block for 'duplicateFor rejects missing, same, incomplete, and invalid source employees or times'.

### Line 88

```text

```

Blank line separates related setup or assertions for readability.

### Line 89

```text
test('duplicateFor creates an independent completed shift for the target employee', () => {
```

Starts an isolated test case whose title states the behavior being specified: duplicateFor creates an independent completed shift for the target employee.

### Line 90

```text
  const source = completedShift();
```

Initializes source for 'duplicateFor creates an independent completed shift for the target employee', supplying the value that the following test logic will inspect or mutate.

### Line 91

```text
  const target = employee('target-employee', 30);
```

Initializes target for 'duplicateFor creates an independent completed shift for the target employee', supplying the value that the following test logic will inspect or mutate.

### Line 92

```text
  const duplicate = source.duplicateFor(target);
```

Initializes duplicate for 'duplicateFor creates an independent completed shift for the target employee', supplying the value that the following test logic will inspect or mutate.

### Line 93

```text

```

Blank line separates related setup or assertions for readability.

### Line 94

```text
  assert.ok(duplicate instanceof WorkShift);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this truthiness assertion requires the concrete condition to hold: assert.ok(duplicate instanceof WorkShift);; it verifies the required presence, count, geometry, or invariant represented by the fixture.

### Line 95

```text
  assert.notStrictEqual(duplicate, source);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notStrictEqual(duplicate, source);; this verifies independence or a deliberate change in behavior.

### Line 96

```text
  assert.equal(duplicate.id, 'generated-shift-1');
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.id, 'generated-shift-1');; the fixture therefore checks the concrete boundary/result contract.

### Line 97

```text
  assert.notEqual(duplicate.id, source.id);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notEqual(duplicate.id, source.id);; this verifies independence or a deliberate change in behavior.

### Line 98

```text
  assert.strictEqual(duplicate.employee, target);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.strictEqual(duplicate.employee, target);; the fixture therefore checks the concrete boundary/result contract.

### Line 99

```text
  assert.strictEqual(duplicate.customer, source.customer);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.strictEqual(duplicate.customer, source.customer);; the fixture therefore checks the concrete boundary/result contract.

### Line 100

```text
  assert.equal(duplicate.note, source.note);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.note, source.note);; the fixture therefore checks the concrete boundary/result contract.

### Line 101

```text
  assert.equal(duplicate.isPaid, false);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.isPaid, false);; the fixture therefore checks the concrete boundary/result contract.

### Line 102

```text
  assert.equal(duplicate.ledgerEntryId, undefined);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.ledgerEntryId, undefined);; the fixture therefore checks the concrete boundary/result contract.

### Line 103

```text
  assert.equal(duplicate.invoiceId, undefined);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.invoiceId, undefined);; the fixture therefore checks the concrete boundary/result contract.

### Line 104

```text
  assert.notStrictEqual(duplicate.clockInTime, source.clockInTime);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notStrictEqual(duplicate.clockInTime, source.clockInTime);; this verifies independence or a deliberate change in behavior.

### Line 105

```text
  assert.notStrictEqual(duplicate.clockOutTime, source.clockOutTime);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notStrictEqual(duplicate.clockOutTime, source.clockOutTime);; this verifies independence or a deliberate change in behavior.

### Line 106

```text
  assert.equal(duplicate.clockInTime.toISOString(), source.clockInTime.toISOString());
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.clockInTime.toISOString(), source.clockInTime.toISOString());; the fixture therefore checks the concrete boundary/result contract.

### Line 107

```text
  assert.equal(duplicate.clockOutTime.toISOString(), source.clockOutTime.toISOString());
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.clockOutTime.toISOString(), source.clockOutTime.toISOString());; the fixture therefore checks the concrete boundary/result contract.

### Line 108

```text
  assert.notStrictEqual(duplicate.breaks, source.breaks);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notStrictEqual(duplicate.breaks, source.breaks);; this verifies independence or a deliberate change in behavior.

### Line 109

```text
  assert.notStrictEqual(duplicate.breaks[0], source.breaks[0]);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notStrictEqual(duplicate.breaks[0], source.breaks[0]);; this verifies independence or a deliberate change in behavior.

### Line 110

```text
  assert.notStrictEqual(duplicate.breaks[0].start, source.breaks[0].start);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notStrictEqual(duplicate.breaks[0].start, source.breaks[0].start);; this verifies independence or a deliberate change in behavior.

### Line 111

```text
  assert.notStrictEqual(duplicate.breaks[0].end, source.breaks[0].end);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this negative equality assertion requires the compared expressions to differ: assert.notStrictEqual(duplicate.breaks[0].end, source.breaks[0].end);; this verifies independence or a deliberate change in behavior.

### Line 112

```text

```

Blank line separates related setup or assertions for readability.

### Line 113

```text
  duplicate.clockInTime.setUTCFullYear(2030);
```

Calls `duplicate.clockInTime.setUTCFullYear` with 2030.

### Line 114

```text
  duplicate.clockOutTime.setUTCHours(7);
```

Calls `duplicate.clockOutTime.setUTCHours` with 7.

### Line 115

```text
  duplicate.breaks[0].start.setUTCMinutes(45);
```

Calls `duplicate.breaks[0].start.setUTCMinutes` with 45.

### Line 116

```text
  duplicate.breaks.push({ start: date('2026-10-09T03:00:00Z'), end: date('2026-10-09T03:15:00Z') });
```

Appends an object with fields start: calls `date` with "2026-10-09T03:00:00Z"; end: calls `date` with "2026-10-09T03:15:00Z" to `duplicate.breaks` (the breaks property of duplicate).

### Line 117

```text
  assert.equal(source.clockInTime.toISOString(), '2026-10-08T22:00:00.000Z');
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(source.clockInTime.toISOString(), '2026-10-08T22:00:00.000Z');; the fixture therefore checks the concrete boundary/result contract.

### Line 118

```text
  assert.equal(source.clockOutTime.toISOString(), '2026-10-09T06:00:00.000Z');
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(source.clockOutTime.toISOString(), '2026-10-09T06:00:00.000Z');; the fixture therefore checks the concrete boundary/result contract.

### Line 119

```text
  assert.equal(source.breaks.length, 1);
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(source.breaks.length, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 120

```text
  assert.equal(source.breaks[0].start.toISOString(), '2026-10-09T01:00:00.000Z');
```

In the test 'duplicateFor creates an independent completed shift for the target employee', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(source.breaks[0].start.toISOString(), '2026-10-09T01:00:00.000Z');; the fixture therefore checks the concrete boundary/result contract.

### Line 121

```text
});
```

Closes the fixture, callback, loop, or test block for 'duplicateFor creates an independent completed shift for the target employee'.

### Line 122

```text

```

Blank line separates related setup or assertions for readability.

### Line 123

```text
test('duplicateFor preserves null and zero paidHours while using the target wage and actual hours', () => {
```

Starts an isolated test case whose title states the behavior being specified: duplicateFor preserves null and zero paidHours while using the target wage and actual hours.

### Line 124

```text
  for (const paidHours of [null, 0]) {
```

Controls iteration/branching in the 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours' test so each relevant fixture or environment condition is exercised.

### Line 125

```text
    const source = completedShift(paidHours);
```

Initializes source for 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', supplying the value that the following test logic will inspect or mutate.

### Line 126

```text
    const target = employee(`target-${paidHours ?? 'null'}`, 30);
```

Builds target, the concrete fixture collection/object used as input for 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours'; its fields model the relevant domain records or DOM state.

### Line 127

```text
    const duplicate = source.duplicateFor(target);
```

Initializes duplicate for 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', supplying the value that the following test logic will inspect or mutate.

### Line 128

```text

```

Blank line separates related setup or assertions for readability.

### Line 129

```text
    assert.equal(duplicate.paidHours, paidHours);
```

In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.paidHours, paidHours);; the fixture therefore checks the concrete boundary/result contract.

### Line 130

```text
    assert.equal(duplicate.getHoursWorked(), actualShiftHours(
```

In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.getHoursWorked(), actualShiftHours( date('2026-10-08T22:00:00Z'), date('2026-10-09T06:00:00Z'), [{ start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }] ));; the fixture therefore checks the concrete boundary/result contract.

### Line 131

```text
      date('2026-10-08T22:00:00Z'),
```

In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.getHoursWorked(), actualShiftHours( date('2026-10-08T22:00:00Z'), date('2026-10-09T06:00:00Z'), [{ start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }] ));; the fixture therefore checks the concrete boundary/result contract.

### Line 132

```text
      date('2026-10-09T06:00:00Z'),
```

In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.getHoursWorked(), actualShiftHours( date('2026-10-08T22:00:00Z'), date('2026-10-09T06:00:00Z'), [{ start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }] ));; the fixture therefore checks the concrete boundary/result contract.

### Line 133

```text
      [{ start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }]
```

In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.getHoursWorked(), actualShiftHours( date('2026-10-08T22:00:00Z'), date('2026-10-09T06:00:00Z'), [{ start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }] ));; the fixture therefore checks the concrete boundary/result contract.

### Line 134

```text
    ));
```

In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.getHoursWorked(), actualShiftHours( date('2026-10-08T22:00:00Z'), date('2026-10-09T06:00:00Z'), [{ start: date('2026-10-09T01:00:00Z'), end: date('2026-10-09T01:30:00Z') }] ));; the fixture therefore checks the concrete boundary/result contract.

### Line 135

```text
    assert.equal(duplicate.getHoursWorked(), 7.5);
```

In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.getHoursWorked(), 7.5);; the fixture therefore checks the concrete boundary/result contract.

### Line 136

```text
    assert.equal(duplicate.getShiftPay(), paidHours === null ? 225 : 0);
```

In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(duplicate.getShiftPay(), paidHours === null ? 225 : 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 137

```text
    assert.equal(source.getShiftPay(), source.isPaid ? 0 : 0);
```

In the test 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(source.getShiftPay(), source.isPaid ? 0 : 0);; the fixture therefore checks the concrete boundary/result contract.

### Line 138

```text
  }
```

Closes the fixture, callback, loop, or test block for 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours'.

### Line 139

```text
});
```

Closes the fixture, callback, loop, or test block for 'duplicateFor preserves null and zero paidHours while using the target wage and actual hours'.

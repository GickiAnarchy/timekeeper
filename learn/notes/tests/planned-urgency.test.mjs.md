# tests/planned-urgency.test.mjs

[Exact copy](../../original/tests/planned-urgency.test.source.mjs)

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
  plannedJobUrgency,
```

Imports plannedJobUrgency from the shared module; plannedJobUrgency is the name used in this file.

### Line 5

```text
  plannedOverdueMessage,
```

Imports plannedOverdueMessage from the shared module; plannedOverdueMessage is the name used in this file.

### Line 6

```text
  updatePlannedAlert,
```

Imports updatePlannedAlert from the shared module; updatePlannedAlert is the name used in this file.

### Line 7

```text
  watchPlannedDayChange
```

Imports watchPlannedDayChange from the shared module; watchPlannedDayChange is the name used in this file.

### Line 8

```text
} from '../scripts/planned-urgency.mjs';
```

Completes the named import list and tells the browser to resolve these shared helpers from ../scripts/planned-urgency.mjs. Imported bindings refer to exports of that module.

### Line 9

```text

```

Blank line separates related setup or assertions for readability.

### Line 10

```text
const day = (year, month, date, hour = 12) => new Date(year, month - 1, date, hour, 0, 0, 0);
```

Defines the test fixture/helper day; its returned mock data represents the application state needed to exercise 'test setup'.

### Line 11

```text
const today = day(2026, 1, 15);
```

Initializes today for 'test setup', supplying the value that the following test logic will inspect or mutate.

### Line 12

```text
const jobOn = scheduledDate => ({ scheduledDate, isComplete: false });
```

Defines the test fixture/helper jobOn; its returned mock data represents the application state needed to exercise 'test setup'.

### Line 13

```text

```

Blank line separates related setup or assertions for readability.

### Line 14

```text
function assertUrgency(scheduledDate, expected) {
```

Declares a test-only helper/type that models the application behavior needed by 'test setup'.

### Line 15

```text
  assert.deepEqual(plannedJobUrgency(jobOn(scheduledDate), today), expected);
```

Calls `assert.deepEqual` with calls `plannedJobUrgency` with calls `jobOn` with `scheduledDate` (scheduled date); `today` (today); `expected` (expected).

### Line 16

```text
}
```

Closes the fixture, callback, loop, or test block for 'test setup'.

### Line 17

```text

```

Blank line separates related setup or assertions for readability.

### Line 18

```text
test('classifies every planned urgency boundary using local calendar days', () => {
```

Starts an isolated test case whose title states the behavior being specified: classifies every planned urgency boundary using local calendar days.

### Line 19

```text
  assertUrgency(day(2026, 1, 14), { level: 'overdue', label: 'Overdue by 1 day', daysAway: -1 });
```

Calls `assertUrgency` with calls `day` with 2026; 1; 14; an object with fields level: "overdue"; label: "Overdue by 1 day"; daysAway: changes the numeric sign of 1.

### Line 20

```text
  assertUrgency(day(2026, 1, 12), { level: 'overdue', label: 'Overdue by 3 days', daysAway: -3 });
```

Calls `assertUrgency` with calls `day` with 2026; 1; 12; an object with fields level: "overdue"; label: "Overdue by 3 days"; daysAway: changes the numeric sign of 3.

### Line 21

```text
  assertUrgency(day(2026, 1, 15), { level: 'today', label: 'Due today', daysAway: 0 });
```

Calls `assertUrgency` with calls `day` with 2026; 1; 15; an object with fields level: "today"; label: "Due today"; daysAway: 0.

### Line 22

```text
  assertUrgency(day(2026, 1, 16), { level: 'tomorrow', label: 'Due tomorrow', daysAway: 1 });
```

Calls `assertUrgency` with calls `day` with 2026; 1; 16; an object with fields level: "tomorrow"; label: "Due tomorrow"; daysAway: 1.

### Line 23

```text
  assertUrgency(day(2026, 1, 17), { level: 'soon', label: 'Due in 2 days', daysAway: 2 });
```

Calls `assertUrgency` with calls `day` with 2026; 1; 17; an object with fields level: "soon"; label: "Due in 2 days"; daysAway: 2.

### Line 24

```text
  assertUrgency(day(2026, 1, 18), { level: 'soon', label: 'Due in 3 days', daysAway: 3 });
```

Calls `assertUrgency` with calls `day` with 2026; 1; 18; an object with fields level: "soon"; label: "Due in 3 days"; daysAway: 3.

### Line 25

```text
  assertUrgency(day(2026, 1, 19), { level: 'week', label: 'Due in 4 days', daysAway: 4 });
```

Calls `assertUrgency` with calls `day` with 2026; 1; 19; an object with fields level: "week"; label: "Due in 4 days"; daysAway: 4.

### Line 26

```text
  assertUrgency(day(2026, 1, 22), { level: 'week', label: 'Due in 7 days', daysAway: 7 });
```

Calls `assertUrgency` with calls `day` with 2026; 1; 22; an object with fields level: "week"; label: "Due in 7 days"; daysAway: 7.

### Line 27

```text
  assertUrgency(day(2026, 1, 23), { level: 'upcoming', label: 'Due in 8 days', daysAway: 8 });
```

Calls `assertUrgency` with calls `day` with 2026; 1; 23; an object with fields level: "upcoming"; label: "Due in 8 days"; daysAway: 8.

### Line 28

```text
  assertUrgency(day(2026, 1, 25), { level: 'upcoming', label: 'Due in 10 days', daysAway: 10 });
```

Calls `assertUrgency` with calls `day` with 2026; 1; 25; an object with fields level: "upcoming"; label: "Due in 10 days"; daysAway: 10.

### Line 29

```text
});
```

Closes the fixture, callback, loop, or test block for 'classifies every planned urgency boundary using local calendar days'.

### Line 30

```text

```

Blank line separates related setup or assertions for readability.

### Line 31

```text
test('completed jobs stay completed even when overdue, and reopening restores urgency', () => {
```

Starts an isolated test case whose title states the behavior being specified: completed jobs stay completed even when overdue, and reopening restores urgency.

### Line 32

```text
  const job = { scheduledDate: day(2026, 1, 10), isComplete: true };
```

Builds job, the concrete fixture collection/object used as input for 'completed jobs stay completed even when overdue, and reopening restores urgency'; its fields model the relevant domain records or DOM state.

### Line 33

```text
  assert.deepEqual(plannedJobUrgency(job, today), {
```

Calls `assert.deepEqual` with calls `plannedJobUrgency` with `job` (job); `today` (today); an object with fields level: "complete"; label: "Completed"; daysAway: null.

### Line 34

```text
    level: 'complete', label: 'Completed', daysAway: null
```

Defines field level as "complete".

### Line 35

```text
  });
```

In the test 'completed jobs stay completed even when overdue, and reopening restores urgency', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(plannedJobUrgency(job, today), { level: 'complete', label: 'Completed', daysAway: null });; array order and object fields are part of the contract.

### Line 36

```text
  job.isComplete = false;
```

Sets `job.isComplete` (the is complete property of job) to false.

### Line 37

```text
  assert.deepEqual(plannedJobUrgency(job, today), {
```

Calls `assert.deepEqual` with calls `plannedJobUrgency` with `job` (job); `today` (today); an object with fields level: "overdue"; label: "Overdue by 5 days"; daysAway: changes the numeric sign of 5.

### Line 38

```text
    level: 'overdue', label: 'Overdue by 5 days', daysAway: -5
```

Defines field level as "overdue".

### Line 39

```text
  });
```

In the test 'completed jobs stay completed even when overdue, and reopening restores urgency', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(plannedJobUrgency(job, today), { level: 'overdue', label: 'Overdue by 5 days', daysAway: -5 });; array order and object fields are part of the contract.

### Line 40

```text
});
```

Closes the fixture, callback, loop, or test block for 'completed jobs stay completed even when overdue, and reopening restores urgency'.

### Line 41

```text

```

Blank line separates related setup or assertions for readability.

### Line 42

```text
test('null, blank, and invalid dates are explicitly TBD', () => {
```

Starts an isolated test case whose title states the behavior being specified: null, blank, and invalid dates are explicitly TBD.

### Line 43

```text
  for (const scheduledDate of [null, undefined, '', '   ', 'not-a-date', new Date('invalid')]) {
```

Controls iteration/branching in the 'null, blank, and invalid dates are explicitly TBD' test so each relevant fixture or environment condition is exercised.

### Line 44

```text
    assert.deepEqual(plannedJobUrgency(jobOn(scheduledDate), today), {
```

Calls `assert.deepEqual` with calls `plannedJobUrgency` with calls `jobOn` with `scheduledDate` (scheduled date); `today` (today); an object with fields level: "tbd"; label: "Date TBD"; daysAway: null.

### Line 45

```text
      level: 'tbd', label: 'Date TBD', daysAway: null
```

Defines field level as "tbd".

### Line 46

```text
    });
```

In the test 'null, blank, and invalid dates are explicitly TBD', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(plannedJobUrgency(jobOn(scheduledDate), today), { level: 'tbd', label: 'Date TBD', daysAway: null });; array order and object fields are part of the contract.

### Line 47

```text
  }
```

Closes the fixture, callback, loop, or test block for 'null, blank, and invalid dates are explicitly TBD'.

### Line 48

```text
});
```

Closes the fixture, callback, loop, or test block for 'null, blank, and invalid dates are explicitly TBD'.

### Line 49

```text

```

Blank line separates related setup or assertions for readability.

### Line 50

```text
test('accepts Firestore-like timestamps and preserves local date semantics', () => {
```

Starts an isolated test case whose title states the behavior being specified: accepts Firestore-like timestamps and preserves local date semantics.

### Line 51

```text
  const timestamp = { toDate: () => day(2026, 1, 18, 23) };
```

Builds timestamp, the concrete fixture collection/object used as input for 'accepts Firestore-like timestamps and preserves local date semantics'; its fields model the relevant domain records or DOM state.

### Line 52

```text
  assert.deepEqual(plannedJobUrgency(jobOn(timestamp), day(2026, 1, 18, 1)), {
```

Calls `assert.deepEqual` with calls `plannedJobUrgency` with calls `jobOn` with `timestamp` (timestamp); calls `day` with 2026; 1; 18; 1; an object with fields level: "today"; label: "Due today"; daysAway: 0.

### Line 53

```text
    level: 'today', label: 'Due today', daysAway: 0
```

Defines field level as "today".

### Line 54

```text
  });
```

In the test 'accepts Firestore-like timestamps and preserves local date semantics', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(plannedJobUrgency(jobOn(timestamp), day(2026, 1, 18, 1)), { level: 'today', label: 'Due today', daysAway: 0 });; array order and object fields are part of the contract.

### Line 55

```text
});
```

Closes the fixture, callback, loop, or test block for 'accepts Firestore-like timestamps and preserves local date semantics'.

### Line 56

```text

```

Blank line separates related setup or assertions for readability.

### Line 57

```text
test('compares calendar days rather than elapsed hours across a DST transition when available', () => {
```

Starts an isolated test case whose title states the behavior being specified: compares calendar days rather than elapsed hours across a DST transition when available.

### Line 58

```text
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
```

Initializes zone for 'compares calendar days rather than elapsed hours across a DST transition when available', supplying the value that the following test logic will inspect or mutate.

### Line 59

```text
  if (!['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles'].includes(zone)) {
```

Controls iteration/branching in the 'compares calendar days rather than elapsed hours across a DST transition when available' test so each relevant fixture or environment condition is exercised.

### Line 60

```text
    assert.ok(true, `DST-specific local-zone assertion skipped in ${zone}`);
```

In the test 'compares calendar days rather than elapsed hours across a DST transition when available', this truthiness assertion requires the concrete condition to hold: assert.ok(true, `DST-specific local-zone assertion skipped in ${zone}`);; it verifies the required presence, count, geometry, or invariant represented by the fixture.

### Line 61

```text
    return;
```

Returns no value to the caller and exits this function.

### Line 62

```text
  }
```

Closes the fixture, callback, loop, or test block for 'compares calendar days rather than elapsed hours across a DST transition when available'.

### Line 63

```text
  const beforeSpringForward = new Date('2026-03-08T00:30:00');
```

Sets beforeSpringForward to a deterministic date/time fixture so 'compares calendar days rather than elapsed hours across a DST transition when available' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.

### Line 64

```text
  const afterSpringForward = new Date('2026-03-09T00:30:00');
```

Sets afterSpringForward to a deterministic date/time fixture so 'compares calendar days rather than elapsed hours across a DST transition when available' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.

### Line 65

```text
  assert.equal(plannedJobUrgency(jobOn(afterSpringForward), beforeSpringForward).daysAway, 1);
```

In the test 'compares calendar days rather than elapsed hours across a DST transition when available', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(plannedJobUrgency(jobOn(afterSpringForward), beforeSpringForward).daysAway, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 66

```text
  assert.equal(plannedJobUrgency(jobOn(beforeSpringForward), afterSpringForward).daysAway, -1);
```

In the test 'compares calendar days rather than elapsed hours across a DST transition when available', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(plannedJobUrgency(jobOn(beforeSpringForward), afterSpringForward).daysAway, -1);; the fixture therefore checks the concrete boundary/result contract.

### Line 67

```text
});
```

Closes the fixture, callback, loop, or test block for 'compares calendar days rather than elapsed hours across a DST transition when available'.

### Line 68

```text

```

Blank line separates related setup or assertions for readability.

### Line 69

```text
test('planned overdue alert counts only open overdue jobs and is empty at zero', () => {
```

Starts an isolated test case whose title states the behavior being specified: planned overdue alert counts only open overdue jobs and is empty at zero.

### Line 70

```text
  const jobs = [
```

Builds jobs, the concrete fixture collection/object used as input for 'planned overdue alert counts only open overdue jobs and is empty at zero'; its fields model the relevant domain records or DOM state.

### Line 71

```text
    jobOn(day(2026, 1, 14)),
```

Continues the arguments for day. Each comma separates one argument that the function receives in this order.

### Line 72

```text
    jobOn(day(2026, 1, 10)),
```

Continues the arguments for day. Each comma separates one argument that the function receives in this order.

### Line 73

```text
    { ...jobOn(day(2026, 1, 1)), isComplete: true },
```

Continues the arguments for day. Each comma separates one argument that the function receives in this order.

### Line 74

```text
    jobOn(day(2026, 1, 15)),
```

Continues the arguments for day. Each comma separates one argument that the function receives in this order.

### Line 75

```text
    jobOn(null)
```

Continues the arguments for jobOn. Each comma separates one argument that the function receives in this order.

### Line 76

```text
  ];
```

Closes the fixture, callback, loop, or test block for 'planned overdue alert counts only open overdue jobs and is empty at zero'.

### Line 77

```text
  assert.equal(
```

In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage(jobs, today), 'Action needed: 2 planned jobs are overdue. Review the schedule to complete or reschedule them.' );; the fixture therefore checks the concrete boundary/result contract.

### Line 78

```text
    plannedOverdueMessage(jobs, today),
```

In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage(jobs, today), 'Action needed: 2 planned jobs are overdue. Review the schedule to complete or reschedule them.' );; the fixture therefore checks the concrete boundary/result contract.

### Line 79

```text
    'Action needed: 2 planned jobs are overdue. Review the schedule to complete or reschedule them.'
```

In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage(jobs, today), 'Action needed: 2 planned jobs are overdue. Review the schedule to complete or reschedule them.' );; the fixture therefore checks the concrete boundary/result contract.

### Line 80

```text
  );
```

In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage(jobs, today), 'Action needed: 2 planned jobs are overdue. Review the schedule to complete or reschedule them.' );; the fixture therefore checks the concrete boundary/result contract.

### Line 81

```text
  assert.equal(plannedOverdueMessage([jobOn(day(2026, 1, 15))], today), '');
```

In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(plannedOverdueMessage([jobOn(day(2026, 1, 15))], today), '');; the fixture therefore checks the concrete boundary/result contract.

### Line 82

```text
  assert.equal(
```

In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage([jobOn(day(2026, 1, 14))], today), 'Action needed: 1 planned job is overdue. Review the schedule to complete or reschedule it.' );; the fixture therefore checks the concrete boundary/result contract.

### Line 83

```text
    plannedOverdueMessage([jobOn(day(2026, 1, 14))], today),
```

In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage([jobOn(day(2026, 1, 14))], today), 'Action needed: 1 planned job is overdue. Review the schedule to complete or reschedule it.' );; the fixture therefore checks the concrete boundary/result contract.

### Line 84

```text
    'Action needed: 1 planned job is overdue. Review the schedule to complete or reschedule it.'
```

In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage([jobOn(day(2026, 1, 14))], today), 'Action needed: 1 planned job is overdue. Review the schedule to complete or reschedule it.' );; the fixture therefore checks the concrete boundary/result contract.

### Line 85

```text
  );
```

In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage([jobOn(day(2026, 1, 14))], today), 'Action needed: 1 planned job is overdue. Review the schedule to complete or reschedule it.' );; the fixture therefore checks the concrete boundary/result contract.

### Line 86

```text
});
```

Closes the fixture, callback, loop, or test block for 'planned overdue alert counts only open overdue jobs and is empty at zero'.

### Line 87

```text

```

Blank line separates related setup or assertions for readability.

### Line 88

```text
test('updatePlannedAlert only assigns text when it changes and synchronizes hidden state', () => {
```

Starts an isolated test case whose title states the behavior being specified: updatePlannedAlert only assigns text when it changes and synchronizes hidden state.

### Line 89

```text
  let text = 'existing';
```

Initializes text for 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', supplying the value that the following test logic will inspect or mutate.

### Line 90

```text
  let textAssignments = 0;
```

Initializes textAssignments for 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', supplying the value that the following test logic will inspect or mutate.

### Line 91

```text
  const element = {
```

Builds element, the concrete fixture collection/object used as input for 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state'; its fields model the relevant domain records or DOM state.

### Line 92

```text
    get textContent() { return text; },
```

Returns `text` (text) to the caller and exits this function.

### Line 93

```text
    set textContent(value) { textAssignments += 1; text = value; },
```

Adds to `textAssignments` (text assignments) using 1.

### Line 94

```text
    hidden: false
```

Sets the object field hidden using false. This field is read later through its property name.

### Line 95

```text
  };
```

Closes the fixture, callback, loop, or test block for 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state'.

### Line 96

```text
  const overdue = [jobOn(day(2026, 1, 14))];
```

Builds overdue, the concrete fixture collection/object used as input for 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state'; its fields model the relevant domain records or DOM state.

### Line 97

```text
  updatePlannedAlert(element, overdue, today);
```

Calls `updatePlannedAlert` with `element` (element); `overdue` (overdue); `today` (today).

### Line 98

```text
  assert.equal(textAssignments, 1);
```

In the test 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(textAssignments, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 99

```text
  assert.equal(element.hidden, false);
```

In the test 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(element.hidden, false);; the fixture therefore checks the concrete boundary/result contract.

### Line 100

```text
  updatePlannedAlert(element, overdue, today);
```

Calls `updatePlannedAlert` with `element` (element); `overdue` (overdue); `today` (today).

### Line 101

```text
  assert.equal(textAssignments, 1);
```

In the test 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(textAssignments, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 102

```text
  updatePlannedAlert(element, [], today);
```

Calls `updatePlannedAlert` with `element` (element); an array containing ; `today` (today).

### Line 103

```text
  assert.equal(textAssignments, 2);
```

In the test 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(textAssignments, 2);; the fixture therefore checks the concrete boundary/result contract.

### Line 104

```text
  assert.equal(element.textContent, '');
```

In the test 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(element.textContent, '');; the fixture therefore checks the concrete boundary/result contract.

### Line 105

```text
  assert.equal(element.hidden, true);
```

In the test 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(element.hidden, true);; the fixture therefore checks the concrete boundary/result contract.

### Line 106

```text
});
```

Closes the fixture, callback, loop, or test block for 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state'.

### Line 107

```text

```

Blank line separates related setup or assertions for readability.

### Line 108

```text
test('watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', () => {
```

Starts an isolated test case whose title states the behavior being specified: watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition.

### Line 109

```text
  const RealDate = Date;
```

Initializes RealDate for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', supplying the value that the following test logic will inspect or mutate.

### Line 110

```text
  let current = new RealDate(2026, 0, 15, 23, 59);
```

Initializes current for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', supplying the value that the following test logic will inspect or mutate.

### Line 111

```text
  const OriginalDate = globalThis.Date;
```

Initializes OriginalDate for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', supplying the value that the following test logic will inspect or mutate.

### Line 112

```text
  class ControlledDate extends OriginalDate {
```

Declares a test-only helper/type that models the application behavior needed by 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.

### Line 113

```text
    constructor(...args) {
```

Continues the surrounding JavaScript expression or argument list. This line contributes constructor(...args) {; the preceding opening delimiter and following closing delimiter show the expression it belongs to.

### Line 114

```text
      super(...(args.length ? args : [current]));
```

Calls `super` with the expanded entries/properties from checks `args.length` (the length property of args); if true chooses `args` (args), otherwise an array containing `current` (current).

### Line 115

```text
    }
```

Closes the fixture, callback, loop, or test block for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.

### Line 116

```text
  }
```

Closes the fixture, callback, loop, or test block for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.

### Line 117

```text
  globalThis.Date = ControlledDate;
```

Sets `globalThis.Date` (the date property of globalThis) to `ControlledDate` (controlled date).

### Line 118

```text
  try {
```

Sets up or tears down shared test state for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', ensuring emulator/mocked resources do not leak between cases.

### Line 119

```text
    let intervalCheck;
```

Initializes intervalCheck; for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', supplying the value that the following test logic will inspect or mutate.

### Line 120

```text
    const listeners = new Map();
```

Creates listeners, a test-side collection used to record listeners, DOM properties, calls, or unique results while testing 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.

### Line 121

```text
    const view = {
```

Builds view, the concrete fixture collection/object used as input for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'; its fields model the relevant domain records or DOM state.

### Line 122

```text
      setInterval(callback, milliseconds) {
```

Defines field setInterval as a callback taking callback, milliseconds that runs its enclosed statements.

### Line 123

```text
        assert.equal(milliseconds, 60_000);
```

In the test 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(milliseconds, 60_000);; the fixture therefore checks the concrete boundary/result contract.

### Line 124

```text
        intervalCheck = callback;
```

Sets `intervalCheck` (interval check) to `callback` (callback).

### Line 125

```text
        return 1;
```

Returns the fixture/helper result needed by the 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition' test, preserving the modeled state for its caller.

### Line 126

```text
      },
```

Closes callback function. Control continues after this block.

### Line 127

```text
      addEventListener(type, callback) { listeners.set(`view:${type}`, callback); }
```

Calls `listeners.set` with a text template that combines fixed text with computed values `type` (type); `callback` (callback).

### Line 128

```text
    };
```

Closes the fixture, callback, loop, or test block for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.

### Line 129

```text
    const doc = {
```

Builds doc, the concrete fixture collection/object used as input for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'; its fields model the relevant domain records or DOM state.

### Line 130

```text
      hidden: true,
```

Sets the object field hidden using true. This field is read later through its property name.

### Line 131

```text
      addEventListener(type, callback) { listeners.set(`doc:${type}`, callback); }
```

Calls `listeners.set` with a text template that combines fixed text with computed values `type` (type); `callback` (callback).

### Line 132

```text
    };
```

Closes the fixture, callback, loop, or test block for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.

### Line 133

```text
    let refreshes = 0;
```

Initializes refreshes for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', supplying the value that the following test logic will inspect or mutate.

### Line 134

```text
    watchPlannedDayChange(() => { refreshes += 1; }, doc, view);
```

Begins a callback used by the 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition' test to model an event, loader, or transformation.

### Line 135

```text
    current = new RealDate(2026, 0, 16, 0, 1);
```

Sets `current` (current) to constructs a new instance of `RealDate` with 2026; 0; 16; 0; 1.

### Line 136

```text
    intervalCheck();
```

Calls `intervalCheck` with no arguments.

### Line 137

```text
    assert.equal(refreshes, 1);
```

In the test 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(refreshes, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 138

```text
    intervalCheck();
```

Calls `intervalCheck` with no arguments.

### Line 139

```text
    listeners.get('view:focus')();
```

Calls `listeners.get('view:focus')` with no arguments.

### Line 140

```text
    assert.equal(refreshes, 1);
```

In the test 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(refreshes, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 141

```text
    doc.hidden = true;
```

Sets `doc.hidden` (the hidden property of doc) to true.

### Line 142

```text
    listeners.get('doc:visibilitychange')();
```

Calls `listeners.get('doc:visibilitychange')` with no arguments.

### Line 143

```text
    assert.equal(refreshes, 1);
```

In the test 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(refreshes, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 144

```text
    doc.hidden = false;
```

Sets `doc.hidden` (the hidden property of doc) to false.

### Line 145

```text
    listeners.get('doc:visibilitychange')();
```

Calls `listeners.get('doc:visibilitychange')` with no arguments.

### Line 146

```text
    assert.equal(refreshes, 1);
```

In the test 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(refreshes, 1);; the fixture therefore checks the concrete boundary/result contract.

### Line 147

```text
    current = new RealDate(2026, 0, 17, 0, 1);
```

Sets `current` (current) to constructs a new instance of `RealDate` with 2026; 0; 17; 0; 1.

### Line 148

```text
    listeners.get('view:focus')();
```

Calls `listeners.get('view:focus')` with no arguments.

### Line 149

```text
    assert.equal(refreshes, 2);
```

In the test 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(refreshes, 2);; the fixture therefore checks the concrete boundary/result contract.

### Line 150

```text
  } finally {
```

Begins the finally cleanup block. These statements run after try/catch whether the operation succeeds or fails, for example restoring enabled controls.

### Line 151

```text
    globalThis.Date = OriginalDate;
```

Sets `globalThis.Date` (the date property of globalThis) to `OriginalDate` (original date).

### Line 152

```text
  }
```

Closes the fixture, callback, loop, or test block for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.

### Line 153

```text
});
```

Closes the fixture, callback, loop, or test block for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.

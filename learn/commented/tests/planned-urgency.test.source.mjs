// Original L1: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import test from 'node:test';
// Original L2: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import assert from 'node:assert/strict';
// Original L3: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import {
// Original L4: Imports plannedJobUrgency from the shared module; plannedJobUrgency is the name used in this file.
  plannedJobUrgency,
// Original L5: Imports plannedOverdueMessage from the shared module; plannedOverdueMessage is the name used in this file.
  plannedOverdueMessage,
// Original L6: Imports updatePlannedAlert from the shared module; updatePlannedAlert is the name used in this file.
  updatePlannedAlert,
// Original L7: Imports watchPlannedDayChange from the shared module; watchPlannedDayChange is the name used in this file.
  watchPlannedDayChange
// Original L8: Completes the named import list and tells the browser to resolve these shared helpers from ../scripts/planned-urgency.mjs. Imported bindings refer to exports of that module.
} from '../scripts/planned-urgency.mjs';
// Original L9: Blank line separates related setup or assertions for readability.

// Original L10: Defines the test fixture/helper day; its returned mock data represents the application state needed to exercise 'test setup'.
const day = (year, month, date, hour = 12) => new Date(year, month - 1, date, hour, 0, 0, 0);
// Original L11: Initializes today for 'test setup', supplying the value that the following test logic will inspect or mutate.
const today = day(2026, 1, 15);
// Original L12: Defines the test fixture/helper jobOn; its returned mock data represents the application state needed to exercise 'test setup'.
const jobOn = scheduledDate => ({ scheduledDate, isComplete: false });
// Original L13: Blank line separates related setup or assertions for readability.

// Original L14: Declares a test-only helper/type that models the application behavior needed by 'test setup'.
function assertUrgency(scheduledDate, expected) {
// Original L15: Calls `assert.deepEqual` with calls `plannedJobUrgency` with calls `jobOn` with `scheduledDate` (scheduled date); `today` (today); `expected` (expected).
  assert.deepEqual(plannedJobUrgency(jobOn(scheduledDate), today), expected);
// Original L16: Closes the fixture, callback, loop, or test block for 'test setup'.
}
// Original L17: Blank line separates related setup or assertions for readability.

// Original L18: Starts an isolated test case whose title states the behavior being specified: classifies every planned urgency boundary using local calendar days.
test('classifies every planned urgency boundary using local calendar days', () => {
// Original L19: Calls `assertUrgency` with calls `day` with 2026; 1; 14; an object with fields level: "overdue"; label: "Overdue by 1 day"; daysAway: changes the numeric sign of 1.
  assertUrgency(day(2026, 1, 14), { level: 'overdue', label: 'Overdue by 1 day', daysAway: -1 });
// Original L20: Calls `assertUrgency` with calls `day` with 2026; 1; 12; an object with fields level: "overdue"; label: "Overdue by 3 days"; daysAway: changes the numeric sign of 3.
  assertUrgency(day(2026, 1, 12), { level: 'overdue', label: 'Overdue by 3 days', daysAway: -3 });
// Original L21: Calls `assertUrgency` with calls `day` with 2026; 1; 15; an object with fields level: "today"; label: "Due today"; daysAway: 0.
  assertUrgency(day(2026, 1, 15), { level: 'today', label: 'Due today', daysAway: 0 });
// Original L22: Calls `assertUrgency` with calls `day` with 2026; 1; 16; an object with fields level: "tomorrow"; label: "Due tomorrow"; daysAway: 1.
  assertUrgency(day(2026, 1, 16), { level: 'tomorrow', label: 'Due tomorrow', daysAway: 1 });
// Original L23: Calls `assertUrgency` with calls `day` with 2026; 1; 17; an object with fields level: "soon"; label: "Due in 2 days"; daysAway: 2.
  assertUrgency(day(2026, 1, 17), { level: 'soon', label: 'Due in 2 days', daysAway: 2 });
// Original L24: Calls `assertUrgency` with calls `day` with 2026; 1; 18; an object with fields level: "soon"; label: "Due in 3 days"; daysAway: 3.
  assertUrgency(day(2026, 1, 18), { level: 'soon', label: 'Due in 3 days', daysAway: 3 });
// Original L25: Calls `assertUrgency` with calls `day` with 2026; 1; 19; an object with fields level: "week"; label: "Due in 4 days"; daysAway: 4.
  assertUrgency(day(2026, 1, 19), { level: 'week', label: 'Due in 4 days', daysAway: 4 });
// Original L26: Calls `assertUrgency` with calls `day` with 2026; 1; 22; an object with fields level: "week"; label: "Due in 7 days"; daysAway: 7.
  assertUrgency(day(2026, 1, 22), { level: 'week', label: 'Due in 7 days', daysAway: 7 });
// Original L27: Calls `assertUrgency` with calls `day` with 2026; 1; 23; an object with fields level: "upcoming"; label: "Due in 8 days"; daysAway: 8.
  assertUrgency(day(2026, 1, 23), { level: 'upcoming', label: 'Due in 8 days', daysAway: 8 });
// Original L28: Calls `assertUrgency` with calls `day` with 2026; 1; 25; an object with fields level: "upcoming"; label: "Due in 10 days"; daysAway: 10.
  assertUrgency(day(2026, 1, 25), { level: 'upcoming', label: 'Due in 10 days', daysAway: 10 });
// Original L29: Closes the fixture, callback, loop, or test block for 'classifies every planned urgency boundary using local calendar days'.
});
// Original L30: Blank line separates related setup or assertions for readability.

// Original L31: Starts an isolated test case whose title states the behavior being specified: completed jobs stay completed even when overdue, and reopening restores urgency.
test('completed jobs stay completed even when overdue, and reopening restores urgency', () => {
// Original L32: Builds job, the concrete fixture collection/object used as input for 'completed jobs stay completed even when overdue, and reopening restores urgency'; its fields model the relevant domain records or DOM state.
  const job = { scheduledDate: day(2026, 1, 10), isComplete: true };
// Original L33: Calls `assert.deepEqual` with calls `plannedJobUrgency` with `job` (job); `today` (today); an object with fields level: "complete"; label: "Completed"; daysAway: null.
  assert.deepEqual(plannedJobUrgency(job, today), {
// Original L34: Defines field level as "complete".
    level: 'complete', label: 'Completed', daysAway: null
// Original L35: In the test 'completed jobs stay completed even when overdue, and reopening restores urgency', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(plannedJobUrgency(job, today), { level: 'complete', label: 'Completed', daysAway: null });; array order and object fields are part of the contract.
  });
// Original L36: Sets `job.isComplete` (the is complete property of job) to false.
  job.isComplete = false;
// Original L37: Calls `assert.deepEqual` with calls `plannedJobUrgency` with `job` (job); `today` (today); an object with fields level: "overdue"; label: "Overdue by 5 days"; daysAway: changes the numeric sign of 5.
  assert.deepEqual(plannedJobUrgency(job, today), {
// Original L38: Defines field level as "overdue".
    level: 'overdue', label: 'Overdue by 5 days', daysAway: -5
// Original L39: In the test 'completed jobs stay completed even when overdue, and reopening restores urgency', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(plannedJobUrgency(job, today), { level: 'overdue', label: 'Overdue by 5 days', daysAway: -5 });; array order and object fields are part of the contract.
  });
// Original L40: Closes the fixture, callback, loop, or test block for 'completed jobs stay completed even when overdue, and reopening restores urgency'.
});
// Original L41: Blank line separates related setup or assertions for readability.

// Original L42: Starts an isolated test case whose title states the behavior being specified: null, blank, and invalid dates are explicitly TBD.
test('null, blank, and invalid dates are explicitly TBD', () => {
// Original L43: Controls iteration/branching in the 'null, blank, and invalid dates are explicitly TBD' test so each relevant fixture or environment condition is exercised.
  for (const scheduledDate of [null, undefined, '', '   ', 'not-a-date', new Date('invalid')]) {
// Original L44: Calls `assert.deepEqual` with calls `plannedJobUrgency` with calls `jobOn` with `scheduledDate` (scheduled date); `today` (today); an object with fields level: "tbd"; label: "Date TBD"; daysAway: null.
    assert.deepEqual(plannedJobUrgency(jobOn(scheduledDate), today), {
// Original L45: Defines field level as "tbd".
      level: 'tbd', label: 'Date TBD', daysAway: null
// Original L46: In the test 'null, blank, and invalid dates are explicitly TBD', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(plannedJobUrgency(jobOn(scheduledDate), today), { level: 'tbd', label: 'Date TBD', daysAway: null });; array order and object fields are part of the contract.
    });
// Original L47: Closes the fixture, callback, loop, or test block for 'null, blank, and invalid dates are explicitly TBD'.
  }
// Original L48: Closes the fixture, callback, loop, or test block for 'null, blank, and invalid dates are explicitly TBD'.
});
// Original L49: Blank line separates related setup or assertions for readability.

// Original L50: Starts an isolated test case whose title states the behavior being specified: accepts Firestore-like timestamps and preserves local date semantics.
test('accepts Firestore-like timestamps and preserves local date semantics', () => {
// Original L51: Builds timestamp, the concrete fixture collection/object used as input for 'accepts Firestore-like timestamps and preserves local date semantics'; its fields model the relevant domain records or DOM state.
  const timestamp = { toDate: () => day(2026, 1, 18, 23) };
// Original L52: Calls `assert.deepEqual` with calls `plannedJobUrgency` with calls `jobOn` with `timestamp` (timestamp); calls `day` with 2026; 1; 18; 1; an object with fields level: "today"; label: "Due today"; daysAway: 0.
  assert.deepEqual(plannedJobUrgency(jobOn(timestamp), day(2026, 1, 18, 1)), {
// Original L53: Defines field level as "today".
    level: 'today', label: 'Due today', daysAway: 0
// Original L54: In the test 'accepts Firestore-like timestamps and preserves local date semantics', this deep assertion requires the complete nested result to match the shown expected fixture: assert.deepEqual(plannedJobUrgency(jobOn(timestamp), day(2026, 1, 18, 1)), { level: 'today', label: 'Due today', daysAway: 0 });; array order and object fields are part of the contract.
  });
// Original L55: Closes the fixture, callback, loop, or test block for 'accepts Firestore-like timestamps and preserves local date semantics'.
});
// Original L56: Blank line separates related setup or assertions for readability.

// Original L57: Starts an isolated test case whose title states the behavior being specified: compares calendar days rather than elapsed hours across a DST transition when available.
test('compares calendar days rather than elapsed hours across a DST transition when available', () => {
// Original L58: Initializes zone for 'compares calendar days rather than elapsed hours across a DST transition when available', supplying the value that the following test logic will inspect or mutate.
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// Original L59: Controls iteration/branching in the 'compares calendar days rather than elapsed hours across a DST transition when available' test so each relevant fixture or environment condition is exercised.
  if (!['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles'].includes(zone)) {
// Original L60: In the test 'compares calendar days rather than elapsed hours across a DST transition when available', this truthiness assertion requires the concrete condition to hold: assert.ok(true, `DST-specific local-zone assertion skipped in ${zone}`);; it verifies the required presence, count, geometry, or invariant represented by the fixture.
    assert.ok(true, `DST-specific local-zone assertion skipped in ${zone}`);
// Original L61: Returns no value to the caller and exits this function.
    return;
// Original L62: Closes the fixture, callback, loop, or test block for 'compares calendar days rather than elapsed hours across a DST transition when available'.
  }
// Original L63: Sets beforeSpringForward to a deterministic date/time fixture so 'compares calendar days rather than elapsed hours across a DST transition when available' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.
  const beforeSpringForward = new Date('2026-03-08T00:30:00');
// Original L64: Sets afterSpringForward to a deterministic date/time fixture so 'compares calendar days rather than elapsed hours across a DST transition when available' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.
  const afterSpringForward = new Date('2026-03-09T00:30:00');
// Original L65: In the test 'compares calendar days rather than elapsed hours across a DST transition when available', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(plannedJobUrgency(jobOn(afterSpringForward), beforeSpringForward).daysAway, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(plannedJobUrgency(jobOn(afterSpringForward), beforeSpringForward).daysAway, 1);
// Original L66: In the test 'compares calendar days rather than elapsed hours across a DST transition when available', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(plannedJobUrgency(jobOn(beforeSpringForward), afterSpringForward).daysAway, -1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(plannedJobUrgency(jobOn(beforeSpringForward), afterSpringForward).daysAway, -1);
// Original L67: Closes the fixture, callback, loop, or test block for 'compares calendar days rather than elapsed hours across a DST transition when available'.
});
// Original L68: Blank line separates related setup or assertions for readability.

// Original L69: Starts an isolated test case whose title states the behavior being specified: planned overdue alert counts only open overdue jobs and is empty at zero.
test('planned overdue alert counts only open overdue jobs and is empty at zero', () => {
// Original L70: Builds jobs, the concrete fixture collection/object used as input for 'planned overdue alert counts only open overdue jobs and is empty at zero'; its fields model the relevant domain records or DOM state.
  const jobs = [
// Original L71: Continues the arguments for day. Each comma separates one argument that the function receives in this order.
    jobOn(day(2026, 1, 14)),
// Original L72: Continues the arguments for day. Each comma separates one argument that the function receives in this order.
    jobOn(day(2026, 1, 10)),
// Original L73: Continues the arguments for day. Each comma separates one argument that the function receives in this order.
    { ...jobOn(day(2026, 1, 1)), isComplete: true },
// Original L74: Continues the arguments for day. Each comma separates one argument that the function receives in this order.
    jobOn(day(2026, 1, 15)),
// Original L75: Continues the arguments for jobOn. Each comma separates one argument that the function receives in this order.
    jobOn(null)
// Original L76: Closes the fixture, callback, loop, or test block for 'planned overdue alert counts only open overdue jobs and is empty at zero'.
  ];
// Original L77: In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage(jobs, today), 'Action needed: 2 planned jobs are overdue. Review the schedule to complete or reschedule them.' );; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(
// Original L78: In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage(jobs, today), 'Action needed: 2 planned jobs are overdue. Review the schedule to complete or reschedule them.' );; the fixture therefore checks the concrete boundary/result contract.
    plannedOverdueMessage(jobs, today),
// Original L79: In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage(jobs, today), 'Action needed: 2 planned jobs are overdue. Review the schedule to complete or reschedule them.' );; the fixture therefore checks the concrete boundary/result contract.
    'Action needed: 2 planned jobs are overdue. Review the schedule to complete or reschedule them.'
// Original L80: In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage(jobs, today), 'Action needed: 2 planned jobs are overdue. Review the schedule to complete or reschedule them.' );; the fixture therefore checks the concrete boundary/result contract.
  );
// Original L81: In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(plannedOverdueMessage([jobOn(day(2026, 1, 15))], today), '');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(plannedOverdueMessage([jobOn(day(2026, 1, 15))], today), '');
// Original L82: In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage([jobOn(day(2026, 1, 14))], today), 'Action needed: 1 planned job is overdue. Review the schedule to complete or reschedule it.' );; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(
// Original L83: In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage([jobOn(day(2026, 1, 14))], today), 'Action needed: 1 planned job is overdue. Review the schedule to complete or reschedule it.' );; the fixture therefore checks the concrete boundary/result contract.
    plannedOverdueMessage([jobOn(day(2026, 1, 14))], today),
// Original L84: In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage([jobOn(day(2026, 1, 14))], today), 'Action needed: 1 planned job is overdue. Review the schedule to complete or reschedule it.' );; the fixture therefore checks the concrete boundary/result contract.
    'Action needed: 1 planned job is overdue. Review the schedule to complete or reschedule it.'
// Original L85: In the test 'planned overdue alert counts only open overdue jobs and is empty at zero', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal( plannedOverdueMessage([jobOn(day(2026, 1, 14))], today), 'Action needed: 1 planned job is overdue. Review the schedule to complete or reschedule it.' );; the fixture therefore checks the concrete boundary/result contract.
  );
// Original L86: Closes the fixture, callback, loop, or test block for 'planned overdue alert counts only open overdue jobs and is empty at zero'.
});
// Original L87: Blank line separates related setup or assertions for readability.

// Original L88: Starts an isolated test case whose title states the behavior being specified: updatePlannedAlert only assigns text when it changes and synchronizes hidden state.
test('updatePlannedAlert only assigns text when it changes and synchronizes hidden state', () => {
// Original L89: Initializes text for 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', supplying the value that the following test logic will inspect or mutate.
  let text = 'existing';
// Original L90: Initializes textAssignments for 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', supplying the value that the following test logic will inspect or mutate.
  let textAssignments = 0;
// Original L91: Builds element, the concrete fixture collection/object used as input for 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state'; its fields model the relevant domain records or DOM state.
  const element = {
// Original L92: Returns `text` (text) to the caller and exits this function.
    get textContent() { return text; },
// Original L93: Adds to `textAssignments` (text assignments) using 1.
    set textContent(value) { textAssignments += 1; text = value; },
// Original L94: Sets the object field hidden using false. This field is read later through its property name.
    hidden: false
// Original L95: Closes the fixture, callback, loop, or test block for 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state'.
  };
// Original L96: Builds overdue, the concrete fixture collection/object used as input for 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state'; its fields model the relevant domain records or DOM state.
  const overdue = [jobOn(day(2026, 1, 14))];
// Original L97: Calls `updatePlannedAlert` with `element` (element); `overdue` (overdue); `today` (today).
  updatePlannedAlert(element, overdue, today);
// Original L98: In the test 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(textAssignments, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(textAssignments, 1);
// Original L99: In the test 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(element.hidden, false);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(element.hidden, false);
// Original L100: Calls `updatePlannedAlert` with `element` (element); `overdue` (overdue); `today` (today).
  updatePlannedAlert(element, overdue, today);
// Original L101: In the test 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(textAssignments, 1);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(textAssignments, 1);
// Original L102: Calls `updatePlannedAlert` with `element` (element); an array containing ; `today` (today).
  updatePlannedAlert(element, [], today);
// Original L103: In the test 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(textAssignments, 2);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(textAssignments, 2);
// Original L104: In the test 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(element.textContent, '');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(element.textContent, '');
// Original L105: In the test 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(element.hidden, true);; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(element.hidden, true);
// Original L106: Closes the fixture, callback, loop, or test block for 'updatePlannedAlert only assigns text when it changes and synchronizes hidden state'.
});
// Original L107: Blank line separates related setup or assertions for readability.

// Original L108: Starts an isolated test case whose title states the behavior being specified: watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition.
test('watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', () => {
// Original L109: Initializes RealDate for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', supplying the value that the following test logic will inspect or mutate.
  const RealDate = Date;
// Original L110: Initializes current for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', supplying the value that the following test logic will inspect or mutate.
  let current = new RealDate(2026, 0, 15, 23, 59);
// Original L111: Initializes OriginalDate for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', supplying the value that the following test logic will inspect or mutate.
  const OriginalDate = globalThis.Date;
// Original L112: Declares a test-only helper/type that models the application behavior needed by 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.
  class ControlledDate extends OriginalDate {
// Original L113: Continues the surrounding JavaScript expression or argument list. This line contributes constructor(...args) {; the preceding opening delimiter and following closing delimiter show the expression it belongs to.
    constructor(...args) {
// Original L114: Calls `super` with the expanded entries/properties from checks `args.length` (the length property of args); if true chooses `args` (args), otherwise an array containing `current` (current).
      super(...(args.length ? args : [current]));
// Original L115: Closes the fixture, callback, loop, or test block for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.
    }
// Original L116: Closes the fixture, callback, loop, or test block for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.
  }
// Original L117: Sets `globalThis.Date` (the date property of globalThis) to `ControlledDate` (controlled date).
  globalThis.Date = ControlledDate;
// Original L118: Sets up or tears down shared test state for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', ensuring emulator/mocked resources do not leak between cases.
  try {
// Original L119: Initializes intervalCheck; for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', supplying the value that the following test logic will inspect or mutate.
    let intervalCheck;
// Original L120: Creates listeners, a test-side collection used to record listeners, DOM properties, calls, or unique results while testing 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.
    const listeners = new Map();
// Original L121: Builds view, the concrete fixture collection/object used as input for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'; its fields model the relevant domain records or DOM state.
    const view = {
// Original L122: Defines field setInterval as a callback taking callback, milliseconds that runs its enclosed statements.
      setInterval(callback, milliseconds) {
// Original L123: In the test 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(milliseconds, 60_000);; the fixture therefore checks the concrete boundary/result contract.
        assert.equal(milliseconds, 60_000);
// Original L124: Sets `intervalCheck` (interval check) to `callback` (callback).
        intervalCheck = callback;
// Original L125: Returns the fixture/helper result needed by the 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition' test, preserving the modeled state for its caller.
        return 1;
// Original L126: Closes callback function. Control continues after this block.
      },
// Original L127: Calls `listeners.set` with a text template that combines fixed text with computed values `type` (type); `callback` (callback).
      addEventListener(type, callback) { listeners.set(`view:${type}`, callback); }
// Original L128: Closes the fixture, callback, loop, or test block for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.
    };
// Original L129: Builds doc, the concrete fixture collection/object used as input for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'; its fields model the relevant domain records or DOM state.
    const doc = {
// Original L130: Sets the object field hidden using true. This field is read later through its property name.
      hidden: true,
// Original L131: Calls `listeners.set` with a text template that combines fixed text with computed values `type` (type); `callback` (callback).
      addEventListener(type, callback) { listeners.set(`doc:${type}`, callback); }
// Original L132: Closes the fixture, callback, loop, or test block for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.
    };
// Original L133: Initializes refreshes for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', supplying the value that the following test logic will inspect or mutate.
    let refreshes = 0;
// Original L134: Begins a callback used by the 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition' test to model an event, loader, or transformation.
    watchPlannedDayChange(() => { refreshes += 1; }, doc, view);
// Original L135: Sets `current` (current) to constructs a new instance of `RealDate` with 2026; 0; 16; 0; 1.
    current = new RealDate(2026, 0, 16, 0, 1);
// Original L136: Calls `intervalCheck` with no arguments.
    intervalCheck();
// Original L137: In the test 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(refreshes, 1);; the fixture therefore checks the concrete boundary/result contract.
    assert.equal(refreshes, 1);
// Original L138: Calls `intervalCheck` with no arguments.
    intervalCheck();
// Original L139: Calls `listeners.get('view:focus')` with no arguments.
    listeners.get('view:focus')();
// Original L140: In the test 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(refreshes, 1);; the fixture therefore checks the concrete boundary/result contract.
    assert.equal(refreshes, 1);
// Original L141: Sets `doc.hidden` (the hidden property of doc) to true.
    doc.hidden = true;
// Original L142: Calls `listeners.get('doc:visibilitychange')` with no arguments.
    listeners.get('doc:visibilitychange')();
// Original L143: In the test 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(refreshes, 1);; the fixture therefore checks the concrete boundary/result contract.
    assert.equal(refreshes, 1);
// Original L144: Sets `doc.hidden` (the hidden property of doc) to false.
    doc.hidden = false;
// Original L145: Calls `listeners.get('doc:visibilitychange')` with no arguments.
    listeners.get('doc:visibilitychange')();
// Original L146: In the test 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(refreshes, 1);; the fixture therefore checks the concrete boundary/result contract.
    assert.equal(refreshes, 1);
// Original L147: Sets `current` (current) to constructs a new instance of `RealDate` with 2026; 0; 17; 0; 1.
    current = new RealDate(2026, 0, 17, 0, 1);
// Original L148: Calls `listeners.get('view:focus')` with no arguments.
    listeners.get('view:focus')();
// Original L149: In the test 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(refreshes, 2);; the fixture therefore checks the concrete boundary/result contract.
    assert.equal(refreshes, 2);
// Original L150: Begins the finally cleanup block. These statements run after try/catch whether the operation succeeds or fails, for example restoring enabled controls.
  } finally {
// Original L151: Sets `globalThis.Date` (the date property of globalThis) to `OriginalDate` (original date).
    globalThis.Date = OriginalDate;
// Original L152: Closes the fixture, callback, loop, or test block for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.
  }
// Original L153: Closes the fixture, callback, loop, or test block for 'watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition'.
});

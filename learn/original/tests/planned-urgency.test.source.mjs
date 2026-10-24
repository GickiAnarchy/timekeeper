import test from 'node:test';
import assert from 'node:assert/strict';
import {
  plannedJobUrgency,
  plannedOverdueMessage,
  updatePlannedAlert,
  watchPlannedDayChange
} from '../scripts/planned-urgency.mjs';

const day = (year, month, date, hour = 12) => new Date(year, month - 1, date, hour, 0, 0, 0);
const today = day(2026, 1, 15);
const jobOn = scheduledDate => ({ scheduledDate, isComplete: false });

function assertUrgency(scheduledDate, expected) {
  assert.deepEqual(plannedJobUrgency(jobOn(scheduledDate), today), expected);
}

test('classifies every planned urgency boundary using local calendar days', () => {
  assertUrgency(day(2026, 1, 14), { level: 'overdue', label: 'Overdue by 1 day', daysAway: -1 });
  assertUrgency(day(2026, 1, 12), { level: 'overdue', label: 'Overdue by 3 days', daysAway: -3 });
  assertUrgency(day(2026, 1, 15), { level: 'today', label: 'Due today', daysAway: 0 });
  assertUrgency(day(2026, 1, 16), { level: 'tomorrow', label: 'Due tomorrow', daysAway: 1 });
  assertUrgency(day(2026, 1, 17), { level: 'soon', label: 'Due in 2 days', daysAway: 2 });
  assertUrgency(day(2026, 1, 18), { level: 'soon', label: 'Due in 3 days', daysAway: 3 });
  assertUrgency(day(2026, 1, 19), { level: 'week', label: 'Due in 4 days', daysAway: 4 });
  assertUrgency(day(2026, 1, 22), { level: 'week', label: 'Due in 7 days', daysAway: 7 });
  assertUrgency(day(2026, 1, 23), { level: 'upcoming', label: 'Due in 8 days', daysAway: 8 });
  assertUrgency(day(2026, 1, 25), { level: 'upcoming', label: 'Due in 10 days', daysAway: 10 });
});

test('completed jobs stay completed even when overdue, and reopening restores urgency', () => {
  const job = { scheduledDate: day(2026, 1, 10), isComplete: true };
  assert.deepEqual(plannedJobUrgency(job, today), {
    level: 'complete', label: 'Completed', daysAway: null
  });
  job.isComplete = false;
  assert.deepEqual(plannedJobUrgency(job, today), {
    level: 'overdue', label: 'Overdue by 5 days', daysAway: -5
  });
});

test('null, blank, and invalid dates are explicitly TBD', () => {
  for (const scheduledDate of [null, undefined, '', '   ', 'not-a-date', new Date('invalid')]) {
    assert.deepEqual(plannedJobUrgency(jobOn(scheduledDate), today), {
      level: 'tbd', label: 'Date TBD', daysAway: null
    });
  }
});

test('accepts Firestore-like timestamps and preserves local date semantics', () => {
  const timestamp = { toDate: () => day(2026, 1, 18, 23) };
  assert.deepEqual(plannedJobUrgency(jobOn(timestamp), day(2026, 1, 18, 1)), {
    level: 'today', label: 'Due today', daysAway: 0
  });
});

test('compares calendar days rather than elapsed hours across a DST transition when available', () => {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles'].includes(zone)) {
    assert.ok(true, `DST-specific local-zone assertion skipped in ${zone}`);
    return;
  }
  const beforeSpringForward = new Date('2026-03-08T00:30:00');
  const afterSpringForward = new Date('2026-03-09T00:30:00');
  assert.equal(plannedJobUrgency(jobOn(afterSpringForward), beforeSpringForward).daysAway, 1);
  assert.equal(plannedJobUrgency(jobOn(beforeSpringForward), afterSpringForward).daysAway, -1);
});

test('planned overdue alert counts only open overdue jobs and is empty at zero', () => {
  const jobs = [
    jobOn(day(2026, 1, 14)),
    jobOn(day(2026, 1, 10)),
    { ...jobOn(day(2026, 1, 1)), isComplete: true },
    jobOn(day(2026, 1, 15)),
    jobOn(null)
  ];
  assert.equal(
    plannedOverdueMessage(jobs, today),
    'Action needed: 2 planned jobs are overdue. Review the schedule to complete or reschedule them.'
  );
  assert.equal(plannedOverdueMessage([jobOn(day(2026, 1, 15))], today), '');
  assert.equal(
    plannedOverdueMessage([jobOn(day(2026, 1, 14))], today),
    'Action needed: 1 planned job is overdue. Review the schedule to complete or reschedule it.'
  );
});

test('updatePlannedAlert only assigns text when it changes and synchronizes hidden state', () => {
  let text = 'existing';
  let textAssignments = 0;
  const element = {
    get textContent() { return text; },
    set textContent(value) { textAssignments += 1; text = value; },
    hidden: false
  };
  const overdue = [jobOn(day(2026, 1, 14))];
  updatePlannedAlert(element, overdue, today);
  assert.equal(textAssignments, 1);
  assert.equal(element.hidden, false);
  updatePlannedAlert(element, overdue, today);
  assert.equal(textAssignments, 1);
  updatePlannedAlert(element, [], today);
  assert.equal(textAssignments, 2);
  assert.equal(element.textContent, '');
  assert.equal(element.hidden, true);
});

test('watchPlannedDayChange refreshes once per local-day change from timer, focus, or visible transition', () => {
  const RealDate = Date;
  let current = new RealDate(2026, 0, 15, 23, 59);
  const OriginalDate = globalThis.Date;
  class ControlledDate extends OriginalDate {
    constructor(...args) {
      super(...(args.length ? args : [current]));
    }
  }
  globalThis.Date = ControlledDate;
  try {
    let intervalCheck;
    const listeners = new Map();
    const view = {
      setInterval(callback, milliseconds) {
        assert.equal(milliseconds, 60_000);
        intervalCheck = callback;
        return 1;
      },
      addEventListener(type, callback) { listeners.set(`view:${type}`, callback); }
    };
    const doc = {
      hidden: true,
      addEventListener(type, callback) { listeners.set(`doc:${type}`, callback); }
    };
    let refreshes = 0;
    watchPlannedDayChange(() => { refreshes += 1; }, doc, view);
    current = new RealDate(2026, 0, 16, 0, 1);
    intervalCheck();
    assert.equal(refreshes, 1);
    intervalCheck();
    listeners.get('view:focus')();
    assert.equal(refreshes, 1);
    doc.hidden = true;
    listeners.get('doc:visibilitychange')();
    assert.equal(refreshes, 1);
    doc.hidden = false;
    listeners.get('doc:visibilitychange')();
    assert.equal(refreshes, 1);
    current = new RealDate(2026, 0, 17, 0, 1);
    listeners.get('view:focus')();
    assert.equal(refreshes, 2);
  } finally {
    globalThis.Date = OriginalDate;
  }
});

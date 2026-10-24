# scripts/planned-urgency.mjs

[Exact copy](../../original/scripts/planned-urgency.mjs)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import { asValidDate } from './domain.mjs';
```

Imports asValidDate from ./domain.mjs; these helpers provide the domain calculations this module uses.

### Line 2

```text

```

Blank line separates related statements and has no runtime effect.

### Line 3

```text
// Compare local calendar days, not elapsed hours (which vary across DST).
```

This comment documents the design intent here: Compare local calendar days, not elapsed hours (which vary across DST)..

### Line 4

```text
export function plannedJobUrgency(job, today = new Date()) {
```

Declares plannedJobUrgency(), which assigns completion/overdue/due-soon status to a planned job.

### Line 5

```text
  if (job.isComplete) return { level: 'complete', label: 'Completed', daysAway: null };
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 6

```text
  const date = asValidDate(job.scheduledDate);
```

Stores date, a date value used for local-day or period calculations; later code reuses this result so the planned-urgency.mjs workflow stays consistent.

### Line 7

```text
  if (!date) return { level: 'tbd', label: 'Date TBD', daysAway: null };
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 8

```text
  const now = asValidDate(today) || new Date();
```

Stores now, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the planned-urgency.mjs workflow stays consistent.

### Line 9

```text
  const dayNumber = value => Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()) / 86_400_000;
```

Stores dayNumber, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the planned-urgency.mjs workflow stays consistent.

### Line 10

```text
  const daysAway = dayNumber(date) - dayNumber(now);
```

Stores daysAway, a numeric value validated for payroll math; later code reuses this result so the planned-urgency.mjs workflow stays consistent.

### Line 11

```text
  if (daysAway < 0) return { level: 'overdue', label: `Overdue by ${-daysAway} ${daysAway === -1 ? 'day' : 'days'}`, daysAway };
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 12

```text
  if (daysAway === 0) return { level: 'today', label: 'Due today', daysAway };
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 13

```text
  if (daysAway === 1) return { level: 'tomorrow', label: 'Due tomorrow', daysAway };
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 14

```text
  const level = daysAway <= 3 ? 'soon' : daysAway <= 7 ? 'week' : 'upcoming';
```

Stores level, value; later code reuses this result so the planned-urgency.mjs workflow stays consistent.

### Line 15

```text
  return { level, label: `Due in ${daysAway} days`, daysAway };
```

Returns an object with fields level: `level` (level); label: a text template that combines fixed text with computed values `daysAway` (days away); daysAway: `daysAway` (days away) to the caller and exits this function.

### Line 16

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 17

```text

```

Blank line separates related statements and has no runtime effect.

### Line 18

```text
export function plannedOverdueMessage(jobs, today = new Date()) {
```

Declares plannedOverdueMessage(), which summarizes how many planned jobs are overdue.

### Line 19

```text
  const count = jobs.filter(job => plannedJobUrgency(job, today).level === 'overdue').length;
```

Stores count, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the planned-urgency.mjs workflow stays consistent.

### Line 20

```text
  return count ? `Action needed: ${count} planned ${count === 1 ? 'job is' : 'jobs are'} overdue. Review the schedule to complete or reschedule ${count === 1 ? 'it' : 'them'}.` : '';
```

Returns checks `count` (count); if true chooses a text template that combines fixed text with computed values `count` (count), checks checks that `count` (count) and 1 have the same value and type; if true chooses "job is", otherwise "jobs are", checks checks that `count` (count) and 1 have the same value and type; if true chooses "it", otherwise "them", otherwise "" to the caller and exits this function.

### Line 21

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 22

```text

```

Blank line separates related statements and has no runtime effect.

### Line 23

```text
export function updatePlannedAlert(element, jobs, today = new Date()) {
```

Declares updatePlannedAlert(), which updates the visible overdue alert without duplicate screen-reader changes.

### Line 24

```text
  const message = plannedOverdueMessage(jobs, today);
```

Stores message, value; later code reuses this result so the planned-urgency.mjs workflow stays consistent.

### Line 25

```text
  // Avoid repeat screen-reader announcements on filter changes or timer ticks.
```

This comment documents the design intent here: Avoid repeat screen-reader announcements on filter changes or timer ticks..

### Line 26

```text
  if (element.textContent !== message) element.textContent = message;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 27

```text
  element.hidden = !message;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 28

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 29

```text

```

Blank line separates related statements and has no runtime effect.

### Line 30

```text
export function watchPlannedDayChange(refresh, doc = document, view = window) {
```

Declares watchPlannedDayChange(), which refreshes planned-job state when the local calendar day changes.

### Line 31

```text
  const dayKey = () => new Date().toDateString();
```

Stores dayKey, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the planned-urgency.mjs workflow stays consistent.

### Line 32

```text
  let previousDay = dayKey();
```

Creates mutable previousDay state for this workflow; it changes as the user selects, edits, or loads records.

### Line 33

```text
  const check = () => {
```

Stores check, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the planned-urgency.mjs workflow stays consistent.

### Line 34

```text
    const currentDay = dayKey();
```

Stores currentDay, value; later code reuses this result so the planned-urgency.mjs workflow stays consistent.

### Line 35

```text
    if (currentDay === previousDay) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 36

```text
    previousDay = currentDay;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 37

```text
    refresh();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 38

```text
  };
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 39

```text
  view.setInterval(check, 60_000);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 40

```text
  view.addEventListener('focus', check);
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 41

```text
  doc.addEventListener('visibilitychange', () => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 42

```text
    if (!doc.hidden) check();
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 43

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 44

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

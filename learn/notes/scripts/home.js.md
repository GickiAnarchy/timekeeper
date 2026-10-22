# scripts/home.js

[Exact copy](../../original/scripts/home.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import { store } from './models.js';
```

Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.

### Line 2

```text
import { selectDailyQuote } from './daily-quotes.mjs';
```

Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.

### Line 3

```text
import { plannedJobUrgency, updatePlannedAlert, watchPlannedDayChange } from './planned-urgency.mjs';
```

Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.

### Line 4

```text

```

Blank line separates related code sections for readability.

### Line 5

```text
const hourFormat = new Intl.NumberFormat(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
```

Constructs a new instance of `Intl.NumberFormat` with `undefined` (undefined); an object with fields minimumFractionDigits: 1; maximumFractionDigits: 1; stores the result in `hourFormat`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 6

```text
const timeFormat = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });
```

Constructs a new instance of `Intl.DateTimeFormat` with `undefined` (undefined); an object with fields hour: "numeric"; minute: "2-digit"; stores the result in `timeFormat`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 7

```text
const jobDateFormat = new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
```

Constructs a new instance of `Intl.DateTimeFormat` with `undefined` (undefined); an object with fields weekday: "short"; month: "short"; day: "numeric"; stores the result in `jobDateFormat`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 8

```text

```

Blank line separates related code sections for readability.

### Line 9

```text
function makeElement(tag, className, text) {
```

Adds, removes, or selects CSS classes that control this element’s appearance/state.

### Line 10

```text
  const element = document.createElement(tag);
```

Creates a detached HTML element with tag `tag` (tag); it is not visible until inserted in the page; stores the result in `element`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 11

```text
  if (className) element.className = className;
```

Adds, removes, or selects CSS classes that control this element’s appearance/state.

### Line 12

```text
  if (text !== undefined) element.textContent = text;
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 13

```text
  return element;
```

Returns `element` (element) to the caller and exits this function.

### Line 14

```text
}
```

Closes function makeElement. Control continues after this block.

### Line 15

```text

```

Blank line separates related code sections for readability.

### Line 16

```text
function validDate(value) {
```

Defines `validDate` (valid date), a reusable function taking value. Its body runs when called, not when declared.

### Line 17

```text
  if (!value) return null;
```

Returns null to the caller and exits this function.

### Line 18

```text
  const date = value instanceof Date ? value : new Date(value);
```

Checks checks whether `value` (value) was made with the `Date` (date) constructor; if true chooses `value` (value), otherwise constructs a new instance of `Date` with `value` (value); stores the result in `date`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 19

```text
  return Number.isNaN(date.getTime()) ? null : date;
```

Returns checks checks whether gets `date` (date) as milliseconds since 1970-01-01 UTC is the special invalid-number value NaN; if true chooses null, otherwise `date` (date) to the caller and exits this function.

### Line 20

```text
}
```

Closes function validDate. Control continues after this block.

### Line 21

```text

```

Blank line separates related code sections for readability.

### Line 22

```text
function shiftHoursInRange(shift, rangeStart, rangeEnd, now) {
```

Defines `shiftHoursInRange` (shift hours in range), a reusable function taking shift, rangeStart, rangeEnd, now. Its body runs when called, not when declared.

### Line 23

```text
  const start = validDate(shift.clockInTime);
```

Calls `validDate` with `shift.clockInTime` (the clock in time property of shift); stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 24

```text
  if (!start) return 0;
```

Returns 0 to the caller and exits this function.

### Line 25

```text
  const end = validDate(shift.clockOutTime) || now;
```

Uses calls `validDate` with `shift.clockOutTime` (the clock out time property of shift) when it is truthy, otherwise falls back to `now` (now); stores the result in `end`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 26

```text
  const activeStart = Math.max(start.getTime(), rangeStart.getTime());
```

Chooses the largest of gets `start` (start) as milliseconds since 1970-01-01 UTC, gets `rangeStart` (range start) as milliseconds since 1970-01-01 UTC; stores the result in `activeStart`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 27

```text
  const activeEnd = Math.min(end.getTime(), rangeEnd.getTime());
```

Chooses the smallest of gets `end` (end) as milliseconds since 1970-01-01 UTC, gets `rangeEnd` (range end) as milliseconds since 1970-01-01 UTC; stores the result in `activeEnd`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 28

```text
  if (activeEnd <= activeStart) return 0;
```

Returns 0 to the caller and exits this function.

### Line 29

```text

```

Blank line separates related code sections for readability.

### Line 30

```text
  let workedMs = activeEnd - activeStart;
```

Subtracts `activeStart` (active start) from `activeEnd` (active end); stores the result in `workedMs`. let allows the binding to be reassigned.

### Line 31

```text
  for (const pause of shift.breaks || []) {
```

Iterates through the matching controls or records so each one receives the same UI/data treatment.

### Line 32

```text
    const breakStart = validDate(pause.start);
```

Calls `validDate` with `pause.start` (the start property of pause); stores the result in `breakStart`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 33

```text
    if (!breakStart) continue;
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 34

```text
    const breakEnd = validDate(pause.end) || now;
```

Uses calls `validDate` with `pause.end` (the end property of pause) when it is truthy, otherwise falls back to `now` (now); stores the result in `breakEnd`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 35

```text
    const overlapStart = Math.max(activeStart, breakStart.getTime());
```

Chooses the largest of `activeStart` (active start), gets `breakStart` (break start) as milliseconds since 1970-01-01 UTC; stores the result in `overlapStart`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 36

```text
    const overlapEnd = Math.min(activeEnd, breakEnd.getTime());
```

Chooses the smallest of `activeEnd` (active end), gets `breakEnd` (break end) as milliseconds since 1970-01-01 UTC; stores the result in `overlapEnd`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 37

```text
    if (overlapEnd > overlapStart) workedMs -= overlapEnd - overlapStart;
```

Accumulates elapsed milliseconds, subtracting break intervals so only working time is counted.

### Line 38

```text
  }
```

Closes loop. Control continues after this block.

### Line 39

```text
  return Math.max(0, workedMs);
```

Returns chooses the largest of 0, `workedMs` (worked ms) to the caller and exits this function.

### Line 40

```text
}
```

Closes function shiftHoursInRange. Control continues after this block.

### Line 41

```text

```

Blank line separates related code sections for readability.

### Line 42

```text
function hoursLabel(milliseconds) {
```

Defines `hoursLabel` (hours label), a reusable function taking milliseconds. Its body runs when called, not when declared.

### Line 43

```text
  return `${hourFormat.format(milliseconds / 3_600_000)} h`;
```

Returns a text template that combines fixed text with computed values calls `hourFormat.format` with divides `milliseconds` (milliseconds) by 3600000 to the caller and exits this function.

### Line 44

```text
}
```

Closes function hoursLabel. Control continues after this block.

### Line 45

```text

```

Blank line separates related code sections for readability.

### Line 46

```text
function elapsedLabel(milliseconds) {
```

Defines `elapsedLabel` (elapsed label), a reusable function taking milliseconds. Its body runs when called, not when declared.

### Line 47

```text
  const totalMinutes = Math.max(0, Math.floor(milliseconds / 60_000));
```

Chooses the largest of 0, rounds divides `milliseconds` (milliseconds) by 60000 down to the next whole number; stores the result in `totalMinutes`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 48

```text
  const hours = Math.floor(totalMinutes / 60);
```

Rounds divides `totalMinutes` (total minutes) by 60 down to the next whole number; stores the result in `hours`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 49

```text
  const minutes = totalMinutes % 60;
```

Takes the remainder of `totalMinutes` (total minutes) divided by 60; stores the result in `minutes`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 50

```text
  if (hours === 0) return `${minutes}m elapsed`;
```

Returns a text template that combines fixed text with computed values `minutes` (minutes) to the caller and exits this function.

### Line 51

```text
  return minutes ? `${hours}h ${minutes}m elapsed` : `${hours}h elapsed`;
```

Returns checks `minutes` (minutes); if true chooses a text template that combines fixed text with computed values `hours` (hours), `minutes` (minutes), otherwise a text template that combines fixed text with computed values `hours` (hours) to the caller and exits this function.

### Line 52

```text
}
```

Closes function elapsedLabel. Control continues after this block.

### Line 53

```text

```

Blank line separates related code sections for readability.

### Line 54

```text
function isActive(shift) {
```

Defines `isActive` (is active), a reusable function taking shift. Its body runs when called, not when declared.

### Line 55

```text
  return Boolean(validDate(shift.clockInTime) && !validDate(shift.clockOutTime));
```

Returns converts uses negates the truthiness of calls `validDate` with `shift.clockOutTime` (the clock out time property of shift) only if calls `validDate` with `shift.clockInTime` (the clock in time property of shift) is truthy; otherwise keeps the falsy first value to true or false according to truthiness to the caller and exits this function.

### Line 56

```text
}
```

Closes function isActive. Control continues after this block.

### Line 57

```text

```

Blank line separates related code sections for readability.

### Line 58

```text
function makeLink(text, href) {
```

Defines `makeLink` (make link), a reusable function taking text, href. Its body runs when called, not when declared.

### Line 59

```text
  const link = makeElement('a', 'empty-state-link', text);
```

Calls `makeElement` with "a"; "empty-state-link"; `text` (text); stores the result in `link`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 60

```text
  link.href = href;
```

Assigns the result of href to link.href, updating this control or record for the next step.

### Line 61

```text
  link.target = 'main-content';
```

Assigns the result of 'main-content' to link.target, updating this control or record for the next step.

### Line 62

```text
  return link;
```

Returns `link` (link) to the caller and exits this function.

### Line 63

```text
}
```

Closes function makeLink. Control continues after this block.

### Line 64

```text

```

Blank line separates related code sections for readability.

### Line 65

```text
document.addEventListener('DOMContentLoaded', async () => {
```

Waits until the page’s HTML exists before querying elements and wiring its controls.

### Line 66

```text
  const todayHours = document.getElementById('today-hours');
```

Finds the page element whose unique ID is "today-hours", or null if absent; stores the result in `todayHours`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 67

```text
  const todayHoursNote = document.getElementById('today-hours-note');
```

Finds the page element whose unique ID is "today-hours-note", or null if absent; stores the result in `todayHoursNote`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 68

```text
  const weekHours = document.getElementById('week-hours');
```

Finds the page element whose unique ID is "week-hours", or null if absent; stores the result in `weekHours`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 69

```text
  const activeCount = document.getElementById('active-count');
```

Finds the page element whose unique ID is "active-count", or null if absent; stores the result in `activeCount`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 70

```text
  const activeCountNote = document.getElementById('active-count-note');
```

Finds the page element whose unique ID is "active-count-note", or null if absent; stores the result in `activeCountNote`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 71

```text
  const activeList = document.getElementById('active-shift-list');
```

Finds the page element whose unique ID is "active-shift-list", or null if absent; stores the result in `activeList`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 72

```text
  const upcomingList = document.getElementById('upcoming-job-list');
```

Finds the page element whose unique ID is "upcoming-job-list", or null if absent; stores the result in `upcomingList`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 73

```text
  function renderDailyQuote() {
```

Defines `renderDailyQuote` (render daily quote), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 74

```text
    const dailyQuote = selectDailyQuote(new Date());
```

Calls `selectDailyQuote` with constructs a new instance of `Date` with no arguments; stores the result in `dailyQuote`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 75

```text
    document.getElementById('daily-quote-text').textContent = dailyQuote.text;
```

Gets the named HTML control so JavaScript can read it, update it, or attach behavior.

### Line 76

```text
    document.getElementById('daily-quote-author').textContent = dailyQuote.author;
```

Gets the named HTML control so JavaScript can read it, update it, or attach behavior.

### Line 77

```text
    const quoteSource = document.getElementById('daily-quote-source');
```

Finds the page element whose unique ID is "daily-quote-source", or null if absent; stores the result in `quoteSource`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 78

```text
    quoteSource.textContent = dailyQuote.work;
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 79

```text
    quoteSource.href = dailyQuote.source;
```

Assigns the result of dailyQuote.source to quoteSource.href, updating this control or record for the next step.

### Line 80

```text
  }
```

Closes function renderDailyQuote. Control continues after this block.

### Line 81

```text
  renderDailyQuote();
```

Calls `renderDailyQuote` with no arguments.

### Line 82

```text
  window.setInterval(renderDailyQuote, 60_000);
```

Uses 60,000 milliseconds per minute for elapsed-time or refresh calculations.

### Line 83

```text

```

Blank line separates related code sections for readability.

### Line 84

```text
  function renderOverview() {
```

Defines `renderOverview` (render overview), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 85

```text
    const now = new Date();
```

Stores the current time used for live elapsed durations.

### Line 86

```text
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
```

Stores midnight at the start of today.

### Line 87

```text
    const weekStart = new Date(todayStart);
```

Stores the Monday boundary used for the weekly total.

### Line 88

```text
    weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
```

Calls `weekStart.setDate` with subtracts takes the remainder of adds calls `weekStart.getDay` with no arguments and 6 (or joins them if a value is text) divided by 7 from calls `weekStart.getDate` with no arguments.

### Line 89

```text

```

Blank line separates related code sections for readability.

### Line 90

```text
    const todayTotal = store.shifts.reduce((total, shift) =>
```

Combines the items of `store.shifts` (the shifts property of store) with a callback taking total, shift that adds `total` (total) and calls `shiftHoursInRange` with `shift` (shift); `todayStart` (today start); `now` (now); `now` (now) (or joins them if a value is text), starting with 0; stores the result in `todayTotal`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 91

```text
      total + shiftHoursInRange(shift, todayStart, now, now), 0);
```

Continues the arguments for shiftHoursInRange. Each comma separates one argument that the function receives in this order.

### Line 92

```text
    const weekTotal = store.shifts.reduce((total, shift) =>
```

Combines the items of `store.shifts` (the shifts property of store) with a callback taking total, shift that adds `total` (total) and calls `shiftHoursInRange` with `shift` (shift); `weekStart` (week start); `now` (now); `now` (now) (or joins them if a value is text), starting with 0; stores the result in `weekTotal`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 93

```text
      total + shiftHoursInRange(shift, weekStart, now, now), 0);
```

Continues the arguments for shiftHoursInRange. Each comma separates one argument that the function receives in this order.

### Line 94

```text
    const running = store.shifts.filter(isActive).sort((a, b) =>
```

Sorts keeps only items of `store.shifts` (the shifts property of store) for which `isActive` (is active) returns truthy in place using comparison a callback taking a, b that subtracts uses `validDate(b.clockInTime)?.getTime()`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to 0 from uses `validDate(a.clockInTime)?.getTime()`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to 0; stores the result in `running`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 95

```text
      (validDate(a.clockInTime)?.getTime() || 0) - (validDate(b.clockInTime)?.getTime() || 0));
```

Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.

### Line 96

```text

```

Blank line separates related code sections for readability.

### Line 97

```text
    todayHours.textContent = hoursLabel(todayTotal);
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 98

```text
    weekHours.textContent = hoursLabel(weekTotal);
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 99

```text
    todayHoursNote.textContent = running.length
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 100

```text
      ? 'Includes live time on active shifts'
```

Starts the true-result side of a ternary expression: when the preceding condition is truthy, this is the value chosen.

### Line 101

```text
      : 'Recorded work time for today';
```

Supplies the false-result side of a ternary expression: when the preceding condition is falsy, this fallback value is chosen.

### Line 102

```text
    activeCount.textContent = String(running.length);
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 103

```text
    activeCountNote.textContent = running.length === 1 ? 'One shift is in progress' : 'Crew currently clocked in';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 104

```text

```

Blank line separates related code sections for readability.

### Line 105

```text
    activeList.replaceChildren();
```

Clears stale rendered children before drawing the current data set.

### Line 106

```text
    if (running.length === 0) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 107

```text
      activeList.appendChild(makeElement('li', 'dashboard-empty', 'No active shifts right now.'));
```

Places the newly built child elements into the document so the user can see them.

### Line 108

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 109

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 110

```text

```

Blank line separates related code sections for readability.

### Line 111

```text
    running.forEach(shift => {
```

Defines an inline callback that handles each item or event in the surrounding operation.

### Line 112

```text
      const started = validDate(shift.clockInTime);
```

Calls `validDate` with `shift.clockInTime` (the clock in time property of shift); stores the result in `started`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 113

```text
      const isOnBreak = Boolean((shift.breaks || []).some(pause => pause.start && !pause.end));
```

Converts checks whether any item of uses `shift.breaks` (the breaks property of shift) when it is truthy, otherwise falls back to an array containing  passes a callback taking pause that uses negates the truthiness of `pause.end` only if `pause.start` (the start property of pause) is truthy; otherwise keeps the falsy first value to true or false according to truthiness; stores the result in `isOnBreak`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 114

```text
      const item = makeElement('li', 'active-shift-item');
```

Calls `makeElement` with "li"; "active-shift-item"; stores the result in `item`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 115

```text
      const copy = makeElement('div', 'shift-copy');
```

Calls `makeElement` with "div"; "shift-copy"; stores the result in `copy`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 116

```text
      copy.append(
```

Places the newly built child elements into the document so the user can see them.

### Line 117

```text
        makeElement('strong', 'shift-title', `${shift.employee?.name || 'Unknown employee'} · ${shift.customer?.name || 'Unknown job site'}`),
```

Supplies this argument/value (makeElement('strong', 'shift-title', `${shift.employee?.name || 'Unknown employee'} · ${shift.customer?.name || 'Unknown job site'}`)) to the surrounding constructor or DOM call.

### Line 118

```text
        makeElement('small', 'shift-meta', `Started ${timeFormat.format(started)} · ${elapsedLabel(now.getTime() - started.getTime())}`)
```

Calls `makeElement` with "small"; "shift-meta"; a text template that combines fixed text with computed values calls `timeFormat.format` with `started` (started), calls `elapsedLabel` with subtracts gets `started` (started) as milliseconds since 1970-01-01 UTC from gets `now` (now) as milliseconds since 1970-01-01 UTC.

### Line 119

```text
      );
```

Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.

### Line 120

```text
      const status = makeElement('span', `shift-status${isOnBreak ? ' is-on-break' : ''}`, isOnBreak ? 'On break' : 'Working');
```

Calls `makeElement` with "span"; a text template that combines fixed text with computed values checks `isOnBreak` (is on break); if true chooses " is-on-break", otherwise ""; checks `isOnBreak` (is on break); if true chooses "On break", otherwise "Working"; stores the result in `status`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 121

```text
      item.append(copy, status);
```

Places the newly built child elements into the document so the user can see them.

### Line 122

```text
      activeList.appendChild(item);
```

Places the newly built child elements into the document so the user can see them.

### Line 123

```text
    });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 124

```text
  }
```

Closes function renderOverview. Control continues after this block.

### Line 125

```text

```

Blank line separates related code sections for readability.

### Line 126

```text
  function renderPlannedJobs() {
```

Defines `renderPlannedJobs` (render planned jobs), a reusable function taking no arguments. Its body runs when called, not when declared.

### Line 127

```text
    upcomingList.replaceChildren();
```

Clears stale rendered children before drawing the current data set.

### Line 128

```text
    updatePlannedAlert(document.getElementById('planned-overdue-alert'), store.plannedJobs);
```

Sends the edited record fields to the store so the saved data matches the form.

### Line 129

```text
    const jobs = store.plannedJobs
```

Copies a portion of sorts keeps only items of `store.plannedJobs` (the planned jobs property of store) for which a callback taking job that negates the truthiness of `job.isComplete` returns truthy in place using comparison a callback taking a, b that runs its enclosed statements, from 0 up to but excluding 3; stores the result in `jobs`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 130

```text
      .filter(job => !job.isComplete)
```

Keeps only records matching the condition, such as open shifts, selected people, or unfinished jobs.

### Line 131

```text
      .sort((a, b) => {
```

Orders records for predictable display, usually by completion status, date, or most-recent shift.

### Line 132

```text
        const dateA = validDate(a.scheduledDate)?.getTime() ?? null;
```

Uses gets calls `validDate` with `a.scheduledDate` (the scheduled date property of a) as milliseconds since 1970-01-01 UTC; optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to null; stores the result in `dateA`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 133

```text
        const dateB = validDate(b.scheduledDate)?.getTime() ?? null;
```

Uses gets calls `validDate` with `b.scheduledDate` (the scheduled date property of b) as milliseconds since 1970-01-01 UTC; optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to null; stores the result in `dateB`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 134

```text
        if (dateA === null && dateB !== null) return 1;
```

Returns 1 to the caller and exits this function.

### Line 135

```text
        if (dateA !== null && dateB === null) return -1;
```

Returns changes the numeric sign of 1 to the caller and exits this function.

### Line 136

```text
        return (dateA ?? 0) - (dateB ?? 0);
```

Returns subtracts uses `dateB` (date b) unless it is null or undefined, then falls back to 0 from uses `dateA` (date a) unless it is null or undefined, then falls back to 0 to the caller and exits this function.

### Line 137

```text
      })
```

Closes callback function and function call. The closing parenthesis completes the argument list/expression. Control continues after this block.

### Line 138

```text
      .slice(0, 3);
```

Continues the chained operation .slice(0, 3), applying this transformation to the current UI/data value.

### Line 139

```text

```

Blank line separates related code sections for readability.

### Line 140

```text
    if (jobs.length === 0) {
```

Checks this condition so the UI takes the safe/appropriate branch for the current app state.

### Line 141

```text
      const empty = makeElement('li', 'dashboard-empty', 'No planned jobs yet.');
```

Calls `makeElement` with "li"; "dashboard-empty"; "No planned jobs yet."; stores the result in `empty`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 142

```text
      empty.appendChild(makeLink('Add the first job', 'planned.html'));
```

Places the newly built child elements into the document so the user can see them.

### Line 143

```text
      upcomingList.appendChild(empty);
```

Places the newly built child elements into the document so the user can see them.

### Line 144

```text
      return;
```

Returns no value to the caller and exits this function.

### Line 145

```text
    }
```

Closes conditional branch. Control continues after this block.

### Line 146

```text

```

Blank line separates related code sections for readability.

### Line 147

```text
    jobs.forEach(job => {
```

Defines an inline callback that handles each item or event in the surrounding operation.

### Line 148

```text
      const date = validDate(job.scheduledDate);
```

Calls `validDate` with `job.scheduledDate` (the scheduled date property of job); stores the result in `date`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 149

```text
      const urgency = plannedJobUrgency(job);
```

Calls `plannedJobUrgency` with `job` (job); stores the result in `urgency`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 150

```text
      const item = makeElement('li', `planned-job-item urgency-${urgency.level}`);
```

Calls `makeElement` with "li"; a text template that combines fixed text with computed values `urgency.level` (the level property of urgency); stores the result in `item`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 151

```text
      const dateTile = makeElement('span', 'job-date-tile', date ? jobDateFormat.format(date) : 'Date TBD');
```

Calls `makeElement` with "span"; "job-date-tile"; checks `date` (date); if true chooses calls `jobDateFormat.format` with `date` (date), otherwise "Date TBD"; stores the result in `dateTile`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 152

```text
      const copy = makeElement('div', 'job-copy');
```

Calls `makeElement` with "div"; "job-copy"; stores the result in `copy`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 153

```text
      copy.append(
```

Places the newly built child elements into the document so the user can see them.

### Line 154

```text
        makeElement('strong', 'job-title', job.description || 'Scheduled job'),
```

Supplies this argument/value (makeElement('strong', 'job-title', job.description || 'Scheduled job')) to the surrounding constructor or DOM call.

### Line 155

```text
        makeElement('small', 'job-meta', job.customer?.name || 'Customer not available')
```

Calls `makeElement` with "small"; "job-meta"; uses `job.customer?.name` (the name property of job.customer); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "Customer not available".

### Line 156

```text
      );
```

Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.

### Line 157

```text
      item.append(dateTile, copy, makeElement('span', 'job-timing urgency-label', urgency.label));
```

Places the newly built child elements into the document so the user can see them.

### Line 158

```text
      upcomingList.appendChild(item);
```

Places the newly built child elements into the document so the user can see them.

### Line 159

```text
    });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 160

```text
  }
```

Closes function renderPlannedJobs. Control continues after this block.

### Line 161

```text

```

Blank line separates related code sections for readability.

### Line 162

```text
  try {
```

Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.

### Line 163

```text
    await store.loadEmployees();
```

Loads this collection from persistent storage before rendering the page.

### Line 164

```text
    await store.loadCustomers();
```

Loads this collection from persistent storage before rendering the page.

### Line 165

```text
    await store.loadShifts();
```

Loads this collection from persistent storage before rendering the page.

### Line 166

```text
    await store.loadPlanned();
```

Loads this collection from persistent storage before rendering the page.

### Line 167

```text
    renderOverview();
```

Calls `renderOverview` with no arguments.

### Line 168

```text
    renderPlannedJobs();
```

Calls `renderPlannedJobs` with no arguments.

### Line 169

```text
    window.setInterval(renderOverview, 60_000);
```

Uses 60,000 milliseconds per minute for elapsed-time or refresh calculations.

### Line 170

```text
    watchPlannedDayChange(renderPlannedJobs);
```

Calls `watchPlannedDayChange` with `renderPlannedJobs` (render planned jobs).

### Line 171

```text
  } catch (error) {
```

Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.

### Line 172

```text
    console.error('Unable to load the Timekeeper dashboard.', error);
```

Calls `console.error` with "Unable to load the Timekeeper dashboard."; `error` (error).

### Line 173

```text
    todayHours.textContent = '—';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 174

```text
    weekHours.textContent = '—';
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 175

```text
    activeList.replaceChildren(makeElement('li', 'dashboard-empty', 'Could not load shift data. Try refreshing the page.'));
```

Clears stale rendered children before drawing the current data set.

### Line 176

```text
    upcomingList.replaceChildren(makeElement('li', 'dashboard-empty', 'Could not load planned jobs. Try refreshing the page.'));
```

Clears stale rendered children before drawing the current data set.

### Line 177

```text
  }
```

Closes error handler and try/catch error-handling construct. Control continues after this block.

### Line 178

```text
});
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

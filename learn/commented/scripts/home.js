// Original L1: Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.
import { store } from './models.js';
// Original L2: Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.
import { selectDailyQuote } from './daily-quotes.mjs';
// Original L3: Imports the named helper(s) so this page can reuse the app’s data model and domain behavior.
import { plannedJobUrgency, updatePlannedAlert, watchPlannedDayChange } from './planned-urgency.mjs';
// Original L4: Blank line separates related code sections for readability.

// Original L5: Constructs a new instance of `Intl.NumberFormat` with `undefined` (undefined); an object with fields minimumFractionDigits: 1; maximumFractionDigits: 1; stores the result in `hourFormat`. const prevents reassignment of this binding, not mutation inside its object/array.
const hourFormat = new Intl.NumberFormat(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
// Original L6: Constructs a new instance of `Intl.DateTimeFormat` with `undefined` (undefined); an object with fields hour: "numeric"; minute: "2-digit"; stores the result in `timeFormat`. const prevents reassignment of this binding, not mutation inside its object/array.
const timeFormat = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });
// Original L7: Constructs a new instance of `Intl.DateTimeFormat` with `undefined` (undefined); an object with fields weekday: "short"; month: "short"; day: "numeric"; stores the result in `jobDateFormat`. const prevents reassignment of this binding, not mutation inside its object/array.
const jobDateFormat = new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
// Original L8: Blank line separates related code sections for readability.

// Original L9: Adds, removes, or selects CSS classes that control this element’s appearance/state.
function makeElement(tag, className, text) {
// Original L10: Creates a detached HTML element with tag `tag` (tag); it is not visible until inserted in the page; stores the result in `element`. const prevents reassignment of this binding, not mutation inside its object/array.
  const element = document.createElement(tag);
// Original L11: Adds, removes, or selects CSS classes that control this element’s appearance/state.
  if (className) element.className = className;
// Original L12: Writes user-visible text into the element; textContent avoids treating data as HTML.
  if (text !== undefined) element.textContent = text;
// Original L13: Returns `element` (element) to the caller and exits this function.
  return element;
// Original L14: Closes function makeElement. Control continues after this block.
}
// Original L15: Blank line separates related code sections for readability.

// Original L16: Defines `validDate` (valid date), a reusable function taking value. Its body runs when called, not when declared.
function validDate(value) {
// Original L17: Returns null to the caller and exits this function.
  if (!value) return null;
// Original L18: Checks checks whether `value` (value) was made with the `Date` (date) constructor; if true chooses `value` (value), otherwise constructs a new instance of `Date` with `value` (value); stores the result in `date`. const prevents reassignment of this binding, not mutation inside its object/array.
  const date = value instanceof Date ? value : new Date(value);
// Original L19: Returns checks checks whether gets `date` (date) as milliseconds since 1970-01-01 UTC is the special invalid-number value NaN; if true chooses null, otherwise `date` (date) to the caller and exits this function.
  return Number.isNaN(date.getTime()) ? null : date;
// Original L20: Closes function validDate. Control continues after this block.
}
// Original L21: Blank line separates related code sections for readability.

// Original L22: Defines `shiftHoursInRange` (shift hours in range), a reusable function taking shift, rangeStart, rangeEnd, now. Its body runs when called, not when declared.
function shiftHoursInRange(shift, rangeStart, rangeEnd, now) {
// Original L23: Calls `validDate` with `shift.clockInTime` (the clock in time property of shift); stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.
  const start = validDate(shift.clockInTime);
// Original L24: Returns 0 to the caller and exits this function.
  if (!start) return 0;
// Original L25: Uses calls `validDate` with `shift.clockOutTime` (the clock out time property of shift) when it is truthy, otherwise falls back to `now` (now); stores the result in `end`. const prevents reassignment of this binding, not mutation inside its object/array.
  const end = validDate(shift.clockOutTime) || now;
// Original L26: Chooses the largest of gets `start` (start) as milliseconds since 1970-01-01 UTC, gets `rangeStart` (range start) as milliseconds since 1970-01-01 UTC; stores the result in `activeStart`. const prevents reassignment of this binding, not mutation inside its object/array.
  const activeStart = Math.max(start.getTime(), rangeStart.getTime());
// Original L27: Chooses the smallest of gets `end` (end) as milliseconds since 1970-01-01 UTC, gets `rangeEnd` (range end) as milliseconds since 1970-01-01 UTC; stores the result in `activeEnd`. const prevents reassignment of this binding, not mutation inside its object/array.
  const activeEnd = Math.min(end.getTime(), rangeEnd.getTime());
// Original L28: Returns 0 to the caller and exits this function.
  if (activeEnd <= activeStart) return 0;
// Original L29: Blank line separates related code sections for readability.

// Original L30: Subtracts `activeStart` (active start) from `activeEnd` (active end); stores the result in `workedMs`. let allows the binding to be reassigned.
  let workedMs = activeEnd - activeStart;
// Original L31: Iterates through the matching controls or records so each one receives the same UI/data treatment.
  for (const pause of shift.breaks || []) {
// Original L32: Calls `validDate` with `pause.start` (the start property of pause); stores the result in `breakStart`. const prevents reassignment of this binding, not mutation inside its object/array.
    const breakStart = validDate(pause.start);
// Original L33: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (!breakStart) continue;
// Original L34: Uses calls `validDate` with `pause.end` (the end property of pause) when it is truthy, otherwise falls back to `now` (now); stores the result in `breakEnd`. const prevents reassignment of this binding, not mutation inside its object/array.
    const breakEnd = validDate(pause.end) || now;
// Original L35: Chooses the largest of `activeStart` (active start), gets `breakStart` (break start) as milliseconds since 1970-01-01 UTC; stores the result in `overlapStart`. const prevents reassignment of this binding, not mutation inside its object/array.
    const overlapStart = Math.max(activeStart, breakStart.getTime());
// Original L36: Chooses the smallest of `activeEnd` (active end), gets `breakEnd` (break end) as milliseconds since 1970-01-01 UTC; stores the result in `overlapEnd`. const prevents reassignment of this binding, not mutation inside its object/array.
    const overlapEnd = Math.min(activeEnd, breakEnd.getTime());
// Original L37: Accumulates elapsed milliseconds, subtracting break intervals so only working time is counted.
    if (overlapEnd > overlapStart) workedMs -= overlapEnd - overlapStart;
// Original L38: Closes loop. Control continues after this block.
  }
// Original L39: Returns chooses the largest of 0, `workedMs` (worked ms) to the caller and exits this function.
  return Math.max(0, workedMs);
// Original L40: Closes function shiftHoursInRange. Control continues after this block.
}
// Original L41: Blank line separates related code sections for readability.

// Original L42: Defines `hoursLabel` (hours label), a reusable function taking milliseconds. Its body runs when called, not when declared.
function hoursLabel(milliseconds) {
// Original L43: Returns a text template that combines fixed text with computed values calls `hourFormat.format` with divides `milliseconds` (milliseconds) by 3600000 to the caller and exits this function.
  return `${hourFormat.format(milliseconds / 3_600_000)} h`;
// Original L44: Closes function hoursLabel. Control continues after this block.
}
// Original L45: Blank line separates related code sections for readability.

// Original L46: Defines `elapsedLabel` (elapsed label), a reusable function taking milliseconds. Its body runs when called, not when declared.
function elapsedLabel(milliseconds) {
// Original L47: Chooses the largest of 0, rounds divides `milliseconds` (milliseconds) by 60000 down to the next whole number; stores the result in `totalMinutes`. const prevents reassignment of this binding, not mutation inside its object/array.
  const totalMinutes = Math.max(0, Math.floor(milliseconds / 60_000));
// Original L48: Rounds divides `totalMinutes` (total minutes) by 60 down to the next whole number; stores the result in `hours`. const prevents reassignment of this binding, not mutation inside its object/array.
  const hours = Math.floor(totalMinutes / 60);
// Original L49: Takes the remainder of `totalMinutes` (total minutes) divided by 60; stores the result in `minutes`. const prevents reassignment of this binding, not mutation inside its object/array.
  const minutes = totalMinutes % 60;
// Original L50: Returns a text template that combines fixed text with computed values `minutes` (minutes) to the caller and exits this function.
  if (hours === 0) return `${minutes}m elapsed`;
// Original L51: Returns checks `minutes` (minutes); if true chooses a text template that combines fixed text with computed values `hours` (hours), `minutes` (minutes), otherwise a text template that combines fixed text with computed values `hours` (hours) to the caller and exits this function.
  return minutes ? `${hours}h ${minutes}m elapsed` : `${hours}h elapsed`;
// Original L52: Closes function elapsedLabel. Control continues after this block.
}
// Original L53: Blank line separates related code sections for readability.

// Original L54: Defines `isActive` (is active), a reusable function taking shift. Its body runs when called, not when declared.
function isActive(shift) {
// Original L55: Returns converts uses negates the truthiness of calls `validDate` with `shift.clockOutTime` (the clock out time property of shift) only if calls `validDate` with `shift.clockInTime` (the clock in time property of shift) is truthy; otherwise keeps the falsy first value to true or false according to truthiness to the caller and exits this function.
  return Boolean(validDate(shift.clockInTime) && !validDate(shift.clockOutTime));
// Original L56: Closes function isActive. Control continues after this block.
}
// Original L57: Blank line separates related code sections for readability.

// Original L58: Defines `makeLink` (make link), a reusable function taking text, href. Its body runs when called, not when declared.
function makeLink(text, href) {
// Original L59: Calls `makeElement` with "a"; "empty-state-link"; `text` (text); stores the result in `link`. const prevents reassignment of this binding, not mutation inside its object/array.
  const link = makeElement('a', 'empty-state-link', text);
// Original L60: Assigns the result of href to link.href, updating this control or record for the next step.
  link.href = href;
// Original L61: Assigns the result of 'main-content' to link.target, updating this control or record for the next step.
  link.target = 'main-content';
// Original L62: Returns `link` (link) to the caller and exits this function.
  return link;
// Original L63: Closes function makeLink. Control continues after this block.
}
// Original L64: Blank line separates related code sections for readability.

// Original L65: Waits until the page’s HTML exists before querying elements and wiring its controls.
document.addEventListener('DOMContentLoaded', async () => {
// Original L66: Finds the page element whose unique ID is "today-hours", or null if absent; stores the result in `todayHours`. const prevents reassignment of this binding, not mutation inside its object/array.
  const todayHours = document.getElementById('today-hours');
// Original L67: Finds the page element whose unique ID is "today-hours-note", or null if absent; stores the result in `todayHoursNote`. const prevents reassignment of this binding, not mutation inside its object/array.
  const todayHoursNote = document.getElementById('today-hours-note');
// Original L68: Finds the page element whose unique ID is "week-hours", or null if absent; stores the result in `weekHours`. const prevents reassignment of this binding, not mutation inside its object/array.
  const weekHours = document.getElementById('week-hours');
// Original L69: Finds the page element whose unique ID is "active-count", or null if absent; stores the result in `activeCount`. const prevents reassignment of this binding, not mutation inside its object/array.
  const activeCount = document.getElementById('active-count');
// Original L70: Finds the page element whose unique ID is "active-count-note", or null if absent; stores the result in `activeCountNote`. const prevents reassignment of this binding, not mutation inside its object/array.
  const activeCountNote = document.getElementById('active-count-note');
// Original L71: Finds the page element whose unique ID is "active-shift-list", or null if absent; stores the result in `activeList`. const prevents reassignment of this binding, not mutation inside its object/array.
  const activeList = document.getElementById('active-shift-list');
// Original L72: Finds the page element whose unique ID is "upcoming-job-list", or null if absent; stores the result in `upcomingList`. const prevents reassignment of this binding, not mutation inside its object/array.
  const upcomingList = document.getElementById('upcoming-job-list');
// Original L73: Defines `renderDailyQuote` (render daily quote), a reusable function taking no arguments. Its body runs when called, not when declared.
  function renderDailyQuote() {
// Original L74: Calls `selectDailyQuote` with constructs a new instance of `Date` with no arguments; stores the result in `dailyQuote`. const prevents reassignment of this binding, not mutation inside its object/array.
    const dailyQuote = selectDailyQuote(new Date());
// Original L75: Gets the named HTML control so JavaScript can read it, update it, or attach behavior.
    document.getElementById('daily-quote-text').textContent = dailyQuote.text;
// Original L76: Gets the named HTML control so JavaScript can read it, update it, or attach behavior.
    document.getElementById('daily-quote-author').textContent = dailyQuote.author;
// Original L77: Finds the page element whose unique ID is "daily-quote-source", or null if absent; stores the result in `quoteSource`. const prevents reassignment of this binding, not mutation inside its object/array.
    const quoteSource = document.getElementById('daily-quote-source');
// Original L78: Writes user-visible text into the element; textContent avoids treating data as HTML.
    quoteSource.textContent = dailyQuote.work;
// Original L79: Assigns the result of dailyQuote.source to quoteSource.href, updating this control or record for the next step.
    quoteSource.href = dailyQuote.source;
// Original L80: Closes function renderDailyQuote. Control continues after this block.
  }
// Original L81: Calls `renderDailyQuote` with no arguments.
  renderDailyQuote();
// Original L82: Uses 60,000 milliseconds per minute for elapsed-time or refresh calculations.
  window.setInterval(renderDailyQuote, 60_000);
// Original L83: Blank line separates related code sections for readability.

// Original L84: Defines `renderOverview` (render overview), a reusable function taking no arguments. Its body runs when called, not when declared.
  function renderOverview() {
// Original L85: Stores the current time used for live elapsed durations.
    const now = new Date();
// Original L86: Stores midnight at the start of today.
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// Original L87: Stores the Monday boundary used for the weekly total.
    const weekStart = new Date(todayStart);
// Original L88: Calls `weekStart.setDate` with subtracts takes the remainder of adds calls `weekStart.getDay` with no arguments and 6 (or joins them if a value is text) divided by 7 from calls `weekStart.getDate` with no arguments.
    weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
// Original L89: Blank line separates related code sections for readability.

// Original L90: Combines the items of `store.shifts` (the shifts property of store) with a callback taking total, shift that adds `total` (total) and calls `shiftHoursInRange` with `shift` (shift); `todayStart` (today start); `now` (now); `now` (now) (or joins them if a value is text), starting with 0; stores the result in `todayTotal`. const prevents reassignment of this binding, not mutation inside its object/array.
    const todayTotal = store.shifts.reduce((total, shift) =>
// Original L91: Continues the arguments for shiftHoursInRange. Each comma separates one argument that the function receives in this order.
      total + shiftHoursInRange(shift, todayStart, now, now), 0);
// Original L92: Combines the items of `store.shifts` (the shifts property of store) with a callback taking total, shift that adds `total` (total) and calls `shiftHoursInRange` with `shift` (shift); `weekStart` (week start); `now` (now); `now` (now) (or joins them if a value is text), starting with 0; stores the result in `weekTotal`. const prevents reassignment of this binding, not mutation inside its object/array.
    const weekTotal = store.shifts.reduce((total, shift) =>
// Original L93: Continues the arguments for shiftHoursInRange. Each comma separates one argument that the function receives in this order.
      total + shiftHoursInRange(shift, weekStart, now, now), 0);
// Original L94: Sorts keeps only items of `store.shifts` (the shifts property of store) for which `isActive` (is active) returns truthy in place using comparison a callback taking a, b that subtracts uses `validDate(b.clockInTime)?.getTime()`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to 0 from uses `validDate(a.clockInTime)?.getTime()`; optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to 0; stores the result in `running`. const prevents reassignment of this binding, not mutation inside its object/array.
    const running = store.shifts.filter(isActive).sort((a, b) =>
// Original L95: Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.
      (validDate(a.clockInTime)?.getTime() || 0) - (validDate(b.clockInTime)?.getTime() || 0));
// Original L96: Blank line separates related code sections for readability.

// Original L97: Writes user-visible text into the element; textContent avoids treating data as HTML.
    todayHours.textContent = hoursLabel(todayTotal);
// Original L98: Writes user-visible text into the element; textContent avoids treating data as HTML.
    weekHours.textContent = hoursLabel(weekTotal);
// Original L99: Writes user-visible text into the element; textContent avoids treating data as HTML.
    todayHoursNote.textContent = running.length
// Original L100: Starts the true-result side of a ternary expression: when the preceding condition is truthy, this is the value chosen.
      ? 'Includes live time on active shifts'
// Original L101: Supplies the false-result side of a ternary expression: when the preceding condition is falsy, this fallback value is chosen.
      : 'Recorded work time for today';
// Original L102: Writes user-visible text into the element; textContent avoids treating data as HTML.
    activeCount.textContent = String(running.length);
// Original L103: Writes user-visible text into the element; textContent avoids treating data as HTML.
    activeCountNote.textContent = running.length === 1 ? 'One shift is in progress' : 'Crew currently clocked in';
// Original L104: Blank line separates related code sections for readability.

// Original L105: Clears stale rendered children before drawing the current data set.
    activeList.replaceChildren();
// Original L106: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (running.length === 0) {
// Original L107: Places the newly built child elements into the document so the user can see them.
      activeList.appendChild(makeElement('li', 'dashboard-empty', 'No active shifts right now.'));
// Original L108: Returns no value to the caller and exits this function.
      return;
// Original L109: Closes conditional branch. Control continues after this block.
    }
// Original L110: Blank line separates related code sections for readability.

// Original L111: Defines an inline callback that handles each item or event in the surrounding operation.
    running.forEach(shift => {
// Original L112: Calls `validDate` with `shift.clockInTime` (the clock in time property of shift); stores the result in `started`. const prevents reassignment of this binding, not mutation inside its object/array.
      const started = validDate(shift.clockInTime);
// Original L113: Converts checks whether any item of uses `shift.breaks` (the breaks property of shift) when it is truthy, otherwise falls back to an array containing  passes a callback taking pause that uses negates the truthiness of `pause.end` only if `pause.start` (the start property of pause) is truthy; otherwise keeps the falsy first value to true or false according to truthiness; stores the result in `isOnBreak`. const prevents reassignment of this binding, not mutation inside its object/array.
      const isOnBreak = Boolean((shift.breaks || []).some(pause => pause.start && !pause.end));
// Original L114: Calls `makeElement` with "li"; "active-shift-item"; stores the result in `item`. const prevents reassignment of this binding, not mutation inside its object/array.
      const item = makeElement('li', 'active-shift-item');
// Original L115: Calls `makeElement` with "div"; "shift-copy"; stores the result in `copy`. const prevents reassignment of this binding, not mutation inside its object/array.
      const copy = makeElement('div', 'shift-copy');
// Original L116: Places the newly built child elements into the document so the user can see them.
      copy.append(
// Original L117: Supplies this argument/value (makeElement('strong', 'shift-title', `${shift.employee?.name || 'Unknown employee'} · ${shift.customer?.name || 'Unknown job site'}`)) to the surrounding constructor or DOM call.
        makeElement('strong', 'shift-title', `${shift.employee?.name || 'Unknown employee'} · ${shift.customer?.name || 'Unknown job site'}`),
// Original L118: Calls `makeElement` with "small"; "shift-meta"; a text template that combines fixed text with computed values calls `timeFormat.format` with `started` (started), calls `elapsedLabel` with subtracts gets `started` (started) as milliseconds since 1970-01-01 UTC from gets `now` (now) as milliseconds since 1970-01-01 UTC.
        makeElement('small', 'shift-meta', `Started ${timeFormat.format(started)} · ${elapsedLabel(now.getTime() - started.getTime())}`)
// Original L119: Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.
      );
// Original L120: Calls `makeElement` with "span"; a text template that combines fixed text with computed values checks `isOnBreak` (is on break); if true chooses " is-on-break", otherwise ""; checks `isOnBreak` (is on break); if true chooses "On break", otherwise "Working"; stores the result in `status`. const prevents reassignment of this binding, not mutation inside its object/array.
      const status = makeElement('span', `shift-status${isOnBreak ? ' is-on-break' : ''}`, isOnBreak ? 'On break' : 'Working');
// Original L121: Places the newly built child elements into the document so the user can see them.
      item.append(copy, status);
// Original L122: Places the newly built child elements into the document so the user can see them.
      activeList.appendChild(item);
// Original L123: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L124: Closes function renderOverview. Control continues after this block.
  }
// Original L125: Blank line separates related code sections for readability.

// Original L126: Defines `renderPlannedJobs` (render planned jobs), a reusable function taking no arguments. Its body runs when called, not when declared.
  function renderPlannedJobs() {
// Original L127: Clears stale rendered children before drawing the current data set.
    upcomingList.replaceChildren();
// Original L128: Sends the edited record fields to the store so the saved data matches the form.
    updatePlannedAlert(document.getElementById('planned-overdue-alert'), store.plannedJobs);
// Original L129: Copies a portion of sorts keeps only items of `store.plannedJobs` (the planned jobs property of store) for which a callback taking job that negates the truthiness of `job.isComplete` returns truthy in place using comparison a callback taking a, b that runs its enclosed statements, from 0 up to but excluding 3; stores the result in `jobs`. const prevents reassignment of this binding, not mutation inside its object/array.
    const jobs = store.plannedJobs
// Original L130: Keeps only records matching the condition, such as open shifts, selected people, or unfinished jobs.
      .filter(job => !job.isComplete)
// Original L131: Orders records for predictable display, usually by completion status, date, or most-recent shift.
      .sort((a, b) => {
// Original L132: Uses gets calls `validDate` with `a.scheduledDate` (the scheduled date property of a) as milliseconds since 1970-01-01 UTC; optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to null; stores the result in `dateA`. const prevents reassignment of this binding, not mutation inside its object/array.
        const dateA = validDate(a.scheduledDate)?.getTime() ?? null;
// Original L133: Uses gets calls `validDate` with `b.scheduledDate` (the scheduled date property of b) as milliseconds since 1970-01-01 UTC; optional chaining stops with undefined if a guarded receiver is null or undefined unless it is null or undefined, then falls back to null; stores the result in `dateB`. const prevents reassignment of this binding, not mutation inside its object/array.
        const dateB = validDate(b.scheduledDate)?.getTime() ?? null;
// Original L134: Returns 1 to the caller and exits this function.
        if (dateA === null && dateB !== null) return 1;
// Original L135: Returns changes the numeric sign of 1 to the caller and exits this function.
        if (dateA !== null && dateB === null) return -1;
// Original L136: Returns subtracts uses `dateB` (date b) unless it is null or undefined, then falls back to 0 from uses `dateA` (date a) unless it is null or undefined, then falls back to 0 to the caller and exits this function.
        return (dateA ?? 0) - (dateB ?? 0);
// Original L137: Closes callback function and function call. The closing parenthesis completes the argument list/expression. Control continues after this block.
      })
// Original L138: Continues the chained operation .slice(0, 3), applying this transformation to the current UI/data value.
      .slice(0, 3);
// Original L139: Blank line separates related code sections for readability.

// Original L140: Checks this condition so the UI takes the safe/appropriate branch for the current app state.
    if (jobs.length === 0) {
// Original L141: Calls `makeElement` with "li"; "dashboard-empty"; "No planned jobs yet."; stores the result in `empty`. const prevents reassignment of this binding, not mutation inside its object/array.
      const empty = makeElement('li', 'dashboard-empty', 'No planned jobs yet.');
// Original L142: Places the newly built child elements into the document so the user can see them.
      empty.appendChild(makeLink('Add the first job', 'planned.html'));
// Original L143: Places the newly built child elements into the document so the user can see them.
      upcomingList.appendChild(empty);
// Original L144: Returns no value to the caller and exits this function.
      return;
// Original L145: Closes conditional branch. Control continues after this block.
    }
// Original L146: Blank line separates related code sections for readability.

// Original L147: Defines an inline callback that handles each item or event in the surrounding operation.
    jobs.forEach(job => {
// Original L148: Calls `validDate` with `job.scheduledDate` (the scheduled date property of job); stores the result in `date`. const prevents reassignment of this binding, not mutation inside its object/array.
      const date = validDate(job.scheduledDate);
// Original L149: Calls `plannedJobUrgency` with `job` (job); stores the result in `urgency`. const prevents reassignment of this binding, not mutation inside its object/array.
      const urgency = plannedJobUrgency(job);
// Original L150: Calls `makeElement` with "li"; a text template that combines fixed text with computed values `urgency.level` (the level property of urgency); stores the result in `item`. const prevents reassignment of this binding, not mutation inside its object/array.
      const item = makeElement('li', `planned-job-item urgency-${urgency.level}`);
// Original L151: Calls `makeElement` with "span"; "job-date-tile"; checks `date` (date); if true chooses calls `jobDateFormat.format` with `date` (date), otherwise "Date TBD"; stores the result in `dateTile`. const prevents reassignment of this binding, not mutation inside its object/array.
      const dateTile = makeElement('span', 'job-date-tile', date ? jobDateFormat.format(date) : 'Date TBD');
// Original L152: Calls `makeElement` with "div"; "job-copy"; stores the result in `copy`. const prevents reassignment of this binding, not mutation inside its object/array.
      const copy = makeElement('div', 'job-copy');
// Original L153: Places the newly built child elements into the document so the user can see them.
      copy.append(
// Original L154: Supplies this argument/value (makeElement('strong', 'job-title', job.description || 'Scheduled job')) to the surrounding constructor or DOM call.
        makeElement('strong', 'job-title', job.description || 'Scheduled job'),
// Original L155: Calls `makeElement` with "small"; "job-meta"; uses `job.customer?.name` (the name property of job.customer); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "Customer not available".
        makeElement('small', 'job-meta', job.customer?.name || 'Customer not available')
// Original L156: Structural punctuation groups the callback arguments or collection used by the surrounding UI operation.
      );
// Original L157: Places the newly built child elements into the document so the user can see them.
      item.append(dateTile, copy, makeElement('span', 'job-timing urgency-label', urgency.label));
// Original L158: Places the newly built child elements into the document so the user can see them.
      upcomingList.appendChild(item);
// Original L159: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
    });
// Original L160: Closes function renderPlannedJobs. Control continues after this block.
  }
// Original L161: Blank line separates related code sections for readability.

// Original L162: Uses error handling around storage/network/UI work so failures produce recoverable feedback instead of breaking the page.
  try {
// Original L163: Loads this collection from persistent storage before rendering the page.
    await store.loadEmployees();
// Original L164: Loads this collection from persistent storage before rendering the page.
    await store.loadCustomers();
// Original L165: Loads this collection from persistent storage before rendering the page.
    await store.loadShifts();
// Original L166: Loads this collection from persistent storage before rendering the page.
    await store.loadPlanned();
// Original L167: Calls `renderOverview` with no arguments.
    renderOverview();
// Original L168: Calls `renderPlannedJobs` with no arguments.
    renderPlannedJobs();
// Original L169: Uses 60,000 milliseconds per minute for elapsed-time or refresh calculations.
    window.setInterval(renderOverview, 60_000);
// Original L170: Calls `watchPlannedDayChange` with `renderPlannedJobs` (render planned jobs).
    watchPlannedDayChange(renderPlannedJobs);
// Original L171: Ends the protected try block and begins the catch handler. If an awaited operation throws or rejects, the error is caught here instead of stopping the entire page.
  } catch (error) {
// Original L172: Calls `console.error` with "Unable to load the Timekeeper dashboard."; `error` (error).
    console.error('Unable to load the Timekeeper dashboard.', error);
// Original L173: Writes user-visible text into the element; textContent avoids treating data as HTML.
    todayHours.textContent = '—';
// Original L174: Writes user-visible text into the element; textContent avoids treating data as HTML.
    weekHours.textContent = '—';
// Original L175: Clears stale rendered children before drawing the current data set.
    activeList.replaceChildren(makeElement('li', 'dashboard-empty', 'Could not load shift data. Try refreshing the page.'));
// Original L176: Clears stale rendered children before drawing the current data set.
    upcomingList.replaceChildren(makeElement('li', 'dashboard-empty', 'Could not load planned jobs. Try refreshing the page.'));
// Original L177: Closes error handler and try/catch error-handling construct. Control continues after this block.
  }
// Original L178: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
});

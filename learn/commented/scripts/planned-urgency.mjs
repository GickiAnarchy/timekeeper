// Original L1: Imports asValidDate from ./domain.mjs; these helpers provide the domain calculations this module uses.
import { asValidDate } from './domain.mjs';
// Original L2: Blank line separates related statements and has no runtime effect.

// Original L3: This comment documents the design intent here: Compare local calendar days, not elapsed hours (which vary across DST)..
// Compare local calendar days, not elapsed hours (which vary across DST).
// Original L4: Declares plannedJobUrgency(), which assigns completion/overdue/due-soon status to a planned job.
export function plannedJobUrgency(job, today = new Date()) {
// Original L5: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (job.isComplete) return { level: 'complete', label: 'Completed', daysAway: null };
// Original L6: Stores date, a date value used for local-day or period calculations; later code reuses this result so the planned-urgency.mjs workflow stays consistent.
  const date = asValidDate(job.scheduledDate);
// Original L7: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!date) return { level: 'tbd', label: 'Date TBD', daysAway: null };
// Original L8: Stores now, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the planned-urgency.mjs workflow stays consistent.
  const now = asValidDate(today) || new Date();
// Original L9: Stores dayNumber, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the planned-urgency.mjs workflow stays consistent.
  const dayNumber = value => Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()) / 86_400_000;
// Original L10: Stores daysAway, a numeric value validated for payroll math; later code reuses this result so the planned-urgency.mjs workflow stays consistent.
  const daysAway = dayNumber(date) - dayNumber(now);
// Original L11: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (daysAway < 0) return { level: 'overdue', label: `Overdue by ${-daysAway} ${daysAway === -1 ? 'day' : 'days'}`, daysAway };
// Original L12: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (daysAway === 0) return { level: 'today', label: 'Due today', daysAway };
// Original L13: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (daysAway === 1) return { level: 'tomorrow', label: 'Due tomorrow', daysAway };
// Original L14: Stores level, value; later code reuses this result so the planned-urgency.mjs workflow stays consistent.
  const level = daysAway <= 3 ? 'soon' : daysAway <= 7 ? 'week' : 'upcoming';
// Original L15: Returns an object with fields level: `level` (level); label: a text template that combines fixed text with computed values `daysAway` (days away); daysAway: `daysAway` (days away) to the caller and exits this function.
  return { level, label: `Due in ${daysAway} days`, daysAway };
// Original L16: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L17: Blank line separates related statements and has no runtime effect.

// Original L18: Declares plannedOverdueMessage(), which summarizes how many planned jobs are overdue.
export function plannedOverdueMessage(jobs, today = new Date()) {
// Original L19: Stores count, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the planned-urgency.mjs workflow stays consistent.
  const count = jobs.filter(job => plannedJobUrgency(job, today).level === 'overdue').length;
// Original L20: Returns checks `count` (count); if true chooses a text template that combines fixed text with computed values `count` (count), checks checks that `count` (count) and 1 have the same value and type; if true chooses "job is", otherwise "jobs are", checks checks that `count` (count) and 1 have the same value and type; if true chooses "it", otherwise "them", otherwise "" to the caller and exits this function.
  return count ? `Action needed: ${count} planned ${count === 1 ? 'job is' : 'jobs are'} overdue. Review the schedule to complete or reschedule ${count === 1 ? 'it' : 'them'}.` : '';
// Original L21: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L22: Blank line separates related statements and has no runtime effect.

// Original L23: Declares updatePlannedAlert(), which updates the visible overdue alert without duplicate screen-reader changes.
export function updatePlannedAlert(element, jobs, today = new Date()) {
// Original L24: Stores message, value; later code reuses this result so the planned-urgency.mjs workflow stays consistent.
  const message = plannedOverdueMessage(jobs, today);
// Original L25: This comment documents the design intent here: Avoid repeat screen-reader announcements on filter changes or timer ticks..
  // Avoid repeat screen-reader announcements on filter changes or timer ticks.
// Original L26: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (element.textContent !== message) element.textContent = message;
// Original L27: Completes this application statement, applying the shown value or operation to the current page state/data record.
  element.hidden = !message;
// Original L28: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L29: Blank line separates related statements and has no runtime effect.

// Original L30: Declares watchPlannedDayChange(), which refreshes planned-job state when the local calendar day changes.
export function watchPlannedDayChange(refresh, doc = document, view = window) {
// Original L31: Stores dayKey, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the planned-urgency.mjs workflow stays consistent.
  const dayKey = () => new Date().toDateString();
// Original L32: Creates mutable previousDay state for this workflow; it changes as the user selects, edits, or loads records.
  let previousDay = dayKey();
// Original L33: Stores check, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the planned-urgency.mjs workflow stays consistent.
  const check = () => {
// Original L34: Stores currentDay, value; later code reuses this result so the planned-urgency.mjs workflow stays consistent.
    const currentDay = dayKey();
// Original L35: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (currentDay === previousDay) return;
// Original L36: Completes this application statement, applying the shown value or operation to the current page state/data record.
    previousDay = currentDay;
// Original L37: Completes this application statement, applying the shown value or operation to the current page state/data record.
    refresh();
// Original L38: Closes the surrounding block or callback; no additional operation occurs on this line.
  };
// Original L39: Completes this application statement, applying the shown value or operation to the current page state/data record.
  view.setInterval(check, 60_000);
// Original L40: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  view.addEventListener('focus', check);
// Original L41: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  doc.addEventListener('visibilitychange', () => {
// Original L42: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!doc.hidden) check();
// Original L43: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L44: Closes the surrounding block or callback; no additional operation occurs on this line.
}

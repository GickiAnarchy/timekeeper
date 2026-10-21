import { asValidDate } from './domain.mjs';

// Compare local calendar days, not elapsed hours (which vary across DST).
export function plannedJobUrgency(job, today = new Date()) {
  if (job.isComplete) return { level: 'complete', label: 'Completed', daysAway: null };
  const date = asValidDate(job.scheduledDate);
  if (!date) return { level: 'tbd', label: 'Date TBD', daysAway: null };
  const now = asValidDate(today) || new Date();
  const dayNumber = value => Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()) / 86_400_000;
  const daysAway = dayNumber(date) - dayNumber(now);
  if (daysAway < 0) return { level: 'overdue', label: `Overdue by ${-daysAway} ${daysAway === -1 ? 'day' : 'days'}`, daysAway };
  if (daysAway === 0) return { level: 'today', label: 'Due today', daysAway };
  if (daysAway === 1) return { level: 'tomorrow', label: 'Due tomorrow', daysAway };
  const level = daysAway <= 3 ? 'soon' : daysAway <= 7 ? 'week' : 'upcoming';
  return { level, label: `Due in ${daysAway} days`, daysAway };
}

export function plannedOverdueMessage(jobs, today = new Date()) {
  const count = jobs.filter(job => plannedJobUrgency(job, today).level === 'overdue').length;
  return count ? `Action needed: ${count} planned ${count === 1 ? 'job is' : 'jobs are'} overdue. Review the schedule to complete or reschedule ${count === 1 ? 'it' : 'them'}.` : '';
}

export function updatePlannedAlert(element, jobs, today = new Date()) {
  const message = plannedOverdueMessage(jobs, today);
  // Avoid repeat screen-reader announcements on filter changes or timer ticks.
  if (element.textContent !== message) element.textContent = message;
  element.hidden = !message;
}

export function watchPlannedDayChange(refresh, doc = document, view = window) {
  const dayKey = () => new Date().toDateString();
  let previousDay = dayKey();
  const check = () => {
    const currentDay = dayKey();
    if (currentDay === previousDay) return;
    previousDay = currentDay;
    refresh();
  };
  view.setInterval(check, 60_000);
  view.addEventListener('focus', check);
  doc.addEventListener('visibilitychange', () => {
    if (!doc.hidden) check();
  });
}

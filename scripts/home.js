import { store } from './models.js';

const hourFormat = new Intl.NumberFormat(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const timeFormat = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });
const jobDateFormat = new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function validDate(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function shiftHoursInRange(shift, rangeStart, rangeEnd, now) {
  const start = validDate(shift.clockInTime);
  if (!start) return 0;
  const end = validDate(shift.clockOutTime) || now;
  const activeStart = Math.max(start.getTime(), rangeStart.getTime());
  const activeEnd = Math.min(end.getTime(), rangeEnd.getTime());
  if (activeEnd <= activeStart) return 0;

  let workedMs = activeEnd - activeStart;
  for (const pause of shift.breaks || []) {
    const breakStart = validDate(pause.start);
    if (!breakStart) continue;
    const breakEnd = validDate(pause.end) || now;
    const overlapStart = Math.max(activeStart, breakStart.getTime());
    const overlapEnd = Math.min(activeEnd, breakEnd.getTime());
    if (overlapEnd > overlapStart) workedMs -= overlapEnd - overlapStart;
  }
  return Math.max(0, workedMs);
}

function hoursLabel(milliseconds) {
  return `${hourFormat.format(milliseconds / 3_600_000)} h`;
}

function elapsedLabel(milliseconds) {
  const totalMinutes = Math.max(0, Math.floor(milliseconds / 60_000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m elapsed`;
  return minutes ? `${hours}h ${minutes}m elapsed` : `${hours}h elapsed`;
}

function isActive(shift) {
  return Boolean(validDate(shift.clockInTime) && !validDate(shift.clockOutTime));
}

function calendarDayNumber(date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000;
}

function makeLink(text, href) {
  const link = makeElement('a', 'empty-state-link', text);
  link.href = href;
  link.target = 'main-content';
  return link;
}

document.addEventListener('DOMContentLoaded', async () => {
  const todayHours = document.getElementById('today-hours');
  const todayHoursNote = document.getElementById('today-hours-note');
  const weekHours = document.getElementById('week-hours');
  const activeCount = document.getElementById('active-count');
  const activeCountNote = document.getElementById('active-count-note');
  const activeList = document.getElementById('active-shift-list');
  const upcomingList = document.getElementById('upcoming-job-list');

  function renderOverview() {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));

    const todayTotal = store.shifts.reduce((total, shift) =>
      total + shiftHoursInRange(shift, todayStart, now, now), 0);
    const weekTotal = store.shifts.reduce((total, shift) =>
      total + shiftHoursInRange(shift, weekStart, now, now), 0);
    const running = store.shifts.filter(isActive).sort((a, b) =>
      (validDate(a.clockInTime)?.getTime() || 0) - (validDate(b.clockInTime)?.getTime() || 0));

    todayHours.textContent = hoursLabel(todayTotal);
    weekHours.textContent = hoursLabel(weekTotal);
    todayHoursNote.textContent = running.length
      ? 'Includes live time on active shifts'
      : 'Recorded work time for today';
    activeCount.textContent = String(running.length);
    activeCountNote.textContent = running.length === 1 ? 'One shift is in progress' : 'Crew currently clocked in';

    activeList.replaceChildren();
    if (running.length === 0) {
      activeList.appendChild(makeElement('li', 'dashboard-empty', 'No active shifts right now.'));
      return;
    }

    running.forEach(shift => {
      const started = validDate(shift.clockInTime);
      const isOnBreak = Boolean((shift.breaks || []).some(pause => pause.start && !pause.end));
      const item = makeElement('li', 'active-shift-item');
      const copy = makeElement('div', 'shift-copy');
      copy.append(
        makeElement('strong', 'shift-title', `${shift.employee?.name || 'Unknown employee'} · ${shift.customer?.name || 'Unknown job site'}`),
        makeElement('small', 'shift-meta', `Started ${timeFormat.format(started)} · ${elapsedLabel(now.getTime() - started.getTime())}`)
      );
      const status = makeElement('span', `shift-status${isOnBreak ? ' is-on-break' : ''}`, isOnBreak ? 'On break' : 'Working');
      item.append(copy, status);
      activeList.appendChild(item);
    });
  }

  function renderPlannedJobs() {
    upcomingList.replaceChildren();
    const todayNumber = calendarDayNumber(new Date());
    const jobs = store.plannedJobs
      .filter(job => !job.isComplete && validDate(job.scheduledDate))
      .sort((a, b) => validDate(a.scheduledDate) - validDate(b.scheduledDate))
      .slice(0, 3);

    if (jobs.length === 0) {
      const empty = makeElement('li', 'dashboard-empty', 'No planned jobs yet.');
      empty.appendChild(makeLink('Add the first job', 'planned.html'));
      upcomingList.appendChild(empty);
      return;
    }

    jobs.forEach(job => {
      const date = validDate(job.scheduledDate);
      const daysAway = calendarDayNumber(date) - todayNumber;
      const item = makeElement('li', 'planned-job-item');
      const dateTile = makeElement('span', 'job-date-tile', jobDateFormat.format(date));
      const copy = makeElement('div', 'job-copy');
      copy.append(
        makeElement('strong', 'job-title', job.description || 'Scheduled job'),
        makeElement('small', 'job-meta', job.customer?.name || 'Customer not available')
      );
      const timing = daysAway < 0 ? 'Overdue' : daysAway === 0 ? 'Today' : daysAway === 1 ? 'Tomorrow' : `In ${daysAway} days`;
      item.append(dateTile, copy, makeElement('span', `job-timing${daysAway < 0 ? ' is-overdue' : ''}`, timing));
      upcomingList.appendChild(item);
    });
  }

  try {
    await store.loadEmployees();
    await store.loadCustomers();
    await store.loadShifts();
    await store.loadPlanned();
    renderOverview();
    renderPlannedJobs();
    window.setInterval(renderOverview, 60_000);
  } catch (error) {
    console.error('Unable to load the Timekeeper dashboard.', error);
    todayHours.textContent = '—';
    weekHours.textContent = '—';
    activeList.replaceChildren(makeElement('li', 'dashboard-empty', 'Could not load shift data. Try refreshing the page.'));
    upcomingList.replaceChildren(makeElement('li', 'dashboard-empty', 'Could not load planned jobs. Try refreshing the page.'));
  }
});

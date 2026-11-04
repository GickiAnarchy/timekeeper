import { actualShiftHours } from './domain.mjs';
import { store } from './models.js';

const hourFormat = new Intl.NumberFormat(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const timeFormat = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });

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
  const clippedStart = Math.max(start.getTime(), rangeStart.getTime());
  const clippedEnd = Math.min(end.getTime(), rangeEnd.getTime());
  if (clippedEnd <= clippedStart) return 0;

  // Treat an open break as lasting through now, then let the shared calculator
  // clip and merge breaks inside this particular day/week interval.
  const breaks = (shift.breaks || []).map(item => ({
    start: validDate(item.start),
    end: validDate(item.end) || now
  }));
  return actualShiftHours(new Date(clippedStart), new Date(clippedEnd), breaks) * 60 * 60 * 1000;
}

function hoursLabel(milliseconds) {
  return `${hourFormat.format(milliseconds / 3_600_000)} h`;
}

function elapsedLabel(milliseconds) {
  const totalMinutes = Math.max(0, Math.floor(milliseconds / 60_000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (!hours) return `${minutes}m elapsed`;
  return minutes ? `${hours}h ${minutes}m elapsed` : `${hours}h elapsed`;
}

function isActive(shift) {
  return Boolean(validDate(shift.clockInTime) && !validDate(shift.clockOutTime));
}

document.addEventListener('DOMContentLoaded', async () => {
  const todayHours = document.getElementById('today-hours');
  const todayNote = document.getElementById('today-hours-note');
  const weekHours = document.getElementById('week-hours');
  const activeCount = document.getElementById('active-count');
  const activeCountNote = document.getElementById('active-count-note');
  const activeList = document.getElementById('active-shift-list');

  function renderOverview() {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
    const todayTotal = store.shifts.reduce((total, shift) =>
      total + shiftHoursInRange(shift, todayStart, now, now), 0);
    const weekTotal = store.shifts.reduce((total, shift) =>
      total + shiftHoursInRange(shift, weekStart, now, now), 0);
    const active = store.shifts.filter(isActive).sort((a, b) =>
      (validDate(a.clockInTime)?.getTime() || 0) - (validDate(b.clockInTime)?.getTime() || 0));

    todayHours.textContent = hoursLabel(todayTotal);
    weekHours.textContent = hoursLabel(weekTotal);
    todayNote.textContent = active.length ? 'Includes live time on active shifts' : 'Recorded work time for today';
    activeCount.textContent = String(active.length);
    activeCountNote.textContent = active.length === 1 ? 'One shift is in progress' : 'Crew currently clocked in';

    activeList.replaceChildren();
    if (!active.length) {
      activeList.appendChild(makeElement('li', 'dashboard-empty', 'No active shifts right now.'));
      return;
    }

    for (const shift of active) {
      const started = validDate(shift.clockInTime);
      const onBreak = Boolean((shift.breaks || []).some(item => item.start && !item.end));
      const item = makeElement('li', 'active-shift-item');
      const copy = makeElement('div', 'shift-copy');
      copy.append(
        makeElement('strong', 'shift-title', `${shift.employee?.name || 'Unknown employee'} · ${shift.customer?.name || 'Unknown job site'}`),
        makeElement('small', 'shift-meta', `Started ${timeFormat.format(started)} · ${elapsedLabel(now - started)}`)
      );
      item.append(copy, makeElement('span', `shift-status${onBreak ? ' is-on-break' : ''}`, onBreak ? 'On break' : 'Working'));
      activeList.appendChild(item);
    }
  }

  try {
    await store.init();
    if (store.loadFailures.length) throw store.loadFailures[0];
    renderOverview();
    window.setInterval(renderOverview, 60_000);
  } catch (error) {
    console.error('Unable to load the Timekeeper dashboard.', error);
    todayHours.textContent = '—';
    weekHours.textContent = '—';
    activeCount.textContent = '—';
    activeList.replaceChildren(makeElement('li', 'dashboard-empty', 'Could not load shift data. Try refreshing the page.'));
  }
});

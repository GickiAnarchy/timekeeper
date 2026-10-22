import { store } from './models.js';
import { loadPayPeriodReviewData } from './pay-period-data.mjs';
import { buildPayPeriodReview, currentWeekRange } from './pay-period-review.mjs';

const hours = value => Number(value).toFixed(2);
const money = cents => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(cents / 100);
const dateFormat = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function emptyRow(body, columns, text) {
  const row = element('tr');
  const cell = element('td', text, 'review-empty');
  cell.colSpan = columns;
  row.append(cell);
  body.append(row);
}

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('review-filters');
  const start = document.getElementById('review-start');
  const end = document.getElementById('review-end');
  const employee = document.getElementById('review-employee');
  const results = document.getElementById('review-results');
  const status = document.getElementById('review-status');
  const error = document.getElementById('review-error');
  const refresh = document.getElementById('review-refresh');
  const apply = document.getElementById('review-apply');
  const thisWeek = document.getElementById('review-this-week');
  const lastWeek = document.getElementById('review-last-week');
  let snapshot = null;
  let loadedAt = '';

  function setRange(now) {
    const range = currentWeekRange(now);
    start.value = range.startDate;
    end.value = range.endDate;
  }
  setRange(new Date());

  function render() {
    if (!snapshot) return;
    error.hidden = true;
    results.hidden = true;
    try {
      const review = buildPayPeriodReview({ ...snapshot, startDate: start.value, endDate: end.value, employeeId: employee.value });
      const totals = review.totals;
      const metrics = document.getElementById('review-metrics');
      metrics.replaceChildren();
      for (const [title, value, note] of [
        ['Completed work', `${hours(totals.actualHours)} h`, `${totals.shiftCount} completed shifts · breaks deducted`],
        ['Pay hours', `${hours(totals.paidHours)} h`, 'Includes paid and unpaid shifts'],
        ['Not marked paid', `${hours(totals.unpaidHours)} h`, `${totals.unpaidShiftCount} unpaid · ${totals.paidShiftCount} marked paid`],
        ['Invoice-ready estimate', money(totals.invoiceReadyCents), `${totals.invoiceReadyCount} shifts · ${hours(totals.invoiceReadyHours)} actual h`]
      ]) {
        const card = element('article', undefined, 'review-metric');
        card.append(element('p', title), element('strong', value), element('small', note));
        metrics.append(card);
      }

      const people = document.getElementById('review-people');
      people.replaceChildren();
      for (const person of review.employees) {
        const row = element('tr');
        const balance = element('td', money(person.balanceCents));
        balance.append(element('small', `${person.ledgerEntryCount} active entries · all dates`));
        row.append(element('td', person.name), element('td', person.shiftCount), element('td', hours(person.actualHours)), element('td', hours(person.paidHours)), element('td', hours(person.unpaidHours)), balance);
        people.append(row);
      }
      if (!review.employees.length) emptyRow(people, 6, 'No employees or ledger balances to review.');

      const shifts = document.getElementById('review-shifts');
      shifts.replaceChildren();
      for (const shift of review.shifts) {
        const row = element('tr');
        const person = element('td', shift.employeeName);
        person.append(element('small', shift.customerName));
        row.append(
          element('td', dateFormat.format(shift.start)), person,
          element('td', hours(shift.actualHours)), element('td', hours(shift.paidHours)),
          element('td', shift.isPaid ? 'Marked paid' : 'Not marked paid', shift.isPaid ? '' : 'review-needs-attention'),
          element('td', shift.ledgerStatus),
          element('td', shift.invoiceStatus, shift.invoiceStatus === 'Ready' ? 'review-ready' : shift.invoiceStatus.startsWith('Missing') ? 'review-needs-attention' : ''),
          element('td', shift.invoiceStatus === 'Ready' ? money(shift.invoiceCents) : '—')
        );
        shifts.append(row);
      }
      if (!review.shifts.length) emptyRow(shifts, 8, 'No completed shifts in this period for the selected employee filter. Current ledger balances are still shown above.');

      const warnings = [];
      if (review.activeShiftCount) warnings.push(`${review.activeShiftCount} active shift(s) started in this period are excluded from totals.`);
      if (review.invalidShiftCount) warnings.push(`${review.invalidShiftCount} shift(s) with invalid completion times were excluded.`);
      const blocked = review.shifts.filter(shift => shift.invoiceStatus.startsWith('Missing')).length;
      if (blocked) warnings.push(`${blocked} unlinked shift(s) need a customer or billing rate before invoicing.`);
      const pendingArchives = store.ledgerArchives.filter(archive => archive.status === 'pending' && (!employee.value || String(archive.employeeId) === employee.value)).length;
      if (pendingArchives) warnings.push(`${pendingArchives} ledger archive(s) are pending. Current balances may include entries awaiting archival; this review does not finish archiving.`);
      const warning = document.getElementById('review-warnings');
      warning.textContent = warnings.join(' ');
      warning.hidden = !warnings.length;
      status.textContent = `${start.value} through ${end.value} · ${employee.selectedOptions[0]?.textContent || 'All employees'} · Data loaded ${loadedAt}. Refresh for changes.`;
      results.hidden = false;
    } catch (problem) {
      error.textContent = problem.message || 'Choose a valid date range to review.';
      error.hidden = false;
      status.textContent = 'Review not shown. Check the selected dates.';
    }
  }

  async function load() {
    snapshot = null;
    results.hidden = true;
    error.hidden = true;
    status.textContent = 'Loading review data…';
    for (const control of [apply, refresh, thisWeek, lastWeek, start, end, employee]) control.disabled = true;
    try {
      snapshot = await loadPayPeriodReviewData(store);
      loadedAt = new Date().toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
      const selected = employee.value;
      employee.replaceChildren(new Option('All employees', ''));
      // Include orphaned employee IDs so old shifts and balances remain reviewable.
      const summaries = buildPayPeriodReview({ ...snapshot, ...currentWeekRange() }).employees;
      for (const person of summaries) {
        if (person.id) employee.add(new Option(person.name, person.id));
      }
      employee.value = [...employee.options].some(option => option.value === selected) ? selected : '';
      render();
    } catch (problem) {
      snapshot = null;
      results.hidden = true;
      status.textContent = 'Review unavailable. No partial totals are shown.';
      error.textContent = problem.message || 'Could not load review data. Refresh to try again.';
      error.hidden = false;
    } finally {
      refresh.disabled = false;
      for (const control of [apply, thisWeek, lastWeek, start, end, employee]) control.disabled = !snapshot;
    }
  }

  form.addEventListener('submit', event => { event.preventDefault(); render(); });
  // Hide the previous result immediately when filters change, preventing stale
  // totals from appearing to describe a newly selected range or employee.
  for (const control of [start, end, employee]) control.addEventListener('change', () => {
    results.hidden = true;
    status.textContent = 'Filters changed. Choose Review period to update the totals.';
    error.hidden = true;
  });
  thisWeek.addEventListener('click', () => { setRange(new Date()); render(); });
  lastWeek.addEventListener('click', () => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    setRange(date);
    render();
  });
  refresh.addEventListener('click', load);
  await load();
});

# scripts/pay-period-review.js

[Exact copy](../../original/scripts/pay-period-review.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import { store } from './models.js';
```

Imports store from ./models.js; these helpers provide the data/model this module uses.

### Line 2

```text
import { loadPayPeriodReviewData } from './pay-period-data.mjs';
```

Imports loadPayPeriodReviewData from ./pay-period-data.mjs; these helpers provide the UI utility this module uses.

### Line 3

```text
import { buildPayPeriodReview, currentWeekRange } from './pay-period-review.mjs';
```

Imports buildPayPeriodReview, currentWeekRange from ./pay-period-review.mjs; these helpers provide the UI utility this module uses.

### Line 4

```text

```

Blank line separates related statements and has no runtime effect.

### Line 5

```text
const hours = value => Number(value).toFixed(2);
```

Stores hours, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 6

```text
const money = cents => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(cents / 100);
```

Stores money, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 7

```text
const dateFormat = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
```

Stores dateFormat, a locale-aware formatter for review money or dates; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 8

```text

```

Blank line separates related statements and has no runtime effect.

### Line 9

```text
function element(tag, text, className) {
```

Defines the private helper element for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 10

```text
  const node = document.createElement(tag);
```

Stores node, a browser object used to build or update this page; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 11

```text
  if (text !== undefined) node.textContent = text;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 12

```text
  if (className) node.className = className;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 13

```text
  return node;
```

Returns `node` (node) to the caller and exits this function.

### Line 14

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 15

```text

```

Blank line separates related statements and has no runtime effect.

### Line 16

```text
function emptyRow(body, columns, text) {
```

Defines the private helper emptyRow for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 17

```text
  const row = element('tr');
```

Stores row, value; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 18

```text
  const cell = element('td', text, 'review-empty');
```

Stores cell, value; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 19

```text
  cell.colSpan = columns;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 20

```text
  row.append(cell);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 21

```text
  body.append(row);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 22

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 23

```text

```

Blank line separates related statements and has no runtime effect.

### Line 24

```text
document.addEventListener('DOMContentLoaded', async () => {
```

Waits until the page DOM exists, then runs the page controller so element lookups and event wiring are safe.

### Line 25

```text
  const form = document.getElementById('review-filters');
```

Stores form, DOM reference to the form control; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 26

```text
  const start = document.getElementById('review-start');
```

Stores start, DOM reference to the start control; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 27

```text
  const end = document.getElementById('review-end');
```

Stores end, DOM reference to the end control; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 28

```text
  const employee = document.getElementById('review-employee');
```

Stores employee, DOM reference to the employee control; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 29

```text
  const results = document.getElementById('review-results');
```

Stores results, DOM reference to the results control; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 30

```text
  const status = document.getElementById('review-status');
```

Stores status, DOM reference to the status control; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 31

```text
  const error = document.getElementById('review-error');
```

Stores error, DOM reference to the error control; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 32

```text
  const refresh = document.getElementById('review-refresh');
```

Stores refresh, DOM reference to the refresh control; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 33

```text
  const apply = document.getElementById('review-apply');
```

Stores apply, DOM reference to the apply control; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 34

```text
  const thisWeek = document.getElementById('review-this-week');
```

Stores thisWeek, DOM reference to the thisWeek control; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 35

```text
  const lastWeek = document.getElementById('review-last-week');
```

Stores lastWeek, DOM reference to the lastWeek control; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 36

```text
  let snapshot = null;
```

Creates mutable snapshot state for this workflow; it changes as the user selects, edits, or loads records.

### Line 37

```text
  let loadedAt = '';
```

Creates mutable loadedAt state for this workflow; it changes as the user selects, edits, or loads records.

### Line 38

```text

```

Blank line separates related statements and has no runtime effect.

### Line 39

```text
  function setRange(now) {
```

Defines the private helper setRange for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 40

```text
    const range = currentWeekRange(now);
```

Stores range, value; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 41

```text
    start.value = range.startDate;
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 42

```text
    end.value = range.endDate;
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 43

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 44

```text
  setRange(new Date());
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 45

```text

```

Blank line separates related statements and has no runtime effect.

### Line 46

```text
  function render() {
```

Defines the private helper render for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 47

```text
    if (!snapshot) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 48

```text
    error.hidden = true;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 49

```text
    results.hidden = true;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 50

```text
    try {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 51

```text
      const review = buildPayPeriodReview({ ...snapshot, startDate: start.value, endDate: end.value, employeeId: employee.value });
```

Stores review, a date value used for local-day or period calculations; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 52

```text
      const totals = review.totals;
```

Stores totals, value; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 53

```text
      const metrics = document.getElementById('review-metrics');
```

Stores metrics, DOM reference to the metrics control; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 54

```text
      metrics.replaceChildren();
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 55

```text
      for (const [title, value, note] of [
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 56

```text
        ['Completed work', `${hours(totals.actualHours)} h`, `${totals.shiftCount} completed shifts · breaks deducted`],
```

Continues the surrounding array literal of application options or data records.

### Line 57

```text
        ['Pay hours', `${hours(totals.paidHours)} h`, 'Includes paid and unpaid shifts'],
```

Continues the surrounding array literal of application options or data records.

### Line 58

```text
        ['Not marked paid', `${hours(totals.unpaidHours)} h`, `${totals.unpaidShiftCount} unpaid · ${totals.paidShiftCount} marked paid`],
```

Continues the surrounding array literal of application options or data records.

### Line 59

```text
        ['Invoice-ready estimate', money(totals.invoiceReadyCents), `${totals.invoiceReadyCount} shifts · ${hours(totals.invoiceReadyHours)} actual h`]
```

Continues the surrounding array literal of application options or data records.

### Line 60

```text
      ]) {
```

Continues the surrounding array literal of application options or data records.

### Line 61

```text
        const card = element('article', undefined, 'review-metric');
```

Stores card, value; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 62

```text
        card.append(element('p', title), element('strong', value), element('small', note));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 63

```text
        metrics.append(card);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 64

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 65

```text

```

Blank line separates related statements and has no runtime effect.

### Line 66

```text
      const people = document.getElementById('review-people');
```

Stores people, DOM reference to the people control; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 67

```text
      people.replaceChildren();
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 68

```text
      for (const person of review.employees) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 69

```text
        const row = element('tr');
```

Stores row, value; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 70

```text
        const balance = element('td', money(person.balanceCents));
```

Stores balance, value; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 71

```text
        balance.append(element('small', `${person.ledgerEntryCount} active entries · all dates`));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 72

```text
        row.append(element('td', person.name), element('td', person.shiftCount), element('td', hours(person.actualHours)), element('td', hours(person.paidHours)), element('td', hours(person.unpaidHours)), balance);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 73

```text
        people.append(row);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 74

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 75

```text
      if (!review.employees.length) emptyRow(people, 6, 'No employees or ledger balances to review.');
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 76

```text

```

Blank line separates related statements and has no runtime effect.

### Line 77

```text
      const shifts = document.getElementById('review-shifts');
```

Stores shifts, DOM reference to the shifts control; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 78

```text
      shifts.replaceChildren();
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 79

```text
      for (const shift of review.shifts) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 80

```text
        const row = element('tr');
```

Stores row, value; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 81

```text
        const person = element('td', shift.employeeName);
```

Stores person, value; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 82

```text
        person.append(element('small', shift.customerName));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 83

```text
        row.append(
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 84

```text
          element('td', dateFormat.format(shift.start)), person,
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 85

```text
          element('td', hours(shift.actualHours)), element('td', hours(shift.paidHours)),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 86

```text
          element('td', shift.isPaid ? 'Marked paid' : 'Not marked paid', shift.isPaid ? '' : 'review-needs-attention'),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 87

```text
          element('td', shift.ledgerStatus),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 88

```text
          element('td', shift.invoiceStatus, shift.invoiceStatus === 'Ready' ? 'review-ready' : shift.invoiceStatus.startsWith('Missing') ? 'review-needs-attention' : ''),
```

Supplies another named imported value in the module dependency list, giving this page access to that helper.

### Line 89

```text
          element('td', shift.invoiceStatus === 'Ready' ? money(shift.invoiceCents) : '—')
```

Sets the element('td', shift.invoiceStatus === 'Ready' ? money(shift.invoiceCents) property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 90

```text
        );
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 91

```text
        shifts.append(row);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 92

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 93

```text
      if (!review.shifts.length) emptyRow(shifts, 8, 'No completed shifts in this period for the selected employee filter. Current ledger balances are still shown above.');
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 94

```text

```

Blank line separates related statements and has no runtime effect.

### Line 95

```text
      const warnings = [];
```

Stores warnings, value; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 96

```text
      if (review.activeShiftCount) warnings.push(`${review.activeShiftCount} active shift(s) started in this period are excluded from totals.`);
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 97

```text
      if (review.invalidShiftCount) warnings.push(`${review.invalidShiftCount} shift(s) with invalid completion times were excluded.`);
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 98

```text
      const blocked = review.shifts.filter(shift => shift.invoiceStatus.startsWith('Missing')).length;
```

Stores blocked, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 99

```text
      if (blocked) warnings.push(`${blocked} unlinked shift(s) need a customer or billing rate before invoicing.`);
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 100

```text
      const pendingArchives = store.ledgerArchives.filter(archive => archive.status === 'pending' && (!employee.value || String(archive.employeeId) === employee.value)).length;
```

Stores pendingArchives, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 101

```text
      if (pendingArchives) warnings.push(`${pendingArchives} ledger archive(s) are pending. Current balances may include entries awaiting archival; this review does not finish archiving.`);
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 102

```text
      const warning = document.getElementById('review-warnings');
```

Stores warning, DOM reference to the warning control; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 103

```text
      warning.textContent = warnings.join(' ');
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 104

```text
      warning.hidden = !warnings.length;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 105

```text
      status.textContent = `${start.value} through ${end.value} · ${employee.selectedOptions[0]?.textContent || 'All employees'} · Data loaded ${loadedAt}. Refresh for changes.`;
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 106

```text
      results.hidden = false;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 107

```text
    } catch (problem) {
```

Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.

### Line 108

```text
      error.textContent = problem.message || 'Choose a valid date range to review.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 109

```text
      error.hidden = false;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 110

```text
      status.textContent = 'Review not shown. Check the selected dates.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 111

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 112

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 113

```text

```

Blank line separates related statements and has no runtime effect.

### Line 114

```text
  async function load() {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 115

```text
    snapshot = null;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 116

```text
    results.hidden = true;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 117

```text
    error.hidden = true;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 118

```text
    status.textContent = 'Loading review data…';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 119

```text
    for (const control of [apply, refresh, thisWeek, lastWeek, start, end, employee]) control.disabled = true;
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 120

```text
    try {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 121

```text
      snapshot = await loadPayPeriodReviewData(store);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 122

```text
      loadedAt = new Date().toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
```

Sets the loadedAt = new Date().toLocaleTimeString(undefined, { hour property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 123

```text
      const selected = employee.value;
```

Stores selected, value; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 124

```text
      employee.replaceChildren(new Option('All employees', ''));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 125

```text
      // Include orphaned employee IDs so old shifts and balances remain reviewable.
```

This comment documents the design intent here: Include orphaned employee IDs so old shifts and balances remain reviewable..

### Line 126

```text
      const summaries = buildPayPeriodReview({ ...snapshot, ...currentWeekRange() }).employees;
```

Stores summaries, value; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 127

```text
      for (const person of summaries) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 128

```text
        if (person.id) employee.add(new Option(person.name, person.id));
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 129

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 130

```text
      employee.value = [...employee.options].some(option => option.value === selected) ? selected : '';
```

Synchronizes a form control with the selected record and prevents invalid edits when this state requires it.

### Line 131

```text
      render();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 132

```text
    } catch (problem) {
```

Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.

### Line 133

```text
      snapshot = null;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 134

```text
      results.hidden = true;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 135

```text
      status.textContent = 'Review unavailable. No partial totals are shown.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 136

```text
      error.textContent = problem.message || 'Could not load review data. Refresh to try again.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 137

```text
      error.hidden = false;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 138

```text
    } finally {
```

Runs cleanup regardless of success, such as restoring button text or re-enabling controls.

### Line 139

```text
      refresh.disabled = false;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 140

```text
      for (const control of [apply, thisWeek, lastWeek, start, end, employee]) control.disabled = !snapshot;
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 141

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 142

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 143

```text

```

Blank line separates related statements and has no runtime effect.

### Line 144

```text
  form.addEventListener('submit', event => { event.preventDefault(); render(); });
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 145

```text
  // Hide the previous result immediately when filters change, preventing stale
```

This comment documents the design intent here: Hide the previous result immediately when filters change, preventing stale.

### Line 146

```text
  // totals from appearing to describe a newly selected range or employee.
```

This comment documents the design intent here: totals from appearing to describe a newly selected range or employee..

### Line 147

```text
  for (const control of [start, end, employee]) control.addEventListener('change', () => {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 148

```text
    results.hidden = true;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 149

```text
    status.textContent = 'Filters changed. Choose Review period to update the totals.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 150

```text
    error.hidden = true;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 151

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 152

```text
  thisWeek.addEventListener('click', () => { setRange(new Date()); render(); });
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 153

```text
  lastWeek.addEventListener('click', () => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 154

```text
    const date = new Date();
```

Stores date, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the pay-period-review.js workflow stays consistent.

### Line 155

```text
    date.setDate(date.getDate() - 7);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 156

```text
    setRange(date);
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 157

```text
    render();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 158

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 159

```text
  refresh.addEventListener('click', load);
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 160

```text
  await load();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 161

```text
});
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

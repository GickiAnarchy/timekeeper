# scripts/ledger-archive.js

[Exact copy](../../original/scripts/ledger-archive.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import { store } from './models.js';
```

Imports store from ./models.js; these helpers provide the data/model this module uses.

### Line 2

```text

```

Blank line separates related statements and has no runtime effect.

### Line 3

```text
function formatDate(value) {
```

Defines the private helper formatDate for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 4

```text
  const date = value ? new Date(value) : null;
```

Stores date, a copied/normalized Date used to avoid mutating the caller’s timestamp; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 5

```text
  return date && !Number.isNaN(date.getTime()) ? date.toLocaleString() : 'Unknown date';
```

Returns checks uses negates the truthiness of checks whether gets `date` (date) as milliseconds since 1970-01-01 UTC is the special invalid-number value NaN only if `date` (date) is truthy; otherwise keeps the falsy first value; if true chooses function toLocaleString() { [native code] }, otherwise "Unknown date" to the caller and exits this function.

### Line 6

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 7

```text

```

Blank line separates related statements and has no runtime effect.

### Line 8

```text
function formatAmount(entry) {
```

Defines the private helper formatAmount for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 9

```text
  const amount = Number(entry.amount || 0);
```

Stores amount, a numeric value validated for payroll math; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 10

```text
  return String(entry.type || '').toLowerCase() === 'advance'
```

Returns checks checks that converts converts uses `entry.type` when it is truthy, otherwise falls back to "" to text to lowercase text and "advance" have the same value and type; if true chooses a text template that combines fixed text with computed values formats gets the nonnegative magnitude of `amount` (amount) as text with 2 digits after the decimal point, otherwise a text template that combines fixed text with computed values formats `amount` (amount) as text with 2 digits after the decimal point to the caller and exits this function.

### Line 11

```text
    ? `-$${Math.abs(amount).toFixed(2)}`
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 12

```text
    : `$${amount.toFixed(2)}`;
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 13

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 14

```text

```

Blank line separates related statements and has no runtime effect.

### Line 15

```text
function element(tag, className, text) {
```

Defines the private helper element for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 16

```text
  const node = document.createElement(tag);
```

Stores node, a browser object used to build or update this page; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 17

```text
  if (className) node.className = className;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 18

```text
  if (text !== undefined) node.textContent = text;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 19

```text
  return node;
```

Returns `node` (node) to the caller and exits this function.

### Line 20

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 21

```text

```

Blank line separates related statements and has no runtime effect.

### Line 22

```text
document.addEventListener('DOMContentLoaded', async () => {
```

Waits until the page DOM exists, then runs the page controller so element lookups and event wiring are safe.

### Line 23

```text
  const employeeFilter = document.getElementById('archive-employee-filter');
```

Stores employeeFilter, DOM reference to the employeeFilter control; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 24

```text
  const archiveList = document.getElementById('ledger-archive-list');
```

Stores archiveList, DOM reference to the archiveList control; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 25

```text
  const archiveStatus = document.getElementById('archive-status');
```

Stores archiveStatus, DOM reference to the archiveStatus control; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 26

```text
  const retryButton = document.getElementById('retry-archive-button');
```

Stores retryButton, DOM reference to the retryButton control; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 27

```text

```

Blank line separates related statements and has no runtime effect.

### Line 28

```text
  try {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 29

```text
    await store.init();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 30

```text
  } catch (error) {
```

Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.

### Line 31

```text
    console.error('Unable to load ledger archives:', error);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 32

```text
    archiveStatus.textContent = error.message || 'Unable to load archived ledgers.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 33

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 34

```text

```

Blank line separates related statements and has no runtime effect.

### Line 35

```text
  function populateEmployeeFilter() {
```

Defines the private helper populateEmployeeFilter for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 36

```text
    const previousValue = employeeFilter.value;
```

Stores previousValue, value; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 37

```text
    const archivedEmployees = new Map();
```

Stores archivedEmployees, a lookup map for fast employee/archive matching; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 38

```text
    for (const archive of store.ledgerArchives) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 39

```text
      archivedEmployees.set(String(archive.employeeId), archive.employeeName || 'Unknown employee');
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 40

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 41

```text
    const employeeOptions = [...archivedEmployees.entries()]
```

Stores employeeOptions, value; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 42

```text
      .map(([id, name]) => ({ id, name }))
```

Defines field id as `id` (id).

### Line 43

```text
      .sort((a, b) => a.name.localeCompare(b.name));
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 44

```text
    employeeFilter.replaceChildren(new Option('All employees', ''));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 45

```text
    for (const employee of employeeOptions) employeeFilter.add(new Option(employee.name, employee.id));
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 46

```text
    if (employeeOptions.some(employee => employee.id === previousValue)) employeeFilter.value = previousValue;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 47

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 48

```text

```

Blank line separates related statements and has no runtime effect.

### Line 49

```text
  populateEmployeeFilter();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 50

```text

```

Blank line separates related statements and has no runtime effect.

### Line 51

```text
  function renderArchive() {
```

Defines the private helper renderArchive for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 52

```text
    const employeeId = employeeFilter.value;
```

Stores employeeId, value; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 53

```text
    const archives = store.ledgerArchives
```

Stores archives, value; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 54

```text
      .filter(archive => !employeeId || String(archive.employeeId) === employeeId)
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 55

```text
      .sort((a, b) => String(b.archivedAt || '').localeCompare(String(a.archivedAt || '')));
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 56

```text
    archiveList.replaceChildren();
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 57

```text

```

Blank line separates related statements and has no runtime effect.

### Line 58

```text
    if (archives.length === 0) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 59

```text
      archiveList.appendChild(element('p', 'archive-empty', 'No archived ledgers found for this selection.'));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 60

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 61

```text

```

Blank line separates related statements and has no runtime effect.

### Line 62

```text
    for (const archive of archives) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 63

```text
      const card = element('article', 'archive-card');
```

Stores card, value; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 64

```text
      const header = element('header', 'archive-card-heading');
```

Stores header, value; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 65

```text
      const headingCopy = element('div', 'archive-card-copy');
```

Stores headingCopy, value; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 66

```text
      headingCopy.append(
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 67

```text
        element('p', 'archive-card-eyebrow', 'SETTLED LEDGER'),
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 68

```text
        element('h2', '', archive.employeeName || 'Unknown employee'),
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 69

```text
        element('p', 'archive-card-meta', `${formatDate(archive.archivedAt)} · Balance closed at $${(Number(archive.balanceCents || 0) / 100).toFixed(2)} · ${Number(archive.entryCount || 0)} entries`)
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 70

```text
      );
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 71

```text
      const badge = element('span', `archive-badge${archive.status === 'pending' ? ' is-pending' : ''}`,
```

Stores badge, value; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 72

```text
        archive.status === 'pending' ? 'Archive pending' : 'Settled');
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 73

```text
      header.append(headingCopy, badge);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 74

```text

```

Blank line separates related statements and has no runtime effect.

### Line 75

```text
      const details = document.createElement('details');
```

Stores details, a browser object used to build or update this page; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 76

```text
      details.className = 'archive-details';
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 77

```text
      details.appendChild(element('summary', '', 'View archived entries'));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 78

```text
      const rows = store.ledgerArchiveRows
```

Stores rows, value; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 79

```text
        .filter(row => row.archiveId === archive.id)
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 80

```text
        .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')) || Number(b.index || 0) - Number(a.index || 0));
```

Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.

### Line 81

```text
      const list = element('ol', 'archive-entry-list');
```

Stores list, value; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 82

```text
      if (rows.length === 0) {
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 83

```text
        list.appendChild(element('li', 'archive-entry-empty', archive.status === 'pending'
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 84

```text
          ? 'Entries are being copied into the archive. Use Retry pending archive if this message remains.'
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 85

```text
          : 'No entry details are available in this archive.'));
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 86

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 87

```text
      for (const row of rows) {
```

Iterates through each matching record so the page can aggregate or render every item.

### Line 88

```text
        const item = element('li', 'archive-entry');
```

Stores item, value; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 89

```text
        const topLine = element('div', 'archive-entry-topline');
```

Stores topLine, value; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 90

```text
        const type = row.sourceShiftId && String(row.type || '').toLowerCase() === 'normal'
```

Stores type, value; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 91

```text
          ? 'Shift pay'
```

Continues the surrounding ledger-archive.js operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 92

```text
          : String(row.type || 'Entry').replace(/^./, letter => letter.toUpperCase());
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 93

```text
        topLine.append(element('strong', '', `${row.date || 'Undated'} · ${type}`));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 94

```text
        topLine.append(element('strong', 'archive-entry-amount', formatAmount(row)));
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 95

```text
        const detail = element('p', 'archive-entry-detail', `${Number(row.hours || 0).toFixed(2)} hours${row.notes ? ` · ${row.notes}` : ''}`);
```

Stores detail, a numeric value validated for payroll math; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 96

```text
        item.append(topLine, detail);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 97

```text
        list.appendChild(item);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 98

```text
      }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 99

```text
      details.appendChild(list);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 100

```text
      card.append(header, details);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 101

```text
      archiveList.appendChild(card);
```

Builds the page structure from DOM nodes and replaces stale results with the current records.

### Line 102

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 103

```text

```

Blank line separates related statements and has no runtime effect.

### Line 104

```text
    const pendingCount = store.ledgerArchives.filter(archive => archive.status === 'pending').length;
```

Stores pendingCount, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the ledger-archive.js workflow stays consistent.

### Line 105

```text
    retryButton.hidden = pendingCount === 0;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 106

```text
    archiveStatus.textContent = store.loadFailures.length
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 107

```text
      ? 'Some workspace records could not be loaded. Retry the visible connection warning; archived history may be incomplete.'
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 108

```text
      : archives.length
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 109

```text
        ? `${archives.length} archived ledger${archives.length === 1 ? '' : 's'} shown.${pendingCount ? ` ${pendingCount} archive${pendingCount === 1 ? '' : 's'} pending completion.` : ''}`
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 110

```text
        : 'No archived ledgers found.';
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 111

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 112

```text

```

Blank line separates related statements and has no runtime effect.

### Line 113

```text
  employeeFilter.addEventListener('change', renderArchive);
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 114

```text
  retryButton.addEventListener('click', async () => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 115

```text
    retryButton.disabled = true;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 116

```text
    retryButton.textContent = 'Retrying…';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 117

```text
    try {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 118

```text
      await store.init();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 119

```text
      populateEmployeeFilter();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 120

```text
      archiveStatus.textContent = 'Pending archives completed.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 121

```text
    } catch (error) {
```

Begins error handling so a failed load/save can be reported and UI state restored instead of silently corrupting data.

### Line 122

```text
      console.error('Unable to retry pending ledger archives:', error);
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 123

```text
      archiveStatus.textContent = error.message || 'Unable to complete pending archives. Please try again.';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 124

```text
    } finally {
```

Runs cleanup regardless of success, such as restoring button text or re-enabling controls.

### Line 125

```text
      retryButton.disabled = false;
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 126

```text
      retryButton.textContent = 'Retry pending archive';
```

Writes user-visible status/markup into the page, reflecting the current data or validation result.

### Line 127

```text
      renderArchive();
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 128

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 129

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 130

```text

```

Blank line separates related statements and has no runtime effect.

### Line 131

```text
  renderArchive();
```

Persists or archives the changed record through the store, keeping the visible UI tied to durable application data.

### Line 132

```text
});
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

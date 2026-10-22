# scripts/table-sort.mjs

[Exact copy](../../original/scripts/table-sort.mjs)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import { sortTableRows } from './domain.mjs';
```

Imports sortTableRows from ./domain.mjs; these helpers provide the domain calculations this module uses.

### Line 2

```text

```

Blank line separates related statements and has no runtime effect.

### Line 3

```text
export { sortTableRows };
```

Re-exports the navigation helper so older consumers can keep using the same module path.

### Line 4

```text

```

Blank line separates related statements and has no runtime effect.

### Line 5

```text
export function initializeTableSorting(table, { initialSort = null, onSort = () => {} } = {}) {
```

Declares initializeTableSorting(), which wires sortable table headers and exposes current sort state.

### Line 6

```text
  if (!table) return null;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 7

```text

```

Blank line separates related statements and has no runtime effect.

### Line 8

```text
  const buttons = [...table.querySelectorAll('thead th[data-sort-key] .table-sort-button')];
```

Stores buttons, DOM query used to find the buttons elements; later code reuses this result so the table-sort.mjs workflow stays consistent.

### Line 9

```text
  const validInitialSort = initialSort && buttons.some(button =>
```

Stores validInitialSort, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the table-sort.mjs workflow stays consistent.

### Line 10

```text
    button.closest('th')?.dataset.sortKey === initialSort.key
```

Calls `button.closest` with "th".

### Line 11

```text
  ) ? initialSort : null;
```

Sets the ) ? initialSort property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 12

```text
  let activeSort = validInitialSort ? { ...validInitialSort } : null;
```

Creates mutable activeSort state for this workflow; it changes as the user selects, edits, or loads records.

### Line 13

```text

```

Blank line separates related statements and has no runtime effect.

### Line 14

```text
  function updateSortIndicators() {
```

Defines the private helper updateSortIndicators for this page; keeping it local prevents unrelated pages from depending on UI details.

### Line 15

```text
    buttons.forEach(button => {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 16

```text
      const header = button.closest('th');
```

Stores header, value; later code reuses this result so the table-sort.mjs workflow stays consistent.

### Line 17

```text
      const isActive = activeSort?.key === header.dataset.sortKey;
```

Stores isActive, value; later code reuses this result so the table-sort.mjs workflow stays consistent.

### Line 18

```text
      const direction = isActive ? activeSort.direction : null;
```

Stores direction, value; later code reuses this result so the table-sort.mjs workflow stays consistent.

### Line 19

```text
      const label = button.querySelector('.table-sort-label')?.textContent.trim() || 'column';
```

Stores label, DOM query used to find the label elements; later code reuses this result so the table-sort.mjs workflow stays consistent.

### Line 20

```text
      const indicator = button.querySelector('.table-sort-indicator');
```

Stores indicator, DOM query used to find the indicator elements; later code reuses this result so the table-sort.mjs workflow stays consistent.

### Line 21

```text

```

Blank line separates related statements and has no runtime effect.

### Line 22

```text
      header.setAttribute('aria-sort', direction || 'none');
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 23

```text
      button.setAttribute('aria-label', direction
```

Calls `button.setAttribute` with "aria-label"; checks `direction` (direction); if true chooses a text template that combines fixed text with computed values `label` (label), `direction` (direction), otherwise a text template that combines fixed text with computed values `label` (label).

### Line 24

```text
        ? `Sort by ${label}, ${direction}`
```

Continues the surrounding table-sort.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 25

```text
        : `Sort by ${label}`);
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 26

```text
      if (indicator) indicator.textContent = direction === 'ascending'
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 27

```text
        ? '↑'
```

Continues the surrounding table-sort.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 28

```text
        : direction === 'descending' ? '↓' : '↕';
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 29

```text
    });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 30

```text
  }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 31

```text

```

Blank line separates related statements and has no runtime effect.

### Line 32

```text
  table.addEventListener('click', event => {
```

Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.

### Line 33

```text
    const button = event.target.closest('.table-sort-button');
```

Stores button, value; later code reuses this result so the table-sort.mjs workflow stays consistent.

### Line 34

```text
    if (!button || !table.contains(button)) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 35

```text
    const header = button.closest('th[data-sort-key]');
```

Stores header, value; later code reuses this result so the table-sort.mjs workflow stays consistent.

### Line 36

```text
    if (!header) return;
```

Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.

### Line 37

```text

```

Blank line separates related statements and has no runtime effect.

### Line 38

```text
    const key = header.dataset.sortKey;
```

Stores key, value; later code reuses this result so the table-sort.mjs workflow stays consistent.

### Line 39

```text
    const direction = activeSort?.key === key && activeSort.direction === 'ascending'
```

Stores direction, value; later code reuses this result so the table-sort.mjs workflow stays consistent.

### Line 40

```text
      ? 'descending'
```

Continues the surrounding table-sort.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.

### Line 41

```text
      : 'ascending';
```

Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 42

```text
    activeSort = { key, direction, type: header.dataset.sortType || 'text' };
```

Sets the activeSort = { key, direction, type property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.

### Line 43

```text
    updateSortIndicators();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 44

```text
    onSort({ ...activeSort });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 45

```text
  });
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 46

```text

```

Blank line separates related statements and has no runtime effect.

### Line 47

```text
  updateSortIndicators();
```

Completes this application statement, applying the shown value or operation to the current page state/data record.

### Line 48

```text
  return {
```

Returns an object with fields state: a callback taking no parameters that runs its enclosed statements to the caller and exits this function.

### Line 49

```text
    get state() {
```

Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.

### Line 50

```text
      return activeSort ? { ...activeSort } : null;
```

Returns checks `activeSort` (active sort); if true chooses an object with fields copied from `activeSort` (active sort), otherwise null to the caller and exits this function.

### Line 51

```text
    }
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 52

```text
  };
```

Closes the surrounding block or callback; no additional operation occurs on this line.

### Line 53

```text
}
```

Closes the surrounding block or callback; no additional operation occurs on this line.

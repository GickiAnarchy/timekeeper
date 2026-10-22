// Original L1: Imports sortTableRows from ./domain.mjs; these helpers provide the domain calculations this module uses.
import { sortTableRows } from './domain.mjs';
// Original L2: Blank line separates related statements and has no runtime effect.

// Original L3: Re-exports the navigation helper so older consumers can keep using the same module path.
export { sortTableRows };
// Original L4: Blank line separates related statements and has no runtime effect.

// Original L5: Declares initializeTableSorting(), which wires sortable table headers and exposes current sort state.
export function initializeTableSorting(table, { initialSort = null, onSort = () => {} } = {}) {
// Original L6: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!table) return null;
// Original L7: Blank line separates related statements and has no runtime effect.

// Original L8: Stores buttons, DOM query used to find the buttons elements; later code reuses this result so the table-sort.mjs workflow stays consistent.
  const buttons = [...table.querySelectorAll('thead th[data-sort-key] .table-sort-button')];
// Original L9: Stores validInitialSort, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the table-sort.mjs workflow stays consistent.
  const validInitialSort = initialSort && buttons.some(button =>
// Original L10: Calls `button.closest` with "th".
    button.closest('th')?.dataset.sortKey === initialSort.key
// Original L11: Sets the ) ? initialSort property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
  ) ? initialSort : null;
// Original L12: Creates mutable activeSort state for this workflow; it changes as the user selects, edits, or loads records.
  let activeSort = validInitialSort ? { ...validInitialSort } : null;
// Original L13: Blank line separates related statements and has no runtime effect.

// Original L14: Defines the private helper updateSortIndicators for this page; keeping it local prevents unrelated pages from depending on UI details.
  function updateSortIndicators() {
// Original L15: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    buttons.forEach(button => {
// Original L16: Stores header, value; later code reuses this result so the table-sort.mjs workflow stays consistent.
      const header = button.closest('th');
// Original L17: Stores isActive, value; later code reuses this result so the table-sort.mjs workflow stays consistent.
      const isActive = activeSort?.key === header.dataset.sortKey;
// Original L18: Stores direction, value; later code reuses this result so the table-sort.mjs workflow stays consistent.
      const direction = isActive ? activeSort.direction : null;
// Original L19: Stores label, DOM query used to find the label elements; later code reuses this result so the table-sort.mjs workflow stays consistent.
      const label = button.querySelector('.table-sort-label')?.textContent.trim() || 'column';
// Original L20: Stores indicator, DOM query used to find the indicator elements; later code reuses this result so the table-sort.mjs workflow stays consistent.
      const indicator = button.querySelector('.table-sort-indicator');
// Original L21: Blank line separates related statements and has no runtime effect.

// Original L22: Completes this application statement, applying the shown value or operation to the current page state/data record.
      header.setAttribute('aria-sort', direction || 'none');
// Original L23: Calls `button.setAttribute` with "aria-label"; checks `direction` (direction); if true chooses a text template that combines fixed text with computed values `label` (label), `direction` (direction), otherwise a text template that combines fixed text with computed values `label` (label).
      button.setAttribute('aria-label', direction
// Original L24: Continues the surrounding table-sort.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
        ? `Sort by ${label}, ${direction}`
// Original L25: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
        : `Sort by ${label}`);
// Original L26: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
      if (indicator) indicator.textContent = direction === 'ascending'
// Original L27: Continues the surrounding table-sort.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
        ? '↑'
// Original L28: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
        : direction === 'descending' ? '↓' : '↕';
// Original L29: Completes this application statement, applying the shown value or operation to the current page state/data record.
    });
// Original L30: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L31: Blank line separates related statements and has no runtime effect.

// Original L32: Registers the event handler so this page recalculates or updates its UI when the relevant user/browser event occurs.
  table.addEventListener('click', event => {
// Original L33: Stores button, value; later code reuses this result so the table-sort.mjs workflow stays consistent.
    const button = event.target.closest('.table-sort-button');
// Original L34: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!button || !table.contains(button)) return;
// Original L35: Stores header, value; later code reuses this result so the table-sort.mjs workflow stays consistent.
    const header = button.closest('th[data-sort-key]');
// Original L36: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
    if (!header) return;
// Original L37: Blank line separates related statements and has no runtime effect.

// Original L38: Stores key, value; later code reuses this result so the table-sort.mjs workflow stays consistent.
    const key = header.dataset.sortKey;
// Original L39: Stores direction, value; later code reuses this result so the table-sort.mjs workflow stays consistent.
    const direction = activeSort?.key === key && activeSort.direction === 'ascending'
// Original L40: Continues the surrounding table-sort.mjs operation with the value or expression on this line; it contributes to the page's timekeeping, billing, payroll, or accessibility behavior.
      ? 'descending'
// Original L41: Sets the  property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
      : 'ascending';
// Original L42: Sets the activeSort = { key, direction, type property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
    activeSort = { key, direction, type: header.dataset.sortType || 'text' };
// Original L43: Completes this application statement, applying the shown value or operation to the current page state/data record.
    updateSortIndicators();
// Original L44: Completes this application statement, applying the shown value or operation to the current page state/data record.
    onSort({ ...activeSort });
// Original L45: Completes this application statement, applying the shown value or operation to the current page state/data record.
  });
// Original L46: Blank line separates related statements and has no runtime effect.

// Original L47: Completes this application statement, applying the shown value or operation to the current page state/data record.
  updateSortIndicators();
// Original L48: Returns an object with fields state: a callback taking no parameters that runs its enclosed statements to the caller and exits this function.
  return {
// Original L49: Opens a scoped callback/object or control-flow block; the following lines perform the operation under this condition.
    get state() {
// Original L50: Returns checks `activeSort` (active sort); if true chooses an object with fields copied from `activeSort` (active sort), otherwise null to the caller and exits this function.
      return activeSort ? { ...activeSort } : null;
// Original L51: Closes the surrounding block or callback; no additional operation occurs on this line.
    }
// Original L52: Closes the surrounding block or callback; no additional operation occurs on this line.
  };
// Original L53: Closes the surrounding block or callback; no additional operation occurs on this line.
}

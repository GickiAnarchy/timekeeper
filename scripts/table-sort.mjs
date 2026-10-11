import { sortTableRows } from './domain.mjs';

export { sortTableRows };

export function initializeTableSorting(table, { initialSort = null, onSort = () => {} } = {}) {
  if (!table) return null;

  const buttons = [...table.querySelectorAll('thead th[data-sort-key] .table-sort-button')];
  const validInitialSort = initialSort && buttons.some(button =>
    button.closest('th')?.dataset.sortKey === initialSort.key
  ) ? initialSort : null;
  let activeSort = validInitialSort ? { ...validInitialSort } : null;

  function updateSortIndicators() {
    buttons.forEach(button => {
      const header = button.closest('th');
      const isActive = activeSort?.key === header.dataset.sortKey;
      const direction = isActive ? activeSort.direction : null;
      const label = button.querySelector('.table-sort-label')?.textContent.trim() || 'column';
      const indicator = button.querySelector('.table-sort-indicator');

      header.setAttribute('aria-sort', direction || 'none');
      button.setAttribute('aria-label', direction
        ? `Sort by ${label}, ${direction}`
        : `Sort by ${label}`);
      if (indicator) indicator.textContent = direction === 'ascending'
        ? '↑'
        : direction === 'descending' ? '↓' : '↕';
    });
  }

  table.addEventListener('click', event => {
    const button = event.target.closest('.table-sort-button');
    if (!button || !table.contains(button)) return;
    const header = button.closest('th[data-sort-key]');
    if (!header) return;

    const key = header.dataset.sortKey;
    const direction = activeSort?.key === key && activeSort.direction === 'ascending'
      ? 'descending'
      : 'ascending';
    activeSort = { key, direction, type: header.dataset.sortType || 'text' };
    updateSortIndicators();
    onSort({ ...activeSort });
  });

  updateSortIndicators();
  return {
    get state() {
      return activeSort ? { ...activeSort } : null;
    }
  };
}

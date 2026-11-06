import { store } from './models.js';

function formatDate(value) {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toLocaleString() : 'Unknown date';
}

function formatAmount(entry) {
  const amount = Number(entry.amount || 0);
  return String(entry.type || '').toLowerCase() === 'advance'
    ? `-$${Math.abs(amount).toFixed(2)}`
    : `$${amount.toFixed(2)}`;
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

document.addEventListener('DOMContentLoaded', async () => {
  const employeeFilter = document.getElementById('archive-employee-filter');
  const archiveList = document.getElementById('ledger-archive-list');
  const archiveStatus = document.getElementById('archive-status');
  const retryButton = document.getElementById('retry-archive-button');

  try {
    await store.init();
  } catch (error) {
    console.error('Unable to load ledger archives:', error);
    archiveStatus.textContent = error.message || 'Unable to load archived ledgers.';
  }

  function populateEmployeeFilter() {
    const previousValue = employeeFilter.value;
    const archivedEmployees = new Map();
    for (const archive of store.ledgerArchives) {
      archivedEmployees.set(String(archive.employeeId), archive.employeeName || 'Unknown employee');
    }
    const employeeOptions = [...archivedEmployees.entries()]
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
    employeeFilter.replaceChildren(new Option('All employees', ''));
    for (const employee of employeeOptions) employeeFilter.add(new Option(employee.name, employee.id));
    if (employeeOptions.some(employee => employee.id === previousValue)) employeeFilter.value = previousValue;
  }

  populateEmployeeFilter();

  function renderArchive() {
    const employeeId = employeeFilter.value;
    const archives = store.ledgerArchives
      .filter(archive => !employeeId || String(archive.employeeId) === employeeId)
      .sort((a, b) => String(b.archivedAt || '').localeCompare(String(a.archivedAt || '')));
    archiveList.replaceChildren();

    if (archives.length === 0) {
      archiveList.appendChild(element('p', 'archive-empty', 'No archived ledgers found for this selection.'));
    }

    for (const archive of archives) {
      const card = element('article', 'archive-card');
      const header = element('header', 'archive-card-heading');
      const headingCopy = element('div', 'archive-card-copy');
      headingCopy.append(
        element('p', 'archive-card-eyebrow', 'SETTLED LEDGER'),
        element('h2', '', archive.employeeName || 'Unknown employee'),
        element('p', 'archive-card-meta', `${formatDate(archive.archivedAt)} · Balance closed at $${(Number(archive.balanceCents || 0) / 100).toFixed(2)} · ${Number(archive.entryCount || 0)} entries`)
      );
      const badge = element('span', `archive-badge${archive.status === 'pending' ? ' is-pending' : ''}`,
        archive.status === 'pending' ? 'Archive pending' : 'Settled');
      header.append(headingCopy, badge);

      const details = document.createElement('details');
      details.className = 'archive-details';
      details.appendChild(element('summary', '', 'View archived entries'));
      const rows = store.ledgerArchiveRows
        .filter(row => row.archiveId === archive.id)
        .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')) || Number(b.index || 0) - Number(a.index || 0));
      const list = element('ol', 'archive-entry-list');
      if (rows.length === 0) {
        list.appendChild(element('li', 'archive-entry-empty', archive.status === 'pending'
          ? 'Entries are being copied into the archive. Use Retry pending archive if this message remains.'
          : 'No entry details are available in this archive.'));
      }
      for (const row of rows) {
        const item = element('li', 'archive-entry');
        const topLine = element('div', 'archive-entry-topline');
        const type = row.sourceShiftId && String(row.type || '').toLowerCase() === 'normal'
          ? 'Shift pay'
          : String(row.type || 'Entry').replace(/^./, letter => letter.toUpperCase());
        topLine.append(element('strong', '', `${row.date || 'Undated'} · ${type}`));
        topLine.append(element('strong', 'archive-entry-amount', formatAmount(row)));
        const detail = element('p', 'archive-entry-detail', `${Number(row.hours || 0).toFixed(2)} hours${row.notes ? ` · ${row.notes}` : ''}`);
        item.append(topLine, detail);
        list.appendChild(item);
      }
      details.appendChild(list);
      card.append(header, details);
      archiveList.appendChild(card);
    }

    const pendingCount = store.ledgerArchives.filter(archive => archive.status === 'pending').length;
    retryButton.hidden = pendingCount === 0;
    archiveStatus.textContent = store.loadFailures.length
      ? 'Some workspace records could not be loaded. Retry the visible connection warning; archived history may be incomplete.'
      : archives.length
        ? `${archives.length} archived ledger${archives.length === 1 ? '' : 's'} shown.${pendingCount ? ` ${pendingCount} archive${pendingCount === 1 ? '' : 's'} pending completion.` : ''}`
        : 'No archived ledgers found.';
  }

  employeeFilter.addEventListener('change', renderArchive);
  retryButton.addEventListener('click', async () => {
    retryButton.disabled = true;
    retryButton.textContent = 'Retrying…';
    try {
      await store.init();
      populateEmployeeFilter();
      archiveStatus.textContent = 'Pending archives completed.';
    } catch (error) {
      console.error('Unable to retry pending ledger archives:', error);
      archiveStatus.textContent = error.message || 'Unable to complete pending archives. Please try again.';
    } finally {
      retryButton.disabled = false;
      retryButton.textContent = 'Retry pending archive';
      renderArchive();
    }
  });

  renderArchive();
});

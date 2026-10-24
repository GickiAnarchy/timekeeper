import {
  store,
  populateEmployeeDropdowns,
  compareByFirstName
} from './models.js';
import { sortLedgerEntriesByDate, sumLedgerHours } from './domain.mjs';
import { initializeTableSorting, sortTableRows } from './table-sort.mjs';

function localDateInputValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function makeCell(text) {
  const cell = document.createElement('td');
  cell.textContent = text ?? '';
  return cell;
}

document.addEventListener('DOMContentLoaded', async () => {
  await store.init();

  const form = document.getElementById('ledger-form');
  const dateInput = document.getElementById('date');
  const typeSelect = document.getElementById('type');
  const hoursInput = document.getElementById('hours');
  const amountInput = document.getElementById('amount');
  const employeeSelect = document.getElementById('employee-select');
  const ledgerFilter = document.getElementById('ledger-employee-filter');
  const shiftLedgerForm = document.getElementById('shift-ledger-form');
  const shiftSelect = document.getElementById('ledger-shift-select');
  const shiftLedgerStatus = document.getElementById('shift-ledger-status');
  const addShiftButton = document.getElementById('add-shift-to-ledger');
  const ledgerEntryStatus = document.getElementById('ledger-entry-status');
  const ledgerOwner = document.getElementById('ledger-owner');
  const tableBody = document.getElementById('ledger-body');
  const totalRow = document.getElementById('ledger-total');
  const hoursTotal = document.getElementById('ledger-hours-total');
  const ledgerTable = document.getElementById('ledger-table');
  const editDialog = document.getElementById('ledger-edit-modal');
  const editForm = document.getElementById('ledger-edit-form');
  const editTitle = document.getElementById('ledger-edit-title');
  const editError = document.getElementById('ledger-edit-error');
  const editSave = document.getElementById('ledger-edit-save');
  const editCancel = document.getElementById('ledger-edit-cancel');
  const editDate = document.getElementById('edit-ledger-date');
  const editType = document.getElementById('edit-ledger-type');
  const editHours = document.getElementById('edit-ledger-hours');
  const editAmount = document.getElementById('edit-ledger-amount');
  const editNotes = document.getElementById('edit-ledger-notes');
  let editingEntryId = null;
  let editingEntryEmployeeId = null;
  let editTrigger = null;
  let ledgerSort = { key: 'date', direction: 'descending', type: 'date' };

  initializeTableSorting(ledgerTable, {
    initialSort: ledgerSort,
    onSort: sort => {
      ledgerSort = sort;
      renderLedger();
    }
  });

  populateEmployeeDropdowns(employeeSelect);
  ledgerFilter.replaceChildren(new Option('Choose an employee', ''));
  for (const employee of [...store.employees.values()].sort(compareByFirstName)) {
    ledgerFilter.add(new Option(employee.name, employee.id));
  }
  const hasUnassignedEntries = store.ledger.entries.some(entry => !entry.employeeId);
  if (hasUnassignedEntries) ledgerFilter.add(new Option('Unassigned legacy entries', 'unassigned'));

  dateInput.value = localDateInputValue();

  function updateTypeInputs() {
    const isHourlyPay = typeSelect.value === 'normal';
    hoursInput.disabled = !isHourlyPay;
    amountInput.disabled = isHourlyPay;
    if (isHourlyPay) amountInput.value = '0';
    else hoursInput.value = '0';
  }
  typeSelect.addEventListener('change', updateTypeInputs);

  function selectedEmployeeId() {
    return ledgerFilter.value === 'unassigned' ? null : ledgerFilter.value;
  }

  function filteredEntries() {
    if (!ledgerFilter.value) return [];
    const employeeId = selectedEmployeeId();
    const entries = store.ledger.entries
      .filter(entry => employeeId ? entry.employeeId === employeeId : !entry.employeeId);
    if (ledgerSort.key === 'date' && ledgerSort.direction === 'descending') {
      return sortLedgerEntriesByDate(entries);
    }
    return sortTableRows(entries, {
      ...ledgerSort,
      getValue: (entry, key) => {
        switch (key) {
          case 'index': return entry.index;
          case 'date': return entry.date;
          case 'type': return entry.type;
          case 'hours': return entry.hours;
          case 'amount': {
            const amount = Number(entry.amount || 0);
            return String(entry.type || '').toLowerCase() === 'advance' ? -Math.abs(amount) : amount;
          }
          case 'notes': return entry.notes;
          default: return '';
        }
      }
    });
  }

  function updateEditTypeInputs() {
    const isHourlyPay = editType.value === 'normal';
    editHours.disabled = !isHourlyPay;
    editAmount.disabled = isHourlyPay;
  }

  function renderShiftOptions(preserveStatus = false) {
    const employeeId = ledgerFilter.value;
    const employee = store.employees.get(employeeId);
    const ledgeredShiftIds = new Set(store.ledger.entries
      .map(entry => String(entry.sourceShiftId || ''))
      .filter(Boolean));
    const availableShifts = employee
      ? store.shifts
        .filter(shift => shift.isComplete && shift.employee?.id === employeeId && !ledgeredShiftIds.has(String(shift.id)))
        .sort((a, b) => (b.clockInTime?.getTime() || 0) - (a.clockInTime?.getTime() || 0))
      : [];

    shiftSelect.replaceChildren(new Option('Choose a completed shift', ''));
    for (const shift of availableShifts) {
      const date = shift.clockInTime?.toLocaleDateString() || 'Unknown date';
      const customer = shift.customer?.name || 'Unknown customer';
      const hours = Number(shift.getPaidHours());
      const hoursLabel = Number.isFinite(hours) ? hours.toFixed(2) : '0.00';
      shiftSelect.add(new Option(`${date} · ${customer} · ${hoursLabel} paid hours`, shift.id));
    }

    shiftSelect.disabled = !employee || availableShifts.length === 0;
    addShiftButton.disabled = shiftSelect.disabled;
    if (!preserveStatus) {
      shiftLedgerStatus.textContent = !employee
        ? 'Choose an employee above to find completed shifts.'
        : availableShifts.length
          ? `${availableShifts.length} completed shift${availableShifts.length === 1 ? '' : 's'} available to add.`
          : 'No completed shifts are available to add for this employee.';
    }
  }

  function renderLedger() {
    renderShiftOptions();
    tableBody.replaceChildren();
    const filterValue = ledgerFilter.value;
    if (!filterValue) {
      const row = document.createElement('tr');
      const message = makeCell('Choose an employee to view their ledger.');
      message.colSpan = 7;
      row.appendChild(message);
      tableBody.appendChild(row);
      ledgerOwner.textContent = 'Choose an employee to view their ledger.';
      totalRow.innerHTML = '<strong>Total: $0.00</strong>';
      hoursTotal.innerHTML = '<strong>0.00</strong>';
      return;
    }

    const employee = store.employees.get(filterValue);
    ledgerOwner.textContent = filterValue === 'unassigned'
      ? 'Legacy entries without an employee assignment'
      : `Ledger for ${employee?.name || 'this employee'}`;

    const entries = filteredEntries();
    if (entries.length === 0) {
      const row = document.createElement('tr');
      const message = makeCell('No entries for this employee yet.');
      message.colSpan = 7;
      row.appendChild(message);
      tableBody.appendChild(row);
    } else {
      entries.forEach(entry => {
        const row = document.createElement('tr');
        const type = String(entry.type || '').toLowerCase();
        const amount = Number(entry.amount || 0);
        const typeLabel = entry.sourceShiftId && type === 'normal'
          ? 'Shift pay'
          : type ? type.charAt(0).toUpperCase() + type.slice(1) : '';
        const amountCell = makeCell(type === 'advance'
          ? `-$${Math.abs(amount).toFixed(2)}`
          : `$${amount.toFixed(2)}`);
        if (type === 'advance') amountCell.classList.add('advance-amount');
        row.append(
          makeCell(entry.index),
          makeCell(entry.date || ''),
          makeCell(typeLabel),
          makeCell(Number(entry.hours || 0).toFixed(2)),
          amountCell,
          makeCell(entry.notes || '')
        );
        const actionCell = document.createElement('td');
        const rowActions = document.createElement('div');
        rowActions.className = 'ledger-row-actions';
        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.className = 'edit-ledger-btn';
        editButton.dataset.id = entry.id;
        editButton.setAttribute('aria-label', `Edit ledger entry ${entry.index}`);
        editButton.textContent = 'Edit';
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'delete-btn';
        deleteButton.dataset.id = entry.id;
        deleteButton.setAttribute('aria-label', `Delete ledger entry ${entry.index}`);
        deleteButton.textContent = 'Delete';
        rowActions.append(editButton, deleteButton);
        actionCell.appendChild(rowActions);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
      });
    }

    const total = entries.reduce((sum, entry) => {
      const amount = Number(entry.amount || 0);
      return sum + (String(entry.type || '').toLowerCase() === 'advance' ? -amount : amount);
    }, 0);
    totalRow.innerHTML = `<strong>Balance: $${total.toFixed(2)}</strong>`;
    const totalHours = sumLedgerHours(entries);
    hoursTotal.innerHTML = `<strong>${totalHours.toFixed(2)}</strong>`;
  }

  ledgerFilter.addEventListener('change', () => {
    if (store.employees.has(ledgerFilter.value)) employeeSelect.value = ledgerFilter.value;
    renderLedger();
  });

  if (store.recentlyArchivedLedgerIds.length) {
    ledgerEntryStatus.textContent = 'A zero-balance ledger was archived. View archived ledger history to review it.';
  }

  shiftLedgerForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!shiftLedgerForm.reportValidity()) return;

    const shiftId = shiftSelect.value;
    ledgerEntryStatus.textContent = '';
    addShiftButton.disabled = true;
    addShiftButton.textContent = 'Adding…';
    shiftLedgerStatus.textContent = 'Adding the shift to the ledger…';
    let entryWasSaved = false;
    try {
      const entry = await store.saveShiftToLedger(shiftId);
      entryWasSaved = true;
      if (ledgerFilter.value !== entry.employeeId) ledgerFilter.value = entry.employeeId;
      employeeSelect.value = entry.employeeId;
      renderLedger();
      shiftLedgerForm.reset();
      shiftLedgerStatus.textContent = 'Shift added to the ledger.';
      if (window.confirm('Shift added to the ledger. Would you like to adjust this ledger entry?')) {
        const trigger = [...tableBody.querySelectorAll('.edit-ledger-btn[data-id]')]
          .find(button => button.dataset.id === entry.id);
        openEditDialog(entry, trigger);
      } else {
        const archive = await store.archiveSettledLedger(entry.employeeId);
        if (archive) {
          renderLedger();
          shiftLedgerStatus.textContent = 'The balance is $0.00. Ledger history was archived.';
          ledgerEntryStatus.textContent = 'Balance settled at $0.00. View archived ledger history to review it.';
        }
      }
    } catch (error) {
      console.error('Unable to add shift to ledger:', error);
      entryWasSaved ||= Boolean(error.entrySaved);
      if (entryWasSaved) {
        shiftLedgerForm.reset();
        renderLedger();
        shiftLedgerStatus.textContent = `Shift was added, but its settled ledger could not be fully archived. ${error.message || ''}`.trim();
      } else {
        shiftLedgerStatus.textContent = error.message || 'Unable to add this shift to the ledger. Please try again.';
      }
    } finally {
      addShiftButton.textContent = 'Add shift to ledger';
      renderShiftOptions(true);
    }
  });

  renderLedger();
  updateTypeInputs();

  function openEditDialog(entry, trigger) {
    if (!editDialog || !editForm || !entry) return;
    editingEntryId = entry.id;
    editingEntryEmployeeId = entry.employeeId;
    editTrigger = trigger;
    editError.textContent = '';
    editTitle.textContent = `Edit ledger entry ${entry.index}`;
    editDate.value = entry.date || '';
    editType.value = String(entry.type || 'normal').toLowerCase();
    editHours.value = String(Number(entry.hours || 0));
    editAmount.value = String(Math.abs(Number(entry.amount || 0)));
    editNotes.value = entry.notes || '';
    updateEditTypeInputs();
    editDialog.showModal();
    editDate.focus();
  }

  editType.addEventListener('change', updateEditTypeInputs);
  editCancel.addEventListener('click', () => editDialog.close());
  editDialog.addEventListener('close', async () => {
    const entryId = editingEntryId;
    const employeeId = editingEntryEmployeeId;
    const trigger = editTrigger;
    editingEntryId = null;
    editingEntryEmployeeId = null;
    editTrigger = null;
    if (employeeId && store.pendingLedgerSettlements.has(String(employeeId))) {
      try {
        const archive = await store.archiveSettledLedger(employeeId);
        if (archive) {
          renderLedger();
          ledgerEntryStatus.textContent = 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.';
        }
      } catch (error) {
        console.error('Unable to archive the settled ledger:', error);
        ledgerEntryStatus.textContent = error.message || 'The ledger is settled, but archiving is pending. Retry from Ledger archive.';
      }
    }
    if (trigger?.isConnected) {
      trigger.focus();
      return;
    }
    const replacementTrigger = [...tableBody.querySelectorAll('.edit-ledger-btn[data-id]')]
      .find(button => button.dataset.id === entryId);
    (replacementTrigger || ledgerFilter).focus();
  });

  editForm.addEventListener('submit', async event => {
    event.preventDefault();
    editError.textContent = '';
    if (!editForm.reportValidity() || !editingEntryId) return;

    const entry = store.ledger.getEntry(editingEntryId);
    if (!entry) {
      editError.textContent = 'This ledger entry could not be found. Close the dialog and try again.';
      return;
    }

    const type = editType.value;
    const updates = {
      date: editDate.value,
      type,
      notes: editNotes.value.trim()
    };
    if (type === 'normal') {
      const hours = Number(editHours.value);
      if (!Number.isFinite(hours) || hours < 0) {
        editError.textContent = 'Hours must be a valid number of zero or more.';
        editHours.focus();
        return;
      }
      updates.hours = hours;
      const employee = entry.employeeId ? store.employees.get(entry.employeeId) : null;
      updates.amount = employee ? employee.getPay(hours) : Number(entry.amount || 0);
    } else {
      const amount = Number(editAmount.value);
      if (!Number.isFinite(amount) || amount < 0) {
        editError.textContent = 'Amount must be a valid number of zero or more.';
        editAmount.focus();
        return;
      }
      updates.amount = amount;
      if (String(entry.type || '').toLowerCase() === 'normal') updates.hours = 0;
    }

    editSave.disabled = true;
    editSave.textContent = 'Saving…';
    try {
      const updatedEntry = await store.updateLedgerEntry(editingEntryId, updates);
      renderLedger();
      if (updatedEntry.archivedOnZero) {
        ledgerEntryStatus.textContent = 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.';
      }
      editDialog.close();
    } catch (error) {
      console.error('Unable to update ledger entry:', error);
      if (error.entrySaved) {
        renderLedger();
        ledgerEntryStatus.textContent = error.message;
        editDialog.close();
        return;
      }
      editError.textContent = error.message || 'Unable to save changes. Please try again.';
    } finally {
      editSave.disabled = false;
      editSave.textContent = 'Save changes';
    }
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    ledgerEntryStatus.textContent = '';
    const employeeId = employeeSelect.value;
    const employee = store.employees.get(employeeId);
    if (!employee) {
      window.alert('Choose an employee before adding a ledger entry.');
      return;
    }

    const type = typeSelect.value;
    const notes = document.getElementById('notes').value.trim();
    let hours = 0;
    let amount = 0;
    if (type === 'normal') {
      hours = Number(hoursInput.value);
      if (!Number.isFinite(hours) || hours < 0) {
        window.alert('Hours must be a valid number of zero or more.');
        return;
      }
      amount = employee.getPay(hours);
    } else {
      amount = Number(amountInput.value);
      if (!Number.isFinite(amount) || amount < 0) {
        window.alert('Amount must be a valid number of zero or more.');
        return;
      }
    }

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    try {
      const entry = await store.saveLedgerEntry({
        employeeId,
        date: dateInput.value,
        type,
        hours,
        amount,
        notes
      });
      if (ledgerFilter.value !== employeeId) ledgerFilter.value = employeeId;
      renderLedger();
      form.reset();
      dateInput.value = localDateInputValue();
      typeSelect.value = 'normal';
      updateTypeInputs();
      employeeSelect.value = employeeId;
      ledgerEntryStatus.textContent = entry.archivedOnZero
        ? 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.'
        : '';
    } catch (error) {
      console.error('Unable to save ledger entry:', error);
      if (error.entrySaved) {
        form.reset();
        dateInput.value = localDateInputValue();
        typeSelect.value = 'normal';
        updateTypeInputs();
        employeeSelect.value = employeeId;
        if (ledgerFilter.value !== employeeId) ledgerFilter.value = employeeId;
        renderLedger();
        ledgerEntryStatus.textContent = error.message;
        return;
      }
      window.alert(error.message || 'Unable to save this ledger entry. Please try again.');
    } finally {
      submitButton.disabled = false;
    }
  });

  tableBody.addEventListener('click', async event => {
    const editButton = event.target.closest('.edit-ledger-btn[data-id]');
    if (editButton) {
      const entry = store.ledger.getEntry(editButton.dataset.id);
      openEditDialog(entry, editButton);
      return;
    }
    const button = event.target.closest('.delete-btn[data-id]');
    if (!button) return;
    button.disabled = true;
    const previousArchiveCount = store.recentlyArchivedLedgerIds.length;
    try {
      await store.deleteLedgerEntry(button.dataset.id);
      renderLedger();
      if (store.recentlyArchivedLedgerIds.length > previousArchiveCount) {
        ledgerEntryStatus.textContent = 'Balance settled at $0.00. Ledger history was archived; view it in Ledger archive.';
      }
    } catch (error) {
      console.error('Unable to delete ledger entry:', error);
      if (error.entrySaved) {
        renderLedger();
        ledgerEntryStatus.textContent = error.message;
        return;
      }
      button.disabled = false;
      window.alert('This ledger entry could not be deleted. Please try again.');
    }
  });
});

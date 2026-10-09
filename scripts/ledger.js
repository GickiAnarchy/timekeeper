import {
  store,
  populateEmployeeDropdowns,
  compareByFirstName,
  enableAutoScrollOnFocus
} from './models.js';

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
  enableAutoScrollOnFocus();

  const form = document.getElementById('ledger-form');
  const dateInput = document.getElementById('date');
  const typeSelect = document.getElementById('type');
  const hoursInput = document.getElementById('hours');
  const amountInput = document.getElementById('amount');
  const employeeSelect = document.getElementById('employee-select');
  const ledgerFilter = document.getElementById('ledger-employee-filter');
  const ledgerOwner = document.getElementById('ledger-owner');
  const tableBody = document.getElementById('ledger-body');
  const totalRow = document.getElementById('ledger-total');

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
    return store.ledger.entries
      .filter(entry => employeeId ? entry.employeeId === employeeId : !entry.employeeId)
      .sort((a, b) => Number(a.index || 0) - Number(b.index || 0));
  }

  function renderLedger() {
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
        const typeLabel = type ? type.charAt(0).toUpperCase() + type.slice(1) : '';
        row.append(
          makeCell(entry.index),
          makeCell(entry.date || ''),
          makeCell(typeLabel),
          makeCell(Number(entry.hours || 0).toFixed(2)),
          makeCell(`$${amount.toFixed(2)}`),
          makeCell(entry.notes || '')
        );
        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'delete-btn';
        deleteButton.dataset.id = entry.id;
        deleteButton.textContent = 'Delete';
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
      });
    }

    const total = entries.reduce((sum, entry) => {
      const amount = Number(entry.amount || 0);
      return sum + (String(entry.type || '').toLowerCase() === 'advance' ? -amount : amount);
    }, 0);
    totalRow.innerHTML = `<strong>Balance: $${total.toFixed(2)}</strong>`;
  }

  ledgerFilter.addEventListener('change', () => {
    if (store.employees.has(ledgerFilter.value)) employeeSelect.value = ledgerFilter.value;
    renderLedger();
  });
  renderLedger();
  updateTypeInputs();

  form.addEventListener('submit', async event => {
    event.preventDefault();
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
      hours = Number(hoursInput.value) || 0;
      if (hours < 0) {
        window.alert('Hours must be zero or more.');
        return;
      }
      amount = employee.getPay(hours);
    } else {
      amount = Number(amountInput.value) || 0;
      if (amount < 0) {
        window.alert('Amount must be zero or more.');
        return;
      }
    }

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    try {
      await store.saveLedgerEntry({
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
    } catch (error) {
      console.error('Unable to save ledger entry:', error);
      window.alert(error.message || 'Unable to save this ledger entry. Please try again.');
    } finally {
      submitButton.disabled = false;
    }
  });

  tableBody.addEventListener('click', async event => {
    const button = event.target.closest('.delete-btn[data-id]');
    if (!button) return;
    button.disabled = true;
    try {
      await store.deleteLedgerEntry(button.dataset.id);
      renderLedger();
    } catch (error) {
      console.error('Unable to delete ledger entry:', error);
      button.disabled = false;
      window.alert('This ledger entry could not be deleted. Please try again.');
    }
  });
});

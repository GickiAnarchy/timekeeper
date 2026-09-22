import { store, populateEmployeeDropdowns } from './models.js';

document.addEventListener('DOMContentLoaded', async () => {
  await store.init();

  const form = document.getElementById('ledger-form');
  const dateInput = document.getElementById('date');
  const typeSelect = document.getElementById('type');
  const hoursInput = document.getElementById('hours');
  const amountInput = document.getElementById('amount');
  const empSelect = document.getElementById('employee-select');
  const tableBody = document.getElementById('ledger-body');
  const totalRow = document.getElementById('ledger-total');

  // Populate employee dropdown if present in the HTML
  if (empSelect) {
    populateEmployeeDropdowns(empSelect);
  }

  // Set default date to today (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;

  // Toggle input availability based on type selected
  typeSelect.addEventListener('change', () => {
    if (typeSelect.value === 'normal') {
      hoursInput.disabled = false;
      amountInput.disabled = true;
      amountInput.value = '0';
    } else {
      hoursInput.disabled = true;
      hoursInput.value = '0';
      amountInput.disabled = false;
    }
  });

  // Render all entries stored in the Ledger instance
  const renderLedger = () => {
    tableBody.innerHTML = '';
    let runningTotal = 0;
    
    totalRow.innerHTML = "";

    store.ledger.entries.forEach((entry) => {
      const type = (entry.type || '').toLowerCase();
      const amount = Number(entry.amount || 0);

      if (type === 'normal') {
        runningTotal += amount;
      } else if (type === 'advance') {
        runningTotal -= amount;
      }

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.index}</td>
        <td>${entry.date || ''}</td>
        <td>${type ? type.charAt(0).toUpperCase() + type.slice(1) : ''}</td>
        <td>${entry.hours || 0}</td>
        <td>$${amount.toFixed(2)}</td>
        <td colspan="2">${entry.notes || ''}</td>
        <td><button type="button" class="delete-btn" data-id="${entry.id}">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
    totalRow.innerHTML = `<td>Total: $${store.ledger.getTotal()}</td>`;
  };

  // Initial render of saved entries
  renderLedger();

  // Handle Form Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const date = dateInput.value;
    const type = typeSelect.value;
    const notes = document.getElementById('notes').value;

    let hours = 0;
    let amount = 0;

    if (type === 'normal') {
      hours = parseFloat(hoursInput.value) || 0;
      
      // Use selected employee wage if available, fallback to 15
      let wage = 15;
      if (empSelect && empSelect.value) {
        const emp = store.employees.get(empSelect.value);
        if (emp) wage = emp.wage;
      }
      
      amount = hours * wage;
    } else if (type === 'advance') {
      hours = 0;
      amount = parseFloat(amountInput.value) || 0;
    }

    // Save to Firestore & Store
    await store.saveLedgerEntry({
      date,
      type,
      hours,
      amount,
      notes
    });

    // Re-render UI table
    renderLedger();

    // Reset form fields
    form.reset();
    dateInput.value = today;
    typeSelect.dispatchEvent(new Event('change'));
  });

  // Handle Deletions
  tableBody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const id = e.target.getAttribute('data-id');
      if (id) {
        await store.deleteLedgerEntry(id);
        renderLedger();
      }
    }
  });
});

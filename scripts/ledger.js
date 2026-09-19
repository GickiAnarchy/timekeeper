import { store, populateEmployeeDropdowns } from './models.js';

document.addEventListener('DOMContentLoaded', async () => {
  await store.init();

  let runningTotal = 0;

  const form = document.getElementById('ledger-form');
  const dateInput = document.getElementById('date');
  const typeSelect = document.getElementById('type');
  const hoursInput = document.getElementById('hours');
  const amountInput = document.getElementById('amount');
  const tableBody = document.getElementById('ledger-body');

  // Set default date to today (YYYY-MM-DD format)
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

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = dateInput.value;
    const type = typeSelect.value;
    const notes = document.getElementById('notes').value;

    let hours = 0;
    let amount = 0;

    if (type === 'normal') {
      hours = parseFloat(hoursInput.value) || 0;
      amount = hours * 15;
      runningTotal += amount;
    } else if (type === 'advance') {
      hours = 0;
      amount = parseFloat(amountInput.value) || 0;
      runningTotal -= amount;
    }

    // Append new row to table
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${date}</td>
      <td>${type.charAt(0).toUpperCase() + type.slice(1)}</td>
      <td>${hours}</td>
      <td>$${amount.toFixed(2)}</td>
      <td>$${runningTotal.toFixed(2)}</td>
      <td>${notes}</td>
    `;
    tableBody.appendChild(row);

    // Reset form fields
    form.reset();
    dateInput.value = today;
    typeSelect.dispatchEvent(new Event('change'));
  });
});

});

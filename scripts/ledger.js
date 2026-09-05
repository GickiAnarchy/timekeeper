import { store, populateEmployeeDropdowns } from './models.js';

document.addEventListener('DOMContentLoaded', async () => {
  await store.init();

  const empSelect = document.getElementById('ledger-emp-select');
  const totalEarnedEl = document.getElementById('total-earned');
  const totalPaidEl = document.getElementById('total-paid');
  const balanceOwedEl = document.getElementById('balance-owed');
  const totalMoney = document.getElementById('total-money');
  const shiftsTbody = document.getElementById('shifts-tbody');
  const payAmountInput = document.getElementById('pay-amount');
  const payNoteInput = document.getElementById('pay-note');
  const recordPayBtn = document.getElementById('record-pay-btn');

  populateEmployeeDropdowns(empSelect);

  function renderLedger() {
    const employeeId = empSelect.value;
    shiftsTbody.innerHTML = '';

    if (!employeeId) {
      totalEarnedEl.textContent = '0.00';
      totalPaidEl.textContent = '0.00';
      balanceOwedEl.textContent = '0.00';
      if (totalMoney) totalMoney.textContent = '$0.00';
      return;
    }

    const { shifts, payments, totalEarned, totalPaid, balanceOwed } = store.getEmployeeLedger(employeeId);

    totalEarnedEl.textContent = totalEarned.toFixed(2);
    totalPaidEl.textContent = totalPaid.toFixed(2);
    balanceOwedEl.textContent = balanceOwed.toFixed(2);
    if (totalMoney) totalMoney.textContent = `$${balanceOwed.toFixed(2)}`;

    // Map shifts and payments into a unified timeline array
    const timeline = [
      ...shifts.map(s => ({
        type: 'shift',
        date: s.clockInTime ? new Date(s.clockInTime) : new Date(0),
        data: s
      })),
      ...payments.map(p => ({
        type: 'payment',
        date: p.date ? new Date(p.date) : new Date(0),
        data: p
      }))
    ];

    // Sort entries chronologically by date
    timeline.sort((a, b) => a.date - b.date);

    timeline.forEach(item => {
      const tr = document.createElement('tr');
      const dateStr = item.date.getTime() !== 0 ? item.date.toLocaleDateString() : 'N/A';

      if (item.type === 'shift') {
        const shift = item.data;
        tr.innerHTML = `
          <td>${dateStr}</td>
          <td>${shift.customer ? shift.customer.name : 'Unknown'}</td>
          <td>${shift.getHoursWorked()} hrs</td>
          <td style="color: green;">+$${shift.getShiftPay().toFixed(2)}</td>
          <td>---</td>
        `;
      } else {
        const payment = item.data;
        tr.className = 'payment-row';
        tr.innerHTML = `
          <td>${dateStr}</td>
          <td><strong>Payment Advance</strong></td>
          <td>${payment.note || 'No note'}</td>
          <td style="color: red;">-$${payment.amount.toFixed(2)}</td>
          <td><button type="button" class="delete-pay-btn" data-id="${payment.id}">Delete</button></td>
        `;
      }
      shiftsTbody.appendChild(tr);
    });
  }

  // Delegated click listener for payment deletion
  shiftsTbody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-pay-btn')) {
      const paymentId = e.target.getAttribute('data-id');
      if (confirm('Are you sure you want to delete this payment record?')) {
        await store.deletePayment(paymentId);
        renderLedger();
      }
    }
  });

  empSelect.addEventListener('change', renderLedger);

  recordPayBtn.addEventListener('click', async () => {
    const employeeId = empSelect.value;
    const amount = parseFloat(payAmountInput.value);
    const note = payNoteInput.value;

    if (!employeeId) {
      alert('Please select an employee.');
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    await store.addPayment(employeeId, amount, note);
    payAmountInput.value = '';
    payNoteInput.value = '';
    renderLedger();
  });
});

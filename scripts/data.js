import { store } from './models.js';

document.addEventListener('DOMContentLoaded', async () => {
  await store.init();

  const empList = document.getElementById('emp-list');
  const empForm = document.getElementById('add-emp-form');
  const empName = document.getElementById('emp-name');
  const empWage = document.getElementById('emp-wage');

  const custList = document.getElementById('cust-list');
  const custForm = document.getElementById('add-cust-form');
  const custName = document.getElementById('cust-name');
  const custLoc = document.getElementById('cust-loc');
  const custNote = document.getElementById('cust-note');
  const custBillingRate = document.getElementById('cust-billing-rate');

  function renderEmpList() {
    if (!empList) return;

    empList.replaceChildren();
    if (store.employees.size === 0) {
      const empty = document.createElement('li');
      empty.className = 'empty-list emp-item';
      empty.textContent = 'No Employees';
      empList.appendChild(empty);
      return;
    }

    store.employees.forEach((emp) => {
      const li = document.createElement('li');
      li.className = 'emp-item';
      const summary = document.createElement('p');
      summary.textContent = `${emp.name} - $${emp.wage}`;

      const actions = document.createElement('div');
      actions.className = 'item-actions';
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'del-btn';
      deleteButton.dataset.id = emp.id;
      deleteButton.setAttribute('aria-label', `Delete ${emp.name}`);
      deleteButton.textContent = 'Delete';
      actions.append(deleteButton);
      li.append(summary, actions);
      empList.appendChild(li);
    });
  }

  function renderCustList() {
    if (!custList) return;

    custList.replaceChildren();
    if (store.customers.size === 0) {
      const empty = document.createElement('li');
      empty.className = 'empty-list cust-item';
      empty.textContent = 'No Customers';
      custList.appendChild(empty);
      return;
    }

    store.customers.forEach((cust) => {
      const li = document.createElement('li');
      li.className = 'cust-item';
      const copy = document.createElement('div');
      copy.className = 'cust-copy';
      const name = document.createElement('p');
      name.className = 'customer-name';
      name.textContent = `${cust.name}${cust.location ? ` · ${cust.location}` : ''}`;
      copy.appendChild(name);
      if (cust.note) {
        const note = document.createElement('p');
        note.className = 'customer-note';
        note.textContent = cust.note;
        copy.appendChild(note);
      }

      const actions = document.createElement('div');
      actions.className = 'item-actions';
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'del-btn';
      deleteButton.dataset.id = cust.id;
      deleteButton.setAttribute('aria-label', `Delete ${cust.name}`);
      deleteButton.textContent = 'Delete';
      actions.append(deleteButton);
      li.append(copy, actions);
      custList.appendChild(li);
    });
  }

  empForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = empName.value.trim();
    const wage = Number(empWage.value);
    if (!name || !Number.isFinite(wage) || wage < 0) {
      alert('Please enter a valid name and non-negative wage.');
      return;
    }
    if (name === 'Export') {
      empForm.reset();
      return;
    }

    try {
      const employee = await store.addEmployee(name, wage);
      if (!employee) {
        alert('An employee with that name already exists.');
        return;
      }
      empForm.reset();
      renderEmpList();
    } catch (error) {
      alert(error.message || 'Unable to add this employee. Please try again.');
    }
  });

  empList?.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-id]');
    if (!button) return;
    if (button.classList.contains('del-btn') && confirm('Are you sure you want to delete this employee?')) {
      try {
        await store.deleteEmployee(button.dataset.id);
        renderEmpList();
      } catch (error) {
        alert(error.message || 'Unable to delete this employee. Please try again.');
      }
    }
  });

  custForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = custName.value.trim();
    const location = custLoc.value.trim();
    const note = custNote ? custNote.value : '';
    const billingRate = custBillingRate?.value === '' ? null : Number(custBillingRate?.value);
    if (!name || !location || (billingRate !== null && (!Number.isFinite(billingRate) || billingRate < 0))) {
      alert('Please enter a valid name, location, and non-negative hourly billing rate.');
      return;
    }

    try {
      const customer = await store.addCustomer(name, location, note, billingRate);
      if (!customer) {
        alert('A customer with that name and location already exists.');
        return;
      }
      custForm.reset();
      renderCustList();
    } catch (error) {
      alert(error.message || 'Unable to save this customer. Please try again.');
    }
  });

  custList?.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-id]');
    if (!button) return;
    if (button.classList.contains('del-btn') && confirm('Are you sure you want to delete this customer?')) {
      try {
        await store.deleteCustomer(button.dataset.id);
        renderCustList();
      } catch (error) {
        alert(error.message || 'Unable to delete this customer. Please try again.');
      }
    }
  });

  renderEmpList();
  renderCustList();
});

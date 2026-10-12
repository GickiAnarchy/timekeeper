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

  const editModal = document.getElementById('people-edit-modal');
  const editForm = document.getElementById('people-edit-form');
  const editEyebrow = document.getElementById('people-edit-eyebrow');
  const editTitle = document.getElementById('people-edit-title');
  const editHelp = document.getElementById('people-edit-help');
  const editError = document.getElementById('people-edit-error');
  const editSave = document.getElementById('people-edit-save');
  const editCancel = document.getElementById('people-edit-cancel');
  const employeeFields = document.getElementById('employee-edit-fields');
  const customerFields = document.getElementById('customer-edit-fields');
  const editEmpName = document.getElementById('edit-emp-name');
  const editEmpWage = document.getElementById('edit-emp-wage');
  const editCustName = document.getElementById('edit-cust-name');
  const editCustLocation = document.getElementById('edit-cust-location');
  const editCustBillingRate = document.getElementById('edit-cust-billing-rate');
  const editCustNote = document.getElementById('edit-cust-note');

  let editingType = null;
  let editingId = null;
  let editTrigger = null;

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
      const editButton = document.createElement('button');
      editButton.type = 'button';
      editButton.className = 'edit-btn';
      editButton.dataset.id = emp.id;
      editButton.setAttribute('aria-label', `Edit ${emp.name}`);
      editButton.textContent = 'Edit';
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'del-btn';
      deleteButton.dataset.id = emp.id;
      deleteButton.setAttribute('aria-label', `Delete ${emp.name}`);
      deleteButton.textContent = 'Delete';
      actions.append(editButton, deleteButton);
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
      const editButton = document.createElement('button');
      editButton.type = 'button';
      editButton.className = 'edit-btn';
      editButton.dataset.id = cust.id;
      editButton.setAttribute('aria-label', `Edit ${cust.name}`);
      editButton.textContent = 'Edit';
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'del-btn';
      deleteButton.dataset.id = cust.id;
      deleteButton.setAttribute('aria-label', `Delete ${cust.name}`);
      deleteButton.textContent = 'Delete';
      actions.append(editButton, deleteButton);
      li.append(copy, actions);
      custList.appendChild(li);
    });
  }

  function openEditModal(type, id, trigger) {
    const isEmployee = type === 'employee';
    const record = isEmployee ? store.employees.get(id) : store.customers.get(id);
    if (!record || !editModal) return;

    editingType = type;
    editingId = id;
    editTrigger = trigger;
    editError.textContent = '';
    editForm.reset();

    employeeFields.hidden = !isEmployee;
    employeeFields.disabled = !isEmployee;
    customerFields.hidden = isEmployee;
    customerFields.disabled = isEmployee;

    if (isEmployee) {
      editEyebrow.textContent = 'EMPLOYEE PROFILE';
      editTitle.textContent = 'Edit employee';
      editHelp.textContent = 'Update this team member’s name and wage. Changes are saved to shared records.';
      editEmpName.value = record.name;
      editEmpWage.value = String(record.wage);
    } else {
      editEyebrow.textContent = 'CUSTOMER PROFILE';
      editTitle.textContent = 'Edit customer';
      editHelp.textContent = 'Update this customer’s details and billing information. Changes are saved to shared records.';
      editCustName.value = record.name;
      editCustLocation.value = record.location || '';
      editCustBillingRate.value = record.billingRate === null || record.billingRate === undefined
        ? ''
        : String(record.billingRate);
      editCustNote.value = record.note || '';
    }

    editModal.showModal();
    (isEmployee ? editEmpName : editCustName).focus();
  }

  editModal?.addEventListener('close', () => {
    const type = editingType;
    const id = editingId;
    const trigger = editTrigger;
    editingType = null;
    editingId = null;
    editTrigger = null;

    if (trigger?.isConnected) {
      trigger.focus();
      return;
    }
    const list = type === 'employee' ? empList : custList;
    const replacement = [...(list?.querySelectorAll('.edit-btn') || [])]
      .find(button => button.dataset.id === id);
    replacement?.focus();
  });

  editCancel?.addEventListener('click', () => editModal.close());

  editForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    editError.textContent = '';
    if (!editForm.reportValidity()) return;

    editSave.disabled = true;
    editSave.textContent = 'Saving…';
    try {
      if (editingType === 'employee') {
        await store.updateEmployee(editingId, editEmpName.value, editEmpWage.value);
        renderEmpList();
      } else if (editingType === 'customer') {
        const billingRate = editCustBillingRate.value === '' ? null : Number(editCustBillingRate.value);
        await store.updateCustomer(
          editingId,
          editCustName.value,
          editCustLocation.value,
          editCustNote.value,
          billingRate
        );
        renderCustList();
      } else {
        return;
      }
      editModal.close();
    } catch (error) {
      editError.textContent = error.message || 'Unable to save changes. Please try again.';
    } finally {
      editSave.disabled = false;
      editSave.textContent = 'Save changes';
    }
  });

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
    if (button.classList.contains('edit-btn')) {
      openEditModal('employee', button.dataset.id, button);
      return;
    }
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
    if (button.classList.contains('edit-btn')) {
      openEditModal('customer', button.dataset.id, button);
      return;
    }
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

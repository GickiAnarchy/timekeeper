import { store } from './models.js';

document.addEventListener('DOMContentLoaded', async () => {
  await store.init();

  const empList = document.getElementById('emp-list');
  const empForm = document.getElementById('add-emp-form');
  const empName = document.getElementById('emp-name');
  const custList = document.getElementById('cust-list');
  const custForm = document.getElementById('add-cust-form');
  const custName = document.getElementById('cust-name');
  const custLoc = document.getElementById('cust-loc');
  const custNote = document.getElementById('cust-note');

  function renderPeopleList(list, records, emptyClass, itemClass, renderRecord, emptyMessage) {
    if (!list) return;
    list.replaceChildren();
    if (!records.length) {
      const empty = document.createElement('li');
      empty.className = `empty-list ${emptyClass}`;
      empty.textContent = emptyMessage;
      list.appendChild(empty);
      return;
    }
    records.forEach(record => {
      const item = document.createElement('li');
      item.className = itemClass;
      const copy = renderRecord(record);
      const actions = document.createElement('div');
      actions.className = 'item-actions';
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'del-btn';
      deleteButton.dataset.id = record.id;
      deleteButton.setAttribute('aria-label', `Delete ${record.name}`);
      deleteButton.textContent = 'Delete';
      actions.appendChild(deleteButton);
      item.append(copy, actions);
      list.appendChild(item);
    });
  }

  function renderEmpList() {
    renderPeopleList(empList, [...store.employees.values()], 'emp-item', 'emp-item', employee => {
      const summary = document.createElement('p');
      summary.textContent = employee.name;
      return summary;
    }, 'No employees yet. Add one to enable clock-in.');
  }

  function renderCustList() {
    renderPeopleList(custList, [...store.customers.values()], 'cust-item', 'cust-item', customer => {
      const copy = document.createElement('div');
      copy.className = 'cust-copy';
      const name = document.createElement('p');
      name.className = 'customer-name';
      name.textContent = `${customer.name}${customer.location ? ` · ${customer.location}` : ''}`;
      copy.appendChild(name);
      if (customer.note) {
        const note = document.createElement('p');
        note.className = 'customer-note';
        note.textContent = customer.note;
        copy.appendChild(note);
      }
      return copy;
    }, 'No customers yet. Add a job site to enable clock-in.');
  }

  empForm?.addEventListener('submit', async event => {
    event.preventDefault();
    const name = empName.value.trim();
    if (!name) {
      alert('Please enter an employee name.');
      return;
    }
    try {
      const employee = await store.addEmployee(name);
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

  empList?.addEventListener('click', async event => {
    const button = event.target.closest('button[data-id]');
    if (!button || !button.classList.contains('del-btn')) return;
    if (!confirm('Are you sure you want to delete this employee?')) return;
    try {
      await store.deleteEmployee(button.dataset.id);
      renderEmpList();
    } catch (error) {
      alert(error.message || 'Unable to delete this employee. Please try again.');
    }
  });

  custForm?.addEventListener('submit', async event => {
    event.preventDefault();
    const name = custName.value.trim();
    const location = custLoc.value.trim();
    const note = custNote?.value || '';
    if (!name || !location) {
      alert('Please enter a customer name and job-site location.');
      return;
    }
    try {
      const customer = await store.addCustomer(name, location, note, null);
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

  custList?.addEventListener('click', async event => {
    const button = event.target.closest('button[data-id]');
    if (!button || !button.classList.contains('del-btn')) return;
    if (!confirm('Are you sure you want to delete this customer?')) return;
    try {
      await store.deleteCustomer(button.dataset.id);
      renderCustList();
    } catch (error) {
      alert(error.message || 'Unable to delete this customer. Please try again.');
    }
  });

  renderEmpList();
  renderCustList();
});

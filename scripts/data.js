import { store } from './models.js';

document.addEventListener('DOMContentLoaded', async () => {
  await store.init();

/*
  EMPLOYEE
*/

  const empList = document.getElementById('emp-list');
  const empForm = document.getElementById('add-emp-form');
  const empName = document.getElementById('emp-name');
  const empWage = document.getElementById('emp-wage');
  
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
      const divider = document.createElement('hr');
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'del-btn';
      deleteButton.dataset.id = emp.id;
      deleteButton.textContent = 'Delete';
      li.append(summary, divider, deleteButton);
      empList.appendChild(li);
    });
  }
  
  renderEmpList();
  
  // Handle form submit instead of button click to prevent page reload
  if (empForm) {
    empForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevents page refresh
      
      const eName = empName.value.trim();
      const eWage = parseFloat(empWage.value);

      if (!eName || isNaN(eWage)) {
        alert('Please enter a valid name and wage.');
        return;
      }
      
      if (eName === "Export") {
        //Export Data Here
        empForm.reset();
        return;
      }

      await store.addEmployee(eName, eWage);
      empForm.reset();
      renderEmpList();
    });
    
    empList?.addEventListener('click', async (ee) => {
      const empID = ee.target.getAttribute('data-id');
      if (!empID) return;
      
      if (ee.target.classList.contains('del-btn')) {
        if (confirm('Are you sure you want to delete this employee?')) {
          await store.deleteEmployee(empID);
          renderEmpList();
        }
      }
    });
  } // end empForm if statement
  
  /*
    CUSTOMER
  */
  
  const custList = document.getElementById('cust-list');
  const custForm = document.getElementById('add-cust-form');
  const custName = document.getElementById('cust-name');
  const custLoc = document.getElementById('cust-loc');
  const custNote = document.getElementById('cust-note');
  const custBillingRate = document.getElementById('cust-billing-rate');

  function renderCustList() {
    if (!custList) return;

    custList.replaceChildren();

    if (store.customers.size === 0) {
      const empty = document.createElement('li');
      empty.className = 'empty-list cust-item';
      empty.textContent = 'No Customers - none';
      custList.appendChild(empty);
      return;
    }

    store.customers.forEach((cust) => {
      const li = document.createElement('li');
      li.className = 'cust-item';
      const copy = document.createElement('div');
      copy.className = 'cust-copy';
      const name = document.createElement('p');
      name.textContent = `${cust.name}${cust.location ? ` · ${cust.location}` : ''}`;
      const note = document.createElement('p');
      note.textContent = cust.note || '';
      copy.append(name, note);

      const actions = document.createElement('div');
      actions.className = 'customer-actions';
      const rateForm = document.createElement('form');
      rateForm.className = 'customer-rate-form';
      rateForm.dataset.customerRateForm = 'true';
      rateForm.dataset.customerId = cust.id;
      const rateLabel = document.createElement('label');
      rateLabel.textContent = 'Hourly billing rate ($/h)';
      const rateInput = document.createElement('input');
      rateInput.type = 'number';
      rateInput.min = '0';
      rateInput.step = '0.01';
      rateInput.required = true;
      rateInput.value = cust.billingRate === null || cust.billingRate === undefined ? '' : String(cust.billingRate);
      rateInput.setAttribute('aria-label', `Hourly billing rate for ${cust.name}`);
      rateLabel.appendChild(rateInput);
      const rateStatus = document.createElement('small');
      rateStatus.className = 'rate-status';
      rateStatus.textContent = cust.billingRate === null || cust.billingRate === undefined
        ? 'Rate not set'
        : `Current: $${Number(cust.billingRate).toFixed(2)}/h`;
      const saveRate = document.createElement('button');
      saveRate.type = 'submit';
      saveRate.className = 'btn btn-primary';
      saveRate.textContent = 'Save rate';
      rateForm.append(rateLabel, rateStatus, saveRate);

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'del-btn';
      deleteButton.dataset.id = cust.id;
      deleteButton.textContent = 'Delete';
      actions.append(rateForm, deleteButton);
      li.append(copy, actions);
      custList.appendChild(li);
    });
  }
  
  renderCustList();
  
  if (custForm) {
    custForm.addEventListener('submit', async (c) => {
      c.preventDefault(); // Prevents page refresh
      
      const cName = custName.value;
      const cLoc = custLoc.value;
      const cNote = custNote ? custNote.value : '';
      const billingRate = custBillingRate?.value === '' ? null : Number(custBillingRate?.value);
      
      if (!cName || !cLoc || (billingRate !== null && (!Number.isFinite(billingRate) || billingRate < 0))) {
        alert('Please enter a valid name, location, and non-negative hourly billing rate.');
        return;
      }
      
      try {
        await store.addCustomer(cName, cLoc, cNote, billingRate);
        custForm.reset();
        renderCustList();
      } catch (error) {
        alert(error.message || 'Unable to save this customer. Please try again.');
      }
    });

    custList?.addEventListener('submit', async event => {
      const rateForm = event.target.closest('form[data-customer-rate-form]');
      if (!rateForm) return;
      event.preventDefault();
      const rateInput = rateForm.querySelector('input[type="number"]');
      const saveButton = rateForm.querySelector('button[type="submit"]');
      saveButton.disabled = true;
      saveButton.textContent = 'Saving…';
      try {
        await store.updateCustomerBillingRate(rateForm.dataset.customerId, rateInput.value);
        renderCustList();
      } catch (error) {
        alert(error.message || 'Unable to save the hourly billing rate. Please try again.');
        saveButton.disabled = false;
        saveButton.textContent = 'Save rate';
      }
    });
    
    custList?.addEventListener('click', async (cc) => {
      const custID = cc.target.getAttribute('data-id');
      if (!custID) return;
      
      if (cc.target.classList.contains('del-btn')) {
        if (confirm('Are you sure you want to delete this customer?')) {
          await store.deleteCustomer(custID);
          renderCustList();
        }
      }
    });
    
  } //end custForm if statement
}); //end DOMcontentloaded listener

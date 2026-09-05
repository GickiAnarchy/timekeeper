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
    
    empList.innerHTML = '';
    
    if (store.employees.size === 0) {
      empList.innerHTML = '<li class="empty-list emp-item">No Employees</li>';
      return;
    }

    store.employees.forEach((emp) => {
      const li = document.createElement('li');
      li.className = 'emp-item';
      li.innerHTML = `<p>${emp.name} - $${emp.wage}</p>
                      <hr>
                      <button type="button" class="del-btn" data-id="${emp.id}">Delete</button>
      `;
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

  function renderCustList() {
    if (!custList) return;

    custList.innerHTML = '';

    if (store.customers.size === 0) {
      custList.innerHTML = '<li class="empty-list cust-item">No Customers - none</li>';
      return;
    }

    store.customers.forEach((cust) => {
      const li = document.createElement('li');
      li.className = 'cust-item';
      li.innerHTML = `<p>${cust.name} - ${cust.location}</p>
                      <p>${cust.note}</p>
                      <hr>
                      <button type="button" class="del-btn" data-id="${cust.id}">Delete</button>
                      `;
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
      
      if (!cName || !cLoc) {
        alert('Please enter a valid name and location.');
        return;
      }
      
      await store.addCustomer(cName, cLoc, cNote);
      custForm.reset();
      renderCustList();
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

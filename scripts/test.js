
import { store } from './models.js';


/*
  DOM CONTROLLER
*/

document.addEventListener('DOMContentLoaded', async () => {
  //const store = new AppDataStore();
  //await store.init();
  
  function populateEmployeeDropdowns(empDropdownElement) {
      empDropdownElement.innerHTML = '<option value="">--Employee--</option>';
      store.employees.forEach((emp) => {
        const opt = document.createElement('option');
        opt.value = emp.id;
        opt.textContent = `${emp.name} -- ($${emp.wage}/hr)`;
        empDropdownElement.appendChild(opt);
      });
  }
      
  function populateCustomerDropdowns(custDropdownElement) {
      custDropdownElement.innerHTML = '<option value="">--Customer--</option>';
      store.customers.forEach((cust) => {
        const opt = document.createElement('option');
        opt.value = cust.id;
        opt.textContent = cust.customInfo();
        custDropdownElement.appendChild(opt);
      });
  }
  
  
  const empBtn = document.getElementById('emp-btn');
  const custBtn = document.getElementById('cust-btn');
  const dd = document.getElementById('test-dropdown');
  
  if (empBtn && custBtn) {
    empBtn.addEventListener('click', () => {
      populateEmployeeDropdowns(dd);
    });
    custBtn.addEventListener('click', () => {
      populateCustomerDropdowns(dd);
    });
  }
});



import { store, populateCustomerDropdowns, Invoice } from './models.js';


document.addEventListener('DOMContentLoaded', async () => {
  await store.init();
  

  const custSelect = document.getElementById('cust-select');
  const invList = document.getElementById('inv-select');
  const addInvBtn = document.getElementById('add-inv-btn');
  if (custSelect) {
    populateCustomerDropdowns(custSelect);
    custSelect.addEventListener('change', renderList);
  }

  const custInvoices = store.invoices.find(i => i.customer.name === custSelect.value);

if (!custInvoices || custInvoices.length === 0) {
  invList.innerHTML = '<option value="">No invoices found</option>';
} else {
  invList.innerHTML = '';
  custInvoices.forEach(invoice => {
    const option = document.createElement('option');
    option.value = invoice.id;
    option.textContent = `Invoice #${invoice.id} - ${invoice.customer.name}`;
    invList.appendChild(option);
  });
}

addInvBtn.addEventListener('click', async () => {
  // Create a new invoice for the selected customer
}


  
  
  

});
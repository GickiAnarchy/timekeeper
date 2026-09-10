import { store, populateCustomerDropdowns, Invoice } from './models.js';


document.addEventListener('DOMContentLoaded', async () => {
  await store.init();
  
  //const nI = new Invoice("TestCustomer");
  //await store.saveInvoice(nI);
  

  const custSelect = document.getElementById('cust-select');
  if (custSelect) {
    populateCustomerDropdowns(custSelect);
    custSelect.addEventListener('change', renderList);
  }
  
  function renderList() {
    const custId = custSelect.value;
    if (!custId) return;
    const invoices = store.invoices.filter(i => i.customer.id === custId);
    const invList = document.getElementById('invoice-list');
    if (!invList || invoices.length === 0) return;
    invoices.forEach((inv) => {
      const li = document.createElement('li');
      li.className = 'list-item';
      li.innerHTML = `
      <div class="inv-info">
        <p class="inv-option" data-id="${inv.id}">"${inv.customer.name} -- $${inv.totalBill()}"</p>
      </div>
      `;
      invList.appendChild(li);
    });
  }
  
});
import { store, populateCustomerDropdowns, Invoice } from './models.js';


document.addEventListener('DOMContentLoaded', async () => {
  await store.init();
  

  const custSelect = document.getElementById('cust-select');
  const invList = document.getElementById('inv-select');
  const addItemBtn = document.getElementById('add-item-btn');
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
    const cusId = custSelect.value;
    const newInvoice = new Invoice(cusId);
    await store.saveInvoice(newInvoice);
    renderList();
  });

  invList.addEventListener('change', () => {
    const selectedInvoiceId = invList.value;
    const selectedInvoice = store.invoices.find(i => i.id === selectedInvoiceId);
    populateInvoiceDetails(selectedInvoice);
  });
  
  addItemBtn.addEventListener('click', async () => {
    const selectedInvoiceId = invList.value;
    const selectedInvoice = store.invoices.find(i => i.id === selectedInvoiceId);
    addItemModal(selectedInvoice);
  });

  function renderList() {
    const custId = custSelect.value;
    const custInvoices = store.invoices.filter(i => i.customer.id === custId);
    custInvoices.forEach(invoice => {
      const option = document.createElement('option');
      option.value = invoice.id;
      option.textContent = `Invoice #${invoice.id} - ${invoice.customer.name}`;
      invList.appendChild(option);
    });
  }

  function populateInvoiceDetails(invoice) {
    const invDetails = document.getElementById('invoice-table-body');
    invDetails.innerHTML = '';
    if (invoice.items.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="3">No items in this invoice</td>';
    } else {
      invoice.items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.description}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>${item.quantity}</td>
        `;
        invDetails.appendChild(row);
      });
    }
  }
  
  function addItemModal(inv) {
    const modal = getElementById('item-modal');
    const nameInput = getElementById('name-input');
    const valueInput = getElementById('value-input');
    
  }
  

});
import { store, populateCustomerDropdowns, Invoice } from './models.js';


document.addEventListener('DOMContentLoaded', async () => {
  await store.init();

  const custSelect = document.getElementById('cust-select');
  const invList = document.getElementById('inv-select');
  const addItemBtn = document.getElementById('add-item-btn');
  const removeItemBtn = document.getElementById('remove-item-btn');
  const addInvBtn = document.getElementById('add-inv-btn');
  const deleteInvBtn = document.getElementById('delete-inv-btn');
  const invoiceBody = document.getElementById('invoice-table-body');
  const markPaidBtn = document.getElementById('mark-paid-btn');
  const paidLabel = document.getElementById('paid-notice');

  if (!custSelect || !invList || !addItemBtn || !removeItemBtn ||
      !addInvBtn || !deleteInvBtn || !invoiceBody) return;

  let selectedItemIndex = null;

  populateCustomerDropdowns(custSelect);
  custSelect.addEventListener('change', renderInvoiceList);
  invList.addEventListener('change', renderSelectedInvoice);
  invoiceBody.addEventListener('click', selectItemRow);

  addInvBtn.addEventListener('click', async () => {
    const customer = store.customers.get(custSelect.value);
    if (!customer) return;

    const newInvoice = new Invoice(customer);
    await store.saveInvoice(newInvoice);
    store.invoices.push(newInvoice);
    renderInvoiceList();
    invList.value = newInvoice.id;
    populateInvoiceDetails(newInvoice);
  });

  deleteInvBtn.addEventListener('click', async () => {
    const invoice = getSelectedInvoice();
    if (!invoice) return;

    const invoiceLabel = shortInvoiceId(invoice.id);
    if (!window.confirm(`Delete invoice #${invoiceLabel}? This cannot be undone.`)) return;

    await store.deleteInvoice(invoice.id);
    selectedItemIndex = null;
    renderInvoiceList();
  });

  addItemBtn.addEventListener('click', () => {
    const invoice = getSelectedInvoice();
    if (invoice) addItemModal(invoice);
  });

  removeItemBtn.addEventListener('click', async () => {
    const invoice = getSelectedInvoice();
    if (!invoice || selectedItemIndex === null) return;

    const item = invoice.items[selectedItemIndex];
    if (!item) return;

    if (!window.confirm(`Remove “${item.name}” from this invoice?`)) return;

    invoice.items.splice(selectedItemIndex, 1);
    await store.saveInvoice(invoice);
    selectedItemIndex = null;
    populateInvoiceDetails(invoice);
  });

  renderInvoiceList();

  function getSelectedInvoice() {
    return store.invoices.find(invoice => invoice.id === invList.value) || null;
  }

  function shortInvoiceId(id) {
    return String(id).slice(-6);
  }

  function renderInvoiceList() {
    const customerId = custSelect.value;
    const customerInvoices = store.invoices.filter(
      invoice => invoice.customer && invoice.customer.id === customerId
    );

    invList.innerHTML = '';
    selectedItemIndex = null;

    if (customerInvoices.length === 0) {
      invList.innerHTML = '<option value="">No invoices found</option>';
      populateInvoiceDetails(null);
      return;
    }

    customerInvoices.forEach(invoice => {
      const option = document.createElement('option');
      option.value = invoice.id;
      option.textContent = `Invoice #${shortInvoiceId(invoice.id)} - ${invoice.customer.name}`;
      invList.appendChild(option);
    });

    populateInvoiceDetails(customerInvoices[0]);
  }

  function renderSelectedInvoice() {
    markPaidBtn.removeEventListener('click');
    markPaidBtn.removeEventListener();
    selectedItemIndex = null;
    populateInvoiceDetails(getSelectedInvoice());
    markPaidBtn.addEventListener('click', () => {
      let checkInv = getSelectedInvoice();
      if (checkInv) {
        checkInv.isPaid = true;
      }
    });
  }

  function selectItemRow(event) {
    const row = event.target.closest('tr[data-item-index]');
    if (!row) return;

    invoiceBody.querySelectorAll('tr.selected-item').forEach(selectedRow => {
      selectedRow.classList.remove('selected-item');
    });
    row.classList.add('selected-item');
    selectedItemIndex = Number(row.dataset.itemIndex);
  }

  function populateInvoiceDetails(invoice) {
    const totalCell = document.querySelector('tfoot strong');
    invoiceBody.innerHTML = '';
    selectedItemIndex = null;

    if (!invoice) {
      invoiceBody.innerHTML = '<tr><td colspan="3">No invoice selected</td></tr>';
      if (totalCell) totalCell.textContent = 'Total: $0.00';
      return;
    }

    if (invoice.items.length === 0) {
      invoiceBody.innerHTML = '<tr><td colspan="3">No items in this invoice</td></tr>';
    } else {
      if (invoice.isPaid) {
        paidLabel.textContent = "PAID";
        markPaidBtn.disabled = true;
      } else {
        paidLabel.textContent = "";
        markPaidBtn.disabled = false;
      }
      
      invoice.items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.dataset.itemIndex = index;
        row.title = 'Click to select this item';
        row.innerHTML = `
          <td colspan="2">${item.name}</td>
          <td>$${Number(item.value || 0).toFixed(2)}</td>
        `;
        invoiceBody.appendChild(row);
      });
    }

    if (totalCell) totalCell.textContent = `Total: $${invoice.totalBill().toFixed(2)}`;
  }

  function addItemModal(invoice) {
    const modal = document.getElementById('item-modal');
    const nameInput = document.getElementById('name-input');
    const valueInput = document.getElementById('value-input');
    const itemForm = document.getElementById('add-item-form');

    if (!modal || !nameInput || !valueInput || !itemForm) return;

    nameInput.value = '';
    valueInput.value = '';
    modal.showModal();

    const closeModal = () => {
      itemForm.onreset = null;
      itemForm.reset();
      itemForm.onreset = handleReset;
      if (modal.open) modal.close();
    };

    const handleReset = event => {
      event.preventDefault();
      closeModal();
    };

    itemForm.onsubmit = async event => {
      event.preventDefault();

      const name = nameInput.value.trim();
      const value = Number(valueInput.value);
      if (!name || !Number.isFinite(value) || value < 0) return;

      invoice.addItem(name, value);
      await store.saveInvoice(invoice);
      closeModal();
      populateInvoiceDetails(invoice);
    };

    itemForm.onreset = handleReset;
  }

});

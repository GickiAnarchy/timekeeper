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
  const paidLabel = document.getElementById('paid-notice');

  if (!custSelect || !invList || !addItemBtn || !removeItemBtn ||
      !addInvBtn || !deleteInvBtn || !invoiceBody) return;

  let selectedItemIndex = null;

  // Populate customers dropdown
  await populateCustomerDropdowns(custSelect);

  custSelect.addEventListener('change', renderInvoiceList);
  invList.addEventListener('change', renderSelectedInvoice);
  invoiceBody.addEventListener('click', selectItemRow);

  addInvBtn.addEventListener('click', async () => {
    const custId = custSelect.value;
    let customer = null;

    if (store.customers instanceof Map) {
      customer = store.customers.get(custId) || store.customers.get(Number(custId));
    } else if (typeof store.customers === 'object' && store.customers !== null) {
      customer = store.customers[custId];
    } else if (Array.isArray(store.customers)) {
      customer = store.customers.find(c => String(c.id) === String(custId));
    }

    if (!customer) return;

    const newInvoice = new Invoice(customer);
    await store.saveInvoice(newInvoice);
    if (Array.isArray(store.invoices)) {
      store.invoices.push(newInvoice);
    }
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
    if (!Array.isArray(store.invoices)) return null;
    return store.invoices.find(invoice => String(invoice.id) === String(invList.value)) || null;
  }

  function shortInvoiceId(id) {
    return String(id).slice(-6);
  }

  function renderInvoiceList() {
    const customerId = custSelect.value;
    const customerInvoices = (store.invoices || []).filter(
      invoice => invoice.customer && String(invoice.customer.id) === String(customerId)
    );

    invList.innerHTML = '';
    selectedItemIndex = null;

    if (!customerId || customerInvoices.length === 0) {
      invList.innerHTML = '<option value="">No invoices found</option>';
      populateInvoiceDetails(null);
      return;
    }

    customerInvoices.forEach(invoice => {
      const option = document.createElement('option');
      option.value = invoice.id;
      option.textContent = `Invoice #${shortInvoiceId(invoice.id)} - ${invoice.customer.name || 'Customer'}`;
      invList.appendChild(option);
    });

    populateInvoiceDetails(customerInvoices[0]);
  }

  function renderSelectedInvoice() {
    selectedItemIndex = null;
    populateInvoiceDetails(getSelectedInvoice());
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
      if (paidLabel) paidLabel.innerHTML = '';
      return;
    }

    if (paidLabel) {
      if (invoice.isPaid) {
        paidLabel.innerHTML = `<td colspan="3">PAID</td>`;
      } else {
        paidLabel.innerHTML = `
          <td colspan="3">
            <button id="mark-paid-btn" type="button">Mark Paid</button>
          </td>
        `;
        const markPaidBtn = paidLabel.querySelector('#mark-paid-btn');
        if (markPaidBtn) {
          markPaidBtn.addEventListener('click', async () => {
            invoice.isPaid = true;
            await store.saveInvoice(invoice);
            populateInvoiceDetails(invoice);
          }, { once: true });
        }
      }
    }

    if (!invoice.items || invoice.items.length === 0) {
      invoiceBody.innerHTML = '<tr><td colspan="3">No items in this invoice</td></tr>';
    } else {
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

    if (totalCell) {
      const total = typeof invoice.totalBill === 'function' 
        ? invoice.totalBill() 
        : (invoice.items || []).reduce((sum, item) => sum + Number(item.value || 0), 0);
      totalCell.textContent = `Total: $${total.toFixed(2)}`;
    }
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

      if (typeof invoice.addItem === 'function') {
        invoice.addItem(name, value);
      } else {
        if (!invoice.items) invoice.items = [];
        invoice.items.push({ name, value });
      }

      await store.saveInvoice(invoice);
      closeModal();
      populateInvoiceDetails(invoice);
    };

    itemForm.onreset = handleReset;
  }
});

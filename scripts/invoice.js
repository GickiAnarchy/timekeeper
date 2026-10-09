import {
  store,
  populateCustomerDropdowns,
  Invoice,
  enableAutoScrollOnFocus
} from './models.js';

document.addEventListener('DOMContentLoaded', async () => {
  await store.init();
  enableAutoScrollOnFocus();

  const custSelect = document.getElementById('cust-select');
  const invList = document.getElementById('inv-select');
  const addItemBtn = document.getElementById('add-item-btn');
  const editItemBtn = document.getElementById('edit-item-btn');
  const removeItemBtn = document.getElementById('remove-item-btn');
  const addInvBtn = document.getElementById('add-inv-btn');
  const deleteInvBtn = document.getElementById('delete-inv-btn');
  const invoiceBody = document.getElementById('invoice-table-body');
  const paidLabel = document.getElementById('paid-notice');
  const openDiv = document.getElementById('open-div');
  const invoiceDateInput = document.getElementById('invoice-date');

  if (!custSelect || !invList || !addItemBtn || !editItemBtn || !removeItemBtn ||
      !addInvBtn || !deleteInvBtn || !invoiceBody || !invoiceDateInput) return;

  let selectedItemIndex = null;

  // Populate customers dropdown
  populateCustomerDropdowns(custSelect);

  custSelect.addEventListener('change', () => renderInvoiceList());
  invList.addEventListener('change', renderSelectedInvoice);
  invoiceBody.addEventListener('click', selectItemRow);
  invoiceDateInput.addEventListener('change', async () => {
    const invoice = getSelectedInvoice();
    if (!invoice) return;

    const previousDate = invoice.date;
    invoice.date = invoiceDateInput.value || null;
    try {
      await store.saveInvoice(invoice);
      renderInvoiceList(invoice.id);
    } catch (error) {
      invoice.date = previousDate;
      invoiceDateInput.value = previousDate || '';
      console.error('Error saving invoice date:', error);
    }
  });

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
    renderInvoiceList(newInvoice.id);
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
    if (invoice) openItemModal(invoice);
  });

  editItemBtn.addEventListener('click', () => {
    const invoice = getSelectedInvoice();
    const item = invoice?.items?.[selectedItemIndex];
    if (invoice && item) openItemModal(invoice, selectedItemIndex);
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

  function formatInvoiceDate(date) {
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return 'Date not set';
    const [year, month, day] = date.split('-').map(Number);
    const parsed = new Date(year, month - 1, day);
    if (parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) return 'Date not set';
    return parsed.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function renderInvoiceList(preferredInvoiceId = null) {
    const openInvoices = store.invoices.filter(invoice => !invoice.isPaid);
    openDiv.innerHTML = "";

    if (openInvoices.length !== 0) {
      openDiv.innerHTML = `<p>${openInvoices.length} open invoices</p>`;
    } else {
      openDiv.innerHTML = "";
    }

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
      option.textContent = `Invoice #${shortInvoiceId(invoice.id)} - ${invoice.customer.name || 'Customer'} · ${formatInvoiceDate(invoice.date)}`;
      invList.appendChild(option);
    });

    const selectedInvoice = customerInvoices.find(invoice => String(invoice.id) === String(preferredInvoiceId)) || customerInvoices[0];
    invList.value = selectedInvoice.id;
    populateInvoiceDetails(selectedInvoice);
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
    updateItemActionButtons();
  }

  function updateItemActionButtons() {
    const hasSelectedItem = Boolean(getSelectedInvoice()?.items?.[selectedItemIndex]);
    editItemBtn.disabled = !hasSelectedItem;
    removeItemBtn.disabled = !hasSelectedItem;
  }

  function populateInvoiceDetails(invoice) {
      try {
        const totalCell = document.querySelector('tfoot strong');
        const invTable = document.getElementById('inv-table');
        invoiceBody.innerHTML = '';
        selectedItemIndex = null;
        updateItemActionButtons();
        invoiceDateInput.value = invoice ? invoice.date || '' : '';
        invoiceDateInput.disabled = !invoice;
    
        if (!invoice) {
          invoiceBody.innerHTML = '<tr><td colspan="3">No invoice selected</td></tr>';
          if (totalCell) totalCell.textContent = 'Total: $0.00';
          if (paidLabel) paidLabel.innerHTML = '';
          return;
        }
        
        if (totalCell) {
          totalCell.textContent = `Total: $${invoice.totalBill()}`;
        }
    
        if (paidLabel) {
          if (invoice.isPaid) {
            paidLabel.innerHTML = `<td colspan="3">PAID</td>`;
            if (invTable) {
              document.getElementById('inv-table').classList.add('is-paid');
            }
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
            if (invTable) {
              invTable.classList.remove('is-paid');
            }
          }
        }
      } catch (e) {
        console.log(`${e}`);
      }

    if (!invoice.items || invoice.items.length === 0) {
      invoiceBody.innerHTML = '<tr><td colspan="3">No items in this invoice</td></tr>';
    } else {
      invoice.items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.dataset.itemIndex = index;
        row.title = 'Click to select this item for editing or removal';
        row.innerHTML = `
          <td colspan="2">${item.name}</td>
          <td>$${Number(item.value || 0).toFixed(2)}</td>
        `;
        invoiceBody.appendChild(row);
      });
    }
  }

  function openItemModal(invoice, itemIndex = null) {
    const modal = document.getElementById('item-modal');
    const nameInput = document.getElementById('name-input');
    const valueInput = document.getElementById('value-input');
    const itemForm = document.getElementById('add-item-form');
    const modalTitle = document.getElementById('item-modal-title');
    const formError = document.getElementById('item-form-error');
    const submitButton = document.getElementById('submit-btn');

    if (!modal || !nameInput || !valueInput || !itemForm || !modalTitle || !formError || !submitButton) return;

    const isEditing = Number.isInteger(itemIndex);
    const originalItem = isEditing ? invoice.items[itemIndex] : null;
    if (isEditing && !originalItem) return;
    const originalItemSnapshot = originalItem ? { name: originalItem.name, value: originalItem.value } : null;
    modalTitle.textContent = isEditing ? 'Edit invoice item' : 'Add invoice item';
    submitButton.textContent = isEditing ? 'Save changes' : 'Add';
    nameInput.value = originalItem?.name || '';
    valueInput.value = originalItem ? Number(originalItem.value || 0) : '';
    formError.hidden = true;
    formError.textContent = '';
    modal.showModal();

    const closeModal = () => {
      itemForm.onreset = null;
      itemForm.reset();
      itemForm.onreset = handleReset;
      formError.hidden = true;
      formError.textContent = '';
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
      if (!name || !Number.isFinite(value) || value < 0) {
        formError.textContent = 'Enter an item name and a valid value of zero or more.';
        formError.hidden = false;
        return;
      }

      let addedItem = null;
      try {
        if (isEditing) {
          originalItem.name = name;
          originalItem.value = value;
        } else if (typeof invoice.addItem === 'function') {
          invoice.addItem(name, value);
          addedItem = invoice.items[invoice.items.length - 1];
        } else {
          if (!invoice.items) invoice.items = [];
          addedItem = { name, value };
          invoice.items.push(addedItem);
        }

        await store.saveInvoice(invoice);
        closeModal();
        selectedItemIndex = null;
        populateInvoiceDetails(invoice);
      } catch (error) {
        if (isEditing) {
          originalItem.name = originalItemSnapshot.name;
          originalItem.value = originalItemSnapshot.value;
        } else if (addedItem) {
          invoice.items = invoice.items.filter(item => item !== addedItem);
        }
        console.error('Error saving invoice item:', error);
        formError.textContent = 'Unable to save this item. Please try again.';
        formError.hidden = false;
      }
    };

    itemForm.onreset = handleReset;
  }
});

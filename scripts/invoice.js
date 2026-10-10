import {
  store,
  populateCustomerDropdowns,
  Invoice,
  enableAutoScrollOnFocus
} from './models.js';
import {
  invoiceShiftIds as getInvoiceShiftIds,
  makeShiftInvoiceLine,
  shiftInvoiceLineStatus,
  shiftIsAttachedElsewhere
} from './domain.mjs';

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
  const shiftLinkList = document.getElementById('shift-link-list');
  const shiftLinkError = document.getElementById('shift-link-error');
  const saveShiftLinksBtn = document.getElementById('save-shift-links-btn');

  if (!custSelect || !invList || !addItemBtn || !editItemBtn || !removeItemBtn ||
      !addInvBtn || !deleteInvBtn || !invoiceBody || !invoiceDateInput || !openDiv ||
      !shiftLinkList || !shiftLinkError || !saveShiftLinksBtn) return;

  let selectedItemIndex = null;

  // Populate customers dropdown
  populateCustomerDropdowns(custSelect);

  custSelect.addEventListener('change', () => renderInvoiceList());
  invList.addEventListener('change', renderSelectedInvoice);
  invoiceBody.addEventListener('click', selectItemRow);
  openDiv.addEventListener('click', event => {
    const button = event.target.closest('button[data-invoice-id]');
    if (!button) return;
    const invoice = store.invoices.find(candidate => String(candidate.id) === button.dataset.invoiceId);
    if (!invoice?.customer?.id) return;
    custSelect.value = String(invoice.customer.id);
    renderInvoiceList(invoice.id);
  });
  saveShiftLinksBtn.addEventListener('click', saveShiftLinks);
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
    if (item.shiftId) return;

    if (!window.confirm(`Remove “${item.name}” from this invoice?`)) return;

    invoice.items.splice(selectedItemIndex, 1);
    await store.saveInvoice(invoice);
    selectedItemIndex = null;
    populateInvoiceDetails(invoice);
    renderOpenInvoices();
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

  function makeElement(tag, className = '', text = undefined) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function renderOpenInvoices() {
    openDiv.replaceChildren();
    const openInvoices = (store.invoices || []).filter(invoice => !invoice.isPaid);
    const heading = makeElement('p', '', `${openInvoices.length} open ${openInvoices.length === 1 ? 'invoice' : 'invoices'}`);
    openDiv.appendChild(heading);
    if (openInvoices.length === 0) {
      openDiv.appendChild(makeElement('p', 'muted-copy', 'No open invoices.'));
      return;
    }

    openInvoices.sort((a, b) => {
      const dateA = /^\d{4}-\d{2}-\d{2}$/.test(a.date || '') ? a.date : '9999-99-99';
      const dateB = /^\d{4}-\d{2}-\d{2}$/.test(b.date || '') ? b.date : '9999-99-99';
      return dateA.localeCompare(dateB) || String(a.customer?.name || '').localeCompare(String(b.customer?.name || ''));
    });
    const list = makeElement('ul', 'open-invoice-list');
    openInvoices.forEach(invoice => {
      const item = document.createElement('li');
      const total = Number(invoice.totalBill()).toFixed(2);
      const button = makeElement('button', 'open-invoice-button',
        `#${shortInvoiceId(invoice.id)} · ${invoice.customer?.name || 'Customer'} · ${formatInvoiceDate(invoice.date)} · $${total}`);
      button.type = 'button';
      button.dataset.invoiceId = invoice.id;
      button.setAttribute('aria-label', `Open invoice ${shortInvoiceId(invoice.id)} for ${invoice.customer?.name || 'customer'}, dated ${formatInvoiceDate(invoice.date)}, total $${total}`);
      if (String(getSelectedInvoice()?.id) === String(invoice.id)) button.setAttribute('aria-current', 'true');
      item.appendChild(button);
      list.appendChild(item);
    });
    openDiv.appendChild(list);
  }

  function invoiceShiftIds(invoice) {
    return getInvoiceShiftIds(invoice);
  }

  function shiftIsLinkedElsewhere(shiftId, invoiceId) {
    return shiftIsAttachedElsewhere(store.invoices, shiftId, invoiceId);
  }

  function updateShiftLinkSaveState(invoice) {
    const currentIds = invoiceShiftIds(invoice);
    const selectedIds = new Set([...shiftLinkList.querySelectorAll('input[data-shift-id]:checked')].map(input => input.dataset.shiftId));
    const changed = currentIds.size !== selectedIds.size || [...currentIds].some(id => !selectedIds.has(id));
    saveShiftLinksBtn.disabled = !invoice || invoice.isPaid || !changed;
  }

  function renderShiftLinks(invoice) {
    shiftLinkList.replaceChildren();
    shiftLinkError.textContent = '';
    if (!invoice) {
      shiftLinkList.appendChild(makeElement('p', 'shift-link-empty', 'Select an invoice to view eligible shifts.'));
      saveShiftLinksBtn.disabled = true;
      return;
    }
    if (!invoice.customer?.id) {
      shiftLinkList.appendChild(makeElement('p', 'shift-link-empty', 'This invoice has no customer attached.'));
      saveShiftLinksBtn.disabled = true;
      return;
    }

    const linkedIds = invoiceShiftIds(invoice);
    const customerId = String(invoice.customer.id);
    const candidates = store.shifts.filter(shift =>
      shift.isComplete && String(shift.customer?.id) === customerId &&
      (linkedIds.has(String(shift.id)) || !shiftIsLinkedElsewhere(shift.id, invoice.id))
    ).sort((a, b) => (b.clockInTime?.getTime() || 0) - (a.clockInTime?.getTime() || 0));
    const visibleIds = new Set();
    const rateIsSet = invoice.customer.billingRate !== null && invoice.customer.billingRate !== undefined &&
      Number.isFinite(Number(invoice.customer.billingRate)) && Number(invoice.customer.billingRate) >= 0;
    if (!rateIsSet) {
      shiftLinkList.appendChild(makeElement('p', 'shift-link-empty', 'Set this customer’s hourly billing rate in People Data before attaching new shifts.'));
    }

    candidates.forEach(shift => {
      const shiftId = String(shift.id);
      visibleIds.add(shiftId);
      const hours = Number(shift.getHoursWorked());
      const rate = rateIsSet ? Number(invoice.customer.billingRate) : null;
      const amountText = rate === null ? 'rate not set' : `$${(rate * hours).toFixed(2)} at $${rate.toFixed(2)}/h`;
      const workDate = shift.clockInTime instanceof Date && !Number.isNaN(shift.clockInTime.getTime())
        ? shift.clockInTime.toLocaleDateString()
        : 'Date not set';
      const label = makeElement('label', 'shift-link-option');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.dataset.shiftId = shiftId;
      checkbox.checked = linkedIds.has(shiftId);
      checkbox.disabled = Boolean(invoice.isPaid);
      checkbox.addEventListener('change', () => updateShiftLinkSaveState(invoice));
      const description = makeElement('span', '',
        `${workDate} · ${shift.employee?.name || 'Employee'} · ${hours.toFixed(2)} actual h · ${amountText}`);
      label.append(checkbox, description);
      shiftLinkList.appendChild(label);
    });

    linkedIds.forEach(shiftId => {
      if (visibleIds.has(shiftId)) return;
      const label = makeElement('label', 'shift-link-option');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.dataset.shiftId = shiftId;
      checkbox.checked = true;
      checkbox.disabled = Boolean(invoice.isPaid);
      checkbox.addEventListener('change', () => updateShiftLinkSaveState(invoice));
      label.append(checkbox, makeElement('span', '', `Previously linked shift not found · ${shiftId}`));
      shiftLinkList.appendChild(label);
    });

    if (candidates.length === 0 && linkedIds.size === 0) {
      shiftLinkList.appendChild(makeElement('p', 'shift-link-empty', 'No unbilled completed shifts are available for this customer.'));
    }
    if (invoice.isPaid) {
      shiftLinkList.appendChild(makeElement('p', 'shift-link-empty', 'This invoice is paid; linked shifts are read-only.'));
    }
    updateShiftLinkSaveState(invoice);
  }

  async function saveShiftLinks() {
    const invoice = getSelectedInvoice();
    if (!invoice || invoice.isPaid) return;
    shiftLinkError.textContent = '';
    const previousItems = invoice.items;
    const previousShiftIds = invoice.shiftIds;
    const existingIds = invoiceShiftIds(invoice);
    const selectedIds = new Set([...shiftLinkList.querySelectorAll('input[data-shift-id]:checked')].map(input => input.dataset.shiftId));
    const additions = [...selectedIds].filter(id => !existingIds.has(id));
    const rate = invoice.customer?.billingRate;

    if (additions.length && (rate === null || rate === undefined || !Number.isFinite(Number(rate)) || Number(rate) < 0)) {
      shiftLinkError.textContent = 'Set a valid customer hourly billing rate before adding shifts.';
      return;
    }

    const newLaborItems = [];
    for (const shiftId of additions) {
      const shift = store.shifts.find(candidate => String(candidate.id) === shiftId);
      if (!shift || !shift.isComplete || String(shift.customer?.id) !== String(invoice.customer?.id) ||
          shiftIsLinkedElsewhere(shiftId, invoice.id)) {
        shiftLinkError.textContent = 'One of the selected shifts is no longer available. Refresh the invoice and try again.';
        return;
      }
      const hours = Number(shift.getHoursWorked());
      if (!Number.isFinite(hours) || hours < 0) {
        shiftLinkError.textContent = 'A selected shift has invalid actual hours and cannot be billed.';
        return;
      }
      const hourlyRate = Number(rate);
      const dateLabel = shift.clockInTime instanceof Date && !Number.isNaN(shift.clockInTime.getTime())
        ? shift.clockInTime.toLocaleDateString()
        : 'date not set';
      let line;
      try {
        line = makeShiftInvoiceLine(shift, hourlyRate);
      } catch (error) {
        shiftLinkError.textContent = error.message || 'This shift cannot be attached to the invoice.';
        return;
      }
      line.name = `Labor · ${dateLabel} · ${shift.employee?.name || 'Employee'} (${line.billedHours.toFixed(2)} h × $${line.billingRate.toFixed(2)}/h)`;
      newLaborItems.push(line);
    }

    saveShiftLinksBtn.disabled = true;
    saveShiftLinksBtn.textContent = 'Saving…';
    try {
      invoice.items = previousItems.filter(item => !item.shiftId || selectedIds.has(String(item.shiftId))).concat(newLaborItems);
      invoice.shiftIds = [...selectedIds];
      await store.saveInvoice(invoice);
      renderInvoiceList(invoice.id);
    } catch (error) {
      invoice.items = previousItems;
      invoice.shiftIds = previousShiftIds;
      console.error('Unable to save linked shifts:', error);
      shiftLinkError.textContent = 'Unable to update linked shifts. Please try again.';
      updateShiftLinkSaveState(invoice);
    } finally {
      saveShiftLinksBtn.textContent = 'Update linked shifts';
    }
  }

  function renderInvoiceList(preferredInvoiceId = null) {
    const customerId = custSelect.value;
    const customerInvoices = (store.invoices || []).filter(
      invoice => invoice.customer && String(invoice.customer.id) === String(customerId)
    );

    invList.innerHTML = '';
    selectedItemIndex = null;

    if (!customerId || customerInvoices.length === 0) {
      invList.innerHTML = '<option value="">No invoices found</option>';
      populateInvoiceDetails(null);
      renderOpenInvoices();
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
    renderOpenInvoices();
  }

  function renderSelectedInvoice() {
    selectedItemIndex = null;
    populateInvoiceDetails(getSelectedInvoice());
    renderOpenInvoices();
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
    const selectedItem = getSelectedInvoice()?.items?.[selectedItemIndex];
    const hasSelectedItem = Boolean(selectedItem && !selectedItem.shiftId);
    editItemBtn.disabled = !hasSelectedItem;
    removeItemBtn.disabled = !hasSelectedItem;
  }

  function populateInvoiceDetails(invoice) {
      renderShiftLinks(invoice);
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
                renderInvoiceList(invoice.id);
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
        row.title = item.shiftId
          ? 'This labor line is generated from a linked work shift; edit it in the Work shifts and labor section.'
          : 'Click to select this item for editing or removal';
        const nameCell = document.createElement('td');
        nameCell.colSpan = 2;
        nameCell.textContent = item.name || '';
        if (item.shiftId) {
          const sourceShift = store.shifts.find(shift => String(shift.id) === String(item.shiftId));
          const status = shiftInvoiceLineStatus(item, sourceShift);
          if (status !== 'current') {
            const warning = document.createElement('small');
            warning.className = `invoice-line-warning is-${status}`;
            warning.textContent = status === 'changed'
              ? `Source shift changed after billing. Saved snapshot remains ${Number(item.billedHours ?? item.actualHours ?? 0).toFixed(2)} h × $${Number(item.billingRate ?? 0).toFixed(2)}/h.`
              : status === 'missing'
                ? `Source shift ${item.shiftId} is missing. Saved billed hours and rate are retained.`
                : 'This older labor line has no shift snapshot, so source changes cannot be verified.';
            nameCell.appendChild(document.createElement('br'));
            nameCell.appendChild(warning);
          }
        }
        const valueCell = document.createElement('td');
        valueCell.textContent = `$${Number(item.value || 0).toFixed(2)}`;
        row.append(nameCell, valueCell);
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
    if (isEditing && (!originalItem || originalItem.shiftId)) return;
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
        renderOpenInvoices();
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

import { createInvoiceItem, invoiceTotal } from './domain.mjs';

function todayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export class Invoice {
  constructor(cust, items = [], id = null, isPaid = false, date = todayDateString(), shiftIds = []) {
    this.id = id || crypto.randomUUID();
    this.customer = cust;
    this.items = items;
    this.isPaid = Boolean(isPaid);
    this.date = date || null;
    this.shiftIds = Array.isArray(shiftIds) ? [...new Set(shiftIds.map(String))] : [];
  }

  addItem(name, type = 'general', value = undefined) {
    this.items.push(createInvoiceItem(name, type, value));
  }

  deleteItem(name, value) {
    const dItem = this.items.find(i => i.name === name && i.value === value);
    this.items = this.items.filter(i => i !== dItem);
  }

  totalBill() {
    return invoiceTotal(this.items);
  }
}

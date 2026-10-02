

export function changeHeader(text = '') {
  const header = document.querySelector('header h1') || document.querySelector('header');
  if (header && text) {
    header.dataset.originalText = header.dataset.originalText || header.textContent;
  }
}

// Rounds a Date object to the nearest 15-minute mark (00, 15, 30, 45)
export const roundTo15Minutes = (date = new Date()) => {
  const rounded = new Date(date);
  const ms = 1000 * 60 * 15; // 15 minutes in milliseconds
  return new Date(Math.round(rounded.getTime() / ms) * ms);
};

// Round DOWN to previous 15-minute mark (e.g., 9:14 -> 9:00)
export const roundDown15Minutes = (date = new Date()) => {
  const ms = 1000 * 60 * 15;
  return new Date(Math.floor(date.getTime() / ms) * ms);
};

// Round UP to next 15-minute mark (e.g., 9:01 -> 9:15)
export const roundUp15Minutes = (date = new Date()) => {
  const ms = 1000 * 60 * 15;
  return new Date(Math.ceil(date.getTime() / ms) * ms);
};

// Normalizes the name string
export const normalize = (str) => (str ? str.trim().toLowerCase() : '');

// Formats the datetime object
export const toLocalISO = (date) => {
  if (!date) return '';
  const off = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - off).toISOString().slice(0, 16);
};

export function formatTime24(date) {
  if (!date || !(date instanceof Date) || isNaN(date)) return '';
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${hours}:${minutes}`;
}

// JSON downloader
const downloadJSON = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export function populateEmployeeDropdowns(empDropdownElement) {
  if (!empDropdownElement) return;
  empDropdownElement.innerHTML = '<option value="">--Employee--</option>';
  store.employees.forEach((emp) => {
    const opt = document.createElement('option');
    opt.value = emp.id;
    opt.textContent = `${emp.name} -- ($${emp.wage}/hr)`;
    empDropdownElement.appendChild(opt);
  });
}

export function populateCustomerDropdowns(custDropdownElement) {
  if (!custDropdownElement) return;
  custDropdownElement.innerHTML = '<option value="">--Customer--</option>';
  store.customers.forEach((cust) => {
    const opt = document.createElement('option');
    opt.value = cust.id;
    opt.textContent = cust.customInfo();
    custDropdownElement.appendChild(opt);
  });
}
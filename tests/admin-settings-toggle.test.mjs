import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeAdminSectionToggles } from '../scripts/admin-section-toggles.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const adminMarkup = readFileSync(join(projectRoot, 'html', 'admin-settings.html'), 'utf8');
const peopleMarkup = readFileSync(join(projectRoot, 'html', 'basic-data.html'), 'utf8');
const adminController = readFileSync(join(projectRoot, 'scripts', 'admin.js'), 'utf8');
const peopleController = readFileSync(join(projectRoot, 'scripts', 'data.js'), 'utf8');

function getSectionMarkup(sectionClass) {
  const section = adminMarkup.match(new RegExp(`<section\\b(?=[^>]*\\bclass="[^"]*\\b${sectionClass}\\b[^"]*")[^>]*>[\\s\\S]*?<\\/section>`, 'i'));
  assert.ok(section, `expected ${sectionClass} settings section`);
  return section[0];
}

function getAttribute(attributes, name) {
  return attributes.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1];
}

test('each major settings card starts collapsed and is correctly named and controlled', () => {
  const sections = [
    { className: 'quote-section', label: 'quote-section-title', card: 'quote-card' },
    { className: 'wage-section', label: 'wage-section-title', card: 'wage-card' },
    { className: 'customer-section', label: 'customer-section-title', card: 'customer-card' }
  ];

  for (const expected of sections) {
    const section = getSectionMarkup(expected.className);
    assert.match(section, new RegExp(`aria-labelledby="${expected.label}"`));

    const toggle = section.match(/<button\b([^>]*class="admin-toggle"[^>]*)>/i);
    assert.ok(toggle, `${expected.className} should have a toggle button`);
    assert.equal(getAttribute(toggle[1], 'aria-expanded'), 'false');
    assert.equal(getAttribute(toggle[1], 'aria-controls'), expected.card);

    const card = section.match(new RegExp(`<div\\b(?=[^>]*\\bid="${expected.card}")([^>]*)>`, 'i'));
    assert.ok(card, `${expected.card} should exist inside its section`);
    assert.match(card[1], /\bhidden(?:\s|$)/i, `${expected.card} should be hidden initially`);
  }
});

test('quote list and add form remain separate native disclosures inside the quote card', () => {
  const quoteSection = getSectionMarkup('quote-section');
  const quoteCard = quoteSection.match(/<div\b(?=[^>]*\bid="quote-card")[^>]*>([\s\S]*?)<\/div>\s*<\/section>/i);
  assert.ok(quoteCard, 'expected quote card content');
  assert.match(quoteCard[1], /<details class="quote-list-details">\s*<summary class="quote-list-summary">Current Quotes<\/summary>/);
  assert.match(quoteSection, /<details class="quote-form-disclosure" id="quote-form-disclosure">\s*<summary id="quote-form-summary">Add a daily quote<\/summary>/);
  assert.doesNotMatch(quoteSection, /<details\b[^>]*\bopen(?:\s|>)/i);
});

test('employee and customer profile editing lives in Admin Settings', () => {
  assert.match(adminMarkup, /id="wage-table-body"/);
  assert.match(adminMarkup, /id="customer-table-body"/);
  for (const fieldId of ['edit-emp-name', 'edit-emp-wage', 'edit-cust-name', 'edit-cust-location', 'edit-cust-billing-rate', 'edit-cust-note']) {
    assert.match(adminMarkup, new RegExp(`id="${fieldId}"`), `${fieldId} should be editable in Admin Settings`);
  }
  assert.match(adminController, /store\.updateEmployee\(editingId, editEmpName\.value, editEmpWage\.value\)/);
  assert.match(adminController, /store\.updateCustomer\(/);
  assert.match(adminController, /customerStatus\.textContent = 'Customer profile saved/);
  assert.match(adminMarkup, /Changing a billing rate updates linked labor lines on invoices, including paid invoices/i);
  assert.match(adminMarkup, /href="basic-data\.html" target="main-content">Open People Data/);
});

test('People Data retains add/delete flows but no longer exposes employee/customer editing', () => {
  assert.match(peopleMarkup, /id="add-emp-form"/);
  assert.match(peopleMarkup, /id="add-cust-form"/);
  assert.match(peopleMarkup, /Admin Settings/);
  assert.doesNotMatch(peopleMarkup, /people-edit-modal|edit-emp-name|edit-cust-name/);
  assert.match(peopleController, /store\.deleteEmployee\(button\.dataset\.id\)/);
  assert.match(peopleController, /store\.deleteCustomer\(button\.dataset\.id\)/);
  assert.doesNotMatch(peopleController, /edit-btn|updateEmployee|updateCustomer/);
});

class FakeElement {
  constructor(attributes = {}, hidden = false) {
    this.attributes = new Map(Object.entries(attributes));
    this.hidden = hidden;
    this.listeners = new Map();
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  setAttribute(name, value) {
    this.attributes.set(name, value);
  }

  addEventListener(type, listener) {
    this.listeners.set(type, listener);
  }

  click() {
    this.listeners.get('click')?.();
  }
}

test('major section buttons expand and collapse only their aria-controls targets', () => {
  const quoteToggle = new FakeElement({ 'aria-controls': 'quote-card', 'aria-expanded': 'false' });
  const wageToggle = new FakeElement({ 'aria-controls': 'wage-card', 'aria-expanded': 'false' });
  const customerToggle = new FakeElement({ 'aria-controls': 'customer-card', 'aria-expanded': 'false' });
  const quoteCard = new FakeElement({}, true);
  const wageCard = new FakeElement({}, true);
  const customerCard = new FakeElement({}, true);
  const cards = new Map([['quote-card', quoteCard], ['wage-card', wageCard], ['customer-card', customerCard]]);
  const root = {
    querySelectorAll: selector => {
      assert.equal(selector, '.admin-toggle[aria-controls]');
      return [quoteToggle, wageToggle, customerToggle];
    },
    getElementById: id => cards.get(id) ?? null
  };

  initializeAdminSectionToggles(root);
  assert.equal(quoteCard.hidden, true);
  assert.equal(wageCard.hidden, true);
  assert.equal(customerCard.hidden, true);

  quoteToggle.click();
  assert.equal(quoteToggle.getAttribute('aria-expanded'), 'true');
  assert.equal(quoteCard.hidden, false);
  assert.equal(wageToggle.getAttribute('aria-expanded'), 'false');
  assert.equal(wageCard.hidden, true);
  customerToggle.click();
  assert.equal(customerToggle.getAttribute('aria-expanded'), 'true');
  assert.equal(customerCard.hidden, false);

  wageToggle.click();
  assert.equal(wageToggle.getAttribute('aria-expanded'), 'true');
  assert.equal(wageCard.hidden, false);

  quoteToggle.click();
  assert.equal(quoteToggle.getAttribute('aria-expanded'), 'false');
  assert.equal(quoteCard.hidden, true);
  assert.equal(wageCard.hidden, false);
});

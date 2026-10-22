import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setupNavigationGroups } from '../scripts/navigation-groups.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, '..');

class ClassList {
  #values;

  constructor(values = []) {
    this.#values = new Set(values);
  }

  add(...values) {
    values.forEach(value => this.#values.add(value));
  }

  remove(...values) {
    values.forEach(value => this.#values.delete(value));
  }

  contains(value) {
    return this.#values.has(value);
  }
}

class StubElement {
  #listeners = new Map();

  constructor({ classes = [], attributes = {}, children = [] } = {}) {
    this.classList = new ClassList(classes);
    this.attributes = new Map(Object.entries(attributes));
    this.children = [];
    this.parentElement = null;
    this.hidden = false;
    this.focusCount = 0;
    children.forEach(child => this.append(child));
  }

  append(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }

  contains(node) {
    return node === this || this.children.some(child => child.contains(node));
  }

  getAttribute(name) {
    return this.attributes.has(name) ? this.attributes.get(name) : null;
  }

  hasAttribute(name) {
    return this.attributes.has(name);
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  addEventListener(type, listener) {
    const listeners = this.#listeners.get(type) ?? [];
    listeners.push(listener);
    this.#listeners.set(type, listeners);
  }

  dispatchEvent(event) {
    event.target ??= this;
    event.currentTarget = this;
    for (const listener of this.#listeners.get(event.type) ?? []) listener.call(this, event);
    return !event.defaultPrevented;
  }

  click() {
    return this.dispatchEvent({ type: 'click', defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } });
  }

  focus() {
    this.focusCount += 1;
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] ?? null;
  }

  querySelectorAll(selector) {
    const matches = [];
    const visit = node => {
      if (node.matches(selector)) matches.push(node);
      node.children.forEach(visit);
    };
    this.children.forEach(visit);
    return matches;
  }

  matches(selector) {
    if (selector.startsWith('.')) return this.classList.contains(selector.slice(1));
    return false;
  }
}

class StubRoot extends StubElement {
  constructor(groups) {
    super({ children: groups });
  }

  querySelectorAll(selector) {
    if (selector === '.nav-group') return this.children;
    return super.querySelectorAll(selector);
  }
}

function makeGroup(name, { expanded = false } = {}) {
  const toggle = new StubElement({
    classes: ['nav-group-toggle'],
    attributes: {
      'aria-controls': `${name}-panel`,
      'aria-expanded': String(expanded)
    }
  });
  const panel = new StubElement({
    classes: ['nav-group-pages'],
    attributes: { id: `${name}-panel` }
  });
  panel.hidden = !expanded;
  panel.append(new StubElement({
    classes: ['nav-link'],
    attributes: { 'data-page': `html/${name}.html` }
  }));
  return new StubElement({ classes: ['nav-group'], children: [toggle, panel] });
}

function fixture() {
  const groups = [
    makeGroup('workspace', { expanded: true }),
    makeGroup('manage'),
    makeGroup('preferences')
  ];
  const root = new StubRoot(groups);
  return { root, groups, toggles: groups.map(group => group.querySelector('.nav-group-toggle')), panels: groups.map(group => group.querySelector('.nav-group-pages')) };
}

function ariaExpanded(toggle) {
  return toggle.getAttribute('aria-expanded') === 'true';
}

test('initialization and initial page activation preserve Workspace open and hide the other panels', () => {
  const { root, groups, toggles, panels } = fixture();
  const reveal = setupNavigationGroups(root);
  reveal(groups[0].querySelector('.nav-link'));
  assert.equal(ariaExpanded(toggles[0]), true);
  assert.equal(panels[0].hidden, false);
  assert.equal(ariaExpanded(toggles[1]), false);
  assert.equal(panels[1].hidden, true);
  assert.equal(ariaExpanded(toggles[2]), false);
  assert.equal(panels[2].hidden, true);
  assert.equal(toggles[0].getAttribute('aria-disabled'), 'true');
  assert.equal(toggles[1].hasAttribute('aria-disabled'), false);
});

test('inactive categories expand and collapse without hiding the current page category', () => {
  const { root, groups, toggles, panels } = fixture();
  const reveal = setupNavigationGroups(root);
  reveal(groups[0].querySelector('.nav-link'));
  toggles[1].click();
  assert.equal(ariaExpanded(toggles[0]), true);
  assert.equal(panels[0].hidden, false);
  assert.equal(ariaExpanded(toggles[1]), true);
  assert.equal(panels[1].hidden, false);
  assert.equal(toggles[1].hasAttribute('aria-disabled'), false);
  assert.equal(toggles[0].getAttribute('aria-disabled'), 'true');
  toggles[1].click();
  assert.equal(ariaExpanded(toggles[1]), false);
  assert.equal(panels[1].hidden, true);
  assert.equal(panels[0].hidden, false);
});

test('clicking the active toggle does not collapse the active category', () => {
  const { root, groups, toggles, panels } = fixture();
  const reveal = setupNavigationGroups(root);
  reveal(groups[0].querySelector('.nav-link'));
  toggles[0].click();
  assert.equal(ariaExpanded(toggles[0]), true);
  assert.equal(panels[0].hidden, false);
  assert.equal(toggles[0].getAttribute('aria-disabled'), 'true');
});

test('reveal activates the containing category and closes all others', () => {
  const { root, groups, toggles, panels } = fixture();
  const reveal = setupNavigationGroups(root);
  const link = groups[2].querySelector('.nav-link');
  reveal(link);
  assert.equal(ariaExpanded(toggles[0]), false);
  assert.equal(panels[0].hidden, true);
  assert.equal(ariaExpanded(toggles[1]), false);
  assert.equal(panels[1].hidden, true);
  assert.equal(ariaExpanded(toggles[2]), true);
  assert.equal(panels[2].hidden, false);
  assert.equal(toggles[2].getAttribute('aria-disabled'), 'true');
  assert.equal(toggles[0].hasAttribute('aria-disabled'), false);
});

test('reveal keeps the active category open and does not navigate, write data, or steal focus', () => {
  const { root, groups, toggles } = fixture();
  const activeLink = groups[0].querySelector('.nav-link');
  const originalPage = activeLink.getAttribute('data-page');
  const activeElement = activeLink;
  const reveal = setupNavigationGroups(root);
  reveal(activeLink);
  assert.equal(ariaExpanded(toggles[0]), true);
  assert.equal(activeLink.getAttribute('data-page'), originalPage);
  assert.equal(activeLink.focusCount, 0);
  assert.equal(activeElement, activeLink);
});

test('index keeps all ten routes and defines the three named navigation groups', () => {
  const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
  const routes = [...html.matchAll(/data-page=["']([^"']+)["']/g)].map(match => match[1]);
  assert.deepEqual(routes, [
    'html/home.html',
    'html/clock.html',
    'html/viewshifts.html',
    'html/planned.html',
    'html/pay-period-review.html',
    'html/basic-data.html',
    'html/payledger.html',
    'html/ledger-archive.html',
    'html/invoice.html',
    'html/settings.html'
  ]);
  const classAttributes = [...html.matchAll(/class=["']([^"']+)["']/g)].map(match => match[1]);
  assert.equal(classAttributes.filter(value => value.split(/\s+/).includes('nav-group')).length, 3);
  assert.match(html, /Workspace/i);
  assert.match(html, /Manage/i);
  assert.match(html, /Preferences/i);
});

test('navigation styles include hidden panels and a mobile navigation layout', () => {
  const css = fs.readFileSync(path.join(projectRoot, 'styles/style.css'), 'utf8');
  assert.match(css, /(?:\.nav-group-pages|\.nav-group)[^{}]*\[hidden\]|\[hidden\][^{}]*\.nav-group-pages|\.nav-group-pages\[hidden\]/s);
  assert.match(css, /@media[^{]*(?:max-width|min-width)[^{]*\{[\s\S]*?nav-group/s);
});

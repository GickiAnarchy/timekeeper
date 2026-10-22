import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { setupNavigationGroups } from '../scripts/index.js';

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

  toggle(value, enabled) {
    if (enabled) this.add(value);
    else this.remove(value);
    return enabled;
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

function shellFixture(readyState = 'loading') {
  const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
  const shell = fs.readFileSync(path.join(projectRoot, 'scripts/index.js'), 'utf8');
  const { root, groups, toggles, panels } = fixture();
  panels.forEach(panel => { panel.children = []; });
  const routes = [...html.matchAll(/data-page="([^"]+)" data-title="([^"]+)"/g)];
  const navigation = routes.map(([, page, title], index) => {
    const button = new StubElement({ classes: ['nav-link'] });
    button.dataset = { page, title };
    if (!index) button.setAttribute('aria-current', 'page');
    panels[index < 4 ? 0 : index < 9 ? 1 : 2].append(button);
    return button;
  });
  const title = { textContent: 'Home' };
  const date = { textContent: '' };
  const frame = new StubElement();
  frame.src = 'html/home.html';
  frame.contentWindow = {
    location: { href: 'https://local.test/timekeeper/html/home.html' },
    postMessage() {}
  };
  const document = new StubElement();
  document.readyState = readyState;
  document.documentElement = { style: { setProperty() {} }, dataset: {}, clientHeight: 800 };
  document.body = { classList: new ClassList() };
  document.querySelectorAll = selector => selector === '.nav-link[data-page]' ? navigation : [];
  document.querySelector = selector => selector === '.sidebar-nav' ? root : frame;
  document.getElementById = id => id === 'active-page-title' ? title : date;
  const window = {
    innerHeight: 800,
    location: { href: 'https://local.test/timekeeper/', origin: 'https://local.test' },
    localStorage: { getItem() { return null; } },
    addEventListener() {}
  };
  // Execute the shipped entry point itself with no module resolver or network.
  // A new mandatory import would fail here, just like a missing deployed helper.
  vm.runInNewContext(shell.replace(/^export /gm, ''), { document, window, Intl, URL, console });
  return { document, frame, navigation, title, date, groups, toggles, panels };
}

test('self-contained shell boots and every route updates the frame, title and active group', () => {
  const { document, frame, navigation, title, date, toggles, panels } = shellFixture();
  assert.equal(date.textContent, '');
  document.dispatchEvent({ type: 'DOMContentLoaded' });
  assert.notEqual(date.textContent, '');
  assert.equal(navigation.length, 10);
  for (const [index, button] of navigation.entries()) {
    const groupIndex = index < 4 ? 0 : index < 9 ? 1 : 2;
    if (panels[groupIndex].hidden) toggles[groupIndex].click();
    button.click();
    assert.equal(frame.src, button.dataset.page);
    assert.equal(title.textContent, button.dataset.title);
    assert.equal(button.getAttribute('aria-current'), 'page');
    assert.equal(navigation.filter(item => item.getAttribute('aria-current') === 'page').length, 1);
    assert.equal(panels[groupIndex].hidden, false);
    assert.equal(toggles[groupIndex].getAttribute('aria-disabled'), 'true');
  }
});

test('shell initializes when loaded after DOMContentLoaded and follows in-frame navigation', () => {
  const { frame, navigation, title, date, panels } = shellFixture('complete');
  assert.notEqual(date.textContent, '');
  frame.contentWindow.location.href = 'https://local.test/timekeeper/html/settings.html';
  frame.dispatchEvent({ type: 'load' });
  assert.equal(title.textContent, 'Settings');
  assert.equal(navigation[9].getAttribute('aria-current'), 'page');
  assert.equal(panels[2].hidden, false);
  assert.equal(panels[0].hidden, true);
});

test('redesigned markup requests a versioned self-contained shell asset', () => {
  const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
  assert.match(html, /src="\.\/scripts\/index\.js\?v=grouped-nav-2"/);
});

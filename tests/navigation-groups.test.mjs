import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { setupNavigationGroups, setupNavigationPicker } from '../scripts/index.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, '..');

class ClassList {
  #values;
  constructor(values = []) { this.#values = new Set(values); }
  add(...values) { values.forEach(value => this.#values.add(value)); }
  remove(...values) { values.forEach(value => this.#values.delete(value)); }
  contains(value) { return this.#values.has(value); }
  toggle(value, enabled) { if (enabled) this.add(value); else this.remove(value); return enabled; }
}

class StubElement {
  #listeners = new Map();
  constructor({ classes = [], attributes = {}, children = [] } = {}) {
    this.classList = new ClassList(classes);
    this.attributes = new Map(Object.entries(attributes));
    this.children = [];
    this.parentElement = null;
    this.ownerDocument = null;
    this.hidden = false;
    this.focusCount = 0;
    this.textContent = '';
    this.dataset = {};
    children.forEach(child => this.append(child));
  }
  append(child) { child.parentElement = this; child.ownerDocument = this.ownerDocument; this.children.push(child); return child; }
  contains(node) { return node === this || this.children.some(child => child.contains(node)); }
  getAttribute(name) { return this.attributes.has(name) ? this.attributes.get(name) : null; }
  hasAttribute(name) { return this.attributes.has(name); }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  removeAttribute(name) { this.attributes.delete(name); }
  addEventListener(type, listener) { const listeners = this.#listeners.get(type) ?? []; listeners.push(listener); this.#listeners.set(type, listeners); }
  dispatchEvent(event) { event.target ??= this; event.currentTarget = this; for (const listener of this.#listeners.get(event.type) ?? []) listener.call(this, event); return !event.defaultPrevented; }
  click() { return this.dispatchEvent({ type: 'click', defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } }); }
  focus() { this.focusCount += 1; if (this.ownerDocument) this.ownerDocument.activeElement = this; }
  querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; }
  querySelectorAll(selector) { const matches = []; const visit = node => { if (node.matches(selector)) matches.push(node); node.children.forEach(visit); }; this.children.forEach(visit); return matches; }
  matches(selector) {
    if (selector.startsWith('.')) return this.classList.contains(selector.slice(1));
    return false;
  }
}

class StubRoot extends StubElement {
  constructor(groups) { super({ classes: ['sidebar-nav'], children: groups }); }
  querySelectorAll(selector) { if (selector === '.nav-group') return this.children; return super.querySelectorAll(selector); }
}

function setOwnerDocument(node, document) { node.ownerDocument = document; node.children.forEach(child => setOwnerDocument(child, document)); return node; }
function event(type, extra = {}) { return { type, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...extra }; }

function makeGroup(name, { expanded = false } = {}) {
  const toggle = new StubElement({ classes: ['nav-group-toggle'], attributes: { 'aria-controls': `${name}-panel`, 'aria-expanded': String(expanded) } });
  const panel = new StubElement({ classes: ['nav-group-pages'], attributes: { id: `${name}-panel` } });
  panel.hidden = !expanded;
  panel.append(new StubElement({ classes: ['nav-link'], attributes: { 'data-page': `html/${name}.html` } }));
  return new StubElement({ classes: ['nav-group'], children: [toggle, panel] });
}

function fixture() {
  const groups = [makeGroup('workspace', { expanded: true }), makeGroup('manage'), makeGroup('preferences')];
  const root = new StubRoot(groups);
  return { root, groups, toggles: groups.map(group => group.querySelector('.nav-group-toggle')), panels: groups.map(group => group.querySelector('.nav-group-pages')) };
}
function ariaExpanded(toggle) { return toggle.getAttribute('aria-expanded') === 'true'; }

test('navigation initialization reveals one active category and marks its toggle current', () => {
  const { root, groups, toggles, panels } = fixture();
  const reveal = setupNavigationGroups(root);
  reveal(groups[0].querySelector('.nav-link'));
  assert.equal(ariaExpanded(toggles[0]), true); assert.equal(panels[0].hidden, false);
  assert.equal(ariaExpanded(toggles[1]), false); assert.equal(panels[1].hidden, true);
  assert.equal(ariaExpanded(toggles[2]), false); assert.equal(panels[2].hidden, true);
  assert.equal(toggles[0].getAttribute('data-current'), 'true');
  assert.equal(toggles[0].hasAttribute('aria-disabled'), false);
});

test('category toggles are regular accordion controls with only one open at once', () => {
  const { root, groups, toggles, panels } = fixture();
  const reveal = setupNavigationGroups(root); reveal(groups[0].querySelector('.nav-link'));
  toggles[1].click();
  assert.equal(ariaExpanded(toggles[1]), true); assert.equal(panels[1].hidden, false);
  assert.equal(ariaExpanded(toggles[0]), false); assert.equal(panels[0].hidden, true);
  toggles[1].click(); assert.equal(ariaExpanded(toggles[1]), false); assert.equal(panels[1].hidden, true);
  assert.equal(toggles[0].hasAttribute('aria-disabled'), false);
});

test('reveal activates its category, closes others, and updates data-current', () => {
  const { root, groups, toggles, panels } = fixture();
  const reveal = setupNavigationGroups(root); reveal(groups[2].querySelector('.nav-link'));
  assert.equal(ariaExpanded(toggles[2]), true); assert.equal(panels[2].hidden, false);
  assert.equal(ariaExpanded(toggles[0]), false); assert.equal(ariaExpanded(toggles[1]), false);
  assert.equal(toggles[2].getAttribute('data-current'), 'true');
  assert.equal(toggles[0].hasAttribute('data-current'), false);
  assert.equal(toggles[1].hasAttribute('data-current'), false);
});

test('reveal is inert for an unrelated button and does not steal focus or navigate', () => {
  const { root, groups } = fixture(); const reveal = setupNavigationGroups(root);
  const link = groups[0].querySelector('.nav-link'); const page = link.getAttribute('data-page'); reveal(link);
  assert.equal(link.getAttribute('data-page'), page); assert.equal(link.focusCount, 0);
  reveal(new StubElement()); assert.equal(link.getAttribute('data-page'), page);
});

function pickerFixture() {
  const document = new StubElement(); document.ownerDocument = document; document.defaultView = document; document.activeElement = null;
  const toggle = new StubElement({ classes: ['nav-picker-toggle'], attributes: { 'aria-expanded': 'true' } });
  const label = new StubElement({ classes: ['nav-picker-label'] }); label.textContent = 'Home';
  const nav = new StubRoot([]); nav.classList.add('sidebar-nav');
  const root = new StubElement({ classes: ['sidebar'], children: [toggle, label, nav] });
  setOwnerDocument(root, document); document.append(root);
  return { document, root, toggle, label, nav };
}
function pickerButton(title, page = `html/${title.toLowerCase()}.html`) {
  const button = new StubElement({ classes: ['nav-link'], attributes: { 'data-page': page } });
  button.dataset = { title, page }; return button;
}

test('compact picker starts closed, toggles with click, and closes on Escape restoring focus', () => {
  const { document, root, toggle, nav } = pickerFixture(); const select = setupNavigationPicker(root);
  assert.equal(nav.hidden, true); assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  toggle.click(); assert.equal(nav.hidden, false); assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  document.activeElement = toggle; const key = event('keydown', { key: 'Escape' }); root.dispatchEvent(key);
  assert.equal(key.defaultPrevented, true); assert.equal(nav.hidden, true); assert.equal(toggle.getAttribute('aria-expanded'), 'false'); assert.equal(toggle.focusCount, 1);
  assert.equal(typeof select, 'function');
});

test('picker closes on outside pointerdown and focusout without restoring focus', () => {
  const { document, root, toggle, nav } = pickerFixture(); setupNavigationPicker(root); toggle.click();
  document.dispatchEvent(event('pointerdown', { target: new StubElement() }));
  assert.equal(nav.hidden, true); assert.equal(toggle.focusCount, 0);
  toggle.click(); root.dispatchEvent(event('focusout', { relatedTarget: new StubElement() }));
  assert.equal(nav.hidden, true); assert.equal(toggle.focusCount, 0);
});

test('picker closes on window blur without restoring focus', () => {
  const { document, root, toggle, nav } = pickerFixture();
  setupNavigationPicker(root);
  toggle.click();
  document.activeElement = new StubElement();
  document.dispatchEvent(event('blur'));
  assert.equal(nav.hidden, true);
  assert.equal(toggle.focusCount, 0);
});

test('picker select updates label and accessible name, closes, and restores focus only from inside panel', () => {
  const { document, root, toggle, label, nav } = pickerFixture(); const select = setupNavigationPicker(root);
  const button = pickerButton('Planned jobs'); nav.append(button); toggle.click(); document.activeElement = button;
  select(button);
  assert.equal(label.textContent, 'Planned jobs'); assert.equal(toggle.getAttribute('aria-label'), 'Pages, current page: Planned jobs');
  assert.equal(nav.hidden, true); assert.equal(toggle.focusCount, 1);
  toggle.click(); const outside = new StubElement(); document.activeElement = outside; select(button);
  assert.equal(toggle.focusCount, 1);
});

test('missing navigation roots are graceful', () => {
  assert.doesNotThrow(() => setupNavigationGroups(null));
  assert.doesNotThrow(() => setupNavigationPicker(null));
  assert.equal(typeof setupNavigationGroups(null), 'function'); assert.equal(typeof setupNavigationPicker(null), 'function');
});

test('index keeps nine main routes, omits People Data, and defines the three named navigation groups', () => {
  const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
  const routes = [...html.matchAll(/data-page=["']([^"']+)["']/g)].map(match => match[1]);
  assert.deepEqual(routes, ['html/home.html', 'html/clock.html', 'html/viewshifts.html', 'html/planned.html', 'html/pay-period-review.html', 'html/payledger.html', 'html/ledger-archive.html', 'html/invoice.html', 'html/settings.html']);
  assert.doesNotMatch(html, /data-page=["']html\/basic-data\.html["']/);
  const classAttributes = [...html.matchAll(/class=["']([^"']+)["']/g)].map(match => match[1]);
  assert.equal(classAttributes.filter(value => value.split(/\s+/).includes('nav-group')).length, 3);
  assert.match(html, /Workspace/i); assert.match(html, /Manage/i); assert.match(html, /Preferences/i);
});

test('compact navigation styles and versioned assets are present', () => {
  const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8'); const css = fs.readFileSync(path.join(projectRoot, 'styles/style.css'), 'utf8');
  assert.match(html, /(?:index\.js|style\.css)\?v=compact-nav-1/);
  assert.match(css, /\.sidebar-nav[^{}]*\[hidden\]|\[hidden\][^{}]*\.sidebar-nav/s);
  assert.match(css, /@media[^{]*(?:max-width|min-width)[^{]*\{[\s\S]*?sidebar-nav/s);
});

function shellFixture(readyState = 'loading') {
  const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8'); const shell = fs.readFileSync(path.join(projectRoot, 'scripts/index.js'), 'utf8');
  const { root: nav, groups, toggles, panels } = fixture(); panels.forEach(panel => { panel.children = []; });
  const pickerToggle = new StubElement({ classes: ['nav-picker-toggle'] }); const pickerLabel = new StubElement({ classes: ['nav-picker-label'] });
  const sidebar = new StubElement({ classes: ['sidebar'], children: [pickerToggle, pickerLabel, nav] });
  const document = new StubElement(); document.ownerDocument = document; document.readyState = readyState; document.activeElement = null; setOwnerDocument(sidebar, document); document.append(sidebar);
  const routes = [...html.matchAll(/data-page="([^"]+)" data-title="([^"]+)"/g)];
  const navigation = routes.map(([, page, title], index) => { const button = new StubElement({ classes: ['nav-link'] }); button.dataset = { page, title }; if (!index) button.setAttribute('aria-current', 'page'); panels[index < 4 ? 0 : index < 8 ? 1 : 2].append(button); return button; });
  const title = { textContent: 'Home' }; const date = { textContent: '' }; const frame = new StubElement(); frame.src = 'html/home.html'; frame.contentWindow = { location: { href: 'https://local.test/timekeeper/html/home.html' }, postMessage() {} };
  document.documentElement = { style: { setProperty() {} }, dataset: {}, clientHeight: 800 }; document.body = { classList: new ClassList() }; document.querySelectorAll = selector => selector === '.nav-link[data-page]' ? navigation : [];
  document.querySelector = selector => selector === '.sidebar' ? sidebar : selector === '.sidebar-nav' ? nav : frame; document.getElementById = id => id === 'active-page-title' ? title : date;
  const window = { innerHeight: 800, location: { href: 'https://local.test/timekeeper/', origin: 'https://local.test' }, localStorage: { getItem() { return null; } }, addEventListener() {} };
  vm.runInNewContext(shell.replace(/^export /gm, ''), { document, window, Intl, URL, console });
  return { document, frame, navigation, title, date, groups, toggles, panels, pickerToggle, pickerLabel };
}

test('self-contained shell boots and every route updates the frame, title, active group, and picker label', () => {
  const { document, frame, navigation, title, date, toggles, panels, pickerLabel } = shellFixture(); document.dispatchEvent(event('DOMContentLoaded')); assert.notEqual(date.textContent, '');
  assert.equal(navigation.length, 9);
  for (const [index, button] of navigation.entries()) { const groupIndex = index < 4 ? 0 : index < 8 ? 1 : 2; if (panels[groupIndex].hidden) toggles[groupIndex].click(); button.click(); assert.equal(frame.src, button.dataset.page); assert.equal(title.textContent, button.dataset.title); assert.equal(button.getAttribute('aria-current'), 'page'); assert.equal(navigation.filter(item => item.getAttribute('aria-current') === 'page').length, 1); assert.equal(panels[groupIndex].hidden, false); assert.equal(toggles[groupIndex].getAttribute('data-current'), 'true'); assert.equal(pickerLabel.textContent, button.dataset.title); }
});

test('shell initializes when loaded after DOMContentLoaded and follows in-frame navigation', () => {
  const { frame, navigation, title, date, panels } = shellFixture('complete'); assert.notEqual(date.textContent, ''); frame.contentWindow.location.href = 'https://local.test/timekeeper/html/settings.html'; frame.dispatchEvent(event('load')); assert.equal(title.textContent, 'Settings'); assert.equal(navigation[8].getAttribute('aria-current'), 'page'); assert.equal(panels[2].hidden, false); assert.equal(panels[0].hidden, true);
});

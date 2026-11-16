import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const calendarSource = readFileSync(new URL('../calendar/cal.js', import.meta.url), 'utf8');
const calendarHtml = readFileSync(new URL('../calendar/calender.html', import.meta.url), 'utf8');

class FakeElement {
  constructor(tagName = 'div') {
    this.tagName = tagName;
    this.children = [];
    this.dataset = {};
    this.attributes = {};
    this.listeners = new Map();
    this.classNames = new Set();
    this.classList = {
      add: (...names) => names.forEach(name => this.classNames.add(name)),
      contains: name => this.classNames.has(name)
    };
    this._innerHTML = '';
    this.textContent = '';
    this.title = '';
  }
  set innerHTML(value) {
    this._innerHTML = value;
    this.children = [];
  }
  get innerHTML() {
    return this._innerHTML;
  }
  appendChild(child) {
    this.children.push(child);
    return child;
  }
  addEventListener(type, callback) {
    const callbacks = this.listeners.get(type) || [];
    callbacks.push(callback);
    this.listeners.set(type, callbacks);
  }
  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }
  click() {
    for (const callback of this.listeners.get('click') || []) callback();
  }
}

test('calendar uses the read-only shift loader and marks days with saved shifts', async () => {
  assert.match(calendarSource, /import\s+\{\s*store\s*\}\s+from\s+['"]\.\.\/scripts\/models\.js['"]/);
  assert.doesNotMatch(calendarSource, /store\.init\s*\(/, 'calendar must not initialize ledger settlement/archive work');
  assert.match(calendarHtml, /<script\s+type=["']module["']\s+src=["']\.\/cal\.js["']/i);

  const today = new Date();
  const store = {
    shifts: [],
    loadCalls: 0,
    initCalls: 0,
    async loadShifts() {
      this.loadCalls++;
      this.shifts = [
        { clockInTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9) },
        { clockInTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13) },
        { clockInTime: null }
      ];
    },
    async init() {
      this.initCalls++;
    }
  };
  const makeButton = new FakeElement('button');
  const daysContainer = new FakeElement('div');
  const monthText = new FakeElement('span');
  const elements = new Map([
    ['make', makeButton],
    ['days-container', daysContainer],
    ['month-text', monthText]
  ]);
  let domReady;
  const document = {
    addEventListener(type, callback) {
      assert.equal(type, 'DOMContentLoaded');
      domReady = callback;
    },
    getElementById(id) {
      return elements.get(id) || null;
    },
    createElement(tagName) {
      return new FakeElement(tagName);
    }
  };
  const executableCalendar = calendarSource.replace(
    /^import\s+\{\s*store\s*\}\s+from\s+['"]\.\.\/scripts\/models\.js['"];\s*/m,
    ''
  );
  vm.runInNewContext(executableCalendar, {
    document,
    store,
    Date,
    console: { log() {} },
    alert() {}
  });

  await domReady();
  assert.equal(store.loadCalls, 1, 'calendar should load saved shift records exactly once');
  assert.equal(store.initCalls, 0, 'calendar must not call store.init()');

  makeButton.click();
  const dayButton = daysContainer.children.find(element => element.tagName === 'button' && Number(element.textContent) === today.getDate());
  assert.ok(dayButton, 'current day should be rendered as a button');
  assert.equal(dayButton.dataset.shiftCount, '2');
  assert.equal(dayButton.classList.contains('has-shifts'), true);
  assert.equal(dayButton.title, '2 saved shifts');
  assert.equal(dayButton.attributes['aria-label'], `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}, 2 saved shifts`);
});

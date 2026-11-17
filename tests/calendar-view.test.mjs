import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  calendarDateKey,
  calendarMonthLabel,
  moveCalendarMonth,
  normalizeCalendarDate,
  renderCalendarGrid,
  setupCalendarDisplay
} from '../scripts/calendar-view.mjs';

class FakeElement {
  constructor(tagName = 'div') {
    this.tagName = tagName.toLowerCase();
    this.children = [];
    this.dataset = {};
    this.attributes = {};
    this.listeners = new Map();
    this.hidden = false;
    this.className = '';
    this.textContent = '';
    this.type = '';
    this.classList = {
      add: (...names) => { this.className = [...new Set(`${this.className} ${names.join(' ')}`.trim().split(/\s+/))].join(' '); },
      contains: name => this.className.split(/\s+/).includes(name)
    };
  }
  appendChild(child) { this.children.push(child); return child; }
  replaceChildren(...children) { this.children = children; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  addEventListener(type, callback) {
    const callbacks = this.listeners.get(type) || [];
    callbacks.push(callback);
    this.listeners.set(type, callbacks);
  }
  contains(target) { return this === target || this.children.some(child => child.contains?.(target)); }
  querySelectorAll(selector) {
    const matches = [];
    const visit = element => {
      if (selector === 'button[data-calendar-date]' && element.tagName === 'button' && element.dataset.calendarDate) matches.push(element);
      element.children.forEach(visit);
    };
    this.children.forEach(visit);
    return matches;
  }
  focus(options) { this.focused = true; this.focusOptions = options; }
  closest(selector) {
    if (selector === 'button[data-calendar-date]' && this.tagName === 'button' && this.dataset.calendarDate) return this;
    return null;
  }
  click(target = this) {
    for (const callback of this.listeners.get('click') || []) callback({ target });
  }
}

const fakeDocument = {
  createElement: tagName => new FakeElement(tagName)
};

function calendarFixture() {
  const elements = {
    listButton: new FakeElement('button'),
    calendarButton: new FakeElement('button'),
    listView: new FakeElement('div'),
    calendarView: new FakeElement('section'),
    previousButton: new FakeElement('button'),
    nextButton: new FakeElement('button'),
    todayButton: new FakeElement('button'),
    monthLabel: new FakeElement('h2'),
    grid: new FakeElement('div')
  };
  const selectedDays = [];
  let records = [
    { date: '2026-11-16', label: 'First shift' },
    { date: '2026-11-16', label: 'Second shift' },
    { date: '2026-11-20', label: 'Another day' }
  ];
  const display = setupCalendarDisplay({
    ...elements,
    initialDate: new Date(2026, 10, 16, 12),
    getRecords: () => records,
    getDate: record => record.date,
    getSummary: dayRecords => `${dayRecords.length} shift${dayRecords.length === 1 ? '' : 's'}`,
    renderSelectedDay: (date, dayRecords) => selectedDays.push({ key: calendarDateKey(date), labels: dayRecords.map(record => record.label) }),
    documentRef: fakeDocument
  });
  return { ...elements, selectedDays, setRecords(nextRecords) { records = nextRecords; }, display };
}

test('calendar date parsing is local-date safe and rejects impossible date-only values', () => {
  assert.equal(calendarDateKey('2026-11-16'), '2026-11-16');
  assert.equal(calendarDateKey(new Date(2026, 10, 16, 23, 59)), '2026-11-16');
  assert.equal(normalizeCalendarDate('2024-02-29').getDate(), 29);
  assert.equal(normalizeCalendarDate('2026-02-29'), null);
  assert.equal(calendarDateKey(''), '');
});

test('month navigation preserves the selected day where possible and clamps short months', () => {
  assert.equal(calendarDateKey(moveCalendarMonth(new Date(2026, 10, 16, 12), -1)), '2026-10-16');
  assert.equal(calendarDateKey(moveCalendarMonth(new Date(2026, 0, 31, 12), 1)), '2026-02-28');
  assert.match(calendarMonthLabel(new Date(2026, 10, 16, 12)), /November 2026/);
});

test('calendar grid renders date-specific record summaries and marks the selected day', () => {
  const grid = new FakeElement('div');
  renderCalendarGrid({
    container: grid,
    month: new Date(2026, 10, 1, 12),
    records: [{ date: '2026-11-16' }, { date: '2026-11-16' }],
    getDate: record => record.date,
    getSummary: records => `${records.length} saved shifts`,
    selectedDate: new Date(2026, 10, 16, 12),
    documentRef: fakeDocument
  });
  const dayButton = grid.children.find(child => child.dataset.calendarDate === '2026-11-16');
  assert.ok(dayButton, 'the selected day should be a button');
  assert.equal(dayButton.attributes['aria-pressed'], 'true');
  assert.match(dayButton.attributes['aria-label'], /2 saved shifts/);
  assert.equal(dayButton.classList.contains('has-records'), true);
  assert.equal(grid.children.filter(child => child.tagName === 'span' && child.classList.contains('calendar-weekday')).length, 7);
  assert.equal(grid.children.length % 7, 0, 'weekday headers and days should fill complete week rows');
});

test('List is the default; toggle, month navigation, day selection, and refresh update the view', () => {
  const fixture = calendarFixture();
  assert.equal(fixture.display.activeView, 'list');
  assert.equal(fixture.listView.hidden, false);
  assert.equal(fixture.calendarView.hidden, true);
  assert.equal(fixture.listButton.attributes['aria-pressed'], 'true');

  fixture.calendarButton.click();
  assert.equal(fixture.display.activeView, 'calendar');
  assert.equal(fixture.listView.hidden, true);
  assert.equal(fixture.calendarView.hidden, false);
  assert.match(fixture.monthLabel.textContent, /November 2026/);
  assert.deepEqual(fixture.selectedDays.at(-1).labels, ['First shift', 'Second shift']);

  fixture.previousButton.click();
  assert.match(fixture.monthLabel.textContent, /October 2026/);
  fixture.nextButton.click();
  assert.match(fixture.monthLabel.textContent, /November 2026/);

  const selectedDay = fixture.grid.children.find(child => child.dataset.calendarDate === '2026-11-20');
  fixture.grid.click(selectedDay);
  assert.equal(calendarDateKey(fixture.display.selectedDate), '2026-11-20');
  assert.deepEqual(fixture.selectedDays.at(-1).labels, ['Another day']);
  assert.equal(fixture.grid.children.find(child => child.dataset.calendarDate === '2026-11-20').focused, true);

  fixture.setRecords([{ date: '2026-11-20', label: 'Updated record' }]);
  fixture.display.refresh();
  assert.deepEqual(fixture.selectedDays.at(-1).labels, ['Updated record']);
  fixture.listButton.click();
  assert.equal(fixture.listView.hidden, false);
  assert.equal(fixture.calendarView.hidden, true);
  assert.equal(fixture.calendarButton.attributes['aria-pressed'], 'false');
});

test('shift history, planned jobs, and ledger expose the shared toggle while retaining full record details', () => {
  const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
  const shiftHtml = read('../html/viewshifts.html');
  const plannedHtml = read('../html/planned.html');
  const ledgerHtml = read('../html/payledger.html');
  const shiftScript = read('../scripts/shifts.js');
  const plannedScript = read('../scripts/planned.js');
  const ledgerScript = read('../scripts/ledger.js');

  for (const [html, listId, calendarId] of [
    [shiftHtml, 'shift-list-view-button', 'shift-calendar-view-button'],
    [plannedHtml, 'planned-list-view-button', 'planned-calendar-view-button'],
    [ledgerHtml, 'ledger-list-view-button', 'ledger-calendar-view-button']
  ]) {
    assert.match(html, new RegExp(`id="${listId}"[^>]*aria-pressed="true"`));
    assert.match(html, new RegExp(`id="${calendarId}"[^>]*aria-pressed="false"`));
  }
  assert.match(shiftHtml, /id="shift-calendar-day-list"/);
  assert.match(plannedHtml, /id="planned-calendar-day-list"[\s\S]*?id="planned-calendar-tbd-list"/);
  assert.match(ledgerHtml, /id="ledger-calendar-balance"[\s\S]*?id="ledger-calendar-hours"/);
  assert.match(ledgerHtml, /id="ledger-calendar-undated-list"/);
  assert.match(shiftScript, /getRecords: getFilteredCompleteShifts/);
  assert.match(shiftScript, /shiftCalendarList\.addEventListener\('click', handleShiftCardAction\)/);
  assert.match(plannedScript, /getRecords: visibleJobs/);
  assert.match(plannedScript, /plannedCalendarTbdList\.addEventListener\('click', handlePlannedJobAction\)/);
  assert.match(ledgerScript, /getRecords: \(\) => ledgerFilter\.value \? filteredEntries\(\) : \[\]/);
  assert.match(ledgerScript, /currentEntries\.filter\(entry => !calendarDateKey\(entry\.date\)\)/);
  assert.match(ledgerScript, /ledger-calendar-actions ledger-admin-control-group/);
});

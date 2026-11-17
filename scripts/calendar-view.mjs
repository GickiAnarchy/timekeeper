// Shared date and display helpers keep the optional calendar view consistent on every page.
const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const fullDateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
});
const monthFormatter = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' });

// Calendar dates are normalized to local noon so date-only records never shift across time zones.
export function normalizeCalendarDate(value) {
  let date;
  if (value instanceof Date) {
    if (!Number.isFinite(value.getTime())) return null;
    date = new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12);
  } else if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number);
    date = new Date(year, month - 1, day, 12);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  } else if (value !== null && value !== undefined && value !== '') {
    const parsed = new Date(value);
    if (!Number.isFinite(parsed.getTime())) return null;
    date = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 12);
  } else {
    return null;
  }
  return date;
}

export function calendarDateKey(value) {
  const date = normalizeCalendarDate(value);
  if (!date) return '';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function calendarMonthLabel(value) {
  const date = normalizeCalendarDate(value);
  return date ? monthFormatter.format(new Date(date.getFullYear(), date.getMonth(), 1, 12)) : '';
}

// Move by whole calendar months while keeping the selected day where possible.
export function moveCalendarMonth(value, amount) {
  const date = normalizeCalendarDate(value) || normalizeCalendarDate(new Date());
  const targetFirst = new Date(date.getFullYear(), date.getMonth() + Number(amount || 0), 1, 12);
  const finalDay = new Date(targetFirst.getFullYear(), targetFirst.getMonth() + 1, 0).getDate();
  return new Date(targetFirst.getFullYear(), targetFirst.getMonth(), Math.min(date.getDate(), finalDay), 12);
}

function createElement(documentRef, tagName, className = '') {
  const element = documentRef.createElement(tagName);
  if (className) element.className = className;
  return element;
}

// Render a compact month grid from the page's existing in-memory records; this never loads or writes data.
export function renderCalendarGrid({
  container,
  month,
  records,
  getDate,
  getSummary = () => '',
  selectedDate,
  documentRef = globalThis.document
}) {
  if (!container || !documentRef) return;
  const monthDate = normalizeCalendarDate(month) || normalizeCalendarDate(new Date());
  const selectedKey = calendarDateKey(selectedDate);
  const daysByKey = new Map();
  for (const record of records || []) {
    const key = calendarDateKey(getDate?.(record));
    if (!key) continue;
    const dayRecords = daysByKey.get(key) || [];
    dayRecords.push(record);
    daysByKey.set(key, dayRecords);
  }

  container.replaceChildren();
  for (const label of WEEKDAY_LABELS) {
    const weekday = createElement(documentRef, 'span', 'calendar-weekday');
    weekday.textContent = label;
    weekday.setAttribute('aria-hidden', 'true');
    container.appendChild(weekday);
  }

  const year = monthDate.getFullYear();
  const monthIndex = monthDate.getMonth();
  const firstWeekday = new Date(year, monthIndex, 1, 12).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  for (let slot = 0; slot < firstWeekday; slot += 1) {
    const blank = createElement(documentRef, 'span', 'calendar-day calendar-day-empty');
    blank.setAttribute('aria-hidden', 'true');
    container.appendChild(blank);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, monthIndex, day, 12);
    const key = calendarDateKey(date);
    const dayRecords = daysByKey.get(key) || [];
    const summaryText = dayRecords.length ? String(getSummary(dayRecords, date) || '') : '';
    const button = createElement(documentRef, 'button', `calendar-day${dayRecords.length ? ' has-records' : ''}${key === selectedKey ? ' is-selected' : ''}`);
    button.type = 'button';
    button.dataset.calendarDate = key;
    button.setAttribute('aria-pressed', String(key === selectedKey));
    button.setAttribute('aria-label', `${fullDateFormatter.format(date)}${summaryText ? `, ${summaryText}` : ', no records'}`);
    if (calendarDateKey(new Date()) === key) button.setAttribute('aria-current', 'date');
    const number = createElement(documentRef, 'span', 'calendar-day-number');
    number.textContent = String(day);
    button.appendChild(number);
    if (summaryText) {
      const summary = createElement(documentRef, 'span', 'calendar-day-summary');
      summary.textContent = summaryText;
      button.appendChild(summary);
    }
    container.appendChild(button);
  }
  const trailingSlots = (7 - ((firstWeekday + daysInMonth) % 7)) % 7;
  for (let slot = 0; slot < trailingSlots; slot += 1) {
    const blank = createElement(documentRef, 'span', 'calendar-day calendar-day-empty');
    blank.setAttribute('aria-hidden', 'true');
    container.appendChild(blank);
  }
}

// Wire the common toggle and month navigation; callers supply only record-specific summaries and details.
export function setupCalendarDisplay({
  listButton,
  calendarButton,
  listView,
  calendarView,
  previousButton,
  nextButton,
  todayButton,
  monthLabel,
  grid,
  getRecords,
  getDate,
  getSummary,
  renderSelectedDay,
  initialDate = new Date(),
  documentRef = globalThis.document
}) {
  let selectedDate = normalizeCalendarDate(initialDate) || normalizeCalendarDate(new Date());
  let activeView = 'list';

  function refresh() {
    const records = getRecords?.() || [];
    if (monthLabel) monthLabel.textContent = calendarMonthLabel(selectedDate);
    renderCalendarGrid({
      container: grid,
      month: selectedDate,
      records,
      getDate,
      getSummary,
      selectedDate,
      documentRef
    });
    const selectedKey = calendarDateKey(selectedDate);
    const selectedRecords = records.filter(record => calendarDateKey(getDate?.(record)) === selectedKey);
    renderSelectedDay?.(selectedDate, selectedRecords, records);
  }

  function setView(view) {
    activeView = view === 'calendar' ? 'calendar' : 'list';
    const showCalendar = activeView === 'calendar';
    if (listButton) listButton.setAttribute('aria-pressed', String(!showCalendar));
    if (calendarButton) calendarButton.setAttribute('aria-pressed', String(showCalendar));
    if (listView) listView.hidden = showCalendar;
    if (calendarView) calendarView.hidden = !showCalendar;
    if (showCalendar) refresh();
  }

  listButton?.addEventListener('click', () => setView('list'));
  calendarButton?.addEventListener('click', () => setView('calendar'));
  previousButton?.addEventListener('click', () => {
    selectedDate = moveCalendarMonth(selectedDate, -1);
    refresh();
  });
  nextButton?.addEventListener('click', () => {
    selectedDate = moveCalendarMonth(selectedDate, 1);
    refresh();
  });
  todayButton?.addEventListener('click', () => {
    selectedDate = normalizeCalendarDate(new Date());
    refresh();
  });
  grid?.addEventListener('click', event => {
    const button = event.target?.closest?.('button[data-calendar-date]');
    if (!button || !grid.contains(button)) return;
    selectedDate = normalizeCalendarDate(button.dataset.calendarDate);
    refresh();
    // Re-rendering replaces day buttons; return focus to the newly selected date instead of the document body.
    const replacement = [...grid.querySelectorAll('button[data-calendar-date]')]
      .find(dayButton => dayButton.dataset.calendarDate === calendarDateKey(selectedDate));
    replacement?.focus({ preventScroll: true });
  });

  setView('list');
  return {
    refresh,
    get activeView() { return activeView; },
    get selectedDate() { return new Date(selectedDate); }
  };
}

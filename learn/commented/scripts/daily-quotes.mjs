// Original L1: Publishes the DAILY_QUOTE_TIME_ZONE constant for other modules; its value is shared configuration/data rather than page-local state.
export const DAILY_QUOTE_TIME_ZONE = 'America/Chicago';
// Original L2: Blank line separates related statements and has no runtime effect.

// Original L3: Stores WALDEN_SOURCE, the authoritative source URL displayed with this quote; later code reuses this result so the daily-quotes.mjs workflow stays consistent.
const WALDEN_SOURCE = 'https://www.gutenberg.org/files/205/205-h/205-h.htm';
// Original L4: Stores EMERSON_SOURCE, the authoritative source URL displayed with this quote; later code reuses this result so the daily-quotes.mjs workflow stays consistent.
const EMERSON_SOURCE = 'https://www.gutenberg.org/files/16643/16643-h/16643-h.htm';
// Original L5: Stores FRANKLIN_SOURCE, the authoritative source URL displayed with this quote; later code reuses this result so the daily-quotes.mjs workflow stays consistent.
const FRANKLIN_SOURCE = 'https://www.gutenberg.org/files/148/148-h/148-h.htm';
// Original L6: Stores LINCOLN_SOURCE, the authoritative source URL displayed with this quote; later code reuses this result so the daily-quotes.mjs workflow stays consistent.
const LINCOLN_SOURCE = 'https://www.gutenberg.org/files/3253/3253-h/3253-h.htm';
// Original L7: Stores MISC_SOURCE, the authoritative source URL displayed with this quote; later code reuses this result so the daily-quotes.mjs workflow stays consistent.
const MISC_SOURCE = 'https://www.youtube.com/mindofmagick';
// Original L8: Blank line separates related statements and has no runtime effect.

// Original L9: This comment documents the design intent here: Classic entries are from pre-1929 public-domain works; creator quote links use their supplied source URLs..
// Classic entries are from pre-1929 public-domain works; creator quote links use their supplied source URLs.
// Original L10: Publishes the DAILY_QUOTES constant for other modules; its value is shared configuration/data rather than page-local state.
export const DAILY_QUOTES = Object.freeze([
// Original L11: Defines field text as "I went to the woods because I wished to live deliberately.".
  Object.freeze({ text: 'I went to the woods because I wished to live deliberately.', author: 'Henry David Thoreau', work: 'Walden', source: WALDEN_SOURCE }),
// Original L12: Defines field text as "I know of no more encouraging fact than the unquestionable ability of man to elevate his life by a conscious endeavor.".
  Object.freeze({ text: 'I know of no more encouraging fact than the unquestionable ability of man to elevate his life by a conscious endeavor.', author: 'Henry David Thoreau', work: 'Walden', source: WALDEN_SOURCE }),
// Original L13: Defines field text as "To affect the quality of the day, that is the highest of arts.".
  Object.freeze({ text: 'To affect the quality of the day, that is the highest of arts.', author: 'Henry David Thoreau', work: 'Walden', source: WALDEN_SOURCE }),
// Original L14: Defines field text as "Simplicity, simplicity, simplicity!".
  Object.freeze({ text: 'Simplicity, simplicity, simplicity!', author: 'Henry David Thoreau', work: 'Walden', source: WALDEN_SOURCE }),
// Original L15: Defines field text as "Our life is frittered away by detail.".
  Object.freeze({ text: 'Our life is frittered away by detail.', author: 'Henry David Thoreau', work: 'Walden', source: WALDEN_SOURCE }),
// Original L16: Defines field text as "The cost of a thing is the amount of what I will call life which is required to be exchanged for it, immediately or in the long run.".
  Object.freeze({ text: 'The cost of a thing is the amount of what I will call life which is required to be exchanged for it, immediately or in the long run.', author: 'Henry David Thoreau', work: 'Walden', source: WALDEN_SOURCE }),
// Original L17: Defines field text as "Life is our dictionary.".
  Object.freeze({ text: 'Life is our dictionary.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
// Original L18: Defines field text as "Character is higher than intellect.".
  Object.freeze({ text: 'Character is higher than intellect.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
// Original L19: Defines field text as "Time shall teach him that the scholar loses no hour which the man lives.".
  Object.freeze({ text: 'Time shall teach him that the scholar loses no hour which the man lives.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
// Original L20: Defines field text as "The day is always his who works in it with serenity and great aims.".
  Object.freeze({ text: 'The day is always his who works in it with serenity and great aims.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
// Original L21: Defines field text as "Do your work, and I shall know you.".
  Object.freeze({ text: 'Do your work, and I shall know you.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
// Original L22: Defines field text as "Do your work, and you shall reinforce yourself.".
  Object.freeze({ text: 'Do your work, and you shall reinforce yourself.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
// Original L23: Defines field text as "What I must do is all that concerns me, not what the people think.".
  Object.freeze({ text: 'What I must do is all that concerns me, not what the people think.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
// Original L24: Defines field text as "The great man is he who in the midst of the crowd keeps with perfect sweetness the independence of solitude.".
  Object.freeze({ text: 'The great man is he who in the midst of the crowd keeps with perfect sweetness the independence of solitude.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
// Original L25: Defines field text as "The present little sacrifice of your vanity will afterwards be amply repaid.".
  Object.freeze({ text: 'The present little sacrifice of your vanity will afterwards be amply repaid.', author: 'Benjamin Franklin', work: 'The Autobiography of Benjamin Franklin', source: FRANKLIN_SOURCE }),
// Original L26: Defines field text as "Let us have faith that right makes might, and in that faith let us to the end dare to do our duty as we understand it.".
  Object.freeze({ text: 'Let us have faith that right makes might, and in that faith let us to the end dare to do our duty as we understand it.', author: 'Abraham Lincoln', work: 'Cooper Union Address', source: LINCOLN_SOURCE }),
// Original L27: Defines field text as "Drugs are fun. Especially when you are high.".
  Object.freeze({ text: 'Drugs are fun. Especially when you are high.', author: 'Turpin Tine', work: 'Unemployed', source: MISC_SOURCE })
// Original L28: Closes the surrounding block or callback; no additional operation occurs on this line.
]);
// Original L29: Blank line separates related statements and has no runtime effect.

// Original L30: Declares dateKeyInTimeZone(), which formats a valid Date as a calendar key in the configured time zone.
export function dateKeyInTimeZone(date, timeZone = DAILY_QUOTE_TIME_ZONE) {
// Original L31: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
// Original L32: Rejects invalid application data immediately so callers cannot save misleading payroll or billing results.
    throw new TypeError('A valid Date is required to select the daily quote.');
// Original L33: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L34: Blank line separates related statements and has no runtime effect.

// Original L35: Stores parts, a locale-aware formatter for review money or dates; later code reuses this result so the daily-quotes.mjs workflow stays consistent.
  const parts = new Intl.DateTimeFormat('en-US', {
// Original L36: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    timeZone,
// Original L37: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    year: 'numeric',
// Original L38: Supplies another named imported value in the module dependency list, giving this page access to that helper.
    month: '2-digit',
// Original L39: Sets the day property of the current application record/configuration object, preserving the value needed by downstream rendering or calculations.
    day: '2-digit'
// Original L40: Completes this application statement, applying the shown value or operation to the current page state/data record.
  }).formatToParts(date);
// Original L41: Stores part, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the daily-quotes.mjs workflow stays consistent.
  const part = type => parts.find(item => item.type === type)?.value;
// Original L42: Returns a text template that combines fixed text with computed values calls `part` with "year", calls `part` with "month", calls `part` with "day" to the caller and exits this function.
  return `${part('year')}-${part('month')}-${part('day')}`;
// Original L43: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L44: Blank line separates related statements and has no runtime effect.

// Original L45: Defines the private helper hashCalendarDay for this page; keeping it local prevents unrelated pages from depending on UI details.
function hashCalendarDay(dayNumber) {
// Original L46: Creates mutable hash state for this workflow; it changes as the user selects, edits, or loads records.
  let hash = dayNumber | 0;
// Original L47: Completes this application statement, applying the shown value or operation to the current page state/data record.
  hash ^= hash >>> 16;
// Original L48: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
  hash = Math.imul(hash, 0x7feb352d);
// Original L49: Completes this application statement, applying the shown value or operation to the current page state/data record.
  hash ^= hash >>> 15;
// Original L50: Performs the numeric/date normalization needed for accurate hours, cents, sorting, or display in this workflow.
  hash = Math.imul(hash, 0x846ca68b);
// Original L51: Completes this application statement, applying the shown value or operation to the current page state/data record.
  hash ^= hash >>> 16;
// Original L52: Returns shifts `hash` (hash) right by 0 bits, filling with zeroes to the caller and exits this function.
  return hash >>> 0;
// Original L53: Closes the surrounding block or callback; no additional operation occurs on this line.
}
// Original L54: Blank line separates related statements and has no runtime effect.

// Original L55: Declares selectDailyQuote(), which chooses a deterministic quote for the calendar day while alternating index groups.
export function selectDailyQuote(date = new Date(), quotes = DAILY_QUOTES, timeZone = DAILY_QUOTE_TIME_ZONE) {
// Original L56: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (!Array.isArray(quotes) || quotes.length === 0) {
// Original L57: Rejects invalid application data immediately so callers cannot save misleading payroll or billing results.
    throw new TypeError('At least one quote is required.');
// Original L58: Closes the surrounding block or callback; no additional operation occurs on this line.
  }
// Original L59: Blank line separates related statements and has no runtime effect.

// Original L60: Stores destructured values, value; later code reuses this result so the daily-quotes.mjs workflow stays consistent.
  const [year, month, day] = dateKeyInTimeZone(date, timeZone).split('-').map(Number);
// Original L61: Stores calendarDay, a derived numeric value used by the app’s hours, cents, or date arithmetic; later code reuses this result so the daily-quotes.mjs workflow stays consistent.
  const calendarDay = Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
// Original L62: Checks this guard before continuing; invalid, missing, or disallowed records take the safe branch.
  if (quotes.length === 1) return quotes[0];
// Original L63: Blank line separates related statements and has no runtime effect.

// Original L64: This comment documents the design intent here: Alternate disjoint index groups by date parity to guarantee adjacent days differ..
  // Alternate disjoint index groups by date parity to guarantee adjacent days differ.
// Original L65: Stores parity, value; later code reuses this result so the daily-quotes.mjs workflow stays consistent.
  const parity = ((calendarDay % 2) + 2) % 2;
// Original L66: Stores eligibleIndexes, a small callback that normalizes, filters, compares, or maps records for the surrounding calculation; later code reuses this result so the daily-quotes.mjs workflow stays consistent.
  const eligibleIndexes = quotes.map((_, index) => index).filter(index => index % 2 === parity);
// Original L67: Stores selectedIndex, value; later code reuses this result so the daily-quotes.mjs workflow stays consistent.
  const selectedIndex = eligibleIndexes[hashCalendarDay(calendarDay) % eligibleIndexes.length];
// Original L68: Returns the entry at index/key `selectedIndex` (selected index) in `quotes` (quotes) to the caller and exits this function.
  return quotes[selectedIndex];
// Original L69: Closes the surrounding block or callback; no additional operation occurs on this line.
}

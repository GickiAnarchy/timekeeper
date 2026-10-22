export const DAILY_QUOTE_TIME_ZONE = 'America/Chicago';

const WALDEN_SOURCE = 'https://www.gutenberg.org/files/205/205-h/205-h.htm';
const EMERSON_SOURCE = 'https://www.gutenberg.org/files/16643/16643-h/16643-h.htm';
const FRANKLIN_SOURCE = 'https://www.gutenberg.org/files/148/148-h/148-h.htm';
const LINCOLN_SOURCE = 'https://www.gutenberg.org/files/3253/3253-h/3253-h.htm';
const MISC_SOURCE = 'https://www.youtube.com/mindofmagick';

// Classic entries are from pre-1929 public-domain works; creator quote links use their supplied source URLs.
export const DAILY_QUOTES = Object.freeze([
  Object.freeze({ text: 'I went to the woods because I wished to live deliberately.', author: 'Henry David Thoreau', work: 'Walden', source: WALDEN_SOURCE }),
  Object.freeze({ text: 'I know of no more encouraging fact than the unquestionable ability of man to elevate his life by a conscious endeavor.', author: 'Henry David Thoreau', work: 'Walden', source: WALDEN_SOURCE }),
  Object.freeze({ text: 'To affect the quality of the day, that is the highest of arts.', author: 'Henry David Thoreau', work: 'Walden', source: WALDEN_SOURCE }),
  Object.freeze({ text: 'Simplicity, simplicity, simplicity!', author: 'Henry David Thoreau', work: 'Walden', source: WALDEN_SOURCE }),
  Object.freeze({ text: 'Our life is frittered away by detail.', author: 'Henry David Thoreau', work: 'Walden', source: WALDEN_SOURCE }),
  Object.freeze({ text: 'The cost of a thing is the amount of what I will call life which is required to be exchanged for it, immediately or in the long run.', author: 'Henry David Thoreau', work: 'Walden', source: WALDEN_SOURCE }),
  Object.freeze({ text: 'Life is our dictionary.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
  Object.freeze({ text: 'Character is higher than intellect.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
  Object.freeze({ text: 'Time shall teach him that the scholar loses no hour which the man lives.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
  Object.freeze({ text: 'The day is always his who works in it with serenity and great aims.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
  Object.freeze({ text: 'Do your work, and I shall know you.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
  Object.freeze({ text: 'Do your work, and you shall reinforce yourself.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
  Object.freeze({ text: 'What I must do is all that concerns me, not what the people think.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
  Object.freeze({ text: 'The great man is he who in the midst of the crowd keeps with perfect sweetness the independence of solitude.', author: 'Ralph Waldo Emerson', work: 'Essays: First Series', source: EMERSON_SOURCE }),
  Object.freeze({ text: 'The present little sacrifice of your vanity will afterwards be amply repaid.', author: 'Benjamin Franklin', work: 'The Autobiography of Benjamin Franklin', source: FRANKLIN_SOURCE }),
  Object.freeze({ text: 'Let us have faith that right makes might, and in that faith let us to the end dare to do our duty as we understand it.', author: 'Abraham Lincoln', work: 'Cooper Union Address', source: LINCOLN_SOURCE }),
  Object.freeze({ text: 'Drugs are fun. Especially when you are high.', author: 'Turpin Tine', work: 'Unemployed', source: MISC_SOURCE })
]);

export function dateKeyInTimeZone(date, timeZone = DAILY_QUOTE_TIME_ZONE) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError('A valid Date is required to select the daily quote.');
  }

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);
  const part = type => parts.find(item => item.type === type)?.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

function hashCalendarDay(dayNumber) {
  let hash = dayNumber | 0;
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x7feb352d);
  hash ^= hash >>> 15;
  hash = Math.imul(hash, 0x846ca68b);
  hash ^= hash >>> 16;
  return hash >>> 0;
}

export function selectDailyQuote(date = new Date(), quotes = DAILY_QUOTES, timeZone = DAILY_QUOTE_TIME_ZONE) {
  if (!Array.isArray(quotes) || quotes.length === 0) {
    throw new TypeError('At least one quote is required.');
  }

  const [year, month, day] = dateKeyInTimeZone(date, timeZone).split('-').map(Number);
  const calendarDay = Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
  if (quotes.length === 1) return quotes[0];

  // Alternate disjoint index groups by date parity to guarantee adjacent days differ.
  const parity = ((calendarDay % 2) + 2) % 2;
  const eligibleIndexes = quotes.map((_, index) => index).filter(index => index % 2 === parity);
  const selectedIndex = eligibleIndexes[hashCalendarDay(calendarDay) % eligibleIndexes.length];
  return quotes[selectedIndex];
}

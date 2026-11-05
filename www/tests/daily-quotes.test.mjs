import test from 'node:test';
import assert from 'node:assert/strict';
import { DAILY_QUOTES, DAILY_QUOTE_TIME_ZONE, dateKeyInTimeZone, normalizeDailyQuotes, selectDailyQuote } from '../scripts/daily-quotes.mjs';

test('daily quote is stable throughout the same America/Chicago calendar day', () => {
  const beforeMidnight = new Date('2026-10-10T03:15:00.000Z');
  const nearMidnight = new Date('2026-10-10T04:59:59.000Z');

  assert.equal(dateKeyInTimeZone(beforeMidnight), '2026-10-09');
  assert.equal(dateKeyInTimeZone(nearMidnight), '2026-10-09');
  assert.equal(selectDailyQuote(beforeMidnight), selectDailyQuote(nearMidnight));
});

test('daily quote changes on the next Chicago calendar day, independent of viewer timezone', () => {
  const lastInstantOfDay = new Date('2026-10-10T04:59:59.000Z');
  const firstInstantOfNextDay = new Date('2026-10-10T05:00:00.000Z');

  assert.equal(dateKeyInTimeZone(lastInstantOfDay), '2026-10-09');
  assert.equal(dateKeyInTimeZone(firstInstantOfNextDay), '2026-10-10');
  assert.notEqual(selectDailyQuote(lastInstantOfDay), selectDailyQuote(firstInstantOfNextDay));
  assert.equal(DAILY_QUOTE_TIME_ZONE, 'America/Chicago');
});

test('date-seeded selection varies and avoids back-to-back repeats', () => {
  const seen = new Set();
  let previousQuote;

  for (let offset = 0; offset < 32; offset += 1) {
    const date = new Date(Date.UTC(2026, 0, 1 + offset, 18));
    const quote = selectDailyQuote(date);
    assert.notEqual(quote, previousQuote);
    seen.add(quote);
    previousQuote = quote;
  }

  assert.ok(seen.size > 4);
});

test('quote normalization assigns stable starter IDs, trims fields, and keeps list order', () => {
  const quotes = normalizeDailyQuotes(DAILY_QUOTES);
  assert.equal(quotes.length, DAILY_QUOTES.length);
  assert.equal(quotes[0].id, 'starter-001');
  assert.equal(quotes[1].id, 'starter-002');
  assert.equal(quotes[0].text, DAILY_QUOTES[0].text);

  const trimmed = normalizeDailyQuotes([{
    id: ' custom-id ',
    text: '  A thought. ',
    author: '  Someone ',
    work: '  Notes ',
    source: ' https://example.com/notes '
  }]);
  assert.deepEqual(trimmed[0], {
    id: 'custom-id',
    text: 'A thought.',
    author: 'Someone',
    work: 'Notes',
    source: 'https://example.com/notes'
  });
});

test('quote normalization rejects empty lists, incomplete records, insecure sources, and duplicate IDs', () => {
  const quote = { text: 'A thought.', author: 'Someone', work: 'Notes', source: 'https://example.com/notes' };
  assert.throws(() => normalizeDailyQuotes([]), /At least one daily quote/);
  assert.throws(() => normalizeDailyQuotes([{ ...quote, author: ' ' }]), /Author is required/);
  assert.throws(() => normalizeDailyQuotes([{ ...quote, source: 'http://example.com/notes' }]), /must use HTTPS/);
  assert.throws(() => normalizeDailyQuotes([{ ...quote, id: 'same' }, { ...quote, id: 'same' }]), /IDs must be unique/);
});

test('curated quotes have text, explicit author attribution, work, and a source URL', () => {
  assert.ok(DAILY_QUOTES.length >= 10);
  for (const quote of DAILY_QUOTES) {
    assert.ok(quote.text.trim());
    assert.ok(quote.author.trim());
    assert.ok(quote.work.trim());
    assert.match(quote.source, /^https:\/\/[a-zA-Z0-9.-]+\//);
  }
});

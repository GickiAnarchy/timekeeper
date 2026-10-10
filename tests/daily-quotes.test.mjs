import test from 'node:test';
import assert from 'node:assert/strict';
import { DAILY_QUOTES, DAILY_QUOTE_TIME_ZONE, dateKeyInTimeZone, selectDailyQuote } from '../scripts/daily-quotes.mjs';

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

test('curated quotes have text, explicit author attribution, work, and a source URL', () => {
  assert.ok(DAILY_QUOTES.length >= 10);
  for (const quote of DAILY_QUOTES) {
    assert.ok(quote.text.trim());
    assert.ok(quote.author.trim());
    assert.ok(quote.work.trim());
    assert.match(quote.source, /^https:\/\/www\.gutenberg\.org\//);
  }
});

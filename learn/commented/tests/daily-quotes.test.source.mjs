// Original L1: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import test from 'node:test';
// Original L2: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import assert from 'node:assert/strict';
// Original L3: Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.
import { DAILY_QUOTES, DAILY_QUOTE_TIME_ZONE, dateKeyInTimeZone, selectDailyQuote } from '../scripts/daily-quotes.mjs';
// Original L4: Blank line separates related setup or assertions for readability.

// Original L5: Starts an isolated test case whose title states the behavior being specified: daily quote is stable throughout the same America/Chicago calendar day.
test('daily quote is stable throughout the same America/Chicago calendar day', () => {
// Original L6: Sets beforeMidnight to a deterministic date/time fixture so 'daily quote is stable throughout the same America/Chicago calendar day' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.
  const beforeMidnight = new Date('2026-10-10T03:15:00.000Z');
// Original L7: Sets nearMidnight to a deterministic date/time fixture so 'daily quote is stable throughout the same America/Chicago calendar day' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.
  const nearMidnight = new Date('2026-10-10T04:59:59.000Z');
// Original L8: Blank line separates related setup or assertions for readability.

// Original L9: In the test 'daily quote is stable throughout the same America/Chicago calendar day', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(dateKeyInTimeZone(beforeMidnight), '2026-10-09');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(dateKeyInTimeZone(beforeMidnight), '2026-10-09');
// Original L10: In the test 'daily quote is stable throughout the same America/Chicago calendar day', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(dateKeyInTimeZone(nearMidnight), '2026-10-09');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(dateKeyInTimeZone(nearMidnight), '2026-10-09');
// Original L11: In the test 'daily quote is stable throughout the same America/Chicago calendar day', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(selectDailyQuote(beforeMidnight), selectDailyQuote(nearMidnight));; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(selectDailyQuote(beforeMidnight), selectDailyQuote(nearMidnight));
// Original L12: Closes the fixture, callback, loop, or test block for 'daily quote is stable throughout the same America/Chicago calendar day'.
});
// Original L13: Blank line separates related setup or assertions for readability.

// Original L14: Starts an isolated test case whose title states the behavior being specified: daily quote changes on the next Chicago calendar day, independent of viewer timezone.
test('daily quote changes on the next Chicago calendar day, independent of viewer timezone', () => {
// Original L15: Sets lastInstantOfDay to a deterministic date/time fixture so 'daily quote changes on the next Chicago calendar day, independent of viewer timezone' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.
  const lastInstantOfDay = new Date('2026-10-10T04:59:59.000Z');
// Original L16: Sets firstInstantOfNextDay to a deterministic date/time fixture so 'daily quote changes on the next Chicago calendar day, independent of viewer timezone' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.
  const firstInstantOfNextDay = new Date('2026-10-10T05:00:00.000Z');
// Original L17: Blank line separates related setup or assertions for readability.

// Original L18: In the test 'daily quote changes on the next Chicago calendar day, independent of viewer timezone', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(dateKeyInTimeZone(lastInstantOfDay), '2026-10-09');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(dateKeyInTimeZone(lastInstantOfDay), '2026-10-09');
// Original L19: In the test 'daily quote changes on the next Chicago calendar day, independent of viewer timezone', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(dateKeyInTimeZone(firstInstantOfNextDay), '2026-10-10');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(dateKeyInTimeZone(firstInstantOfNextDay), '2026-10-10');
// Original L20: In the test 'daily quote changes on the next Chicago calendar day, independent of viewer timezone', this negative equality assertion requires the compared expressions to differ: assert.notEqual(selectDailyQuote(lastInstantOfDay), selectDailyQuote(firstInstantOfNextDay));; this verifies independence or a deliberate change in behavior.
  assert.notEqual(selectDailyQuote(lastInstantOfDay), selectDailyQuote(firstInstantOfNextDay));
// Original L21: In the test 'daily quote changes on the next Chicago calendar day, independent of viewer timezone', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(DAILY_QUOTE_TIME_ZONE, 'America/Chicago');; the fixture therefore checks the concrete boundary/result contract.
  assert.equal(DAILY_QUOTE_TIME_ZONE, 'America/Chicago');
// Original L22: Closes the fixture, callback, loop, or test block for 'daily quote changes on the next Chicago calendar day, independent of viewer timezone'.
});
// Original L23: Blank line separates related setup or assertions for readability.

// Original L24: Starts an isolated test case whose title states the behavior being specified: date-seeded selection varies and avoids back-to-back repeats.
test('date-seeded selection varies and avoids back-to-back repeats', () => {
// Original L25: Creates seen, a test-side collection used to record listeners, DOM properties, calls, or unique results while testing 'date-seeded selection varies and avoids back-to-back repeats'.
  const seen = new Set();
// Original L26: Initializes previousQuote; for 'date-seeded selection varies and avoids back-to-back repeats', supplying the value that the following test logic will inspect or mutate.
  let previousQuote;
// Original L27: Blank line separates related setup or assertions for readability.

// Original L28: Controls iteration/branching in the 'date-seeded selection varies and avoids back-to-back repeats' test so each relevant fixture or environment condition is exercised.
  for (let offset = 0; offset < 32; offset += 1) {
// Original L29: Defines the test fixture/helper date; its returned mock data represents the application state needed to exercise 'date-seeded selection varies and avoids back-to-back repeats'.
    const date = new Date(Date.UTC(2026, 0, 1 + offset, 18));
// Original L30: Initializes quote for 'date-seeded selection varies and avoids back-to-back repeats', supplying the value that the following test logic will inspect or mutate.
    const quote = selectDailyQuote(date);
// Original L31: In the test 'date-seeded selection varies and avoids back-to-back repeats', this negative equality assertion requires the compared expressions to differ: assert.notEqual(quote, previousQuote);; this verifies independence or a deliberate change in behavior.
    assert.notEqual(quote, previousQuote);
// Original L32: Calls `seen.add` with `quote` (quote).
    seen.add(quote);
// Original L33: Sets `previousQuote` (previous quote) to `quote` (quote).
    previousQuote = quote;
// Original L34: Closes the fixture, callback, loop, or test block for 'date-seeded selection varies and avoids back-to-back repeats'.
  }
// Original L35: Blank line separates related setup or assertions for readability.

// Original L36: In the test 'date-seeded selection varies and avoids back-to-back repeats', this truthiness assertion requires the concrete condition to hold: assert.ok(seen.size > 4);; it verifies the required presence, count, geometry, or invariant represented by the fixture.
  assert.ok(seen.size > 4);
// Original L37: Closes the fixture, callback, loop, or test block for 'date-seeded selection varies and avoids back-to-back repeats'.
});
// Original L38: Blank line separates related setup or assertions for readability.

// Original L39: Starts an isolated test case whose title states the behavior being specified: curated quotes have text, explicit author attribution, work, and a source URL.
test('curated quotes have text, explicit author attribution, work, and a source URL', () => {
// Original L40: In the test 'curated quotes have text, explicit author attribution, work, and a source URL', this truthiness assertion requires the concrete condition to hold: assert.ok(DAILY_QUOTES.length >= 10);; it verifies the required presence, count, geometry, or invariant represented by the fixture.
  assert.ok(DAILY_QUOTES.length >= 10);
// Original L41: Controls iteration/branching in the 'curated quotes have text, explicit author attribution, work, and a source URL' test so each relevant fixture or environment condition is exercised.
  for (const quote of DAILY_QUOTES) {
// Original L42: In the test 'curated quotes have text, explicit author attribution, work, and a source URL', this truthiness assertion requires the concrete condition to hold: assert.ok(quote.text.trim());; it verifies the required presence, count, geometry, or invariant represented by the fixture.
    assert.ok(quote.text.trim());
// Original L43: In the test 'curated quotes have text, explicit author attribution, work, and a source URL', this truthiness assertion requires the concrete condition to hold: assert.ok(quote.author.trim());; it verifies the required presence, count, geometry, or invariant represented by the fixture.
    assert.ok(quote.author.trim());
// Original L44: In the test 'curated quotes have text, explicit author attribution, work, and a source URL', this truthiness assertion requires the concrete condition to hold: assert.ok(quote.work.trim());; it verifies the required presence, count, geometry, or invariant represented by the fixture.
    assert.ok(quote.work.trim());
// Original L45: In the test 'curated quotes have text, explicit author attribution, work, and a source URL', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(quote.source, /^https:\/\/[a-zA-Z0-9.-]+\//);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.
    assert.match(quote.source, /^https:\/\/[a-zA-Z0-9.-]+\//);
// Original L46: Closes the fixture, callback, loop, or test block for 'curated quotes have text, explicit author attribution, work, and a source URL'.
  }
// Original L47: Closes the fixture, callback, loop, or test block for 'curated quotes have text, explicit author attribution, work, and a source URL'.
});

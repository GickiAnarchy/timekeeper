# tests/daily-quotes.test.mjs

[Exact copy](../../original/tests/daily-quotes.test.source.mjs)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
import test from 'node:test';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 2

```text
import assert from 'node:assert/strict';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 3

```text
import { DAILY_QUOTES, DAILY_QUOTE_TIME_ZONE, dateKeyInTimeZone, selectDailyQuote } from '../scripts/daily-quotes.mjs';
```

Imports the test runner, assertion library, or application function used by these tests; the relative path identifies the production module under test.

### Line 4

```text

```

Blank line separates related setup or assertions for readability.

### Line 5

```text
test('daily quote is stable throughout the same America/Chicago calendar day', () => {
```

Starts an isolated test case whose title states the behavior being specified: daily quote is stable throughout the same America/Chicago calendar day.

### Line 6

```text
  const beforeMidnight = new Date('2026-10-10T03:15:00.000Z');
```

Sets beforeMidnight to a deterministic date/time fixture so 'daily quote is stable throughout the same America/Chicago calendar day' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.

### Line 7

```text
  const nearMidnight = new Date('2026-10-10T04:59:59.000Z');
```

Sets nearMidnight to a deterministic date/time fixture so 'daily quote is stable throughout the same America/Chicago calendar day' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.

### Line 8

```text

```

Blank line separates related setup or assertions for readability.

### Line 9

```text
  assert.equal(dateKeyInTimeZone(beforeMidnight), '2026-10-09');
```

In the test 'daily quote is stable throughout the same America/Chicago calendar day', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(dateKeyInTimeZone(beforeMidnight), '2026-10-09');; the fixture therefore checks the concrete boundary/result contract.

### Line 10

```text
  assert.equal(dateKeyInTimeZone(nearMidnight), '2026-10-09');
```

In the test 'daily quote is stable throughout the same America/Chicago calendar day', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(dateKeyInTimeZone(nearMidnight), '2026-10-09');; the fixture therefore checks the concrete boundary/result contract.

### Line 11

```text
  assert.equal(selectDailyQuote(beforeMidnight), selectDailyQuote(nearMidnight));
```

In the test 'daily quote is stable throughout the same America/Chicago calendar day', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(selectDailyQuote(beforeMidnight), selectDailyQuote(nearMidnight));; the fixture therefore checks the concrete boundary/result contract.

### Line 12

```text
});
```

Closes the fixture, callback, loop, or test block for 'daily quote is stable throughout the same America/Chicago calendar day'.

### Line 13

```text

```

Blank line separates related setup or assertions for readability.

### Line 14

```text
test('daily quote changes on the next Chicago calendar day, independent of viewer timezone', () => {
```

Starts an isolated test case whose title states the behavior being specified: daily quote changes on the next Chicago calendar day, independent of viewer timezone.

### Line 15

```text
  const lastInstantOfDay = new Date('2026-10-10T04:59:59.000Z');
```

Sets lastInstantOfDay to a deterministic date/time fixture so 'daily quote changes on the next Chicago calendar day, independent of viewer timezone' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.

### Line 16

```text
  const firstInstantOfNextDay = new Date('2026-10-10T05:00:00.000Z');
```

Sets firstInstantOfNextDay to a deterministic date/time fixture so 'daily quote changes on the next Chicago calendar day, independent of viewer timezone' tests calendar, boundary, or elapsed-time behavior without depending on the real clock.

### Line 17

```text

```

Blank line separates related setup or assertions for readability.

### Line 18

```text
  assert.equal(dateKeyInTimeZone(lastInstantOfDay), '2026-10-09');
```

In the test 'daily quote changes on the next Chicago calendar day, independent of viewer timezone', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(dateKeyInTimeZone(lastInstantOfDay), '2026-10-09');; the fixture therefore checks the concrete boundary/result contract.

### Line 19

```text
  assert.equal(dateKeyInTimeZone(firstInstantOfNextDay), '2026-10-10');
```

In the test 'daily quote changes on the next Chicago calendar day, independent of viewer timezone', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(dateKeyInTimeZone(firstInstantOfNextDay), '2026-10-10');; the fixture therefore checks the concrete boundary/result contract.

### Line 20

```text
  assert.notEqual(selectDailyQuote(lastInstantOfDay), selectDailyQuote(firstInstantOfNextDay));
```

In the test 'daily quote changes on the next Chicago calendar day, independent of viewer timezone', this negative equality assertion requires the compared expressions to differ: assert.notEqual(selectDailyQuote(lastInstantOfDay), selectDailyQuote(firstInstantOfNextDay));; this verifies independence or a deliberate change in behavior.

### Line 21

```text
  assert.equal(DAILY_QUOTE_TIME_ZONE, 'America/Chicago');
```

In the test 'daily quote changes on the next Chicago calendar day, independent of viewer timezone', this equality assertion requires the first expression to produce the exact expected value/reference supplied as the second expression: assert.equal(DAILY_QUOTE_TIME_ZONE, 'America/Chicago');; the fixture therefore checks the concrete boundary/result contract.

### Line 22

```text
});
```

Closes the fixture, callback, loop, or test block for 'daily quote changes on the next Chicago calendar day, independent of viewer timezone'.

### Line 23

```text

```

Blank line separates related setup or assertions for readability.

### Line 24

```text
test('date-seeded selection varies and avoids back-to-back repeats', () => {
```

Starts an isolated test case whose title states the behavior being specified: date-seeded selection varies and avoids back-to-back repeats.

### Line 25

```text
  const seen = new Set();
```

Creates seen, a test-side collection used to record listeners, DOM properties, calls, or unique results while testing 'date-seeded selection varies and avoids back-to-back repeats'.

### Line 26

```text
  let previousQuote;
```

Initializes previousQuote; for 'date-seeded selection varies and avoids back-to-back repeats', supplying the value that the following test logic will inspect or mutate.

### Line 27

```text

```

Blank line separates related setup or assertions for readability.

### Line 28

```text
  for (let offset = 0; offset < 32; offset += 1) {
```

Controls iteration/branching in the 'date-seeded selection varies and avoids back-to-back repeats' test so each relevant fixture or environment condition is exercised.

### Line 29

```text
    const date = new Date(Date.UTC(2026, 0, 1 + offset, 18));
```

Defines the test fixture/helper date; its returned mock data represents the application state needed to exercise 'date-seeded selection varies and avoids back-to-back repeats'.

### Line 30

```text
    const quote = selectDailyQuote(date);
```

Initializes quote for 'date-seeded selection varies and avoids back-to-back repeats', supplying the value that the following test logic will inspect or mutate.

### Line 31

```text
    assert.notEqual(quote, previousQuote);
```

In the test 'date-seeded selection varies and avoids back-to-back repeats', this negative equality assertion requires the compared expressions to differ: assert.notEqual(quote, previousQuote);; this verifies independence or a deliberate change in behavior.

### Line 32

```text
    seen.add(quote);
```

Calls `seen.add` with `quote` (quote).

### Line 33

```text
    previousQuote = quote;
```

Sets `previousQuote` (previous quote) to `quote` (quote).

### Line 34

```text
  }
```

Closes the fixture, callback, loop, or test block for 'date-seeded selection varies and avoids back-to-back repeats'.

### Line 35

```text

```

Blank line separates related setup or assertions for readability.

### Line 36

```text
  assert.ok(seen.size > 4);
```

In the test 'date-seeded selection varies and avoids back-to-back repeats', this truthiness assertion requires the concrete condition to hold: assert.ok(seen.size > 4);; it verifies the required presence, count, geometry, or invariant represented by the fixture.

### Line 37

```text
});
```

Closes the fixture, callback, loop, or test block for 'date-seeded selection varies and avoids back-to-back repeats'.

### Line 38

```text

```

Blank line separates related setup or assertions for readability.

### Line 39

```text
test('curated quotes have text, explicit author attribution, work, and a source URL', () => {
```

Starts an isolated test case whose title states the behavior being specified: curated quotes have text, explicit author attribution, work, and a source URL.

### Line 40

```text
  assert.ok(DAILY_QUOTES.length >= 10);
```

In the test 'curated quotes have text, explicit author attribution, work, and a source URL', this truthiness assertion requires the concrete condition to hold: assert.ok(DAILY_QUOTES.length >= 10);; it verifies the required presence, count, geometry, or invariant represented by the fixture.

### Line 41

```text
  for (const quote of DAILY_QUOTES) {
```

Controls iteration/branching in the 'curated quotes have text, explicit author attribution, work, and a source URL' test so each relevant fixture or environment condition is exercised.

### Line 42

```text
    assert.ok(quote.text.trim());
```

In the test 'curated quotes have text, explicit author attribution, work, and a source URL', this truthiness assertion requires the concrete condition to hold: assert.ok(quote.text.trim());; it verifies the required presence, count, geometry, or invariant represented by the fixture.

### Line 43

```text
    assert.ok(quote.author.trim());
```

In the test 'curated quotes have text, explicit author attribution, work, and a source URL', this truthiness assertion requires the concrete condition to hold: assert.ok(quote.author.trim());; it verifies the required presence, count, geometry, or invariant represented by the fixture.

### Line 44

```text
    assert.ok(quote.work.trim());
```

In the test 'curated quotes have text, explicit author attribution, work, and a source URL', this truthiness assertion requires the concrete condition to hold: assert.ok(quote.work.trim());; it verifies the required presence, count, geometry, or invariant represented by the fixture.

### Line 45

```text
    assert.match(quote.source, /^https:\/\/[a-zA-Z0-9.-]+\//);
```

In the test 'curated quotes have text, explicit author attribution, work, and a source URL', this regex assertion requires the actual source/text to match the supplied pattern: assert.match(quote.source, /^https:\/\/[a-zA-Z0-9.-]+\//);; anchors, lookaheads, tags, attributes, and literal wording encode the required structure.

### Line 46

```text
  }
```

Closes the fixture, callback, loop, or test block for 'curated quotes have text, explicit author attribution, work, and a source URL'.

### Line 47

```text
});
```

Closes the fixture, callback, loop, or test block for 'curated quotes have text, explicit author attribution, work, and a source URL'.

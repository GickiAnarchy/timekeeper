# Timekeeper workbook: follow one shift from button to pay

This workbook is a practical tour of the **current** Timekeeper source in `/workspace/timekeeper-live-fork`. It is written for a beginner who can read a little JavaScript but wants to understand how a real small web app hangs together. The source is plain HTML, CSS, and JavaScript modules, with Firestore as its data store. Start with the [clock page teaching copy](commented/html/clock.html), [clock controller](commented/scripts/clock.js), and [models](commented/scripts/models.js); those are the main trail for this lesson.

> Safety first: these exercises are read-only and use made-up values. Do not click Clock In, Clock Out, Save, Delete, or Import against the live project while learning.

## 1. The three layers: structure, appearance, behavior

Open `html/clock.html`. HTML describes the screen's structure: two sections, employee and customer `<select>` controls, a `Clock In` button, an error paragraph, and an empty list for active shifts. It does not know which employees exist yet. The important IDs (`emp-select`, `cust-select`, `clock-in-button`, and `activeShiftsList`) are hooks that JavaScript can find later.

The page loads two deferred ES modules:

```html
<link rel="stylesheet" href="../styles/clock.css"/>
<script type="module" src="../scripts/keyboard.mjs" defer></script>
<script type="module" src="../scripts/clock.js" defer></script>
```

CSS is presentation. [The clock stylesheet](commented/styles/clock.css) imports shared `ui.css`, lays the two sections into columns, styles buttons and cards, and switches to one column below 760 pixels. Notice that CSS can make a button green or a card responsive, but it cannot save a shift.

JavaScript is behavior. [The clock module](commented/scripts/clock.js) waits for `DOMContentLoaded`, initializes data, fills the dropdowns, listens for clicks, creates objects, saves them, and renders the list. Keeping those jobs separate makes a useful debugging question: **is the problem in the markup hook, the visual rule, or the event/data code?**

## 2. Trace one clock-in

Imagine the directory already contains employee Ana (wage `$23.50`) and customer Oak Street. On the clock screen, select Ana and Oak Street, then press the button. Here is the actual route through the code, without changing data:

1. The click listener in `clock.js` reads selected option values (`lines 115–121`). It rejects an empty employee selection or customer with the message “Please select at least one employee and a job site.”
2. It maps each employee ID through `store.employees.get(empId)` and checks `store.shifts` for an incomplete shift for the same employee (`lines 127–135`). This prevents a second open shift.
3. It finds the customer in `store.customers`, disables the button, and calls `roundTo15Minutes()` (`lines 137–142`). The pure helper in [domain.mjs](commented/scripts/domain.mjs) uses `Math.round`, so 09:07 becomes 09:00 and 09:08 becomes 09:15.
4. For each selected employee it runs `new WorkShift(emp, cust)`, then `shift.startShift(clockInTime)`. The [WorkShift model](commented/scripts/models.js) gives the object an ID, employee, customer, and `clockInTime`; `clockOutTime` remains `null`. Therefore `isComplete` is false.
5. `await store.saveShifts(shifts)` writes the batch. In [models.js](commented/scripts/models.js), `saveShifts` creates a Firestore `writeBatch`, writes each document to the `shifts` collection, and stores IDs, ISO times, breaks, paid status, and `paidHours` (`lines 994–1017`). A batch is deliberately limited to 500 shifts.
6. Only after the save succeeds does `clock.js` append the new objects to the in-memory `store.shifts` array and call `renderActiveShifts()`. That renderer filters `!s.isComplete`, creates a card, and adds Clock Out and break buttons. If Firestore fails, the catch block shows an error and does not pretend the save worked.

Clocking out follows the same pattern in reverse: the delegated list listener finds the shift by `data-id`, `stopShift()` rounds and sets `clockOutTime`, `saveShift()` persists one document, and the renderer removes it from the active list because it is now complete. Break actions mutate `shift.breaks`, save, and render again.

## 3. Trace one pay calculation

Use a completed example: Ana clocks in at 09:00, clocks out at 12:00, takes a 30-minute break, and has no manual `paidHours` override. The pure `actualShiftHours` function in [domain.mjs](commented/scripts/domain.mjs) subtracts break intervals from elapsed time, clips breaks to the shift, merges overlaps, and rounds the result to two decimals. The result is `2.5` hours.

Then [WorkShift](commented/scripts/models.js) does this:

- `getHoursWorked()` returns `actualShiftHours(clockInTime, clockOutTime, breaks)`.
- `getPaidHours()` uses an explicit numeric `paidHours` if one exists; otherwise it uses worked hours, so here it returns `2.5`.
- `getShiftPay()` returns zero if `isPaid` is already true; otherwise it calls `employee.getPay(hours)`.
- `Employee.getPay()` multiplies wage by hours and rounds to cents: `23.50 × 2.5 = $58.75`.

The pay-ledger path converts a completed shift with `makeShiftLedgerEntryData`. The test fixture in [domain.test.mjs](commented/tests/domain.test.source.mjs) proves the same idea with a `$23.50` employee and `paidHours: 2.5`, expecting `hours: 2.5` and `amount: 58.75`. This is payroll owed to the employee. Do not confuse it with invoicing the customer: `makeShiftInvoiceLine` uses the customer's billing rate. The test also shows a three-hour shift minus a 15-minute break at `$60` per billed hour gives `2.75 × 60 = $165`.

The pay-period review is deliberately read-only at load time. [pay-period-data.mjs](commented/scripts/pay-period-data.mjs) calls individual loaders for employees, customers, shifts, invoices, ledger, and archives rather than `store.init()`, because initialization could resume or create ledger archives. If any loader reports a failure, it throws instead of displaying a misleading partial total.

## 4. ES modules, one shared store, and the security warning

The project uses `type="module"` scripts and `import`/`export`. `clock.js` imports `store`, `WorkShift`, and helpers from `models.js`; `data.js` imports the same `store` for employee and customer forms. Since a module is evaluated once per page, those imports refer to the same in-memory store object within that page. The store has Maps for employees and customers and arrays for shifts and other records. This is shared application state, not magic global storage: a refresh rebuilds it by loading Firestore.

There is **no sign-in or owner gate in the current source**. The coverage tests explicitly check that the shell has no authentication UI, and the [Firestore rules teaching copy](commented/firestore.rules) says `allow read, write: if true` for every document and future subcollection. That means anyone who can reach this Firebase project can read and edit the data. The browser Firebase configuration is visible by design, but visible configuration is not the dangerous part; the permissive rules are. Treat this as a learning/shared-workspace setup, not a secure payroll product. Never put real wages, identities, or customer secrets into it, and do not “fix” security by adding a client-side hidden button—access control must be enforced by server rules and a real authentication design.

Also note the deployment boundary: [firebase.json](commented/firebase.json) configures Firestore and local emulators only. It does **not** define Firebase Hosting. Do not infer that `firebase deploy` will host the site from this file.

## 5. How local tests work

From `/workspace/timekeeper-live-fork`, run `npm test`. The [package teaching copy](commented/package.json) maps that command to Node’s built-in test runner, so it exercises pure domain behavior and source-contract tests without opening a browser. Useful examples include quarter-hour rounding, overnight shifts, break subtraction, pay ledger entries, and checks that every HTML page includes the keyboard helper.

For rules behavior, run `npm run test:firebase-emulator`. The script creates a temporary working directory, links the current `firestore.rules`, starts only the Firestore emulator, and runs `tests/security-emulator.mjs`. The emulator is local; it does not edit live Firestore. `firebase.json` records emulator ports 9099 (Auth) and 8080 (Firestore), although this test script selects Firestore. Read [the security test teaching copy](commented/tests/security-emulator.mjs) before changing rules so you understand what the current intentionally-public contract asserts.

## 6. Five safe exercises (with answers)

These use functions and values on paper or in a temporary test file. They do not write live data.

### Exercise 1: find the first UI hook
Which HTML ID does the clock controller use to read employee selections, and which ID does it use for the button?

**Answer:** `emp-select` and `clock-in-button`. They are obtained with `document.getElementById` in `clock.js`; changing either HTML ID without changing JavaScript breaks the interaction.

### Exercise 2: predict rounding
What does `roundTo15Minutes(new Date('2026-10-09T09:08:00Z'))` return?

**Answer:** `2026-10-09T09:15:00.000Z`. The domain test proves the 09:07/09:08 boundary. It is nearest-quarter rounding, not always down.

### Exercise 3: calculate paid hours
A shift runs 22:00 to 06:00 across midnight with a 01:00–01:30 break. What does `actualShiftHours` return?

**Answer:** `7.5`. Eight elapsed hours minus 0.5 break hour. The existing domain test covers this exact case.

### Exercise 4: calculate pay without saving
An employee earns `$20`, works `3.25` paid hours, and is not marked paid. What should `getShiftPay()` return?

**Answer:** `$65.00` (`20 × 3.25`). If `isPaid` is true, the method returns `0` to avoid counting an already-paid shift again.

### Exercise 5: identify a security failure
Which current rule prevents a stranger from editing a shift: the browser’s lack of login controls, or `firestore.rules`?

**Answer:** Neither prevents it. The current recursive rule explicitly allows read and write for everyone. The lack of login controls is a symptom; the enforceable decision is in Firestore rules. This is why testing locally and using fake data is the safe learning path.

## A good next reading order

After this trail, read the [domain teaching copy](commented/scripts/domain.mjs) for pure calculations, then [data.js](commented/scripts/data.js) for forms and validation, and finally [pay-period-review.js](commented/scripts/pay-period-review.js) for how a page consumes a read-only snapshot. Keep the mental model simple: **HTML names the parts, CSS arranges them, modules coordinate behavior, models define records and calculations, and Firestore persists what the store saves.**

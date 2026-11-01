# Timekeeper

A JavaScript app for tracking work hours. The workspace includes clock in/out, breaks, shift history, employee and customer records, invoices, an employee ledger with completed-shift entry, settled-ledger archives, and planned jobs. When an employee ledger reaches a zero balance, its entries are archived and the active ledger is cleared. The Home dashboard summarizes today's and this week's break-adjusted hours, highlights active shifts and upcoming jobs, and updates active totals every minute. Themes and text-size preferences are saved in the current browser.

> **Access model:** Firestore remains publicly readable. Writes to `ledgerRows`, `ledgerArchives`, and `ledgerArchiveRows` (including nested documents) require the approved owner account. The `appSettings/dailyQuotes` document is also owner-write-only. Other app data—including shifts, employees, customers, invoices, payments, planned jobs, and other settings—remains publicly writable, so do not store confidential information in this Firebase project.

The hosted app is available at [GickiAnarchy.github.io/timekeeper](https://www.gickianarchy.github.io/timekeeper/).

## Pay-period review

The **Pay-period review** navigation item opens a read-only view with inclusive custom dates, employee filtering, and this/previous-week shortcuts. Completed shifts are attributed in full to their local clock-in date. Actual hours subtract breaks; pay hours honor the shift's paid-hours override (including zero), while payment status is shown separately. Current ledger balances include all active entries, not just the selected period, and are never added to unpaid shift hours as an amount due. Active and archived shift links are distinguished. Invoice-ready estimates use actual hours and customer billing rates, excluding shifts linked through either invoice shift IDs or line items.

The review deliberately loads data without `store.init()`, so opening or refreshing it cannot resume pending archives or archive zero-balance ledgers. It cannot pay, save, close, invoice, or modify shifts. Incomplete data loads hide all results rather than presenting partial balances. Local review tests use synthetic data and do not access production Firestore.

## Changelog

Restructuring and consolidating the project directory.

Feature-specific helpers now live with their existing primary scripts: planned jobs in `planned.js`, shift viewport behavior in `shifts.js`, pay-period calculations and read-only loading in `pay-period-review.js`, the `Invoice` entity in `models.js`, and ledger labels in `ledger.js`. Shared modules such as `domain.mjs`, keyboard handling, table sorting, and daily quotes remain separate because multiple features use them.

## Tests

Run the local Node test suite (Node.js 18 or newer):

```sh
npm test
```

Run the Firestore Rules test against the local emulator only:

```sh
npm run test:firebase-emulator
```

The emulator command binds to loopback and uses the `demo-timekeeper` project ID; it does not read or write production Firestore data.

## Rules deployment

The Firestore rules source is in `firestore.rules`. Deploy only Firestore rules to the production project by explicitly specifying its project ID, and only after the owner explicitly approves deployment:

```sh
./node_modules/.bin/firebase deploy --only firestore:rules --project timekeeper-ad253
```

The default Firebase CLI project remains `demo-timekeeper` to reduce the chance that local emulator work targets production accidentally.

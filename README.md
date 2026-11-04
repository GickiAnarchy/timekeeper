# Timekeeper 2.0 Skeleton

This branch is an isolated starting point for the 2.0 redesign. It keeps the existing work-hour workflow—employee and customer setup, clock-in/out, break tracking, shift history, manual entries, and shift edits—plus the Home dashboard and browser-local appearance/text-size settings. Invoices, payroll ledgers, planned jobs, quotes, admin management, and full backup/restore are intentionally omitted from this skeleton; `live-stable` remains unchanged.

The app reads and writes the existing Firestore collections `employees`, `customers`, and `shifts`. Shift documents retain the current fields and IDs, including `employeeId`, `custId`, ISO clock/break times, `paidHours`, and the legacy `plannedJobsPrompted` value. No data migration or Firebase rules change is part of this branch.

> **Emulator-only branch:** this skeleton uses the `demo-timekeeper` project ID and local Auth and Firestore emulators only. If either emulator is unavailable, its requests fail locally; the app does not fall back to the production Firebase project. The core tests use synthetic data and never connect to production.

## Run the app with local emulators

Start both emulators from this branch, then serve the app over HTTP (not `file://`):

```sh
firebase emulators:start --project demo-timekeeper --only auth,firestore
```

The browser client is pinned to `127.0.0.1:9099` for Auth and `127.0.0.1:8080` for Firestore. Keep these emulators running while using Clock and Shift History.

## Run the tests

Use Node.js 18 or newer:

```sh
npm test
```

Run the Firestore rules tests and Auth emulator check locally:

```sh
npm run test:firebase-emulator
```

The test command starts both emulators with the `demo-timekeeper` project ID, bound to `127.0.0.1`; it does not read or write production Firebase services.

# Timekeeper 2.0 Skeleton

This branch is an isolated starting point for the 2.0 redesign. It keeps the existing work-hour workflow—employee and customer setup, clock-in/out, break tracking, shift history, manual entries, and shift edits—plus the Home dashboard and browser-local appearance/text-size settings. Invoices, payroll ledgers, planned jobs, quotes, admin management, and full backup/restore are intentionally omitted from this skeleton; `live-stable` remains unchanged.

The app reads and writes the existing Firestore collections `employees`, `customers`, and `shifts`. Shift documents retain the current fields and IDs, including `employeeId`, `custId`, ISO clock/break times, `paidHours`, and the legacy `plannedJobsPrompted` value. No data migration or Firebase rules change is part of this branch.

> **Existing data access:** the current Firestore rules allow public reads and writes for shift, employee, and customer data. Do not put confidential information in this Firebase project. The core tests below use synthetic data and the local emulator; they do not connect to production Firestore.

## Run the tests

Use Node.js 18 or newer:

```sh
npm test
```

Run Firestore rules tests against the local emulator only:

```sh
npm run test:firebase-emulator
```

The emulator uses the `demo-timekeeper` project ID and binds to `127.0.0.1`; it does not read or write production Firestore.

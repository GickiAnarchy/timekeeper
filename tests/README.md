# Timekeeper 2.0 Skeleton tests

Run the local Node.js tests with Node.js 18 or newer:

```sh
npm test
```

The suite covers the clock-in/out controller with synthetic in-memory records, multi-employee selection, duplicate-active protection, breaks, and clock-out. It also tests quarter-hour rounding, break-adjusted shift hours, the reduced routes/data-access contract, keyboard/dialog visibility, and shift duplication.

Run the Firestore Rules tests with:

```sh
npm run test:firebase-emulator
```

This starts the Firestore emulator on `127.0.0.1:8080` with the `demo-timekeeper` project ID. It checks the existing rules against synthetic data only; it does not connect to production Firestore or deploy rules.

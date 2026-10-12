# Timekeeper tests

Run the local Node.js tests with Node.js 18 or newer:

```sh
npm test
```

The default suite checks domain behavior, keyboard/dialog handling, shift-edit Notes behavior, app-page coverage, and the public no-login data-access contract. It does not connect to Firebase.

Run the Firestore Rules tests with:

```sh
npm run test:firebase-emulator
```

This starts only the local Firestore emulator bound to `127.0.0.1:8080`, using the `demo-timekeeper` emulator project ID. It checks that unauthenticated users and unrelated authenticated users can read, create, update, and delete records in the app's established collections, as well as arbitrary and nested collections. It does not read or modify production Firestore data.

The production rules are deliberately fully public. Anyone can access all documents, including payroll, invoice, employee, customer, and shift records. Keep sensitive data out of this project while that ruleset is deployed.

# Timekeeper tests

Run the local Node.js tests with Node.js 18 or newer:

```sh
npm test
```

The default suite checks domain behavior, keyboard/dialog handling, shift-edit Notes behavior, app-page coverage, and the app's data-access contract. It does not connect to Firebase.

Run the Firestore Rules tests with:

```sh
npm run test:firebase-emulator
```

This starts only the local Firestore emulator bound to `127.0.0.1:8080`, using the `demo-timekeeper` emulator project ID. It verifies that all records remain publicly readable, only the approved owner can write active and archived ledger data, daily quotes remain owner-write-only, and shifts plus other non-ledger data retain public writes. It also checks that a failed backup-style batch cannot partially update shifts when its ledger writes are denied. It does not read or modify production Firestore data.

The production rules keep every document publicly readable. Only the approved owner can write active and archived ledger records or the daily quote settings document; other app data remains publicly writable. Keep sensitive data out of this project while those rules are deployed.

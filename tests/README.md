# Domain, UI-contract, and security emulator tests

Run the Node.js test suite with Node.js 18 or newer:

```sh
npm test
```

The default suite includes keyboard/dialog viewport helpers, Shift edit Notes behavior, domain logic, guest-data sanitization, and project-wide page coverage. It does not connect to Firebase.

Run the current Firestore rules and Auth emulator tests with:

```sh
npm run test:firebase-emulator
```

This command uses only the `demo-timekeeper` emulators bound to loopback. It tests the existing production rules file as-is, including owner isolation, recent-auth writes, and the existing routine clocking exception. No live Firebase project is selected.

Run the separate proposed guest-access rules against the local Firestore emulator with:

```sh
npm run test:firebase-emulator:guest
```

This command tests `proposals/firestore.guest-proposal.rules` from a temporary emulator configuration. It does not replace or modify `firestore.rules`, deploy anything, or contact the live Firebase project. The proposal is provided for separate review before any rules deployment.

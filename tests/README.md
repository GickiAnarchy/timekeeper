# Domain and keyboard-visibility tests

Run the full Node.js test suite with Node.js 18 or newer:

```sh
node --test
```

The default suite tests the shared keyboard and dialog viewport helpers, Shift edit Notes behavior, domain logic, and project-wide page/footer coverage. It does not connect to Firebase.

Run the local Firebase Auth and Firestore Rules Emulator tests with:

```sh
npm run test:firebase-emulator
```

This command uses only the `demo-timekeeper` emulators bound to loopback. It tests owner isolation, recent-auth protected writes, the limited routine clocking exception, and email/password reauthentication. No live Firebase project is selected by the test configuration.

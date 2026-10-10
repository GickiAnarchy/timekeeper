# Focused domain and viewport tests

Run the domain and keyboard-visibility tests with Node.js 18 or newer:

```sh
node --test tests/domain.test.mjs tests/keyboard.test.mjs
```

These tests exercise shared pure helpers used by the browser app. They do not connect to Firebase.

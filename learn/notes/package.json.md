# package.json

[Exact copy](../original/package.json)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
{
```

Opens the npm package manifest.

### Line 2

```text
  "name": "timekeeper-live-fork",
```

Sets the package name used by npm and lockfile metadata.

### Line 3

```text
  "private": true,
```

Marks this package private so npm will refuse accidental publication.

### Line 4

```text
  "type": "module",
```

Enables ECMAScript modules, so .js files use import/export semantics by default.

### Line 5

```text
  "scripts": {
```

Opens runnable npm script definitions.

### Line 6

```text
    "test": "node --test",
```

Maps npm test to Node’s built-in test runner, which discovers the project tests.

### Line 7

```text
    "test:firebase-emulator": "ROOT=\"$PWD\"; WORK=\"$(mktemp -d)\"; trap 'rm -rf \"$WORK\"' EXIT; ln -s \"$ROOT/firestore.rules\" \"$WORK/firestore.rules\"; printf '{\"firestore\":{\"rules\":\"firestore.rules\"},\"emulators\":{\"firestore\":{\"host\":\"127.0.0.1\",\"port\":8080},\"ui\":{\"enabled\":false},\"singleProjectMode\":true}}' > \"$WORK/firebase.json\"; cd \"$WORK\" && \"$ROOT/node_modules/.bin/firebase\" emulators:exec --config \"$WORK/firebase.json\" --project demo-timekeeper --only firestore --log-verbosity=QUIET \"node --test $ROOT/tests/security-emulator.mjs\""
```

Runs a shell pipeline for the local Firestore Rules test: saves the repo root, creates a temporary workspace, removes it on exit, symlinks the rules, writes an emulator-only firebase.json, changes into that workspace, and executes Firebase CLI emulators:exec against only Firestore with quiet logs and tests/security-emulator.mjs.

### Line 8

```text
  },
```

Closes script definitions.

### Line 9

```text
  "devDependencies": {
```

Opens development-only dependencies; these are tooling/test packages rather than runtime app imports.

### Line 10

```text
    "@firebase/app": "0.16.2",
```

Pins the Firebase JavaScript app package to 0.16.2.

### Line 11

```text
    "@firebase/firestore": "4.17.2",
```

Pins Firebase Firestore client APIs to 4.17.2.

### Line 12

```text
    "@firebase/rules-unit-testing": "5.0.2",
```

Pins Firebase Rules Unit Testing helpers to 5.0.2.

### Line 13

```text
    "firebase-tools": "15.32.1"
```

Pins the Firebase CLI to 15.32.1 for emulator and deployment commands.

### Line 14

```text
  }
```

Closes development dependencies.

### Line 15

```text
}
```

Closes package manifest.

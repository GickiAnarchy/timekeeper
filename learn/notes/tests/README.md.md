# tests/README.md

[Exact copy](../../original/tests/README.md)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
# Timekeeper tests
```

Heading identifies the test directory.

### Line 2

```text

```

Blank line.

### Line 3

```text
Run the local Node.js tests with Node.js 18 or newer:
```

Requires Node.js 18 or newer and introduces local test execution.

### Line 4

```text

```

Blank line.

### Line 5

```text
```sh
```

Opens a shell code example.

### Line 6

```text
npm test
```

Runs the standard Node test suite.

### Line 7

```text
```
```

Closes the shell code example.

### Line 8

```text

```

Blank line.

### Line 9

```text
The default suite checks domain behavior, keyboard/dialog handling, shift-edit Notes behavior, app-page coverage, and the public no-login data-access contract. It does not connect to Firebase.
```

Explains what the default suite covers and that it does not contact Firebase.

### Line 10

```text

```

Blank line.

### Line 11

```text
Run the Firestore Rules tests with:
```

Introduces Firestore Rules test instructions.

### Line 12

```text

```

Blank line.

### Line 13

```text
```sh
```

Opens a shell code example.

### Line 14

```text
npm run test:firebase-emulator
```

Runs the emulator-backed Rules suite.

### Line 15

```text
```
```

Closes the shell code example.

### Line 16

```text

```

Describes the loopback Firestore emulator, demo-timekeeper project, anonymous/unrelated-user CRUD checks, nested collections, and isolation from production data.

### Line 17

```text
This starts only the local Firestore emulator bound to `127.0.0.1:8080`, using the `demo-timekeeper` emulator project ID. It checks that unauthenticated users and unrelated authenticated users can read, create, update, and delete records in the app's established collections, including active and archived ledger data, as well as arbitrary and nested collections. It does not read or modify production Firestore data.
```

Blank line.

### Line 18

```text

```

Warns that production rules are intentionally public and expose payroll, invoice, employee, customer, and shift records; sensitive data must stay out.

### Line 19

```text
The production rules are deliberately fully public. Anyone can access all documents, including payroll, invoice, employee, customer, and shift records. Keep sensitive data out of this project while that ruleset is deployed.
```

Warns that production rules intentionally expose every document to anyone, including payroll, invoices, employees, customers, and shifts; sensitive data must not be stored in this project.

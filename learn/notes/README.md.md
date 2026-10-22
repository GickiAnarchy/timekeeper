# README.md

[Exact copy](../original/README.md)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
# Timekeeper
```

Heading identifies the project as Timekeeper.

### Line 2

```text

```

Blank line separates the title from its summary.

### Line 3

```text
A JavaScript app for tracking work hours. The workspace includes clock in/out, breaks, shift history, employee and customer records, invoices, an employee ledger with completed-shift entry, settled-ledger archives, and planned jobs. When an employee ledger reaches a zero balance, its entries are archived and the active ledger is cleared. The Home dashboard summarizes today's and this week's break-adjusted hours, highlights active shifts and upcoming jobs, and updates active totals every minute. Themes and text-size preferences are saved in the current browser.
```

Summarizes the app’s work-hour domain: clocking, breaks, shifts, employees/customers, invoices, ledgers, planned jobs, dashboard totals, and saved browser preferences.

### Line 4

```text

```

Blank line.

### Line 5

```text
> **Access model:** This app intentionally uses a fully public shared workflow. Firestore rules allow anyone—signed in or not—to read, create, update, and delete every document in every collection and subcollection. Do not put confidential or sensitive information in this Firebase project while these rules are deployed.
```

Blockquote label introduces the access/security model.

### Line 6

```text

```

Warns that deployed Firestore rules permit anonymous full CRUD over every document and subcollection; confidential data must not be stored in that project.

### Line 7

```text
The hosted app is available at [GickiAnarchy.github.io/timekeeper](https://www.gickianarchy.github.io/timekeeper/).
```

Supplies the hosted GitHub Pages URL.

### Line 8

```text

```

Blank line.

### Line 9

```text
## Pay-period review
```

Heading starts the pay-period review section.

### Line 10

```text

```

Describes the read-only review’s date/employee filters, date attribution, break-adjusted hours, pay overrides, payment status, ledger scope, invoice exclusions, and active/archive distinctions.

### Line 11

```text
The **Pay-period review** navigation item opens a read-only view with inclusive custom dates, employee filtering, and this/previous-week shortcuts. Completed shifts are attributed in full to their local clock-in date. Actual hours subtract breaks; pay hours honor the shift's paid-hours override (including zero), while payment status is shown separately. Current ledger balances include all active entries, not just the selected period, and are never added to unpaid shift hours as an amount due. Active and archived shift links are distinguished. Invoice-ready estimates use actual hours and customer billing rates, excluding shifts linked through either invoice shift IDs or line items.
```

Explains that review loading deliberately avoids store.init side effects, cannot mutate/pay/archive data, and hides results when loads are incomplete; tests use synthetic data.

### Line 12

```text

```

Blank line.

### Line 13

```text
The review deliberately loads data without `store.init()`, so opening or refreshing it cannot resume pending archives or archive zero-balance ledgers. It cannot pay, save, close, invoice, or modify shifts. Incomplete data loads hide all results rather than presenting partial balances. Local review tests use synthetic data and do not access production Firestore.
```

Heading starts test instructions.

### Line 14

```text

```

Blank line.

### Line 15

```text
## Tests
```

Code fence begins a shell-command example.

### Line 16

```text

```

Introduces the required Node.js version and local test command.

### Line 17

```text
Run the local Node test suite (Node.js 18 or newer):
```

Blank line inside the code example.

### Line 18

```text

```

Runs the ordinary Node test suite through npm.

### Line 19

```text
```sh
```

Closes the shell code fence.

### Line 20

```text
npm test
```

Blank line.

### Line 21

```text
```
```

Introduces the Firestore emulator test command.

### Line 22

```text

```

Blank line inside the code example.

### Line 23

```text
Run the Firestore Rules test against the local emulator only:
```

Runs the emulator-backed Rules tests.

### Line 24

```text

```

Closes the shell code fence.

### Line 25

```text
```sh
```

Explains that the emulator binds to loopback and demo-timekeeper, avoiding production Firestore.

### Line 26

```text
npm run test:firebase-emulator
```

Blank line.

### Line 27

```text
```
```

Heading starts rules deployment guidance.

### Line 28

```text

```

Explains that firestore.rules contains the public recursive rule and that deployment should target only rules with an explicit production project ID.

### Line 29

```text
The emulator command binds to loopback and uses the `demo-timekeeper` project ID; it does not read or write production Firestore data.
```

Blank line inside the code example.

### Line 30

```text

```

Runs Firebase CLI deployment of only Firestore rules to timekeeper-ad253, overriding the safer default alias.

### Line 31

```text
## Rules deployment
```

Closes the shell code fence.

### Line 32

```text

```

Explains why the default CLI alias remains demo-timekeeper: it reduces accidental production targeting during local work.

### Line 33

```text
The recursive public rule is in `firestore.rules`. Deploy only Firestore rules to the production project by explicitly specifying its project ID:
```

Explains that the recursive public rule is stored in firestore.rules and should be deployed only as Firestore rules with an explicit project ID.

### Line 34

```text

```

Blank line before the deployment command.

### Line 35

```text
```sh
```

Opens the shell code example for an explicit rules-only deployment.

### Line 36

```text
./node_modules/.bin/firebase deploy --only firestore:rules --project timekeeper-ad253
```

Invokes the local Firebase CLI to deploy only firestore:rules to production project timekeeper-ad253.

### Line 37

```text
```
```

Closes the shell code example.

### Line 38

```text

```

Explains that the default Firebase CLI alias remains demo-timekeeper to make accidental production targeting less likely during local work.

### Line 39

```text
The default Firebase CLI project remains `demo-timekeeper` to reduce the chance that local emulator work targets production accidentally.
```

Closes the README document with the final newline.

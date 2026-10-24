# Beginner learning route

## 1. Get your bearings

Open [START-HERE.html](START-HERE.html) in a browser for the searchable code-and-explanation reader. Read [the glossary](glossary.md) for unfamiliar programming terms, then [the practical workbook](workbook.md) for worked examples and exercises.

## 2. Start at the browser shell

Read [the commented entry page](commented/index.html) and [shell controller](commented/scripts/index.js). Find the iframe, navigation controls, page-loading behavior, and keyboard/viewport handling. Then look at [shell styling](commented/styles/style.css) and [reusable controls](commented/styles/ui.css).

## 3. Follow clocking end-to-end

Trace [clock page HTML](commented/html/clock.html), [clock events](commented/scripts/clock.js), [shared models](commented/scripts/models.js), [domain calculations](commented/scripts/domain.mjs), and [database rules](commented/firestore.rules). Compare HTML IDs with JavaScript selectors. The workbook walks through actual functions rather than assuming you already recognize their roles.

## 4. Learn the shared data model

Read models.js after domain.mjs. Identify employees, customers, shifts, invoices, payments, ledger rows, planned jobs, and archives. Pay attention to currency rounding, break-adjusted hours, local dates, and the current public access rule. The current rules are not a safe production policy for confidential payroll data.

## 5. Compare pages and tests

Use [the file map](file-map.md) to compare basic data, payroll ledger, invoices, and pay-period review. Test copies live under `original/tests/` and `commented/tests/`; their `.test.source.mjs` names avoid duplicate automatic discovery. Notes live under `notes/tests/` with original file names. Start with small pure-helper tests before UI mocks and the separate Firestore emulator test.

## 6. Practice safely

Run ordinary tests from the original checkout with `npm test`. The exact preserved copies can also be tested by explicitly naming `learn/original/tests/*.test.source.mjs`. Source-regex tests are intended for unannotated source, so do not use their failures against commented text as evidence of changed runtime behavior.

The workbook's exercises can be done by reading and predicting results; do not experiment against a real cloud database. Nothing here was deployed. Current firebase.json configures Firestore and emulators, not Hosting; any future deployment should explicitly exclude educational materials if it publishes the repository root.

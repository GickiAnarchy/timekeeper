# Architectural walkthrough

Timekeeper is a static browser application with a small shared shell and feature pages. `index.html` starts at Home and embeds pages from `html/` in an iframe. `scripts/index.js` changes the active page, observes focus and viewport changes, and keeps the shell usable on small screens.

Each feature page supplies semantic HTML and loads a page script. The scripts read form controls, render rows, and call shared model functions. `scripts/domain.mjs` contains calculations that can be tested without a browser; `scripts/models.js` owns Firestore reads/writes and collections. CSS is split between shared shell styles, shared UI primitives, and feature-specific files.

The tests intentionally cover both pure domain behavior and UI/source contracts. `tests/security-emulator.mjs` uses a local Firestore emulator. The deployed rule is intentionally public and recursive, so the architecture is suitable for learning but not confidential data.

## Data flow

1. A user selects or submits an HTML control.
2. A feature script receives the DOM event and validates/normalizes values.
3. A model method reads or writes a canonical Firestore collection.
4. Domain helpers calculate balances, hours, dates, or urgency.
5. The feature script re-renders the relevant page region.

See `architecture-flow.mmd` and `architecture-flow.png`.

# html/pay-period-review.html

[Exact copy](../../original/html/pay-period-review.html)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
<!doctype html>
```

Declares HTML5 so browsers use standards-mode parsing.

### Line 2

```text
<html lang="en">
```

Opens the <html> element: root document element; lang declares the document language. lang='en' supplies element-specific configuration.

### Line 3

```text
  <head>
```

Opens the <head> element: metadata container, not visible page content.

### Line 4

```text
    <meta charset="UTF-8">
```

Opens the <meta> element: browser metadata; charset selects text decoding and viewport controls mobile layout. charset='UTF-8' supplies element-specific configuration.

### Line 5

```text
    <meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content">
```

Opens the <meta> element: browser metadata; charset selects text decoding and viewport controls mobile layout. name='viewport' form field name used when reading/submitting values. content='width=device-width, initial-scale=1.0, interactive-widget=resizes-content' supplies element-specific configuration.

### Line 6

```text
    <link rel="stylesheet" href="../styles/pay-period-review.css">
```

Opens the <link> element: loads an external resource; stylesheet applies the referenced CSS. rel='stylesheet' supplies element-specific configuration. href='../styles/pay-period-review.css' resource or page URL for the link.

### Line 7

```text
    <script type="module" src="../scripts/keyboard.mjs" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/keyboard.mjs' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 8

```text
    <script type="module" src="../scripts/pay-period-review.js" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/pay-period-review.js' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 9

```text
    <title>Pay-period review · Mosher Lawns Timekeeper</title>
```

Opens the <title> element: browser tab/document title. The same line continues with nested/closing markup for title. Inline visible text on this line is 'Pay-period review · Mosher Lawns Timekeeper', which labels the control/content for the user.

### Line 10

```text
  </head>
```

Closes the <head> metadata container, not visible page content, ending that element’s content scope.

### Line 11

```text
  <body>
```

Opens the <body> element: visible application page and its interactive controls.

### Line 12

```text
    <main class="review-page">
```

Opens the <main> element: HTML main element used by this page. class='review-page' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 13

```text
      <header class="review-heading">
```

Opens the <header> element: HTML header element used by this page. class='review-heading' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 14

```text
        <p class="review-kicker">BEFORE YOU CLOSE OUT</p>
```

Opens the <p> element: paragraph or status/instruction text. class='review-kicker' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'BEFORE YOU CLOSE OUT', which labels the control/content for the user.

### Line 15

```text
        <h1>Pay-period review</h1>
```

Opens the <h1> element: primary heading for the current page. The same line continues with nested/closing markup for h1. Inline visible text on this line is 'Pay-period review', which labels the control/content for the user.

### Line 16

```text
        <p>Completed work, pay settings, current balances, and unbilled shifts in one place.</p>
```

Opens the <p> element: paragraph or status/instruction text. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Completed work, pay settings, current balances, and unbilled shifts in one place.', which labels the control/content for the user.

### Line 17

```text
        <span class="read-only-badge">Read-only review</span>
```

Opens the <span> element: inline wrapper for text, icons, or a decorative visual fragment. class='read-only-badge' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for span. Inline visible text on this line is 'Read-only review', which labels the control/content for the user.

### Line 18

```text
      </header>
```

Closes the <header> container, ending that element’s content scope.

### Line 19

```text

```

Blank line separates related markup for readability.

### Line 20

```text
      <form id="review-filters" class="review-panel review-filters">
```

Opens the <form> element: group of controls submitted/handled as one editing operation. id='review-filters' unique hook used by CSS, labels, and JavaScript. class='review-panel review-filters' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 21

```text
        <div class="filter-field"><label for="review-start">From</label><input id="review-start" type="date" required></div>
```

Opens the <div> element: generic block used here to group a layout or form region. class='filter-field' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for label, label, input, div. Inline visible text on this line is 'From', which labels the control/content for the user.

### Line 22

```text
        <div class="filter-field"><label for="review-end">Through</label><input id="review-end" type="date" required></div>
```

Opens the <div> element: generic block used here to group a layout or form region. class='filter-field' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for label, label, input, div. Inline visible text on this line is 'Through', which labels the control/content for the user.

### Line 23

```text
        <div class="filter-field"><label for="review-employee">Employee</label><select id="review-employee"><option value="">All employees</option></select></div>
```

Opens the <div> element: generic block used here to group a layout or form region. class='filter-field' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for label, label, select, option, option, select, div. Inline visible text on this line is 'Employee All employees', which labels the control/content for the user.

### Line 24

```text
        <button type="submit" id="review-apply" disabled>Review period</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='submit' chooses the control/resource/script type. id='review-apply' unique hook used by CSS, labels, and JavaScript. disabled='' makes a control unavailable for interaction. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Review period', which labels the control/content for the user.

### Line 25

```text
        <div class="period-shortcuts" aria-label="Date shortcuts">
```

Opens the <div> element: generic block used here to group a layout or form region. class='period-shortcuts' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-label='Date shortcuts' accessible name read by assistive technology.

### Line 26

```text
          <button type="button" id="review-this-week" disabled>This week</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='button' chooses the control/resource/script type. id='review-this-week' unique hook used by CSS, labels, and JavaScript. disabled='' makes a control unavailable for interaction. The same line continues with nested/closing markup for button. Inline visible text on this line is 'This week', which labels the control/content for the user.

### Line 27

```text
          <button type="button" id="review-last-week" disabled>Previous week</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='button' chooses the control/resource/script type. id='review-last-week' unique hook used by CSS, labels, and JavaScript. disabled='' makes a control unavailable for interaction. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Previous week', which labels the control/content for the user.

### Line 28

```text
          <button type="button" id="review-refresh">Refresh data</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='button' chooses the control/resource/script type. id='review-refresh' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Refresh data', which labels the control/content for the user.

### Line 29

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 30

```text
      </form>
```

Closes the <form> group of controls submitted/handled as one editing operation, ending that element’s content scope.

### Line 31

```text
      <p id="review-status" role="status" aria-live="polite">Loading review data…</p>
```

Opens the <p> element: paragraph or status/instruction text. id='review-status' unique hook used by CSS, labels, and JavaScript. role='status' accessibility role, here exposing status/alert semantics. aria-live='polite' requests announcements when status text changes. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Loading review data…', which labels the control/content for the user.

### Line 32

```text
      <p id="review-error" class="review-error" role="alert" hidden></p>
```

Opens the <p> element: paragraph or status/instruction text. id='review-error' unique hook used by CSS, labels, and JavaScript. class='review-error' space-separated CSS hook(s) that select the element’s visual/layout rules. role='alert' accessibility role, here exposing status/alert semantics. hidden='' keeps the region out of layout until JavaScript reveals it. The same line continues with nested/closing markup for p.

### Line 33

```text

```

Blank line separates related markup for readability.

### Line 34

```text
      <div id="review-results" hidden>
```

Opens the <div> element: generic block used here to group a layout or form region. id='review-results' unique hook used by CSS, labels, and JavaScript. hidden='' keeps the region out of layout until JavaScript reveals it.

### Line 35

```text
        <section id="review-metrics" class="review-metrics" aria-label="Period totals"></section>
```

Opens the <section> element: thematically grouped content region. id='review-metrics' unique hook used by CSS, labels, and JavaScript. class='review-metrics' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-label='Period totals' accessible name read by assistive technology. The same line continues with nested/closing markup for section.

### Line 36

```text
        <p class="review-explainer">Actual hours subtract recorded breaks. Pay hours use each shift’s paid-hours override, or actual hours if none is set; they do not mean payment has been made. Unpaid hours are pay hours on shifts not marked paid.</p>
```

Opens the <p> element: paragraph or status/instruction text. class='review-explainer' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Actual hours subtract recorded breaks. Pay hours use each shift’s paid-hours override, or actual hours if none is set; they do not mean payment has been made. Unpaid hours are pay ', which labels the control/content for the user.

### Line 37

```text
        <p id="review-warnings" class="review-warning" hidden></p>
```

Opens the <p> element: paragraph or status/instruction text. id='review-warnings' unique hook used by CSS, labels, and JavaScript. class='review-warning' space-separated CSS hook(s) that select the element’s visual/layout rules. hidden='' keeps the region out of layout until JavaScript reveals it. The same line continues with nested/closing markup for p.

### Line 38

```text

```

Blank line separates related markup for readability.

### Line 39

```text
        <section class="review-panel" aria-labelledby="review-people-title">
```

Opens the <section> element: thematically grouped content region. class='review-panel' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-labelledby='review-people-title' points to another element whose text names this region/control.

### Line 40

```text
          <h2 id="review-people-title">Employee summary &amp; current balances</h2>
```

Opens the <h2> element: second-level heading for a navigation/content group. id='review-people-title' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for h2. Inline visible text on this line is 'Employee summary &amp; current balances', which labels the control/content for the user.

### Line 41

```text
          <p class="review-explainer">Hours are for the selected period. Balances include all current active ledger entries, regardless of date; they are not added to unpaid shift hours or a calculation of pay due. Positive balances are owed to the employee; negative balances are advances ahead of earnings.</p>
```

Opens the <p> element: paragraph or status/instruction text. class='review-explainer' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Hours are for the selected period. Balances include all current active ledger entries, regardless of date; they are not added to unpaid shift hours or a calculation of pay due. Pos', which labels the control/content for the user.

### Line 42

```text
          <div class="review-table-wrap" tabindex="0" role="region" aria-label="Employee summary, scroll horizontally for more columns">
```

Opens the <div> element: generic block used here to group a layout or form region. class='review-table-wrap' space-separated CSS hook(s) that select the element’s visual/layout rules. tabindex='0' supplies element-specific configuration. role='region' accessibility role, here exposing status/alert semantics. aria-label='Employee summary, scroll horizontally for more columns' accessible name read by assistive technology.

### Line 43

```text
            <table><caption class="sr-only">Period hours and all-date active ledger balances by employee</caption><thead><tr><th scope="col">Employee</th><th scope="col">Shifts</th><th scope="col">Actual h</th><th scope="col">Pay h</th><th scope="col">Unpaid h</th><th scope="col">Current ledger balance</th></tr></thead><tbody id="review-people"></tbody></table>
```

Opens the <table> element: tabular data container. The same line continues with nested/closing markup for caption, caption, thead, tr, th, th, th, th, th, th, th, th, th, th, th, th, tr, thead, tbody, tbody, table. Inline visible text on this line is 'Period hours and all-date active ledger balances by employee Employee Shifts Actual h Pay h Unpaid h Current ledger balance', which labels the control/content for the user.

### Line 44

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 45

```text
          <p class="review-explainer">Settled ledger histories archive automatically at $0.00. Archived shift links remain visible below, but archived entries do not contribute to the current balance. No active entries does not by itself prove a shift was paid.</p>
```

Opens the <p> element: paragraph or status/instruction text. class='review-explainer' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Settled ledger histories archive automatically at $0.00. Archived shift links remain visible below, but archived entries do not contribute to the current balance. No active entries', which labels the control/content for the user.

### Line 46

```text
        </section>
```

Closes the <section> thematically grouped content region, ending that element’s content scope.

### Line 47

```text

```

Blank line separates related markup for readability.

### Line 48

```text
        <section class="review-panel" aria-labelledby="review-shifts-title">
```

Opens the <section> element: thematically grouped content region. class='review-panel' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-labelledby='review-shifts-title' points to another element whose text names this region/control.

### Line 49

```text
          <h2 id="review-shifts-title">Completed shifts</h2>
```

Opens the <h2> element: second-level heading for a navigation/content group. id='review-shifts-title' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for h2. Inline visible text on this line is 'Completed shifts', which labels the control/content for the user.

### Line 50

```text
          <p class="review-explainer">Both dates are inclusive, using the local clock-in date. An overnight shift is counted in full on its start date. Invoice-ready means completed, not linked to any invoice, and a customer billing rate is set. Billing estimates use actual hours, not pay hours, and are not saved invoices.</p>
```

Opens the <p> element: paragraph or status/instruction text. class='review-explainer' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Both dates are inclusive, using the local clock-in date. An overnight shift is counted in full on its start date. Invoice-ready means completed, not linked to any invoice, and a cu', which labels the control/content for the user.

### Line 51

```text
          <div class="review-table-wrap" tabindex="0" role="region" aria-label="Completed shifts, scroll horizontally for more columns">
```

Opens the <div> element: generic block used here to group a layout or form region. class='review-table-wrap' space-separated CSS hook(s) that select the element’s visual/layout rules. tabindex='0' supplies element-specific configuration. role='region' accessibility role, here exposing status/alert semantics. aria-label='Completed shifts, scroll horizontally for more columns' accessible name read by assistive technology.

### Line 52

```text
            <table><caption class="sr-only">Completed shift payment, ledger, and invoice review</caption><thead><tr><th scope="col">Started</th><th scope="col">Employee / customer</th><th scope="col">Actual h</th><th scope="col">Pay h</th><th scope="col">Payment status</th><th scope="col">Ledger link</th><th scope="col">Invoice status</th><th scope="col">Ready estimate</th></tr></thead><tbody id="review-shifts"></tbody></table>
```

Opens the <table> element: tabular data container. The same line continues with nested/closing markup for caption, caption, thead, tr, th, th, th, th, th, th, th, th, th, th, th, th, th, th, th, th, tr, thead, tbody, tbody, table. Inline visible text on this line is 'Completed shift payment, ledger, and invoice review Started Employee / customer Actual h Pay h Payment status Ledger link Invoice status Ready estimate', which labels the control/content for the user.

### Line 53

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 54

```text
        </section>
```

Closes the <section> thematically grouped content region, ending that element’s content scope.

### Line 55

```text
      </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 56

```text
      <p class="review-footnote">This page never marks shifts paid, adds ledger entries, archives balances, creates invoices, or closes a period. Work-hour logging stays unchanged.</p>
```

Opens the <p> element: paragraph or status/instruction text. class='review-footnote' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'This page never marks shifts paid, adds ledger entries, archives balances, creates invoices, or closes a period. Work-hour logging stays unchanged.', which labels the control/content for the user.

### Line 57

```text
    </main>
```

Closes the <main> container, ending that element’s content scope.

### Line 58

```text
  </body>
```

Closes the <body> visible application page and its interactive controls, ending that element’s content scope.

### Line 59

```text
</html>
```

Closes the <html> root document element; lang declares the document language, ending that element’s content scope.

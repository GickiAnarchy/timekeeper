# html/ledger-archive.html

[Exact copy](../../original/html/ledger-archive.html)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
<!DOCTYPE html>
```

Inline markup continues the surrounding element’s content.

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
    <link rel="stylesheet" href="../styles/ledger-archive.css">
```

Opens the <link> element: loads an external resource; stylesheet applies the referenced CSS. rel='stylesheet' supplies element-specific configuration. href='../styles/ledger-archive.css' resource or page URL for the link.

### Line 7

```text
    <script type="module" src="../scripts/keyboard.mjs" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/keyboard.mjs' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 8

```text
    <script type="module" src="../scripts/ledger-archive.js" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/ledger-archive.js' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 9

```text
    <title>Ledger Archive · Timekeeper</title>
```

Opens the <title> element: browser tab/document title. The same line continues with nested/closing markup for title. Inline visible text on this line is 'Ledger Archive · Timekeeper', which labels the control/content for the user.

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
    <main class="archive-section">
```

Opens the <main> element: HTML main element used by this page. class='archive-section' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 13

```text
      <header class="archive-heading">
```

Opens the <header> element: HTML header element used by this page. class='archive-heading' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 14

```text
        <div>
```

Opens the <div> element: generic block used here to group a layout or form region.

### Line 15

```text
          <p class="archive-eyebrow">PAYROLL HISTORY</p>
```

Opens the <p> element: paragraph or status/instruction text. class='archive-eyebrow' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'PAYROLL HISTORY', which labels the control/content for the user.

### Line 16

```text
          <h1>Ledger Archive</h1>
```

Opens the <h1> element: primary heading for the current page. The same line continues with nested/closing markup for h1. Inline visible text on this line is 'Ledger Archive', which labels the control/content for the user.

### Line 17

```text
          <p class="archive-description">Settled ledgers are kept here so the active ledger can start fresh.</p>
```

Opens the <p> element: paragraph or status/instruction text. class='archive-description' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Settled ledgers are kept here so the active ledger can start fresh.', which labels the control/content for the user.

### Line 18

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 19

```text
        <label class="archive-filter" for="archive-employee-filter">
```

Opens the <label> element: accessible caption associated with a form control. class='archive-filter' space-separated CSS hook(s) that select the element’s visual/layout rules. for='archive-employee-filter' connects a label to the control with the matching id.

### Line 20

```text
          Employee
```

Visible/interface text or inline content: 'Employee'; it labels or instructs the user at this point in the Timekeeper UI.

### Line 21

```text
          <select id="archive-employee-filter">
```

Opens the <select> element: dropdown/list form control. id='archive-employee-filter' unique hook used by CSS, labels, and JavaScript.

### Line 22

```text
            <option value="">All employees</option>
```

Opens the <option> element: one selectable choice in a select. value='' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'All employees', which labels the control/content for the user.

### Line 23

```text
          </select>
```

Closes the <select> dropdown/list form control, ending that element’s content scope.

### Line 24

```text
        </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 25

```text
      </header>
```

Closes the <header> container, ending that element’s content scope.

### Line 26

```text
      <div class="archive-toolbar">
```

Opens the <div> element: generic block used here to group a layout or form region. class='archive-toolbar' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 27

```text
        <p id="archive-status" role="status" aria-live="polite">Loading archived ledgers…</p>
```

Opens the <p> element: paragraph or status/instruction text. id='archive-status' unique hook used by CSS, labels, and JavaScript. role='status' accessibility role, here exposing status/alert semantics. aria-live='polite' requests announcements when status text changes. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Loading archived ledgers…', which labels the control/content for the user.

### Line 28

```text
        <button id="retry-archive-button" type="button" hidden>Retry pending archive</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. id='retry-archive-button' unique hook used by CSS, labels, and JavaScript. type='button' chooses the control/resource/script type. hidden='' keeps the region out of layout until JavaScript reveals it. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Retry pending archive', which labels the control/content for the user.

### Line 29

```text
      </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 30

```text
      <div id="ledger-archive-list" class="archive-list" aria-live="polite"></div>
```

Opens the <div> element: generic block used here to group a layout or form region. id='ledger-archive-list' unique hook used by CSS, labels, and JavaScript. class='archive-list' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-live='polite' requests announcements when status text changes. The same line continues with nested/closing markup for div.

### Line 31

```text
    </main>
```

Closes the <main> container, ending that element’s content scope.

### Line 32

```text
  </body>
```

Closes the <body> visible application page and its interactive controls, ending that element’s content scope.

### Line 33

```text
</html>
```

Closes the <html> root document element; lang declares the document language, ending that element’s content scope.

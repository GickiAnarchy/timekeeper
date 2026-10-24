# html/planned.html

[Exact copy](../../original/html/planned.html)

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
    <link rel="stylesheet" href="../styles/planned.css">
```

Opens the <link> element: loads an external resource; stylesheet applies the referenced CSS. rel='stylesheet' supplies element-specific configuration. href='../styles/planned.css' resource or page URL for the link.

### Line 7

```text
    <title>Planned jobs · Mosher Lawns</title>
```

Opens the <title> element: browser tab/document title. The same line continues with nested/closing markup for title. Inline visible text on this line is 'Planned jobs · Mosher Lawns', which labels the control/content for the user.

### Line 8

```text
    <script type="module" src="../scripts/keyboard.mjs" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/keyboard.mjs' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 9

```text
    <script type="module" src="../scripts/planned.js" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/planned.js' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 10

```text
  </head>
```

Closes the <head> metadata container, not visible page content, ending that element’s content scope.

### Line 11

```text
  <body class="planned-body">
```

Opens the <body> element: visible application page and its interactive controls. class='planned-body' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 12

```text
    <main class="planned-page">
```

Opens the <main> element: HTML main element used by this page. class='planned-page' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 13

```text
      <section class="page-intro" aria-labelledby="planned-title">
```

Opens the <section> element: thematically grouped content region. class='page-intro' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-labelledby='planned-title' points to another element whose text names this region/control.

### Line 14

```text
        <div>
```

Opens the <div> element: generic block used here to group a layout or form region.

### Line 15

```text
          <p class="eyebrow">FIELD SCHEDULE</p>
```

Opens the <p> element: paragraph or status/instruction text. class='eyebrow' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'FIELD SCHEDULE', which labels the control/content for the user.

### Line 16

```text
          <h1 id="planned-title">Planned jobs</h1>
```

Opens the <h1> element: primary heading for the current page. id='planned-title' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for h1. Inline visible text on this line is 'Planned jobs', which labels the control/content for the user.

### Line 17

```text
          <p class="page-subtitle">A clear view of the work ahead and what’s already done.</p>
```

Opens the <p> element: paragraph or status/instruction text. class='page-subtitle' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'A clear view of the work ahead and what’s already done.', which labels the control/content for the user.

### Line 18

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 19

```text
        <button id="add-button" class="button button-primary" type="button">
```

Opens the <button> element: keyboard- and pointer-activatable control. id='add-button' unique hook used by CSS, labels, and JavaScript. class='button button-primary' space-separated CSS hook(s) that select the element’s visual/layout rules. type='button' chooses the control/resource/script type.

### Line 20

```text
          <span aria-hidden="true">＋</span> Add a job
```

Opens the <span> element: inline wrapper for text, icons, or a decorative visual fragment. aria-hidden='true' hides decorative content from assistive technology. The same line continues with nested/closing markup for span. Inline visible text on this line is '＋ Add a job', which labels the control/content for the user.

### Line 21

```text
        </button>
```

Closes the <button> keyboard- and pointer-activatable control, ending that element’s content scope.

### Line 22

```text
      </section>
```

Closes the <section> thematically grouped content region, ending that element’s content scope.

### Line 23

```text

```

Blank line separates related markup for readability.

### Line 24

```text
      <section class="job-summary" aria-label="Job summary">
```

Opens the <section> element: thematically grouped content region. class='job-summary' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-label='Job summary' accessible name read by assistive technology.

### Line 25

```text
        <article class="summary-card summary-open">
```

Opens the <article> element: HTML article element used by this page. class='summary-card summary-open' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 26

```text
          <span class="summary-icon" aria-hidden="true">↗</span>
```

Opens the <span> element: inline wrapper for text, icons, or a decorative visual fragment. class='summary-icon' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-hidden='true' hides decorative content from assistive technology. The same line continues with nested/closing markup for span. Inline visible text on this line is '↗', which labels the control/content for the user.

### Line 27

```text
          <div><p>Open jobs</p><strong id="open-count">0</strong></div>
```

Opens the <div> element: generic block used here to group a layout or form region. The same line continues with nested/closing markup for p, p, strong, strong, div. Inline visible text on this line is 'Open jobs 0', which labels the control/content for the user.

### Line 28

```text
        </article>
```

Closes the <article> container, ending that element’s content scope.

### Line 29

```text
        <article class="summary-card summary-today">
```

Opens the <article> element: HTML article element used by this page. class='summary-card summary-today' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 30

```text
          <span class="summary-icon" aria-hidden="true">◷</span>
```

Opens the <span> element: inline wrapper for text, icons, or a decorative visual fragment. class='summary-icon' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-hidden='true' hides decorative content from assistive technology. The same line continues with nested/closing markup for span. Inline visible text on this line is '◷', which labels the control/content for the user.

### Line 31

```text
          <div><p>Due today</p><strong id="today-count">0</strong></div>
```

Opens the <div> element: generic block used here to group a layout or form region. The same line continues with nested/closing markup for p, p, strong, strong, div. Inline visible text on this line is 'Due today 0', which labels the control/content for the user.

### Line 32

```text
        </article>
```

Closes the <article> container, ending that element’s content scope.

### Line 33

```text
        <article class="summary-card summary-complete">
```

Opens the <article> element: HTML article element used by this page. class='summary-card summary-complete' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 34

```text
          <span class="summary-icon" aria-hidden="true">✓</span>
```

Opens the <span> element: inline wrapper for text, icons, or a decorative visual fragment. class='summary-icon' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-hidden='true' hides decorative content from assistive technology. The same line continues with nested/closing markup for span. Inline visible text on this line is '✓', which labels the control/content for the user.

### Line 35

```text
          <div><p>Completed</p><strong id="completed-count">0</strong></div>
```

Opens the <div> element: generic block used here to group a layout or form region. The same line continues with nested/closing markup for p, p, strong, strong, div. Inline visible text on this line is 'Completed 0', which labels the control/content for the user.

### Line 36

```text
        </article>
```

Closes the <article> container, ending that element’s content scope.

### Line 37

```text
      </section>
```

Closes the <section> thematically grouped content region, ending that element’s content scope.

### Line 38

```text

```

Blank line separates related markup for readability.

### Line 39

```text
      <p id="planned-overdue-alert" class="planned-overdue-alert" role="alert" aria-atomic="true" hidden></p>
```

Opens the <p> element: paragraph or status/instruction text. id='planned-overdue-alert' unique hook used by CSS, labels, and JavaScript. class='planned-overdue-alert' space-separated CSS hook(s) that select the element’s visual/layout rules. role='alert' accessibility role, here exposing status/alert semantics. aria-atomic='true' supplies element-specific configuration. hidden='' keeps the region out of layout until JavaScript reveals it. The same line continues with nested/closing markup for p.

### Line 40

```text
      <p class="urgency-guide">Dated jobs stand out more within 7 days, 3 days, tomorrow, and today. Overdue jobs need attention. TBD jobs have no due status.</p>
```

Opens the <p> element: paragraph or status/instruction text. class='urgency-guide' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Dated jobs stand out more within 7 days, 3 days, tomorrow, and today. Overdue jobs need attention. TBD jobs have no due status.', which labels the control/content for the user.

### Line 41

```text

```

Blank line separates related markup for readability.

### Line 42

```text
      <section class="schedule-panel" aria-labelledby="schedule-heading">
```

Opens the <section> element: thematically grouped content region. class='schedule-panel' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-labelledby='schedule-heading' points to another element whose text names this region/control.

### Line 43

```text
        <div class="schedule-heading">
```

Opens the <div> element: generic block used here to group a layout or form region. class='schedule-heading' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 44

```text
          <div>
```

Opens the <div> element: generic block used here to group a layout or form region.

### Line 45

```text
            <h2 id="schedule-heading">Your schedule</h2>
```

Opens the <h2> element: second-level heading for a navigation/content group. id='schedule-heading' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for h2. Inline visible text on this line is 'Your schedule', which labels the control/content for the user.

### Line 46

```text
            <p id="job-count" class="muted-copy">Loading jobs…</p>
```

Opens the <p> element: paragraph or status/instruction text. id='job-count' unique hook used by CSS, labels, and JavaScript. class='muted-copy' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Loading jobs…', which labels the control/content for the user.

### Line 47

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 48

```text
          <div class="job-filters" role="group" aria-label="Filter jobs">
```

Opens the <div> element: generic block used here to group a layout or form region. class='job-filters' space-separated CSS hook(s) that select the element’s visual/layout rules. role='group' accessibility role, here exposing status/alert semantics. aria-label='Filter jobs' accessible name read by assistive technology.

### Line 49

```text
            <button type="button" class="filter-button is-active" data-filter="open" aria-pressed="true">Open</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='button' chooses the control/resource/script type. class='filter-button is-active' space-separated CSS hook(s) that select the element’s visual/layout rules. data-filter='open' supplies element-specific configuration. aria-pressed='true' supplies element-specific configuration. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Open', which labels the control/content for the user.

### Line 50

```text
            <button type="button" class="filter-button" data-filter="completed" aria-pressed="false">Completed</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='button' chooses the control/resource/script type. class='filter-button' space-separated CSS hook(s) that select the element’s visual/layout rules. data-filter='completed' supplies element-specific configuration. aria-pressed='false' supplies element-specific configuration. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Completed', which labels the control/content for the user.

### Line 51

```text
            <button type="button" class="filter-button" data-filter="all" aria-pressed="false">All jobs</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='button' chooses the control/resource/script type. class='filter-button' space-separated CSS hook(s) that select the element’s visual/layout rules. data-filter='all' supplies element-specific configuration. aria-pressed='false' supplies element-specific configuration. The same line continues with nested/closing markup for button. Inline visible text on this line is 'All jobs', which labels the control/content for the user.

### Line 52

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 53

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 54

```text
        <ul id="planned-list" class="planned-list" aria-live="polite"></ul>
```

Opens the <ul> element: unordered list container. id='planned-list' unique hook used by CSS, labels, and JavaScript. class='planned-list' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-live='polite' requests announcements when status text changes. The same line continues with nested/closing markup for ul.

### Line 55

```text
      </section>
```

Closes the <section> thematically grouped content region, ending that element’s content scope.

### Line 56

```text
    </main>
```

Closes the <main> container, ending that element’s content scope.

### Line 57

```text

```

Blank line separates related markup for readability.

### Line 58

```text
    <dialog class="add-job-modal" id="add-modal" aria-labelledby="add-job-title">
```

Opens the <dialog> element: native modal dialog; open/close and form behavior are managed by JavaScript/browser. class='add-job-modal' space-separated CSS hook(s) that select the element’s visual/layout rules. id='add-modal' unique hook used by CSS, labels, and JavaScript. aria-labelledby='add-job-title' points to another element whose text names this region/control.

### Line 59

```text
      <form id="add-form" class="add-form">
```

Opens the <form> element: group of controls submitted/handled as one editing operation. id='add-form' unique hook used by CSS, labels, and JavaScript. class='add-form' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 60

```text
        <div class="modal-heading">
```

Opens the <div> element: generic block used here to group a layout or form region. class='modal-heading' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 61

```text
          <div>
```

Opens the <div> element: generic block used here to group a layout or form region.

### Line 62

```text
            <p class="eyebrow">NEW SCHEDULE ITEM</p>
```

Opens the <p> element: paragraph or status/instruction text. class='eyebrow' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'NEW SCHEDULE ITEM', which labels the control/content for the user.

### Line 63

```text
            <h2 id="add-job-title">Plan a job</h2>
```

Opens the <h2> element: second-level heading for a navigation/content group. id='add-job-title' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for h2. Inline visible text on this line is 'Plan a job', which labels the control/content for the user.

### Line 64

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 65

```text
          <button type="button" class="modal-close" id="modal-cancel-button" aria-label="Close">×</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='button' chooses the control/resource/script type. class='modal-close' space-separated CSS hook(s) that select the element’s visual/layout rules. id='modal-cancel-button' unique hook used by CSS, labels, and JavaScript. aria-label='Close' accessible name read by assistive technology. The same line continues with nested/closing markup for button. Inline visible text on this line is '×', which labels the control/content for the user.

### Line 66

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 67

```text
        <p class="modal-copy">Add a customer, an optional target date, and a short description.</p>
```

Opens the <p> element: paragraph or status/instruction text. class='modal-copy' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Add a customer, an optional target date, and a short description.', which labels the control/content for the user.

### Line 68

```text
        <div class="form-field">
```

Opens the <div> element: generic block used here to group a layout or form region. class='form-field' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 69

```text
          <label for="planned-cust">Customer</label>
```

Opens the <label> element: accessible caption associated with a form control. for='planned-cust' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Customer', which labels the control/content for the user.

### Line 70

```text
          <select id="planned-cust" name="customer" required>
```

Opens the <select> element: dropdown/list form control. id='planned-cust' unique hook used by CSS, labels, and JavaScript. name='customer' form field name used when reading/submitting values. required='' prevents submission while the control is empty.

### Line 71

```text
            <option value="">Choose a customer</option>
```

Opens the <option> element: one selectable choice in a select. value='' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Choose a customer', which labels the control/content for the user.

### Line 72

```text
          </select>
```

Closes the <select> dropdown/list form control, ending that element’s content scope.

### Line 73

```text
          <small id="customer-help" class="field-hint"></small>
```

Opens the <small> element: secondary explanatory or metadata text. id='customer-help' unique hook used by CSS, labels, and JavaScript. class='field-hint' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for small.

### Line 74

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 75

```text
        <div class="form-field planned-date-field">
```

Opens the <div> element: generic block used here to group a layout or form region. class='form-field planned-date-field' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 76

```text
          <label for="planned-date">Planned date</label>
```

Opens the <label> element: accessible caption associated with a form control. for='planned-date' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Planned date', which labels the control/content for the user.

### Line 77

```text
          <input type="date" id="planned-date" name="scheduledDate" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='date' chooses the control/resource/script type. id='planned-date' unique hook used by CSS, labels, and JavaScript. name='scheduledDate' form field name used when reading/submitting values. required='' prevents submission while the control is empty.

### Line 78

```text
          <label class="tbd-choice" for="planned-date-tbd">
```

Opens the <label> element: accessible caption associated with a form control. class='tbd-choice' space-separated CSS hook(s) that select the element’s visual/layout rules. for='planned-date-tbd' connects a label to the control with the matching id.

### Line 79

```text
            <input type="checkbox" id="planned-date-tbd">
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='checkbox' chooses the control/resource/script type. id='planned-date-tbd' unique hook used by CSS, labels, and JavaScript.

### Line 80

```text
            Date is TBD
```

Visible/interface text or inline content: 'Date is TBD'; it labels or instructs the user at this point in the Timekeeper UI.

### Line 81

```text
          </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 82

```text
          <small class="field-hint">Choose this when the job has no set date yet.</small>
```

Opens the <small> element: secondary explanatory or metadata text. class='field-hint' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for small. Inline visible text on this line is 'Choose this when the job has no set date yet.', which labels the control/content for the user.

### Line 83

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 84

```text
        <div class="form-field">
```

Opens the <div> element: generic block used here to group a layout or form region. class='form-field' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 85

```text
          <label for="planned-description">Job description</label>
```

Opens the <label> element: accessible caption associated with a form control. for='planned-description' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Job description', which labels the control/content for the user.

### Line 86

```text
          <textarea id="planned-description" name="description" rows="3" maxlength="300" placeholder="e.g. Front and back lawn mowing" required></textarea>
```

Opens the <textarea> element: multi-line text input. id='planned-description' unique hook used by CSS, labels, and JavaScript. name='description' form field name used when reading/submitting values. rows='3' initial textarea height in text rows. maxlength='300' supplies element-specific configuration. placeholder='e.g. Front and back lawn mowing' hint shown before a text field has a value. required='' prevents submission while the control is empty. The same line continues with nested/closing markup for textarea.

### Line 87

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 88

```text
        <p id="planned-form-error" class="form-error" role="alert" aria-live="polite"></p>
```

Opens the <p> element: paragraph or status/instruction text. id='planned-form-error' unique hook used by CSS, labels, and JavaScript. class='form-error' space-separated CSS hook(s) that select the element’s visual/layout rules. role='alert' accessibility role, here exposing status/alert semantics. aria-live='polite' requests announcements when status text changes. The same line continues with nested/closing markup for p.

### Line 89

```text
        <div class="modal-actions">
```

Opens the <div> element: generic block used here to group a layout or form region. class='modal-actions' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 90

```text
          <button type="button" class="button button-secondary" id="modal-cancel-action">Cancel</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='button' chooses the control/resource/script type. class='button button-secondary' space-separated CSS hook(s) that select the element’s visual/layout rules. id='modal-cancel-action' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Cancel', which labels the control/content for the user.

### Line 91

```text
          <button type="submit" class="button button-primary" id="modal-add-button">Save job</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='submit' chooses the control/resource/script type. class='button button-primary' space-separated CSS hook(s) that select the element’s visual/layout rules. id='modal-add-button' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Save job', which labels the control/content for the user.

### Line 92

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 93

```text
      </form>
```

Closes the <form> group of controls submitted/handled as one editing operation, ending that element’s content scope.

### Line 94

```text
    </dialog>
```

Closes the <dialog> native modal dialog; open/close and form behavior are managed by JavaScript/browser, ending that element’s content scope.

### Line 95

```text
  </body>
```

Closes the <body> visible application page and its interactive controls, ending that element’s content scope.

### Line 96

```text
</html>
```

Closes the <html> root document element; lang declares the document language, ending that element’s content scope.

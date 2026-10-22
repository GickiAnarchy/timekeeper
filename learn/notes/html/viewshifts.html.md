# html/viewshifts.html

[Exact copy](../../original/html/viewshifts.html)

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
    <link rel="stylesheet" href="../styles/shifts.css">
```

Opens the <link> element: loads an external resource; stylesheet applies the referenced CSS. rel='stylesheet' supplies element-specific configuration. href='../styles/shifts.css' resource or page URL for the link.

### Line 7

```text
    <script type="module" src="../scripts/keyboard.mjs" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/keyboard.mjs' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 8

```text
    <script type="module" src="../scripts/shifts.js" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/shifts.js' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 9

```text
    <title>Shift History · Timekeeper</title>
```

Opens the <title> element: browser tab/document title. The same line continues with nested/closing markup for title. Inline visible text on this line is 'Shift History · Timekeeper', which labels the control/content for the user.

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
    <main class="shifts-section">
```

Opens the <main> element: HTML main element used by this page. class='shifts-section' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 13

```text
      <h1>Shift History</h1>
```

Opens the <h1> element: primary heading for the current page. The same line continues with nested/closing markup for h1. Inline visible text on this line is 'Shift History', which labels the control/content for the user.

### Line 14

```text
      <div class="filters">
```

Opens the <div> element: generic block used here to group a layout or form region. class='filters' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 15

```text
        <div class="filter-sel">
```

Opens the <div> element: generic block used here to group a layout or form region. class='filter-sel' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 16

```text
          <label for="emp-filter">Employee</label>
```

Opens the <label> element: accessible caption associated with a form control. for='emp-filter' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Employee', which labels the control/content for the user.

### Line 17

```text
          <select id="emp-filter"></select>
```

Opens the <select> element: dropdown/list form control. id='emp-filter' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for select.

### Line 18

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 19

```text
        <div class="filter-sel">
```

Opens the <div> element: generic block used here to group a layout or form region. class='filter-sel' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 20

```text
          <label for="cust-filter">Customer</label>
```

Opens the <label> element: accessible caption associated with a form control. for='cust-filter' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Customer', which labels the control/content for the user.

### Line 21

```text
          <select id="cust-filter"></select>
```

Opens the <select> element: dropdown/list form control. id='cust-filter' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for select.

### Line 22

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 23

```text
      </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 24

```text
      <div class="paid-div">
```

Opens the <div> element: generic block used here to group a layout or form region. class='paid-div' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 25

```text
        <label for="paid-filter">Hide paid shifts</label>
```

Opens the <label> element: accessible caption associated with a form control. for='paid-filter' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Hide paid shifts', which labels the control/content for the user.

### Line 26

```text
        <input type="checkbox" id="paid-filter">
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='checkbox' chooses the control/resource/script type. id='paid-filter' unique hook used by CSS, labels, and JavaScript.

### Line 27

```text
      </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 28

```text
      <div class="button-div">
```

Opens the <div> element: generic block used here to group a layout or form region. class='button-div' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 29

```text
        <button type="button" id="add-button">Add Shift</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='button' chooses the control/resource/script type. id='add-button' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Add Shift', which labels the control/content for the user.

### Line 30

```text
      </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 31

```text
      <hr>
```

Opens the <hr> element: HTML hr element used by this page.

### Line 32

```text
      <details class="shift-list-details" open>
```

Opens the <details> element: disclosure container that can expand/collapse. class='shift-list-details' space-separated CSS hook(s) that select the element’s visual/layout rules. open='' supplies element-specific configuration.

### Line 33

```text
        <summary>Shift List</summary>
```

Opens the <summary> element: visible toggle label for a details disclosure. The same line continues with nested/closing markup for summary. Inline visible text on this line is 'Shift List', which labels the control/content for the user.

### Line 34

```text
        <ul id="shiftList" class="shifts-list" aria-live="polite">
```

Opens the <ul> element: unordered list container. id='shiftList' unique hook used by CSS, labels, and JavaScript. class='shifts-list' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-live='polite' requests announcements when status text changes.

### Line 35

```text
          <li class="empty-list shift-card">No Shift History</li>
```

Opens the <li> element: one list item. class='empty-list shift-card' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for li. Inline visible text on this line is 'No Shift History', which labels the control/content for the user.

### Line 36

```text
        </ul>
```

Closes the <ul> unordered list container, ending that element’s content scope.

### Line 37

```text
      </details>
```

Closes the <details> disclosure container that can expand/collapse, ending that element’s content scope.

### Line 38

```text
    </main>
```

Closes the <main> container, ending that element’s content scope.

### Line 39

```text

```

Blank line separates related markup for readability.

### Line 40

```text
    <dialog class="shift-modal" id="viewShiftModal" aria-labelledby="shift-modal-title">
```

Opens the <dialog> element: native modal dialog; open/close and form behavior are managed by JavaScript/browser. class='shift-modal' space-separated CSS hook(s) that select the element’s visual/layout rules. id='viewShiftModal' unique hook used by CSS, labels, and JavaScript. aria-labelledby='shift-modal-title' points to another element whose text names this region/control.

### Line 41

```text
      <h2 id="shift-modal-title">Shift Details</h2>
```

Opens the <h2> element: second-level heading for a navigation/content group. id='shift-modal-title' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for h2. Inline visible text on this line is 'Shift Details', which labels the control/content for the user.

### Line 42

```text
      <p id="shift-duplicate-hint" class="field-hint" hidden></p>
```

Opens the <p> element: paragraph or status/instruction text. id='shift-duplicate-hint' unique hook used by CSS, labels, and JavaScript. class='field-hint' space-separated CSS hook(s) that select the element’s visual/layout rules. hidden='' keeps the region out of layout until JavaScript reveals it. The same line continues with nested/closing markup for p.

### Line 43

```text
      <form class="shift-form" id="shift-form">
```

Opens the <form> element: group of controls submitted/handled as one editing operation. class='shift-form' space-separated CSS hook(s) that select the element’s visual/layout rules. id='shift-form' unique hook used by CSS, labels, and JavaScript.

### Line 44

```text
        <div class="shift-data" id="shiftBase">
```

Opens the <div> element: generic block used here to group a layout or form region. class='shift-data' space-separated CSS hook(s) that select the element’s visual/layout rules. id='shiftBase' unique hook used by CSS, labels, and JavaScript.

### Line 45

```text
          <label for="shift-emp">Employee</label>
```

Opens the <label> element: accessible caption associated with a form control. for='shift-emp' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Employee', which labels the control/content for the user.

### Line 46

```text
          <select id="shift-emp" required></select>
```

Opens the <select> element: dropdown/list form control. id='shift-emp' unique hook used by CSS, labels, and JavaScript. required='' prevents submission while the control is empty. The same line continues with nested/closing markup for select.

### Line 47

```text
          <label for="shift-cust">Customer</label>
```

Opens the <label> element: accessible caption associated with a form control. for='shift-cust' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Customer', which labels the control/content for the user.

### Line 48

```text
          <select id="shift-cust" required></select>
```

Opens the <select> element: dropdown/list form control. id='shift-cust' unique hook used by CSS, labels, and JavaScript. required='' prevents submission while the control is empty. The same line continues with nested/closing markup for select.

### Line 49

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 50

```text
        <div class="shift-data" id="shiftTime">
```

Opens the <div> element: generic block used here to group a layout or form region. class='shift-data' space-separated CSS hook(s) that select the element’s visual/layout rules. id='shiftTime' unique hook used by CSS, labels, and JavaScript.

### Line 51

```text
          <div class="time-row">
```

Opens the <div> element: generic block used here to group a layout or form region. class='time-row' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 52

```text
            <label for="shift-start">Actual shift start</label>
```

Opens the <label> element: accessible caption associated with a form control. for='shift-start' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Actual shift start', which labels the control/content for the user.

### Line 53

```text
            <input type="datetime-local" id="shift-start" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='datetime-local' chooses the control/resource/script type. id='shift-start' unique hook used by CSS, labels, and JavaScript. required='' prevents submission while the control is empty.

### Line 54

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 55

```text
          <div class="time-row">
```

Opens the <div> element: generic block used here to group a layout or form region. class='time-row' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 56

```text
            <label for="shift-end">Actual shift end</label>
```

Opens the <label> element: accessible caption associated with a form control. for='shift-end' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Actual shift end', which labels the control/content for the user.

### Line 57

```text
            <input type="datetime-local" id="shift-end" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='datetime-local' chooses the control/resource/script type. id='shift-end' unique hook used by CSS, labels, and JavaScript. required='' prevents submission while the control is empty.

### Line 58

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 59

```text
          <div class="hours-grid">
```

Opens the <div> element: generic block used here to group a layout or form region. class='hours-grid' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 60

```text
            <div class="time-row">
```

Opens the <div> element: generic block used here to group a layout or form region. class='time-row' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 61

```text
              <label for="total-hours">Actual hours worked</label>
```

Opens the <label> element: accessible caption associated with a form control. for='total-hours' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Actual hours worked', which labels the control/content for the user.

### Line 62

```text
              <input type="number" id="total-hours" step="0.01" disabled>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='number' chooses the control/resource/script type. id='total-hours' unique hook used by CSS, labels, and JavaScript. step='0.01' increment used by a numeric control. disabled='' makes a control unavailable for interaction.

### Line 63

```text
            </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 64

```text
            <div class="time-row">
```

Opens the <div> element: generic block used here to group a layout or form region. class='time-row' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 65

```text
              <label for="paid-hours">Paid hours</label>
```

Opens the <label> element: accessible caption associated with a form control. for='paid-hours' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Paid hours', which labels the control/content for the user.

### Line 66

```text
              <input type="number" id="paid-hours" min="0" step="0.01" inputmode="decimal">
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='number' chooses the control/resource/script type. id='paid-hours' unique hook used by CSS, labels, and JavaScript. min='0' lower bound accepted by a numeric/date control. step='0.01' increment used by a numeric control. inputmode='decimal' supplies element-specific configuration.

### Line 67

```text
            </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 68

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 69

```text
          <small class="field-hint">Paid hours affect payroll only; leave blank to use the break-adjusted shift hours.</small>
```

Opens the <small> element: secondary explanatory or metadata text. class='field-hint' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for small. Inline visible text on this line is 'Paid hours affect payroll only; leave blank to use the break-adjusted shift hours.', which labels the control/content for the user.

### Line 70

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 71

```text
        <div class="shift-data break-section">
```

Opens the <div> element: generic block used here to group a layout or form region. class='shift-data break-section' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 72

```text
          <div class="break-heading">
```

Opens the <div> element: generic block used here to group a layout or form region. class='break-heading' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 73

```text
            <h3>Breaks</h3>
```

Opens the <h3> element: third-level heading for a subsection. The same line continues with nested/closing markup for h3. Inline visible text on this line is 'Breaks', which labels the control/content for the user.

### Line 74

```text
            <button type="button" id="add-break-button" class="secondary-button">Add break</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='button' chooses the control/resource/script type. id='add-break-button' unique hook used by CSS, labels, and JavaScript. class='secondary-button' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Add break', which labels the control/content for the user.

### Line 75

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 76

```text
          <ul id="breaks-list" aria-label="Shift breaks"></ul>
```

Opens the <ul> element: unordered list container. id='breaks-list' unique hook used by CSS, labels, and JavaScript. aria-label='Shift breaks' accessible name read by assistive technology. The same line continues with nested/closing markup for ul.

### Line 77

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 78

```text
        <div class="shift-data" id="shiftNote">
```

Opens the <div> element: generic block used here to group a layout or form region. class='shift-data' space-separated CSS hook(s) that select the element’s visual/layout rules. id='shiftNote' unique hook used by CSS, labels, and JavaScript.

### Line 79

```text
          <label for="note-view">Notes</label>
```

Opens the <label> element: accessible caption associated with a form control. for='note-view' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Notes', which labels the control/content for the user.

### Line 80

```text
          <textarea id="note-view" rows="3"></textarea>
```

Opens the <textarea> element: multi-line text input. id='note-view' unique hook used by CSS, labels, and JavaScript. rows='3' initial textarea height in text rows. The same line continues with nested/closing markup for textarea.

### Line 81

```text
          <label class="paid-toggle" for="paid-checkbox-view">
```

Opens the <label> element: accessible caption associated with a form control. class='paid-toggle' space-separated CSS hook(s) that select the element’s visual/layout rules. for='paid-checkbox-view' connects a label to the control with the matching id.

### Line 82

```text
            <input type="checkbox" id="paid-checkbox-view"> Paid in full
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='checkbox' chooses the control/resource/script type. id='paid-checkbox-view' unique hook used by CSS, labels, and JavaScript. Inline visible text on this line is 'Paid in full', which labels the control/content for the user.

### Line 83

```text
          </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 84

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 85

```text
        <p id="shift-form-error" class="form-error" role="alert" aria-live="polite"></p>
```

Opens the <p> element: paragraph or status/instruction text. id='shift-form-error' unique hook used by CSS, labels, and JavaScript. class='form-error' space-separated CSS hook(s) that select the element’s visual/layout rules. role='alert' accessibility role, here exposing status/alert semantics. aria-live='polite' requests announcements when status text changes. The same line continues with nested/closing markup for p.

### Line 86

```text
        <div class="modal-actions">
```

Opens the <div> element: generic block used here to group a layout or form region. class='modal-actions' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 87

```text
          <button type="button" id="ok-btn">Save changes</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='button' chooses the control/resource/script type. id='ok-btn' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Save changes', which labels the control/content for the user.

### Line 88

```text
          <button type="button" id="cancel-btn">Cancel</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='button' chooses the control/resource/script type. id='cancel-btn' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Cancel', which labels the control/content for the user.

### Line 89

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 90

```text
      </form>
```

Closes the <form> group of controls submitted/handled as one editing operation, ending that element’s content scope.

### Line 91

```text
    </dialog>
```

Closes the <dialog> native modal dialog; open/close and form behavior are managed by JavaScript/browser, ending that element’s content scope.

### Line 92

```text
  </body>
```

Closes the <body> visible application page and its interactive controls, ending that element’s content scope.

### Line 93

```text
</html>
```

Closes the <html> root document element; lang declares the document language, ending that element’s content scope.

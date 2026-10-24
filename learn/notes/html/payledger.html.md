# html/payledger.html

[Exact copy](../../original/html/payledger.html)

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
    <link rel="stylesheet" href="../styles/ledger.css">
```

Opens the <link> element: loads an external resource; stylesheet applies the referenced CSS. rel='stylesheet' supplies element-specific configuration. href='../styles/ledger.css' resource or page URL for the link.

### Line 7

```text
    <script type="module" src="../scripts/keyboard.mjs" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/keyboard.mjs' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 8

```text
    <script type="module" src="../scripts/ledger.js" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/ledger.js' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 9

```text
    <title>Employee Ledger · Timekeeper</title>
```

Opens the <title> element: browser tab/document title. The same line continues with nested/closing markup for title. Inline visible text on this line is 'Employee Ledger · Timekeeper', which labels the control/content for the user.

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
    <section class="ledger-section">
```

Opens the <section> element: thematically grouped content region. class='ledger-section' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 13

```text
      <div class="ledger-heading">
```

Opens the <div> element: generic block used here to group a layout or form region. class='ledger-heading' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 14

```text
        <div>
```

Opens the <div> element: generic block used here to group a layout or form region.

### Line 15

```text
          <h1>Employee Ledger</h1>
```

Opens the <h1> element: primary heading for the current page. The same line continues with nested/closing markup for h1. Inline visible text on this line is 'Employee Ledger', which labels the control/content for the user.

### Line 16

```text
          <p id="ledger-owner" class="ledger-owner">Choose an employee to view their ledger.</p>
```

Opens the <p> element: paragraph or status/instruction text. id='ledger-owner' unique hook used by CSS, labels, and JavaScript. class='ledger-owner' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Choose an employee to view their ledger.', which labels the control/content for the user.

### Line 17

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 18

```text
        <label class="ledger-filter" for="ledger-employee-filter">
```

Opens the <label> element: accessible caption associated with a form control. class='ledger-filter' space-separated CSS hook(s) that select the element’s visual/layout rules. for='ledger-employee-filter' connects a label to the control with the matching id.

### Line 19

```text
          Ledger for
```

Visible/interface text or inline content: 'Ledger for'; it labels or instructs the user at this point in the Timekeeper UI.

### Line 20

```text
          <select id="ledger-employee-filter">
```

Opens the <select> element: dropdown/list form control. id='ledger-employee-filter' unique hook used by CSS, labels, and JavaScript.

### Line 21

```text
            <option value="">Choose an employee</option>
```

Opens the <option> element: one selectable choice in a select. value='' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Choose an employee', which labels the control/content for the user.

### Line 22

```text
          </select>
```

Closes the <select> dropdown/list form control, ending that element’s content scope.

### Line 23

```text
        </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 24

```text
      </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 25

```text
    </section>
```

Closes the <section> thematically grouped content region, ending that element’s content scope.

### Line 26

```text

```

Blank line separates related markup for readability.

### Line 27

```text
    <div class="table-div">
```

Opens the <div> element: generic block used here to group a layout or form region. class='table-div' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 28

```text
      <table id="ledger-table" aria-label="Employee ledger entries">
```

Opens the <table> element: tabular data container. id='ledger-table' unique hook used by CSS, labels, and JavaScript. aria-label='Employee ledger entries' accessible name read by assistive technology.

### Line 29

```text
        <thead>
```

Opens the <thead> element: table header row group.

### Line 30

```text
          <tr>
```

Opens the <tr> element: table row.

### Line 31

```text
            <th scope="col" data-sort-key="index" data-sort-type="number"><button class="table-sort-button" type="button"><span class="table-sort-label">Entry</span><span class="table-sort-indicator" aria-hidden="true">↕</span></button></th>
```

Opens the <th> element: header cell describing a column/row. scope='col' supplies element-specific configuration. data-sort-key='index' supplies element-specific configuration. data-sort-type='number' supplies element-specific configuration. The same line continues with nested/closing markup for button, span, span, span, span, button, th. Inline visible text on this line is 'Entry ↕', which labels the control/content for the user.

### Line 32

```text
            <th scope="col" data-sort-key="date" data-sort-type="date" aria-sort="descending"><button class="table-sort-button" type="button"><span class="table-sort-label">Date</span><span class="table-sort-indicator" aria-hidden="true">↓</span></button></th>
```

Opens the <th> element: header cell describing a column/row. scope='col' supplies element-specific configuration. data-sort-key='date' supplies element-specific configuration. data-sort-type='date' supplies element-specific configuration. aria-sort='descending' supplies element-specific configuration. The same line continues with nested/closing markup for button, span, span, span, span, button, th. Inline visible text on this line is 'Date ↓', which labels the control/content for the user.

### Line 33

```text
            <th scope="col" data-sort-key="type" data-sort-type="text"><button class="table-sort-button" type="button"><span class="table-sort-label">Type</span><span class="table-sort-indicator" aria-hidden="true">↕</span></button></th>
```

Opens the <th> element: header cell describing a column/row. scope='col' supplies element-specific configuration. data-sort-key='type' supplies element-specific configuration. data-sort-type='text' supplies element-specific configuration. The same line continues with nested/closing markup for button, span, span, span, span, button, th. Inline visible text on this line is 'Type ↕', which labels the control/content for the user.

### Line 34

```text
            <th scope="col" data-sort-key="hours" data-sort-type="number"><button class="table-sort-button" type="button"><span class="table-sort-label">Hours</span><span class="table-sort-indicator" aria-hidden="true">↕</span></button></th>
```

Opens the <th> element: header cell describing a column/row. scope='col' supplies element-specific configuration. data-sort-key='hours' supplies element-specific configuration. data-sort-type='number' supplies element-specific configuration. The same line continues with nested/closing markup for button, span, span, span, span, button, th. Inline visible text on this line is 'Hours ↕', which labels the control/content for the user.

### Line 35

```text
            <th scope="col" data-sort-key="amount" data-sort-type="number"><button class="table-sort-button" type="button"><span class="table-sort-label">Amount</span><span class="table-sort-indicator" aria-hidden="true">↕</span></button></th>
```

Opens the <th> element: header cell describing a column/row. scope='col' supplies element-specific configuration. data-sort-key='amount' supplies element-specific configuration. data-sort-type='number' supplies element-specific configuration. The same line continues with nested/closing markup for button, span, span, span, span, button, th. Inline visible text on this line is 'Amount ↕', which labels the control/content for the user.

### Line 36

```text
            <th scope="col" data-sort-key="notes" data-sort-type="text"><button class="table-sort-button" type="button"><span class="table-sort-label">Notes</span><span class="table-sort-indicator" aria-hidden="true">↕</span></button></th>
```

Opens the <th> element: header cell describing a column/row. scope='col' supplies element-specific configuration. data-sort-key='notes' supplies element-specific configuration. data-sort-type='text' supplies element-specific configuration. The same line continues with nested/closing markup for button, span, span, span, span, button, th. Inline visible text on this line is 'Notes ↕', which labels the control/content for the user.

### Line 37

```text
            <th scope="col">Actions</th>
```

Opens the <th> element: header cell describing a column/row. scope='col' supplies element-specific configuration. The same line continues with nested/closing markup for th. Inline visible text on this line is 'Actions', which labels the control/content for the user.

### Line 38

```text
          </tr>
```

Closes the <tr> table row, ending that element’s content scope.

### Line 39

```text
        </thead>
```

Closes the <thead> table header row group, ending that element’s content scope.

### Line 40

```text
        <tbody id="ledger-body" aria-live="polite"></tbody>
```

Opens the <tbody> element: table body row group. id='ledger-body' unique hook used by CSS, labels, and JavaScript. aria-live='polite' requests announcements when status text changes. The same line continues with nested/closing markup for tbody.

### Line 41

```text
        <tfoot>
```

Opens the <tfoot> element: HTML tfoot element used by this page.

### Line 42

```text
          <tr>
```

Opens the <tr> element: table row.

### Line 43

```text
            <td colspan="7" id="ledger-total"><strong>Total: $0.00</strong></td>
```

Opens the <td> element: data cell in a table. colspan='7' supplies element-specific configuration. id='ledger-total' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for strong, strong, td. Inline visible text on this line is 'Total: $0.00', which labels the control/content for the user.

### Line 44

```text
          </tr>
```

Closes the <tr> table row, ending that element’s content scope.

### Line 45

```text
          <tr>
```

Opens the <tr> element: table row.

### Line 46

```text
            <td colspan="3"><strong>Total hours</strong></td>
```

Opens the <td> element: data cell in a table. colspan='3' supplies element-specific configuration. The same line continues with nested/closing markup for strong, strong, td. Inline visible text on this line is 'Total hours', which labels the control/content for the user.

### Line 47

```text
            <td id="ledger-hours-total"><strong>0.00</strong></td>
```

Opens the <td> element: data cell in a table. id='ledger-hours-total' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for strong, strong, td. Inline visible text on this line is '0.00', which labels the control/content for the user.

### Line 48

```text
            <td colspan="3"></td>
```

Opens the <td> element: data cell in a table. colspan='3' supplies element-specific configuration. The same line continues with nested/closing markup for td.

### Line 49

```text
          </tr>
```

Closes the <tr> table row, ending that element’s content scope.

### Line 50

```text
        </tfoot>
```

Closes the <tfoot> container, ending that element’s content scope.

### Line 51

```text
      </table>
```

Closes the <table> tabular data container, ending that element’s content scope.

### Line 52

```text
    </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 53

```text
    <p class="ledger-archive-notice" id="ledger-entry-status" role="status" aria-live="polite"></p>
```

Opens the <p> element: paragraph or status/instruction text. class='ledger-archive-notice' space-separated CSS hook(s) that select the element’s visual/layout rules. id='ledger-entry-status' unique hook used by CSS, labels, and JavaScript. role='status' accessibility role, here exposing status/alert semantics. aria-live='polite' requests announcements when status text changes. The same line continues with nested/closing markup for p.

### Line 54

```text
    <p class="ledger-archive-link"><a href="ledger-archive.html">View archived ledger history</a></p>
```

Opens the <p> element: paragraph or status/instruction text. class='ledger-archive-link' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for a, a, p. Inline visible text on this line is 'View archived ledger history', which labels the control/content for the user.

### Line 55

```text

```

Blank line separates related markup for readability.

### Line 56

```text
    <details class="form-container shift-ledger-container">
```

Opens the <details> element: disclosure container that can expand/collapse. class='form-container shift-ledger-container' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 57

```text
      <summary class="shift-ledger-summary" id="shift-ledger-title">Add a completed shift</summary>
```

Opens the <summary> element: visible toggle label for a details disclosure. class='shift-ledger-summary' space-separated CSS hook(s) that select the element’s visual/layout rules. id='shift-ledger-title' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for summary. Inline visible text on this line is 'Add a completed shift', which labels the control/content for the user.

### Line 58

```text
      <div class="shift-ledger-content">
```

Opens the <div> element: generic block used here to group a layout or form region. class='shift-ledger-content' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 59

```text
        <p class="shift-ledger-description">Adds the shift’s paid hours at the employee’s current wage. This does not change the shift or mark it paid.</p>
```

Opens the <p> element: paragraph or status/instruction text. class='shift-ledger-description' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Adds the shift’s paid hours at the employee’s current wage. This does not change the shift or mark it paid.', which labels the control/content for the user.

### Line 60

```text
        <form id="shift-ledger-form">
```

Opens the <form> element: group of controls submitted/handled as one editing operation. id='shift-ledger-form' unique hook used by CSS, labels, and JavaScript.

### Line 61

```text
          <label for="ledger-shift-select">Completed shifts not yet in this ledger
```

Opens the <label> element: accessible caption associated with a form control. for='ledger-shift-select' connects a label to the control with the matching id. Inline visible text on this line is 'Completed shifts not yet in this ledger', which labels the control/content for the user.

### Line 62

```text
            <select id="ledger-shift-select" required>
```

Opens the <select> element: dropdown/list form control. id='ledger-shift-select' unique hook used by CSS, labels, and JavaScript. required='' prevents submission while the control is empty.

### Line 63

```text
              <option value="">Choose an employee above first</option>
```

Opens the <option> element: one selectable choice in a select. value='' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Choose an employee above first', which labels the control/content for the user.

### Line 64

```text
            </select>
```

Closes the <select> dropdown/list form control, ending that element’s content scope.

### Line 65

```text
          </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 66

```text
          <button type="submit" id="add-shift-to-ledger" disabled>Add shift to ledger</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='submit' chooses the control/resource/script type. id='add-shift-to-ledger' unique hook used by CSS, labels, and JavaScript. disabled='' makes a control unavailable for interaction. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Add shift to ledger', which labels the control/content for the user.

### Line 67

```text
        </form>
```

Closes the <form> group of controls submitted/handled as one editing operation, ending that element’s content scope.

### Line 68

```text
        <p id="shift-ledger-status" role="status" aria-live="polite">Choose an employee above to find completed shifts.</p>
```

Opens the <p> element: paragraph or status/instruction text. id='shift-ledger-status' unique hook used by CSS, labels, and JavaScript. role='status' accessibility role, here exposing status/alert semantics. aria-live='polite' requests announcements when status text changes. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Choose an employee above to find completed shifts.', which labels the control/content for the user.

### Line 69

```text
      </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 70

```text
    </details>
```

Closes the <details> disclosure container that can expand/collapse, ending that element’s content scope.

### Line 71

```text

```

Blank line separates related markup for readability.

### Line 72

```text
    <details class="form-container ledger-add-container">
```

Opens the <details> element: disclosure container that can expand/collapse. class='form-container ledger-add-container' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 73

```text
      <summary>Add ledger entry</summary>
```

Opens the <summary> element: visible toggle label for a details disclosure. The same line continues with nested/closing markup for summary. Inline visible text on this line is 'Add ledger entry', which labels the control/content for the user.

### Line 74

```text
      <form id="ledger-form">
```

Opens the <form> element: group of controls submitted/handled as one editing operation. id='ledger-form' unique hook used by CSS, labels, and JavaScript.

### Line 75

```text
        <label for="employee-select">Employee
```

Opens the <label> element: accessible caption associated with a form control. for='employee-select' connects a label to the control with the matching id. Inline visible text on this line is 'Employee', which labels the control/content for the user.

### Line 76

```text
          <select id="employee-select" required>
```

Opens the <select> element: dropdown/list form control. id='employee-select' unique hook used by CSS, labels, and JavaScript. required='' prevents submission while the control is empty.

### Line 77

```text
            <option value="">Choose an employee</option>
```

Opens the <option> element: one selectable choice in a select. value='' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Choose an employee', which labels the control/content for the user.

### Line 78

```text
          </select>
```

Closes the <select> dropdown/list form control, ending that element’s content scope.

### Line 79

```text
        </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 80

```text
        <label for="date">Date
```

Opens the <label> element: accessible caption associated with a form control. for='date' connects a label to the control with the matching id. Inline visible text on this line is 'Date', which labels the control/content for the user.

### Line 81

```text
          <input type="date" id="date" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='date' chooses the control/resource/script type. id='date' unique hook used by CSS, labels, and JavaScript. required='' prevents submission while the control is empty.

### Line 82

```text
        </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 83

```text
        <label for="type">Type
```

Opens the <label> element: accessible caption associated with a form control. for='type' connects a label to the control with the matching id. Inline visible text on this line is 'Type', which labels the control/content for the user.

### Line 84

```text
          <select id="type" required>
```

Opens the <select> element: dropdown/list form control. id='type' unique hook used by CSS, labels, and JavaScript. required='' prevents submission while the control is empty.

### Line 85

```text
            <option value="normal">Normal pay</option>
```

Opens the <option> element: one selectable choice in a select. value='normal' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Normal pay', which labels the control/content for the user.

### Line 86

```text
            <option value="advance">Advance</option>
```

Opens the <option> element: one selectable choice in a select. value='advance' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Advance', which labels the control/content for the user.

### Line 87

```text
            <option value="general">Other credit</option>
```

Opens the <option> element: one selectable choice in a select. value='general' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Other credit', which labels the control/content for the user.

### Line 88

```text
          </select>
```

Closes the <select> dropdown/list form control, ending that element’s content scope.

### Line 89

```text
        </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 90

```text
        <label for="hours">Hours
```

Opens the <label> element: accessible caption associated with a form control. for='hours' connects a label to the control with the matching id. Inline visible text on this line is 'Hours', which labels the control/content for the user.

### Line 91

```text
          <input type="number" id="hours" min="0" step="0.01" inputmode="decimal" value="0">
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='number' chooses the control/resource/script type. id='hours' unique hook used by CSS, labels, and JavaScript. min='0' lower bound accepted by a numeric/date control. step='0.01' increment used by a numeric control. inputmode='decimal' supplies element-specific configuration. value='0' submitted/control value, including dialog action values.

### Line 92

```text
        </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 93

```text
        <label for="amount">Amount ($)
```

Opens the <label> element: accessible caption associated with a form control. for='amount' connects a label to the control with the matching id. Inline visible text on this line is 'Amount ($)', which labels the control/content for the user.

### Line 94

```text
          <input type="number" id="amount" min="0" step="0.01" inputmode="decimal" value="0" disabled>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='number' chooses the control/resource/script type. id='amount' unique hook used by CSS, labels, and JavaScript. min='0' lower bound accepted by a numeric/date control. step='0.01' increment used by a numeric control. inputmode='decimal' supplies element-specific configuration. value='0' submitted/control value, including dialog action values. disabled='' makes a control unavailable for interaction.

### Line 95

```text
        </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 96

```text
        <label for="notes">Notes
```

Opens the <label> element: accessible caption associated with a form control. for='notes' connects a label to the control with the matching id. Inline visible text on this line is 'Notes', which labels the control/content for the user.

### Line 97

```text
          <input type="text" id="notes" placeholder="Optional notes">
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='text' chooses the control/resource/script type. id='notes' unique hook used by CSS, labels, and JavaScript. placeholder='Optional notes' hint shown before a text field has a value.

### Line 98

```text
        </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 99

```text
        <button type="submit">Add Entry</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='submit' chooses the control/resource/script type. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Add Entry', which labels the control/content for the user.

### Line 100

```text
      </form>
```

Closes the <form> group of controls submitted/handled as one editing operation, ending that element’s content scope.

### Line 101

```text
    </details>
```

Closes the <details> disclosure container that can expand/collapse, ending that element’s content scope.

### Line 102

```text

```

Blank line separates related markup for readability.

### Line 103

```text
    <dialog class="ledger-edit-modal" id="ledger-edit-modal" aria-labelledby="ledger-edit-title" aria-describedby="ledger-edit-help ledger-edit-error">
```

Opens the <dialog> element: native modal dialog; open/close and form behavior are managed by JavaScript/browser. class='ledger-edit-modal' space-separated CSS hook(s) that select the element’s visual/layout rules. id='ledger-edit-modal' unique hook used by CSS, labels, and JavaScript. aria-labelledby='ledger-edit-title' points to another element whose text names this region/control. aria-describedby='ledger-edit-help ledger-edit-error' supplies element-specific configuration.

### Line 104

```text
      <form class="ledger-edit-form" id="ledger-edit-form">
```

Opens the <form> element: group of controls submitted/handled as one editing operation. class='ledger-edit-form' space-separated CSS hook(s) that select the element’s visual/layout rules. id='ledger-edit-form' unique hook used by CSS, labels, and JavaScript.

### Line 105

```text
        <div class="ledger-edit-heading">
```

Opens the <div> element: generic block used here to group a layout or form region. class='ledger-edit-heading' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 106

```text
          <p class="ledger-edit-eyebrow">LEDGER ENTRY</p>
```

Opens the <p> element: paragraph or status/instruction text. class='ledger-edit-eyebrow' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'LEDGER ENTRY', which labels the control/content for the user.

### Line 107

```text
          <h2 id="ledger-edit-title">Edit ledger entry</h2>
```

Opens the <h2> element: second-level heading for a navigation/content group. id='ledger-edit-title' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for h2. Inline visible text on this line is 'Edit ledger entry', which labels the control/content for the user.

### Line 108

```text
          <p id="ledger-edit-help">Update the entry details. The employee assignment and entry number will stay unchanged.</p>
```

Opens the <p> element: paragraph or status/instruction text. id='ledger-edit-help' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Update the entry details. The employee assignment and entry number will stay unchanged.', which labels the control/content for the user.

### Line 109

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 110

```text
        <div class="ledger-edit-fields">
```

Opens the <div> element: generic block used here to group a layout or form region. class='ledger-edit-fields' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 111

```text
          <label for="edit-ledger-date">Date
```

Opens the <label> element: accessible caption associated with a form control. for='edit-ledger-date' connects a label to the control with the matching id. Inline visible text on this line is 'Date', which labels the control/content for the user.

### Line 112

```text
            <input type="date" id="edit-ledger-date" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='date' chooses the control/resource/script type. id='edit-ledger-date' unique hook used by CSS, labels, and JavaScript. required='' prevents submission while the control is empty.

### Line 113

```text
          </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 114

```text
          <label for="edit-ledger-type">Type
```

Opens the <label> element: accessible caption associated with a form control. for='edit-ledger-type' connects a label to the control with the matching id. Inline visible text on this line is 'Type', which labels the control/content for the user.

### Line 115

```text
            <select id="edit-ledger-type" required>
```

Opens the <select> element: dropdown/list form control. id='edit-ledger-type' unique hook used by CSS, labels, and JavaScript. required='' prevents submission while the control is empty.

### Line 116

```text
              <option value="normal">Normal pay</option>
```

Opens the <option> element: one selectable choice in a select. value='normal' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Normal pay', which labels the control/content for the user.

### Line 117

```text
              <option value="advance">Advance</option>
```

Opens the <option> element: one selectable choice in a select. value='advance' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Advance', which labels the control/content for the user.

### Line 118

```text
              <option value="general">Other credit</option>
```

Opens the <option> element: one selectable choice in a select. value='general' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Other credit', which labels the control/content for the user.

### Line 119

```text
            </select>
```

Closes the <select> dropdown/list form control, ending that element’s content scope.

### Line 120

```text
          </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 121

```text
          <label for="edit-ledger-hours">Hours
```

Opens the <label> element: accessible caption associated with a form control. for='edit-ledger-hours' connects a label to the control with the matching id. Inline visible text on this line is 'Hours', which labels the control/content for the user.

### Line 122

```text
            <input type="number" id="edit-ledger-hours" min="0" step="0.01" inputmode="decimal" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='number' chooses the control/resource/script type. id='edit-ledger-hours' unique hook used by CSS, labels, and JavaScript. min='0' lower bound accepted by a numeric/date control. step='0.01' increment used by a numeric control. inputmode='decimal' supplies element-specific configuration. required='' prevents submission while the control is empty.

### Line 123

```text
          </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 124

```text
          <label for="edit-ledger-amount">Amount ($)
```

Opens the <label> element: accessible caption associated with a form control. for='edit-ledger-amount' connects a label to the control with the matching id. Inline visible text on this line is 'Amount ($)', which labels the control/content for the user.

### Line 125

```text
            <input type="number" id="edit-ledger-amount" min="0" step="0.01" inputmode="decimal" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='number' chooses the control/resource/script type. id='edit-ledger-amount' unique hook used by CSS, labels, and JavaScript. min='0' lower bound accepted by a numeric/date control. step='0.01' increment used by a numeric control. inputmode='decimal' supplies element-specific configuration. required='' prevents submission while the control is empty.

### Line 126

```text
          </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 127

```text
          <label class="ledger-edit-notes" for="edit-ledger-notes">Notes
```

Opens the <label> element: accessible caption associated with a form control. class='ledger-edit-notes' space-separated CSS hook(s) that select the element’s visual/layout rules. for='edit-ledger-notes' connects a label to the control with the matching id. Inline visible text on this line is 'Notes', which labels the control/content for the user.

### Line 128

```text
            <textarea id="edit-ledger-notes" rows="3" placeholder="Optional notes"></textarea>
```

Opens the <textarea> element: multi-line text input. id='edit-ledger-notes' unique hook used by CSS, labels, and JavaScript. rows='3' initial textarea height in text rows. placeholder='Optional notes' hint shown before a text field has a value. The same line continues with nested/closing markup for textarea.

### Line 129

```text
          </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 130

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 131

```text
        <p class="ledger-edit-error" id="ledger-edit-error" role="alert" aria-live="polite"></p>
```

Opens the <p> element: paragraph or status/instruction text. class='ledger-edit-error' space-separated CSS hook(s) that select the element’s visual/layout rules. id='ledger-edit-error' unique hook used by CSS, labels, and JavaScript. role='alert' accessibility role, here exposing status/alert semantics. aria-live='polite' requests announcements when status text changes. The same line continues with nested/closing markup for p.

### Line 132

```text
        <div class="ledger-edit-actions">
```

Opens the <div> element: generic block used here to group a layout or form region. class='ledger-edit-actions' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 133

```text
          <button type="button" class="ledger-cancel-btn" id="ledger-edit-cancel">Cancel</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='button' chooses the control/resource/script type. class='ledger-cancel-btn' space-separated CSS hook(s) that select the element’s visual/layout rules. id='ledger-edit-cancel' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Cancel', which labels the control/content for the user.

### Line 134

```text
          <button type="submit" class="ledger-save-btn" id="ledger-edit-save">Save changes</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='submit' chooses the control/resource/script type. class='ledger-save-btn' space-separated CSS hook(s) that select the element’s visual/layout rules. id='ledger-edit-save' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Save changes', which labels the control/content for the user.

### Line 135

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 136

```text
      </form>
```

Closes the <form> group of controls submitted/handled as one editing operation, ending that element’s content scope.

### Line 137

```text
    </dialog>
```

Closes the <dialog> native modal dialog; open/close and form behavior are managed by JavaScript/browser, ending that element’s content scope.

### Line 138

```text
  </body>
```

Closes the <body> visible application page and its interactive controls, ending that element’s content scope.

### Line 139

```text
</html>
```

Closes the <html> root document element; lang declares the document language, ending that element’s content scope.

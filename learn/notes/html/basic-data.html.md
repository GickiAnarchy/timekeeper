# html/basic-data.html

[Exact copy](../../original/html/basic-data.html)

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
    <link rel="stylesheet" href="../styles/data.css?v=people-edit-20261009"/>
```

Opens the <link> element: loads an external resource; stylesheet applies the referenced CSS. rel='stylesheet' supplies element-specific configuration. href='../styles/data.css?v=people-edit-20261009' resource or page URL for the link.

### Line 7

```text
    <script type="module" src="../scripts/keyboard.mjs" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/keyboard.mjs' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 8

```text
    <script type="module" src="../scripts/data.js?v=people-edit-20261009" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/data.js?v=people-edit-20261009' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 9

```text
    <title>Mosher Lawns</title>
```

Opens the <title> element: browser tab/document title. The same line continues with nested/closing markup for title. Inline visible text on this line is 'Mosher Lawns', which labels the control/content for the user.

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
    <header class="page-header">
```

Opens the <header> element: HTML header element used by this page. class='page-header' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 13

```text
      <h1>Mosher Lawns Management</h1>
```

Opens the <h1> element: primary heading for the current page. The same line continues with nested/closing markup for h1. Inline visible text on this line is 'Mosher Lawns Management', which labels the control/content for the user.

### Line 14

```text
    </header>
```

Closes the <header> container, ending that element’s content scope.

### Line 15

```text

```

Blank line separates related markup for readability.

### Line 16

```text
    <main class="main-container">
```

Opens the <main> element: HTML main element used by this page. class='main-container' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 17

```text
      <!-- Employees Section -->
```

Comment documents implementation intent for maintainers; the browser does not render it.

### Line 18

```text
      <details class="management-section" id="employees-section" closed>
```

Opens the <details> element: disclosure container that can expand/collapse. class='management-section' space-separated CSS hook(s) that select the element’s visual/layout rules. id='employees-section' unique hook used by CSS, labels, and JavaScript. closed='' supplies element-specific configuration.

### Line 19

```text
        <summary>Employees</summary>
```

Opens the <summary> element: visible toggle label for a details disclosure. The same line continues with nested/closing markup for summary. Inline visible text on this line is 'Employees', which labels the control/content for the user.

### Line 20

```text
        <div class="section-content">
```

Opens the <div> element: generic block used here to group a layout or form region. class='section-content' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 21

```text
          <div class="list-container">
```

Opens the <div> element: generic block used here to group a layout or form region. class='list-container' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 22

```text
            <ol class="data-list emp-list" id="emp-list">
```

Opens the <ol> element: HTML ol element used by this page. class='data-list emp-list' space-separated CSS hook(s) that select the element’s visual/layout rules. id='emp-list' unique hook used by CSS, labels, and JavaScript.

### Line 23

```text
              <li class="empty-list emp-item">No Employees</li>
```

Opens the <li> element: one list item. class='empty-list emp-item' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for li. Inline visible text on this line is 'No Employees', which labels the control/content for the user.

### Line 24

```text
            </ol>
```

Closes the <ol> container, ending that element’s content scope.

### Line 25

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 26

```text

```

Blank line separates related markup for readability.

### Line 27

```text
          <details class="form-container add-form-disclosure">
```

Opens the <details> element: disclosure container that can expand/collapse. class='form-container add-form-disclosure' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 28

```text
            <summary>Add Employee</summary>
```

Opens the <summary> element: visible toggle label for a details disclosure. The same line continues with nested/closing markup for summary. Inline visible text on this line is 'Add Employee', which labels the control/content for the user.

### Line 29

```text
            <form class="add-form" id="add-emp-form">
```

Opens the <form> element: group of controls submitted/handled as one editing operation. class='add-form' space-separated CSS hook(s) that select the element’s visual/layout rules. id='add-emp-form' unique hook used by CSS, labels, and JavaScript.

### Line 30

```text
              <div class="form-group">
```

Opens the <div> element: generic block used here to group a layout or form region. class='form-group' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 31

```text
                <label for="emp-name">Name:</label>
```

Opens the <label> element: accessible caption associated with a form control. for='emp-name' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Name:', which labels the control/content for the user.

### Line 32

```text
                <input type="text" id="emp-name" name="emp-name" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='text' chooses the control/resource/script type. id='emp-name' unique hook used by CSS, labels, and JavaScript. name='emp-name' form field name used when reading/submitting values. required='' prevents submission while the control is empty.

### Line 33

```text
              </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 34

```text
              <div class="form-group">
```

Opens the <div> element: generic block used here to group a layout or form region. class='form-group' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 35

```text
                <label for="emp-wage">Wage ($):</label>
```

Opens the <label> element: accessible caption associated with a form control. for='emp-wage' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Wage ($):', which labels the control/content for the user.

### Line 36

```text
                <input type="number" id="emp-wage" name="emp-wage" step="0.01" min="0" inputmode="decimal" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='number' chooses the control/resource/script type. id='emp-wage' unique hook used by CSS, labels, and JavaScript. name='emp-wage' form field name used when reading/submitting values. step='0.01' increment used by a numeric control. min='0' lower bound accepted by a numeric/date control. inputmode='decimal' supplies element-specific configuration. required='' prevents submission while the control is empty.

### Line 37

```text
              </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 38

```text
              <div class="form-actions">
```

Opens the <div> element: generic block used here to group a layout or form region. class='form-actions' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 39

```text
                <button type="submit" id="add-emp-btn" class="btn btn-primary">Add Employee</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='submit' chooses the control/resource/script type. id='add-emp-btn' unique hook used by CSS, labels, and JavaScript. class='btn btn-primary' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Add Employee', which labels the control/content for the user.

### Line 40

```text
                <button type="reset" class="btn btn-secondary">Reset</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='reset' chooses the control/resource/script type. class='btn btn-secondary' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Reset', which labels the control/content for the user.

### Line 41

```text
              </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 42

```text
            </form>
```

Closes the <form> group of controls submitted/handled as one editing operation, ending that element’s content scope.

### Line 43

```text
          </details>
```

Closes the <details> disclosure container that can expand/collapse, ending that element’s content scope.

### Line 44

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 45

```text
      </details>
```

Closes the <details> disclosure container that can expand/collapse, ending that element’s content scope.

### Line 46

```text

```

Blank line separates related markup for readability.

### Line 47

```text
      <!-- Customers Section -->
```

Comment documents implementation intent for maintainers; the browser does not render it.

### Line 48

```text
      <details class="management-section" id="customers-section" closed>
```

Opens the <details> element: disclosure container that can expand/collapse. class='management-section' space-separated CSS hook(s) that select the element’s visual/layout rules. id='customers-section' unique hook used by CSS, labels, and JavaScript. closed='' supplies element-specific configuration.

### Line 49

```text
        <summary>Customers</summary>
```

Opens the <summary> element: visible toggle label for a details disclosure. The same line continues with nested/closing markup for summary. Inline visible text on this line is 'Customers', which labels the control/content for the user.

### Line 50

```text
        <div class="section-content">
```

Opens the <div> element: generic block used here to group a layout or form region. class='section-content' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 51

```text
          <div class="list-container">
```

Opens the <div> element: generic block used here to group a layout or form region. class='list-container' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 52

```text
            <ol class="data-list cust-list" id="cust-list">
```

Opens the <ol> element: HTML ol element used by this page. class='data-list cust-list' space-separated CSS hook(s) that select the element’s visual/layout rules. id='cust-list' unique hook used by CSS, labels, and JavaScript.

### Line 53

```text
              <li class="empty-list cust-item">No Customers</li>
```

Opens the <li> element: one list item. class='empty-list cust-item' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for li. Inline visible text on this line is 'No Customers', which labels the control/content for the user.

### Line 54

```text
            </ol>
```

Closes the <ol> container, ending that element’s content scope.

### Line 55

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 56

```text

```

Blank line separates related markup for readability.

### Line 57

```text
          <details class="form-container add-form-disclosure">
```

Opens the <details> element: disclosure container that can expand/collapse. class='form-container add-form-disclosure' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 58

```text
            <summary>Add Customer</summary>
```

Opens the <summary> element: visible toggle label for a details disclosure. The same line continues with nested/closing markup for summary. Inline visible text on this line is 'Add Customer', which labels the control/content for the user.

### Line 59

```text
            <form class="add-form" id="add-cust-form">
```

Opens the <form> element: group of controls submitted/handled as one editing operation. class='add-form' space-separated CSS hook(s) that select the element’s visual/layout rules. id='add-cust-form' unique hook used by CSS, labels, and JavaScript.

### Line 60

```text
              <div class="form-group">
```

Opens the <div> element: generic block used here to group a layout or form region. class='form-group' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 61

```text
                <label for="cust-name">Name:</label>
```

Opens the <label> element: accessible caption associated with a form control. for='cust-name' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Name:', which labels the control/content for the user.

### Line 62

```text
                <input type="text" id="cust-name" name="cust-name" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='text' chooses the control/resource/script type. id='cust-name' unique hook used by CSS, labels, and JavaScript. name='cust-name' form field name used when reading/submitting values. required='' prevents submission while the control is empty.

### Line 63

```text
              </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 64

```text
              <div class="form-group">
```

Opens the <div> element: generic block used here to group a layout or form region. class='form-group' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 65

```text
                <label for="cust-loc">Location:</label>
```

Opens the <label> element: accessible caption associated with a form control. for='cust-loc' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Location:', which labels the control/content for the user.

### Line 66

```text
                <input type="text" id="cust-loc" name="cust-loc" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='text' chooses the control/resource/script type. id='cust-loc' unique hook used by CSS, labels, and JavaScript. name='cust-loc' form field name used when reading/submitting values. required='' prevents submission while the control is empty.

### Line 67

```text
              </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 68

```text
              <div class="form-group">
```

Opens the <div> element: generic block used here to group a layout or form region. class='form-group' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 69

```text
                <label for="cust-billing-rate">Hourly billing rate ($):</label>
```

Opens the <label> element: accessible caption associated with a form control. for='cust-billing-rate' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Hourly billing rate ($):', which labels the control/content for the user.

### Line 70

```text
                <input type="number" id="cust-billing-rate" name="cust-billing-rate" min="0" step="0.01" inputmode="decimal" placeholder="Not set">
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='number' chooses the control/resource/script type. id='cust-billing-rate' unique hook used by CSS, labels, and JavaScript. name='cust-billing-rate' form field name used when reading/submitting values. min='0' lower bound accepted by a numeric/date control. step='0.01' increment used by a numeric control. inputmode='decimal' supplies element-specific configuration. placeholder='Not set' hint shown before a text field has a value.

### Line 71

```text
                <small>Used to calculate labor lines from attached work shifts.</small>
```

Opens the <small> element: secondary explanatory or metadata text. The same line continues with nested/closing markup for small. Inline visible text on this line is 'Used to calculate labor lines from attached work shifts.', which labels the control/content for the user.

### Line 72

```text
              </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 73

```text
              <div class="form-group">
```

Opens the <div> element: generic block used here to group a layout or form region. class='form-group' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 74

```text
                <label for="cust-note">Note:</label>
```

Opens the <label> element: accessible caption associated with a form control. for='cust-note' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Note:', which labels the control/content for the user.

### Line 75

```text
                <textarea id="cust-note" name="cust-note" cols="15" rows="4"></textarea>
```

Opens the <textarea> element: multi-line text input. id='cust-note' unique hook used by CSS, labels, and JavaScript. name='cust-note' form field name used when reading/submitting values. cols='15' supplies element-specific configuration. rows='4' initial textarea height in text rows. The same line continues with nested/closing markup for textarea.

### Line 76

```text
              </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 77

```text
              <div class="form-actions">
```

Opens the <div> element: generic block used here to group a layout or form region. class='form-actions' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 78

```text
                <button type="submit" id="add-cust-btn" class="btn btn-primary">Add Customer</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='submit' chooses the control/resource/script type. id='add-cust-btn' unique hook used by CSS, labels, and JavaScript. class='btn btn-primary' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Add Customer', which labels the control/content for the user.

### Line 79

```text
                <button type="reset" class="btn btn-secondary">Reset</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='reset' chooses the control/resource/script type. class='btn btn-secondary' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Reset', which labels the control/content for the user.

### Line 80

```text
              </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 81

```text
            </form>
```

Closes the <form> group of controls submitted/handled as one editing operation, ending that element’s content scope.

### Line 82

```text
          </details>
```

Closes the <details> disclosure container that can expand/collapse, ending that element’s content scope.

### Line 83

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 84

```text
      </details>
```

Closes the <details> disclosure container that can expand/collapse, ending that element’s content scope.

### Line 85

```text
    </main>
```

Closes the <main> container, ending that element’s content scope.

### Line 86

```text

```

Blank line separates related markup for readability.

### Line 87

```text
    <dialog class="people-edit-modal" id="people-edit-modal" aria-labelledby="people-edit-title" aria-describedby="people-edit-help people-edit-error">
```

Opens the <dialog> element: native modal dialog; open/close and form behavior are managed by JavaScript/browser. class='people-edit-modal' space-separated CSS hook(s) that select the element’s visual/layout rules. id='people-edit-modal' unique hook used by CSS, labels, and JavaScript. aria-labelledby='people-edit-title' points to another element whose text names this region/control. aria-describedby='people-edit-help people-edit-error' supplies element-specific configuration.

### Line 88

```text
      <form class="people-edit-form" id="people-edit-form">
```

Opens the <form> element: group of controls submitted/handled as one editing operation. class='people-edit-form' space-separated CSS hook(s) that select the element’s visual/layout rules. id='people-edit-form' unique hook used by CSS, labels, and JavaScript.

### Line 89

```text
        <div class="people-edit-heading">
```

Opens the <div> element: generic block used here to group a layout or form region. class='people-edit-heading' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 90

```text
          <p class="people-edit-eyebrow" id="people-edit-eyebrow">CUSTOMER PROFILE</p>
```

Opens the <p> element: paragraph or status/instruction text. class='people-edit-eyebrow' space-separated CSS hook(s) that select the element’s visual/layout rules. id='people-edit-eyebrow' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for p. Inline visible text on this line is 'CUSTOMER PROFILE', which labels the control/content for the user.

### Line 91

```text
          <h2 id="people-edit-title">Edit record</h2>
```

Opens the <h2> element: second-level heading for a navigation/content group. id='people-edit-title' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for h2. Inline visible text on this line is 'Edit record', which labels the control/content for the user.

### Line 92

```text
          <p id="people-edit-help">Update this profile. Changes are saved to your shared records.</p>
```

Opens the <p> element: paragraph or status/instruction text. id='people-edit-help' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Update this profile. Changes are saved to your shared records.', which labels the control/content for the user.

### Line 93

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 94

```text

```

Blank line separates related markup for readability.

### Line 95

```text
        <fieldset class="people-edit-fields" id="employee-edit-fields" hidden disabled>
```

Opens the <fieldset> element: HTML fieldset element used by this page. class='people-edit-fields' space-separated CSS hook(s) that select the element’s visual/layout rules. id='employee-edit-fields' unique hook used by CSS, labels, and JavaScript. hidden='' keeps the region out of layout until JavaScript reveals it. disabled='' makes a control unavailable for interaction.

### Line 96

```text
          <legend class="visually-hidden">Employee details</legend>
```

Opens the <legend> element: HTML legend element used by this page. class='visually-hidden' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for legend. Inline visible text on this line is 'Employee details', which labels the control/content for the user.

### Line 97

```text
          <div class="edit-field">
```

Opens the <div> element: generic block used here to group a layout or form region. class='edit-field' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 98

```text
            <label for="edit-emp-name">Name</label>
```

Opens the <label> element: accessible caption associated with a form control. for='edit-emp-name' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Name', which labels the control/content for the user.

### Line 99

```text
            <input type="text" id="edit-emp-name" name="employee-name" autocomplete="name" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='text' chooses the control/resource/script type. id='edit-emp-name' unique hook used by CSS, labels, and JavaScript. name='employee-name' form field name used when reading/submitting values. autocomplete='name' supplies element-specific configuration. required='' prevents submission while the control is empty.

### Line 100

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 101

```text
          <div class="edit-field">
```

Opens the <div> element: generic block used here to group a layout or form region. class='edit-field' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 102

```text
            <label for="edit-emp-wage">Wage ($)</label>
```

Opens the <label> element: accessible caption associated with a form control. for='edit-emp-wage' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Wage ($)', which labels the control/content for the user.

### Line 103

```text
            <input type="number" id="edit-emp-wage" name="employee-wage" min="0" step="0.01" inputmode="decimal" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='number' chooses the control/resource/script type. id='edit-emp-wage' unique hook used by CSS, labels, and JavaScript. name='employee-wage' form field name used when reading/submitting values. min='0' lower bound accepted by a numeric/date control. step='0.01' increment used by a numeric control. inputmode='decimal' supplies element-specific configuration. required='' prevents submission while the control is empty.

### Line 104

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 105

```text
        </fieldset>
```

Closes the <fieldset> container, ending that element’s content scope.

### Line 106

```text

```

Blank line separates related markup for readability.

### Line 107

```text
        <fieldset class="people-edit-fields" id="customer-edit-fields" hidden disabled>
```

Opens the <fieldset> element: HTML fieldset element used by this page. class='people-edit-fields' space-separated CSS hook(s) that select the element’s visual/layout rules. id='customer-edit-fields' unique hook used by CSS, labels, and JavaScript. hidden='' keeps the region out of layout until JavaScript reveals it. disabled='' makes a control unavailable for interaction.

### Line 108

```text
          <legend class="visually-hidden">Customer details</legend>
```

Opens the <legend> element: HTML legend element used by this page. class='visually-hidden' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for legend. Inline visible text on this line is 'Customer details', which labels the control/content for the user.

### Line 109

```text
          <div class="edit-field">
```

Opens the <div> element: generic block used here to group a layout or form region. class='edit-field' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 110

```text
            <label for="edit-cust-name">Name</label>
```

Opens the <label> element: accessible caption associated with a form control. for='edit-cust-name' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Name', which labels the control/content for the user.

### Line 111

```text
            <input type="text" id="edit-cust-name" name="customer-name" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='text' chooses the control/resource/script type. id='edit-cust-name' unique hook used by CSS, labels, and JavaScript. name='customer-name' form field name used when reading/submitting values. required='' prevents submission while the control is empty.

### Line 112

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 113

```text
          <div class="edit-field">
```

Opens the <div> element: generic block used here to group a layout or form region. class='edit-field' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 114

```text
            <label for="edit-cust-location">Location</label>
```

Opens the <label> element: accessible caption associated with a form control. for='edit-cust-location' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Location', which labels the control/content for the user.

### Line 115

```text
            <input type="text" id="edit-cust-location" name="customer-location" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='text' chooses the control/resource/script type. id='edit-cust-location' unique hook used by CSS, labels, and JavaScript. name='customer-location' form field name used when reading/submitting values. required='' prevents submission while the control is empty.

### Line 116

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 117

```text
          <div class="edit-field edit-field-wide">
```

Opens the <div> element: generic block used here to group a layout or form region. class='edit-field edit-field-wide' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 118

```text
            <label for="edit-cust-billing-rate">Hourly billing rate ($)</label>
```

Opens the <label> element: accessible caption associated with a form control. for='edit-cust-billing-rate' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Hourly billing rate ($)', which labels the control/content for the user.

### Line 119

```text
            <input type="number" id="edit-cust-billing-rate" name="customer-billing-rate" min="0" step="0.01" inputmode="decimal" placeholder="Not set">
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='number' chooses the control/resource/script type. id='edit-cust-billing-rate' unique hook used by CSS, labels, and JavaScript. name='customer-billing-rate' form field name used when reading/submitting values. min='0' lower bound accepted by a numeric/date control. step='0.01' increment used by a numeric control. inputmode='decimal' supplies element-specific configuration. placeholder='Not set' hint shown before a text field has a value.

### Line 120

```text
            <small>Used to calculate labor lines from attached work shifts. Leave blank if no rate is set.</small>
```

Opens the <small> element: secondary explanatory or metadata text. The same line continues with nested/closing markup for small. Inline visible text on this line is 'Used to calculate labor lines from attached work shifts. Leave blank if no rate is set.', which labels the control/content for the user.

### Line 121

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 122

```text
          <div class="edit-field edit-field-wide">
```

Opens the <div> element: generic block used here to group a layout or form region. class='edit-field edit-field-wide' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 123

```text
            <label for="edit-cust-note">Note</label>
```

Opens the <label> element: accessible caption associated with a form control. for='edit-cust-note' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Note', which labels the control/content for the user.

### Line 124

```text
            <textarea id="edit-cust-note" name="customer-note" rows="4"></textarea>
```

Opens the <textarea> element: multi-line text input. id='edit-cust-note' unique hook used by CSS, labels, and JavaScript. name='customer-note' form field name used when reading/submitting values. rows='4' initial textarea height in text rows. The same line continues with nested/closing markup for textarea.

### Line 125

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 126

```text
        </fieldset>
```

Closes the <fieldset> container, ending that element’s content scope.

### Line 127

```text

```

Blank line separates related markup for readability.

### Line 128

```text
        <p class="form-error" id="people-edit-error" role="alert" aria-live="polite"></p>
```

Opens the <p> element: paragraph or status/instruction text. class='form-error' space-separated CSS hook(s) that select the element’s visual/layout rules. id='people-edit-error' unique hook used by CSS, labels, and JavaScript. role='alert' accessibility role, here exposing status/alert semantics. aria-live='polite' requests announcements when status text changes. The same line continues with nested/closing markup for p.

### Line 129

```text
        <div class="modal-actions">
```

Opens the <div> element: generic block used here to group a layout or form region. class='modal-actions' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 130

```text
          <button type="button" class="btn btn-secondary" id="people-edit-cancel">Cancel</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='button' chooses the control/resource/script type. class='btn btn-secondary' space-separated CSS hook(s) that select the element’s visual/layout rules. id='people-edit-cancel' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Cancel', which labels the control/content for the user.

### Line 131

```text
          <button type="submit" class="btn btn-primary" id="people-edit-save">Save changes</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='submit' chooses the control/resource/script type. class='btn btn-primary' space-separated CSS hook(s) that select the element’s visual/layout rules. id='people-edit-save' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Save changes', which labels the control/content for the user.

### Line 132

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 133

```text
      </form>
```

Closes the <form> group of controls submitted/handled as one editing operation, ending that element’s content scope.

### Line 134

```text
    </dialog>
```

Closes the <dialog> native modal dialog; open/close and form behavior are managed by JavaScript/browser, ending that element’s content scope.

### Line 135

```text
  </body>
```

Closes the <body> visible application page and its interactive controls, ending that element’s content scope.

### Line 136

```text
</html>
```

Closes the <html> root document element; lang declares the document language, ending that element’s content scope.

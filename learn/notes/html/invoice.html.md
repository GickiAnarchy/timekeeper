# html/invoice.html

[Exact copy](../../original/html/invoice.html)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
<!DOCTYPE html>
```

Inline markup continues the surrounding element’s content.

### Line 2

```text

```

Blank line separates related markup for readability.

### Line 3

```text
<html>
```

Opens the <html> element: root document element; lang declares the document language.

### Line 4

```text
  <head>
```

Opens the <head> element: metadata container, not visible page content.

### Line 5

```text
    <meta http-equiv="CONTENT-TYPE" content="text/html; charset=UTF-8">
```

Opens the <meta> element: browser metadata; charset selects text decoding and viewport controls mobile layout. http-equiv='CONTENT-TYPE' supplies element-specific configuration. content='text/html; charset=UTF-8' supplies element-specific configuration.

### Line 6

```text
    <meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content">
```

Opens the <meta> element: browser metadata; charset selects text decoding and viewport controls mobile layout. name='viewport' form field name used when reading/submitting values. content='width=device-width, initial-scale=1.0, interactive-widget=resizes-content' supplies element-specific configuration.

### Line 7

```text
    <link rel="stylesheet" href="../styles/invoices.css"/>
```

Opens the <link> element: loads an external resource; stylesheet applies the referenced CSS. rel='stylesheet' supplies element-specific configuration. href='../styles/invoices.css' resource or page URL for the link.

### Line 8

```text
    <script type="module" src="../scripts/keyboard.mjs" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/keyboard.mjs' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 9

```text
    <script type="module" src="../scripts/invoice.js" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/invoice.js' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 10

```text
    <title>Mosher Lawms</title>
```

Opens the <title> element: browser tab/document title. The same line continues with nested/closing markup for title. Inline visible text on this line is 'Mosher Lawms', which labels the control/content for the user.

### Line 11

```text
  </head>
```

Closes the <head> metadata container, not visible page content, ending that element’s content scope.

### Line 12

```text
  
```

Blank line separates related markup for readability.

### Line 13

```text
  <body>
```

Opens the <body> element: visible application page and its interactive controls.

### Line 14

```text
    <header class="invoice-header">
```

Opens the <header> element: HTML header element used by this page. class='invoice-header' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 15

```text
     
```

Blank line separates related markup for readability.

### Line 16

```text
     <div class="inv-dropdowns">
```

Opens the <div> element: generic block used here to group a layout or form region. class='inv-dropdowns' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 17

```text
       <div class="select-div">
```

Opens the <div> element: generic block used here to group a layout or form region. class='select-div' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 18

```text
          <label for="cust-select">Customer:</label>
```

Opens the <label> element: accessible caption associated with a form control. for='cust-select' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Customer:', which labels the control/content for the user.

### Line 19

```text
          <select class="sel" id="cust-select">
```

Opens the <select> element: dropdown/list form control. class='sel' space-separated CSS hook(s) that select the element’s visual/layout rules. id='cust-select' unique hook used by CSS, labels, and JavaScript.

### Line 20

```text
            <option value=""></option>
```

Opens the <option> element: one selectable choice in a select. value='' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option.

### Line 21

```text
          </select>
```

Closes the <select> dropdown/list form control, ending that element’s content scope.

### Line 22

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 23

```text
        <div class="select-div">
```

Opens the <div> element: generic block used here to group a layout or form region. class='select-div' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 24

```text
          <label for="inv-select">Invoice:</label>
```

Opens the <label> element: accessible caption associated with a form control. for='inv-select' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Invoice:', which labels the control/content for the user.

### Line 25

```text
          <select class="sel" id="inv-select">
```

Opens the <select> element: dropdown/list form control. class='sel' space-separated CSS hook(s) that select the element’s visual/layout rules. id='inv-select' unique hook used by CSS, labels, and JavaScript.

### Line 26

```text
            <option value=""></option>
```

Opens the <option> element: one selectable choice in a select. value='' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option.

### Line 27

```text
          </select>
```

Closes the <select> dropdown/list form control, ending that element’s content scope.

### Line 28

```text
        </div> 
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 29

```text
       <div class="invoice-actions">
```

Opens the <div> element: generic block used here to group a layout or form region. class='invoice-actions' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 30

```text
         <button id="add-inv-btn">Create Invoice</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. id='add-inv-btn' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Create Invoice', which labels the control/content for the user.

### Line 31

```text
         <button id="delete-inv-btn" type="button">Delete Invoice</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. id='delete-inv-btn' unique hook used by CSS, labels, and JavaScript. type='button' chooses the control/resource/script type. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Delete Invoice', which labels the control/content for the user.

### Line 32

```text
       </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 33

```text
      </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 34

```text
      <div class="item-btns">
```

Opens the <div> element: generic block used here to group a layout or form region. class='item-btns' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 35

```text
        <button id="add-item-btn">Add Item</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. id='add-item-btn' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Add Item', which labels the control/content for the user.

### Line 36

```text
        <button id="edit-item-btn" type="button" disabled>Edit Item</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. id='edit-item-btn' unique hook used by CSS, labels, and JavaScript. type='button' chooses the control/resource/script type. disabled='' makes a control unavailable for interaction. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Edit Item', which labels the control/content for the user.

### Line 37

```text
        <button id="remove-item-btn" type="button">Remove Item</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. id='remove-item-btn' unique hook used by CSS, labels, and JavaScript. type='button' chooses the control/resource/script type. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Remove Item', which labels the control/content for the user.

### Line 38

```text
      </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 39

```text
      <section class="open-div" id="open-div" aria-label="All open invoices"></section>
```

Opens the <section> element: thematically grouped content region. class='open-div' space-separated CSS hook(s) that select the element’s visual/layout rules. id='open-div' unique hook used by CSS, labels, and JavaScript. aria-label='All open invoices' accessible name read by assistive technology. The same line continues with nested/closing markup for section.

### Line 40

```text
      
```

Blank line separates related markup for readability.

### Line 41

```text
    </header>
```

Closes the <header> container, ending that element’s content scope.

### Line 42

```text
    <main>
```

Opens the <main> element: HTML main element used by this page.

### Line 43

```text
      <div class="table-box">
```

Opens the <div> element: generic block used here to group a layout or form region. class='table-box' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 44

```text
      <table id="inv-table">
```

Opens the <table> element: tabular data container. id='inv-table' unique hook used by CSS, labels, and JavaScript.

### Line 45

```text
        <thead>
```

Opens the <thead> element: table header row group.

### Line 46

```text
          <tr>
```

Opens the <tr> element: table row.

### Line 47

```text
            <th colspan="3" id="date-head">
```

Opens the <th> element: header cell describing a column/row. colspan='3' supplies element-specific configuration. id='date-head' unique hook used by CSS, labels, and JavaScript.

### Line 48

```text
              <label for="invoice-date">Invoice date</label>
```

Opens the <label> element: accessible caption associated with a form control. for='invoice-date' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Invoice date', which labels the control/content for the user.

### Line 49

```text
              <input id="invoice-date" type="date" aria-label="Invoice date" disabled>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. id='invoice-date' unique hook used by CSS, labels, and JavaScript. type='date' chooses the control/resource/script type. aria-label='Invoice date' accessible name read by assistive technology. disabled='' makes a control unavailable for interaction.

### Line 50

```text
            </th>
```

Closes the <th> header cell describing a column/row, ending that element’s content scope.

### Line 51

```text
          </tr>
```

Closes the <tr> table row, ending that element’s content scope.

### Line 52

```text
          <tr>
```

Opens the <tr> element: table row.

### Line 53

```text
            <th scope="col" colspan="2" data-sort-key="item" data-sort-type="text"><button class="table-sort-button" type="button"><span class="table-sort-label">Item</span><span class="table-sort-indicator" aria-hidden="true">↕</span></button></th>
```

Opens the <th> element: header cell describing a column/row. scope='col' supplies element-specific configuration. colspan='2' supplies element-specific configuration. data-sort-key='item' supplies element-specific configuration. data-sort-type='text' supplies element-specific configuration. The same line continues with nested/closing markup for button, span, span, span, span, button, th. Inline visible text on this line is 'Item ↕', which labels the control/content for the user.

### Line 54

```text
            <th scope="col" data-sort-key="value" data-sort-type="number"><button class="table-sort-button" type="button"><span class="table-sort-label">Value</span><span class="table-sort-indicator" aria-hidden="true">↕</span></button></th>
```

Opens the <th> element: header cell describing a column/row. scope='col' supplies element-specific configuration. data-sort-key='value' supplies element-specific configuration. data-sort-type='number' supplies element-specific configuration. The same line continues with nested/closing markup for button, span, span, span, span, button, th. Inline visible text on this line is 'Value ↕', which labels the control/content for the user.

### Line 55

```text
          </tr>
```

Closes the <tr> table row, ending that element’s content scope.

### Line 56

```text
        </thead>
```

Closes the <thead> table header row group, ending that element’s content scope.

### Line 57

```text
        <tbody id="invoice-table-body">
```

Opens the <tbody> element: table body row group. id='invoice-table-body' unique hook used by CSS, labels, and JavaScript.

### Line 58

```text
          <tr>
```

Opens the <tr> element: table row.

### Line 59

```text
            <td colspan="3">No invoice selected</td>
```

Opens the <td> element: data cell in a table. colspan='3' supplies element-specific configuration. The same line continues with nested/closing markup for td. Inline visible text on this line is 'No invoice selected', which labels the control/content for the user.

### Line 60

```text
          </tr>
```

Closes the <tr> table row, ending that element’s content scope.

### Line 61

```text
        </tbody>
```

Closes the <tbody> table body row group, ending that element’s content scope.

### Line 62

```text
        <tfoot>
```

Opens the <tfoot> element: HTML tfoot element used by this page.

### Line 63

```text
          <tr>
```

Opens the <tr> element: table row.

### Line 64

```text
            <td colspan="3">
```

Opens the <td> element: data cell in a table. colspan='3' supplies element-specific configuration.

### Line 65

```text
              <strong>Total:</strong>
```

Opens the <strong> element: strongly emphasized label, used for key names/values. The same line continues with nested/closing markup for strong. Inline visible text on this line is 'Total:', which labels the control/content for the user.

### Line 66

```text
            </td>
```

Closes the <td> data cell in a table, ending that element’s content scope.

### Line 67

```text
          </tr>
```

Closes the <tr> table row, ending that element’s content scope.

### Line 68

```text
          <tr class="paid-notice" id="paid-notice">
```

Opens the <tr> element: table row. class='paid-notice' space-separated CSS hook(s) that select the element’s visual/layout rules. id='paid-notice' unique hook used by CSS, labels, and JavaScript.

### Line 69

```text
          </tr>
```

Closes the <tr> table row, ending that element’s content scope.

### Line 70

```text
        </tfoot>
```

Closes the <tfoot> container, ending that element’s content scope.

### Line 71

```text
      </table>
```

Closes the <table> tabular data container, ending that element’s content scope.

### Line 72

```text
      </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 73

```text
      <details class="shift-link-panel">
```

Opens the <details> element: disclosure container that can expand/collapse. class='shift-link-panel' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 74

```text
        <summary id="shift-link-heading"><span class="shift-link-title">Work shifts and labor</span></summary>
```

Opens the <summary> element: visible toggle label for a details disclosure. id='shift-link-heading' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for span, span, summary. Inline visible text on this line is 'Work shifts and labor', which labels the control/content for the user.

### Line 75

```text
        <p class="shift-link-description">Attach completed shifts for this customer. Each labor line snapshots the customer rate and saved break-adjusted hours. Clock In/Out and break buttons round recorded times to the nearest 15 minutes; manually edited shift times are used as saved. Hours are stored to 2 decimals and the line total is rounded to cents. Later shift or customer-rate edits do not change the billed snapshot; changed source shifts are flagged below.</p>
```

Opens the <p> element: paragraph or status/instruction text. class='shift-link-description' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Attach completed shifts for this customer. Each labor line snapshots the customer rate and saved break-adjusted hours. Clock In/Out and break buttons round recorded times to the ne', which labels the control/content for the user.

### Line 76

```text
        <div id="shift-link-list" class="shift-link-list" aria-live="polite"></div>
```

Opens the <div> element: generic block used here to group a layout or form region. id='shift-link-list' unique hook used by CSS, labels, and JavaScript. class='shift-link-list' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-live='polite' requests announcements when status text changes. The same line continues with nested/closing markup for div.

### Line 77

```text
        <p id="shift-link-error" class="form-error" role="alert" aria-live="polite"></p>
```

Opens the <p> element: paragraph or status/instruction text. id='shift-link-error' unique hook used by CSS, labels, and JavaScript. class='form-error' space-separated CSS hook(s) that select the element’s visual/layout rules. role='alert' accessibility role, here exposing status/alert semantics. aria-live='polite' requests announcements when status text changes. The same line continues with nested/closing markup for p.

### Line 78

```text
        <button id="save-shift-links-btn" type="button" disabled>Update linked shifts</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. id='save-shift-links-btn' unique hook used by CSS, labels, and JavaScript. type='button' chooses the control/resource/script type. disabled='' makes a control unavailable for interaction. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Update linked shifts', which labels the control/content for the user.

### Line 79

```text
      </details>
```

Closes the <details> disclosure container that can expand/collapse, ending that element’s content scope.

### Line 80

```text
    </main>
```

Closes the <main> container, ending that element’s content scope.

### Line 81

```text
    
```

Blank line separates related markup for readability.

### Line 82

```text
    <dialog class="modal" id="item-modal">
```

Opens the <dialog> element: native modal dialog; open/close and form behavior are managed by JavaScript/browser. class='modal' space-separated CSS hook(s) that select the element’s visual/layout rules. id='item-modal' unique hook used by CSS, labels, and JavaScript.

### Line 83

```text
      <form id="add-item-form">
```

Opens the <form> element: group of controls submitted/handled as one editing operation. id='add-item-form' unique hook used by CSS, labels, and JavaScript.

### Line 84

```text
        <h2 id="item-modal-title">Add invoice item</h2>
```

Opens the <h2> element: second-level heading for a navigation/content group. id='item-modal-title' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for h2. Inline visible text on this line is 'Add invoice item', which labels the control/content for the user.

### Line 85

```text
        <label for="name-input">Item name</label>
```

Opens the <label> element: accessible caption associated with a form control. for='name-input' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Item name', which labels the control/content for the user.

### Line 86

```text
        <input id="name-input" placeholder="Item name" type="text" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. id='name-input' unique hook used by CSS, labels, and JavaScript. placeholder='Item name' hint shown before a text field has a value. type='text' chooses the control/resource/script type. required='' prevents submission while the control is empty.

### Line 87

```text
        <label for="value-input">Item value</label>
```

Opens the <label> element: accessible caption associated with a form control. for='value-input' connects a label to the control with the matching id. The same line continues with nested/closing markup for label. Inline visible text on this line is 'Item value', which labels the control/content for the user.

### Line 88

```text
        <input id="value-input" placeholder="Item value" type="number" step="0.01" required>
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. id='value-input' unique hook used by CSS, labels, and JavaScript. placeholder='Item value' hint shown before a text field has a value. type='number' chooses the control/resource/script type. step='0.01' increment used by a numeric control. required='' prevents submission while the control is empty.

### Line 89

```text
        <p id="item-form-error" class="form-error" aria-live="polite" hidden></p>
```

Opens the <p> element: paragraph or status/instruction text. id='item-form-error' unique hook used by CSS, labels, and JavaScript. class='form-error' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-live='polite' requests announcements when status text changes. hidden='' keeps the region out of layout until JavaScript reveals it. The same line continues with nested/closing markup for p.

### Line 90

```text
        <div class="modal-btns">
```

Opens the <div> element: generic block used here to group a layout or form region. class='modal-btns' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 91

```text
          <button type="submit" id="submit-btn">Add</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='submit' chooses the control/resource/script type. id='submit-btn' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Add', which labels the control/content for the user.

### Line 92

```text
          <button type="reset" id="cancel-btn">Cancel</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. type='reset' chooses the control/resource/script type. id='cancel-btn' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Cancel', which labels the control/content for the user.

### Line 93

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 94

```text
      </form>
```

Closes the <form> group of controls submitted/handled as one editing operation, ending that element’s content scope.

### Line 95

```text
    </dialog>
```

Closes the <dialog> native modal dialog; open/close and form behavior are managed by JavaScript/browser, ending that element’s content scope.

### Line 96

```text
    
```

Blank line separates related markup for readability.

### Line 97

```text
  </body>
```

Closes the <body> visible application page and its interactive controls, ending that element’s content scope.

### Line 98

```text
  
```

Blank line separates related markup for readability.

### Line 99

```text
</html>
```

Closes the <html> root document element; lang declares the document language, ending that element’s content scope.

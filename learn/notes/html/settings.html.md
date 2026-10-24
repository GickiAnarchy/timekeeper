# html/settings.html

[Exact copy](../../original/html/settings.html)

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
    <link rel="stylesheet" href="../styles/settings.css">
```

Opens the <link> element: loads an external resource; stylesheet applies the referenced CSS. rel='stylesheet' supplies element-specific configuration. href='../styles/settings.css' resource or page URL for the link.

### Line 7

```text
    <script type="module" src="../scripts/keyboard.mjs" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/keyboard.mjs' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 8

```text
    <script type="module" src="../scripts/settings.js" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/settings.js' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 9

```text
    <title>Settings · Mosher Lawns Timekeeper</title>
```

Opens the <title> element: browser tab/document title. The same line continues with nested/closing markup for title. Inline visible text on this line is 'Settings · Mosher Lawns Timekeeper', which labels the control/content for the user.

### Line 10

```text
  </head>
```

Closes the <head> metadata container, not visible page content, ending that element’s content scope.

### Line 11

```text
  <body class="settings-body">
```

Opens the <body> element: visible application page and its interactive controls. class='settings-body' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 12

```text
    <main class="settings-page">
```

Opens the <main> element: HTML main element used by this page. class='settings-page' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 13

```text
      <header class="settings-intro">
```

Opens the <header> element: HTML header element used by this page. class='settings-intro' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 14

```text
        <p class="settings-eyebrow">YOUR WORKSPACE</p>
```

Opens the <p> element: paragraph or status/instruction text. class='settings-eyebrow' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'YOUR WORKSPACE', which labels the control/content for the user.

### Line 15

```text
        <h1>Settings</h1>
```

Opens the <h1> element: primary heading for the current page. The same line continues with nested/closing markup for h1. Inline visible text on this line is 'Settings', which labels the control/content for the user.

### Line 16

```text
        <p>Adjust the look and text size to make Timekeeper more comfortable to use.</p>
```

Opens the <p> element: paragraph or status/instruction text. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Adjust the look and text size to make Timekeeper more comfortable to use.', which labels the control/content for the user.

### Line 17

```text
      </header>
```

Closes the <header> container, ending that element’s content scope.

### Line 18

```text

```

Blank line separates related markup for readability.

### Line 19

```text
      <section class="settings-card" aria-labelledby="appearance-title">
```

Opens the <section> element: thematically grouped content region. class='settings-card' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-labelledby='appearance-title' points to another element whose text names this region/control.

### Line 20

```text
        <div class="settings-card-heading">
```

Opens the <div> element: generic block used here to group a layout or form region. class='settings-card-heading' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 21

```text
          <span class="settings-icon" aria-hidden="true">◐</span>
```

Opens the <span> element: inline wrapper for text, icons, or a decorative visual fragment. class='settings-icon' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-hidden='true' hides decorative content from assistive technology. The same line continues with nested/closing markup for span. Inline visible text on this line is '◐', which labels the control/content for the user.

### Line 22

```text
          <div>
```

Opens the <div> element: generic block used here to group a layout or form region.

### Line 23

```text
            <h2 id="appearance-title">Appearance</h2>
```

Opens the <h2> element: second-level heading for a navigation/content group. id='appearance-title' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for h2. Inline visible text on this line is 'Appearance', which labels the control/content for the user.

### Line 24

```text
            <p>Choose a color theme for this browser.</p>
```

Opens the <p> element: paragraph or status/instruction text. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Choose a color theme for this browser.', which labels the control/content for the user.

### Line 25

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 26

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 27

```text
        <label class="settings-field" for="theme-select">
```

Opens the <label> element: accessible caption associated with a form control. class='settings-field' space-separated CSS hook(s) that select the element’s visual/layout rules. for='theme-select' connects a label to the control with the matching id.

### Line 28

```text
          <span>Color theme</span>
```

Opens the <span> element: inline wrapper for text, icons, or a decorative visual fragment. The same line continues with nested/closing markup for span. Inline visible text on this line is 'Color theme', which labels the control/content for the user.

### Line 29

```text
          <select id="theme-select" aria-label="Choose workspace theme">
```

Opens the <select> element: dropdown/list form control. id='theme-select' unique hook used by CSS, labels, and JavaScript. aria-label='Choose workspace theme' accessible name read by assistive technology.

### Line 30

```text
            <option value="forest">Forest</option>
```

Opens the <option> element: one selectable choice in a select. value='forest' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Forest', which labels the control/content for the user.

### Line 31

```text
            <option value="coastal">Coastal</option>
```

Opens the <option> element: one selectable choice in a select. value='coastal' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Coastal', which labels the control/content for the user.

### Line 32

```text
            <option value="harvest">Harvest</option>
```

Opens the <option> element: one selectable choice in a select. value='harvest' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Harvest', which labels the control/content for the user.

### Line 33

```text
            <option value="midnight">Midnight</option>
```

Opens the <option> element: one selectable choice in a select. value='midnight' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Midnight', which labels the control/content for the user.

### Line 34

```text
            <option value="lavender">Lavender</option>
```

Opens the <option> element: one selectable choice in a select. value='lavender' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Lavender', which labels the control/content for the user.

### Line 35

```text
            <option value="rose">Rose</option>
```

Opens the <option> element: one selectable choice in a select. value='rose' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Rose', which labels the control/content for the user.

### Line 36

```text
            <option value="slate">Slate</option>
```

Opens the <option> element: one selectable choice in a select. value='slate' submitted/control value, including dialog action values. The same line continues with nested/closing markup for option. Inline visible text on this line is 'Slate', which labels the control/content for the user.

### Line 37

```text
          </select>
```

Closes the <select> dropdown/list form control, ending that element’s content scope.

### Line 38

```text
        </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 39

```text
        <p class="settings-help">Theme choices are saved in this browser, so set the theme separately on each device.</p>
```

Opens the <p> element: paragraph or status/instruction text. class='settings-help' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Theme choices are saved in this browser, so set the theme separately on each device.', which labels the control/content for the user.

### Line 40

```text
      </section>
```

Closes the <section> thematically grouped content region, ending that element’s content scope.

### Line 41

```text

```

Blank line separates related markup for readability.

### Line 42

```text
      <section class="settings-card" aria-labelledby="text-size-title">
```

Opens the <section> element: thematically grouped content region. class='settings-card' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-labelledby='text-size-title' points to another element whose text names this region/control.

### Line 43

```text
        <div class="settings-card-heading">
```

Opens the <div> element: generic block used here to group a layout or form region. class='settings-card-heading' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 44

```text
          <span class="settings-icon settings-icon-type" aria-hidden="true">Aa</span>
```

Opens the <span> element: inline wrapper for text, icons, or a decorative visual fragment. class='settings-icon settings-icon-type' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-hidden='true' hides decorative content from assistive technology. The same line continues with nested/closing markup for span. Inline visible text on this line is 'Aa', which labels the control/content for the user.

### Line 45

```text
          <div>
```

Opens the <div> element: generic block used here to group a layout or form region.

### Line 46

```text
            <h2 id="text-size-title">Text size</h2>
```

Opens the <h2> element: second-level heading for a navigation/content group. id='text-size-title' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for h2. Inline visible text on this line is 'Text size', which labels the control/content for the user.

### Line 47

```text
            <p>Make text easier to read on this device. This changes the size of the full workspace.</p>
```

Opens the <p> element: paragraph or status/instruction text. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Make text easier to read on this device. This changes the size of the full workspace.', which labels the control/content for the user.

### Line 48

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 49

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 50

```text
        <fieldset class="size-options" aria-describedby="text-size-help">
```

Opens the <fieldset> element: HTML fieldset element used by this page. class='size-options' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-describedby='text-size-help' supplies element-specific configuration.

### Line 51

```text
          <legend>Choose a text size</legend>
```

Opens the <legend> element: HTML legend element used by this page. The same line continues with nested/closing markup for legend. Inline visible text on this line is 'Choose a text size', which labels the control/content for the user.

### Line 52

```text
          <label class="size-option">
```

Opens the <label> element: accessible caption associated with a form control. class='size-option' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 53

```text
            <input type="radio" name="font-scale" value="1">
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='radio' chooses the control/resource/script type. name='font-scale' form field name used when reading/submitting values. value='1' submitted/control value, including dialog action values.

### Line 54

```text
            <span class="size-option-copy"><strong>Standard</strong><small>100%</small></span>
```

Opens the <span> element: inline wrapper for text, icons, or a decorative visual fragment. class='size-option-copy' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for strong, strong, small, small, span. Inline visible text on this line is 'Standard 100%', which labels the control/content for the user.

### Line 55

```text
          </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 56

```text
          <label class="size-option">
```

Opens the <label> element: accessible caption associated with a form control. class='size-option' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 57

```text
            <input type="radio" name="font-scale" value="1.15">
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='radio' chooses the control/resource/script type. name='font-scale' form field name used when reading/submitting values. value='1.15' submitted/control value, including dialog action values.

### Line 58

```text
            <span class="size-option-copy"><strong>Large</strong><small>115%</small></span>
```

Opens the <span> element: inline wrapper for text, icons, or a decorative visual fragment. class='size-option-copy' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for strong, strong, small, small, span. Inline visible text on this line is 'Large 115%', which labels the control/content for the user.

### Line 59

```text
          </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 60

```text
          <label class="size-option">
```

Opens the <label> element: accessible caption associated with a form control. class='size-option' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 61

```text
            <input type="radio" name="font-scale" value="1.3">
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='radio' chooses the control/resource/script type. name='font-scale' form field name used when reading/submitting values. value='1.3' submitted/control value, including dialog action values.

### Line 62

```text
            <span class="size-option-copy"><strong>Extra large</strong><small>130%</small></span>
```

Opens the <span> element: inline wrapper for text, icons, or a decorative visual fragment. class='size-option-copy' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for strong, strong, small, small, span. Inline visible text on this line is 'Extra large 130%', which labels the control/content for the user.

### Line 63

```text
          </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 64

```text
          <label class="size-option">
```

Opens the <label> element: accessible caption associated with a form control. class='size-option' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 65

```text
            <input type="radio" name="font-scale" value="1.5">
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. type='radio' chooses the control/resource/script type. name='font-scale' form field name used when reading/submitting values. value='1.5' submitted/control value, including dialog action values.

### Line 66

```text
            <span class="size-option-copy"><strong>Largest</strong><small>150%</small></span>
```

Opens the <span> element: inline wrapper for text, icons, or a decorative visual fragment. class='size-option-copy' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for strong, strong, small, small, span. Inline visible text on this line is 'Largest 150%', which labels the control/content for the user.

### Line 67

```text
          </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 68

```text
        </fieldset>
```

Closes the <fieldset> container, ending that element’s content scope.

### Line 69

```text
        <p class="settings-help" id="text-size-help">Your choice is saved in this browser and applies across all pages.</p>
```

Opens the <p> element: paragraph or status/instruction text. class='settings-help' space-separated CSS hook(s) that select the element’s visual/layout rules. id='text-size-help' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Your choice is saved in this browser and applies across all pages.', which labels the control/content for the user.

### Line 70

```text
      </section>
```

Closes the <section> thematically grouped content region, ending that element’s content scope.

### Line 71

```text

```

Blank line separates related markup for readability.

### Line 72

```text
      <section class="settings-card" aria-labelledby="backup-title">
```

Opens the <section> element: thematically grouped content region. class='settings-card' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-labelledby='backup-title' points to another element whose text names this region/control.

### Line 73

```text
        <div class="settings-card-heading">
```

Opens the <div> element: generic block used here to group a layout or form region. class='settings-card-heading' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 74

```text
          <span class="settings-icon" aria-hidden="true">⇄</span>
```

Opens the <span> element: inline wrapper for text, icons, or a decorative visual fragment. class='settings-icon' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-hidden='true' hides decorative content from assistive technology. The same line continues with nested/closing markup for span. Inline visible text on this line is '⇄', which labels the control/content for the user.

### Line 75

```text
          <div>
```

Opens the <div> element: generic block used here to group a layout or form region.

### Line 76

```text
            <h2 id="backup-title">Full backup and restore</h2>
```

Opens the <h2> element: second-level heading for a navigation/content group. id='backup-title' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for h2. Inline visible text on this line is 'Full backup and restore', which labels the control/content for the user.

### Line 77

```text
            <p>Download or restore employees, customers, shifts, invoices, payments, planned jobs, active ledger entries, and archived ledger history.</p>
```

Opens the <p> element: paragraph or status/instruction text. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Download or restore employees, customers, shifts, invoices, payments, planned jobs, active ledger entries, and archived ledger history.', which labels the control/content for the user.

### Line 78

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 79

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 80

```text
        <button class="backup-button" id="download-backup-btn" type="button" disabled>Download full backup</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. class='backup-button' space-separated CSS hook(s) that select the element’s visual/layout rules. id='download-backup-btn' unique hook used by CSS, labels, and JavaScript. type='button' chooses the control/resource/script type. disabled='' makes a control unavailable for interaction. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Download full backup', which labels the control/content for the user.

### Line 81

```text
        <label class="settings-field backup-file-field" for="backup-file">
```

Opens the <label> element: accessible caption associated with a form control. class='settings-field backup-file-field' space-separated CSS hook(s) that select the element’s visual/layout rules. for='backup-file' connects a label to the control with the matching id.

### Line 82

```text
          <span>Choose a Timekeeper backup file to preview</span>
```

Opens the <span> element: inline wrapper for text, icons, or a decorative visual fragment. The same line continues with nested/closing markup for span. Inline visible text on this line is 'Choose a Timekeeper backup file to preview', which labels the control/content for the user.

### Line 83

```text
          <input id="backup-file" type="file" accept="application/json,.json">
```

Opens the <input> element: form control; type chooses its interaction and id lets labels/scripts address it. id='backup-file' unique hook used by CSS, labels, and JavaScript. type='file' chooses the control/resource/script type. accept='application/json,.json' supplies element-specific configuration.

### Line 84

```text
        </label>
```

Closes the <label> accessible caption associated with a form control, ending that element’s content scope.

### Line 85

```text
        <div id="backup-preview" class="backup-preview" aria-live="polite">No backup selected.</div>
```

Opens the <div> element: generic block used here to group a layout or form region. id='backup-preview' unique hook used by CSS, labels, and JavaScript. class='backup-preview' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-live='polite' requests announcements when status text changes. The same line continues with nested/closing markup for div. Inline visible text on this line is 'No backup selected.', which labels the control/content for the user.

### Line 86

```text
        <p class="settings-warning">Restore replaces the current records included in the backup. Backups with archived-ledger data replace archive history; older backups leave the current archive collections unchanged. Review the preview carefully before continuing. One atomic restore is limited to 500 Firestore writes; larger restores are rejected before changing data.</p>
```

Opens the <p> element: paragraph or status/instruction text. class='settings-warning' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Restore replaces the current records included in the backup. Backups with archived-ledger data replace archive history; older backups leave the current archive collections unchange', which labels the control/content for the user.

### Line 87

```text
        <button class="backup-button backup-restore-button" id="restore-backup-btn" type="button" disabled>Restore backup</button>
```

Opens the <button> element: keyboard- and pointer-activatable control. class='backup-button backup-restore-button' space-separated CSS hook(s) that select the element’s visual/layout rules. id='restore-backup-btn' unique hook used by CSS, labels, and JavaScript. type='button' chooses the control/resource/script type. disabled='' makes a control unavailable for interaction. The same line continues with nested/closing markup for button. Inline visible text on this line is 'Restore backup', which labels the control/content for the user.

### Line 88

```text
        <p class="settings-help" id="backup-status" role="status" aria-live="polite">Loading workspace data…</p>
```

Opens the <p> element: paragraph or status/instruction text. class='settings-help' space-separated CSS hook(s) that select the element’s visual/layout rules. id='backup-status' unique hook used by CSS, labels, and JavaScript. role='status' accessibility role, here exposing status/alert semantics. aria-live='polite' requests announcements when status text changes. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Loading workspace data…', which labels the control/content for the user.

### Line 89

```text
      </section>
```

Closes the <section> thematically grouped content region, ending that element’s content scope.

### Line 90

```text
    </main>
```

Closes the <main> container, ending that element’s content scope.

### Line 91

```text
  </body>
```

Closes the <body> visible application page and its interactive controls, ending that element’s content scope.

### Line 92

```text
</html>
```

Closes the <html> root document element; lang declares the document language, ending that element’s content scope.

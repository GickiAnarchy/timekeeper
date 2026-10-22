# html/home.html

[Exact copy](../../original/html/home.html)

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
    <link rel="stylesheet" href="../styles/home.css">
```

Opens the <link> element: loads an external resource; stylesheet applies the referenced CSS. rel='stylesheet' supplies element-specific configuration. href='../styles/home.css' resource or page URL for the link.

### Line 7

```text
    <script type="module" src="../scripts/keyboard.mjs" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/keyboard.mjs' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 8

```text
    <script type="module" src="../scripts/home.js" defer></script>
```

Opens the <script> element: loads and runs the page JavaScript module; defer waits until parsing is complete. type='module' chooses the control/resource/script type. src='../scripts/home.js' file URL loaded by the element. defer='' supplies element-specific configuration. The same line continues with nested/closing markup for script.

### Line 9

```text
    <title>Home · Mosher Lawns Timekeeper</title>
```

Opens the <title> element: browser tab/document title. The same line continues with nested/closing markup for title. Inline visible text on this line is 'Home · Mosher Lawns Timekeeper', which labels the control/content for the user.

### Line 10

```text
  </head>
```

Closes the <head> metadata container, not visible page content, ending that element’s content scope.

### Line 11

```text
  <body class="home-body">
```

Opens the <body> element: visible application page and its interactive controls. class='home-body' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 12

```text
    <main class="home-dashboard">
```

Opens the <main> element: HTML main element used by this page. class='home-dashboard' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 13

```text
      <section class="dashboard-hero" aria-labelledby="home-title">
```

Opens the <section> element: thematically grouped content region. class='dashboard-hero' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-labelledby='home-title' points to another element whose text names this region/control.

### Line 14

```text
        <div class="hero-copy">
```

Opens the <div> element: generic block used here to group a layout or form region. class='hero-copy' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 15

```text
          <p class="home-kicker">MOSHER LAWNS · TEAM WORKSPACE</p>
```

Opens the <p> element: paragraph or status/instruction text. class='home-kicker' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'MOSHER LAWNS · TEAM WORKSPACE', which labels the control/content for the user.

### Line 16

```text
          <h1 id="home-title">A clear view of today.</h1>
```

Opens the <h1> element: primary heading for the current page. id='home-title' unique hook used by CSS, labels, and JavaScript. The same line continues with nested/closing markup for h1. Inline visible text on this line is 'A clear view of today.', which labels the control/content for the user.

### Line 17

```text
          <p>Keep the crew moving, keep hours accurate, and see what work is coming up next.</p>
```

Opens the <p> element: paragraph or status/instruction text. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Keep the crew moving, keep hours accurate, and see what work is coming up next.', which labels the control/content for the user.

### Line 18

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 19

```text
        <div class="home-actions">
```

Opens the <div> element: generic block used here to group a layout or form region. class='home-actions' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 20

```text
          <a class="home-action" href="clock.html" target="main-content">Clock in / out <span aria-hidden="true">→</span></a>
```

Opens the <a> element: link; href supplies destination and target chooses the named content frame/area. class='home-action' space-separated CSS hook(s) that select the element’s visual/layout rules. href='clock.html' resource or page URL for the link. target='main-content' names the browsing/content target receiving the link. Its destination is loaded into the app’s main content browsing target. The same line continues with nested/closing markup for span, span, a. Inline visible text on this line is 'Clock in / out →', which labels the control/content for the user.

### Line 21

```text
          <a class="home-action home-action-secondary" href="planned.html" target="main-content">Plan a job</a>
```

Opens the <a> element: link; href supplies destination and target chooses the named content frame/area. class='home-action home-action-secondary' space-separated CSS hook(s) that select the element’s visual/layout rules. href='planned.html' resource or page URL for the link. target='main-content' names the browsing/content target receiving the link. Its destination is loaded into the app’s main content browsing target. The same line continues with nested/closing markup for a. Inline visible text on this line is 'Plan a job', which labels the control/content for the user.

### Line 22

```text
        </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 23

```text
      </section>
```

Closes the <section> thematically grouped content region, ending that element’s content scope.

### Line 24

```text

```

Blank line separates related markup for readability.

### Line 25

```text
      <section class="daily-quote" aria-label="Quote of the day">
```

Opens the <section> element: thematically grouped content region. class='daily-quote' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-label='Quote of the day' accessible name read by assistive technology.

### Line 26

```text
        <span class="quote-mark" aria-hidden="true">“</span>
```

Opens the <span> element: inline wrapper for text, icons, or a decorative visual fragment. class='quote-mark' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-hidden='true' hides decorative content from assistive technology. The same line continues with nested/closing markup for span. Inline visible text on this line is '“', which labels the control/content for the user.

### Line 27

```text
        <figure class="quote-content">
```

Opens the <figure> element: HTML figure element used by this page. class='quote-content' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 28

```text
          <p class="quote-eyebrow">A THOUGHT FOR TODAY</p>
```

Opens the <p> element: paragraph or status/instruction text. class='quote-eyebrow' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'A THOUGHT FOR TODAY', which labels the control/content for the user.

### Line 29

```text
          <blockquote><p id="daily-quote-text"></p></blockquote>
```

Opens the <blockquote> element: HTML blockquote element used by this page. The same line continues with nested/closing markup for p, p, blockquote.

### Line 30

```text
          <figcaption><span id="daily-quote-author"></span><span aria-hidden="true"> · </span><a id="daily-quote-source" target="_blank" rel="noopener noreferrer"></a></figcaption>
```

Opens the <figcaption> element: HTML figcaption element used by this page. The same line continues with nested/closing markup for span, span, span, span, a, a, figcaption. Inline visible text on this line is '·', which labels the control/content for the user.

### Line 31

```text
        </figure>
```

Closes the <figure> container, ending that element’s content scope.

### Line 32

```text
      </section>
```

Closes the <section> thematically grouped content region, ending that element’s content scope.

### Line 33

```text

```

Blank line separates related markup for readability.

### Line 34

```text
      <section class="hours-overview" aria-label="Hours overview">
```

Opens the <section> element: thematically grouped content region. class='hours-overview' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-label='Hours overview' accessible name read by assistive technology.

### Line 35

```text
        <article class="hours-card">
```

Opens the <article> element: HTML article element used by this page. class='hours-card' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 36

```text
          <div class="metric-icon" aria-hidden="true">◷</div>
```

Opens the <div> element: generic block used here to group a layout or form region. class='metric-icon' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-hidden='true' hides decorative content from assistive technology. The same line continues with nested/closing markup for div. Inline visible text on this line is '◷', which labels the control/content for the user.

### Line 37

```text
          <div><p>Hours today</p><strong id="today-hours">—</strong><small id="today-hours-note">Loading shifts…</small></div>
```

Opens the <div> element: generic block used here to group a layout or form region. The same line continues with nested/closing markup for p, p, strong, strong, small, small, div. Inline visible text on this line is 'Hours today — Loading shifts…', which labels the control/content for the user.

### Line 38

```text
        </article>
```

Closes the <article> container, ending that element’s content scope.

### Line 39

```text
        <article class="hours-card">
```

Opens the <article> element: HTML article element used by this page. class='hours-card' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 40

```text
          <div class="metric-icon metric-icon-week" aria-hidden="true">▦</div>
```

Opens the <div> element: generic block used here to group a layout or form region. class='metric-icon metric-icon-week' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-hidden='true' hides decorative content from assistive technology. The same line continues with nested/closing markup for div. Inline visible text on this line is '▦', which labels the control/content for the user.

### Line 41

```text
          <div><p>This week</p><strong id="week-hours">—</strong><small id="week-hours-note">Since Monday</small></div>
```

Opens the <div> element: generic block used here to group a layout or form region. The same line continues with nested/closing markup for p, p, strong, strong, small, small, div. Inline visible text on this line is 'This week — Since Monday', which labels the control/content for the user.

### Line 42

```text
        </article>
```

Closes the <article> container, ending that element’s content scope.

### Line 43

```text
        <article class="hours-card">
```

Opens the <article> element: HTML article element used by this page. class='hours-card' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 44

```text
          <div class="metric-icon metric-icon-active" aria-hidden="true">●</div>
```

Opens the <div> element: generic block used here to group a layout or form region. class='metric-icon metric-icon-active' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-hidden='true' hides decorative content from assistive technology. The same line continues with nested/closing markup for div. Inline visible text on this line is '●', which labels the control/content for the user.

### Line 45

```text
          <div><p>Active shifts</p><strong id="active-count">—</strong><small id="active-count-note">Crew currently clocked in</small></div>
```

Opens the <div> element: generic block used here to group a layout or form region. The same line continues with nested/closing markup for p, p, strong, strong, small, small, div. Inline visible text on this line is 'Active shifts — Crew currently clocked in', which labels the control/content for the user.

### Line 46

```text
        </article>
```

Closes the <article> container, ending that element’s content scope.

### Line 47

```text
      </section>
```

Closes the <section> thematically grouped content region, ending that element’s content scope.

### Line 48

```text

```

Blank line separates related markup for readability.

### Line 49

```text
      <p id="planned-overdue-alert" class="planned-overdue-alert" role="alert" aria-atomic="true" hidden></p>
```

Opens the <p> element: paragraph or status/instruction text. id='planned-overdue-alert' unique hook used by CSS, labels, and JavaScript. class='planned-overdue-alert' space-separated CSS hook(s) that select the element’s visual/layout rules. role='alert' accessibility role, here exposing status/alert semantics. aria-atomic='true' supplies element-specific configuration. hidden='' keeps the region out of layout until JavaScript reveals it. The same line continues with nested/closing markup for p.

### Line 50

```text

```

Blank line separates related markup for readability.

### Line 51

```text
      <section class="dashboard-grid" aria-label="Work at a glance">
```

Opens the <section> element: thematically grouped content region. class='dashboard-grid' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-label='Work at a glance' accessible name read by assistive technology.

### Line 52

```text
        <article class="dashboard-panel">
```

Opens the <article> element: HTML article element used by this page. class='dashboard-panel' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 53

```text
          <div class="panel-heading">
```

Opens the <div> element: generic block used here to group a layout or form region. class='panel-heading' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 54

```text
            <div><p class="panel-eyebrow">RIGHT NOW</p><h2>Active shifts</h2></div>
```

Opens the <div> element: generic block used here to group a layout or form region. The same line continues with nested/closing markup for p, p, h2, h2, div. Inline visible text on this line is 'RIGHT NOW Active shifts', which labels the control/content for the user.

### Line 55

```text
            <a class="panel-link" href="clock.html" target="main-content">Manage shifts <span aria-hidden="true">→</span></a>
```

Opens the <a> element: link; href supplies destination and target chooses the named content frame/area. class='panel-link' space-separated CSS hook(s) that select the element’s visual/layout rules. href='clock.html' resource or page URL for the link. target='main-content' names the browsing/content target receiving the link. Its destination is loaded into the app’s main content browsing target. The same line continues with nested/closing markup for span, span, a. Inline visible text on this line is 'Manage shifts →', which labels the control/content for the user.

### Line 56

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 57

```text
          <ul id="active-shift-list" class="dashboard-list" aria-live="polite">
```

Opens the <ul> element: unordered list container. id='active-shift-list' unique hook used by CSS, labels, and JavaScript. class='dashboard-list' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-live='polite' requests announcements when status text changes.

### Line 58

```text
            <li class="dashboard-empty">Loading active shifts…</li>
```

Opens the <li> element: one list item. class='dashboard-empty' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for li. Inline visible text on this line is 'Loading active shifts…', which labels the control/content for the user.

### Line 59

```text
          </ul>
```

Closes the <ul> unordered list container, ending that element’s content scope.

### Line 60

```text
        </article>
```

Closes the <article> container, ending that element’s content scope.

### Line 61

```text

```

Blank line separates related markup for readability.

### Line 62

```text
        <article class="dashboard-panel">
```

Opens the <article> element: HTML article element used by this page. class='dashboard-panel' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 63

```text
          <div class="panel-heading">
```

Opens the <div> element: generic block used here to group a layout or form region. class='panel-heading' space-separated CSS hook(s) that select the element’s visual/layout rules.

### Line 64

```text
            <div><p class="panel-eyebrow">ON THE SCHEDULE</p><h2>Planned jobs</h2></div>
```

Opens the <div> element: generic block used here to group a layout or form region. The same line continues with nested/closing markup for p, p, h2, h2, div. Inline visible text on this line is 'ON THE SCHEDULE Planned jobs', which labels the control/content for the user.

### Line 65

```text
            <a class="panel-link" href="planned.html" target="main-content">Full schedule <span aria-hidden="true">→</span></a>
```

Opens the <a> element: link; href supplies destination and target chooses the named content frame/area. class='panel-link' space-separated CSS hook(s) that select the element’s visual/layout rules. href='planned.html' resource or page URL for the link. target='main-content' names the browsing/content target receiving the link. Its destination is loaded into the app’s main content browsing target. The same line continues with nested/closing markup for span, span, a. Inline visible text on this line is 'Full schedule →', which labels the control/content for the user.

### Line 66

```text
          </div>
```

Closes the <div> generic block used here to group a layout or form region, ending that element’s content scope.

### Line 67

```text
          <ul id="upcoming-job-list" class="dashboard-list" aria-live="polite">
```

Opens the <ul> element: unordered list container. id='upcoming-job-list' unique hook used by CSS, labels, and JavaScript. class='dashboard-list' space-separated CSS hook(s) that select the element’s visual/layout rules. aria-live='polite' requests announcements when status text changes.

### Line 68

```text
            <li class="dashboard-empty">Loading planned jobs…</li>
```

Opens the <li> element: one list item. class='dashboard-empty' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for li. Inline visible text on this line is 'Loading planned jobs…', which labels the control/content for the user.

### Line 69

```text
          </ul>
```

Closes the <ul> unordered list container, ending that element’s content scope.

### Line 70

```text
        </article>
```

Closes the <article> container, ending that element’s content scope.

### Line 71

```text
      </section>
```

Closes the <section> thematically grouped content region, ending that element’s content scope.

### Line 72

```text

```

Blank line separates related markup for readability.

### Line 73

```text
      <p class="dashboard-footnote">Hour totals include active shifts up to now and subtract recorded breaks. Active totals update every minute.</p>
```

Opens the <p> element: paragraph or status/instruction text. class='dashboard-footnote' space-separated CSS hook(s) that select the element’s visual/layout rules. The same line continues with nested/closing markup for p. Inline visible text on this line is 'Hour totals include active shifts up to now and subtract recorded breaks. Active totals update every minute.', which labels the control/content for the user.

### Line 74

```text
    </main>
```

Closes the <main> container, ending that element’s content scope.

### Line 75

```text
  </body>
```

Closes the <body> visible application page and its interactive controls, ending that element’s content scope.

### Line 76

```text
</html>
```

Closes the <html> root document element; lang declares the document language, ending that element’s content scope.

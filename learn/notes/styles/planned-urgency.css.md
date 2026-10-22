# styles/planned-urgency.css

[Exact copy](../../original/styles/planned-urgency.css)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
/* Shared by the full schedule and Home; text labels carry meaning without color. */
```

Comment records styling intent for maintainers; it has no visual effect.

### Line 2

```text
.urgency-week { --urgency-line: var(--green-line); --urgency-width: 2px; }
```

Selects '.urgency-week'; declarations on this line style matching Timekeeper elements. --urgency-line controls this CSS property; value 'var(--green-line)' uses theme custom property var(--green-line), so the shared design token controls this value. --urgency-width controls this CSS property; value '2px' sets the --urgency-width to 2px.

### Line 3

```text
.urgency-soon { --urgency-line: var(--amber); --urgency-width: 3px; }
```

Selects '.urgency-soon'; declarations on this line style matching Timekeeper elements. --urgency-line controls this CSS property; value 'var(--amber)' uses theme custom property var(--amber), so the shared design token controls this value. --urgency-width controls this CSS property; value '3px' sets the --urgency-width to 3px.

### Line 4

```text
.urgency-tomorrow { --urgency-line: var(--amber); --urgency-width: 4px; --urgency-background: var(--amber-soft); }
```

Selects '.urgency-tomorrow'; declarations on this line style matching Timekeeper elements. --urgency-line controls this CSS property; value 'var(--amber)' uses theme custom property var(--amber), so the shared design token controls this value. --urgency-width controls this CSS property; value '4px' sets the --urgency-width to 4px. --urgency-background controls this CSS property; value 'var(--amber-soft)' uses theme custom property var(--amber-soft), so the shared design token controls this value.

### Line 5

```text
.urgency-today { --urgency-line: var(--red); --urgency-width: 5px; --urgency-background: var(--red-soft); }
```

Selects '.urgency-today'; declarations on this line style matching Timekeeper elements. --urgency-line controls this CSS property; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value. --urgency-width controls this CSS property; value '5px' sets the --urgency-width to 5px. --urgency-background controls this CSS property; value 'var(--red-soft)' uses theme custom property var(--red-soft), so the shared design token controls this value.

### Line 6

```text
.urgency-overdue { --urgency-line: var(--red); --urgency-width: 6px; --urgency-background: var(--red-soft); }
```

Selects '.urgency-overdue'; declarations on this line style matching Timekeeper elements. --urgency-line controls this CSS property; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value. --urgency-width controls this CSS property; value '6px' sets the --urgency-width to 6px. --urgency-background controls this CSS property; value 'var(--red-soft)' uses theme custom property var(--red-soft), so the shared design token controls this value.

### Line 7

```text

```

Blank line separates related rules for readability.

### Line 8

```text
:is(.job-card, .planned-job-item)[class*="urgency-"] {
```

Selects ':is(.job-card, .planned-job-item)[class*="urgency-"]'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 9

```text
  border-inline-start: var(--urgency-width, 0px) solid var(--urgency-line, transparent);
```

For selector ':is(.job-card, .planned-job-item)[class*="urgency-"]', border-inline-start controls this CSS property; value 'var(--urgency-width, 0px) solid var(--urgency-line, transparent)' uses theme custom property var(--urgency-width, 0px) solid var(--urgency-line, transparent), so the shared design token controls this value.

### Line 10

```text
  background: var(--urgency-background, var(--surface));
```

For selector ':is(.job-card, .planned-job-item)[class*="urgency-"]', background sets the full background paint; value 'var(--urgency-background, var(--surface))' uses theme custom property var(--urgency-background, var(--surface)), so the shared design token controls this value.

### Line 11

```text
}
```

Closes the current CSS rule or media-query block.

### Line 12

```text
:is(.job-card, .planned-job-item)[class*="urgency-"]:hover {
```

Selects ':is(.job-card, .planned-job-item)[class*="urgency-"]:hover'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 13

```text
  background: var(--urgency-background, var(--surface-hover));
```

For selector ':is(.job-card, .planned-job-item)[class*="urgency-"]:hover', background sets the full background paint; value 'var(--urgency-background, var(--surface-hover))' uses theme custom property var(--urgency-background, var(--surface-hover)), so the shared design token controls this value.

### Line 14

```text
}
```

Closes the current CSS rule or media-query block.

### Line 15

```text
:is(.urgency-tbd, .urgency-complete) .urgency-label {
```

Selects ':is(.urgency-tbd, .urgency-complete) .urgency-label'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 16

```text
  color: var(--muted);
```

For selector ':is(.urgency-tbd, .urgency-complete) .urgency-label', color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value.

### Line 17

```text
  background: var(--surface-muted);
```

For selector ':is(.urgency-tbd, .urgency-complete) .urgency-label', background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value.

### Line 18

```text
}
```

Closes the current CSS rule or media-query block.

### Line 19

```text
.urgency-tbd .date-tile { color: var(--muted); background: var(--surface-muted); }
```

Selects '.urgency-tbd .date-tile'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value.

### Line 20

```text
.urgency-week .urgency-label { color: var(--green-deep); background: var(--green-soft); }
```

Selects '.urgency-week .urgency-label'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value.

### Line 21

```text
:is(.urgency-soon, .urgency-tomorrow) .urgency-label { color: var(--ink); background: var(--amber-soft); }
```

Selects ':is(.urgency-soon, .urgency-tomorrow) .urgency-label'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value. background sets the full background paint; value 'var(--amber-soft)' uses theme custom property var(--amber-soft), so the shared design token controls this value.

### Line 22

```text
.urgency-tomorrow .urgency-label { border: 1px solid var(--amber); }
```

Selects '.urgency-tomorrow .urgency-label'; declarations on this line style matching Timekeeper elements. border sets border width/style/color; value '1px solid var(--amber)' sets sets border width/style/color to 1px solid var(--amber).

### Line 23

```text
:is(.urgency-today, .urgency-overdue) .urgency-label { color: var(--red); background: var(--surface); border: 1px solid var(--red); font-size: 10px; }
```

Selects ':is(.urgency-today, .urgency-overdue) .urgency-label'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--red)' sets sets border width/style/color to 1px solid var(--red). font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 24

```text
.urgency-overdue .urgency-label { border-width: 2px; font-weight: 800; }
```

Selects '.urgency-overdue .urgency-label'; declarations on this line style matching Timekeeper elements. border-width controls this CSS property; value '2px' sets the border-width to 2px. font-weight sets text stroke emphasis; value '800' sets sets text stroke emphasis to 800.

### Line 25

```text
:is(.urgency-today, .urgency-overdue) .date-tile { color: var(--red); background: var(--red-soft); border-color: var(--red); }
```

Selects ':is(.urgency-today, .urgency-overdue) .date-tile'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value. background sets the full background paint; value 'var(--red-soft)' uses theme custom property var(--red-soft), so the shared design token controls this value. border-color controls this CSS property; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value.

### Line 26

```text
.urgency-label { max-width: 100%; overflow-wrap: anywhere; white-space: normal; }
```

Selects '.urgency-label'; declarations on this line style matching Timekeeper elements. max-width caps horizontal size; value '100%' sets the caps horizontal size to 100%. overflow-wrap controls this CSS property; value 'anywhere' sets overflow-wrap to anywhere. white-space controls wrapping of whitespace/text; value 'normal' sets controls wrapping of whitespace/text to normal.

### Line 27

```text

```

Blank line separates related rules for readability.

### Line 28

```text
.planned-overdue-alert {
```

Selects '.planned-overdue-alert'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 29

```text
  margin: 0 0 16px;
```

For selector '.planned-overdue-alert', margin sets outside spacing around the box; value '0 0 16px' sets the sets outside spacing around the box to 0 0 16px.

### Line 30

```text
  padding: 14px 16px;
```

For selector '.planned-overdue-alert', padding sets inside spacing between border and content; value '14px 16px' sets the sets inside spacing between border and content to 14px 16px.

### Line 31

```text
  color: var(--red);
```

For selector '.planned-overdue-alert', color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value.

### Line 32

```text
  background: var(--red-soft);
```

For selector '.planned-overdue-alert', background sets the full background paint; value 'var(--red-soft)' uses theme custom property var(--red-soft), so the shared design token controls this value.

### Line 33

```text
  border: 1px solid var(--red);
```

For selector '.planned-overdue-alert', border sets border width/style/color; value '1px solid var(--red)' sets sets border width/style/color to 1px solid var(--red).

### Line 34

```text
  border-inline-start-width: 6px;
```

For selector '.planned-overdue-alert', border-inline-start-width controls this CSS property; value '6px' sets the border-inline-start-width to 6px.

### Line 35

```text
  border-radius: 12px;
```

For selector '.planned-overdue-alert', border-radius rounds box corners; value '12px' sets the rounds box corners to 12px.

### Line 36

```text
  font-size: 13px;
```

For selector '.planned-overdue-alert', font-size sets text size; value '13px' sets the sets text size to 13px.

### Line 37

```text
  font-weight: 750;
```

For selector '.planned-overdue-alert', font-weight sets text stroke emphasis; value '750' sets sets text stroke emphasis to 750.

### Line 38

```text
  overflow-wrap: anywhere;
```

For selector '.planned-overdue-alert', overflow-wrap controls this CSS property; value 'anywhere' sets overflow-wrap to anywhere.

### Line 39

```text
}
```

Closes the current CSS rule or media-query block.

### Line 40

```text
.planned-overdue-alert[hidden] { display: none; }
```

Selects '.planned-overdue-alert[hidden]'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'none' removes the element from layout.

### Line 41

```text
.urgency-guide { margin: 0 0 14px; color: var(--ink-soft); font-size: 11px; }
```

Selects '.urgency-guide'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 14px' sets the sets outside spacing around the box to 0 0 14px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 42

```text

```

Blank line separates related rules for readability.

### Line 43

```text
@media (max-width: 520px) {
```

Begins a responsive media query: the nested overrides apply when (max-width: 520px) {.

### Line 44

```text
  .planned-job-item[class*="urgency-"] { flex-wrap: wrap; }
```

Selects '.planned-job-item[class*="urgency-"]'; declarations on this line style matching Timekeeper elements. flex-wrap allows flex children to wrap onto additional lines; value 'wrap' allows children to continue on another line.

### Line 45

```text
  .planned-job-item .job-copy { flex-basis: calc(100% - 80px); }
```

Selects '.planned-job-item .job-copy'; declarations on this line style matching Timekeeper elements. flex-basis controls this CSS property; value 'calc(100% - 80px)' sets flex-basis to calc(100% - 80px).

### Line 46

```text
  .planned-job-item .urgency-label { margin-inline-start: 68px; }
```

Selects '.planned-job-item .urgency-label'; declarations on this line style matching Timekeeper elements. margin-inline-start controls this CSS property; value '68px' sets the margin-inline-start to 68px.

### Line 47

```text
}
```

Closes the current CSS rule or media-query block.

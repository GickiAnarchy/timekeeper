# styles/ledger-archive.css

[Exact copy](../../original/styles/ledger-archive.css)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
@import url("./ui.css");
```

Imports shared design rules from the referenced stylesheet so this page reuses the app-wide tokens/base UI.

### Line 2

```text

```

Blank line separates related rules for readability.

### Line 3

```text
body { padding: clamp(14px, 3vw, 26px); }
```

Selects 'body'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value 'clamp(14px, 3vw, 26px)' uses a responsive clamped value that grows/shrinks within the given minimum and maximum.

### Line 4

```text
.archive-section { display: grid; width: min(100%, 1060px); gap: 16px; margin: 0 auto; }
```

Selects '.archive-section'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. width sets horizontal size; value 'min(100%, 1060px)' sets sets horizontal size to min(100%, 1060px). gap sets spacing between flex/grid children; value '16px' sets the sets spacing between flex/grid children to 16px. margin sets outside spacing around the box; value '0 auto' sets sets outside spacing around the box to 0 auto.

### Line 5

```text
.archive-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; padding: 0 2px; }
```

Selects '.archive-heading'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'flex-end' sets aligns children across the cross axis to flex-end. justify-content aligns children along the main axis; value 'space-between' sets aligns children along the main axis to space-between. gap sets spacing between flex/grid children; value '18px' sets the sets spacing between flex/grid children to 18px. padding sets inside spacing between border and content; value '0 2px' sets the sets inside spacing between border and content to 0 2px.

### Line 6

```text
.archive-heading h1 { margin: 0 0 4px; color: var(--ink); font-size: 22px; letter-spacing: -.04em; }
```

Selects '.archive-heading h1'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 4px' sets the sets outside spacing around the box to 0 0 4px. color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value. font-size sets text size; value '22px' sets the sets text size to 22px. letter-spacing adjusts spacing between glyphs; value '-.04em' sets the adjusts spacing between glyphs to -.04em.

### Line 7

```text
.archive-eyebrow { margin: 0 0 4px; color: var(--green); font-size: 9px; font-weight: 800; letter-spacing: .12em; }
```

Selects '.archive-eyebrow'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 4px' sets the sets outside spacing around the box to 0 0 4px. color sets foreground text/icon color; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. font-size sets text size; value '9px' sets the sets text size to 9px. font-weight sets text stroke emphasis; value '800' sets sets text stroke emphasis to 800. letter-spacing adjusts spacing between glyphs; value '.12em' sets the adjusts spacing between glyphs to .12em.

### Line 8

```text
.archive-description { margin: 0; color: var(--muted); font-size: 11px; }
```

Selects '.archive-description'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 9

```text
.archive-filter { display: grid; min-width: min(260px, 45%); gap: 5px; color: var(--ink-soft); font-size: 10px; font-weight: 650; }
```

Selects '.archive-filter'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. min-width sets the smallest allowed horizontal size; value 'min(260px, 45%)' sets sets the smallest allowed horizontal size to min(260px, 45%). gap sets spacing between flex/grid children; value '5px' sets the sets spacing between flex/grid children to 5px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '650' semibold emphasis.

### Line 10

```text
.archive-filter select { width: 100%; min-height: 38px; padding: 7px 9px; font-size: 11px; }
```

Selects '.archive-filter select'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '100%' sets the sets horizontal size to 100%. min-height sets the smallest allowed control/region height; value '38px' sets the sets the smallest allowed control/region height to 38px. padding sets inside spacing between border and content; value '7px 9px' sets the sets inside spacing between border and content to 7px 9px. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 11

```text
.archive-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
```

Selects '.archive-toolbar'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. justify-content aligns children along the main axis; value 'space-between' sets aligns children along the main axis to space-between. gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px.

### Line 12

```text
.archive-toolbar p { margin: 0; color: var(--muted); font-size: 11px; }
```

Selects '.archive-toolbar p'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 13

```text
.archive-toolbar button { min-height: 34px; padding: 0 12px; color: #fff; background: var(--green); font-size: 10px; font-weight: 700; }
```

Selects '.archive-toolbar button'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '34px' sets the sets the smallest allowed control/region height to 34px. padding sets inside spacing between border and content; value '0 12px' sets the sets inside spacing between border and content to 0 12px. color sets foreground text/icon color; value '#fff' uses explicit color #fff. background sets the full background paint; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 14

```text
.archive-toolbar button:disabled { opacity: .6; cursor: wait; }
```

Selects '.archive-toolbar button:disabled'; declarations on this line style matching Timekeeper elements. opacity makes the element and its contents translucent; value '.6' sets makes the element and its contents translucent to .6. cursor chooses pointer cursor presentation; value 'wait' sets chooses pointer cursor presentation to wait.

### Line 15

```text
.archive-list { display: grid; gap: 12px; }
```

Selects '.archive-list'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px.

### Line 16

```text
.archive-card { overflow: hidden; background: var(--surface); border: 1px solid var(--border); border-radius: 15px; box-shadow: var(--shadow-soft); }
```

Selects '.archive-card'; declarations on this line style matching Timekeeper elements. overflow controls content that exceeds the box, such as scrolling or clipping; value 'hidden' clips content outside the box. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '15px' sets the rounds box corners to 15px. box-shadow draws depth/shadow around a component; value 'var(--shadow-soft)' uses theme custom property var(--shadow-soft), so the shared design token controls this value.

### Line 17

```text
.archive-card-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding: 16px 18px; }
```

Selects '.archive-card-heading'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'flex-start' sets aligns children across the cross axis to flex-start. justify-content aligns children along the main axis; value 'space-between' sets aligns children along the main axis to space-between. gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px. padding sets inside spacing between border and content; value '16px 18px' sets the sets inside spacing between border and content to 16px 18px.

### Line 18

```text
.archive-card-copy { display: grid; gap: 4px; }
```

Selects '.archive-card-copy'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '4px' sets the sets spacing between flex/grid children to 4px.

### Line 19

```text
.archive-card-copy h2 { margin: 0; color: var(--ink); font-size: 15px; letter-spacing: -.025em; }
```

Selects '.archive-card-copy h2'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value. font-size sets text size; value '15px' sets the sets text size to 15px. letter-spacing adjusts spacing between glyphs; value '-.025em' sets the adjusts spacing between glyphs to -.025em.

### Line 20

```text
.archive-card-eyebrow { margin: 0; color: var(--green); font-size: 9px; font-weight: 800; letter-spacing: .1em; }
```

Selects '.archive-card-eyebrow'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. font-size sets text size; value '9px' sets the sets text size to 9px. font-weight sets text stroke emphasis; value '800' sets sets text stroke emphasis to 800. letter-spacing adjusts spacing between glyphs; value '.1em' sets the adjusts spacing between glyphs to .1em.

### Line 21

```text
.archive-card-meta { margin: 0; color: var(--muted); font-size: 10px; }
```

Selects '.archive-card-meta'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 22

```text
.archive-badge { flex: 0 0 auto; padding: 5px 9px; color: var(--green-deep); background: var(--green-soft); border-radius: 999px; font-size: 9px; font-weight: 750; }
```

Selects '.archive-badge'; declarations on this line style matching Timekeeper elements. flex controls this CSS property; value '0 0 auto' sets flex to 0 0 auto. padding sets inside spacing between border and content; value '5px 9px' sets the sets inside spacing between border and content to 5px 9px. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value. border-radius rounds box corners; value '999px' sets the rounds box corners to 999px. font-size sets text size; value '9px' sets the sets text size to 9px. font-weight sets text stroke emphasis; value '750' sets sets text stroke emphasis to 750.

### Line 23

```text
.archive-badge.is-pending { color: var(--amber); background: var(--amber-soft); }
```

Selects '.archive-badge.is-pending'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--amber)' uses theme custom property var(--amber), so the shared design token controls this value. background sets the full background paint; value 'var(--amber-soft)' uses theme custom property var(--amber-soft), so the shared design token controls this value.

### Line 24

```text
.archive-details { border-top: 1px solid var(--border-soft); }
```

Selects '.archive-details'; declarations on this line style matching Timekeeper elements. border-top sets the top border; value '1px solid var(--border-soft)' sets sets the top border to 1px solid var(--border-soft).

### Line 25

```text
.archive-details summary { padding: 10px 18px; color: var(--ink-soft); cursor: pointer; font-size: 10px; font-weight: 700; }
```

Selects '.archive-details summary'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '10px 18px' sets the sets inside spacing between border and content to 10px 18px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. cursor chooses pointer cursor presentation; value 'pointer' sets chooses pointer cursor presentation to pointer. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 26

```text
.archive-entry-list { display: grid; gap: 7px; margin: 0; padding: 0 18px 16px; list-style: none; }
```

Selects '.archive-entry-list'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '7px' sets the sets spacing between flex/grid children to 7px. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. padding sets inside spacing between border and content; value '0 18px 16px' sets the sets inside spacing between border and content to 0 18px 16px. list-style controls list markers; value 'none' sets controls list markers to none.

### Line 27

```text
.archive-entry { display: grid; gap: 4px; padding: 10px 12px; background: var(--surface-muted); border: 1px solid var(--border-soft); border-radius: 10px; }
```

Selects '.archive-entry'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '4px' sets the sets spacing between flex/grid children to 4px. padding sets inside spacing between border and content; value '10px 12px' sets the sets inside spacing between border and content to 10px 12px. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border-soft)' sets sets border width/style/color to 1px solid var(--border-soft). border-radius rounds box corners; value '10px' sets the rounds box corners to 10px.

### Line 28

```text
.archive-entry-topline { display: flex; justify-content: space-between; gap: 12px; color: var(--ink); font-size: 10px; }
```

Selects '.archive-entry-topline'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. justify-content aligns children along the main axis; value 'space-between' sets aligns children along the main axis to space-between. gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px. color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 29

```text
.archive-entry-amount { white-space: nowrap; }
```

Selects '.archive-entry-amount'; declarations on this line style matching Timekeeper elements. white-space controls wrapping of whitespace/text; value 'nowrap' keeps text on one line.

### Line 30

```text
.archive-entry-detail { margin: 0; color: var(--muted); font-size: 10px; overflow-wrap: anywhere; }
```

Selects '.archive-entry-detail'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. overflow-wrap controls this CSS property; value 'anywhere' sets overflow-wrap to anywhere.

### Line 31

```text
.archive-entry-empty, .archive-empty { margin: 0; color: var(--muted); font-size: 11px; }
```

Selects '.archive-entry-empty, .archive-empty'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 32

```text
.archive-empty { padding: 24px; text-align: center; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; }
```

Selects '.archive-empty'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '24px' sets the sets inside spacing between border and content to 24px. text-align aligns inline text; value 'center' centers inline content. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '14px' sets the rounds box corners to 14px.

### Line 33

```text

```

Blank line separates related rules for readability.

### Line 34

```text
@media (max-width: 600px) {
```

Begins a responsive media query: the nested overrides apply when (max-width: 600px) {.

### Line 35

```text
  .archive-heading { align-items: stretch; flex-direction: column; }
```

Selects '.archive-heading'; declarations on this line style matching Timekeeper elements. align-items aligns children across the cross axis; value 'stretch' sets aligns children across the cross axis to stretch. flex-direction sets the main-axis direction for flex children; value 'column' stacks children vertically.

### Line 36

```text
  .archive-filter { min-width: 0; }
```

Selects '.archive-filter'; declarations on this line style matching Timekeeper elements. min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 37

```text
  .archive-toolbar { align-items: flex-start; flex-direction: column; }
```

Selects '.archive-toolbar'; declarations on this line style matching Timekeeper elements. align-items aligns children across the cross axis; value 'flex-start' sets aligns children across the cross axis to flex-start. flex-direction sets the main-axis direction for flex children; value 'column' stacks children vertically.

### Line 38

```text
  .archive-card-heading { padding: 14px; }
```

Selects '.archive-card-heading'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '14px' sets the sets inside spacing between border and content to 14px.

### Line 39

```text
  .archive-details summary { padding-inline: 14px; }
```

Selects '.archive-details summary'; declarations on this line style matching Timekeeper elements. padding-inline controls this CSS property; value '14px' sets the padding-inline to 14px.

### Line 40

```text
  .archive-entry-list { padding-inline: 14px; }
```

Selects '.archive-entry-list'; declarations on this line style matching Timekeeper elements. padding-inline controls this CSS property; value '14px' sets the padding-inline to 14px.

### Line 41

```text
  .archive-entry-topline { flex-direction: column; gap: 2px; }
```

Selects '.archive-entry-topline'; declarations on this line style matching Timekeeper elements. flex-direction sets the main-axis direction for flex children; value 'column' stacks children vertically. gap sets spacing between flex/grid children; value '2px' sets the sets spacing between flex/grid children to 2px.

### Line 42

```text
}
```

Closes the current CSS rule or media-query block.

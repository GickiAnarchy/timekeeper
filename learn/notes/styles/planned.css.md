# styles/planned.css

[Exact copy](../../original/styles/planned.css)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
@import url("./ui.css");
```

Imports shared design rules from the referenced stylesheet so this page reuses the app-wide tokens/base UI.

### Line 2

```text
@import url("./planned-urgency.css");
```

Imports shared design rules from the referenced stylesheet so this page reuses the app-wide tokens/base UI.

### Line 3

```text

```

Blank line separates related rules for readability.

### Line 4

```text
.planned-body { min-height: 100vh; min-height: 100dvh; padding: clamp(18px, 3vw, 30px); }
```

Selects '.planned-body'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '100vh' sets sets the smallest allowed control/region height to 100vh. min-height sets the smallest allowed control/region height; value '100dvh' sets sets the smallest allowed control/region height to 100dvh. padding sets inside spacing between border and content; value 'clamp(18px, 3vw, 30px)' uses a responsive clamped value that grows/shrinks within the given minimum and maximum.

### Line 5

```text
.planned-page { width: min(100%, 1060px); margin: 0 auto; }
```

Selects '.planned-page'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value 'min(100%, 1060px)' sets sets horizontal size to min(100%, 1060px). margin sets outside spacing around the box; value '0 auto' sets sets outside spacing around the box to 0 auto.

### Line 6

```text
.page-intro { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 24px; }
```

Selects '.page-intro'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. justify-content aligns children along the main axis; value 'space-between' sets aligns children along the main axis to space-between. gap sets spacing between flex/grid children; value '20px' sets the sets spacing between flex/grid children to 20px. margin-bottom adds outside space below the element; value '24px' sets the adds outside space below the element to 24px.

### Line 7

```text
.eyebrow { margin: 0 0 7px; color: var(--green); font-size: 9px; font-weight: 760; letter-spacing: .14em; }
```

Selects '.eyebrow'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 7px' sets the sets outside spacing around the box to 0 0 7px. color sets foreground text/icon color; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. font-size sets text size; value '9px' sets the sets text size to 9px. font-weight sets text stroke emphasis; value '760' sets sets text stroke emphasis to 760. letter-spacing adjusts spacing between glyphs; value '.14em' sets the adjusts spacing between glyphs to .14em.

### Line 8

```text
.page-intro h1 { margin: 0 0 5px; font-size: clamp(24px, 3vw, 31px); line-height: 1.15; }
```

Selects '.page-intro h1'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 5px' sets the sets outside spacing around the box to 0 0 5px. font-size sets text size; value 'clamp(24px, 3vw, 31px)' uses a responsive clamped value that grows/shrinks within the given minimum and maximum. line-height sets line box height and text rhythm; value '1.15' sets sets line box height and text rhythm to 1.15.

### Line 9

```text
.page-subtitle { margin: 0; color: var(--muted); font-size: 12px; }
```

Selects '.page-subtitle'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 10

```text
.button { display: inline-flex; align-items: center; justify-content: center; gap: 7px; min-height: 39px; padding: 0 14px; font-size: 11px; font-weight: 700; }
```

Selects '.button'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'inline-flex' keeps the control inline while laying out children with flex. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. justify-content aligns children along the main axis; value 'center' sets aligns children along the main axis to center. gap sets spacing between flex/grid children; value '7px' sets the sets spacing between flex/grid children to 7px. min-height sets the smallest allowed control/region height; value '39px' sets the sets the smallest allowed control/region height to 39px. padding sets inside spacing between border and content; value '0 14px' sets the sets inside spacing between border and content to 0 14px. font-size sets text size; value '11px' sets the sets text size to 11px. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 11

```text
.button-primary { color: #fff; background: var(--green); box-shadow: 0 4px 11px rgba(36, 118, 79, .14); }
```

Selects '.button-primary'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value '#fff' uses explicit color #fff. background sets the full background paint; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. box-shadow draws depth/shadow around a component; value '0 4px 11px rgba(36, 118, 79, .14)' sets draws depth/shadow around a component to 0 4px 11px rgba(36, 118, 79, .14).

### Line 12

```text
.button-primary:hover { background: var(--green-deep); box-shadow: 0 7px 16px rgba(36, 118, 79, .2); transform: translateY(-1px); }
```

Selects '.button-primary:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. box-shadow draws depth/shadow around a component; value '0 7px 16px rgba(36, 118, 79, .2)' sets draws depth/shadow around a component to 0 7px 16px rgba(36, 118, 79, .2). transform controls this CSS property; value 'translateY(-1px)' sets transform to translateY(-1px).

### Line 13

```text
.button-secondary { color: var(--ink-soft); background: var(--surface); border: 1px solid var(--border); }
```

Selects '.button-secondary'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 14

```text
.button-secondary:hover, .button-quiet:hover { color: var(--green-deep); background: var(--surface-hover); }
```

Selects '.button-secondary:hover, .button-quiet:hover'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-hover)' uses theme custom property var(--surface-hover), so the shared design token controls this value.

### Line 15

```text
.button-small { min-height: 33px; padding: 0 11px; font-size: 10px; }
```

Selects '.button-small'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '33px' sets the sets the smallest allowed control/region height to 33px. padding sets inside spacing between border and content; value '0 11px' sets the sets inside spacing between border and content to 0 11px. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 16

```text
.button-quiet { color: #68766e; background: transparent; border: 1px solid transparent; }
```

Selects '.button-quiet'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value '#68766e' uses explicit color #68766e. background sets the full background paint; value 'transparent' sets sets the full background paint to transparent. border sets border width/style/color; value '1px solid transparent' sets sets border width/style/color to 1px solid transparent.

### Line 17

```text

```

Blank line separates related rules for readability.

### Line 18

```text
.job-summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-bottom: 18px; }
```

Selects '.job-summary'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-columns defines grid tracks and their widths; value 'repeat(3, minmax(0, 1fr))' creates a responsive track with a minimum and flexible maximum size. gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px. margin-bottom adds outside space below the element; value '18px' sets the adds outside space below the element to 18px.

### Line 19

```text
.summary-card { display: flex; align-items: center; gap: 12px; min-height: 84px; padding: 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 15px; box-shadow: 0 4px 14px rgba(28, 52, 40, .035); }
```

Selects '.summary-card'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px. min-height sets the smallest allowed control/region height; value '84px' sets the sets the smallest allowed control/region height to 84px. padding sets inside spacing between border and content; value '16px' sets the sets inside spacing between border and content to 16px. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '15px' sets the rounds box corners to 15px. box-shadow draws depth/shadow around a component; value '0 4px 14px rgba(28, 52, 40, .035)' sets draws depth/shadow around a component to 0 4px 14px rgba(28, 52, 40, .035).

### Line 20

```text
.summary-icon { display: grid; place-items: center; width: 37px; height: 37px; flex: 0 0 37px; color: var(--green); background: var(--green-soft); border-radius: 12px; font-size: 18px; font-weight: 750; }
```

Selects '.summary-icon'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. place-items sets both grid alignment axes; value 'center' sets sets both grid alignment axes to center. width sets horizontal size; value '37px' sets the sets horizontal size to 37px. height sets vertical size; value '37px' sets the sets vertical size to 37px. flex controls this CSS property; value '0 0 37px' sets the flex to 0 0 37px. color sets foreground text/icon color; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value. border-radius rounds box corners; value '12px' sets the rounds box corners to 12px. font-size sets text size; value '18px' sets the sets text size to 18px. font-weight sets text stroke emphasis; value '750' sets sets text stroke emphasis to 750.

### Line 21

```text
.summary-today .summary-icon { color: var(--amber); background: var(--amber-soft); }
```

Selects '.summary-today .summary-icon'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--amber)' uses theme custom property var(--amber), so the shared design token controls this value. background sets the full background paint; value 'var(--amber-soft)' uses theme custom property var(--amber-soft), so the shared design token controls this value.

### Line 22

```text
.summary-complete .summary-icon { color: var(--green); background: var(--green-soft); }
```

Selects '.summary-complete .summary-icon'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value.

### Line 23

```text
.summary-card p { margin: 0 0 1px; color: var(--muted); font-size: 10px; font-weight: 600; }
```

Selects '.summary-card p'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 1px' sets the sets outside spacing around the box to 0 0 1px. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '600' semibold emphasis.

### Line 24

```text
.summary-card strong { color: var(--ink); font-size: 21px; line-height: 1.2; letter-spacing: -.04em; }
```

Selects '.summary-card strong'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value. font-size sets text size; value '21px' sets the sets text size to 21px. line-height sets line box height and text rhythm; value '1.2' sets sets line box height and text rhythm to 1.2. letter-spacing adjusts spacing between glyphs; value '-.04em' sets the adjusts spacing between glyphs to -.04em.

### Line 25

```text

```

Blank line separates related rules for readability.

### Line 26

```text
.schedule-panel { overflow: hidden; background: var(--surface); border: 1px solid var(--border); border-radius: 17px; box-shadow: var(--shadow-soft); }
```

Selects '.schedule-panel'; declarations on this line style matching Timekeeper elements. overflow controls content that exceeds the box, such as scrolling or clipping; value 'hidden' clips content outside the box. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '17px' sets the rounds box corners to 17px. box-shadow draws depth/shadow around a component; value 'var(--shadow-soft)' uses theme custom property var(--shadow-soft), so the shared design token controls this value.

### Line 27

```text
.schedule-heading { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 19px 20px 15px; border-bottom: 1px solid var(--border-soft); }
```

Selects '.schedule-heading'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. justify-content aligns children along the main axis; value 'space-between' sets aligns children along the main axis to space-between. gap sets spacing between flex/grid children; value '14px' sets the sets spacing between flex/grid children to 14px. padding sets inside spacing between border and content; value '19px 20px 15px' sets the sets inside spacing between border and content to 19px 20px 15px. border-bottom sets the bottom border; value '1px solid var(--border-soft)' sets sets the bottom border to 1px solid var(--border-soft).

### Line 28

```text
.schedule-heading h2 { margin: 0 0 3px; font-size: 15px; }
```

Selects '.schedule-heading h2'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 3px' sets the sets outside spacing around the box to 0 0 3px. font-size sets text size; value '15px' sets the sets text size to 15px.

### Line 29

```text
.schedule-heading p { margin: 0; font-size: 10px; }
```

Selects '.schedule-heading p'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 30

```text
.job-filters { display: flex; align-items: center; gap: 3px; padding: 3px; background: var(--canvas); border: 1px solid var(--border-soft); border-radius: 10px; }
```

Selects '.job-filters'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. gap sets spacing between flex/grid children; value '3px' sets the sets spacing between flex/grid children to 3px. padding sets inside spacing between border and content; value '3px' sets the sets inside spacing between border and content to 3px. background sets the full background paint; value 'var(--canvas)' uses theme custom property var(--canvas), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border-soft)' sets sets border width/style/color to 1px solid var(--border-soft). border-radius rounds box corners; value '10px' sets the rounds box corners to 10px.

### Line 31

```text
.filter-button { min-height: 29px; padding: 0 10px; color: var(--muted); background: transparent; font-size: 10px; font-weight: 650; white-space: nowrap; }
```

Selects '.filter-button'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '29px' sets the sets the smallest allowed control/region height to 29px. padding sets inside spacing between border and content; value '0 10px' sets the sets inside spacing between border and content to 0 10px. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. background sets the full background paint; value 'transparent' sets sets the full background paint to transparent. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '650' semibold emphasis. white-space controls wrapping of whitespace/text; value 'nowrap' keeps text on one line.

### Line 32

```text
.filter-button:hover { color: var(--green-deep); }
```

Selects '.filter-button:hover'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value.

### Line 33

```text
.filter-button.is-active { color: var(--green-deep); background: var(--surface); box-shadow: 0 1px 4px rgba(25, 54, 39, .1); }
```

Selects '.filter-button.is-active'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. box-shadow draws depth/shadow around a component; value '0 1px 4px rgba(25, 54, 39, .1)' sets draws depth/shadow around a component to 0 1px 4px rgba(25, 54, 39, .1).

### Line 34

```text
.planned-list { display: grid; gap: 0; margin: 0; padding: 0; list-style: none; }
```

Selects '.planned-list'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '0' sets sets spacing between flex/grid children to 0. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. padding sets inside spacing between border and content; value '0' sets sets inside spacing between border and content to 0. list-style controls list markers; value 'none' sets controls list markers to none.

### Line 35

```text
.job-card { display: grid; grid-template-columns: 54px minmax(0, 1fr) auto; align-items: center; gap: 15px; padding: 15px 20px; border-bottom: 1px solid var(--border-soft); }
```

Selects '.job-card'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-columns defines grid tracks and their widths; value '54px minmax(0, 1fr) auto' creates a responsive track with a minimum and flexible maximum size. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. gap sets spacing between flex/grid children; value '15px' sets the sets spacing between flex/grid children to 15px. padding sets inside spacing between border and content; value '15px 20px' sets the sets inside spacing between border and content to 15px 20px. border-bottom sets the bottom border; value '1px solid var(--border-soft)' sets sets the bottom border to 1px solid var(--border-soft).

### Line 36

```text
.job-card:last-child { border-bottom: 0; }
```

Selects '.job-card:last-child'; declarations on this line style matching Timekeeper elements. border-bottom sets the bottom border; value '0' sets sets the bottom border to 0.

### Line 37

```text
.job-card:hover { background: var(--surface-hover); }
```

Selects '.job-card:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--surface-hover)' uses theme custom property var(--surface-hover), so the shared design token controls this value.

### Line 38

```text
.date-tile { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 50px; min-height: 56px; padding: 5px 3px; color: var(--green-deep); background: var(--green-soft); border: 1px solid var(--border); border-radius: 12px; line-height: 1.15; }
```

Selects '.date-tile'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. flex-direction sets the main-axis direction for flex children; value 'column' stacks children vertically. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. justify-content aligns children along the main axis; value 'center' sets aligns children along the main axis to center. width sets horizontal size; value '50px' sets the sets horizontal size to 50px. min-height sets the smallest allowed control/region height; value '56px' sets the sets the smallest allowed control/region height to 56px. padding sets inside spacing between border and content; value '5px 3px' sets the sets inside spacing between border and content to 5px 3px. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '12px' sets the rounds box corners to 12px. line-height sets line box height and text rhythm; value '1.15' sets sets line box height and text rhythm to 1.15.

### Line 39

```text
.date-weekday, .date-month { color: var(--muted); font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
```

Selects '.date-weekday, .date-month'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '8px' sets the sets text size to 8px. font-weight sets text stroke emphasis; value '700' bold emphasis. text-transform changes displayed letter casing; value 'uppercase' sets changes displayed letter casing to uppercase. letter-spacing adjusts spacing between glyphs; value '.06em' sets the adjusts spacing between glyphs to .06em.

### Line 40

```text
.date-day { margin: 1px 0; font-size: 20px; letter-spacing: -.05em; }
```

Selects '.date-day'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '1px 0' sets sets outside spacing around the box to 1px 0. font-size sets text size; value '20px' sets the sets text size to 20px. letter-spacing adjusts spacing between glyphs; value '-.05em' sets the adjusts spacing between glyphs to -.05em.

### Line 41

```text
.job-content { min-width: 0; }
```

Selects '.job-content'; declarations on this line style matching Timekeeper elements. min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 42

```text
.job-title-row { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 2px; }
```

Selects '.job-title-row'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. flex-wrap allows flex children to wrap onto additional lines; value 'wrap' allows children to continue on another line. gap sets spacing between flex/grid children; value '8px' sets the sets spacing between flex/grid children to 8px. margin-bottom adds outside space below the element; value '2px' sets the adds outside space below the element to 2px.

### Line 43

```text
.job-description { overflow: hidden; max-width: 100%; margin: 0; font-size: 13px; font-weight: 700; letter-spacing: -.02em; text-overflow: ellipsis; }
```

Selects '.job-description'; declarations on this line style matching Timekeeper elements. overflow controls content that exceeds the box, such as scrolling or clipping; value 'hidden' clips content outside the box. max-width caps horizontal size; value '100%' sets the caps horizontal size to 100%. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. font-size sets text size; value '13px' sets the sets text size to 13px. font-weight sets text stroke emphasis; value '700' bold emphasis. letter-spacing adjusts spacing between glyphs; value '-.02em' sets the adjusts spacing between glyphs to -.02em. text-overflow controls this CSS property; value 'ellipsis' sets text-overflow to ellipsis.

### Line 44

```text
.status-pill { display: inline-flex; align-items: center; min-height: 20px; padding: 0 7px; color: var(--green-deep); background: var(--green-soft); border-radius: 999px; font-size: 8px; font-weight: 750; white-space: nowrap; }
```

Selects '.status-pill'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'inline-flex' keeps the control inline while laying out children with flex. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. min-height sets the smallest allowed control/region height; value '20px' sets the sets the smallest allowed control/region height to 20px. padding sets inside spacing between border and content; value '0 7px' sets the sets inside spacing between border and content to 0 7px. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value. border-radius rounds box corners; value '999px' sets the rounds box corners to 999px. font-size sets text size; value '8px' sets the sets text size to 8px. font-weight sets text stroke emphasis; value '750' sets sets text stroke emphasis to 750. white-space controls wrapping of whitespace/text; value 'nowrap' keeps text on one line.

### Line 45

```text
.status-today { color: var(--amber); background: var(--amber-soft); }
```

Selects '.status-today'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--amber)' uses theme custom property var(--amber), so the shared design token controls this value. background sets the full background paint; value 'var(--amber-soft)' uses theme custom property var(--amber-soft), so the shared design token controls this value.

### Line 46

```text
.status-overdue { color: var(--red); background: var(--red-soft); }
```

Selects '.status-overdue'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value. background sets the full background paint; value 'var(--red-soft)' uses theme custom property var(--red-soft), so the shared design token controls this value.

### Line 47

```text
.status-complete { color: var(--muted); background: var(--surface-muted); }
```

Selects '.status-complete'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value.

### Line 48

```text
.job-customer, .job-date { margin: 0; color: var(--muted); font-size: 10px; }
```

Selects '.job-customer, .job-date'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 49

```text
.job-customer { color: var(--ink-soft); font-weight: 600; }
```

Selects '.job-customer'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-weight sets text stroke emphasis; value '600' semibold emphasis.

### Line 50

```text
.job-actions { display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 5px; }
```

Selects '.job-actions'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. justify-content aligns children along the main axis; value 'flex-end' sets aligns children along the main axis to flex-end. flex-wrap allows flex children to wrap onto additional lines; value 'wrap' allows children to continue on another line. gap sets spacing between flex/grid children; value '5px' sets the sets spacing between flex/grid children to 5px.

### Line 51

```text
.is-complete .date-tile { color: var(--muted); background: var(--surface-muted); border-color: var(--border); }
```

Selects '.is-complete .date-tile'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value. border-color controls this CSS property; value 'var(--border)' uses theme custom property var(--border), so the shared design token controls this value.

### Line 52

```text
.is-complete .date-weekday, .is-complete .date-month { color: var(--muted); }
```

Selects '.is-complete .date-weekday, .is-complete .date-month'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value.

### Line 53

```text
.is-complete .job-description { color: var(--muted); }
```

Selects '.is-complete .job-description'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value.

### Line 54

```text
.empty-state { display: grid; justify-items: center; padding: 40px 20px; text-align: center; }
```

Selects '.empty-state'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. justify-items controls this CSS property; value 'center' sets justify-items to center. padding sets inside spacing between border and content; value '40px 20px' sets the sets inside spacing between border and content to 40px 20px. text-align aligns inline text; value 'center' centers inline content.

### Line 55

```text
.empty-state-icon { display: grid; place-items: center; width: 42px; height: 42px; margin-bottom: 12px; color: var(--green); background: var(--green-soft); border-radius: 14px; font-size: 20px; font-weight: 700; }
```

Selects '.empty-state-icon'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. place-items sets both grid alignment axes; value 'center' sets sets both grid alignment axes to center. width sets horizontal size; value '42px' sets the sets horizontal size to 42px. height sets vertical size; value '42px' sets the sets vertical size to 42px. margin-bottom adds outside space below the element; value '12px' sets the adds outside space below the element to 12px. color sets foreground text/icon color; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value. border-radius rounds box corners; value '14px' sets the rounds box corners to 14px. font-size sets text size; value '20px' sets the sets text size to 20px. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 56

```text
.empty-state h3 { margin: 0 0 5px; font-size: 14px; }
```

Selects '.empty-state h3'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 5px' sets the sets outside spacing around the box to 0 0 5px. font-size sets text size; value '14px' sets the sets text size to 14px.

### Line 57

```text
.empty-state p { margin: 0; color: var(--muted); font-size: 11px; }
```

Selects '.empty-state p'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 58

```text

```

Blank line separates related rules for readability.

### Line 59

```text
.add-job-modal { width: min(100% - 28px, 450px); max-width: 450px; max-height: min(92vh, 760px); max-height: min(92dvh, 760px); margin: auto; padding: 0; overflow-y: auto; overscroll-behavior: contain; color: var(--ink); background: var(--surface); border: 1px solid var(--border); border-radius: 20px; box-shadow: 0 24px 80px rgba(16, 38, 25, .23); }
```

Selects '.add-job-modal'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value 'min(100% - 28px, 450px)' sets sets horizontal size to min(100% - 28px, 450px). max-width caps horizontal size; value '450px' sets the caps horizontal size to 450px. max-height caps vertical size; value 'min(92vh, 760px)' sets caps vertical size to min(92vh, 760px). max-height caps vertical size; value 'min(92dvh, 760px)' sets caps vertical size to min(92dvh, 760px). margin sets outside spacing around the box; value 'auto' sets sets outside spacing around the box to auto. padding sets inside spacing between border and content; value '0' sets sets inside spacing between border and content to 0. overflow-y controls vertical overflow; value 'auto' sets controls vertical overflow to auto. overscroll-behavior controls this CSS property; value 'contain' sets overscroll-behavior to contain. color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '20px' sets the rounds box corners to 20px. box-shadow draws depth/shadow around a component; value '0 24px 80px rgba(16, 38, 25, .23)' sets draws depth/shadow around a component to 0 24px 80px rgba(16, 38, 25, .23).

### Line 60

```text
.add-job-modal::backdrop { background: rgba(19, 35, 27, .42); backdrop-filter: blur(3px); }
```

Selects '.add-job-modal::backdrop'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'rgba(19, 35, 27, .42)' uses translucent color rgba(19, 35, 27, .42) to soften the surface/shadow. backdrop-filter filters pixels behind a translucent overlay; value 'blur(3px)' sets filters pixels behind a translucent overlay to blur(3px).

### Line 61

```text
.add-form { display: grid; gap: 15px; padding: 22px; }
```

Selects '.add-form'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '15px' sets the sets spacing between flex/grid children to 15px. padding sets inside spacing between border and content; value '22px' sets the sets inside spacing between border and content to 22px.

### Line 62

```text
.modal-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
```

Selects '.modal-heading'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'flex-start' sets aligns children across the cross axis to flex-start. justify-content aligns children along the main axis; value 'space-between' sets aligns children along the main axis to space-between. gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px.

### Line 63

```text
.modal-heading .eyebrow { margin-bottom: 5px; }
```

Selects '.modal-heading .eyebrow'; declarations on this line style matching Timekeeper elements. margin-bottom adds outside space below the element; value '5px' sets the adds outside space below the element to 5px.

### Line 64

```text
.modal-heading h2 { margin: 0; font-size: 21px; }
```

Selects '.modal-heading h2'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. font-size sets text size; value '21px' sets the sets text size to 21px.

### Line 65

```text
.modal-copy { margin: -7px 0 0; color: var(--muted); font-size: 11px; }
```

Selects '.modal-copy'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '-7px 0 0' sets sets outside spacing around the box to -7px 0 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 66

```text
.modal-close { display: grid; place-items: center; width: 31px; height: 31px; color: var(--muted); background: var(--canvas); border-radius: 10px; font-size: 20px; line-height: 1; }
```

Selects '.modal-close'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. place-items sets both grid alignment axes; value 'center' sets sets both grid alignment axes to center. width sets horizontal size; value '31px' sets the sets horizontal size to 31px. height sets vertical size; value '31px' sets the sets vertical size to 31px. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. background sets the full background paint; value 'var(--canvas)' uses theme custom property var(--canvas), so the shared design token controls this value. border-radius rounds box corners; value '10px' sets the rounds box corners to 10px. font-size sets text size; value '20px' sets the sets text size to 20px. line-height sets line box height and text rhythm; value '1' sets sets line box height and text rhythm to 1.

### Line 67

```text
.modal-close:hover { color: var(--ink); background: var(--surface-hover); }
```

Selects '.modal-close:hover'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-hover)' uses theme custom property var(--surface-hover), so the shared design token controls this value.

### Line 68

```text
.form-field { display: grid; gap: 6px; }
```

Selects '.form-field'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '6px' sets the sets spacing between flex/grid children to 6px.

### Line 69

```text
.form-field select, .form-field input, .form-field textarea { width: 100%; min-height: 40px; padding: 9px 11px; font-size: 12px; }
```

Selects '.form-field select, .form-field input, .form-field textarea'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '100%' sets the sets horizontal size to 100%. min-height sets the smallest allowed control/region height; value '40px' sets the sets the smallest allowed control/region height to 40px. padding sets inside spacing between border and content; value '9px 11px' sets the sets inside spacing between border and content to 9px 11px. font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 70

```text
.form-field textarea { min-height: 84px; resize: vertical; }
```

Selects '.form-field textarea'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '84px' sets the sets the smallest allowed control/region height to 84px. resize controls this CSS property; value 'vertical' sets resize to vertical.

### Line 71

```text
.tbd-choice { display: flex; align-items: center; gap: 8px; width: fit-content; cursor: pointer; }
```

Selects '.tbd-choice'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. gap sets spacing between flex/grid children; value '8px' sets the sets spacing between flex/grid children to 8px. width sets horizontal size; value 'fit-content' sets sets horizontal size to fit-content. cursor chooses pointer cursor presentation; value 'pointer' sets chooses pointer cursor presentation to pointer.

### Line 72

```text
.tbd-choice input { width: 16px; min-height: 16px; margin: 0; padding: 0; accent-color: var(--green); }
```

Selects '.tbd-choice input'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '16px' sets the sets horizontal size to 16px. min-height sets the smallest allowed control/region height; value '16px' sets the sets the smallest allowed control/region height to 16px. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. padding sets inside spacing between border and content; value '0' sets sets inside spacing between border and content to 0. accent-color colors native checkbox/radio accents; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value.

### Line 73

```text
.field-hint { color: var(--muted); font-size: 10px; }
```

Selects '.field-hint'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 74

```text
.form-error { min-height: 0; margin: -6px 0 0; color: var(--red); font-size: 11px; }
```

Selects '.form-error'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '0' sets sets the smallest allowed control/region height to 0. margin sets outside spacing around the box; value '-6px 0 0' sets sets outside spacing around the box to -6px 0 0. color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 75

```text
.form-error:empty { display: none; }
```

Selects '.form-error:empty'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'none' removes the element from layout.

### Line 76

```text
.modal-actions { display: flex; justify-content: flex-end; gap: 8px; padding-top: 2px; }
```

Selects '.modal-actions'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. justify-content aligns children along the main axis; value 'flex-end' sets aligns children along the main axis to flex-end. gap sets spacing between flex/grid children; value '8px' sets the sets spacing between flex/grid children to 8px. padding-top adds inside space above content; value '2px' sets the adds inside space above content to 2px.

### Line 77

```text

```

Blank line separates related rules for readability.

### Line 78

```text
@media (max-width: 620px) {
```

Begins a responsive media query: the nested overrides apply when (max-width: 620px) {.

### Line 79

```text
  .planned-body { padding: 16px 12px 22px; }
```

Selects '.planned-body'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '16px 12px 22px' sets the sets inside spacing between border and content to 16px 12px 22px.

### Line 80

```text
  .page-intro { align-items: flex-start; gap: 10px; margin-bottom: 16px; }
```

Selects '.page-intro'; declarations on this line style matching Timekeeper elements. align-items aligns children across the cross axis; value 'flex-start' sets aligns children across the cross axis to flex-start. gap sets spacing between flex/grid children; value '10px' sets the sets spacing between flex/grid children to 10px. margin-bottom adds outside space below the element; value '16px' sets the adds outside space below the element to 16px.

### Line 81

```text
  .page-intro h1 { font-size: 24px; }
```

Selects '.page-intro h1'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '24px' sets the sets text size to 24px.

### Line 82

```text
  .page-subtitle { max-width: 265px; font-size: 10px; }
```

Selects '.page-subtitle'; declarations on this line style matching Timekeeper elements. max-width caps horizontal size; value '265px' sets the caps horizontal size to 265px. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 83

```text
  .page-intro > .button { min-height: 36px; padding: 0 10px; font-size: 10px; white-space: nowrap; }
```

Selects '.page-intro > .button'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '36px' sets the sets the smallest allowed control/region height to 36px. padding sets inside spacing between border and content; value '0 10px' sets the sets inside spacing between border and content to 0 10px. font-size sets text size; value '10px' sets the sets text size to 10px. white-space controls wrapping of whitespace/text; value 'nowrap' keeps text on one line.

### Line 84

```text
  .job-summary { gap: 7px; margin-bottom: 12px; }
```

Selects '.job-summary'; declarations on this line style matching Timekeeper elements. gap sets spacing between flex/grid children; value '7px' sets the sets spacing between flex/grid children to 7px. margin-bottom adds outside space below the element; value '12px' sets the adds outside space below the element to 12px.

### Line 85

```text
  .summary-card { min-height: 69px; gap: 8px; padding: 10px; border-radius: 12px; }
```

Selects '.summary-card'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '69px' sets the sets the smallest allowed control/region height to 69px. gap sets spacing between flex/grid children; value '8px' sets the sets spacing between flex/grid children to 8px. padding sets inside spacing between border and content; value '10px' sets the sets inside spacing between border and content to 10px. border-radius rounds box corners; value '12px' sets the rounds box corners to 12px.

### Line 86

```text
  .summary-icon { width: 29px; height: 29px; flex-basis: 29px; border-radius: 9px; font-size: 14px; }
```

Selects '.summary-icon'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '29px' sets the sets horizontal size to 29px. height sets vertical size; value '29px' sets the sets vertical size to 29px. flex-basis controls this CSS property; value '29px' sets the flex-basis to 29px. border-radius rounds box corners; value '9px' sets the rounds box corners to 9px. font-size sets text size; value '14px' sets the sets text size to 14px.

### Line 87

```text
  .summary-card p { font-size: 9px; }
```

Selects '.summary-card p'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '9px' sets the sets text size to 9px.

### Line 88

```text
  .summary-card strong { font-size: 18px; }
```

Selects '.summary-card strong'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '18px' sets the sets text size to 18px.

### Line 89

```text
  .schedule-heading { align-items: flex-start; flex-direction: column; padding: 15px 13px 12px; }
```

Selects '.schedule-heading'; declarations on this line style matching Timekeeper elements. align-items aligns children across the cross axis; value 'flex-start' sets aligns children across the cross axis to flex-start. flex-direction sets the main-axis direction for flex children; value 'column' stacks children vertically. padding sets inside spacing between border and content; value '15px 13px 12px' sets the sets inside spacing between border and content to 15px 13px 12px.

### Line 90

```text
  .job-filters { width: 100%; }
```

Selects '.job-filters'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '100%' sets the sets horizontal size to 100%.

### Line 91

```text
  .filter-button { flex: 1; padding: 0 6px; }
```

Selects '.filter-button'; declarations on this line style matching Timekeeper elements. flex controls this CSS property; value '1' sets flex to 1. padding sets inside spacing between border and content; value '0 6px' sets the sets inside spacing between border and content to 0 6px.

### Line 92

```text
  .job-card { grid-template-columns: 44px minmax(0, 1fr); gap: 10px; padding: 13px 12px; }
```

Selects '.job-card'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value '44px minmax(0, 1fr)' creates a responsive track with a minimum and flexible maximum size. gap sets spacing between flex/grid children; value '10px' sets the sets spacing between flex/grid children to 10px. padding sets inside spacing between border and content; value '13px 12px' sets the sets inside spacing between border and content to 13px 12px.

### Line 93

```text
  .date-tile { width: 42px; min-height: 51px; }
```

Selects '.date-tile'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '42px' sets the sets horizontal size to 42px. min-height sets the smallest allowed control/region height; value '51px' sets the sets the smallest allowed control/region height to 51px.

### Line 94

```text
  .date-day { font-size: 18px; }
```

Selects '.date-day'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '18px' sets the sets text size to 18px.

### Line 95

```text
  .job-title-row { align-items: flex-start; gap: 5px; }
```

Selects '.job-title-row'; declarations on this line style matching Timekeeper elements. align-items aligns children across the cross axis; value 'flex-start' sets aligns children across the cross axis to flex-start. gap sets spacing between flex/grid children; value '5px' sets the sets spacing between flex/grid children to 5px.

### Line 96

```text
  .job-description { font-size: 12px; }
```

Selects '.job-description'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 97

```text
  .job-actions { grid-column: 2; justify-content: flex-start; margin-top: -3px; }
```

Selects '.job-actions'; declarations on this line style matching Timekeeper elements. grid-column places an item across specified grid columns; value '2' sets places an item across specified grid columns to 2. justify-content aligns children along the main axis; value 'flex-start' sets aligns children along the main axis to flex-start. margin-top adds outside space above the element; value '-3px' sets the adds outside space above the element to -3px.

### Line 98

```text
  .button-small { min-height: 30px; }
```

Selects '.button-small'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '30px' sets the sets the smallest allowed control/region height to 30px.

### Line 99

```text
}
```

Closes the current CSS rule or media-query block.

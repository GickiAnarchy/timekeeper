# styles/shifts.css

[Exact copy](../../original/styles/shifts.css)

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
.shifts-section { width: min(100%, 1060px); margin: 0 auto; padding: clamp(15px, 2.5vw, 22px); background: var(--surface); border: 1px solid var(--border); border-radius: 17px; box-shadow: var(--shadow-soft); }
```

Selects '.shifts-section'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value 'min(100%, 1060px)' sets sets horizontal size to min(100%, 1060px). margin sets outside spacing around the box; value '0 auto' sets sets outside spacing around the box to 0 auto. padding sets inside spacing between border and content; value 'clamp(15px, 2.5vw, 22px)' uses a responsive clamped value that grows/shrinks within the given minimum and maximum. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '17px' sets the rounds box corners to 17px. box-shadow draws depth/shadow around a component; value 'var(--shadow-soft)' uses theme custom property var(--shadow-soft), so the shared design token controls this value.

### Line 5

```text
.shifts-section > h1 { margin: 0 0 16px; font-size: 18px; letter-spacing: -.04em; }
```

Selects '.shifts-section > h1'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 16px' sets the sets outside spacing around the box to 0 0 16px. font-size sets text size; value '18px' sets the sets text size to 18px. letter-spacing adjusts spacing between glyphs; value '-.04em' sets the adjusts spacing between glyphs to -.04em.

### Line 6

```text
.filters { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
```

Selects '.filters'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-columns defines grid tracks and their widths; value 'repeat(2, minmax(0, 1fr))' creates a responsive track with a minimum and flexible maximum size. gap sets spacing between flex/grid children; value '10px' sets the sets spacing between flex/grid children to 10px.

### Line 7

```text
.filter-sel { display: grid; gap: 6px; }
```

Selects '.filter-sel'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '6px' sets the sets spacing between flex/grid children to 6px.

### Line 8

```text
.filter-sel select { width: 100%; min-height: 39px; padding: 8px 10px; font-size: 11px; }
```

Selects '.filter-sel select'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '100%' sets the sets horizontal size to 100%. min-height sets the smallest allowed control/region height; value '39px' sets the sets the smallest allowed control/region height to 39px. padding sets inside spacing between border and content; value '8px 10px' sets the sets inside spacing between border and content to 8px 10px. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 9

```text
.paid-div { display: flex; align-items: center; gap: 8px; margin: 12px 0; color: var(--ink-soft); font-size: 11px; }
```

Selects '.paid-div'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. gap sets spacing between flex/grid children; value '8px' sets the sets spacing between flex/grid children to 8px. margin sets outside spacing around the box; value '12px 0' sets sets outside spacing around the box to 12px 0. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 10

```text
.paid-div input, .paid-toggle input { accent-color: var(--green); }
```

Selects '.paid-div input, .paid-toggle input'; declarations on this line style matching Timekeeper elements. accent-color colors native checkbox/radio accents; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value.

### Line 11

```text
.button-div { display: flex; justify-content: flex-end; }
```

Selects '.button-div'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. justify-content aligns children along the main axis; value 'flex-end' sets aligns children along the main axis to flex-end.

### Line 12

```text
.button-div button, #ok-btn, .secondary-button { min-height: 37px; padding: 0 13px; color: white; background: var(--green); font-size: 11px; font-weight: 700; }
```

Selects '.button-div button, #ok-btn, .secondary-button'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '37px' sets the sets the smallest allowed control/region height to 37px. padding sets inside spacing between border and content; value '0 13px' sets the sets inside spacing between border and content to 0 13px. color sets foreground text/icon color; value 'white' sets sets foreground text/icon color to white. background sets the full background paint; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 13

```text
.button-div button:hover, #ok-btn:hover { background: var(--green-deep); }
```

Selects '.button-div button:hover, #ok-btn:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value.

### Line 14

```text
.shifts-section hr { height: 1px; margin: 17px 0; background: var(--border); border: 0; }
```

Selects '.shifts-section hr'; declarations on this line style matching Timekeeper elements. height sets vertical size; value '1px' sets the sets vertical size to 1px. margin sets outside spacing around the box; value '17px 0' sets sets outside spacing around the box to 17px 0. background sets the full background paint; value 'var(--border)' uses theme custom property var(--border), so the shared design token controls this value. border sets border width/style/color; value '0' sets sets border width/style/color to 0.

### Line 15

```text
.shift-list-details > summary { padding: 3px 0; color: var(--ink-soft); cursor: pointer; font-size: 12px; font-weight: 700; }
```

Selects '.shift-list-details > summary'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '3px 0' sets sets inside spacing between border and content to 3px 0. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. cursor chooses pointer cursor presentation; value 'pointer' sets chooses pointer cursor presentation to pointer. font-size sets text size; value '12px' sets the sets text size to 12px. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 16

```text
.shifts-list { display: grid; gap: 9px; margin: 12px 0 0; padding: 0; list-style: none; }
```

Selects '.shifts-list'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '9px' sets the sets spacing between flex/grid children to 9px. margin sets outside spacing around the box; value '12px 0 0' sets sets outside spacing around the box to 12px 0 0. padding sets inside spacing between border and content; value '0' sets sets inside spacing between border and content to 0. list-style controls list markers; value 'none' sets controls list markers to none.

### Line 17

```text
.shifts-list > li { list-style: none; }
```

Selects '.shifts-list > li'; declarations on this line style matching Timekeeper elements. list-style controls list markers; value 'none' sets controls list markers to none.

### Line 18

```text
.shifts-list .empty-list { padding: 23px 12px; color: var(--muted); text-align: center; background: var(--surface-muted); border: 1px dashed var(--border); border-radius: 12px; }
```

Selects '.shifts-list .empty-list'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '23px 12px' sets the sets inside spacing between border and content to 23px 12px. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. text-align aligns inline text; value 'center' centers inline content. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value. border sets border width/style/color; value '1px dashed var(--border)' sets sets border width/style/color to 1px dashed var(--border). border-radius rounds box corners; value '12px' sets the rounds box corners to 12px.

### Line 19

```text
.shift-card { display: grid; grid-template-columns: minmax(105px, .7fr) minmax(0, 1.6fr) auto; align-items: center; gap: 14px; padding: 13px; background: var(--surface); border: 1px solid var(--border); border-radius: 13px; }
```

Selects '.shift-card'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-columns defines grid tracks and their widths; value 'minmax(105px, .7fr) minmax(0, 1.6fr) auto' creates a responsive track with a minimum and flexible maximum size. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. gap sets spacing between flex/grid children; value '14px' sets the sets spacing between flex/grid children to 14px. padding sets inside spacing between border and content; value '13px' sets the sets inside spacing between border and content to 13px. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '13px' sets the rounds box corners to 13px.

### Line 20

```text
.shift-card.is-paid { border-color: var(--green-line); background: var(--surface); }
```

Selects '.shift-card.is-paid'; declarations on this line style matching Timekeeper elements. border-color controls this CSS property; value 'var(--green-line)' uses theme custom property var(--green-line), so the shared design token controls this value. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value.

### Line 21

```text
.date-div p { margin: 0; color: var(--ink-soft); font-size: 10px; font-weight: 650; }
```

Selects '.date-div p'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '650' semibold emphasis.

### Line 22

```text
.emp-cust-div { min-width: 0; color: var(--ink-soft); font-size: 11px; }
```

Selects '.emp-cust-div'; declarations on this line style matching Timekeeper elements. min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 23

```text
.emp-cust-div strong { color: var(--ink); font-size: 12px; }
```

Selects '.emp-cust-div strong'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value. font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 24

```text
.time-small { color: var(--muted); font-size: 9px; }
```

Selects '.time-small'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '9px' sets the sets text size to 9px.

### Line 25

```text
.list-item-buttons { display: flex; flex-wrap: wrap; gap: 5px; max-width: 240px; }
```

Selects '.list-item-buttons'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. flex-wrap allows flex children to wrap onto additional lines; value 'wrap' allows children to continue on another line. gap sets spacing between flex/grid children; value '5px' sets the sets spacing between flex/grid children to 5px. max-width caps horizontal size; value '240px' sets the caps horizontal size to 240px.

### Line 26

```text
.list-item-buttons button { min-height: 31px; padding: 0 9px; color: var(--green-deep); background: var(--green-soft); font-size: 9px; font-weight: 650; }
```

Selects '.list-item-buttons button'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '31px' sets the sets the smallest allowed control/region height to 31px. padding sets inside spacing between border and content; value '0 9px' sets the sets inside spacing between border and content to 0 9px. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value. font-size sets text size; value '9px' sets the sets text size to 9px. font-weight sets text stroke emphasis; value '650' semibold emphasis.

### Line 27

```text
.list-item-buttons .delete-btn { color: var(--red); background: var(--red-soft); }
```

Selects '.list-item-buttons .delete-btn'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value. background sets the full background paint; value 'var(--red-soft)' uses theme custom property var(--red-soft), so the shared design token controls this value.

### Line 28

```text
.list-item-buttons button:hover { filter: brightness(.97); }
```

Selects '.list-item-buttons button:hover'; declarations on this line style matching Timekeeper elements. filter applies visual filter effects; value 'brightness(.97)' sets applies visual filter effects to brightness(.97).

### Line 29

```text
.shift-modal { width: min(100% - 24px, 600px); max-width: 600px; max-height: min(92vh, 760px); max-height: min(92dvh, 760px); margin: auto; padding: 20px; overflow: auto; overscroll-behavior: contain; color: var(--ink); background: var(--surface); border: 1px solid var(--border); border-radius: 18px; box-shadow: 0 24px 80px rgba(16, 38, 25, .23); }
```

Selects '.shift-modal'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value 'min(100% - 24px, 600px)' sets sets horizontal size to min(100% - 24px, 600px). max-width caps horizontal size; value '600px' sets the caps horizontal size to 600px. max-height caps vertical size; value 'min(92vh, 760px)' sets caps vertical size to min(92vh, 760px). max-height caps vertical size; value 'min(92dvh, 760px)' sets caps vertical size to min(92dvh, 760px). margin sets outside spacing around the box; value 'auto' sets sets outside spacing around the box to auto. padding sets inside spacing between border and content; value '20px' sets the sets inside spacing between border and content to 20px. overflow controls content that exceeds the box, such as scrolling or clipping; value 'auto' adds scrolling only when content exceeds the box. overscroll-behavior controls this CSS property; value 'contain' sets overscroll-behavior to contain. color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '18px' sets the rounds box corners to 18px. box-shadow draws depth/shadow around a component; value '0 24px 80px rgba(16, 38, 25, .23)' sets draws depth/shadow around a component to 0 24px 80px rgba(16, 38, 25, .23).

### Line 30

```text
.shift-modal.viewport-constrained { position: fixed; inset-block-start: var(--shift-visible-top); inset-block-end: var(--shift-visible-bottom); max-height: var(--shift-visible-max-height); margin-block: auto; }
```

Selects '.shift-modal.viewport-constrained'; declarations on this line style matching Timekeeper elements. position chooses the positioning scheme relative to normal flow; value 'fixed' pins the element to the viewport. inset-block-start controls this CSS property; value 'var(--shift-visible-top)' uses theme custom property var(--shift-visible-top), so the shared design token controls this value. inset-block-end controls this CSS property; value 'var(--shift-visible-bottom)' uses theme custom property var(--shift-visible-bottom), so the shared design token controls this value. max-height caps vertical size; value 'var(--shift-visible-max-height)' uses theme custom property var(--shift-visible-max-height), so the shared design token controls this value. margin-block controls this CSS property; value 'auto' sets margin-block to auto.

### Line 31

```text
.shift-modal::backdrop { background: rgba(19, 35, 27, .4); backdrop-filter: blur(3px); }
```

Selects '.shift-modal::backdrop'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'rgba(19, 35, 27, .4)' uses translucent color rgba(19, 35, 27, .4) to soften the surface/shadow. backdrop-filter filters pixels behind a translucent overlay; value 'blur(3px)' sets filters pixels behind a translucent overlay to blur(3px).

### Line 32

```text
.shift-modal > h2 { margin: 0 0 14px; font-size: 18px; }
```

Selects '.shift-modal > h2'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 14px' sets the sets outside spacing around the box to 0 0 14px. font-size sets text size; value '18px' sets the sets text size to 18px.

### Line 33

```text
.shift-form { display: grid; gap: 13px; }
```

Selects '.shift-form'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '13px' sets the sets spacing between flex/grid children to 13px.

### Line 34

```text
.shift-data { display: grid; gap: 8px; }
```

Selects '.shift-data'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '8px' sets the sets spacing between flex/grid children to 8px.

### Line 35

```text
.shift-data select, .shift-data input:not([type="checkbox"]), .shift-data textarea { width: 100%; min-height: 38px; padding: 8px 10px; font-size: 11px; }
```

Selects '.shift-data select, .shift-data input:not([type="checkbox"]), .shift-data textarea'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '100%' sets the sets horizontal size to 100%. min-height sets the smallest allowed control/region height; value '38px' sets the sets the smallest allowed control/region height to 38px. padding sets inside spacing between border and content; value '8px 10px' sets the sets inside spacing between border and content to 8px 10px. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 36

```text
.shift-data textarea { min-height: 76px; resize: vertical; }
```

Selects '.shift-data textarea'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '76px' sets the sets the smallest allowed control/region height to 76px. resize controls this CSS property; value 'vertical' sets resize to vertical.

### Line 37

```text
.shift-data label { color: var(--ink-soft); font-size: 10px; font-weight: 650; }
```

Selects '.shift-data label'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '650' semibold emphasis.

### Line 38

```text
#shiftBase { grid-template-columns: repeat(2, minmax(0, 1fr)); }
```

Selects '#shiftBase'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value 'repeat(2, minmax(0, 1fr))' creates a responsive track with a minimum and flexible maximum size.

### Line 39

```text
#shiftBase label { grid-row: 1; }
```

Selects '#shiftBase label'; declarations on this line style matching Timekeeper elements. grid-row controls this CSS property; value '1' sets grid-row to 1.

### Line 40

```text
.hours-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
```

Selects '.hours-grid'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-columns defines grid tracks and their widths; value 'repeat(2, minmax(0, 1fr))' creates a responsive track with a minimum and flexible maximum size. gap sets spacing between flex/grid children; value '10px' sets the sets spacing between flex/grid children to 10px.

### Line 41

```text
.time-row { display: grid; gap: 5px; }
```

Selects '.time-row'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '5px' sets the sets spacing between flex/grid children to 5px.

### Line 42

```text
.field-hint { color: var(--muted); font-size: 10px; }
```

Selects '.field-hint'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 43

```text
.break-section { padding: 12px; background: var(--surface-muted); border: 1px solid var(--border-soft); border-radius: 12px; }
```

Selects '.break-section'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '12px' sets the sets inside spacing between border and content to 12px. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border-soft)' sets sets border width/style/color to 1px solid var(--border-soft). border-radius rounds box corners; value '12px' sets the rounds box corners to 12px.

### Line 44

```text
.break-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
```

Selects '.break-heading'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. justify-content aligns children along the main axis; value 'space-between' sets aligns children along the main axis to space-between. gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px.

### Line 45

```text
.break-heading h3 { margin: 0; font-size: 12px; }
```

Selects '.break-heading h3'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 46

```text
.secondary-button { min-height: 30px; color: var(--green-deep); background: var(--green-soft); font-size: 10px; }
```

Selects '.secondary-button'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '30px' sets the sets the smallest allowed control/region height to 30px. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 47

```text
#breaks-list { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
```

Selects '#breaks-list'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '8px' sets the sets spacing between flex/grid children to 8px. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. padding sets inside spacing between border and content; value '0' sets sets inside spacing between border and content to 0. list-style controls list markers; value 'none' sets controls list markers to none.

### Line 48

```text
#breaks-list li { list-style: none; }
```

Selects '#breaks-list li'; declarations on this line style matching Timekeeper elements. list-style controls list markers; value 'none' sets controls list markers to none.

### Line 49

```text
.break-row { display: grid; grid-template-columns: 48px minmax(0, 1fr) minmax(0, 1fr) auto; align-items: end; gap: 7px; padding-top: 7px; border-top: 1px solid var(--border-soft); }
```

Selects '.break-row'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-columns defines grid tracks and their widths; value '48px minmax(0, 1fr) minmax(0, 1fr) auto' creates a responsive track with a minimum and flexible maximum size. align-items aligns children across the cross axis; value 'end' sets aligns children across the cross axis to end. gap sets spacing between flex/grid children; value '7px' sets the sets spacing between flex/grid children to 7px. padding-top adds inside space above content; value '7px' sets the adds inside space above content to 7px. border-top sets the top border; value '1px solid var(--border-soft)' sets sets the top border to 1px solid var(--border-soft).

### Line 50

```text
.break-label { align-self: center; color: var(--muted); font-size: 9px; font-weight: 700; }
```

Selects '.break-label'; declarations on this line style matching Timekeeper elements. align-self overrides cross-axis alignment for this item; value 'center' sets overrides cross-axis alignment for this item to center. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '9px' sets the sets text size to 9px. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 51

```text
.break-row label { display: grid; gap: 4px; color: var(--muted); font-size: 9px; }
```

Selects '.break-row label'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '4px' sets the sets spacing between flex/grid children to 4px. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '9px' sets the sets text size to 9px.

### Line 52

```text
.break-row input { min-height: 34px !important; padding: 6px !important; font-size: 10px !important; }
```

Selects '.break-row input'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '34px !important' sets sets the smallest allowed control/region height to 34px !important. padding sets inside spacing between border and content; value '6px !important' sets sets inside spacing between border and content to 6px !important. font-size sets text size; value '10px !important' sets sets text size to 10px !important.

### Line 53

```text
.remove-break-button { min-height: 32px; padding: 0 8px; color: var(--red); background: var(--red-soft); font-size: 9px; }
```

Selects '.remove-break-button'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '32px' sets the sets the smallest allowed control/region height to 32px. padding sets inside spacing between border and content; value '0 8px' sets the sets inside spacing between border and content to 0 8px. color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value. background sets the full background paint; value 'var(--red-soft)' uses theme custom property var(--red-soft), so the shared design token controls this value. font-size sets text size; value '9px' sets the sets text size to 9px.

### Line 54

```text
.paid-toggle { display: flex; align-items: center; gap: 7px; }
```

Selects '.paid-toggle'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. gap sets spacing between flex/grid children; value '7px' sets the sets spacing between flex/grid children to 7px.

### Line 55

```text
.form-error { margin: 0; color: var(--red); font-size: 11px; }
```

Selects '.form-error'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 56

```text
.form-error:empty { display: none; }
```

Selects '.form-error:empty'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'none' removes the element from layout.

### Line 57

```text
.modal-actions { display: flex; justify-content: flex-end; gap: 7px; }
```

Selects '.modal-actions'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. justify-content aligns children along the main axis; value 'flex-end' sets aligns children along the main axis to flex-end. gap sets spacing between flex/grid children; value '7px' sets the sets spacing between flex/grid children to 7px.

### Line 58

```text
#cancel-btn { min-height: 37px; padding: 0 13px; color: var(--ink-soft); background: var(--surface-muted); font-size: 11px; }
```

Selects '#cancel-btn'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '37px' sets the sets the smallest allowed control/region height to 37px. padding sets inside spacing between border and content; value '0 13px' sets the sets inside spacing between border and content to 0 13px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 59

```text
button:disabled { opacity: .6; cursor: wait; }
```

Selects 'button:disabled'; declarations on this line style matching Timekeeper elements. opacity makes the element and its contents translucent; value '.6' sets makes the element and its contents translucent to .6. cursor chooses pointer cursor presentation; value 'wait' sets chooses pointer cursor presentation to wait.

### Line 60

```text

```

Blank line separates related rules for readability.

### Line 61

```text
@media (max-width: 680px) {
```

Begins a responsive media query: the nested overrides apply when (max-width: 680px) {.

### Line 62

```text
  .filters, #shiftBase { grid-template-columns: 1fr; }
```

Selects '.filters, #shiftBase'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value '1fr' sets the defines grid tracks and their widths to 1fr.

### Line 63

```text
  #shiftBase label { grid-row: auto; }
```

Selects '#shiftBase label'; declarations on this line style matching Timekeeper elements. grid-row controls this CSS property; value 'auto' sets grid-row to auto.

### Line 64

```text
  .shift-card { grid-template-columns: minmax(0, 1fr); gap: 7px; }
```

Selects '.shift-card'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value 'minmax(0, 1fr)' creates a responsive track with a minimum and flexible maximum size. gap sets spacing between flex/grid children; value '7px' sets the sets spacing between flex/grid children to 7px.

### Line 65

```text
  .list-item-buttons { justify-content: flex-start; }
```

Selects '.list-item-buttons'; declarations on this line style matching Timekeeper elements. justify-content aligns children along the main axis; value 'flex-start' sets aligns children along the main axis to flex-start.

### Line 66

```text
  .shift-modal { padding: 16px; }
```

Selects '.shift-modal'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '16px' sets the sets inside spacing between border and content to 16px.

### Line 67

```text
  .break-row { grid-template-columns: 44px minmax(0, 1fr) minmax(0, 1fr); }
```

Selects '.break-row'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value '44px minmax(0, 1fr) minmax(0, 1fr)' creates a responsive track with a minimum and flexible maximum size.

### Line 68

```text
  .break-row .remove-break-button { grid-column: 2 / 4; justify-self: end; }
```

Selects '.break-row .remove-break-button'; declarations on this line style matching Timekeeper elements. grid-column places an item across specified grid columns; value '2 / 4' sets places an item across specified grid columns to 2 / 4. justify-self aligns this grid item within its grid area; value 'end' sets aligns this grid item within its grid area to end.

### Line 69

```text
}
```

Closes the current CSS rule or media-query block.

### Line 70

```text
@media (max-width: 430px) {
```

Begins a responsive media query: the nested overrides apply when (max-width: 430px) {.

### Line 71

```text
  .hours-grid { grid-template-columns: 1fr; }
```

Selects '.hours-grid'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value '1fr' sets the defines grid tracks and their widths to 1fr.

### Line 72

```text
  .break-row { grid-template-columns: 1fr; }
```

Selects '.break-row'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value '1fr' sets the defines grid tracks and their widths to 1fr.

### Line 73

```text
  .break-label { align-self: auto; }
```

Selects '.break-label'; declarations on this line style matching Timekeeper elements. align-self overrides cross-axis alignment for this item; value 'auto' sets overrides cross-axis alignment for this item to auto.

### Line 74

```text
  .break-row .remove-break-button { grid-column: 1; }
```

Selects '.break-row .remove-break-button'; declarations on this line style matching Timekeeper elements. grid-column places an item across specified grid columns; value '1' sets places an item across specified grid columns to 1.

### Line 75

```text
}
```

Closes the current CSS rule or media-query block.

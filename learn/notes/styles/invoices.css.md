# styles/invoices.css

[Exact copy](../../original/styles/invoices.css)

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
.invoice-header { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 14px; align-items: start; width: min(100%, 1000px); margin: 0 auto 16px; padding: 17px; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow-soft); }
```

Selects '.invoice-header'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-columns defines grid tracks and their widths; value 'minmax(0, 1fr) auto' creates a responsive track with a minimum and flexible maximum size. gap sets spacing between flex/grid children; value '14px' sets the sets spacing between flex/grid children to 14px. align-items aligns children across the cross axis; value 'start' sets aligns children across the cross axis to start. width sets horizontal size; value 'min(100%, 1000px)' sets sets horizontal size to min(100%, 1000px). margin sets outside spacing around the box; value '0 auto 16px' sets the sets outside spacing around the box to 0 auto 16px. padding sets inside spacing between border and content; value '17px' sets the sets inside spacing between border and content to 17px. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '16px' sets the rounds box corners to 16px. box-shadow draws depth/shadow around a component; value 'var(--shadow-soft)' uses theme custom property var(--shadow-soft), so the shared design token controls this value.

### Line 5

```text
.inv-dropdowns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; border: 0; }
```

Selects '.inv-dropdowns'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-columns defines grid tracks and their widths; value 'repeat(2, minmax(0, 1fr))' creates a responsive track with a minimum and flexible maximum size. gap sets spacing between flex/grid children; value '10px' sets the sets spacing between flex/grid children to 10px. border sets border width/style/color; value '0' sets sets border width/style/color to 0.

### Line 6

```text
.select-div { display: grid; gap: 5px; min-width: 0; margin: 0; text-align: left; }
```

Selects '.select-div'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '5px' sets the sets spacing between flex/grid children to 5px. min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. text-align aligns inline text; value 'left' aligns content to the left.

### Line 7

```text
.select-div select { width: 100%; min-height: 38px; padding: 7px 9px; font-size: 11px; }
```

Selects '.select-div select'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '100%' sets the sets horizontal size to 100%. min-height sets the smallest allowed control/region height; value '38px' sets the sets the smallest allowed control/region height to 38px. padding sets inside spacing between border and content; value '7px 9px' sets the sets inside spacing between border and content to 7px 9px. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 8

```text
.invoice-actions, .item-btns { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; }
```

Selects '.invoice-actions, .item-btns'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. flex-wrap allows flex children to wrap onto additional lines; value 'wrap' allows children to continue on another line. gap sets spacing between flex/grid children; value '6px' sets the sets spacing between flex/grid children to 6px. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0.

### Line 9

```text
.invoice-actions { grid-column: 1 / -1; }
```

Selects '.invoice-actions'; declarations on this line style matching Timekeeper elements. grid-column places an item across specified grid columns; value '1 / -1' sets places an item across specified grid columns to 1 / -1.

### Line 10

```text
.invoice-actions button, .item-btns button, #mark-paid-btn, #submit-btn { min-height: 34px; padding: 0 11px; color: #fff; background: var(--green); font-size: 10px; font-weight: 700; }
```

Selects '.invoice-actions button, .item-btns button, #mark-paid-btn, #submit-btn'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '34px' sets the sets the smallest allowed control/region height to 34px. padding sets inside spacing between border and content; value '0 11px' sets the sets inside spacing between border and content to 0 11px. color sets foreground text/icon color; value '#fff' uses explicit color #fff. background sets the full background paint; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 11

```text
.invoice-actions button:hover, .item-btns button:hover, #mark-paid-btn:hover, #submit-btn:hover { background: var(--green-deep); }
```

Selects '.invoice-actions button:hover, .item-btns button:hover, #mark-paid-btn:hover, #submit-btn:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value.

### Line 12

```text
#delete-inv-btn, #remove-item-btn { color: var(--red); background: var(--red-soft); }
```

Selects '#delete-inv-btn, #remove-item-btn'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value. background sets the full background paint; value 'var(--red-soft)' uses theme custom property var(--red-soft), so the shared design token controls this value.

### Line 13

```text
#delete-inv-btn:hover, #remove-item-btn:hover { color: #fff; background: #b84e4e; }
```

Selects '#delete-inv-btn:hover, #remove-item-btn:hover'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value '#fff' uses explicit color #fff. background sets the full background paint; value '#b84e4e' uses explicit color #b84e4e.

### Line 14

```text
#edit-item-btn:disabled, #remove-item-btn:disabled { opacity: .58; cursor: not-allowed; }
```

Selects '#edit-item-btn:disabled, #remove-item-btn:disabled'; declarations on this line style matching Timekeeper elements. opacity makes the element and its contents translucent; value '.58' sets makes the element and its contents translucent to .58. cursor chooses pointer cursor presentation; value 'not-allowed' sets chooses pointer cursor presentation to not-allowed.

### Line 15

```text
.open-div { grid-column: 1 / -1; color: var(--muted); font-size: 10px; }
```

Selects '.open-div'; declarations on this line style matching Timekeeper elements. grid-column places an item across specified grid columns; value '1 / -1' sets places an item across specified grid columns to 1 / -1. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 16

```text
.open-div p { margin: 0 0 7px; font-weight: 700; }
```

Selects '.open-div p'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 7px' sets the sets outside spacing around the box to 0 0 7px. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 17

```text
.open-invoice-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr)); gap: 6px; max-height: 150px; margin: 0; padding: 0; overflow: auto; list-style: none; }
```

Selects '.open-invoice-list'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-columns defines grid tracks and their widths; value 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))' creates a responsive track with a minimum and flexible maximum size. gap sets spacing between flex/grid children; value '6px' sets the sets spacing between flex/grid children to 6px. max-height caps vertical size; value '150px' sets the caps vertical size to 150px. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. padding sets inside spacing between border and content; value '0' sets sets inside spacing between border and content to 0. overflow controls content that exceeds the box, such as scrolling or clipping; value 'auto' adds scrolling only when content exceeds the box. list-style controls list markers; value 'none' sets controls list markers to none.

### Line 18

```text
.open-invoice-button { width: 100%; min-height: 36px; padding: 7px 9px; color: var(--ink-soft); background: var(--surface-muted); border: 1px solid var(--border); font-size: 10px; text-align: left; }
```

Selects '.open-invoice-button'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '100%' sets the sets horizontal size to 100%. min-height sets the smallest allowed control/region height; value '36px' sets the sets the smallest allowed control/region height to 36px. padding sets inside spacing between border and content; value '7px 9px' sets the sets inside spacing between border and content to 7px 9px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). font-size sets text size; value '10px' sets the sets text size to 10px. text-align aligns inline text; value 'left' aligns content to the left.

### Line 19

```text
.open-invoice-button:hover, .open-invoice-button[aria-current="true"] { color: var(--green-deep); background: var(--green-soft); border-color: var(--green-line); }
```

Selects '.open-invoice-button:hover, .open-invoice-button[aria-current="true"]'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value. border-color controls this CSS property; value 'var(--green-line)' uses theme custom property var(--green-line), so the shared design token controls this value.

### Line 20

```text
body > main { width: min(100%, 1000px); margin: 0 auto; }
```

Selects 'body > main'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value 'min(100%, 1000px)' sets sets horizontal size to min(100%, 1000px). margin sets outside spacing around the box; value '0 auto' sets sets outside spacing around the box to 0 auto.

### Line 21

```text
.table-box { display: block; overflow-x: auto; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow-soft); }
```

Selects '.table-box'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'block' takes a full available line. overflow-x controls horizontal overflow; value 'auto' sets controls horizontal overflow to auto. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '16px' sets the rounds box corners to 16px. box-shadow draws depth/shadow around a component; value 'var(--shadow-soft)' uses theme custom property var(--shadow-soft), so the shared design token controls this value.

### Line 22

```text
#inv-table { width: 100%; min-width: 420px; border: 0; border-collapse: collapse; text-align: left; transition: border-color 160ms ease; }
```

Selects '#inv-table'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '100%' sets the sets horizontal size to 100%. min-width sets the smallest allowed horizontal size; value '420px' sets the sets the smallest allowed horizontal size to 420px. border sets border width/style/color; value '0' sets sets border width/style/color to 0. border-collapse controls this CSS property; value 'collapse' sets border-collapse to collapse. text-align aligns inline text; value 'left' aligns content to the left. transition controls this CSS property; value 'border-color 160ms ease' sets transition to border-color 160ms ease.

### Line 23

```text
#inv-table th, #inv-table td { padding: 11px 13px; border: 0; border-bottom: 1px solid var(--border-soft); font-size: 11px; }
```

Selects '#inv-table th, #inv-table td'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '11px 13px' sets the sets inside spacing between border and content to 11px 13px. border sets border width/style/color; value '0' sets sets border width/style/color to 0. border-bottom sets the bottom border; value '1px solid var(--border-soft)' sets sets the bottom border to 1px solid var(--border-soft). font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 24

```text
#inv-table th { color: var(--muted); background: var(--surface-muted); font-size: 9px; font-weight: 750; letter-spacing: .08em; text-transform: uppercase; }
```

Selects '#inv-table th'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value. font-size sets text size; value '9px' sets the sets text size to 9px. font-weight sets text stroke emphasis; value '750' sets sets text stroke emphasis to 750. letter-spacing adjusts spacing between glyphs; value '.08em' sets the adjusts spacing between glyphs to .08em. text-transform changes displayed letter casing; value 'uppercase' sets changes displayed letter casing to uppercase.

### Line 25

```text
#inv-table thead tr:first-child th { color: var(--ink-soft); background: var(--surface); font-size: 12px; letter-spacing: 0; }
```

Selects '#inv-table thead tr:first-child th'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. font-size sets text size; value '12px' sets the sets text size to 12px. letter-spacing adjusts spacing between glyphs; value '0' sets adjusts spacing between glyphs to 0.

### Line 26

```text
#date-head label { margin-right: 10px; font-size: 10px; font-weight: 750; letter-spacing: .06em; text-transform: uppercase; }
```

Selects '#date-head label'; declarations on this line style matching Timekeeper elements. margin-right adds outside space to the right; value '10px' sets the adds outside space to the right to 10px. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '750' sets sets text stroke emphasis to 750. letter-spacing adjusts spacing between glyphs; value '.06em' sets the adjusts spacing between glyphs to .06em. text-transform changes displayed letter casing; value 'uppercase' sets changes displayed letter casing to uppercase.

### Line 27

```text
#invoice-date { min-height: 34px; padding: 6px 9px; color: var(--ink); background: var(--surface); border: 1px solid var(--border); border-radius: 9px; font: inherit; font-size: 12px; letter-spacing: 0; text-transform: none; }
```

Selects '#invoice-date'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '34px' sets the sets the smallest allowed control/region height to 34px. padding sets inside spacing between border and content; value '6px 9px' sets the sets inside spacing between border and content to 6px 9px. color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '9px' sets the rounds box corners to 9px. font sets inherited font shorthand; value 'inherit' sets sets inherited font shorthand to inherit. font-size sets text size; value '12px' sets the sets text size to 12px. letter-spacing adjusts spacing between glyphs; value '0' sets adjusts spacing between glyphs to 0. text-transform changes displayed letter casing; value 'none' sets changes displayed letter casing to none.

### Line 28

```text
#invoice-date:disabled { opacity: .6; cursor: not-allowed; }
```

Selects '#invoice-date:disabled'; declarations on this line style matching Timekeeper elements. opacity makes the element and its contents translucent; value '.6' sets makes the element and its contents translucent to .6. cursor chooses pointer cursor presentation; value 'not-allowed' sets chooses pointer cursor presentation to not-allowed.

### Line 29

```text
#inv-table tbody tr[data-item-index] { cursor: pointer; }
```

Selects '#inv-table tbody tr[data-item-index]'; declarations on this line style matching Timekeeper elements. cursor chooses pointer cursor presentation; value 'pointer' sets chooses pointer cursor presentation to pointer.

### Line 30

```text
#inv-table tbody tr:hover { background: var(--surface-hover); }
```

Selects '#inv-table tbody tr:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--surface-hover)' uses theme custom property var(--surface-hover), so the shared design token controls this value.

### Line 31

```text
#invoice-table-body tr.selected-item { background: var(--green-soft); outline: 2px solid var(--green-line); outline-offset: -2px; }
```

Selects '#invoice-table-body tr.selected-item'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value. outline draws focus/diagnostic ring outside the border; value '2px solid var(--green-line)' sets draws focus/diagnostic ring outside the border to 2px solid var(--green-line). outline-offset moves the outline away from the border; value '-2px' sets the moves the outline away from the border to -2px.

### Line 32

```text
.invoice-line-warning { display: inline-block; margin-top: 3px; color: var(--red); font-size: 10px; font-weight: 650; line-height: 1.4; }
```

Selects '.invoice-line-warning'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'inline-block' sets chooses the layout model or visibility behavior to inline-block. margin-top adds outside space above the element; value '3px' sets the adds outside space above the element to 3px. color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '650' semibold emphasis. line-height sets line box height and text rhythm; value '1.4' sets sets line box height and text rhythm to 1.4.

### Line 33

```text
.invoice-line-warning.is-unverified { color: var(--amber); }
```

Selects '.invoice-line-warning.is-unverified'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--amber)' uses theme custom property var(--amber), so the shared design token controls this value.

### Line 34

```text
#inv-table tfoot td { color: var(--ink-soft); font-weight: 700; }
```

Selects '#inv-table tfoot td'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 35

```text
#inv-table.is-paid { box-shadow: inset 0 0 0 2px #d99484; }
```

Selects '#inv-table.is-paid'; declarations on this line style matching Timekeeper elements. box-shadow draws depth/shadow around a component; value 'inset 0 0 0 2px #d99484' sets draws depth/shadow around a component to inset 0 0 0 2px #d99484.

### Line 36

```text
.paid-notice { color: var(--red); }
```

Selects '.paid-notice'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value.

### Line 37

```text
.shift-link-panel { display: grid; gap: 10px; margin-top: 14px; padding: 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow-soft); }
```

Selects '.shift-link-panel'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '10px' sets the sets spacing between flex/grid children to 10px. margin-top adds outside space above the element; value '14px' sets the adds outside space above the element to 14px. padding sets inside spacing between border and content; value '16px' sets the sets inside spacing between border and content to 16px. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '16px' sets the rounds box corners to 16px. box-shadow draws depth/shadow around a component; value 'var(--shadow-soft)' uses theme custom property var(--shadow-soft), so the shared design token controls this value.

### Line 38

```text
.shift-link-panel > summary { cursor: pointer; }
```

Selects '.shift-link-panel > summary'; declarations on this line style matching Timekeeper elements. cursor chooses pointer cursor presentation; value 'pointer' sets chooses pointer cursor presentation to pointer.

### Line 39

```text
.shift-link-title { color: var(--ink); font-size: 15px; font-weight: 750; letter-spacing: -.025em; }
```

Selects '.shift-link-title'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value. font-size sets text size; value '15px' sets the sets text size to 15px. font-weight sets text stroke emphasis; value '750' sets sets text stroke emphasis to 750. letter-spacing adjusts spacing between glyphs; value '-.025em' sets the adjusts spacing between glyphs to -.025em.

### Line 40

```text
.shift-link-description { margin: 0; color: var(--muted); font-size: 10px; }
```

Selects '.shift-link-description'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 41

```text
.shift-link-list { display: grid; gap: 6px; }
```

Selects '.shift-link-list'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '6px' sets the sets spacing between flex/grid children to 6px.

### Line 42

```text
.shift-link-option { display: flex; align-items: flex-start; gap: 9px; padding: 9px 10px; background: var(--surface-muted); border: 1px solid var(--border-soft); border-radius: 10px; }
```

Selects '.shift-link-option'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'flex-start' sets aligns children across the cross axis to flex-start. gap sets spacing between flex/grid children; value '9px' sets the sets spacing between flex/grid children to 9px. padding sets inside spacing between border and content; value '9px 10px' sets the sets inside spacing between border and content to 9px 10px. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border-soft)' sets sets border width/style/color to 1px solid var(--border-soft). border-radius rounds box corners; value '10px' sets the rounds box corners to 10px.

### Line 43

```text
.shift-link-option input { flex: 0 0 16px; width: 16px; height: 16px; margin: 2px 0 0; accent-color: var(--green); }
```

Selects '.shift-link-option input'; declarations on this line style matching Timekeeper elements. flex controls this CSS property; value '0 0 16px' sets the flex to 0 0 16px. width sets horizontal size; value '16px' sets the sets horizontal size to 16px. height sets vertical size; value '16px' sets the sets vertical size to 16px. margin sets outside spacing around the box; value '2px 0 0' sets sets outside spacing around the box to 2px 0 0. accent-color colors native checkbox/radio accents; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value.

### Line 44

```text
.shift-link-option span { color: var(--ink-soft); font-size: 10px; }
```

Selects '.shift-link-option span'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 45

```text
.shift-link-empty { margin: 0; color: var(--muted); font-size: 10px; }
```

Selects '.shift-link-empty'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 46

```text
#save-shift-links-btn { justify-self: start; min-height: 36px; padding: 0 12px; color: #fff; background: var(--green); font-size: 10px; font-weight: 700; }
```

Selects '#save-shift-links-btn'; declarations on this line style matching Timekeeper elements. justify-self aligns this grid item within its grid area; value 'start' sets aligns this grid item within its grid area to start. min-height sets the smallest allowed control/region height; value '36px' sets the sets the smallest allowed control/region height to 36px. padding sets inside spacing between border and content; value '0 12px' sets the sets inside spacing between border and content to 0 12px. color sets foreground text/icon color; value '#fff' uses explicit color #fff. background sets the full background paint; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 47

```text
#save-shift-links-btn:hover { background: var(--green-deep); }
```

Selects '#save-shift-links-btn:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value.

### Line 48

```text
.modal { width: min(100% - 24px, 400px); max-width: 400px; max-height: min(92vh, 760px); max-height: min(92dvh, 760px); margin: auto; padding: 20px; overflow-y: auto; overscroll-behavior: contain; background: var(--surface); border: 1px solid var(--border); border-radius: 17px; box-shadow: 0 24px 80px rgba(16, 38, 25, .23); }
```

Selects '.modal'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value 'min(100% - 24px, 400px)' sets sets horizontal size to min(100% - 24px, 400px). max-width caps horizontal size; value '400px' sets the caps horizontal size to 400px. max-height caps vertical size; value 'min(92vh, 760px)' sets caps vertical size to min(92vh, 760px). max-height caps vertical size; value 'min(92dvh, 760px)' sets caps vertical size to min(92dvh, 760px). margin sets outside spacing around the box; value 'auto' sets sets outside spacing around the box to auto. padding sets inside spacing between border and content; value '20px' sets the sets inside spacing between border and content to 20px. overflow-y controls vertical overflow; value 'auto' sets controls vertical overflow to auto. overscroll-behavior controls this CSS property; value 'contain' sets overscroll-behavior to contain. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '17px' sets the rounds box corners to 17px. box-shadow draws depth/shadow around a component; value '0 24px 80px rgba(16, 38, 25, .23)' sets draws depth/shadow around a component to 0 24px 80px rgba(16, 38, 25, .23).

### Line 49

```text
.modal::backdrop { background: rgba(19, 35, 27, .4); backdrop-filter: blur(3px); }
```

Selects '.modal::backdrop'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'rgba(19, 35, 27, .4)' uses translucent color rgba(19, 35, 27, .4) to soften the surface/shadow. backdrop-filter filters pixels behind a translucent overlay; value 'blur(3px)' sets filters pixels behind a translucent overlay to blur(3px).

### Line 50

```text
#add-item-form { display: grid; gap: 10px; }
```

Selects '#add-item-form'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '10px' sets the sets spacing between flex/grid children to 10px.

### Line 51

```text
#item-modal-title { margin: 0 0 3px; font-size: 18px; }
```

Selects '#item-modal-title'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 3px' sets the sets outside spacing around the box to 0 0 3px. font-size sets text size; value '18px' sets the sets text size to 18px.

### Line 52

```text
#add-item-form label { margin-bottom: -7px; }
```

Selects '#add-item-form label'; declarations on this line style matching Timekeeper elements. margin-bottom adds outside space below the element; value '-7px' sets the adds outside space below the element to -7px.

### Line 53

```text
#add-item-form input { min-height: 40px; padding: 8px 10px; font-size: 11px; }
```

Selects '#add-item-form input'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '40px' sets the sets the smallest allowed control/region height to 40px. padding sets inside spacing between border and content; value '8px 10px' sets the sets inside spacing between border and content to 8px 10px. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 54

```text
.form-error { margin: 0; color: var(--red); font-size: 11px; }
```

Selects '.form-error'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 55

```text
.modal-btns { display: flex; justify-content: flex-end; gap: 7px; }
```

Selects '.modal-btns'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. justify-content aligns children along the main axis; value 'flex-end' sets aligns children along the main axis to flex-end. gap sets spacing between flex/grid children; value '7px' sets the sets spacing between flex/grid children to 7px.

### Line 56

```text
#cancel-btn { min-height: 34px; padding: 0 11px; color: var(--ink-soft); background: var(--surface-muted); font-size: 10px; }
```

Selects '#cancel-btn'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '34px' sets the sets the smallest allowed control/region height to 34px. padding sets inside spacing between border and content; value '0 11px' sets the sets inside spacing between border and content to 0 11px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 57

```text

```

Blank line separates related rules for readability.

### Line 58

```text
@media (max-width: 680px) {
```

Begins a responsive media query: the nested overrides apply when (max-width: 680px) {.

### Line 59

```text
  .invoice-header { grid-template-columns: 1fr; }
```

Selects '.invoice-header'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value '1fr' sets the defines grid tracks and their widths to 1fr.

### Line 60

```text
  .inv-dropdowns { grid-template-columns: 1fr; }
```

Selects '.inv-dropdowns'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value '1fr' sets the defines grid tracks and their widths to 1fr.

### Line 61

```text
  .invoice-actions { grid-column: auto; }
```

Selects '.invoice-actions'; declarations on this line style matching Timekeeper elements. grid-column places an item across specified grid columns; value 'auto' sets places an item across specified grid columns to auto.

### Line 62

```text
  .open-div { grid-column: auto; }
```

Selects '.open-div'; declarations on this line style matching Timekeeper elements. grid-column places an item across specified grid columns; value 'auto' sets places an item across specified grid columns to auto.

### Line 63

```text
}
```

Closes the current CSS rule or media-query block.

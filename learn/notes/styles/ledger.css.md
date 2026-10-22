# styles/ledger.css

[Exact copy](../../original/styles/ledger.css)

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
body { display: flex; flex-direction: column; align-items: stretch; gap: 15px; padding: clamp(14px, 3vw, 26px); }
```

Selects 'body'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. flex-direction sets the main-axis direction for flex children; value 'column' stacks children vertically. align-items aligns children across the cross axis; value 'stretch' sets aligns children across the cross axis to stretch. gap sets spacing between flex/grid children; value '15px' sets the sets spacing between flex/grid children to 15px. padding sets inside spacing between border and content; value 'clamp(14px, 3vw, 26px)' uses a responsive clamped value that grows/shrinks within the given minimum and maximum.

### Line 4

```text
.ledger-section, .table-div, .form-container { width: min(100%, 1060px); margin: 0 auto; }
```

Selects '.ledger-section, .table-div, .form-container'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value 'min(100%, 1060px)' sets sets horizontal size to min(100%, 1060px). margin sets outside spacing around the box; value '0 auto' sets sets outside spacing around the box to 0 auto.

### Line 5

```text
.ledger-section { padding: 0 2px; }
```

Selects '.ledger-section'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '0 2px' sets the sets inside spacing between border and content to 0 2px.

### Line 6

```text
.ledger-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; }
```

Selects '.ledger-heading'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'flex-end' sets aligns children across the cross axis to flex-end. justify-content aligns children along the main axis; value 'space-between' sets aligns children along the main axis to space-between. gap sets spacing between flex/grid children; value '16px' sets the sets spacing between flex/grid children to 16px.

### Line 7

```text
.ledger-heading h1 { margin: 0 0 4px; color: var(--ink); font-size: 20px; letter-spacing: -.04em; }
```

Selects '.ledger-heading h1'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 4px' sets the sets outside spacing around the box to 0 0 4px. color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value. font-size sets text size; value '20px' sets the sets text size to 20px. letter-spacing adjusts spacing between glyphs; value '-.04em' sets the adjusts spacing between glyphs to -.04em.

### Line 8

```text
.ledger-owner { margin: 0; color: var(--muted); font-size: 11px; }
```

Selects '.ledger-owner'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 9

```text
.ledger-filter { display: grid; min-width: min(260px, 45%); gap: 5px; color: var(--ink-soft); font-size: 10px; font-weight: 650; }
```

Selects '.ledger-filter'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. min-width sets the smallest allowed horizontal size; value 'min(260px, 45%)' sets sets the smallest allowed horizontal size to min(260px, 45%). gap sets spacing between flex/grid children; value '5px' sets the sets spacing between flex/grid children to 5px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '650' semibold emphasis.

### Line 10

```text
.ledger-filter select { width: 100%; min-height: 38px; padding: 7px 9px; font-size: 10px; }
```

Selects '.ledger-filter select'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '100%' sets the sets horizontal size to 100%. min-height sets the smallest allowed control/region height; value '38px' sets the sets the smallest allowed control/region height to 38px. padding sets inside spacing between border and content; value '7px 9px' sets the sets inside spacing between border and content to 7px 9px. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 11

```text
.table-div { overflow-x: auto; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow-soft); }
```

Selects '.table-div'; declarations on this line style matching Timekeeper elements. overflow-x controls horizontal overflow; value 'auto' sets controls horizontal overflow to auto. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '16px' sets the rounds box corners to 16px. box-shadow draws depth/shadow around a component; value 'var(--shadow-soft)' uses theme custom property var(--shadow-soft), so the shared design token controls this value.

### Line 12

```text
table { width: 100%; min-width: 700px; border-collapse: collapse; text-align: left; }
```

Selects 'table'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '100%' sets the sets horizontal size to 100%. min-width sets the smallest allowed horizontal size; value '700px' sets the sets the smallest allowed horizontal size to 700px. border-collapse controls this CSS property; value 'collapse' sets border-collapse to collapse. text-align aligns inline text; value 'left' aligns content to the left.

### Line 13

```text
thead { color: var(--muted); background: var(--surface-muted); }
```

Selects 'thead'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value.

### Line 14

```text
th, td { padding: 11px 12px; border-bottom: 1px solid var(--border-soft); font-size: 10px; }
```

Selects 'th, td'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '11px 12px' sets the sets inside spacing between border and content to 11px 12px. border-bottom sets the bottom border; value '1px solid var(--border-soft)' sets sets the bottom border to 1px solid var(--border-soft). font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 15

```text
th { font-size: 9px; font-weight: 750; letter-spacing: .07em; text-transform: uppercase; }
```

Selects 'th'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '9px' sets the sets text size to 9px. font-weight sets text stroke emphasis; value '750' sets sets text stroke emphasis to 750. letter-spacing adjusts spacing between glyphs; value '.07em' sets the adjusts spacing between glyphs to .07em. text-transform changes displayed letter casing; value 'uppercase' sets changes displayed letter casing to uppercase.

### Line 16

```text
tbody tr:hover { background: var(--surface-hover); }
```

Selects 'tbody tr:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--surface-hover)' uses theme custom property var(--surface-hover), so the shared design token controls this value.

### Line 17

```text
.advance-amount { color: var(--red); font-weight: 700; }
```

Selects '.advance-amount'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 18

```text
tfoot td { color: var(--ink-soft); background: var(--surface-muted); font-weight: 700; }
```

Selects 'tfoot td'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 19

```text
.ledger-archive-notice, .ledger-archive-link { width: min(100%, 1060px); margin: 0 auto; color: var(--muted); font-size: 11px; }
```

Selects '.ledger-archive-notice, .ledger-archive-link'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value 'min(100%, 1060px)' sets sets horizontal size to min(100%, 1060px). margin sets outside spacing around the box; value '0 auto' sets sets outside spacing around the box to 0 auto. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 20

```text
.ledger-archive-notice:empty { display: none; }
```

Selects '.ledger-archive-notice:empty'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'none' removes the element from layout.

### Line 21

```text
.ledger-archive-link a { color: var(--green-deep); font-weight: 700; text-decoration: none; }
```

Selects '.ledger-archive-link a'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. font-weight sets text stroke emphasis; value '700' bold emphasis. text-decoration adds/removes underlines or other decoration; value 'none' sets adds/removes underlines or other decoration to none.

### Line 22

```text
.ledger-archive-link a:hover { text-decoration: underline; }
```

Selects '.ledger-archive-link a:hover'; declarations on this line style matching Timekeeper elements. text-decoration adds/removes underlines or other decoration; value 'underline' sets adds/removes underlines or other decoration to underline.

### Line 23

```text
.ledger-row-actions { display: flex; flex-wrap: wrap; gap: 6px; }
```

Selects '.ledger-row-actions'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. flex-wrap allows flex children to wrap onto additional lines; value 'wrap' allows children to continue on another line. gap sets spacing between flex/grid children; value '6px' sets the sets spacing between flex/grid children to 6px.

### Line 24

```text
.edit-ledger-btn, .delete-btn { min-height: 32px; padding: 0 10px; font-size: 10px; font-weight: 650; }
```

Selects '.edit-ledger-btn, .delete-btn'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '32px' sets the sets the smallest allowed control/region height to 32px. padding sets inside spacing between border and content; value '0 10px' sets the sets inside spacing between border and content to 0 10px. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '650' semibold emphasis.

### Line 25

```text
.edit-ledger-btn { color: var(--green-deep); background: var(--green-soft); }
```

Selects '.edit-ledger-btn'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value.

### Line 26

```text
.edit-ledger-btn:hover { background: var(--surface-hover); }
```

Selects '.edit-ledger-btn:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--surface-hover)' uses theme custom property var(--surface-hover), so the shared design token controls this value.

### Line 27

```text
.delete-btn { color: var(--red); background: var(--red-soft); }
```

Selects '.delete-btn'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value. background sets the full background paint; value 'var(--red-soft)' uses theme custom property var(--red-soft), so the shared design token controls this value.

### Line 28

```text
.delete-btn:hover { color: #fff; background: #b84e4e; }
```

Selects '.delete-btn:hover'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value '#fff' uses explicit color #fff. background sets the full background paint; value '#b84e4e' uses explicit color #b84e4e.

### Line 29

```text
.form-container { padding: 17px; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow-soft); }
```

Selects '.form-container'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '17px' sets the sets inside spacing between border and content to 17px. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '16px' sets the rounds box corners to 16px. box-shadow draws depth/shadow around a component; value 'var(--shadow-soft)' uses theme custom property var(--shadow-soft), so the shared design token controls this value.

### Line 30

```text
.form-container > summary { color: var(--ink-soft); cursor: pointer; font-size: 12px; font-weight: 750; }
```

Selects '.form-container > summary'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. cursor chooses pointer cursor presentation; value 'pointer' sets chooses pointer cursor presentation to pointer. font-size sets text size; value '12px' sets the sets text size to 12px. font-weight sets text stroke emphasis; value '750' sets sets text stroke emphasis to 750.

### Line 31

```text
.form-container > summary:focus-visible { border-radius: 4px; }
```

Selects '.form-container > summary:focus-visible'; declarations on this line style matching Timekeeper elements. border-radius rounds box corners; value '4px' sets the rounds box corners to 4px.

### Line 32

```text
.form-container[open] > summary { margin-bottom: 13px; padding-bottom: 9px; border-bottom: 1px solid var(--border-soft); }
```

Selects '.form-container[open] > summary'; declarations on this line style matching Timekeeper elements. margin-bottom adds outside space below the element; value '13px' sets the adds outside space below the element to 13px. padding-bottom adds inside space below content; value '9px' sets the adds inside space below content to 9px. border-bottom sets the bottom border; value '1px solid var(--border-soft)' sets sets the bottom border to 1px solid var(--border-soft).

### Line 33

```text
#ledger-form { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 11px; align-items: end; }
```

Selects '#ledger-form'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-columns defines grid tracks and their widths; value 'repeat(4, minmax(0, 1fr))' creates a responsive track with a minimum and flexible maximum size. gap sets spacing between flex/grid children; value '11px' sets the sets spacing between flex/grid children to 11px. align-items aligns children across the cross axis; value 'end' sets aligns children across the cross axis to end.

### Line 34

```text
#ledger-form label { display: grid; gap: 5px; color: var(--ink-soft); font-size: 10px; font-weight: 650; }
```

Selects '#ledger-form label'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '5px' sets the sets spacing between flex/grid children to 5px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '650' semibold emphasis.

### Line 35

```text
#ledger-form input, #ledger-form select { width: 100%; min-height: 38px; padding: 7px 9px; font-size: 10px; }
```

Selects '#ledger-form input, #ledger-form select'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '100%' sets the sets horizontal size to 100%. min-height sets the smallest allowed control/region height; value '38px' sets the sets the smallest allowed control/region height to 38px. padding sets inside spacing between border and content; value '7px 9px' sets the sets inside spacing between border and content to 7px 9px. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 36

```text
#ledger-form button[type="submit"] { min-height: 38px; padding: 0 13px; color: #fff; background: var(--green); font-size: 10px; font-weight: 700; }
```

Selects '#ledger-form button[type="submit"]'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '38px' sets the sets the smallest allowed control/region height to 38px. padding sets inside spacing between border and content; value '0 13px' sets the sets inside spacing between border and content to 0 13px. color sets foreground text/icon color; value '#fff' uses explicit color #fff. background sets the full background paint; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 37

```text
#ledger-form button[type="submit"]:hover { background: var(--green-deep); }
```

Selects '#ledger-form button[type="submit"]:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value.

### Line 38

```text
#ledger-form button:disabled { opacity: .6; cursor: wait; }
```

Selects '#ledger-form button:disabled'; declarations on this line style matching Timekeeper elements. opacity makes the element and its contents translucent; value '.6' sets makes the element and its contents translucent to .6. cursor chooses pointer cursor presentation; value 'wait' sets chooses pointer cursor presentation to wait.

### Line 39

```text

```

Blank line separates related rules for readability.

### Line 40

```text
.shift-ledger-container { display: block; }
```

Selects '.shift-ledger-container'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'block' takes a full available line.

### Line 41

```text
.shift-ledger-summary { font-size: 15px !important; letter-spacing: -.025em; }
```

Selects '.shift-ledger-summary'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '15px !important' sets sets text size to 15px !important. letter-spacing adjusts spacing between glyphs; value '-.025em' sets the adjusts spacing between glyphs to -.025em.

### Line 42

```text
.shift-ledger-content { display: grid; gap: 12px; }
```

Selects '.shift-ledger-content'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px.

### Line 43

```text
.shift-ledger-description, #shift-ledger-status { margin: 0; color: var(--muted); font-size: 11px; line-height: 1.5; }
```

Selects '.shift-ledger-description, #shift-ledger-status'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px. line-height sets line box height and text rhythm; value '1.5' sets sets line box height and text rhythm to 1.5.

### Line 44

```text
#shift-ledger-form { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 11px; align-items: end; }
```

Selects '#shift-ledger-form'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-columns defines grid tracks and their widths; value 'minmax(0, 1fr) auto' creates a responsive track with a minimum and flexible maximum size. gap sets spacing between flex/grid children; value '11px' sets the sets spacing between flex/grid children to 11px. align-items aligns children across the cross axis; value 'end' sets aligns children across the cross axis to end.

### Line 45

```text
#shift-ledger-form label { display: grid; gap: 5px; color: var(--ink-soft); font-size: 10px; font-weight: 650; }
```

Selects '#shift-ledger-form label'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '5px' sets the sets spacing between flex/grid children to 5px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '650' semibold emphasis.

### Line 46

```text
#shift-ledger-form select, #shift-ledger-form button { min-height: 38px; padding: 7px 11px; font-size: 10px; }
```

Selects '#shift-ledger-form select, #shift-ledger-form button'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '38px' sets the sets the smallest allowed control/region height to 38px. padding sets inside spacing between border and content; value '7px 11px' sets the sets inside spacing between border and content to 7px 11px. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 47

```text
#shift-ledger-form button { color: #fff; background: var(--green); font-weight: 700; }
```

Selects '#shift-ledger-form button'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value '#fff' uses explicit color #fff. background sets the full background paint; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 48

```text
#shift-ledger-form button:hover { background: var(--green-deep); }
```

Selects '#shift-ledger-form button:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value.

### Line 49

```text
#shift-ledger-form button:disabled { opacity: .6; cursor: not-allowed; }
```

Selects '#shift-ledger-form button:disabled'; declarations on this line style matching Timekeeper elements. opacity makes the element and its contents translucent; value '.6' sets makes the element and its contents translucent to .6. cursor chooses pointer cursor presentation; value 'not-allowed' sets chooses pointer cursor presentation to not-allowed.

### Line 50

```text
#shift-ledger-status:empty { display: none; }
```

Selects '#shift-ledger-status:empty'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'none' removes the element from layout.

### Line 51

```text

```

Blank line separates related rules for readability.

### Line 52

```text
.ledger-edit-modal {
```

Selects '.ledger-edit-modal'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 53

```text
  width: min(calc(100% - 24px), 560px);
```

For selector '.ledger-edit-modal', width sets horizontal size; value 'min(calc(100% - 24px), 560px)' sets sets horizontal size to min(calc(100% - 24px), 560px).

### Line 54

```text
  max-width: 560px;
```

For selector '.ledger-edit-modal', max-width caps horizontal size; value '560px' sets the caps horizontal size to 560px.

### Line 55

```text
  max-height: min(92vh, 760px);
```

For selector '.ledger-edit-modal', max-height caps vertical size; value 'min(92vh, 760px)' sets caps vertical size to min(92vh, 760px).

### Line 56

```text
  max-height: min(92dvh, 760px);
```

For selector '.ledger-edit-modal', max-height caps vertical size; value 'min(92dvh, 760px)' sets caps vertical size to min(92dvh, 760px).

### Line 57

```text
  margin: auto;
```

For selector '.ledger-edit-modal', margin sets outside spacing around the box; value 'auto' sets sets outside spacing around the box to auto.

### Line 58

```text
  padding: 0;
```

For selector '.ledger-edit-modal', padding sets inside spacing between border and content; value '0' sets sets inside spacing between border and content to 0.

### Line 59

```text
  overflow: auto;
```

For selector '.ledger-edit-modal', overflow controls content that exceeds the box, such as scrolling or clipping; value 'auto' adds scrolling only when content exceeds the box.

### Line 60

```text
  color: var(--ink);
```

For selector '.ledger-edit-modal', color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value.

### Line 61

```text
  background: var(--surface);
```

For selector '.ledger-edit-modal', background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value.

### Line 62

```text
  border: 1px solid var(--border);
```

For selector '.ledger-edit-modal', border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 63

```text
  border-radius: 18px;
```

For selector '.ledger-edit-modal', border-radius rounds box corners; value '18px' sets the rounds box corners to 18px.

### Line 64

```text
  box-shadow: 0 24px 80px rgba(16, 38, 25, .24);
```

For selector '.ledger-edit-modal', box-shadow draws depth/shadow around a component; value '0 24px 80px rgba(16, 38, 25, .24)' sets draws depth/shadow around a component to 0 24px 80px rgba(16, 38, 25, .24).

### Line 65

```text
}
```

Closes the current CSS rule or media-query block.

### Line 66

```text
.ledger-edit-modal::backdrop { background: rgba(19, 35, 27, .52); backdrop-filter: blur(3px); }
```

Selects '.ledger-edit-modal::backdrop'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'rgba(19, 35, 27, .52)' uses translucent color rgba(19, 35, 27, .52) to soften the surface/shadow. backdrop-filter filters pixels behind a translucent overlay; value 'blur(3px)' sets filters pixels behind a translucent overlay to blur(3px).

### Line 67

```text
.ledger-edit-form { display: grid; gap: 20px; padding: clamp(20px, 4vw, 30px); }
```

Selects '.ledger-edit-form'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '20px' sets the sets spacing between flex/grid children to 20px. padding sets inside spacing between border and content; value 'clamp(20px, 4vw, 30px)' uses a responsive clamped value that grows/shrinks within the given minimum and maximum.

### Line 68

```text
.ledger-edit-heading { display: grid; gap: 6px; }
```

Selects '.ledger-edit-heading'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '6px' sets the sets spacing between flex/grid children to 6px.

### Line 69

```text
.ledger-edit-heading h2 { margin: 0; color: var(--ink); font-size: 21px; letter-spacing: -.035em; }
```

Selects '.ledger-edit-heading h2'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value. font-size sets text size; value '21px' sets the sets text size to 21px. letter-spacing adjusts spacing between glyphs; value '-.035em' sets the adjusts spacing between glyphs to -.035em.

### Line 70

```text
.ledger-edit-heading > p:last-child { margin: 0; color: var(--muted); font-size: 13px; }
```

Selects '.ledger-edit-heading > p:last-child'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '13px' sets the sets text size to 13px.

### Line 71

```text
.ledger-edit-eyebrow { margin: 0; color: var(--green); font-size: 10px; font-weight: 800; letter-spacing: .1em; }
```

Selects '.ledger-edit-eyebrow'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '800' sets sets text stroke emphasis to 800. letter-spacing adjusts spacing between glyphs; value '.1em' sets the adjusts spacing between glyphs to .1em.

### Line 72

```text
.ledger-edit-fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
```

Selects '.ledger-edit-fields'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-columns defines grid tracks and their widths; value 'repeat(2, minmax(0, 1fr))' creates a responsive track with a minimum and flexible maximum size. gap sets spacing between flex/grid children; value '14px' sets the sets spacing between flex/grid children to 14px.

### Line 73

```text
.ledger-edit-fields label { display: grid; min-width: 0; gap: 6px; color: var(--ink-soft); font-size: 12px; font-weight: 700; }
```

Selects '.ledger-edit-fields label'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0. gap sets spacing between flex/grid children; value '6px' sets the sets spacing between flex/grid children to 6px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-size sets text size; value '12px' sets the sets text size to 12px. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 74

```text
.ledger-edit-fields input, .ledger-edit-fields select, .ledger-edit-fields textarea { width: 100%; min-height: 42px; padding: 9px 11px; font-size: 14px; }
```

Selects '.ledger-edit-fields input, .ledger-edit-fields select, .ledger-edit-fields textarea'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '100%' sets the sets horizontal size to 100%. min-height sets the smallest allowed control/region height; value '42px' sets the sets the smallest allowed control/region height to 42px. padding sets inside spacing between border and content; value '9px 11px' sets the sets inside spacing between border and content to 9px 11px. font-size sets text size; value '14px' sets the sets text size to 14px.

### Line 75

```text
.ledger-edit-fields textarea { min-height: 88px; resize: vertical; }
```

Selects '.ledger-edit-fields textarea'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '88px' sets the sets the smallest allowed control/region height to 88px. resize controls this CSS property; value 'vertical' sets resize to vertical.

### Line 76

```text
.ledger-edit-notes { grid-column: 1 / -1; }
```

Selects '.ledger-edit-notes'; declarations on this line style matching Timekeeper elements. grid-column places an item across specified grid columns; value '1 / -1' sets places an item across specified grid columns to 1 / -1.

### Line 77

```text
.ledger-edit-fields :disabled { color: var(--muted); background: var(--surface-muted); }
```

Selects '.ledger-edit-fields :disabled'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value.

### Line 78

```text
.ledger-edit-error { margin: 0; color: var(--red); font-size: 12px; }
```

Selects '.ledger-edit-error'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value. font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 79

```text
.ledger-edit-error:empty { display: none; }
```

Selects '.ledger-edit-error:empty'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'none' removes the element from layout.

### Line 80

```text
.ledger-edit-actions { display: flex; justify-content: flex-end; gap: 9px; padding-top: 14px; border-top: 1px solid var(--border-soft); }
```

Selects '.ledger-edit-actions'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. justify-content aligns children along the main axis; value 'flex-end' sets aligns children along the main axis to flex-end. gap sets spacing between flex/grid children; value '9px' sets the sets spacing between flex/grid children to 9px. padding-top adds inside space above content; value '14px' sets the adds inside space above content to 14px. border-top sets the top border; value '1px solid var(--border-soft)' sets sets the top border to 1px solid var(--border-soft).

### Line 81

```text
.ledger-edit-actions button { min-height: 40px; padding: 0 16px; font-size: 12px; font-weight: 700; }
```

Selects '.ledger-edit-actions button'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '40px' sets the sets the smallest allowed control/region height to 40px. padding sets inside spacing between border and content; value '0 16px' sets the sets inside spacing between border and content to 0 16px. font-size sets text size; value '12px' sets the sets text size to 12px. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 82

```text
.ledger-cancel-btn { color: var(--ink); background: var(--surface-muted); }
```

Selects '.ledger-cancel-btn'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value.

### Line 83

```text
.ledger-cancel-btn:hover { background: var(--surface-hover); }
```

Selects '.ledger-cancel-btn:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--surface-hover)' uses theme custom property var(--surface-hover), so the shared design token controls this value.

### Line 84

```text
.ledger-save-btn { color: #fff; background: var(--green); }
```

Selects '.ledger-save-btn'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value '#fff' uses explicit color #fff. background sets the full background paint; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value.

### Line 85

```text
.ledger-save-btn:hover { background: var(--green-deep); }
```

Selects '.ledger-save-btn:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value.

### Line 86

```text
.ledger-edit-actions button:disabled { opacity: .6; cursor: wait; }
```

Selects '.ledger-edit-actions button:disabled'; declarations on this line style matching Timekeeper elements. opacity makes the element and its contents translucent; value '.6' sets makes the element and its contents translucent to .6. cursor chooses pointer cursor presentation; value 'wait' sets chooses pointer cursor presentation to wait.

### Line 87

```text

```

Blank line separates related rules for readability.

### Line 88

```text
@media (max-width: 760px) {
```

Begins a responsive media query: the nested overrides apply when (max-width: 760px) {.

### Line 89

```text
  .ledger-heading { align-items: stretch; flex-direction: column; }
```

Selects '.ledger-heading'; declarations on this line style matching Timekeeper elements. align-items aligns children across the cross axis; value 'stretch' sets aligns children across the cross axis to stretch. flex-direction sets the main-axis direction for flex children; value 'column' stacks children vertically.

### Line 90

```text
  .ledger-filter { min-width: 0; }
```

Selects '.ledger-filter'; declarations on this line style matching Timekeeper elements. min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 91

```text
  #ledger-form { grid-template-columns: repeat(2, minmax(0, 1fr)); }
```

Selects '#ledger-form'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value 'repeat(2, minmax(0, 1fr))' creates a responsive track with a minimum and flexible maximum size.

### Line 92

```text
}
```

Closes the current CSS rule or media-query block.

### Line 93

```text
@media (max-width: 480px) {
```

Begins a responsive media query: the nested overrides apply when (max-width: 480px) {.

### Line 94

```text
  #ledger-form { grid-template-columns: 1fr; }
```

Selects '#ledger-form'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value '1fr' sets the defines grid tracks and their widths to 1fr.

### Line 95

```text
  #shift-ledger-form { grid-template-columns: 1fr; }
```

Selects '#shift-ledger-form'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value '1fr' sets the defines grid tracks and their widths to 1fr.

### Line 96

```text
  .ledger-edit-modal { width: calc(100% - 16px); max-height: calc(100dvh - 16px); border-radius: 14px; }
```

Selects '.ledger-edit-modal'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value 'calc(100% - 16px)' sets sets horizontal size to calc(100% - 16px). max-height caps vertical size; value 'calc(100dvh - 16px)' sets caps vertical size to calc(100dvh - 16px). border-radius rounds box corners; value '14px' sets the rounds box corners to 14px.

### Line 97

```text
  .ledger-edit-form { gap: 16px; padding: 20px 16px; }
```

Selects '.ledger-edit-form'; declarations on this line style matching Timekeeper elements. gap sets spacing between flex/grid children; value '16px' sets the sets spacing between flex/grid children to 16px. padding sets inside spacing between border and content; value '20px 16px' sets the sets inside spacing between border and content to 20px 16px.

### Line 98

```text
  .ledger-edit-fields { grid-template-columns: 1fr; gap: 12px; }
```

Selects '.ledger-edit-fields'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value '1fr' sets the defines grid tracks and their widths to 1fr. gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px.

### Line 99

```text
  .ledger-edit-notes { grid-column: auto; }
```

Selects '.ledger-edit-notes'; declarations on this line style matching Timekeeper elements. grid-column places an item across specified grid columns; value 'auto' sets places an item across specified grid columns to auto.

### Line 100

```text
  .ledger-edit-actions button { flex: 1; }
```

Selects '.ledger-edit-actions button'; declarations on this line style matching Timekeeper elements. flex controls this CSS property; value '1' sets flex to 1.

### Line 101

```text
}
```

Closes the current CSS rule or media-query block.

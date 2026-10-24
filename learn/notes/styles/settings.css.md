# styles/settings.css

[Exact copy](../../original/styles/settings.css)

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
.settings-body { min-height: 100%; padding: clamp(18px, 4vw, 38px); }
```

Selects '.settings-body'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '100%' sets the sets the smallest allowed control/region height to 100%. padding sets inside spacing between border and content; value 'clamp(18px, 4vw, 38px)' uses a responsive clamped value that grows/shrinks within the given minimum and maximum.

### Line 4

```text
.settings-page { width: min(100%, 760px); margin: 0 auto; }
```

Selects '.settings-page'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value 'min(100%, 760px)' sets sets horizontal size to min(100%, 760px). margin sets outside spacing around the box; value '0 auto' sets sets outside spacing around the box to 0 auto.

### Line 5

```text
.settings-intro { margin-bottom: 22px; }
```

Selects '.settings-intro'; declarations on this line style matching Timekeeper elements. margin-bottom adds outside space below the element; value '22px' sets the adds outside space below the element to 22px.

### Line 6

```text
.settings-eyebrow { margin: 0 0 5px; color: var(--green); font-size: 10px; font-weight: 750; letter-spacing: .14em; }
```

Selects '.settings-eyebrow'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 5px' sets the sets outside spacing around the box to 0 0 5px. color sets foreground text/icon color; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '750' sets sets text stroke emphasis to 750. letter-spacing adjusts spacing between glyphs; value '.14em' sets the adjusts spacing between glyphs to .14em.

### Line 7

```text
.settings-intro h1 { margin: 0 0 5px; font-size: clamp(26px, 4vw, 34px); line-height: 1.15; }
```

Selects '.settings-intro h1'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 5px' sets the sets outside spacing around the box to 0 0 5px. font-size sets text size; value 'clamp(26px, 4vw, 34px)' uses a responsive clamped value that grows/shrinks within the given minimum and maximum. line-height sets line box height and text rhythm; value '1.15' sets sets line box height and text rhythm to 1.15.

### Line 8

```text
.settings-intro > p:last-child { max-width: 560px; margin: 0; color: var(--muted); font-size: 14px; line-height: 1.6; }
```

Selects '.settings-intro > p:last-child'; declarations on this line style matching Timekeeper elements. max-width caps horizontal size; value '560px' sets the caps horizontal size to 560px. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '14px' sets the sets text size to 14px. line-height sets line box height and text rhythm; value '1.6' sets sets line box height and text rhythm to 1.6.

### Line 9

```text
.settings-card { margin-bottom: 14px; padding: clamp(17px, 3vw, 23px); background: var(--surface); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow-soft); }
```

Selects '.settings-card'; declarations on this line style matching Timekeeper elements. margin-bottom adds outside space below the element; value '14px' sets the adds outside space below the element to 14px. padding sets inside spacing between border and content; value 'clamp(17px, 3vw, 23px)' uses a responsive clamped value that grows/shrinks within the given minimum and maximum. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '16px' sets the rounds box corners to 16px. box-shadow draws depth/shadow around a component; value 'var(--shadow-soft)' uses theme custom property var(--shadow-soft), so the shared design token controls this value.

### Line 10

```text
.settings-card-heading { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 18px; }
```

Selects '.settings-card-heading'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'flex-start' sets aligns children across the cross axis to flex-start. gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px. margin-bottom adds outside space below the element; value '18px' sets the adds outside space below the element to 18px.

### Line 11

```text
.settings-icon { display: grid; place-items: center; width: 40px; height: 40px; flex: 0 0 40px; color: var(--green); background: var(--green-soft); border-radius: 12px; font-size: 21px; }
```

Selects '.settings-icon'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. place-items sets both grid alignment axes; value 'center' sets sets both grid alignment axes to center. width sets horizontal size; value '40px' sets the sets horizontal size to 40px. height sets vertical size; value '40px' sets the sets vertical size to 40px. flex controls this CSS property; value '0 0 40px' sets the flex to 0 0 40px. color sets foreground text/icon color; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value. border-radius rounds box corners; value '12px' sets the rounds box corners to 12px. font-size sets text size; value '21px' sets the sets text size to 21px.

### Line 12

```text
.settings-icon-type { font-size: 15px; font-weight: 800; }
```

Selects '.settings-icon-type'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '15px' sets the sets text size to 15px. font-weight sets text stroke emphasis; value '800' sets sets text stroke emphasis to 800.

### Line 13

```text
.settings-card-heading h2 { margin: 0 0 3px; font-size: 17px; }
```

Selects '.settings-card-heading h2'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 3px' sets the sets outside spacing around the box to 0 0 3px. font-size sets text size; value '17px' sets the sets text size to 17px.

### Line 14

```text
.settings-card-heading p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.5; }
```

Selects '.settings-card-heading p'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '12px' sets the sets text size to 12px. line-height sets line box height and text rhythm; value '1.5' sets sets line box height and text rhythm to 1.5.

### Line 15

```text
.settings-field { display: grid; max-width: 360px; gap: 6px; color: var(--ink-soft); font-size: 12px; font-weight: 700; }
```

Selects '.settings-field'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. max-width caps horizontal size; value '360px' sets the caps horizontal size to 360px. gap sets spacing between flex/grid children; value '6px' sets the sets spacing between flex/grid children to 6px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-size sets text size; value '12px' sets the sets text size to 12px. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 16

```text
.settings-field select { min-height: 43px; padding: 8px 11px; font-size: 14px; }
```

Selects '.settings-field select'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '43px' sets the sets the smallest allowed control/region height to 43px. padding sets inside spacing between border and content; value '8px 11px' sets the sets inside spacing between border and content to 8px 11px. font-size sets text size; value '14px' sets the sets text size to 14px.

### Line 17

```text
.size-options { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin: 0; padding: 0; border: 0; }
```

Selects '.size-options'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-columns defines grid tracks and their widths; value 'repeat(4, minmax(0, 1fr))' creates a responsive track with a minimum and flexible maximum size. gap sets spacing between flex/grid children; value '10px' sets the sets spacing between flex/grid children to 10px. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. padding sets inside spacing between border and content; value '0' sets sets inside spacing between border and content to 0. border sets border width/style/color; value '0' sets sets border width/style/color to 0.

### Line 18

```text
.size-options legend { margin-bottom: 8px; color: var(--ink-soft); font-size: 12px; font-weight: 700; }
```

Selects '.size-options legend'; declarations on this line style matching Timekeeper elements. margin-bottom adds outside space below the element; value '8px' sets the adds outside space below the element to 8px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-size sets text size; value '12px' sets the sets text size to 12px. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 19

```text
.size-option { display: flex; align-items: center; gap: 9px; min-height: 58px; padding: 10px 12px; color: var(--ink-soft); background: var(--surface-muted); border: 1px solid var(--border); border-radius: 12px; cursor: pointer; transition: border-color 160ms ease, background-color 160ms ease; }
```

Selects '.size-option'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. gap sets spacing between flex/grid children; value '9px' sets the sets spacing between flex/grid children to 9px. min-height sets the smallest allowed control/region height; value '58px' sets the sets the smallest allowed control/region height to 58px. padding sets inside spacing between border and content; value '10px 12px' sets the sets inside spacing between border and content to 10px 12px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '12px' sets the rounds box corners to 12px. cursor chooses pointer cursor presentation; value 'pointer' sets chooses pointer cursor presentation to pointer. transition controls this CSS property; value 'border-color 160ms ease, background-color 160ms ease' sets transition to border-color 160ms ease, background-color 160ms ease.

### Line 20

```text
.size-option:has(input:checked) { background: var(--green-soft); border-color: var(--green-line); }
```

Selects '.size-option:has(input:checked)'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value. border-color controls this CSS property; value 'var(--green-line)' uses theme custom property var(--green-line), so the shared design token controls this value.

### Line 21

```text
.size-option input { width: 17px; height: 17px; flex: 0 0 17px; accent-color: var(--green); }
```

Selects '.size-option input'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '17px' sets the sets horizontal size to 17px. height sets vertical size; value '17px' sets the sets vertical size to 17px. flex controls this CSS property; value '0 0 17px' sets the flex to 0 0 17px. accent-color colors native checkbox/radio accents; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value.

### Line 22

```text
.size-option-copy { display: grid; gap: 1px; }
```

Selects '.size-option-copy'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. gap sets spacing between flex/grid children; value '1px' sets the sets spacing between flex/grid children to 1px.

### Line 23

```text
.size-option-copy strong { font-size: 12px; }
```

Selects '.size-option-copy strong'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 24

```text
.size-option-copy small { color: var(--muted); font-size: 10px; }
```

Selects '.size-option-copy small'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 25

```text
.settings-help { margin: 12px 0 0; color: var(--muted); font-size: 11px; line-height: 1.5; }
```

Selects '.settings-help'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '12px 0 0' sets sets outside spacing around the box to 12px 0 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px. line-height sets line box height and text rhythm; value '1.5' sets sets line box height and text rhythm to 1.5.

### Line 26

```text
.backup-button { min-height: 40px; padding: 0 14px; color: #fff; background: var(--green); font-size: 12px; font-weight: 750; }
```

Selects '.backup-button'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '40px' sets the sets the smallest allowed control/region height to 40px. padding sets inside spacing between border and content; value '0 14px' sets the sets inside spacing between border and content to 0 14px. color sets foreground text/icon color; value '#fff' uses explicit color #fff. background sets the full background paint; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. font-size sets text size; value '12px' sets the sets text size to 12px. font-weight sets text stroke emphasis; value '750' sets sets text stroke emphasis to 750.

### Line 27

```text
.backup-button:hover { background: var(--green-deep); }
```

Selects '.backup-button:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value.

### Line 28

```text
.backup-file-field { margin-top: 17px; }
```

Selects '.backup-file-field'; declarations on this line style matching Timekeeper elements. margin-top adds outside space above the element; value '17px' sets the adds outside space above the element to 17px.

### Line 29

```text
.backup-file-field input { min-height: 42px; padding: 8px; }
```

Selects '.backup-file-field input'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '42px' sets the sets the smallest allowed control/region height to 42px. padding sets inside spacing between border and content; value '8px' sets the sets inside spacing between border and content to 8px.

### Line 30

```text
.backup-preview { margin-top: 12px; padding: 12px; color: var(--ink-soft); background: var(--surface-muted); border: 1px solid var(--border); border-radius: 10px; font-size: 12px; line-height: 1.55; white-space: pre-wrap; }
```

Selects '.backup-preview'; declarations on this line style matching Timekeeper elements. margin-top adds outside space above the element; value '12px' sets the adds outside space above the element to 12px. padding sets inside spacing between border and content; value '12px' sets the sets inside spacing between border and content to 12px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '10px' sets the rounds box corners to 10px. font-size sets text size; value '12px' sets the sets text size to 12px. line-height sets line box height and text rhythm; value '1.55' sets sets line box height and text rhythm to 1.55. white-space controls wrapping of whitespace/text; value 'pre-wrap' sets controls wrapping of whitespace/text to pre-wrap.

### Line 31

```text
.settings-warning { margin: 12px 0; padding: 10px 12px; color: var(--amber); background: var(--amber-soft); border-radius: 9px; font-size: 11px; font-weight: 650; line-height: 1.5; }
```

Selects '.settings-warning'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '12px 0' sets sets outside spacing around the box to 12px 0. padding sets inside spacing between border and content; value '10px 12px' sets the sets inside spacing between border and content to 10px 12px. color sets foreground text/icon color; value 'var(--amber)' uses theme custom property var(--amber), so the shared design token controls this value. background sets the full background paint; value 'var(--amber-soft)' uses theme custom property var(--amber-soft), so the shared design token controls this value. border-radius rounds box corners; value '9px' sets the rounds box corners to 9px. font-size sets text size; value '11px' sets the sets text size to 11px. font-weight sets text stroke emphasis; value '650' semibold emphasis. line-height sets line box height and text rhythm; value '1.5' sets sets line box height and text rhythm to 1.5.

### Line 32

```text
.backup-restore-button { background: var(--red); }
```

Selects '.backup-restore-button'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value.

### Line 33

```text
.backup-restore-button:hover { background: #8f302b; }
```

Selects '.backup-restore-button:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value '#8f302b' uses explicit color #8f302b.

### Line 34

```text
.backup-restore-button:disabled { background: var(--muted); }
```

Selects '.backup-restore-button:disabled'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value.

### Line 35

```text

```

Blank line separates related rules for readability.

### Line 36

```text
@media (max-width: 480px) {
```

Begins a responsive media query: the nested overrides apply when (max-width: 480px) {.

### Line 37

```text
  .settings-body { padding: 17px 13px; }
```

Selects '.settings-body'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '17px 13px' sets the sets inside spacing between border and content to 17px 13px.

### Line 38

```text
  .size-options { grid-template-columns: 1fr; gap: 7px; }
```

Selects '.size-options'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value '1fr' sets the defines grid tracks and their widths to 1fr. gap sets spacing between flex/grid children; value '7px' sets the sets spacing between flex/grid children to 7px.

### Line 39

```text
  .size-option { min-height: 51px; }
```

Selects '.size-option'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '51px' sets the sets the smallest allowed control/region height to 51px.

### Line 40

```text
}
```

Closes the current CSS rule or media-query block.

# styles/style.css

[Exact copy](../../original/styles/style.css)

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
html, body { width: 100%; height: 100%; }
```

Selects 'html, body'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '100%' sets the sets horizontal size to 100%. height sets vertical size; value '100%' sets the sets vertical size to 100%.

### Line 4

```text
body.app-body { min-height: 100%; overflow: hidden; }
```

Selects 'body.app-body'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '100%' sets the sets the smallest allowed control/region height to 100%. overflow controls content that exceeds the box, such as scrolling or clipping; value 'hidden' clips content outside the box.

### Line 5

```text
body.app-body.keyboard-open { height: var(--app-visible-height, 100vh); min-height: 0; overflow: hidden; }
```

Selects 'body.app-body.keyboard-open'; declarations on this line style matching Timekeeper elements. height sets vertical size; value 'var(--app-visible-height, 100vh)' uses theme custom property var(--app-visible-height, 100vh), so the shared design token controls this value. min-height sets the smallest allowed control/region height; value '0' sets sets the smallest allowed control/region height to 0. overflow controls content that exceeds the box, such as scrolling or clipping; value 'hidden' clips content outside the box.

### Line 6

```text

```

Blank line separates related rules for readability.

### Line 7

```text
.app-shell {
```

Selects '.app-shell'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 8

```text
  display: grid;
```

For selector '.app-shell', display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement.

### Line 9

```text
  grid-template-columns: minmax(0, 1fr);
```

For selector '.app-shell', grid-template-columns defines grid tracks and their widths; value 'minmax(0, 1fr)' creates a responsive track with a minimum and flexible maximum size.

### Line 10

```text
  grid-template-rows: auto minmax(0, 1fr);
```

For selector '.app-shell', grid-template-rows defines grid row tracks; value 'auto minmax(0, 1fr)' creates a responsive track with a minimum and flexible maximum size.

### Line 11

```text
  gap: 16px;
```

For selector '.app-shell', gap sets spacing between flex/grid children; value '16px' sets the sets spacing between flex/grid children to 16px.

### Line 12

```text
  width: 100%;
```

For selector '.app-shell', width sets horizontal size; value '100%' sets the sets horizontal size to 100%.

### Line 13

```text
  height: 100vh;
```

For selector '.app-shell', height sets vertical size; value '100vh' sets sets vertical size to 100vh.

### Line 14

```text
  height: 100dvh;
```

For selector '.app-shell', height sets vertical size; value '100dvh' sets sets vertical size to 100dvh.

### Line 15

```text
  min-height: 0;
```

For selector '.app-shell', min-height sets the smallest allowed control/region height; value '0' sets sets the smallest allowed control/region height to 0.

### Line 16

```text
  padding: 16px;
```

For selector '.app-shell', padding sets inside spacing between border and content; value '16px' sets the sets inside spacing between border and content to 16px.

### Line 17

```text
  background: var(--canvas);
```

For selector '.app-shell', background sets the full background paint; value 'var(--canvas)' uses theme custom property var(--canvas), so the shared design token controls this value.

### Line 18

```text
}
```

Closes the current CSS rule or media-query block.

### Line 19

```text

```

Blank line separates related rules for readability.

### Line 20

```text
.sidebar {
```

Selects '.sidebar'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 21

```text
  position: relative;
```

For selector '.sidebar', position chooses the positioning scheme relative to normal flow; value 'relative' sets chooses the positioning scheme relative to normal flow to relative.

### Line 22

```text
  z-index: 10;
```

For selector '.sidebar', z-index controls stacking order of positioned elements; value '10' sets controls stacking order of positioned elements to 10.

### Line 23

```text
  display: flex;
```

For selector '.sidebar', display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment.

### Line 24

```text
  align-items: center;
```

For selector '.sidebar', align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center.

### Line 25

```text
  justify-content: space-between;
```

For selector '.sidebar', justify-content aligns children along the main axis; value 'space-between' sets aligns children along the main axis to space-between.

### Line 26

```text
  gap: 16px;
```

For selector '.sidebar', gap sets spacing between flex/grid children; value '16px' sets the sets spacing between flex/grid children to 16px.

### Line 27

```text
  min-width: 0;
```

For selector '.sidebar', min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 28

```text
  padding: 4px 10px;
```

For selector '.sidebar', padding sets inside spacing between border and content; value '4px 10px' sets the sets inside spacing between border and content to 4px 10px.

### Line 29

```text
  background: var(--surface);
```

For selector '.sidebar', background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value.

### Line 30

```text
  border: 1px solid var(--border);
```

For selector '.sidebar', border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 31

```text
  border-radius: 16px;
```

For selector '.sidebar', border-radius rounds box corners; value '16px' sets the rounds box corners to 16px.

### Line 32

```text
  box-shadow: var(--shadow-soft);
```

For selector '.sidebar', box-shadow draws depth/shadow around a component; value 'var(--shadow-soft)' uses theme custom property var(--shadow-soft), so the shared design token controls this value.

### Line 33

```text
}
```

Closes the current CSS rule or media-query block.

### Line 34

```text
.nav-picker-toggle {
```

Selects '.nav-picker-toggle'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 35

```text
  display: flex;
```

For selector '.nav-picker-toggle', display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment.

### Line 36

```text
  align-items: center;
```

For selector '.nav-picker-toggle', align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center.

### Line 37

```text
  gap: 10px;
```

For selector '.nav-picker-toggle', gap sets spacing between flex/grid children; value '10px' sets the sets spacing between flex/grid children to 10px.

### Line 38

```text
  min-width: 170px;
```

For selector '.nav-picker-toggle', min-width sets the smallest allowed horizontal size; value '170px' sets the sets the smallest allowed horizontal size to 170px.

### Line 39

```text
  max-width: 50%;
```

For selector '.nav-picker-toggle', max-width caps horizontal size; value '50%' sets the caps horizontal size to 50%.

### Line 40

```text
  min-height: 48px;
```

For selector '.nav-picker-toggle', min-height sets the smallest allowed control/region height; value '48px' sets the sets the smallest allowed control/region height to 48px.

### Line 41

```text
  padding: 6px 12px;
```

For selector '.nav-picker-toggle', padding sets inside spacing between border and content; value '6px 12px' sets the sets inside spacing between border and content to 6px 12px.

### Line 42

```text
  color: var(--ink-soft);
```

For selector '.nav-picker-toggle', color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value.

### Line 43

```text
  background: var(--surface);
```

For selector '.nav-picker-toggle', background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value.

### Line 44

```text
  border: 1px solid var(--border);
```

For selector '.nav-picker-toggle', border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 45

```text
  border-radius: 11px;
```

For selector '.nav-picker-toggle', border-radius rounds box corners; value '11px' sets the rounds box corners to 11px.

### Line 46

```text
  text-align: left;
```

For selector '.nav-picker-toggle', text-align aligns inline text; value 'left' aligns content to the left.

### Line 47

```text
  cursor: pointer;
```

For selector '.nav-picker-toggle', cursor chooses pointer cursor presentation; value 'pointer' sets chooses pointer cursor presentation to pointer.

### Line 48

```text
}
```

Closes the current CSS rule or media-query block.

### Line 49

```text
.nav-picker-toggle:hover, .nav-picker-toggle[aria-expanded="true"] { background: var(--green-soft); color: var(--green-deep); }
```

Selects '.nav-picker-toggle:hover, .nav-picker-toggle[aria-expanded="true"]'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value.

### Line 50

```text
.nav-picker-toggle > svg { width: 18px; height: 18px; flex: 0 0 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; }
```

Selects '.nav-picker-toggle > svg'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '18px' sets the sets horizontal size to 18px. height sets vertical size; value '18px' sets the sets vertical size to 18px. flex controls this CSS property; value '0 0 18px' sets the flex to 0 0 18px. fill controls this CSS property; value 'none' sets fill to none. stroke controls this CSS property; value 'currentColor' sets stroke to currentColor. stroke-width controls this CSS property; value '1.8' sets stroke-width to 1.8. stroke-linecap controls this CSS property; value 'round' sets stroke-linecap to round.

### Line 51

```text
.nav-picker-copy { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
```

Selects '.nav-picker-copy'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. flex-direction sets the main-axis direction for flex children; value 'column' stacks children vertically. gap sets spacing between flex/grid children; value '2px' sets the sets spacing between flex/grid children to 2px. min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 52

```text
.nav-picker-caption { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; }
```

Selects '.nav-picker-caption'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '9px' sets the sets text size to 9px. font-weight sets text stroke emphasis; value '700' bold emphasis. text-transform changes displayed letter casing; value 'uppercase' sets changes displayed letter casing to uppercase. letter-spacing adjusts spacing between glyphs; value '.08em' sets the adjusts spacing between glyphs to .08em.

### Line 53

```text
.nav-picker-label { font-size: 12px; font-weight: 700; overflow-wrap: anywhere; }
```

Selects '.nav-picker-label'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '12px' sets the sets text size to 12px. font-weight sets text stroke emphasis; value '700' bold emphasis. overflow-wrap controls this CSS property; value 'anywhere' sets overflow-wrap to anywhere.

### Line 54

```text
.nav-picker-chevron { margin-left: auto; }
```

Selects '.nav-picker-chevron'; declarations on this line style matching Timekeeper elements. margin-left adds outside space to the left; value 'auto' sets adds outside space to the left to auto.

### Line 55

```text
.nav-picker-toggle[aria-expanded="true"] .nav-picker-chevron { transform: rotate(180deg); }
```

Selects '.nav-picker-toggle[aria-expanded="true"] .nav-picker-chevron'; declarations on this line style matching Timekeeper elements. transform controls this CSS property; value 'rotate(180deg)' sets transform to rotate(180deg).

### Line 56

```text

```

Blank line separates related rules for readability.

### Line 57

```text
.brand {
```

Selects '.brand'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 58

```text
  display: flex;
```

For selector '.brand', display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment.

### Line 59

```text
  align-items: center;
```

For selector '.brand', align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center.

### Line 60

```text
  gap: 11px;
```

For selector '.brand', gap sets spacing between flex/grid children; value '11px' sets the sets spacing between flex/grid children to 11px.

### Line 61

```text
  min-height: 58px;
```

For selector '.brand', min-height sets the smallest allowed control/region height; value '58px' sets the sets the smallest allowed control/region height to 58px.

### Line 62

```text
  flex: 0 1 auto;
```

For selector '.brand', flex controls this CSS property; value '0 1 auto' sets flex to 0 1 auto.

### Line 63

```text
  min-width: 0;
```

For selector '.brand', min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 64

```text
  padding: 2px 7px;
```

For selector '.brand', padding sets inside spacing between border and content; value '2px 7px' sets the sets inside spacing between border and content to 2px 7px.

### Line 65

```text
  color: inherit;
```

For selector '.brand', color sets foreground text/icon color; value 'inherit' sets sets foreground text/icon color to inherit.

### Line 66

```text
  text-decoration: none;
```

For selector '.brand', text-decoration adds/removes underlines or other decoration; value 'none' sets adds/removes underlines or other decoration to none.

### Line 67

```text
}
```

Closes the current CSS rule or media-query block.

### Line 68

```text

```

Blank line separates related rules for readability.

### Line 69

```text
.brand-mark {
```

Selects '.brand-mark'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 70

```text
  display: grid;
```

For selector '.brand-mark', display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement.

### Line 71

```text
  place-items: center;
```

For selector '.brand-mark', place-items sets both grid alignment axes; value 'center' sets sets both grid alignment axes to center.

### Line 72

```text
  width: 42px;
```

For selector '.brand-mark', width sets horizontal size; value '42px' sets the sets horizontal size to 42px.

### Line 73

```text
  height: 42px;
```

For selector '.brand-mark', height sets vertical size; value '42px' sets the sets vertical size to 42px.

### Line 74

```text
  flex: 0 0 42px;
```

For selector '.brand-mark', flex controls this CSS property; value '0 0 42px' sets the flex to 0 0 42px.

### Line 75

```text
  overflow: hidden;
```

For selector '.brand-mark', overflow controls content that exceeds the box, such as scrolling or clipping; value 'hidden' clips content outside the box.

### Line 76

```text
  background: #13261c;
```

For selector '.brand-mark', background sets the full background paint; value '#13261c' uses explicit color #13261c.

### Line 77

```text
  border: 1px solid var(--border);
```

For selector '.brand-mark', border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 78

```text
  border-radius: 14px;
```

For selector '.brand-mark', border-radius rounds box corners; value '14px' sets the rounds box corners to 14px.

### Line 79

```text
}
```

Closes the current CSS rule or media-query block.

### Line 80

```text
.brand-mark img { display: block; width: 100%; height: 100%; object-fit: cover; }
```

Selects '.brand-mark img'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'block' takes a full available line. width sets horizontal size; value '100%' sets the sets horizontal size to 100%. height sets vertical size; value '100%' sets the sets vertical size to 100%. object-fit controls how replaced media fits its box; value 'cover' sets controls how replaced media fits its box to cover.

### Line 81

```text
.brand-copy {display: flex; flex-direction: column; gap: 1px; }
```

Selects '.brand-copy'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. flex-direction sets the main-axis direction for flex children; value 'column' stacks children vertically. gap sets spacing between flex/grid children; value '1px' sets the sets spacing between flex/grid children to 1px.

### Line 82

```text
.brand-copy strong { font-family: 'Sapoe', sans-serif; /*font-size: 14px; letter-spacing: -0.025em;*/ }
```

Selects '.brand-copy strong'; declarations on this line style matching Timekeeper elements. font-family selects the typeface stack; value "'Sapoe', sans-serif" sets selects the typeface stack to 'Sapoe', sans-serif. /*font-size controls this CSS property; value '14px' sets the /*font-size to 14px. letter-spacing adjusts spacing between glyphs; value '-0.025em' sets the adjusts spacing between glyphs to -0.025em.

### Line 83

```text
.brand-copy small { color: var(--muted); font-size: 11px; }
```

Selects '.brand-copy small'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 84

```text

```

Blank line separates related rules for readability.

### Line 85

```text
.sidebar-nav {
```

Selects '.sidebar-nav'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 86

```text
  position: absolute;
```

For selector '.sidebar-nav', position chooses the positioning scheme relative to normal flow; value 'absolute' positions it against the nearest positioned ancestor.

### Line 87

```text
  top: calc(100% + 8px);
```

For selector '.sidebar-nav', top offsets a positioned element from the top edge; value 'calc(100% + 8px)' sets offsets a positioned element from the top edge to calc(100% + 8px).

### Line 88

```text
  right: 0;
```

For selector '.sidebar-nav', right offsets a positioned element from the right edge; value '0' sets offsets a positioned element from the right edge to 0.

### Line 89

```text
  display: flex;
```

For selector '.sidebar-nav', display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment.

### Line 90

```text
  flex-direction: column;
```

For selector '.sidebar-nav', flex-direction sets the main-axis direction for flex children; value 'column' stacks children vertically.

### Line 91

```text
  gap: 6px;
```

For selector '.sidebar-nav', gap sets spacing between flex/grid children; value '6px' sets the sets spacing between flex/grid children to 6px.

### Line 92

```text
  width: min(360px, 100%);
```

For selector '.sidebar-nav', width sets horizontal size; value 'min(360px, 100%)' sets sets horizontal size to min(360px, 100%).

### Line 93

```text
  max-height: min(70dvh, 620px);
```

For selector '.sidebar-nav', max-height caps vertical size; value 'min(70dvh, 620px)' sets caps vertical size to min(70dvh, 620px).

### Line 94

```text
  overflow-y: auto;
```

For selector '.sidebar-nav', overflow-y controls vertical overflow; value 'auto' sets controls vertical overflow to auto.

### Line 95

```text
  overscroll-behavior: contain;
```

For selector '.sidebar-nav', overscroll-behavior controls this CSS property; value 'contain' sets overscroll-behavior to contain.

### Line 96

```text
  padding: 10px;
```

For selector '.sidebar-nav', padding sets inside spacing between border and content; value '10px' sets the sets inside spacing between border and content to 10px.

### Line 97

```text
  background: var(--surface);
```

For selector '.sidebar-nav', background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value.

### Line 98

```text
  border: 1px solid var(--border);
```

For selector '.sidebar-nav', border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 99

```text
  border-radius: 16px;
```

For selector '.sidebar-nav', border-radius rounds box corners; value '16px' sets the rounds box corners to 16px.

### Line 100

```text
  box-shadow: var(--shadow-soft), 0 16px 40px rgba(0, 0, 0, .15);
```

For selector '.sidebar-nav', box-shadow draws depth/shadow around a component; value 'var(--shadow-soft), 0 16px 40px rgba(0, 0, 0, .15)' uses theme custom property var(--shadow-soft), 0 16px 40px rgba(0, 0, 0, .15), so the shared design token controls this value.

### Line 101

```text
}
```

Closes the current CSS rule or media-query block.

### Line 102

```text
.sidebar-nav[hidden] { display: none; }
```

Selects '.sidebar-nav[hidden]'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'none' removes the element from layout.

### Line 103

```text
.nav-group { min-width: 0; }
```

Selects '.nav-group'; declarations on this line style matching Timekeeper elements. min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 104

```text
.nav-group-heading { margin: 0; font-size: inherit; }
```

Selects '.nav-group-heading'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. font-size sets text size; value 'inherit' sets sets text size to inherit.

### Line 105

```text
.nav-group-toggle {
```

Selects '.nav-group-toggle'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 106

```text
  display: flex;
```

For selector '.nav-group-toggle', display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment.

### Line 107

```text
  align-items: center;
```

For selector '.nav-group-toggle', align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center.

### Line 108

```text
  justify-content: space-between;
```

For selector '.nav-group-toggle', justify-content aligns children along the main axis; value 'space-between' sets aligns children along the main axis to space-between.

### Line 109

```text
  gap: 8px;
```

For selector '.nav-group-toggle', gap sets spacing between flex/grid children; value '8px' sets the sets spacing between flex/grid children to 8px.

### Line 110

```text
  width: 100%;
```

For selector '.nav-group-toggle', width sets horizontal size; value '100%' sets the sets horizontal size to 100%.

### Line 111

```text
  min-height: 44px;
```

For selector '.nav-group-toggle', min-height sets the smallest allowed control/region height; value '44px' sets the sets the smallest allowed control/region height to 44px.

### Line 112

```text
  padding: 8px 11px;
```

For selector '.nav-group-toggle', padding sets inside spacing between border and content; value '8px 11px' sets the sets inside spacing between border and content to 8px 11px.

### Line 113

```text
  color: var(--ink-soft);
```

For selector '.nav-group-toggle', color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value.

### Line 114

```text
  background: transparent;
```

For selector '.nav-group-toggle', background sets the full background paint; value 'transparent' sets sets the full background paint to transparent.

### Line 115

```text
  border: 1px solid var(--border-soft);
```

For selector '.nav-group-toggle', border sets border width/style/color; value '1px solid var(--border-soft)' sets sets border width/style/color to 1px solid var(--border-soft).

### Line 116

```text
  border-radius: 11px;
```

For selector '.nav-group-toggle', border-radius rounds box corners; value '11px' sets the rounds box corners to 11px.

### Line 117

```text
  text-align: left;
```

For selector '.nav-group-toggle', text-align aligns inline text; value 'left' aligns content to the left.

### Line 118

```text
  font-size: 11px;
```

For selector '.nav-group-toggle', font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 119

```text
  font-weight: 750;
```

For selector '.nav-group-toggle', font-weight sets text stroke emphasis; value '750' sets sets text stroke emphasis to 750.

### Line 120

```text
  letter-spacing: .06em;
```

For selector '.nav-group-toggle', letter-spacing adjusts spacing between glyphs; value '.06em' sets the adjusts spacing between glyphs to .06em.

### Line 121

```text
  cursor: pointer;
```

For selector '.nav-group-toggle', cursor chooses pointer cursor presentation; value 'pointer' sets chooses pointer cursor presentation to pointer.

### Line 122

```text
}
```

Closes the current CSS rule or media-query block.

### Line 123

```text
.nav-group-toggle:hover { background: var(--surface-hover); }
```

Selects '.nav-group-toggle:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--surface-hover)' uses theme custom property var(--surface-hover), so the shared design token controls this value.

### Line 124

```text
.nav-group-toggle[data-current="true"] > span:first-child::after { content: ' · current'; color: var(--muted); font-size: 9px; letter-spacing: 0; }
```

Selects '.nav-group-toggle[data-current="true"] > span:first-child::after'; declarations on this line style matching Timekeeper elements. content supplies generated pseudo-element content; value "' · current'" sets supplies generated pseudo-element content to ' · current'. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '9px' sets the sets text size to 9px. letter-spacing adjusts spacing between glyphs; value '0' sets adjusts spacing between glyphs to 0.

### Line 125

```text
.nav-group-chevron { font-size: 21px; line-height: 1; }
```

Selects '.nav-group-chevron'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '21px' sets the sets text size to 21px. line-height sets line box height and text rhythm; value '1' sets sets line box height and text rhythm to 1.

### Line 126

```text
.nav-group-toggle[aria-expanded="true"] .nav-group-chevron { transform: rotate(90deg); }
```

Selects '.nav-group-toggle[aria-expanded="true"] .nav-group-chevron'; declarations on this line style matching Timekeeper elements. transform controls this CSS property; value 'rotate(90deg)' sets transform to rotate(90deg).

### Line 127

```text
.nav-group-pages { display: flex; flex-direction: column; gap: 4px; padding-top: 4px; }
```

Selects '.nav-group-pages'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. flex-direction sets the main-axis direction for flex children; value 'column' stacks children vertically. gap sets spacing between flex/grid children; value '4px' sets the sets spacing between flex/grid children to 4px. padding-top adds inside space above content; value '4px' sets the adds inside space above content to 4px.

### Line 128

```text
/* Explicitly override the panel's flex/grid display when collapsed. */
```

Comment records styling intent for maintainers; it has no visual effect.

### Line 129

```text
.nav-group-pages[hidden] { display: none; }
```

Selects '.nav-group-pages[hidden]'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'none' removes the element from layout.

### Line 130

```text
.nav-link {
```

Selects '.nav-link'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 131

```text
  display: flex;
```

For selector '.nav-link', display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment.

### Line 132

```text
  align-items: center;
```

For selector '.nav-link', align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center.

### Line 133

```text
  gap: 11px;
```

For selector '.nav-link', gap sets spacing between flex/grid children; value '11px' sets the sets spacing between flex/grid children to 11px.

### Line 134

```text
  width: 100%;
```

For selector '.nav-link', width sets horizontal size; value '100%' sets the sets horizontal size to 100%.

### Line 135

```text
  min-height: 42px;
```

For selector '.nav-link', min-height sets the smallest allowed control/region height; value '42px' sets the sets the smallest allowed control/region height to 42px.

### Line 136

```text
  padding: 0 11px;
```

For selector '.nav-link', padding sets inside spacing between border and content; value '0 11px' sets the sets inside spacing between border and content to 0 11px.

### Line 137

```text
  color: var(--ink-soft);
```

For selector '.nav-link', color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value.

### Line 138

```text
  text-align: left;
```

For selector '.nav-link', text-align aligns inline text; value 'left' aligns content to the left.

### Line 139

```text
  background: transparent;
```

For selector '.nav-link', background sets the full background paint; value 'transparent' sets sets the full background paint to transparent.

### Line 140

```text
  border-radius: 11px;
```

For selector '.nav-link', border-radius rounds box corners; value '11px' sets the rounds box corners to 11px.

### Line 141

```text
  font-size: 12px;
```

For selector '.nav-link', font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 142

```text
  font-weight: 560;
```

For selector '.nav-link', font-weight sets text stroke emphasis; value '560' sets sets text stroke emphasis to 560.

### Line 143

```text
}
```

Closes the current CSS rule or media-query block.

### Line 144

```text
.nav-link svg {
```

Selects '.nav-link svg'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 145

```text
  width: 17px;
```

For selector '.nav-link svg', width sets horizontal size; value '17px' sets the sets horizontal size to 17px.

### Line 146

```text
  height: 17px;
```

For selector '.nav-link svg', height sets vertical size; value '17px' sets the sets vertical size to 17px.

### Line 147

```text
  flex: 0 0 17px;
```

For selector '.nav-link svg', flex controls this CSS property; value '0 0 17px' sets the flex to 0 0 17px.

### Line 148

```text
  fill: none;
```

For selector '.nav-link svg', fill controls this CSS property; value 'none' sets fill to none.

### Line 149

```text
  stroke: currentColor;
```

For selector '.nav-link svg', stroke controls this CSS property; value 'currentColor' sets stroke to currentColor.

### Line 150

```text
  stroke-width: 1.7;
```

For selector '.nav-link svg', stroke-width controls this CSS property; value '1.7' sets stroke-width to 1.7.

### Line 151

```text
  stroke-linecap: round;
```

For selector '.nav-link svg', stroke-linecap controls this CSS property; value 'round' sets stroke-linecap to round.

### Line 152

```text
  stroke-linejoin: round;
```

For selector '.nav-link svg', stroke-linejoin controls this CSS property; value 'round' sets stroke-linejoin to round.

### Line 153

```text
}
```

Closes the current CSS rule or media-query block.

### Line 154

```text
.nav-link:hover { color: var(--green-deep); background: var(--green-soft); }
```

Selects '.nav-link:hover'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value.

### Line 155

```text
.nav-link[aria-current="page"] { color: var(--green-deep); background: var(--green-soft); font-weight: 700; }
```

Selects '.nav-link[aria-current="page"]'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value. font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 156

```text
.nav-link-primary { color: var(--green-deep); }
```

Selects '.nav-link-primary'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value.

### Line 157

```text
.nav-arrow { margin-left: auto; color: #86a895; font-size: 21px; line-height: 1; }
```

Selects '.nav-arrow'; declarations on this line style matching Timekeeper elements. margin-left adds outside space to the left; value 'auto' sets adds outside space to the left to auto. color sets foreground text/icon color; value '#86a895' uses explicit color #86a895. font-size sets text size; value '21px' sets the sets text size to 21px. line-height sets line box height and text rhythm; value '1' sets sets line box height and text rhythm to 1.

### Line 158

```text

```

Blank line separates related rules for readability.

### Line 159

```text

```

Blank line separates related rules for readability.

### Line 160

```text
.app-main { display: grid; grid-template-rows: auto minmax(0, 1fr) auto; min-width: 0; min-height: 0; }
```

Selects '.app-main'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-rows defines grid row tracks; value 'auto minmax(0, 1fr) auto' creates a responsive track with a minimum and flexible maximum size. min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0. min-height sets the smallest allowed control/region height; value '0' sets sets the smallest allowed control/region height to 0.

### Line 161

```text
.app-body.keyboard-open .app-shell { height: var(--app-visible-height, 100vh); min-height: 0; }
```

Selects '.app-body.keyboard-open .app-shell'; declarations on this line style matching Timekeeper elements. height sets vertical size; value 'var(--app-visible-height, 100vh)' uses theme custom property var(--app-visible-height, 100vh), so the shared design token controls this value. min-height sets the smallest allowed control/region height; value '0' sets sets the smallest allowed control/region height to 0.

### Line 162

```text
.topbar { display: flex; align-items: center; justify-content: space-between; gap: 18px; min-height: 70px; padding: 3px 7px 14px; }
```

Selects '.topbar'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. justify-content aligns children along the main axis; value 'space-between' sets aligns children along the main axis to space-between. gap sets spacing between flex/grid children; value '18px' sets the sets spacing between flex/grid children to 18px. min-height sets the smallest allowed control/region height; value '70px' sets the sets the smallest allowed control/region height to 70px. padding sets inside spacing between border and content; value '3px 7px 14px' sets the sets inside spacing between border and content to 3px 7px 14px.

### Line 163

```text
.topbar-eyebrow { margin: 0 0 4px; color: #86958d; font-size: 9px; font-weight: 730; letter-spacing: .14em; }
```

Selects '.topbar-eyebrow'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 4px' sets the sets outside spacing around the box to 0 0 4px. color sets foreground text/icon color; value '#86958d' uses explicit color #86958d. font-size sets text size; value '9px' sets the sets text size to 9px. font-weight sets text stroke emphasis; value '730' sets sets text stroke emphasis to 730. letter-spacing adjusts spacing between glyphs; value '.14em' sets the adjusts spacing between glyphs to .14em.

### Line 164

```text
.topbar-eyebrow span { margin: 0 5px; color: #bdc8c1; }
```

Selects '.topbar-eyebrow span'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 5px' sets the sets outside spacing around the box to 0 5px. color sets foreground text/icon color; value '#bdc8c1' uses explicit color #bdc8c1.

### Line 165

```text
.topbar h1 { margin: 0; font-size: 21px; line-height: 1.2; letter-spacing: -.045em; }
```

Selects '.topbar h1'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. font-size sets text size; value '21px' sets the sets text size to 21px. line-height sets line box height and text rhythm; value '1.2' sets sets line box height and text rhythm to 1.2. letter-spacing adjusts spacing between glyphs; value '-.045em' sets the adjusts spacing between glyphs to -.045em.

### Line 166

```text
.topbar-tools { display: flex; align-items: center; gap: 8px; }
```

Selects '.topbar-tools'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. gap sets spacing between flex/grid children; value '8px' sets the sets spacing between flex/grid children to 8px.

### Line 167

```text
.topbar-date { padding: 8px 12px; color: var(--ink-soft); background: var(--surface); border: 1px solid var(--border); border-radius: 999px; font-size: 11px; font-weight: 600; }
```

Selects '.topbar-date'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '8px 12px' sets the sets inside spacing between border and content to 8px 12px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '999px' sets the rounds box corners to 999px. font-size sets text size; value '11px' sets the sets text size to 11px. font-weight sets text stroke emphasis; value '600' semibold emphasis.

### Line 168

```text
.workspace-frame { min-width: 0; min-height: 0; overflow: hidden; background: var(--canvas); border: 1px solid var(--border); border-radius: 20px; box-shadow: var(--shadow-soft); }
```

Selects '.workspace-frame'; declarations on this line style matching Timekeeper elements. min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0. min-height sets the smallest allowed control/region height; value '0' sets sets the smallest allowed control/region height to 0. overflow controls content that exceeds the box, such as scrolling or clipping; value 'hidden' clips content outside the box. background sets the full background paint; value 'var(--canvas)' uses theme custom property var(--canvas), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border). border-radius rounds box corners; value '20px' sets the rounds box corners to 20px. box-shadow draws depth/shadow around a component; value 'var(--shadow-soft)' uses theme custom property var(--shadow-soft), so the shared design token controls this value.

### Line 169

```text
.workspace-frame iframe { display: block; width: 100%; height: 100%; min-height: 0; border: 0; background: var(--canvas); }
```

Selects '.workspace-frame iframe'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'block' takes a full available line. width sets horizontal size; value '100%' sets the sets horizontal size to 100%. height sets vertical size; value '100%' sets the sets vertical size to 100%. min-height sets the smallest allowed control/region height; value '0' sets sets the smallest allowed control/region height to 0. border sets border width/style/color; value '0' sets sets border width/style/color to 0. background sets the full background paint; value 'var(--canvas)' uses theme custom property var(--canvas), so the shared design token controls this value.

### Line 170

```text
/* Three footer columns keep the Android download centered on wide screens. */
```

Comment records styling intent for maintainers; it has no visual effect.

### Line 171

```text
.site-footer {
```

Selects '.site-footer'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 172

```text
  display: grid;
```

For selector '.site-footer', display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement.

### Line 173

```text
  /*grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);*/
```

Comment records styling intent for maintainers; it has no visual effect.

### Line 174

```text
  grid-template-columns:  auto auto auto;
```

For selector '.site-footer', grid-template-columns defines grid tracks and their widths; value 'auto auto auto' sets defines grid tracks and their widths to auto auto auto.

### Line 175

```text
  align-items: center;
```

For selector '.site-footer', align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center.

### Line 176

```text
  gap: 12px;
```

For selector '.site-footer', gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px.

### Line 177

```text
  padding: 9px 5px 0;
```

For selector '.site-footer', padding sets inside spacing between border and content; value '9px 5px 0' sets sets inside spacing between border and content to 9px 5px 0.

### Line 178

```text
  color: #8b9891;
```

For selector '.site-footer', color sets foreground text/icon color; value '#8b9891' uses explicit color #8b9891.

### Line 179

```text
  font-size: 9px;
```

For selector '.site-footer', font-size sets text size; value '9px' sets the sets text size to 9px.

### Line 180

```text
}
```

Closes the current CSS rule or media-query block.

### Line 181

```text
.site-footer-link { color: inherit; text-decoration: none; justify-self: start; }
```

Selects '.site-footer-link'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'inherit' sets sets foreground text/icon color to inherit. text-decoration adds/removes underlines or other decoration; value 'none' sets adds/removes underlines or other decoration to none. justify-self aligns this grid item within its grid area; value 'start' sets aligns this grid item within its grid area to start.

### Line 182

```text
.site-footer-app-link { color: inherit; text-decoration: none; justify-self: center; }
```

Selects '.site-footer-app-link'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'inherit' sets sets foreground text/icon color to inherit. text-decoration adds/removes underlines or other decoration; value 'none' sets adds/removes underlines or other decoration to none. justify-self aligns this grid item within its grid area; value 'center' sets aligns this grid item within its grid area to center.

### Line 183

```text
.site-footer-link:hover, .site-footer-link:focus-visible,
```

Continues the selector list with '.site-footer-link:hover, .site-footer-link:focus-visible'; this selector receives the same declarations as the following comma-separated selectors.

### Line 184

```text
.site-footer-app-link:hover, .site-footer-app-link:focus-visible { text-decoration: underline; }
```

Selects '.site-footer-app-link:hover, .site-footer-app-link:focus-visible'; declarations on this line style matching Timekeeper elements. text-decoration adds/removes underlines or other decoration; value 'underline' sets adds/removes underlines or other decoration to underline.

### Line 185

```text
.site-footer-meta { display: flex; align-items: center; justify-content: flex-end; gap: 10px; min-width: 0; }
```

Selects '.site-footer-meta'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. justify-content aligns children along the main axis; value 'flex-end' sets aligns children along the main axis to flex-end. gap sets spacing between flex/grid children; value '10px' sets the sets spacing between flex/grid children to 10px. min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 186

```text

```

Blank line separates related rules for readability.

### Line 187

```text
/* Home screen inside the workspace frame */
```

Comment records styling intent for maintainers; it has no visual effect.

### Line 188

```text
.home-body { display: grid; place-items: center; min-height: 100vh; padding: clamp(18px, 5vw, 52px); }
```

Selects '.home-body'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. place-items sets both grid alignment axes; value 'center' sets sets both grid alignment axes to center. min-height sets the smallest allowed control/region height; value '100vh' sets sets the smallest allowed control/region height to 100vh. padding sets inside spacing between border and content; value 'clamp(18px, 5vw, 52px)' uses a responsive clamped value that grows/shrinks within the given minimum and maximum.

### Line 189

```text
.home-card {
```

Selects '.home-card'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 190

```text
  position: relative;
```

For selector '.home-card', position chooses the positioning scheme relative to normal flow; value 'relative' sets chooses the positioning scheme relative to normal flow to relative.

### Line 191

```text
  width: min(100%, 760px);
```

For selector '.home-card', width sets horizontal size; value 'min(100%, 760px)' sets sets horizontal size to min(100%, 760px).

### Line 192

```text
  overflow: hidden;
```

For selector '.home-card', overflow controls content that exceeds the box, such as scrolling or clipping; value 'hidden' clips content outside the box.

### Line 193

```text
  padding: clamp(28px, 6vw, 60px);
```

For selector '.home-card', padding sets inside spacing between border and content; value 'clamp(28px, 6vw, 60px)' uses a responsive clamped value that grows/shrinks within the given minimum and maximum.

### Line 194

```text
  background: linear-gradient(145deg, #fff 0%, #fbfdfb 68%, #f2f8f4 100%);
```

For selector '.home-card', background sets the full background paint; value 'linear-gradient(145deg, #fff 0%, #fbfdfb 68%, #f2f8f4 100%)' sets sets the full background paint to linear-gradient(145deg, #fff 0%, #fbfdfb 68%, #f2f8f4 100%).

### Line 195

```text
  border: 1px solid var(--border);
```

For selector '.home-card', border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 196

```text
  border-radius: 24px;
```

For selector '.home-card', border-radius rounds box corners; value '24px' sets the rounds box corners to 24px.

### Line 197

```text
  box-shadow: var(--shadow-soft);
```

For selector '.home-card', box-shadow draws depth/shadow around a component; value 'var(--shadow-soft)' uses theme custom property var(--shadow-soft), so the shared design token controls this value.

### Line 198

```text
}
```

Closes the current CSS rule or media-query block.

### Line 199

```text

```

Blank line separates related rules for readability.

### Line 200

```text
/* Fill the sidebar row so the brand accent reaches the header's far edge. */
```

Comment records styling intent for maintainers; it has no visual effect.

### Line 201

```text
.nav-banner {
```

Selects '.nav-banner'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 202

```text
  display: flex;
```

For selector '.nav-banner', display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment.

### Line 203

```text
  align-items: center;
```

For selector '.nav-banner', align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center.

### Line 204

```text
  gap: 12px;
```

For selector '.nav-banner', gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px.

### Line 205

```text
  min-width: 0;
```

For selector '.nav-banner', min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 206

```text
  flex: 1;
```

For selector '.nav-banner', flex controls this CSS property; value '1' sets flex to 1.

### Line 207

```text
}
```

Closes the current CSS rule or media-query block.

### Line 208

```text

```

Blank line separates related rules for readability.

### Line 209

```text
/* Decorative only; theme variables recolor the horizontal streak with each palette. */
```

Comment records styling intent for maintainers; it has no visual effect.

### Line 210

```text
.nav-accent {
```

Selects '.nav-accent'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 211

```text
  flex: 1 1 auto;
```

For selector '.nav-accent', flex controls this CSS property; value '1 1 auto' sets flex to 1 1 auto.

### Line 212

```text
  min-width: 16px;
```

For selector '.nav-accent', min-width sets the smallest allowed horizontal size; value '16px' sets the sets the smallest allowed horizontal size to 16px.

### Line 213

```text
  height: 6px;
```

For selector '.nav-accent', height sets vertical size; value '6px' sets the sets vertical size to 6px.

### Line 214

```text
  margin: 0;
```

For selector '.nav-accent', margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0.

### Line 215

```text
  padding: 0;
```

For selector '.nav-accent', padding sets inside spacing between border and content; value '0' sets sets inside spacing between border and content to 0.

### Line 216

```text
  border: 0;
```

For selector '.nav-accent', border sets border width/style/color; value '0' sets sets border width/style/color to 0.

### Line 217

```text
  border-radius: 999px;
```

For selector '.nav-accent', border-radius rounds box corners; value '999px' sets the rounds box corners to 999px.

### Line 218

```text
  background: linear-gradient(90deg, var(--green), var(--green-deep));
```

For selector '.nav-accent', background sets the full background paint; value 'linear-gradient(90deg, var(--green), var(--green-deep))' sets sets the full background paint to linear-gradient(90deg, var(--green), var(--green-deep)).

### Line 219

```text
  box-shadow: 0 0 0 3px var(--green-soft), 0 2px 10px rgba(31, 78, 51, .2);
```

For selector '.nav-accent', box-shadow draws depth/shadow around a component; value '0 0 0 3px var(--green-soft), 0 2px 10px rgba(31, 78, 51, .2)' sets draws depth/shadow around a component to 0 0 0 3px var(--green-soft), 0 2px 10px rgba(31, 78, 51, .2).

### Line 220

```text
}
```

Closes the current CSS rule or media-query block.

### Line 221

```text

```

Blank line separates related rules for readability.

### Line 222

```text
.home-card::after { position: absolute; top: -95px; right: -90px; width: 280px; height: 280px; content: ""; background: radial-gradient(circle, rgba(113, 182, 138, .17), transparent 68%); pointer-events: none; }
```

Selects '.home-card::after'; declarations on this line style matching Timekeeper elements. position chooses the positioning scheme relative to normal flow; value 'absolute' positions it against the nearest positioned ancestor. top offsets a positioned element from the top edge; value '-95px' sets the offsets a positioned element from the top edge to -95px. right offsets a positioned element from the right edge; value '-90px' sets the offsets a positioned element from the right edge to -90px. width sets horizontal size; value '280px' sets the sets horizontal size to 280px. height sets vertical size; value '280px' sets the sets vertical size to 280px. content supplies generated pseudo-element content; value '""' sets supplies generated pseudo-element content to "". background sets the full background paint; value 'radial-gradient(circle, rgba(113, 182, 138, .17), transparent 68%)' sets sets the full background paint to radial-gradient(circle, rgba(113, 182, 138, .17), transparent 68%). pointer-events controls whether the element receives pointer input; value 'none' sets controls whether the element receives pointer input to none.

### Line 223

```text
.home-kicker { margin: 0 0 12px; color: var(--green); font-size: 10px; font-weight: 750; letter-spacing: .14em; }
```

Selects '.home-kicker'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0 0 12px' sets the sets outside spacing around the box to 0 0 12px. color sets foreground text/icon color; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. font-size sets text size; value '10px' sets the sets text size to 10px. font-weight sets text stroke emphasis; value '750' sets sets text stroke emphasis to 750. letter-spacing adjusts spacing between glyphs; value '.14em' sets the adjusts spacing between glyphs to .14em.

### Line 224

```text
.home-card h1 { max-width: 560px; margin: 0 0 14px; font-size: clamp(30px, 5vw, 46px); line-height: 1.08; letter-spacing: -.055em; }
```

Selects '.home-card h1'; declarations on this line style matching Timekeeper elements. max-width caps horizontal size; value '560px' sets the caps horizontal size to 560px. margin sets outside spacing around the box; value '0 0 14px' sets the sets outside spacing around the box to 0 0 14px. font-size sets text size; value 'clamp(30px, 5vw, 46px)' uses a responsive clamped value that grows/shrinks within the given minimum and maximum. line-height sets line box height and text rhythm; value '1.08' sets sets line box height and text rhythm to 1.08. letter-spacing adjusts spacing between glyphs; value '-.055em' sets the adjusts spacing between glyphs to -.055em.

### Line 225

```text
.home-card > p:not(.home-kicker) { max-width: 490px; margin: 0; color: var(--muted); font-size: 15px; line-height: 1.7; }
```

Selects '.home-card > p:not(.home-kicker)'; declarations on this line style matching Timekeeper elements. max-width caps horizontal size; value '490px' sets the caps horizontal size to 490px. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '15px' sets the sets text size to 15px. line-height sets line box height and text rhythm; value '1.7' sets sets line box height and text rhythm to 1.7.

### Line 226

```text
.home-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 27px; }
```

Selects '.home-actions'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment. flex-wrap allows flex children to wrap onto additional lines; value 'wrap' allows children to continue on another line. gap sets spacing between flex/grid children; value '10px' sets the sets spacing between flex/grid children to 10px. margin-top adds outside space above the element; value '27px' sets the adds outside space above the element to 27px.

### Line 227

```text
.home-action { display: inline-flex; align-items: center; justify-content: center; min-height: 42px; padding: 0 16px; color: #fff; text-decoration: none; background: var(--green); border-radius: 11px; font-size: 12px; font-weight: 700; transition: background 160ms ease, transform 160ms ease; }
```

Selects '.home-action'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'inline-flex' keeps the control inline while laying out children with flex. align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center. justify-content aligns children along the main axis; value 'center' sets aligns children along the main axis to center. min-height sets the smallest allowed control/region height; value '42px' sets the sets the smallest allowed control/region height to 42px. padding sets inside spacing between border and content; value '0 16px' sets the sets inside spacing between border and content to 0 16px. color sets foreground text/icon color; value '#fff' uses explicit color #fff. text-decoration adds/removes underlines or other decoration; value 'none' sets adds/removes underlines or other decoration to none. background sets the full background paint; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value. border-radius rounds box corners; value '11px' sets the rounds box corners to 11px. font-size sets text size; value '12px' sets the sets text size to 12px. font-weight sets text stroke emphasis; value '700' bold emphasis. transition controls this CSS property; value 'background 160ms ease, transform 160ms ease' sets transition to background 160ms ease, transform 160ms ease.

### Line 228

```text
.home-action:hover { background: var(--green-deep); transform: translateY(-1px); }
```

Selects '.home-action:hover'; declarations on this line style matching Timekeeper elements. background sets the full background paint; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. transform controls this CSS property; value 'translateY(-1px)' sets transform to translateY(-1px).

### Line 229

```text
.home-action-secondary { color: var(--ink-soft); background: var(--surface); border: 1px solid var(--border); }
```

Selects '.home-action-secondary'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value. border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 230

```text
.home-action-secondary:hover { color: var(--green-deep); background: var(--surface-hover); }
```

Selects '.home-action-secondary:hover'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-hover)' uses theme custom property var(--surface-hover), so the shared design token controls this value.

### Line 231

```text
.home-benefits { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin: 34px 0 0; padding: 20px 0 0; border-top: 1px solid var(--border); list-style: none; }
```

Selects '.home-benefits'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-columns defines grid tracks and their widths; value 'repeat(3, minmax(0, 1fr))' creates a responsive track with a minimum and flexible maximum size. gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px. margin sets outside spacing around the box; value '34px 0 0' sets sets outside spacing around the box to 34px 0 0. padding sets inside spacing between border and content; value '20px 0 0' sets sets inside spacing between border and content to 20px 0 0. border-top sets the top border; value '1px solid var(--border)' sets sets the top border to 1px solid var(--border). list-style controls list markers; value 'none' sets controls list markers to none.

### Line 232

```text
.home-benefits li { color: var(--muted); font-size: 11px; }
```

Selects '.home-benefits li'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 233

```text
.home-benefits strong { display: block; margin-bottom: 4px; color: var(--ink-soft); font-size: 12px; }
```

Selects '.home-benefits strong'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'block' takes a full available line. margin-bottom adds outside space below the element; value '4px' sets the adds outside space below the element to 4px. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 234

```text

```

Blank line separates related rules for readability.

### Line 235

```text
/* Keep the build number in normal footer flow so it cannot cover other content. */
```

Comment records styling intent for maintainers; it has no visual effect.

### Line 236

```text
.version-badge { margin: 0; padding: 0; color: var(--muted); font-size: 0.70rem; line-height: 1; white-space: nowrap; position: fixed; right: 0; bottom: 0; opacity: 0.6; }
```

Selects '.version-badge'; declarations on this line style matching Timekeeper elements. margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0. padding sets inside spacing between border and content; value '0' sets sets inside spacing between border and content to 0. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. font-size sets text size; value '0.70rem' sets the sets text size to 0.70rem. line-height sets line box height and text rhythm; value '1' sets sets line box height and text rhythm to 1. white-space controls wrapping of whitespace/text; value 'nowrap' keeps text on one line. position chooses the positioning scheme relative to normal flow; value 'fixed' pins the element to the viewport. right offsets a positioned element from the right edge; value '0' sets offsets a positioned element from the right edge to 0. bottom offsets a positioned element from the bottom edge; value '0' sets offsets a positioned element from the bottom edge to 0. opacity makes the element and its contents translucent; value '0.6' sets makes the element and its contents translucent to 0.6.

### Line 237

```text

```

Blank line separates related rules for readability.

### Line 238

```text
@media (max-width: 820px) {
```

Begins a responsive media query: the nested overrides apply when (max-width: 820px) {.

### Line 239

```text
  body.app-body { overflow: hidden; }
```

Selects 'body.app-body'; declarations on this line style matching Timekeeper elements. overflow controls content that exceeds the box, such as scrolling or clipping; value 'hidden' clips content outside the box.

### Line 240

```text
  .app-shell { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); gap: 8px; height: 100vh; height: 100dvh; min-height: 0; padding: 8px; }
```

Selects '.app-shell'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value 'minmax(0, 1fr)' creates a responsive track with a minimum and flexible maximum size. grid-template-rows defines grid row tracks; value 'auto minmax(0, 1fr)' creates a responsive track with a minimum and flexible maximum size. gap sets spacing between flex/grid children; value '8px' sets the sets spacing between flex/grid children to 8px. height sets vertical size; value '100vh' sets sets vertical size to 100vh. height sets vertical size; value '100dvh' sets sets vertical size to 100dvh. min-height sets the smallest allowed control/region height; value '0' sets sets the smallest allowed control/region height to 0. padding sets inside spacing between border and content; value '8px' sets the sets inside spacing between border and content to 8px.

### Line 241

```text
  .sidebar { gap: 8px; padding: 4px 6px; border-radius: 14px; }
```

Selects '.sidebar'; declarations on this line style matching Timekeeper elements. gap sets spacing between flex/grid children; value '8px' sets the sets spacing between flex/grid children to 8px. padding sets inside spacing between border and content; value '4px 6px' sets the sets inside spacing between border and content to 4px 6px. border-radius rounds box corners; value '14px' sets the rounds box corners to 14px.

### Line 242

```text
  .brand { min-height: 44px; gap: 7px; padding: 0; border-bottom: 0; }
```

Selects '.brand'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '44px' sets the sets the smallest allowed control/region height to 44px. gap sets spacing between flex/grid children; value '7px' sets the sets spacing between flex/grid children to 7px. padding sets inside spacing between border and content; value '0' sets sets inside spacing between border and content to 0. border-bottom sets the bottom border; value '0' sets sets the bottom border to 0.

### Line 243

```text
  .brand-mark { width: 34px; height: 34px; flex-basis: 34px; border-radius: 11px; }
```

Selects '.brand-mark'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '34px' sets the sets horizontal size to 34px. height sets vertical size; value '34px' sets the sets vertical size to 34px. flex-basis controls this CSS property; value '34px' sets the flex-basis to 34px. border-radius rounds box corners; value '11px' sets the rounds box corners to 11px.

### Line 244

```text
  .sidebar-nav { gap: 5px; padding: 8px; width: min(360px, 100%); }
```

Selects '.sidebar-nav'; declarations on this line style matching Timekeeper elements. gap sets spacing between flex/grid children; value '5px' sets the sets spacing between flex/grid children to 5px. padding sets inside spacing between border and content; value '8px' sets the sets inside spacing between border and content to 8px. width sets horizontal size; value 'min(360px, 100%)' sets sets horizontal size to min(360px, 100%).

### Line 245

```text
  .nav-picker-toggle { min-width: 120px; min-height: 44px; gap: 7px; padding: 5px 8px; }
```

Selects '.nav-picker-toggle'; declarations on this line style matching Timekeeper elements. min-width sets the smallest allowed horizontal size; value '120px' sets the sets the smallest allowed horizontal size to 120px. min-height sets the smallest allowed control/region height; value '44px' sets the sets the smallest allowed control/region height to 44px. gap sets spacing between flex/grid children; value '7px' sets the sets spacing between flex/grid children to 7px. padding sets inside spacing between border and content; value '5px 8px' sets the sets inside spacing between border and content to 5px 8px.

### Line 246

```text
  .nav-accent { display: none; }
```

Selects '.nav-accent'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'none' removes the element from layout.

### Line 247

```text
  .nav-group-toggle { min-height: 44px; }
```

Selects '.nav-group-toggle'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '44px' sets the sets the smallest allowed control/region height to 44px.

### Line 248

```text
  .nav-group-pages { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
```

Selects '.nav-group-pages'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement. grid-template-columns defines grid tracks and their widths; value 'repeat(2, minmax(0, 1fr))' creates a responsive track with a minimum and flexible maximum size.

### Line 249

```text
  .nav-link { min-width: 0; min-height: 44px; gap: 7px; padding: 6px 10px; border: 1px solid transparent; overflow-wrap: anywhere; }
```

Selects '.nav-link'; declarations on this line style matching Timekeeper elements. min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0. min-height sets the smallest allowed control/region height; value '44px' sets the sets the smallest allowed control/region height to 44px. gap sets spacing between flex/grid children; value '7px' sets the sets spacing between flex/grid children to 7px. padding sets inside spacing between border and content; value '6px 10px' sets the sets inside spacing between border and content to 6px 10px. border sets border width/style/color; value '1px solid transparent' sets sets border width/style/color to 1px solid transparent. overflow-wrap controls this CSS property; value 'anywhere' sets overflow-wrap to anywhere.

### Line 250

```text
  .nav-link svg { width: 15px; height: 15px; flex-basis: 15px; }
```

Selects '.nav-link svg'; declarations on this line style matching Timekeeper elements. width sets horizontal size; value '15px' sets the sets horizontal size to 15px. height sets vertical size; value '15px' sets the sets vertical size to 15px. flex-basis controls this CSS property; value '15px' sets the flex-basis to 15px.

### Line 251

```text
  .nav-link[aria-current="page"] { border-color: var(--green-line); }
```

Selects '.nav-link[aria-current="page"]'; declarations on this line style matching Timekeeper elements. border-color controls this CSS property; value 'var(--green-line)' uses theme custom property var(--green-line), so the shared design token controls this value.

### Line 252

```text
  .nav-arrow { display: none; }
```

Selects '.nav-arrow'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'none' removes the element from layout.

### Line 253

```text
  .app-main { min-height: 0; }
```

Selects '.app-main'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '0' sets sets the smallest allowed control/region height to 0.

### Line 254

```text
  .topbar { min-height: 58px; padding: 0 4px 10px; }
```

Selects '.topbar'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '58px' sets the sets the smallest allowed control/region height to 58px. padding sets inside spacing between border and content; value '0 4px 10px' sets the sets inside spacing between border and content to 0 4px 10px.

### Line 255

```text
  .topbar h1 { font-size: 18px; }
```

Selects '.topbar h1'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '18px' sets the sets text size to 18px.

### Line 256

```text
  .workspace-frame { min-height: 0; border-radius: 16px; }
```

Selects '.workspace-frame'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '0' sets sets the smallest allowed control/region height to 0. border-radius rounds box corners; value '16px' sets the rounds box corners to 16px.

### Line 257

```text
  .workspace-frame iframe { min-height: 0; }
```

Selects '.workspace-frame iframe'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '0' sets sets the smallest allowed control/region height to 0.

### Line 258

```text
  .site-footer { padding: 8px 3px 0; }
```

Selects '.site-footer'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '8px 3px 0' sets sets inside spacing between border and content to 8px 3px 0.

### Line 259

```text
  .app-body.keyboard-open .app-main { min-height: 0; }
```

Selects '.app-body.keyboard-open .app-main'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '0' sets sets the smallest allowed control/region height to 0.

### Line 260

```text
  .app-body.keyboard-open .workspace-frame,
```

Continues the selector list with '.app-body.keyboard-open .workspace-frame'; this selector receives the same declarations as the following comma-separated selectors.

### Line 261

```text
  .app-body.keyboard-open .workspace-frame iframe { min-height: 0; }
```

Selects '.app-body.keyboard-open .workspace-frame iframe'; declarations on this line style matching Timekeeper elements. min-height sets the smallest allowed control/region height; value '0' sets sets the smallest allowed control/region height to 0.

### Line 262

```text
}
```

Closes the current CSS rule or media-query block.

### Line 263

```text

```

Blank line separates related rules for readability.

### Line 264

```text
@media (max-width: 520px) {
```

Begins a responsive media query: the nested overrides apply when (max-width: 520px) {.

### Line 265

```text
  .brand-copy strong { font-size: 13px; }
```

Selects '.brand-copy strong'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '13px' sets the sets text size to 13px.

### Line 266

```text
  .brand-copy small { font-size: 10px; }
```

Selects '.brand-copy small'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '10px' sets the sets text size to 10px.

### Line 267

```text
  .nav-picker-toggle { max-width: 52%; }
```

Selects '.nav-picker-toggle'; declarations on this line style matching Timekeeper elements. max-width caps horizontal size; value '52%' sets the caps horizontal size to 52%.

### Line 268

```text
  .topbar { flex-wrap: wrap; row-gap: 6px; }
```

Selects '.topbar'; declarations on this line style matching Timekeeper elements. flex-wrap allows flex children to wrap onto additional lines; value 'wrap' allows children to continue on another line. row-gap controls this CSS property; value '6px' sets the row-gap to 6px.

### Line 269

```text
  .topbar-tools { gap: 5px; }
```

Selects '.topbar-tools'; declarations on this line style matching Timekeeper elements. gap sets spacing between flex/grid children; value '5px' sets the sets spacing between flex/grid children to 5px.

### Line 270

```text
  .topbar-date { padding: 7px 8px; font-size: 9px; }
```

Selects '.topbar-date'; declarations on this line style matching Timekeeper elements. padding sets inside spacing between border and content; value '7px 8px' sets the sets inside spacing between border and content to 7px 8px. font-size sets text size; value '9px' sets the sets text size to 9px.

### Line 271

```text
  .topbar-eyebrow { font-size: 8px; }
```

Selects '.topbar-eyebrow'; declarations on this line style matching Timekeeper elements. font-size sets text size; value '8px' sets the sets text size to 8px.

### Line 272

```text
  .home-benefits { grid-template-columns: 1fr; gap: 13px; }
```

Selects '.home-benefits'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value '1fr' sets the defines grid tracks and their widths to 1fr. gap sets spacing between flex/grid children; value '13px' sets the sets spacing between flex/grid children to 13px.

### Line 273

```text
  .site-footer { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); row-gap: 6px; }
```

Selects '.site-footer'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value 'minmax(0, 1fr) minmax(0, 1fr)' creates a responsive track with a minimum and flexible maximum size. row-gap controls this CSS property; value '6px' sets the row-gap to 6px.

### Line 274

```text
  .site-footer-app-link { grid-column: 1 / -1; grid-row: 2; }
```

Selects '.site-footer-app-link'; declarations on this line style matching Timekeeper elements. grid-column places an item across specified grid columns; value '1 / -1' sets places an item across specified grid columns to 1 / -1. grid-row controls this CSS property; value '2' sets grid-row to 2.

### Line 275

```text
  .site-footer-link { grid-column: 1; grid-row: 2; }
```

Selects '.site-footer-link'; declarations on this line style matching Timekeeper elements. grid-column places an item across specified grid columns; value '1' sets places an item across specified grid columns to 1. grid-row controls this CSS property; value '2' sets grid-row to 2.

### Line 276

```text
  .site-footer-meta { grid-column: 2; grid-row: 2; gap: 6px; }
```

Selects '.site-footer-meta'; declarations on this line style matching Timekeeper elements. grid-column places an item across specified grid columns; value '2' sets places an item across specified grid columns to 2. grid-row controls this CSS property; value '2' sets grid-row to 2. gap sets spacing between flex/grid children; value '6px' sets the sets spacing between flex/grid children to 6px.

### Line 277

```text
}
```

Closes the current CSS rule or media-query block.

### Line 278

```text

```

Blank line separates related rules for readability.

### Line 279

```text
@media (max-width: 360px) {
```

Begins a responsive media query: the nested overrides apply when (max-width: 360px) {.

### Line 280

```text
  .brand-mark { display: none; }
```

Selects '.brand-mark'; declarations on this line style matching Timekeeper elements. display chooses the layout model or visibility behavior; value 'none' removes the element from layout.

### Line 281

```text
  .nav-picker-toggle { min-width: 0; }
```

Selects '.nav-picker-toggle'; declarations on this line style matching Timekeeper elements. min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 282

```text
  .nav-group-pages { grid-template-columns: minmax(0, 1fr); }
```

Selects '.nav-group-pages'; declarations on this line style matching Timekeeper elements. grid-template-columns defines grid tracks and their widths; value 'minmax(0, 1fr)' creates a responsive track with a minimum and flexible maximum size.

### Line 283

```text
}
```

Closes the current CSS rule or media-query block.

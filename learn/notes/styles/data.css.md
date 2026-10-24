# styles/data.css

[Exact copy](../../original/styles/data.css)

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
* {
```

Selects '*'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 4

```text
  box-sizing: border-box;
```

For selector '*', box-sizing makes declared dimensions include border/padding when border-box; value 'border-box' sets makes declared dimensions include border/padding when border-box to border-box.

### Line 5

```text
  margin: 0;
```

For selector '*', margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0.

### Line 6

```text
  padding: 0;
```

For selector '*', padding sets inside spacing between border and content; value '0' sets sets inside spacing between border and content to 0.

### Line 7

```text
}
```

Closes the current CSS rule or media-query block.

### Line 8

```text

```

Blank line separates related rules for readability.

### Line 9

```text
body {
```

Selects 'body'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 10

```text
  font-family: inherit;
```

For selector 'body', font-family selects the typeface stack; value 'inherit' sets selects the typeface stack to inherit.

### Line 11

```text
  line-height: 1.5;
```

For selector 'body', line-height sets line box height and text rhythm; value '1.5' sets sets line box height and text rhythm to 1.5.

### Line 12

```text
  color: var(--ink);
```

For selector 'body', color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value.

### Line 13

```text
  background-color: var(--canvas);
```

For selector 'body', background-color fills the box with a color; value 'var(--canvas)' uses theme custom property var(--canvas), so the shared design token controls this value.

### Line 14

```text
  padding: 20px;
```

For selector 'body', padding sets inside spacing between border and content; value '20px' sets the sets inside spacing between border and content to 20px.

### Line 15

```text
}
```

Closes the current CSS rule or media-query block.

### Line 16

```text

```

Blank line separates related rules for readability.

### Line 17

```text
.page-header {
```

Selects '.page-header'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 18

```text
  text-align: center;
```

For selector '.page-header', text-align aligns inline text; value 'center' centers inline content.

### Line 19

```text
  margin-bottom: 25px;
```

For selector '.page-header', margin-bottom adds outside space below the element; value '25px' sets the adds outside space below the element to 25px.

### Line 20

```text
}
```

Closes the current CSS rule or media-query block.

### Line 21

```text

```

Blank line separates related rules for readability.

### Line 22

```text
.page-header h1 {
```

Selects '.page-header h1'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 23

```text
  color: var(--ink);
```

For selector '.page-header h1', color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value.

### Line 24

```text
}
```

Closes the current CSS rule or media-query block.

### Line 25

```text

```

Blank line separates related rules for readability.

### Line 26

```text
/* Layout Container */
```

Comment records styling intent for maintainers; it has no visual effect.

### Line 27

```text
.main-container {
```

Selects '.main-container'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 28

```text
  display: flex;
```

For selector '.main-container', display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment.

### Line 29

```text
  flex-direction: column;
```

For selector '.main-container', flex-direction sets the main-axis direction for flex children; value 'column' stacks children vertically.

### Line 30

```text
  gap: 20px;
```

For selector '.main-container', gap sets spacing between flex/grid children; value '20px' sets the sets spacing between flex/grid children to 20px.

### Line 31

```text
  width: min(100%, 1120px);
```

For selector '.main-container', width sets horizontal size; value 'min(100%, 1120px)' sets sets horizontal size to min(100%, 1120px).

### Line 32

```text
  max-width: 1120px;
```

For selector '.main-container', max-width caps horizontal size; value '1120px' sets the caps horizontal size to 1120px.

### Line 33

```text
  margin: 0 auto;
```

For selector '.main-container', margin sets outside spacing around the box; value '0 auto' sets sets outside spacing around the box to 0 auto.

### Line 34

```text
}
```

Closes the current CSS rule or media-query block.

### Line 35

```text

```

Blank line separates related rules for readability.

### Line 36

```text
/* Collapsible Details Styling */
```

Comment records styling intent for maintainers; it has no visual effect.

### Line 37

```text
.management-section {
```

Selects '.management-section'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 38

```text
  background: var(--surface);
```

For selector '.management-section', background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value.

### Line 39

```text
  border-radius: 8px;
```

For selector '.management-section', border-radius rounds box corners; value '8px' sets the rounds box corners to 8px.

### Line 40

```text
  padding: 15px 20px;
```

For selector '.management-section', padding sets inside spacing between border and content; value '15px 20px' sets the sets inside spacing between border and content to 15px 20px.

### Line 41

```text
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
```

For selector '.management-section', box-shadow draws depth/shadow around a component; value '0 2px 5px rgba(0, 0, 0, 0.1)' sets draws depth/shadow around a component to 0 2px 5px rgba(0, 0, 0, 0.1).

### Line 42

```text
  transition: all 0.2s ease;
```

For selector '.management-section', transition controls this CSS property; value 'all 0.2s ease' sets transition to all 0.2s ease.

### Line 43

```text
}
```

Closes the current CSS rule or media-query block.

### Line 44

```text

```

Blank line separates related rules for readability.

### Line 45

```text
.management-section summary {
```

Selects '.management-section summary'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 46

```text
  font-size: 1rem;
```

For selector '.management-section summary', font-size sets text size; value '1rem' sets the sets text size to 1rem.

### Line 47

```text
  font-weight: bold;
```

For selector '.management-section summary', font-weight sets text stroke emphasis; value 'bold' sets sets text stroke emphasis to bold.

### Line 48

```text
  color: var(--green);
```

For selector '.management-section summary', color sets foreground text/icon color; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value.

### Line 49

```text
  cursor: pointer;
```

For selector '.management-section summary', cursor chooses pointer cursor presentation; value 'pointer' sets chooses pointer cursor presentation to pointer.

### Line 50

```text
  list-style: none;
```

For selector '.management-section summary', list-style controls list markers; value 'none' sets controls list markers to none.

### Line 51

```text
  position: relative;
```

For selector '.management-section summary', position chooses the positioning scheme relative to normal flow; value 'relative' sets chooses the positioning scheme relative to normal flow to relative.

### Line 52

```text
  padding-right: 25px;
```

For selector '.management-section summary', padding-right adds inside space to the right; value '25px' sets the adds inside space to the right to 25px.

### Line 53

```text
  user-select: none;
```

For selector '.management-section summary', user-select controls this CSS property; value 'none' sets user-select to none.

### Line 54

```text
}
```

Closes the current CSS rule or media-query block.

### Line 55

```text

```

Blank line separates related rules for readability.

### Line 56

```text
.management-section summary::-webkit-details-marker {
```

Selects '.management-section summary::-webkit-details-marker'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 57

```text
  display: none;
```

For selector '.management-section summary::-webkit-details-marker', display chooses the layout model or visibility behavior; value 'none' removes the element from layout.

### Line 58

```text
}
```

Closes the current CSS rule or media-query block.

### Line 59

```text

```

Blank line separates related rules for readability.

### Line 60

```text
.management-section summary::after {
```

Selects '.management-section summary::after'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 61

```text
  content: "+";
```

For selector '.management-section summary::after', content supplies generated pseudo-element content; value '"+"' sets supplies generated pseudo-element content to "+".

### Line 62

```text
  position: absolute;
```

For selector '.management-section summary::after', position chooses the positioning scheme relative to normal flow; value 'absolute' positions it against the nearest positioned ancestor.

### Line 63

```text
  right: 0;
```

For selector '.management-section summary::after', right offsets a positioned element from the right edge; value '0' sets offsets a positioned element from the right edge to 0.

### Line 64

```text
  top: 0;
```

For selector '.management-section summary::after', top offsets a positioned element from the top edge; value '0' sets offsets a positioned element from the top edge to 0.

### Line 65

```text
  font-size: 1rem;
```

For selector '.management-section summary::after', font-size sets text size; value '1rem' sets the sets text size to 1rem.

### Line 66

```text
  color: var(--green);
```

For selector '.management-section summary::after', color sets foreground text/icon color; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value.

### Line 67

```text
  font-weight: bold;
```

For selector '.management-section summary::after', font-weight sets text stroke emphasis; value 'bold' sets sets text stroke emphasis to bold.

### Line 68

```text
}
```

Closes the current CSS rule or media-query block.

### Line 69

```text

```

Blank line separates related rules for readability.

### Line 70

```text
.management-section[open] summary::after {
```

Selects '.management-section[open] summary::after'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 71

```text
  content: "−";
```

For selector '.management-section[open] summary::after', content supplies generated pseudo-element content; value '"−"' sets supplies generated pseudo-element content to "−".

### Line 72

```text
}
```

Closes the current CSS rule or media-query block.

### Line 73

```text

```

Blank line separates related rules for readability.

### Line 74

```text
.management-section[open] summary {
```

Selects '.management-section[open] summary'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 75

```text
  border-bottom: 2px solid var(--green);
```

For selector '.management-section[open] summary', border-bottom sets the bottom border; value '2px solid var(--green)' sets sets the bottom border to 2px solid var(--green).

### Line 76

```text
  padding-bottom: 8px;
```

For selector '.management-section[open] summary', padding-bottom adds inside space below content; value '8px' sets the adds inside space below content to 8px.

### Line 77

```text
  margin-bottom: 15px;
```

For selector '.management-section[open] summary', margin-bottom adds outside space below the element; value '15px' sets the adds outside space below the element to 15px.

### Line 78

```text
}
```

Closes the current CSS rule or media-query block.

### Line 79

```text

```

Blank line separates related rules for readability.

### Line 80

```text
/* Content Grid inside Details */
```

Comment records styling intent for maintainers; it has no visual effect.

### Line 81

```text
.section-content {
```

Selects '.section-content'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 82

```text
  display: grid;
```

For selector '.section-content', display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement.

### Line 83

```text
  grid-template-columns: 1fr;
```

For selector '.section-content', grid-template-columns defines grid tracks and their widths; value '1fr' sets the defines grid tracks and their widths to 1fr.

### Line 84

```text
  gap: 20px;
```

For selector '.section-content', gap sets spacing between flex/grid children; value '20px' sets the sets spacing between flex/grid children to 20px.

### Line 85

```text
  margin-top: 15px;
```

For selector '.section-content', margin-top adds outside space above the element; value '15px' sets the adds outside space above the element to 15px.

### Line 86

```text
}
```

Closes the current CSS rule or media-query block.

### Line 87

```text

```

Blank line separates related rules for readability.

### Line 88

```text
@media (min-width: 768px) {
```

Begins a responsive media query: the nested overrides apply when (min-width: 768px) {.

### Line 89

```text
  .section-content {
```

Selects '.section-content'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 90

```text
    grid-template-columns: 1fr 1fr;
```

For selector '.section-content', grid-template-columns defines grid tracks and their widths; value '1fr 1fr' sets the defines grid tracks and their widths to 1fr 1fr.

### Line 91

```text
  }
```

Closes the current CSS rule or media-query block.

### Line 92

```text

```

Blank line separates related rules for readability.

### Line 93

```text
  #customers-section .section-content {
```

Selects '#customers-section .section-content'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 94

```text
    grid-template-columns: minmax(0, 1.6fr) minmax(280px, 1fr);
```

For selector '#customers-section .section-content', grid-template-columns defines grid tracks and their widths; value 'minmax(0, 1.6fr) minmax(280px, 1fr)' creates a responsive track with a minimum and flexible maximum size.

### Line 95

```text
  }
```

Closes the current CSS rule or media-query block.

### Line 96

```text
}
```

Closes the current CSS rule or media-query block.

### Line 97

```text

```

Blank line separates related rules for readability.

### Line 98

```text
/* Lists */
```

Comment records styling intent for maintainers; it has no visual effect.

### Line 99

```text
.list-container {
```

Selects '.list-container'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 100

```text
  min-width: 0;
```

For selector '.list-container', min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 101

```text
  background-color: var(--surface-muted);
```

For selector '.list-container', background-color fills the box with a color; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value.

### Line 102

```text
  border: 1px solid var(--border);
```

For selector '.list-container', border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 103

```text
  border-radius: 6px;
```

For selector '.list-container', border-radius rounds box corners; value '6px' sets the rounds box corners to 6px.

### Line 104

```text
  padding: 15px;
```

For selector '.list-container', padding sets inside spacing between border and content; value '15px' sets the sets inside spacing between border and content to 15px.

### Line 105

```text
  max-height: 350px;
```

For selector '.list-container', max-height caps vertical size; value '350px' sets the caps vertical size to 350px.

### Line 106

```text
  overflow-y: auto;
```

For selector '.list-container', overflow-y controls vertical overflow; value 'auto' sets controls vertical overflow to auto.

### Line 107

```text
}
```

Closes the current CSS rule or media-query block.

### Line 108

```text

```

Blank line separates related rules for readability.

### Line 109

```text
.data-list {
```

Selects '.data-list'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 110

```text
  min-width: 0;
```

For selector '.data-list', min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 111

```text
  padding-left: 20px;
```

For selector '.data-list', padding-left adds inside space to the left; value '20px' sets the adds inside space to the left to 20px.

### Line 112

```text
}
```

Closes the current CSS rule or media-query block.

### Line 113

```text

```

Blank line separates related rules for readability.

### Line 114

```text
.data-list li {
```

Selects '.data-list li'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 115

```text
  padding: 8px 12px;
```

For selector '.data-list li', padding sets inside spacing between border and content; value '8px 12px' sets the sets inside spacing between border and content to 8px 12px.

### Line 116

```text
  margin-bottom: 8px;
```

For selector '.data-list li', margin-bottom adds outside space below the element; value '8px' sets the adds outside space below the element to 8px.

### Line 117

```text
  background-color: var(--surface);
```

For selector '.data-list li', background-color fills the box with a color; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value.

### Line 118

```text
  border: 1px solid var(--green-line);
```

For selector '.data-list li', border sets border width/style/color; value '1px solid var(--green-line)' sets sets border width/style/color to 1px solid var(--green-line).

### Line 119

```text
  border-radius: 4px;
```

For selector '.data-list li', border-radius rounds box corners; value '4px' sets the rounds box corners to 4px.

### Line 120

```text
  font-size: 12px;
```

For selector '.data-list li', font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 121

```text
}
```

Closes the current CSS rule or media-query block.

### Line 122

```text

```

Blank line separates related rules for readability.

### Line 123

```text
.emp-item,
```

Continues the selector list with '.emp-item'; this selector receives the same declarations as the following comma-separated selectors.

### Line 124

```text
.cust-item {
```

Selects '.cust-item'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 125

```text
  display: flex;
```

For selector '.cust-item', display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment.

### Line 126

```text
  flex-direction: row;
```

For selector '.cust-item', flex-direction sets the main-axis direction for flex children; value 'row' lays children horizontally.

### Line 127

```text
  align-items: center;
```

For selector '.cust-item', align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center.

### Line 128

```text
  justify-content: space-between;
```

For selector '.cust-item', justify-content aligns children along the main axis; value 'space-between' sets aligns children along the main axis to space-between.

### Line 129

```text
  gap: 12px;
```

For selector '.cust-item', gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px.

### Line 130

```text
  width: 100%;
```

For selector '.cust-item', width sets horizontal size; value '100%' sets the sets horizontal size to 100%.

### Line 131

```text
}
```

Closes the current CSS rule or media-query block.

### Line 132

```text

```

Blank line separates related rules for readability.

### Line 133

```text
.emp-item > p,
```

Continues the selector list with '.emp-item > p'; this selector receives the same declarations as the following comma-separated selectors.

### Line 134

```text
.cust-copy p {
```

Selects '.cust-copy p'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 135

```text
  min-width: 0;
```

For selector '.cust-copy p', min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 136

```text
  margin: 0;
```

For selector '.cust-copy p', margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0.

### Line 137

```text
  overflow-wrap: anywhere;
```

For selector '.cust-copy p', overflow-wrap controls this CSS property; value 'anywhere' sets overflow-wrap to anywhere.

### Line 138

```text
}
```

Closes the current CSS rule or media-query block.

### Line 139

```text

```

Blank line separates related rules for readability.

### Line 140

```text
.customer-name {
```

Selects '.customer-name'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 141

```text
  color: var(--ink);
```

For selector '.customer-name', color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value.

### Line 142

```text
  font-weight: 650;
```

For selector '.customer-name', font-weight sets text stroke emphasis; value '650' semibold emphasis.

### Line 143

```text
}
```

Closes the current CSS rule or media-query block.

### Line 144

```text

```

Blank line separates related rules for readability.

### Line 145

```text
.customer-note {
```

Selects '.customer-note'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 146

```text
  margin-top: 3px !important;
```

For selector '.customer-note', margin-top adds outside space above the element; value '3px !important' sets adds outside space above the element to 3px !important.

### Line 147

```text
  color: var(--muted);
```

For selector '.customer-note', color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value.

### Line 148

```text
}
```

Closes the current CSS rule or media-query block.

### Line 149

```text

```

Blank line separates related rules for readability.

### Line 150

```text
.item-actions {
```

Selects '.item-actions'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 151

```text
  display: flex;
```

For selector '.item-actions', display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment.

### Line 152

```text
  flex: 0 0 auto;
```

For selector '.item-actions', flex controls this CSS property; value '0 0 auto' sets flex to 0 0 auto.

### Line 153

```text
  align-items: center;
```

For selector '.item-actions', align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center.

### Line 154

```text
  gap: 7px;
```

For selector '.item-actions', gap sets spacing between flex/grid children; value '7px' sets the sets spacing between flex/grid children to 7px.

### Line 155

```text
}
```

Closes the current CSS rule or media-query block.

### Line 156

```text

```

Blank line separates related rules for readability.

### Line 157

```text
.item-actions button {
```

Selects '.item-actions button'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 158

```text
  min-height: 34px;
```

For selector '.item-actions button', min-height sets the smallest allowed control/region height; value '34px' sets the sets the smallest allowed control/region height to 34px.

### Line 159

```text
  padding: 6px 10px;
```

For selector '.item-actions button', padding sets inside spacing between border and content; value '6px 10px' sets the sets inside spacing between border and content to 6px 10px.

### Line 160

```text
  font-size: 12px;
```

For selector '.item-actions button', font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 161

```text
}
```

Closes the current CSS rule or media-query block.

### Line 162

```text

```

Blank line separates related rules for readability.

### Line 163

```text
.edit-btn {
```

Selects '.edit-btn'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 164

```text
  color: var(--green-deep);
```

For selector '.edit-btn', color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value.

### Line 165

```text
  background-color: var(--green-soft);
```

For selector '.edit-btn', background-color fills the box with a color; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value.

### Line 166

```text
}
```

Closes the current CSS rule or media-query block.

### Line 167

```text

```

Blank line separates related rules for readability.

### Line 168

```text
.edit-btn:hover {
```

Selects '.edit-btn:hover'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 169

```text
  background-color: var(--surface-hover);
```

For selector '.edit-btn:hover', background-color fills the box with a color; value 'var(--surface-hover)' uses theme custom property var(--surface-hover), so the shared design token controls this value.

### Line 170

```text
}
```

Closes the current CSS rule or media-query block.

### Line 171

```text

```

Blank line separates related rules for readability.

### Line 172

```text
.del-btn {
```

Selects '.del-btn'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 173

```text
  color: #ffffff;
```

For selector '.del-btn', color sets foreground text/icon color; value '#ffffff' uses explicit color #ffffff.

### Line 174

```text
  background-color: var(--red);
```

For selector '.del-btn', background-color fills the box with a color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value.

### Line 175

```text
}
```

Closes the current CSS rule or media-query block.

### Line 176

```text

```

Blank line separates related rules for readability.

### Line 177

```text
.del-btn:hover {
```

Selects '.del-btn:hover'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 178

```text
  filter: brightness(.94);
```

For selector '.del-btn:hover', filter applies visual filter effects; value 'brightness(.94)' sets applies visual filter effects to brightness(.94).

### Line 179

```text
}
```

Closes the current CSS rule or media-query block.

### Line 180

```text

```

Blank line separates related rules for readability.

### Line 181

```text
.empty-list {
```

Selects '.empty-list'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 182

```text
  list-style-type: none;
```

For selector '.empty-list', list-style-type controls this CSS property; value 'none' sets list-style-type to none.

### Line 183

```text
  color: var(--muted);
```

For selector '.empty-list', color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value.

### Line 184

```text
  font-style: italic;
```

For selector '.empty-list', font-style selects normal/italic style; value 'italic' sets selects normal/italic style to italic.

### Line 185

```text
  text-align: center;
```

For selector '.empty-list', text-align aligns inline text; value 'center' centers inline content.

### Line 186

```text
  border: 1px dashed var(--border) !important;
```

For selector '.empty-list', border sets border width/style/color; value '1px dashed var(--border) !important' sets sets border width/style/color to 1px dashed var(--border) !important.

### Line 187

```text
}
```

Closes the current CSS rule or media-query block.

### Line 188

```text

```

Blank line separates related rules for readability.

### Line 189

```text
/* Add-record Forms */
```

Comment records styling intent for maintainers; it has no visual effect.

### Line 190

```text
.form-container {
```

Selects '.form-container'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 191

```text
  background-color: var(--surface);
```

For selector '.form-container', background-color fills the box with a color; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value.

### Line 192

```text
  border: 1px solid var(--border);
```

For selector '.form-container', border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 193

```text
  border-radius: 6px;
```

For selector '.form-container', border-radius rounds box corners; value '6px' sets the rounds box corners to 6px.

### Line 194

```text
  padding: 20px;
```

For selector '.form-container', padding sets inside spacing between border and content; value '20px' sets the sets inside spacing between border and content to 20px.

### Line 195

```text
}
```

Closes the current CSS rule or media-query block.

### Line 196

```text

```

Blank line separates related rules for readability.

### Line 197

```text
.add-form-disclosure > summary {
```

Selects '.add-form-disclosure > summary'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 198

```text
  position: relative;
```

For selector '.add-form-disclosure > summary', position chooses the positioning scheme relative to normal flow; value 'relative' sets chooses the positioning scheme relative to normal flow to relative.

### Line 199

```text
  padding-right: 25px;
```

For selector '.add-form-disclosure > summary', padding-right adds inside space to the right; value '25px' sets the adds inside space to the right to 25px.

### Line 200

```text
  color: var(--green);
```

For selector '.add-form-disclosure > summary', color sets foreground text/icon color; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value.

### Line 201

```text
  cursor: pointer;
```

For selector '.add-form-disclosure > summary', cursor chooses pointer cursor presentation; value 'pointer' sets chooses pointer cursor presentation to pointer.

### Line 202

```text
  font-size: 1rem;
```

For selector '.add-form-disclosure > summary', font-size sets text size; value '1rem' sets the sets text size to 1rem.

### Line 203

```text
  font-weight: bold;
```

For selector '.add-form-disclosure > summary', font-weight sets text stroke emphasis; value 'bold' sets sets text stroke emphasis to bold.

### Line 204

```text
  list-style: none;
```

For selector '.add-form-disclosure > summary', list-style controls list markers; value 'none' sets controls list markers to none.

### Line 205

```text
}
```

Closes the current CSS rule or media-query block.

### Line 206

```text

```

Blank line separates related rules for readability.

### Line 207

```text
.add-form-disclosure > summary::-webkit-details-marker {
```

Selects '.add-form-disclosure > summary::-webkit-details-marker'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 208

```text
  display: none;
```

For selector '.add-form-disclosure > summary::-webkit-details-marker', display chooses the layout model or visibility behavior; value 'none' removes the element from layout.

### Line 209

```text
}
```

Closes the current CSS rule or media-query block.

### Line 210

```text

```

Blank line separates related rules for readability.

### Line 211

```text
.add-form-disclosure > summary::after {
```

Selects '.add-form-disclosure > summary::after'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 212

```text
  position: absolute;
```

For selector '.add-form-disclosure > summary::after', position chooses the positioning scheme relative to normal flow; value 'absolute' positions it against the nearest positioned ancestor.

### Line 213

```text
  top: 0;
```

For selector '.add-form-disclosure > summary::after', top offsets a positioned element from the top edge; value '0' sets offsets a positioned element from the top edge to 0.

### Line 214

```text
  right: 0;
```

For selector '.add-form-disclosure > summary::after', right offsets a positioned element from the right edge; value '0' sets offsets a positioned element from the right edge to 0.

### Line 215

```text
  color: var(--green);
```

For selector '.add-form-disclosure > summary::after', color sets foreground text/icon color; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value.

### Line 216

```text
  content: "+";
```

For selector '.add-form-disclosure > summary::after', content supplies generated pseudo-element content; value '"+"' sets supplies generated pseudo-element content to "+".

### Line 217

```text
}
```

Closes the current CSS rule or media-query block.

### Line 218

```text

```

Blank line separates related rules for readability.

### Line 219

```text
.add-form-disclosure[open] > summary {
```

Selects '.add-form-disclosure[open] > summary'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 220

```text
  margin-bottom: 15px;
```

For selector '.add-form-disclosure[open] > summary', margin-bottom adds outside space below the element; value '15px' sets the adds outside space below the element to 15px.

### Line 221

```text
  padding-bottom: 8px;
```

For selector '.add-form-disclosure[open] > summary', padding-bottom adds inside space below content; value '8px' sets the adds inside space below content to 8px.

### Line 222

```text
  border-bottom: 2px solid var(--green);
```

For selector '.add-form-disclosure[open] > summary', border-bottom sets the bottom border; value '2px solid var(--green)' sets sets the bottom border to 2px solid var(--green).

### Line 223

```text
}
```

Closes the current CSS rule or media-query block.

### Line 224

```text

```

Blank line separates related rules for readability.

### Line 225

```text
.add-form-disclosure[open] > summary::after {
```

Selects '.add-form-disclosure[open] > summary::after'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 226

```text
  content: "−";
```

For selector '.add-form-disclosure[open] > summary::after', content supplies generated pseudo-element content; value '"−"' sets supplies generated pseudo-element content to "−".

### Line 227

```text
}
```

Closes the current CSS rule or media-query block.

### Line 228

```text

```

Blank line separates related rules for readability.

### Line 229

```text
.add-form h3 {
```

Selects '.add-form h3'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 230

```text
  margin-bottom: 15px;
```

For selector '.add-form h3', margin-bottom adds outside space below the element; value '15px' sets the adds outside space below the element to 15px.

### Line 231

```text
  font-size: 1rem;
```

For selector '.add-form h3', font-size sets text size; value '1rem' sets the sets text size to 1rem.

### Line 232

```text
  color: var(--ink-soft);
```

For selector '.add-form h3', color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value.

### Line 233

```text
}
```

Closes the current CSS rule or media-query block.

### Line 234

```text

```

Blank line separates related rules for readability.

### Line 235

```text
.form-group {
```

Selects '.form-group'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 236

```text
  display: flex;
```

For selector '.form-group', display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment.

### Line 237

```text
  flex-direction: column;
```

For selector '.form-group', flex-direction sets the main-axis direction for flex children; value 'column' stacks children vertically.

### Line 238

```text
  margin-bottom: 12px;
```

For selector '.form-group', margin-bottom adds outside space below the element; value '12px' sets the adds outside space below the element to 12px.

### Line 239

```text
}
```

Closes the current CSS rule or media-query block.

### Line 240

```text

```

Blank line separates related rules for readability.

### Line 241

```text
.form-group label {
```

Selects '.form-group label'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 242

```text
  font-weight: bold;
```

For selector '.form-group label', font-weight sets text stroke emphasis; value 'bold' sets sets text stroke emphasis to bold.

### Line 243

```text
  font-size: 12px;
```

For selector '.form-group label', font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 244

```text
  margin-bottom: 4px;
```

For selector '.form-group label', margin-bottom adds outside space below the element; value '4px' sets the adds outside space below the element to 4px.

### Line 245

```text
}
```

Closes the current CSS rule or media-query block.

### Line 246

```text

```

Blank line separates related rules for readability.

### Line 247

```text
.form-group input,
```

Continues the selector list with '.form-group input'; this selector receives the same declarations as the following comma-separated selectors.

### Line 248

```text
.form-group textarea {
```

Selects '.form-group textarea'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 249

```text
  padding: 8px;
```

For selector '.form-group textarea', padding sets inside spacing between border and content; value '8px' sets the sets inside spacing between border and content to 8px.

### Line 250

```text
  border: 1px solid var(--border);
```

For selector '.form-group textarea', border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 251

```text
  border-radius: 4px;
```

For selector '.form-group textarea', border-radius rounds box corners; value '4px' sets the rounds box corners to 4px.

### Line 252

```text
  font-size: 12px;
```

For selector '.form-group textarea', font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 253

```text
  width: 100%;
```

For selector '.form-group textarea', width sets horizontal size; value '100%' sets the sets horizontal size to 100%.

### Line 254

```text
}
```

Closes the current CSS rule or media-query block.

### Line 255

```text

```

Blank line separates related rules for readability.

### Line 256

```text
.form-group input:focus,
```

Continues the selector list with '.form-group input:focus'; this selector receives the same declarations as the following comma-separated selectors.

### Line 257

```text
.form-group textarea:focus {
```

Selects '.form-group textarea:focus'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 258

```text
  outline: none;
```

For selector '.form-group textarea:focus', outline draws focus/diagnostic ring outside the border; value 'none' sets draws focus/diagnostic ring outside the border to none.

### Line 259

```text
  border-color: var(--green);
```

For selector '.form-group textarea:focus', border-color controls this CSS property; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value.

### Line 260

```text
  box-shadow: 0 0 3px rgba(46, 125, 50, 0.4);
```

For selector '.form-group textarea:focus', box-shadow draws depth/shadow around a component; value '0 0 3px rgba(46, 125, 50, 0.4)' sets draws depth/shadow around a component to 0 0 3px rgba(46, 125, 50, 0.4).

### Line 261

```text
}
```

Closes the current CSS rule or media-query block.

### Line 262

```text

```

Blank line separates related rules for readability.

### Line 263

```text
.form-actions {
```

Selects '.form-actions'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 264

```text
  display: flex;
```

For selector '.form-actions', display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment.

### Line 265

```text
  flex-wrap: wrap;
```

For selector '.form-actions', flex-wrap allows flex children to wrap onto additional lines; value 'wrap' allows children to continue on another line.

### Line 266

```text
  gap: 10px;
```

For selector '.form-actions', gap sets spacing between flex/grid children; value '10px' sets the sets spacing between flex/grid children to 10px.

### Line 267

```text
  margin-top: 15px;
```

For selector '.form-actions', margin-top adds outside space above the element; value '15px' sets the adds outside space above the element to 15px.

### Line 268

```text
}
```

Closes the current CSS rule or media-query block.

### Line 269

```text

```

Blank line separates related rules for readability.

### Line 270

```text
/* Buttons */
```

Comment records styling intent for maintainers; it has no visual effect.

### Line 271

```text
.btn {
```

Selects '.btn'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 272

```text
  min-height: 38px;
```

For selector '.btn', min-height sets the smallest allowed control/region height; value '38px' sets the sets the smallest allowed control/region height to 38px.

### Line 273

```text
  padding: 8px 16px;
```

For selector '.btn', padding sets inside spacing between border and content; value '8px 16px' sets the sets inside spacing between border and content to 8px 16px.

### Line 274

```text
  border: none;
```

For selector '.btn', border sets border width/style/color; value 'none' sets sets border width/style/color to none.

### Line 275

```text
  border-radius: 8px;
```

For selector '.btn', border-radius rounds box corners; value '8px' sets the rounds box corners to 8px.

### Line 276

```text
  cursor: pointer;
```

For selector '.btn', cursor chooses pointer cursor presentation; value 'pointer' sets chooses pointer cursor presentation to pointer.

### Line 277

```text
  font-weight: bold;
```

For selector '.btn', font-weight sets text stroke emphasis; value 'bold' sets sets text stroke emphasis to bold.

### Line 278

```text
  font-size: 12px;
```

For selector '.btn', font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 279

```text
  transition: background-color 0.2s ease;
```

For selector '.btn', transition controls this CSS property; value 'background-color 0.2s ease' sets transition to background-color 0.2s ease.

### Line 280

```text
}
```

Closes the current CSS rule or media-query block.

### Line 281

```text

```

Blank line separates related rules for readability.

### Line 282

```text
.btn-primary {
```

Selects '.btn-primary'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 283

```text
  background-color: var(--green);
```

For selector '.btn-primary', background-color fills the box with a color; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value.

### Line 284

```text
  color: #ffffff;
```

For selector '.btn-primary', color sets foreground text/icon color; value '#ffffff' uses explicit color #ffffff.

### Line 285

```text
}
```

Closes the current CSS rule or media-query block.

### Line 286

```text

```

Blank line separates related rules for readability.

### Line 287

```text
.btn-primary:hover {
```

Selects '.btn-primary:hover'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 288

```text
  background-color: var(--green-deep);
```

For selector '.btn-primary:hover', background-color fills the box with a color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value.

### Line 289

```text
}
```

Closes the current CSS rule or media-query block.

### Line 290

```text

```

Blank line separates related rules for readability.

### Line 291

```text
.btn-secondary {
```

Selects '.btn-secondary'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 292

```text
  background-color: var(--surface-muted);
```

For selector '.btn-secondary', background-color fills the box with a color; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value.

### Line 293

```text
  color: var(--ink);
```

For selector '.btn-secondary', color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value.

### Line 294

```text
}
```

Closes the current CSS rule or media-query block.

### Line 295

```text

```

Blank line separates related rules for readability.

### Line 296

```text
.btn-secondary:hover {
```

Selects '.btn-secondary:hover'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 297

```text
  background-color: var(--surface-hover);
```

For selector '.btn-secondary:hover', background-color fills the box with a color; value 'var(--surface-hover)' uses theme custom property var(--surface-hover), so the shared design token controls this value.

### Line 298

```text
}
```

Closes the current CSS rule or media-query block.

### Line 299

```text

```

Blank line separates related rules for readability.

### Line 300

```text
/* Accessible native edit dialog */
```

Comment records styling intent for maintainers; it has no visual effect.

### Line 301

```text
.people-edit-modal {
```

Selects '.people-edit-modal'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 302

```text
  position: fixed;
```

For selector '.people-edit-modal', position chooses the positioning scheme relative to normal flow; value 'fixed' pins the element to the viewport.

### Line 303

```text
  inset: 0;
```

For selector '.people-edit-modal', inset sets all positioned edges at once; value '0' sets sets all positioned edges at once to 0.

### Line 304

```text
  width: min(calc(100% - 32px), 600px);
```

For selector '.people-edit-modal', width sets horizontal size; value 'min(calc(100% - 32px), 600px)' sets sets horizontal size to min(calc(100% - 32px), 600px).

### Line 305

```text
  max-width: 600px;
```

For selector '.people-edit-modal', max-width caps horizontal size; value '600px' sets the caps horizontal size to 600px.

### Line 306

```text
  max-height: min(92vh, 760px);
```

For selector '.people-edit-modal', max-height caps vertical size; value 'min(92vh, 760px)' sets caps vertical size to min(92vh, 760px).

### Line 307

```text
  max-height: min(92dvh, 760px);
```

For selector '.people-edit-modal', max-height caps vertical size; value 'min(92dvh, 760px)' sets caps vertical size to min(92dvh, 760px).

### Line 308

```text
  margin: auto;
```

For selector '.people-edit-modal', margin sets outside spacing around the box; value 'auto' sets sets outside spacing around the box to auto.

### Line 309

```text
  padding: 0;
```

For selector '.people-edit-modal', padding sets inside spacing between border and content; value '0' sets sets inside spacing between border and content to 0.

### Line 310

```text
  overflow: auto;
```

For selector '.people-edit-modal', overflow controls content that exceeds the box, such as scrolling or clipping; value 'auto' adds scrolling only when content exceeds the box.

### Line 311

```text
  overscroll-behavior: contain;
```

For selector '.people-edit-modal', overscroll-behavior controls this CSS property; value 'contain' sets overscroll-behavior to contain.

### Line 312

```text
  color: var(--ink);
```

For selector '.people-edit-modal', color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value.

### Line 313

```text
  background: var(--surface);
```

For selector '.people-edit-modal', background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value.

### Line 314

```text
  border: 1px solid var(--border);
```

For selector '.people-edit-modal', border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 315

```text
  border-radius: 20px;
```

For selector '.people-edit-modal', border-radius rounds box corners; value '20px' sets the rounds box corners to 20px.

### Line 316

```text
  box-shadow: 0 28px 90px rgba(12, 25, 18, .28);
```

For selector '.people-edit-modal', box-shadow draws depth/shadow around a component; value '0 28px 90px rgba(12, 25, 18, .28)' sets draws depth/shadow around a component to 0 28px 90px rgba(12, 25, 18, .28).

### Line 317

```text
}
```

Closes the current CSS rule or media-query block.

### Line 318

```text

```

Blank line separates related rules for readability.

### Line 319

```text
.people-edit-modal::backdrop {
```

Selects '.people-edit-modal::backdrop'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 320

```text
  background: rgba(12, 23, 18, .58);
```

For selector '.people-edit-modal::backdrop', background sets the full background paint; value 'rgba(12, 23, 18, .58)' uses translucent color rgba(12, 23, 18, .58) to soften the surface/shadow.

### Line 321

```text
  backdrop-filter: blur(5px);
```

For selector '.people-edit-modal::backdrop', backdrop-filter filters pixels behind a translucent overlay; value 'blur(5px)' sets filters pixels behind a translucent overlay to blur(5px).

### Line 322

```text
}
```

Closes the current CSS rule or media-query block.

### Line 323

```text

```

Blank line separates related rules for readability.

### Line 324

```text
.people-edit-form {
```

Selects '.people-edit-form'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 325

```text
  display: grid;
```

For selector '.people-edit-form', display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement.

### Line 326

```text
  gap: 0;
```

For selector '.people-edit-form', gap sets spacing between flex/grid children; value '0' sets sets spacing between flex/grid children to 0.

### Line 327

```text
  padding: 0;
```

For selector '.people-edit-form', padding sets inside spacing between border and content; value '0' sets sets inside spacing between border and content to 0.

### Line 328

```text
}
```

Closes the current CSS rule or media-query block.

### Line 329

```text

```

Blank line separates related rules for readability.

### Line 330

```text
.people-edit-heading {
```

Selects '.people-edit-heading'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 331

```text
  position: relative;
```

For selector '.people-edit-heading', position chooses the positioning scheme relative to normal flow; value 'relative' sets chooses the positioning scheme relative to normal flow to relative.

### Line 332

```text
  display: grid;
```

For selector '.people-edit-heading', display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement.

### Line 333

```text
  gap: 8px;
```

For selector '.people-edit-heading', gap sets spacing between flex/grid children; value '8px' sets the sets spacing between flex/grid children to 8px.

### Line 334

```text
  padding: 27px 32px 24px;
```

For selector '.people-edit-heading', padding sets inside spacing between border and content; value '27px 32px 24px' sets the sets inside spacing between border and content to 27px 32px 24px.

### Line 335

```text
  border-bottom: 1px solid var(--border-soft);
```

For selector '.people-edit-heading', border-bottom sets the bottom border; value '1px solid var(--border-soft)' sets sets the bottom border to 1px solid var(--border-soft).

### Line 336

```text
  background: linear-gradient(125deg, var(--green-soft), var(--surface) 76%);
```

For selector '.people-edit-heading', background sets the full background paint; value 'linear-gradient(125deg, var(--green-soft), var(--surface) 76%)' sets sets the full background paint to linear-gradient(125deg, var(--green-soft), var(--surface) 76%).

### Line 337

```text
}
```

Closes the current CSS rule or media-query block.

### Line 338

```text

```

Blank line separates related rules for readability.

### Line 339

```text
.people-edit-heading::before {
```

Selects '.people-edit-heading::before'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 340

```text
  position: absolute;
```

For selector '.people-edit-heading::before', position chooses the positioning scheme relative to normal flow; value 'absolute' positions it against the nearest positioned ancestor.

### Line 341

```text
  inset: 0 auto 0 0;
```

For selector '.people-edit-heading::before', inset sets all positioned edges at once; value '0 auto 0 0' sets sets all positioned edges at once to 0 auto 0 0.

### Line 342

```text
  width: 4px;
```

For selector '.people-edit-heading::before', width sets horizontal size; value '4px' sets the sets horizontal size to 4px.

### Line 343

```text
  background: var(--green);
```

For selector '.people-edit-heading::before', background sets the full background paint; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value.

### Line 344

```text
  content: "";
```

For selector '.people-edit-heading::before', content supplies generated pseudo-element content; value '""' sets supplies generated pseudo-element content to "".

### Line 345

```text
}
```

Closes the current CSS rule or media-query block.

### Line 346

```text

```

Blank line separates related rules for readability.

### Line 347

```text
.people-edit-heading h2 {
```

Selects '.people-edit-heading h2'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 348

```text
  margin: 0;
```

For selector '.people-edit-heading h2', margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0.

### Line 349

```text
  color: var(--ink);
```

For selector '.people-edit-heading h2', color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value.

### Line 350

```text
  font-size: 25px;
```

For selector '.people-edit-heading h2', font-size sets text size; value '25px' sets the sets text size to 25px.

### Line 351

```text
  line-height: 1.18;
```

For selector '.people-edit-heading h2', line-height sets line box height and text rhythm; value '1.18' sets sets line box height and text rhythm to 1.18.

### Line 352

```text
  letter-spacing: -.04em;
```

For selector '.people-edit-heading h2', letter-spacing adjusts spacing between glyphs; value '-.04em' sets the adjusts spacing between glyphs to -.04em.

### Line 353

```text
}
```

Closes the current CSS rule or media-query block.

### Line 354

```text

```

Blank line separates related rules for readability.

### Line 355

```text
.people-edit-heading > p:last-child {
```

Selects '.people-edit-heading > p:last-child'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 356

```text
  max-width: 42ch;
```

For selector '.people-edit-heading > p:last-child', max-width caps horizontal size; value '42ch' sets caps horizontal size to 42ch.

### Line 357

```text
  margin: 0;
```

For selector '.people-edit-heading > p:last-child', margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0.

### Line 358

```text
  color: var(--muted);
```

For selector '.people-edit-heading > p:last-child', color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value.

### Line 359

```text
  font-size: 13px;
```

For selector '.people-edit-heading > p:last-child', font-size sets text size; value '13px' sets the sets text size to 13px.

### Line 360

```text
  line-height: 1.55;
```

For selector '.people-edit-heading > p:last-child', line-height sets line box height and text rhythm; value '1.55' sets sets line box height and text rhythm to 1.55.

### Line 361

```text
}
```

Closes the current CSS rule or media-query block.

### Line 362

```text

```

Blank line separates related rules for readability.

### Line 363

```text
.people-edit-eyebrow {
```

Selects '.people-edit-eyebrow'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 364

```text
  display: inline-flex;
```

For selector '.people-edit-eyebrow', display chooses the layout model or visibility behavior; value 'inline-flex' keeps the control inline while laying out children with flex.

### Line 365

```text
  align-items: center;
```

For selector '.people-edit-eyebrow', align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center.

### Line 366

```text
  gap: 7px;
```

For selector '.people-edit-eyebrow', gap sets spacing between flex/grid children; value '7px' sets the sets spacing between flex/grid children to 7px.

### Line 367

```text
  width: fit-content;
```

For selector '.people-edit-eyebrow', width sets horizontal size; value 'fit-content' sets sets horizontal size to fit-content.

### Line 368

```text
  margin: 0;
```

For selector '.people-edit-eyebrow', margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0.

### Line 369

```text
  padding: 4px 9px;
```

For selector '.people-edit-eyebrow', padding sets inside spacing between border and content; value '4px 9px' sets the sets inside spacing between border and content to 4px 9px.

### Line 370

```text
  color: var(--green-deep);
```

For selector '.people-edit-eyebrow', color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value.

### Line 371

```text
  background: var(--green-soft);
```

For selector '.people-edit-eyebrow', background sets the full background paint; value 'var(--green-soft)' uses theme custom property var(--green-soft), so the shared design token controls this value.

### Line 372

```text
  border: 1px solid var(--green-line);
```

For selector '.people-edit-eyebrow', border sets border width/style/color; value '1px solid var(--green-line)' sets sets border width/style/color to 1px solid var(--green-line).

### Line 373

```text
  border-radius: 999px;
```

For selector '.people-edit-eyebrow', border-radius rounds box corners; value '999px' sets the rounds box corners to 999px.

### Line 374

```text
  font-size: 9px;
```

For selector '.people-edit-eyebrow', font-size sets text size; value '9px' sets the sets text size to 9px.

### Line 375

```text
  font-weight: 800;
```

For selector '.people-edit-eyebrow', font-weight sets text stroke emphasis; value '800' sets sets text stroke emphasis to 800.

### Line 376

```text
  letter-spacing: .1em;
```

For selector '.people-edit-eyebrow', letter-spacing adjusts spacing between glyphs; value '.1em' sets the adjusts spacing between glyphs to .1em.

### Line 377

```text
  line-height: 1.3;
```

For selector '.people-edit-eyebrow', line-height sets line box height and text rhythm; value '1.3' sets sets line box height and text rhythm to 1.3.

### Line 378

```text
  text-transform: uppercase;
```

For selector '.people-edit-eyebrow', text-transform changes displayed letter casing; value 'uppercase' sets changes displayed letter casing to uppercase.

### Line 379

```text
}
```

Closes the current CSS rule or media-query block.

### Line 380

```text

```

Blank line separates related rules for readability.

### Line 381

```text
.people-edit-eyebrow::before {
```

Selects '.people-edit-eyebrow::before'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 382

```text
  width: 6px;
```

For selector '.people-edit-eyebrow::before', width sets horizontal size; value '6px' sets the sets horizontal size to 6px.

### Line 383

```text
  height: 6px;
```

For selector '.people-edit-eyebrow::before', height sets vertical size; value '6px' sets the sets vertical size to 6px.

### Line 384

```text
  flex: 0 0 auto;
```

For selector '.people-edit-eyebrow::before', flex controls this CSS property; value '0 0 auto' sets flex to 0 0 auto.

### Line 385

```text
  background: var(--green);
```

For selector '.people-edit-eyebrow::before', background sets the full background paint; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value.

### Line 386

```text
  border-radius: 50%;
```

For selector '.people-edit-eyebrow::before', border-radius rounds box corners; value '50%' sets the rounds box corners to 50%.

### Line 387

```text
  content: "";
```

For selector '.people-edit-eyebrow::before', content supplies generated pseudo-element content; value '""' sets supplies generated pseudo-element content to "".

### Line 388

```text
}
```

Closes the current CSS rule or media-query block.

### Line 389

```text

```

Blank line separates related rules for readability.

### Line 390

```text
.people-edit-fields {
```

Selects '.people-edit-fields'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 391

```text
  min-width: 0;
```

For selector '.people-edit-fields', min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 392

```text
  margin: 22px 32px 24px;
```

For selector '.people-edit-fields', margin sets outside spacing around the box; value '22px 32px 24px' sets the sets outside spacing around the box to 22px 32px 24px.

### Line 393

```text
  padding: 20px;
```

For selector '.people-edit-fields', padding sets inside spacing between border and content; value '20px' sets the sets inside spacing between border and content to 20px.

### Line 394

```text
  background: var(--surface-muted);
```

For selector '.people-edit-fields', background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value.

### Line 395

```text
  border: 1px solid var(--border);
```

For selector '.people-edit-fields', border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 396

```text
  border-radius: 15px;
```

For selector '.people-edit-fields', border-radius rounds box corners; value '15px' sets the rounds box corners to 15px.

### Line 397

```text
}
```

Closes the current CSS rule or media-query block.

### Line 398

```text

```

Blank line separates related rules for readability.

### Line 399

```text
.people-edit-fields:not([hidden]) {
```

Selects '.people-edit-fields:not([hidden])'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 400

```text
  display: grid;
```

For selector '.people-edit-fields:not([hidden])', display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement.

### Line 401

```text
  grid-template-columns: repeat(2, minmax(0, 1fr));
```

For selector '.people-edit-fields:not([hidden])', grid-template-columns defines grid tracks and their widths; value 'repeat(2, minmax(0, 1fr))' creates a responsive track with a minimum and flexible maximum size.

### Line 402

```text
  gap: 16px;
```

For selector '.people-edit-fields:not([hidden])', gap sets spacing between flex/grid children; value '16px' sets the sets spacing between flex/grid children to 16px.

### Line 403

```text
}
```

Closes the current CSS rule or media-query block.

### Line 404

```text

```

Blank line separates related rules for readability.

### Line 405

```text
#employee-edit-fields:not([hidden]) {
```

Selects '#employee-edit-fields:not([hidden])'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 406

```text
  grid-template-columns: minmax(0, 1.5fr) minmax(150px, .85fr);
```

For selector '#employee-edit-fields:not([hidden])', grid-template-columns defines grid tracks and their widths; value 'minmax(0, 1.5fr) minmax(150px, .85fr)' creates a responsive track with a minimum and flexible maximum size.

### Line 407

```text
}
```

Closes the current CSS rule or media-query block.

### Line 408

```text

```

Blank line separates related rules for readability.

### Line 409

```text
.edit-field-wide {
```

Selects '.edit-field-wide'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 410

```text
  grid-column: 1 / -1;
```

For selector '.edit-field-wide', grid-column places an item across specified grid columns; value '1 / -1' sets places an item across specified grid columns to 1 / -1.

### Line 411

```text
}
```

Closes the current CSS rule or media-query block.

### Line 412

```text

```

Blank line separates related rules for readability.

### Line 413

```text
.edit-field {
```

Selects '.edit-field'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 414

```text
  display: grid;
```

For selector '.edit-field', display chooses the layout model or visibility behavior; value 'grid' uses CSS Grid for two-dimensional placement.

### Line 415

```text
  min-width: 0;
```

For selector '.edit-field', min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 416

```text
  gap: 7px;
```

For selector '.edit-field', gap sets spacing between flex/grid children; value '7px' sets the sets spacing between flex/grid children to 7px.

### Line 417

```text
}
```

Closes the current CSS rule or media-query block.

### Line 418

```text

```

Blank line separates related rules for readability.

### Line 419

```text
.edit-field label {
```

Selects '.edit-field label'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 420

```text
  color: var(--ink-soft);
```

For selector '.edit-field label', color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value.

### Line 421

```text
  font-size: 12px;
```

For selector '.edit-field label', font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 422

```text
  font-weight: 700;
```

For selector '.edit-field label', font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 423

```text
}
```

Closes the current CSS rule or media-query block.

### Line 424

```text

```

Blank line separates related rules for readability.

### Line 425

```text
.edit-field input,
```

Continues the selector list with '.edit-field input'; this selector receives the same declarations as the following comma-separated selectors.

### Line 426

```text
.edit-field textarea {
```

Selects '.edit-field textarea'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 427

```text
  width: 100%;
```

For selector '.edit-field textarea', width sets horizontal size; value '100%' sets the sets horizontal size to 100%.

### Line 428

```text
  min-height: 46px;
```

For selector '.edit-field textarea', min-height sets the smallest allowed control/region height; value '46px' sets the sets the smallest allowed control/region height to 46px.

### Line 429

```text
  padding: 10px 12px;
```

For selector '.edit-field textarea', padding sets inside spacing between border and content; value '10px 12px' sets the sets inside spacing between border and content to 10px 12px.

### Line 430

```text
  border-radius: 10px;
```

For selector '.edit-field textarea', border-radius rounds box corners; value '10px' sets the rounds box corners to 10px.

### Line 431

```text
  font-size: 14px;
```

For selector '.edit-field textarea', font-size sets text size; value '14px' sets the sets text size to 14px.

### Line 432

```text
  transition: border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
```

For selector '.edit-field textarea', transition controls this CSS property; value 'border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease' sets transition to border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease.

### Line 433

```text
}
```

Closes the current CSS rule or media-query block.

### Line 434

```text

```

Blank line separates related rules for readability.

### Line 435

```text
.edit-field input:focus-visible,
```

Continues the selector list with '.edit-field input:focus-visible'; this selector receives the same declarations as the following comma-separated selectors.

### Line 436

```text
.edit-field textarea:focus-visible {
```

Selects '.edit-field textarea:focus-visible'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 437

```text
  border-color: var(--green);
```

For selector '.edit-field textarea:focus-visible', border-color controls this CSS property; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value.

### Line 438

```text
  box-shadow: 0 0 0 3px var(--focus-ring);
```

For selector '.edit-field textarea:focus-visible', box-shadow draws depth/shadow around a component; value '0 0 0 3px var(--focus-ring)' sets draws depth/shadow around a component to 0 0 0 3px var(--focus-ring).

### Line 439

```text
}
```

Closes the current CSS rule or media-query block.

### Line 440

```text

```

Blank line separates related rules for readability.

### Line 441

```text
.edit-field textarea {
```

Selects '.edit-field textarea'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 442

```text
  min-height: 104px;
```

For selector '.edit-field textarea', min-height sets the smallest allowed control/region height; value '104px' sets the sets the smallest allowed control/region height to 104px.

### Line 443

```text
  line-height: 1.5;
```

For selector '.edit-field textarea', line-height sets line box height and text rhythm; value '1.5' sets sets line box height and text rhythm to 1.5.

### Line 444

```text
  resize: vertical;
```

For selector '.edit-field textarea', resize controls this CSS property; value 'vertical' sets resize to vertical.

### Line 445

```text
}
```

Closes the current CSS rule or media-query block.

### Line 446

```text

```

Blank line separates related rules for readability.

### Line 447

```text
.edit-field small {
```

Selects '.edit-field small'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 448

```text
  color: var(--muted);
```

For selector '.edit-field small', color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value.

### Line 449

```text
  font-size: 11px;
```

For selector '.edit-field small', font-size sets text size; value '11px' sets the sets text size to 11px.

### Line 450

```text
  line-height: 1.45;
```

For selector '.edit-field small', line-height sets line box height and text rhythm; value '1.45' sets sets line box height and text rhythm to 1.45.

### Line 451

```text
}
```

Closes the current CSS rule or media-query block.

### Line 452

```text

```

Blank line separates related rules for readability.

### Line 453

```text
.visually-hidden {
```

Selects '.visually-hidden'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 454

```text
  position: absolute;
```

For selector '.visually-hidden', position chooses the positioning scheme relative to normal flow; value 'absolute' positions it against the nearest positioned ancestor.

### Line 455

```text
  width: 1px;
```

For selector '.visually-hidden', width sets horizontal size; value '1px' sets the sets horizontal size to 1px.

### Line 456

```text
  height: 1px;
```

For selector '.visually-hidden', height sets vertical size; value '1px' sets the sets vertical size to 1px.

### Line 457

```text
  padding: 0;
```

For selector '.visually-hidden', padding sets inside spacing between border and content; value '0' sets sets inside spacing between border and content to 0.

### Line 458

```text
  margin: -1px;
```

For selector '.visually-hidden', margin sets outside spacing around the box; value '-1px' sets the sets outside spacing around the box to -1px.

### Line 459

```text
  overflow: hidden;
```

For selector '.visually-hidden', overflow controls content that exceeds the box, such as scrolling or clipping; value 'hidden' clips content outside the box.

### Line 460

```text
  clip: rect(0, 0, 0, 0);
```

For selector '.visually-hidden', clip controls this CSS property; value 'rect(0, 0, 0, 0)' sets clip to rect(0, 0, 0, 0).

### Line 461

```text
  white-space: nowrap;
```

For selector '.visually-hidden', white-space controls wrapping of whitespace/text; value 'nowrap' keeps text on one line.

### Line 462

```text
  border: 0;
```

For selector '.visually-hidden', border sets border width/style/color; value '0' sets sets border width/style/color to 0.

### Line 463

```text
}
```

Closes the current CSS rule or media-query block.

### Line 464

```text

```

Blank line separates related rules for readability.

### Line 465

```text
.form-error {
```

Selects '.form-error'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 466

```text
  margin: 0 32px 18px;
```

For selector '.form-error', margin sets outside spacing around the box; value '0 32px 18px' sets the sets outside spacing around the box to 0 32px 18px.

### Line 467

```text
  padding: 10px 12px;
```

For selector '.form-error', padding sets inside spacing between border and content; value '10px 12px' sets the sets inside spacing between border and content to 10px 12px.

### Line 468

```text
  color: var(--red);
```

For selector '.form-error', color sets foreground text/icon color; value 'var(--red)' uses theme custom property var(--red), so the shared design token controls this value.

### Line 469

```text
  background: var(--red-soft);
```

For selector '.form-error', background sets the full background paint; value 'var(--red-soft)' uses theme custom property var(--red-soft), so the shared design token controls this value.

### Line 470

```text
  border: 1px solid var(--red);
```

For selector '.form-error', border sets border width/style/color; value '1px solid var(--red)' sets sets border width/style/color to 1px solid var(--red).

### Line 471

```text
  border-radius: 10px;
```

For selector '.form-error', border-radius rounds box corners; value '10px' sets the rounds box corners to 10px.

### Line 472

```text
  font-size: 12px;
```

For selector '.form-error', font-size sets text size; value '12px' sets the sets text size to 12px.

### Line 473

```text
  line-height: 1.45;
```

For selector '.form-error', line-height sets line box height and text rhythm; value '1.45' sets sets line box height and text rhythm to 1.45.

### Line 474

```text
}
```

Closes the current CSS rule or media-query block.

### Line 475

```text

```

Blank line separates related rules for readability.

### Line 476

```text
.form-error:empty {
```

Selects '.form-error:empty'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 477

```text
  display: none;
```

For selector '.form-error:empty', display chooses the layout model or visibility behavior; value 'none' removes the element from layout.

### Line 478

```text
}
```

Closes the current CSS rule or media-query block.

### Line 479

```text

```

Blank line separates related rules for readability.

### Line 480

```text
.modal-actions {
```

Selects '.modal-actions'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 481

```text
  position: sticky;
```

For selector '.modal-actions', position chooses the positioning scheme relative to normal flow; value 'sticky' sticks during scrolling within its scroll container.

### Line 482

```text
  bottom: 0;
```

For selector '.modal-actions', bottom offsets a positioned element from the bottom edge; value '0' sets offsets a positioned element from the bottom edge to 0.

### Line 483

```text
  display: flex;
```

For selector '.modal-actions', display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment.

### Line 484

```text
  align-items: center;
```

For selector '.modal-actions', align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center.

### Line 485

```text
  justify-content: flex-end;
```

For selector '.modal-actions', justify-content aligns children along the main axis; value 'flex-end' sets aligns children along the main axis to flex-end.

### Line 486

```text
  flex-wrap: wrap;
```

For selector '.modal-actions', flex-wrap allows flex children to wrap onto additional lines; value 'wrap' allows children to continue on another line.

### Line 487

```text
  gap: 10px;
```

For selector '.modal-actions', gap sets spacing between flex/grid children; value '10px' sets the sets spacing between flex/grid children to 10px.

### Line 488

```text
  padding: 16px 32px 20px;
```

For selector '.modal-actions', padding sets inside spacing between border and content; value '16px 32px 20px' sets the sets inside spacing between border and content to 16px 32px 20px.

### Line 489

```text
  background: var(--surface);
```

For selector '.modal-actions', background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value.

### Line 490

```text
  border-top: 1px solid var(--border-soft);
```

For selector '.modal-actions', border-top sets the top border; value '1px solid var(--border-soft)' sets sets the top border to 1px solid var(--border-soft).

### Line 491

```text
}
```

Closes the current CSS rule or media-query block.

### Line 492

```text

```

Blank line separates related rules for readability.

### Line 493

```text
.modal-actions .btn {
```

Selects '.modal-actions .btn'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 494

```text
  min-width: 116px;
```

For selector '.modal-actions .btn', min-width sets the smallest allowed horizontal size; value '116px' sets the sets the smallest allowed horizontal size to 116px.

### Line 495

```text
  min-height: 44px;
```

For selector '.modal-actions .btn', min-height sets the smallest allowed control/region height; value '44px' sets the sets the smallest allowed control/region height to 44px.

### Line 496

```text
  padding-inline: 18px;
```

For selector '.modal-actions .btn', padding-inline controls this CSS property; value '18px' sets the padding-inline to 18px.

### Line 497

```text
  border-radius: 11px;
```

For selector '.modal-actions .btn', border-radius rounds box corners; value '11px' sets the rounds box corners to 11px.

### Line 498

```text
  font-size: 13px;
```

For selector '.modal-actions .btn', font-size sets text size; value '13px' sets the sets text size to 13px.

### Line 499

```text
  font-weight: 700;
```

For selector '.modal-actions .btn', font-weight sets text stroke emphasis; value '700' bold emphasis.

### Line 500

```text
}
```

Closes the current CSS rule or media-query block.

### Line 501

```text

```

Blank line separates related rules for readability.

### Line 502

```text
.modal-actions .btn:disabled {
```

Selects '.modal-actions .btn:disabled'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 503

```text
  opacity: .6;
```

For selector '.modal-actions .btn:disabled', opacity makes the element and its contents translucent; value '.6' sets makes the element and its contents translucent to .6.

### Line 504

```text
  cursor: wait;
```

For selector '.modal-actions .btn:disabled', cursor chooses pointer cursor presentation; value 'wait' sets chooses pointer cursor presentation to wait.

### Line 505

```text
}
```

Closes the current CSS rule or media-query block.

### Line 506

```text

```

Blank line separates related rules for readability.

### Line 507

```text
@media (max-width: 520px) {
```

Begins a responsive media query: the nested overrides apply when (max-width: 520px) {.

### Line 508

```text
  body {
```

Selects 'body'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 509

```text
    padding: 14px;
```

For selector 'body', padding sets inside spacing between border and content; value '14px' sets the sets inside spacing between border and content to 14px.

### Line 510

```text
  }
```

Closes the current CSS rule or media-query block.

### Line 511

```text

```

Blank line separates related rules for readability.

### Line 512

```text
  .management-section {
```

Selects '.management-section'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 513

```text
    padding: 14px;
```

For selector '.management-section', padding sets inside spacing between border and content; value '14px' sets the sets inside spacing between border and content to 14px.

### Line 514

```text
  }
```

Closes the current CSS rule or media-query block.

### Line 515

```text

```

Blank line separates related rules for readability.

### Line 516

```text
  .people-edit-modal {
```

Selects '.people-edit-modal'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 517

```text
    width: calc(100% - 16px);
```

For selector '.people-edit-modal', width sets horizontal size; value 'calc(100% - 16px)' sets sets horizontal size to calc(100% - 16px).

### Line 518

```text
    max-height: calc(100dvh - 16px);
```

For selector '.people-edit-modal', max-height caps vertical size; value 'calc(100dvh - 16px)' sets caps vertical size to calc(100dvh - 16px).

### Line 519

```text
    border-radius: 16px;
```

For selector '.people-edit-modal', border-radius rounds box corners; value '16px' sets the rounds box corners to 16px.

### Line 520

```text
  }
```

Closes the current CSS rule or media-query block.

### Line 521

```text

```

Blank line separates related rules for readability.

### Line 522

```text
  .people-edit-heading {
```

Selects '.people-edit-heading'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 523

```text
    padding: 22px 20px 20px;
```

For selector '.people-edit-heading', padding sets inside spacing between border and content; value '22px 20px 20px' sets the sets inside spacing between border and content to 22px 20px 20px.

### Line 524

```text
  }
```

Closes the current CSS rule or media-query block.

### Line 525

```text

```

Blank line separates related rules for readability.

### Line 526

```text
  .people-edit-heading h2 {
```

Selects '.people-edit-heading h2'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 527

```text
    font-size: 22px;
```

For selector '.people-edit-heading h2', font-size sets text size; value '22px' sets the sets text size to 22px.

### Line 528

```text
  }
```

Closes the current CSS rule or media-query block.

### Line 529

```text

```

Blank line separates related rules for readability.

### Line 530

```text
  .people-edit-fields {
```

Selects '.people-edit-fields'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 531

```text
    margin: 16px 20px 18px;
```

For selector '.people-edit-fields', margin sets outside spacing around the box; value '16px 20px 18px' sets the sets outside spacing around the box to 16px 20px 18px.

### Line 532

```text
    padding: 16px;
```

For selector '.people-edit-fields', padding sets inside spacing between border and content; value '16px' sets the sets inside spacing between border and content to 16px.

### Line 533

```text
    border-radius: 13px;
```

For selector '.people-edit-fields', border-radius rounds box corners; value '13px' sets the rounds box corners to 13px.

### Line 534

```text
  }
```

Closes the current CSS rule or media-query block.

### Line 535

```text

```

Blank line separates related rules for readability.

### Line 536

```text
  .people-edit-fields:not([hidden]),
```

Continues the selector list with '.people-edit-fields:not([hidden])'; this selector receives the same declarations as the following comma-separated selectors.

### Line 537

```text
  #employee-edit-fields:not([hidden]) {
```

Selects '#employee-edit-fields:not([hidden])'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 538

```text
    grid-template-columns: 1fr;
```

For selector '#employee-edit-fields:not([hidden])', grid-template-columns defines grid tracks and their widths; value '1fr' sets the defines grid tracks and their widths to 1fr.

### Line 539

```text
    gap: 12px;
```

For selector '#employee-edit-fields:not([hidden])', gap sets spacing between flex/grid children; value '12px' sets the sets spacing between flex/grid children to 12px.

### Line 540

```text
  }
```

Closes the current CSS rule or media-query block.

### Line 541

```text

```

Blank line separates related rules for readability.

### Line 542

```text
  .edit-field-wide {
```

Selects '.edit-field-wide'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 543

```text
    grid-column: auto;
```

For selector '.edit-field-wide', grid-column places an item across specified grid columns; value 'auto' sets places an item across specified grid columns to auto.

### Line 544

```text
  }
```

Closes the current CSS rule or media-query block.

### Line 545

```text

```

Blank line separates related rules for readability.

### Line 546

```text
  .form-error {
```

Selects '.form-error'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 547

```text
    margin: 0 20px 14px;
```

For selector '.form-error', margin sets outside spacing around the box; value '0 20px 14px' sets the sets outside spacing around the box to 0 20px 14px.

### Line 548

```text
  }
```

Closes the current CSS rule or media-query block.

### Line 549

```text

```

Blank line separates related rules for readability.

### Line 550

```text
  .modal-actions .btn {
```

Selects '.modal-actions .btn'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 551

```text
    flex: 1;
```

For selector '.modal-actions .btn', flex controls this CSS property; value '1' sets flex to 1.

### Line 552

```text
    min-width: 0;
```

For selector '.modal-actions .btn', min-width sets the smallest allowed horizontal size; value '0' sets sets the smallest allowed horizontal size to 0.

### Line 553

```text
  }
```

Closes the current CSS rule or media-query block.

### Line 554

```text

```

Blank line separates related rules for readability.

### Line 555

```text
  .emp-item,
```

Continues the selector list with '.emp-item'; this selector receives the same declarations as the following comma-separated selectors.

### Line 556

```text
  .cust-item {
```

Selects '.cust-item'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 557

```text
    align-items: stretch;
```

For selector '.cust-item', align-items aligns children across the cross axis; value 'stretch' sets aligns children across the cross axis to stretch.

### Line 558

```text
    flex-direction: column;
```

For selector '.cust-item', flex-direction sets the main-axis direction for flex children; value 'column' stacks children vertically.

### Line 559

```text
  }
```

Closes the current CSS rule or media-query block.

### Line 560

```text

```

Blank line separates related rules for readability.

### Line 561

```text
  .item-actions {
```

Selects '.item-actions'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 562

```text
    justify-content: flex-start;
```

For selector '.item-actions', justify-content aligns children along the main axis; value 'flex-start' sets aligns children along the main axis to flex-start.

### Line 563

```text
  }
```

Closes the current CSS rule or media-query block.

### Line 564

```text
}
```

Closes the current CSS rule or media-query block.

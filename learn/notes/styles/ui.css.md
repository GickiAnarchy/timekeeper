# styles/ui.css

[Exact copy](../../original/styles/ui.css)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
:root {
```

Selects ':root'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 2

```text
  color-scheme: light;
```

For selector ':root', color-scheme controls this CSS property; value 'light' sets color-scheme to light.

### Line 3

```text
  --ink: #18231f;
```

For selector ':root', --ink controls this CSS property; value '#18231f' uses explicit color #18231f.

### Line 4

```text
  --ink-soft: #31413a;
```

For selector ':root', --ink-soft controls this CSS property; value '#31413a' uses explicit color #31413a.

### Line 5

```text
  --muted: #718078;
```

For selector ':root', --muted controls this CSS property; value '#718078' uses explicit color #718078.

### Line 6

```text
  --canvas: #f3f6f4;
```

For selector ':root', --canvas controls this CSS property; value '#f3f6f4' uses explicit color #f3f6f4.

### Line 7

```text
  --surface: #ffffff;
```

For selector ':root', --surface controls this CSS property; value '#ffffff' uses explicit color #ffffff.

### Line 8

```text
  --surface-muted: #f8faf9;
```

For selector ':root', --surface-muted controls this CSS property; value '#f8faf9' uses explicit color #f8faf9.

### Line 9

```text
  --surface-hover: #f4f8f5;
```

For selector ':root', --surface-hover controls this CSS property; value '#f4f8f5' uses explicit color #f4f8f5.

### Line 10

```text
  --control-surface: #ffffff;
```

For selector ':root', --control-surface controls this CSS property; value '#ffffff' uses explicit color #ffffff.

### Line 11

```text
  --border: #e2e9e5;
```

For selector ':root', --border controls this CSS property; value '#e2e9e5' uses explicit color #e2e9e5.

### Line 12

```text
  --border-soft: #edf1ee;
```

For selector ':root', --border-soft controls this CSS property; value '#edf1ee' uses explicit color #edf1ee.

### Line 13

```text
  --green: #24764f;
```

For selector ':root', --green controls this CSS property; value '#24764f' uses explicit color #24764f.

### Line 14

```text
  --green-deep: #195f3e;
```

For selector ':root', --green-deep controls this CSS property; value '#195f3e' uses explicit color #195f3e.

### Line 15

```text
  --green-soft: #eaf4ee;
```

For selector ':root', --green-soft controls this CSS property; value '#eaf4ee' uses explicit color #eaf4ee.

### Line 16

```text
  --green-line: #cce3d5;
```

For selector ':root', --green-line controls this CSS property; value '#cce3d5' uses explicit color #cce3d5.

### Line 17

```text
  --amber: #a96912;
```

For selector ':root', --amber controls this CSS property; value '#a96912' uses explicit color #a96912.

### Line 18

```text
  --amber-soft: #fff4dc;
```

For selector ':root', --amber-soft controls this CSS property; value '#fff4dc' uses explicit color #fff4dc.

### Line 19

```text
  --red: #b34343;
```

For selector ':root', --red controls this CSS property; value '#b34343' uses explicit color #b34343.

### Line 20

```text
  --red-soft: #fff0ee;
```

For selector ':root', --red-soft controls this CSS property; value '#fff0ee' uses explicit color #fff0ee.

### Line 21

```text
  --focus-ring: rgba(36, 118, 79, 0.24);
```

For selector ':root', --focus-ring controls this CSS property; value 'rgba(36, 118, 79, 0.24)' uses translucent color rgba(36, 118, 79, 0.24) to soften the surface/shadow.

### Line 22

```text
  --shadow-soft: 0 10px 28px rgba(28, 52, 40, 0.06);
```

For selector ':root', --shadow-soft controls this CSS property; value '0 10px 28px rgba(28, 52, 40, 0.06)' sets --shadow-soft to 0 10px 28px rgba(28, 52, 40, 0.06).

### Line 23

```text
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

For selector ':root', font-family selects the typeface stack; value 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' sets selects the typeface stack to Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif.

### Line 24

```text
  color: var(--ink);
```

For selector ':root', color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value.

### Line 25

```text
  background: var(--canvas);
```

For selector ':root', background sets the full background paint; value 'var(--canvas)' uses theme custom property var(--canvas), so the shared design token controls this value.

### Line 26

```text
}
```

Closes the current CSS rule or media-query block.

### Line 27

```text

```

Blank line separates related rules for readability.

### Line 28

```text
:root[data-theme="coastal"] {
```

Selects ':root[data-theme="coastal"]'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 29

```text
  --ink: #172a35;
```

For selector ':root[data-theme="coastal"]', --ink controls this CSS property; value '#172a35' uses explicit color #172a35.

### Line 30

```text
  --ink-soft: #35515e;
```

For selector ':root[data-theme="coastal"]', --ink-soft controls this CSS property; value '#35515e' uses explicit color #35515e.

### Line 31

```text
  --muted: #708792;
```

For selector ':root[data-theme="coastal"]', --muted controls this CSS property; value '#708792' uses explicit color #708792.

### Line 32

```text
  --canvas: #edf4f8;
```

For selector ':root[data-theme="coastal"]', --canvas controls this CSS property; value '#edf4f8' uses explicit color #edf4f8.

### Line 33

```text
  --surface: #ffffff;
```

For selector ':root[data-theme="coastal"]', --surface controls this CSS property; value '#ffffff' uses explicit color #ffffff.

### Line 34

```text
  --surface-muted: #f5f9fb;
```

For selector ':root[data-theme="coastal"]', --surface-muted controls this CSS property; value '#f5f9fb' uses explicit color #f5f9fb.

### Line 35

```text
  --surface-hover: #edf5f9;
```

For selector ':root[data-theme="coastal"]', --surface-hover controls this CSS property; value '#edf5f9' uses explicit color #edf5f9.

### Line 36

```text
  --control-surface: #ffffff;
```

For selector ':root[data-theme="coastal"]', --control-surface controls this CSS property; value '#ffffff' uses explicit color #ffffff.

### Line 37

```text
  --border: #d8e5ec;
```

For selector ':root[data-theme="coastal"]', --border controls this CSS property; value '#d8e5ec' uses explicit color #d8e5ec.

### Line 38

```text
  --border-soft: #eaf1f5;
```

For selector ':root[data-theme="coastal"]', --border-soft controls this CSS property; value '#eaf1f5' uses explicit color #eaf1f5.

### Line 39

```text
  --green: #2c6d96;
```

For selector ':root[data-theme="coastal"]', --green controls this CSS property; value '#2c6d96' uses explicit color #2c6d96.

### Line 40

```text
  --green-deep: #205474;
```

For selector ':root[data-theme="coastal"]', --green-deep controls this CSS property; value '#205474' uses explicit color #205474.

### Line 41

```text
  --green-soft: #e3f0f7;
```

For selector ':root[data-theme="coastal"]', --green-soft controls this CSS property; value '#e3f0f7' uses explicit color #e3f0f7.

### Line 42

```text
  --green-line: #c5dce9;
```

For selector ':root[data-theme="coastal"]', --green-line controls this CSS property; value '#c5dce9' uses explicit color #c5dce9.

### Line 43

```text
  --amber: #a96b20;
```

For selector ':root[data-theme="coastal"]', --amber controls this CSS property; value '#a96b20' uses explicit color #a96b20.

### Line 44

```text
  --amber-soft: #fff2d8;
```

For selector ':root[data-theme="coastal"]', --amber-soft controls this CSS property; value '#fff2d8' uses explicit color #fff2d8.

### Line 45

```text
  --focus-ring: rgba(44, 109, 150, 0.24);
```

For selector ':root[data-theme="coastal"]', --focus-ring controls this CSS property; value 'rgba(44, 109, 150, 0.24)' uses translucent color rgba(44, 109, 150, 0.24) to soften the surface/shadow.

### Line 46

```text
  --shadow-soft: 0 10px 28px rgba(27, 63, 82, 0.07);
```

For selector ':root[data-theme="coastal"]', --shadow-soft controls this CSS property; value '0 10px 28px rgba(27, 63, 82, 0.07)' sets --shadow-soft to 0 10px 28px rgba(27, 63, 82, 0.07).

### Line 47

```text
}
```

Closes the current CSS rule or media-query block.

### Line 48

```text

```

Blank line separates related rules for readability.

### Line 49

```text
:root[data-theme="harvest"] {
```

Selects ':root[data-theme="harvest"]'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 50

```text
  --ink: #30271f;
```

For selector ':root[data-theme="harvest"]', --ink controls this CSS property; value '#30271f' uses explicit color #30271f.

### Line 51

```text
  --ink-soft: #58483a;
```

For selector ':root[data-theme="harvest"]', --ink-soft controls this CSS property; value '#58483a' uses explicit color #58483a.

### Line 52

```text
  --muted: #887866;
```

For selector ':root[data-theme="harvest"]', --muted controls this CSS property; value '#887866' uses explicit color #887866.

### Line 53

```text
  --canvas: #f7f3eb;
```

For selector ':root[data-theme="harvest"]', --canvas controls this CSS property; value '#f7f3eb' uses explicit color #f7f3eb.

### Line 54

```text
  --surface: #fffdf8;
```

For selector ':root[data-theme="harvest"]', --surface controls this CSS property; value '#fffdf8' uses explicit color #fffdf8.

### Line 55

```text
  --surface-muted: #fbf7ef;
```

For selector ':root[data-theme="harvest"]', --surface-muted controls this CSS property; value '#fbf7ef' uses explicit color #fbf7ef.

### Line 56

```text
  --surface-hover: #f8f0e4;
```

For selector ':root[data-theme="harvest"]', --surface-hover controls this CSS property; value '#f8f0e4' uses explicit color #f8f0e4.

### Line 57

```text
  --control-surface: #fffdf8;
```

For selector ':root[data-theme="harvest"]', --control-surface controls this CSS property; value '#fffdf8' uses explicit color #fffdf8.

### Line 58

```text
  --border: #e8dfd0;
```

For selector ':root[data-theme="harvest"]', --border controls this CSS property; value '#e8dfd0' uses explicit color #e8dfd0.

### Line 59

```text
  --border-soft: #f0e9dd;
```

For selector ':root[data-theme="harvest"]', --border-soft controls this CSS property; value '#f0e9dd' uses explicit color #f0e9dd.

### Line 60

```text
  --green: #a66134;
```

For selector ':root[data-theme="harvest"]', --green controls this CSS property; value '#a66134' uses explicit color #a66134.

### Line 61

```text
  --green-deep: #804624;
```

For selector ':root[data-theme="harvest"]', --green-deep controls this CSS property; value '#804624' uses explicit color #804624.

### Line 62

```text
  --green-soft: #f6ebdf;
```

For selector ':root[data-theme="harvest"]', --green-soft controls this CSS property; value '#f6ebdf' uses explicit color #f6ebdf.

### Line 63

```text
  --green-line: #e8cfb9;
```

For selector ':root[data-theme="harvest"]', --green-line controls this CSS property; value '#e8cfb9' uses explicit color #e8cfb9.

### Line 64

```text
  --amber: #a96b20;
```

For selector ':root[data-theme="harvest"]', --amber controls this CSS property; value '#a96b20' uses explicit color #a96b20.

### Line 65

```text
  --amber-soft: #fff2d8;
```

For selector ':root[data-theme="harvest"]', --amber-soft controls this CSS property; value '#fff2d8' uses explicit color #fff2d8.

### Line 66

```text
  --focus-ring: rgba(166, 97, 52, 0.24);
```

For selector ':root[data-theme="harvest"]', --focus-ring controls this CSS property; value 'rgba(166, 97, 52, 0.24)' uses translucent color rgba(166, 97, 52, 0.24) to soften the surface/shadow.

### Line 67

```text
  --shadow-soft: 0 10px 28px rgba(75, 53, 31, 0.07);
```

For selector ':root[data-theme="harvest"]', --shadow-soft controls this CSS property; value '0 10px 28px rgba(75, 53, 31, 0.07)' sets --shadow-soft to 0 10px 28px rgba(75, 53, 31, 0.07).

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
:root[data-theme="midnight"] {
```

Selects ':root[data-theme="midnight"]'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 71

```text
  color-scheme: dark;
```

For selector ':root[data-theme="midnight"]', color-scheme controls this CSS property; value 'dark' sets color-scheme to dark.

### Line 72

```text
  --ink: #e7efed;
```

For selector ':root[data-theme="midnight"]', --ink controls this CSS property; value '#e7efed' uses explicit color #e7efed.

### Line 73

```text
  --ink-soft: #c4d2ce;
```

For selector ':root[data-theme="midnight"]', --ink-soft controls this CSS property; value '#c4d2ce' uses explicit color #c4d2ce.

### Line 74

```text
  --muted: #9aaca8;
```

For selector ':root[data-theme="midnight"]', --muted controls this CSS property; value '#9aaca8' uses explicit color #9aaca8.

### Line 75

```text
  --canvas: #11191d;
```

For selector ':root[data-theme="midnight"]', --canvas controls this CSS property; value '#11191d' uses explicit color #11191d.

### Line 76

```text
  --surface: #1a252a;
```

For selector ':root[data-theme="midnight"]', --surface controls this CSS property; value '#1a252a' uses explicit color #1a252a.

### Line 77

```text
  --surface-muted: #202e34;
```

For selector ':root[data-theme="midnight"]', --surface-muted controls this CSS property; value '#202e34' uses explicit color #202e34.

### Line 78

```text
  --surface-hover: #26363c;
```

For selector ':root[data-theme="midnight"]', --surface-hover controls this CSS property; value '#26363c' uses explicit color #26363c.

### Line 79

```text
  --control-surface: #142025;
```

For selector ':root[data-theme="midnight"]', --control-surface controls this CSS property; value '#142025' uses explicit color #142025.

### Line 80

```text
  --border: #35474d;
```

For selector ':root[data-theme="midnight"]', --border controls this CSS property; value '#35474d' uses explicit color #35474d.

### Line 81

```text
  --border-soft: #2b3b41;
```

For selector ':root[data-theme="midnight"]', --border-soft controls this CSS property; value '#2b3b41' uses explicit color #2b3b41.

### Line 82

```text
  --green: #67c095;
```

For selector ':root[data-theme="midnight"]', --green controls this CSS property; value '#67c095' uses explicit color #67c095.

### Line 83

```text
  --green-deep: #83d4aa;
```

For selector ':root[data-theme="midnight"]', --green-deep controls this CSS property; value '#83d4aa' uses explicit color #83d4aa.

### Line 84

```text
  --green-soft: #233d33;
```

For selector ':root[data-theme="midnight"]', --green-soft controls this CSS property; value '#233d33' uses explicit color #233d33.

### Line 85

```text
  --green-line: #365d4b;
```

For selector ':root[data-theme="midnight"]', --green-line controls this CSS property; value '#365d4b' uses explicit color #365d4b.

### Line 86

```text
  --amber: #e3b25f;
```

For selector ':root[data-theme="midnight"]', --amber controls this CSS property; value '#e3b25f' uses explicit color #e3b25f.

### Line 87

```text
  --amber-soft: #43371f;
```

For selector ':root[data-theme="midnight"]', --amber-soft controls this CSS property; value '#43371f' uses explicit color #43371f.

### Line 88

```text
  --red: #e47d76;
```

For selector ':root[data-theme="midnight"]', --red controls this CSS property; value '#e47d76' uses explicit color #e47d76.

### Line 89

```text
  --red-soft: #432b2a;
```

For selector ':root[data-theme="midnight"]', --red-soft controls this CSS property; value '#432b2a' uses explicit color #432b2a.

### Line 90

```text
  --focus-ring: rgba(103, 192, 149, 0.35);
```

For selector ':root[data-theme="midnight"]', --focus-ring controls this CSS property; value 'rgba(103, 192, 149, 0.35)' uses translucent color rgba(103, 192, 149, 0.35) to soften the surface/shadow.

### Line 91

```text
  --shadow-soft: 0 12px 32px rgba(0, 0, 0, 0.23);
```

For selector ':root[data-theme="midnight"]', --shadow-soft controls this CSS property; value '0 12px 32px rgba(0, 0, 0, 0.23)' sets --shadow-soft to 0 12px 32px rgba(0, 0, 0, 0.23).

### Line 92

```text
}
```

Closes the current CSS rule or media-query block.

### Line 93

```text

```

Blank line separates related rules for readability.

### Line 94

```text
:root[data-theme="lavender"] {
```

Selects ':root[data-theme="lavender"]'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 95

```text
  --ink: #29243a;
```

For selector ':root[data-theme="lavender"]', --ink controls this CSS property; value '#29243a' uses explicit color #29243a.

### Line 96

```text
  --ink-soft: #4b4560;
```

For selector ':root[data-theme="lavender"]', --ink-soft controls this CSS property; value '#4b4560' uses explicit color #4b4560.

### Line 97

```text
  --muted: #79738d;
```

For selector ':root[data-theme="lavender"]', --muted controls this CSS property; value '#79738d' uses explicit color #79738d.

### Line 98

```text
  --canvas: #f4f1fa;
```

For selector ':root[data-theme="lavender"]', --canvas controls this CSS property; value '#f4f1fa' uses explicit color #f4f1fa.

### Line 99

```text
  --surface: #ffffff;
```

For selector ':root[data-theme="lavender"]', --surface controls this CSS property; value '#ffffff' uses explicit color #ffffff.

### Line 100

```text
  --surface-muted: #faf8fd;
```

For selector ':root[data-theme="lavender"]', --surface-muted controls this CSS property; value '#faf8fd' uses explicit color #faf8fd.

### Line 101

```text
  --surface-hover: #f3eff9;
```

For selector ':root[data-theme="lavender"]', --surface-hover controls this CSS property; value '#f3eff9' uses explicit color #f3eff9.

### Line 102

```text
  --control-surface: #ffffff;
```

For selector ':root[data-theme="lavender"]', --control-surface controls this CSS property; value '#ffffff' uses explicit color #ffffff.

### Line 103

```text
  --border: #e3ddef;
```

For selector ':root[data-theme="lavender"]', --border controls this CSS property; value '#e3ddef' uses explicit color #e3ddef.

### Line 104

```text
  --border-soft: #eee9f5;
```

For selector ':root[data-theme="lavender"]', --border-soft controls this CSS property; value '#eee9f5' uses explicit color #eee9f5.

### Line 105

```text
  --green: #7356a8;
```

For selector ':root[data-theme="lavender"]', --green controls this CSS property; value '#7356a8' uses explicit color #7356a8.

### Line 106

```text
  --green-deep: #5c438c;
```

For selector ':root[data-theme="lavender"]', --green-deep controls this CSS property; value '#5c438c' uses explicit color #5c438c.

### Line 107

```text
  --green-soft: #f0ebf8;
```

For selector ':root[data-theme="lavender"]', --green-soft controls this CSS property; value '#f0ebf8' uses explicit color #f0ebf8.

### Line 108

```text
  --green-line: #d9cceb;
```

For selector ':root[data-theme="lavender"]', --green-line controls this CSS property; value '#d9cceb' uses explicit color #d9cceb.

### Line 109

```text
  --amber: #9a681c;
```

For selector ':root[data-theme="lavender"]', --amber controls this CSS property; value '#9a681c' uses explicit color #9a681c.

### Line 110

```text
  --amber-soft: #fff2d7;
```

For selector ':root[data-theme="lavender"]', --amber-soft controls this CSS property; value '#fff2d7' uses explicit color #fff2d7.

### Line 111

```text
  --focus-ring: rgba(115, 86, 168, 0.25);
```

For selector ':root[data-theme="lavender"]', --focus-ring controls this CSS property; value 'rgba(115, 86, 168, 0.25)' uses translucent color rgba(115, 86, 168, 0.25) to soften the surface/shadow.

### Line 112

```text
  --shadow-soft: 0 10px 28px rgba(55, 43, 82, 0.07);
```

For selector ':root[data-theme="lavender"]', --shadow-soft controls this CSS property; value '0 10px 28px rgba(55, 43, 82, 0.07)' sets --shadow-soft to 0 10px 28px rgba(55, 43, 82, 0.07).

### Line 113

```text
}
```

Closes the current CSS rule or media-query block.

### Line 114

```text

```

Blank line separates related rules for readability.

### Line 115

```text
:root[data-theme="rose"] {
```

Selects ':root[data-theme="rose"]'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 116

```text
  --ink: #38252b;
```

For selector ':root[data-theme="rose"]', --ink controls this CSS property; value '#38252b' uses explicit color #38252b.

### Line 117

```text
  --ink-soft: #5e4149;
```

For selector ':root[data-theme="rose"]', --ink-soft controls this CSS property; value '#5e4149' uses explicit color #5e4149.

### Line 118

```text
  --muted: #8a7078;
```

For selector ':root[data-theme="rose"]', --muted controls this CSS property; value '#8a7078' uses explicit color #8a7078.

### Line 119

```text
  --canvas: #faf1f2;
```

For selector ':root[data-theme="rose"]', --canvas controls this CSS property; value '#faf1f2' uses explicit color #faf1f2.

### Line 120

```text
  --surface: #fffdfd;
```

For selector ':root[data-theme="rose"]', --surface controls this CSS property; value '#fffdfd' uses explicit color #fffdfd.

### Line 121

```text
  --surface-muted: #fdf7f8;
```

For selector ':root[data-theme="rose"]', --surface-muted controls this CSS property; value '#fdf7f8' uses explicit color #fdf7f8.

### Line 122

```text
  --surface-hover: #fbf0f2;
```

For selector ':root[data-theme="rose"]', --surface-hover controls this CSS property; value '#fbf0f2' uses explicit color #fbf0f2.

### Line 123

```text
  --control-surface: #fffdfd;
```

For selector ':root[data-theme="rose"]', --control-surface controls this CSS property; value '#fffdfd' uses explicit color #fffdfd.

### Line 124

```text
  --border: #ecdde0;
```

For selector ':root[data-theme="rose"]', --border controls this CSS property; value '#ecdde0' uses explicit color #ecdde0.

### Line 125

```text
  --border-soft: #f3e9eb;
```

For selector ':root[data-theme="rose"]', --border-soft controls this CSS property; value '#f3e9eb' uses explicit color #f3e9eb.

### Line 126

```text
  --green: #a34f68;
```

For selector ':root[data-theme="rose"]', --green controls this CSS property; value '#a34f68' uses explicit color #a34f68.

### Line 127

```text
  --green-deep: #843d54;
```

For selector ':root[data-theme="rose"]', --green-deep controls this CSS property; value '#843d54' uses explicit color #843d54.

### Line 128

```text
  --green-soft: #f8e9ed;
```

For selector ':root[data-theme="rose"]', --green-soft controls this CSS property; value '#f8e9ed' uses explicit color #f8e9ed.

### Line 129

```text
  --green-line: #e9cbd4;
```

For selector ':root[data-theme="rose"]', --green-line controls this CSS property; value '#e9cbd4' uses explicit color #e9cbd4.

### Line 130

```text
  --amber: #a26823;
```

For selector ':root[data-theme="rose"]', --amber controls this CSS property; value '#a26823' uses explicit color #a26823.

### Line 131

```text
  --amber-soft: #fff2dc;
```

For selector ':root[data-theme="rose"]', --amber-soft controls this CSS property; value '#fff2dc' uses explicit color #fff2dc.

### Line 132

```text
  --red: #ad3f52;
```

For selector ':root[data-theme="rose"]', --red controls this CSS property; value '#ad3f52' uses explicit color #ad3f52.

### Line 133

```text
  --red-soft: #ffeaec;
```

For selector ':root[data-theme="rose"]', --red-soft controls this CSS property; value '#ffeaec' uses explicit color #ffeaec.

### Line 134

```text
  --focus-ring: rgba(163, 79, 104, 0.25);
```

For selector ':root[data-theme="rose"]', --focus-ring controls this CSS property; value 'rgba(163, 79, 104, 0.25)' uses translucent color rgba(163, 79, 104, 0.25) to soften the surface/shadow.

### Line 135

```text
  --shadow-soft: 0 10px 28px rgba(84, 43, 55, 0.07);
```

For selector ':root[data-theme="rose"]', --shadow-soft controls this CSS property; value '0 10px 28px rgba(84, 43, 55, 0.07)' sets --shadow-soft to 0 10px 28px rgba(84, 43, 55, 0.07).

### Line 136

```text
}
```

Closes the current CSS rule or media-query block.

### Line 137

```text

```

Blank line separates related rules for readability.

### Line 138

```text
:root[data-theme="slate"] {
```

Selects ':root[data-theme="slate"]'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 139

```text
  color-scheme: dark;
```

For selector ':root[data-theme="slate"]', color-scheme controls this CSS property; value 'dark' sets color-scheme to dark.

### Line 140

```text
  --ink: #e5edf2;
```

For selector ':root[data-theme="slate"]', --ink controls this CSS property; value '#e5edf2' uses explicit color #e5edf2.

### Line 141

```text
  --ink-soft: #c5d2dc;
```

For selector ':root[data-theme="slate"]', --ink-soft controls this CSS property; value '#c5d2dc' uses explicit color #c5d2dc.

### Line 142

```text
  --muted: #94a5b1;
```

For selector ':root[data-theme="slate"]', --muted controls this CSS property; value '#94a5b1' uses explicit color #94a5b1.

### Line 143

```text
  --canvas: #141c23;
```

For selector ':root[data-theme="slate"]', --canvas controls this CSS property; value '#141c23' uses explicit color #141c23.

### Line 144

```text
  --surface: #1d2831;
```

For selector ':root[data-theme="slate"]', --surface controls this CSS property; value '#1d2831' uses explicit color #1d2831.

### Line 145

```text
  --surface-muted: #25323c;
```

For selector ':root[data-theme="slate"]', --surface-muted controls this CSS property; value '#25323c' uses explicit color #25323c.

### Line 146

```text
  --surface-hover: #2c3b46;
```

For selector ':root[data-theme="slate"]', --surface-hover controls this CSS property; value '#2c3b46' uses explicit color #2c3b46.

### Line 147

```text
  --control-surface: #18232b;
```

For selector ':root[data-theme="slate"]', --control-surface controls this CSS property; value '#18232b' uses explicit color #18232b.

### Line 148

```text
  --border: #3b4b57;
```

For selector ':root[data-theme="slate"]', --border controls this CSS property; value '#3b4b57' uses explicit color #3b4b57.

### Line 149

```text
  --border-soft: #2e3d47;
```

For selector ':root[data-theme="slate"]', --border-soft controls this CSS property; value '#2e3d47' uses explicit color #2e3d47.

### Line 150

```text
  --green: #77b2d0;
```

For selector ':root[data-theme="slate"]', --green controls this CSS property; value '#77b2d0' uses explicit color #77b2d0.

### Line 151

```text
  --green-deep: #97cce5;
```

For selector ':root[data-theme="slate"]', --green-deep controls this CSS property; value '#97cce5' uses explicit color #97cce5.

### Line 152

```text
  --green-soft: #243b49;
```

For selector ':root[data-theme="slate"]', --green-soft controls this CSS property; value '#243b49' uses explicit color #243b49.

### Line 153

```text
  --green-line: #3b5d70;
```

For selector ':root[data-theme="slate"]', --green-line controls this CSS property; value '#3b5d70' uses explicit color #3b5d70.

### Line 154

```text
  --amber: #e0b567;
```

For selector ':root[data-theme="slate"]', --amber controls this CSS property; value '#e0b567' uses explicit color #e0b567.

### Line 155

```text
  --amber-soft: #42371f;
```

For selector ':root[data-theme="slate"]', --amber-soft controls this CSS property; value '#42371f' uses explicit color #42371f.

### Line 156

```text
  --red: #e1848a;
```

For selector ':root[data-theme="slate"]', --red controls this CSS property; value '#e1848a' uses explicit color #e1848a.

### Line 157

```text
  --red-soft: #452c33;
```

For selector ':root[data-theme="slate"]', --red-soft controls this CSS property; value '#452c33' uses explicit color #452c33.

### Line 158

```text
  --focus-ring: rgba(119, 178, 208, 0.35);
```

For selector ':root[data-theme="slate"]', --focus-ring controls this CSS property; value 'rgba(119, 178, 208, 0.35)' uses translucent color rgba(119, 178, 208, 0.35) to soften the surface/shadow.

### Line 159

```text
  --shadow-soft: 0 12px 32px rgba(0, 0, 0, 0.24);
```

For selector ':root[data-theme="slate"]', --shadow-soft controls this CSS property; value '0 12px 32px rgba(0, 0, 0, 0.24)' sets --shadow-soft to 0 12px 32px rgba(0, 0, 0, 0.24).

### Line 160

```text
}
```

Closes the current CSS rule or media-query block.

### Line 161

```text

```

Blank line separates related rules for readability.

### Line 162

```text
@font-face {
```

Selects '@font-face'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 163

```text
  font-family: 'Sapoe';
```

For selector '@font-face', font-family selects the typeface stack; value "'Sapoe'" sets selects the typeface stack to 'Sapoe'.

### Line 164

```text
  src: url('../fonts/Sapoe-Regular.otf') format('otf');
```

For selector '@font-face', src controls this CSS property; value "url('../fonts/Sapoe-Regular.otf') format('otf')" sets src to url('../fonts/Sapoe-Regular.otf') format('otf').

### Line 165

```text
  font-weight: normal;
```

For selector '@font-face', font-weight sets text stroke emphasis; value 'normal' sets sets text stroke emphasis to normal.

### Line 166

```text
  font-style: normal;
```

For selector '@font-face', font-style selects normal/italic style; value 'normal' sets selects normal/italic style to normal.

### Line 167

```text
  font-display: swap;
```

For selector '@font-face', font-display controls this CSS property; value 'swap' sets font-display to swap.

### Line 168

```text
}
```

Closes the current CSS rule or media-query block.

### Line 169

```text

```

Blank line separates related rules for readability.

### Line 170

```text
* { box-sizing: border-box; }
```

Selects '*'; declarations on this line style matching Timekeeper elements. box-sizing makes declared dimensions include border/padding when border-box; value 'border-box' sets makes declared dimensions include border/padding when border-box to border-box.

### Line 171

```text

```

Blank line separates related rules for readability.

### Line 172

```text
html { min-width: 320px; background: var(--canvas); }
```

Selects 'html'; declarations on this line style matching Timekeeper elements. min-width sets the smallest allowed horizontal size; value '320px' sets the sets the smallest allowed horizontal size to 320px. background sets the full background paint; value 'var(--canvas)' uses theme custom property var(--canvas), so the shared design token controls this value.

### Line 173

```text

```

Blank line separates related rules for readability.

### Line 174

```text
body {
```

Selects 'body'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 175

```text
  margin: 0;
```

For selector 'body', margin sets outside spacing around the box; value '0' sets sets outside spacing around the box to 0.

### Line 176

```text
  min-height: 100vh;
```

For selector 'body', min-height sets the smallest allowed control/region height; value '100vh' sets sets the smallest allowed control/region height to 100vh.

### Line 177

```text
  min-height: 100dvh;
```

For selector 'body', min-height sets the smallest allowed control/region height; value '100dvh' sets sets the smallest allowed control/region height to 100dvh.

### Line 178

```text
  color: var(--ink);
```

For selector 'body', color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value.

### Line 179

```text
  background: var(--canvas);
```

For selector 'body', background sets the full background paint; value 'var(--canvas)' uses theme custom property var(--canvas), so the shared design token controls this value.

### Line 180

```text
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

For selector 'body', font-family selects the typeface stack; value 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' sets selects the typeface stack to Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif.

### Line 181

```text
  font-size: 14px;
```

For selector 'body', font-size sets text size; value '14px' sets the sets text size to 14px.

### Line 182

```text
  line-height: 1.5;
```

For selector 'body', line-height sets line box height and text rhythm; value '1.5' sets sets line box height and text rhythm to 1.5.

### Line 183

```text
  -webkit-font-smoothing: antialiased;
```

For selector 'body', -webkit-font-smoothing controls this CSS property; value 'antialiased' sets -webkit-font-smoothing to antialiased.

### Line 184

```text
}
```

Closes the current CSS rule or media-query block.

### Line 185

```text

```

Blank line separates related rules for readability.

### Line 186

```text
button, input, select, textarea { font: inherit; }
```

Selects 'button, input, select, textarea'; declarations on this line style matching Timekeeper elements. font sets inherited font shorthand; value 'inherit' sets sets inherited font shorthand to inherit.

### Line 187

```text
button { color: inherit; }
```

Selects 'button'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'inherit' sets sets foreground text/icon color to inherit.

### Line 188

```text
button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, a:focus-visible, summary:focus-visible {
```

Selects 'button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, a:focus-visible, summary:focus-visible'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 189

```text
  outline: 3px solid var(--focus-ring);
```

For selector 'button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, a:focus-visible, summary:focus-visible', outline draws focus/diagnostic ring outside the border; value '3px solid var(--focus-ring)' sets draws focus/diagnostic ring outside the border to 3px solid var(--focus-ring).

### Line 190

```text
  outline-offset: 2px;
```

For selector 'button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, a:focus-visible, summary:focus-visible', outline-offset moves the outline away from the border; value '2px' sets the moves the outline away from the border to 2px.

### Line 191

```text
}
```

Closes the current CSS rule or media-query block.

### Line 192

```text

```

Blank line separates related rules for readability.

### Line 193

```text
input, select, textarea {
```

Selects 'input, select, textarea'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 194

```text
  color: var(--ink);
```

For selector 'input, select, textarea', color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value.

### Line 195

```text
  background: var(--control-surface);
```

For selector 'input, select, textarea', background sets the full background paint; value 'var(--control-surface)' uses theme custom property var(--control-surface), so the shared design token controls this value.

### Line 196

```text
  border: 1px solid var(--border);
```

For selector 'input, select, textarea', border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 197

```text
  border-radius: 10px;
```

For selector 'input, select, textarea', border-radius rounds box corners; value '10px' sets the rounds box corners to 10px.

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
:where(input, select, textarea) { scroll-margin-block: 16px; }
```

Selects ':where(input, select, textarea)'; declarations on this line style matching Timekeeper elements. scroll-margin-block controls this CSS property; value '16px' sets the scroll-margin-block to 16px.

### Line 201

```text
dialog[open] { max-height: calc(100vh - 16px); max-height: calc(100dvh - 16px); overflow-y: auto; overscroll-behavior: contain; }
```

Selects 'dialog[open]'; declarations on this line style matching Timekeeper elements. max-height caps vertical size; value 'calc(100vh - 16px)' sets caps vertical size to calc(100vh - 16px). max-height caps vertical size; value 'calc(100dvh - 16px)' sets caps vertical size to calc(100dvh - 16px). overflow-y controls vertical overflow; value 'auto' sets controls vertical overflow to auto. overscroll-behavior controls this CSS property; value 'contain' sets overscroll-behavior to contain.

### Line 202

```text

```

Blank line separates related rules for readability.

### Line 203

```text
input::placeholder, textarea::placeholder { color: var(--muted); opacity: .78; }
```

Selects 'input::placeholder, textarea::placeholder'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. opacity makes the element and its contents translucent; value '.78' sets makes the element and its contents translucent to .78.

### Line 204

```text
input:disabled, select:disabled, textarea:disabled { color: var(--muted); background: var(--surface-muted); cursor: not-allowed; }
```

Selects 'input:disabled, select:disabled, textarea:disabled'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value. cursor chooses pointer cursor presentation; value 'not-allowed' sets chooses pointer cursor presentation to not-allowed.

### Line 205

```text

```

Blank line separates related rules for readability.

### Line 206

```text
label { color: var(--ink-soft); font-size: 12px; font-weight: 650; }
```

Selects 'label'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink-soft)' uses theme custom property var(--ink-soft), so the shared design token controls this value. font-size sets text size; value '12px' sets the sets text size to 12px. font-weight sets text stroke emphasis; value '650' semibold emphasis.

### Line 207

```text

```

Blank line separates related rules for readability.

### Line 208

```text
button {
```

Selects 'button'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 209

```text
  border: 0;
```

For selector 'button', border sets border width/style/color; value '0' sets sets border width/style/color to 0.

### Line 210

```text
  border-radius: 10px;
```

For selector 'button', border-radius rounds box corners; value '10px' sets the rounds box corners to 10px.

### Line 211

```text
  cursor: pointer;
```

For selector 'button', cursor chooses pointer cursor presentation; value 'pointer' sets chooses pointer cursor presentation to pointer.

### Line 212

```text
  transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
```

For selector 'button', transition controls this CSS property; value 'background-color 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease' sets transition to background-color 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease.

### Line 213

```text
}
```

Closes the current CSS rule or media-query block.

### Line 214

```text

```

Blank line separates related rules for readability.

### Line 215

```text
button:disabled { opacity: 0.58; cursor: not-allowed; transform: none; }
```

Selects 'button:disabled'; declarations on this line style matching Timekeeper elements. opacity makes the element and its contents translucent; value '0.58' sets makes the element and its contents translucent to 0.58. cursor chooses pointer cursor presentation; value 'not-allowed' sets chooses pointer cursor presentation to not-allowed. transform controls this CSS property; value 'none' sets transform to none.

### Line 216

```text

```

Blank line separates related rules for readability.

### Line 217

```text
h1, h2, h3, p { margin-top: 0; }
```

Selects 'h1, h2, h3, p'; declarations on this line style matching Timekeeper elements. margin-top adds outside space above the element; value '0' sets adds outside space above the element to 0.

### Line 218

```text
h1, h2, h3 { color: var(--ink); letter-spacing: -0.035em; }
```

Selects 'h1, h2, h3'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value. letter-spacing adjusts spacing between glyphs; value '-0.035em' sets the adjusts spacing between glyphs to -0.035em.

### Line 219

```text
.muted-copy { color: var(--muted); }
```

Selects '.muted-copy'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--muted)' uses theme custom property var(--muted), so the shared design token controls this value.

### Line 220

```text

```

Blank line separates related rules for readability.

### Line 221

```text
@media (prefers-reduced-motion: reduce) {
```

Begins a responsive media query: the nested overrides apply when (prefers-reduced-motion: reduce) {.

### Line 222

```text
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
```

Selects '*, *::before, *::after'; declarations on this line style matching Timekeeper elements. scroll-behavior controls this CSS property; value 'auto !important' sets scroll-behavior to auto !important. animation-duration controls this CSS property; value '0.01ms !important' sets animation-duration to 0.01ms !important. animation-iteration-count controls this CSS property; value '1 !important' sets animation-iteration-count to 1 !important. transition-duration controls this CSS property; value '0.01ms !important' sets transition-duration to 0.01ms !important.

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
.table-sort-button {
```

Selects '.table-sort-button'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 226

```text
  display: inline-flex;
```

For selector '.table-sort-button', display chooses the layout model or visibility behavior; value 'inline-flex' keeps the control inline while laying out children with flex.

### Line 227

```text
  align-items: center;
```

For selector '.table-sort-button', align-items aligns children across the cross axis; value 'center' sets aligns children across the cross axis to center.

### Line 228

```text
  gap: 6px;
```

For selector '.table-sort-button', gap sets spacing between flex/grid children; value '6px' sets the sets spacing between flex/grid children to 6px.

### Line 229

```text
  min-height: 32px;
```

For selector '.table-sort-button', min-height sets the smallest allowed control/region height; value '32px' sets the sets the smallest allowed control/region height to 32px.

### Line 230

```text
  padding: 2px 4px;
```

For selector '.table-sort-button', padding sets inside spacing between border and content; value '2px 4px' sets the sets inside spacing between border and content to 2px 4px.

### Line 231

```text
  color: inherit;
```

For selector '.table-sort-button', color sets foreground text/icon color; value 'inherit' sets sets foreground text/icon color to inherit.

### Line 232

```text
  background: transparent;
```

For selector '.table-sort-button', background sets the full background paint; value 'transparent' sets sets the full background paint to transparent.

### Line 233

```text
  border-radius: 6px;
```

For selector '.table-sort-button', border-radius rounds box corners; value '6px' sets the rounds box corners to 6px.

### Line 234

```text
  font: inherit;
```

For selector '.table-sort-button', font sets inherited font shorthand; value 'inherit' sets sets inherited font shorthand to inherit.

### Line 235

```text
  letter-spacing: inherit;
```

For selector '.table-sort-button', letter-spacing adjusts spacing between glyphs; value 'inherit' sets adjusts spacing between glyphs to inherit.

### Line 236

```text
  text-align: left;
```

For selector '.table-sort-button', text-align aligns inline text; value 'left' aligns content to the left.

### Line 237

```text
  text-transform: inherit;
```

For selector '.table-sort-button', text-transform changes displayed letter casing; value 'inherit' sets changes displayed letter casing to inherit.

### Line 238

```text
  white-space: nowrap;
```

For selector '.table-sort-button', white-space controls wrapping of whitespace/text; value 'nowrap' keeps text on one line.

### Line 239

```text
}
```

Closes the current CSS rule or media-query block.

### Line 240

```text
.table-sort-button:hover { color: var(--green-deep); background: var(--surface-hover); }
```

Selects '.table-sort-button:hover'; declarations on this line style matching Timekeeper elements. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. background sets the full background paint; value 'var(--surface-hover)' uses theme custom property var(--surface-hover), so the shared design token controls this value.

### Line 241

```text
.table-sort-indicator { min-width: 1em; color: var(--green-deep); font-size: 1.15em; line-height: 1; text-align: center; }
```

Selects '.table-sort-indicator'; declarations on this line style matching Timekeeper elements. min-width sets the smallest allowed horizontal size; value '1em' sets the sets the smallest allowed horizontal size to 1em. color sets foreground text/icon color; value 'var(--green-deep)' uses theme custom property var(--green-deep), so the shared design token controls this value. font-size sets text size; value '1.15em' sets the sets text size to 1.15em. line-height sets line box height and text rhythm; value '1' sets sets line box height and text rhythm to 1. text-align aligns inline text; value 'center' centers inline content.

### Line 242

```text

```

Blank line separates related rules for readability.

### Line 243

```text
.confirm-dialog {
```

Selects '.confirm-dialog'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 244

```text
  width: min(92vw, 420px);
```

For selector '.confirm-dialog', width sets horizontal size; value 'min(92vw, 420px)' sets sets horizontal size to min(92vw, 420px).

### Line 245

```text
  max-height: calc(100dvh - 32px);
```

For selector '.confirm-dialog', max-height caps vertical size; value 'calc(100dvh - 32px)' sets caps vertical size to calc(100dvh - 32px).

### Line 246

```text
  padding: 24px;
```

For selector '.confirm-dialog', padding sets inside spacing between border and content; value '24px' sets the sets inside spacing between border and content to 24px.

### Line 247

```text
  border: 1px solid var(--border);
```

For selector '.confirm-dialog', border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 248

```text
  border-radius: 20px;
```

For selector '.confirm-dialog', border-radius rounds box corners; value '20px' sets the rounds box corners to 20px.

### Line 249

```text
  color: var(--ink);
```

For selector '.confirm-dialog', color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value.

### Line 250

```text
  background: var(--surface);
```

For selector '.confirm-dialog', background sets the full background paint; value 'var(--surface)' uses theme custom property var(--surface), so the shared design token controls this value.

### Line 251

```text
  box-shadow: 0 24px 70px rgba(0, 0, 0, .24);
```

For selector '.confirm-dialog', box-shadow draws depth/shadow around a component; value '0 24px 70px rgba(0, 0, 0, .24)' sets draws depth/shadow around a component to 0 24px 70px rgba(0, 0, 0, .24).

### Line 252

```text
}
```

Closes the current CSS rule or media-query block.

### Line 253

```text

```

Blank line separates related rules for readability.

### Line 254

```text
.confirm-dialog::backdrop {
```

Selects '.confirm-dialog::backdrop'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 255

```text
  background: rgba(15, 23, 42, .42);
```

For selector '.confirm-dialog::backdrop', background sets the full background paint; value 'rgba(15, 23, 42, .42)' uses translucent color rgba(15, 23, 42, .42) to soften the surface/shadow.

### Line 256

```text
  backdrop-filter: blur(3px);
```

For selector '.confirm-dialog::backdrop', backdrop-filter filters pixels behind a translucent overlay; value 'blur(3px)' sets filters pixels behind a translucent overlay to blur(3px).

### Line 257

```text
}
```

Closes the current CSS rule or media-query block.

### Line 258

```text

```

Blank line separates related rules for readability.

### Line 259

```text
.confirm-dialog p {
```

Selects '.confirm-dialog p'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 260

```text
  margin: 0 0 24px;
```

For selector '.confirm-dialog p', margin sets outside spacing around the box; value '0 0 24px' sets the sets outside spacing around the box to 0 0 24px.

### Line 261

```text
  color: var(--ink);
```

For selector '.confirm-dialog p', color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value.

### Line 262

```text
  line-height: 1.6;
```

For selector '.confirm-dialog p', line-height sets line box height and text rhythm; value '1.6' sets sets line box height and text rhythm to 1.6.

### Line 263

```text
}
```

Closes the current CSS rule or media-query block.

### Line 264

```text

```

Blank line separates related rules for readability.

### Line 265

```text
.confirm-dialog form {
```

Selects '.confirm-dialog form'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 266

```text
  display: flex;
```

For selector '.confirm-dialog form', display chooses the layout model or visibility behavior; value 'flex' uses Flexbox for one-dimensional child alignment.

### Line 267

```text
  justify-content: flex-end;
```

For selector '.confirm-dialog form', justify-content aligns children along the main axis; value 'flex-end' sets aligns children along the main axis to flex-end.

### Line 268

```text
  gap: 10px;
```

For selector '.confirm-dialog form', gap sets spacing between flex/grid children; value '10px' sets the sets spacing between flex/grid children to 10px.

### Line 269

```text
}
```

Closes the current CSS rule or media-query block.

### Line 270

```text

```

Blank line separates related rules for readability.

### Line 271

```text
.confirm-dialog button {
```

Selects '.confirm-dialog button'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 272

```text
  min-height: 44px;
```

For selector '.confirm-dialog button', min-height sets the smallest allowed control/region height; value '44px' sets the sets the smallest allowed control/region height to 44px.

### Line 273

```text
  padding: 0 16px;
```

For selector '.confirm-dialog button', padding sets inside spacing between border and content; value '0 16px' sets the sets inside spacing between border and content to 0 16px.

### Line 274

```text
  border-radius: 10px;
```

For selector '.confirm-dialog button', border-radius rounds box corners; value '10px' sets the rounds box corners to 10px.

### Line 275

```text
  font: inherit;
```

For selector '.confirm-dialog button', font sets inherited font shorthand; value 'inherit' sets sets inherited font shorthand to inherit.

### Line 276

```text
  font-weight: 650;
```

For selector '.confirm-dialog button', font-weight sets text stroke emphasis; value '650' semibold emphasis.

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
.confirm-dialog button[value="cancel"] {
```

Selects '.confirm-dialog button[value="cancel"]'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 280

```text
  color: var(--ink);
```

For selector '.confirm-dialog button[value="cancel"]', color sets foreground text/icon color; value 'var(--ink)' uses theme custom property var(--ink), so the shared design token controls this value.

### Line 281

```text
  background: var(--surface-muted);
```

For selector '.confirm-dialog button[value="cancel"]', background sets the full background paint; value 'var(--surface-muted)' uses theme custom property var(--surface-muted), so the shared design token controls this value.

### Line 282

```text
  border: 1px solid var(--border);
```

For selector '.confirm-dialog button[value="cancel"]', border sets border width/style/color; value '1px solid var(--border)' sets sets border width/style/color to 1px solid var(--border).

### Line 283

```text
}
```

Closes the current CSS rule or media-query block.

### Line 284

```text

```

Blank line separates related rules for readability.

### Line 285

```text
.confirm-dialog button[value="confirm"] {
```

Selects '.confirm-dialog button[value="confirm"]'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 286

```text
  color: white;
```

For selector '.confirm-dialog button[value="confirm"]', color sets foreground text/icon color; value 'white' sets sets foreground text/icon color to white.

### Line 287

```text
  background: var(--green);
```

For selector '.confirm-dialog button[value="confirm"]', background sets the full background paint; value 'var(--green)' uses theme custom property var(--green), so the shared design token controls this value.

### Line 288

```text
}
```

Closes the current CSS rule or media-query block.

### Line 289

```text

```

Blank line separates related rules for readability.

### Line 290

```text
.confirm-dialog button:focus-visible {
```

Selects '.confirm-dialog button:focus-visible'; declarations inside change the layout/appearance of those matching Timekeeper elements.

### Line 291

```text
  outline: 3px solid var(--focus-ring);
```

For selector '.confirm-dialog button:focus-visible', outline draws focus/diagnostic ring outside the border; value '3px solid var(--focus-ring)' sets draws focus/diagnostic ring outside the border to 3px solid var(--focus-ring).

### Line 292

```text
  outline-offset: 2px;
```

For selector '.confirm-dialog button:focus-visible', outline-offset moves the outline away from the border; value '2px' sets the moves the outline away from the border to 2px.

### Line 293

```text
}
```

Closes the current CSS rule or media-query block.

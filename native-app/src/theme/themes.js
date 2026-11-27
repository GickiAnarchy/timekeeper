export const DEFAULT_THEME_ID = 'midnight';

// Keep palettes as plain data so screens, tests, and the preference store share one source of truth.
export const THEMES = [
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep charcoal with a cool teal highlight.',
    mode: 'dark',
    colors: {
      background: '#0B1110', header: '#101917', surface: '#151F1C', raised: '#1C2925', border: '#2C3A35',
      text: '#F2F7F4', muted: '#A2B2AA', accent: '#83DDB7', accentText: '#092017', accentSoft: '#1B3B2F',
      hero: '#18372C', danger: '#FFAAA0', dangerSurface: '#3A2221', warning: '#F3CA76', warningSurface: '#3A2D18',
      input: '#111A17', ripple: 'rgba(131, 221, 183, 0.20)',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Pine green surfaces with a soft mint accent.',
    mode: 'dark',
    colors: {
      background: '#0D1410', header: '#121B15', surface: '#18231B', raised: '#202D23', border: '#34453A',
      text: '#F1F7F0', muted: '#A8B7A9', accent: '#B1E68D', accentText: '#15230E', accentSoft: '#2A4124',
      hero: '#213625', danger: '#FFAAA0', dangerSurface: '#3A2221', warning: '#F3CA76', warningSurface: '#3A2D18',
      input: '#141D16', ripple: 'rgba(177, 230, 141, 0.20)',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Navy blue with a clear aqua highlight.',
    mode: 'dark',
    colors: {
      background: '#0B1118', header: '#101A25', surface: '#152231', raised: '#1C2C3E', border: '#314458',
      text: '#F1F6FC', muted: '#A5B5C6', accent: '#83D8F0', accentText: '#071A22', accentSoft: '#1B3B4D',
      hero: '#17364A', danger: '#FFAAA0', dangerSurface: '#3A2221', warning: '#F3CA76', warningSurface: '#3A2D18',
      input: '#111C27', ripple: 'rgba(131, 216, 240, 0.20)',
    },
  },
  {
    id: 'plum',
    name: 'Plum',
    description: 'Smoky violet with a bright lilac accent.',
    mode: 'dark',
    colors: {
      background: '#120F16', header: '#19141F', surface: '#211B29', raised: '#2B2336', border: '#44364F',
      text: '#F7F2FA', muted: '#B8AFC1', accent: '#D4A8F3', accentText: '#241330', accentSoft: '#3A2B49',
      hero: '#352541', danger: '#FFAAA0', dangerSurface: '#3A2221', warning: '#F3CA76', warningSurface: '#3A2D18',
      input: '#1A1520', ripple: 'rgba(212, 168, 243, 0.20)',
    },
  },
  {
    id: 'light',
    name: 'Porcelain',
    description: 'A calm light surface with forest-green accents.',
    mode: 'light',
    colors: {
      background: '#F3F6F4', header: '#FFFFFF', surface: '#FFFFFF', raised: '#F7FAF8', border: '#DCE6E0',
      text: '#182B22', muted: '#607269', accent: '#176548', accentText: '#FFFFFF', accentSoft: '#E1F1E8',
      hero: '#E2F0E8', danger: '#A43831', dangerSurface: '#FBE9E6', warning: '#87510B', warningSurface: '#FFF1D6',
      input: '#FBFDFC', ripple: 'rgba(23, 101, 72, 0.14)',
    },
  },
];

export function isThemeId(value) {
  return THEMES.some(theme => theme.id === value);
}

export function getTheme(themeId) {
  return THEMES.find(theme => theme.id === themeId) || THEMES[0];
}

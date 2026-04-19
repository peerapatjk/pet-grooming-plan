export const pawpointColors = {
  paper: '#f4efe8',
  paper2: '#eee9e0',
  paper3: '#e6ded1',
  paperWarm: '#f1ece3',
  paperDark: '#2b2621',
  border: '#ddd5c7',
  borderStrong: '#c5bcaf',
  paperMuted: '#ece5db',
  paperRaised: '#fbf8f3',
  paperStrong: '#e1d7c8',
  ink: '#181512',
  inkMuted: '#5f584f',
  inkSoft: '#8b847a',
  primary: '#234871',
  primaryInk: '#193755',
  primaryMid: '#5b80bd',
  primaryWash: '#edf2f9',
  accent: '#bf7a3c',
  accentInk: '#915620',
  accentWash: '#fbf0e5',
  ok: '#348d66',
  okWash: '#e8f4ee',
  warn: '#b38627',
  warnWash: '#fbf3df',
  info: '#5579b7',
  infoWash: '#edf2fb',
  danger: '#b14939',
  dangerWash: '#faece9',
  shadow: 'rgba(24, 21, 18, 0.08)',
} as const;

const expoOS = process.env.EXPO_OS;

export const pawpointFonts = {
  sans: expoOS === 'web' ? 'var(--font-display)' : 'Satoshi',
  sansMedium: expoOS === 'web' ? 'var(--font-display)' : 'Satoshi-Medium',
  sansBold: expoOS === 'web' ? 'var(--font-display)' : 'Satoshi-Bold',
  serif: expoOS === 'web' ? 'var(--font-serif)' : 'Fraunces',
  serifItalic: expoOS === 'web' ? 'var(--font-serif)' : 'Fraunces-Italic',
  mono: expoOS === 'web' ? 'var(--font-mono)' : 'IBM-Plex-Mono',
  monoMedium: expoOS === 'web' ? 'var(--font-mono)' : 'IBM-Plex-Mono-Medium',
  thai: expoOS === 'web' ? 'var(--font-thai)' : 'Noto-Sans-Thai',
} as const;

export const pawpointSpacing = {
  space1: 4,
  space2: 8,
  space3: 12,
  space4: 16,
  space5: 20,
  space6: 24,
  space8: 32,
  space10: 40,
  space12: 48,
  space16: 64,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const pawpointRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const pawpointShadow = {
  sm: '0 1px 2px rgba(20,22,30,.04), 0 1px 1px rgba(20,22,30,.03)',
  soft: '0 1px 2px rgba(20,22,30,.04), 0 8px 24px -12px rgba(20,22,30,.10)',
  card: '0 2px 4px rgba(20,22,30,.04), 0 24px 48px -18px rgba(20,22,30,.18)',
} as const;

export const pawpointTypography = {
  textXs: 11,
  textSm: 13,
  textBase: 15,
  textMd: 17,
  textLg: 20,
  textXl: 26,
  text2xl: 36,
  text3xl: 48,
} as const;

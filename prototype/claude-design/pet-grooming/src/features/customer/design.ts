export const pawpointColors = {
  paper: '#f4efe8',
  paperMuted: '#ece5db',
  paperRaised: '#fbf8f3',
  paperStrong: '#e1d7c8',
  ink: '#181512',
  inkMuted: '#5f584f',
  inkSoft: '#8b847a',
  primary: '#234871',
  primaryInk: '#193755',
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
  sans: expoOS === 'web' ? 'var(--font-display)' : expoOS === 'ios' ? 'System' : 'sans-serif',
  serif: expoOS === 'web' ? 'var(--font-serif)' : expoOS === 'ios' ? 'Georgia' : 'serif',
  mono: expoOS === 'web' ? 'var(--font-mono)' : expoOS === 'ios' ? 'Courier' : 'monospace',
  thai: expoOS === 'web' ? 'var(--font-thai)' : expoOS === 'ios' ? 'System' : 'sans-serif',
} as const;

export const pawpointSpacing = {
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
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const pawpointShadow = {
  soft: `0 8px 24px ${pawpointColors.shadow}`,
  card: `0 16px 40px ${pawpointColors.shadow}`,
} as const;

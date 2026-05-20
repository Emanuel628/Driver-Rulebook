export type ThemeMode = 'dark' | 'light';

export const colors = {
  dark: {
    bg: '#0B1220',
    bgAlt: '#0F172A',
    surface: '#111827',
    surfaceRaised: '#162033',
    border: '#263247',
    text: '#F8FAFC',
    textMuted: '#CBD5E1',
    textSubtle: '#94A3B8',
    accent: '#3B82F6',
    accentSoft: '#1E3A8A',
    warning: '#F59E0B',
    danger: '#EF4444',
    success: '#22C55E',
    overlay: 'rgba(0, 0, 0, 0.56)'
  },
  light: {
    bg: '#F8FAFC',
    bgAlt: '#EEF2F7',
    surface: '#FFFFFF',
    surfaceRaised: '#F8FAFC',
    border: '#D9E2EF',
    text: '#0F172A',
    textMuted: '#334155',
    textSubtle: '#64748B',
    accent: '#2563EB',
    accentSoft: '#DBEAFE',
    warning: '#B45309',
    danger: '#DC2626',
    success: '#16A34A',
    overlay: 'rgba(15, 23, 42, 0.36)'
  }
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  pill: 999
} as const;

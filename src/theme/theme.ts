export const colors = {
  // Primary colors
  primary: '#3A86FF',
  primaryDark: '#265DCC',
  primaryLight: '#EDF6FF',

  // Secondary colors
  secondary: '#FFBE0B',
  accent: '#FF6B6B',
  success: '#06D6A0',
  error: '#EF476F',

  // Background colors
  background: '#FFFFFF',
  surface: '#F7F9FC',
  border: '#E2E2E2',

  // Text colors
  textPrimary: '#1A1A1A',
  textSecondary: '#6E6E6E',

  // Shadows
  shadowLight: 'rgba(0, 0, 0, 0.06)',
  shadowMedium: 'rgba(0, 0, 0, 0.12)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 18,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
};

export const shadows = {
  light: {
    shadowColor: colors.shadowLight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadowMedium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};
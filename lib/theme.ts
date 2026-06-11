// Light theme colors per spec
export const COLORS = {
  // Primary
  bg: '#F5F2EC', // Background
  ink: '#0E0E0E', // Text color (dark ink)
  teal: '#48D2B4', // Featured/accent
  card: '#FFFFFF', // Card background (white)

  // Extended palette
  textSecondary: '#666666',
  textTertiary: '#999999',
  border: '#E0E0E0',
  success: '#4CAF50',
  warning: '#FFC107',
  danger: '#FF5252',
  disabled: '#CCCCCC',
};

export const TYPOGRAPHY = {
  h1: { fontSize: 28, fontWeight: '700' as const },
  h2: { fontSize: 24, fontWeight: '700' as const },
  h3: { fontSize: 20, fontWeight: '600' as const },
  h4: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 14, fontWeight: '400' as const },
  bodyBold: { fontSize: 14, fontWeight: '600' as const },
  small: { fontSize: 12, fontWeight: '400' as const },
  smallBold: { fontSize: 12, fontWeight: '600' as const },
};

export const BORDER_RADIUS = {
  small: 6,
  medium: 8,
  large: 12,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

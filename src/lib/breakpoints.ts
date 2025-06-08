export const breakpoints = {
  mobile: {
    min: 0,
    max: 767,
    baseFontSize: '16px',
    baseLineHeight: 1.5,
    spacing: {
      xs: '0.25rem',  // 4px
      sm: '0.5rem',   // 8px
      md: '1rem',     // 16px
      lg: '1.5rem',   // 24px
      xl: '2rem',     // 32px
    },
    touchTarget: '44px', // Minimum touch target size
  },
  tablet: {
    min: 768,
    max: 1023,
    baseFontSize: '16px',
    baseLineHeight: 1.5,
    spacing: {
      xs: '0.5rem',   // 8px
      sm: '0.75rem',  // 12px
      md: '1.25rem',  // 20px
      lg: '2rem',     // 32px
      xl: '3rem',     // 48px
    },
    touchTarget: '44px',
  },
  desktop: {
    min: 1024,
    max: Infinity,
    baseFontSize: '16px',
    baseLineHeight: 1.6,
    spacing: {
      xs: '0.5rem',   // 8px
      sm: '1rem',     // 16px
      md: '1.5rem',   // 24px
      lg: '2.5rem',   // 40px
      xl: '4rem',     // 64px
    },
    touchTarget: '44px',
  },
} as const;

export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.mobile.max}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet.min}px) and (max-width: ${breakpoints.tablet.max}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop.min}px)`,
  touch: `@media (hover: none) and (pointer: coarse)`,
  hover: `@media (hover: hover) and (pointer: fine)`,
} as const;

export type DeviceType = keyof typeof breakpoints;
export type SpacingSize = keyof typeof breakpoints.mobile.spacing;

// Helper functions
export const getSpacing = (size: SpacingSize, device: DeviceType = 'mobile') => {
  return breakpoints[device].spacing[size];
};

export const getBreakpoint = (device: DeviceType) => {
  return breakpoints[device];
};

export const getCurrentDevice = (width: number): DeviceType => {
  if (width < breakpoints.tablet.min) return 'mobile';
  if (width < breakpoints.desktop.min) return 'tablet';
  return 'desktop';
};

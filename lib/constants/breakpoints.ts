// Responsive breakpoints for Official Musty
// Dashboard split breakpoint: 1024px — below this, layout goes single-column.

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
  DASHBOARD_SPLIT: 1024,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

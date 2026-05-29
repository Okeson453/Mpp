// ★ LOCKED. NEVER CHANGED. ★
// Design token system for Official Musty — Muster Point Protocol
// All colors, fonts, and state mappings live here.
// Never use hardcoded hex values anywhere else in the codebase.

import type { MPPState } from '@/lib/types/mpp';

export const TOKENS = {
  // Foundation (dark stack — 5 levels)
  void:        '#080A0C',   // Main background. Every page.
  obsidian:    '#0D1117',   // Secondary bg, sidebar
  carbon:      '#141921',   // Card backgrounds
  graphite:    '#1C2430',   // Hover states
  slate:       '#252F3D',   // Borders, dividers

  // Pink Signal — Institutional Trap / Hunt / Danger
  pinkDeep:    '#C4195A',
  pinkCore:    '#E8266E',   // Borders, tags
  pinkGlow:    '#FF3D7F',   // Primary pink accent
  pinkSoft:    '#FF7AAD',   // Labels, text
  pinkGhost:   'rgba(232,38,110,0.08)',

  // Cyan Signal — Institutional Expansion / Confirmation / Target
  cyanDeep:    '#0A7C8C',
  cyanCore:    '#0DB8CC',   // Borders, eyebrows
  cyanGlow:    '#18D4EA',   // Primary cyan accent
  cyanSoft:    '#7EEAF5',   // Labels, text
  cyanGhost:   'rgba(13,184,204,0.08)',

  // Text
  white:       '#F0F4F8',   // Headlines
  silver:      '#8A9BB0',   // Body text
  iron:        '#4A5568',   // Muted / idle states

  // Accent (use sparingly — once per screen max)
  gold:        '#C8A84B',
  goldSoft:    '#F0D080',
} as const;

export const FONTS = {
  display: "'Bebas Neue', sans-serif",    // Titles, state headlines, section names
  body:    "'Syne', sans-serif",          // Body text, descriptions
  mono:    "'JetBrains Mono', monospace", // Data, metrics, eyebrows, system states
} as const;

export const STATE_COLORS: Record<MPPState, string> = {
  IDLE:        TOKENS.iron,
  SCANNING:    TOKENS.iron,
  MAPPED:      TOKENS.iron,
  ALERT:       TOKENS.pinkGlow,
  PRIMED:      TOKENS.gold,
  EXECUTING:   TOKENS.cyanGlow,
  MANAGING:    TOKENS.cyanGlow,
  CLOSED:      TOKENS.iron,
  INVALIDATED: TOKENS.pinkGlow,
} as const;

export type TokenKey = keyof typeof TOKENS;
export type FontKey = keyof typeof FONTS;

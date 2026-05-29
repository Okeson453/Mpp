import type { Config } from 'tailwindcss';

const TOKENS = {
  void:        '#080A0C',
  obsidian:    '#0D1117',
  carbon:      '#141921',
  graphite:    '#1C2430',
  slate:       '#252F3D',
  pinkDeep:    '#C4195A',
  pinkCore:    '#E8266E',
  pinkGlow:    '#FF3D7F',
  pinkSoft:    '#FF7AAD',
  cyanDeep:    '#0A7C8C',
  cyanCore:    '#0DB8CC',
  cyanGlow:    '#18D4EA',
  cyanSoft:    '#7EEAF5',
  white:       '#F0F4F8',
  silver:      '#8A9BB0',
  iron:        '#4A5568',
  gold:        '#C8A84B',
  goldSoft:    '#F0D080',
};

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void:         TOKENS.void,
        obsidian:     TOKENS.obsidian,
        carbon:       TOKENS.carbon,
        graphite:     TOKENS.graphite,
        slate:        TOKENS.slate,
        'pink-deep':  TOKENS.pinkDeep,
        'pink-core':  TOKENS.pinkCore,
        'pink-glow':  TOKENS.pinkGlow,
        'pink-soft':  TOKENS.pinkSoft,
        'cyan-deep':  TOKENS.cyanDeep,
        'cyan-core':  TOKENS.cyanCore,
        'cyan-glow':  TOKENS.cyanGlow,
        'cyan-soft':  TOKENS.cyanSoft,
        muted:        TOKENS.silver,
        iron:         TOKENS.iron,
        gold:         TOKENS.gold,
        'gold-soft':  TOKENS.goldSoft,
      },
      fontFamily: {
        display: ["'Bebas Neue'", 'sans-serif'],
        body:    ["'Syne'", 'sans-serif'],
        mono:    ["'JetBrains Mono'", 'monospace'],
      },
      borderRadius: {
        // LAW 05: Max 2px. No rounded cards. No pill buttons. Precision language only.
        DEFAULT: '2px',
        sm:      '2px',
        md:      '2px',
        lg:      '2px',
        xl:      '2px',
        '2xl':   '2px',
        '3xl':   '2px',
        full:    '9999px', // Only for dots and pulse indicators
      },
      animation: {
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'glow-ping':  'glowPing 1.5s ease-out infinite',
        'ticker':     'ticker 22s linear infinite',
        'fade-up':    'fadeUp 0.7s ease forwards',
        'scanline':   'scanline 8s linear infinite',
        'float':      'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        glowPing: {
          '0%':   { boxShadow: '0 0 0 0 rgba(232,38,110,0.5)' },
          '70%':  { boxShadow: '0 0 0 12px rgba(232,38,110,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(232,38,110,0)' },
        },
        ticker: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        scanline: {
          from: { transform: 'translateY(-100%)' },
          to:   { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      safelist: [
        'text-pink-glow', 'text-cyan-glow', 'text-gold', 'text-iron',
        'border-pink-core', 'border-cyan-core', 'border-gold',
        'bg-pink-ghost', 'bg-cyan-ghost',
      ],
    },
  },
  plugins: [],
} satisfies Config;

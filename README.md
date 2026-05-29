# Official Musty — Muster Point Protocol Frontend

Production-grade Next.js 15 trading terminal implementing the Muster Point Protocol.

## Stack

| Layer        | Technology                                  |
|--------------|---------------------------------------------|
| Framework    | Next.js 15 App Router (Turbopack)           |
| State        | Zustand + Immer                             |
| Types        | TypeScript 5.4 strict mode                 |
| Styling      | Tailwind CSS 3.4 + CSS custom properties   |
| UI           | Radix UI primitives                         |
| Animation    | Framer Motion                               |
| Chart        | Canvas 2D custom engine (no library)        |
| Data fetching| TanStack Query v5                          |
| WebSocket    | Native WS with exponential backoff          |
| Forms        | React Hook Form + Zod                       |
| Tests        | Vitest (unit) + Playwright (e2e)            |

## Setup

```bash
pnpm install
cp .env.local .env.local.example
pnpm dev
```

## Project Structure

```
app/                    # Next.js App Router pages & API routes
  dashboard/            # Live MPP terminal (chart + sidebar)
  scanner/              # 8-instrument grid scanner
  protocol/             # Full MPP documentation
  playbook/             # Setup library + 18-point scorer
  journal/              # Trade journal with session grouping
  track-record/         # Performance metrics vault
  masterclass/          # Video lesson vault
  community/            # Discord + testimonials
  auth/                 # Login / logout
  api/                  # Next.js route handlers
components/
  ui/                   # Primitives (Button, Input, Badge…)
  layout/               # Shell (Header, Sidebar, Ticker…)
  chart/                # Canvas engine + toolbar + legend
  cards/                # State, Gate, Zone, Score cards
  sections/             # Full page sections
hooks/                  # Custom React hooks
stores/                 # Zustand stores
lib/
  types/                # TypeScript interfaces
  constants/            # Tokens, states, gates, messages
  utils/                # Formatters, validators, cn
  api/                  # REST + WebSocket clients
tests/
  unit/                 # Vitest unit tests
  e2e/                  # Playwright end-to-end
```

## Design Laws

- **LAW 01** — Background is `#080A0C` (void). Non-negotiable.
- **LAW 02** — Pink = institutional trap. Cyan = expansion target. Never swapped.
- **LAW 03** — Font stack: Bebas Neue (display), Syne (body), JetBrains Mono (data).
- **LAW 04** — All text `#F0F4F8` white, `#8A9BB0` silver, `#4A5568` iron. No others.
- **LAW 05** — Max border-radius: `2px`. No rounded cards. No pill buttons.
- **LAW 06** — Borders use `rgba(255,255,255,0.04)` or state-specific color.
- **LAW 07** — Animations: fade-up (0.7s), pulse-slow, scanline. Purposeful only.
- **LAW 08** — `executeTrade()` blocked if score < 12 or any gate is not PASS.
- **LAW 09** — Noise overlay is fixed, z-9999, pointer-events-none, opacity 0.35.
- **LAW 10** — Sidebar always 380px wide. Never responsive to < 380px.

## Protocol States

IDLE → SCANNING → MAPPED → ALERT → PRIMED → EXECUTING → MANAGING → CLOSED / INVALIDATED

// Gate definitions — the 5 mandatory validation gates
// All 5 must PASS and score ≥ 12/18 before execution is allowed.
// Gate 4 (Reclaim) is THE MASTER GATE — the single most critical confirmation.

import type { Gate } from '@/lib/types/mpp';

export const INITIAL_GATES: Gate[] = [
  {
    id: 1,
    label: 'Gate 1 — Directional Bias',
    status: 'PENDING',
    description: '1H trend confirms bullish directional bias. Pink zone is below current structure.',
  },
  {
    id: 2,
    label: 'Gate 2 — Zone Validity',
    status: 'PENDING',
    description:
      'Pink and Cyan zones anchored to valid structure: prior swing, order block, or equal highs.',
  },
  {
    id: 3,
    label: 'Gate 3 — Sweep Confirmation',
    status: 'PENDING',
    description: 'Price swept below pink zone with visible rejection wick on 5M timeframe.',
  },
  {
    id: 4,
    // THE MASTER GATE — most critical confirmation in the protocol
    label: 'Gate 4 — Reclaim Candle',
    status: 'PENDING',
    description:
      '5M candle closed back inside consolidation range above pink zone. THE MASTER GATE.',
  },
  {
    id: 5,
    label: 'Gate 5 — Risk:Reward',
    status: 'PENDING',
    description: 'Minimum 2:1 risk-to-reward from entry to cyan target. Ideal: 3:1 or better.',
  },
];

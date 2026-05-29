// MPP State Configuration Map — all 9 protocol states
// Each state has exact triggers, exit conditions, and display config.

import type { MPPState, StateConfig } from '@/lib/types/mpp';

export const STATE_CONFIG: Record<MPPState, StateConfig> = {
  IDLE: {
    tag: 'IDLE',
    headline: 'IDLE',
    body: 'System idle. Awaiting session open. No active structure.',
    color: 'iron',
    triggers: ['Session opens', 'User activates instrument'],
    exitConditions: ['Begin scanning'],
  },
  SCANNING: {
    tag: 'OBSERVATION',
    headline: 'SCANNING',
    body: '1H structure mapping in progress. Awaiting consolidation range identification. No zones pre-marked.',
    color: 'iron',
    triggers: ['Session open', 'Price action begins forming range'],
    exitConditions: ['Consolidation range identified with valid pink and cyan zones'],
  },
  MAPPED: {
    tag: 'OBSERVATION',
    headline: 'MAPPED',
    body: 'Range identified. Pink and Cyan zones pre-marked. Awaiting price approach to pink zone.',
    color: 'iron',
    triggers: ['Valid consolidation range confirmed', 'Both zones anchored'],
    exitConditions: ['Price approaches pink zone within 0.5% proximity'],
  },
  ALERT: {
    tag: 'ALERT',
    headline: 'ALERT',
    body: 'Price approaching pink zone. Switch to 5M. Fingers off keyboard. Observation only.',
    color: 'pink',
    triggers: ['Price within 0.5% of pink zone upper boundary'],
    exitConditions: [
      'Sweep confirmed → PRIMED',
      'Price rejects → back to MAPPED',
      'Price breaks structure → INVALIDATED',
    ],
  },
  PRIMED: {
    tag: 'PRIMED',
    headline: 'PRIMED',
    body: 'Sweep confirmed. Reclaim candle detected on 5M. Validate all gates before execution.',
    color: 'gold',
    triggers: [
      '5M candle wick below pink zone + close above',
      'Reclaim candle closes inside range',
    ],
    exitConditions: [
      'All 5 gates pass + score ≥ 12 → EXECUTING',
      'Structure breaks → INVALIDATED',
    ],
  },
  EXECUTING: {
    tag: 'EXECUTING',
    headline: 'EXECUTING',
    body: 'Entry triggered. Stop below wick. Target locked at Cyan zone. Step away from the screen.',
    color: 'cyan',
    triggers: ['Manual execution after all gates pass', 'Score ≥ 12/18'],
    exitConditions: [
      'Target reached → CLOSED',
      'Stop hit → INVALIDATED',
      'Move to management → MANAGING',
    ],
  },
  MANAGING: {
    tag: 'EXECUTING',
    headline: 'MANAGING',
    body: 'Position active. No manual exits. Target: Cyan zone. Invalidation: acceptance below pink zone.',
    color: 'cyan',
    triggers: ['Price moves favorably post-entry'],
    exitConditions: [
      'Price reaches cyan zone → CLOSED',
      'Price closes below pink → INVALIDATED',
    ],
  },
  CLOSED: {
    tag: 'CLOSED',
    headline: 'CLOSED',
    body: 'Trade complete. Document outcome in journal. Reset to IDLE. Next structural cycle.',
    color: 'iron',
    triggers: ['Target reached', 'Manual close at breakeven'],
    exitConditions: ['User resets → SCANNING'],
  },
  INVALIDATED: {
    tag: 'INVALIDATED',
    headline: 'INVALIDATED',
    body: 'Setup breached. Price accepted below pink zone. Return to IDLE. No re-entry on this cycle.',
    color: 'pink',
    triggers: [
      'Stop loss triggered',
      'Price accepts below pink zone',
      'Structure breaks',
    ],
    exitConditions: ['User resets → SCANNING'],
  },
};

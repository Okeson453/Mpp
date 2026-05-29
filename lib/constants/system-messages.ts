// System consciousness messages — all 11 journal stream messages
// These appear in the journal stream and represent the voice of the protocol.

export const SYSTEM_MESSAGES = {
  SWEEP_DETECTED:     'Sweep detected. Switch to 5M. Hands off keyboard.',
  RECLAIM_PENDING:    'Reclaim pending. Observe only. Do not act.',
  RECLAIM_CONFIRMED:  'Reclaim confirmed. Validate all 5 gates now.',
  PROTOCOL_PRIMED:    'Protocol primed. Score before you execute.',
  EXECUTION_APPROVED: 'Execution approved. Enter above reclaim high.',
  EXECUTION_BLOCKED:  'Execution blocked. Review gate failures.',
  TARGET_ACTIVE:      'Target magnet active. Do not exit early.',
  PROTOCOL_INVALID:   'Protocol invalidated. Price accepted below pink. Stand down.',
  TRADE_CLOSED:       'Trade closed. Document outcome. Reset system.',
  STRUCTURE_CHANGED:  'SENTINEL: Structure has changed. Re-map required.',
  SCORE_WARNING:      'Score below minimum. No execution permitted.',
} as const;

export type SystemMessageKey = keyof typeof SYSTEM_MESSAGES;

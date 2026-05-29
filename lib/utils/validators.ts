// Validation functions for gate evaluation, scoring, and execution authorization
// LAW 08: executeTrade requires ALL 5 gates = PASS + setupScore.total >= 12

import type {
  Gate,
  GateStatus,
  MPPState,
  Zone,
  ConsolidationRange,
  SetupScore,
} from '@/lib/types/mpp';
import { getGrade } from '@/lib/utils/formatters';

export function evaluateGate(
  id: number,
  state: MPPState,
  zones: { pink: Zone | null; cyan: Zone | null },
  range: ConsolidationRange | null,
): GateStatus {
  switch (id) {
    case 1:
      // Directional bias: PRIMED or later states imply confirmed bias
      return ['PRIMED', 'EXECUTING', 'MANAGING'].includes(state) ? 'PASS' : 'PENDING';
    case 2:
      // Zone validity: zones must exist and be active
      return zones.pink?.active && zones.cyan?.active ? 'PASS' : 'PENDING';
    case 3:
      // Sweep confirmation: PRIMED state means sweep happened
      return ['PRIMED', 'EXECUTING', 'MANAGING'].includes(state) ? 'PASS' : 'PENDING';
    case 4:
      // Reclaim candle: THE MASTER GATE — confirmed on PRIMED+
      return ['PRIMED', 'EXECUTING', 'MANAGING'].includes(state) ? 'PASS' : 'PENDING';
    case 5:
      // Risk:Reward: calculated from zone coordinates
      if (!zones.pink || !zones.cyan || !range) return 'PENDING';
      const entry = range.low;
      const stop = zones.pink.lower;
      const target = zones.cyan.upper;
      const rr = calculateRiskReward(entry, stop, target);
      return rr >= 2.0 ? 'PASS' : 'FAIL';
    default:
      return 'PENDING';
  }
}

export function calculateSetupScore(
  zones: { pink: Zone | null; cyan: Zone | null },
  gates: Gate[],
  range: ConsolidationRange | null,
): SetupScore {
  const passCount = gates.filter((g) => g.status === 'PASS').length;

  // Score components based on gate status and zone quality
  const pinkAnchor = zones.pink?.active
    ? zones.pink.anchor === 'order_block' || zones.pink.anchor === 'prior_swing'
      ? 3
      : 2
    : 0;

  const cyanAnchor = zones.cyan?.active ? 2 : 0;

  const htfBias = passCount >= 1 ? 3 : 0;

  const reclaimStrength = gates.find((g) => g.id === 4)?.status === 'PASS' ? 3 : 0;

  const riskReward = gates.find((g) => g.id === 5)?.status === 'PASS'
    ? (() => {
        if (!zones.pink || !zones.cyan || !range) return 0;
        const rr = calculateRiskReward(range.low, zones.pink.lower, zones.cyan.upper);
        return rr >= 3.0 ? 3 : rr >= 2.0 ? 2 : 0;
      })()
    : 0;

  const zoneQuality = range?.volatilityCompression ? 3 : 2;

  const total = pinkAnchor + cyanAnchor + htfBias + reclaimStrength + riskReward + zoneQuality;

  return {
    pinkAnchor,
    cyanAnchor,
    htfBias,
    reclaimStrength,
    riskReward,
    zoneQuality,
    total,
    grade: getGrade(total),
  };
}

export function isExecutionAllowed(score: SetupScore | null, gates: Gate[]): boolean {
  if (!score) return false;
  const allGatesPass = gates.every((g) => g.status === 'PASS');
  return allGatesPass && score.total >= 12;
}

export function validateZoneAnchor(zone: Zone): boolean {
  const validAnchors = ['prior_swing', 'order_block', 'prior_session_high', 'equal_highs'];
  return validAnchors.includes(zone.anchor) && zone.upper > zone.lower;
}

export function calculateRiskReward(entry: number, stop: number, target: number): number {
  const risk = Math.abs(entry - stop);
  const reward = Math.abs(target - entry);
  if (risk === 0) return 0;
  return reward / risk;
}

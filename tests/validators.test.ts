import { describe, it, expect } from 'vitest';
import {
  calculateRiskReward,
  isExecutionAllowed,
  validateZoneAnchor,
  calculateSetupScore,
} from '@/lib/utils/validators';
import { formatPrice, formatChange, getGrade, formatRR } from '@/lib/utils/formatters';
import type { Gate, Zone } from '@/lib/types/mpp';
import { INITIAL_GATES } from '@/lib/constants/gate-definitions';

// ─── Validators ───────────────────────────────────────────────────────────────

describe('calculateRiskReward', () => {
  it('returns correct R:R ratio', () => {
    expect(calculateRiskReward(100, 95, 115)).toBeCloseTo(3, 1);
  });

  it('returns 0 when risk is zero', () => {
    expect(calculateRiskReward(100, 100, 120)).toBe(0);
  });

  it('handles stop above entry correctly', () => {
    const rr = calculateRiskReward(100, 110, 80);
    expect(rr).toBeGreaterThan(0);
  });
});

describe('isExecutionAllowed', () => {
  it('blocks execution when score is null', () => {
    const gates: Gate[] = INITIAL_GATES.map((g) => ({ ...g, status: 'PASS' }));
    expect(isExecutionAllowed(null, gates)).toBe(false);
  });

  it('blocks execution when any gate fails', () => {
    const gates: Gate[] = INITIAL_GATES.map((g, i) => ({
      ...g,
      status: i === 3 ? 'FAIL' : 'PASS',
    }));
    const score = { pinkAnchor:3, cyanAnchor:3, htfBias:3, reclaimStrength:3, riskReward:3, zoneQuality:3, total:18, grade:'A+' as const };
    expect(isExecutionAllowed(score, gates)).toBe(false);
  });

  it('allows execution when all gates pass and score >= 12', () => {
    const gates: Gate[] = INITIAL_GATES.map((g) => ({ ...g, status: 'PASS' }));
    const score = { pinkAnchor:2, cyanAnchor:2, htfBias:2, reclaimStrength:2, riskReward:2, zoneQuality:2, total:12, grade:'B' as const };
    expect(isExecutionAllowed(score, gates)).toBe(true);
  });

  it('blocks execution when score < 12 even with all gates passing', () => {
    const gates: Gate[] = INITIAL_GATES.map((g) => ({ ...g, status: 'PASS' }));
    const score = { pinkAnchor:1, cyanAnchor:1, htfBias:1, reclaimStrength:2, riskReward:2, zoneQuality:1, total:8, grade:'C' as const };
    expect(isExecutionAllowed(score, gates)).toBe(false);
  });
});

describe('validateZoneAnchor', () => {
  it('validates a proper zone', () => {
    const zone: Zone = { upper: 100, lower: 95, active: true, anchor: 'prior_swing' };
    expect(validateZoneAnchor(zone)).toBe(true);
  });

  it('rejects speculative anchor', () => {
    const zone: Zone = { upper: 100, lower: 95, active: true, anchor: 'speculative' };
    expect(validateZoneAnchor(zone)).toBe(false);
  });

  it('rejects inverted zone', () => {
    const zone: Zone = { upper: 90, lower: 95, active: true, anchor: 'prior_swing' };
    expect(validateZoneAnchor(zone)).toBe(false);
  });
});

// ─── Formatters ───────────────────────────────────────────────────────────────

describe('formatPrice', () => {
  it('formats price with 2 decimal places', () => {
    expect(formatPrice(61840)).toBe('61,840.00');
  });

  it('formats large numbers with commas', () => {
    expect(formatPrice(97200)).toBe('97,200.00');
  });
});

describe('formatChange', () => {
  it('adds + sign for positive change', () => {
    expect(formatChange(2.4)).toBe('+2.4%');
  });

  it('shows negative sign for negative change', () => {
    expect(formatChange(-1.8)).toBe('-1.8%');
  });
});

describe('getGrade', () => {
  it('returns A+ for score >= 15', () => expect(getGrade(16)).toBe('A+'));
  it('returns B for score >= 12',  () => expect(getGrade(13)).toBe('B'));
  it('returns C for score > 0',    () => expect(getGrade(8)).toBe('C'));
  it('returns NO TRADE for 0',     () => expect(getGrade(0)).toBe('NO TRADE'));
});

describe('formatRR', () => {
  it('formats risk reward correctly', () => {
    expect(formatRR(3.8)).toBe('3.8:1');
  });
});

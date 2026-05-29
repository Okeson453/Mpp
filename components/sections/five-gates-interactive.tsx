'use client';

import { useState } from 'react';
import type { Gate, GateStatus } from '@/lib/types/mpp';
import { INITIAL_GATES } from '@/lib/constants/gate-definitions';
import { GateItem } from '@/components/cards/gate-item';
import { SectionEyebrow } from '@/components/layout/section-eyebrow';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

function cycleStatus(current: GateStatus): GateStatus {
  if (current === 'PENDING') return 'PASS';
  if (current === 'PASS')    return 'FAIL';
  return 'PENDING';
}

export function FiveGatesInteractive() {
  const [gates, setGates] = useState<Gate[]>([...INITIAL_GATES]);

  const passCount = gates.filter((g) => g.status === 'PASS').length;
  const failedGates = gates.filter((g) => g.status === 'FAIL');
  const allPass = passCount === 5;

  const handleClick = (id: number) => {
    setGates((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: cycleStatus(g.status) } : g)),
    );
  };

  const reset = () => setGates([...INITIAL_GATES]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <SectionEyebrow number="03" label="Entry Validation System" />
        <Button variant="ghost" size="sm" onClick={reset}>Reset All</Button>
      </div>

      <h2 className="font-display text-[clamp(40px,5vw,64px)] text-white leading-none">
        ALL 5 GATES MUST PASS
      </h2>

      <div className="flex flex-col gap-2">
        {gates.map((gate) => (
          <GateItem
            key={gate.id}
            gate={gate}
            interactive={true}
            onClick={() => handleClick(gate.id)}
          />
        ))}
      </div>

      {/* Status bar */}
      <div
        className={cn(
          'px-4 py-3 rounded-[2px] font-mono text-[11px] uppercase tracking-[0.1em]',
          allPass
            ? 'bg-cyan-ghost border border-cyan-deep text-cyan-glow'
            : failedGates.length > 0
            ? 'bg-pink-ghost border border-pink-deep text-pink-glow'
            : 'bg-white/[0.03] border border-slate text-iron',
        )}
      >
        {allPass
          ? '✓ ALL GATES CLEAR — EXECUTION APPROVED'
          : failedGates.length > 0
          ? `✗ GATE ${failedGates[0]!.id} BLOCKED — ${failedGates[0]!.label}`
          : `GATES PASSED: ${passCount}/5 — CONTINUE VALIDATING`}
      </div>

      {/* Gate 4 callout — THE MASTER GATE */}
      <div className="border border-gold/40 bg-[rgba(200,168,75,0.05)] rounded-[2px] p-5">
        <p className="font-mono text-[9px] text-gold uppercase tracking-[0.3em] mb-2">
          The Master Gate
        </p>
        <h3 className="font-display text-[24px] text-gold mb-2">GATE 4 — RECLAIM CANDLE</h3>
        <p className="font-body text-[13px] text-muted leading-relaxed">
          Gate 4 is the single most important confirmation in the protocol. A 5M candle must close
          back inside the consolidation range above the pink zone. Without this, there is no setup.
          No exceptions.
        </p>
      </div>
    </div>
  );
}

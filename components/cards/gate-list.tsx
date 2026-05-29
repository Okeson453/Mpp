'use client';

import { useState } from 'react';
import type { Gate, GateStatus } from '@/lib/types/mpp';
import { GateItem } from '@/components/cards/gate-item';
import { SectionEyebrow } from '@/components/layout/section-eyebrow';
import { cn } from '@/lib/utils/cn';

interface GateListProps {
  gates: Gate[];
  interactive?: boolean;
  onGateChange?: (id: number, status: GateStatus) => void;
}

function cycleStatus(current: GateStatus): GateStatus {
  if (current === 'PENDING') return 'PASS';
  if (current === 'PASS')    return 'FAIL';
  return 'PENDING';
}

export function GateList({ gates, interactive = false, onGateChange }: GateListProps) {
  const [localGates, setLocalGates] = useState<Gate[]>(gates);

  const activeGates = interactive ? localGates : gates;
  const passCount = activeGates.filter((g) => g.status === 'PASS').length;
  const failedGates = activeGates.filter((g) => g.status === 'FAIL');
  const allPass = passCount === 5;

  const handleClick = (id: number) => {
    if (!interactive) return;
    setLocalGates((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, status: cycleStatus(g.status) } : g,
      ),
    );
    const gate = localGates.find((g) => g.id === id);
    if (gate && onGateChange) {
      onGateChange(id, cycleStatus(gate.status));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <SectionEyebrow number="02" label="Gate Status" />

      <div className="flex flex-col gap-1.5">
        {activeGates.map((gate) => (
          <GateItem
            key={gate.id}
            gate={gate}
            interactive={interactive}
            onClick={() => handleClick(gate.id)}
          />
        ))}
      </div>

      <div
        className={cn(
          'px-3 py-2 rounded-[2px] font-mono text-[10px] uppercase tracking-[0.1em]',
          allPass
            ? 'bg-cyan-ghost text-cyan-glow border border-cyan-deep'
            : failedGates.length > 0
            ? 'bg-pink-ghost text-pink-glow border border-pink-deep'
            : 'bg-white/[0.02] text-iron border border-slate',
        )}
      >
        {allPass
          ? 'ALL GATES CLEAR'
          : failedGates.length > 0
          ? `GATE ${failedGates[0]!.id} BLOCKED`
          : `${passCount}/5 GATES PASSED`}
      </div>
    </div>
  );
}

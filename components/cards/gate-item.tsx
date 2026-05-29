'use client';

import type { Gate, GateStatus } from '@/lib/types/mpp';
import { cn } from '@/lib/utils/cn';

interface GateItemProps {
  gate: Gate;
  interactive?: boolean;
  onClick?: () => void;
}

const statusDisplay: Record<GateStatus, { text: string; color: string }> = {
  PASS:    { text: 'PASS ✓', color: 'text-cyan-glow' },
  FAIL:    { text: 'FAIL ✗', color: 'text-pink-glow' },
  PENDING: { text: 'WAIT —', color: 'text-iron'      },
};

const borderByStatus: Record<GateStatus, string> = {
  PASS:    'border-cyan-deep',
  FAIL:    'border-pink-deep',
  PENDING: 'border-slate',
};

export function GateItem({ gate, interactive = false, onClick }: GateItemProps) {
  const display = statusDisplay[gate.status];

  return (
    <div
      onClick={interactive ? onClick : undefined}
      className={cn(
        'flex items-center justify-between',
        'bg-carbon border rounded-[2px] px-3 py-2.5',
        'transition-all duration-200',
        borderByStatus[gate.status],
        interactive && 'cursor-pointer hover:translate-x-1 hover:bg-graphite',
      )}
      title={gate.description}
    >
      <span className="font-mono text-[10px] text-muted uppercase tracking-[0.05em]">
        {gate.label}
      </span>
      <span className={cn('font-mono text-[10px] font-medium tracking-wider', display.color)}>
        {display.text}
      </span>
    </div>
  );
}

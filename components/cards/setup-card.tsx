'use client';

import type { SetupRecord } from '@/lib/types/mpp';
import { formatDate, formatScore, formatRR } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/cn';

interface SetupCardProps {
  setup: SetupRecord;
  onClick?: () => void;
}

export function SetupCard({ setup, onClick }: SetupCardProps) {
  const isAPlus = setup.grade === 'A+';
  const isWin = setup.outcome === 'WIN';

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-carbon rounded-[2px] p-4 cursor-pointer',
        'transition-all duration-200 hover:-translate-y-1',
        isAPlus ? 'border border-gold' : 'border border-slate',
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[13px] font-medium text-white">{setup.instrument}</span>
        <span
          className={cn(
            'font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-[1px]',
            isAPlus ? 'text-gold bg-[rgba(200,168,75,0.1)]' : 'text-muted bg-white/[0.04]',
          )}
        >
          {setup.grade}
        </span>
      </div>

      {/* Chart thumbnail placeholder */}
      <div className="h-20 bg-obsidian rounded-[1px] mb-3 flex items-center justify-center border border-white/[0.04] chart-grid-bg">
        <span className="font-mono text-[10px] text-iron">CHART PREVIEW</span>
      </div>

      {/* Meta data */}
      <div className="flex flex-col gap-1 font-mono text-[11px]">
        <div className="flex justify-between text-muted">
          <span>{formatDate(new Date(setup.date).getTime())}</span>
          <span>{setup.session} · {setup.timeframe}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Score: <span className="text-white">{formatScore(setup.score)}</span></span>
          <span className="text-muted">R:R: <span className="text-white">{formatRR(setup.riskReward)}</span></span>
        </div>
      </div>

      {/* Outcome */}
      <div className={cn('mt-3 font-mono text-[10px] uppercase tracking-[0.15em]', isWin ? 'text-cyan-glow' : 'text-pink-glow')}>
        {isWin ? 'CYAN REACHED ✓' : setup.outcome === 'INVALIDATED' ? 'INVALIDATED ✗' : setup.outcome}
      </div>
    </div>
  );
}

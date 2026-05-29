'use client';

import type { TimeFrame } from '@/lib/types/mpp';
import { formatPrice, formatChange } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/cn';

const TIMEFRAMES: TimeFrame[] = ['1H', '5M', '15M', '4H'];

interface ChartToolbarProps {
  instrument: string;
  price: number;
  change: number;
  timeframe: TimeFrame;
  onTimeframeChange: (tf: TimeFrame) => void;
}

export function ChartToolbar({ instrument, price, change, timeframe, onTimeframeChange }: ChartToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.04] bg-obsidian shrink-0">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[18px] font-medium text-white">{instrument}</span>
        <span className="font-mono text-[14px] text-cyan-soft">
          {formatPrice(price)}
        </span>
        <span
          className={cn(
            'font-mono text-[11px] px-1.5 py-0.5 rounded-[1px]',
            change >= 0 ? 'text-cyan-soft bg-cyan-ghost' : 'text-pink-soft bg-pink-ghost',
          )}
        >
          {formatChange(change)}
        </span>
      </div>

      <div className="flex items-center gap-1">
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf}
            onClick={() => onTimeframeChange(tf)}
            className={cn(
              'font-mono text-[11px] uppercase tracking-[0.05em]',
              'px-3 py-1.5 rounded-[2px] transition-all duration-150',
              tf === timeframe
                ? 'bg-graphite text-white'
                : 'text-iron hover:text-muted',
            )}
          >
            {tf}
          </button>
        ))}
      </div>
    </div>
  );
}

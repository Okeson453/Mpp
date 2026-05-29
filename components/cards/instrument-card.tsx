'use client';

import type { Instrument } from '@/lib/types/mpp';
import { STATE_COLORS } from '@/lib/constants/tokens';
import { Badge } from '@/components/ui/badge';
import { formatPrice, formatChange, formatScore } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'idle' | 'alert' | 'primed' | 'executing' | 'default';

function getBadgeVariant(state: string): BadgeVariant {
  if (['ALERT', 'INVALIDATED'].includes(state)) return 'alert';
  if (state === 'PRIMED') return 'primed';
  if (['EXECUTING', 'MANAGING'].includes(state)) return 'executing';
  return 'idle';
}

interface InstrumentCardProps {
  instrument: Instrument;
  onClick: () => void;
}

export function InstrumentCard({ instrument, onClick }: InstrumentCardProps) {
  const stateColor = STATE_COLORS[instrument.state];
  const isAlert = instrument.state === 'ALERT';
  const isPrimed = instrument.state === 'PRIMED';

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-carbon rounded-[2px] p-4 cursor-pointer',
        'transition-all duration-200 hover:-translate-y-1',
        isAlert && 'animate-glow-ping',
      )}
      style={{ border: `1px solid ${stateColor}` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[14px] font-medium text-white">
          {instrument.symbol}
        </span>
        <Badge variant={getBadgeVariant(instrument.state)}>
          {instrument.state}
        </Badge>
      </div>

      {/* Mini zone visualization */}
      <div className="mb-3 rounded-[1px] overflow-hidden">
        <div className="h-2 bg-cyan-ghost border-b border-cyan-deep/30" />
        <div className="h-3 bg-carbon relative">
          <div
            className="absolute left-0 top-0 h-full bg-cyan-glow/20 rounded-sm"
            style={{
              width: `${Math.min(100, Math.max(0, ((instrument.price - instrument.pinkZone.upper) / (instrument.cyanZone.lower - instrument.pinkZone.upper)) * 100))}%`,
            }}
          />
        </div>
        <div className="h-2 bg-pink-ghost border-t border-pink-deep/30" />
      </div>

      {/* Price row */}
      <div className="font-mono text-[11px] text-muted mb-1">
        <span className="text-pink-soft">P: {formatPrice(instrument.pinkZone.upper, 0)}</span>
        <span className="text-iron mx-2">·</span>
        <span className="text-cyan-soft">C: {formatPrice(instrument.cyanZone.lower, 0)}</span>
      </div>

      {/* Score row */}
      <div className="font-mono text-[11px] text-iron">
        <span>SCORE: {formatScore(instrument.setupScore)}</span>
        <span className="mx-2">·</span>
        <span>R:R: {instrument.riskReward.toFixed(1)}</span>
      </div>

      {/* Price change */}
      <div className="mt-2 font-mono text-[11px]">
        <span className="text-muted">{formatPrice(instrument.price, 2)}</span>
        <span
          className={cn('ml-2', instrument.change24h >= 0 ? 'text-cyan-soft' : 'text-pink-soft')}
        >
          {formatChange(instrument.change24h)}
        </span>
      </div>
    </div>
  );
}

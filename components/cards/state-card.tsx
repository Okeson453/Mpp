'use client';

import type { MPPState, StateConfig } from '@/lib/types/mpp';
import { STATE_COLORS } from '@/lib/constants/tokens';
import { STATE_CONFIG } from '@/lib/constants/state-configs';
import { Badge } from '@/components/ui/badge';
import { formatTime } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'idle' | 'alert' | 'primed' | 'executing' | 'default';

function getBadgeVariant(state: MPPState): BadgeVariant {
  if (['ALERT', 'INVALIDATED'].includes(state)) return 'alert';
  if (state === 'PRIMED') return 'primed';
  if (['EXECUTING', 'MANAGING'].includes(state)) return 'executing';
  if (['IDLE', 'SCANNING', 'MAPPED', 'CLOSED'].includes(state)) return 'idle';
  return 'default';
}

function getGlowClass(state: MPPState): string {
  if (['ALERT', 'INVALIDATED'].includes(state)) return 'glow-pink';
  if (state === 'PRIMED') return 'glow-gold';
  if (['EXECUTING', 'MANAGING'].includes(state)) return 'glow-cyan';
  return '';
}

interface StateCardProps {
  state: MPPState;
  config?: StateConfig;
  instrument?: string;
  active?: boolean;
  className?: string;
}

export function StateCard({ state, config, instrument = 'HYPEUSDT', active = true, className }: StateCardProps) {
  const cfg = config ?? STATE_CONFIG[state];
  const color = STATE_COLORS[state];
  const isActiveState = ['ALERT', 'PRIMED', 'EXECUTING', 'MANAGING', 'INVALIDATED'].includes(state);

  return (
    <div
      className={cn(
        'relative bg-carbon border border-slate rounded-[2px] p-5',
        'transition-transform duration-200 hover:-translate-y-1',
        className,
      )}
      style={{
        borderColor: isActiveState ? color : undefined,
      }}
    >
      {/* Top accent bar */}
      <span
        className={cn('absolute top-0 left-0 right-0 h-[2px] rounded-t-[2px] block')}
        style={{
          background: 'linear-gradient(90deg, #E8266E, #0DB8CC)',
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.3s ease',
        }}
      />

      <div className="flex items-start justify-between mb-3">
        <Badge variant={getBadgeVariant(state)}>{cfg.tag}</Badge>
      </div>

      <h3
        className={cn('font-display text-[36px] leading-none mb-3', getGlowClass(state))}
        style={{ color }}
      >
        {cfg.headline}
      </h3>

      <p className="font-body text-[13px] text-muted leading-relaxed mb-4">{cfg.body}</p>

      <p className="font-mono text-[10px] text-iron">
        {formatTime(Date.now())} · {instrument}
      </p>
    </div>
  );
}

'use client';

import { useState } from 'react';
import type { MPPState } from '@/lib/types/mpp';
import { STATE_CONFIG } from '@/lib/constants/state-configs';
import { STATE_COLORS } from '@/lib/constants/tokens';
import { StateCard } from '@/components/cards/state-card';
import { SectionEyebrow } from '@/components/layout/section-eyebrow';
import { cn } from '@/lib/utils/cn';

const ALL_STATES: MPPState[] = [
  'IDLE', 'SCANNING', 'MAPPED', 'ALERT', 'PRIMED',
  'EXECUTING', 'MANAGING', 'CLOSED', 'INVALIDATED',
];

const PSYCH_NOTES: Partial<Record<MPPState, string>> = {
  ALERT:       'Your only job is to observe. Discipline is the absence of action.',
  PRIMED:      'Do not let excitement override protocol. Score first. Always.',
  EXECUTING:   'The trade is placed. Now your job is to do nothing.',
  INVALIDATED: 'An invalidated setup is not a loss. It is information. Reset.',
};

export function StateMachineStepper() {
  const [active, setActive] = useState<MPPState>('SCANNING');
  const config = STATE_CONFIG[active];

  return (
    <div className="flex gap-0">
      {/* Left sticky nav */}
      <div
        className="w-[240px] shrink-0 border-r border-slate"
        style={{ position: 'sticky', top: '64px', alignSelf: 'flex-start', height: 'calc(100vh - 64px)', overflowY: 'auto' }}
      >
        {ALL_STATES.map((state, i) => {
          const isActive = state === active;
          const color = STATE_COLORS[state];
          return (
            <button
              key={state}
              onClick={() => setActive(state)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 text-left',
                'transition-all duration-150 border-l-2',
                isActive
                  ? 'bg-white/[0.03] border-cyan-core'
                  : 'border-transparent hover:bg-white/[0.02]',
              )}
            >
              <span
                className={cn(
                  'w-2 h-2 rounded-full shrink-0',
                  isActive && 'animate-pulse-slow',
                )}
                style={{ backgroundColor: isActive ? color : '#4A5568' }}
              />
              <span
                className={cn(
                  'font-mono text-[11px] uppercase tracking-[0.05em]',
                  isActive ? 'text-white' : 'text-iron',
                )}
              >
                {String(i + 1).padStart(2, '0')} · {state}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right detail panel */}
      <div className="flex-1 p-8 min-w-0">
        <div className="transition-opacity duration-300">
          <StateCard state={active} config={config} active={true} />

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-carbon border border-slate rounded-[2px] p-4">
              <p className="font-mono text-[9px] text-cyan-core/80 uppercase tracking-[0.2em] mb-3">
                Triggers to Enter
              </p>
              {config.triggers.map((t, i) => (
                <p key={i} className="font-body text-[13px] text-muted leading-relaxed mb-1">
                  — {t}
                </p>
              ))}
            </div>

            <div className="bg-carbon border border-slate rounded-[2px] p-4">
              <p className="font-mono text-[9px] text-cyan-core/80 uppercase tracking-[0.2em] mb-3">
                Triggers to Exit
              </p>
              {config.exitConditions.map((t, i) => (
                <p key={i} className="font-body text-[13px] text-muted leading-relaxed mb-1">
                  — {t}
                </p>
              ))}
            </div>
          </div>

          {PSYCH_NOTES[active] && (
            <div className="mt-4 border-l-2 border-cyan-core/40 pl-4">
              <p className="font-mono text-[9px] text-cyan-core/60 uppercase tracking-[0.2em] mb-1">
                Psychological Note
              </p>
              <p className="font-body text-[14px] text-iron italic leading-relaxed">
                "{PSYCH_NOTES[active]}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

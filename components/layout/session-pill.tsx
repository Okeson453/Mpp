'use client';

import { useState, useEffect } from 'react';
import type { SessionPhase } from '@/lib/types/mpp';
import { cn } from '@/lib/utils/cn';

function getCurrentSession(): SessionPhase {
  const hour = new Date().getUTCHours();
  if (hour >= 0 && hour < 8)   return 'ASIAN';
  if (hour >= 8 && hour < 16)  return 'LONDON';
  if (hour >= 13 && hour < 21) return 'NEW_YORK';
  return 'OFF';
}

function getSessionLabel(session: SessionPhase): string {
  switch (session) {
    case 'ASIAN':    return 'ASIAN SESSION';
    case 'LONDON':   return 'LONDON SESSION';
    case 'NEW_YORK': return 'NEW YORK SESSION';
    default:         return 'OFF SESSION';
  }
}

export function SessionPill({ className }: { className?: string }) {
  const [time, setTime] = useState('');
  const [session, setSession] = useState<SessionPhase>('OFF');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getUTCHours().toString().padStart(2, '0');
      const m = now.getUTCMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
      setSession(getCurrentSession());
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const isLive = session !== 'OFF';

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5',
        'bg-carbon border border-slate rounded-[2px]',
        className,
      )}
    >
      <span
        className={cn(
          'w-2 h-2 rounded-full',
          isLive ? 'bg-cyan-glow animate-pulse-slow' : 'bg-iron',
        )}
      />
      <span className="font-mono text-[10px] text-cyan-core tracking-[0.1em]">
        {getSessionLabel(session)}&nbsp;&nbsp;{time}
      </span>
    </div>
  );
}

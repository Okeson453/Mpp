'use client';

import { cn } from '@/lib/utils/cn';

interface MottoBarProps {
  className?: string;
}

export function MottoBar({ className }: MottoBarProps) {
  return (
    <div
      className={cn(
        'w-full bg-carbon border-t border-b border-white/5',
        'px-8 py-6 text-center',
        className,
      )}
    >
      <p
        className="font-display tracking-[0.08em]"
        style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
      >
        <span className="text-white">PATIENCE · DISCIPLINE · </span>
        <span className="text-pink-glow">FEARLESS</span>
      </p>
    </div>
  );
}

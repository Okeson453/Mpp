'use client';

import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'idle' | 'alert' | 'primed' | 'executing' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  idle:      'bg-white/[0.04] text-iron',
  alert:     'bg-pink-ghost text-pink-glow',
  primed:    'bg-[rgba(200,168,75,0.1)] text-gold',
  executing: 'bg-cyan-ghost text-cyan-glow',
  default:   'bg-carbon text-muted',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center',
        'font-mono text-[9px] uppercase tracking-[0.3em]',
        'px-1.5 py-0.5 rounded-[1px]',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

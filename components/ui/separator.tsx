'use client';

import { cn } from '@/lib/utils/cn';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Separator({ orientation = 'horizontal', className }: SeparatorProps) {
  return (
    <div
      className={cn(
        'bg-white/[0.04]',
        orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px',
        className,
      )}
    />
  );
}

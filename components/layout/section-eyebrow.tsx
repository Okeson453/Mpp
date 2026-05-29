'use client';

import { cn } from '@/lib/utils/cn';

interface SectionEyebrowProps {
  number: string;
  label: string;
  className?: string;
  colorOverride?: string;
}

export function SectionEyebrow({ number, label, className, colorOverride }: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        'font-mono text-[10px] font-medium uppercase tracking-[0.25em] mb-3',
        colorOverride ? '' : 'text-cyan-core/80',
        className,
      )}
      style={colorOverride ? { color: colorOverride } : undefined}
    >
      {number} — {label}
    </p>
  );
}

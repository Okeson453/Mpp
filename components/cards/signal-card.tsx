'use client';

import { cn } from '@/lib/utils/cn';

interface SignalCardProps {
  type: 'pink' | 'cyan';
  label: string;
  value: string;
  description: string;
  swatchColors?: string[];
  className?: string;
}

export function SignalCard({ type, label, value, description, swatchColors, className }: SignalCardProps) {
  const isPink = type === 'pink';

  return (
    <div
      className={cn(
        'relative p-4 rounded-[2px] border overflow-hidden',
        'transition-transform duration-200 hover:-translate-y-1',
        isPink
          ? 'bg-pink-ghost border-pink-core'
          : 'bg-cyan-ghost border-cyan-core',
        className,
      )}
      style={{
        backgroundImage: isPink
          ? 'radial-gradient(circle at top left, rgba(255,61,127,0.15), transparent 60%)'
          : 'radial-gradient(circle at top right, rgba(24,212,234,0.15), transparent 60%)',
      }}
    >
      <p
        className={cn(
          'font-mono text-[9px] uppercase tracking-[0.3em] mb-2',
          isPink ? 'text-pink-soft' : 'text-cyan-soft',
        )}
      >
        {label}
      </p>

      <p className="font-mono text-[18px] font-semibold text-white mb-2">{value}</p>

      <p className="font-body text-[11px] text-muted leading-relaxed">{description}</p>

      {swatchColors && swatchColors.length > 0 && (
        <div className="flex gap-1.5 mt-3">
          {swatchColors.map((color, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full border border-white/10"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

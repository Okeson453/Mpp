'use client';

import { cn } from '@/lib/utils/cn';

type DataColor = 'pink' | 'cyan' | 'gold' | 'default';

interface DataRow {
  label: string;
  value: string;
  color?: DataColor;
}

interface DataBlockProps {
  rows: DataRow[];
  title?: string;
  className?: string;
}

const colorMap: Record<DataColor, string> = {
  pink:    'text-pink-soft',
  cyan:    'text-cyan-soft',
  gold:    'text-gold',
  default: 'text-white',
};

export function DataBlock({ rows, title, className }: DataBlockProps) {
  return (
    <div className={cn('bg-carbon border border-slate rounded-[2px] p-4', className)}>
      {title && (
        <p className="font-mono text-[9px] text-cyan-core/80 uppercase tracking-[0.2em] mb-3">
          {title}
        </p>
      )}
      <div className="flex flex-col">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between font-mono text-[12px] leading-[1.8]"
          >
            <span className="text-muted uppercase tracking-[0.05em]">{row.label}</span>
            <span className="flex items-center gap-2">
              <span className="text-iron">·</span>
              <span className={colorMap[row.color ?? 'default']}>{row.value}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

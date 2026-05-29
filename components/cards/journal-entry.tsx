'use client';

import type { JournalEntry as JournalEntryType } from '@/lib/types/mpp';
import { formatTime } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/cn';

interface JournalEntryProps {
  entry: JournalEntryType;
}

const typeColor: Record<string, string> = {
  alert:   'bg-pink-glow',
  execute: 'bg-cyan-glow',
  error:   'bg-pink-glow',
  info:    'bg-iron',
  '':      'bg-iron',
};

const textColor: Record<string, string> = {
  alert:   'text-pink-soft',
  execute: 'text-cyan-soft',
  error:   'text-pink-glow',
  info:    'text-muted',
  '':      'text-muted',
};

export function JournalEntry({ entry }: JournalEntryProps) {
  return (
    <div className="flex items-start gap-3 py-2 px-3 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-150">
      <span className={cn('w-1.5 h-1.5 rounded-full mt-1 shrink-0', typeColor[entry.type])} />
      <span className={cn('font-mono text-[11px] flex-1 leading-relaxed', textColor[entry.type])}>
        {entry.message}
      </span>
      <span className="font-mono text-[10px] text-iron shrink-0 ml-2">
        {formatTime(entry.timestamp)}
      </span>
    </div>
  );
}

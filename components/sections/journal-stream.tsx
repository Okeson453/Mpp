'use client';

import { useState, useEffect } from 'react';
import { useSystemStore } from '@/stores/system-store';
import { JournalEntry } from '@/components/cards/journal-entry';
import { cn } from '@/lib/utils/cn';

export function JournalStream() {
  const { journal } = useSystemStore();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handler = () => setOpen((prev) => !prev);
    document.addEventListener('toggle-journal', handler);
    return () => document.removeEventListener('toggle-journal', handler);
  }, []);

  return (
    <div
      className={cn(
        'border-t border-white/[0.04] bg-obsidian transition-all duration-300 shrink-0',
        open ? 'max-h-[200px]' : 'max-h-[36px]',
        'overflow-hidden',
      )}
    >
      <div
        className="flex items-center justify-between px-4 py-2 border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02] transition-colors duration-150"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-cyan-core/80 uppercase tracking-[0.2em]">
            Journal Stream
          </span>
          <span className="font-mono text-[9px] text-iron">{journal.length} events</span>
        </div>
        <span className="font-mono text-[10px] text-iron">{open ? '▼' : '▲'}</span>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: '160px' }}>
        {journal.length === 0 ? (
          <p className="font-mono text-[10px] text-iron px-4 py-3">AWAITING EVENTS</p>
        ) : (
          journal.map((entry) => (
            <JournalEntry key={entry.id} entry={entry} />
          ))
        )}
      </div>
    </div>
  );
}

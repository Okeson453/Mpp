'use client';

import { SectionEyebrow } from '@/components/layout/section-eyebrow';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

interface Lesson {
  id: string;
  module: string;
  title: string;
  duration: string;
  locked: boolean;
}

const LESSONS: Lesson[] = [
  { id: '01', module: 'MODULE 1', title: 'What Is The Muster Point Protocol',           duration: '24m', locked: false },
  { id: '02', module: 'MODULE 1', title: 'The Color System: Pink vs Cyan',              duration: '18m', locked: false },
  { id: '03', module: 'MODULE 2', title: 'How to Identify the Consolidation Range',     duration: '32m', locked: true  },
  { id: '04', module: 'MODULE 2', title: 'Zone Anchoring: The 5 Valid Anchor Types',    duration: '28m', locked: true  },
  { id: '05', module: 'MODULE 3', title: 'The 5-Gate Entry Validation System',          duration: '41m', locked: true  },
  { id: '06', module: 'MODULE 3', title: 'Gate 4 Deep Dive: Reclaim Candle Anatomy',   duration: '35m', locked: true  },
  { id: '07', module: 'MODULE 4', title: 'The 18-Point Setup Scoring System',           duration: '38m', locked: true  },
  { id: '08', module: 'MODULE 5', title: 'Session Timing and Market Context',           duration: '29m', locked: true  },
];

export function MasterclassSection() {
  return (
    <section className="px-8 md:px-16 py-24">
      <SectionEyebrow number="06" label="Masterclass Vault" />

      <div className="flex items-end justify-between mb-12">
        <h2
          className="font-display text-white leading-none"
          style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
        >
          40+ LESSONS.
          <br />
          ZERO FILLER.
        </h2>
        <Button variant="cyan" size="md">VIEW ALL MODULES</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {LESSONS.map((lesson) => (
          <div
            key={lesson.id}
            className={cn(
              'flex items-center gap-4 bg-carbon border rounded-[2px] p-4',
              'transition-all duration-200 group',
              lesson.locked
                ? 'border-slate opacity-60 cursor-not-allowed'
                : 'border-cyan-deep hover:border-cyan-core cursor-pointer',
            )}
          >
            {/* Play / Lock */}
            <div
              className={cn(
                'w-10 h-10 rounded-[2px] flex items-center justify-center shrink-0',
                lesson.locked ? 'bg-white/[0.04] text-iron' : 'bg-cyan-ghost text-cyan-glow',
              )}
            >
              <span className="font-mono text-[12px]">{lesson.locked ? '🔒' : '▶'}</span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-mono text-[9px] text-cyan-core/60 uppercase tracking-[0.2em] mb-0.5">
                {lesson.module}
              </p>
              <p
                className={cn(
                  'font-body text-[13px] truncate',
                  lesson.locked ? 'text-iron' : 'text-muted group-hover:text-white transition-colors duration-200',
                )}
              >
                {lesson.title}
              </p>
            </div>

            <span className="font-mono text-[10px] text-iron shrink-0">{lesson.duration}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

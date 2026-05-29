'use client';

import type { SetupScore as SetupScoreType } from '@/lib/types/mpp';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { SectionEyebrow } from '@/components/layout/section-eyebrow';
import { cn } from '@/lib/utils/cn';

interface SetupScoreProps {
  score: SetupScoreType | null;
  allGatesPass?: boolean;
  onExecute?: () => void;
  className?: string;
}

const SCORE_LABELS: Array<{ key: keyof Omit<SetupScoreType, 'total' | 'grade'>; label: string }> = [
  { key: 'pinkAnchor',      label: 'Pink Anchor'     },
  { key: 'cyanAnchor',      label: 'Cyan Anchor'     },
  { key: 'htfBias',         label: 'HTF Bias'        },
  { key: 'reclaimStrength', label: 'Reclaim Strength'},
  { key: 'riskReward',      label: 'Risk : Reward'   },
  { key: 'zoneQuality',     label: 'Zone Quality'    },
];

function gradeColor(grade: string): string {
  if (grade === 'A+') return 'text-cyan-glow';
  if (grade === 'B')  return 'text-gold';
  if (grade === 'C')  return 'text-iron';
  return 'text-pink-glow';
}

export function SetupScore({ score, allGatesPass = false, onExecute, className }: SetupScoreProps) {
  const canExecute = allGatesPass && score !== null && score.total >= 12;

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <SectionEyebrow number="05" label="Setup Score" />

      <div className="bg-carbon border border-slate rounded-[2px] p-4">
        {!score ? (
          <div className="flex flex-col gap-2">
            {SCORE_LABELS.map((item) => (
              <Skeleton key={item.key} className="h-5 w-full" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {SCORE_LABELS.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between font-mono text-[11px] leading-[1.8]"
              >
                <span className="text-muted uppercase tracking-[0.04em]">{item.label}</span>
                <span className="text-white font-semibold">{score[item.key]}/3</span>
              </div>
            ))}

            <div className="border-t border-slate mt-2 pt-2">
              <div className="flex items-center justify-between font-mono text-[13px]">
                <span className="text-muted uppercase tracking-[0.04em]">Score</span>
                <span className={cn('font-bold', gradeColor(score.grade))}>
                  {score.total}/18 · {score.grade}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {canExecute ? (
        <Button variant="pink" size="sm" onClick={onExecute} className="w-full">
          EXECUTE →
        </Button>
      ) : (
        <p className="font-mono text-[10px] text-iron text-center uppercase tracking-[0.1em]">
          {!score
            ? 'AWAITING SCORE'
            : !allGatesPass
            ? 'GATES INCOMPLETE — WAIT'
            : 'MINIMUM NOT MET — WAIT'}
        </p>
      )}
    </div>
  );
}

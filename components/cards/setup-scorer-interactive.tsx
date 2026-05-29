'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { Button } from '@/components/ui/button';
import { SectionEyebrow } from '@/components/layout/section-eyebrow';
import { cn } from '@/lib/utils/cn';

interface CheckItem {
  id: string;
  label: string;
}

interface Category {
  name: string;
  items: CheckItem[];
}

const CATEGORIES: Category[] = [
  {
    name: 'Zone Quality',
    items: [
      { id: 'zq1', label: 'Pink zone anchored to prior swing' },
      { id: 'zq2', label: 'Pink zone aligns with order block' },
      { id: 'zq3', label: 'Equal lows present in pink zone' },
    ],
  },
  {
    name: 'HTF Bias',
    items: [
      { id: 'hb1', label: '1H trend is bullish' },
      { id: 'hb2', label: '4H structure confirms direction' },
      { id: 'hb3', label: 'Daily level alignment' },
    ],
  },
  {
    name: 'Sweep Quality',
    items: [
      { id: 'sq1', label: 'Clean wick rejection at pink zone' },
      { id: 'sq2', label: 'High volume at sweep candle' },
      { id: 'sq3', label: 'Multiple wicks before sweep' },
    ],
  },
  {
    name: 'Reclaim Strength',
    items: [
      { id: 'rs1', label: 'Reclaim candle > 50% body size' },
      { id: 'rs2', label: 'Reclaim closed above range low' },
      { id: 'rs3', label: 'Reclaim with momentum divergence' },
    ],
  },
  {
    name: 'Risk : Reward',
    items: [
      { id: 'rr1', label: 'R:R ≥ 2:1' },
      { id: 'rr2', label: 'R:R ≥ 3:1' },
      { id: 'rr3', label: 'Cyan zone is clean (no structure in path)' },
    ],
  },
  {
    name: 'Session Alignment',
    items: [
      { id: 'sa1', label: 'London or NY session' },
      { id: 'sa2', label: 'Setup formed at session open' },
      { id: 'sa3', label: 'No major news in execution window' },
    ],
  },
];

function getVerdict(score: number): { text: string; color: string } {
  if (score === 18) return { text: 'S-TIER SETUP — MAXIMUM CONVICTION', color: 'text-cyan-glow' };
  if (score >= 15)  return { text: 'HIGH QUALITY SETUP — EXECUTE WITH CONFIDENCE', color: 'text-cyan-glow' };
  if (score >= 12)  return { text: 'MINIMUM MET — PROCEED WITH CAUTION', color: 'text-gold' };
  return { text: 'MINIMUM NOT MET — DO NOT EXECUTE', color: 'text-pink-glow' };
}

function getBarColor(score: number): string {
  if (score >= 15) return '#0DB8CC';
  if (score >= 12) return '#C8A84B';
  return '#E8266E';
}

export function SetupScorerInteractive() {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>('mpp-scorer-state', {});

  const score = Object.values(checked).filter(Boolean).length;
  const verdict = getVerdict(score);
  const barPercent = (score / 18) * 100;

  const toggle = (id: string) => {
    setChecked({ ...checked, [id]: !checked[id] });
  };

  const reset = () => setChecked({});

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <SectionEyebrow number="03" label="18-Point Setup Scorer" />
        <button
          onClick={reset}
          className="font-mono text-[10px] text-iron hover:text-pink-glow transition-colors duration-200 uppercase tracking-[0.1em]"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => (
          <div key={cat.name} className="bg-carbon border border-slate rounded-[2px] p-4">
            <p className="font-mono text-[9px] text-cyan-core/80 uppercase tracking-[0.2em] mb-3">
              {cat.name}
            </p>
            <div className="flex flex-col gap-2">
              {cat.items.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <div
                    onClick={() => toggle(item.id)}
                    className={cn(
                      'mt-0.5 w-3 h-3 rounded-[1px] border shrink-0 flex items-center justify-center',
                      'transition-all duration-150',
                      checked[item.id]
                        ? 'bg-cyan-core border-cyan-core'
                        : 'bg-transparent border-iron hover:border-muted',
                    )}
                  >
                    {checked[item.id] && (
                      <span className="text-void text-[8px] font-bold leading-none">✓</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      'font-mono text-[11px] leading-relaxed transition-colors duration-150',
                      checked[item.id] ? 'text-white' : 'text-muted group-hover:text-white',
                    )}
                  >
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Live score display */}
      <div className="bg-carbon border border-slate rounded-[2px] p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-[13px] text-muted uppercase tracking-[0.1em]">
            Live Score
          </p>
          <p className="font-mono text-[22px] font-bold text-white">
            {score} <span className="text-iron text-[14px]">/ 18</span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] bg-slate rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${barPercent}%`,
              backgroundColor: getBarColor(score),
            }}
          />
        </div>

        <p className={cn('font-mono text-[11px] uppercase tracking-[0.1em]', verdict.color)}>
          {verdict.text}
        </p>

        {score >= 12 && (
          <Button variant="pink" size="sm" className="mt-4 w-full">
            EXECUTE TRADE →
          </Button>
        )}
      </div>
    </div>
  );
}

'use client';

import type { Zone, ConsolidationRange } from '@/lib/types/mpp';
import { SectionEyebrow } from '@/components/layout/section-eyebrow';
import { formatPrice } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/cn';

interface ZoneBandProps {
  pinkZone: Zone | null;
  cyanZone: Zone | null;
  range: ConsolidationRange | null;
  currentPrice?: number;
  className?: string;
}

export function ZoneBand({ pinkZone, cyanZone, range, currentPrice, className }: ZoneBandProps) {
  if (!pinkZone || !cyanZone || !range) {
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <SectionEyebrow number="03" label="Zone Map" />
        <div className="bg-carbon border border-slate rounded-[2px] px-4 py-6 text-center">
          <p className="font-mono text-[10px] text-iron">AWAITING ZONE MAPPING</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <SectionEyebrow number="03" label="Zone Map" />

      <div className="border border-slate rounded-[2px] overflow-hidden">
        {/* Cyan zone — target */}
        <div className="bg-cyan-ghost px-4 py-3 border-b border-white/[0.04]">
          <p className="font-mono text-[9px] text-cyan-soft uppercase tracking-[0.2em] mb-1">
            Cyan Zone — Target
          </p>
          <p className="font-mono text-[13px] text-cyan-soft font-medium">
            {formatPrice(cyanZone.lower)} – {formatPrice(cyanZone.upper)}
          </p>
        </div>

        {/* Consolidation range */}
        <div className="bg-carbon px-4 py-3 border-b border-white/[0.04]">
          <p className="font-mono text-[9px] text-iron uppercase tracking-[0.2em] mb-1">
            Consolidation Range
          </p>
          <p className="font-mono text-[13px] text-muted">
            {formatPrice(range.low)} – {formatPrice(range.high)}
          </p>
          {currentPrice && (
            <p className="font-mono text-[11px] text-white mt-1">
              Current: <span className="text-cyan-soft">●</span> {formatPrice(currentPrice)}
            </p>
          )}
        </div>

        {/* Pink zone — hunt */}
        <div className="bg-pink-ghost px-4 py-3">
          <p className="font-mono text-[9px] text-pink-soft uppercase tracking-[0.2em] mb-1">
            Pink Zone — Hunt
          </p>
          <p className="font-mono text-[13px] text-pink-soft font-medium">
            {formatPrice(pinkZone.lower)} – {formatPrice(pinkZone.upper)}
          </p>
        </div>
      </div>
    </div>
  );
}

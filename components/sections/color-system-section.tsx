'use client';

import { SectionEyebrow } from '@/components/layout/section-eyebrow';
import { SignalCard } from '@/components/cards/signal-card';

export function ColorSystemSection() {
  return (
    <section className="px-8 md:px-16 py-24">
      <SectionEyebrow number="01" label="Color System" />

      <h2
        className="font-display text-white mb-4 leading-none"
        style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
      >
        TWO COLORS.
        <br />
        TWO SIGNALS.
        <br />
        NO CONFUSION.
      </h2>

      <p className="font-body text-[16px] text-muted max-w-[560px] mb-12 leading-relaxed">
        The MPP color system removes interpretation. Pink means institutional trap, hunt, or danger.
        Cyan means expansion, confirmation, and target.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SignalCard
          type="pink"
          label="Pink — Institutional Trap"
          value="HUNT · DANGER · SWEEP"
          description="The pink zone marks the area where institutional orders target liquidity beneath consolidation. This is where retail stops are clustered. This is where the sweep happens."
          swatchColors={['#C4195A', '#E8266E', '#FF3D7F', '#FF7AAD']}
        />
        <SignalCard
          type="cyan"
          label="Cyan — Expansion Target"
          value="GROWTH · CONFIRM · TARGET"
          description="The cyan zone marks the institutional expansion target. Once price sweeps pink and reclaims the range, the magnet is the cyan zone. Your exit. Your proof of concept."
          swatchColors={['#0A7C8C', '#0DB8CC', '#18D4EA', '#7EEAF5']}
        />
      </div>
    </section>
  );
}

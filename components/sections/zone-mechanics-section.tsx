'use client';

import { SectionEyebrow } from '@/components/layout/section-eyebrow';
import { DataBlock } from '@/components/cards/data-block';

const ANCHOR_TYPES = [
  {
    type: 'Prior Swing Low',
    quality: 'High',
    description: 'Established liquidity pool beneath previous structural low',
    color: 'cyan' as const,
  },
  {
    type: 'Order Block',
    quality: 'High',
    description: 'Last bearish candle before a significant bullish move',
    color: 'cyan' as const,
  },
  {
    type: 'Prior Session High/Low',
    quality: 'Medium',
    description: 'Asian or London session extremes that haven\'t been tapped',
    color: 'default' as const,
  },
  {
    type: 'Equal Lows / Highs',
    quality: 'High',
    description: 'Double or triple structures attract institutional sweeps',
    color: 'cyan' as const,
  },
  {
    type: 'Speculative',
    quality: 'Avoid',
    description: 'No structural anchor. Do not mark. Do not trade.',
    color: 'pink' as const,
  },
];

export function ZoneMechanicsSection() {
  return (
    <section className="px-8 md:px-16 py-24 bg-obsidian">
      <SectionEyebrow number="03" label="Zone Mechanics" />

      <h2
        className="font-display text-white mb-4 leading-none"
        style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
      >
        ZONES MUST BE
        <br />
        <span className="text-pink-glow">ANCHORED</span>
      </h2>

      <p className="font-body text-[16px] text-muted max-w-[560px] mb-12 leading-relaxed">
        A zone without a structural anchor is not a zone — it is a guess. Every pink and cyan zone
        must trace back to a valid structural reference.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {ANCHOR_TYPES.map((anchor) => (
          <div
            key={anchor.type}
            className="bg-carbon border border-slate rounded-[2px] p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-[11px] text-white uppercase tracking-[0.05em]">
                {anchor.type}
              </p>
              <span
                className="font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-[1px]"
                style={{
                  color: anchor.color === 'cyan' ? '#18D4EA' : anchor.color === 'pink' ? '#FF3D7F' : '#8A9BB0',
                  backgroundColor:
                    anchor.color === 'cyan'
                      ? 'rgba(13,184,204,0.1)'
                      : anchor.color === 'pink'
                      ? 'rgba(232,38,110,0.1)'
                      : 'rgba(255,255,255,0.04)',
                }}
              >
                {anchor.quality}
              </span>
            </div>
            <p className="font-body text-[13px] text-muted leading-relaxed">{anchor.description}</p>
          </div>
        ))}
      </div>

      {/* Reclaim anatomy callout */}
      <div className="border border-gold/40 bg-[rgba(200,168,75,0.04)] rounded-[2px] p-8">
        <SectionEyebrow number="KEY CONCEPT" label="The Reclaim Candle" colorOverride="#C8A84B" />
        <h3 className="font-display text-[clamp(32px,4vw,48px)] text-gold mb-4">
          ANATOMY OF THE RECLAIM
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DataBlock
            title="Step 1 — Sweep"
            rows={[
              { label: 'Candle Type', value: '5M Bearish Wick' },
              { label: 'Action',      value: 'Breaks below pink zone lower', color: 'pink' },
              { label: 'What it is',  value: 'Stop hunt complete' },
            ]}
          />
          <DataBlock
            title="Step 2 — Reclaim (Gate 4)"
            rows={[
              { label: 'Candle Type', value: '5M Close', color: 'gold' },
              { label: 'Condition',   value: 'Closes above pink zone upper', color: 'cyan' },
              { label: 'What it is',  value: 'Institutional re-entry signal' },
            ]}
          />
          <DataBlock
            title="Step 3 — Execute"
            rows={[
              { label: 'Entry',  value: 'Above reclaim candle high', color: 'cyan' },
              { label: 'Stop',   value: 'Below sweep wick',          color: 'pink' },
              { label: 'Target', value: 'Cyan zone upper',           color: 'cyan' },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

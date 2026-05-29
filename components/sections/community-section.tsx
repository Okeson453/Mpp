'use client';

import { SectionEyebrow } from '@/components/layout/section-eyebrow';
import { Button } from '@/components/ui/button';

interface Testimonial {
  handle: string;
  text: string;
  state: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    handle: '@rykos_fx',
    text:   'Week 3 since I started following the protocol. I\'ve taken 4 trades. All 4 hit cyan. My account is up 18%. Gate 4 is everything.',
    state:  'EXECUTING',
  },
  {
    handle: '@stxllar_trades',
    text:   'I used to overtrade every session. Now I wait for the reclaim. I took one trade this week — scored 16/18 — and it ran 4.2R. That\'s the protocol.',
    state:  'PRIMED',
  },
  {
    handle: '@zephyr_capital',
    text:   'The scanner showing ALERT on HYPEUSDT at 3am. Set my alerts, woke up at London open, reclaim happened, entered. Target hit in 2 hours. This system is real.',
    state:  'CLOSED',
  },
];

export function CommunitySection() {
  return (
    <section className="px-8 md:px-16 py-24 bg-obsidian">
      <SectionEyebrow number="09" label="The Community" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2
            className="font-display text-white leading-none mb-6"
            style={{ fontSize: 'clamp(48px, 5vw, 72px)' }}
          >
            TRADERS WHO
            <br />
            <span className="text-cyan-glow">FOLLOW THE CODE</span>
          </h2>
          <p className="font-body text-[16px] text-muted leading-relaxed mb-8">
            The Official Musty Discord is not a signal group. There are no calls.
            It is a community of protocol traders who post their setups, gates, and scores.
            Accountability. Structure. Discipline.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[['2,400+', 'MEMBERS'], ['91%', 'WIN RATE ON A+ SETUPS'], ['4.1:1', 'AVG R:R']].map(([val, label]) => (
              <div key={label} className="bg-carbon border border-slate rounded-[2px] p-4">
                <p className="font-display text-[32px] text-cyan-glow leading-none">{val}</p>
                <p className="font-mono text-[9px] text-iron uppercase tracking-[0.15em] mt-1">{label}</p>
              </div>
            ))}
          </div>
          <Button variant="pink" size="lg">JOIN THE DISCORD</Button>
        </div>

        <div className="flex flex-col gap-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.handle} className="bg-carbon border border-slate rounded-[2px] p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] text-cyan-soft">{t.handle}</span>
                <span className="font-mono text-[9px] text-iron uppercase px-2 py-0.5 bg-white/[0.04] rounded-[1px]">
                  {t.state}
                </span>
              </div>
              <p className="font-body text-[13px] text-muted leading-relaxed">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

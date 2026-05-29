'use client';

import { SectionEyebrow } from '@/components/layout/section-eyebrow';

const LAWS = [
  {
    number: 'LAW 01',
    rule:   'PATIENCE IS NOT WAITING. IT IS THE REFUSAL TO ACT WITHOUT CLARITY.',
    body:   'Every trade not taken is capital preserved. The market always gives another opportunity. The trader who waits is not losing — they are accumulating patience as a resource.',
  },
  {
    number: 'LAW 02',
    rule:   'THE PROTOCOL IS THE PLAN. DEVIATION FROM THE PROTOCOL IS SELF-SABOTAGE.',
    body:   'When you deviate from the protocol, you are not trading — you are gambling. The protocol exists because emotions exist. Follow the system, not the feeling.',
  },
  {
    number: 'LAW 03',
    rule:   'FEARLESS EXECUTION MEANS PROTOCOL-DRIVEN. NOT RECKLESS. NOT EMOTIONAL.',
    body:   '"Fearless" is not bravado. It is the absence of hesitation when all criteria are met. When the gates pass and the score clears, you execute without doubt. That is fearless.',
  },
  {
    number: 'LAW 04',
    rule:   'NEVER EXIT A TRADE EARLY. THE TARGET IS THE CYAN ZONE. HOLD THE LINE.',
    body:   'Early exits are a form of self-punishment. They deny the protocol its opportunity to work. If your stop is correct and your target is valid, your only job is to hold.',
  },
  {
    number: 'LAW 05',
    rule:   'THE JOURNAL IS NON-NEGOTIABLE. EVERY TRADE. EVERY STATE. EVERY OUTCOME.',
    body:   'Pattern recognition requires data. The journal is not optional accountability — it is the instrument by which you improve. A trader who does not journal is doomed to repeat.',
  },
];

export function PsychologySection() {
  return (
    <section className="px-8 md:px-16 py-24">
      <SectionEyebrow number="07" label="Trader Psychology" />

      <h2
        className="font-display text-white mb-12 leading-none"
        style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
      >
        THE LAWS OF
        <br />
        <span className="text-pink-glow">MENTAL CAPITAL</span>
      </h2>

      <div className="flex flex-col gap-0">
        {LAWS.map((law, i) => (
          <div
            key={law.number}
            className="border-t border-white/[0.06] py-8 group"
          >
            <div className="grid grid-cols-[200px_1fr] gap-8 items-start">
              <p className="font-mono text-[10px] text-cyan-core/60 uppercase tracking-[0.2em] pt-1">
                {law.number}
              </p>
              <div>
                <h3
                  className="font-display text-[clamp(20px,2.5vw,28px)] text-white mb-3 leading-tight group-hover:text-pink-glow transition-colors duration-300"
                >
                  {law.rule}
                </h3>
                <p className="font-body text-[14px] text-muted leading-relaxed max-w-[640px]">
                  {law.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

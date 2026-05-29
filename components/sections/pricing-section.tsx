'use client';

import Link from 'next/link';
import { SectionEyebrow } from '@/components/layout/section-eyebrow';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

interface Tier {
  name: string;
  price: string;
  period: string;
  tag?: string;
  features: string[];
  cta: string;
  href: string;
  highlighted: boolean;
}

const TIERS: Tier[] = [
  {
    name:        'SCOUT',
    price:       'FREE',
    period:      'FOREVER',
    features: [
      'Protocol overview and color system',
      'Static playbook with 3 case studies',
      'MPP state machine walkthrough',
      'Community access (read-only)',
    ],
    cta:         'GET STARTED',
    href:        '/auth/login?tier=free',
    highlighted: false,
  },
  {
    name:        'OPERATIVE',
    price:       '$79',
    period:      'PER MONTH',
    tag:         'MOST POPULAR',
    features: [
      'Full live scanner with 8 instruments',
      'Real-time MPP terminal dashboard',
      'Interactive 18-point setup scorer',
      'Journal with session grouping',
      'Track record vault (50 setups)',
      'Discord operative channel',
    ],
    cta:         'JOIN OPERATIVE',
    href:        '/auth/login?tier=pro',
    highlighted: true,
  },
  {
    name:        'ELITE',
    price:       '$249',
    period:      'PER MONTH',
    tag:         'FULL ACCESS',
    features: [
      'Everything in Operative',
      'Masterclass video vault (40+ lessons)',
      'Weekly live session with Musty',
      'TradingView Pine script alerts',
      'Webhook execution integration',
      'Elite Discord with direct access',
      'Monthly 1:1 trade review',
    ],
    cta:         'JOIN ELITE',
    href:        '/auth/login?tier=elite',
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section className="px-8 md:px-16 py-24 bg-obsidian">
      <SectionEyebrow number="08" label="Membership" />

      <h2
        className="font-display text-white mb-4 leading-none"
        style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
      >
        CHOOSE YOUR
        <br />
        <span className="text-cyan-glow">TIER</span>
      </h2>

      <p className="font-body text-[16px] text-muted max-w-[480px] mb-14 leading-relaxed">
        No lock-in. Cancel any time. Start with Scout and upgrade when you are ready to trade live.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              'bg-carbon rounded-[2px] p-6 flex flex-col gap-6',
              'transition-transform duration-200 hover:-translate-y-2',
              tier.highlighted
                ? 'border border-cyan-core'
                : 'border border-slate',
            )}
          >
            {/* Header */}
            <div>
              {tier.tag && (
                <span className="font-mono text-[9px] text-cyan-glow bg-cyan-ghost px-2 py-0.5 rounded-[1px] uppercase tracking-[0.3em] mb-3 block w-fit">
                  {tier.tag}
                </span>
              )}
              <p className="font-mono text-[10px] text-iron uppercase tracking-[0.2em] mb-2">
                {tier.name}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-[48px] text-white">{tier.price}</span>
                <span className="font-mono text-[10px] text-iron uppercase tracking-[0.1em]">
                  /{tier.period}
                </span>
              </div>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-2 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span
                    className={cn(
                      'font-mono text-[11px] mt-0.5 shrink-0',
                      tier.highlighted ? 'text-cyan-glow' : 'text-muted',
                    )}
                  >
                    →
                  </span>
                  <span className="font-body text-[13px] text-muted leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link href={tier.href}>
              <Button
                variant={tier.highlighted ? 'pink' : 'ghost'}
                size="md"
                className="w-full"
              >
                {tier.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

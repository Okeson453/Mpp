'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { MPPState } from '@/lib/types/mpp';
import { STATE_COLORS } from '@/lib/constants/tokens';
import { Button } from '@/components/ui/button';
import { SectionEyebrow } from '@/components/layout/section-eyebrow';
import { cn } from '@/lib/utils/cn';

const CYCLING_STATES: MPPState[] = ['SCANNING', 'ALERT', 'PRIMED', 'EXECUTING'];
const CYCLE_INTERVAL_MS = 2800;

export function HeroSection() {
  const [stateIndex, setStateIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setStateIndex((i) => (i + 1) % CYCLING_STATES.length);
        setVisible(true);
      }, 300);
    }, CYCLE_INTERVAL_MS);
    return () => clearInterval(cycle);
  }, []);

  const currentState = CYCLING_STATES[stateIndex]!;
  const stateColor   = STATE_COLORS[currentState];

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center px-8 md:px-16 py-24 overflow-hidden">
      {/* Background glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.06]"
        style={{ backgroundColor: '#E8266E' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.06]"
        style={{ backgroundColor: '#0DB8CC' }}
      />

      <div className="relative z-10 max-w-[900px]">
        <SectionEyebrow number="MPP v2.0" label="Muster Point Protocol" />

        {/* Main headline */}
        <h1
          className="font-display leading-[0.92] mb-6 text-white"
          style={{ fontSize: 'clamp(72px, 10vw, 140px)' }}
        >
          PRECISION
          <br />
          <span className="text-pink-glow glow-pink">EXECUTION</span>
          <br />
          TERMINAL
        </h1>

        {/* Sub headline */}
        <p className="font-body text-[18px] text-muted leading-relaxed max-w-[520px] mb-8">
          Not a system for everyone. A protocol designed for traders who understand that{' '}
          <span className="text-white">discipline is the edge</span> — not indicators.
        </p>

        {/* Cycling state badge */}
        <div
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 bg-carbon border rounded-[2px] mb-10',
            'transition-opacity duration-300',
            visible ? 'opacity-100' : 'opacity-0',
          )}
          style={{ borderColor: stateColor }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse-slow"
            style={{ backgroundColor: stateColor }}
          />
          <span
            className="font-mono text-[11px] uppercase tracking-[0.15em]"
            style={{ color: stateColor }}
          >
            SYSTEM STATE: {currentState}
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/dashboard">
            <Button variant="pink" size="lg">
              OPEN TERMINAL →
            </Button>
          </Link>
          <Link href="/protocol">
            <Button variant="cyan" size="lg">
              READ THE PROTOCOL
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] text-iron uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-iron to-transparent" />
      </div>
    </section>
  );
}

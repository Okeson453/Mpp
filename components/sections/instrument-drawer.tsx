'use client';

import type { Instrument } from '@/lib/types/mpp';
import { useUIStore } from '@/stores/ui-store';
import { DataBlock } from '@/components/cards/data-block';
import { GateList } from '@/components/cards/gate-list';
import { ZoneBand } from '@/components/cards/zone-band';
import { Button } from '@/components/ui/button';
import { STATE_CONFIG } from '@/lib/constants/state-configs';
import { INITIAL_GATES } from '@/lib/constants/gate-definitions';
import { formatPrice, formatRR, formatScore } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils/cn';

interface InstrumentDrawerProps {
  instrument: Instrument | null;
}

export function InstrumentDrawer({ instrument }: InstrumentDrawerProps) {
  const { drawerOpen, closeDrawer } = useUIStore();

  if (!instrument) return null;

  const config = STATE_CONFIG[instrument.state];

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-void/70 backdrop-blur-[2px]',
          'transition-opacity duration-200',
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed right-0 top-0 bottom-0 z-50',
          'w-[480px] bg-obsidian border-l border-slate',
          'overflow-y-auto',
          'transition-transform duration-300 ease-out',
          drawerOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-obsidian border-b border-white/[0.04] px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-mono text-[18px] font-medium text-white">{instrument.symbol}</h2>
            <p className="font-mono text-[11px] text-iron">{config.tag} — {instrument.state}</p>
          </div>
          <button
            onClick={closeDrawer}
            className="font-mono text-[14px] text-iron hover:text-pink-glow transition-colors duration-200"
          >
            ✕ ESC
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* Price metrics */}
          <DataBlock
            title="Price Metrics"
            rows={[
              { label: 'Price',   value: formatPrice(instrument.price),      color: 'default' },
              { label: '24h %',   value: `${instrument.change24h.toFixed(2)}%`, color: instrument.change24h >= 0 ? 'cyan' : 'pink' },
              { label: 'Score',   value: formatScore(instrument.setupScore), color: 'default' },
              { label: 'R:R',     value: formatRR(instrument.riskReward),    color: 'default' },
              { label: 'Session', value: instrument.session,                 color: 'default' },
            ]}
          />

          {/* Zone map */}
          <ZoneBand
            pinkZone={instrument.pinkZone}
            cyanZone={instrument.cyanZone}
            range={null}
            currentPrice={instrument.price}
          />

          {/* Gate status */}
          <GateList gates={INITIAL_GATES} interactive={true} />

          {/* Keyboard shortcut hint */}
          <p className="font-mono text-[10px] text-iron text-center">
            Press <kbd className="px-1 py-0.5 bg-graphite border border-slate rounded-[1px]">ESC</kbd> to close
          </p>
        </div>
      </div>
    </>
  );
}

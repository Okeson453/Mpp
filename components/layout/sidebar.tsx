'use client';

import { useSystemStore } from '@/stores/system-store';
import { useTradeStore } from '@/stores/trade-store';
import { useChartStore } from '@/stores/chart-store';
import { StateCard } from '@/components/cards/state-card';
import { GateList } from '@/components/cards/gate-list';
import { ZoneBand } from '@/components/cards/zone-band';
import { DataBlock } from '@/components/cards/data-block';
import { SetupScore } from '@/components/cards/setup-score';
import { SectionEyebrow } from '@/components/layout/section-eyebrow';
import { STATE_CONFIG } from '@/lib/constants/state-configs';
import { isExecutionAllowed } from '@/lib/utils/validators';
import { formatPrice, formatRR } from '@/lib/utils/formatters';
import { useMPPState } from '@/hooks/use-mpp-state';

export function Sidebar() {
  const { state, gates, activeInstrument } = useSystemStore();
  const { tradeParams, setupScore, pinkZone, cyanZone, range } = useTradeStore();
  const { currentPrice } = useChartStore();
  const { executeTrade } = useMPPState();

  const allGatesPass = gates.every((g) => g.status === 'PASS');
  const config = STATE_CONFIG[state];

  const tradeRows = tradeParams
    ? [
        { label: 'Entry',  value: formatPrice(tradeParams.entry),  color: 'cyan'    as const },
        { label: 'Stop',   value: formatPrice(tradeParams.stop),   color: 'pink'    as const },
        { label: 'Target', value: formatPrice(tradeParams.target), color: 'cyan'    as const },
        { label: 'R:R',    value: formatRR(tradeParams.riskReward), color: 'default' as const },
        { label: 'Size',   value: tradeParams.positionSize,         color: 'default' as const },
      ]
    : [];

  return (
    <aside
      className="w-[380px] bg-obsidian overflow-y-auto shrink-0"
      style={{ height: 'calc(100vh - 64px)' }}
    >
      {/* 01 — System State */}
      <div className="p-6 border-b border-white/[0.04]">
        <SectionEyebrow number="01" label="System State" />
        <StateCard
          state={state}
          config={config}
          instrument={activeInstrument}
          active={true}
        />
      </div>

      {/* 02 — Gate Status */}
      <div className="p-6 border-b border-white/[0.04]">
        <GateList gates={gates} interactive={false} />
      </div>

      {/* 03 — Zone Map */}
      <div className="p-6 border-b border-white/[0.04]">
        <ZoneBand
          pinkZone={pinkZone}
          cyanZone={cyanZone}
          range={range}
          currentPrice={currentPrice}
        />
      </div>

      {/* 04 — Trade Parameters */}
      <div className="p-6 border-b border-white/[0.04]">
        <SectionEyebrow number="04" label="Trade Parameters" />
        {tradeRows.length > 0 ? (
          <DataBlock rows={tradeRows} />
        ) : (
          <p className="font-mono text-[10px] text-iron uppercase tracking-[0.1em]">
            AWAITING SETUP
          </p>
        )}
      </div>

      {/* 05 — Setup Score */}
      <div className="p-6">
        <SetupScore
          score={setupScore}
          allGatesPass={allGatesPass}
          onExecute={executeTrade}
        />
      </div>
    </aside>
  );
}

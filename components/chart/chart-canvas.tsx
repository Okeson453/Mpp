'use client';

import { useEffect } from 'react';
import { useChartEngine } from '@/hooks/use-chart-engine';
import { useChartStore } from '@/stores/chart-store';
import { useSystemStore } from '@/stores/system-store';
import { useTradeStore } from '@/stores/trade-store';
import { ZoneLegend } from '@/components/chart/zone-legend';
import { ChartToolbar } from '@/components/chart/chart-toolbar';
import { cn } from '@/lib/utils/cn';

interface ChartCanvasProps {
  className?: string;
}

export function ChartCanvas({ className }: ChartCanvasProps) {
  const { canvasRef, draw, isReady } = useChartEngine();
  const { candles, currentPrice, activeTimeframe, setTimeframe } = useChartStore();
  const { state, activeInstrument } = useSystemStore();
  const { pinkZone, cyanZone, range } = useTradeStore();

  // Redraw whenever data changes
  useEffect(() => {
    if (!isReady) return;
    draw({
      instrument: activeInstrument,
      timeFrame: activeTimeframe,
      candles,
      currentPrice,
      state,
      range,
      pinkZone,
      cyanZone,
    });
  }, [isReady, draw, candles, currentPrice, state, range, pinkZone, cyanZone, activeInstrument, activeTimeframe]);

  return (
    <div className={cn('flex flex-col bg-void', className)}>
      <ChartToolbar
        instrument={activeInstrument}
        price={currentPrice}
        change={2.4}
        timeframe={activeTimeframe}
        onTimeframeChange={setTimeframe}
      />

      <div className="relative flex-1 min-h-0">
        <canvas
          ref={canvasRef}
          id="mppChart"
          className="absolute inset-0 w-full h-full"
          style={{ display: 'block' }}
        />
        <ZoneLegend />
      </div>
    </div>
  );
}

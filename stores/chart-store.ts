'use client';

// Chart data store — manages OHLCV candles, price, timeframe, and viewport

import { create } from 'zustand';
import { produce } from 'immer';
import type { Candle, TimeFrame } from '@/lib/types/mpp';

interface ChartStore {
  candles: Candle[];
  currentPrice: number;
  activeTimeframe: TimeFrame;
  visibleCandleCount: number;

  setCandles: (candles: Candle[]) => void;
  appendCandle: (candle: Candle) => void;
  updateCurrentPrice: (price: number) => void;
  setTimeframe: (tf: TimeFrame) => void;
  resetChart: () => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  candles: [],
  currentPrice: 0,
  activeTimeframe: '1H',
  visibleCandleCount: 60,

  setCandles: (candles) =>
    set(
      produce((draft: ChartStore) => {
        draft.candles = candles;
        if (candles.length > 0) {
          draft.currentPrice = candles[candles.length - 1]!.close;
        }
      }),
    ),

  appendCandle: (candle) =>
    set(
      produce((draft: ChartStore) => {
        const last = draft.candles[draft.candles.length - 1];
        if (last && last.time === candle.time) {
          // Same timestamp — update the current candle (live tick)
          draft.candles[draft.candles.length - 1] = candle;
        } else {
          draft.candles.push(candle);
          // Keep max 500 candles in memory
          if (draft.candles.length > 500) {
            draft.candles = draft.candles.slice(-500);
          }
        }
        draft.currentPrice = candle.close;
      }),
    ),

  updateCurrentPrice: (price) =>
    set(
      produce((draft: ChartStore) => {
        draft.currentPrice = price;
      }),
    ),

  setTimeframe: (tf) =>
    set(
      produce((draft: ChartStore) => {
        draft.activeTimeframe = tf;
        draft.candles = [];
      }),
    ),

  resetChart: () =>
    set(
      produce((draft: ChartStore) => {
        draft.candles = [];
        draft.currentPrice = 0;
        draft.activeTimeframe = '1H';
      }),
    ),
}));

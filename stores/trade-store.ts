'use client';

// Trade parameter store — zones, setup score, position params
// clearTrade() keeps zones intact; clearAll() wipes everything.

import { create } from 'zustand';
import { produce } from 'immer';
import type { Zone, ConsolidationRange, SetupScore, TradeParams } from '@/lib/types/mpp';

interface TradeStore {
  tradeParams: TradeParams | null;
  setupScore: SetupScore | null;
  pinkZone: Zone | null;
  cyanZone: Zone | null;
  range: ConsolidationRange | null;

  setZones: (pink: Zone, cyan: Zone, range: ConsolidationRange) => void;
  setSetupScore: (score: SetupScore) => void;
  setTradeParams: (params: TradeParams) => void;
  clearTrade: () => void;
  clearAll: () => void;
}

export const useTradeStore = create<TradeStore>((set) => ({
  tradeParams: null,
  setupScore: null,
  pinkZone: null,
  cyanZone: null,
  range: null,

  setZones: (pink, cyan, range) =>
    set(
      produce((draft: TradeStore) => {
        draft.pinkZone = pink;
        draft.cyanZone = cyan;
        draft.range = range;
      }),
    ),

  setSetupScore: (score) =>
    set(
      produce((draft: TradeStore) => {
        draft.setupScore = score;
      }),
    ),

  setTradeParams: (params) =>
    set(
      produce((draft: TradeStore) => {
        draft.tradeParams = params;
      }),
    ),

  clearTrade: () =>
    set(
      produce((draft: TradeStore) => {
        // Zones persist — only clear active trade data
        draft.tradeParams = null;
        draft.setupScore = null;
      }),
    ),

  clearAll: () =>
    set(
      produce((draft: TradeStore) => {
        draft.tradeParams = null;
        draft.setupScore = null;
        draft.pinkZone = null;
        draft.cyanZone = null;
        draft.range = null;
      }),
    ),
}));

// Chart engine types for the Canvas 2D renderer

import type { Candle, Zone, ConsolidationRange, MPPState, TimeFrame } from '@/lib/types/mpp';

export interface ChartDimensions {
  width: number;
  height: number;
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface ChartEngineOptions {
  instrument: string;
  timeFrame: TimeFrame;
  candles: Candle[];
  currentPrice: number;
  state: MPPState;
  range: ConsolidationRange | null;
  pinkZone: Zone | null;
  cyanZone: Zone | null;
}

export enum RenderLayer {
  GRID = 'GRID',
  ZONES = 'ZONES',
  RANGE = 'RANGE',
  CANDLES = 'CANDLES',
  OVERLAYS = 'OVERLAYS',
}

export interface ViewportState {
  minPrice: number;
  maxPrice: number;
  firstCandleIndex: number;
  lastCandleIndex: number;
}

export interface CandleLayout {
  x: number;
  width: number;
  bodyTop: number;
  bodyBottom: number;
  wickTop: number;
  wickBottom: number;
  isBull: boolean;
  isReclaim: boolean;
  isCurrent: boolean;
}

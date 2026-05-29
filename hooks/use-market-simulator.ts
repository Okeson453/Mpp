'use client';

// Demo market simulator — generates realistic OHLCV candle data
// Simulates the full MPP protocol cycle: range → sweep → reclaim → target

import { useState, useRef, useCallback, useEffect } from 'react';
import type { Candle, Zone, ConsolidationRange } from '@/lib/types/mpp';
import { useChartStore } from '@/stores/chart-store';

interface UseMarketSimulatorReturn {
  candles: Candle[];
  currentPrice: number;
  range: ConsolidationRange | null;
  pinkZone: Zone | null;
  cyanZone: Zone | null;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

const BASE_PRICE = 61840;
const VOLATILITY = 0.003;
const TICK_INTERVAL_MS = 800;

function generateBrownianCandle(prevClose: number, time: number): Candle {
  const drift = (Math.random() - 0.48) * VOLATILITY;
  const close = prevClose * (1 + drift);
  const range = prevClose * VOLATILITY * 0.5;
  const open = prevClose;
  const high = Math.max(open, close) + Math.random() * range;
  const low = Math.min(open, close) - Math.random() * range;
  return { time, open, high, low, close, volume: Math.random() * 800000 + 200000 };
}

function computeRange(candles: Candle[]): ConsolidationRange {
  const recent = candles.slice(-15);
  const high = Math.max(...recent.map((c) => c.high));
  const low = Math.min(...recent.map((c) => c.low));
  return {
    high,
    low,
    mid: (high + low) / 2,
    candleCount: recent.length,
    volatilityCompression: (high - low) / low < 0.04,
  };
}

export function useMarketSimulator(
  onMapStructure?: (range: ConsolidationRange, pink: Zone, cyan: Zone) => void,
  onConfirmReclaim?: () => void,
  onCloseTarget?: () => void,
): UseMarketSimulatorReturn {
  const { setCandles, appendCandle, currentPrice } = useChartStore();
  const [isRunning, setIsRunning] = useState(false);
  const [range, setRange] = useState<ConsolidationRange | null>(null);
  const [pinkZone, setPinkZone] = useState<Zone | null>(null);
  const [cyanZone, setCyanZone] = useState<Zone | null>(null);
  const candlesRef = useRef<Candle[]>([]);
  const tickCountRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cyclePhaseRef = useRef<'ranging' | 'approaching' | 'sweep' | 'reclaim' | 'trending'>('ranging');

  const generateInitialCandles = useCallback(() => {
    const initial: Candle[] = [];
    let price = BASE_PRICE;
    const startTime = Date.now() - 80 * 3600000;

    for (let i = 0; i < 80; i++) {
      const candle = generateBrownianCandle(price, startTime + i * 3600000);
      initial.push(candle);
      price = candle.close;
    }
    return initial;
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    tickCountRef.current = 0;
    cyclePhaseRef.current = 'ranging';
    const initial = generateInitialCandles();
    candlesRef.current = initial;
    setCandles(initial);
    setRange(null);
    setPinkZone(null);
    setCyanZone(null);
  }, [generateInitialCandles, setCandles]);

  const tick = useCallback(() => {
    const candles = candlesRef.current;
    const count = tickCountRef.current;
    const lastCandle = candles[candles.length - 1];
    if (!lastCandle) return;

    let newClose = lastCandle.close;
    const phase = cyclePhaseRef.current;

    // Phase-driven price movement
    if (phase === 'approaching' && pinkZone) {
      // Drift toward pink zone
      newClose = lastCandle.close * 0.9985;
    } else if (phase === 'sweep' && pinkZone) {
      // Sweep below pink zone
      newClose = pinkZone.lower * 0.995;
      cyclePhaseRef.current = 'reclaim';
    } else if (phase === 'reclaim' && pinkZone) {
      // Reclaim above pink zone
      newClose = pinkZone.upper * 1.005;
      cyclePhaseRef.current = 'trending';
      onConfirmReclaim?.();
    } else if (phase === 'trending' && cyanZone) {
      // Trend toward cyan zone
      newClose = lastCandle.close * 1.003;
      if (newClose >= cyanZone.lower) {
        cyclePhaseRef.current = 'ranging';
        onCloseTarget?.();
        tickCountRef.current = 0;
      }
    }

    const newCandle = generateBrownianCandle(newClose, Date.now());
    candlesRef.current = [...candles.slice(-499), newCandle];
    appendCandle(newCandle);
    tickCountRef.current = count + 1;

    // Auto-trigger protocol steps
    if (count === 20 && cyclePhaseRef.current === 'ranging') {
      const computedRange = computeRange(candlesRef.current);
      const mid = computedRange.mid;
      const pink: Zone = {
        upper: mid * 0.965,
        lower: mid * 0.958,
        active: true,
        anchor: 'prior_swing',
      };
      const cyan: Zone = {
        upper: mid * 1.06,
        lower: mid * 1.052,
        active: true,
        anchor: 'order_block',
      };
      setRange(computedRange);
      setPinkZone(pink);
      setCyanZone(cyan);
      onMapStructure?.(computedRange, pink, cyan);
      cyclePhaseRef.current = 'approaching';
    }
  }, [pinkZone, cyanZone, appendCandle, onMapStructure, onConfirmReclaim, onCloseTarget]);

  const start = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(tick, TICK_INTERVAL_MS);
  }, [isRunning, tick]);

  const pause = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    reset();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [reset]);

  // Update interval when tick changes (dependency on zones)
  useEffect(() => {
    if (isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(tick, TICK_INTERVAL_MS);
    }
  }, [isRunning, tick]);

  return {
    candles: candlesRef.current,
    currentPrice,
    range,
    pinkZone,
    cyanZone,
    isRunning,
    start,
    pause,
    reset,
  };
}

/**
 * Exchange REST Client
 * Handles communication with trading exchanges (Binance, Bybit, etc.)
 */

import type { Candle, TickerData, Instrument } from '@/lib/types/mpp';

/**
 * Fetch OHLCV candles for an instrument
 * @param symbol - Trading pair symbol (e.g., BTCUSDT)
 * @param timeframe - Timeframe (1H, 5M, 15M, 4H, 1D)
 * @param limit - Number of candles to fetch
 */
export async function fetchOHLCV(
  symbol: string,
  timeframe: string,
  limit: number = 500
): Promise<Candle[]> {
  try {
    const response = await fetch(`/api/instruments/${symbol}/ohlcv`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch OHLCV: ${response.statusText}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching OHLCV:', error);
    return [];
  }
}

/**
 * Fetch ticker data for a symbol
 * @param symbol - Trading pair symbol
 */
export async function fetchTicker(symbol: string): Promise<TickerData | null> {
  try {
    const response = await fetch(`/api/instruments/${symbol}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ticker: ${response.statusText}`);
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error('Error fetching ticker:', error);
    return null;
  }
}

/**
 * Fetch list of available instruments
 */
export async function fetchInstruments(): Promise<Instrument[]> {
  try {
    const response = await fetch('/api/instruments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch instruments: ${response.statusText}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching instruments:', error);
    return [];
  }
}

/**
 * Export types for TypeScript support
 */
export type { Candle, TickerData, Instrument };

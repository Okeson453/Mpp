/**
 * Chart Math Utilities
 * Mathematical functions for chart calculations and technical analysis
 */

export interface OHLC {
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
}

export interface CandleMetrics {
    bodySize: number;
    wickSize: number;
    range: number;
    midpoint: number;
    bodyPercent: number;
    wickUpper: number;
    wickLower: number;
}

/**
 * Calculate candle metrics
 */
export function calculateCandleMetrics(ohlc: OHLC): CandleMetrics {
    const bodySize = Math.abs(ohlc.close - ohlc.open);
    const range = ohlc.high - ohlc.low;
    const wickUpper = ohlc.high - Math.max(ohlc.open, ohlc.close);
    const wickLower = Math.min(ohlc.open, ohlc.close) - ohlc.low;
    const wickSize = wickUpper + wickLower;
    const midpoint = (ohlc.high + ohlc.low) / 2;
    const bodyPercent = range > 0 ? (bodySize / range) * 100 : 0;

    return {
        bodySize,
        wickSize,
        range,
        midpoint,
        bodyPercent,
        wickUpper,
        wickLower,
    };
}

/**
 * Calculate simple moving average
 */
export function calculateSMA(prices: number[], period: number): number[] {
    const result: number[] = [];

    for (let i = 0; i < prices.length; i++) {
        if (i < period - 1) continue;

        const slice = prices.slice(i - period + 1, i + 1);
        const avg = slice.reduce((a, b) => a + b, 0) / period;
        result.push(avg);
    }

    return result;
}

/**
 * Calculate exponential moving average
 */
export function calculateEMA(prices: number[], period: number): number[] {
    if (prices.length < period) return [];

    const k = 2 / (period + 1);
    const result: number[] = [];

    // Initial SMA
    let ema = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;
    result.push(ema);

    // Calculate EMA for remaining prices
    for (let i = period; i < prices.length; i++) {
        ema = prices[i] * k + ema * (1 - k);
        result.push(ema);
    }

    return result;
}

/**
 * Calculate RSI (Relative Strength Index)
 */
export function calculateRSI(prices: number[], period: number = 14): number[] {
    if (prices.length < period + 1) return [];

    const deltas: number[] = [];
    for (let i = 1; i < prices.length; i++) {
        deltas.push(prices[i] - prices[i - 1]);
    }

    let avgGain = 0;
    let avgLoss = 0;

    for (let i = 0; i < period; i++) {
        if (deltas[i] > 0) avgGain += deltas[i];
        else avgLoss += Math.abs(deltas[i]);
    }

    avgGain /= period;
    avgLoss /= period;

    const rsi: number[] = [];

    for (let i = period; i < deltas.length; i++) {
        if (deltas[i] > 0) {
            avgGain = (avgGain * (period - 1) + deltas[i]) / period;
            avgLoss = (avgLoss * (period - 1)) / period;
        } else {
            avgGain = (avgGain * (period - 1)) / period;
            avgLoss = (avgLoss * (period - 1) + Math.abs(deltas[i])) / period;
        }

        const rs = avgGain / (avgLoss || 1);
        rsi.push(100 - 100 / (1 + rs));
    }

    return rsi;
}

/**
 * Calculate MACD (Moving Average Convergence Divergence)
 */
export function calculateMACD(prices: number[], fast: number = 12, slow: number = 26, signal: number = 9) {
    const ema12 = calculateEMA(prices, fast);
    const ema26 = calculateEMA(prices, slow);

    const macdLine: number[] = [];
    for (let i = 0; i < Math.min(ema12.length, ema26.length); i++) {
        macdLine.push(ema12[ema12.length - macdLine.length - 1] - ema26[ema26.length - macdLine.length - 1]);
    }

    const signalLine = calculateEMA(macdLine, signal);

    return {
        macd: macdLine,
        signal: signalLine,
        histogram: macdLine.map((m, i) => (signalLine[i] ? m - signalLine[i] : 0)),
    };
}

/**
 * Calculate Bollinger Bands
 */
export function calculateBollingerBands(prices: number[], period: number = 20, stdDev: number = 2) {
    const sma = calculateSMA(prices, period);
    const result: Array<{ middle: number; upper: number; lower: number }> = [];

    for (let i = period - 1; i < prices.length; i++) {
        const slice = prices.slice(i - period + 1, i + 1);
        const mean = slice.reduce((a, b) => a + b, 0) / period;
        const squaredDiffs = slice.map((p) => Math.pow(p - mean, 2));
        const variance = squaredDiffs.reduce((a, b) => a + b, 0) / period;
        const std = Math.sqrt(variance);

        result.push({
            middle: mean,
            upper: mean + std * stdDev,
            lower: mean - std * stdDev,
        });
    }

    return result;
}

/**
 * Calculate highest high and lowest low
 */
export function calculateHighestHighLowestLow(
    prices: number[],
    period: number
): { highest: number; lowest: number } {
    if (prices.length < period) {
        return { highest: Math.max(...prices), lowest: Math.min(...prices) };
    }

    const slice = prices.slice(-period);
    return {
        highest: Math.max(...slice),
        lowest: Math.min(...slice),
    };
}

/**
 * Calculate ATR (Average True Range)
 */
export function calculateATR(ohlcs: OHLC[], period: number = 14): number[] {
    const trueRanges: number[] = [];

    for (let i = 0; i < ohlcs.length; i++) {
        const current = ohlcs[i];
        let tr: number;

        if (i === 0) {
            tr = current.high - current.low;
        } else {
            const prev = ohlcs[i - 1];
            tr = Math.max(
                current.high - current.low,
                Math.abs(current.high - prev.close),
                Math.abs(current.low - prev.close)
            );
        }

        trueRanges.push(tr);
    }

    return calculateEMA(trueRanges, period);
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
    if (oldValue === 0) return 0;
    return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
}

/**
 * Round price to nearest tick
 */
export function roundToTick(price: number, tickSize: number): number {
    return Math.round(price / tickSize) * tickSize;
}

/**
 * Check if price is in uptrend or downtrend
 */
export function determineTrend(prices: number[]): 'uptrend' | 'downtrend' | 'sideways' {
    if (prices.length < 2) return 'sideways';

    const recent = prices.slice(-20);
    const high = Math.max(...recent);
    const low = Math.min(...recent);
    const current = prices[prices.length - 1];

    const upCount = recent.filter((p, i) => i > 0 && p > recent[i - 1]).length;
    const downCount = recent.filter((p, i) => i > 0 && p < recent[i - 1]).length;

    if (upCount > downCount * 1.5) return 'uptrend';
    if (downCount > upCount * 1.5) return 'downtrend';
    return 'sideways';
}

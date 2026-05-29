// THE RENDER LOOP — pure TypeScript, no React dependencies
// Target: < 16.6ms per frame with 200 candles + zones

import type { ChartEngineOptions, ChartDimensions } from '@/lib/types/chart';
import { drawZone, drawConsolidationRange } from './zone-renderer';
import { drawCandle } from './candle-renderer';
import {
  drawCurrentPriceLine,
  drawPriceLabel,
  drawGridLines,
} from './overlay-renderer';

function priceToY(
  price: number,
  minPrice: number,
  maxPrice: number,
  chartH: number,
  paddingTop: number,
): number {
  if (maxPrice === minPrice) return paddingTop + chartH / 2;
  return paddingTop + ((maxPrice - price) / (maxPrice - minPrice)) * chartH;
}

function timeToX(index: number, chartLeft: number, candleWidth: number): number {
  return chartLeft + index * candleWidth;
}

function getPriceRange(opts: ChartEngineOptions): { min: number; max: number } {
  const { candles, pinkZone, cyanZone } = opts;
  let min = Infinity;
  let max = -Infinity;

  for (const c of candles) {
    if (c.low  < min) min = c.low;
    if (c.high > max) max = c.high;
  }

  if (pinkZone) {
    if (pinkZone.lower < min) min = pinkZone.lower;
    if (pinkZone.upper > max) max = pinkZone.upper;
  }
  if (cyanZone) {
    if (cyanZone.lower < min) min = cyanZone.lower;
    if (cyanZone.upper > max) max = cyanZone.upper;
  }

  // Add 5% padding
  const padding = (max - min) * 0.05;
  return { min: min - padding, max: max + padding };
}

export function renderChart(
  ctx: CanvasRenderingContext2D,
  options: ChartEngineOptions,
  dimensions: ChartDimensions,
): void {
  const { width, height, padding } = dimensions;
  const { candles, currentPrice, pinkZone, cyanZone, range } = options;

  if (!candles || candles.length === 0) return;

  const chartLeft   = padding.left;
  const chartTop    = padding.top;
  const chartWidth  = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // 1. Clear
  ctx.clearRect(0, 0, width, height);

  if (chartWidth <= 0 || chartHeight <= 0) return;

  // Price range
  const visible = candles.slice(-60);
  const { min: minPrice, max: maxPrice } = getPriceRange({ ...options, candles: visible });

  const toY = (price: number) =>
    priceToY(price, minPrice, maxPrice, chartHeight, chartTop);

  const candleWidth = Math.max(2, (chartWidth / visible.length) - 1);

  // 2. Grid
  drawGridLines(ctx, chartLeft, chartWidth, chartTop, chartHeight);

  // 3. Pink zone
  if (pinkZone?.active) {
    drawZone(ctx, pinkZone, 'pink', toY, chartLeft, chartWidth);
  }

  // 4. Cyan zone
  if (cyanZone?.active) {
    drawZone(ctx, cyanZone, 'cyan', toY, chartLeft, chartWidth);
  }

  // 5. Consolidation range
  if (range) {
    drawConsolidationRange(ctx, range, toY, chartLeft, chartWidth);
  }

  // 6. Candles
  for (let i = 0; i < visible.length; i++) {
    const candle = visible[i];
    if (!candle) continue;
    drawCandle(ctx, {
      candle,
      index: i,
      timeToX: (idx) => timeToX(idx, chartLeft, candleWidth),
      priceToY: toY,
      candleWidth,
      pinkZone: pinkZone ?? null,
      isLast: i === visible.length - 1,
    });
  }

  // 7. Current price line
  if (currentPrice > 0) {
    const priceY = toY(currentPrice);
    drawCurrentPriceLine(ctx, priceY, chartLeft, chartWidth);

    // 8. Price label
    drawPriceLabel(ctx, currentPrice, priceY, width, padding.right);
  }
}

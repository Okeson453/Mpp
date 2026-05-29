// Candle renderer — pure TypeScript, draws OHLCV candlesticks
// Colors: cyan (bull), pink (bear), white (current), gold (reclaim candle)

import type { Candle, Zone } from '@/lib/types/mpp';

export interface CandleDrawOptions {
  candle: Candle;
  index: number;
  timeToX: (index: number) => number;
  priceToY: (price: number) => number;
  candleWidth: number;
  pinkZone: Zone | null;
  isLast: boolean;
}

function isReclaimCandle(candle: Candle, pinkZone: Zone | null): boolean {
  if (!pinkZone) return false;
  return candle.low < pinkZone.upper && candle.close > pinkZone.upper;
}

export function drawCandle(
  ctx: CanvasRenderingContext2D,
  opts: CandleDrawOptions,
): void {
  const { candle, index, timeToX, priceToY, candleWidth, pinkZone, isLast } = opts;

  const x = timeToX(index);
  const openY  = priceToY(candle.open);
  const closeY = priceToY(candle.close);
  const highY  = priceToY(candle.high);
  const lowY   = priceToY(candle.low);

  const isBull    = candle.close >= candle.open;
  const isReclaim = isReclaimCandle(candle, pinkZone);

  let bodyColor: string;
  let wickColor: string;
  let glowColor: string | null = null;
  let glowBlur = 0;

  if (isLast) {
    bodyColor = '#F0F4F8';
    wickColor = 'rgba(240,244,248,0.6)';
    glowColor = 'rgba(240,244,248,0.3)';
    glowBlur  = 12;
  } else if (isReclaim) {
    bodyColor = '#C8A84B';
    wickColor = '#C8A84B';
    glowColor = 'rgba(200,168,75,0.4)';
    glowBlur  = 8;
  } else if (isBull) {
    bodyColor = '#0DB8CC';
    wickColor = '#0DB8CC';
  } else {
    bodyColor = '#E8266E';
    wickColor = '#E8266E';
  }

  // Apply glow shadow if needed
  if (glowColor) {
    ctx.shadowColor = glowColor;
    ctx.shadowBlur  = glowBlur;
  }

  // Wick
  const wickX = x + candleWidth / 2;
  ctx.strokeStyle = wickColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(wickX, highY);
  ctx.lineTo(wickX, lowY);
  ctx.stroke();

  // Body
  const bodyTop    = Math.min(openY, closeY);
  const bodyHeight = Math.max(Math.abs(closeY - openY), 1);

  ctx.fillStyle = bodyColor;
  ctx.fillRect(x, bodyTop, candleWidth - 1, bodyHeight);

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur  = 0;
}

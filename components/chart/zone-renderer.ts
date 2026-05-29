// Zone renderer — pure TypeScript, no React, no dependencies
// Draws pink/cyan zones and consolidation range onto Canvas 2D context.

import type { Zone, ConsolidationRange } from '@/lib/types/mpp';

export function drawZone(
  ctx: CanvasRenderingContext2D,
  zone: Zone,
  type: 'pink' | 'cyan',
  priceToY: (price: number) => number,
  chartLeft: number,
  chartWidth: number,
): void {
  const isPink = type === 'pink';
  const fillColor   = isPink ? 'rgba(232,38,110,0.12)' : 'rgba(13,184,204,0.12)';
  const borderColor = isPink ? '#E8266E' : '#0DB8CC';
  const labelColor  = isPink ? '#FF7AAD' : '#7EEAF5';
  const labelText   = isPink ? 'PINK ZONE' : 'CYAN ZONE';

  const y1 = priceToY(zone.upper);
  const y2 = priceToY(zone.lower);
  const height = Math.abs(y2 - y1);
  const top    = Math.min(y1, y2);

  // Fill
  ctx.fillStyle = fillColor;
  ctx.fillRect(chartLeft, top, chartWidth, height);

  // Upper border
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(chartLeft, y1);
  ctx.lineTo(chartLeft + chartWidth, y1);
  ctx.stroke();

  // Lower border
  ctx.beginPath();
  ctx.moveTo(chartLeft, y2);
  ctx.lineTo(chartLeft + chartWidth, y2);
  ctx.stroke();

  // Label
  ctx.fillStyle = labelColor;
  ctx.font = '10px JetBrains Mono';
  ctx.textAlign = 'right';
  ctx.fillText(labelText, chartLeft + chartWidth - 8, top - 6);
}

export function drawConsolidationRange(
  ctx: CanvasRenderingContext2D,
  range: ConsolidationRange,
  priceToY: (price: number) => number,
  chartLeft: number,
  chartWidth: number,
): void {
  const y1 = priceToY(range.high);
  const y2 = priceToY(range.low);
  const height = Math.abs(y2 - y1);
  const top    = Math.min(y1, y2);

  // Subtle fill
  ctx.fillStyle = 'rgba(255,255,255,0.03)';
  ctx.fillRect(chartLeft, top, chartWidth, height);

  // Dashed border
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);

  ctx.beginPath();
  ctx.rect(chartLeft, top, chartWidth, height);
  ctx.stroke();

  ctx.setLineDash([]);

  // Mid line
  const midY = priceToY(range.mid);
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 6]);
  ctx.beginPath();
  ctx.moveTo(chartLeft, midY);
  ctx.lineTo(chartLeft + chartWidth, midY);
  ctx.stroke();
  ctx.setLineDash([]);
}

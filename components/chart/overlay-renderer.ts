// Overlay renderer — price lines, labels, grid lines
// Pure TypeScript, no React.

export function drawCurrentPriceLine(
  ctx: CanvasRenderingContext2D,
  y: number,
  chartLeft: number,
  chartWidth: number,
): void {
  ctx.strokeStyle = '#18D4EA';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.shadowColor = 'rgba(24,212,234,0.5)';
  ctx.shadowBlur  = 6;

  ctx.beginPath();
  ctx.moveTo(chartLeft, y);
  ctx.lineTo(chartLeft + chartWidth, y);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur  = 0;
}

export function drawPriceLabel(
  ctx: CanvasRenderingContext2D,
  price: number,
  y: number,
  canvasWidth: number,
  paddingRight: number,
): void {
  const labelText = price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const labelW = 72;
  const labelH = 18;
  const labelX = canvasWidth - paddingRight + 4;
  const labelY = y - labelH / 2;

  // Background rect
  ctx.fillStyle = '#141921';
  ctx.fillRect(labelX, labelY, labelW, labelH);

  // Border
  ctx.strokeStyle = '#0DB8CC';
  ctx.lineWidth = 1;
  ctx.strokeRect(labelX, labelY, labelW, labelH);

  // Text
  ctx.fillStyle = '#18D4EA';
  ctx.font = '10px JetBrains Mono';
  ctx.textAlign = 'center';
  ctx.fillText(labelText, labelX + labelW / 2, y + 3.5);
}

export function drawGridLines(
  ctx: CanvasRenderingContext2D,
  chartLeft: number,
  chartWidth: number,
  chartTop: number,
  chartHeight: number,
  levels = 6,
): void {
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  ctx.setLineDash([]);

  for (let i = 0; i <= levels; i++) {
    const y = chartTop + (chartHeight / levels) * i;
    ctx.beginPath();
    ctx.moveTo(chartLeft, y);
    ctx.lineTo(chartLeft + chartWidth, y);
    ctx.stroke();
  }
}

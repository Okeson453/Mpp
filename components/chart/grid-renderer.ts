/**
 * Grid Renderer
 * Canvas rendering for chart grid lines and background
 */

import type { OHLC } from '@/lib/utils/chart-math';

export interface GridConfig {
    rows: number;
    cols: number;
    color: string;
    opacity: number;
    lineWidth: number;
    showMajor: boolean;
    showMinor: boolean;
    majorSpacing: number;
    minorSpacing: number;
}

export interface GridMetrics {
    width: number;
    height: number;
    pixelPerRow: number;
    pixelPerCol: number;
    minPrice: number;
    maxPrice: number;
    priceRange: number;
}

export class GridRenderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private config: GridConfig;
    private metrics: GridMetrics | null = null;

    constructor(canvas: HTMLCanvasElement, config: Partial<GridConfig> = {}) {
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get 2D context from canvas');
        this.ctx = ctx;

        this.config = {
            rows: config.rows || 10,
            cols: config.cols || 20,
            color: config.color || '#374151',
            opacity: config.opacity ?? 0.5,
            lineWidth: config.lineWidth || 1,
            showMajor: config.showMajor ?? true,
            showMinor: config.showMinor ?? false,
            majorSpacing: config.majorSpacing || 50,
            minorSpacing: config.minorSpacing || 10,
        };
    }

    /**
     * Calculate grid metrics from price data
     */
    calculateMetrics(ohlcs: OHLC[], chartWidth: number, chartHeight: number): GridMetrics {
        const minPrice = Math.min(...ohlcs.map((c) => c.low));
        const maxPrice = Math.max(...ohlcs.map((c) => c.high));
        const padding = (maxPrice - minPrice) * 0.05;

        this.metrics = {
            width: chartWidth,
            height: chartHeight,
            pixelPerRow: chartHeight / this.config.rows,
            pixelPerCol: chartWidth / this.config.cols,
            minPrice: minPrice - padding,
            maxPrice: maxPrice + padding,
            priceRange: maxPrice - minPrice + padding * 2,
        };

        return this.metrics;
    }

    /**
     * Render grid lines
     */
    render(metrics: GridMetrics): void {
        this.metrics = metrics;
        this.ctx.save();
        this.ctx.globalAlpha = this.config.opacity;

        this.renderHorizontalLines();
        this.renderVerticalLines();

        this.ctx.restore();
    }

    /**
     * Render horizontal grid lines (price levels)
     */
    private renderHorizontalLines(): void {
        if (!this.metrics) return;

        const { height, pixelPerRow, minPrice, priceRange, width } = this.metrics;

        this.ctx.strokeStyle = this.config.color;
        this.ctx.lineWidth = this.config.lineWidth;

        for (let i = 0; i <= this.config.rows; i++) {
            const y = (i / this.config.rows) * height;
            const price = minPrice + (i / this.config.rows) * priceRange;

            // Draw line
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(width, y);
            this.ctx.stroke();

            // Draw price label
            this.ctx.fillStyle = this.config.color;
            this.ctx.font = '12px monospace';
            this.ctx.textAlign = 'right';
            this.ctx.fillText(price.toFixed(2), width - 5, y - 3);
        }
    }

    /**
     * Render vertical grid lines (time)
     */
    private renderVerticalLines(): void {
        if (!this.metrics) return;

        const { width, height, pixelPerCol } = this.metrics;

        this.ctx.strokeStyle = this.config.color;
        this.ctx.lineWidth = this.config.lineWidth;

        for (let i = 0; i <= this.config.cols; i++) {
            const x = (i / this.config.cols) * width;

            // Draw line
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, height);
            this.ctx.stroke();
        }
    }

    /**
     * Render background
     */
    renderBackground(color: string = '#1a1a2e'): void {
        const { width, height } = this.canvas;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, width, height);
    }

    /**
     * Get price from Y coordinate
     */
    priceFromY(y: number): number {
        if (!this.metrics) return 0;
        const { height, minPrice, priceRange } = this.metrics;
        return minPrice + ((height - y) / height) * priceRange;
    }

    /**
     * Get Y coordinate from price
     */
    yFromPrice(price: number): number {
        if (!this.metrics) return 0;
        const { height, minPrice, priceRange } = this.metrics;
        return height - ((price - minPrice) / priceRange) * height;
    }

    /**
     * Get X coordinate from index
     */
    xFromIndex(index: number, totalBars: number): number {
        if (!this.metrics) return 0;
        return (index / totalBars) * this.metrics.width;
    }

    /**
     * Clear canvas
     */
    clear(): void {
        const { width, height } = this.canvas;
        this.ctx.clearRect(0, 0, width, height);
    }

    /**
     * Resize canvas
     */
    resize(width: number, height: number): void {
        this.canvas.width = width;
        this.canvas.height = height;
    }
}

export default GridRenderer;

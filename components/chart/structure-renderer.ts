/**
 * Structure Renderer
 * Canvas rendering for chart structures (trend lines, support/resistance, patterns)
 */

import type { PriceZone, ZoneCluster } from '@/lib/utils/zone-calculator';

export interface TrendLine {
    id: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    type: 'support' | 'resistance' | 'channel';
    color: string;
    width: number;
}

export interface Pattern {
    id: string;
    name: string;
    points: Array<{ x: number; y: number }>;
    color: string;
    filled: boolean;
    alpha: number;
}

export interface StructureConfig {
    supportColor: string;
    resistanceColor: string;
    trendLineWidth: number;
    patternAlpha: number;
    zoneAlpha: number;
    labelFontSize: number;
}

export class StructureRenderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private config: StructureConfig;
    private trendLines: Map<string, TrendLine> = new Map();
    private patterns: Map<string, Pattern> = new Map();

    constructor(canvas: HTMLCanvasElement, config: Partial<StructureConfig> = {}) {
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get 2D context from canvas');
        this.ctx = ctx;

        this.config = {
            supportColor: config.supportColor || '#10b981',
            resistanceColor: config.resistanceColor || '#ef4444',
            trendLineWidth: config.trendLineWidth || 2,
            patternAlpha: config.patternAlpha ?? 0.3,
            zoneAlpha: config.zoneAlpha ?? 0.2,
            labelFontSize: config.labelFontSize || 12,
        };
    }

    /**
     * Add a trend line
     */
    addTrendLine(line: TrendLine): void {
        this.trendLines.set(line.id, line);
    }

    /**
     * Remove a trend line
     */
    removeTrendLine(id: string): void {
        this.trendLines.delete(id);
    }

    /**
     * Add a pattern
     */
    addPattern(pattern: Pattern): void {
        this.patterns.set(pattern.id, pattern);
    }

    /**
     * Remove a pattern
     */
    removePattern(id: string): void {
        this.patterns.delete(id);
    }

    /**
     * Render all trend lines
     */
    renderTrendLines(): void {
        for (const line of this.trendLines.values()) {
            this.renderTrendLine(line);
        }
    }

    /**
     * Render a single trend line
     */
    private renderTrendLine(line: TrendLine): void {
        this.ctx.save();
        this.ctx.strokeStyle = line.color;
        this.ctx.lineWidth = line.width;
        this.ctx.setLineDash([5, 5]); // Dashed line

        this.ctx.beginPath();
        this.ctx.moveTo(line.startX, line.startY);
        this.ctx.lineTo(line.endX, line.endY);
        this.ctx.stroke();

        // Draw endpoints
        this.ctx.fillStyle = line.color;
        this.ctx.beginPath();
        this.ctx.arc(line.startX, line.startY, 3, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(line.endX, line.endY, 3, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
    }

    /**
     * Render all patterns
     */
    renderPatterns(): void {
        for (const pattern of this.patterns.values()) {
            this.renderPattern(pattern);
        }
    }

    /**
     * Render a single pattern
     */
    private renderPattern(pattern: Pattern): void {
        if (pattern.points.length < 2) return;

        this.ctx.save();
        this.ctx.globalAlpha = pattern.alpha;
        this.ctx.fillStyle = pattern.color;
        this.ctx.strokeStyle = pattern.color;
        this.ctx.lineWidth = 2;

        this.ctx.beginPath();
        this.ctx.moveTo(pattern.points[0].x, pattern.points[0].y);

        for (let i = 1; i < pattern.points.length; i++) {
            this.ctx.lineTo(pattern.points[i].x, pattern.points[i].y);
        }

        this.ctx.closePath();

        if (pattern.filled) {
            this.ctx.fill();
        }
        this.ctx.stroke();

        // Draw label
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = pattern.color;
        this.ctx.font = `${this.config.labelFontSize}px monospace`;
        this.ctx.textAlign = 'center';
        const centerX = pattern.points.reduce((sum, p) => sum + p.x, 0) / pattern.points.length;
        const centerY = pattern.points.reduce((sum, p) => sum + p.y, 0) / pattern.points.length;
        this.ctx.fillText(pattern.name, centerX, centerY);

        this.ctx.restore();
    }

    /**
     * Render price zones
     */
    renderZones(zones: PriceZone[], yFromPrice: (price: number) => number, width: number): void {
        for (const zone of zones) {
            this.renderZone(zone, yFromPrice, width);
        }
    }

    /**
     * Render a single price zone
     */
    private renderZone(zone: PriceZone, yFromPrice: (price: number) => number, width: number): void {
        const y = yFromPrice(zone.level);
        const color = zone.type === 'support' ? this.config.supportColor : this.config.resistanceColor;

        this.ctx.save();
        this.ctx.globalAlpha = this.config.zoneAlpha * (zone.strength / 100);
        this.ctx.fillStyle = color;

        // Draw horizontal bar
        this.ctx.fillRect(0, y - 2, width, 4);

        // Draw zone label
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = color;
        this.ctx.font = `bold ${this.config.labelFontSize}px monospace`;
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`${zone.level.toFixed(2)} (${Math.round(zone.strength)}%)`, width - 5, y - 5);

        this.ctx.restore();
    }

    /**
     * Render zone cluster
     */
    renderZoneCluster(cluster: ZoneCluster, yFromPrice: (price: number) => number, width: number): void {
        // Render all zones in cluster
        for (const zone of cluster.zones) {
            this.renderZone(zone, yFromPrice, width);
        }

        // Highlight cluster center
        const centerY = yFromPrice(cluster.centerPrice);
        this.ctx.save();
        this.ctx.strokeStyle = '#3b82f6';
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([10, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(0, centerY);
        this.ctx.lineTo(width, centerY);
        this.ctx.stroke();
        this.ctx.restore();
    }

    /**
     * Clear all structures
     */
    clear(): void {
        this.trendLines.clear();
        this.patterns.clear();
    }

    /**
     * Get all trend lines
     */
    getTrendLines(): TrendLine[] {
        return Array.from(this.trendLines.values());
    }

    /**
     * Get all patterns
     */
    getPatterns(): Pattern[] {
        return Array.from(this.patterns.values());
    }

    /**
     * Export structures to JSON
     */
    export() {
        return {
            trendLines: Array.from(this.trendLines.values()),
            patterns: Array.from(this.patterns.values()),
        };
    }

    /**
     * Import structures from JSON
     */
    import(data: ReturnType<StructureRenderer['export']>): void {
        this.clear();
        data.trendLines.forEach((line) => this.addTrendLine(line));
        data.patterns.forEach((pattern) => this.addPattern(pattern));
    }
}

export default StructureRenderer;

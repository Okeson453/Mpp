/**
 * Zone Calculator
 * Utilities for calculating support/resistance zones and price levels
 */

export interface PriceZone {
    name: string;
    level: number;
    type: 'support' | 'resistance' | 'pivot' | 'fibonacci';
    strength: number; // 0-100
    touches: number;
    bounces: number;
    breaks: number;
}

export interface ZoneCluster {
    zones: PriceZone[];
    centerPrice: number;
    range: { high: number; low: number };
    density: number;
}

/**
 * Calculate pivot points
 */
export function calculatePivotPoints(high: number, low: number, close: number) {
    const pivot = (high + low + close) / 3;
    const r1 = 2 * pivot - low;
    const s1 = 2 * pivot - high;
    const r2 = pivot + (high - low);
    const s2 = pivot - (high - low);

    return {
        pivot,
        r1,
        s1,
        r2,
        s2,
    };
}

/**
 * Calculate Fibonacci levels
 */
export function calculateFibonacciLevels(high: number, low: number) {
    const range = high - low;

    return {
        level_0: high,
        level_236: high - range * 0.236,
        level_382: high - range * 0.382,
        level_500: high - range * 0.5,
        level_618: high - range * 0.618,
        level_786: high - range * 0.786,
        level_100: low,
    };
}

/**
 * Calculate support/resistance from price extremes
 */
export function calculateLevelStrength(
    price: number,
    touches: number,
    bounces: number,
    breaks: number
): number {
    // Strength = (touches * 20) + (bounces * 15) - (breaks * 25)
    let strength = touches * 20 + bounces * 15 - breaks * 25;
    return Math.max(0, Math.min(100, strength));
}

/**
 * Identify price zones from recent highs and lows
 */
export interface PriceExtreme {
    price: number;
    timestamp: Date;
    type: 'high' | 'low';
}

export function identifyZones(extremes: PriceExtreme[], tolerance: number = 0.01): PriceZone[] {
    const zones: Map<number, PriceZone> = new Map();

    extremes.forEach((extreme) => {
        const roundedPrice = Math.round(extreme.price / tolerance) * tolerance;
        const key = Math.round(roundedPrice * 10000) / 10000;

        if (zones.has(key)) {
            const zone = zones.get(key)!;
            zone.touches++;
            if (extreme.type === 'high') zone.bounces++;
        } else {
            zones.set(key, {
                name: `Level ${key}`,
                level: key,
                type: extreme.type === 'high' ? 'resistance' : 'support',
                strength: 0,
                touches: 1,
                bounces: extreme.type === 'high' ? 1 : 0,
                breaks: 0,
            });
        }
    });

    return Array.from(zones.values()).map((zone) => ({
        ...zone,
        strength: calculateLevelStrength(zone.level, zone.touches, zone.bounces, zone.breaks),
    }));
}

/**
 * Cluster nearby zones
 */
export function clusterZones(zones: PriceZone[], tolerance: number = 0.02): ZoneCluster[] {
    const clusters: ZoneCluster[] = [];
    const sorted = [...zones].sort((a, b) => a.level - b.level);

    let currentCluster: PriceZone[] = [];

    for (let i = 0; i < sorted.length; i++) {
        if (currentCluster.length === 0) {
            currentCluster.push(sorted[i]);
        } else {
            const lastZone = currentCluster[currentCluster.length - 1];
            const range = Math.abs(sorted[i].level - lastZone.level);

            if (range < tolerance * lastZone.level) {
                currentCluster.push(sorted[i]);
            } else {
                clusters.push(formatCluster(currentCluster));
                currentCluster = [sorted[i]];
            }
        }
    }

    if (currentCluster.length > 0) {
        clusters.push(formatCluster(currentCluster));
    }

    return clusters;
}

function formatCluster(zones: PriceZone[]): ZoneCluster {
    const prices = zones.map((z) => z.level);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const range = { high: Math.max(...prices), low: Math.min(...prices) };
    const density = zones.length / (range.high - range.low || 1);

    return {
        zones,
        centerPrice: avgPrice,
        range,
        density,
    };
}

/**
 * Calculate zone strength with decay over time
 */
export function calculateZoneStrengthWithDecay(
    zone: PriceZone,
    daysOld: number,
    decayFactor: number = 0.05
): number {
    const decay = Math.exp(-decayFactor * daysOld);
    return zone.strength * decay;
}

/**
 * Find closest zone to current price
 */
export function findClosestZone(currentPrice: number, zones: PriceZone[]): PriceZone | null {
    if (zones.length === 0) return null;

    return zones.reduce((closest, zone) => {
        const closestDist = Math.abs(closest.level - currentPrice);
        const zoneDist = Math.abs(zone.level - currentPrice);
        return zoneDist < closestDist ? zone : closest;
    });
}

/**
 * Identify zone breakout
 */
export function isZoneBreakout(
    previousClose: number,
    currentPrice: number,
    zone: PriceZone,
    breakoutThreshold: number = 0.001
): boolean {
    const threshold = Math.abs(zone.level) * breakoutThreshold;
    const wasInsideZone =
        Math.abs(previousClose - zone.level) < threshold &&
        zone.type === (previousClose < zone.level ? 'support' : 'resistance');
    const isOutsideZone = Math.abs(currentPrice - zone.level) >= threshold;

    return wasInsideZone && isOutsideZone;
}

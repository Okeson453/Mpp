/**
 * Session Time Utilities
 * Functions for tracking, formatting, and analyzing session timing data
 */

export interface SessionTime {
    startTime: Date;
    endTime?: Date;
    duration: number; // milliseconds
    isPaused: boolean;
}

export interface TimeMetrics {
    totalTime: number; // milliseconds
    activeTime: number; // milliseconds
    pausedTime: number; // milliseconds
    breaks: Array<{ startTime: Date; endTime: Date }>;
}

/**
 * Format milliseconds to human-readable time string
 */
export function formatDuration(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
    }
    if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
}

/**
 * Format milliseconds to HH:MM:SS
 */
export function formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

/**
 * Calculate elapsed time in milliseconds
 */
export function getElapsedTime(startTime: Date, endTime?: Date): number {
    const end = endTime || new Date();
    return end.getTime() - startTime.getTime();
}

/**
 * Calculate trading session duration
 */
export function calculateSessionDuration(
    startTime: Date,
    endTime: Date,
    breaks: Array<{ startTime: Date; endTime: Date }> = []
): TimeMetrics {
    const totalTime = endTime.getTime() - startTime.getTime();
    const pausedTime = breaks.reduce((sum, b) => sum + (b.endTime.getTime() - b.startTime.getTime()), 0);
    const activeTime = totalTime - pausedTime;

    return {
        totalTime,
        activeTime,
        pausedTime,
        breaks,
    };
}

/**
 * Determine session type based on duration
 */
export function getSessionType(duration: number): 'scalp' | 'daytrader' | 'swinger' | 'position' {
    // duration in milliseconds
    const minutes = duration / 60000;

    if (minutes < 5) return 'scalp';
    if (minutes < 240) return 'daytrader'; // 4 hours
    if (minutes < 1440) return 'swinger'; // 24 hours
    return 'position';
}

/**
 * Get session time of day
 */
export function getTimeOfDay(date: Date): 'morning' | 'midday' | 'afternoon' | 'evening' | 'night' {
    const hour = date.getHours();

    if (hour < 12) return 'morning';
    if (hour < 15) return 'midday';
    if (hour < 18) return 'afternoon';
    if (hour < 21) return 'evening';
    return 'night';
}

/**
 * Get trading session based on time
 */
export function getTradingSession(date: Date): 'asia' | 'europe' | 'us' | 'combined' {
    const hour = date.getHours();

    if (hour >= 0 && hour < 8) return 'asia';
    if (hour >= 8 && hour < 16) return 'europe';
    if (hour >= 13 && hour < 21) return 'us';
    return 'combined';
}

/**
 * Check if time is within market hours
 */
export function isMarketHours(date: Date, market: 'forex' | 'stocks' | 'crypto' = 'forex'): boolean {
    const hour = date.getHours();
    const day = date.getDay();

    // Weekend check
    if (day === 0 || day === 6) return market === 'crypto';

    switch (market) {
        case 'forex':
            return true; // Forex is 24/5
        case 'stocks':
            return hour >= 14 && hour < 21; // US market 9:30-16:00 EST
        case 'crypto':
            return true; // Crypto is 24/7
        default:
            return true;
    }
}

/**
 * Calculate optimal trading hours
 */
export function getOptimalTradingHours(timezone: string): { start: number; end: number } {
    // Returns hours in 24-hour format for given timezone
    // This is a simplified version - real implementation would use timezone library
    return { start: 9, end: 17 };
}

/**
 * Convert milliseconds to trading metrics
 */
export function getTimeMetrics(milliseconds: number) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return {
        milliseconds,
        seconds,
        minutes,
        hours,
        days,
        formatted: formatDuration(milliseconds),
        hhmmss: formatTime(milliseconds),
    };
}

/**
 * Calculate average trade duration
 */
export function calculateAverageTradeDuration(
    trades: Array<{ entryTime: Date; exitTime: Date }>
): number {
    if (trades.length === 0) return 0;

    const totalDuration = trades.reduce(
        (sum, trade) => sum + (trade.exitTime.getTime() - trade.entryTime.getTime()),
        0
    );

    return totalDuration / trades.length;
}

/**
 * Estimate session time recommendation
 */
export function recommendSessionDuration(
    tradeFrequency: number,
    averageTradeSize: number
): number {
    // Returns recommended session duration in milliseconds
    // Based on trading frequency and position size
    const baseTime = 60 * 60 * 1000; // 1 hour minimum
    const additionalTime = tradeFrequency * averageTradeSize * 5 * 60 * 1000; // 5 minutes per unit
    return Math.min(baseTime + additionalTime, 8 * 60 * 60 * 1000); // Max 8 hours
}

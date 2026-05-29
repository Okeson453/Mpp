/**
 * Session Constants
 * Configuration for trading sessions, timeframes, and session management
 */

export const SESSION_TIMEFRAMES = {
    INTRADAY: '5m' as const,
    SHORT_SWING: '15m' as const,
    SWING: '1h' as const,
    POSITION: '4h' as const,
    DAILY: '1d' as const,
} as const;

export const SESSION_TYPES = {
    SCALP: 'scalp',
    INTRADAY: 'intraday',
    SWING: 'swing',
    POSITION: 'position',
} as const;

export const SESSION_STATUS = {
    ACTIVE: 'active' as const,
    PAUSED: 'paused' as const,
    CLOSED: 'closed' as const,
} as const;

export const TRADE_DIRECTIONS = {
    LONG: 'long' as const,
    SHORT: 'short' as const,
} as const;

export const TRADE_STATUS = {
    OPEN: 'open' as const,
    CLOSED: 'closed' as const,
    PENDING: 'pending' as const,
    CANCELLED: 'cancelled' as const,
} as const;

export const SETUP_TYPES = {
    PULLBACK: 'pullback' as const,
    BREAKOUT: 'breakout' as const,
    REVERSAL: 'reversal' as const,
    CONTINUATION: 'continuation' as const,
    SCALP: 'scalp' as const,
    SWING: 'swing' as const,
} as const;

export const MARKET_CONDITIONS = {
    BULLISH: 'bullish' as const,
    BEARISH: 'bearish' as const,
    RANGING: 'ranging' as const,
} as const;

export const VOLATILITY_LEVELS = {
    LOW: 'low' as const,
    MEDIUM: 'medium' as const,
    HIGH: 'high' as const,
} as const;

export const SESSION_DURATION_PRESETS = {
    FIFTEEN_MIN: 15,
    THIRTY_MIN: 30,
    ONE_HOUR: 60,
    TWO_HOURS: 120,
    FOUR_HOURS: 240,
    EIGHT_HOURS: 480,
    FULL_DAY: 1440,
} as const;

export const SESSION_MAX_METRICS = {
    MAX_TRADES_PER_SESSION: 50,
    MAX_SESSION_DURATION: 1440 * 60, // 24 hours in seconds
    MAX_DAILY_SESSIONS: 3,
    MAX_CONCURRENT_TRADES: 10,
} as const;

export const PERFORMANCE_THRESHOLDS = {
    EXCELLENT_WIN_RATE: 0.65,
    GOOD_WIN_RATE: 0.55,
    ACCEPTABLE_WIN_RATE: 0.50,
    PROFIT_FACTOR_GOOD: 2.0,
    PROFIT_FACTOR_EXCELLENT: 3.0,
    RRR_MINIMUM: 1.5,
    RRR_IDEAL: 2.0,
} as const;

export const SESSION_INTERVALS = {
    MORNING: { start: 9, end: 12 },
    MIDDAY: { start: 12, end: 15 },
    AFTERNOON: { start: 15, end: 18 },
    EVENING: { start: 18, end: 21 },
    NIGHT: { start: 21, end: 24 },
} as const;

export const EMOTION_TYPES = {
    FEAR: 'fear' as const,
    GREED: 'greed' as const,
    PATIENCE: 'patience' as const,
    DISCIPLINE: 'discipline' as const,
    OVERCONFIDENCE: 'overconfidence' as const,
} as const;

export const EMOTION_SEVERITY = {
    LOW: 'low' as const,
    MEDIUM: 'medium' as const,
    HIGH: 'high' as const,
} as const;

export const MISTAKE_CATEGORIES = {
    ENTRY: 'entry' as const,
    EXIT: 'exit' as const,
    SIZING: 'sizing' as const,
    MANAGEMENT: 'management' as const,
    PSYCHOLOGY: 'psychology' as const,
} as const;

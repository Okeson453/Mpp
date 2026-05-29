/**
 * Journal Type Definitions
 * Defines trading journal, session, and trade-related types
 */

export type TradeStatus = 'open' | 'closed' | 'pending' | 'cancelled';
export type TradeDirection = 'long' | 'short';
export type SetupType = 'pullback' | 'breakout' | 'reversal' | 'continuation' | 'scalp' | 'swing';
export type TradeGrade = 'A' | 'B' | 'C' | 'D' | 'F' | 'N/A';

export interface JournalSession {
    id: string;
    userId: string;
    date: Date;
    startTime: Date;
    endTime?: Date;
    status: 'active' | 'closed' | 'paused';
    trades: Trade[];
    summary: SessionSummary;
    notes?: string;
    environment: {
        market: string;
        volatility: 'low' | 'medium' | 'high';
        trend: 'bullish' | 'bearish' | 'ranging';
    };
}

export interface Trade {
    id: string;
    sessionId: string;
    symbol: string;
    direction: TradeDirection;
    entryPrice: number;
    exitPrice?: number;
    quantity: number;
    entryTime: Date;
    exitTime?: Date;
    status: TradeStatus;
    setupType: SetupType;
    riskReward: number;
    actualRR: number;
    profitLoss: number;
    profitLossPercent: number;
    grade: TradeGrade;
    notes?: string;
    screenshots: string[];
    tags: string[];
    emotions?: TradeEmotion[];
    mistakes?: TradeMistake[];
}

export interface TradeEmotion {
    type: 'fear' | 'greed' | 'patience' | 'discipline' | 'overconfidence';
    severity: 'low' | 'medium' | 'high';
    impact: 'negative' | 'positive' | 'neutral';
}

export interface TradeMistake {
    id: string;
    type: string;
    description: string;
    category: 'entry' | 'exit' | 'sizing' | 'management' | 'psychology';
    lesson: string;
}

export interface SessionSummary {
    totalTrades: number;
    winningTrades: number;
    losingTrades: number;
    winRate: number;
    totalProfit: number;
    totalLoss: number;
    netProfit: number;
    avgWin: number;
    avgLoss: number;
    profitFactor: number;
    largestWin: number;
    largestLoss: number;
    riskRewardRatio: number;
    tradingTime: number; // minutes
    bestTrade?: Trade;
    worstTrade?: Trade;
    performance: {
        score: number; // 0-100
        grade: TradeGrade;
        strengths: string[];
        improvements: string[];
    };
}

export interface TradeStats {
    allTime: SessionSummary;
    thisMonth: SessionSummary;
    thisWeek: SessionSummary;
    today: SessionSummary;
    bySetup: Record<SetupType, SessionSummary>;
    bySymbol: Record<string, SessionSummary>;
}

export interface PerformanceMatrix {
    date: Date;
    dayOfWeek: number;
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    volatility: 'low' | 'medium' | 'high';
    performance: number;
    trades: number;
    winRate: number;
}

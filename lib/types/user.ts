/**
 * User Type Definitions
 * Defines all user-related types across authentication, profile, and subscription contexts
 */

export type UserTier = 'free' | 'pro' | 'elite' | 'enterprise';

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    tier: UserTier;
    createdAt: Date;
    updatedAt: Date;
    verified: boolean;
    preferences: UserPreferences;
}

export interface UserPreferences {
    theme: 'light' | 'dark' | 'auto';
    timezone: string;
    language: 'en' | 'es' | 'fr' | 'de';
    notifications: {
        email: boolean;
        push: boolean;
        alerts: boolean;
    };
    chartPreferences: {
        candleType: 'candle' | 'bar' | 'heikin' | 'renko';
        timeframe: string;
        indicators: string[];
    };
    tradingPreferences: {
        accountSize: number;
        riskPercentage: number;
        maxDailyLoss: number;
        preferredInstruments: string[];
    };
}

export interface UserStats {
    totalTrades: number;
    winRate: number;
    profitFactor: number;
    totalProfit: number;
    streak: {
        current: number;
        best: number;
        type: 'win' | 'loss';
    };
    experience: {
        level: number;
        points: number;
        nextLevelAt: number;
    };
}

export interface UserSubscription {
    id: string;
    userId: string;
    tier: UserTier;
    status: 'active' | 'cancelled' | 'expired';
    startDate: Date;
    endDate: Date;
    autoRenew: boolean;
    features: UserTierFeatures;
}

export interface UserTierFeatures {
    maxAccounts: number;
    maxAlerts: number;
    advancedCharts: boolean;
    apiAccess: boolean;
    backtestHistory: number;
    customIndicators: boolean;
    prioritySupport: boolean;
}

export interface AuthToken {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: 'Bearer';
}

export interface Session {
    id: string;
    userId: string;
    token: string;
    createdAt: Date;
    expiresAt: Date;
    ipAddress?: string;
    userAgent?: string;
    active: boolean;
}

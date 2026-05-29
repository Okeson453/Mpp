/**
 * Risk/Reward Ratio Calculator
 * Utilities for calculating and analyzing risk-reward metrics
 */

export interface RiskRewardMetrics {
    riskAmount: number;
    rewardAmount: number;
    ratio: number;
    potentialProfit: number;
    potentialLoss: number;
    profitFactor: number;
}

/**
 * Calculate risk-reward ratio from price levels
 */
export function calculateRRR(
    entryPrice: number,
    stopLossPrice: number,
    takeProfitPrice: number,
    quantity: number
): RiskRewardMetrics {
    const riskAmount = Math.abs(entryPrice - stopLossPrice) * quantity;
    const rewardAmount = Math.abs(takeProfitPrice - entryPrice) * quantity;

    return {
        riskAmount,
        rewardAmount,
        ratio: rewardAmount / riskAmount,
        potentialProfit: rewardAmount,
        potentialLoss: riskAmount,
        profitFactor: rewardAmount > 0 ? rewardAmount / (riskAmount || 1) : 0,
    };
}

/**
 * Calculate ideal take profit from entry, stop loss, and desired RRR
 */
export function calculateTPFromRRR(
    entryPrice: number,
    stopLossPrice: number,
    desiredRRR: number,
    isLong: boolean
): number {
    const riskPerPoint = Math.abs(entryPrice - stopLossPrice);
    const rewardPerPoint = riskPerPoint * desiredRRR;

    return isLong ? entryPrice + rewardPerPoint : entryPrice - rewardPerPoint;
}

/**
 * Calculate ideal stop loss from entry, take profit, and desired RRR
 */
export function calculateSLFromRRR(
    entryPrice: number,
    takeProfitPrice: number,
    desiredRRR: number,
    isLong: boolean
): number {
    const rewardPerPoint = Math.abs(takeProfitPrice - entryPrice);
    const riskPerPoint = rewardPerPoint / desiredRRR;

    return isLong ? entryPrice - riskPerPoint : entryPrice + riskPerPoint;
}

/**
 * Calculate position size based on account risk
 */
export interface PositionSizeParams {
    accountSize: number;
    riskPercentage: number;
    entryPrice: number;
    stopLossPrice: number;
}

export function calculatePositionSize(params: PositionSizeParams): {
    quantity: number;
    riskAmount: number;
    potentialLoss: number;
} {
    const riskAmount = params.accountSize * (params.riskPercentage / 100);
    const pipValue = Math.abs(params.entryPrice - params.stopLossPrice);
    const quantity = pipValue > 0 ? riskAmount / pipValue : 0;

    return {
        quantity: Math.floor(quantity),
        riskAmount,
        potentialLoss: riskAmount,
    };
}

/**
 * Calculate profit/loss percentage
 */
export function calculatePnLPercent(
    entryPrice: number,
    exitPrice: number,
    quantity: number
): number {
    if (entryPrice === 0) return 0;
    return ((exitPrice - entryPrice) / entryPrice) * 100;
}

/**
 * Calculate profit/loss amount
 */
export function calculatePnL(
    entryPrice: number,
    exitPrice: number,
    quantity: number
): number {
    return (exitPrice - entryPrice) * quantity;
}

/**
 * Calculate average entry price (for scaling trades)
 */
export function calculateAveragePrice(
    trades: Array<{ price: number; quantity: number }>
): number {
    const totalCost = trades.reduce((sum, trade) => sum + trade.price * trade.quantity, 0);
    const totalQuantity = trades.reduce((sum, trade) => sum + trade.quantity, 0);
    return totalQuantity > 0 ? totalCost / totalQuantity : 0;
}

/**
 * Calculate breakeven price with commissions
 */
export function calculateBreakeven(
    entryPrice: number,
    quantity: number,
    commission: number,
    isLong: boolean
): number {
    const commissionPerUnit = commission / quantity;
    const adjustment = commissionPerUnit * 2; // buy + sell

    return isLong ? entryPrice + adjustment : entryPrice - adjustment;
}

/**
 * Calculate optimal RRR based on win rate
 */
export function getOptimalRRRForWinRate(winRate: number): number {
    // Formula: minRRR = (1 - winRate) / winRate
    if (winRate >= 1) return 0;
    if (winRate <= 0) return Infinity;
    return (1 - winRate) / winRate;
}

/**
 * Calculate expected value per trade
 */
export function calculateExpectedValue(
    winRate: number,
    avgWin: number,
    avgLoss: number
): number {
    return winRate * avgWin - (1 - winRate) * avgLoss;
}

/**
 * Calculate profit factor
 */
export function calculateProfitFactor(totalWins: number, totalLosses: number): number {
    if (totalLosses === 0) return totalWins > 0 ? Infinity : 0;
    return Math.abs(totalWins / totalLosses);
}

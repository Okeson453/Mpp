/**
 * Grade Calculator
 * Utilities for calculating and assigning trade grades
 */

import { TradeGrade } from '@/lib/types/journal';
import { GRADE_CRITERIA, TRADE_GRADES } from '@/lib/constants/grades';

export interface TradeGradeInput {
    winRate: number;
    profitFactor: number;
    rrr: number;
    executionScore: number;
    riskManagement: 'excellent' | 'good' | 'acceptable' | 'poor' | 'failed';
    emotionalControl: 'excellent' | 'good' | 'acceptable' | 'poor' | 'failed';
    profitLoss: number;
    expectedValue: number;
}

export interface GradeResult {
    grade: TradeGrade;
    score: number;
    reasoning: string[];
    strengths: string[];
    improvements: string[];
}

/**
 * Calculate trade grade
 */
export function calculateTradeGrade(input: TradeGradeInput): GradeResult {
    const scores = calculateGradeScores(input);
    const grade = determineGrade(scores);
    const reasoning = generateReasoning(input, scores);
    const { strengths, improvements } = analyzePerformance(input);

    return {
        grade,
        score: calculateFinalScore(scores),
        reasoning,
        strengths,
        improvements,
    };
}

/**
 * Calculate individual grade scores
 */
function calculateGradeScores(input: TradeGradeInput) {
    return {
        winRate: input.winRate * 100,
        profitFactor: input.profitFactor * 100,
        rrr: Math.min(input.rrr * 50, 100), // Normalize to 0-100
        execution: input.executionScore,
        riskManagement: getRiskManagementScore(input.riskManagement),
        emotionalControl: getEmotionalControlScore(input.emotionalControl),
    };
}

/**
 * Determine grade letter from scores
 */
function determineGrade(scores: ReturnType<typeof calculateGradeScores>): TradeGrade {
    const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;

    if (avgScore >= 90) return TRADE_GRADES.A as TradeGrade;
    if (avgScore >= 75) return TRADE_GRADES.B as TradeGrade;
    if (avgScore >= 60) return TRADE_GRADES.C as TradeGrade;
    if (avgScore >= 40) return TRADE_GRADES.D as TradeGrade;
    return TRADE_GRADES.F as TradeGrade;
}

/**
 * Convert risk management level to score
 */
function getRiskManagementScore(level: string): number {
    const scores: Record<string, number> = {
        excellent: 100,
        good: 80,
        acceptable: 60,
        poor: 30,
        failed: 0,
    };
    return scores[level] || 0;
}

/**
 * Convert emotional control level to score
 */
function getEmotionalControlScore(level: string): number {
    const scores: Record<string, number> = {
        excellent: 100,
        good: 80,
        acceptable: 60,
        poor: 30,
        failed: 0,
    };
    return scores[level] || 0;
}

/**
 * Calculate final grade score (0-100)
 */
function calculateFinalScore(scores: ReturnType<typeof calculateGradeScores>): number {
    const weights = {
        winRate: 0.15,
        profitFactor: 0.15,
        rrr: 0.15,
        execution: 0.2,
        riskManagement: 0.2,
        emotionalControl: 0.15,
    };

    return (
        scores.winRate * weights.winRate +
        scores.profitFactor * weights.profitFactor +
        scores.rrr * weights.rrr +
        scores.execution * weights.execution +
        scores.riskManagement * weights.riskManagement +
        scores.emotionalControl * weights.emotionalControl
    );
}

/**
 * Generate reasoning for grade
 */
function generateReasoning(input: TradeGradeInput, scores: ReturnType<typeof calculateGradeScores>): string[] {
    const reasons: string[] = [];

    if (scores.winRate >= 70) {
        reasons.push(`Strong win rate of ${input.winRate.toFixed(1)}%`);
    } else if (scores.winRate < 40) {
        reasons.push(`Low win rate of ${input.winRate.toFixed(1)}% needs improvement`);
    }

    if (scores.profitFactor >= 2) {
        reasons.push(`Excellent profit factor of ${input.profitFactor.toFixed(2)}`);
    } else if (scores.profitFactor < 1.5) {
        reasons.push(`Profit factor of ${input.profitFactor.toFixed(2)} below target`);
    }

    if (scores.rrr >= 75) {
        reasons.push(`Strong risk-reward ratio of ${input.rrr.toFixed(2)}`);
    }

    if (scores.execution >= 80) {
        reasons.push('Excellent trade execution');
    } else if (scores.execution < 50) {
        reasons.push('Execution needs significant improvement');
    }

    if (scores.riskManagement >= 80) {
        reasons.push('Strong risk management adherence');
    }

    if (scores.emotionalControl >= 80) {
        reasons.push('Excellent emotional control');
    }

    return reasons;
}

/**
 * Analyze performance strengths and improvements
 */
function analyzePerformance(input: TradeGradeInput) {
    const strengths: string[] = [];
    const improvements: string[] = [];

    // Win rate analysis
    if (input.winRate >= 0.6) {
        strengths.push('Strong win rate');
    } else if (input.winRate < 0.45) {
        improvements.push('Improve win rate - focus on better entries');
    }

    // Profit factor analysis
    if (input.profitFactor >= 2.5) {
        strengths.push('Excellent win-to-loss ratio');
    } else if (input.profitFactor < 1.5) {
        improvements.push('Improve profit factor - manage losing trades better');
    }

    // RRR analysis
    if (input.rrr >= 2.5) {
        strengths.push('Excellent risk-reward ratios');
    } else if (input.rrr < 1.5) {
        improvements.push('Target better risk-reward opportunities');
    }

    // Execution analysis
    if (input.executionScore >= 85) {
        strengths.push('Disciplined execution');
    } else {
        improvements.push('Work on execution discipline');
    }

    // Expected value
    if (input.expectedValue > 0) {
        strengths.push('Positive expected value per trade');
    } else {
        improvements.push('System has negative expected value - revise approach');
    }

    // Risk management
    if (input.riskManagement === 'excellent') {
        strengths.push('Strong risk management');
    }

    // Emotional control
    if (input.emotionalControl === 'excellent') {
        strengths.push('Excellent emotional discipline');
    } else if (input.emotionalControl === 'poor' || input.emotionalControl === 'failed') {
        improvements.push('Work on emotional control during trades');
    }

    return { strengths, improvements };
}

/**
 * Batch grade multiple trades
 */
export function gradeTrades(inputs: TradeGradeInput[]): GradeResult[] {
    return inputs.map(calculateTradeGrade);
}

/**
 * Calculate overall session grade
 */
export function calculateSessionGrade(tradeGrades: GradeResult[]): GradeResult {
    if (tradeGrades.length === 0) {
        return {
            grade: 'N/A' as TradeGrade,
            score: 0,
            reasoning: ['No trades to grade'],
            strengths: [],
            improvements: [],
        };
    }

    const avgScore = tradeGrades.reduce((sum, g) => sum + g.score, 0) / tradeGrades.length;
    const gradeMap: Record<string, number> = {
        A: 5,
        B: 4,
        C: 3,
        D: 2,
        F: 1,
        'N/A': 0,
    };

    const avgGradeScore = tradeGrades.reduce((sum, g) => sum + (gradeMap[g.grade as string] || 0), 0) / tradeGrades.length;

    let sessionGrade: TradeGrade;
    if (avgGradeScore >= 4.5) sessionGrade = 'A';
    else if (avgGradeScore >= 3.5) sessionGrade = 'B';
    else if (avgGradeScore >= 2.5) sessionGrade = 'C';
    else if (avgGradeScore >= 1.5) sessionGrade = 'D';
    else sessionGrade = 'F';

    return {
        grade: sessionGrade,
        score: avgScore,
        reasoning: [`Session average grade: ${sessionGrade}`, `Average score: ${avgScore.toFixed(1)}/100`],
        strengths: [],
        improvements: [],
    };
}

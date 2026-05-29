/**
 * Grades Constants
 * Configuration for trade and performance grading system
 */

export const TRADE_GRADES = {
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    F: 'F',
    NA: 'N/A',
} as const;

export const GRADE_COLORS = {
    A: '#10b981', // emerald
    B: '#3b82f6', // blue
    C: '#f59e0b', // amber
    D: '#ef4444', // red
    F: '#7f1d1d', // dark red
    'N/A': '#6b7280', // gray
} as const;

export const GRADE_DESCRIPTIONS = {
    A: 'Excellent execution with perfect risk management',
    B: 'Good execution with minor imperfections',
    C: 'Acceptable trade with some issues',
    D: 'Poor execution with significant mistakes',
    F: 'Failed trade with critical errors',
    'N/A': 'Trade not graded',
} as const;

export const GRADE_CRITERIA = {
    A: {
        minWinRate: 0.70,
        minProfitFactor: 3.0,
        minRRR: 2.5,
        executionScore: 90,
        riskManagement: 'excellent',
        emotionalControl: 'excellent',
    },
    B: {
        minWinRate: 0.60,
        minProfitFactor: 2.0,
        minRRR: 2.0,
        executionScore: 75,
        riskManagement: 'good',
        emotionalControl: 'good',
    },
    C: {
        minWinRate: 0.50,
        minProfitFactor: 1.5,
        minRRR: 1.5,
        executionScore: 60,
        riskManagement: 'acceptable',
        emotionalControl: 'acceptable',
    },
    D: {
        minWinRate: 0.40,
        minProfitFactor: 1.0,
        minRRR: 1.0,
        executionScore: 40,
        riskManagement: 'poor',
        emotionalControl: 'poor',
    },
    F: {
        minWinRate: 0.0,
        minProfitFactor: 0.0,
        minRRR: 0.0,
        executionScore: 0,
        riskManagement: 'failed',
        emotionalControl: 'failed',
    },
} as const;

export const PERFORMANCE_GRADES = {
    EXCEPTIONAL: 'A+',
    EXCELLENT: 'A',
    VERY_GOOD: 'B+',
    GOOD: 'B',
    SATISFACTORY: 'C',
    NEEDS_IMPROVEMENT: 'D',
    POOR: 'F',
} as const;

export const PERFORMANCE_THRESHOLDS = {
    'A+': { min: 95, description: 'Exceptional' },
    'A': { min: 90, description: 'Excellent' },
    'B+': { min: 85, description: 'Very Good' },
    'B': { min: 75, description: 'Good' },
    'C': { min: 60, description: 'Satisfactory' },
    'D': { min: 40, description: 'Needs Improvement' },
    'F': { min: 0, description: 'Poor' },
} as const;

export const MASTERY_LEVELS = {
    NOVICE: 'novice',
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
    MASTER: 'master',
} as const;

export const MASTERY_THRESHOLDS = {
    novice: { min: 0, max: 10, color: '#ef4444' },
    beginner: { min: 10, max: 25, color: '#f97316' },
    intermediate: { min: 25, max: 50, color: '#eab308' },
    advanced: { min: 50, max: 75, color: '#84cc16' },
    expert: { min: 75, max: 90, color: '#10b981' },
    master: { min: 90, max: 100, color: '#0891b2' },
} as const;

export const SKILL_CATEGORIES = {
    ENTRY_TIMING: 'entry-timing',
    EXIT_TIMING: 'exit-timing',
    RISK_MANAGEMENT: 'risk-management',
    POSITION_SIZING: 'position-sizing',
    PATTERN_RECOGNITION: 'pattern-recognition',
    EMOTIONAL_CONTROL: 'emotional-control',
    ADAPTABILITY: 'adaptability',
    CONSISTENCY: 'consistency',
} as const;

export const CONSISTENCY_GRADES = {
    EXCEPTIONAL: { min: 0.75, label: 'Exceptional' },
    EXCELLENT: { min: 0.65, label: 'Excellent' },
    GOOD: { min: 0.55, label: 'Good' },
    FAIR: { min: 0.45, label: 'Fair' },
    POOR: { min: 0, label: 'Poor' },
} as const;

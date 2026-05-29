'use client';

/**
 * useSetupScorer Hook
 * Manages setup scoring, classification, and analysis
 */

import { useState, useCallback } from 'react';
import type { SetupType, TradeGrade } from '@/lib/types/journal';

export interface SetupScore {
    setupType: SetupType;
    quality: number; // 0-100
    confidence: number; // 0-100
    characteristics: string[];
    recommendation: 'strong' | 'neutral' | 'weak';
    grade: TradeGrade;
}

export interface SetupAnalysis {
    pattern: string;
    volume: 'above' | 'below' | 'normal';
    priceAction: string;
    timeFrame: string;
    riskLevel: 'low' | 'medium' | 'high';
}

export function useSetupScorer() {
    const [setupScores, setSetupScores] = useState<Map<string, SetupScore>>(new Map());
    const [analysis, setAnalysis] = useState<SetupAnalysis | null>(null);

    /**
     * Score a trading setup
     */
    const scoreSetup = useCallback((setup: Partial<SetupScore>) => {
        const calculateQuality = (): number => {
            let quality = 50;

            // Base scoring
            if (setup.characteristics?.length) {
                quality += setup.characteristics.length * 5;
            }

            // Recommendation weighting
            if (setup.recommendation === 'strong') quality += 30;
            else if (setup.recommendation === 'neutral') quality += 15;

            // Confidence factor
            quality = (quality * (setup.confidence || 50)) / 100;

            return Math.min(100, Math.max(0, quality));
        };

        const quality = setup.characteristics?.length ? calculateQuality() : 50;

        return {
            setupType: (setup.setupType || 'scalp') as SetupType,
            quality,
            confidence: setup.confidence || 50,
            characteristics: setup.characteristics || [],
            recommendation: setup.recommendation || 'neutral' as const,
            grade: deriveGrade(quality),
        };
    }, []);

    /**
     * Analyze current price action and setup
     */
    const analyzeSetup = useCallback((data: Partial<SetupAnalysis>) => {
        const newAnalysis: SetupAnalysis = {
            pattern: data.pattern || 'unknown',
            volume: data.volume || 'normal',
            priceAction: data.priceAction || 'neutral',
            timeFrame: data.timeFrame || '1h',
            riskLevel: data.riskLevel || 'medium',
        };

        setAnalysis(newAnalysis);
        return newAnalysis;
    }, []);

    /**
     * Store setup score
     */
    const storeScore = useCallback((id: string, score: SetupScore) => {
        setSetupScores((prev) => new Map(prev).set(id, score));
    }, []);

    /**
     * Get all stored scores
     */
    const getScores = useCallback(() => {
        return Array.from(setupScores.values());
    }, [setupScores]);

    /**
     * Calculate average setup quality
     */
    const getAverageQuality = useCallback(() => {
        const scores = getScores();
        if (scores.length === 0) return 0;
        return scores.reduce((sum, s) => sum + s.quality, 0) / scores.length;
    }, [getScores]);

    /**
     * Get best setups
     */
    const getBestSetups = useCallback((count: number = 5) => {
        return getScores().sort((a, b) => b.quality - a.quality).slice(0, count);
    }, [getScores]);

    /**
     * Clear scores
     */
    const clearScores = useCallback(() => {
        setSetupScores(new Map());
    }, []);

    return {
        setupScores: Array.from(setupScores.values()),
        analysis,
        scoreSetup,
        analyzeSetup,
        storeScore,
        getScores,
        getAverageQuality,
        getBestSetups,
        clearScores,
    };
}

/**
 * Helper: Derive grade from quality score
 */
function deriveGrade(quality: number): TradeGrade {
    if (quality >= 90) return 'A';
    if (quality >= 75) return 'B';
    if (quality >= 60) return 'C';
    if (quality >= 40) return 'D';
    return 'F';
}

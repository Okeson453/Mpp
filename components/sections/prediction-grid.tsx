'use client';

/**
 * Prediction Grid Component
 * Grid display for trade predictions and setups
 */

import React, { useState, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';

export interface PredictionCard {
    id: string;
    symbol: string;
    setup: string;
    confidence: number;
    timeframe: string;
    direction: 'long' | 'short';
    entryLevel: number;
    targetLevel: number;
}

interface PredictionGridProps {
    predictions: PredictionCard[];
    onSelect?: (prediction: PredictionCard) => void;
    className?: string;
}

export const PredictionGrid: React.FC<PredictionGridProps> = ({
    predictions,
    onSelect,
    className = '',
}) => {
    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 80) return 'bg-green-900 text-green-100';
        if (confidence >= 60) return 'bg-blue-900 text-blue-100';
        if (confidence >= 40) return 'bg-yellow-900 text-yellow-100';
        return 'bg-red-900 text-red-100';
    };

    return (
        <div className={className}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {predictions.map((pred) => (
                    <button
                        key={pred.id}
                        onClick={() => onSelect?.(pred)}
                        className="bg-slate-800 rounded-lg p-4 hover:bg-slate-700 transition-colors text-left group"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="text-lg font-bold text-white">{pred.symbol}</div>
                                <div className="text-xs text-slate-400">{pred.setup}</div>
                            </div>
                            <div
                                className={`px-2 py-1 rounded text-xs font-bold ${pred.direction === 'long' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'
                                    }`}
                            >
                                {pred.direction.toUpperCase()}
                            </div>
                        </div>

                        {/* Confidence */}
                        <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-slate-400">Confidence</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${getConfidenceColor(pred.confidence)}`}>
                                    {pred.confidence}%
                                </span>
                            </div>
                            <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all ${pred.confidence >= 80
                                            ? 'bg-green-500'
                                            : pred.confidence >= 60
                                                ? 'bg-blue-500'
                                                : pred.confidence >= 40
                                                    ? 'bg-yellow-500'
                                                    : 'bg-red-500'
                                        }`}
                                    style={{ width: `${pred.confidence}%` }}
                                />
                            </div>
                        </div>

                        {/* Levels */}
                        <div className="space-y-1 text-xs mb-3 border-t border-slate-700 pt-3">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Entry</span>
                                <span className="text-white font-medium">{pred.entryLevel.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Target</span>
                                <span className="text-white font-medium">{pred.targetLevel.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Timeframe</span>
                                <span className="text-white font-medium">{pred.timeframe}</span>
                            </div>
                        </div>

                        {/* Action */}
                        <div className="flex items-center gap-2 text-blue-400 text-sm group-hover:gap-3 transition-all">
                            <span>View Details</span>
                            <ChevronRight size={16} />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PredictionGrid;

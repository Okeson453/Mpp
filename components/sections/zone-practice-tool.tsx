'use client';

/**
 * Zone Practice Tool Component
 * Interactive tool for practicing support/resistance zone identification
 */

import React, { useState, useCallback } from 'react';
import { RotateCcw, Check, X } from 'lucide-react';
import type { PriceZone } from '@/lib/utils/zone-calculator';

interface ZonePracticeToolProps {
    zones: PriceZone[];
    correctAnswer?: PriceZone[];
    onComplete?: (score: number) => void;
    className?: string;
}

export const ZonePracticeTool: React.FC<ZonePracticeToolProps> = ({
    zones,
    correctAnswer = [],
    onComplete,
    className = '',
}) => {
    const [selectedZones, setSelectedZones] = useState<Set<string>>(new Set());
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState<number | null>(null);

    const handleZoneSelect = useCallback((zoneId: string) => {
        setSelectedZones((prev) => {
            const next = new Set(prev);
            if (next.has(zoneId)) next.delete(zoneId);
            else next.add(zoneId);
            return next;
        });
    }, []);

    const handleSubmit = useCallback(() => {
        const correctIds = new Set(correctAnswer.map((z) => z.level.toString()));
        const matches = Array.from(selectedZones).filter((id) => correctIds.has(id)).length;
        const calculatedScore = Math.round((matches / correctIds.size) * 100);

        setScore(calculatedScore);
        setSubmitted(true);
        onComplete?.(calculatedScore);
    }, [selectedZones, correctAnswer, onComplete]);

    const handleReset = useCallback(() => {
        setSelectedZones(new Set());
        setSubmitted(false);
        setScore(null);
    }, []);

    return (
        <div className={`bg-slate-800 rounded-lg p-6 ${className}`}>
            <h3 className="text-lg font-bold text-white mb-4">Zone Practice Tool</h3>

            <div className="space-y-3 mb-6">
                {zones.map((zone) => (
                    <button
                        key={zone.level}
                        onClick={() => !submitted && handleZoneSelect(zone.level.toString())}
                        disabled={submitted}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${selectedZones.has(zone.level.toString())
                                ? 'bg-blue-500 text-white'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            } ${submitted ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        <div className="text-sm">
                            <div className="font-medium">{zone.name}</div>
                            <div className="text-xs opacity-75">{zone.type}</div>
                        </div>
                        <div className="ml-auto text-xs opacity-75">
                            {zone.level.toFixed(2)}
                        </div>
                    </button>
                ))}
            </div>

            {/* Results */}
            {submitted && score !== null && (
                <div className={`mb-6 p-4 rounded-lg ${score >= 80 ? 'bg-green-900' : 'bg-red-900'}`}>
                    <div className="flex items-center gap-2 mb-2">
                        {score >= 80 ? (
                            <Check size={20} className="text-green-500" />
                        ) : (
                            <X size={20} className="text-red-500" />
                        )}
                        <span className="text-white font-bold">
                            Score: {score}%
                        </span>
                    </div>
                    <p className="text-sm text-slate-200">
                        {score >= 80
                            ? 'Great job identifying those zones!'
                            : 'Try again to identify more zones correctly.'}
                    </p>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    onClick={handleSubmit}
                    disabled={submitted || selectedZones.size === 0}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Submit
                </button>
                <button
                    onClick={handleReset}
                    className="flex-1 px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                    <RotateCcw size={16} />
                    Reset
                </button>
            </div>
        </div>
    );
};

export default ZonePracticeTool;

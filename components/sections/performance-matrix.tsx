'use client';

/**
 * Performance Matrix Component
 * Displays performance data in matrix format (time/volatility/day of week)
 */

import React from 'react';
import type { PerformanceMatrix } from '@/lib/types/journal';

interface PerformanceMatrixProps {
    data: PerformanceMatrix[];
    className?: string;
}

export const PerformanceMatrix: React.FC<PerformanceMatrixProps> = ({ data, className = '' }) => {
    const getColor = (percentage: number) => {
        if (percentage >= 0.6) return 'bg-green-900 text-green-100';
        if (percentage >= 0.5) return 'bg-blue-900 text-blue-100';
        if (percentage >= 0.45) return 'bg-yellow-900 text-yellow-100';
        return 'bg-red-900 text-red-100';
    };

    // Group by time of day
    const byTimeOfDay = groupBy(data, 'timeOfDay');

    return (
        <div className={`bg-slate-800 rounded-lg p-4 ${className}`}>
            <h3 className="text-lg font-bold text-white mb-4">Performance Matrix</h3>

            {Object.entries(byTimeOfDay).map(([timeOfDay, entries]) => (
                <div key={timeOfDay} className="mb-6">
                    <div className="text-sm font-medium text-slate-300 mb-2 capitalize">{timeOfDay}</div>

                    <div className="grid grid-cols-4 gap-2">
                        {entries.map((entry, idx) => (
                            <div
                                key={idx}
                                className={`p-3 rounded text-center text-sm ${getColor(entry.performance)}`}
                            >
                                <div className="font-medium">{(entry.performance * 100).toFixed(0)}%</div>
                                <div className="text-xs opacity-75">{entry.trades} trades</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
    return arr.reduce(
        (acc, item) => {
            const groupKey = String(item[key]);
            if (!acc[groupKey]) acc[groupKey] = [];
            acc[groupKey].push(item);
            return acc;
        },
        {} as Record<string, T[]>
    );
}

export default PerformanceMatrix;

'use client';

/**
 * Progress Bar Component
 * Displays learning progress with visual indicators
 */

import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
    label?: string;
    showPercentage?: boolean;
    className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    current,
    total,
    label,
    showPercentage = true,
    className = '',
}) => {
    const percentage = total > 0 ? (current / total) * 100 : 0;

    const getColor = () => {
        if (percentage >= 80) return 'bg-green-500';
        if (percentage >= 60) return 'bg-blue-500';
        if (percentage >= 40) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className={className}>
            {label && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-300">{label}</span>
                    {showPercentage && (
                        <span className="text-sm font-semibold text-slate-300">
                            {Math.round(percentage)}%
                        </span>
                    )}
                </div>
            )}

            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                    className={`h-full ${getColor()} transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <div className="text-xs text-slate-400 mt-1">
                {current} of {total} complete
            </div>
        </div>
    );
};

export default ProgressBar;

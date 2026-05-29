'use client';

/**
 * Statistics Bar Component
 * Horizontal bar displaying key statistics
 */

import React from 'react';

export interface StatItem {
    label: string;
    value: string | number;
    suffix?: string;
    color?: 'default' | 'positive' | 'negative' | 'neutral';
}

interface StatisticsBarProps {
    stats: StatItem[];
    className?: string;
}

export const StatisticsBar: React.FC<StatisticsBarProps> = ({ stats, className = '' }) => {
    const getColor = (color?: string) => {
        switch (color) {
            case 'positive':
                return 'text-green-400';
            case 'negative':
                return 'text-red-400';
            case 'neutral':
                return 'text-slate-400';
            default:
                return 'text-blue-400';
        }
    };

    return (
        <div className={`bg-slate-800 rounded-lg p-4 overflow-x-auto ${className}`}>
            <div className="flex gap-6 min-w-min">
                {stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1">
                        <div className="text-xs font-medium text-slate-400 uppercase">{stat.label}</div>
                        <div className={`text-lg font-bold ${getColor(stat.color)}`}>
                            {stat.value}
                            {stat.suffix && <span className="text-sm ml-1">{stat.suffix}</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatisticsBar;

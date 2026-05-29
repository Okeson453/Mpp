'use client';

/**
 * System Stats Row Component
 * Row display of key system statistics
 */

import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export interface SystemStat {
    label: string;
    value: string | number;
    change?: number;
    unit?: string;
    status?: 'good' | 'warning' | 'critical';
}

interface SystemStatsRowProps {
    stats: SystemStat[];
    className?: string;
}

export const SystemStatsRow: React.FC<SystemStatsRowProps> = ({ stats, className = '' }) => {
    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'good':
                return 'border-green-500/20 bg-green-500/10';
            case 'warning':
                return 'border-yellow-500/20 bg-yellow-500/10';
            case 'critical':
                return 'border-red-500/20 bg-red-500/10';
            default:
                return 'border-slate-700 bg-slate-700/30';
        }
    };

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ${className}`}>
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className={`border rounded-lg p-3 ${getStatusColor(stat.status)}`}
                >
                    <div className="text-xs font-medium text-slate-400 uppercase mb-1">
                        {stat.label}
                    </div>

                    <div className="flex items-baseline justify-between">
                        <div className="text-xl font-bold text-white">
                            {stat.value}
                            {stat.unit && <span className="text-sm ml-1 text-slate-400">{stat.unit}</span>}
                        </div>

                        {stat.change !== undefined && (
                            <div
                                className={`flex items-center gap-1 text-sm font-semibold ${stat.change >= 0 ? 'text-green-400' : 'text-red-400'
                                    }`}
                            >
                                {stat.change >= 0 ? (
                                    <ArrowUp size={14} />
                                ) : (
                                    <ArrowDown size={14} />
                                )}
                                <span>{Math.abs(stat.change).toFixed(1)}%</span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SystemStatsRow;

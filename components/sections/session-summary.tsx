'use client';

/**
 * Session Summary Component
 * Displays comprehensive trading session statistics
 */

import React from 'react';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';
import type { SessionSummary } from '@/lib/types/journal';

interface SessionSummaryProps {
    summary: SessionSummary;
    className?: string;
}

export const SessionSummary: React.FC<SessionSummaryProps> = ({ summary, className = '' }) => {
    return (
        <div className={`bg-slate-800 rounded-lg p-6 ${className}`}>
            <h3 className="text-lg font-bold text-white mb-4">Session Summary</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Trades */}
                <div className="bg-slate-900 rounded p-3">
                    <div className="text-xs text-slate-400">Total Trades</div>
                    <div className="text-2xl font-bold text-white">{summary.totalTrades}</div>
                </div>

                {/* Win Rate */}
                <div className="bg-slate-900 rounded p-3">
                    <div className="text-xs text-slate-400">Win Rate</div>
                    <div className="text-2xl font-bold text-blue-400">{(summary.winRate * 100).toFixed(1)}%</div>
                </div>

                {/* Profit/Loss */}
                <div className="bg-slate-900 rounded p-3">
                    <div className="text-xs text-slate-400">P&L</div>
                    <div
                        className={`text-2xl font-bold flex items-center gap-1 ${summary.netProfit >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}
                    >
                        {summary.netProfit >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                        ${summary.netProfit.toFixed(2)}
                    </div>
                </div>

                {/* Profit Factor */}
                <div className="bg-slate-900 rounded p-3">
                    <div className="text-xs text-slate-400">Profit Factor</div>
                    <div className="text-2xl font-bold text-slate-300">{summary.profitFactor.toFixed(2)}</div>
                </div>

                {/* RRR */}
                <div className="bg-slate-900 rounded p-3">
                    <div className="text-xs text-slate-400">Avg RRR</div>
                    <div className="text-2xl font-bold text-purple-400">{summary.riskRewardRatio.toFixed(2)}</div>
                </div>

                {/* Grade */}
                <div className="bg-slate-900 rounded p-3">
                    <div className="text-xs text-slate-400">Grade</div>
                    <div className="text-2xl font-bold text-yellow-400">{summary.performance.grade}</div>
                </div>
            </div>

            {/* Performance Details */}
            <div className="mt-6 space-y-3 border-t border-slate-700 pt-4">
                {summary.performance.strengths.length > 0 && (
                    <div>
                        <div className="text-sm font-medium text-green-400 mb-2">Strengths</div>
                        <ul className="text-sm text-slate-300 space-y-1">
                            {summary.performance.strengths.map((s, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-green-400 rounded-full" />
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {summary.performance.improvements.length > 0 && (
                    <div>
                        <div className="text-sm font-medium text-amber-400 mb-2">Areas to Improve</div>
                        <ul className="text-sm text-slate-300 space-y-1">
                            {summary.performance.improvements.map((i, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-amber-400 rounded-full" />
                                    {i}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SessionSummary;

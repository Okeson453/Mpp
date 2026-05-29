'use client';

/**
 * Trade List Component
 * Displays list of trades from a session
 */

import React, { useState, useCallback } from 'react';
import { ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import type { Trade } from '@/lib/types/journal';

interface TradeListProps {
    trades: Trade[];
    onTradeSelect?: (trade: Trade) => void;
    className?: string;
}

export const TradeList: React.FC<TradeListProps> = ({ trades, onTradeSelect, className = '' }) => {
    const [expandedTradeId, setExpandedTradeId] = useState<string | null>(null);

    const toggleTrade = useCallback((tradeId: string) => {
        setExpandedTradeId((prev) => (prev === tradeId ? null : tradeId));
    }, []);

    return (
        <div className={`bg-slate-800 rounded-lg overflow-hidden ${className}`}>
            <div className="divide-y divide-slate-700">
                {trades.map((trade) => (
                    <div key={trade.id}>
                        {/* Trade Row */}
                        <button
                            onClick={() => {
                                toggleTrade(trade.id);
                                onTradeSelect?.(trade);
                            }}
                            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-700 transition-colors text-left"
                        >
                            {/* Icon */}
                            <span className="flex-shrink-0">
                                {trade.profitLoss >= 0 ? (
                                    <TrendingUp size={18} className="text-green-500" />
                                ) : (
                                    <TrendingDown size={18} className="text-red-500" />
                                )}
                            </span>

                            {/* Symbol & Direction */}
                            <div className="flex-shrink-0">
                                <div className="text-sm font-medium text-white">{trade.symbol}</div>
                                <div className="text-xs text-slate-400">{trade.direction.toUpperCase()}</div>
                            </div>

                            {/* Entry & Exit */}
                            <div className="flex-shrink-0 text-xs text-slate-300">
                                <div>{trade.entryPrice.toFixed(2)}</div>
                                <div className="text-slate-500">
                                    {trade.exitPrice ? trade.exitPrice.toFixed(2) : 'Open'}
                                </div>
                            </div>

                            {/* P&L */}
                            <div
                                className={`flex-shrink-0 text-sm font-semibold ${trade.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'
                                    }`}
                            >
                                ${trade.profitLoss.toFixed(2)}
                            </div>

                            {/* Grade */}
                            <div className="flex-shrink-0 px-2 py-1 bg-slate-700 rounded text-xs font-medium text-white">
                                {trade.grade}
                            </div>

                            {/* Expander */}
                            <div className="ml-auto flex-shrink-0">
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${expandedTradeId === trade.id ? 'rotate-180' : ''}`}
                                />
                            </div>
                        </button>

                        {/* Expanded Details */}
                        {expandedTradeId === trade.id && (
                            <div className="bg-slate-900 px-4 py-3 border-t border-slate-700 text-sm space-y-2">
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <span className="text-slate-400">Setup:</span>
                                        <span className="text-white ml-2">{trade.setupType}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400">RRR:</span>
                                        <span className="text-white ml-2">{trade.riskReward.toFixed(2)}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400">Actual RRR:</span>
                                        <span className="text-white ml-2">{trade.actualRR.toFixed(2)}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400">% Change:</span>
                                        <span className="text-white ml-2">{trade.profitLossPercent.toFixed(2)}%</span>
                                    </div>
                                </div>
                                {trade.notes && (
                                    <div className="mt-2 pt-2 border-t border-slate-700">
                                        <div className="text-slate-400 text-xs mb-1">Notes:</div>
                                        <div className="text-slate-300">{trade.notes}</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TradeList;

'use client';

/**
 * Setup Detail Modal Component
 * Modal for displaying detailed setup information
 */

import React, { useState } from 'react';
import { X, Copy, Share2 } from 'lucide-react';

export interface SetupDetail {
    id: string;
    name: string;
    symbol: string;
    timeframe: string;
    description: string;
    entryRules: string[];
    exitRules: string[];
    riskManagement: string;
    statistics?: {
        winRate: number;
        profitFactor: number;
        totalTrades: number;
    };
    imageUrl?: string;
}

interface SetupDetailModalProps {
    setup?: SetupDetail;
    isOpen: boolean;
    onClose?: () => void;
}

export const SetupDetailModal: React.FC<SetupDetailModalProps> = ({ setup, isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);

    if (!isOpen || !setup) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(setup, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-slate-800 rounded-lg max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 flex items-center justify-between bg-slate-900 border-b border-slate-700 px-6 py-4">
                    <div>
                        <h2 className="text-xl font-bold text-white">{setup.name}</h2>
                        <p className="text-sm text-slate-400">{setup.symbol} • {setup.timeframe}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-800 rounded transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-4 space-y-6">
                    {/* Description */}
                    {setup.description && (
                        <div>
                            <h3 className="text-sm font-medium text-white mb-2">Overview</h3>
                            <p className="text-sm text-slate-300">{setup.description}</p>
                        </div>
                    )}

                    {/* Entry Rules */}
                    {setup.entryRules.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-white mb-2">Entry Rules</h3>
                            <ul className="space-y-1">
                                {setup.entryRules.map((rule, idx) => (
                                    <li key={idx} className="text-sm text-slate-300 flex gap-2">
                                        <span className="text-blue-400">•</span>
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Exit Rules */}
                    {setup.exitRules.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-white mb-2">Exit Rules</h3>
                            <ul className="space-y-1">
                                {setup.exitRules.map((rule, idx) => (
                                    <li key={idx} className="text-sm text-slate-300 flex gap-2">
                                        <span className="text-green-400">•</span>
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Risk Management */}
                    {setup.riskManagement && (
                        <div>
                            <h3 className="text-sm font-medium text-white mb-2">Risk Management</h3>
                            <p className="text-sm text-slate-300">{setup.riskManagement}</p>
                        </div>
                    )}

                    {/* Statistics */}
                    {setup.statistics && (
                        <div className="bg-slate-900 rounded p-4">
                            <h3 className="text-sm font-medium text-white mb-3">Statistics</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <div className="text-xs text-slate-400">Win Rate</div>
                                    <div className="text-lg font-bold text-blue-400">{(setup.statistics.winRate * 100).toFixed(1)}%</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400">Profit Factor</div>
                                    <div className="text-lg font-bold text-green-400">{setup.statistics.profitFactor.toFixed(2)}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400">Trades</div>
                                    <div className="text-lg font-bold text-slate-300">{setup.statistics.totalTrades}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-700 px-6 py-4 flex gap-2 justify-end">
                    <button
                        onClick={handleCopy}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm text-white transition-colors flex items-center gap-2"
                    >
                        <Copy size={16} />
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm text-white transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetupDetailModal;

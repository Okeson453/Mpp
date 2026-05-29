/**
 * Backtest Page
 * Interactive backtesting platform for trading strategies
 */

'use client';

import React from 'react';

export default function BacktestPage() {
    return (
        <main className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Backtest Strategies</h1>
                    <p className="text-slate-400">Analyze and test trading strategies against historical data</p>
                </div>

                {/* Content Placeholder */}
                <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 text-center">
                    <div className="text-slate-400">
                        <p className="mb-2">🔄 Backtest Engine</p>
                        <p className="text-sm">Load strategy components here</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

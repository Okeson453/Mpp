'use client';

/**
 * Insights Block Component
 * Displays trading insights and recommendations
 */

import React from 'react';
import { Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

export interface Insight {
    id: string;
    type: 'insight' | 'warning' | 'tip';
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface InsightsBlockProps {
    insights: Insight[];
    className?: string;
}

export const InsightsBlock: React.FC<InsightsBlockProps> = ({ insights, className = '' }) => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'warning':
                return <AlertTriangle size={18} className="text-red-400" />;
            case 'tip':
                return <TrendingUp size={18} className="text-blue-400" />;
            default:
                return <Lightbulb size={18} className="text-yellow-400" />;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'warning':
                return 'border-l-red-500 bg-red-900/20';
            case 'tip':
                return 'border-l-blue-500 bg-blue-900/20';
            default:
                return 'border-l-yellow-500 bg-yellow-900/20';
        }
    };

    return (
        <div className={`space-y-3 ${className}`}>
            <h3 className="text-lg font-bold text-white mb-4">Insights</h3>

            {insights.length === 0 ? (
                <div className="text-slate-400 text-sm">No insights available yet.</div>
            ) : (
                insights.map((insight) => (
                    <div
                        key={insight.id}
                        className={`border-l-4 rounded p-4 ${getColor(insight.type)}`}
                    >
                        <div className="flex items-start gap-3">
                            <span className="flex-shrink-0 mt-0.5">{getIcon(insight.type)}</span>

                            <div className="flex-1">
                                <div className="font-medium text-white">{insight.title}</div>
                                <div className="text-sm text-slate-300 mt-1">{insight.description}</div>

                                {insight.action && (
                                    <button
                                        onClick={insight.action.onClick}
                                        className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        {insight.action.label} →
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default InsightsBlock;

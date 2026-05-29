'use client';

/**
 * Chart Panel Component
 * Interactive chart display panel with controls
 */

import React, { useState, useCallback } from 'react';
import { Settings, Download, Maximize2 } from 'lucide-react';

interface ChartPanelProps {
    title: string;
    symbol?: string;
    timeframe?: string;
    children?: React.ReactNode;
    onSettings?: () => void;
    onDownload?: () => void;
    onFullscreen?: () => void;
    className?: string;
}

export const ChartPanel: React.FC<ChartPanelProps> = ({
    title,
    symbol,
    timeframe,
    children,
    onSettings,
    onDownload,
    onFullscreen,
    className = '',
}) => {
    return (
        <div className={`bg-slate-800 rounded-lg flex flex-col overflow-hidden ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between bg-slate-900 border-b border-slate-700 px-4 py-3">
                <div>
                    <h3 className="text-sm font-medium text-white">{title}</h3>
                    {(symbol || timeframe) && (
                        <p className="text-xs text-slate-400 mt-1">
                            {symbol && <span>{symbol}</span>}
                            {symbol && timeframe && <span> • </span>}
                            {timeframe && <span>{timeframe}</span>}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {onSettings && (
                        <button
                            onClick={onSettings}
                            className="p-2 hover:bg-slate-700 rounded transition-colors"
                            title="Settings"
                        >
                            <Settings size={16} className="text-slate-400" />
                        </button>
                    )}
                    {onDownload && (
                        <button
                            onClick={onDownload}
                            className="p-2 hover:bg-slate-700 rounded transition-colors"
                            title="Download"
                        >
                            <Download size={16} className="text-slate-400" />
                        </button>
                    )}
                    {onFullscreen && (
                        <button
                            onClick={onFullscreen}
                            className="p-2 hover:bg-slate-700 rounded transition-colors"
                            title="Fullscreen"
                        >
                            <Maximize2 size={16} className="text-slate-400" />
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
                {children || (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                        Chart data loading...
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChartPanel;

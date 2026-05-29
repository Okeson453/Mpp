'use client';

/**
 * Session Selector Component
 * Allows users to select and switch between trading sessions
 */

import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import type { JournalSession } from '@/lib/types/journal';
import { formatTime } from '@/lib/utils/session-time';

interface SessionSelectorProps {
    sessions: JournalSession[];
    activeSessionId?: string;
    onSessionSelect?: (sessionId: string) => void;
    className?: string;
}

export const SessionSelector: React.FC<SessionSelectorProps> = ({
    sessions,
    activeSessionId,
    onSessionSelect,
    className = '',
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = useCallback(() => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    }, []);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => Math.min(sessions.length - 1, prev + 1));
    }, [sessions.length]);

    const handleSelect = useCallback(
        (sessionId: string) => {
            onSessionSelect?.(sessionId);
        },
        [onSessionSelect]
    );

    const visibleSessions = sessions.slice(currentIndex, currentIndex + 3);

    return (
        <div className={`bg-slate-800 rounded-lg p-4 ${className}`}>
            <div className="flex items-center gap-2 mb-4">
                <Calendar size={18} className="text-blue-400" />
                <span className="text-sm font-medium text-white">Trading Sessions</span>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="p-2 rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft size={18} />
                </button>

                <div className="flex-1 grid grid-cols-3 gap-2">
                    {visibleSessions.map((session) => (
                        <button
                            key={session.id}
                            onClick={() => handleSelect(session.id)}
                            className={`p-3 rounded transition-colors ${activeSessionId === session.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                }`}
                        >
                            <div className="text-xs font-medium">
                                {new Date(session.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </div>
                            <div className="text-xs opacity-75 mt-1">
                                {session.trades.length} trades
                            </div>
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentIndex + 3 >= sessions.length}
                    className="p-2 rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default SessionSelector;

'use client';

/**
 * useSessionTime Hook
 * Manages trading session timing, duration tracking, and analytics
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { formatDuration, formatTime, getTimeOfDay, getTradingSession, calculateSessionDuration } from '@/lib/utils/session-time';

export interface SessionTimer {
    startTime: Date;
    elapsedTime: number;
    isRunning: boolean;
    isPaused: boolean;
    breaks: Array<{ startTime: Date; endTime?: Date }>;
}

export function useSessionTime() {
    const [timer, setTimer] = useState<SessionTimer | null>(null);
    const [sessionDuration, setSessionDuration] = useState<number>(0);
    const [formatted, setFormatted] = useState<{ duration: string; hhmmss: string }>({
        duration: '0s',
        hhmmss: '00:00:00',
    });
    const intervalRef = useRef<NodeJS.Timeout>();

    /**
     * Start a new session
     */
    const startSession = useCallback(() => {
        const now = new Date();
        setTimer({
            startTime: now,
            elapsedTime: 0,
            isRunning: true,
            isPaused: false,
            breaks: [],
        });
    }, []);

    /**
     * Stop the current session
     */
    const stopSession = useCallback(() => {
        if (timer) {
            setTimer((prev) => (prev ? { ...prev, isRunning: false } : null));
            setSessionDuration(timer.elapsedTime);

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [timer]);

    /**
     * Pause session
     */
    const pauseSession = useCallback(() => {
        if (timer) {
            setTimer((prev) => (prev ? { ...prev, isPaused: true, isRunning: false } : null));

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [timer]);

    /**
     * Resume session
     */
    const resumeSession = useCallback(() => {
        if (timer && timer.isPaused) {
            setTimer((prev) => (prev ? { ...prev, isPaused: false, isRunning: true } : null));
        }
    }, [timer]);

    /**
     * Add break to session
     */
    const addBreak = useCallback(() => {
        if (timer) {
            setTimer((prev) => {
                if (!prev) return null;

                const newBreaks = [...prev.breaks];
                if (newBreaks.length > 0 && !newBreaks[newBreaks.length - 1].endTime) {
                    // End current break
                    newBreaks[newBreaks.length - 1].endTime = new Date();
                } else {
                    // Start new break
                    newBreaks.push({ startTime: new Date() });
                }

                return { ...prev, breaks: newBreaks };
            });
        }
    }, [timer]);

    /**
     * Get current time of day
     */
    const getSessionTimeOfDay = useCallback(() => {
        return timer ? getTimeOfDay(timer.startTime) : 'morning';
    }, [timer]);

    /**
     * Get trading session (asia/europe/us)
     */
    const getTradingSessionType = useCallback(() => {
        return timer ? getTradingSession(timer.startTime) : 'combined';
    }, [timer]);

    /**
     * Get formatted session duration
     */
    const getFormattedDuration = useCallback(() => {
        return {
            duration: formatted.duration,
            hhmmss: formatted.hhmmss,
        };
    }, [formatted]);

    /**
     * Reset session
     */
    const resetSession = useCallback(() => {
        setTimer(null);
        setSessionDuration(0);
        setFormatted({ duration: '0s', hhmmss: '00:00:00' });

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, []);

    /**
     * Get session statistics
     */
    const getSessionStats = useCallback(() => {
        if (!timer) return null;

        const metrics = calculateSessionDuration(
            timer.startTime,
            timer.breaks.length > 0 && timer.breaks[timer.breaks.length - 1].endTime
                ? timer.breaks[timer.breaks.length - 1].endTime
                : new Date(),
            timer.breaks.filter((b) => b.endTime) as Array<{ startTime: Date; endTime: Date }>
        );

        return {
            totalTime: metrics.totalTime,
            activeTime: metrics.activeTime,
            pausedTime: metrics.pausedTime,
            breaks: metrics.breaks,
            timeOfDay: getSessionTimeOfDay(),
            tradingSession: getTradingSessionType(),
        };
    }, [timer, getSessionTimeOfDay, getTradingSessionType]);

    // Update timer every second
    useEffect(() => {
        if (!timer || !timer.isRunning) return;

        intervalRef.current = setInterval(() => {
            setTimer((prev) => {
                if (!prev || !prev.isRunning) return prev;

                const now = new Date();
                const elapsed = now.getTime() - prev.startTime.getTime();

                // Update formatted time
                setFormatted({
                    duration: formatDuration(elapsed),
                    hhmmss: formatTime(elapsed),
                });

                return {
                    ...prev,
                    elapsedTime: elapsed,
                };
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [timer?.isRunning]);

    return {
        timer,
        sessionDuration,
        formatted,
        startSession,
        stopSession,
        pauseSession,
        resumeSession,
        addBreak,
        getSessionTimeOfDay,
        getTradingSessionType,
        getFormattedDuration,
        getSessionStats,
        resetSession,
    };
}

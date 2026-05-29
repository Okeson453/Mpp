'use client';

// Trade journal logic hook — entry management, session grouping, insights

import { useCallback } from 'react';
import type { JournalEntry, MPPState, SessionPhase } from '@/lib/types/mpp';
import { useSystemStore } from '@/stores/system-store';

interface UseJournalReturn {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => void;
  clearEntries: () => void;
  getEntriesBySession: (session: SessionPhase) => JournalEntry[];
  getEntriesByState: (state: MPPState) => JournalEntry[];
  getInsights: () => string[];
}

export function useJournal(): UseJournalReturn {
  const { journal, addJournalEntry, reset } = useSystemStore();

  const addEntry = useCallback(
    (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => {
      addJournalEntry(entry);
    },
    [addJournalEntry],
  );

  const clearEntries = useCallback(() => {
    reset();
  }, [reset]);

  const getEntriesBySession = useCallback(
    (_session: SessionPhase) => {
      return journal.filter((e) => {
        const hour = new Date(e.timestamp).getUTCHours();
        switch (_session) {
          case 'ASIAN':    return hour >= 0 && hour < 8;
          case 'LONDON':   return hour >= 8 && hour < 16;
          case 'NEW_YORK': return hour >= 13 && hour < 21;
          default:         return false;
        }
      });
    },
    [journal],
  );

  const getEntriesByState = useCallback(
    (state: MPPState) => journal.filter((e) => e.state === state),
    [journal],
  );

  const getInsights = useCallback((): string[] => {
    const insights: string[] = [];
    if (journal.length === 0) return insights;

    const executeEntries = journal.filter((e) => e.type === 'execute');
    const alertEntries = journal.filter((e) => e.state === 'ALERT');

    if (alertEntries.length > 0) {
      const earlyRatio = Math.round((executeEntries.length / alertEntries.length) * 100);
      insights.push(`Execution rate on ALERT states: ${earlyRatio}%.`);
    }

    const londonEntries = getEntriesBySession('LONDON');
    const nyEntries = getEntriesBySession('NEW_YORK');
    if (londonEntries.length > 0 || nyEntries.length > 0) {
      insights.push(
        `LONDON session has ${londonEntries.length} events vs NY at ${nyEntries.length} events.`,
      );
    }

    if (executeEntries.length > 0) {
      insights.push(`Total execution signals: ${executeEntries.length}.`);
    }

    return insights;
  }, [journal, getEntriesBySession]);

  return {
    entries: journal,
    addEntry,
    clearEntries,
    getEntriesBySession,
    getEntriesByState,
    getInsights,
  };
}

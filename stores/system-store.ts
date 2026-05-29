'use client';

// Protocol state store — manages MPP state, gates, journal, and instrument
// Uses Zustand + Immer for immutable state updates.

import { create } from 'zustand';
import { produce } from 'immer';
import type { MPPState, Gate, GateStatus, JournalEntry, SessionPhase } from '@/lib/types/mpp';
import { INITIAL_GATES } from '@/lib/constants/gate-definitions';
import { SYSTEM_MESSAGES } from '@/lib/constants/system-messages';
import { STATE_CONFIG } from '@/lib/constants/state-configs';

interface SystemStore {
  state: MPPState;
  gates: Gate[];
  journal: JournalEntry[];
  activeInstrument: string;
  sessionPhase: SessionPhase;
  systemOnline: boolean;

  transitionTo: (newState: MPPState) => void;
  updateGate: (id: number, status: GateStatus) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => void;
  setInstrument: (symbol: string) => void;
  setSessionPhase: (phase: SessionPhase) => void;
  reset: () => void;
}

const STATE_MESSAGES: Partial<Record<MPPState, string>> = {
  ALERT:       SYSTEM_MESSAGES.SWEEP_DETECTED,
  PRIMED:      SYSTEM_MESSAGES.PROTOCOL_PRIMED,
  EXECUTING:   SYSTEM_MESSAGES.EXECUTION_APPROVED,
  MANAGING:    SYSTEM_MESSAGES.TARGET_ACTIVE,
  CLOSED:      SYSTEM_MESSAGES.TRADE_CLOSED,
  INVALIDATED: SYSTEM_MESSAGES.PROTOCOL_INVALID,
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useSystemStore = create<SystemStore>((set) => ({
  state: 'SCANNING',
  gates: [...INITIAL_GATES],
  journal: [],
  activeInstrument: 'HYPEUSDT',
  sessionPhase: 'LONDON',
  systemOnline: true,

  transitionTo: (newState) =>
    set(
      produce((draft: SystemStore) => {
        const prevState = draft.state;
        draft.state = newState;

        const message =
          STATE_MESSAGES[newState] ??
          `State transition: ${prevState} → ${newState}`;

        const config = STATE_CONFIG[newState];
        const entryType: JournalEntry['type'] =
          newState === 'ALERT' || newState === 'INVALIDATED'
            ? 'alert'
            : newState === 'EXECUTING'
            ? 'execute'
            : 'info';

        const entry: JournalEntry = {
          id: generateId(),
          timestamp: Date.now(),
          state: newState,
          message,
          type: entryType,
          instrument: draft.activeInstrument,
        };

        draft.journal.unshift(entry);
        if (draft.journal.length > 50) {
          draft.journal = draft.journal.slice(0, 50);
        }

        // Auto-reset gates on terminal states
        if (newState === 'CLOSED' || newState === 'INVALIDATED') {
          draft.gates = [...INITIAL_GATES];
        }
      }),
    ),

  updateGate: (id, status) =>
    set(
      produce((draft: SystemStore) => {
        const gate = draft.gates.find((g) => g.id === id);
        if (gate) gate.status = status;
      }),
    ),

  addJournalEntry: (entry) =>
    set(
      produce((draft: SystemStore) => {
        const newEntry: JournalEntry = {
          ...entry,
          id: generateId(),
          timestamp: Date.now(),
        };
        draft.journal.unshift(newEntry);
        if (draft.journal.length > 50) {
          draft.journal = draft.journal.slice(0, 50);
        }
      }),
    ),

  setInstrument: (symbol) =>
    set(
      produce((draft: SystemStore) => {
        draft.activeInstrument = symbol;
      }),
    ),

  setSessionPhase: (phase) =>
    set(
      produce((draft: SystemStore) => {
        draft.sessionPhase = phase;
      }),
    ),

  reset: () =>
    set(
      produce((draft: SystemStore) => {
        const instrument = draft.activeInstrument;
        draft.state = 'SCANNING';
        draft.gates = [...INITIAL_GATES];
        draft.journal = [];
        draft.activeInstrument = instrument;
        draft.sessionPhase = 'LONDON';
        draft.systemOnline = true;
      }),
    ),
}));

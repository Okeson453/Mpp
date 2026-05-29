'use client';

// THE STATE MACHINE — most critical file in the codebase
// Manages all 9 MPP states with business rule enforcement.
// LAW 08: executeTrade() BLOCKED if score < 12 or any gate not PASS.

import { useCallback } from 'react';
import type { MPPState, Zone, ConsolidationRange, GateStatus } from '@/lib/types/mpp';
import { useSystemStore } from '@/stores/system-store';
import { useTradeStore } from '@/stores/trade-store';
import {
  calculateSetupScore,
  isExecutionAllowed,
  calculateRiskReward,
} from '@/lib/utils/validators';
import { SYSTEM_MESSAGES } from '@/lib/constants/system-messages';

const VALID_TRANSITIONS: Partial<Record<MPPState, MPPState[]>> = {
  IDLE:        ['SCANNING'],
  SCANNING:    ['MAPPED', 'IDLE'],
  MAPPED:      ['ALERT', 'SCANNING', 'IDLE', 'INVALIDATED'],
  ALERT:       ['PRIMED', 'MAPPED', 'INVALIDATED', 'IDLE'],
  PRIMED:      ['EXECUTING', 'INVALIDATED', 'IDLE'],
  EXECUTING:   ['MANAGING', 'CLOSED', 'INVALIDATED', 'IDLE'],
  MANAGING:    ['CLOSED', 'INVALIDATED', 'IDLE'],
  CLOSED:      ['SCANNING', 'IDLE'],
  INVALIDATED: ['SCANNING', 'IDLE'],
};

export function useMPPState() {
  const systemStore = useSystemStore();
  const tradeStore = useTradeStore();

  const transitionTo = useCallback(
    (newState: MPPState) => {
      const current = systemStore.state;
      const allowed = VALID_TRANSITIONS[current] ?? [];

      // Always allow reset to IDLE or INVALIDATED (emergency)
      if (!allowed.includes(newState) && newState !== 'IDLE' && newState !== 'INVALIDATED') {
        systemStore.addJournalEntry({
          state: current,
          message: `Invalid transition attempt: ${current} → ${newState}`,
          type: 'error',
          instrument: systemStore.activeInstrument,
        });
        return;
      }

      systemStore.transitionTo(newState);

      if (newState === 'CLOSED' || newState === 'INVALIDATED') {
        tradeStore.clearTrade();
      }
    },
    [systemStore, tradeStore],
  );

  const resetSystem = useCallback(() => {
    systemStore.reset();
    tradeStore.clearAll();
  }, [systemStore, tradeStore]);

  const mapStructure = useCallback(
    (range: ConsolidationRange, pink: Zone, cyan: Zone) => {
      tradeStore.setZones(pink, cyan, range);
      transitionTo('MAPPED');
    },
    [transitionTo, tradeStore],
  );

  const confirmSweep = useCallback(() => {
    transitionTo('ALERT');
    systemStore.addJournalEntry({
      state: 'ALERT',
      message: SYSTEM_MESSAGES.SWEEP_DETECTED,
      type: 'alert',
      instrument: systemStore.activeInstrument,
    });
  }, [transitionTo, systemStore]);

  const confirmReclaim = useCallback(() => {
    const score = calculateSetupScore(
      { pink: tradeStore.pinkZone, cyan: tradeStore.cyanZone },
      systemStore.gates,
      tradeStore.range,
    );
    tradeStore.setSetupScore(score);

    if (tradeStore.pinkZone && tradeStore.cyanZone && tradeStore.range) {
      const entry = tradeStore.range.low;
      const stop = tradeStore.pinkZone.lower;
      const target = tradeStore.cyanZone.upper;
      const rr = calculateRiskReward(entry, stop, target);

      tradeStore.setTradeParams({
        entry,
        stop,
        target,
        riskReward: rr,
        positionSize: '1%',
        setupScore: score.total,
      });
    }

    transitionTo('PRIMED');
    systemStore.addJournalEntry({
      state: 'PRIMED',
      message: SYSTEM_MESSAGES.RECLAIM_CONFIRMED,
      type: 'alert',
      instrument: systemStore.activeInstrument,
    });
  }, [transitionTo, systemStore, tradeStore]);

  const executeTrade = useCallback(() => {
    const score = tradeStore.setupScore;
    const gates = systemStore.gates;

    if (!isExecutionAllowed(score, gates)) {
      systemStore.addJournalEntry({
        state: systemStore.state,
        message: SYSTEM_MESSAGES.EXECUTION_BLOCKED,
        type: 'error',
        instrument: systemStore.activeInstrument,
      });
      return;
    }

    transitionTo('EXECUTING');
    systemStore.addJournalEntry({
      state: 'EXECUTING',
      message: SYSTEM_MESSAGES.EXECUTION_APPROVED,
      type: 'execute',
      instrument: systemStore.activeInstrument,
    });
  }, [transitionTo, systemStore, tradeStore]);

  const closeTrade = useCallback(
    (outcome: 'target' | 'stop' | 'manual') => {
      if (outcome === 'stop') {
        transitionTo('INVALIDATED');
      } else {
        transitionTo('CLOSED');
      }
      systemStore.addJournalEntry({
        state: outcome === 'stop' ? 'INVALIDATED' : 'CLOSED',
        message: SYSTEM_MESSAGES.TRADE_CLOSED,
        type: 'info',
        instrument: systemStore.activeInstrument,
      });
    },
    [transitionTo, systemStore],
  );

  const updateGate = useCallback(
    (gateId: number, status: GateStatus) => {
      systemStore.updateGate(gateId, status);
    },
    [systemStore],
  );

  const logJournal = useCallback(
    (message: string, type?: 'alert' | 'execute' | 'error' | 'info') => {
      systemStore.addJournalEntry({
        state: systemStore.state,
        message,
        type: type ?? 'info',
        instrument: systemStore.activeInstrument,
      });
    },
    [systemStore],
  );

  return {
    state: systemStore.state,
    config: systemStore.state,
    gates: systemStore.gates,
    journal: systemStore.journal,
    range: tradeStore.range,
    pinkZone: tradeStore.pinkZone,
    cyanZone: tradeStore.cyanZone,
    setupScore: tradeStore.setupScore,
    tradeParams: tradeStore.tradeParams,
    transitionTo,
    resetSystem,
    mapStructure,
    confirmSweep,
    confirmReclaim,
    executeTrade,
    closeTrade,
    updateGate,
    logJournal,
  };
}

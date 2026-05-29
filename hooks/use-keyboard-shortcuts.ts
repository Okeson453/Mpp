'use client';

// Dashboard keyboard shortcut handler
// R: reset (double-tap confirm), E: execute, 1/5: timeframe, Esc: close drawer, J: journal

import { useEffect, useRef, useCallback, useState } from 'react';
import { useMPPState } from '@/hooks/use-mpp-state';
import { useChartStore } from '@/stores/chart-store';
import { useUIStore } from '@/stores/ui-store';
import { isExecutionAllowed } from '@/lib/utils/validators';
import { useSystemStore } from '@/stores/system-store';
import { useTradeStore } from '@/stores/trade-store';

interface UseKeyboardShortcutsReturn {
  shortcutsEnabled: boolean;
  toggleShortcuts: () => void;
}

export function useKeyboardShortcuts(): UseKeyboardShortcutsReturn {
  const [shortcutsEnabled, setShortcutsEnabled] = useState(true);
  const lastRKeyRef = useRef<number>(0);
  const { resetSystem, executeTrade } = useMPPState();
  const { setTimeframe } = useChartStore();
  const { closeDrawer, pushToast } = useUIStore();
  const { gates } = useSystemStore();
  const { setupScore } = useTradeStore();

  const toggleShortcuts = useCallback(() => {
    setShortcutsEnabled((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!shortcutsEnabled) return;

    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      switch (event.key.toUpperCase()) {
        case 'R': {
          const now = Date.now();
          if (now - lastRKeyRef.current < 2000) {
            resetSystem();
            pushToast({ message: 'System reset. Protocol cleared.', type: 'info', duration: 3000 });
          } else {
            pushToast({
              message: 'Press R again within 2s to confirm reset.',
              type: 'alert',
              duration: 2000,
            });
          }
          lastRKeyRef.current = now;
          break;
        }
        case 'E': {
          if (isExecutionAllowed(setupScore, gates)) {
            executeTrade();
          } else {
            pushToast({
              message: 'Execution blocked. Check gates and score.',
              type: 'alert',
              duration: 3000,
            });
          }
          break;
        }
        case '1':
          setTimeframe('1H');
          break;
        case '5':
          setTimeframe('5M');
          break;
        case 'ESCAPE':
          closeDrawer();
          break;
        case 'J':
          // Journal toggle is handled via component state
          document.dispatchEvent(new CustomEvent('toggle-journal'));
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [shortcutsEnabled, resetSystem, executeTrade, setTimeframe, closeDrawer, pushToast, gates, setupScore]);

  return { shortcutsEnabled, toggleShortcuts };
}

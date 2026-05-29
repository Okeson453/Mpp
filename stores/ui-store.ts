'use client';

// UI state store — sidebar, drawer, toasts, theme lock
// CRITICAL: themeLocked is always true. No setter. No light mode. Ever.

import { create } from 'zustand';
import { produce } from 'immer';

interface Toast {
  id: string;
  message: string;
  type: 'alert' | 'success' | 'info';
  duration: number;
}

interface UIStore {
  sidebarOpen: boolean;
  drawerOpen: boolean;
  drawerInstrument: string | null;
  activePanel: string;
  readonly themeLocked: true;  // Always true. Non-negotiable. No setter.
  toastQueue: Toast[];

  toggleSidebar: () => void;
  openDrawer: (instrument: string) => void;
  closeDrawer: () => void;
  setActivePanel: (panel: string) => void;
  pushToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
}

function generateId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const useUIStore = create<UIStore>((set, get) => ({
  sidebarOpen: true,
  drawerOpen: false,
  drawerInstrument: null,
  activePanel: 'state',
  themeLocked: true,  // ← TypeScript literal true. Never false. Never changeable.
  toastQueue: [],

  toggleSidebar: () =>
    set(
      produce((draft: UIStore) => {
        draft.sidebarOpen = !draft.sidebarOpen;
      }),
    ),

  openDrawer: (instrument) =>
    set(
      produce((draft: UIStore) => {
        draft.drawerOpen = true;
        draft.drawerInstrument = instrument;
      }),
    ),

  closeDrawer: () =>
    set(
      produce((draft: UIStore) => {
        draft.drawerOpen = false;
        draft.drawerInstrument = null;
      }),
    ),

  setActivePanel: (panel) =>
    set(
      produce((draft: UIStore) => {
        draft.activePanel = panel;
      }),
    ),

  pushToast: (toast) => {
    const id = generateId();
    set(
      produce((draft: UIStore) => {
        draft.toastQueue.push({ ...toast, id });
      }),
    );
    // Auto-dismiss after duration
    setTimeout(() => get().dismissToast(id), toast.duration);
  },

  dismissToast: (id) =>
    set(
      produce((draft: UIStore) => {
        draft.toastQueue = draft.toastQueue.filter((t) => t.id !== id);
      }),
    ),
}));

/**
 * Keyboard Constants
 * Configuration for keyboard shortcuts and accessibility
 */

export const KEYBOARD_SHORTCUTS = {
    // Navigation
    HOME: { key: 'h', ctrl: true, name: 'Go Home' },
    DASHBOARD: { key: 'd', ctrl: true, name: 'Dashboard' },
    JOURNAL: { key: 'j', ctrl: true, name: 'Journal' },
    CHARTS: { key: 'c', ctrl: true, name: 'Charts' },
    ALERTS: { key: 'a', ctrl: true, name: 'Alerts' },
    COMMUNITY: { key: 'k', ctrl: true, name: 'Community' },
    MASTERCLASS: { key: 'm', ctrl: true, name: 'Masterclass' },
    SETTINGS: { key: ',', ctrl: true, name: 'Settings' },

    // Trading
    NEW_TRADE: { key: 'n', ctrl: true, name: 'New Trade' },
    CLOSE_TRADE: { key: 'x', ctrl: true, name: 'Close Trade' },
    BUY: { key: 'b', alt: true, name: 'Buy Order' },
    SELL: { key: 's', alt: true, name: 'Sell Order' },
    QUICK_ORDER: { key: 'q', ctrl: true, name: 'Quick Order' },

    // Journal
    NEW_SESSION: { key: 'n', ctrl: true, shift: true, name: 'New Session' },
    SAVE_TRADE: { key: 's', ctrl: true, name: 'Save Trade' },
    ADD_NOTE: { key: 'e', ctrl: true, name: 'Add Note' },

    // Chart
    ZOOM_IN: { key: '+', ctrl: true, name: 'Zoom In' },
    ZOOM_OUT: { key: '-', ctrl: true, name: 'Zoom Out' },
    RESET_CHART: { key: '0', ctrl: true, name: 'Reset Chart' },
    FULLSCREEN_CHART: { key: 'f', ctrl: true, shift: true, name: 'Fullscreen Chart' },

    // UI
    SEARCH: { key: '/', ctrl: false, name: 'Search' },
    FOCUS_SEARCH: { key: 'f', ctrl: true, name: 'Focus Search' },
    TOGGLE_SIDEBAR: { key: '[', ctrl: true, name: 'Toggle Sidebar' },
    COMMAND_PALETTE: { key: 'p', ctrl: true, shift: true, name: 'Command Palette' },
    TOGGLE_DARK_MODE: { key: 'l', ctrl: true, shift: true, name: 'Toggle Dark Mode' },

    // Global
    HELP: { key: '?', shift: false, name: 'Help' },
    ESCAPE: { key: 'Escape', name: 'Close/Cancel' },
    ENTER: { key: 'Enter', name: 'Confirm' },
    SAVE: { key: 's', ctrl: true, name: 'Save' },
    UNDO: { key: 'z', ctrl: true, name: 'Undo' },
    REDO: { key: 'z', ctrl: true, shift: true, name: 'Redo' },
    DELETE: { key: 'Delete', name: 'Delete' },
} as const;

export const MODIFIER_KEYS = {
    CTRL: 'ctrl',
    SHIFT: 'shift',
    ALT: 'alt',
    META: 'meta',
} as const;

export const KEY_CODES = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    TAB: 'Tab',
    BACKSPACE: 'Backspace',
    DELETE: 'Delete',
    SPACE: ' ',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown',
} as const;

export const NAVIGATION_KEYS = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown',
} as const;

export const ACCESSIBILITY_ROLES = {
    BUTTON: 'button',
    LINK: 'link',
    NAVIGATION: 'navigation',
    MAIN: 'main',
    REGION: 'region',
    SEARCH: 'search',
    FORM: 'form',
    TABLE: 'table',
    TABLIST: 'tablist',
    TAB: 'tab',
    TABPANEL: 'tabpanel',
    DIALOG: 'dialog',
    ALERT: 'alert',
    ALERTDIALOG: 'alertdialog',
    MENUITEM: 'menuitem',
} as const;

export const KEYBOARD_PATTERNS = {
    COMMAND: /^(?:ctrl|cmd|control)\+/i,
    SHORTCUT: /[\w\d]+(\+[\w\d]+)*/,
} as const;

export const FOCUS_TRAP_KEYS = {
    TAB: 'Tab',
    SHIFT_TAB: 'Shift+Tab',
} as const;

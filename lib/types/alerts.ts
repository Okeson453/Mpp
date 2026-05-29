/**
 * Alerts Type Definitions
 * Defines alert conditions, notifications, and management types
 */

export type AlertType = 'price' | 'volume' | 'indicator' | 'pattern' | 'economic' | 'custom';
export type AlertPriority = 'low' | 'medium' | 'high' | 'critical';
export type AlertStatus = 'active' | 'triggered' | 'paused' | 'deleted';
export type ComparisonOperator = '>' | '<' | '==' | '!=' | '>=' | '<=';
export type NotificationChannel = 'email' | 'push' | 'sms' | 'webhook';

export interface Alert {
    id: string;
    userId: string;
    name: string;
    description?: string;
    type: AlertType;
    priority: AlertPriority;
    status: AlertStatus;
    conditions: AlertCondition[];
    actions: AlertAction[];
    createdAt: Date;
    updatedAt: Date;
    lastTriggeredAt?: Date;
    triggerCount: number;
}

export interface AlertCondition {
    id: string;
    alertId: string;
    type: AlertType;
    symbol?: string;
    operator: ComparisonOperator;
    value: number | string;
    threshold?: number;
    timeframe?: string;
    indicator?: string;
    parameters?: Record<string, any>;
}

export interface AlertAction {
    id: string;
    alertId: string;
    type: 'notify' | 'log' | 'webhook' | 'trade';
    channels: NotificationChannel[];
    tradeAction?: {
        type: 'buy' | 'sell';
        quantity: number;
        orderType: 'market' | 'limit' | 'stop';
        limitPrice?: number;
    };
    webhookUrl?: string;
    enabled: boolean;
}

export interface AlertTrigger {
    id: string;
    alertId: string;
    triggeredAt: Date;
    conditionsMet: string[];
    values: Record<string, any>;
    notificationsSent: AlertNotification[];
}

export interface AlertNotification {
    id: string;
    triggerId: string;
    channel: NotificationChannel;
    status: 'sent' | 'pending' | 'failed';
    sentAt?: Date;
    failureReason?: string;
    content: {
        title: string;
        message: string;
        data?: Record<string, any>;
    };
}

export interface AlertTemplate {
    id: string;
    name: string;
    description: string;
    category: AlertType;
    conditions: AlertCondition[];
    actions: AlertAction[];
    popularity: number;
    rating: number;
}

export interface AlertSchedule {
    id: string;
    alertId: string;
    enabled: boolean;
    weekDays: number[];
    startTime?: string;
    endTime?: string;
    timezone: string;
    excludeHolidays: boolean;
}

export interface AlertStatistics {
    userId: string;
    totalAlerts: number;
    activeAlerts: number;
    pausedAlerts: number;
    totalTriggers: number;
    triggersThisMonth: number;
    triggersThisWeek: number;
    mostCommonType: AlertType;
    successRate: number;
}

export interface AlertPreset {
    id: string;
    userId: string;
    name: string;
    conditions: AlertCondition[];
    actions: AlertAction[];
    createdAt: Date;
    usageCount: number;
}

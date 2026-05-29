/**
 * Backtest Layout
 * Layout for backtest section
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Backtest | Muster',
    description: 'Backtest your trading strategies against historical data',
};

export default function BacktestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

/**
 * Alerts Layout
 * Layout for alerts section
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Alerts | Muster',
    description: 'Manage your trading alerts and price notifications',
};

export default function AlertsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

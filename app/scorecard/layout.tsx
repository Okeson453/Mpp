/**
 * Scorecard Layout
 * Layout for scorecard section
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Scorecard | Muster',
    description: 'Track your trading performance and statistics',
};

export default function ScorecardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

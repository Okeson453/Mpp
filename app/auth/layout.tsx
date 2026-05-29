/**
 * Auth Layout
 * Minimal layout for authentication pages (no global nav)
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Auth | Muster',
    description: 'Sign in or create your account',
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            {children}
        </div>
    );
}

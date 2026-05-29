'use client';

/**
 * Mobile Navigation Component
 * Responsive mobile navigation with hamburger menu and drawer
 */

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Home, BarChart3, BookOpen, Users, AlertCircle, Gear } from 'lucide-react';
import Link from 'next/link';

export interface MobileNavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
}

interface MobileNavProps {
    items?: MobileNavItem[];
    onNavigate?: (href: string) => void;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({
    items,
    onNavigate,
    isOpen = false,
    onOpenChange,
    className = '',
}) => {
    const router = useRouter();
    const [open, setOpen] = useState(isOpen);

    const handleOpen = useCallback(() => {
        setOpen(!open);
        onOpenChange?.(!open);
    }, [open, onOpenChange]);

    const handleNavigate = useCallback(
        (href: string) => {
            onNavigate?.(href);
            router.push(href);
            setOpen(false);
            onOpenChange?.(false);
        },
        [router, onNavigate, onOpenChange]
    );

    const defaultItems: MobileNavItem[] = items || [
        { label: 'Dashboard', href: '/', icon: <Home size={20} /> },
        { label: 'Charts', href: '/charts', icon: <BarChart3 size={20} /> },
        { label: 'Journal', href: '/journal', icon: <BookOpen size={20} /> },
        { label: 'Community', href: '/community', icon: <Users size={20} /> },
        { label: 'Alerts', href: '/alerts', icon: <AlertCircle size={20} /> },
        { label: 'Settings', href: '/settings', icon: <Gear size={20} /> },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={handleOpen}
                className={`lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-slate-900 text-slate-100 hover:bg-slate-800 transition-colors ${className}`}
                aria-label="Toggle navigation"
                aria-expanded={open}
            >
                {open ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Drawer Overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => handleOpen()}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Navigation Drawer */}
            <nav
                className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-slate-100 z-40 transform transition-transform duration-300 lg:hidden ${open ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="pt-20 px-4 space-y-2">
                    {defaultItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <button
                                onClick={() => handleNavigate(item.href)}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors relative group"
                            >
                                <span className="flex-shrink-0">{item.icon}</span>
                                <span className="flex-1 text-left">{item.label}</span>
                                {item.badge && (
                                    <span className="flex-shrink-0 px-2 py-1 bg-red-500 text-xs rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    );
};

export default MobileNav;

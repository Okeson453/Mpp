'use client';

import Link from 'next/link';
import { BrandLockup } from '@/components/layout/brand-lockup';
import { SessionPill } from '@/components/layout/session-pill';
import { cn } from '@/lib/utils/cn';
import { useSystemStore } from '@/stores/system-store';

const NAV_LINKS = [
  { href: '/dashboard',    label: 'DASHBOARD' },
  { href: '/scanner',      label: 'SCANNER'   },
  { href: '/playbook',     label: 'PLAYBOOK'  },
  { href: '/journal',      label: 'JOURNAL'   },
  { href: '/masterclass',  label: 'MASTERCLASS'},
];

interface HeaderProps {
  currentPath?: string;
  isAuthenticated?: boolean;
}

export function Header({ currentPath = '/', isAuthenticated = false }: HeaderProps) {
  const { state, systemOnline } = useSystemStore();

  return (
    <header className="sticky top-0 z-40 h-16 bg-void border-b border-white/[0.04] flex items-center px-8 gap-6">
      <Link href="/" className="shrink-0">
        <BrandLockup size="md" />
      </Link>

      {isAuthenticated && (
        <nav className="flex-1 flex items-center justify-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-mono text-[11px] tracking-[0.1em] transition-colors duration-200',
                'hover:text-white',
                currentPath === link.href
                  ? 'text-white border-b-2 border-cyan-core pb-px'
                  : 'text-iron',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      <div className="ml-auto flex items-center gap-4">
        <SessionPill />
        <div className="hidden md:flex items-center gap-2 font-mono text-[10px]">
          <span
            className={cn(
              'w-2 h-2 rounded-full',
              systemOnline ? 'bg-cyan-glow animate-pulse-slow' : 'bg-iron',
            )}
          />
          <span className={cn(systemOnline ? 'text-cyan-core' : 'text-iron')}>
            {systemOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>
    </header>
  );
}

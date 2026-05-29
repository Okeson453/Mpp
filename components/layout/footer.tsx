'use client';

import Link from 'next/link';
import { BrandLockup } from '@/components/layout/brand-lockup';

export function Footer() {
  return (
    <footer className="bg-obsidian border-t border-slate">
      <div className="grid grid-cols-4 gap-8 px-8 py-12">
        <div>
          <BrandLockup size="sm" />
          <p className="font-mono text-[10px] text-iron mt-3 leading-relaxed">
            Precision execution terminal.<br />
            Muster Point Protocol v2.0
          </p>
        </div>

        <div>
          <p className="font-mono text-[9px] text-cyan-core/80 uppercase tracking-[0.2em] mb-4">Navigation</p>
          {['/protocol', '/playbook', '/track-record', '/masterclass', '/community'].map((href) => (
            <Link
              key={href}
              href={href}
              className="block font-mono text-[10px] text-iron hover:text-muted transition-colors duration-200 mb-2"
            >
              {href.slice(1).replace('-', ' ').toUpperCase()}
            </Link>
          ))}
        </div>

        <div>
          <p className="font-mono text-[9px] text-cyan-core/80 uppercase tracking-[0.2em] mb-4">Legal</p>
          {['Terms', 'Privacy', 'Disclaimer', 'Risk Warning'].map((item) => (
            <Link
              key={item}
              href="#"
              className="block font-mono text-[10px] text-iron hover:text-muted transition-colors duration-200 mb-2"
            >
              {item.toUpperCase()}
            </Link>
          ))}
        </div>

        <div>
          <p className="font-mono text-[9px] text-cyan-core/80 uppercase tracking-[0.2em] mb-4">Connect</p>
          {['Twitter', 'Discord', 'Telegram', 'YouTube'].map((item) => (
            <Link
              key={item}
              href="#"
              className="block font-mono text-[10px] text-iron hover:text-muted transition-colors duration-200 mb-2"
            >
              {item.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>

      <div className="px-8 py-4 border-t border-white/[0.04]">
        <p className="font-mono text-[10px] text-iron">
          OFFICIAL MUSTY © 2026 · PROTOCOL v2.0 · ALL SYSTEMS OPERATIONAL
        </p>
      </div>
    </footer>
  );
}

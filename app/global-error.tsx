'use client';

import { Button } from '@/components/ui/button';
import { BrandLockup } from '@/components/layout/brand-lockup';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-void text-white font-body min-h-screen flex flex-col items-center justify-center px-8">
        <BrandLockup size="sm" className="mb-10" />
        <p className="font-mono text-[10px] text-pink-core uppercase tracking-[0.3em] mb-4">
          SYSTEM ERROR
        </p>
        <h1 className="font-display text-[64px] text-white leading-none mb-4">CRITICAL FAULT</h1>
        <p className="font-mono text-[11px] text-iron max-w-[400px] text-center mb-8">
          {error.message || 'An unexpected error occurred. The system state could not be recovered.'}
        </p>
        <Button variant="pink" size="md" onClick={reset}>
          RESET SYSTEM
        </Button>
      </body>
    </html>
  );
}

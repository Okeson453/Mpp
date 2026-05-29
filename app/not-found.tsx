import Link from 'next/link';
import { BrandLockup } from '@/components/layout/brand-lockup';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center relative z-10">
      <BrandLockup size="sm" className="mb-10" />
      <h1 className="font-display text-[120px] text-iron leading-none mb-4">404</h1>
      <p className="font-mono text-[12px] text-muted uppercase tracking-[0.2em] mb-8">
        ROUTE NOT FOUND — RETURN TO PROTOCOL
      </p>
      <Link href="/">
        <Button variant="pink" size="md">RETURN HOME →</Button>
      </Link>
    </div>
  );
}

'use client';

import { cn } from '@/lib/utils/cn';

interface BrandLockupProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'text-[20px]',
  md: 'text-[28px]',
  lg: 'text-[40px]',
};

export function BrandLockup({ size = 'md', className }: BrandLockupProps) {
  return (
    <div
      className={cn(
        'flex items-baseline gap-[2px] font-display leading-none select-none',
        sizeMap[size],
        className,
      )}
    >
      <span className="text-white">OFFICIAL</span>
      <span className="text-pink-glow">&nbsp;MUSTY</span>
    </div>
  );
}

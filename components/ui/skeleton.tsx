'use client';

import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-[2px] animate-pulse-slow',
        'bg-gradient-to-r from-carbon via-graphite to-carbon bg-[length:200%_100%]',
        className,
      )}
      style={{ width, height }}
    />
  );
}

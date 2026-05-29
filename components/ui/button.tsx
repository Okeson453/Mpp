'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'pink' | 'cyan' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const variantStyles = {
  pink: [
    'bg-pink-core text-white border border-pink-core',
    'hover:bg-pink-glow hover:border-pink-glow',
    'hover:shadow-[0_0_20px_rgba(255,61,127,0.4)]',
  ].join(' '),
  cyan: [
    'bg-transparent text-cyan-glow border border-cyan-core',
    'hover:bg-cyan-ghost',
    'hover:shadow-[0_0_20px_rgba(24,212,234,0.2)]',
  ].join(' '),
  ghost: [
    'bg-transparent text-muted border border-slate',
    'hover:bg-graphite hover:text-white',
  ].join(' '),
};

const sizeStyles = {
  sm: 'px-4 py-2 text-[10px] tracking-[0.1em]',
  md: 'px-6 py-3 text-[11px] tracking-[0.1em]',
  lg: 'px-8 py-4 text-[12px] tracking-[0.1em]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'pink', size = 'md', loading = false, disabled, className, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'relative inline-flex items-center justify-center',
          'font-mono uppercase tracking-widest',
          'rounded-[2px] transition-all duration-200',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current animate-pulse-slow" />
            <span className="w-2 h-2 rounded-full bg-current animate-pulse-slow [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-current animate-pulse-slow [animation-delay:0.4s]" />
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-carbon border border-slate rounded-[2px]',
            'px-4 py-3 font-mono text-[13px] text-white',
            'placeholder:text-iron',
            'outline-none transition-all duration-200',
            'focus:border-cyan-core',
            error && 'border-pink-core focus:border-pink-core',
            className,
          )}
          {...props}
        />
        {error && (
          <span className="font-mono text-[10px] text-pink-glow tracking-wide">{error}</span>
        )}
        {hint && !error && (
          <span className="font-mono text-[10px] text-iron tracking-wide">{hint}</span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

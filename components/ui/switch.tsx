'use client';

import * as RadixSwitch from '@radix-ui/react-switch';
import { cn } from '@/lib/utils/cn';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export function Switch({ checked, onCheckedChange, className }: SwitchProps) {
  return (
    <RadixSwitch.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full',
        'border border-slate transition-colors duration-200',
        checked ? 'bg-cyan-core border-cyan-core' : 'bg-slate',
        className,
      )}
    >
      <RadixSwitch.Thumb
        className={cn(
          'pointer-events-none block h-3 w-3 rounded-full bg-white shadow-lg',
          'transition-transform duration-200 mt-[3px]',
          checked ? 'translate-x-[18px]' : 'translate-x-[3px]',
        )}
      />
    </RadixSwitch.Root>
  );
}

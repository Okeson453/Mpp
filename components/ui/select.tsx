'use client';

import * as RadixSelect from '@radix-ui/react-select';
import { cn } from '@/lib/utils/cn';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export function Select({ value, onValueChange, options, placeholder = 'Select...', className }: SelectProps) {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger
        className={cn(
          'flex items-center justify-between gap-2',
          'bg-carbon border border-slate rounded-[2px]',
          'px-4 py-3 font-mono text-[12px] text-white',
          'outline-none transition-all duration-200',
          'focus:border-cyan-core hover:border-slate/80',
          'min-w-[160px]',
          className,
        )}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="text-iron text-[10px]">▼</RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className={cn(
            'bg-carbon border border-slate rounded-[2px]',
            'shadow-xl z-[9996] overflow-hidden',
          )}
        >
          <RadixSelect.Viewport className="p-1">
            {options.map((opt) => (
              <RadixSelect.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  'px-4 py-2 font-mono text-[12px] text-muted',
                  'cursor-pointer rounded-[1px]',
                  'hover:bg-graphite hover:text-white',
                  'focus:bg-graphite focus:text-white',
                  'outline-none transition-colors duration-150',
                  'data-[state=checked]:text-cyan-glow',
                )}
              >
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

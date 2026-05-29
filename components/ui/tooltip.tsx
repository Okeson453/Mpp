'use client';

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils/cn';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={300}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            sideOffset={4}
            className={cn(
              'bg-carbon border border-slate rounded-[2px]',
              'px-2 py-1 font-mono text-[10px] text-muted',
              'z-[9997] animate-fade-up',
              className,
            )}
          >
            {content}
            <RadixTooltip.Arrow className="fill-slate" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

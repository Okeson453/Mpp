'use client';

import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils/cn';

export const Tabs = RadixTabs.Root;

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <RadixTabs.List
      className={cn(
        'flex border-b border-slate gap-0',
        className,
      )}
    >
      {children}
    </RadixTabs.List>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <RadixTabs.Trigger
      value={value}
      className={cn(
        'px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em]',
        'text-iron transition-all duration-200',
        'border-b-2 border-transparent -mb-px',
        'hover:text-muted',
        'data-[state=active]:text-white data-[state=active]:border-cyan-core',
        className,
      )}
    >
      {children}
    </RadixTabs.Trigger>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <RadixTabs.Content value={value} className={cn('pt-6', className)}>
      {children}
    </RadixTabs.Content>
  );
}

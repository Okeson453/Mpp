'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils/cn';

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

export function DialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-50 bg-void/85 backdrop-blur-[4px]" />
      <RadixDialog.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
          'w-full max-w-2xl bg-obsidian border border-cyan-core rounded-[2px]',
          'focus:outline-none',
          className,
        )}
      >
        {children}
        <RadixDialog.Close className="absolute top-4 right-4 text-iron hover:text-pink-glow transition-colors duration-200 font-mono text-sm">
          ✕
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

export function DialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-b border-slate', className)}>
      {children}
    </div>
  );
}

export function DialogBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 py-6', className)}>{children}</div>;
}

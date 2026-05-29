'use client';

import { useUIStore } from '@/stores/ui-store';
import { cn } from '@/lib/utils/cn';

export function ToastContainer() {
  const { toastQueue, dismissToast } = useUIStore();

  if (toastQueue.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9998] flex flex-col gap-2">
      {toastQueue.map((toast) => (
        <div
          key={toast.id}
          onClick={() => dismissToast(toast.id)}
          className={cn(
            'flex items-start gap-3 px-4 py-3 rounded-[2px]',
            'font-mono text-[11px] cursor-pointer',
            'border-l-[3px] transition-all duration-200',
            'hover:opacity-80',
            toast.type === 'alert' && 'bg-pink-ghost border-pink-core text-pink-soft',
            toast.type === 'success' && 'bg-cyan-ghost border-cyan-core text-cyan-soft',
            toast.type === 'info' && 'bg-carbon border-slate text-muted',
          )}
        >
          <span className="flex-1">{toast.message}</span>
          <span className="text-iron shrink-0">✕</span>
        </div>
      ))}
    </div>
  );
}

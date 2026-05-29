import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="flex h-screen flex-col bg-void">
      {/* Header skeleton */}
      <div className="h-16 border-b border-slate bg-carbon">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Main content skeleton */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chart area */}
        <div className="flex-1 bg-void p-4">
          <Skeleton className="h-full w-full rounded" />
        </div>

        {/* Sidebar skeleton */}
        <div className="w-[380px] border-l border-slate bg-carbon p-4">
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>

      {/* Motto bar skeleton */}
      <div className="h-16 bg-carbon">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}

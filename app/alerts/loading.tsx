/**
 * Alerts Loading
 * Loading skeleton for alerts page
 */

export default function AlertsLoading() {
    return (
        <main className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Skeleton */}
                <div className="mb-8 animate-pulse">
                    <div className="h-8 bg-slate-800 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                </div>

                {/* Content Skeleton */}
                <div className="space-y-4 animate-pulse">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-24 bg-slate-800 rounded"></div>
                    ))}
                </div>
            </div>
        </main>
    );
}

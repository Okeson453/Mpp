/**
 * Backtest Loading
 * Loading skeleton for backtest page
 */

export default function BacktestLoading() {
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
                    <div className="h-64 bg-slate-800 rounded"></div>
                    <div className="h-96 bg-slate-800 rounded"></div>
                </div>
            </div>
        </main>
    );
}

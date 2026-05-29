/**
 * Scorecard Loading
 * Loading skeleton for scorecard page
 */

export default function ScorecardLoading() {
    return (
        <main className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Skeleton */}
                <div className="mb-8 animate-pulse">
                    <div className="h-8 bg-slate-800 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                </div>

                {/* Content Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-pulse">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 bg-slate-800 rounded"></div>
                    ))}
                </div>

                <div className="h-96 bg-slate-800 rounded animate-pulse"></div>
            </div>
        </main>
    );
}

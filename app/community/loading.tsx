/**
 * Community Loading
 * Loading skeleton for community page
 */

export default function CommunityLoading() {
    return (
        <main className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Skeleton */}
                <div className="mb-8 animate-pulse">
                    <div className="h-8 bg-slate-800 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                </div>

                {/* Content Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Leaderboard */}
                    <div className="lg:col-span-1 animate-pulse">
                        <div className="h-8 bg-slate-800 rounded mb-4 w-2/3"></div>
                        <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-12 bg-slate-800 rounded"></div>
                            ))}
                        </div>
                    </div>

                    {/* Posts */}
                    <div className="lg:col-span-2 animate-pulse space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-32 bg-slate-800 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

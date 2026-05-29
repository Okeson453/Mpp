/**
 * Settings Loading
 * Loading skeleton for settings page
 */

export default function SettingsLoading() {
    return (
        <main className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Skeleton */}
                <div className="mb-8 animate-pulse">
                    <div className="h-8 bg-slate-800 rounded w-1/3 mb-4"></div>
                </div>

                {/* Settings Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 animate-pulse space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-10 bg-slate-800 rounded"></div>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3 animate-pulse space-y-4">
                        <div className="h-8 bg-slate-800 rounded w-1/3 mb-6"></div>
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-12 bg-slate-800 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

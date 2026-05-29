/**
 * Billing Loading
 * Loading skeleton for billing page
 */

export default function BillingLoading() {
    return (
        <main className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header Skeleton */}
                <div className="mb-8 animate-pulse">
                    <div className="h-8 bg-slate-800 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                </div>

                {/* Current Plan */}
                <div className="mb-8 animate-pulse">
                    <div className="h-6 bg-slate-800 rounded w-1/4 mb-4"></div>
                    <div className="h-32 bg-slate-800 rounded"></div>
                </div>

                {/* Billing History */}
                <div className="animate-pulse">
                    <div className="h-6 bg-slate-800 rounded w-1/4 mb-4"></div>
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-16 bg-slate-800 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

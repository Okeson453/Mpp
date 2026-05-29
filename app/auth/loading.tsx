/**
 * Auth Loading
 * Loading skeleton for auth pages
 */

export default function AuthLoading() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-800 rounded-lg p-8 animate-pulse">
                <div className="h-8 bg-slate-700 rounded mb-4"></div>
                <div className="h-4 bg-slate-700 rounded mb-8 w-2/3"></div>
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-10 bg-slate-700 rounded"></div>
  
'use client';

import { Slider } from '@/components/ui/slider';
import { Select } from '@/components/ui/select';

export function FilterBar() {
    return (
        <div className="border-b border-slate bg-carbon p-4">
            <div className="flex gap-4">
                {/* Asset class toggle */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-mono text-iron">ASSET CLASS</label>
                    <Select />
                </div>

                {/* Session selector */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-mono text-iron">SESSION</label>
                    <Select />
                </div>

                {/* Min score slider */}
                <div className="flex flex-1 items-center gap-2">
                    <label className="text-sm font-mono text-iron">MIN SCORE</label>
                    <Slider />
                </div>
            </div>
        </div>
    );
}

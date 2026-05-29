'use client';

import { InstrumentCard } from '@/components/cards/instrument-card';

export function ScannerGrid() {
    const instruments = []; // Will be populated from state

    return (
        <div className="grid auto-rows-max gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {instruments.length === 0 ? (
                <div className="col-span-full py-12 text-center">
                    <p className="text-iron">No instruments match filters</p>
                </div>
            ) : (
                instruments.map((instrument: any) => (
                    <InstrumentCard key={instrument.symbol} instrument={instrument} />
                ))
            )}
        </div>
    );
}

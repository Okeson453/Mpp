'use client';

import { FilterBar } from '@/components/sections/filter-bar';
import { ScannerGrid } from '@/components/sections/scanner-grid';

export default function ScannerPage() {
  return (
    <div className="min-h-screen bg-void">
      <FilterBar />
      <ScannerGrid />
    </div>
  );
}

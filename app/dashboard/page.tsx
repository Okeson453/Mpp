'use client';

import { useMemo } from 'react';
import { ChartCanvas } from '@/components/chart/chart-canvas';
import { Sidebar } from '@/components/layout/sidebar';
import { JournalStream } from '@/components/sections/journal-stream';
import { MottoBar } from '@/components/layout/motto-bar';
import { Header } from '@/components/layout/header';

export default function DashboardPage() {
  const dashboard = useMemo(() => {
    return {
      title: 'COMMAND CENTER',
      description: 'Primary trading interface',
    };
  }, []);

  return (
    <div className="flex h-screen flex-col bg-void">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* 70/30 Split */}
        <div className="flex-1 overflow-hidden">
          <ChartCanvas />
        </div>
        {/* Right Sidebar */}
        <div className="w-[380px] border-l border-slate overflow-y-auto">
          <Sidebar />
        </div>
      </div>
      <MottoBar />
    </div>
  );
}

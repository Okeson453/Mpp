'use client';

import { StateMachineStepper } from '@/components/sections/state-machine-stepper';
import { FiveGatesInteractive } from '@/components/sections/five-gates-interactive';

export default function ProtocolPage() {
  return (
    <div className="min-h-screen bg-void">
      <div className="space-y-16 p-8">
        <StateMachineStepper />
        <FiveGatesInteractive />
      </div>
    </div>
  );
}

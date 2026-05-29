'use client';

import * as RadixSlider from '@radix-ui/react-slider';
import { cn } from '@/lib/utils/cn';

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function Slider({ value, onValueChange, min = 0, max = 100, step = 1, className }: SliderProps) {
  return (
    <RadixSlider.Root
      className={cn('relative flex items-center select-none touch-none w-full h-5', className)}
      value={value}
      onValueChange={onValueChange}
      min={min}
      max={max}
      step={step}
    >
      <RadixSlider.Track className="bg-slate relative grow rounded-full h-1">
        <RadixSlider.Range className="absolute bg-cyan-core rounded-full h-full" />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className={cn(
          'block w-4 h-4 bg-cyan-core rounded-full border-2 border-void',
          'hover:bg-cyan-glow hover:shadow-[0_0_8px_rgba(24,212,234,0.6)]',
          'focus:outline-none transition-all duration-200',
        )}
      />
    </RadixSlider.Root>
  );
}

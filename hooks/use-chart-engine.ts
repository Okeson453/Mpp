'use client';

// Canvas lifecycle manager hook
// Handles DPR-aware sizing, ResizeObserver, and the render loop.

import { useRef, useEffect, useCallback, useState } from 'react';
import type { ChartEngineOptions } from '@/lib/types/chart';
import { renderChart } from '@/components/chart/chart-engine';

interface UseChartEngineReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  draw: (options: ChartEngineOptions) => void;
  resize: () => void;
  isReady: boolean;
}

export function useChartEngine(): UseChartEngineReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const pendingOptionsRef = useRef<ChartEngineOptions | null>(null);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctxRef.current = ctx;
      setIsReady(true);
    }

    // Redraw if we have pending options
    if (pendingOptionsRef.current && ctx) {
      renderChart(ctx, pendingOptionsRef.current, {
        width: rect.width,
        height: rect.height,
        padding: { top: 40, right: 80, bottom: 40, left: 60 },
      });
    }
  }, []);

  const draw = useCallback((options: ChartEngineOptions) => {
    pendingOptionsRef.current = options;

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    animFrameRef.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx) return;

      const dpr = window.devicePixelRatio || 1;
      renderChart(ctx, options, {
        width: canvas.width / dpr,
        height: canvas.height / dpr,
        padding: { top: 40, right: 80, bottom: 40, left: 60 },
      });
    });
  }, []);

  useEffect(() => {
    resize();

    const observer = new ResizeObserver(() => resize());
    const parent = canvasRef.current?.parentElement;
    if (parent) observer.observe(parent);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [resize]);

  return { canvasRef, draw, resize, isReady };
}

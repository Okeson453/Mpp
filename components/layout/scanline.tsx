'use client';

/**
 * Scanline Effect Component
 * Animated CRT scanline overlay for cyberpunk aesthetic
 */

import React, { useMemo } from 'react';

interface ScanlineProps {
    intensity?: number; // 0-1
    speed?: number; // animation speed in seconds
    className?: string;
    dark?: boolean;
}

export const Scanline: React.FC<ScanlineProps> = ({ intensity = 0.15, speed = 8, className = '', dark = false }) => {
    const scanlines = useMemo(() => {
        return Array.from({ length: 100 }, (_, i) => i);
    }, []);

    return (
        <div
            className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
            aria-hidden="true"
            style={{
                background: `repeating-linear-gradient(
          0deg,
          ${dark ? 'rgba(0, 0, 0,' : 'rgba(255, 255, 255,'} ${intensity}),
          ${dark ? 'rgba(0, 0, 0,' : 'rgba(255, 255, 255,'} ${intensity}) 1px,
          transparent 1px,
          transparent 2px
        )`,
            }}
        >
            {/* Animated scanline overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent"
                style={{
                    background: `linear-gradient(
            180deg,
            transparent 0%,
            ${dark ? 'rgba(0, 0, 0,' : 'rgba(255, 255, 255,'} ${intensity * 0.5}) 50%,
            transparent 100%
          )`,
                    animation: `scanlineMove ${speed}s linear infinite`,
                    pointerEvents: 'none',
                }}
            />

            {/* Chromatic aberration effect (optional) */}
            <style jsx global>{`
        @keyframes scanlineMove {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
          }
          20%, 24%, 55% {
            opacity: 0.95;
          }
        }

        .scanline-container {
          animation: flicker 0.15s infinite;
        }
      `}</style>
        </div>
    );
};

/**
 * Scanline Wrapper Component
 * Easily add scanlines to any element
 */
interface ScanlineWrapperProps {
    children: React.ReactNode;
    intensity?: number;
    speed?: number;
    dark?: boolean;
    className?: string;
}

export const ScanlineWrapper: React.FC<ScanlineWrapperProps> = ({
    children,
    intensity = 0.15,
    speed = 8,
    dark = false,
    className = '',
}) => {
    return (
        <div className={`relative ${className}`}>
            {children}
            <Scanline intensity={intensity} speed={speed} dark={dark} />
        </div>
    );
};

export default Scanline;

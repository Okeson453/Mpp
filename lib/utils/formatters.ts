// Data formatter utilities for Official Musty
// All display formatting goes through these functions — never format inline.

import type { SetupGrade } from '@/lib/types/mpp';

export function formatPrice(value: number, decimals = 2): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatChange(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

export function formatRR(value: number): string {
  return `${value.toFixed(1)}:1`;
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes} UTC`;
}

export function formatScore(value: number): string {
  return `${value}/18`;
}

export function getGrade(score: number): SetupGrade {
  if (score >= 15) return 'A+';
  if (score >= 12) return 'B';
  if (score > 0)   return 'C';
  return 'NO TRADE';
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

export function formatDuration(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

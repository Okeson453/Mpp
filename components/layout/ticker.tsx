'use client';

import { cn } from '@/lib/utils/cn';

interface TickerItem {
  symbol: string;
  price: number;
  change: number;
}

const DEFAULT_ITEMS: TickerItem[] = [
  { symbol: 'HYPEUSDT', price: 61840,  change:  2.4  },
  { symbol: 'BTCUSDT',  price: 97200,  change:  1.2  },
  { symbol: 'ETHUSDT',  price: 3820,   change: -0.8  },
  { symbol: 'SOLUSDT',  price: 198.4,  change:  3.1  },
  { symbol: 'BNBUSDT',  price: 624.5,  change:  0.6  },
  { symbol: 'LINKUSDT', price: 18.92,  change: -1.4  },
  { symbol: 'AVAXUSDT', price: 41.2,   change:  2.0  },
  { symbol: 'DOTUSDT',  price: 8.74,   change: -0.3  },
];

interface TickerProps {
  items?: TickerItem[];
  className?: string;
}

export function Ticker({ items = DEFAULT_ITEMS, className }: TickerProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        'h-9 bg-obsidian border-b border-white/[0.04] overflow-hidden relative',
        className,
      )}
    >
      <div className="flex items-center h-full animate-ticker whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-4 font-mono text-[11px]">
            <span className="text-muted tracking-wide">{item.symbol}</span>
            <span
              className={cn(
                'font-medium',
                item.change > 0 ? 'text-cyan-soft' : item.change < 0 ? 'text-pink-soft' : 'text-iron',
              )}
            >
              {item.change > 0 ? '+' : ''}
              {item.change.toFixed(1)}%
            </span>
            <span className="text-iron">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

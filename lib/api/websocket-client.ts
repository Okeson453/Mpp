// Exchange WebSocket manager — singleton connection with exponential backoff
// Normalizes Binance kline format to internal Candle interface.

import type { Candle, TimeFrame } from '@/lib/types/mpp';

type CandleCallback = (candle: Candle) => void;
type PriceCallback = (price: number) => void;

const BACKOFF_DELAYS = [1000, 2000, 4000, 8000, 16000, 32000];
const HEARTBEAT_INTERVAL = 30000;
const PONG_TIMEOUT = 5000;

let socket: WebSocket | null = null;
let reconnectAttempt = 0;
let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
let pongTimer: ReturnType<typeof setTimeout> | null = null;
let currentSymbol = '';
let currentTimeframe: TimeFrame = '1H';

const candleListeners = new Set<CandleCallback>();
const priceListeners = new Set<PriceCallback>();

function tfToBinanceInterval(tf: TimeFrame): string {
  const map: Record<TimeFrame, string> = {
    '1H': '1h',
    '5M': '5m',
    '15M': '15m',
    '4H': '4h',
    '1D': '1d',
  };
  return map[tf] ?? '1h';
}

function startHeartbeat(): void {
  heartbeatTimer = setInterval(() => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ method: 'ping' }));
      pongTimer = setTimeout(() => {
        socket?.close();
      }, PONG_TIMEOUT);
    }
  }, HEARTBEAT_INTERVAL);
}

function stopHeartbeat(): void {
  if (heartbeatTimer) clearInterval(heartbeatTimer);
  if (pongTimer) clearTimeout(pongTimer);
}

function scheduleReconnect(): void {
  const delay = BACKOFF_DELAYS[Math.min(reconnectAttempt, BACKOFF_DELAYS.length - 1)] ?? 32000;
  reconnectAttempt++;
  setTimeout(() => connect(currentSymbol, currentTimeframe), delay);
}

function parseBinanceKline(data: Record<string, unknown>): Candle | null {
  const k = data['k'] as Record<string, unknown> | undefined;
  if (!k) return null;
  return {
    time: k['t'] as number,
    open: parseFloat(k['o'] as string),
    high: parseFloat(k['h'] as string),
    low: parseFloat(k['l'] as string),
    close: parseFloat(k['c'] as string),
    volume: parseFloat(k['v'] as string),
  };
}

export function connect(symbol: string, tf: TimeFrame): void {
  currentSymbol = symbol;
  currentTimeframe = tf;
  disconnect();

  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://stream.binance.com:9443/ws';
  const stream = `${symbol.toLowerCase()}@kline_${tfToBinanceInterval(tf)}`;

  socket = new WebSocket(`${wsUrl}/${stream}`);

  socket.onopen = () => {
    reconnectAttempt = 0;
    startHeartbeat();
  };

  socket.onmessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data as string) as Record<string, unknown>;
      if (data['pong']) {
        if (pongTimer) clearTimeout(pongTimer);
        return;
      }
      const candle = parseBinanceKline(data);
      if (candle) {
        candleListeners.forEach((cb) => cb(candle));
        priceListeners.forEach((cb) => cb(candle.close));
      }
    } catch {
      // Silently ignore parse errors
    }
  };

  socket.onclose = () => {
    stopHeartbeat();
    scheduleReconnect();
  };

  socket.onerror = () => {
    socket?.close();
  };
}

export function disconnect(): void {
  stopHeartbeat();
  if (socket) {
    socket.onclose = null;
    socket.close();
    socket = null;
  }
}

export function onCandle(cb: CandleCallback): () => void {
  candleListeners.add(cb);
  return () => candleListeners.delete(cb);
}

export function onPrice(cb: PriceCallback): () => void {
  priceListeners.add(cb);
  return () => priceListeners.delete(cb);
}

export function isConnected(): boolean {
  return socket?.readyState === WebSocket.OPEN;
}

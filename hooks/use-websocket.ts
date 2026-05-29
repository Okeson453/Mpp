'use client';

// Exchange WebSocket hook — wraps the singleton ws client
import { useEffect, useCallback, useState } from 'react';
import type { Candle, TimeFrame } from '@/lib/types/mpp';
import * as wsClient from '@/lib/api/websocket-client';

interface UseWebSocketReturn {
  isConnected: boolean;
  connect: (symbol: string, tf: TimeFrame) => void;
  disconnect: () => void;
  onCandle: (cb: (candle: Candle) => void) => () => void;
  onPrice: (cb: (price: number) => void) => () => void;
}

export function useWebSocket(): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsConnected(wsClient.isConnected());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const connect = useCallback((symbol: string, tf: TimeFrame) => {
    wsClient.connect(symbol, tf);
  }, []);

  const disconnect = useCallback(() => {
    wsClient.disconnect();
    setIsConnected(false);
  }, []);

  useEffect(() => {
    return () => wsClient.disconnect();
  }, []);

  return {
    isConnected,
    connect,
    disconnect,
    onCandle: wsClient.onCandle,
    onPrice: wsClient.onPrice,
  };
}

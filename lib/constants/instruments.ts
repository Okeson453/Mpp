// Default instrument list for the scanner and dashboard
// Each instrument has zone offset percentages relative to mid-range.

export interface DefaultInstrument {
  symbol: string;
  defaultPinkZoneOffset: number; // Percentage below consolidation mid
  defaultCyanZoneOffset: number; // Percentage above consolidation mid
}

export const INSTRUMENTS: DefaultInstrument[] = [
  { symbol: 'HYPEUSDT',  defaultPinkZoneOffset: 4.2, defaultCyanZoneOffset: 5.8 },
  { symbol: 'BTCUSDT',   defaultPinkZoneOffset: 3.5, defaultCyanZoneOffset: 4.5 },
  { symbol: 'ETHUSDT',   defaultPinkZoneOffset: 4.0, defaultCyanZoneOffset: 5.5 },
  { symbol: 'SOLUSDT',   defaultPinkZoneOffset: 5.0, defaultCyanZoneOffset: 7.0 },
  { symbol: 'BNBUSDT',   defaultPinkZoneOffset: 3.8, defaultCyanZoneOffset: 5.2 },
  { symbol: 'LINKUSDT',  defaultPinkZoneOffset: 4.5, defaultCyanZoneOffset: 6.0 },
  { symbol: 'AVAXUSDT',  defaultPinkZoneOffset: 4.8, defaultCyanZoneOffset: 6.5 },
  { symbol: 'DOTUSDT',   defaultPinkZoneOffset: 4.2, defaultCyanZoneOffset: 5.5 },
];

export const DEFAULT_INSTRUMENT = INSTRUMENTS[0]!.symbol;

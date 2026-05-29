// Core type system for Official Musty — Muster Point Protocol
// All interfaces are defined exactly as specified in the build document.

export type MPPState =
  | 'IDLE'
  | 'SCANNING'
  | 'MAPPED'
  | 'ALERT'
  | 'PRIMED'
  | 'EXECUTING'
  | 'MANAGING'
  | 'CLOSED'
  | 'INVALIDATED';

export type TimeFrame = '1H' | '5M' | '15M' | '4H' | '1D';
export type GateStatus = 'PENDING' | 'PASS' | 'FAIL';
export type SetupGrade = 'A+' | 'B' | 'C' | 'NO TRADE';
export type SessionPhase = 'ASIAN' | 'LONDON' | 'NEW_YORK' | 'OFF';

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Zone {
  upper: number;
  lower: number;
  active: boolean;
  anchor: 'prior_swing' | 'order_block' | 'prior_session_high' | 'equal_highs' | 'speculative';
}

export interface ConsolidationRange {
  high: number;
  low: number;
  mid: number;
  candleCount: number;
  volatilityCompression: boolean;
}

export interface Gate {
  id: number;
  label: string;
  status: GateStatus;
  description: string;
}

export interface SetupScore {
  pinkAnchor: number;       // 0–3
  cyanAnchor: number;       // 0–3
  htfBias: number;          // 0–3
  reclaimStrength: number;  // 0–3
  riskReward: number;       // 0–3
  zoneQuality: number;      // 0–3
  total: number;            // 0–18
  grade: SetupGrade;
}

export interface TradeParams {
  entry: number;
  stop: number;
  target: number;
  riskReward: number;
  positionSize: string;
  setupScore: number;
}

export interface JournalEntry {
  id: string;
  timestamp: number;
  state: MPPState;
  message: string;
  type: '' | 'alert' | 'execute' | 'error' | 'info';
  instrument: string;
}

export interface Instrument {
  symbol: string;
  price: number;
  change24h: number;
  state: MPPState;
  pinkZone: Zone;
  cyanZone: Zone;
  setupScore: number;
  riskReward: number;
  session: SessionPhase;
}

export interface StateConfig {
  tag: string;
  headline: string;
  body: string;
  color: 'iron' | 'pink' | 'gold' | 'cyan';
  triggers: string[];
  exitConditions: string[];
}

export interface SetupRecord {
  id: string;
  instrument: string;
  timeframe: TimeFrame;
  session: SessionPhase;
  date: string;
  score: number;
  grade: SetupGrade;
  riskReward: number;
  outcome: 'WIN' | 'LOSS' | 'BREAKEVEN' | 'INVALIDATED';
  chartThumbnailUrl?: string;
}

export interface TradeReview {
  id: string;
  setupRecord: SetupRecord;
  setupQuality: string;
  executionQuality: string;
  outcomeAnalysis: string;
  psychologicalReview: string;
  verdict: 'PROTOCOL_EXECUTED' | 'EARLY_ENTRY' | 'MISSED' | 'DEVIATION';
}

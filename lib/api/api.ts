// API response types for Official Musty

export interface ApiResponse<T> {
  data: T;
  error: string | null;
  message: string;
  status: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  error: string | null;
  message: string;
  status: number;
  pagination: PaginationMeta;
}

export interface ErrorResponse {
  error: string;
  message: string;
  status: number;
  code?: string;
}

export interface WebhookPayload {
  symbol: string;
  action: 'BUY' | 'SELL' | 'ALERT' | 'CLOSE';
  price: number;
  score?: number;
  timestamp: number;
  signature?: string;
}

export interface TickerData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  timestamp: number;
}

export interface SessionData {
  user: {
    id: string;
    email: string;
    tier: 'FREE' | 'PRO' | 'ELITE';
  } | null;
  token: string | null;
  expiresAt: number | null;
}

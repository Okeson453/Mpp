// GET /api/instruments/[symbol]/ohlcv - get OHLCV candles
export async function GET(
  request: Request,
  { params }: { params: { symbol: string } }
) {
  return Response.json([]);
}

// GET /api/instruments/[symbol]/ohlcv - get OHLCV candles
export async function GET(
  request: Request,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params;
  return Response.json([]);
}

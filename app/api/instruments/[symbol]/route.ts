// GET /api/instruments/[symbol] - get single instrument
export async function GET(
  request: Request,
  { params }: { params: { symbol: string } }
) {
  return Response.json({ symbol: params.symbol });
}

// GET /api/instruments/[symbol] - get single instrument
export async function GET(
  request: Request,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params;
  return Response.json({ symbol });
}

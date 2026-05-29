// GET /api/instruments - list all instruments
export async function GET() {
  return Response.json([]);
}

// POST /api/instruments - create/save instrument
export async function POST(request: Request) {
  try {
    const body = await request.json();
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}

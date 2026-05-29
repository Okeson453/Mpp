// GET /api/journal - list journal entries
export async function GET() {
  return Response.json([]);
}

// POST /api/journal - create journal entry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    return Response.json({ success: true, id: '123' });
  } catch (error) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// GET /api/setups/[setupId] - get single setup
export async function GET(
  request: Request,
  { params }: { params: { setupId: string } }
) {
  return Response.json({ id: params.setupId });
}

// PATCH /api/setups/[setupId] - update setup
export async function PATCH(
  request: Request,
  { params }: { params: { setupId: string } }
) {
  try {
    const body = await request.json();
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// DELETE /api/setups/[setupId] - delete setup
export async function DELETE(
  request: Request,
  { params }: { params: { setupId: string } }
) {
  return Response.json({ success: true });
}

// GET /api/journal/[sessionId] - get single session
export async function GET(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  return Response.json({ id: params.sessionId });
}

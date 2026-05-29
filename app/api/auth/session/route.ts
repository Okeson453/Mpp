// GET /api/auth/session
export async function GET() {
  return Response.json({ authenticated: true, user: null });
}

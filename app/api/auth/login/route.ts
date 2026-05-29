// POST /api/auth/login
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Auth logic here
    return Response.json({ success: true, message: 'Login successful' });
  } catch (error) {
    return Response.json(
      { error: 'Login failed' },
      { status: 400 }
    );
  }
}

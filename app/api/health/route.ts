export async function GET() {
  return Response.json({
    status: 'online',
    version: '1.0.0',
    uptime: process.uptime(),
  });
}

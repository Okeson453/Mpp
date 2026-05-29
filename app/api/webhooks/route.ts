// POST /api/webhooks/tradingview - TradingView webhook receiver
export async function POST(request: Request) {
  try {
    const signature = request.headers.get('X-Webhook-Signature');
    // Verify HMAC signature
    const body = await request.json();
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Webhook failed' }, { status: 400 });
  }
}

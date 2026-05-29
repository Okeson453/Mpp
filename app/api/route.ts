import { NextResponse } from 'next/server';
import { fetchInstruments } from '@/lib/api/exchange-client';

export const revalidate = 30;

export async function GET() {
  try {
    const instruments = await fetchInstruments();
    return NextResponse.json({
      data:    instruments,
      error:   null,
      message: 'OK',
      status:  200,
    });
  } catch {
    return NextResponse.json(
      { data: null, error: 'Fetch failed', message: 'Could not retrieve instruments', status: 500 },
      { status: 500 },
    );
  }
}

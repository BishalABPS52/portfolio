import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Quote } from '@/models/Quote';

export async function GET() {
  try {
    await dbConnect();
    const quotes = await Quote.find({}).sort({ createdAt: -1 });
    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Database error in quotes API:', error);
    // Return empty array if database is not available
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    const quote = await Quote.create(data);
    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error('Database error in quotes POST:', error);
    return NextResponse.json({ error: 'Database not available' }, { status: 503 });
  }
}

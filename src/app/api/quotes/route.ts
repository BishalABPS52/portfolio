import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Quote } from '@/models/Quote';

export async function GET() {
  try {
    await dbConnect();
    const quotes = await Quote.find({}).sort({ createdAt: -1 });
    return NextResponse.json(quotes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    const quote = await Quote.create(data);
    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
  }
}

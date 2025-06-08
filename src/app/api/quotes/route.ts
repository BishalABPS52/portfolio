import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Quote } from '@/models/Quote';

export async function GET() {
  try {
    const db = await dbConnect();
    if (!db) {
      console.warn('Database connection not available');
      return NextResponse.json([], { status: 503 });
    }
    const quotes = await Quote.find({}).sort({ createdAt: -1 });
    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Database error in quotes API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await dbConnect();
    if (!db) {
      console.warn('Database connection not available');
      return NextResponse.json({ error: 'Service Unavailable' }, { status: 503 });
    }
    const data = await request.json();
    const quote = await Quote.create(data);
    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error('Database error in quotes POST:', error);
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
      }
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

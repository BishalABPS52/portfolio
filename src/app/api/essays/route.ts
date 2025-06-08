import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Essay } from '@/models/Essay';

export async function GET() {
  try {
    const db = await dbConnect();
    if (!db) {
      console.warn('Database connection not available');
      return NextResponse.json([], { status: 503 });
    }
    const essays = await Essay.find({}).sort({ createdAt: -1 });
    return NextResponse.json(essays);
  } catch (error) {
    console.error('Database error in essays API:', error);
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
    const essay = await Essay.create(data);
    return NextResponse.json(essay, { status: 201 });
  } catch (error) {
    console.error('Database error in essays POST:', error);
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
      }
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

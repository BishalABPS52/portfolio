import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Poem } from '@/models/Poem';

export async function GET() {
  try {
    const db = await dbConnect();
    if (!db) {
      console.warn('Database connection not available');
      return NextResponse.json([], { status: 503 });
    }
    const poems = await Poem.find({}).sort({ createdAt: -1 });
    return NextResponse.json(poems);
  } catch (error) {
    console.error('Database error in poems API:', error);
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
    const poem = await Poem.create(data);
    return NextResponse.json(poem, { status: 201 });
  } catch (error) {
    console.error('Database error in poems POST:', error);
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
      }
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

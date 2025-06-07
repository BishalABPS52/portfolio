import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Essay } from '@/models/Essay';

export async function GET() {
  try {
    await dbConnect();
    const essays = await Essay.find({}).sort({ createdAt: -1 });
    return NextResponse.json(essays);
  } catch (error) {
    console.error('Database error in essays API:', error);
    // Return empty array if database is not available
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    const essay = await Essay.create(data);
    return NextResponse.json(essay, { status: 201 });
  } catch (error) {
    console.error('Database error in essays POST:', error);
    return NextResponse.json({ error: 'Database not available' }, { status: 503 });
  }
}

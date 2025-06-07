import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Design } from '@/models/Design';

export async function GET() {
  try {
    await dbConnect();
    const designs = await Design.find({}).sort({ createdAt: -1 });
    return NextResponse.json(designs);
  } catch (error) {
    console.error('Database error in designs API:', error);
    // Return empty array if database is not available
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    const design = await Design.create(data);
    return NextResponse.json(design, { status: 201 });
  } catch (error) {
    console.error('Database error in designs POST:', error);
    return NextResponse.json({ error: 'Database not available' }, { status: 503 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Essay } from '@/models/Essay';

export async function GET() {
  try {
    await dbConnect();
    const essays = await Essay.find({}).sort({ createdAt: -1 });
    return NextResponse.json(essays);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch essays' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    const essay = await Essay.create(data);
    return NextResponse.json(essay, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create essay' }, { status: 500 });
  }
}

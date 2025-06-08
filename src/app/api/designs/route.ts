import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Design } from '@/models/Design';

export async function GET() {
  try {
    await dbConnect();
    const designs = await Design.find({}).sort({ createdAt: -1 });
    return NextResponse.json(designs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch designs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    const design = await Design.create(data);
    return NextResponse.json(design, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create design' }, { status: 500 });
  }
}

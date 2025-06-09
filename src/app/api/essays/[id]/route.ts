import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Essay from '@/models/Essay';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = params.id;
    const db = await dbConnect();
    if (!db) {
      return NextResponse.json({ error: 'Service Unavailable' }, { status: 503 });
    }

    const essay = await Essay.findById(id);
    
    if (!essay) {
      return NextResponse.json({ error: 'Essay not found' }, { status: 404 });
    }

    return NextResponse.json(essay);
  } catch (error) {
    console.error('Database error in essay GET:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = params.id;
    const db = await dbConnect();
    if (!db) {
      return NextResponse.json({ error: 'Service Unavailable' }, { status: 503 });
    }

    const data = await request.json();
    data.updatedAt = new Date();

    const essay = await Essay.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!essay) {
      return NextResponse.json({ error: 'Essay not found' }, { status: 404 });
    }

    return NextResponse.json(essay);
  } catch (error) {
    console.error('Database error in essay PUT:', error);
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
      }
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = params.id;
    const db = await dbConnect();
    if (!db) {
      return NextResponse.json({ error: 'Service Unavailable' }, { status: 503 });
    }

    const essay = await Essay.findByIdAndDelete(id);

    if (!essay) {
      return NextResponse.json({ error: 'Essay not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Essay deleted successfully' });
  } catch (error) {
    console.error('Database error in essay DELETE:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

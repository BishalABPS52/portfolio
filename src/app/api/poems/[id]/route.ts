import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Poem } from '@/models/Poem';

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

    const poem = await Poem.findById(id);
    
    if (!poem) {
      return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
    }

    return NextResponse.json(poem);
  } catch (error) {
    console.error('Database error in poem GET:', error);
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

    const poem = await Poem.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!poem) {
      return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
    }

    return NextResponse.json(poem);
  } catch (error) {
    console.error('Database error in poem PUT:', error);
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

    const poem = await Poem.findByIdAndDelete(id);

    if (!poem) {
      return NextResponse.json({ error: 'Poem not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Poem deleted successfully' });
  } catch (error) {
    console.error('Database error in poem DELETE:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

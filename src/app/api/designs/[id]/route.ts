import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Design from '@/models/Design';

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

    const design = await Design.findById(id);
    
    if (!design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }

    return NextResponse.json(design);
  } catch (error) {
    console.error('Database error in design GET:', error);
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

    const design = await Design.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }

    return NextResponse.json(design);
  } catch (error) {
    console.error('Database error in design PUT:', error);
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

    const design = await Design.findByIdAndDelete(id);

    if (!design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Design deleted successfully' });
  } catch (error) {
    console.error('Database error in design DELETE:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

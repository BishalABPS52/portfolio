import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';

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

    const blog = await Blog.findById(id);
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Database error in blog GET:', error);
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

    const blog = await Blog.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Database error in blog PUT:', error);
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

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Database error in blog DELETE:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

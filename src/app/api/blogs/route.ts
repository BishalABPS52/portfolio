import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Database error in blogs API:', error);
    // Return empty array if database is not available
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    const blog = await Blog.create(data);
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Database error in blogs POST:', error);
    return NextResponse.json({ error: 'Database not available' }, { status: 503 });
  }
}

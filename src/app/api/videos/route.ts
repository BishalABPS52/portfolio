import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Video } from '@/models/Video';

export async function GET() {
  try {
    const db = await dbConnect();
    if (!db) {
      console.warn('Database connection not available');
      return NextResponse.json([], { status: 503 });
    }
    
    const videos = await Video.find({ isPublished: true }).sort({ createdAt: -1 });
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Database error in videos API:', error);
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
    const video = await Video.create(data);
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Database error in videos POST:', error);
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
      }
      if (error.message.includes('duplicate key')) {
        return NextResponse.json({ error: 'Video with this ID already exists' }, { status: 409 });
      }
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
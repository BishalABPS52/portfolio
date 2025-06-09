import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { GameUser } from '@/models/GameUser';

export async function GET(request: NextRequest) {
  try {
    const db = await dbConnect();
    if (!db) {
      return NextResponse.json({ error: 'Service Unavailable' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;
    const sortObj: Record<string, 1 | -1> = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Build search query
    const searchQuery: Record<string, unknown> = {};
    if (search) {
      searchQuery.$or = [
        { username: { $regex: search, $options: 'i' } },
        { displayName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const [users, total] = await Promise.all([
      GameUser.find(searchQuery)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .select('-email'), // Don't expose emails in list view
      GameUser.countDocuments(searchQuery)
    ]);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Database error in game users GET:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await dbConnect();
    if (!db) {
      return NextResponse.json({ error: 'Service Unavailable' }, { status: 503 });
    }

    const data = await request.json();
    const user = await GameUser.create(data);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Database error in game users POST:', error);
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
      }
      if (error.message.includes('duplicate key')) {
        return NextResponse.json({ error: 'Username or email already exists' }, { status: 409 });
      }
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
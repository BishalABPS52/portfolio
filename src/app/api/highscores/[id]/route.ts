import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Highscore from '@/models/Highscore';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = params.id;
    await dbConnect();
    
    const highscore = await Highscore.findById(id);
    
    if (!highscore) {
      return NextResponse.json(
        { error: 'Highscore not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(highscore);
  } catch (error) {
    console.error('Error fetching highscore:', error);
    return NextResponse.json(
      { error: 'Failed to fetch highscore' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = params.id;
    await dbConnect();
    
    const body = await request.json();
    const { username, score, questionsAnswered, gameCompletedAt } = body;

    const highscore = await Highscore.findByIdAndUpdate(
      id,
      {
        username,
        score,
        questionsAnswered,
        gameCompletedAt: gameCompletedAt ? new Date(gameCompletedAt) : undefined
      },
      { new: true, runValidators: true }
    );

    if (!highscore) {
      return NextResponse.json(
        { error: 'Highscore not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(highscore);
  } catch (error) {
    console.error('Error updating highscore:', error);
    return NextResponse.json(
      { error: 'Failed to update highscore' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = params.id;
    await dbConnect();
    
    const highscore = await Highscore.findByIdAndDelete(id);
    
    if (!highscore) {
      return NextResponse.json(
        { error: 'Highscore not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Highscore deleted successfully' });
  } catch (error) {
    console.error('Error deleting highscore:', error);
    return NextResponse.json(
      { error: 'Failed to delete highscore' },
      { status: 500 }
    );
  }
}

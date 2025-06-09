import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Highscore from '@/models/Highscore';

export async function GET() {
  try {
    const connection = await dbConnect();
    
    if (!connection) {
      return NextResponse.json({
        success: false,
        error: 'Database not available'
      }, { status: 503 });
    }

    // Additional check: verify connection is actually ready
    if (connection.connection.readyState !== 1) {
      console.error('MongoDB connection not ready for queries, readyState:', connection.connection.readyState);
      return NextResponse.json({
        success: false,
        error: 'Database connection not ready'
      }, { status: 503 });
    }
    
    // Get top 10 high scores, sorted by score (descending) and then by questions answered (descending)
    const highscores = await Highscore.find({})
      .sort({ score: -1, questionsAnswered: -1, gameCompletedAt: 1 })
      .limit(10)
      .select('username score questionsAnswered gameCompletedAt')
      .lean();

    return NextResponse.json({
      success: true,
      data: highscores
    });
  } catch (error) {
    console.error('Error fetching highscores:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch highscores',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const connection = await dbConnect();
    
    if (!connection) {
      return NextResponse.json({
        success: false,
        error: 'Database not available'
      }, { status: 503 });
    }

    // Additional check: verify connection is actually ready
    if (connection.connection.readyState !== 1) {
      console.error('MongoDB connection not ready for queries, readyState:', connection.connection.readyState);
      return NextResponse.json({
        success: false,
        error: 'Database connection not ready'
      }, { status: 503 });
    }
    
    const body = await request.json();
    const { username, score, questionsAnswered, gameCompletedAt } = body;

    // Validate required fields
    if (!username || score === undefined || questionsAnswered === undefined) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: username, score, questionsAnswered' 
        },
        { status: 400 }
      );
    }

    // Validate data types and ranges
    if (typeof username !== 'string' || username.trim().length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Username must be a non-empty string' 
        },
        { status: 400 }
      );
    }

    if (typeof score !== 'number' || score < 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Score must be a non-negative number' 
        },
        { status: 400 }
      );
    }

    if (typeof questionsAnswered !== 'number' || questionsAnswered < 0 || questionsAnswered > 15) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Questions answered must be a number between 0 and 15' 
        },
        { status: 400 }
      );
    }

    // Create new highscore entry
    const newHighscore = new Highscore({
      username: username.trim(),
      score,
      questionsAnswered,
      gameCompletedAt: gameCompletedAt ? new Date(gameCompletedAt) : new Date()
    });

    const savedHighscore = await newHighscore.save();

    // Get the player's rank by counting how many scores are higher
    const rank = await Highscore.countDocuments({
      $or: [
        { score: { $gt: score } },
        { 
          score: score, 
          questionsAnswered: { $gt: questionsAnswered } 
        },
        { 
          score: score, 
          questionsAnswered: questionsAnswered,
          gameCompletedAt: { $lt: savedHighscore.gameCompletedAt }
        }
      ]
    }) + 1;

    return NextResponse.json({
      success: true,
      data: {
        id: savedHighscore._id,
        username: savedHighscore.username,
        score: savedHighscore.score,
        questionsAnswered: savedHighscore.questionsAnswered,
        gameCompletedAt: savedHighscore.gameCompletedAt,
        rank
      },
      message: 'Highscore saved successfully'
    });
  } catch (error) {
    console.error('Error saving highscore:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save highscore' 
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

const ADMIN_USERNAME = 'Bishaladmin@52abps';
const ADMIN_PASSWORD = 'admin5pwinport3000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create a simple session token (in production, use proper JWT)
      const sessionToken = Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64');
      
      const response = NextResponse.json({
        success: true,
        message: 'Authentication successful',
        user: {
          username: ADMIN_USERNAME,
          role: 'admin'
        }
      });

      // Set secure HTTP-only cookie
      response.cookies.set('admin-session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/admin'
      });

      return response;
    } else {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid admin credentials' 
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Authentication failed' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

    // Clear the session cookie
    response.cookies.delete('admin-session');

    return response;
  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Logout failed' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('admin-session');
    
    if (sessionCookie?.value) {
      return NextResponse.json({
        success: true,
        authenticated: true,
        user: {
          username: ADMIN_USERNAME,
          role: 'admin'
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        authenticated: false
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Admin auth check error:', error);
    return NextResponse.json({
      success: false,
      authenticated: false
    }, { status: 500 });
  }
}

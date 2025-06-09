import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import AvailabilityStatus, { IAvailabilityStatus } from '@/models/AvailabilityStatus';

// Define the type for the lean query result
type AvailabilityStatusLean = Pick<IAvailabilityStatus, 'isAvailable' | 'statusMessage' | 'lastUpdated'>;

export async function GET() {
  try {
    await dbConnect();
    
    // Get the latest availability status
    const status = await AvailabilityStatus.findOne({})
      .sort({ lastUpdated: -1 })
      .select('isAvailable statusMessage lastUpdated')
      .lean() as AvailabilityStatusLean | null;

    // If no status exists, create a default one
    if (!status) {
      const defaultStatus = new AvailabilityStatus({
        isAvailable: true,
        statusMessage: 'Available for Work',
        lastUpdated: new Date(),
        updatedBy: 'system'
      });
      
      const savedStatus = await defaultStatus.save();
      
      return NextResponse.json({
        success: true,
        data: {
          isAvailable: savedStatus.isAvailable,
          statusMessage: savedStatus.statusMessage,
          lastUpdated: savedStatus.lastUpdated
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        isAvailable: status.isAvailable,
        statusMessage: status.statusMessage,
        lastUpdated: status.lastUpdated
      }
    });
  } catch (error) {
    console.error('Error fetching availability status:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch availability status' 
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { isAvailable, statusMessage, adminPassword } = body;

    // Simple admin password check (you should use proper authentication in production)
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (!adminPassword || adminPassword !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unauthorized: Invalid admin password' 
        },
        { status: 401 }
      );
    }

    // Validate required fields
    if (isAvailable === undefined) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required field: isAvailable' 
        },
        { status: 400 }
      );
    }

    // Validate data types
    if (typeof isAvailable !== 'boolean') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'isAvailable must be a boolean' 
        },
        { status: 400 }
      );
    }

    // Set default status message if not provided
    const finalStatusMessage = statusMessage || (isAvailable ? 'Available for Work' : 'Currently Busy');

    if (typeof finalStatusMessage !== 'string' || finalStatusMessage.trim().length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Status message must be a non-empty string' 
        },
        { status: 400 }
      );
    }

    // Create new status entry (keeping history)
    const newStatus = new AvailabilityStatus({
      isAvailable,
      statusMessage: finalStatusMessage.trim(),
      lastUpdated: new Date(),
      updatedBy: 'admin'
    });

    const savedStatus = await newStatus.save();

    return NextResponse.json({
      success: true,
      data: {
        isAvailable: savedStatus.isAvailable,
        statusMessage: savedStatus.statusMessage,
        lastUpdated: savedStatus.lastUpdated
      },
      message: 'Availability status updated successfully'
    });
  } catch (error) {
    console.error('Error updating availability status:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update availability status' 
      },
      { status: 500 }
    );
  }
}

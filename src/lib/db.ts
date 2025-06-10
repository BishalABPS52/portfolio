import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  let mongoose: MongooseCache | undefined;
}

const globalWithMongoose = global as { mongoose?: MongooseCache };

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose | null> {
  try {
    // Check if MongoDB URI is available
    if (!MONGODB_URI) {
      console.warn('⚠️ MONGODB_URI not found - database features will be disabled');
      throw new Error('MongoDB URI is not configured');
    }

    const cached = globalWithMongoose.mongoose!;

    // If we have a cached connection and it's connected, return it
    if (cached.conn && cached.conn.connection.readyState === 1) {
      return cached.conn;
    }

    // Clear connection if it's in a bad state
    if (cached.conn && (cached.conn.connection.readyState === 0 || cached.conn.connection.readyState === 3)) {
      cached.conn = null;
      cached.promise = null;
    }

    if (!cached.promise) {
      const opts = {
        // Modern MongoDB connection options
        bufferCommands: false, // Disable buffering to fail fast when not connected
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 10000,
        retryWrites: true,
        retryReads: true,
        maxIdleTimeMS: 30000,
        heartbeatFrequencyMS: 10000,
      };

      console.log('🔌 Attempting to connect to MongoDB...');
      
      cached.promise = mongoose.connect(MONGODB_URI, opts).then(async (mongooseInstance) => {
        console.log('✅ MongoDB connected successfully, readyState:', mongooseInstance.connection.readyState);
        return mongooseInstance;
      }).catch((error) => {
        console.error('❌ MongoDB connection failed:', error);
        cached.promise = null;
        cached.conn = null;
        throw error;
      }) as Promise<typeof mongoose>;
    }

    try {
      cached.conn = await cached.promise;
      
      // Verify the connection is ready
      if (cached.conn && cached.conn.connection.readyState === 1) {
        console.log('✅ MongoDB connection verified and ready for queries');
        return cached.conn;
      } else {
        console.error('❌ MongoDB connection not ready, readyState:', cached.conn?.connection.readyState);
        // Don't immediately null it out, give it another chance
        return cached.conn;
      }
    } catch (e) {
      cached.promise = null;
      cached.conn = null;
      console.error('❌ MongoDB connection error:', e);
      return null;
    }
  } catch (e) {
    console.error('❌ Top-level MongoDB error:', e);
    return null;
  }
}

export default dbConnect;

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

async function dbConnect() {
  try {
    // Check if MongoDB URI is available
    if (!MONGODB_URI) {
      console.warn('⚠️ MONGODB_URI not found - database features will be disabled');
      throw new Error('MongoDB URI is not configured');
    }

    const cached = globalWithMongoose.mongoose!;

    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000, // Increased for better connection reliability
        socketTimeoutMS: 45000,
        connectTimeoutMS: 15000, // Increased for production
        retryWrites: true,
        retryReads: true,
      };

      console.log('🔌 Attempting to connect to MongoDB...');
      
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        return mongoose;
      }).catch((error) => {
        console.error('❌ MongoDB connection failed:', error);
        cached.promise = null; // Reset promise on failure
        throw error;
      }) as Promise<typeof mongoose>;
    }

    try {
      cached.conn = await cached.promise;
      return cached.conn;
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

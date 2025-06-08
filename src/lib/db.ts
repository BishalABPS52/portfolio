import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
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
      return null;
    }

    const cached = globalWithMongoose.mongoose!;

    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 10000,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        return mongoose;
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

# MongoDB Setup Guide

This portfolio project includes MongoDB integration for storing and managing blog posts, projects, and other dynamic content.

## Quick Setup

1. **Copy the environment template:**
   ```bash
   cp .env.local.template .env.local
   ```

2. **Configure your MongoDB connection:**
   Edit `.env.local` and replace the placeholder with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/portfolio
   ```

   For MongoDB Atlas (cloud):
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

3. **Test the connection:**
   ```bash
   npm run test:db
   ```

## MongoDB Options

### Option 1: Local MongoDB
- Install MongoDB Community Edition
- Start MongoDB service: `sudo systemctl start mongod`
- Use connection string: `mongodb://localhost:27017/portfolio`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add your IP to network access
4. Create database user
5. Get connection string from "Connect" → "Connect your application"

### Option 3: Docker MongoDB
```bash
docker run --name mongodb -p 27017:27017 -d mongo:latest
```

## Database Structure

The application uses Mongoose with TypeScript for:
- **Blogs**: Blog posts and articles
- **Projects**: Portfolio projects
- **Designs**: Creative designs and artwork
- **Essays**: Written essays and thoughts
- **Quotes**: Inspirational quotes

## Files Overview

- `src/lib/db.ts` - Database connection with caching
- `src/lib/testdb.ts` - TypeScript connection test
- `scripts/test-db-connection.js` - Standalone connection test
- `src/models/` - Mongoose schemas for different content types

## Testing Connection

The project includes multiple ways to test your MongoDB connection:

1. **Using npm script (recommended):**
   ```bash
   npm run test:db
   ```

2. **Direct script execution:**
   ```bash
   node scripts/test-db-connection.js
   ```

3. **TypeScript test (requires ts-node):**
   ```bash
   npx ts-node src/lib/testdb.ts
   ```

## Troubleshooting

- **Connection timeout**: Check if MongoDB is running and accessible
- **Authentication failed**: Verify username/password in connection string
- **Network error**: For Atlas, check IP whitelist and network access
- **Module errors**: Ensure all dependencies are installed with `npm install`

## Environment Variables

Required in `.env.local`:
```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key_here
```

# MongoDB Setup for Portfolio Project

## Overview
This portfolio project includes MongoDB integration for dynamic content management (blogs, designs, essays, quotes). However, the application is designed to work gracefully without a database connection.

## Current Status
- ✅ Database connection code implemented
- ✅ API routes created for content management
- ✅ Graceful fallback when database is unavailable
- ⚠️ MongoDB connection not configured/active

## Quick Start (No Database Required)
The portfolio works perfectly without MongoDB. All static content is served from the `public/assets` directory:
- Games from `public/assets/games/`
- Images from `public/assets/images/`
- Certificates from `public/assets/certificates/`
- Static content files

## Database Setup Options

### Option 1: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `.env.local`:
   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB
1. Install MongoDB locally:
   ```bash
   # Ubuntu/Debian
   sudo apt-get install mongodb
   
   # macOS
   brew install mongodb/brew/mongodb-community
   
   # Windows
   # Download from https://www.mongodb.com/download-center/community
   ```

2. Start MongoDB service:
   ```bash
   # Ubuntu/Debian
   sudo systemctl start mongodb
   
   # macOS
   brew services start mongodb/brew/mongodb-community
   
   # Windows
   # Start MongoDB service from Services panel
   ```

3. Update `.env.local`:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/portfolio
   ```

## Testing Database Connection

```bash
# Test the connection
node scripts/test-db-connection.js
```

## API Endpoints
When database is connected, these endpoints become available:
- `GET /api/blogs` - Fetch all blogs
- `POST /api/blogs` - Create new blog
- `GET /api/designs` - Fetch all designs
- `POST /api/designs` - Create new design
- `GET /api/essays` - Fetch all essays
- `POST /api/essays` - Create new essay
- `GET /api/quotes` - Fetch all quotes
- `POST /api/quotes` - Create new quote

## Features Available Without Database
- ✅ Portfolio showcase
- ✅ Interactive games (QuizTime, Connect4, Alien Invasion)
- ✅ CV/Resume display
- ✅ Skills and experience cards
- ✅ Contact information
- ✅ GitHub projects integration
- ✅ Static content display

## Features Requiring Database
- 📝 Dynamic blog management
- 🎨 Design portfolio management
- ✍️ Essay collection management
- 💭 Quotes management
- 👤 Admin dashboard functionality

## Environment Variables
Create `.env.local` file in the project root:
```bash
# MongoDB Configuration (optional)
MONGODB_URI=your_mongodb_connection_string

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

## Notes
- The application gracefully handles database connection failures
- API routes return empty arrays when database is unavailable
- No functionality is broken if MongoDB is not configured
- Static content is always available regardless of database status
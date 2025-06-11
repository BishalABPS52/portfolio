#!/bin/bash

# Bishal Portfolio - Vercel Deployment Script
echo "🚀 Preparing Bishal Portfolio for Vercel Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if .env.local exists (should not be committed)
if [ -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local found. Make sure it's in .gitignore and not committed."
fi

# Verify Next.js build works
echo "🔨 Testing production build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready for deployment."
    echo ""
    echo "📋 Next Steps:"
    echo "1. Push your code to GitHub"
    echo "2. Import your repository to Vercel"
    echo "3. Set up environment variables in Vercel dashboard:"
    echo "   - MONGODB_URI (MongoDB Atlas connection string)"
    echo "   - ADMIN_PASSWORD (secure admin password)"
    echo "   - NODE_ENV=production"
    echo "4. Deploy!"
    echo ""
    echo "📖 For detailed instructions, see VERCEL_DEPLOYMENT.md"
else
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi

# Vercel Deployment Guide

## Prerequisites
1. Ensure you have a Vercel account (sign up at https://vercel.com)
2. Make sure your project is pushed to GitHub/GitLab/Bitbucket

## Step-by-Step Deployment

### 1. Install Vercel CLI
```bash
npm install -g vercel
# or use npx for one-time usage
npx vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Navigate to your project directory
```bash
cd /home/bishal-shrestha/MyProjects/bishal-portfolio
```

### 4. Initialize and deploy
```bash
# First deployment (will ask configuration questions)
vercel

# For subsequent deployments
vercel --prod
```

### 5. Configuration Questions (for first deployment)
When you run `vercel` for the first time, it will ask:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (for new project)
- **What's your project's name?** → bishal-portfolio (or your preferred name)
- **In which directory is your code located?** → ./ (current directory)
- **Want to override the settings?** → No (Next.js will be auto-detected)

### 6. Environment Variables Setup
After deployment, you need to add environment variables in Vercel dashboard:

1. Go to your project dashboard on vercel.com
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add the following variables:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-production-secret-key
```

### 7. Redeploy with Environment Variables
```bash
vercel --prod
```

## Alternative: GitHub Integration (Recommended)

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Connect GitHub to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings (auto-detected for Next.js)
5. Add environment variables
6. Deploy

### 3. Automatic Deployments
Once connected, every push to your main branch will trigger automatic deployment.

## Quick Commands Summary

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Navigate to project
cd /home/bishal-shrestha/MyProjects/bishal-portfolio

# Deploy
vercel

# Production deployment
vercel --prod

# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]
```

## Environment Variables for Production

Make sure to set these in Vercel dashboard:
- `MONGODB_URI` - Your MongoDB connection string (if using database)
- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - A secure random string for production

## Build Configuration

Your `next.config.js` should be optimized for production:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  images: {
    domains: ['your-domain.com'], // Add any external image domains
  },
};

module.exports = nextConfig;
```

## Troubleshooting

### Build Errors
- Check `npm run build` works locally
- Review build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`

### Environment Variables
- Double-check variable names match exactly
- Restart deployment after adding variables
- Use Vercel CLI: `vercel env pull` to sync variables locally

### Domain Issues
- Update `NEXTAUTH_URL` to match your Vercel domain
- Configure custom domain in Vercel dashboard if needed

## Post-Deployment Checklist

1. ✅ Test all pages load correctly
2. ✅ Verify games work properly
3. ✅ Check responsive design on mobile
4. ✅ Test API endpoints (if using database)
5. ✅ Verify theme switching works
6. ✅ Test contact forms and interactions
7. ✅ Check console for any errors

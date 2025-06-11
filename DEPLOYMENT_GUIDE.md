# Deployment Guide - Vercel

This guide will help you deploy your portfolio to Vercel with all necessary configurations.

## Prerequisites

1. **MongoDB Atlas Account** (Free tier available)
2. **Vercel Account** 
3. **GitHub Repository** (already set up)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account or log in
3. Create a new cluster:
   - Choose the free tier (M0 Sandbox)
   - Select a region close to your users
   - Name your cluster (e.g., "portfolio-cluster")

4. Set up database access:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a user with username/password authentication
   - Give it "Read and write to any database" permissions
   - **Save the username and password** - you'll need them for the connection string

5. Set up network access:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Choose "Allow access from anywhere" (0.0.0.0/0) for Vercel deployment
   - Confirm the change

6. Get your connection string:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string (it looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your actual password
   - Add your database name at the end: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/bishal-portfolio?retryWrites=true&w=majority`

## Step 2: Deploy to Vercel

1. **Connect GitHub Repository:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository: `BishalABPS52/portfolio`

2. **Configure Environment Variables:**
   - In the import process, you'll see "Environment Variables" section
   - Add these variables:

   ```
   MONGODB_URI = mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/bishal-portfolio?retryWrites=true&w=majority
   ADMIN_PASSWORD = admin123
   NODE_ENV = production
   ```

   **Note:** Replace the MongoDB URI with your actual connection string from Atlas.

3. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be available at `https://your-project-name.vercel.app`

## Step 3: Configure Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Add your custom domain if you have one
3. Follow Vercel's instructions to update your DNS settings

## Step 4: Verify Deployment

1. **Test the main site:**
   - Visit your deployed URL
   - Check that all sections load correctly
   - Test responsive design on mobile

2. **Test admin functionality:**
   - Go to `/admin` on your deployed site
   - Log in with your admin password
   - Test updating availability status
   - Verify changes are saved to MongoDB Atlas

## Environment Variables Summary

Make sure these are set in your Vercel project settings:

| Variable | Value | Description |
|----------|-------|-------------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | Database connection |
| `ADMIN_PASSWORD` | `admin123` (or your preferred password) | Admin panel access |
| `NODE_ENV` | `production` | Environment mode |

## Troubleshooting

### Build Errors
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation passes locally with `npm run build`

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check that your connection string is correct
- Ensure the database user has proper permissions

### Environment Variable Issues
- Go to Project Settings → Environment Variables in Vercel
- Ensure all variables are set for Production environment
- Redeploy after adding/changing environment variables

## Post-Deployment Security

1. **Change Admin Password:**
   - Consider using a stronger password for production
   - Update the `ADMIN_PASSWORD` environment variable in Vercel

2. **MongoDB Security:**
   - Consider restricting IP access to Vercel's IP ranges (advanced)
   - Regularly rotate database credentials

## Monitoring

- Monitor your Vercel dashboard for deployment status
- Check MongoDB Atlas for database usage and performance
- Set up alerts for any deployment failures

---

Your portfolio should now be live and accessible worldwide! 🚀

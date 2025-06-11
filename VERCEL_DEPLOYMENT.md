# Vercel Deployment Configuration

## Environment Variables Setup

When deploying to Vercel, you need to configure the following environment variables in your Vercel dashboard:

### Required Environment Variables:

1. **MONGODB_URI**
   - **Description**: MongoDB connection string for production
   - **Value**: `mongodb+srv://your-username:your-password@your-cluster.mongodb.net/bishal-portfolio?retryWrites=true&w=majority`
   - **Note**: Replace with your actual MongoDB Atlas connection string

2. **ADMIN_PASSWORD**
   - **Description**: Secure password for admin access
   - **Value**: Choose a strong, secure password
   - **Note**: Used for admin authentication

3. **NODE_ENV**
   - **Description**: Environment setting
   - **Value**: `production`

## MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account if you don't have one

2. **Create a New Cluster**
   - Create a new cluster (free tier is sufficient)
   - Choose a cloud provider and region

3. **Configure Network Access**
   - Add `0.0.0.0/0` to IP whitelist (for Vercel access)
   - Or add specific Vercel IP ranges if preferred

4. **Create Database User**
   - Create a database user with read/write permissions
   - Note down the username and password

5. **Get Connection String**
   - Go to your cluster and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `bishal-portfolio`

## Deployment Steps

1. **Connect GitHub Repository**
   - Import your GitHub repository to Vercel
   - Vercel will automatically detect it's a Next.js project

2. **Configure Environment Variables**
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add all the environment variables listed above

3. **Deploy**
   - Vercel will automatically build and deploy your application
   - The first deployment may take a few minutes

## Post-Deployment Checklist

- [ ] Verify the portfolio loads correctly
- [ ] Test all navigation links
- [ ] Verify admin dashboard access works
- [ ] Test contact form functionality
- [ ] Check mobile responsiveness
- [ ] Verify all animations work properly
- [ ] Test CV download functionality

## Domain Configuration (Optional)

If you want to use a custom domain:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel

## Security Notes

- Never commit `.env.local` or any file containing actual secrets
- Use strong passwords for admin access
- Regularly rotate database credentials
- Monitor your MongoDB Atlas usage

## Troubleshooting

### Common Issues:

1. **Database Connection Errors**
   - Verify MongoDB Atlas connection string
   - Check network access whitelist
   - Verify database user credentials

2. **Build Errors**
   - Check that all dependencies are listed in package.json
   - Verify TypeScript configuration
   - Check for any missing environment variables

3. **404 Errors**
   - Verify vercel.json configuration
   - Check that all routes are properly defined

## Support

For deployment issues:
- Check Vercel deployment logs
- Review function logs in Vercel dashboard
- Monitor MongoDB Atlas metrics

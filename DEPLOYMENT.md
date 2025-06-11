# 🚀 Vercel Deployment Guide

This guide will help you deploy your portfolio to Vercel successfully.

## Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **MongoDB Atlas**: Set up a MongoDB cluster at [mongodb.com/atlas](https://mongodb.com/atlas)

## Environment Variables

You need to set up the following environment variables in Vercel:

### Required Variables:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
NEXTAUTH_SECRET=your-random-secret-key-32-characters-min
NEXTAUTH_URL=https://your-domain.vercel.app
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

### How to Generate NEXTAUTH_SECRET:
```bash
# Run this in terminal to generate a secure secret
openssl rand -base64 32
```

## Deployment Steps

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your portfolio repository

### 2. Configure Project

1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: `./` (leave default)
3. **Build Command**: `npm run build` (auto-configured)
4. **Output Directory**: `.next` (auto-configured)

### 3. Environment Variables

In the Vercel dashboard:

1. Go to your project → Settings → Environment Variables
2. Add each variable from the list above
3. Make sure to add them for **Production**, **Preview**, and **Development**

### 4. MongoDB Setup

1. Create a MongoDB Atlas cluster
2. Create a database user
3. Whitelist Vercel's IP addresses (or use 0.0.0.0/0 for all IPs)
4. Get your connection string and add it to `MONGODB_URI`

### 5. Deploy

1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your site will be live at `https://your-project-name.vercel.app`

## Custom Domain (Optional)

1. Go to your project → Settings → Domains
2. Add your custom domain
3. Update DNS settings as instructed
4. Update `NEXTAUTH_URL` to your custom domain

## Troubleshooting

### Build Errors
- Check that all environment variables are set
- Ensure MongoDB connection string is correct
- Verify that all dependencies are installed

### Database Connection Issues
- Check MongoDB Atlas IP whitelist
- Verify database user permissions
- Test connection string locally first

### Admin Panel Issues
- Ensure `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set
- Check that `NEXTAUTH_SECRET` is properly configured
- Verify `NEXTAUTH_URL` matches your domain

## Performance Optimization

The portfolio is already optimized with:

- ✅ Static generation for most pages
- ✅ Image optimization
- ✅ Code splitting
- ✅ Bundle optimization
- ✅ CSS optimization

## Support

If you encounter issues:

1. Check Vercel function logs
2. Verify environment variables
3. Test locally with production build: `npm run build && npm start`

## Security Notes

- Never commit environment variables to Git
- Use strong passwords for admin access
- Regularly rotate your secrets
- Keep dependencies updated

---

**🎉 Your portfolio is now ready for production!**

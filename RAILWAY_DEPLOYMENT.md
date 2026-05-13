# Railway Deployment Guide for Orbit Task Management System

## Overview
This guide walks you through deploying the Orbit full-stack application to Railway with the frontend and backend running as a single service.

## Prerequisites
- Railway account (you're already logged in ✅)
- GitHub repository with your code (already set up ✅)
- Railway CLI (optional but recommended)

## Deployment Steps

### Step 1: Push Changes to GitHub
First, commit and push all the deployment changes to your repository:

```bash
git add .
git commit -m "Setup for Railway deployment"
git push origin main
```

### Step 2: Connect Your GitHub Repository to Railway

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Select your repository: `Orbit---TaskManagementSystem`
5. Choose the branch (usually `main`)
6. Railway will automatically detect it's a Node.js monorepo project

### Step 3: Configure Environment Variables

In the Railway Dashboard, go to the project and set these environment variables:

```
NODE_ENV=production
PORT=5000
JWT_SECRET=your_secure_jwt_secret_key_change_this
API_BASE_URL=https://your-app-name.railway.app
CORS_ORIGIN=https://your-app-name.railway.app
```

**Important**: Replace `your-secure-jwt-secret-key_change_this` with a strong random key!

### Step 4: Configure Build & Start Commands

In Railway's deployment settings:

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start`
- **Port**: `5000`

### Step 5: Deploy

1. Click **"Deploy"** in Railway
2. Wait for the build and deployment process (usually 5-10 minutes)
3. Once complete, Railway will provide you with a URL like: `https://orbit-app-xxxxx.railway.app`

## Project Structure for Railway

Your project is now configured as follows:

### Root Level
- `package.json` - Main project configuration
- `railway.json` - Railway-specific build config
- `Procfile` - Process file for Railway
- `.env.production` - Production environment template

### Build Process
1. **Install dependencies**: Root, client, and server packages
2. **Build client**: Vite builds React app to `client/dist`
3. **Build server**: TypeScript compiles to `server/dist`
4. **Start**: Node runs `server/dist/index.js`
5. **Server serves**: Frontend static files + API endpoints

### What Happens on Railway

1. ✅ Railway detects Node.js project
2. ✅ Runs `npm install` (installs root + client + server dependencies)
3. ✅ Runs `npm run build` (builds both client and server)
4. ✅ Runs `npm run start` (starts the Node.js server)
5. ✅ Server listens on PORT 5000
6. ✅ Frontend is served as static files
7. ✅ API routes work at `/api/*`

## Verifying Your Deployment

Once deployed:

1. Visit your Railway URL in a browser
2. You should see your Orbit application
3. Test login functionality
4. Check network tab in browser DevTools to ensure API calls are working

## Troubleshooting

### Build Fails
- Check that `npm run build` works locally first
- Ensure all dependencies are in `package.json` (not in `package-lock.json` only)
- Check Railway logs for specific errors

### Frontend Not Loading
- Verify `client/dist` is being created during build
- Check that static file serving is configured in server

### API Calls Failing
- Verify environment variables are set correctly
- Check that `API_BASE_URL` matches your Railway domain
- Ensure CORS settings are correct

### View Logs in Railway
```bash
railway logs --project=<project-id>
```

Or in the Railway Dashboard, click on your service to see live logs.

## Optional: Using Railway CLI

For faster deployments locally:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link project
railway link

# Deploy
railway up

# View logs
railway logs
```

## Next Steps

1. ✅ Commit changes to Git
2. ✅ Deploy via Railway Dashboard
3. ✅ Test the deployed application
4. ✅ Set up custom domain (optional in Railway settings)
5. ✅ Configure auto-deploy on push (Railway does this by default)

## Important Notes

- **Port Configuration**: Railway assigns a port dynamically. The `process.env.PORT` fallback is set to 5000 in your code, but Railway will override this with its own PORT environment variable.
- **Static Files**: The server automatically serves the React build as static files for all non-API routes.
- **Database**: If you add a database later (MongoDB, PostgreSQL, etc.), Railway can provision it directly in the dashboard.
- **API Base URL**: Update this when you get your Railway domain so your frontend knows where to call the API.

## Support

If you need help:
- Railway Docs: https://docs.railway.app/
- Check Railway Dashboard for build/deployment logs
- Review the project's GETTING_STARTED.md for local development info

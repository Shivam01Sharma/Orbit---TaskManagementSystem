# ✅ Railway Deployment - Final Fix Guide

## What Was Fixed

The build was failing because nested packages (client and server) weren't installing their own dependencies. Here's what I fixed:

### 1. **Client Build Command**
```json
"build": "npx tsc && npx vite build"
```
- Uses `npx` to explicitly find and run TypeScript and Vite from node_modules

### 2. **Root Build Scripts**
```json
"build:client": "cd client && npm ci --legacy-peer-deps && npm run build",
"build:server": "cd server && npm ci --legacy-peer-deps && npm run build"
```
- Each subdirectory now explicitly installs its own dependencies before building

### 3. **Railway Build Script** (`build.sh`)
- Ensures each package installs dependencies sequentially
- Guarantees proper build order

### 4. **Railway Configuration** (`.railway.yml`)
```yaml
buildCommand: bash build.sh
```
- Uses the explicit build script instead of relying on npm

---

## 🚀 Deployment Steps

### Step 1: Test Locally (Optional but Recommended)
```bash
# From project root
bash build.sh
npm run start
```
Visit `http://localhost:5000` to verify the app works.

### Step 2: Commit & Push Changes
```bash
git add .
git commit -m "Final fix: Monorepo build configuration for Railway deployment"
git push
```

### Step 3: Deploy on Railway

**Option A: Via Railway Dashboard**
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click on your existing project (Orbit)
3. Click **"Redeploy"** button
4. Wait for the build to complete (should take 5-10 minutes)
5. Once deployed, Railway will show your application URL

**Option B: Via Railway CLI**
```bash
npm install -g @railway/cli
railway login
railway link
railway up
```

### Step 4: Set Environment Variables

In Railway Dashboard, go to your project and set these variables:

```
NODE_ENV=production
JWT_SECRET=your-secure-secret-key-change-me
API_BASE_URL=https://your-railway-domain.railway.app
CORS_ORIGIN=https://your-railway-domain.railway.app
```

---

## 📋 Build Process Explained

When you deploy to Railway, here's what happens:

1. **Initialization** - Railway detects Node.js project
2. **Root Dependencies** - `npm ci` installs root packages
3. **Client Build**:
   - Installs client dependencies: `npm ci --legacy-peer-deps`
   - Runs `npm run build` → `npx tsc && npx vite build`
   - Outputs to `client/dist/`
4. **Server Build**:
   - Installs server dependencies: `npm ci --legacy-peer-deps`
   - Runs `npm run build` → `npx tsc`
   - Compiles TypeScript to `server/dist/`
5. **Start Server** - Runs `npm run start` → `node server/dist/index.js`
6. **Server serves**:
   - Frontend as static files from `client/dist/`
   - API routes at `/api/*`

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] App loads in browser (no blank page)
- [ ] Frontend UI is visible
- [ ] Network tab shows API calls to `/api/*`
- [ ] Login functionality works
- [ ] No 404 errors in console
- [ ] No CORS errors

---

## 🐛 Troubleshooting

### Build Still Fails
1. **Check Railway Logs**: 
   - In Railway Dashboard, click on your service → Logs
   - Look for specific error messages

2. **Verify Lock Files**:
   ```bash
   # Delete lock files and regenerate
   rm package-lock.json
   rm client/package-lock.json
   rm server/package-lock.json
   npm install
   cd client && npm install
   cd ../server && npm install
   git add .
   git commit -m "Update lock files"
   git push
   ```

3. **Check Port Configuration**:
   - Server uses `process.env.PORT || 5000`
   - Railway should automatically set PORT variable

### Frontend Not Loading
- Verify `client/dist/` is created (check in `/app/` during build)
- Check that server is serving static files correctly
- Look for 404 errors for static assets

### API Calls Failing  
- Verify `API_BASE_URL` matches your Railway domain
- Check CORS_ORIGIN in environment variables
- Ensure API routes start with `/api/`

### tsc or vite Not Found
- This should now be fixed with `npx` commands
- If still failing, check that `typescript` and `vite` are in `client/package.json` dependencies
- Check that `@types/*` packages are also in dependencies

---

## 📝 File Changes Summary

| File | Change |
|------|--------|
| `client/package.json` | Build command uses `npx tsc && npx vite build` |
| `package.json` | Build scripts install nested dependencies |
| `.railway.yml` | Uses `bash build.sh` for building |
| `build.sh` | NEW - Explicit monorepo build script |

---

## 🔗 Useful Links

- **Railway Dashboard**: https://railway.app/dashboard
- **Railway Docs**: https://docs.railway.app/
- **View Logs**: Click service in dashboard → Logs tab
- **Environment Variables**: Settings → Variables

---

## 💡 Next Steps

1. **Deploy and test** - Follow steps above
2. **Monitor logs** - Watch Railway logs for any issues
3. **Update API URL** - Update `API_BASE_URL` after getting Railway domain
4. **Custom domain** (optional) - Configure in Railway Settings
5. **Auto-deploy** - Railway auto-deploys on git push (by default)

---

## ✨ You're All Set!

Your application should now deploy successfully on Railway. The monorepo structure is properly configured to:
- ✅ Install all dependencies
- ✅ Build client and server separately
- ✅ Serve frontend + backend from single service
- ✅ Handle production environment correctly

If you hit any issues, check the Railway logs and reference this guide!

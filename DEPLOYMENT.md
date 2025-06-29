# 🚀 ChromaStudio Deployment Guide

## Vercel Deployment

### Quick Deploy
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project or create new
   - Confirm build settings
   - Deploy!

### Manual Deployment
1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

## Environment Variables
No environment variables required for basic functionality.

## Build Configuration
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node Version:** 18.x (recommended)

## Local Testing
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting
- Ensure all dependencies are installed
- Check that Node.js version is 16+ 
- Verify build output in `dist/` directory
- Check Vercel deployment logs for errors 
# GitHub Pages Deployment Guide

This guide explains how to deploy the Verinizer web application to GitHub Pages.

## Repository Setup

Your repository should be named `verenizerwebapp2` as configured in the build settings.

## Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the `main` branch.

### Setup Steps:

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/verenizerwebapp2.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Scroll down to **Pages** section
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically run and deploy your site

3. **Access your deployed site:**
   - Your site will be available at: `https://YOUR_USERNAME.github.io/verenizerwebapp2/`
   - It may take a few minutes for the first deployment to complete

## Manual Deployment

If you prefer to deploy manually:

1. **Build the application:**
   ```bash
   npm install
   npm run build:github
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   # Install gh-pages if you haven't already
   npm install -g gh-pages
   
   # Deploy the dist folder to gh-pages branch
   gh-pages -d dist
   ```

## Local Testing with GitHub Pages Base Path

To test how your application will work on GitHub Pages locally:

```bash
npm run preview:github
```

This will serve your built application with the correct base path (`/verenizerwebapp2/`).

## Configuration Details

The application is configured for GitHub Pages deployment with:

- **Base Path**: `/verenizerwebapp2/` (set in `vite.config.ts`)
- **Build Output**: `dist` folder
- **Asset Handling**: All assets are properly prefixed with the base path
- **Routing**: Client-side routing works with the GitHub Pages subdirectory structure

## Troubleshooting

### Common Issues:

1. **404 errors on page refresh:**
   - This is expected behavior for SPAs on GitHub Pages
   - Users should navigate using the application's internal navigation

2. **Assets not loading:**
   - Ensure all asset references use relative paths
   - The build process automatically handles asset path prefixing

3. **Build fails:**
   - Check that all dependencies are installed: `npm install`
   - Ensure TypeScript compilation passes: `npm run build`

4. **GitHub Actions workflow fails:**
   - Check the Actions tab in your GitHub repository for error details
   - Ensure your repository has Pages enabled in Settings

### Manual Verification:

You can manually verify the build works correctly:

```bash
# Build for production
npm run build:github

# Check the dist folder
ls -la dist/

# Test locally with correct base path
npm run preview:github
```

## Environment Variables

The application automatically detects the deployment environment:
- **Development**: Base path is `/`
- **Production**: Base path is `/verenizerwebapp2/`

## Security Considerations

- The application includes a `.nojekyll` file to prevent Jekyll processing
- All sensitive data should be handled client-side only
- VirusTotal API calls are made directly from the browser (as designed)

## Updates and Maintenance

To update your deployed application:

1. Make changes to your code
2. Commit and push to the `main` branch
3. GitHub Actions will automatically rebuild and redeploy

The deployment typically takes 2-5 minutes to complete.
# Commercetools Merchant Center Custom App Integration Guide

## Overview
This guide walks you through deploying the EasyPost Shipments custom app to Netlify and registering it in Commercetools Merchant Center.

## Prerequisites
- Netlify account
- Commercetools account with API credentials
- EasyPost API key
- GitHub repository containing this code

## Step 1: Prepare Environment Variables

Before deploying, you need to add your API keys:

1. **Get your EasyPost API Key**
   - Log in to https://www.easypost.com/
   - Go to Account Settings → API Keys
   - Copy your test or production API key

2. **Get Commercetools API Credentials**
   - Log in to Commercetools Merchant Center
   - Go to Settings → Developer Settings
   - Create a new API client
   - Note down: Project Key, Client ID, Client Secret

## Step 2: Deploy to Netlify

### Option A: Deploy via GitHub (Recommended)

1. **Push code to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial custom app"
   git push origin main
   \`\`\`

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Select GitHub and authorize
   - Select your repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
     - **Node version**: 18.x or higher

3. **Add Environment Variables**
   - In Netlify: Settings → Environment variables
   - Add the following:
     \`\`\`
     EASYPOST_API_KEY=your_easypost_api_key
     CTP_PROJECT_KEY=your_commercetools_project_key
     CTP_CLIENT_ID=your_commercetools_client_id
     CTP_CLIENT_SECRET=your_commercetools_client_secret
     \`\`\`

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Copy your Netlify URL (e.g., `https://your-app.netlify.app`)

### Option B: Deploy via Netlify CLI

\`\`\`bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=.next
\`\`\`

## Step 3: Register Custom App in Commercetools

Once deployed to Netlify, register your app:

1. **Log in to Commercetools Merchant Center**
   - Go to your project
   - Navigate to Settings → Custom Applications

2. **Create New Custom Application**
   - Click "Create new application"
   - Fill in the form:
     - **Application Name**: "EasyPost Shipments"
     - **Application URL**: `https://your-app.netlify.app`
     - **Entrypoint URI Path**: `shipments` (must match custom-application-config.json)

3. **Configure Application**
   - Set status to "Ready"
   - Grant required permissions:
     - Orders (Read)
     - Shipments (if available)
   - Save configuration

## Step 4: Install in Merchant Center

1. **Access the Custom Applications Catalog**
   - Go to Merchant Center
   - Settings → Custom Applications

2. **Find and Install Your App**
   - Look for "EasyPost Shipments" in the list
   - Click "Install"
   - Accept permissions
   - The app will now appear in your left navigation menu

## Step 5: Verify Installation

1. **Check Left Navigation Menu**
   - You should see "Shipments" as a new menu item
   - Click it to open your custom app

2. **Test the App**
   - The app should load and display shipments
   - Verify EasyPost data is loading correctly

## Troubleshooting

### 404 Error When Clicking Menu Item

**Cause**: App not registered or deployed URL is incorrect

**Solution**:
1. Verify Netlify deployment is successful (check https://your-app.netlify.app)
2. Confirm the registered URL matches your Netlify URL exactly
3. Clear Merchant Center cache: Press Ctrl+Shift+Delete and reload

### App Shows Blank Page

**Cause**: Environment variables not set

**Solution**:
1. Check Netlify environment variables are correctly set
2. Redeploy after adding variables
3. Check browser console (F12) for errors

### EasyPost Data Not Loading

**Cause**: Missing or invalid EasyPost API key

**Solution**:
1. Verify EASYPOST_API_KEY is set in Netlify
2. Test API key in EasyPost dashboard
3. Check browser console for API error messages

### Authorization Issues

**Cause**: Commercetools API credentials incorrect

**Solution**:
1. Verify credentials in Netlify environment variables
2. Ensure API client has required scopes
3. Check that API client is not expired

## Important Notes

- The app is scoped to your Commercetools project only
- Each project requires separate registration
- Environment variables must be set before deployment
- Updates to custom-application-config.json require redeployment

## Support

For issues:
1. Check browser console (F12) for error messages
2. Review Netlify build logs
3. Verify all environment variables are set
4. Ensure Commercetools API credentials are valid

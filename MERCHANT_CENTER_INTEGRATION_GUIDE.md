# Commercetools Merchant Center Custom App Integration Guide

## Overview
This guide walks you through deploying the EasyPost Shipments custom app to Commercetools Merchant Center and integrating it into the left navigation menu.

## Prerequisites
- A Commercetools project set up
- Access to Commercetools Merchant Center (Admin)
- An EasyPost API key
- Netlify account for deployment

## Step 1: Deploy App to Netlify

### 1.1 Connect GitHub Repository
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`

### 1.2 Set Environment Variables
In Netlify Site Settings → Environment:
\`\`\`
EASYPOST_API_KEY=your_easypost_api_key_here
\`\`\`

### 1.3 Get Your Deployment URL
After deployment completes, your app will be available at:
\`\`\`
https://your-app-name.netlify.app
\`\`\`

## Step 2: Register Custom App in Commercetools Merchant Center

### 2.1 Access Merchant Center Settings
1. Log into [Commercetools Merchant Center](https://mc.commercetools.com)
2. Navigate to **Settings** → **Integrations** (or **Custom Applications** depending on your version)
3. Click **Add Custom Application**

### 2.2 Create New Custom Application
Fill in the following details:

| Field | Value |
|-------|-------|
| **Application Name** | EasyPost Shipments |
| **Application ID** | easypost-shipments |
| **Application URL** | `https://your-app-name.netlify.app` |
| **Redirect URIs** | `https://your-app-name.netlify.app` |
| **Entry Point URI Path** | `shipments` |

### 2.3 Configure Permissions
Under **Permissions**, select scopes needed:
- `view:products` (to read product info if needed)
- `view:orders` (to access order/shipment data)
- `manage:products` (if app needs to update shipment data)

### 2.4 Set Application to "Ready"
After configuration, change the status from "Draft" to "Ready". This enables the app to be installed.

## Step 3: Install Custom App in Your Merchant Center Project

### 3.1 Install the App
1. In Merchant Center, go to **Settings** → **Installed Applications**
2. Find your registered custom app "EasyPost Shipments"
3. Click **Install**
4. Grant the requested permissions
5. The app will now appear in the **left navigation menu** under "Shipments"

### 3.2 Verify Navigation
Check the left sidebar in your Merchant Center—you should see:
\`\`\`
PRODUCTS
├── All Products
├── Search
...
ADDITIONAL FEATURES
├── Shipments  ← Your Custom App
\`\`\`

## Step 4: Connect to Your Commercetools Project

### 4.1 Create API Credentials
1. In Merchant Center, go to **Settings** → **Developer settings**
2. Click **Create new API client**
3. Name it: `EasyPost-App`
4. Grant scopes:
   - `view:products`
   - `manage:products`
   - `view:orders`
   - `manage:orders`
5. Copy and save the credentials:
   - Client ID
   - Client Secret
   - Project Key

### 4.2 Update App Environment (Optional)
If you need to access Commercetools API from your backend:
\`\`\`bash
# In Netlify environment variables, add:
CTP_PROJECT_KEY=your_project_key
CTP_CLIENT_ID=your_client_id
CTP_CLIENT_SECRET=your_client_secret
\`\`\`

## Step 5: Test the Integration

### 5.1 Access Your Custom App
1. Go to your Commercetools Merchant Center
2. Click **Shipments** in the left navigation menu
3. The custom app should load within the Merchant Center iframe
4. Test fetching shipments from EasyPost

### 5.2 Verify Data Flow
- Check that shipment data loads correctly
- Verify tracking IDs are displayed
- Test any interactive features

## Troubleshooting

### App Not Appearing in Navigation
- Verify app status is "Ready" in Settings
- Check that app is installed in Installed Applications
- Refresh Merchant Center page (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for CORS errors

### Shipment Data Not Loading
- Verify `EASYPOST_API_KEY` is set in Netlify environment
- Check network tab in browser DevTools
- Ensure API route `/api/shipments` is deployed
- Verify EasyPost API key has proper permissions

### CORS Issues
- Make sure Netlify deployment URL is whitelisted in Commercetools settings
- Check that API routes accept requests from Merchant Center origin
- Verify the custom app is loaded from the registered URL

### App Not Embedded Properly
- Ensure your app responds correctly to being embedded in an iframe
- Check that all links are relative or use the parent origin
- Verify no CSP headers block iframe embedding

## Configuration Reference

### custom-application-config.json
\`\`\`json
{
  "name": "EasyPost Shipments",
  "description": "Custom app to view shipments and tracking IDs from EasyPost",
  "entryPointUriPath": "shipments",
  "cloudIdentifier": "aws-eu",
  "icon": "ShoppingBasket",
  "mainMenuLink": {
    "defaultLabel": "Shipments",
    "labelAllLocales": []
  },
  "submenuLinks": []
}
\`\`\`

**Key Properties:**
- `entryPointUriPath`: The URL path where your app is accessible
- `mainMenuLink.defaultLabel`: Text that appears in left navigation
- `icon`: Icon name from Commercetools icon set
- `cloudIdentifier`: Your cloud region (aws-eu, aws-us, gcp-eu, gcp-us)

## Next Steps

1. **Customize Styling** - Match your brand colors to Merchant Center theme
2. **Add More Features** - Expand app functionality (export shipments, bulk actions, etc.)
3. **Add Submenu Links** - Configure `submenuLinks` in config for nested navigation
4. **Set Up Webhooks** - Listen for Commercetools events to sync data in real-time

## Resources

- [Commercetools Custom Apps Docs](https://docs.commercetools.com/merchant-center-customization)
- [Merchant Center Application Kit](https://docs.commercetools.com/sdk/merchant-center-sdk)
- [EasyPost API Reference](https://www.easypost.com/docs/api)

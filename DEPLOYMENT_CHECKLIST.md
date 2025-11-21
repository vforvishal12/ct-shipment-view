# Deployment Checklist

Before deploying to Netlify and integrating with Commercetools, verify:

## Pre-Deployment
- [ ] EasyPost API key obtained from https://www.easypost.com/
- [ ] Commercetools API client created in Settings → Developer Settings
- [ ] GitHub repository created and code pushed
- [ ] Netlify account created at https://app.netlify.com

## Deployment Configuration
- [ ] `custom-application-config.json` verified (entryPointUriPath = "shipments")
- [ ] `netlify.toml` configured correctly
- [ ] Environment variables prepared:
  - [ ] EASYPOST_API_KEY
  - [ ] CTP_PROJECT_KEY
  - [ ] CTP_CLIENT_ID
  - [ ] CTP_CLIENT_SECRET

## Netlify Deployment
- [ ] GitHub repository connected to Netlify
- [ ] Build settings configured (npm run build, .next directory)
- [ ] Environment variables added to Netlify
- [ ] Deployment successful (no build errors)
- [ ] Netlify URL accessible and app loads

## Commercetools Registration
- [ ] Logged into Commercetools Merchant Center
- [ ] Went to Settings → Custom Applications
- [ ] Created new custom application with correct URL
- [ ] Set status to "Ready"
- [ ] Installed app in project

## Post-Installation
- [ ] "Shipments" appears in left navigation menu
- [ ] App loads when clicked
- [ ] EasyPost shipments display correctly
- [ ] No console errors (check F12)

## Troubleshooting
- [ ] Cleared browser cache
- [ ] Verified all environment variables
- [ ] Checked Netlify deployment logs
- [ ] Tested Commercetools API credentials

# EasyPost Shipments - Commercetools Custom App

A custom application for the Commercetools Merchant Center that displays shipments and tracking IDs from EasyPost.

## Features

- View all shipments with tracking information
- Real-time tracking status updates
- Detailed shipment information modal
- Auto-refresh every 5 minutes
- Responsive design
- Deployed on Netlify

## Prerequisites

- Commercetools account and API credentials
- EasyPost API key
- Node.js 18+
- npm or yarn

## Setup

1. Clone this repository
2. Install dependencies: `npm install`
3. Create environment variables (see `.env.example`)
4. Deploy to Netlify

### Environment Variables

Set the following in your Netlify project settings:

- `EASYPOST_API_KEY`: Your EasyPost API key

## Deployment to Netlify

1. Connect your GitHub repository to Netlify
2. Set up environment variables in Netlify dashboard
3. Deploy: Netlify will automatically run `npm run build` and deploy

## Integrating with Commercetools Merchant Center

After deploying to Netlify:

1. Go to your Commercetools project settings
2. Add the custom app URL from your Netlify deployment
3. The app will appear as "Shipments" in the left navigation menu

## Development

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm run serve    # Serve production build locally
\`\`\`

## API Documentation

### GET /api/shipments

Returns a list of all shipments with tracking information from EasyPost.

**Response:**
\`\`\`json
{
  "shipments": [
    {
      "id": "tracker_123",
      "trackingCode": "123456789",
      "carrier": "USPS",
      "status": "in_transit",
      "carrier_tracking_no": "123456789",
      "last_location": {
        "city": "New York",
        "state": "NY",
        "country": "US"
      },
      "updated_at": "2024-11-21T10:30:00Z"
    }
  ]
}
\`\`\`

## Support

For issues or questions, please contact support or check the Commercetools documentation.

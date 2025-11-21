// EasyPost API service - this runs on your backend (Node.js)
// Make sure to set EASYPOST_API_KEY in your Netlify environment variables

interface EasyPostTracker {
  id: string
  tracking_code: string
  carrier: string
  status: string
  carrier_tracking_no?: string
  last_location?: {
    city: string
    state: string
    country: string
    zip: string
  }
  updated_at: string
  est_delivery_date?: string
}

const EASYPOST_API_BASE = "https://api.easypost.com/v2"

export async function getEasyPostTrackers(): Promise<EasyPostTracker[]> {
  const apiKey = process.env.EASYPOST_API_KEY

  if (!apiKey) {
    throw new Error("EASYPOST_API_KEY environment variable is not set")
  }

  try {
    const response = await fetch(`${EASYPOST_API_BASE}/trackers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`EasyPost API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.trackers || []
  } catch (error) {
    console.error("Error fetching trackers from EasyPost:", error)
    throw error
  }
}

export async function getTrackerDetails(trackerId: string): Promise<EasyPostTracker> {
  const apiKey = process.env.EASYPOST_API_KEY

  if (!apiKey) {
    throw new Error("EASYPOST_API_KEY environment variable is not set")
  }

  try {
    const response = await fetch(`${EASYPOST_API_BASE}/trackers/${trackerId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`EasyPost API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching tracker details from EasyPost:", error)
    throw error
  }
}

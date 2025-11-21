import { type NextRequest, NextResponse } from "next/server"

const EASYPOST_API_BASE = "https://api.easypost.com/v2"

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.EASYPOST_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "EASYPOST_API_KEY is not configured" }, { status: 500 })
    }

    // Fetch trackers from EasyPost
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
    const trackers = data.trackers || []

    // Transform EasyPost trackers to our Shipment format
    const shipments = trackers.map((tracker: any) => ({
      id: tracker.id,
      trackingCode: tracker.tracking_code,
      carrier: tracker.carrier,
      status: tracker.status,
      carrier_tracking_no: tracker.carrier_tracking_no,
      last_location: tracker.last_location,
      updated_at: tracker.updated_at,
      est_delivery_date: tracker.est_delivery_date,
    }))

    return NextResponse.json({ shipments })
  } catch (error) {
    console.error("Error in shipments API:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch shipments",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Shipment {
  id: string
  trackingCode: string
  carrier: string
  status: string
  carrier_tracking_no: string
  last_location?: {
    city: string
    state: string
    country: string
  }
  updated_at: string
}

interface ShipmentContextType {
  shipments: Shipment[]
  loading: boolean
  error: string | null
  refreshShipments: () => Promise<void>
}

const ShipmentContext = createContext<ShipmentContextType | undefined>(undefined)

export function ShipmentProvider({ children }: { children: React.ReactNode }) {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchShipments = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/shipments")
      if (!response.ok) {
        throw new Error("Failed to fetch shipments")
      }
      const data = await response.json()
      setShipments(data.shipments || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error fetching shipments:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShipments()
    // Refresh every 5 minutes
    const interval = setInterval(fetchShipments, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ShipmentContext.Provider value={{ shipments, loading, error, refreshShipments: fetchShipments }}>
      {children}
    </ShipmentContext.Provider>
  )
}

export function useShipments() {
  const context = useContext(ShipmentContext)
  if (!context) {
    throw new Error("useShipments must be used within ShipmentProvider")
  }
  return context
}

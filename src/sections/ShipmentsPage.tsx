"use client"

import { useState } from "react"
import { useShipments } from "@/src/context/ShipmentContext"
import ShipmentList from "@/src/components/ShipmentList"
import ShipmentDetailModal from "@/src/components/ShipmentDetailModal"

export default function ShipmentsPage() {
  const { shipments, loading, error, refreshShipments } = useShipments()
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null)

  const currentShipment = shipments.find((s) => s.id === selectedShipment)

  return (
    <div className="shipments-page">
      <header className="page-header">
        <div className="header-content">
          <h1>Shipments & Tracking</h1>
          <p className="description">View all shipments and tracking information from EasyPost</p>
        </div>
        <button className="refresh-btn" onClick={refreshShipments} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </header>

      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button onClick={refreshShipments}>Retry</button>
        </div>
      )}

      <ShipmentList shipments={shipments} loading={loading} onSelectShipment={setSelectedShipment} />

      {selectedShipment && currentShipment && (
        <ShipmentDetailModal shipment={currentShipment} onClose={() => setSelectedShipment(null)} />
      )}
    </div>
  )
}

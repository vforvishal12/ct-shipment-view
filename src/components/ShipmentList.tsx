"use client"
import type { Shipment } from "@/src/context/ShipmentContext"

interface ShipmentListProps {
  shipments: Shipment[]
  loading: boolean
  onSelectShipment: (id: string) => void
}

export default function ShipmentList({ shipments, loading, onSelectShipment }: ShipmentListProps) {
  if (loading && shipments.length === 0) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading shipments...</p>
      </div>
    )
  }

  if (shipments.length === 0) {
    return (
      <div className="empty-state">
        <p>No shipments found</p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      delivered: "status-delivered",
      in_transit: "status-in-transit",
      out_for_delivery: "status-out-for-delivery",
      exception: "status-exception",
      returned: "status-returned",
    }
    return statusMap[status?.toLowerCase()] || "status-unknown"
  }

  return (
    <div className="shipment-list">
      <div className="list-header">
        <div className="col col-tracking">Tracking ID</div>
        <div className="col col-carrier">Carrier</div>
        <div className="col col-status">Status</div>
        <div className="col col-location">Last Location</div>
        <div className="col col-updated">Updated</div>
      </div>

      <div className="list-body">
        {shipments.map((shipment) => (
          <div key={shipment.id} className="list-row" onClick={() => onSelectShipment(shipment.id)}>
            <div className="col col-tracking">
              <code>{shipment.trackingCode || shipment.carrier_tracking_no}</code>
            </div>
            <div className="col col-carrier">
              <span className="carrier-badge">{shipment.carrier}</span>
            </div>
            <div className="col col-status">
              <span className={`status-badge ${getStatusColor(shipment.status)}`}>{shipment.status || "Unknown"}</span>
            </div>
            <div className="col col-location">
              {shipment.last_location ? (
                <span>
                  {shipment.last_location.city}, {shipment.last_location.state}
                </span>
              ) : (
                <span className="no-data">—</span>
              )}
            </div>
            <div className="col col-updated">
              <span className="timestamp">{new Date(shipment.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

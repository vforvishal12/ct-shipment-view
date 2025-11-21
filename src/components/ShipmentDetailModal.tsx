"use client"
import type { Shipment } from "@/src/context/ShipmentContext"

interface ShipmentDetailModalProps {
  shipment: Shipment
  onClose: () => void
}

export default function ShipmentDetailModal({ shipment, onClose }: ShipmentDetailModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Shipment Details</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-section">
            <h3>Tracking Information</h3>
            <div className="detail-row">
              <span className="label">Tracking Code:</span>
              <code>{shipment.trackingCode || shipment.carrier_tracking_no}</code>
            </div>
            <div className="detail-row">
              <span className="label">Carrier:</span>
              <span>{shipment.carrier}</span>
            </div>
            <div className="detail-row">
              <span className="label">Status:</span>
              <span className="status-value">{shipment.status || "Unknown"}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>Location</h3>
            {shipment.last_location ? (
              <>
                <div className="detail-row">
                  <span className="label">City:</span>
                  <span>{shipment.last_location.city}</span>
                </div>
                <div className="detail-row">
                  <span className="label">State:</span>
                  <span>{shipment.last_location.state}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Country:</span>
                  <span>{shipment.last_location.country}</span>
                </div>
              </>
            ) : (
              <p className="no-data">Location information not available</p>
            )}
          </div>

          <div className="detail-section">
            <h3>Last Updated</h3>
            <p>{new Date(shipment.updated_at).toLocaleString()}</p>
          </div>

          <div className="modal-actions">
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

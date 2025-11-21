import "./App.css"
import ShipmentsPage from "./pages/ShipmentsPage"
import { ShipmentProvider } from "./context/ShipmentContext"

export default function App() {
  return (
    <ShipmentProvider>
      <div className="app-container">
        <ShipmentsPage />
      </div>
    </ShipmentProvider>
  )
}

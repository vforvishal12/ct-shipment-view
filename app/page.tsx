"use client"

import { ShipmentProvider } from "@/src/context/ShipmentContext"
import ShipmentsPage from "@/src/sections/ShipmentsPage"
import "@/src/styles/app.css"

export default function Page() {
  return (
    <ShipmentProvider>
      <ShipmentsPage />
    </ShipmentProvider>
  )
}

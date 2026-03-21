import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Package,
  Truck,
  MapPin,
  CheckCircle,
  AlertCircle
} from "lucide-react"

const API =  "https://skiesx-backend-1.onrender.com"

/* STATUS COLORS */

const STATUS_COLORS = {
  "Shipment Information Received": "bg-gray-400",
  "Package Received at Facility": "bg-blue-500",
  "Processing at Origin Facility": "bg-blue-600",
  "Departed Origin Facility": "bg-indigo-500",
  "In Transit": "bg-purple-600",
  "Arrived at Destination Facility": "bg-cyan-600",
  "Customs Clearance in Progress": "bg-orange-500",
  "Customs Cleared": "bg-teal-600",
  "Out for Delivery": "bg-green-500",
  "Delivery Attempted": "bg-yellow-500",
  "Delivered": "bg-green-700",
  "Delivery Exception": "bg-red-500",
  "Shipment On Hold": "bg-red-600",
  "Shipment Cancelled": "bg-red-800"
}

/* STATUS ICONS */

function getIcon(status = "") {

  if (status.includes("Transit") || status.includes("Departed"))
    return <Truck size={18} />

  if (status.includes("Delivered"))
    return <CheckCircle size={18} />

  if (status.includes("Exception") || status.includes("Hold"))
    return <AlertCircle size={18} />

  return <Package size={18} />
}

function formatTime(dateString) {

  if (!dateString) return "Time unavailable"

  const date = new Date(dateString)

  if (isNaN(date.getTime())) return "Invalid time"

  return date.toLocaleString()
}

function TrackingHistory({ trackingNumber }) {

  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    if (!trackingNumber) return

    const fetchHistory = async () => {

      try {

        setLoading(true)

        const res = await fetch(
          `${API}/track/${trackingNumber}/history`
        )

        if (res.status === 404) {
          setHistory([])
          return
        }

        if (!res.ok) throw new Error("History fetch failed")

        const data = await res.json()

        setHistory(data)

      } catch (err) {

        console.error("Tracking history error:", err)
        setHistory([])

      } finally {

        setLoading(false)

      }

    }

    fetchHistory()

  }, [trackingNumber])

  if (!trackingNumber) return null

  if (loading) {
    return (
      <p className="text-gray-500 mt-6">
        Loading tracking history…
      </p>
    )
  }

  return (

    <div className="mt-10">

      <h3 className="text-lg font-semibold mb-6">
        Shipment Progress
      </h3>

      {history.length === 0 ? (

        <div className="text-gray-500 bg-gray-50 border rounded-lg p-4">
          Shipment created. Awaiting first tracking update.
        </div>

      ) : (

        <div className="relative border-l-2 border-gray-200 pl-6">

          {history.map((item, index) => {

            const status = item.status || "Unknown"

            const color =
              STATUS_COLORS[status] || "bg-gray-400"

            const isLatest = index === 0

            return (

              <motion.div
                key={item.id_number || index}
                className="mb-8 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1
                }}
              >

                {/* Timeline dot */}

                <div
                  className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full flex items-center justify-center text-white ${color}`}
                >
                  {getIcon(status)}
                </div>

                {/* Card */}

                <div
                  className={`ml-4 rounded-lg border p-4 shadow-sm bg-white ${
                    isLatest
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >

                  {/* Status */}

                  <div className="flex items-center gap-3 mb-1">

                    <span
                      className={`text-xs text-white px-2 py-1 rounded ${color}`}
                    >
                      {status}
                    </span>

                    {isLatest && (
                      <span className="text-xs text-blue-600 font-medium">
                        Latest Update
                      </span>
                    )}

                  </div>

                  {/* Location */}

                  <div className="flex items-center gap-2 text-sm text-gray-700">

                    <MapPin size={14} />

                    {item.location || "Location unavailable"}

                  </div>

                  {/* Time */}

                  <p className="text-xs text-gray-400 mt-2">

                    {formatTime(item.updated_at)}

                  </p>

                </div>

              </motion.div>

            )

          })}

        </div>

      )}

    </div>

  )

}

export default TrackingHistory
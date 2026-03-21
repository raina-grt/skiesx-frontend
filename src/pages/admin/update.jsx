import { useState } from "react"
import { ADMIN_KEY } from "../../config/admin"

/* ---------------- PROFESSIONAL STATUS LIST ---------------- */

const STATUSES = [
  "Shipment Information Received",
  "Package Received at Facility",
  "Processing at Origin Facility",
  "Departed Origin Facility",
  "In Transit",
  "Arrived at Destination Facility",
  "Customs Clearance in Progress",
  "Customs Cleared",
  "Out for Delivery",
  "Delivery Attempted",
  "Delivered",
  "Delivery Exception",
  "Shipment On Hold",
  "Shipment Cancelled"
]

/* ---------------- COLOR BADGES ---------------- */

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

function AdminUpdatePackage() {

  const [trackingNumber, setTrackingNumber] = useState("")
  const [packageInfo, setPackageInfo] = useState(null)
  const [status, setStatus] = useState("")
  const [location, setLocation] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  /* ---------------- SEARCH PACKAGE ---------------- */

  const searchPackage = async () => {

    if (!trackingNumber.trim()) {
      setMessage("Enter a tracking number")
      return
    }

    setLoading(true)
    setMessage("")
    setPackageInfo(null)

    try {

      const res = await fetch(
        `https://skiesx-backend-1.onrender.com/admin/packages/${trackingNumber.trim()}`,
        {
          headers: {
            "X-Admin-Key": ADMIN_KEY
          }
        }
      )

      if (!res.ok) {
        throw new Error("Package not found")
      }

      const data = await res.json()

      setPackageInfo(data)
      setStatus(data.status)
      setLocation(data.current_location)

    } catch (err) {

      setMessage(err.message)

    } finally {

      setLoading(false)

    }
  }

  /* ---------------- UPDATE PACKAGE ---------------- */

  const updatePackage = async () => {

    if (!packageInfo) return

    setLoading(true)
    setMessage("")

    try {

      const res = await fetch(
        `https://skiesx-backend-1.onrender.com/admin/packages/${trackingNumber}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Admin-Key": ADMIN_KEY
          },
          body: JSON.stringify({
            status,
            current_location: location
          })
        }
      )

      if (!res.ok) {

        const err = await res.json()
        throw new Error(err.detail || "Update failed")

      }

      setMessage("Package updated successfully")

    } catch (err) {

      setMessage(err.message)

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="max-w-xl bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">
        Update Shipment Status
      </h2>

      {/* TRACKING NUMBER */}

      <input
        className="w-full border rounded px-3 py-2 mb-3"
        placeholder="Tracking Number"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />

      <button
        onClick={searchPackage}
        disabled={loading}
        className="mb-4 bg-gray-800 text-white px-4 py-2 rounded"
      >
        {loading ? "Searching..." : "Search Package"}
      </button>

      {/* PACKAGE DETAILS */}

      {packageInfo && (
        <>

          <div className="border rounded-lg p-4 mb-4 bg-gray-50 space-y-2">

            <p className="text-sm text-gray-600">
              Origin: <strong>{packageInfo.origin}</strong>
            </p>

            <p className="text-sm text-gray-600">
              Destination: <strong>{packageInfo.destination}</strong>
            </p>

          </div>

          <div className="border rounded-lg p-4 mb-4 bg-gray-50 space-y-2">

            <p className="text-sm">
              <strong>Sender:</strong> {packageInfo.sender_name}
            </p>

            <p className="text-sm text-gray-600">
              {packageInfo.sender_email || "—"} | {packageInfo.sender_phone || "—"}
            </p>

            <hr />

            <p className="text-sm">
              <strong>Receiver:</strong> {packageInfo.receiver_name}
            </p>

            <p className="text-sm text-gray-600">
              {packageInfo.receiver_email || "—"} | {packageInfo.receiver_phone || "—"}
            </p>

          </div>

          {/* STATUS PREVIEW BADGE */}

          {status && (
            <div className="mb-3">
              <span
                className={`text-white text-sm px-3 py-1 rounded ${STATUS_COLORS[status]}`}
              >
                {status}
              </span>
            </div>
          )}

          {/* STATUS SELECT */}

          <select
            className="w-full border rounded px-3 py-2 mb-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >

            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}

          </select>

          {/* LOCATION */}

          <input
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="Current Location (City, Country)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* UPDATE BUTTON */}

          <button
            onClick={updatePackage}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Updating..." : "Update Package"}
          </button>

        </>
      )}

      {message && (
        <p className="mt-4 text-sm text-gray-700">
          {message}
        </p>
      )}

    </div>

  )

}

export default AdminUpdatePackage
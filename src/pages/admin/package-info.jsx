import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import html2pdf from "html2pdf.js"

const API = import.meta.env.VITE_API_URL || "https://skiesx-backend-1.onrender.com"
const ADMIN_KEY = "lgx_admin_92DkK29sQ"

function PackageInfo() {
  const [params] = useSearchParams()
  const trackingFromUrl = params.get("tracking")

  const [trackingInput, setTrackingInput] = useState("")
  const [pkg, setPkg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const tableRef = useRef(null)

  const tracking = trackingFromUrl || trackingInput

  useEffect(() => {
    if (!tracking) return

    async function fetchInfo() {
      setLoading(true)
      setError("")
      setPkg(null)

      try {
        const res = await fetch(`${API}/admin/packages/${tracking}/info`, {
          headers: { "X-Admin-Key": ADMIN_KEY }
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.detail || "Package not found")
        setPkg(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInfo()
  }, [tracking])

  const downloadPDF = () => {
    if (!tableRef.current) return
    html2pdf()
      .set({
        margin: 10,
        filename: `${pkg.tracking_number}_info.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
      })
      .from(tableRef.current)
      .save()
  }

  if (!tracking) {
    return (
      <div className="max-w-md bg-white p-6 rounded-xl shadow mx-auto mt-12">
        <h2 className="text-lg font-semibold mb-4">Generate Package Info</h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter a tracking number to view full package details.
        </p>

        <input
          value={trackingInput}
          onChange={(e) => setTrackingInput(e.target.value)}
          placeholder="Enter tracking number"
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <button
          onClick={() => trackingInput && setPkg({})}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Load Package Info
        </button>
      </div>
    )
  }

  if (loading) return <p className="text-gray-500 text-center mt-6">Loading package info...</p>
  if (error) return <p className="text-red-600 text-center mt-6">{error}</p>
  if (!pkg) return null

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {/* DOWNLOAD BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      {/* BLUE SHEET */}
      <div
        ref={tableRef}
        className="relative rounded-xl shadow-xl overflow-hidden"
        style={{
          minHeight: "500px",
          width: "100%",
          maxWidth: "1100px",
          backgroundColor: "#D0EBFF", // blue sheet itself
          padding: "2rem",
        }}
      >
        {/* WATERMARK INSIDE SHEET */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <p
            className="text-9xl font-extrabold select-none whitespace-nowrap"
            style={{
              background: "linear-gradient(90deg, #2563EB, #EF4444)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: 0.1,
              transform: "rotate(-25deg)",
            }}
          >
            SKIES X
          </p>
        </div>

        {/* CONTENT */}
        <div className="relative z-10">
          {/* HEADER */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-blue-700">
              Skies <span className="text-red-500">X</span> Logistics
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Official Package Information Document
            </p>
          </div>

          {/* TABLE */}
          <table className="w-full table-auto text-sm border-collapse" style={{backgroundColor:"transparent"}}>
            <tbody>
              {/* Row: Tracking + Status */}
              <tr>
                <td className="px-4 py-3 font-semibold border">Tracking Number</td>
                <td className="px-4 py-3 border">{pkg.tracking_number}</td>
                <td className="px-4 py-3 font-semibold border">Status</td>
                <td className="px-4 py-3 border">{pkg.status}</td>
              </tr>
              {/* Row: Shipment Type + Mode */}
              <tr className="bg-white/30">
                <td className="px-4 py-3 font-semibold border">Shipment Type</td>
                <td className="px-4 py-3 border">{pkg.shipment_type || "N/A"}</td>
                <td className="px-4 py-3 font-semibold border">Shipment Mode</td>
                <td className="px-4 py-3 border">{pkg.shipment_mode || "N/A"}</td>
              </tr>
              {/* Row: Origin + Current Location */}
              <tr>
                <td className="px-4 py-3 font-semibold border">Origin</td>
                <td className="px-4 py-3 border">{pkg.origin}</td>
                <td className="px-4 py-3 font-semibold border">Current Location</td>
                <td className="px-4 py-3 border">{pkg.current_location || "N/A"}</td>
              </tr>
              {/* Row: Destination + Carrier */}
              <tr className="bg-white/30">
                <td className="px-4 py-3 font-semibold border">Destination</td>
                <td className="px-4 py-3 border">{pkg.destination}</td>
                <td className="px-4 py-3 font-semibold border">Carrier</td>
                <td className="px-4 py-3 border">{pkg.carrier || "N/A"}</td>
              </tr>
              {/* Row: Sender */}
              <tr>
                <td className="px-4 py-3 font-semibold border">Sender Name</td>
                <td className="px-4 py-3 border">{pkg.sender_name}</td>
                <td className="px-4 py-3 font-semibold border">Sender Phone</td>
                <td className="px-4 py-3 border">{pkg.sender_phone || "N/A"}</td>
              </tr>
              <tr className="bg-white/30">
                <td className="px-4 py-3 font-semibold border">Sender Email</td>
                <td className="px-4 py-3 border">{pkg.sender_email || "N/A"}</td>
                <td className="px-4 py-3 font-semibold border">Sender Address</td>
                <td className="px-4 py-3 border">{pkg.sender_address || "N/A"}</td>
              </tr>
              {/* Row: Receiver */}
              <tr>
                <td className="px-4 py-3 font-semibold border">Receiver Name</td>
                <td className="px-4 py-3 border">{pkg.receiver_name}</td>
                <td className="px-4 py-3 font-semibold border">Receiver Phone</td>
                <td className="px-4 py-3 border">{pkg.receiver_phone || "N/A"}</td>
              </tr>
              <tr className="bg-white/30">
                <td className="px-4 py-3 font-semibold border">Receiver Email</td>
                <td className="px-4 py-3 border">{pkg.receiver_email || "N/A"}</td>
                <td className="px-4 py-3 font-semibold border">Receiver Address</td>
                <td className="px-4 py-3 border">{pkg.receiver_address || "N/A"}</td>
              </tr>
              {/* Row: Weight + Quantity */}
              <tr>
                <td className="px-4 py-3 font-semibold border">Weight</td>
                <td className="px-4 py-3 border">{pkg.weight ?? "N/A"} kg</td>
                <td className="px-4 py-3 font-semibold border">Quantity</td>
                <td className="px-4 py-3 border">{pkg.quantity ?? "N/A"}</td>
              </tr>
              {/* Row: Expected Delivery + Created At */}
              <tr className="bg-white/30">
                <td className="px-4 py-3 font-semibold border">Expected Delivery</td>
                <td className="px-4 py-3 border">{pkg.expected_delivery_date || "N/A"}</td>
                <td className="px-4 py-3 font-semibold border">Created At</td>
                <td className="px-4 py-3 border">{new Date(pkg.created_at).toLocaleString()}</td>
              </tr>
              {/* Row: Last Updated */}
              <tr>
                <td className="px-4 py-3 font-semibold border">Last Updated</td>
                <td className="px-4 py-3 border">{new Date(pkg.last_updated).toLocaleString()}</td>
                <td className="px-4 py-3 font-semibold border"></td>
                <td className="px-4 py-3 border"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="mt-8 border-t pt-4 text-xs text-gray-600 text-center relative z-10">
          Generated by Skies X Logistics Admin System.<br/>
          Any forged or altered copy is invalid.
        </div>
      </div>
    </div>
  )
}

export default PackageInfo
import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import html2pdf from "html2pdf.js"

const API = import.meta.env.VITE_API_URL || "https://skiesx-backend-1.onrender.com"

function ViewReceipt() {
  const [params] = useSearchParams()
  const trackingFromUrl = params.get("tracking")

  const [trackingInput, setTrackingInput] = useState("")
  const [tracking, setTracking] = useState(trackingFromUrl || "")
  const [receipt, setReceipt] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const sheetRef = useRef(null)

  useEffect(() => {
    if (!tracking) return

    async function fetchReceipt() {
      setLoading(true)
      setError("")
      setReceipt(null)

      try {
        const res = await fetch(`${API}/track/${tracking}/receipt`)
        const data = await res.json()

        if (!res.ok) throw new Error(data.detail || "Receipt not found")
        setReceipt(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchReceipt()
  }, [tracking])

  const downloadPDF = () => {
    if (!sheetRef.current) return
    html2pdf()
      .set({
        margin: 10,
        filename: `Receipt_${tracking}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
      })
      .from(sheetRef.current)
      .save()
  }

  /* ===== PROMPT ===== */
  if (!tracking) {
    return (
      <div className="max-w-md bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          View Shipment Receipt
        </h2>

        <input
          value={trackingInput}
          onChange={(e) => setTrackingInput(e.target.value)}
          placeholder="Enter tracking number"
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <button
          onClick={() => setTracking(trackingInput)}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Load Receipt
        </button>
      </div>
    )
  }

  if (loading) return <p className="text-gray-500">Loading receipt...</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (!receipt) return null

  return (
    <div className="max-w-6xl mx-auto space-y-4">

      {/* DOWNLOAD */}
      <div className="flex justify-end">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      {/* RECEIPT SHEET */}
      <div
        ref={sheetRef}
        className="relative rounded-xl shadow-xl overflow-hidden"
        style={{
          minHeight: "420px",
          maxWidth: "1100px",
          backgroundColor: "#D0EBFF",
          padding: "2.5rem",
        }}
      >

        {/* WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="font-extrabold tracking-widest"
            style={{
              fontSize: "6rem",
              color: "rgba(30, 64, 175, 0.14)",
              transform: "rotate(-20deg)",
              userSelect: "none",
            }}
          >
            SKIES <span style={{ color: "rgba(220,38,38,0.22)" }}>X</span>
          </span>
        </div>

        {/* HEADER */}
        <div className="relative z-10 mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-blue-700">
            Skies <span className="text-red-500">X</span> Logistics
          </h1>
          <p className="text-sm text-gray-600">
            Official Shipment Receipt
          </p>
        </div>

        {/* TABLE */}
        <div className="relative z-10">
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr className="bg-white/70">
                <td className="border px-4 py-2 font-semibold">
                  Tracking Number
                </td>
                <td className="border px-4 py-2 font-mono">
                  {tracking}
                </td>
                <td className="border px-4 py-2 font-semibold">
                  Status
                </td>
                <td className="border px-4 py-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    PAID
                  </span>
                </td>
              </tr>

              <tr className="bg-blue-100/60">
                <td className="border px-4 py-2 font-semibold">
                  Payment Type
                </td>
                <td className="border px-4 py-2">
                  {receipt.payment_type}
                </td>
                <td className="border px-4 py-2 font-semibold">
                  Currency
                </td>
                <td className="border px-4 py-2">
                  {receipt.currency}
                </td>
              </tr>

              <tr className="bg-white/70">
                <td className="border px-4 py-2 font-semibold">
                  Amount Paid
                </td>
                <td className="border px-4 py-2">
                  {receipt.amount} {receipt.currency}
                </td>
                <td className="border px-4 py-2 font-semibold">
                  Issued At
                </td>
                <td className="border px-4 py-2">
                  {new Date(receipt.issued_at).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="relative z-10 mt-8 border-t pt-4 text-xs text-gray-600 text-center">
          This receipt is system-generated by Skies X Logistics.<br />
          Any alteration, duplication, or forgery renders this document invalid.
        </div>
      </div>
    </div>
  )
}

export default ViewReceipt
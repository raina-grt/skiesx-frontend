import { useState } from "react"

const API =  "https://skiesx-backend-1.onrender.com"
const ADMIN_KEY = "lgx_admin_92DkK29sQ"

function EditPackage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  /* ================= FETCH PACKAGE ================= */
  async function fetchPackage() {
    if (!trackingNumber.trim()) return

    setLoading(true)
    setMessage("")
    setForm(null)

    try {
      const res = await fetch(
        `${API}/admin/packages/${trackingNumber}`,
        {
          headers: {
            "X-Admin-Key": ADMIN_KEY
          }
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || "Package not found")
      }

      setForm({
        ...data,
        expected_delivery_date: data.expected_delivery_date
          ? data.expected_delivery_date
          : ""
      })
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* ================= HANDLE INPUT ================= */
  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  /* ================= UPDATE PACKAGE ================= */
  async function handleUpdate(e) {
    e.preventDefault()
    if (!form) return

    setLoading(true)
    setMessage("")

    const {
      tracking_number,
      created_at,
      last_updated,
      ...payload
    } = form

    try {
      const res = await fetch(
        `${API}/admin/packages/${trackingNumber}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Admin-Key": ADMIN_KEY
          },
          body: JSON.stringify(payload)
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || "Update failed")
      }

      setMessage("✅ Package updated successfully")
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      <h2 className="text-2xl font-semibold">Edit Package</h2>

      {/* ================= SEARCH ================= */}
      <div className="bg-white border rounded-lg p-4 flex gap-3">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Enter tracking number"
          value={trackingNumber}
          onChange={e => setTrackingNumber(e.target.value)}
        />
        <button
          onClick={fetchPackage}
          disabled={loading}
          className="bg-gray-900 text-white px-6 rounded"
        >
          {loading ? "Loading..." : "Load"}
        </button>
      </div>

      {message && (
        <p className="text-sm text-gray-700">{message}</p>
      )}

      {/* ================= FORM ================= */}
      {form && (
        <form onSubmit={handleUpdate} className="space-y-6">

          {/* META */}
          <section className="bg-gray-50 border rounded p-4 text-sm">
            <p><strong>Tracking Number:</strong> {form.tracking_number}</p>
            <p><strong>Status:</strong> {form.status}</p>
          </section>

          {/* ROUTE & SHIPMENT */}
          <section className="bg-white border rounded p-6">
            <h3 className="font-semibold mb-4">Route & Shipment</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="origin" value={form.origin || ""} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Origin" />
              <input name="destination" value={form.destination || ""} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Destination" />
              <input name="current_location" value={form.current_location || ""} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Current Location" />
              <input name="carrier" value={form.carrier || ""} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Carrier" />
              <input name="shipment_type" value={form.shipment_type || ""} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Shipment Type" />
              <input name="shipment_mode" value={form.shipment_mode || ""} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Shipment Mode" />
            </div>
          </section>

          {/* PACKAGE DETAILS */}
          <section className="bg-white border rounded p-6">
            <h3 className="font-semibold mb-4">Package Details</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <input type="number" step="0.01" name="weight" value={form.weight || ""} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Weight" />
              <input type="number" name="quantity" value={form.quantity || ""} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Quantity" />
              <input type="date" name="expected_delivery_date" value={form.expected_delivery_date || ""} onChange={handleChange} className="border rounded px-3 py-2" />
            </div>
          </section>

          {/* SENDER */}
          <section className="bg-white border rounded p-6">
            <h3 className="font-semibold mb-4">Sender Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="sender_name" value={form.sender_name || ""} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Sender Name" />
              <input name="sender_email" value={form.sender_email || ""} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Sender Email" />
              <input name="sender_phone" value={form.sender_phone || ""} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Sender Phone" />
              <input name="sender_address" value={form.sender_address || ""} onChange={handleChange} className="border rounded px-3 py-2 md:col-span-2" placeholder="Sender Address" />
            </div>
          </section>

          {/* RECEIVER */}
          <section className="bg-white border rounded p-6">
            <h3 className="font-semibold mb-4">Receiver Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="receiver_name" value={form.receiver_name || ""} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Receiver Name" />
              <input name="receiver_email" value={form.receiver_email || ""} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Receiver Email" />
              <input name="receiver_phone" value={form.receiver_phone || ""} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Receiver Phone" />
              <input name="receiver_address" value={form.receiver_address || ""} onChange={handleChange} className="border rounded px-3 py-2 md:col-span-2" placeholder="Receiver Address" />
            </div>
          </section>

          <button
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-2 rounded"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </form>
      )}
    </div>
  )
}

export default EditPackage
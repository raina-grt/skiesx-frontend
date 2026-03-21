import { useState } from "react"

function AdminCreatePackage() {
  const [form, setForm] = useState({
    sender_name: "",
    sender_email: "",
    receiver_name: "",
    receiver_email: "",
    origin: "",
    destination: "",
    expected_delivery_date: "",

  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [createdPackage, setCreatedPackage] = useState(null)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const createPackage = async () => {
    setLoading(true)
    setMessage("")
    setCreatedPackage(null)

    try {
      const res = await fetch( "https://skiesx-backend-1.onrender.com/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           ...form,
           expected_delivery_date: form.expected_delivery_date
          ? new Date(form.expected_delivery_date).toISOString()
          : null,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || "Failed to create package")
      }

      const data = await res.json()
      setCreatedPackage(data)
      setMessage("Package created successfully")
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Create Package
      </h2>

      {/* Sender */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Sender</p>

        <input
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="Sender Name"
          name="sender_name"
          value={form.sender_name}
          onChange={handleChange}
        />

        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Sender Email"
          name="sender_email"
          value={form.sender_email}
          onChange={handleChange}
        />
      </div>

      {/* Receiver */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Receiver</p>

        <input
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="Receiver Name"
          name="receiver_name"
          value={form.receiver_name}
          onChange={handleChange}
        />

        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Receiver Email"
          name="receiver_email"
          value={form.receiver_email}
          onChange={handleChange}
        />
      </div>

      {/* Shipment */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Shipment</p>

        <input
          className="w-full border rounded px-3 py-2 mb-2"
          placeholder="Origin"
          name="origin"
          value={form.origin}
          onChange={handleChange}
        />

        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Destination"
          name="destination"
          value={form.destination}
          onChange={handleChange}
        />

        <input
          type="date"
          name="expected_delivery_date"
          value={form.expected_delivery_date}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

      </div>

      <button
        onClick={createPackage}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create Package"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-gray-700">{message}</p>
      )}

      {createdPackage && (
        <div className="mt-4 border rounded-lg p-4 bg-gray-50">
          <p className="text-sm">
            <strong>Tracking Number:</strong>{" "}
            {createdPackage.tracking_number}
          </p>
          <p className="text-sm">
            <strong>Status:</strong>{" "}
            {createdPackage.status}
          </p>
        </div>
      )}
    </div>
  )
}

export default AdminCreatePackage

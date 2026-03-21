import { useState } from "react"

const API = import.meta.env.VITE_API_URL || "https://skiesx-backend-1.onrender.com"

export default function Support() {
  const [form, setForm] = useState({
    sender_name: "",
    sender_email: "",
    message: ""
  })
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus("")

    try {
      const res = await fetch(`${API}/support/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      if (!res.ok) throw new Error("Failed to send message")

      setStatus("Your message has been sent successfully.")
      setForm({ sender_name: "", sender_email: "", message: "" })
    } catch (err) {
      setStatus("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Contact Support
        </h2>
        <p className="text-gray-600 mt-1">
          Need help with a shipment or tracking issue?  
          Send us a message and our team will respond.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow border p-6">
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              name="sender_name"
              value={form.sender_name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="sender_email"
              value={form.sender_email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <p className="text-sm text-center text-green-600">
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
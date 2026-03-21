import { useState } from "react"

const API = import.meta.env.VITE_API_URL || "https://skiesx-backend-1.onrender.com"
const ADMIN_KEY = "lgx_admin_92DkK29sQ"

function CreateReceipt() {
  const [tracking, setTracking] = useState("")
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    payment_type: "",
    amount: "",
    currency: "USD"
  })

  async function handleVerifyTracking() {
    if (!tracking.trim()) return

    setLoading(true)
    setError("")

    try {
      const res = await fetch(
        `${API}/admin/packages/${tracking}`,
        {
          headers: { "X-Admin-Key": ADMIN_KEY }
        }
      )

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.detail || "Package not found")
      }

      // package exists → move to receipt form
      setStep(2)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateReceipt() {
    setLoading(true)
    setError("")

    try {
      const res = await fetch(
        `${API}/packages/${tracking}/receipt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Admin-Key": ADMIN_KEY
          },
          body: JSON.stringify({
            payment_type: form.payment_type,
            amount: Number(form.amount),
            currency: form.currency
          })
        }
      )

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.detail || "Failed to create receipt")
      }

      // ONLY redirect after admin submits payment details
      window.location.href = `/admin/receipt/view?tracking=${tracking}`
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">
        Generate Receipt
      </h2>

      {error && (
        <p className="text-red-600 text-sm mb-4">{error}</p>
      )}

      {/* STEP 1: TRACKING */}
      {step === 1 && (
        <>
          <input
            value={tracking}
            onChange={e => setTracking(e.target.value)}
            placeholder="Enter tracking number"
            className="w-full border rounded px-3 py-2 mb-4"
          />

          <button
            onClick={handleVerifyTracking}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Checking..." : "Generate Receipt"}
          </button>
        </>
      )}

      {/* STEP 2: RECEIPT FORM */}
      {step === 2 && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Payment type (e.g. Card, Cash)"
              value={form.payment_type}
              onChange={e =>
                setForm({ ...form, payment_type: e.target.value })
              }
              className="border rounded px-3 py-2"
            />

            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={e =>
                setForm({ ...form, amount: e.target.value })
              }
              className="border rounded px-3 py-2"
            />

            <input
              placeholder="Currency"
              value={form.currency}
              onChange={e =>
                setForm({ ...form, currency: e.target.value })
              }
              className="border rounded px-3 py-2"
            />
          </div>

          <button
            onClick={handleCreateReceipt}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : "Create Receipt"}
          </button>
        </>
      )}
    </div>
  )
}

export default CreateReceipt
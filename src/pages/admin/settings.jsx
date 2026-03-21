import { useEffect, useState } from "react"
import { ADMIN_KEY } from "../../config/admin"


function AdminSettings() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

useEffect(() => {
  fetch("https://skiesx-backend-1.onrender.com/admin/settings", {
    headers: {
      "X-Admin-Key": ADMIN_KEY,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setEmail(data.support_email)
      setPhone(data.support_phone)
    })
    .catch(() => {})
}, [])


  const saveSettings = async () => {
    const res = await fetch("https://skiesx-backend-1.onrender.com/admin/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Key": ADMIN_KEY,
    
    },
      body: JSON.stringify({
        support_email: email,
        support_phone: phone,
      }),
    })

    if (res.ok) {
      setMessage("Settings updated")
    }
  }

  return (
    <div className="max-w-lg bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Support Settings
      </h2>

      <input
        className="w-full border rounded px-3 py-2 mb-3"
        placeholder="Support Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border rounded px-3 py-2 mb-4"
        placeholder="Support Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        onClick={saveSettings}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>

      {message && (
        <p className="mt-3 text-sm text-gray-700">{message}</p>
      )}
    </div>
  )
}

export default AdminSettings

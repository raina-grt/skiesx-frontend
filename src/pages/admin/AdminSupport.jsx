import { useEffect, useState } from "react"

const API = import.meta.env.VITE_API_URL || "https://skiesx-backend-1.onrender.com"
const ADMIN_KEY = "lgx_admin_92DkK29sQ"

export default function AdminSupport() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchMessages() {
    setLoading(true)

    const res = await fetch(
      `${API}/admin/support/messages?page=1&limit=20`,
      { headers: { "X-Admin-Key": ADMIN_KEY } }
    )

    const data = await res.json()
    setMessages(data)
    setLoading(false)
  }

  async function markRead(id) {
    await fetch(
      `${API}/admin/support/messages/${id}/read`,
      {
        method: "PUT",
        headers: { "X-Admin-Key": ADMIN_KEY }
      }
    )

    setMessages(msgs =>
      msgs.map(m =>
        m.id === id ? { ...m, status: "read" } : m
      )
    )
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Support Messages
      </h2>

      {loading && <p>Loading messages...</p>}

      {!loading && messages.length === 0 && (
        <p className="text-gray-500">
          No support messages yet.
        </p>
      )}

      <div className="space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`border rounded-xl p-5 shadow-sm bg-white ${
              msg.status === "new"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-gray-900">
                  {msg.sender_name}
                </p>
                <p className="text-sm text-gray-500">
                  {msg.sender_email}
                </p>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  msg.status === "new"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {msg.status}
              </span>
            </div>

            <p className="text-gray-700 mb-4 whitespace-pre-line">
              {msg.message}
            </p>

            {msg.status === "new" && (
              <button
                onClick={() => markRead(msg.id)}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Mark as read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
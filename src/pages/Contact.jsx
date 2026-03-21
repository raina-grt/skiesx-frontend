import { useEffect, useState } from "react"

const API = import.meta.env.VITE_API_URL || "https://skiesx-backend-1.onrender.com"

export default function Contact() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function fetchSettings() {
    try {
      const res = await fetch(`${API}/settings`)
      if (!res.ok) throw new Error("Failed to load contact info")
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  if (loading) {
    return (
      <p className="text-center text-gray-500 py-20">
        Loading contact information…
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-center text-red-600 py-20">
        {error}
      </p>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">

      {/* HERO HEADER */}
      <section className="text-center max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-800">
          Contact Skies X Logistics
        </h1>

        <p className="text-gray-600 mt-3">
          Our logistics support team is available to assist with shipment
          tracking, delivery inquiries, and freight support.
        </p>

      </section>


      {/* CONTACT INFO CARDS */}
      <section className="grid md:grid-cols-3 gap-8">

        <ContactCard
          title="Customer Support"
          value={data.support_email}
          subtitle="Email"
        />

        <ContactCard
          title="Support Hotline"
          value={data.support_phone}
          subtitle="Phone"
        />

        <ContactCard
          title="Head Office"
          value="Geneva, Switzerland"
          subtitle="Global Logistics HQ"
        />

      </section>


      {/* CONTACT FORM */}
      <section className="grid md:grid-cols-2 gap-14 items-start">

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border">

          <h2 className="text-xl font-semibold text-blue-800 mb-6">
            Send a Message
          </h2>

          <form className="space-y-5">

            <div>
              <label className="text-sm text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Tracking Number (optional)
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium"
            >
              Send Message
            </button>

          </form>

        </div>


        {/* SUPPORT INFO */}
        <div className="space-y-6">

          <div className="bg-blue-50 p-8 rounded-xl">

            <h3 className="font-semibold text-blue-800 text-lg">
              Shipment Support
            </h3>

            <p className="text-gray-700 mt-2">
              If you have questions regarding your shipment,
              please include your tracking number when contacting
              our logistics support team.
            </p>

          </div>

          <div className="bg-red-50 p-8 rounded-xl">

            <h3 className="font-semibold text-red-600 text-lg">
              Business Inquiries
            </h3>

            <p className="text-gray-700 mt-2">
              For partnerships, freight contracts, or
              commercial logistics services, our global
              operations team will respond within 24 hours.
            </p>

          </div>

        </div>

      </section>

    </div>
  )
}


/* ======================
   CONTACT CARD
====================== */

function ContactCard({ title, value, subtitle }) {
  return (
    <div className="bg-white shadow rounded-xl p-6 border-t-4 border-blue-700">

      <p className="text-sm text-gray-500 uppercase">
        {subtitle}
      </p>

      <h3 className="text-lg font-semibold text-gray-900 mt-1">
        {title}
      </h3>

      <p className="text-blue-700 mt-2">
        {value}
      </p>

    </div>
  )
}
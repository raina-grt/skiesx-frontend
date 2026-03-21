import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const API =  "https://skiesx-backend-1.onrender.com"
const ADMIN_KEY = "lgx_admin_92DkK29sQ"

function PackageList() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")

  /* ================= FETCH PACKAGES ================= */
  async function fetchPackages() {
    setLoading(true)
    setError("")

    try {
      const res = await fetch(`${API}/admin/packages`, {
        headers: {
          "X-Admin-Key": ADMIN_KEY
        }
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || "Failed to load packages")
      }

      const data = await res.json()

      // Support both response styles
      if (Array.isArray(data)) {
        setPackages(data)
      } else if (Array.isArray(data.packages)) {
        setPackages(data.packages)
      } else {
        setPackages([])
      }

    } catch (err) {
      setError(err.message)
      setPackages([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPackages()
  }, [])

  /* ================= FILTER ================= */
  const filteredPackages = packages.filter(pkg =>
    pkg.tracking_number
      ?.toLowerCase()
      .includes(search.toLowerCase())
  )

return (
  <div className="max-w-7xl mx-auto space-y-6">

    {/* HEADER */}
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold">Packages</h2>
      <span className="text-sm text-gray-500">
        Total: {packages.length}
      </span>
    </div>

    {/* SEARCH */}
    <div className="bg-white border rounded p-4">
      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Search by tracking number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* STATES */}
    {loading && (
      <div className="bg-white border rounded p-6 text-gray-500">
        Loading packages…
      </div>
    )}

    {error && (
      <div className="bg-white border rounded p-6 text-red-600">
        {error}
      </div>
    )}

    {!loading && !error && filteredPackages.length === 0 && (
      <div className="bg-white border rounded p-6 text-gray-500">
        No packages found.
      </div>
    )}

    {/* TABLE */}
    {!loading && !error && filteredPackages.length > 0 && (
      <div className="overflow-x-auto bg-white border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Tracking</th>
              <th className="p-3">Sender</th>
              <th className="p-3">Receiver</th>
              <th className="p-3">Route</th>
              <th className="p-3">Status</th>
              <th className="p-3">Last Updated</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPackages.map((pkg) => (
              <tr key={pkg.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-mono">
                  {pkg.tracking_number}
                </td>

                <td className="p-3">
                  {pkg.sender_name}
                </td>

                <td className="p-3">
                  {pkg.receiver_name}
                </td>

                <td className="p-3">
                  {pkg.origin} → {pkg.destination}
                </td>

                <td className="p-3">
                  <span className="px-2 py-1 rounded text-xs bg-gray-200">
                    {pkg.status}
                  </span>
                </td>

                <td className="p-3">
                  {new Date(pkg.last_updated).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <Link
                    to={`/admin/package?tracking=${pkg.tracking_number}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)
}

export default PackageList
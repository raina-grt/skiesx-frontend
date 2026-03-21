import { Link, Outlet, useLocation } from "react-router-dom"

function AdminLayout() {
  const location = useLocation()

  const linkClass = (path) =>
    `block px-3 py-2 rounded transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-100 text-gray-700"
    }`

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ===== TOP BAR ===== */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">
            Skies X Logistics — Admin
          </h1>

          <span className="text-sm text-gray-500">
            Admin Panel
          </span>
        </div>
      </div>

      {/* ===== MAIN LAYOUT ===== */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">

        {/* ===== SIDEBAR ===== */}
        <aside className="col-span-12 md:col-span-3 bg-white rounded-xl shadow p-4 space-y-6">

          {/* DASHBOARD */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
              Overview
            </p>
            <Link to="/admin" className={linkClass("/admin")}>
              Dashboard
            </Link>
          </div>

          {/* PACKAGES */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
              Packages
            </p>

            <nav className="space-y-1">
              <Link to="/admin/create" className={linkClass("/admin/create")}>
                Create Package
              </Link>

              <Link to="/admin/package" className={linkClass("/admin/package")}>
                Update Package
              </Link>

              <Link to="/admin/packages" className={linkClass("/admin/packages")}>
                List Packages
              </Link>

              <Link to="/admin/update" className={linkClass("/admin/update")}>
                Update State
              </Link>
            </nav>
          </div>

          {/* DOCUMENTS */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
              Documents
            </p>

            <nav className="space-y-1">
              <Link
                to="/admin/receipt/create"
                className={linkClass("/admin/receipt/create")}
              >
                Generate Receipt
              </Link>

              <Link
                to="/admin/receipt/view"
                className={linkClass("/admin/receipt/view")}
              >
                View Receipt
              </Link>

              <Link
                to="/admin/package/info"
                className={linkClass("/admin/package/info")}
              >
                Package Info
              </Link>
            </nav>
          </div>

          {/* SUPPORT */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
              Support
            </p>

            <nav className="space-y-1">
              <Link
                to="/admin/support"
                className={linkClass("/admin/support")}
              >
                Support Messages
              </Link>

              <Link
                to="/admin/settings"
                className={linkClass("/admin/settings")}
              >
                Settings
              </Link>
            </nav>
          </div>

        </aside>

        {/* ===== PAGE CONTENT ===== */}
        <main className="col-span-12 md:col-span-9">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
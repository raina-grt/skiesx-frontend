
function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        Admin Dashboard
      </h2>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">
            System Status
          </p>
          <p className="mt-2 text-lg font-medium text-green-600">
            Operational
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">
            Package Updates
          </p>
          <p className="mt-2 text-lg font-medium">
            Active
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">
            Support Info
          </p>
          <p className="mt-2 text-lg font-medium">
            Configured
          </p>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard

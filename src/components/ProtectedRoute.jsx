import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const key = localStorage.getItem("admin_key")

  if (!key) {
    return <Navigate to="/admin/login" />
  }

  return children
}
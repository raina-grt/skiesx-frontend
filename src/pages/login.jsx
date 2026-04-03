import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminLogin() {
  const [key, setKey] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    if (key === "lgx_admin_92DkK29sQ") {
      localStorage.setItem("admin_key", key)
      navigate("/admin")
    } else {
      alert("Invalid key")
    }
  }

  return (
    <div>
      <h2>Admin Login</h2>
      <input
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter Admin Key"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}


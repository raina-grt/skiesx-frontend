import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Support from "./pages/Support"
import Contact from "./pages/Contact"

import AdminLayout from "./layouts/AdminLayout"
import AdminDashboard from "./pages/admin/dashboard"
import AdminUpdatePackage from "./pages/admin/update"
import AdminSettings from "./pages/admin/settings"
import AdminCreatePackage from "./pages/admin/create"
import AdminEditPackage from "./pages/admin/edit-package"
import PackageList from "./pages/admin/package-list"

import CreateReceipt from "./pages/admin/create-receipt"
import ViewReceipt from "./pages/admin/view-receipt"
import PackageInfo from "./pages/admin/package-info"
import AdminSupport from "./pages/admin/AdminSupport"
import AdminLogin from "./pages/admin/login"
import ProtectedRoute from "./components/ProtectedRoute"


function PublicPage({ children }) {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-8">
        {children}
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<PublicPage><Home /></PublicPage>} />
        <Route path="/about" element={<PublicPage><About /></PublicPage>} />
        <Route path="/services" element={<PublicPage><Services /></PublicPage>} />
        <Route path="/support" element={<PublicPage><Support /></PublicPage>} />
        <Route path="/contact" element={<PublicPage><Contact /></PublicPage>} />

        {/* ===== ADMIN ===== */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="create" element={<AdminCreatePackage />} />
          <Route path="update" element={<AdminUpdatePackage />} />
          <Route path="package" element={<AdminEditPackage />} />
          <Route path="packages" element={<PackageList />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="receipt/create" element={<CreateReceipt />} />
          <Route path="receipt/view" element={<ViewReceipt />} />
          <Route path="package/info" element={<PackageInfo />} />
          <Route path="support" element={<AdminSupport />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
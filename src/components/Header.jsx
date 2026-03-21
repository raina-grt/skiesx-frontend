import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div>
            <h1 className="text-xl font-bold tracking-wide">
              <span className="text-red-600">Skies</span>
              <span className="text-black"> X </span>
              <span className="text-black">Logistics</span>
            </h1>

            <div className="mt-1 space-y-1">
              <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
              <div className="h-1 w-14 bg-blue-400 rounded-full"></div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/" className="hover:underline">Track</Link>
            <Link to="/services" className="hover:underline">Services</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link
              to="/support"
              className="font-medium text-blue-600 hover:underline"
            >
              Support
            </Link>
          </nav>

        </div>
      </div>
    </header>
  )
}

export default Header
import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useNavigate, useLocation } from "react-router-dom"
import { images } from "../assets/images"
import Tracking from "./tracking"

export default function Home() {

  const trackingRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    if (location.hash === "#tracking") {
      const el = document.getElementById("tracking")
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }, [location])

  return (
    <div className="space-y-28">

      <HeroSection trackingRef={trackingRef} />

      <StatsSection />

      <ServicesPreview />

      <GlobalNetwork />

      <WhySection />

      {/* TRACKING */}
      <section
        id="tracking"
        ref={trackingRef}
        className="bg-blue-50 py-16 rounded-2xl"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
            Track Your Shipment
          </h2>

          <Tracking />
        </div>
      </section>

    </div>
  )
}


/* HERO */

function HeroSection({ trackingRef }) {

  const heroImages = [images.hero.air, images.hero.sea]
  const [index, setIndex] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const scrollTracking = () => {
    if (trackingRef.current) {
      trackingRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative rounded-3xl overflow-hidden">

      <motion.img
        key={index}
        src={heroImages[index]}
        alt="Logistics"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-[460px] object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-red-600/40 flex items-center">

        <div className="max-w-5xl mx-auto px-6 text-white">

          <h1 className="text-4xl sm:text-5xl font-bold">
            Global Logistics <br /> Without Limits
          </h1>

          <p className="mt-4 max-w-xl text-blue-100">
            Trusted cargo transportation across air, sea and land
            routes from Geneva Switzerland.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              onClick={scrollTracking}
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold"
            >
              Track Shipment
            </button>

            <button
              onClick={() => navigate("/services")}
              className="bg-red-600 px-6 py-3 rounded-lg font-semibold"
            >
              Our Services
            </button>

          </div>

        </div>

      </div>

    </section>
  )
}


/* STATS */

function StatsSection() {

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">

      <Stat value={13} suffix="+" label="Years Experience" />
      <Stat value={40} suffix="+" label="Countries Served" />
      <Stat value={25000} suffix="+" label="Shipments Delivered" />

    </section>
  )
}

function Stat({ value, suffix, label }) {

  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {

    if (!inView) return

    let start = 0
    const step = value / 60

    const interval = setInterval(() => {

      start += step

      if (start >= value) {
        setCount(value)
        clearInterval(interval)
      } else {
        setCount(Math.floor(start))
      }

    }, 20)

    return () => clearInterval(interval)

  }, [inView])

  return (
    <div ref={ref} className="bg-white shadow rounded-xl py-10 border-t-4 border-blue-700">
      <h3 className="text-4xl font-bold text-blue-700">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="mt-2 text-gray-600">{label}</p>
    </div>
  )
}


/* SERVICES PREVIEW */

function ServicesPreview() {

  const navigate = useNavigate()

  return (
    <section className="grid md:grid-cols-3 gap-8">

      <Card
        image={images.services.air[0]}
        title="Air Freight"
        text="Fast international cargo delivery."
      />

      <Card
        image={images.services.sea[0]}
        title="Sea Freight"
        text="Global container shipping network."
      />

      <Card
        image={images.services.road[0]}
        title="Land Transport"
        text="Efficient regional trucking routes."
      />

      <div className="md:col-span-3 text-center">
        <button
          onClick={() => navigate("/services")}
          className="mt-6 bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          View All Services
        </button>
      </div>

    </section>
  )
}

function Card({ image, title, text }) {

  return (
    <motion.div whileHover={{ y: -6 }} className="bg-white rounded-xl shadow overflow-hidden">

      <img src={image} className="h-48 w-full object-cover" />

      <div className="p-6">
        <h3 className="text-xl font-semibold text-blue-700">{title}</h3>
        <p className="mt-2 text-gray-600">{text}</p>
      </div>

      <div className="h-1 bg-red-600" />

    </motion.div>
  )
}


/* GLOBAL MAP */

function GlobalNetwork() {

  return (
    <section className="text-center space-y-6">

      <h2 className="text-3xl font-bold text-blue-800">
        Our Global Logistics Network
      </h2>

      <div className="relative max-w-6xl mx-auto">

        <img
          src={images.map}
          className="w-full rounded-xl shadow-lg"
        />

        <motion.div
          className="absolute top-[45%] left-[10%] w-4 h-4 bg-red-500 rounded-full"
          animate={{ x: [0, 600], y: [0, -120] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

      </div>

    </section>
  )
}


/* WHY */

function WhySection() {

  return (
    <section className="grid md:grid-cols-2 gap-12 items-center">

      <img src={images.warehouse[0]} className="rounded-2xl shadow" />

      <div>

        <h2 className="text-3xl font-bold text-blue-800 mb-4">
          Why Choose Skies X Logistics
        </h2>

        <ul className="space-y-3 text-gray-700">
          <li>✔ Global air, sea & land freight network</li>
          <li>✔ Real-time shipment tracking</li>
          <li>✔ Experienced logistics professionals</li>
          <li>✔ Secure cargo handling</li>
        </ul>

      </div>

    </section>
  )
}
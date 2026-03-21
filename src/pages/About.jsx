import { motion } from "framer-motion"
import { images } from "../assets/images"

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">

      {/* HERO SECTION */}
      <section className="grid md:grid-cols-2 gap-14 items-center">

        <motion.img
          src={images.warehouse[0]}
          alt="Skies X logistics warehouse"
          className="rounded-2xl shadow-xl w-full object-cover"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />

        <div>

          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            About Skies X Logistics
          </h1>

          <p className="text-gray-700 leading-relaxed mb-4">
            Skies X Logistics is a modern freight and logistics company
            specializing in reliable global cargo transportation. Our
            operations connect major trade routes across air, sea, and
            land transport networks.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Based in Geneva, Switzerland, our logistics team combines
            industry expertise with advanced tracking technology to
            deliver secure, transparent, and efficient shipping
            solutions for businesses worldwide.
          </p>

          <div className="mt-6 flex gap-3">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              Global Freight
            </span>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
              Secure Logistics
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              Real-time Tracking
            </span>
          </div>

        </div>

      </section>


      {/* COMPANY STATS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

        <Stat number="13+" label="Years Experience" />
        <Stat number="40+" label="Countries Served" />
        <Stat number="25k+" label="Shipments Delivered" />

      </section>


      {/* MISSION / VISION */}
      <section className="grid md:grid-cols-2 gap-10">

        <div className="bg-blue-50 p-10 rounded-2xl shadow">

          <h3 className="text-2xl font-semibold text-blue-800 mb-3">
            Our Mission
          </h3>

          <p className="text-gray-700 leading-relaxed">
            Our mission is to simplify global shipping through efficient
            logistics networks, real-time shipment tracking, and
            reliable delivery systems that businesses can trust.
          </p>

        </div>

        <div className="bg-red-50 p-10 rounded-2xl shadow">

          <h3 className="text-2xl font-semibold text-red-600 mb-3">
            Our Vision
          </h3>

          <p className="text-gray-700 leading-relaxed">
            We aim to become a globally trusted logistics partner by
            building modern shipping infrastructure that connects
            international markets and supports global trade growth.
          </p>

        </div>

      </section>


      {/* VALUES */}
      <section className="text-center max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Our Core Values
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <Value
            title="Reliability"
            text="Consistent and dependable logistics services across all transport networks."
          />

          <Value
            title="Transparency"
            text="Real-time tracking and open communication for complete shipping visibility."
          />

          <Value
            title="Global Reach"
            text="Strong international partnerships connecting major logistics hubs."
          />

        </div>

      </section>

    </div>
  )
}


/* =========================
   STATS COMPONENT
========================= */

function Stat({ number, label }) {
  return (
    <div className="bg-white shadow rounded-xl py-10 border-t-4 border-blue-700">
      <h3 className="text-3xl font-bold text-blue-700">{number}</h3>
      <p className="text-gray-600 mt-2">{label}</p>
    </div>
  )
}


/* =========================
   VALUE CARD
========================= */

function Value({ title, text }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h3 className="font-semibold text-lg text-blue-800 mb-2">
        {title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        {text}
      </p>

    </div>
  )
}
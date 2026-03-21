import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { images } from "../assets/images"

export default function Services() {

  const navigate = useNavigate()

  const goTracking = () => navigate("/#tracking")

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-28">

      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-800">
          Our Logistics Services
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600">
          Reliable air, sea and land freight services designed to move
          cargo safely across international logistics routes.
        </p>
      </header>

      <ServiceBlock
        images={images.services.air}
        title="Air Freight"
        text="Fast international cargo delivery through major airline networks."
      />

      <ServiceBlock
        images={images.services.sea}
        title="Sea Freight"
        text="Global container shipping solutions connecting major ports."
        reverse
      />

      <ServiceBlock
        images={images.services.road}
        title="Land Transport"
        text="Reliable cross-border trucking and last mile distribution."
      />

      <div className="text-center bg-gradient-to-r from-blue-700 to-red-600 text-white py-12 rounded-2xl">

        <h2 className="text-3xl font-bold mb-4">
          Track Your Shipment
        </h2>

        <button
          onClick={goTracking}
          className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold"
        >
          Track Shipment
        </button>

      </div>

    </div>
  )
}


function ServiceBlock({ images, title, text, reverse }) {

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="grid md:grid-cols-2 gap-12 items-center"
    >

      <ImageSlider images={images} />

      <div className="space-y-4">

        <h3 className="text-2xl font-bold text-blue-800">{title}</h3>

        <p className="text-gray-600">{text}</p>

      </div>

    </motion.section>
  )
}


function ImageSlider({ images }) {

  const [index, setIndex] = useState(0)

  useEffect(() => {

    if (!images || images.length === 0) return

    const interval = setInterval(() => {
      setIndex((p) => (p + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)

  }, [images])

  if (!images || images.length === 0) return null

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl">

      <motion.img
        key={index}
        src={images[index]}
        className="w-full h-[340px] object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

    </div>
  )
}
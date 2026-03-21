const STAGES = [
  "Shipment Information Received",
  "Package Received at Facility",
  "Departed Origin Facility",
  "In Transit",
  "Arrived at Destination Facility",
  "Out for Delivery",
  "Delivered"
]

function ShipmentProgress({ currentStatus }) {

  const currentIndex = STAGES.indexOf(currentStatus ?? "")

  const progress =
    currentIndex === -1
      ? 10
      : (currentIndex / (STAGES.length - 1)) * 100

  return (

    <div className="mb-10">

      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>Shipment Created</span>
        <span>Delivered</span>
      </div>

      <div className="relative h-2 bg-gray-200 rounded">

        <div
          className="absolute top-0 left-0 h-2 bg-green-500 rounded transition-all duration-700"
          style={{ width: `${progress}%` }}
        />

      </div>

    </div>

  )

}

export default ShipmentProgress
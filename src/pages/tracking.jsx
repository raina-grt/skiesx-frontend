import { useState, useEffect, useCallback } from "react";

import TrackingHistory from "../components/TrackingHistory";
import DeliveryETA from "../components/DeliveryETA";
import ShipmentMap from "../components/ShipmentMap";
import ShipmentProgress from "../components/ShipmentProgress";

/* ---------- helpers ---------- */

const API = "https://skiesx-backend-1.onrender.com";

const formatDate = (isoString) => {
  if (!isoString) return "—";

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const statusStyle = (status = "") => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-gray-100 text-gray-700";
    case "in transit":
      return "bg-blue-100 text-blue-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "delayed":
      return "bg-yellow-100 text-yellow-800";
    case "pickup":
    case "pick up":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [packageInfo, setPackageInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTracking = useCallback(async () => {
    const tn = trackingNumber.trim();
    if (!tn) {
      setError("Please enter a tracking number");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/track/${tn}`);
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Tracking number not found");
      }

      const data = await res.json();
      setPackageInfo(data);
    } catch (err) {
      console.error("Tracking error:", err);
      setPackageInfo(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [trackingNumber]);

  /* Auto refresh every 15s */
  useEffect(() => {
    if (!packageInfo) return;
    const interval = setInterval(fetchTracking, 15000);
    return () => clearInterval(interval);
  }, [packageInfo, fetchTracking]);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6">Track Your Package</h2>

      {/* Search */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <label className="block text-sm font-medium mb-2">Tracking Number</label>
        <input
          type="text"
          value={trackingNumber}
          placeholder="Enter tracking number"
          onChange={(e) => setTrackingNumber(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchTracking()}
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          onClick={fetchTracking}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Tracking..." : "Track Package"}
        </button>
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>

      {/* Results */}
      {packageInfo && (
        <>
          <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden mb-6">
            {/* Header */}
            <div className="px-6 py-4 border-b flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold tracking-wide">Package Details</h3>
                <p className="text-sm text-gray-500">{packageInfo.tracking_number}</p>
                <DeliveryETA eta={packageInfo.expected_delivery_date} />
                {packageInfo.expected_delivery_date && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Expected Delivery:</span>{" "}
                    {new Date(packageInfo.expected_delivery_date).toLocaleDateString()}
                  </p>
                )}
              </div>

              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${statusStyle(packageInfo.status)}`}
              >
                {packageInfo.status}
              </span>
            </div>

            {/* Shipment Progress */}
            <ShipmentProgress currentStatus={packageInfo.status} />

            {/* Details */}
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase text-gray-400">Current Location</p>
                <p className="font-medium">{packageInfo.current_location}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-400">Origin</p>
                <p className="font-medium">{packageInfo.origin}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-400">Destination</p>
                <p className="font-medium">{packageInfo.destination}</p>
              </div>
            </div>

            {/* MAP */}
            {packageInfo.latitude != null && packageInfo.longitude != null && (
              <div className="px-6 pb-6">
                <ShipmentMap
                  currentCoords={[packageInfo.latitude, packageInfo.longitude]}
                  originCoords={null}  // optional
                  destinationCoords={null}  // optional
                />
              </div>
            )}

            <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600 flex flex-col sm:flex-row sm:justify-between gap-2">
              <span>Created: {formatDate(packageInfo.created_at)}</span>
              <span>Last Updated: {formatDate(packageInfo.last_updated)}</span>
            </div>
          </div>

          <TrackingHistory trackingNumber={packageInfo.tracking_number} />
        </>
      )}
    </div>
  );
}

export default Tracking;
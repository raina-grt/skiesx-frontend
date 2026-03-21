import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function ShipmentMap({ originCoords, currentCoords, destinationCoords }) {
  // Collect only valid coordinates
  const positions = [originCoords, currentCoords, destinationCoords].filter(Boolean);

  if (positions.length === 0) return <p className="text-center">No map data available</p>;

  // Center the map on the current location if available, else last available
  const center = currentCoords || positions[positions.length - 1];

  return (
    <div className="w-full rounded-lg overflow-hidden mt-6" style={{ height: "300px" }}>
      <MapContainer center={center} zoom={5} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {positions.map((pos, idx) => (
          <Marker key={idx} position={pos} />
        ))}

        {positions.length > 1 && <Polyline positions={positions} color="blue" />}
      </MapContainer>
    </div>
  );
}
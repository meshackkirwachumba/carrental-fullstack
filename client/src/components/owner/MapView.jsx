import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

const myIcon = L.icon({
  iconUrl: 'https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png',
  iconSize: [25, 35],
  iconAnchor: [12.5, 35],
  popupAnchor: [0, -35],
});

function MapView({vehicleCoords, locationHistory}) {
  return (
    <MapContainer center={[1.018076, 35.000236]} zoom={13} className="h-[600px] w-[700px]">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {Object.values(vehicleCoords).map((v) => (
        <Marker key={v.vehicleId} position={[v.lat, v.lng]} icon={myIcon}>
          <Popup>
            car
          </Popup>
        </Marker>
      ))}

      {locationHistory.length > 0 && (
        <Polyline positions={locationHistory.map((p) => [p.lat, p.lng])} color="blue" />
      )}
    </MapContainer>
  )
}

export default MapView

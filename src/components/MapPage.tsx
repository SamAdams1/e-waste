import React from "react";

import "leaflet/dist/leaflet.css"; // Import Leaflet styles
import L from "leaflet";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;
// 43.03460, -71.452031
const MapPage = () => {
  const position: [number, number] = [43.040755, -71.451845]; // Default position (London)

  return (
      <MapContainer center={position} zoom={16} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

        />
        <Marker position={position}>
          <Popup> A marker in London </Popup>
        </Marker>
      </MapContainer>
  );
};

export default MapPage;

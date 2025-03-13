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

const MapPage = () => {
  const position: [number, number] = [51.505, -0.09]; // Default position (London)

  return (
    <div>
      {typeof window !== "undefined" && (<MapContainer className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

        />
        <Marker position={position}>
          <Popup> A marker in London </Popup>
        </Marker>
      </MapContainer>
      )}
      {/* <img src="src\assets\snhuMap.png" alt="" /> */}
    </div>
  );
};

export default MapPage;

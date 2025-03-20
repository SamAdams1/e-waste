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
  const center: [number, number] = [43.040755, -71.451845]; // Default position (London)
  const buildingPositions: any = [
    { 
      buildingName: "Student Center",
      latLon: [43.039, -71.4539]
    },
    { 
      buildingName: "Kingston",
      latLon: [43.0407514823724, -71.45464796843052]
    },
    { 
      buildingName: "Seta",
      latLon: [43.04170500277662, -71.4527321384766]
    },
    { 
      buildingName: "Webster",
      latLon: [43.04378366247694, -71.45104030036258]
    },
    { 
      buildingName: "New Castle",
      latLon: [43.03965806115933, -71.45667954886227]
    },
    { 
      buildingName: "Washington",
      latLon: [43.04189934790591, -71.45380895544284]
    },
    { 
      buildingName: "Monadnock",
      latLon: [43.03867488225258, -71.45026767631175]
    },
    { 
      buildingName: "Windsor",
      latLon: [43.040084342555865, -71.44830889960457]
    },
    { 
      buildingName: "Tuckerman",
      latLon: [43.03929778601499, -71.4487886446786]
    },
    { 
      buildingName: "Conway",
      latLon: [43.03988859416745, -71.44554884579253]
    },
  ]
  return (
      <MapContainer center={center} zoom={16} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

        />
        {buildingPositions.map((building: any) => (
          <Marker position={building.latLon}>
          <Popup> {building.buildingName} </Popup>
        </Marker>
        ))
        
        }
      </MapContainer>
  );
};

export default MapPage;

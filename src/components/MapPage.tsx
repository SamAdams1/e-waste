import { useState, useEffect } from "react";
import Bins, { IBins } from "../models/Bins";

import "leaflet/dist/leaflet.css"; // Import Leaflet styles
import L, { map } from "leaflet";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import CustomMarker from "./CustomMarker";

interface buildings {buildingName: string, latLon: [number, number]};

interface mongoResponse {
  bins: [IBins];
}

// 43.03460, -71.452031
const MapPage = () => {
  const base = `http://${window.location.hostname}:9090`;
  const [binData, setBinData] = useState<[IBins]>();
  const getBinData = async (): Promise<[IBins] | undefined> => {
    try {
      const response = await fetch(`${base}/bins/get`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: mongoResponse = await response.json();
      return data.bins;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  const center: [number, number] = [43.040755, -71.451845]; // Default position (London)
  const buildingPositions: buildings[] = [
    { 
      buildingName: "Student Center",
      latLon: [43.03975424423455, -71.4537540534146]
    },
    // {
    //   buildingName: binData?.[0].name,
    //   latLon: binData?.[0].location
    // },
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
  const [mapData, setMapData] = useState(getMapData);

  const corner1 = L.latLng(43.05608052417522, -71.47025574018889)
  const corner2 = L.latLng(43.026883091146004, -71.43616876214308)
  const mapBounds = L.latLngBounds(corner1, corner2)  

  async function getMapData() {
    fetch("http://localhost:9090/ewaste/get").then( response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // console.log(response)
      return response.json()
    })
  }

  const fetchBinData = async () => {
    const data = await getBinData();
    if (data) {
      const fullness = data.map((item) => item.fullness);
      console.log("Fullness:", fullness[0]);
    }
    console.log(data);
    setBinData(data);
  };
  
  useEffect(() => {
    console.log(mapData)
    setInterval(() => {
      fetchBinData();
    }, 1000);
  }, [mapData]);
  
  return (
      <MapContainer center={center} zoom={16} className="map" maxBounds={mapBounds} minZoom={14} maxZoom={17}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

        />
        {buildingPositions.map((building: any, index) => {
          // if building.buildingName = "Student Center" then cropvalue is 32, else cropvalue is index * 5
          const cropValue = building.buildingName === "Student Center" ? binData?.[0].fullness : index * 5;
          return (
            <CustomMarker crop={cropValue} latLon={building.latLon} key={building.buildingName}>
              <Popup>{building.buildingName}</Popup>
            </CustomMarker>
          );
        })}
      </MapContainer>
  );
};

export default MapPage;

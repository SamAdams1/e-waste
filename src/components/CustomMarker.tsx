import React, { Children, ReactElement, useState } from 'react'


import markerIcon from "/src/assets/FullMarker.png";
import markerIcon2 from "/src/assets/EmptyMarker.png";

import L from "leaflet";
import { Marker } from "react-leaflet";

import "leaflet/dist/leaflet.css"; // Import Leaflet styles

interface CustomMarkerProps {
  children: React.ReactNode;
  crop: number;
  latLon: [number, number];
}

const CustomMarker = ({ children, crop, latLon }: CustomMarkerProps) => {

  const defaultIcon = L.divIcon({
    className: "",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    html: `
      <div style="position: relative; width: 50px; height: 50px;">
        
        <div style="
          position: absolute;
          top: ${crop}px;                /* crop variable above */
          left: 0;
          width: 50px;
          height: 50px;
          background-image: url('${markerIcon}');
          background-size: 50px 50px;
          background-position: 0 -${crop}px;         /* crop variable above */
          background-repeat: no-repeat;
        "></div>
        
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 50px;
          height: 50px;
          background-image: url('${markerIcon2}');
          background-size: contain;
          background-repeat: no-repeat;
          opacity: 0.7;
        "></div>
  
      </div>
    `
  });

  return (
    <Marker position={latLon} icon={defaultIcon}>
      {children}
    </Marker>
    
    
  )
}

export default CustomMarker
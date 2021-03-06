import React, { useCallback, useRef, useState } from "react";

import "antd/dist/antd.css";

import Filters from "./components/Filters/Filters";
import MapContainer from "./components/Map/MapContainer";
import "./App.css";
import { getStations } from "./api/mapApi";

export default function App() {
  const moscow = [55.75396, 37.620393];
  const [center, setCenter] = useState(moscow);
  const [position, setPosition] = useState();

  const mapRef = useRef();

  const handleClick = useCallback((event) => {
    const map = mapRef.current;
    if (map != null) {
      setPosition(event.latlng);
      setCenter(event.latlng);
    }
  }, []);

  const stations = getStations();

  const onFiltersChange = useCallback(
    (values) => {
      const { station } = values;
      if (station) {
        const stationData = stations.find((s) => station === s.id);
        if (!stationData) {
          return;
        }
        setCenter([stationData.lat, stationData.lng]);
        setPosition(undefined);
      }
    },
    [stations]
  );

  return (
    <>
      <Filters onFiltersChange={onFiltersChange} stations={stations} />
      <MapContainer
        position={position}
        mapRef={mapRef}
        handleClick={handleClick}
        center={center}
      />
    </>
  );
}

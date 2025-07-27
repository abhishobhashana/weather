import { useEffect, useRef, useState } from "react";
import {
  AttributionControl,
  MapContainer,
  Marker,
  TileLayer,
} from "react-leaflet";
import { UseModeChecker } from "../../utils/useModeChecker";
import "leaflet/dist/leaflet.css";

const Maps = ({ location, temp, bgColor }) => {
  const mode = UseModeChecker();

  const lightMap =
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
  const darkMap =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  const mapRef = useRef();
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const pos = {
      lat: location?.lat || 0,
      lng: location?.lng || 0,
    };
    mapRef?.current?.flyTo(pos, 7);
    setCenter(pos);
  }, [location, mapRef?.current]);

  const locationMarkerIcon = () =>
    L.divIcon({
      html: `<div class="flex h-full items-center justify-center text-center border-2 border-white rounded-full"><span class="text-xl font-semibold font-sans">${temp}</span></div>`,
      className: `text-center ${bgColor} backdrop-blur-md rounded-full`,
      iconSize: [40, 40],
      iconAnchor: [20, 50],
    });

  return (
    <MapContainer
      ref={mapRef}
      className="h-full rounded-md"
      center={center}
      zoom={7}
      animate={true}
      preferCanvas={true}
      zoomControl={false}
      attributionControl={false}
      zoomAnimation
      minZoom={2}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
    >
      <TileLayer url={mode ? darkMap : lightMap} />
      <AttributionControl
        position="bottomleft"
        prefix='<a href="https://leafletjs.com/">Leaflet</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      <Marker position={center} icon={locationMarkerIcon()}></Marker>
    </MapContainer>
  );
};

export default Maps;

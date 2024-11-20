import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import DraggableMarker from './Marker';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import PropTypes from 'prop-types';
// Configura los iconos usando `mergeOptions`
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const RecenterMap = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position); // Recentrar el mapa en la nueva posición
  }, [position, map]);

  return null;
};

const MapComponent = React.memo(({ lat, lng, isEditable, onChange, handleAddress, setLoading }) => {
  return (
    <MapContainer center={{ lat, lng }} zoom={16} className="h-[300px]">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <RecenterMap position={{lat, lng}}/>
      <DraggableMarker isEditable={isEditable} changePosition={onChange} propertiePosition={{ lat, lng }} />
    </MapContainer>
  );
});

MapComponent.propTypes = {
  lat: PropTypes.string,
  lng: PropTypes.string,
  isEditable: PropTypes.bool,
  onChange: PropTypes.func,
};

export default MapComponent;
// src/MapComponent.js
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Importa las imágenes directamente
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Configura los iconos usando `mergeOptions`
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
const MapComponent = ({lat = 0,lng = 0}) => {
  console.log(lat, lng);
  
  return (
    <MapContainer center={[lat, lng]} zoom={16} className='h-[300px]' >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]}>
        <Popup>
          ¡Aquí estoy!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

MapComponent.propType
export default MapComponent;
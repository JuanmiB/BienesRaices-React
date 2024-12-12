import MapComponent from "../../../components/Mapa/Mapa";


const PropiedadMapa = ({ lat, lng }) => (
  <div className="border-2 md:hover:border-blue-600">
    {lat !== undefined && lng !== undefined ? (
      <MapComponent lat={lat} lng={lng} isEditable={false} />
    ) : (
      <p>No se encuentra el mapa</p>
    )}
  </div>
);

export default PropiedadMapa;
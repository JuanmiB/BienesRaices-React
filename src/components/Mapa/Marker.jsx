import { useState, useMemo, useRef, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";

const DraggableMarker = ({ propertiePosition, isEditable, changePosition }) => {
  const [position, setPosition] = useState(propertiePosition);
  const markerRef = useRef(null);

  // Actualiza la posición del marcador si `propertiePosition` cambia
  useEffect(() => {
    setPosition(propertiePosition);
  }, [propertiePosition]);

  // Manejadores de eventos para hacer que el marcador sea arrastrable
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker) {
          const newPosition = marker.getLatLng();
          setPosition(newPosition); // Actualiza la posición local
          changePosition(newPosition.lat, newPosition.lng); // Llama a `changePosition` para actualizar `lat` y `lng`.
        }
      },
    }),
    [changePosition]
  );

  return (
    <Marker
      draggable={isEditable}
      eventHandlers={isEditable ? eventHandlers : {}}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span>
          {isEditable
            ? "Mover para seleccionar ubicación"
            : "Ubicación de la propiedad"}
        </span>
      </Popup>
    </Marker>
  );
};

export default DraggableMarker;
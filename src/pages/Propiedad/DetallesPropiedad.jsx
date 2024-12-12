import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import FormularioContacto from "../../components/FormularioContacto/FormularioContacto";
import { PropiedadImagen, PropiedadInfo, PropiedadDescripcion, PropiedadMapa } from ".";
import api from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthContext";

const DetallesPropiedad = () => {
  const [result, setResults] = useState(null);
  const { id } = useParams();
  const { user } = useAuth()
  
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.get(`/propiedades/${id}`);
        setResults(response.data.propiedad);
      } catch (error) {
        console.error("Error al realizar la búsqueda", error);
      }
    };

    if (id) {
      fetchResults();
    }
  }, [id]);
console.log(result);

  return (
    <>
      {result ? (
     <section
     className={`flex flex-col gap-4 mx-2 my-5 ${
       user?.id === result.usuarioId
         ? 'customlg:mx-36' // No aplica estilos de grilla
         : 'customlg:grid customlg:grid-cols-[repeat(35%,65%)] customlg:mt-10 customlg:mx-36'
     }`}
   >
          <PropiedadImagen fotoPath={result?.foto?.url} />
          <div className="flex flex-col gap-4 ">
            <PropiedadInfo
              titulo={result.titulo}
              precio={result?.precio?.precio}
              moneda={result?.precio?.moneda}
              calle={result.calle}
              ambientes={result.ambientes}
              dormitorios={result.dormitorios}
              banos={result.banos}
              cochera={result.cochera}
              metros={result.metros}
            />
            <PropiedadDescripcion descripcion={result.descripcion} />
            <PropiedadMapa lat={result.lat} lng={result.lng} />
          </div>
         {
          user?.id !== result.usuarioId ? <FormularioContacto/> : null
         }
        </section>
      ) : (
        <p>No hay resultado</p>
      )}
      <Footer />
    </>
  );
};

export default DetallesPropiedad;
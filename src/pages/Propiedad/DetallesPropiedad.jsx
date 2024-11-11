import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import FormularioContacto from "../../components/FormularioContacto/FormularioContacto";
import { PropiedadImagen, PropiedadInfo, PropiedadDescripcion, PropiedadMapa } from ".";
import api from "../../utils/axiosConfig";

const DetallesPropiedad = () => {
  const [result, setResults] = useState(null);
  const { id } = useParams();

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

  return (
    <>
      <Header />
      {result ? (
        <section className="flex flex-col customlg:grid customlg:grid-cols-[repeat(35%,65%)] gap-4 customlg:mt-10 customlg:mx-36 mx-2 my-5">
          <PropiedadImagen fotoPath={result?.foto?.path} />
          <div className="flex flex-col gap-4 ">
            <PropiedadInfo
              titulo={result.titulo}
              precio={result?.precio?.precio}
              moneda={result?.precio?.moneda}
              calle={result.calle}
              ambientes={result.ambientes}
              dormitorios={result.dormitorios}
              banos={result.baños}
              cochera={result.cochera}
              metros={result.metros}
            />
            <PropiedadDescripcion descripcion={result.descripcion} />
            <PropiedadMapa lat={result.lat} lng={result.lng} />
          </div>
          <FormularioContacto />
        </section>
      ) : (
        <p>No hay resultado</p>
      )}
      <Footer />
    </>
  );
};

export default DetallesPropiedad;
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CardPropiedad from "../components/CardPropiedad/CardPropiedad";
import api from "../utils/axiosConfig";

const ResultadoBusqueda = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);

  // Extrae el término de búsqueda desde los parámetros de la URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  useEffect(() => {
    // Realiza la búsqueda cuando el componente se carga o el query cambia
    const fetchResults = async () => {
      try {
        const response = await api.get(`/categorias/buscar?query=${query}`)
        setResults(response.data.propiedades)
      } catch (error) {
        console.error("Error al realizar la búsqueda", error)
      }
    }

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div>
      <Header />
      <h2>Resultados de búsqueda para: {query}</h2>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-20 bg-green-700">
        {results.length > 0 ? (
          results.map((result) => (
            <CardPropiedad result={result} key={result.titulo}/>
          ))
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
      <Footer />
    </div>
  );

}



export default ResultadoBusqueda
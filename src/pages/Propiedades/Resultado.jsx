import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../utils/axiosConfig';

const Resultado = ()=>{
    // const { category } = useParams();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const category = searchParams.get('category');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
console.log(results);

console.log(category);

useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
  
        // Solo construye la URL si hay query o category
        const url = query && category
          ? `/buscar?query=${query}&category=${category}`
          
          : category
          ? `/buscar/categoria?category=${category}`
          : null;  // No hace la llamada si no hay ni query ni category
  
        // Si no hay parámetros, no ejecuta la solicitud
        if (!url) return;
  
        console.log("Llamada a API:", url);
  
        // Llamar a la API
        const response = await api.get(url);
        setResults(response.data.data);
      } catch (err) {
        setError("Hubo un problema al obtener los resultados.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    // Realiza la búsqueda si hay query o category
    if (query || category) fetchResults();
  }, [query, category]);
      
        if (loading) return <p>Cargando resultados...</p>;
      
        return (
            <div>
              <h1>
                Resultados para &quot;{query}&quot; {category && `en la categoría "${category}"`}
              </h1>
              {results.length === 0 ? (
                <p>No se encontraron resultados.</p>
              ) : (
                <ul>
                  {results.map((result) => (
                    <li key={result.id}>
                      <h2>{result.titulo}</h2>
                      <p>{result.descripcion}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        };


export default Resultado
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import CardPropiedad from "./components/CardPropiedad";
import api from "../../utils/axiosConfig";
import { useNavigate, useSearchParams } from "react-router-dom";


const ResultadoBusqueda = () => {
  const [results, setResults] = useState([]);
  const [userCache, setUserCache] = useState({}); // Caché para usuarios
  const [categorias, setCategorias] = useState([])
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const category = searchParams.get('category');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
console.log( results);

  const navigate = useNavigate();
  
  useEffect(() => {
      const fetchCategories = async () => {
          try {
              const { data } = await api.get('/categorias');
              const categoriasFormateadas = data.categorias.map(cat => ({
                  id: cat.id,
                  name: cat.name 
              }));
              setCategorias(categoriasFormateadas)
          } catch (error) {
              console.error('Error fetching categories:', error);
          }
      };

      fetchCategories();
  }, []);

  const formatCategory = (category) => {
    return category.replace(/\s+/g, '-').toLowerCase(); // Ejemplo: "Local Comercial" -> "local-comercial"
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const formattedCategory = category ? formatCategory(category) : null;

        
        // Solo construye la URL si hay query o category
        const url = query && category
          ? `/buscar?query=${query}&category=${formattedCategory}`
          
          : category
          ? `/buscar?category=${formattedCategory}`
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
  

  // Cargar usuarios relacionados con las propiedades
  useEffect(() => {
    const fetchUsers = async () => {
      const uniqueUserIds = [...new Set(results.map((result) => result.usuarioId))];

      const newUserCache = { ...userCache };
      for (const userId of uniqueUserIds) {
        if (!newUserCache[userId]) {
          try {
            const { data } = await api.get(`/usuarios/${userId}`);
            newUserCache[userId] = data;
          } catch (error) {
            console.error(`Error al cargar datos del usuario ${userId}:`, error);
          }
        }
      }
      setUserCache(newUserCache);
    };

    if (results.length > 0) {
      fetchUsers();
    }
  }, [results]);

  const handleSearch = (category) => {
    const categoria = formatCategory(category)
    navigate(`/buscar?category=${categoria}`)
}
  

  return (
    <div>
           <ul className="md:flex md:flex-row md:gap-4 md:justify-center md:items-center bg-[var(--color-primary)] p-2">
                {categorias.length > 0 ? (
                    categorias.map((categoria) => (
                        <li
                            key={categoria.id} 
                            onClick={() => handleSearch(categoria.name)} 
                            className="relative group text-white cursor-pointer">
                            {categoria.name} 
                            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#6343c6] rounded-md scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </li>
                    ))
                ) : (
                    <p>nada</p>
                )}
            </ul>
      <h2>Resultados de búsqueda para: {query}</h2>
      <div className="min-h-[70vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-20">
        {results.length > 0 ? (
          results.map((result) => (
            <CardPropiedad
              result={result}
              key={result.id}
              usuario={userCache[result.usuarioId]} // Pasar el usuario directamente
            />
          ))
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ResultadoBusqueda;
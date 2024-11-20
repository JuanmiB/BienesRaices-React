import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { House, Terrain, Market, Garage, Offices, EstateHouse, Department, Cabana } from '../../../icons/icon';
import api from '../../../utils/axiosConfig';

const iconMapping = {
    Casas: <House />,
    Quinta: <EstateHouse />,
    'Local Comercial': <Market />,
    'Oficina Comercial': <Offices />,
    Garage: <Garage />,
    Terreno: <Terrain />,
    Edificio: <Department />,
    Cabaña: <Cabana />
};

const CardCategories = () => {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    // Manejar la navegación al hacer clic en una categoría
    const handleSearch = (category) => {
        setLoading(true);
        navigate(`/buscar?category=${category}`);
        // Simular la finalización de la navegación
        setTimeout(() => setLoading(false), 500);
    };


    // Obtener categorías desde la API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/categorias'); // Realiza la petición
                const categoriasFormateadas = data.categorias.map(cat => ({
                    id: cat.id,   // Asignar el ID de la categoría
                    name: cat.name // Asignar el nombre de la categoría
                }));
                setCategorias(categoriasFormateadas); // Actualizar el estado con el array de objetos
            } catch (error) {
                console.error('Error fetching categories:', error);
            
            }
            finally {
                setLoading(false); // Cambiar el estado de `loading` a `false`
            }
        };

        fetchCategories();
    }, []);

    // Renderizar las categorías
    return (
        <div className="grid grid-cols-2 gap-4">
            {loading ? (
                <p className="text-center col-span-2">Cargando categorías...</p>
            ) : (
                categorias.map((categoria) => (
                    <div
                        key={categoria.id}
                        className="grid grid-cols-2 items-center border rounded cursor-pointer hover:shadow-lg"
                        onClick={() => handleSearch(categoria.name)}
                    >
                        <span className="flex items-center justify-center bg-gray-200 p-4">
                            {iconMapping[categoria.name] || <House />}
                        </span>
                        <span className="p-4 flex items-center justify-center font-medium text-gray-700">
                            {categoria.name}
                        </span>
                    </div>
                ))
            )}
        </div>
    );
};

export default CardCategories;
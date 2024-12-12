import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState, useCallback } from 'react';
import api from '../../utils/axiosConfig';


const MisPropiedades = ({ pagina, paginaActual, total, limit, offset, paginas }) => {

    const { user, isAuthenticated, loading } = useAuth()
    const [propiedades, setPropiedades] = useState([])
    const [filteredPropiedades, setFilteredPropiedades] = useState([])
    const [categorias, setCategorias] = useState([])
    const [selectedCategoria, setSelectedCategoria] = useState('')

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta propiedad?');
        if (confirmDelete) {
            try {
                await api.delete(`/admin/mis-propiedades/eliminar/${id}`)
                alert('Propiedad eliminada con éxito');
                setPropiedades((prevPropiedades) =>
                    prevPropiedades.filter((propiedades) => propiedades.id !== id))
            } catch (error) {
                console.error('Error al eliminar la propiedad:', error);
                alert('No se pudo eliminar la propiedad. Intenta nuevamente.');
            }
        }
    };

    const fetchPropiedades = async () => {
        try {
            const response = await api.get('/admin/mis-propiedades')

            const { data: { propiedad } } = response
            setPropiedades(propiedad)
            setFilteredPropiedades(propiedad)
        }
        catch (error) {
            console.error('Error al obtener las propiedades', error);

        }
    }

    const fetchCategorias = async () => {
        try {
            const response = await api.get('/categorias')
            const { data: { categorias } } = response
            setCategorias(categorias)

        } catch (error) {
            console.error('Error al obtener las categorias', error);

        }
    }

    useEffect(() => {
        // Llamada a las funciones de fetch cuando sea necesario
        if (isAuthenticated && !loading) {
            fetchPropiedades();
            fetchCategorias();
        }
    }, [isAuthenticated, loading]);

    const handleFilterChange = (e) => {
        const categoria = e.target.value;
        setSelectedCategoria(categoria);

        // Filtrar las propiedades dependiendo de si hay o no una categoría seleccionada
        if (categoria === '') {
            setFilteredPropiedades(propiedades); // Mostrar todas las propiedades
        } else {
            console.log(propiedades);

            const propiedadesFiltradas = propiedades.filter(
                (propiedad) => propiedad.categoriaId == categoria
            );
            setFilteredPropiedades(propiedadesFiltradas);
        }
    };
    console.log(filteredPropiedades);



    return (
        <>
            <div className="py-10 flex flex-col items-center mx-5 md:mx-10">
                <h1 className="text-4xl my-10 font-extrabold text-center">
                    Bienes <span className="font-normal">Raices</span>
                </h1>
                <h2 id="propiedades" className="text-center text-2xl font-extrabold">{pagina}</h2>

                <Link to="crear-propiedad" className="rounded py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-sm font-bold text-center text-white uppercase my-5 inline-block w-full sm:w-auto">
                    Publicar Propiedad
                </Link>

                {user && propiedades.length ? (
                    <div className="bg-white shadow rounded-lg">
                        <div className='border-b flex flex-row items-center justify-center gap-2 p-4'>
                            <p>Buscar:</p>
                            <select name="" id="" onChange={handleFilterChange} value={selectedCategoria}>
                                <option value="">Todas</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <ul className="divide-y divide-gray-200 w-[80vw]">
                            {
                                filteredPropiedades && filteredPropiedades.length > 0 ? (
                                    filteredPropiedades.map((propiedad, index) => (
                                        <li key={propiedad.id} className="py-5">
                                            <div className="p-6 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-8 gap-4">
                                                <div className="sm:w-1/4 md:w-1/6">
                                                    <img src={`${propiedad?.foto?.url}`} alt={`Imagen de la propiedad ${propiedad.titulo}`} />
                                                </div>
                                                <div className="sm:w-2/4 md:w-3/6 lg:w-4/6">
                                                    <Link to={`/propiedades/${propiedad.id}`}>{propiedad.titulo}</Link>
                                                    <p>{propiedad?.categoria?.name}</p>
                                                    <p>${propiedad?.precio?.precio}</p>
                                                    <small>{propiedad.calle}</small>
                                                    <p>N° {index + 1}</p>
                                                </div>
                                                <div className="sm:w-1/4 md:w-2/6 lg:w-1/6 flex flex-col gap-2">
                                                    <button className={`font-bold rounded text-center py-1 px-3 cursor-pointer ${propiedad.publicado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {propiedad.publicado ? "Publicado" : "No publicado"}
                                                    </button>
                                                    <Link to={`editar/${propiedad.id}`} className="font-bold rounded bg-blue-200 text-center py-1 px-3 text-blue-900 cursor-pointer">
                                                        Editar
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(propiedad.id)}
                                                        className="w-full font-bold rounded bg-red-200 text-center py-1 px-3 text-red-900 cursor-pointer"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <div className='flex flex-col items-center justify-center p-10 h-[50vh]'>
                                    <p>No hay propiedades disponibles.</p>
                                    </div>
                                )
                            }
                        </ul>

                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <Link to={`mis-propiedades?pagina=${paginaActual - 1}`} className={`${paginaActual === 1 ? 'pointer-events-none' : ''} relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}>
                                    Anterior
                                </Link>
                                <Link to={`mis-propiedades?pagina=${paginaActual + 1}`} className={`${paginaActual === paginas ? 'pointer-events-none' : ''} relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}>
                                    Siguiente
                                </Link>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <p className="text-sm text-gray-700 gap-2">
                                    Mostrando
                                    <span className="font-medium">{offset + 1} a </span>
                                    <span className="font-medium">{total < limit + offset ? total : limit + offset} de</span>
                                    <span className="font-medium">{total} resultados</span>
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <nav className="relative z-0 inline-flex rounded-md shadow-md">
                                    {Array.from({ length: paginas }, (_, n) => (
                                        <Link key={n + 1} to={`mis-propiedades?pagina=${n + 1}#propiedades`} className={`${paginaActual === n + 1 ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}>
                                            {n + 1}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No hay propiedades publicadas todavía</p>
                )}
            </div>
        </>
    )
}

export default MisPropiedades
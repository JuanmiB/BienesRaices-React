import { useState, useEffect } from "react";
import MapComponent from "../../../components/Mapa/Mapa";
import api from "../../../utils/axiosConfig";
import getAddress from "../../../utils/getAdrees";

export const FormularioPropiedad = ({ values, handleChange, handleSubmit, handleLatLng, handleAddress, onSubmit, isEditable }) => {
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Simultáneamente obtenemos las categorías y configuramos el mapa
                const response = await api.get('/categorias');
                setCategorias(response.data.categorias);

                if (navigator.geolocation) {
                    isEditable && 
                    navigator.geolocation.getCurrentPosition(
                        (pos) => {
                            const userLat = pos.coords.latitude;
                            const userLng = pos.coords.longitude;
                            handleLatLng(userLat, userLng);
                        },
                        () => handleLatLng(values.lat, values.lng)
                    );
                } else {
                    handleLatLng(values.lat, values.lng);
                }
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
            } finally {
                setLoading(false); // Se finalizó la carga
            }
        };

fetchInitialData()
    }, []);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const address = await getAddress(values.lat, values.lng)
                console.log(address.address.road);
                handleAddress(address.address.road)
            } catch (error) {
                console.error(error);
            }
        }
        if (values.lat && values.lng) {
            fetchAddress()
        }
    }, [values.lat, values.lng])


    if (loading) {
        return <p className="text-center text-lg font-medium">Cargando datos, por favor espera...</p>;
    }

    return (
        <form onSubmit={(event) => handleSubmit(event, onSubmit)} className="space-y-6">
            <label className="block">
                <span className="text-gray-600 font-medium">Título del anuncio</span>
                <input
                    type="text"
                    name="titulo"
                    value={values.titulo}
                    onChange={handleChange}
                    placeholder="Título de la propiedad"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                />
            </label>

            <label className="block">
                <span className="text-gray-600 font-medium">Describe tu propiedad</span>
                <textarea
                    name="descripcion"
                    value={values.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción..."
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                />
            </label>

            <CategoriaPrecio values={values} handleChange={handleChange} categorias={categorias} />

            <CamposPropiedad values={values} handleChange={handleChange} />


            <div className="p-4">
                <h3>Mapa</h3>
                <p>Selecciona la ubicación de la propiedad</p>
                <p>{values.calle ? values.calle : 'No hay calle'}</p>
                <MapComponent
                    lat={values.lat}
                    lng={values.lng}
                    onChange={handleLatLng}
                    handleAddress={handleAddress}
                    isEditable
                />
            </div>
            <button type="submit" className="bg-emerald-500 text-white py-2 px-4 rounded-md">Publicar</button>
        </form>
    );
};

export const CategoriaPrecio = ({ values, handleChange, categorias, isEditable = true }) => {
    console.log('LOS VALUES DE LA CAAATASDASD');
    console.log(values);
    console.log(categorias);
    
    return (
        <div className="border-2 border-gray-200 p-4 rounded-md space-y-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">
            <label className="block mt-4">
                <span className="text-gray-600 font-medium mr-2">Categoría:</span>
                <select
                    name="categoriaId"
                    value={values.categoriaId}
                    onChange={handleChange}
                    className="lg:w-1/3 h-[42px] mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                >
                    <option value="">Seleccionar...</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.name}
                        </option>
                    ))}
                </select>
            </label>

            <label className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium mr-2">Precio:</span>
                <input
                    type="text"
                    name="precio"
                    value={values.precio}
                    onChange={handleChange}
                    placeholder="10000 - 50000"
                    className="lg:w-2/3 w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                />
            </label>
        </div>
    );
};

export const CamposPropiedad = ({ values, handleChange }) => {
    return (
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <label className="block">
                <input
                    type="text"
                    name="ambientes"
                    value={values.ambientes}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                />
                <span className="text-gray-600 font-medium">Ambientes</span>
            </label>

            <label className="block">
                <input
                    type="text"
                    name="dormitorios"
                    value={values.dormitorios}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                />
                <span className="text-gray-600 font-medium">Dormitorios</span>
            </label>

            <label className="block">
                <input
                    type="text"
                    name="banos"
                    value={values.banos}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                />
                <span className="text-gray-600 font-medium">Baños</span>
            </label>

            <label className="block">
                <input
                    type="text"
                    name="cochera"
                    value={values.cochera}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                />
                <span className="text-gray-600 font-medium">Cochera</span>
            </label>

            <label className="block">
                <input
                    type="text"
                    name="metros"
                    value={values.metros}
                    onChange={handleChange}
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-300"
                />
                <span className="text-gray-600 font-medium">Metros cuadrados</span>
            </label>
        </div>
    );
};
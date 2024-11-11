import api from '../../utils/axiosConfig.js'
import MapComponent from "../../components/Mapa/Mapa.jsx"
import { useRef, useEffect, useState } from "react"
import useForm from '../../hooks/useForm.jsx';
import Header from '../../components/Header/Header.jsx';
import getAdress from '../../utils/getAdrees.js';
const CrearPropiedad = () => {
    const [categorias, setCategorias] = useState([])


    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await api.get('/categorias')
                setCategorias(response.data.categorias)
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };
        fetchCategorias();
    }, []);

    const renderCount = useRef(0)
    renderCount.current += 1

    const initialValues = {
        titulo: "",
        descripcion: "",
        categoria: "",
        precio: "",
        ambientes: "",
        dormitorios: "",
        calle: "",
        baños: "",
        cochera: "",
        metros: "",
        lat: 0,
        lng: 0
    }

    const { values, handleChange, handleSubmit, resetForm, handleLatLng, handleAddress } = useForm(initialValues)

    // Intento de obtener ubicación del usuario
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    console.log('seteo');

                    const userLat = pos.coords.latitude;
                    const userLng = pos.coords.longitude;
                    handleLatLng(userLat.toString(), userLng.toString()); // Actualiza los valores de lat y lng en el formulario
                },
                () => {
                    // En caso de error, usa la posición predeterminada
                    handleLatLng(values.lat, values.lng);
                }
            );
        } else {
            // Si la geolocalización no está disponible
            handleLatLng(initialValues.lat, initialValues.lng);
        }
    }, []);

    // ACA ESTA EL ERROR
    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const addressData = await getAdress({ lat: values.lat, lng: values.lng });
                if (addressData && addressData.display_name) {
                    const address = `${addressData.address.house_number || ''} ${addressData.address.road || ''}, ${addressData.address.city || ''}`.trim();
                    handleAddress(address);
                } else {
                    handleAddress("Dirección no encontrada.");
                }
            } catch (error) {
                console.error("Error al obtener la dirección:", error);
            }
        };

        if (values.lat && values.lng) {
            fetchAddress();

        }
    }, [values.lat, values.lng]);


    const onSubmit = async (data) => {
        //Aca tengo que hacer el post
        console.log('Datos de formulario', data);

        try {
            await api.post('/admin/mis-propiedades/crear-propiedad', { data })

        } catch (error) {
            console.log(error);

        }
        resetForm()
    }

    useEffect(() => {
        console.log(`El componente Formulario se ha renderizado ${renderCount.current} veces.`);
    });

    console.log('LOS VALORES', values);

    return (
        <>
            <Header />
            <section className="border border-emerald-500 p-6 my-4 max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-emerald-600 mb-4">Publicar</h2>
                <h3 className="text-xl font-medium text-gray-700 mb-6">Información General</h3>
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

                    <div className="border-2 border-gray-200 p-4 rounded-md space-y-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">
                        <label className="block mt-4">
                            <span className="text-gray-600 font-medium mr-2">Categoría:</span>
                            <select
                                name="categoria"
                                value={values.categoria}
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
                                name="baños"
                                value={values.baños}
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

                        <label className="col-span-2 block">
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
                    <button type="submit" className="bg-emerald-500 text-white py-2 px-4 rounded-md">Publicar</button>
                </form>

                <div className="p-4">
                    <h3>Mapa</h3>
                    <p>Selecciona la ubicación de la propiedad</p>
                   <p>{
                    values.calle ? values.calle : 'No hay calle'
                    }</p>
                                
                    <MapComponent
                        lat={values.lat}
                        lng={values.lng}
                        onChange={handleLatLng}
                        isEditable
                    />
                </div>
            </section>
        </>
    );
};

export default CrearPropiedad;
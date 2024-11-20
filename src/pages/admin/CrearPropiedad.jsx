import { useRef, useState } from "react";
import api from '../../utils/axiosConfig.js';
import useForm from '../../hooks/useForm.jsx';
import { FormularioPropiedad } from './components/FormularioPropiedad.jsx';
import Dropzone from "./components/Dropzone.jsx";

const CrearPropiedad = () => {
  const [imagen, setImagen] = useState(null);
  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log(`El formulario se renderizo: ${renderCount.current}`);

  const initialValues = {
    titulo: "",
    descripcion: "",
    categoria: "",
    precio: "",
    ambientes: "",
    dormitorios: "",
    calle: "",
    banos: "",
    cochera: "",
    metros: "",
    lat: 0,
    lng: 0
  };

  const { values, handleChange, handleSubmit, resetForm, handleLatLng, handleAddress } = useForm(initialValues)

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      // Agregar datos del formulario
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      })
      // Agregar la imagen seleccionada
      if (imagen) {
        formData.append("imagen", imagen); // La clave "imagen" debe coincidir con lo que espera tu backend
      }
      const response = await api.post('/admin/mis-propiedades/crear-propiedad', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log('Respuesta del servidor:', response.data)
      resetForm()
    } catch (error) {
      console.error('Error al enviar datos:', error)
    }
  }

  return (
    <>
      <section className="border border-emerald-500 p-6 my-4 max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-emerald-600 mb-4">Publicar</h2>
        <h3 className="text-xl font-medium text-gray-700 mb-6">Información General</h3>
        <Dropzone setImagen={setImagen} />
        <FormularioPropiedad
          values={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleLatLng={handleLatLng}
          handleAddress={handleAddress}
          onSubmit={onSubmit}
        />
      </section>
    </>
  );
};

export default CrearPropiedad;
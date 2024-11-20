import { useEffect, useRef, useState } from "react";
import api from '../../utils/axiosConfig.js';
import useForm from '../../hooks/useForm.jsx';
import { FormularioPropiedad } from './components/FormularioPropiedad.jsx';
import Dropzone from "./components/Dropzone.jsx";
import { useParams } from "react-router-dom";

const EditarPropiedad = () => {
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(true);
  const renderCount = useRef(0);
  const {id} = useParams()
  renderCount.current += 1;
  console.log(`El formulario se renderizó: ${renderCount.current}`);

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
    lng: 0,
  };

  const { values, setValues, handleChange, handleSubmit, resetForm, handleLatLng, handleAddress } = useForm(initialValues);
console.log(values);

  // Cargar los datos de la propiedad al montar
  useEffect(() => {
    const fetchPropiedad = async () => {
      try {
        const response = await api.get(`/propiedades/${id}`);
        const data = response.data.propiedad;
        console.log(data.propiedad);
        
        setValues({
          titulo: data.titulo,
          descripcion: data.descripcion,
          categoria: data.categoria,
          precio: data?.precio?.precio,
          ambientes: data.ambientes,
          dormitorios: data.dormitorios,
          calle: data.calle,
          banos: data.banos,
          cochera: data.cochera,
          metros: data.metros,
          lat: data.lat,
          lng: data.lng,
        });
        setImagen(data.imagen); // Carga la imagen si es necesario
      } catch (error) {
        console.error("Error al cargar la propiedad:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropiedad();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      // Agregar datos del formulario
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      // Agregar la imagen seleccionada
      if (imagen) {
        formData.append("imagen", imagen);
      }

      const response = await api.put(`/admin/mis-propiedades/editar/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Propiedad actualizada:", response.data);
    } catch (error) {
      console.error("Error al actualizar la propiedad:", error);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <section className="border border-blue-500 p-6 my-4 max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Editar Propiedad</h2>
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
  );
};

export default EditarPropiedad;
import { useState } from "react";

const useForm = (initialValue) => {
    const [values, setValues] = useState(initialValue)

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues({ ...values, [name]: value})
    }

    const resetForm = () => {
        setValues(initialValue)
    }

    const handleSubmit = (event, onSubmit) =>{
        event.preventDefault()
        if(onSubmit) onSubmit(values)
    }

    const handleLatLng = (lat, lng) => {
        setValues({ ...values, lat, lng})
    }

    const handleAddress = (address) => {
        setValues({ ...values, calle: address });
      };

      const handleFile = (file) => {
        setValues({ ...values, file }); // Guardamos el archivo en el estado
      };
    
return {
    values,
    handleChange,
    resetForm,
    handleSubmit,
    handleLatLng,
    handleAddress,
    handleFile,
    setValues
}
}
export default useForm
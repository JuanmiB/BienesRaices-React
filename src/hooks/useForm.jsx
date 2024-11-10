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
        //personlizar
        console.log('Enviando', values);
        if(onSubmit) onSubmit(values)
    }

    const handleLatLng = (lat, lng) => {
        setValues({ ...values, lat, lng})
    }

    const handleAddress = (address) => {
        setValues({ ...values, calle: address });
      };
return {
    values,
    handleChange,
    resetForm,
    handleSubmit,
    handleLatLng,
    handleAddress
}
}
export default useForm
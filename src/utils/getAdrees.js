import axios from "axios";

const getAddress = async (lat, lng ) => {
    console.log("Latitud y longitud recibidas:", lat, lng);

    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;
    try {
        const response = await axios.get(url);
        if (response.data) {
            console.log("Respuesta de OpenStreetMap:", response.data);
            return response.data;  // Devolvemos solo los datos de la respuesta
        } else {
            console.log("No se recibió información de la dirección.");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener la dirección:", error);
        return null;
    }
};

export default getAddress;
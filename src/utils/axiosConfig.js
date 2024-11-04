import axios  from "axios";

//Se crea la instancia de Axios 
const api = axios.create({
    baseURL: 'http://localhost:1234',
    withCredentials: true
})
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Axios interceptor para agregar el token desde la cookie
api.interceptors.request.use(
    (config) => {
        // Obtiene el token de la cookie `_token`
        const token = getCookie('_token');
        console.log(token, "TOKEN DESDE COOKIES");

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        console.log('Error al obtener el token de cookies');
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response && error.response.status === 401){
            console.log("Error de auntenticacion. Vuelve a iniciar");
            window.location.href = '/auth/acceder'
        } else if (error.response && error.response.status >= 500) {
            console.error("Error en el servidor.");
        }
        return Promise.reject(error);
    }
)

export default api
import axios  from "axios";

//Se crea la instancia de Axios 
const api = axios.create({
    baseURL: 'http://localhost:1234',
    withCredentials: true
})

api.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token')
        // console.log(token,"SACO TOKEN DE LOCALSTORAGE SI HAY");
        
        // if (token) {
        //     config.headers['Authorization'] = `Bearer ${token}`
        // }
        return config
    }, (error) =>{
        console.log('no token');
        
        return Promise.reject(error)
    }
)

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         if(error.response && error.response.status === 401){
//             console.log("Error de auntenticacion. Vuelve a iniciar");
//             window.location.href = '/auth/acceder'
//         } else if (error.response && error.response.status >= 500) {
//             console.error("Error en el servidor.");
//         }
//         return Promise.reject(error);
//     }
// )

export default api
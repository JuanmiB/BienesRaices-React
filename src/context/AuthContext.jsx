import { useEffect, useState, createContext, useContext, useRef } from "react";
import PropTypes from "prop-types";
import api from "../utils/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    const renderCount = useRef(0)
    renderCount.current += 1 
  
    


    const login = async (email, password) => {
        try {
            const response = await api.post(
                '/auth/acceder',
                { email, password }
            );
            setIsAuthenticated(true);
            console.log(response?.data?.user);
            setError(false)
            setUser(response?.data?.user);
        } catch (error) {
            setError(error)
            console.error("Error de autenticación:", error.response?.data?.message);
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            setError(error)
            console.error("Error al cerrar sesión:", error);
        }
    };

    const register = async({name, email, password}) => {
        try {
            const response = await api.post(
                'auth/register', { name, email, password}
            )
            console.log(response);
            
            setUser(response?.usuario)
        } catch (error) {
            console.error(error);
            
        }
    }
    
    const recoverPassword = async (email) => {
        try {
            await api.post('/auth/recover-password', {email})
        } catch (error) {
            setError(error)
            console.log('Error al recuperar contraseña', error);
        }
    }

    const resetPassword = async (newPassword, token) => {
        setLoading(true);
        try {
          // Hacemos la solicitud al backend para restablecer la contraseña
          const response = await api.post(`/auth/reset-password/${token}`, {
            password: newPassword,
            token: token
          });
    
          // Si la respuesta es exitosa, informamos que se cambió la contraseña
          console.log('Contraseña restablecida:', response.data);
          setIsAuthenticated(false); // Podrías querer cerrar la sesión después de un restablecimiento
          // Puedes redirigir a la página de login, dependiendo de tu flujo
        } catch (error) {
          // Si hubo un error, lo mostramos en el estado
          setError(error.response ? error.response.data : 'Error desconocido');
          console.error('Error al restablecer la contraseña:', error);
        } finally {
          setLoading(false);
        }
      };



    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await api.get('/auth/verify')
                setIsAuthenticated(true)
                const {name, sub: id} = response.data.user
                setUser({name,id})
            } catch {
                setIsAuthenticated(false)
            } finally {
                setLoading(false)
            }
        };
        verifyAuth();
    }, []);

    useEffect(() => {
            console.log(`El componente AuthProvider se ha renderizado ${renderCount.current} veces.`);
        });
    

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading ,error, setError, recoverPassword, resetPassword, register }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export const useAuth = () => useContext(AuthContext);
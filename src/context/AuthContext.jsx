import { useEffect, useState, createContext, useContext, useRef } from "react";
import PropTypes from "prop-types";
import api from "../utils/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const renderCount = useRef(0)
    renderCount.current += 1 


    const login = async (email, password) => {
        try {
            const response = await api.post(
                '/auth/acceder',
                { email, password }
            );
            setIsAuthenticated(true);
            console.log('Seteando user');
            console.log(response?.data?.user);
            
            setUser(response?.data?.user);
        } catch (error) {
            console.error("Error de autenticación:", error.response?.data?.message);
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                console.log('Verificando usuario');
                
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
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export const useAuth = () => useContext(AuthContext);
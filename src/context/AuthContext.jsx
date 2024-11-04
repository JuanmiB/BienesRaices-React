
import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        try {
            const response = await axios.post(
                'http://localhost:1234/auth/acceder',
                { email, password },
                { withCredentials: true } 
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
            await axios.post('http://localhost:1234/auth/logout', {}, { withCredentials: true });
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    useEffect(() => {
        const verifyAuth = async () => {
            console.log("Verificando");
            
            try {
                console.log('try');
                
                const response = await axios.get('http://localhost:1234/auth/verify', { withCredentials: true })
                console.log("autenticando");
                
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

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
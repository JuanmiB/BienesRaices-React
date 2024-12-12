import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        // Muestra un spinner, mensaje o cualquier indicador de carga mientras se verifica la autenticación.
        return <div>Cargando...</div>;
    }

    // Si no está autenticado, redirige al usuario a la página de login
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/acceder" />;
};

export default PrivateRoute;
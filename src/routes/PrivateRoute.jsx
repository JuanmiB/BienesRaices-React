import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const {isAuthenticated, loading} = useAuth()
    console.log("AUTENTICADO", isAuthenticated);
    if(!loading){
        return isAuthenticated ? <Outlet/> : <Navigate to='/auth/acceder'/>
    }
}

export default PrivateRoute
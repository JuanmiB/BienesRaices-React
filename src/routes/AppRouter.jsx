import { Route, Routes } from "react-router-dom";
// import ResultadoBusqueda from "../pages/Propiedades/ResultadoBusqueda";
import DetallesPropiedad from "../pages/Propiedad/DetallesPropiedad";
import Acceder from "../pages/auth/Acceder";
import MisPropiedades from "../pages/Admin/MisPropiedades";
import { useAuth } from "../context/AuthContext";
import PrivateRoute from "../routes/PrivateRoute";
import CrearPropiedad from "../pages/Admin/CrearPropiedad";
import { Inicio } from "../pages/Inicio";
import { useRef } from "react";
import CrearCuenta from "../pages/auth/CrearCuenta";
import RecuperarContraseña from "../pages/auth/RecuperarContraseña";
import Header from "../components/Header/Header";
import RestablecerContraseña from "../pages/auth/RestablecerContraseña";
import Resultado from "../pages/Propiedades/Resultado";
import ResultadoBusqueda from "../pages/Propiedades/ResultadoBusqueda";
import EditarPropiedad from "../pages/Admin/EditarPropiedad";
const AppRouter = () => {
    const { isAuthenticated } = useAuth()
    const renderCount = useRef(0);
    renderCount.current += 1;
    console.log(`El app se renderizo: ${renderCount.current}`);
    return (
      <>
      <Header/>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/buscar" element={<ResultadoBusqueda />} />
          <Route path="/propiedades/:id" element={<DetallesPropiedad />} />
          <Route path="/auth/acceder" element={<Acceder />} />
          <Route path="/auth/crear-cuenta" element={<CrearCuenta />} />
          <Route path="/auth/recuperar-contraseña" element={<RecuperarContraseña />} />
          <Route path="/auth/reset-password/:token" element={<RestablecerContraseña />} />
  
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/admin/mis-propiedades" element={<MisPropiedades />} />
            <Route path="/admin/mis-propiedades/crear-propiedad" element={<CrearPropiedad isEditable/>} />
            <Route path="/admin/mis-propiedades/editar/:id" element={<EditarPropiedad />} />
          </Route>
        </Routes>
      </>
    );
  };
  
  export default AppRouter;
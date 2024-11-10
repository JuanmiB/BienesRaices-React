import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ResultadoBusqueda from "./pages/ResultadoBusqueda";
import DetallesPropiedad from "./pages/DetallesPropiedad";
import Acceder from "./pages/auth/Acceder";
import MisPropiedades from "./pages/admin/MisPropiedades";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import CrearPropiedad from "./pages/admin/CrearPropiedad";

const App = () => {
  const { isAuthenticated } = useAuth()
  return (
    <>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias/buscar" element={<ResultadoBusqueda />} />
        <Route path="/propiedades/:id" element={<DetallesPropiedad />} />
        <Route path="/auth/acceder" element={<Acceder />} />

        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/admin/mis-propiedades" element={<MisPropiedades />} />
          <Route path="/admin/mis-propiedades/crear-propiedad" element={<CrearPropiedad />} />
        </Route>
      </Routes>



    </>
  );
};

export default App;
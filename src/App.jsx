import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ResultadoBusqueda from "./pages/ResultadoBusqueda";
import DetallesPropiedad from "./pages/DetallesPropiedad";
import Acceder from "./pages/auth/Acceder";
import MisPropiedades from "./pages/admin/MisPropiedades";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";

const App = () => {
const {isAuthenticated} = useAuth()
  return (
    <>
    
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias/buscar" element={<ResultadoBusqueda />} />
        <Route path="/propiedades/:id" element={<DetallesPropiedad />} />
        <Route path="/auth/acceder" element={<Acceder />} />

        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/admin/mis-propiedades" element={<MisPropiedades />} />
          <Route path="/admin/agregar-propiedad" element={<MisPropiedades />} />
          <Route path="/admin/editar" element={<MisPropiedades />} />
        </Route>
      </Routes>

    
    
    </>
  );
};

export default App;
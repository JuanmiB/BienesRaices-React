import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ResultadoBusqueda from "./pages/ResultadoBusqueda";
import DetallesPropiedad from "./pages/DetallesPropiedad";

const App = () => {
  console.log('hola soy el componenete app');
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias/buscar" element={<ResultadoBusqueda />} />
        <Route path="/propiedades/:id" element={<DetallesPropiedad />} />



      </Routes>
    </div>
  );
};

export default App;
import { useEffect, useState } from 'react';
import Footer from "../../components/Footer/Footer";
import Search from './components/Search';
import CardCategories from "./components/CardCategories";
import api from '../../utils/axiosConfig';

const ops = ['Comprar', 'Alquilar', 'Obra nueva', 'Compartir'];

const Inicio = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categorias');
        const nombreCat = data.categorias.map(cat => cat.name);
        setCategories(nombreCat);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Search radioOps={ops} selectOps={categories} />
      {/* Contenido */}
      <section className="md:min-h-[70vh] p-4 flex items-center justify-center">
              <CardCategories  />
      </section>
      <Footer />
    </>
  );
};

export default Inicio;
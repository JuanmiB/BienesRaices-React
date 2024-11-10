import { useEffect, useState } from 'react';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Search from "../components/Search/Search";
import CardCategories from '../components/CardCategorie/CardCategories';
import api from '../utils/axiosConfig';

const ops = ['Comprar', 'Alquilar', 'Obra nueva', 'Compartir']

const Home = () => {
    const [categories, setCategories] = useState([])
    //Cambiar por loading de useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/')
                const nombreCat = data.categorias.map(cat => cat.name)
                setCategories(nombreCat);
            } catch (error) {
                console.error('Error fetching categories:', error)
            } finally {
                setLoading(false)
            }
        };
        
        fetchCategories()
    }, []);
    
    return (
        <>
            <Header />
            <Search radioOps={ops} selectOps={categories} />

            {/* Contenido */}
            <section className="p-4 flex items-center justify-center">
                {loading ? (
                    <p>Cargando categorías...</p>
                ) : (
                    <ul className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-4 md:grid-rows-1 xl:grid-cols-8 my-10 md:my-24'>
                        {categories.length ? categories.map(cat => (
                            <CardCategories cat={cat} key={cat} />
                        )) : (
                            <p>No hay resultado</p>
                        )}
                    </ul>
                )}
            </section>
   
            <Footer />
        </>
    );
};

export default Home;
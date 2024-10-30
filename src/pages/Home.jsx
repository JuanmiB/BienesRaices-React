import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Search from "../components/Search/Search";
import CardCategories from '../components/CardCategorie/CardCategories';


const ops = ['Comprar', 'Alquilar', 'Obra nueva', 'Compartir'];

const Home = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get('http://localhost:1234/')
                setCategories(data.categorias)
            } catch (error) {
                console.error('Error fetching categories:', error)
            }
        }
        
        fetchCategories();
    }, [])
    
    const nombresCategorias = categories.map(cat => cat.name)
    
    return (
        <>
            <Header />
            <Search radioOps={ops} selectOps={nombresCategorias} />
            {/* CONTENIDO */}
            <section className="p-4 flex items-center justify-center">
                <ul className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-4 md:grid-rows-1 xl:grid-cols-8 my-10 md:my-24 '>
                    {
                        categories ? nombresCategorias.map(cat => {
                            return (
                                <CardCategories cat={cat} key={cat}/>
                            )
                        }) : <p>No hay resultado</p>
                    }
                </ul>
            </section>

            <Footer />

        </>
    );
};

export default Home;
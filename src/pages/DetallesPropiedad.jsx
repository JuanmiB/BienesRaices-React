import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Header from "../components/Header/Header"

const DetallesPropiedad = () => {
    const [result, setResults] = useState([])
    const { id } = useParams()


    useEffect(() => {
        // Realiza la búsqueda cuando el componente se carga o el query cambia
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:1234/propiedades/${id}`)
                setResults(response.data.propiedad)
            } catch (error) {
                console.error("Error al realizar la búsqueda", error)
            }
        }

        if (id) {
            fetchResults();
        }
    }, [id]);
    console.log(result);

    return (
        <>
        <Header/>
{/*        
        <pre>
            {JSON.stringify(result,null,2)}
        </pre> */}
       
            {
                result ? (
                    <section className="flex flex-col">
                        <div className="p-2 border-2 border-blue-600 m-2 bg-slate-100">
                            <img 
                            className="bg-cover bg-center w-2/3"
                            src={`../../public/assets/uploads/${result?.foto?.path}`} 
                            alt="" />
                        </div>
                        <div className="p-2 border-2 border-blue-600 m-2 bg-slate-100">
                            <p className="font-extrabold text-2xl">{result.titulo}</p>
                            <p className="font-extrabold text-xl">${result?.precio?.precio} <span>{result?.precio?.moneda}</span></p>

                            <p>Calle: {result.calle}</p>
                            <p>Ambientes: {result.ambientes}</p>
                            <p>Dormitorios: {result.dormitorios}</p>
                            <p>Baños: {result.baños}</p>
                            <p>Cochera: {result.cochera}</p>
                            <p>m² totales: {result.metros}</p>

                        </div>
                        <div className="p-2 border-2 border-blue-600 m-2 bg-slate-100">
                            <p>{result.descripcion}</p>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, deleniti eum? Earum maiores repellendus recusandae, accusantium quos, necessitatibus, quia debitis iste corporis suscipit veritatis blanditiis voluptate quae vero et. Adipisci?
                            </p>
                        </div>

                        <div className="border-2 border-green-800 m-2">
                            <p>MAPA</p>
                        </div>


                        <div>
                            <form action="">
                                <input type="text" />
                                <input type="text" />
                                <input type="text" />
                            </form>
                        </div>
                    </section>
                ) :
                    <p>no hay resultado</p>
            }
        </>

    )
}

export default DetallesPropiedad
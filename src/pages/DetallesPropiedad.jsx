import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import MapComponent from "../components/Mapa/Mapa"
import { Baños, Cochera, Dormitorio, MetrosTotal, PlanoAmbiente } from "../icons/icon"
import FormularioContacto from "../components/FormularioContacto/FormularioContacto"
import api from "../utils/axiosConfig"

const DetallesPropiedad = () => {
    const [result, setResults] = useState([])
    const { id } = useParams()


    useEffect(() => {
        // Realiza la búsqueda cuando el componente se carga o el query cambia
        const fetchResults = async () => {
            try {
                const response = await api.get(`/propiedades/${id}`)
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
            <Header />


            {
                result ? (
                    <section className="flex flex-col customlg:grid customlg:grid-cols-[repeat(35%,65%)] gap-4 customlg:mt-10 customlg:mx-36 mx-2 my-5">
                        {/* Imagen */}
                        <div className="row-span-1 col-span-2 p-2 border-2 flex flex-col items-center justify-center border-blue-600 mb-2 bg-slate-100 rounded">
                            <img
                                className="object-fit"
                                src={`/assets/uploads/${result?.foto?.path}`}
                                alt="" />
                        </div>

                        <div className="flex flex-col gap-4 ">
                            {/* Titulo y Svg */}
                            <div className="p-6 border-2 rounded bg-slate-100 h-fit">
                                <div className="grid grid-cols-2">
                                    <p className="font-extrabold text-2xl">{result.titulo}</p>
                                    <p className="font-extrabold text-xl text-violet-600 ">${result?.precio?.precio} <span>{result?.precio?.moneda}</span></p>
                                    <p>{result.calle}</p>
                                </div>


                                <ul className="grid grid-cols-2 sm:grid-cols-3  place-content-start bg-red-80">
                                    <li className="flex justify-start items-center gap-2 ">
                                        <span><PlanoAmbiente /></span>
                                        <p>Ambientes: {result.ambientes}</p>
                                    </li>
                                    <li className="flex justify-start items-center gap-2 ">
                                        <span><Dormitorio /></span>
                                        <p>Dormitorio: {result.dormitorios}</p>
                                    </li>
                                    <li className="flex justify-start items-center gap-2">
                                        <span><Baños /></span>
                                        <p>Baño: {result.baños}</p>
                                    </li>
                                    <li className="flex justify-start items-center gap-2">
                                        <span><Cochera /></span>
                                        <p>Cochera: {result.cochera}</p>
                                    </li>
                                    <li className="flex justify-start items-center gap-2 ">
                                        <span><MetrosTotal /></span>
                                        <p>M2: {result.metros}</p>
                                    </li>

                                </ul>

                            </div>
                            {/* Descripcion */}
                            <div className="p-6 border-2 rounded bg-slate-100 h-fit">
                                <h2 className="text-xl font-bold">Descripcion de la propiedad</h2>
                                <div className="mt-2">
                                    <p>{result.descripcion}</p>
                                    <p className="max-w-[900px]">
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, deleniti eum? Earum maiores repellendus recusandae, accusantium quos, necessitatibus, quia debitis iste corporis suscipit veritatis blanditiis voluptate quae vero et. Adipisci?
                                    </p>
                                </div>
                            </div>
                            {/* Mapa */}
                            <div className="border-2 border-green-800">
                                {
                                    result && result.lat !== undefined && result.lng !== undefined ? (
                                        <MapComponent lat={result.lat} lng={result.lng} isEditable={false} />
                                    ) : (
                                        <p>No se encuentra el mapa</p>
                                    )
                                }
                            </div>
                        </div>

                        <div>
                            <FormularioContacto />
                        </div>

                    </section>
                ) :
                    <p>no hay resultado</p>
            }
            <Footer />
        </>

    )
}

export default DetallesPropiedad
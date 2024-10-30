import { useNavigate } from "react-router-dom";

const CardPropiedad = ({result}) => {
 console.log(result);
 const navigate = useNavigate()
 const handleViewPropertie = (id) => {
    navigate(`/propiedades/${id}`)
 }
 
    return (
        <>
            <div className="max-w-6xl min-w-[280px] bg-blue-500" key={result.titulo}>
                <div className="flex items-center justify-center">
                    <div className="max-w-sm w-full py-3 px-1 bg-red-400">
                        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                            <div
                                className="bg-cover bg-center h-56 p-4"
                                style={{ backgroundImage: `url(/assets/uploads/${result?.foto?.path})` }}
                            >
                                <div className="flex justify-end">
                                    <svg className="h-6 w-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="uppercase tracking-wide text-sm font-bold text-gray-700">{result.titulo}</p>
                                <p className="text-3xl text-gray-900">${result?.precio?.precio}</p>
                                <p className="text-gray-700">{result.calle}</p>
                            </div>
                            <div className="flex p-4 border-t border-gray-300 text-gray-700">
                                <div className="flex-1 inline-flex items-center">
                                    <svg className="h-6 w-6 text-gray-600 fill-current mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M0 16L3 5V1a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4l3 11v5a1 1 0 0 1-1 1v2h-1v-2H2v2H1v-2a1 1 0 0 1-1-1v-5zM19 5h1V1H4v4h1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1zm0 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V6h-2v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6H3.76L1.04 16h21.92L20.24 6H19zM1 17v4h22v-4H1zM6 4v4h4V4H6zm8 0v4h4V4h-4z"></path>
                                    </svg>
                                    <p><span className="text-gray-900 font-bold">{result.dormitorios}</span> Bedrooms</p>
                                </div>
                                <div className="flex-1 inline-flex items-center">
                                    <svg className="h-6 w-6 text-gray-600 fill-current mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M17.03 21H7.97a4 4 0 0 1-1.3-.22l-1.22 2.44-.9-.44 1.22-2.44a4 4 0 0 1-1.38-1.55L.5 11h7.56a4 4 0 0 1 1.78.42l2.32 1.16a4 4 0 0 0 1.78.42h9.56l-2.9 5.79a4 4 0 0 1-1.37 1.55l1.22 2.44-.9.44-1.22-2.44a4 4 0 0 1-1.3.22zM21 11h2.5a.5.5 0 1 1 0 1h-9.06a4.5 4.5 0 0 1-2-.48l-2.32-1.15A3.5 3.5 0 0 0 8.56 10H.5a.5.5 0 0 1 0-1h8.06c.7 0 1.38.16 2 .48l2.32 1.15a3.5 3.5 0 0 0 1.56.37H20V2a1 1 0 0 0-1.74-.67c.64.97.53 2.29-.32 3.14l-.35.36-3.54-3.54.35-.35a2.5 2.5 0 0 1 3.15-.32A2 2 0 0 1 21 2v9zm-5.48-9.65l2 2a1.5 1.5 0 0 0-2-2zm-10.23 17A3 3 0 0 0 7.97 20h9.06a3 3 0 0 0 2.68-1.66L21.88 14h-7.94a5 5 0 0 1-2.23-.53L9.4 12.32A3 3 0 0 0 8.06 12H2.12l3.17 6.34z"></path>
                                    </svg>
                                    <p><span className="text-gray-900 font-bold">{result.baños}</span> Bathrooms</p>
                                </div>
                            </div>
                            <div className="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
                                <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">Realtor</div>
                                <div className="flex items-center pt-2">
                                    <div className="bg-cover bg-center w-10 h-10 rounded-full mr-3">
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Tiffany Heffner</p>
                                        <p className="text-sm text-gray-700">(555) 555-4321</p>
                                    </div>
                                </div>
                            </div>
                            <button className="border border-spacing-3 border-red-400 p-4" onClick={()=>{
                                    handleViewPropertie(result.id)
                            }}>Ver</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardPropiedad
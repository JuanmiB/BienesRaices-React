import RadioOptions from "../../../components/RadioOptions/RadioOptions"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
const Search = ({selectOps, radioOps}) => {

    //PASAR ESTO SOLO
    //Estado para el input de la busqueda
    //navigate = useNavigate() -> Esta variable es una función que se utiliza para navegar a una ruta específica.
    // funcion para manejar el cmabio de valor del input
    // funcion para manejar la busqueda colocando el search 

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
  
    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleSearch = () => {
      // Navega hacia la vista de resultados, pasando el término de búsqueda como parámetro
      if (searchTerm) {
        navigate(`/categorias/buscar?query=${searchTerm}`);
      }
    };


    return (
        <section className="flex flex-col rounded-b-2xl custom:rounded-b-[0] custom:px-24 bg-[var(--color-primary)]">
            <h2 className="text-3xl font-bold text-white pt-16">Todos tenemos un lugar</h2>
            <div className="w-full flex flex-col py-4 ">
                {/* Son inputs radio */}
              <RadioOptions opciones={radioOps}/>

              <div className="flex flex-col px-4 lg:px-0 custom:items-center custom:justify-center w-full gap-2 custom:flex-row">
                    <div>
                        <select name="" id="" className="w-full custom:w-[200px] border-slate-300 rounded-md px-3 text-slate-600 focus:outline-none focus:border-blue-600 h-[56px]">
                        {selectOps.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
                        </select>
                    </div>

                    <div className="w-full custom:flex custom:flex-row custom:justify-center custom:items-center custom:bg-white border-slate-300 rounded-md placeholder:italic text-slate-600 focus:outline-none focus:border-blue-600 focus:ring focus:ring-blue-200">
                        <input 
                        type="text" 
                        className="w-full px-5 border-slate-300 rounded-md placeholder:italic text-slate-600 focus:outline-none h-[50px]" 
                        placeholder="Casa, Palermo, Alquiler"
                        value={searchTerm}
                        onChange={handleInputChange}
                        
                        />

                        <button 
                        className="w-full mt-5 custom:w-32 p-3 custom:m-1 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 transition duration-200 ease-in-out"
                        onClick={handleSearch}
                        >Buscar</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

Search.propTypes = {
    selectOps: PropTypes.array,
    radioOps: PropTypes.array
}

export default Search
import { useNavigate } from 'react-router-dom';
import { House, Terrain, Market, Garage, Offices, EstateHouse, Department, Cabana } from '../../icons/icon';
import PropTypes from 'prop-types';
const iconMapping = {
    "Casas": <House />,
    "Quinta": <EstateHouse />,
    "Local Comercial": <Market />,
    "Oficina Comercial": <Offices />,
    "Garage": <Garage />,
    "Terreno": <Terrain />,
    "Edificio": <Department />,
    "Cabaña": <Cabana />
}

const CardCategories = ({ cat }) => {
    const navigate = useNavigate()
    const handleSearch = (cat) => {
        navigate(`/categorias/buscar?query=${cat}`)

    }

    return (
        <>
            <div key={cat} className='grid grid-cols-2 rounded cursor-pointer border' onClick={() => handleSearch(cat)}>
                <span className='flex items-center justify-center bg-gray-200'>
                    {iconMapping[cat] || <House />}
                </span>
                <span className='p-2 w-[90px] h-[90px] flex items-center justify-center'>{cat}</span>
            </div>
        </>
    )
}

CardCategories.propTypes = {
    cat: PropTypes.string
}

export default CardCategories
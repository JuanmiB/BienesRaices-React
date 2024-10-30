import { useState } from 'react';
import PropTypes from "prop-types"
import './RadioOptions.css';

const RadioButtons = ({ opciones = [] }) => {

  const [selectedOption, setSelectedOption] = useState(opciones[1])

  const handleChange = (event) => {
    setSelectedOption(event.target.value)
  };

  return (
    <ul className="flex flex-row gap-4 mb-4">
      {opciones.map((opcion) => (
        <li key={opcion} className="relative">
          <input
            type="radio"
            id={opcion}
            name="opcion"
            value={opcion}
            checked={selectedOption === opcion}
            onChange={handleChange}
            className="absolute opacity-0 cursor-pointer"
          />
          <label
            htmlFor={opcion}
            className={`radio-label ${selectedOption === opcion ? 'selected' : ''}`}
          >
            {opcion}
          </label>
        </li>
      ))}
    </ul>
  );
};

RadioButtons.propTypes = {
  opciones: PropTypes.array
}

export default RadioButtons;
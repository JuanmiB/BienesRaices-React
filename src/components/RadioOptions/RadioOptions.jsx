import React, { useState } from 'react';
import './RadioOptions.css';

const RadioButtons = ({ opciones }) => {
    console.log(opciones);
  const [selectedOption, setSelectedOption] = useState(opciones[1])
    console.log(selectedOption)
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

export default RadioButtons;
import React from 'react';

const FormInput = ({ type = "text", placeholder, value, onChange, id, label }) => {
  return (
    <div>
      {label && (
        <label
          className="block text-sm uppercase text-gray-500 mb-2 font-bold"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-64 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 placeholder:italic"
        required
      />
    </div>
  );
};

export default FormInput;
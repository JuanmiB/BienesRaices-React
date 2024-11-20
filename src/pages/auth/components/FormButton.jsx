import React from 'react';

const FormButton = ({ label, type = "submit", isLoading }) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`w-32 bg-indigo-600 hover:bg-indigo-900 rounded-md py-2 text-white active:bg-indigo-200 ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isLoading ? "Cargando..." : label}
    </button>
  );
};

export default FormButton;
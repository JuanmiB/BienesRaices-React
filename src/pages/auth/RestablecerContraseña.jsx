import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import FormInput from './components/FormInput.jsx';
import FormButton from './components/FormButton.jsx';

const RestablecerContraseña = () => {
  const { resetPassword, error, setError, loading } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false)
  const { token } = useParams(); // Obtener el token desde la URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError({ message: 'Las contraseñas no coinciden' });
      return;
    }

    if (password.length < 8) {
      setError({ message: 'La contraseña debe tener al menos 8 caracteres' });
      return;
    }

    try{
        await resetPassword(password, token);
        setIsSuccess(true); // Cambiar a mensaje de éxito
    } catch (error) {
console.log(error);

    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError(null);
  };

  return (
    <AuthForm title="Restablecer Contraseña" onSubmit={handleSubmit}>
   {isSuccess ? (
        <div className="text-center">
          <h2 className="text-lg font-semibold text-green-600 mb-4">
            ¡Solicitud Aprobada!
          </h2>
          <p className="text-sm text-gray-500">
            Contraseña restablecida!
          </p>
        </div>
      ) : (
        <>
      <div className="h-6">
        <p className={`text-red-500 text-sm ${error?.message ? 'block' : 'hidden'}`}>
          {error?.message}
        </p>
      </div>

      <FormInput
        type="password"
        id="password"
        label="Nueva Contraseña"
        placeholder="********"
        value={password}
        onChange={handleInputChange(setPassword)}
        />

      <FormInput
        type="password"
        id="confirmPassword"
        label="Confirmar Contraseña"
        placeholder="********"
        value={confirmPassword}
        onChange={handleInputChange(setConfirmPassword)}
        />

      <FormButton label="Restablecer Contraseña" isLoading={loading} />

      <div className="mt-4 text-center">
        <button
          onClick={() => navigate('/auth/acceder')}
          className="text-indigo-600 hover:underline"
          >
          Volver a Iniciar Sesión
        </button>
      </div>
            </>
      )}
    </AuthForm>
  );
};

export default RestablecerContraseña;
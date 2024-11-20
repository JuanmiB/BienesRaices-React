import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthForm from './components/AuthForm';
import FormInput from './components/FormInput.jsx';
import FormButton from './components/FormButton.jsx';

const RecuperarContraseña = () => {
  const { recoverPassword, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Estado para manejar el mensaje de éxito

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await recoverPassword(email);
      setIsSuccess(true); // Cambiar a mensaje de éxito
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthForm title="Recuperar Contraseña" onSubmit={handleSubmit}>
      {/* Mostrar un mensaje de éxito si la solicitud fue exitosa */}
      {isSuccess ? (
        <div className="text-center">
          <h2 className="text-lg font-semibold text-green-600 mb-4">
            ¡Solicitud Enviada!
          </h2>
          <p className="text-sm text-gray-500">
            Hemos enviado un enlace de recuperación de contraseña a tu correo.
            Por favor, revisa tu bandeja de entrada y sigue las instrucciones.
          </p>
        </div>
      ) : (
        <>
          {/* Mostrar errores */}
          {error && (
            <p className="text-red-500 text-sm mb-4">{error?.response?.data?.message}</p>
          )}

          {/* Formulario de recuperación */}
          <FormInput
            type="email"
            id="email"
            label="Correo Electrónico"
            placeholder="email@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormButton label="Enviar" isLoading={loading} />

          <p className="text-sm text-gray-500 text-center mt-4">
            Te enviaremos un enlace para restablecer tu contraseña.
          </p>
        </>
      )}
    </AuthForm>
  );
};

export default RecuperarContraseña;
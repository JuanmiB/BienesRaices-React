import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthForm from './components/AuthForm';
import FormInput from './components/FormInput.jsx';
import FormButton from './components/FormButton.jsx';

const CrearCuenta = () => {
  const { register, error, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isSuccess, setIsSuccess] = useState(false); // Estado para manejar el mensaje de éxito


  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ email, name, password });
    setIsSuccess(true)
  };

  return (
    <AuthForm title="Crear Cuenta" onSubmit={handleSubmit}>
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <FormInput
        type="text"
        id="name"
        label="Nombre"
        placeholder="Tu nombre completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
      <FormInput
        type="email"
        id="email"
        label="Email"
        placeholder="email@ejemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
      <FormInput
        type="password"
        id="password"
        label="Contraseña"
        placeholder="********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      <FormButton label="Registrar" isLoading={loading} />
        </>
      )}
    </AuthForm>
  );
};

export default CrearCuenta;
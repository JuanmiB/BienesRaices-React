import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import FormInput from './components/FormInput.jsx';
import FormButton from './components/FormButton.jsx';

const Acceder = () => {
  const { login, isAuthenticated, error, setError, loading } = useAuth(); // Asume que tienes `setError` en el contexto.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  // Redirigir si el usuario está autenticado.
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Limpiar el error cuando los inputs cambien.
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError(null); // Limpia el error.
  };

  return (
    <AuthForm title="Iniciar Sesión" onSubmit={handleSubmit}>
      {/* Mensaje de error */}
      <div className="h-6">
        <p className={`text-red-500 text-sm ${error?.response?.data?.message ? 'block' : 'hidden'}`}>
          {error?.response?.data?.message}
        </p>
      </div>

      <FormInput
        type="email"
        id="email"
        label="Email"
        placeholder="email@ejemplo.com"
        value={email}
        onChange={handleInputChange(setEmail)}
      />
      <FormInput
        type="password"
        id="password"
        label="Contraseña"
        placeholder="********"
        value={password}
        onChange={handleInputChange(setPassword)}
      />
      <FormButton label="Iniciar Sesión" isLoading={loading} />

      <Link to="/auth/recuperar-contraseña" className="text-indigo-600 hover:underline" onClick={()=> setError(false)}>
        Recupérala aquí
      </Link>
    </AuthForm>
  );
};

export default Acceder;
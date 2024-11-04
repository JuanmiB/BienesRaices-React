import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';

const Acceder = () => {
  const { login, isAuthenticated, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Header />
      <div className="py-10">
        <h1 className="text-4xl my-10 font-extrabold text-center">
          Bienes <span className="font-normal">Raices</span>
        </h1>

        <section className="mt-8 mx-auto max-w-md">
          <div className="bg-white py-8 px-4 shadow">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              {/* Mostrar mensaje de carga */}
              {loading ? (
                <p className="text-center text-indigo-600">Cargando...</p>
              ) : (
                <>
                  <div>
                    <label
                      className="block text-sm uppercase text-gray-500 mb-5 font-bold"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      placeholder="Nombre"
                      className="block w-64 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 placeholder:italic"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm uppercase text-gray-500 mb-5 font-bold"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="email@ejemplo.com"
                      className="block w-64 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 placeholder:italic"
                    />
                  </div>

                  <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="w-32 bg-indigo-600 hover:bg-indigo-900 rounded-md py-2 active:bg-indigo-200"
                  />
                </>
              )}
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Acceder;
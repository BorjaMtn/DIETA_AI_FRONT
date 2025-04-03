'use client';

import { useState } from 'react';
import Button from '../../components/Button'; // Suponiendo que ya tienes este componente
import Link from 'next/link'; // Asegúrate de tener instalado next/link
import axios from 'axios'; // Importamos axios

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para manejar el error
  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Limpiamos el error antes de enviar la solicitud
    setLoading(true); // Iniciamos el loading

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });
      setLoading(false); // Detenemos el loading

      if (response.status === 200) {
        const { token } = response.data; // Suponiendo que el token viene en la respuesta
        localStorage.setItem('token', token); // Guardamos el token en localStorage
        window.location.href = '/'; // Redirigimos a la página principal
      }
    } catch (error) {
      setLoading(false); // Detenemos el loading en caso de error
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setError(error.response.data.message); // Mostramos el mensaje de error
      } else {
        setError('Ocurrió un error al iniciar sesión. Intenta de nuevo.'); // Mensaje genérico
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Iniciar sesión</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Mostrar error */}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Correo electrónico"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Contraseña"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
            disabled={loading} // Deshabilitamos el botón mientras cargamos
          >
            {loading ? 'Cargando...' : 'Iniciar sesión'} {/* Mostrar texto de carga */}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

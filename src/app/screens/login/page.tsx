'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Loader2, Brain } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/login', { email, password });
      setLoading(false);
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        window.location.href = '/';
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Ocurrió un error al iniciar sesión. Intenta de nuevo.');
      }
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotLoading(true);

    try {
      const response = await axios.post('/api/forgot-password', { email: forgotEmail });
      setForgotLoading(false);
      if (response.status === 200) {
        alert('Se ha enviado un correo para restablecer tu contraseña.');
        setIsForgotPasswordOpen(false);
      }
    } catch (error) {
      setForgotLoading(false);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setForgotError(error.response.data.message);
      } else {
        setForgotError('Ocurrió un error. Intenta de nuevo.');
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-100 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-green-200 opacity-30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-200 opacity-30 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 w-full max-w-screen-lg z-10">
        {/* Columna izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden md:flex flex-col justify-center items-center px-10"
        >
          <h1 className="text-5xl font-extrabold text-green-800 leading-tight text-center">
            Transforma tu salud <br /> con <span className="text-blue-600">inteligencia</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg text-center max-w-md">
            Planes nutricionales personalizados, recetas inteligentes y asesoramiento de IA. Todo en una sola app.
            </p>
          <Image
            src="/images/nutrition-illustration.png"
            alt="IA Nutrición"
            width={300}
            height={300}
            className="mt-8 drop-shadow-xl animate-float"
          />
        </motion.div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center px-6 py-12 h-full"
        >
          <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-gray-100 rounded-3xl p-10 shadow-2xl space-y-6">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Brain className="w-6 h-6" />
              <h2 className="text-3xl font-bold text-center tracking-tight">
                Iniciar sesión
              </h2>
            </div>

            {error && <div className="text-red-500 text-center">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none transition text-gray-700"
                  placeholder="tu@email.com"
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
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none transition text-gray-700"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox rounded border-gray-300 text-green-600" />
                  <span>Recordarme</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(true)}
                  className="text-green-600 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button
                type="submit"
                className={clsx(
                  'w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-md transition duration-200 flex items-center justify-center text-lg',
                  { 'opacity-70 cursor-not-allowed': loading }
                )}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" /> Iniciando...
                  </>
                ) : (
                  'Iniciar sesión'
                )}
              </button>
            </form>

            <div className="text-center text-sm text-gray-500">
              ¿No tienes cuenta?{' '}
              <Link href="/screens/register" className="text-green-600 hover:underline font-medium">
                Regístrate aquí
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal de Forgot Password */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-bold text-center text-gray-800">Recuperar contraseña</h3>
            <form onSubmit={handleForgotPassword} className="space-y-4 mt-4">
              <div>
                <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                  placeholder="tu@email.com"
                />
              </div>
              {forgotError && <div className="text-red-500 text-sm">{forgotError}</div>}
              <button
                type="submit"
                className={clsx(
                  'w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-200',
                  { 'opacity-70 cursor-not-allowed': forgotLoading }
                )}
                disabled={forgotLoading}
              >
                {forgotLoading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(false)}
              className="mt-4 w-full text-center text-sm text-gray-500 hover:underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
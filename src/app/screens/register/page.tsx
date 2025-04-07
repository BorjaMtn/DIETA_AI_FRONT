'use client';

import { useState } from 'react';
import axios from 'axios';
import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from '../../components/Button';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await axios.post('/api/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem('token', token); // Guardar el token en localStorage
        toast.success('Usuario registrado con éxito');
        router.push('/'); // Redirigir a la página principal
      }
    } catch (error) {
      setErrorMessage('Hubo un error al registrar el usuario.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
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
          className="hidden md:flex flex-col justify-center items-center px-10 "
        >
          <h1 className="text-5xl font-extrabold text-green-800 leading-tight text-center">
            Transforma tu salud <br /> con <span className="text-blue-600">inteligencia</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg text-center max-w-md">
            Planes nutricionales personalizados, recetas inteligentes y asesoramiento de IA. Todo en una sola app.
          </p>
          <img
            src="/images/nutrition-illustration.png"
            alt="IA Nutrición"
            className="w-[300px] mt-8 drop-shadow-xl animate-float"
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
                Crear cuenta
              </h2>
            </div>

            {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none transition text-gray-700"
                  placeholder="Nombre completo"
                />
              </div>

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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmar Contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:outline-none transition text-gray-700"
                  placeholder="Confirma tu contraseña"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-md transition duration-200 flex items-center justify-center text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registrando...' : 'Registrarse'}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-500">
              ¿Ya tienes cuenta?{' '}
              <a href="/screens/login" className="text-green-600 hover:underline font-medium">
                Inicia sesión aquí
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

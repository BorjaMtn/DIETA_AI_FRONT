'use client';

import { useState } from 'react';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {type === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Ingresa tu correo"
          />
        </div>
        <div>
          <label className="block font-medium">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {type === 'login' ? 'Ingresar' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;

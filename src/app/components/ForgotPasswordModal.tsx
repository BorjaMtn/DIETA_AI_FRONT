'use client';

import { useState } from 'react';
import axios from 'axios';
import { Mail, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post('/api/forgot-password', { email });
      setLoading(false);
      setSuccess('Te hemos enviado un correo con instrucciones para recuperar tu contraseña.');
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || 'Algo salió mal. Inténtalo más tarde.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl border rounded-3xl p-10 shadow-xl"
      >
        <div className="flex items-center justify-center gap-2 text-green-700 mb-6">
          <Mail className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Recuperar contraseña</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white font-semibold py-3 rounded-xl hover:bg-green-600 transition flex items-center justify-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
            Enviar instrucciones
          </button>
        </form>

        {success && <p className="text-green-600 mt-4 text-sm text-center">{success}</p>}
        {error && <p className="text-red-500 mt-4 text-sm text-center">{error}</p>}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;

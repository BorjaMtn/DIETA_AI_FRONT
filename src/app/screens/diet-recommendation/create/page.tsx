"use client";
import { useState } from 'react';
import { FaUtensils, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import Navbar from '@/app/components/Navbar';
import Footer from '@/components/Footer';

const CreateDietRecommendationPage = () => {
  const [preferences, setPreferences] = useState('');
  const [goal, setGoal] = useState('');
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [loadingAllRecommendations, setLoadingAllRecommendations] = useState(false);
  const [error, setError] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [allRecommendations, setAllRecommendations] = useState(null);

  const handleGetRecommendation = async () => {
    setLoadingRecommendation(true);
    setError('');
    setRecommendation(null);

    try {
      const response = await fetch('/api/diet-recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ preferences, goal }),
      });

      if (!response.ok) {
        throw new Error('Error al obtener la recomendación. Por favor, inténtalo de nuevo.');
      }

      const data = await response.json();
      setRecommendation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
    } finally {
      setLoadingRecommendation(false);
    }
  };

  const handleGetAllRecommendations = async () => {
    setLoadingAllRecommendations(true);
    setError('');
    setAllRecommendations(null);

    try {
      const response = await fetch('/api/diet-recommendations', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener todas las recomendaciones. Por favor, inténtalo de nuevo.');
      }

      const data = await response.json();
      setAllRecommendations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
    } finally {
      setLoadingAllRecommendations(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <FaUtensils className="text-green-600 text-4xl mr-2" />
            <h1 className="text-4xl font-bold text-gray-800">Recomendación de Dieta</h1>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="preferences" className="block text-lg font-medium text-gray-700">Preferencias Alimenticias</label>
              <input
                id="preferences"
                type="text"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Ejemplo: Vegetariano, sin gluten..."
              />
            </div>

            <div>
              <label htmlFor="goal" className="block text-lg font-medium text-gray-700">Objetivo</label>
              <input
                id="goal"
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Ejemplo: Perder peso, ganar músculo..."
              />
            </div>

            <button
              type="button"
              onClick={handleGetRecommendation}
              className={`w-full py-3 px-4 text-white font-semibold rounded-md flex items-center justify-center transition-all ${
                loadingRecommendation ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
              disabled={loadingRecommendation}
            >
              {loadingRecommendation ? <FaSpinner className="animate-spin mr-2" /> : null}
              {loadingRecommendation ? 'Cargando...' : 'Obtener Recomendación'}
            </button>
          </form>

          <button
            type="button"
            onClick={handleGetAllRecommendations}
            className={`mt-4 w-full py-3 px-4 text-white font-semibold rounded-md flex items-center justify-center transition-all ${
              loadingAllRecommendations ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={loadingAllRecommendations}
          >
            {loadingAllRecommendations ? <FaSpinner className="animate-spin mr-2" /> : null}
            {loadingAllRecommendations ? 'Cargando...' : 'Ver Todas las Recomendaciones'}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-md flex items-center">
              <FaExclamationCircle className="text-red-500 text-xl mr-2" />
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {recommendation && (
            <div className="mt-6 p-6 bg-green-100 border border-green-300 rounded-md shadow-md">
              <div className="flex items-center mb-4">
                <FaCheckCircle className="text-green-600 text-2xl mr-2" />
                <h2 className="text-2xl font-semibold text-green-800">Recomendación:</h2>
              </div>
              <pre className="mt-2 text-gray-700 whitespace-pre-wrap">{JSON.stringify(recommendation, null, 2)}</pre>
            </div>
          )}

          {allRecommendations && (
            <div className="mt-6 p-6 bg-blue-100 border border-blue-300 rounded-md shadow-md">
              <div className="flex items-center mb-4">
                <FaCheckCircle className="text-blue-600 text-2xl mr-2" />
                <h2 className="text-2xl font-semibold text-blue-800">Todas las Recomendaciones:</h2>
              </div>
              <pre className="mt-2 text-gray-700 whitespace-pre-wrap">{JSON.stringify(allRecommendations, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateDietRecommendationPage;

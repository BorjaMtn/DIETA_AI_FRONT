"use client";
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Navbar from '@/app/components/Navbar';
import Footer from '@/components/Footer';

interface Recommendation {
    id: number;
    goal: string;
    calories_per_day?: number;
    macros?: { [key: string]: number };
    meal_plan?: string[];
    ai_model_used?: string;
    // Añade aquí cualquier otra propiedad que esperes recibir de la API
}

const RecommendationsPage = () => {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token no encontrado.');
                }

                const response = await fetch(`/api/diet-recommendations`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    let errorMessage = 'Error al obtener las recomendaciones.';
                    if (response.status === 404) {
                        errorMessage = 'Recomendaciones no encontradas.';
                    } else if (response.status === 500) {
                        errorMessage = 'Error interno del servidor.';
                    }
                    throw new Error(`${errorMessage} (Código de estado: ${response.status})`);
                }

                const data = await response.json();
                setRecommendations(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error inesperado.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Tus Recomendaciones de Dieta</h1>

                {loading && <p className="text-center text-gray-600">Cargando...</p>}
                {error && <p className="text-center text-red-600">{error}</p>}

                {recommendations.length === 0 && !loading && !error && (
                    <p className="text-center text-gray-600">No hay recomendaciones disponibles.</p>
                )}

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {recommendations.map((rec) => (
                        <div key={rec?.id} className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
                            <div className="flex items-center mb-2">
                                <FaCheckCircle className="text-green-500 mr-2" />
                                <h2 className="text-lg font-semibold text-gray-800">Recomendación #{rec?.id}</h2>
                            </div>
                            <p><strong>Objetivo:</strong> {rec?.goal}</p>
                            {rec?.calories_per_day && <p><strong>Calorías por día:</strong> {rec?.calories_per_day}</p>}
                            {rec?.macros && typeof rec?.macros === 'object' && (
                                <div>
                                    <p><strong>Macros:</strong></p>
                                    <ul>
                                        {Object.entries(rec?.macros).map(([key, value]) => (
                                            <li key={key}>{key}: {value}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {rec?.meal_plan && Array.isArray(rec?.meal_plan) && (
                                <div>
                                    <p><strong>Plan de Comidas:</strong></p>
                                    <ul>
                                        {rec?.meal_plan.map((meal, index) => (
                                            <li key={index}>{meal}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {rec?.ai_model_used && <p><strong>Modelo de IA usado:</strong> {rec?.ai_model_used}</p>}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default RecommendationsPage;
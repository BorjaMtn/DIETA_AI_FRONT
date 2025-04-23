"use client";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "@/app/components/Navbar";
import Footer from "@/components/Footer";

interface Recommendation {
  id: number;
  goal: string;
  calories_per_day?: number;
  macros?: { [key: string]: number } | string; // Modificado para permitir texto o JSON
  meal_plan?: string[];
  ai_model_used?: string;
}

const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado.");
        }

        const userResponse = await fetch(`${API_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });

        if (!userResponse.ok) {
          throw new Error("Error al obtener los datos del usuario.");
        }

        const userData = await userResponse.json();
        const userId = userData.id;

        const response = await fetch(`${API_URL}/api/diet-recommendations/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          let errorMessage = "Error al obtener las recomendaciones.";
          if (response.status === 404) {
            errorMessage = "Recomendaciones no encontradas.";
          } else if (response.status === 500) {
            errorMessage = "Error interno del servidor.";
          }
          throw new Error(`${errorMessage} (Código: ${response.status})`);
        }

        const data = await response.json();
        setRecommendations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error inesperado.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Recomendaciones de Dieta</h1>

        {loading && <p className="text-center text-blue-600">Cargando recomendaciones...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && !error && recommendations.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">No hay recomendaciones disponibles.</p>
          ) : (
            recommendations.map((rec) => (
              <div key={rec.id} className="bg-white shadow-lg rounded-xl p-6 border relative group">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Objetivo: {rec.goal}</h2>

                <div className="relative group mb-4">
                  <p className="text-gray-600 font-medium cursor-help peer">
                    Calorías por día: {rec.calories_per_day ?? "No especificado"}
                  </p>
                </div>

                {rec.macros ? (
                  <div className="mt-4 text-gray-700 relative group">
                    <h4 className="font-semibold mb-1 cursor-help">Macronutrientes:</h4>
                    <ul className="list-disc pl-6">
                      {/* Verifica si 'macros' es una cadena JSON, si lo es, parsealo */}
                      {typeof rec.macros === "string" ? (
                        <>
                          {(() => {
                            try {
                              const parsedMacros = JSON.parse(rec.macros); // Intentar parsear el JSON si es una cadena
                              return (
                                <>
                                  <li>Carbohidratos: {parsedMacros.carbs ?? "No especificado"} g</li>
                                  <li>Proteínas: {parsedMacros.protein ?? "No especificado"} g</li>
                                  <li>Grasas: {parsedMacros.fat ?? "No especificado"} g</li>
                                </>
                              );
                            } catch (error) {
                              console.error("Error al parsear los macros:", error);
                              return <p className="text-gray-600">Error al cargar los macronutrientes.</p>;
                            }
                          })()}
                        </>
                      ) : (
                        <>
                          <li>Carbohidratos: {rec.macros.carbs ?? "No especificado"} g</li>
                          <li>Proteínas: {rec.macros.protein ?? "No especificado"} g</li>
                          <li>Grasas: {rec.macros.fat ?? "No especificado"} g</li>
                        </>
                      )}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-600">No se especificaron macronutrientes.</p>
                )}

                {Array.isArray(rec.meal_plan) && rec.meal_plan.length > 0 && (
                  <div className="mb-4 mt-4 relative group">
                    <h3 className="text-gray-700 font-medium mb-1 cursor-help">Plan de comidas:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {rec.meal_plan.map((meal, index) => (
                        <li key={index}>{meal}</li>
                      ))}
                    </ul>
                    
                  </div>
                )}

                {rec.ai_model_used && (
                  <p className="text-sm text-gray-500 italic mt-2 relative group cursor-help">
                    Generado por: {rec.ai_model_used}
                    
                  </p>
                )}

                <div className="flex items-center mt-4 text-green-600">
                  <FaCheckCircle className="mr-2" />
                  Recomendación personalizada
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecommendationsPage;

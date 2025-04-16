// CreateDietRecommendationPage.tsx

"use client";
import { useState, useEffect, useRef } from "react";
import { FaUtensils } from "react-icons/fa";
import Navbar from "@/app/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import {
  calculateDailyCalories,
  calculateGoalCalories,
  calculateMacros,
  generateMealPlanPrompt,
} from "./dietCalculations"; // Importa las funciones

const CreateDietRecommendationPage = () => {
  const router = useRouter(); // Inicializa el router
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [preferences, setPreferences] = useState("");
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [caloriasCalculadas, setCaloriasCalculadas] = useState<number | null>(null);
  const [caloriasConObjetivo, setCaloriasConObjetivo] = useState<number | null>(null);
  const [macros, setMacros] = useState<{ carbs: number; protein: number; fat: number } | null>(null); // NUEVO
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<{
    calorias: number | null;
    macros: { carbs: number; protein: number; fat: number } | null;
    objetivo: string;
    preferencias?: string; // Hacer preferencias opcional
    restricciones?: string[]; // Hacer restricciones opcional
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGetRecommendation = async () => {
    setLoading(true);
    setError("");
    setRecommendation(null);

    try {
      const calorias = calculateDailyCalories(
        gender as "hombre" | "mujer",
        parseInt(age),
        parseFloat(weight),
        parseFloat(height),
        activityLevel as "sedentario" | "suave" | "moderada" | "intensa"
      );
      setCaloriasCalculadas(calorias);

      const caloriasObjetivo = calculateGoalCalories(goal, calorias);
      setCaloriasConObjetivo(caloriasObjetivo);

      const macrosCalculados = calculateMacros(goal, caloriasObjetivo);
      setMacros(macrosCalculados);

      // Establecer los datos para el modal
      setModalData({
        calorias: caloriasObjetivo,
        macros: macrosCalculados,
        objetivo: goal,
        preferencias: preferences,
        restricciones: restrictions,
      });

      // Mostrar el modal
      setShowModal(true);

      //  Generamos el prompt
      const prompt = generateMealPlanPrompt({
        gender,
        age,
        height,
        weight,
        activityLevel,
        goal,
        totalCalories: caloriasObjetivo,
        macros: macrosCalculados,
        preferences,
        restrictions,
      });

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/api/diet-recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Si estás usando sanctum o JWT
        },
        body: JSON.stringify({
          user_id: parseInt(token || "0"),
          goal: goal,
          calories_per_day: caloriasObjetivo,
          macros: macrosCalculados,
          meal_plan: [], // Puedes dejar esto vacío si aún no lo usas
          ai_model_used: "gpt-4",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al guardar la recomendación.");
      }

      const data = await response.json();
      setRecommendation(data.dietRecommendation);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg p-8 relative">
          <div className="flex items-center justify-center mb-6">
            <FaUtensils className="text-green-600 text-4xl mr-2" />
            <h1 className="text-4xl font-bold text-gray-800">Recomendación de Dieta</h1>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-medium text-gray-700">Género</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 border rounded-md"
                >
                  <option value="">Selecciona</option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Edad</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-3 border rounded-md"
                  placeholder="Edad en años"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Altura (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Peso (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-lg font-medium text-gray-700">Nivel de actividad física</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full p-3 border rounded-md"
                >
                  <option value="">Selecciona</option>
                  <option value="sedentario">Sedentario</option>
                  <option value="suave">Suave (1-3 días/semana)</option>
                  <option value="moderada">Moderada (3-5 días/semana)</option>
                  <option value="intensa">Intensa (6-7 días/semana)</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-lg font-medium text-gray-700">Objetivo</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full p-3 border rounded-md"
                >
                  <option value="">Selecciona</option>
                  <option value="aumento_fuerza">Aumento de fuerza</option>
                  <option value="mejor_tono_cardio">Mejor tono cardiovascular</option>
                  <option value="perdida_grasa">Pérdida de grasa</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700">Preferencias Alimenticias</label>
                <select
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  className="w-full p-3 border rounded-md"
                >
                  <option value="">Selecciona</option>
                  <option value="vegano">Vegano</option>
                  <option value="vegetariano">Vegetariano</option>
                  <option value="omnivoro">Omnívoro</option>
                </select>
              </div>
              <div ref={dropdownRef} className="sm:col-span-2">
                <label className="block text-lg font-medium text-gray-700">Restricciones alimenticias</label>
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full p-3 border rounded-md bg-white"
                >
                  {restrictions.length > 0
                    ? `Seleccionadas: ${restrictions.join(", ")}`
                    : "Selecciona restricciones"}
                </button>
                {showDropdown && (
                  <div className="absolute bg-white border rounded-md shadow-md mt-2 max-h-60 overflow-y-auto w-full z-50">
                    {["lactosa", "gluten", "frutos secos", "mariscos", "soja"].map((item) => (
                      <label key={item} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={restrictions.includes(item)}
                          onChange={() =>
                            setRestrictions((prev) =>
                              prev.includes(item)
                                ? prev.filter((r) => r !== item)
                                : [...prev, item]
                            )
                          }
                        />{" "}
                        {item}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleGetRecommendation}
              className="w-full bg-green-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Obtener Recomendación"}
            </button>
            {error && <p className="text-red-600 text-center">{error}</p>}

            {/* Nuevo botón para ver todas las recomendaciones */}
            <button
              type="button"
              onClick={() => router.push("./show")} // Navega a la página de recomendaciones
              className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition" // Cambiado mt-4 a mt-2
            >
              Ver Todas Las Recomendaciones
            </button>
          </form>
        </div>

        {/* Modal Mejorado con Estilo y Datos Adicionales */}
        {showModal && modalData && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-lg z-50">
            <div className="bg-gradient-to-br from-purple-200 to-pink-200 p-8 rounded-xl shadow-2xl w-full max-w-md">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Datos Nutricionales</h2>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-xl font-semibold text-purple-700 mb-2">
                    <strong>Objetivo:</strong> {modalData.objetivo.replace(/_/g, " ")}
                  </p>
                  {modalData.preferencias && (
                    <p className="text-lg text-gray-700 mb-1">
                      <strong>Preferencias:</strong> {modalData.preferencias}
                    </p>
                  )}
                  {modalData.restricciones && modalData.restricciones.length > 0 && (
                    <p className="text-lg text-gray-700 mb-1">
                      <strong>Restricciones:</strong> {modalData.restricciones.join(", ")}
                    </p>
                  )}
                  <div className="flex justify-center items-center mt-2">
                    <span className="text-lg font-medium text-gray-700 mr-2">Calorías Totales:</span>
                    <span className="text-xl font-semibold text-purple-700">{modalData.calorias} kcal</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="bg-purple-100 p-4 rounded-lg">
                    <p className="text-lg font-medium text-gray-700">Carbohidratos:</p>
                    <p className="text-xl font-semibold text-purple-700">{modalData.macros?.carbs} g</p>
                  </div>
                  <div className="bg-pink-100 p-4 rounded-lg">
                    <p className="text-lg font-medium text-gray-700">Proteínas:</p>
                    <p className="text-xl font-semibold text-pink-700">{modalData.macros?.protein} g</p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg col-span-2">
                    <p className="text-lg font-medium text-gray-700">Grasas:</p>
                    <p className="text-xl font-semibold text-yellow-700">{modalData.macros?.fat} g</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CreateDietRecommendationPage;
"use client";
import { useEffect, useState } from "react";
import { Calendar, Target, Clipboard, Flame, FileText, StickyNote, Timer } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer"; // Import Footer component
import Modal from "@/app/components/Modal"; // Import Modal

const ListDietPlansPage = () => {
  interface DietPlan {
    id: number;
    title: string;
    description?: string;
    meal_plan?: string;
    macros?: string;
    calories_per_day?: number;
    calories_total?: number;
    duration_days?: number;
    goal?: string;
    start_date?: string;
    end_date?: string;
    notes?: string;
    recommendation_id?: number;
  }

  const [plans, setPlans] = useState<DietPlan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<DietPlan | null>(null); // Estado para el plan seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchUserAndPlans = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No se encontró un token de usuario.");
        return;
      }

      try {
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

        const plansResponse = await fetch(`${API_URL}/api/diet-plan/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!plansResponse.ok) {
          throw new Error("Error al obtener los planes de dieta.");
        }

        const plansData = await plansResponse.json();
        setPlans(plansData);
      } catch (error) {
        console.error("Error:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Ocurrió un error desconocido.");
        }
      }
    };

    fetchUserAndPlans();
  }, []);

  const handleOpenModal = (plan: DietPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Add Navbar at the top */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Mis Planes de Dieta</h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">No tienes planes de dieta disponibles.</p>
          ) : (
            plans.map((plan) => (
              <div key={plan.id} className="bg-white shadow-lg rounded-xl p-6 border">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{plan.title}</h2>
                <p className="text-gray-600 mb-4">{plan.description || "Sin descripción"}</p>

                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center group relative">
                    <Clipboard className="w-5 h-5 mr-2 text-blue-500" />
                    {plan.meal_plan || "No especificado"}
                  </p>
                  <p className="flex items-center group relative">
                    <Flame className="w-5 h-5 mr-2 text-red-500" />
                    {plan.calories_per_day || "N/A"} kcal/día
                  </p>
                  <p className="flex items-center group relative">
                    <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                    {plan.start_date ? new Date(plan.start_date).toLocaleDateString() : "No definido"} -{" "}
                    {plan.end_date ? new Date(plan.end_date).toLocaleDateString() : "No definido"}
                  </p>
                </div>

                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => handleOpenModal(plan)} // Abre el modal con el plan seleccionado
                >
                  Ver detalles
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modal con isOpen y onClose pasados correctamente */}
      {isModalOpen && selectedPlan && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} plan={selectedPlan}>
          <div>
            <h2 className="text-2xl font-semibold">{selectedPlan.title}</h2>
            <p>{selectedPlan.description}</p>
            {/* Puedes agregar más detalles del plan aquí */}
          </div>
        </Modal>
      )}

      <Footer /> {/* Add Footer at the bottom */}
    </div>
  );
};

export default ListDietPlansPage;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter para redirección
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Calendar, Target, Clipboard, Flame, FileText, StickyNote, Timer, CheckCircle } from "lucide-react";

const CreateDietPlanPage = () => {
  const router = useRouter(); // Inicializar useRouter
  const [title, setTitle] = useState(""); // required|string|max:255
  const [description, setDescription] = useState(""); // nullable|string
  const [mealPlan, setMealPlan] = useState(""); // nullable|json
  const [macros, setMacros] = useState(""); // nullable|json
  const [caloriesPerDay, setCaloriesPerDay] = useState(""); // nullable|integer
  const [caloriesTotal, setCaloriesTotal] = useState(""); // nullable|integer
  const [durationDays, setDurationDays] = useState(""); // nullable|integer
  const [goal, setGoal] = useState(""); // nullable|string
  const [startDate, setStartDate] = useState(""); // nullable|date
  const [endDate, setEndDate] = useState(""); // nullable|date
  const [notes, setNotes] = useState(""); // nullable|string
  const [status, setStatus] = useState("active"); // already included
  

  const handleCreatePlan = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No se encontró el token de autenticación");
      console.log("Token no encontrado");
      return;
    }

    console.log("Enviando solicitud para crear plan de dieta con los siguientes datos:", {
      title,
      description,
      mealPlan,
      macros,
      caloriesPerDay,
      caloriesTotal,
      durationDays,
      goal,
      startDate,
      endDate,
      notes,
      status,
    });

    try {
      const response = await fetch("http://localhost:8000/api/diet-plan", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          meal_plan: mealPlan,
          macros,
          calories_per_day: caloriesPerDay,
          calories_total: caloriesTotal,
          duration_days: durationDays,
          goal,
          start_date: startDate,
          end_date: endDate,
          notes,
          status,
        }),
      });

      console.log("Respuesta recibida:", response);

      if (response.ok) {
        toast.success("Plan de dieta creado correctamente");
        console.log("Plan de dieta creado correctamente");
        setTimeout(() => {
          router.push("/screens/diet-plan/list");
        }, 2000);// Redirigir a la lista de planes despues de 2 segundos
      } else {
        const errorData = await response.json();
        // alert(`Error al crear el plan: ${errorData.message || "Error desconocido"}`);
        console.error("Error al crear el plan:", errorData);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      toast.error("Error al crear el plan");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto p-6 space-y-8">
          <h1 className="text-5xl font-extrabold text-center mb-6 text-gray-800 drop-shadow-md">
            Crear Plan de Dieta
          </h1>
          <form className="space-y-6 bg-white shadow-lg rounded-xl p-8">
            {/* Título del Plan */}
            <div className="flex items-center space-x-3">
              <Clipboard className="text-blue-500 w-6 h-6" />
              <div className="flex flex-col w-full">
                <label htmlFor="title" className="font-semibold text-gray-700">Nombre del Plan</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ejemplo: Plan Keto"
                />
              </div>
            </div>

            {/* Descripción */}
            <div className="flex items-center space-x-3">
              <FileText className="text-blue-500 w-6 h-6" />
              <div className="flex flex-col w-full">
                <label htmlFor="description" className="font-semibold text-gray-700">Descripción</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Describe el plan..."
                />
              </div>
            </div>

            {/* Plan de comidas */}
            <div className="flex items-center space-x-3">
              <Flame className="text-blue-500 w-6 h-6" />
              <div className="flex flex-col w-full">
                <label htmlFor="mealPlan" className="font-semibold text-gray-700">Plan de Comidas (JSON)</label>
                <textarea
                  id="mealPlan"
                  value={mealPlan}
                  onChange={(e) => setMealPlan(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Ejemplo: { desayuno: 'Huevos' }"
                />
              </div>
            </div>

            {/* Macronutrientes */}
            <div className="flex items-center space-x-3">
              <Target className="text-blue-500 w-6 h-6" />
              <div className="flex flex-col w-full">
                <label htmlFor="macros" className="font-semibold text-gray-700">Macronutrientes (JSON)</label>
                <textarea
                  id="macros"
                  value={macros}
                  onChange={(e) => setMacros(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Ejemplo: { proteinas: 100g }"
                />
              </div>
            </div>

            {/* Calorías por día */}
            <div className="flex items-center space-x-3">
              <Flame className="text-blue-500 w-6 h-6" />
              <div className="flex flex-col w-full">
                <label htmlFor="caloriesPerDay" className="font-semibold text-gray-700">Calorías por Día</label>
                <input
                  id="caloriesPerDay"
                  type="number"
                  value={caloriesPerDay}
                  onChange={(e) => setCaloriesPerDay(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ejemplo: 2000"
                />
              </div>
            </div>

            {/* Fechas */}
            <div className="flex items-center space-x-3">
              <Calendar className="text-blue-500 w-6 h-6" />
              <div className="flex flex-col w-full">
                <label htmlFor="startDate" className="font-semibold text-gray-700">Fecha de Inicio</label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="text-blue-500 w-6 h-6" />
              <div className="flex flex-col w-full">
                <label htmlFor="endDate" className="font-semibold text-gray-700">Fecha de Fin</label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Notas */}
            <div className="flex items-center space-x-3">
              <StickyNote className="text-blue-500 w-6 h-6" />
              <div className="flex flex-col w-full">
                <label htmlFor="notes" className="font-semibold text-gray-700">Notas Adicionales</label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Notas adicionales..."
                />
              </div>
            </div>

            {/* Botón */}
            <button
              type="button"
              onClick={handleCreatePlan}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2 shadow-md transition-transform hover:scale-105"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Crear Plan de Dieta</span>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateDietPlanPage;

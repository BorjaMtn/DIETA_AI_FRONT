import React, { useEffect } from "react";
import { Clipboard, Flame, FileText, StickyNote, Timer, Target, Calendar, X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  plan: {
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
  } | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, plan }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !plan) return null; // Si no está abierto o no hay plan, no renderiza el modal

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-hidden relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Cerrar modal"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">{plan.title}</h2>
        <p className="text-lg text-gray-600 mb-6">{plan.description || "Sin descripción"}</p>
        
        {/* Contenedor desplazable de contenido */}
        <div className="space-y-4 text-gray-700 overflow-y-auto max-h-[60vh]">
          <p className="flex items-center">
            <Clipboard className="w-5 h-5 mr-2 text-blue-500" />
            {plan.meal_plan || "No especificado"}
          </p>
          <p className="flex items-center">
            <Flame className="w-5 h-5 mr-2 text-red-500" />
            {plan.calories_per_day || "N/A"} kcal/día
          </p>
          <p className="flex items-center">
            <Flame className="w-5 h-5 mr-2 text-orange-500" />
            Total: {plan.calories_total || "N/A"} kcal
          </p>
          <p className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-green-500" />
            {plan.macros || "No especificado"}
          </p>
          <p className="flex items-center">
            <Timer className="w-5 h-5 mr-2 text-purple-500" />
            Duración: {plan.duration_days || "N/A"} días
          </p>
          <p className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-yellow-500" />
            Objetivo: {plan.goal || "No definido"}
          </p>
          <p className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-gray-500" />
            {plan.start_date
              ? new Date(plan.start_date).toLocaleDateString()
              : "No definido"}{" "}
            -{" "}
            {plan.end_date
              ? new Date(plan.end_date).toLocaleDateString()
              : "No definido"}
          </p>
          <p className="flex items-center">
            <StickyNote className="w-5 h-5 mr-2 text-teal-500" />
            Notas: {plan.notes || "No especificado"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;

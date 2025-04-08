"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/app/components/Button";
import { PencilIcon, CameraIcon } from "@heroicons/react/24/solid";
import Navbar from "@/app/components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [preferences, setPreferences] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [activityHistory, setActivityHistory] = useState("");
  const [progress, setProgress] = useState<string[]>([]); // Change to array
  const [socialLinks, setSocialLinks] = useState("");
  const [language, setLanguage] = useState("es");
  const [darkMode, setDarkMode] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = response.data;
        setName(data.name || "");
        setGoal(data.goal || "");
        setPreferences(data.preferences || "");
        setRestrictions(data.restrictions || "");
        setPhone(data.phone || "");
        setLocation(data.location || "");
        setActivityHistory(data.activityHistory || "");
        setProgress(data.progress || []);
        setSocialLinks(data.socialLinks || "");
        setLanguage(data.language || "es");
        setDarkMode(data.darkMode || false);
        setImage(data.image ? data.image : null); // Set image URL from backend
        setGender(data.gender || "");
        setAge(data.age || "");
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error al cargar el perfil.");
      }
    };

    fetchProfile();
  }, []);

  const handleProgressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProgress(e.target.value.split("\n")); // Split input by new lines
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFields: Record<string, any> = {};
    if (name.trim()) updatedFields.name = name.trim();
    if (goal.trim()) updatedFields.goal = goal.trim();
    if (preferences.trim()) updatedFields.preferences = preferences.trim();
    if (restrictions.trim()) updatedFields.restrictions = restrictions.trim();
    if (phone.trim()) updatedFields.phone = phone.trim();
    if (location.trim()) updatedFields.location = location.trim();
    if (activityHistory.trim()) updatedFields.activityHistory = activityHistory.trim();
    if (progress.length > 0) updatedFields.progress = progress;
    if (socialLinks.trim()) updatedFields.socialLinks = socialLinks.trim();
    if (language) updatedFields.language = language;
    updatedFields.darkMode = darkMode;
    if (gender.trim()) updatedFields.gender = gender.trim();
    if (age.trim()) updatedFields.age = age.trim();

    if (Object.keys(updatedFields).length === 0 && !image) {
      setError("No hay cambios para guardar.");
      return;
    }

    const formData = new FormData();
    Object.keys(updatedFields).forEach((key) => {
      formData.append(key, updatedFields[key]);
    });

    if (image) {
      formData.append("image", image); // Add the image file to FormData
      console.log("Image file appended to FormData:", image); // Debugging log
    }

    // Debugging log to verify FormData content
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    setIsLoading(true);
    try {
      await axios.put("/api/profile", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", // Set the correct content type
        },
      });
      setIsSubmitted(true);
      toast.success("Perfil actualizado exitosamente.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error updating profile:", error.response || error);
      } else {
        console.error("Error updating profile:", error);
      }
      setError("Error al actualizar el perfil.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setName("");
    setGoal("");
    setPreferences("");
    setRestrictions("");
    setPhone("");
    setLocation("");
    setActivityHistory("");
    setProgress([]);
    setSocialLinks("");
    setLanguage("es");
    setDarkMode(false);
    setGender("");
    setAge("");
    setImage(null);
    setError("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setImage(file);
      } else {
        toast.error("Por favor, selecciona un archivo de imagen válido.");
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-purple-200 via-pink-300 to-orange-200'}`}>
      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
      <Navbar /> {/* Navbar at the top */}
      <main className="flex-grow p-6 flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl">
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <img
                src={image ? (typeof image === "string" ? image : URL.createObjectURL(image)) : "/default-avatar.png"}
                alt="Perfil"
                className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
              />
              <label htmlFor="image-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer">
                <CameraIcon className="w-6 h-6 text-gray-700" />
                <input
                  id="image-upload"
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Crear o Editar tu perfil</h2>

          <form onSubmit={handleSubmit} className="space-y-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ingresa tu nombre"
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Objetivo:</label>
              <input
                type="text"
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ej. Bajar de peso, ganar masa muscular"
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="preferences" className="block text-sm font-medium text-gray-700">Preferencias alimenticias:</label>
              <input
                type="text"
                id="preferences"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ej. Vegetariano, sin gluten"
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="restrictions" className="block text-sm font-medium text-gray-700">Restricciones dietéticas:</label>
              <input
                type="text"
                id="restrictions"
                value={restrictions}
                onChange={(e) => setRestrictions(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ej. Alergias, intolerancias"
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Número de teléfono:</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ingresa tu número de teléfono"
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Ubicación:</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ingresa tu ubicación"
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="activityHistory" className="block text-sm font-medium text-gray-700">Historial de actividades:</label>
              <textarea
                id="activityHistory"
                value={activityHistory}
                onChange={(e) => setActivityHistory(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Describe tu historial de actividades"
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="progress" className="block text-sm font-medium text-gray-700">Progreso:</label>
              <textarea
                id="progress"
                value={progress.join("\n")} // Join array into a string for display
                onChange={handleProgressChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Describe tu progreso (una línea por entrada)"
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="socialLinks" className="block text-sm font-medium text-gray-700">Enlaces de redes sociales:</label>
              <input
                type="text"
                id="socialLinks"
                value={socialLinks}
                onChange={(e) => setSocialLinks(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ingresa tus enlaces de redes sociales"
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">Idioma:</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="es">Español</option>
                <option value="en">Inglés</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-sm col-span-2">{error}</p>}

            <div className="col-span-1 sm:col-span-2 flex justify-between items-center space-x-4">
              <Button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={isLoading}
              >
                {isLoading ? "Guardando..." : isSubmitted ? "Guardado" : "Guardar Perfil"}
              </Button>

              <Button
                type="button"
                onClick={handleClear}
                className="w-full py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Limpiar
              </Button>
            </div>
          </form>
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p className="text-sm">© 2023 Dieta AI. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Profile;

'use client'

import { Sparkles, BrainCog, Salad, HeartPulse, Leaf, Image, CloudSun, Bot, DollarSign } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-100">
      <Navbar />

      <section className="relative bg-gradient-to-r from-green-600 to-blue-700 py-20 text-white text-center">
        <div className="absolute inset-0 z-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-wide">
            Conoce nuestros servicios
          </h1>
          <p className="mt-4 text-xl text-gray-100">
            Tu asistente nutricional potenciado por IA, creado para transformar tu salud.
          </p>
          <p className="mt-2 text-md text-gray-300">
            Ofrecemos un conjunto integral de servicios para ayudarte a lograr tus objetivos nutricionales y de bienestar.
          </p>
          <a href="#servicios" className="mt-8 inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md transition">
            Descubre nuestros servicios
          </a>

        </div>
      </section>

      <section id="servicios" className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <Sparkles className="text-blue-600" />
              <div>
                <h2 className="font-semibold text-lg">Perfil Personalizado</h2>
                <p className="text-gray-600">Completa tu perfil con objetivos, preferencias y restricciones dietéticas. Usamos esta info para personalizar tu experiencia.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <BrainCog className="text-pink-500" />
              <div>
                <h2 className="font-semibold text-lg">IA Nutricional</h2>
                <p className="text-gray-600">Nuestro motor de IA genera dietas personalizadas basadas en tu perfil y ajustadas automáticamente con tu progreso.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <Salad className="text-green-600" />
              <div>
                <h2 className="font-semibold text-lg">Recetas Inteligentes</h2>
                <p className="text-gray-600">Recibe recetas personalizadas y deliciosas sugeridas por un sistema de recomendación según tus gustos y necesidades.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <Image className="text-yellow-500" />
              <div>
                <h2 className="font-semibold text-lg">Reconocimiento de Alimentos</h2>
                <p className="text-gray-600">Toma una foto de tu comida y nuestra IA te dirá qué es y cuántas calorías tiene.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <HeartPulse className="text-red-500" />
              <div>
                <h2 className="font-semibold text-lg">Seguimiento de Progreso</h2>
                <p className="text-gray-600">Registra tu peso, calorías consumidas y más. Tu plan se ajustará automáticamente para ayudarte a lograr tus metas.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <Bot className="text-purple-500" />
              <div>
                <h2 className="font-semibold text-lg">Asistente Virtual</h2>
                <p className="text-gray-600">Resuelve dudas y recibe recomendaciones en tiempo real gracias a nuestro chatbot integrado con IA.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <CloudSun className="text-orange-400" />
              <div>
                <h2 className="font-semibold text-lg">Ajustes por Clima y Actividad</h2>
                <p className="text-gray-600">Nuestro sistema adapta tu dieta según el clima local y tu nivel de actividad física para mantenerte siempre equilibrado.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <DollarSign className="text-emerald-600" />
              <div>
                <h2 className="font-semibold text-lg">Modelo Freemium</h2>
                <p className="text-gray-600">Accede gratis a funciones básicas o mejora a Premium para desbloquear todas las funcionalidades con suscripción mensual.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

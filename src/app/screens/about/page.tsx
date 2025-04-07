'use client'

import { Sparkles, BrainCog, Salad, HeartPulse, Leaf, ChevronRight } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-100 to-blue-100">
      <Navbar />

      <main className="flex-grow px-6 py-12 max-w-5xl mx-auto">
        {/* Encabezado principal */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Acerca de Nosotros</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Creamos planes de alimentación personalizados usando inteligencia artificial. Tú cuidas de ti, nosotros nos encargamos de la dieta 🧠🥗
          </p>
        </section>

        {/* Tarjetas visuales */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {/* Nutrición Inteligente */}
          <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Leaf className="h-10 w-10 text-green-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Nutrición Inteligente</h2>
              <p className="text-gray-600">
                Usamos IA para que cada comida tenga sentido para tu cuerpo, tus objetivos y tus gustos.
              </p>
            </CardContent>
          </Card>

          {/* Salud al Centro */}
          <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <HeartPulse className="h-10 w-10 text-pink-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Salud al Centro</h2>
              <p className="text-gray-600">
                No se trata solo de calorías. Diseñamos planes que te hacen sentir bien por dentro y por fuera.
              </p>
            </CardContent>
          </Card>

          {/* IA que te conoce */}
          <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <BrainCog className="h-10 w-10 text-indigo-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">IA que te conoce</h2>
              <p className="text-gray-600">
                Nuestra IA aprende de ti: tus hábitos, horarios y preferencias para crear un plan solo tuyo.
              </p>
            </CardContent>
          </Card>

          {/* Comer rico y bien */}
          <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Salad className="h-10 w-10 text-lime-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Comer rico y bien</h2>
              <p className="text-gray-600">
                Queremos que disfrutes lo que comes. Nada de menús tristes. Todo es sabroso y equilibrado.
              </p>
            </CardContent>
          </Card>

          {/* Todo automático */}
          <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Sparkles className="h-10 w-10 text-rose-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Todo automático</h2>
              <p className="text-gray-600">
                Te damos un plan completo y listo para seguir. Tú decides cuánto cocinas y cuánto delegas.
              </p>
            </CardContent>
          </Card>

          {/* Flexibilidad Total */}
          <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <ChevronRight className="h-10 w-10 text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Flexibilidad Total</h2>
              <p className="text-gray-600">
                No hay reglas fijas: puedes ajustar las comidas, los horarios y los ingredientes según tu ritmo.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Misión */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestra misión</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Hacer que alimentarte bien sea más fácil que pedir comida rápida. Porque creemos que la nutrición no tiene que ser complicada. Solo tiene que ser tuya.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

'use client'

import { Sparkles, BrainCog, Salad, HeartPulse, Leaf, ChevronRight, UserRound, Utensils, Apple, Carrot } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Dra. Sofía Márquez",
    role: "Jefa de IA y Nutrición",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQD7OJjrYwsXnaSoPCnOJ37t_bEarP15m-kQ&s",
    bio: "Lidera nuestra IA con pasión por la salud.",
    social: "https://twitter.com/sofiamarquez",
    icon: <Apple className="inline-block h-6 w-6 text-green-500 mr-1" />,
  },
  {
    name: "Carlos Ruiz",
    role: "Ingeniero de Software",
    image: "https://www.anahuac.mx/puebla/sites/default/files/gallery-article/día%20personas%20con%20discapacidad%202_0.jpg",
    bio: "Teje el código para una experiencia mágica.",
    social: "https://github.com/carlosruiz",
    icon: <BrainCog className="inline-block h-6 w-6 text-indigo-500 mr-1" />,
  },
  {
    name: "Laura Gómez",
    role: "Especialista en UX",
    image: "https://www.lavanguardia.com/files/image_480_496/files/fp/uploads/2021/09/30/6154f27965814.r_d.528-377.jpeg",
    bio: "Crea experiencias de usuario adorables.",
    social: "https://linkedin.com/in/lauragomez",
    icon: <UserRound className="inline-block h-6 w-6 text-gray-500 mr-1" />,
  },
  {
    name: "Javier Pérez",
    role: "Gurú de Contenido",
    image: "https://media.istockphoto.com/id/1389348844/es/foto/foto-de-estudio-de-una-hermosa-joven-sonriendo-mientras-está-de-pie-sobre-un-fondo-gris.jpg?s=612x612&w=0&k=20&c=kUufmNoTnDcRbyeHhU1wRiip-fNjTWP9owjHf75frFQ=",
    bio: "Comparte consejos y recetas saludables.",
    social: "https://instagram.com/javierbienestar",
    icon: <Carrot className="inline-block h-6 w-6 text-orange-500 mr-1" />,
  },
];

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
          <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Leaf className="h-10 w-10 text-green-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Nutrición Inteligente</h2>
              <p className="text-gray-600">Usamos IA para que cada comida tenga sentido para tu cuerpo, tus objetivos y tus gustos.</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <HeartPulse className="h-10 w-10 text-pink-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Salud al Centro</h2>
              <p className="text-gray-600">No se trata solo de calorías. Diseñamos planes que te hacen sentir bien por dentro y por fuera.</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <BrainCog className="h-10 w-10 text-indigo-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">IA que te conoce</h2>
              <p className="text-gray-600">Nuestra IA aprende de ti: tus hábitos, horarios y preferencias para crear un plan solo tuyo.</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Salad className="h-10 w-10 text-lime-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Comer rico y bien</h2>
              <p className="text-gray-600">Queremos que disfrutes lo que comes. Nada de menús tristes. Todo es sabroso y equilibrado.</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Sparkles className="h-10 w-10 text-rose-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Todo automático</h2>
              <p className="text-gray-600">Te damos un plan completo y listo para seguir. Tú decides cuánto cocinas y cuánto delegas.</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <ChevronRight className="h-10 w-10 text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Flexibilidad Total</h2>
              <p className="text-gray-600">No hay reglas fijas: puedes ajustar las comidas, los horarios y los ingredientes según tu ritmo.</p>
            </CardContent>
          </Card>
        </section>

        {/* Misión */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestra misión <Sparkles className="inline-block h-8 w-8 text-yellow-500 animate-pulse" /></h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Dejarás de pensar en dietas complicadas y aburridas. <span className="font-semibold text-blue-600">Nuestra misión es tan clara como un caldo depurativo:</span> hacer que alimentarte bien sea tan sencillo y apetecible como elegir tu próximo maratón de series. Porque creemos firmemente que la nutrición inteligente no es un lujo, ¡es tu superpoder diario esperando ser activado! <BrainCog className="inline-block h-6 w-6 text-indigo-500 ml-1" />
          </p>
        </section>

        {/* SECCIÓN "NUESTRO EQUIPO" - TODO en un cuadrado azul con texto legible e icono a la izquierda del nombre */}
        <section className="py-8 rounded-lg bg-blue-100 shadow-md text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 text-center">
              <span className="inline-flex items-center bg-blue-200 text-blue-800 text-sm font-semibold rounded-full px-3 py-1">
                <h2 className="text-lg font-bold mr-2">Nuestro Equipo</h2>
                <Salad className="inline-block h-5 w-5 align-middle" />
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div key={member.name} className="bg-white rounded-md p-4 text-center text-gray-800">
                  <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden mb-2">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">
                    {member.icon && <span className="inline-block mr-1">{member.icon}</span>}
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                  {member.social && (
                    <a href={member.social} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs mt-2 block">
                      Sígueme
                    </a>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-blue-800 mt-4 text-sm">
              Dedicados a tu bienestar a través de la ciencia y la pasión.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
// components/Features.tsx
'use client';
import React from 'react';
import Link from 'next/link';

const features = [
  { title: "Planes Personalizados", description: "Dietas adaptadas a tus metas y restricciones.", icon: "🍏" },
  { title: "Recetas Saludables", description: "Deliciosas recetas que se ajustan a tu dieta.", icon: "🍳" },
  { title: "Asistente Virtual", description: "Recibe recomendaciones personalizadas de nutrición.", icon: "🤖" },
  { title: "Seguimiento de Progreso", description: "Monitorea tu avance y ajusta tu dieta en tiempo real.", icon: "📊" },
];

const Features = () => {
  return (
    <section className="py-20 bg-[var(--color-theme-background-secondary)] text-center">
      <h2 className="text-4xl font-semibold mb-10 text-[var(--color-theme-text)]">Características Clave</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-8 rounded-3xl shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105">
            <div className="text-5xl mb-6 transition-all duration-500 ease-in-out">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-2 text-[var(--color-theme-text)]">{feature.title}</h3>
            <p className="text-lg text-gray-600">{feature.description}</p>
            <Link href="/screens/panel-usuario" className="text-[var(--color-theme-secondary)] hover:text-[var(--color-theme-success)] mt-4 inline-block transition-all duration-300">Ver más</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;

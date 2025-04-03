// components/Testimonials.tsx
'use client';
import React from 'react';
import Link from 'next/link';

const testimonials = [
  { name: "Juan Pérez", feedback: "¡Esta app cambió mi vida! Ahora tengo una dieta perfecta para mis objetivos.", photo: "https://picsum.photos/150?random=1" },
  { name: "Ana Martínez", feedback: "El seguimiento de progreso es increíble. Me ayuda a mejorar cada día.", photo: "https://picsum.photos/150?random=2" },
];

const Testimonial = () => {
  return (
    <section className="bg-[var(--color-theme-background-secondary)] py-20 text-center">
      <h2 className="text-4xl font-semibold mb-10 text-[var(--color-theme-text)]">Lo que dicen nuestros usuarios</h2>
      <div className="flex flex-col lg:flex-row justify-center gap-10 px-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 max-w-xs mx-auto">
            <img src={testimonial.photo} alt={testimonial.name} className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-[var(--color-theme-secondary)]" />
            <h3 className="font-bold text-2xl mb-2 text-[var(--color-theme-text)]">{testimonial.name}</h3>
            <p className="text-lg italic text-gray-600 mb-4">{testimonial.feedback}</p>
            <Link href="/testimonials" className="text-[var(--color-theme-secondary)] hover:text-[var(--color-theme-success)]">Leer más</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;

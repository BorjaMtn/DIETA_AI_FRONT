// components/CTA.tsx
'use client';
import React from 'react';
import Link from 'next/link';

const CTA = () => {
  return (
    <section className="bg-gradient-to-r from-[var(--color-theme-primary)] to-[var(--color-theme-secondary)] text-[var(--color-theme-background)] py-20 text-center">
      <h2 className="text-5xl font-bold mb-6 text-shadow-lg text-[var(--color-theme-background)] animate__animated animate__fadeIn">
        ¿Listo para mejorar tu salud?
      </h2>
      <p className="text-xl mb-8 text-[var(--color-theme-background)] opacity-90 animate__animated animate__fadeIn animate__delay-1s">
        Empieza hoy mismo con un plan de dieta personalizado.
      </p>
      <Link 
        href="#perfil" 
        className="bg-[var(--color-theme-success)] text-[var(--color-theme-background)] py-4 px-10 rounded-full text-lg font-semibold hover:bg-[var(--color-theme-success)] transition-all duration-300 ease-in-out transform hover:scale-105">
        Crear Perfil
      </Link>
    </section>
  );
};

export default CTA;

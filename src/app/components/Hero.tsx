// components/HeroSection.tsx
'use client';
import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative bg-[var(--color-theme-background)] text-[var(--color-theme-primary)] py-24 px-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Mejora tu vida con un plan nutricional único
        </h1>
        <p className="text-lg md:text-xl mb-8 text-[var(--color-theme-secondary)]">
          Descubre cómo una dieta personalizada puede transformar tu salud y bienestar.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            href="/comienza-ahora"
            className="bg-[var(--color-theme-primary)] text-[var(--color-theme-background)] py-3 px-8 rounded-lg text-lg font-medium hover:bg-[var(--color-theme-secondary)] transition-all duration-300">
            Comienza Ahora
          </Link>
          <Link 
            href="/mas-informacion"
            className="border-2 border-[var(--color-theme-primary)] text-[var(--color-theme-primary)] py-3 px-8 rounded-lg text-lg font-medium hover:bg-[var(--color-theme-primary)] hover:text-[var(--color-theme-background)] transition-all duration-300">
            Más Información
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

'use client';
import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative bg-cover bg-center py-24 px-8 flex flex-col items-center justify-center">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/image-hero.webp")' }}
      ></div>

      {/* Contenido */}
      <div className="relative z-10 max-w-4xl p-8 text-center bg-gradient-to-r from-white/80 via-white/70 to-white/80 rounded-3xl shadow-2xl backdrop-blur-sm">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[#2196F3]">
          Mejora tu vida con un plan nutricional único
        </h1>
        <p className="text-lg md:text-xl mb-8 text-[#2196F3]">
          Descubre cómo una dieta personalizada puede transformar tu salud y bienestar.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            href="/comienza-ahora"
            className="bg-[#2196F3] text-white py-3 px-8 rounded-full text-lg font-medium hover:bg-[#1976D2] transition-all duration-300">
            Comienza Ahora
          </Link>
          <Link 
            href="/mas-informacion"
            className="border-2 border-[#2196F3] text-[#2196F3] py-3 px-8 rounded-full text-lg font-medium hover:bg-[#2196F3] hover:text-white transition-all duration-300">
            Más Información
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

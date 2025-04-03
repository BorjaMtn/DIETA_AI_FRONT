'use client';

import Button from './Button';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Bienvenido a Nuestra Página</h1>
        <p className="text-xl mb-8">Transforma tu experiencia con nuestros servicios innovadores</p>
        <Link href="/services">
          <Button>Ver Servicios</Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
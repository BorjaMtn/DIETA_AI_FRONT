'use client';

import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Mi Empresa. Todos los derechos reservados.</p>
        <div className="mt-4">
          <Link href="/privacy-policy" className="text-gray-300 hover:text-white mx-4">Política de Privacidad</Link>
          <Link href="/terms" className="text-gray-300 hover:text-white mx-4">Términos de Servicio</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
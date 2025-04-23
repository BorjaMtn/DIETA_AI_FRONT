import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tu configuración async rewrites existente:
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Asegúrate de que la destination sea correcta para tu backend Laravel
        destination: 'http://127.0.0.1:8000/api/:path*',
      },
    ];
  },

  // --- Añadido: Configuración de imágenes remotas ---
  images: {
    remotePatterns: [
      {
        // Para permitir imágenes de Open Food Facts (según el error)
        protocol: 'https',
        hostname: 'images.openfoodfacts.org',
        port: '', // Puerto estándar https (443), no necesita especificarse
        pathname: '/images/products/**', // Puedes ajustar el pathname si quieres ser más específico
      },
      {
        // Para permitir imágenes desde tu backend local (si las sirves desde allí)
        // Usamos el mismo hostname/puerto que en 'rewrites' para consistencia
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/**', // Permite cualquier imagen desde tu backend
      },
      // Puedes añadir más configuraciones aquí para otros dominios si es necesario
    ],
  },
  // Aquí podrían ir otras configuraciones de Next.js si las tienes
};

export default nextConfig;
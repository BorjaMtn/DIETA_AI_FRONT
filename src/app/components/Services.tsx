'use client';

import Button from './Button';

const Services: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Servicio 1</h3>
            <p className="text-gray-600 mb-4">Descripción breve del servicio 1.</p>
            <Button>Ver Más</Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Servicio 2</h3>
            <p className="text-gray-600 mb-4">Descripción breve del servicio 2.</p>
            <Button>Ver Más</Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Servicio 3</h3>
            <p className="text-gray-600 mb-4">Descripción breve del servicio 3.</p>
            <Button>Ver Más</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
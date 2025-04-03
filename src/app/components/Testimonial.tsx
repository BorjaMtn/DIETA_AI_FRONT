'use client';

const Testimonial: React.FC = () => {
  return (
    <section className="py-16 bg-gray-200">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Testimonios</h2>
        <div className="flex justify-center gap-8">
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">"Excelente servicio, muy recomendado!"</p>
            <h4 className="font-semibold">Cliente 1</h4>
          </div>
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">"Un cambio radical para mi negocio, muy satisfecho."</p>
            <h4 className="font-semibold">Cliente 2</h4>
          </div>
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">"Gran experiencia, atención de primera."</p>
            <h4 className="font-semibold">Cliente 3</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
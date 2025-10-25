import React from 'react';

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center mb-12">
    {title}
    <span className="h-px bg-gray-200 flex-grow ml-6"></span>
  </h2>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 border-b border-gray-200">
      <SectionTitle title="Sobre mí" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-3 text-gray-600 space-y-4 leading-relaxed text-lg">
          <p>
            ¡Hola! Soy Eric, un apasionado desarrollador web con un fuerte enfoque en crear experiencias de usuario intuitivas y atractivas. Mi viaje en la programación comenzó con la curiosidad de cómo las ideas se transforman en soluciones digitales interactivas, y desde entonces no he dejado de aprender y explorar.
          </p>
          <p>
            Con una sólida base en tecnologías frontend como React y Tailwind CSS, me especializo en convertir diseños complejos en aplicaciones web funcionales y estéticamente agradables. Disfruto resolviendo problemas y optimizando el rendimiento para entregar productos de alta calidad.
          </p>
          <p>
            Actualmente estoy ampliando mis habilidades hacia el backend para convertirme en un desarrollador más completo y versátil, listo para afrontar nuevos desafíos.
          </p>
        </div>
        <div className="md:col-span-2 flex justify-center items-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 group">
                <div className="absolute inset-0 bg-blue-500 rounded-lg transform transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>
                <img 
                    src="https://res.cloudinary.com/djeqn9kjl/image/upload/v1761399357/c45c2556-163a-4163-bba1-8fbaf7f8704f_jpptxx.png" 
                    alt="Eric Batista" 
                    className="absolute inset-0 w-full h-full object-cover rounded-lg z-10 filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
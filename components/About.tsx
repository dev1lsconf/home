import React from 'react';

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center mb-12">
    <span className="shrink-0">{title}</span>
    <span className="h-px bg-gradient-to-r from-gray-200 dark:from-gray-700 to-transparent flex-grow ml-6"></span>
  </h2>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 border-b border-gray-200/80 dark:border-gray-700/50">
      <SectionTitle title="Sobre mí" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-3 text-gray-600 dark:text-gray-400 space-y-5 leading-relaxed text-lg">
          <p className="text-xl text-gray-800 dark:text-gray-200 font-semibold">
            ¡Hola! Soy Eric, un apasionado desarrollador web con un fuerte enfoque en crear experiencias de usuario intuitivas y atractivas.
          </p>
          <p>
            Mi viaje en la programación comenzó con la curiosidad de cómo las ideas se transforman en soluciones digitales interactivas, y desde entonces no he dejado de aprender y explorar.
          </p>
          <p>
            Con una sólida base en tecnologías frontend como <span className="text-blue-600 font-medium">React</span> y <span className="text-blue-600 font-medium">Tailwind CSS</span>, me especializo en convertir diseños complejos en aplicaciones web funcionales y estéticamente agradables. Disfruto resolviendo problemas y optimizando el rendimiento para entregar productos de alta calidad.
          </p>
          <p>
            Actualmente estoy ampliando mis habilidades hacia el backend para convertirme en un desarrollador más completo y versátil, listo para afrontar nuevos desafíos.
          </p>
        </div>
        <div className="md:col-span-2 flex justify-center items-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 group">
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl opacity-50 blur group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-blue-500 rounded-2xl transform transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <img 
              src="https://res.cloudinary.com/djeqn9kjl/image/upload/v1761399357/c45c2556-163a-4163-bba1-8fbaf7f8704f_jpptxx.png" 
              alt="Eric Batista" 
              className="absolute inset-0 w-full h-full object-cover rounded-2xl z-10 filter grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 z-20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-start">
      <div className="max-w-4xl">
        <h1 className="text-xl md:text-2xl font-mono text-blue-600 mb-4">Hola, mi nombre es</h1>
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900">Eric Batista.</h2>
        <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-500 mt-2">Construyo cosas para la web.</h3>
        <p className="mt-6 max-w-xl text-gray-600 leading-relaxed text-lg">
          Soy un desarrollador Full Stack especializado en crear (y ocasionalmente diseñar) experiencias digitales excepcionales. Actualmente, estoy enfocado en construir productos accesibles y centrados en el usuario.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-300 text-lg">
                Ver mis proyectos
            </a>
            <a href="https://docs.google.com/document/d/1XgY-eLp9n5o3jQ6hWz8kZ0d7f1aB3c4d5eF6g7h8i9j/export?format=pdf" download="Eric_Batista_CV.pdf" className="px-8 py-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-300 text-lg">
                Descargar CV
            </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
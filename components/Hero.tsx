import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-start pt-24">
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="relative max-w-4xl">
        <h1 className="text-lg md:text-xl font-mono text-blue-600 mb-4 animate-fade-in">
          <span className="inline-block">&gt; Hola, mi nombre es</span>
        </h1>
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          Eric Batista.
        </h2>
        <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-400 dark:text-gray-500 mt-2 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <span className="gradient-text">Construyo cosas para la web.</span>
        </h3>
        <p className="mt-6 max-w-xl text-gray-600 dark:text-gray-400 leading-relaxed text-lg animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          Soy un desarrollador Full Stack especializado en crear (y ocasionalmente diseñar) experiencias digitales excepcionales. Actualmente, estoy enfocado en construir productos accesibles y centrados en el usuario.
        </p>
        <div className="mt-12 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <a href="#projects" className="group relative px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 text-lg shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5">
            Ver mis proyectos
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a href="https://drive.google.com/file/d/1N5smIuYZXgkyKMFbwHNpeuMet-cQ3Ffq/view?usp=sharing" className="group relative px-8 py-4 border-2 border-blue-600/30 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 text-lg hover:-translate-y-0.5">
            <span className="inline-block mr-2">↓</span>
            Descargar CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

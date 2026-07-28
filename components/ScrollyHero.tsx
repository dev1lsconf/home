import React from 'react';

const ScrollyHero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-void">
      <div className="flex flex-col justify-center items-start max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <p className="font-mono text-sm text-indigo tracking-widest uppercase mb-8">
          — 01 · Full Stack Developer en Barcelona
        </p>
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.9] font-bold">
          Diseño y código
          <br />
          <span className="gradient-text">donde cada píxel importa.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-mist leading-relaxed font-body">
          Full Stack Developer freelance en Barcelona. Especialista en Next.js, React, TypeScript, JavaScript y DevOps. Transformo ideas complejas en productos web rápidos, accesibles y visualmente impecables.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-indigo text-snow font-semibold rounded-lg hover:bg-indigo-deep transition-all duration-300 text-lg shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5"
          >
            Ver proyectos
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="https://drive.google.com/file/d/1N5smIuYZXgkyKMFbwHNpeuMet-cQ3Ffq/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 border border-steel text-mist rounded-lg hover:bg-graphite hover:text-snow transition-all duration-300 text-lg hover:-translate-y-0.5"
          >
            <span>↓</span>
            Descargar CV
          </a>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-12 left-0 right-0 flex justify-center z-10">
        <a href="#about" className="text-mist hover:text-snow transition-colors" aria-label="Desplázate para conocer más">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </a>
      </div>
    </section>
  );
};

export default ScrollyHero;

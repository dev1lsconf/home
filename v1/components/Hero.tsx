import React from 'react';
import HeroScene from './HeroScene';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-start pt-24 overflow-hidden">
      <HeroScene />
      <div className="relative max-w-4xl" data-animate="hero-stagger">
        <p className="font-mono text-sm text-indigo tracking-widest uppercase mb-8" data-animate-item>
          — 01 · Full Stack Developer
        </p>
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.9] font-bold" data-animate-item>
          Diseño y código
          <br />
          <span className="gradient-text">donde cada píxel importa.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-mist leading-relaxed font-body" data-animate-item>
          Full Stack Developer. Transformo ideas complejas en productos web rápidos, accesibles y visualmente impecables.
        </p>
        <div className="mt-12 flex flex-wrap gap-4" data-animate-item>
          <a
            href="#projects"
            data-magnetic
            className="group inline-flex items-center gap-2 px-8 py-4 bg-indigo text-snow font-semibold rounded-lg hover:bg-indigo-deep transition-all duration-300 text-lg shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5"
          >
            Ver mi trabajo
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="https://drive.google.com/file/d/1N5smIuYZXgkyKMFbwHNpeuMet-cQ3Ffq/view?usp=sharing"
            data-magnetic
            className="group inline-flex items-center gap-2 px-8 py-4 border border-steel text-mist rounded-lg hover:bg-graphite hover:text-snow transition-all duration-300 text-lg hover:-translate-y-0.5"
          >
            <span className="inline-block">↓</span>
            Descargar CV
          </a>
        </div>
      </div>
      <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-float">
        <a href="#services" className="text-mist hover:text-snow transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;

import React from 'react';
import CodeEditor from './CodeEditor';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-3" data-animate="fade-left">
          <p className="font-mono text-xs text-indigo tracking-widest uppercase mb-4">— Sobre mí</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-snow mb-8">
            Full Stack Developer <span className="gradient-text">freelance en Barcelona</span>
          </h2>
          <div className="space-y-5 text-mist text-base leading-relaxed">
            <p className="text-snow font-semibold text-lg">
              Hola! Soy Eric, desarrollador Full Stack con sede en Barcelona. Apasionado por crear experiencias de usuario intuitivas y atractivas usando Next.js, React, TypeScript, JavaScript y tecnologías DevOps.
            </p>
            <p>
              Con experiencia en <strong className="text-snow">desarrollo web full stack</strong>, <strong className="text-snow">administración de sistemas Linux</strong> y <strong className="text-snow">automatización DevOps</strong>, he construido productos digitales para despachos legales, dashboards financieros, plataformas e-commerce y redes sociales descentralizadas.
            </p>
            <p>
              Me especializo en <span className="text-indigo font-medium">Next.js</span>,{' '}
              <span className="text-indigo font-medium">React</span>,{' '}
              <span className="text-indigo font-medium">TypeScript</span>,{' '}
              <span className="text-indigo font-medium">Tailwind CSS</span>,{' '}
              <span className="text-indigo font-medium">JavaScript</span>,{' '}
              <span className="text-indigo font-medium">Python</span>,{' '}
              <span className="text-indigo font-medium">Docker</span> y{' '}
              <span className="text-indigo font-medium">Linux</span>.
              Convierto diseños complejos en aplicaciones funcionales y estéticamente impecables, optimizadas para rendimiento y SEO.
            </p>
            <p>
              Como <strong className="text-snow">desarrollador freelance en Barcelona</strong>, trabajo con startups y empresas para llevar sus productos digitales al siguiente nivel — desde la arquitectura inicial hasta el deploy y monitoreo continuo.
            </p>
          </div>
        </div>
        <div className="lg:col-span-2 flex justify-center lg:justify-end">
          <CodeEditor />
        </div>
      </div>
    </section>
  );
};

export default About;

import React from 'react';
import CodeEditor from './CodeEditor';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
        <div className="lg:col-span-3" data-animate="fade-left">
          <p className="font-mono text-xs text-indigo tracking-widest uppercase mb-4">— Sobre mí</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-snow mb-8">
            Transformando ideas en <span className="gradient-text">productos digitales</span>
          </h2>
          <div className="space-y-5 text-mist text-base leading-relaxed">
            <p className="text-snow font-semibold text-lg">
              Hola! Soy Eric, desarrollador Full Stack apasionado por crear experiencias de usuario intuitivas y atractivas.
            </p>
            <p>
              Mi viaje en la programacion comenzo con la curiosidad de como las ideas se transforman en soluciones digitales interactivas. Desde entonces, no he dejado de aprender y explorar.
            </p>
            <p>
              Me especializo en <span className="text-indigo font-medium">React</span>,{' '}
              <span className="text-indigo font-medium">TypeScript</span> y{' '}
              <span className="text-indigo font-medium">Tailwind CSS</span>, convirtiendo disenos complejos en aplicaciones funcionales y esteticamente impecables.
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

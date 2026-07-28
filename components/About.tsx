import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
        <div className="lg:col-span-3">
          <p className="font-mono text-xs text-indigo tracking-widest uppercase mb-4">— Sobre mí</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-snow mb-8">
            Transformando ideas en <span className="gradient-text">productos digitales</span>
          </h2>
          <div className="space-y-5 text-mist text-base leading-relaxed">
            <p className="text-snow font-semibold text-lg">
              ¡Hola! Soy Eric, desarrollador Full Stack apasionado por crear experiencias de usuario intuitivas y atractivas.
            </p>
            <p>
              Mi viaje en la programación comenzó con la curiosidad de cómo las ideas se transforman en soluciones digitales interactivas. Desde entonces, no he dejado de aprender y explorar.
            </p>
            <p>
              Me especializo en <span className="text-indigo font-medium">React</span>,{' '}
              <span className="text-indigo font-medium">TypeScript</span> y{' '}
              <span className="text-indigo font-medium">Tailwind CSS</span>, convirtiendo diseños complejos en aplicaciones funcionales y estéticamente impecables.
            </p>
          </div>
        </div>
        <div className="lg:col-span-2 flex justify-center lg:justify-end">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 group">
            <div className="absolute -inset-1 bg-gradient-to-br from-indigo to-cyan-signal rounded-2xl opacity-30 blur group-hover:opacity-60 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo to-cyan-signal rounded-2xl opacity-10" />
            <img
              src="https://res.cloudinary.com/djeqn9kjl/image/upload/v1761399357/c45c2556-163a-4163-bba1-8fbaf7f8704f_jpptxx.png"
              alt="Eric Batista"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl z-10 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-snow/10 z-20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

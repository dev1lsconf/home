import React from 'react';
import type { Service } from '../types';

const services: Service[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Web Apps a Medida',
    subtitle: 'Tu idea → producto funcional en semanas. React, TypeScript, rendimiento real.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'UI / UX Engineering',
    subtitle: 'Diseño → código sin fricción. Interfaces precisas, accesibles y consistentes.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Performance Optimization',
    subtitle: 'Lighthouse 100 garantizado. Carga rápida, Core Web Vitals, UX sin fricción.',
  },
];

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => (
  <div
    className="group relative bg-carbon border border-steel rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-indigo/30 hover:shadow-glow"
    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
  >
    <div className="w-12 h-12 rounded-xl bg-indigo/10 text-indigo flex items-center justify-center mb-6 group-hover:bg-indigo/20 transition-colors duration-300">
      {service.icon}
    </div>
    <h3 className="font-display text-xl font-bold text-snow mb-3">{service.title}</h3>
    <p className="text-mist text-sm leading-relaxed">{service.subtitle}</p>
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-indigo/40 via-cyan-signal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-x-0 group-hover:scale-x-100 origin-left" />
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32">
      <div className="max-w-xs">
        <p className="font-mono text-xs text-indigo tracking-widest uppercase mb-4">— 02 · Servicios</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-snow mb-4">Lo que hago</h2>
        <p className="text-mist text-base leading-relaxed">Construyo productos digitales que resuelven problemas reales. Sin ruido, sin sobreingeniería.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Services;

import React from 'react';
import type { Service } from '../types';

const services: Service[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Web Apps con Next.js y React',
    subtitle: 'Aplicaciones web modernas con Next.js, React, TypeScript y Tailwind. SSG, SSR, ISR — la arquitectura que tu proyecto necesita.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'UI / UX Engineering',
    subtitle: 'Diseño → código sin fricción. Interfaces precisas, accesibles y consistentes con componentes reutilizables y Design System.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'DevOps & Linux Engineering',
    subtitle: 'Infraestructura con Docker, CI/CD, servidores Linux (NixOS, OpenBSD). Automatización, monitoreo y despliegue continuo.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: 'JavaScript & Backend Development',
    subtitle: 'APIs robustas con JavaScript, Node.js, Python y FastAPI. Bases de datos SQL/NoSQL y sistemas escalables.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    title: 'AI Integration',
    subtitle: 'Integración de modelos de IA (Gemini, OpenAI) en aplicaciones web. Chatbots inteligentes, generación de contenido y automatización.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Performance & SEO Optimization',
    subtitle: 'Lighthouse 100, Core Web Vitals óptimos, SEO técnico, schema.org, OpenGraph. Tu web posicionada y rápida.',
  },
];

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => (
  <div
    data-animate-item
    className="group relative bg-carbon border border-steel rounded-2xl p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:border-indigo/30 hover:shadow-glow min-h-[220px] flex flex-col"
  >
    <div className="w-12 h-12 rounded-xl bg-indigo/10 text-indigo flex items-center justify-center mb-6 group-hover:bg-indigo/20 transition-colors duration-300 shrink-0">
      {service.icon}
    </div>
    <h3 className="font-display text-xl md:text-2xl font-bold text-snow mb-3">{service.title}</h3>
    <p className="text-mist text-sm md:text-base leading-relaxed">{service.subtitle}</p>
  </div>
);

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32">
      <div className="max-w-2xl">
        <p className="font-mono text-xs text-indigo tracking-widest uppercase mb-4">— 02 · Servicios</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-snow mb-4">Lo que hago</h2>
        <p className="text-mist text-base md:text-lg leading-relaxed">Construyo productos digitales que resuelven problemas reales. Sin ruido, sin sobreingeniería.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16" data-animate="service-stagger">
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Services;

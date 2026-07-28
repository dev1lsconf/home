import React from 'react';
import type { ProcessStep } from '../types';

const steps: ProcessStep[] = [
  { number: '01', title: 'Descubrimiento', description: 'Entiendo tu negocio, usuarios y objetivo antes de escribir una línea de código.' },
  { number: '02', title: 'Arquitectura', description: 'Wireframes, flujos de interacción y decisiones técnicas que sostienen el producto.' },
  { number: '03', title: 'Construcción', description: 'Código modular, testing continuo e iteraciones rápidas con feedback constante.' },
  { number: '04', title: 'Entrega & Grow', description: 'Deploy, monitoreo, mejoras continuas. El producto nunca está realmente terminado.' },
];

const Process: React.FC = () => {
  return (
    <section id="process" className="py-32">
      <div className="max-w-xs">
        <p className="font-mono text-xs text-indigo tracking-widest uppercase mb-4">— 03 · Proceso</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-snow mb-4">Cómo trabajo</h2>
        <p className="text-mist text-base leading-relaxed">Un proceso iterativo y transparente. Sin cajas negras ni sorpresas.</p>
      </div>
      <div className="mt-16 relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-steel hidden md:block" />
        <div className="space-y-12 md:space-y-0">
          {steps.map((step) => (
            <div key={step.number} className="md:flex md:items-start md:gap-12 group">
              <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-carbon border border-steel text-indigo font-mono text-sm font-bold shrink-0 relative z-10 group-hover:border-indigo group-hover:bg-indigo/10 transition-all duration-300">
                {step.number}
              </div>
              <div className="md:hidden flex items-center gap-4 mb-4">
                <span className="font-mono text-sm text-indigo font-bold">{step.number}</span>
                <div className="h-px flex-1 bg-steel" />
              </div>
              <div className="md:pt-2 md:pb-16">
                <h3 className="font-display text-xl font-bold text-snow mb-2">{step.title}</h3>
                <p className="text-mist text-sm leading-relaxed max-w-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

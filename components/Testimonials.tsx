import React, { useState, useEffect, useCallback } from 'react';
import type { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    quote: 'Trabajar con Eric fue increíblemente fluido. Entendió el problema antes de que terminara de explicarlo y el resultado superó nuestras expectativas.',
    name: 'Cliente',
    role: 'Director',
    company: 'Batista Doleo y Asociados',
    avatar: '',
  },
  {
    quote: 'Entregó un producto funcional y optimizado en tiempo récord. Su atención al detalle técnico marcó la diferencia.',
    name: 'Cliente',
    role: 'Product Manager',
    company: 'Proyecto Web',
    avatar: '',
  },
  {
    quote: 'Profesionalismo y calidad de código excepcionales. Sabe equilibrar la visión de diseño con las restricciones técnicas.',
    name: 'Cliente',
    role: 'CTO',
    company: 'Startup Tech',
    avatar: '',
  },
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="py-32">
      <div className="max-w-xs mb-16">
        <p className="font-mono text-xs text-indigo tracking-widest uppercase mb-4">— 05 · Testimonios</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-snow mb-4">Lo que dicen</h2>
        <p className="text-mist text-base leading-relaxed">La mejor carta de presentación es quien ya trabajó conmigo.</p>
      </div>
      <div className="relative max-w-3xl mx-auto" data-animate="testimonial-stagger">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="w-full shrink-0 px-4" data-animate-item>
                <div className="bg-carbon border border-steel rounded-2xl p-8 md:p-10">
                  <svg className="w-8 h-8 text-indigo/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className="text-snow text-lg leading-relaxed mb-8 font-body">{t.quote}</blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo/20 flex items-center justify-center text-indigo font-bold font-mono text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-snow text-sm">{t.name}</p>
                      <p className="text-mist text-xs">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? 'bg-indigo w-6' : 'bg-steel hover:bg-mist'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import React from 'react';
import type { Project } from '../types';

const projects: Project[] = [
  {
    image: 'https://res.cloudinary.com/djeqn9kjl/image/upload/v1761402115/e68b610f-68b7-468b-b08e-e708075e6094_x4zsaw.png',
    title: 'Batista Doleo y Asociados',
    description: 'Sitio web funcional y optimizado para un despacho legal. Construido con React y optimizado para rendimiento (Lighthouse 98). Diseño profesional, navegación intuitiva y experiencia fluida en todos los dispositivos.',
    tags: ['React', 'CSS', 'Performance', 'UX'],
    demoUrl: 'https://www.batistaydoleo.com/',
    codeUrl: 'https://github.com/dev1lsconf/byd',
    metrics: [{ label: 'Lighthouse', value: '98' }, { label: 'Pages', value: '6' }, { label: 'Uptime', value: '99.9%' }],
  },
  {
    image: 'https://res.cloudinary.com/djeqn9kjl/image/upload/v1761402625/Screenshot_From_2025-10-25_16-29-26_yt48lv.png',
    title: 'twtxt timeline',
    description: 'Red social descentralizada cliente-side construida con JavaScript vanilla. Lector de feeds twtxt que consume múltiples microblogs en texto plano desde el frontend. Arquitectura serverless.',
    tags: ['JavaScript', 'HTML', 'CSS', 'Serverless'],
    demoUrl: 'http://dev1ls.sdf.org/timeline/',
    codeUrl: '',
    metrics: [{ label: 'Protocolo', value: 'twtxt' }, { label: 'Arquitectura', value: 'Serverless' }, { label: 'Formato', value: '.txt' }],
  },
  {
    image: 'https://raw.githubusercontent.com/dev1lsconf/financial-panel/main/assets/Headquarters.png',
    title: '0880 Headquarters',
    description: 'Dashboard financiero en tiempo real con datos de mercado, indicadores técnicos (RSI, MACD, Bollinger Bands), predicciones y gráficos interactivos para 149+ activos (acciones, criptomonedas, forex). Backend con Python y FastAPI. Dockerizado.',
    tags: ['Python', 'FastAPI', 'Chart.js', 'Docker', 'API'],
    demoUrl: '',
    codeUrl: 'https://github.com/dev1lsconf/financial-panel',
    metrics: [{ label: 'Activos', value: '149+' }, { label: 'APIs', value: '3' }, { label: 'Stack', value: 'Full' }],
  },
  {
    image: 'https://raw.githubusercontent.com/dev1lsconf/tienda-informatica/main/tienda.png',
    title: 'Mr. Robot Store',
    description: 'E-commerce completo con panel de administración, carrito de compras en tiempo real, catálogo de productos y sistema de reservas. Estética cyberpunk inspirada en Mr. Robot con animaciones CRT y glitch. Backend en PHP con almacenamiento JSON.',
    tags: ['PHP', 'JavaScript', 'CSS3', 'JSON', 'UX'],
    demoUrl: '',
    codeUrl: 'https://github.com/dev1lsconf/tienda-informatica',
    metrics: [{ label: 'CRUD', value: 'Completo' }, { label: 'Auth', value: 'Admin' }, { label: 'Tema', value: 'Cyberpunk' }],
  },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <div className="project-card" data-index={index}>
      <div className="w-full max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-carbon border border-steel rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="overflow-hidden rounded-xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 md:h-64 object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="font-mono text-xs text-indigo tracking-widest uppercase mb-3">
              — {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-snow mb-4">
              {project.title}
            </h3>
            <p className="text-mist text-sm leading-relaxed mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="font-mono text-xs text-cyan-signal bg-cyan-signal/5 border border-cyan-signal/20 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="card-metrics">
              {project.metrics && (
                <div className="grid grid-cols-3 gap-4 border-t border-steel pt-6">
                  {project.metrics.map(m => (
                    <div key={m.label}>
                      <p className="font-mono text-lg font-bold text-snow">{m.value}</p>
                      <p className="font-mono text-xs text-mist">{m.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-snow text-void font-semibold rounded-lg hover:bg-mist transition-all text-sm"
                >
                  Demo vivo →
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-indigo text-snow font-semibold rounded-lg hover:bg-indigo-deep transition-all text-sm"
                >
                  Código
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScrollyProjects: React.FC = () => {
  return (
    <section id="scrolly-projects" className="relative py-32 bg-void">
      <div className="text-center mb-16 px-6">
        <p className="font-mono text-xs text-indigo tracking-widest uppercase mb-2">— 04 · Proyectos</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-snow">Trabajo seleccionado</h2>
      </div>
      <div className="cards-stack space-y-24">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ScrollyProjects;

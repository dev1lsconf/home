import React from 'react';
import type { Project } from '../types';

const projects: Project[] = [
  {
    image: 'https://res.cloudinary.com/djeqn9kjl/image/upload/v1761402115/e68b610f-68b7-468b-b08e-e708075e6094_x4zsaw.png',
    title: 'Batista Doleo y Asociados',
    description: 'Sitio web funcional y optimizado para un despacho legal. Diseño profesional, navegación intuitiva y experiencia fluida en todos los dispositivos.',
    tags: ['React', 'CSS', 'Performance'],
    demoUrl: 'https://www.batistaydoleo.com/',
    codeUrl: 'https://github.com/dev1lsconf/byd',
    metrics: [{ label: 'Lighthouse', value: '98' }, { label: 'Pages', value: '6' }, { label: 'Uptime', value: '99.9%' }],
  },
  {
    image: 'https://res.cloudinary.com/djeqn9kjl/image/upload/v1761402625/Screenshot_From_2025-10-25_16-29-26_yt48lv.png',
    title: 'twtxt timeline',
    description: 'Red social descentralizada cliente-side. Lector de feeds twtxt que consume múltiples microblogs en texto plano desde el frontend.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    demoUrl: 'http://dev1ls.sdf.org/timeline/',
    codeUrl: '',
    metrics: [{ label: 'Protocolo', value: 'twtxt' }, { label: 'Arquitectura', value: 'Serverless' }, { label: 'Formato', value: '.txt' }],
  },
  {
    image: 'https://raw.githubusercontent.com/dev1lsconf/financial-panel/main/assets/Headquarters.png',
    title: '0880 Headquarters',
    description: 'Dashboard financiero en tiempo real con datos de mercado, indicadores técnicos, predicciones y gráficos interactivos para acciones, criptomonedas y forex — todo desde APIs gratuitas, sin keys ni suscripciones.',
    tags: ['Python', 'FastAPI', 'Chart.js', 'Docker'],
    demoUrl: '',
    codeUrl: 'https://github.com/dev1lsconf/financial-panel',
    metrics: [{ label: 'Activos', value: '149+' }, { label: 'APIs', value: '3' }, { label: 'Stack', value: 'Full' }],
  },
  {
    image: 'https://raw.githubusercontent.com/dev1lsconf/tienda-informatica/main/tienda.png',
    title: 'Mr. Robot Store',
    description: 'E-commerce completo con panel de administración, carrito de compras en tiempo real y catálogo de productos. Estética cyberpunk inspirada en la serie Mr. Robot con animaciones CRT y glitch.',
    tags: ['PHP', 'JavaScript', 'CSS3', 'JSON'],
    demoUrl: '',
    codeUrl: 'https://github.com/dev1lsconf/tienda-informatica',
    metrics: [{ label: 'CRUD', value: 'Completo' }, { label: 'Auth', value: 'Admin' }, { label: 'Tema', value: 'Cyberpunk' }],
  },
];

const ProjectRow: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const isReversed = index % 2 !== 0;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${index > 0 ? 'mt-32' : ''}`}>
      <div className={`${isReversed ? 'lg:order-2' : ''}`}>
        <div className="group relative bg-carbon border border-steel rounded-2xl overflow-hidden transition-all duration-500 hover:border-indigo/30 hover:shadow-glow">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-6 gap-3">
            {project.demoUrl && project.demoUrl !== '#' && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-snow text-void font-semibold rounded-lg hover:bg-mist transition-all text-sm">
                Demo vivo →
              </a>
            )}
            {project.codeUrl && project.codeUrl !== '#' && (
              <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-indigo text-snow font-semibold rounded-lg hover:bg-indigo-deep transition-all text-sm">
                Código
              </a>
            )}
          </div>
        </div>
      </div>
      <div className={isReversed ? 'lg:order-1' : ''}>
        <p className="font-mono text-xs text-indigo tracking-widest uppercase mb-3">— {String(index + 1).padStart(2, '0')}</p>
        <h3 className="font-display text-3xl font-bold text-snow mb-4">{project.title}</h3>
        <p className="text-mist text-sm leading-relaxed mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map(tag => (
            <span key={tag} className="font-mono text-xs text-cyan-signal bg-cyan-signal/5 border border-cyan-signal/20 px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>
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
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-32">
      <div className="max-w-xs mb-20">
        <p className="font-mono text-xs text-indigo tracking-widest uppercase mb-4">— 04 · Proyectos</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-snow mb-4">Trabajo seleccionado</h2>
        <p className="text-mist text-base leading-relaxed">Cada proyecto resolvió un problema real. Estos son los que más orgullo me dan.</p>
      </div>
      {projects.map((project, i) => (
        <ProjectRow key={project.title} project={project} index={i} />
      ))}
    </section>
  );
};

export default Projects;

import React from 'react';
import { Project } from '../types';

const projects: Project[] = [
  {
    image: 'https://res.cloudinary.com/djeqn9kjl/image/upload/v1761402115/e68b610f-68b7-468b-b08e-e708075e6094_x4zsaw.png',
    title: 'Batista Doleo y Asociados',
    description: 'Sitio web funcional y optimizado, con diseño atractivo y navegación intuitiva. Totalmente operativo, listo para recibir visitas y cumplir con los objetivos para los que fue creado. Ofrece una experiencia de usuario fluida y satisfactoria en todos los dispositivos.',
    tags: ['React', 'CSS', 'State Management'],
    demoUrl: 'https://www.batistaydoleo.com/',
    codeUrl: 'https://github.com/dev1lsconf/byd',
  },
  {
    image: 'https://res.cloudinary.com/djeqn9kjl/image/upload/v1761402625/Screenshot_From_2025-10-25_16-29-26_yt48lv.png',
    title: 'twtxt timeline',
    description: 'Este proyecto es una red social descentralizada y lector de feeds twtxt del lado del cliente (frontend). Permite a los usuarios ver un timeline combinado de múltiples "microblogs" en formato texto plano ( un archivo .txt).',
    tags: ['JavaScript', 'HTML', 'CSS'],
    demoUrl: 'http://dev1ls.sdf.org/timeline/',
    codeUrl: '',
  },
  {
    image: 'https://picsum.photos/seed/guessnum/600/400',
    title: 'Adivina el Número',
    description: 'Un juego interactivo y sencillo donde el usuario debe adivinar un número secreto generado por la computadora en un número limitado de intentos.',
    tags: ['JavaScript', 'Game Logic'],
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    image: 'https://picsum.photos/seed/googleclone/600/400',
    title: 'Clon de Google',
    description: 'Una réplica visual de la página de inicio del buscador de Google, enfocada en demostrar habilidades de maquetación con HTML y CSS.',
    tags: ['HTML', 'CSS', 'UI/UX'],
    demoUrl: '#',
    codeUrl: '#',
  },
];

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center mb-12">
      {title}
      <span className="h-px bg-gray-200 flex-grow ml-6"></span>
    </h2>
  );

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10">
    <div className="relative">
      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Demo</a>
        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition-colors">Código</a>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{project.title}</h3>
      <p className="text-gray-600 text-base mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span key={tag} className="text-sm font-mono text-blue-700 bg-blue-100 px-2 py-1 rounded-full">{tag}</span>
        ))}
      </div>
    </div>
  </div>
);

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 border-b border-gray-200">
      <SectionTitle title="Proyectos" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;

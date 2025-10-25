import React from 'react';
import { Skill } from '../types';

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center mb-12">
    {title}
    <span className="h-px bg-gray-200 flex-grow ml-6"></span>
  </h2>
);

const skills: Skill[] = [
  { name: 'HTML5', icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e65100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg> },
  { name: 'CSS3', icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0277bd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg> },
  { name: 'JavaScript', icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#f0db4f" stroke="#323330" strokeWidth="0"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9.5v-1.5h1.5V16zm1.5-1.5H11v-3h1.5v3zm3 1.5h-1.5V13h1.5v3z"/></svg> },
  { name: 'TypeScript', icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#3178c6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 13h-2v2h-2v-2H8v-2h4V8h2v5h2v2z"/></svg> },
  { name: 'React', icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="1.5"><circle cx="12" cy="12" r="2"/><path d="M12 2v2m0 16v2m9-11h-2M5 11H3m15.36-6.36l-1.42 1.42M5.05 18.95l-1.41 1.41m14.15 0l-1.42-1.42M6.46 6.46l-1.41-1.41"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg> },
  { name: 'Tailwind CSS', icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#38b2ac"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg> },
  { name: 'Node.js', icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#68a063"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5v-9l6 4.5-6 4.5z"/></svg> },
  { name: 'Git & GitHub', icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f1502f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M16 16l-4-4 4-4"/><path d="M8 12h4"/></svg> },
];

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => (
    <div className="bg-white border border-gray-200 p-4 rounded-lg flex flex-col items-center justify-center text-center space-y-3 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10">
      {skill.icon}
      <span className="text-gray-700 font-mono text-base">{skill.name}</span>
    </div>
);

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 border-b border-gray-200">
      <SectionTitle title="Habilidades" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
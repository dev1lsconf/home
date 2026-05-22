import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AIChatWidget from './components/AIChatWidget';

const App: React.FC = () => {
  return (
    <div className="relative bg-grid min-h-screen">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-300/5 dark:bg-blue-300/10 rounded-full blur-3xl"></div>
      </div>
      <Header />
      <main className="relative container mx-auto px-6 md:px-12 lg:px-24">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="relative text-center py-12 text-gray-500 dark:text-gray-400 text-base">
        <div className="max-w-xs mx-auto border-t border-gray-200 dark:border-gray-700/50 pt-8">
          <p className="mb-2">Diseñado y construido por</p>
          <p className="font-semibold text-gray-700 dark:text-gray-300">Eric Batista</p>
        </div>
      </footer>
      <AIChatWidget />
    </div>
  );
};

export default App;
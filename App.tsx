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
    <div className="relative">
      <Header />
      <main className="container mx-auto px-6 md:px-12 lg:px-24">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="text-center py-8 text-gray-600 text-base">
        <div>Designed & Built by Eric Batista</div>
      </footer>
      <AIChatWidget />
    </div>
  );
};

export default App;
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import AIChatWidget from './components/AIChatWidget';

const App: React.FC = () => {
  return (
    <div className="relative bg-void min-h-screen">
      <div className="fixed inset-0 pointer-events-none bg-grid opacity-60" />
      <Header />
      <main className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <footer className="relative text-center py-12 text-mist text-sm">
        <div className="max-w-xs mx-auto border-t border-steel pt-8">
          <p className="mb-2">Diseñado y construido por</p>
          <p className="font-semibold text-snow">Eric Batista</p>
          <p className="text-xs text-mist mt-2">© {new Date().getFullYear()} — Todos los derechos reservados</p>
        </div>
      </footer>
      <AIChatWidget />
    </div>
  );
};

export default App;

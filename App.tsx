import React from 'react';
import Header from './components/Header';
import ScrollyHero from './components/ScrollyHero';
import About from './components/About';
import Services from './components/Services';
import ScrollyProjects from './components/ScrollyProjects';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import AIChatWidget from './components/AIChatWidget';
import ScrollProgress from './components/ScrollProgress';
import BackgroundGrid from './components/BackgroundGrid';
import useGsapAnimations from './hooks/useGsapAnimations';
import useScrollytelling from './hooks/useScrollytelling';

const App: React.FC = () => {
  const scopeRef = useGsapAnimations();
  const scrollyScopeRef = useScrollytelling();

  return (
    <div ref={scopeRef} className="relative bg-void min-h-screen">
      <ScrollProgress />
      <BackgroundGrid />
      <Header />
      <div ref={scrollyScopeRef}>
        <ScrollyHero />
        <main className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div id="about"><About /></div>
          <div id="services"><Services /></div>
          <div id="projects"><ScrollyProjects /></div>
          <div id="process"><Process /></div>
          <div id="testimonials"><Testimonials /></div>
          <div id="contact"><Contact /></div>
        </main>
        <footer className="relative text-center py-12 text-mist text-sm" data-animate="fade-up">
          <div className="max-w-xs mx-auto border-t border-steel pt-8">
            <p className="mb-2">Diseñado y construido por</p>
            <p className="font-semibold text-snow">Eric Batista</p>
            <p className="text-xs text-mist mt-2">© {new Date().getFullYear()} — Todos los derechos reservados</p>
          </div>
        </footer>
      </div>
      <AIChatWidget />
    </div>
  );
};

export default App;

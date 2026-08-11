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

      {/* JSON-LD: WebSite + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "name": "Eric Batista — Full Stack Developer",
                "url": "https://ericbatista.vercel.app",
                "description": "Portfolio de Eric Batista, desarrollador Full Stack freelance en Barcelona. Especialista en Next.js, React, TypeScript, JavaScript, DevOps y Linux.",
                "inLanguage": "es-ES"
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://ericbatista.vercel.app/#hero" },
                  { "@type": "ListItem", "position": 2, "name": "Sobre mí", "item": "https://ericbatista.vercel.app/#about" },
                  { "@type": "ListItem", "position": 3, "name": "Servicios", "item": "https://ericbatista.vercel.app/#services" },
                  { "@type": "ListItem", "position": 4, "name": "Proyectos", "item": "https://ericbatista.vercel.app/#projects" },
                  { "@type": "ListItem", "position": 5, "name": "Contacto", "item": "https://ericbatista.vercel.app/#contact" }
                ]
              }
            ]
          })
        }}
      />

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
            <p className="font-semibold text-snow">
              <a href="https://ericbatista.vercel.app" className="hover:text-indigo transition-colors">Eric Batista</a>
            </p>
            <p className="text-xs text-mist mt-2">
              © {new Date().getFullYear()} — Full Stack Developer en Barcelona
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <a href="https://github.com/dev1lsconf" target="_blank" rel="noopener noreferrer" className="text-mist hover:text-snow text-xs transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/eric-batista-6978b0118" target="_blank" rel="noopener noreferrer" className="text-mist hover:text-snow text-xs transition-colors">LinkedIn</a>
              <a href="mailto:ericbatista@gmail.com" className="text-mist hover:text-snow text-xs transition-colors">Email</a>
            </div>
          </div>
        </footer>
      </div>
      <AIChatWidget />
    </div>
  );
};

export default App;

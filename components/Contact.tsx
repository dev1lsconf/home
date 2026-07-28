import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-32">
      <div className="text-center max-w-xl mx-auto mb-16">
        <p className="font-mono text-xs text-indigo tracking-widest uppercase mb-4">— 06 · Contacto</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-snow mb-4">¿Tienes un proyecto en mente?</h2>
        <p className="text-mist text-base leading-relaxed">Hablemos. No importa si es una idea temprana o un proyecto definido — siempre estoy abierto a una buena conversación.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-carbon border border-steel rounded-2xl p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-indigo/10 text-indigo flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-snow mb-3">Agenda una llamada</h3>
            <p className="text-mist text-sm leading-relaxed mb-8">15 minutos. Sin compromiso. Para entender tu proyecto y ver si puedo ayudarte.</p>
          </div>
          <a
            href="mailto:ericbatista@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo text-snow font-semibold rounded-lg hover:bg-indigo-deep transition-all duration-300 shadow-glow hover:shadow-glow-lg text-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Agendar llamada →
          </a>
        </div>
        <div className="bg-carbon border border-steel rounded-2xl p-8 md:p-10">
          <h3 className="font-display text-xl font-bold text-snow mb-6">O escríbeme</h3>
          <form
            action="https://formsubmit.co/ericbatista@gmail.com"
            method="POST"
            className="space-y-5"
          >
            <input type="hidden" name="_subject" value="Nuevo mensaje desde ericbatista.vercel.app" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-void border border-steel rounded-lg text-snow placeholder-mist/50 focus:border-indigo focus:ring-1 focus:ring-indigo/20 transition-all outline-none text-sm"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-void border border-steel rounded-lg text-snow placeholder-mist/50 focus:border-indigo focus:ring-1 focus:ring-indigo/20 transition-all outline-none text-sm"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-void border border-steel rounded-lg text-snow placeholder-mist/50 focus:border-indigo focus:ring-1 focus:ring-indigo/20 transition-all outline-none text-sm resize-none"
                placeholder="Cuéntame de tu proyecto..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-snow text-void font-semibold rounded-lg hover:bg-mist transition-all duration-300 text-sm"
            >
              Enviar mensaje →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

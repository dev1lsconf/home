import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 max-w-2xl mx-auto text-center">
      <h2 className="text-lg md:text-xl font-mono text-blue-600 mb-3">¿Qué sigue?</h2>
      <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Ponte en Contacto</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-12 text-lg max-w-lg mx-auto">
        Actualmente estoy buscando nuevas oportunidades y mi bandeja de entrada está siempre abierta. Ya sea que tengas una pregunta o simplemente quieras saludar, ¡haré todo lo posible por responderte!
      </p>

      <div className="bg-white dark:bg-slate-800/80 border border-gray-200/80 dark:border-slate-700/50 rounded-2xl p-8 md:p-10 shadow-sm text-left">
        <form action={`mailto:ericbatista@gmail.com`} method="POST" encType="text/plain" className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-800 dark:text-gray-200 bg-gray-50/50 dark:bg-slate-700/50 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-base"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-800 dark:text-gray-200 bg-gray-50/50 dark:bg-slate-700/50 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-base"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-800 dark:text-gray-200 bg-gray-50/50 dark:bg-slate-700/50 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-base resize-none"
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 text-lg shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5"
          >
            Enviar Mensaje →
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">o escríbeme directamente a</p>
          <a href="mailto:ericbatista@gmail.com" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors">
            ericbatista@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;

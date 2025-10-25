import React from 'react';
  
const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-mono text-blue-600 mb-2">¿Qué sigue?</h2>
        <h3 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Ponte en Contacto</h3>
        <p className="text-gray-600 mb-10 text-lg">
            Actualmente estoy buscando nuevas oportunidades y mi bandeja de entrada está siempre abierta. Ya sea que tengas una pregunta o simplemente quieras saludar, ¡haré todo lo posible por responderte!
        </p>
        <a href="mailto:eric.batista.dev@email.com" className="inline-block px-8 py-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-300 text-xl">
            ¡Saluda!
        </a>
    </section>
  );
};

export default Contact;
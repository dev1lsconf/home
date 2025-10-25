import React, { useState, useRef, useEffect } from 'react';
import type { Message } from '../types';
import { getAiChatResponse } from '../services/geminiService';

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setMessages([{ id: 'initial', text: '¡Hola! Soy el asistente de IA de Eric. ¿En qué puedo ayudarte?', sender: 'ai' }]);
        setIsLoading(false);
      }, 500);
    }
  }, [isOpen]);
  
  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponseText = await getAiChatResponse(messages, input);
      const aiMessage: Message = { id: (Date.now() + 1).toString(), text: aiResponseText, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = { id: (Date.now() + 1).toString(), text: 'Lo siento, no puedo responder en este momento.', sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 z-50"
        aria-label="Toggle AI Chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9.45 12.75L8.25 15H7l2.5-4.5h1L13 15h-1.25l-1.2-2.25h-1.1zM17.5 15h-1.25l-2.5-4.5h1l1.75 3.15L17.15 9H18l-2.5 4.5h2V15z"/></svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-white border border-gray-200 rounded-lg shadow-2xl flex flex-col z-50">
          <header className="bg-gray-100 p-4 text-gray-800 font-bold flex justify-between items-center rounded-t-lg border-b border-gray-200 text-lg">
            Asistente IA de Eric
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800">&times;</button>
          </header>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-base ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-gray-200 text-gray-800">
                      <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                      </div>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex items-center bg-gray-100 rounded-lg">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregúntame algo..."
                className="w-full bg-transparent p-3 text-gray-800 focus:outline-none text-base"
                disabled={isLoading}
              />
              <button type="submit" className="p-3 text-blue-600 hover:text-blue-500 disabled:text-gray-400" disabled={isLoading}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
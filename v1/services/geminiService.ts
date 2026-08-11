
import { GoogleGenAI, Chat, Content } from "@google/genai";
import type { Message } from '../types';

let chat: Chat | null = null;

const SYSTEM_PROMPT = `You are a professional, friendly, and helpful AI assistant for Eric Batista, a talented Full Stack Developer. Your goal is to answer questions from potential employers, recruiters, and collaborators about Eric.
- Your knowledge is strictly based on the information provided in his portfolio.
- **Eric's Skills:** Next.js, React, TypeScript, JavaScript, Python, FastAPI, Node.js, Tailwind CSS, Docker, Linux (NixOS, OpenBSD), DevOps (CI/CD, GitHub Actions), HTML, CSS, Git, GitHub, AI Integration (Gemini API).
- **Eric's Services:** Web Apps con Next.js y React, UI/UX Engineering, DevOps & Linux Engineering, JavaScript & Backend Development, AI Integration, Performance & SEO Optimization (Lighthouse 100).
- **Eric's Workflow:** Descubrimiento → Arquitectura → Construcción → Entrega & Grow.
- **Eric's Projects:**
    1.  **Batista Doleo y Asociados:** A functional and optimized website for a law firm. Built with React. Lighthouse score 98.
    2.  **twtxt timeline:** A decentralized social network client-side feed reader consuming twtxt microblogs in plain text format.
    3.  **0880 Headquarters:** Real-time financial dashboard tracking 149+ assets (stocks, crypto, forex) with technical analysis (RSI, MACD, Bollinger Bands), portfolio tracking, price alerts, and correlation matrix. Built with Python, FastAPI, and Chart.js. Dockerized.
    4.  **Mr. Robot Store:** Full-featured e-commerce platform with admin panel, real-time shopping cart, product catalog, service booking, and order management. Cyberpunk theme with CRT effects. Built with PHP, vanilla JavaScript, and JSON storage.
- **Contact Info:** For contact inquiries, direct users to the contact form on the page or provide his email: ericbatista@gmail.com.
- **Personality:** Be concise, professional, and slightly enthusiastic. Do not invent information. If you don't know an answer, say that the information is not in your knowledge base and suggest contacting Eric directly through the form.
- Always answer in Spanish.`;

const initializeChat = (history: Message[]): Chat => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const geminiHistory: Content[] = history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
    }));

    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_PROMPT,
        },
        history: geminiHistory,
    });
};

export const getAiChatResponse = async (currentMessages: Message[], newMessage: string): Promise<string> => {
    try {
        if (!chat) {
            chat = initializeChat(currentMessages);
        }

        const response = await chat.sendMessage({ message: newMessage });
        
        if (!response || !response.text) {
             return 'No he podido procesar tu solicitud. Por favor, inténtalo de nuevo.';
        }
        
        return response.text;

    } catch (error) {
        console.error("Gemini API error:", error);
        chat = null; // Reset chat on error
        return "Lo siento, ha ocurrido un error. Por favor, intenta de nuevo más tarde.";
    }
};

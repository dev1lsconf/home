
import { GoogleGenAI, Chat, Content } from "@google/genai";
import type { Message } from '../types';

let chat: Chat | null = null;

const SYSTEM_PROMPT = `You are a professional, friendly, and helpful AI assistant for Eric Batista, a talented Full Stack Developer. Your goal is to answer questions from potential employers, recruiters, and collaborators about Eric.
- Your knowledge is strictly based on the information provided in his portfolio.
- **Eric's Skills:** HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS, Node.js, Git, GitHub.
- **Eric's Projects:**
    1.  **Todo App:** A task management application built with React, demonstrating state management.
    2.  **Password Generator:** A utility to create secure, random passwords.
    3.  **Guess the Number Game:** An interactive number-guessing game.
    4.  **Google Clone:** A project showcasing strong HTML and CSS skills by replicating the Google search page.
- **Contact Info:** For contact inquiries, direct users to the contact form on the page or provide his email: eric.batista.dev@email.com.
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

/**
 * content.ts — single source of truth for all portfolio content.
 * Edit this file to update copy anywhere on the site.
 */

export const content = {
  name: "Eric Batista",
  role: "Full Stack Developer freelance & Next.js Specialist",
  tagline: "Diseño y código donde cada píxel importa",
  location: "Barcelona",
  introRole: "Developer · Web · AI · Infrastructure",
  bio: "Especialista en transformar ideas complejas en productos web rápidos, accesibles y visualmente impecables. Trabajo en la intersección entre el desarrollo web moderno, la infraestructura de servidores y la inteligencia artificial — desde el primer byte en el servidor hasta el último píxel en la pantalla.",
  services: [
    {
      id: "web",
      title: "WEB DEVELOPMENT",
      desc: "Desarrollo de sitios web y aplicaciones modernas con arquitecturas SSG, SSR e ISR.",
    },
    {
      id: "fullstack",
      title: "FULL STACK DEVELOPMENT",
      desc: "Aplicaciones completas desde frontend hasta backend.",
    },
    {
      id: "ai",
      title: "AI INTEGRATION",
      desc: "Integración de inteligencia artificial (Gemini, OpenAI) y automatización.",
    },
    {
      id: "infra",
      title: "SERVER & INFRASTRUCTURE",
      desc: "Servidores, Linux, Docker, Nginx y despliegues.",
    },
    {
      id: "net",
      title: "NETWORKING",
      desc: "Infraestructura de red, APIs, IPv6 y servicios distribuidos.",
    },
  ],
  skills: [
    { cat: "FRONTEND", items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"] },
    { cat: "BACKEND", items: ["Node.js", "Python", "FastAPI", "PHP"] },
    { cat: "DATABASE", items: ["SQL", "NoSQL", "JSON Storage"] },
    { cat: "AI", items: ["Gemini", "OpenAI", "APIs"] },
    { cat: "DEVOPS", items: ["Docker", "CI/CD", "Nginx", "Git"] },
    { cat: "LINUX", items: ["NixOS", "OpenBSD", "Automation"] },
    { cat: "NETWORKING", items: ["IPv6", "DNS", "TCP/IP"] },
    { cat: "CLOUD", items: ["Serverless", "Edge", "Vercel"] },
    { cat: "SECURITY", items: ["HTTPS", "Hardening", "Monitoring"] },
  ],
  projects: [
    {
      id: "doleo",
      name: "Batista Doleo y Asociados",
      desc: "Sitio web legal optimizado — Lighthouse 98, 99.9% uptime.",
      tech: ["React", "CSS"],
      link: null,
      repo: null,
    },
    {
      id: "twtxt",
      name: "twtxt timeline",
      desc: "Red social descentralizada serverless basada en JavaScript vanilla.",
      tech: ["JavaScript", "Serverless"],
      link: null,
      repo: null,
    },
    {
      id: "hq",
      name: "0880 Headquarters",
      desc: "Dashboard financiero en tiempo real para más de 149 activos.",
      tech: ["Python", "FastAPI", "Docker"],
      link: null,
      repo: null,
    },
    {
      id: "robot",
      name: "Mr. Robot Store",
      desc: "E-commerce con estética cyberpunk, backend en PHP y almacenamiento JSON.",
      tech: ["PHP", "JSON Storage"],
      link: null,
      repo: null,
    },
  ],
  method: [
    { id: "01", title: "Descubrimiento", desc: "Análisis de requisitos y planificación." },
    { id: "02", title: "Arquitectura", desc: "Definición de stack y diseño de sistemas escalables." },
    { id: "03", title: "Construcción", desc: "Desarrollo ágil con entregas cada 1–2 semanas." },
    { id: "04", title: "Entrega & Grow", desc: "Despliegue automatizado y optimización continua." },
  ],
  contact: {
    email: "ericbatista@gmail.com",
    site: "https://ericbatista.vercel.app/",
    github: "https://github.com/dev1lsconf",
    linkedin: "https://www.linkedin.com/in/eric-batista-6978b0118",
  },
  footer: "Construyendo experiencias digitales, del código a la infraestructura.",
  year: 2026,
} as const;

export type Project = (typeof content.projects)[number];
export type Service = (typeof content.services)[number];

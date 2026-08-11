import type { ReactElement } from 'react';

export interface Project {
  image: string;
  title: string;
  description: string;
  tags: string[];
  demoUrl: string;
  codeUrl: string;
  metrics?: { label: string; value: string }[];
}

export interface Service {
  icon: ReactElement;
  title: string;
  subtitle: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

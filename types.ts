import type { ReactElement } from 'react';

export interface Project {
  image: string;
  title: string;
  description: string;
  tags: string[];
  demoUrl: string;
  codeUrl: string;
}

export interface Skill {
  name: string;
  // FIX: Replaced JSX.Element with ReactElement and imported it to resolve 'Cannot find namespace JSX' error.
  icon: ReactElement;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

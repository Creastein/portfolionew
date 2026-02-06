import { Cpu, Code, Layers } from 'lucide-react';
import { Service } from '../types/services';

export const servicesData: Service[] = [
  {
    id: 'business-analysis',
    title: 'Business & System Analysis',
    description: 'Analyze business processes, identify problems, and translate requirements into clear system and feature definitions.',
    tags: ['Requirements Analysis', 'System Design', 'Process Mapping'],
    image: '/images/services1.png',
    icon: Cpu,
  },
  {
    id: 'frontend-development',
    title: 'Frontend Web Development',
    description: 'Build clean, responsive, and user-friendly web interfaces using modern frontend technologies like React and Next.js.',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
    image: '/images/services2.png',
    icon: Code,
  },
  {
    id: 'ui-implementation',
    title: 'UI Implementation from Requirements',
    description: 'Turn business and user requirements into practical, intuitive, and functional user interfaces that align with real business goals.',
    tags: ['UI/UX', 'Figma to Code', 'User-Centered Design'],
    image: '/images/services3.png',
    icon: Layers,
  },
];

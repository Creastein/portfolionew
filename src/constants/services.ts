import { Code, Cpu, Globe } from 'lucide-react';
import { Service } from '@/types/domain/services';

export const servicesData: Service[] = [
  {
    id: 'fullstack-development',
    title: 'Full Stack Web Development',
    description: 'Build complete web applications from frontend to backend using Next.js, React.js, and Supabase with modern deployment on Vercel.',
    tags: ['Next.js', 'React.js', 'Supabase', 'Vercel'],
    image: '/images/services1.png',
    icon: Code,
  },
  {
    id: 'ai-powered-development',
    title: 'AI-Powered Development',
    description: 'Leverage AI tools across the entire development lifecycle — from planning and UI generation to coding and deployment — for faster, smarter results.',
    tags: ['Claude', 'Cursor', 'Bolt', 'v0', 'Antigravity'],
    image: '/images/services2.png',
    icon: Cpu,
  },
  {
    id: 'hospitality-web',
    title: 'Hospitality & Villa Websites',
    description: 'Specialized web development for hotels, villas, and resorts in Indonesia. Beautiful, conversion-optimized websites built for the hospitality industry.',
    tags: ['WelliBuilds', 'Hospitality', 'Villa/Resort', 'SEO'],
    image: '/images/services3.png',
    icon: Globe,
  },
];

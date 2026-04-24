import { Code, Cloud, Cpu } from 'lucide-react';

export interface Skill {
    category: string;
    icon: JSX.Element;
    items: string[];
}

export const skills: Skill[] = [
    {
        category: 'Frontend',
        icon: <Code size={24} />,
        items: ['Next.js', 'React.js', 'Tailwind CSS']
    },
    {
        category: 'Backend & DB',
        icon: <Cloud size={24} />,
        items: ['Supabase (Auth, Storage, Edge Functions)']
    },
    {
        category: 'Deploy',
        icon: <Cloud size={24} />,
        items: ['Vercel', 'Antigravity']
    },
    {
        category: 'AI Workflow',
        icon: <Cpu size={24} />,
        items: ['Claude', 'Stitch', 'Bolt', 'v0', 'Google AI Studio', 'Gemini Canvas', 'Cursor', 'Antigravity']
    }
];

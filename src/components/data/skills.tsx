import { Code, Briefcase, Database, Palette } from 'lucide-react';

export interface Skill {
    category: string;
    icon: JSX.Element;
    items: string[];
}

export const skills: Skill[] = [
    {
        category: 'Frontend Development',
        icon: <Code size={ 24} />,
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
  },
{
    category: 'Business & System Analysis',
        icon: <Briefcase size={ 24 } />,
    items: ['Requirements Analysis', 'Process Mapping', 'System Design', 'User Stories', 'Wireframing']
},
{
    category: 'Tools & Technologies',
        icon: <Database size={ 24 } />,
    items: ['Git', 'Figma', 'VS Code', 'Postman', 'Jira']
},
{
    category: 'UI/UX Design',
        icon: <Palette size={ 24 } />,
    items: ['Responsive Design', 'User Research', 'Prototyping', 'Design Systems', 'Accessibility']
}
];

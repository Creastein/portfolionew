import React from 'react';
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
    SiGit, SiFigma, SiPostman, SiJira,
    SiHtml5, SiCss3, SiJavascript, SiNodedotjs, SiMongodb
} from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';
import {
    FaClipboardList, FaSitemap, FaProjectDiagram, FaUserFriends, FaPencilRuler,
    FaMobileAlt, FaSearch, FaLayerGroup, FaUniversalAccess
} from 'react-icons/fa';
import { Code, Briefcase, Database, Palette } from 'lucide-react';

export interface SkillItem {
    name: string;
    icon: React.ElementType;
    color: string;
}

export interface SkillCategory {
    category: string;
    icon: React.ElementType; // Category icon
    items: SkillItem[];
}

export const skillsWithLogos: SkillCategory[] = [
    {
        category: 'Frontend Development',
        icon: Code,
        items: [
            { name: 'React', icon: SiReact, color: '#61DAFB' },
            { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
            { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
            { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
            { name: 'Framer Motion', icon: SiFramer, color: '#E10098' }, // Pinkish
            { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
            { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
            { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        ]
    },
    {
        category: 'Business & System Analysis',
        icon: Briefcase,
        items: [
            { name: 'Requirements Analysis', icon: FaClipboardList, color: '#FF9F1C' }, // Orange
            { name: 'Process Mapping', icon: FaSitemap, color: '#2EC4B6' }, // Teal
            { name: 'System Design', icon: FaProjectDiagram, color: '#E71D36' }, // Red
            { name: 'User Stories', icon: FaUserFriends, color: '#3A86FF' }, // Blue
            { name: 'Wireframing', icon: FaPencilRuler, color: '#8338EC' }, // Purple
        ]
    },
    {
        category: 'Tools & Technologies',
        icon: Database,
        items: [
            { name: 'Git', icon: SiGit, color: '#F05032' },
            { name: 'Figma', icon: SiFigma, color: '#F24E1E' }, // Figma color
            { name: 'VS Code', icon: TbBrandVscode, color: '#007ACC' },
            { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
            { name: 'Jira', icon: SiJira, color: '#0052CC' },
        ]
    },
    {
        category: 'UI/UX Design',
        icon: Palette,
        items: [
            { name: 'Responsive Design', icon: FaMobileAlt, color: '#FF006E' },
            { name: 'User Research', icon: FaSearch, color: '#FB5607' },
            { name: 'Prototyping', icon: FaLayerGroup, color: '#FFBE0B' },
            { name: 'Design Systems', icon: FaPencilRuler, color: '#8338EC' }, // Reusing purple
            { name: 'Accessibility', icon: FaUniversalAccess, color: '#3A86FF' },
        ]
    }
];

import React from 'react';
import {
    SiReact, SiNextdotjs, SiTailwindcss,
    SiSupabase, SiVercel, SiClaude, SiGooglegemini, SiStackblitz
} from 'react-icons/si';
import { Code, Cloud, Cpu } from 'lucide-react';

export interface SkillItem {
    name: string;
    icon: React.ElementType;
    color: string;
}

export interface SkillCategory {
    category: string;
    icon: React.ElementType;
    items: SkillItem[];
}

// --- Custom icons for tools without official react-icons ---

// Cursor IDE logo
const CursorIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M5.654 2.091L21.47 10.65a.889.889 0 01-.009 1.587l-5.34 2.71-2.972 5.401a.889.889 0 01-1.584-.005L5.64 3.672a.889.889 0 01.013-1.581z" />
        <path d="M13.5 13.5l4.5 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
);

// v0 by Vercel
const V0Icon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.6 4.8h3.12L12 16.32 17.28 4.8h3.12L12 22.08z" />
    </svg>
);

// Google AI Studio (using Google star/sparkle motif)
const GoogleAIStudioIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c1.93 0 3.68.69 5.06 1.83L12 10.89 6.94 5.83A7.95 7.95 0 0112 4zm-8 8c0-1.93.69-3.68 1.83-5.06L10.89 12l-5.06 5.06A7.95 7.95 0 014 12zm8 8a7.95 7.95 0 01-5.06-1.83L12 13.11l5.06 5.06A7.95 7.95 0 0112 20zm6.17-2.94L13.11 12l5.06-5.06A7.95 7.95 0 0120 12a7.95 7.95 0 01-1.83 5.06z" />
    </svg>
);

// Stitch (thread/stitch motif)
const StitchIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 4l16 16" />
        <path d="M20 4L4 20" />
        <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
        <circle cx="4" cy="4" r="2" fill="currentColor" stroke="none" />
        <circle cx="20" cy="4" r="2" fill="currentColor" stroke="none" />
        <circle cx="4" cy="20" r="2" fill="currentColor" stroke="none" />
        <circle cx="20" cy="20" r="2" fill="currentColor" stroke="none" />
    </svg>
);

// Antigravity (official logo)
const AntigravityIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <img src="/icons/antigravity.png" alt="Antigravity" width={size} height={size} className={className} style={{ objectFit: 'contain' }} />
);

export const skillsWithLogos: SkillCategory[] = [
    {
        category: 'Frontend',
        icon: Code,
        items: [
            { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
            { name: 'React.js', icon: SiReact, color: '#61DAFB' },
            { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        ]
    },
    {
        category: 'Backend & DB',
        icon: Cloud,
        items: [
            { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
        ]
    },
    {
        category: 'Deploy',
        icon: Cloud,
        items: [
            { name: 'Vercel', icon: SiVercel, color: '#FFFFFF' },
            { name: 'Antigravity', icon: AntigravityIcon, color: '#A78BFA' },
        ]
    },
    {
        category: 'AI Workflow',
        icon: Cpu,
        items: [
            { name: 'Claude', icon: SiClaude, color: '#D4A574' },
            { name: 'Stitch', icon: StitchIcon, color: '#FF6B6B' },
            { name: 'Bolt', icon: SiStackblitz, color: '#1389FD' },
            { name: 'v0', icon: V0Icon, color: '#FFFFFF' },
            { name: 'Google AI Studio', icon: GoogleAIStudioIcon, color: '#4285F4' },
            { name: 'Gemini Canvas', icon: SiGooglegemini, color: '#8E75B2' },
            { name: 'Cursor', icon: CursorIcon, color: '#00D4FF' },
            { name: 'Antigravity', icon: AntigravityIcon, color: '#A78BFA' },
        ]
    }
];

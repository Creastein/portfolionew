import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/skills.tsx';

const SkillCard: React.FC<{ category: string, icon: React.ReactNode, items: string[] }> = ({ category, icon, items }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group relative overflow-hidden rounded-xl bg-surface border border-white/5 p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(19,91,236,0.15)]"
    >
        <div className="flex items-center gap-3 mb-4">
            <div className="text-primary">{icon}</div>
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors font-display">{category}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
            {items.map(item => (
                <span key={item} className="px-3 py-1.5 rounded-full bg-white/5 text-sm text-gray-300 border border-white/10 hover:border-primary/50 hover:text-primary transition-colors">
                    {item}
                </span>
            ))}
        </div>
    </motion.div>
);

const SkillsSection: React.FC = () => {
    return (
        <section id="skills" className="relative z-10 container mx-auto max-w-[1400px] px-6 sm:px-12 py-24 md:py-32">
            <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-6">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl font-medium tracking-tight font-display"
                >
                    Skills & Expertise
                </motion.h2>
                <span className="text-sm text-secondary">(04)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                    <SkillCard key={index} category={skill.category} icon={skill.icon} items={skill.items} />
                ))}
            </div>
        </section>
    );
};

export default SkillsSection;

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Layers } from 'lucide-react';

const ServiceCard: React.FC<{ title: string, description: string, tags: string[], image: string, icon: React.ReactNode, index?: number }> = ({ title, description, tags, image, icon, index = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
        className="group relative overflow-hidden rounded-xl bg-surface border border-white/5 p-1 transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(19,91,236,0.15)]"
    >
        <div className="flex flex-col md:flex-row h-full rounded-lg overflow-hidden bg-[#151b26]">
            <div className="w-full md:w-2/5 aspect-video md:aspect-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10"></div>
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${image}')` }}></div>
            </div>
            <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                <div className="flex flex-col gap-4">
                    <div className="text-primary mb-2">{icon}</div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors font-display">{title}</h3>
                    <p className="text-secondary leading-relaxed">{description}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-gray-300 border border-white/10">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
);

const ServicesSection: React.FC = () => {
    return (
        <section id="services" className="relative z-10 bg-[#080a0f] py-24 md:py-32 border-t border-white/5">
            <div className="container mx-auto max-w-[1400px] px-6 sm:px-12">
                <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-6">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl font-medium tracking-tight font-display"
                    >
                        Services
                    </motion.h2>
                    <span className="text-sm text-secondary">(03)</span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <ServiceCard
                        index={0}
                        title="Business & System Analysis"
                        description="Analyze business processes, identify problems, and translate requirements into clear system and feature definitions."
                        tags={['Requirements Analysis', 'System Design', 'Process Mapping']}
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuAfIwE5zDaZ_A2JElXSGxeB49SjU8X9lcNMLnrdumWj5Q2Ib76NoKMniUfhyBnJpB75ecLogu6bFcXeOux87umn4t75RSKwUBc_ekgYMH9pHfVeCtv0VGE5agC5WE-kOBI_A_rUlOBiujIuFB7ZHulel7qdPfN4JtuIdUXdcAqg5hHOcwktMjRmrGUSfjTs9INqbi9IXUnX4JDhsWyuSweG6L2ErD1-4RGgH-4RMXGtywRo8r_0vSxUQi03vq-HIA4JucZvjILYXKsr"
                        icon={<Cpu size={32} />}
                    />
                    <ServiceCard
                        index={1}
                        title="Frontend Web Development"
                        description="Build clean, responsive, and user-friendly web interfaces using modern frontend technologies like React and Next.js."
                        tags={['React', 'Next.js', 'Tailwind CSS']}
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuBo1UfCeH9dDV19WVjhOXzWl6hzwnVYbxEZUhtqeOSxK97L6AdrT5-AXem6M8CxOQ-CRLraaNNSlUa0d-vyYIebqBCrmGStS2wXYbj0fO9_llaxX9KVCXcdJMI63BF29NQwq1iVwiVz6joU2XPyZeLfGznLSuQrNJwEM_xxIYaF1GWG375dISx0mA5hKGSX1Ak9fTACHt0iVHTNhU4PzEs-Wj_XoV54M7LoQoXLaXcCmxavdhViei8SYVZOMZoEqOe4DuX-JRFWPhvC"
                        icon={<Code size={32} />}
                    />
                    <ServiceCard
                        index={2}
                        title="UI Implementation from Requirements"
                        description="Turn business and user requirements into practical, intuitive, and functional user interfaces that align with real business goals."
                        tags={['UI/UX', 'Figma to Code', 'User-Centered Design']}
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuCUNntdGkgLp32hXogvIE9abRmP6voB_2jhtKQxRyEA58BAMHDDYltErYJulDQ4L5Cl2NQxvN1QSk8vU-izaDIzJXIw-u_lKULGHTP3jiGf8ArLvyey7sbfHregxwiTt2A8R3kbxfG1A4XIHqfP4wO2zjv2XZapuGnZUJmZ4jIGoTDOBwM1s8kARB1j5CmRvuL1B-i1f8xYtYLJSCYuXbPY7sA2K0fMhuYDjclUvWL_JUtJguMjaTdd6JcgP6e4twLndXifCQE_GeK4"
                        icon={<Layers size={32} />}
                    />
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;

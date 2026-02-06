import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projects, Project } from '../data/projects';

interface ProjectCardProps {
    project: Project;
    index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const navigate = useNavigate();
    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`group relative w-full md:w-[90%] ${index % 2 === 0 ? 'self-start' : 'self-end'}`}
        >
            <div
                onClick={() => navigate(`/case-study/${project.id}`)}
                className="cursor-pointer block relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg border border-white/5"
            >
                <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <motion.div
                    className="absolute w-full h-[120%] -top-[10%] left-0 bg-cover bg-center will-change-transform"
                    style={{ backgroundImage: `url('${project.image}')`, y }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="h-24 w-24 bg-primary/90 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest hover:scale-110 transition-transform">
                        View Case
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-between items-start">
                <div>
                    <h3 className="text-3xl md:text-5xl font-bold mb-2 group-hover:text-primary transition-colors font-display">{project.title}</h3>
                    <p className="text-secondary text-lg">{project.category} • {project.year}</p>
                </div>
                <button className="hidden md:block p-3 rounded-full border border-white/20 hover:border-primary hover:text-primary transition-colors">
                    <ArrowUpRight className="w-6 h-6" />
                </button>
            </div>
        </motion.article>
    );
};

const WorkSection: React.FC = () => {
    return (
        <section id="work" className="relative z-10 container mx-auto max-w-[1400px] px-6 sm:px-12 py-24 md:py-32">
            <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-6">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl font-medium tracking-tight font-display"
                >
                    Selected Works
                </motion.h2>
                <span className="text-sm text-secondary">({projects.length.toString().padStart(2, '0')})</span>
            </div>

            <div className="flex flex-col gap-24 md:gap-40">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};

export default WorkSection;

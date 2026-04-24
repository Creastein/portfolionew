import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { projects } from '@/components/data/projects';
import { useGSAP } from '@/hooks/useGSAP';
import { trackProjectClick, trackCTAClick } from '@/hooks/useAnalytics';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const WorkSection: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [activeProject, setActiveProject] = useState(0);
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    // Filter featured "Top Pick" projects
    const topPickProjects = projects.filter(p => p.featured);

    // GSAP Scroll-Based Project Switching
    const containerRef = useGSAP<HTMLElement>(() => {
        // Marquee animation for header
        gsap.fromTo('.work-marquee-track',
            { xPercent: 0 },
            {
                xPercent: -50,
                duration: 20,
                ease: "none",
                repeat: -1
            }
        );

        // Wait for scroll container to be available
        if (!scrollContainerRef.current) return;

        // Create scroll trigger for each project section
        topPickProjects.forEach((project, index) => {
            ScrollTrigger.create({
                trigger: `.project-item-${index}`,
                scroller: scrollContainerRef.current, // Monitor the right panel scroll
                start: 'top center',
                end: 'bottom center',
                onEnter: () => {
                    setActiveProject(index);
                },
                onEnterBack: () => {
                    setActiveProject(index);
                },
            });
        });
    }, [topPickProjects]);

    return (
        <section ref={containerRef} id="work" className="relative z-40 bg-background">
            {/* Marquee Header */}
            <div className="w-full border-y border-white/10 py-6 overflow-hidden">
                <div className="work-marquee-container flex whitespace-nowrap">
                    <div className="work-marquee-track flex gap-12 items-center pr-12 will-change-transform">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex items-center gap-6 group select-none">
                                <span className="text-base md:text-xl text-secondary font-mono self-start mt-3 md:mt-6">({projects.length.toString().padStart(2, '0')})</span>
                                    <span
                                        className="leading-none transition-colors duration-300"
                                        style={{
                                            color: '#EEEEEE',
                                            fontFamily: '"Mohave", sans-serif',
                                            fontSize: 'clamp(60px, 15vw, 140px)',
                                            letterSpacing: '-6px',
                                            fontWeight: 600
                                        }}
                                    >
                                        {t('work.title')}
                                    </span>
                                <div className="flex flex-col items-start leading-none pointer-events-none translate-y-2 md:translate-y-4">
                                    <span className="text-sm font-bold text-primary tracking-widest uppercase mb-2 font-sans"></span>
                                    <span
                                        className="text-xl md:text-3xl font-bold text-primary"
                                        style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
                                    >
                                        {t('work.topPick')}
                                    </span>
                                </div>
                            </div >
                        ))}
                    </div >
                </div >
            </div >

            {/* Split Screen Layout */}
            < div className="flex flex-col lg:grid lg:grid-cols-2 min-h-screen lg:h-screen lg:overflow-hidden" >
                {/* Left Panel - Project Details (Fixed) */}
                < div className="relative bg-background lg:border-r border-white/5 lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" >
                    <div className="lg:h-full flex flex-col justify-between p-6 md:p-8 lg:p-12 xl:p-16">
                        {/* Header */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs md:text-sm uppercase tracking-widest text-secondary font-medium" style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}>{t('work.topPickProjects')}</h3>
                                <button
                                    onClick={() => {
                                        trackCTAClick('all_projects', 'work_section');
                                        navigate('/projects');
                                    }}
                                    className="flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 text-xs md:text-sm font-medium"
                                >
                                    {t('work.allProjects')} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Project Names List */}
                            <div className="space-y-3">
                                {topPickProjects.map((project, index) => (
                                    <div
                                        key={project.id}
                                        onClick={() => {
                                            trackProjectClick(project.title, project.id);
                                            setActiveProject(index);
                                            // Scroll right panel to the corresponding project
                                            const target = scrollContainerRef.current?.querySelector(`.project-item-${index}`);
                                            if (target) {
                                                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }
                                        }}
                                        className={`text-lg md:text-xl lg:text-2xl transition-all duration-300 cursor-pointer ${activeProject === index
                                            ? 'text-white opacity-100 translate-x-2'
                                            : 'text-white/30 opacity-50 hover:text-white/60 hover:opacity-75'
                                            }`}
                                        style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
                                    >
                                        {project.title}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Active Project Details */}
                        <div className="space-y-4 md:space-y-6 lg:space-y-8 border-t border-white/10 pt-4 md:pt-6 lg:pt-8 mb-6 lg:mb-0">
                            <div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4" style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}>
                                    {topPickProjects[activeProject]?.title}
                                </h2>
                                <p className="text-sm md:text-base lg:text-lg text-secondary leading-relaxed" style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}>
                                    {topPickProjects[activeProject]?.description}
                                </p>
                            </div>

                            {/* Meta Info */}
                            <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-8">
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-secondary mb-1 md:mb-2" style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}>{t('work.year')}</div>
                                    <div className="text-base md:text-lg lg:text-xl font-medium" style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}>{topPickProjects[activeProject]?.year}</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-secondary mb-1 md:mb-2" style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}>{t('work.timeline')}</div>
                                    <div className="text-base md:text-lg lg:text-xl font-medium" style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}>{topPickProjects[activeProject]?.timeline}</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-secondary mb-1 md:mb-2" style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}>{t('work.servicesLabel')}</div>
                                    <div className="flex flex-wrap gap-2">
                                        {topPickProjects[activeProject]?.services?.map((service, i) => (
                                            <span key={i} className="text-xs px-3 py-1 rounded-full border border-white/20 text-white">
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                {/* Right Panel - Full Screen Project Mockups (Scroll Snap) */}
                < div
                    ref={scrollContainerRef}
                    className="relative bg-surface h-screen overflow-y-scroll snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {
                        topPickProjects.map((project, index) => (
                            <a
                                key={project.id}
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`project-item-${index} h-screen w-full snap-start snap-always relative block group`}
                                onClick={() => trackProjectClick(project.title, project.id)}
                            >
                                {/* Full Screen Project Image - Optimized with lazy loading */}
                                <img
                                    src={project.image}
                                    alt={`${project.title} - Project Preview`}
                                    className="absolute inset-0 w-full h-full object-contain bg-[#0a0a0a]"
                                    loading="lazy"
                                    decoding="async"
                                    width={1200}
                                    height={800}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        const parent = e.currentTarget.parentElement;
                                        if (parent) {
                                            parent.style.background = 'linear-gradient(135deg, rgba(19, 91, 236, 0.1) 0%, rgba(19, 91, 236, 0.05) 100%)';
                                        }
                                    }}
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                                    <div className="flex items-center gap-2 text-white text-lg font-medium px-6 py-3 border border-white/40 rounded-full backdrop-blur-sm">
                                        {t('work.viewProject')} <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>

                                {/* Floating Project Number */}
                                <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                                    {(index + 1).toString().padStart(2, '0')}
                                </div>
                            </a>
                        ))
                    }
                </div >
            </div >
        </section >
    );
};

export default WorkSection;

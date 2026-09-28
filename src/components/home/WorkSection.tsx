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

    // Filter featured "Top Pick" projects (memoized to prevent ScrollTrigger churn)
    const topPickProjects = React.useMemo(() => projects.filter(p => p.featured), []);

    // GSAP Scroll-Based Project Switching
    const containerRef = useGSAP<HTMLElement>(() => {
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
        <section
            ref={containerRef}
            id="work"
            className="relative z-40 w-full overflow-hidden bg-[#050505] text-white"
            style={{
                background: `
                    radial-gradient(ellipse 70% 30% at 50% 0%, rgba(19,91,236,0.05) 0%, transparent 60%),
                    #050505
                `,
            }}
        >
            {/* Top Hairline Divider */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

            {/* --- SECTION HEADER (CENTERED - Matching About & Services) --- */}
            <div className="pt-24 pb-14 sm:pt-28 sm:pb-16 px-6 sm:px-10 border-b border-white/[0.06]">
                <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                    <div className="flex items-center justify-center gap-2.5 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-500 uppercase font-medium">
                            {t('work.header.label', { defaultValue: 'Hasil Karya' })}
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-[2.65rem] font-bold text-white tracking-tight leading-[1.12] font-['Space_Grotesk'] text-center">
                        {t('work.header.title', { defaultValue: 'Karya Nyata untuk Properti & Villa Mewah.' })}
                    </h2>

                    <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed mt-5 max-w-2xl text-center text-pretty">
                        {t('work.header.subtitle', { defaultValue: 'Koleksi website kustom yang kami bangun khusus untuk mengubah pengunjung menjadi pemesanan langsung tanpa potongan komisi perantara.' })}
                    </p>
                </div>
            </div>

            {/* Split Screen Layout */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:h-screen lg:overflow-hidden">
                {/* Left Panel - Project Details (Fixed & Streamlined) */}
                <div className="relative bg-[#070707] lg:border-r border-white/[0.06] lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="lg:h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12">
                        {/* Header & Project Selector */}
                        <div className="space-y-5 lg:space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-mono font-medium">
                                        {t('work.topPickProjects', { defaultValue: 'Portofolio Unggulan' })}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => {
                                        trackCTAClick('all_projects', 'work_section');
                                        navigate('/projects');
                                    }}
                                    className="flex items-center gap-1.5 text-primary hover:text-blue-400 hover:gap-2 transition-all duration-300 text-xs font-medium font-mono"
                                >
                                    {t('work.allProjects', { defaultValue: 'Lihat Semua Proyek' })} <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {/* Project Names List */}
                            <div className="space-y-1.5 sm:space-y-2">
                                {topPickProjects.map((project, index) => {
                                    const isSelected = activeProject === index;
                                    return (
                                        <div
                                            key={project.id}
                                            onClick={() => {
                                                trackProjectClick(project.title, project.id);
                                                setActiveProject(index);
                                                const target = scrollContainerRef.current?.querySelector(`.project-item-${index}`);
                                                if (target) {
                                                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }
                                            }}
                                            className={`text-base sm:text-lg lg:text-xl transition-all duration-300 cursor-pointer flex items-center gap-3 font-['Space_Grotesk'] font-semibold py-1 px-2.5 rounded-lg ${
                                                isSelected
                                                    ? 'text-white bg-white/[0.04] translate-x-1.5 opacity-100'
                                                    : 'text-zinc-500 opacity-60 hover:text-zinc-300 hover:opacity-90 hover:bg-white/[0.02]'
                                            }`}
                                        >
                                            <span className={`text-xs font-mono transition-colors ${isSelected ? 'text-primary font-bold' : 'text-zinc-600'}`}>
                                                {(index + 1).toString().padStart(2, '0')}.
                                            </span>
                                            <span className="truncate">{project.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Active Project Details Card */}
                        {topPickProjects[activeProject] && (
                            <div className="space-y-4 border-t border-white/[0.08] pt-5 my-4 lg:my-0">
                                <div>
                                    <div className="flex items-center justify-between gap-3 mb-2">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-blue-400 text-[10px] font-mono uppercase tracking-wider">
                                            {topPickProjects[activeProject]?.category}
                                        </span>
                                        <span className="text-[11px] font-mono text-zinc-500">
                                            {topPickProjects[activeProject]?.year}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light text-pretty">
                                        {topPickProjects[activeProject]?.description}
                                    </p>
                                </div>

                                {/* Mobile Image Preview (Only visible on small screens) */}
                                <div className="lg:hidden relative w-full rounded-2xl overflow-hidden border border-white/10 my-3 shadow-2xl bg-[#0a0a0a] p-1.5">
                                    <div className="flex items-center justify-between px-3 py-2 bg-[#121212] border border-white/5 rounded-t-xl">
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-[#ff5f56]/70" />
                                            <span className="w-2 h-2 rounded-full bg-[#ffbd2e]/70" />
                                            <span className="w-2 h-2 rounded-full bg-[#27c93f]/70" />
                                        </div>
                                        <div className="text-[10px] font-mono text-zinc-400 truncate max-w-[180px]">
                                            {topPickProjects[activeProject]?.link.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                                        </div>
                                        <div className="w-3" />
                                    </div>
                                    <div className="relative w-full aspect-[16/10] bg-[#050505] rounded-b-xl overflow-hidden">
                                        <img
                                            src={topPickProjects[activeProject]?.image}
                                            alt={topPickProjects[activeProject]?.title}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </div>
                                </div>

                                {/* Meta Info & Services Tags */}
                                <div className="space-y-3 pt-1">
                                    {topPickProjects[activeProject]?.services && topPickProjects[activeProject]!.services!.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {topPickProjects[activeProject]?.services?.map((service, i) => (
                                                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 font-mono">
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Action Row */}
                                    <div className="flex items-center justify-between pt-1">
                                        {topPickProjects[activeProject]?.timeline && (
                                            <div className="text-xs text-zinc-400 font-mono">
                                                <span className="text-zinc-600 mr-1.5">{t('work.timeline', { defaultValue: 'Pengerjaan' })}:</span>
                                                <span className="text-zinc-200 font-medium">{topPickProjects[activeProject]?.timeline}</span>
                                            </div>
                                        )}
                                        <a
                                            href={topPickProjects[activeProject]?.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-blue-400 hover:text-blue-300 border border-primary/25 hover:border-primary/50 transition-all duration-300 text-xs font-mono font-medium group"
                                        >
                                            <span>{t('work.viewProject', { defaultValue: 'Kunjungi Website' })}</span>
                                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Floating Double-Bezel Browser Showcase Stage (Desktop Only) */}
                <div
                    ref={scrollContainerRef}
                    className="hidden lg:block relative bg-[#050505] h-screen overflow-y-scroll snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {
                        topPickProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className={`project-item-${index} h-screen w-full snap-start snap-always relative flex items-center justify-center p-8 xl:p-12`}
                            >
                                {/* Background Ambient Subtle Glow */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(19,91,236,0.08)_0%,_transparent_70%)] pointer-events-none" />

                                {/* Floating Double-Bezel Hardware Frame */}
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackProjectClick(project.title, project.id)}
                                    className="group relative w-full max-w-[660px] xl:max-w-[740px] 2xl:max-w-[820px] bg-white/[0.03] border border-white/10 rounded-[1.75rem] p-2 xl:p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-500 hover:border-primary/40 hover:shadow-[0_30px_80px_rgba(19,91,236,0.15)] flex flex-col"
                                >
                                    {/* Browser Chrome / Header Bar */}
                                    <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d0d] border border-white/[0.06] rounded-t-[calc(1.75rem-0.5rem)] border-b-0">
                                        {/* Mac-style Window Controls */}
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 shadow-[0_0_8px_rgba(255,95,86,0.4)]" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 shadow-[0_0_8px_rgba(255,189,46,0.4)]" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 shadow-[0_0_8px_rgba(39,201,63,0.4)]" />
                                        </div>

                                        {/* Centered URL Address Pill */}
                                        <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-zinc-300 shadow-inner">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                            <span className="text-zinc-500">https://</span>
                                            <span className="text-zinc-200 font-medium tracking-tight">
                                                {project.link.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                                            </span>
                                        </div>

                                        {/* Project Counter Indicator */}
                                        <div className="text-[11px] font-mono text-blue-400 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md font-semibold">
                                            {(index + 1).toString().padStart(2, '0')}/{topPickProjects.length.toString().padStart(2, '0')}
                                        </div>
                                    </div>

                                    {/* Inner Screen Display (Proportional 16:10 Viewport - No Over-Zooming) */}
                                    <div className="relative w-full aspect-[16/10] bg-[#070707] rounded-b-[calc(1.75rem-0.5rem)] overflow-hidden border border-white/[0.06]">
                                        <img
                                            src={project.image}
                                            alt={`${project.title} - Hero Section`}
                                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                                            loading="lazy"
                                            decoding="async"
                                            width={1440}
                                            height={900}
                                        />

                                        {/* Subtle Vignette Accent */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                                        {/* Interactive Hover Call-to-Action */}
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-semibold text-xs uppercase tracking-wider shadow-2xl shadow-primary/30 transition-transform duration-300 group-hover:scale-105">
                                                <span>{t('work.viewProject', { defaultValue: 'Kunjungi Website' })}</span>
                                                <ArrowUpRight className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section >
    );
};

export default WorkSection;

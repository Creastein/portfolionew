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
                    radial-gradient(ellipse 70% 30% at 50% 0%, rgba(16,185,129,0.04) 0%, transparent 60%),
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
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
                {/* Left Panel - Project Details (Fixed) */}
                <div className="relative bg-[#070707] lg:border-r border-white/[0.06] lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="lg:h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-14">
                        {/* Header */}
                        <div className="space-y-6 md:space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <h3 className="text-xs md:text-sm uppercase tracking-widest text-zinc-400 font-mono font-medium">
                                        {t('work.topPickProjects')}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => {
                                        trackCTAClick('all_projects', 'work_section');
                                        navigate('/projects');
                                    }}
                                    className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 hover:gap-2.5 transition-all duration-300 text-xs md:text-sm font-medium font-mono"
                                >
                                    {t('work.allProjects')} <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {/* Project Names List */}
                            <div className="space-y-2.5">
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
                                        className={`text-lg md:text-xl lg:text-2xl transition-all duration-300 cursor-pointer flex items-center gap-3 font-['Space_Grotesk'] font-semibold ${
                                            activeProject === index
                                                ? 'text-white opacity-100 translate-x-2'
                                                : 'text-zinc-500 opacity-60 hover:text-zinc-300 hover:opacity-90'
                                        }`}
                                    >
                                        <span className={`text-xs font-mono transition-colors ${activeProject === index ? 'text-emerald-400' : 'text-zinc-600'}`}>
                                            {(index + 1).toString().padStart(2, '0')}.
                                        </span>
                                        {project.title}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Active Project Details */}
                        <div className="space-y-5 md:space-y-6 border-t border-white/[0.08] pt-6 my-6 lg:my-0">
                            <div>
                                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-wider mb-2.5">
                                    {topPickProjects[activeProject]?.category}
                                </div>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-white tracking-tight font-['Space_Grotesk']">
                                    {topPickProjects[activeProject]?.title}
                                </h2>
                                <p className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed font-light text-justify text-pretty">
                                    {topPickProjects[activeProject]?.description}
                                </p>
                            </div>

                            {/* Mobile Image Preview */}
                            <div className="lg:hidden relative w-full rounded-2xl overflow-hidden border border-white/10 my-4 shadow-2xl bg-[#0a0a0a] p-1.5">
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

                            {/* Meta Info */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-1">{t('work.timeline')}</div>
                                    <div className="text-xs sm:text-sm font-medium text-zinc-200 font-mono">{topPickProjects[activeProject]?.timeline}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-1">{t('work.year')}</div>
                                    <div className="text-xs sm:text-sm font-medium text-zinc-200 font-mono">{topPickProjects[activeProject]?.year}</div>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-1">{t('work.servicesLabel')}</div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {topPickProjects[activeProject]?.services?.map((service, i) => (
                                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 font-mono">
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Visit Live Website Link (Desktop & Mobile) */}
                            <div className="pt-3">
                                <a
                                    href={topPickProjects[activeProject]?.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-emerald-500/20 text-white hover:text-emerald-300 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 text-xs sm:text-sm font-medium group"
                                >
                                    <span>{t('work.viewProject')}</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </div>
                        </div>
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
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.06)_0%,_transparent_70%)] pointer-events-none" />

                                {/* Floating Double-Bezel Hardware Frame */}
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackProjectClick(project.title, project.id)}
                                    className="group relative w-full max-w-[660px] xl:max-w-[740px] 2xl:max-w-[820px] bg-white/[0.03] border border-white/10 rounded-[1.75rem] p-2 xl:p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-500 hover:border-emerald-500/35 hover:shadow-[0_30px_80px_rgba(16,185,129,0.12)] flex flex-col"
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
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            <span className="text-zinc-500">https://</span>
                                            <span className="text-zinc-200 font-medium tracking-tight">
                                                {project.link.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                                            </span>
                                        </div>

                                        {/* Project Counter Indicator */}
                                        <div className="text-[11px] font-mono text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-semibold">
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
                                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-400 text-black font-semibold text-xs uppercase tracking-wider shadow-2xl transition-transform duration-300 group-hover:scale-105">
                                                <span>{t('work.viewProject')}</span>
                                                <ArrowUpRight className="w-4 h-4 text-black" />
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

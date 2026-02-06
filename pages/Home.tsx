import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Code, Cpu, ArrowDown } from 'lucide-react';

// --- DATA ---
const projects = [
  {
    id: 'neon-velocity',
    title: 'Neon Velocity',
    category: 'WebGL Experience',
    year: '2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx1m2e6kItoH7E-Ej_k4IUSrYtMHQoNIq3gVa4-NyFz8cm7uDXiNTNWVZ-Jfo__E-p-XA8YKZ-Ayk5eTvWUTyegHvr6D-gTjokDjXrglWow7K_W_PjIIjOWk9zEYb51TIUHgz9mTX1arKNu3B6mN7rLKrQFHrTfi4lULyXB6m1Q1m73hXc9qhrtnuHGRqPBtVnptldoXA00Zo15AY48IVjBC0nXdFVn3mm3IoQKvd7cUrwYFt6C5w3dfC0-DRwXiMyagc9N5VKjqHM',
    award: 'Award Winner'
  },
  {
    id: 'orbital-systems',
    title: 'Orbital Systems',
    category: 'Design System',
    year: '2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCU9re9snk0EDYaNs0JECWEP6SroTWhPtAL8O8KXvj2ns3aJOYS9WJ7Cos4aln13FEYgJbtlpVvdamcFPaDEGDHakBnOVI-m0RTznJAV7NSch8Zz-ukAAfVppLq0PfXdjkDQ3RPZdvZb6F_pIZgW-69JkvzsExsZHwf-p29IZsXt6Ce2j69466Dx_D7UwOJs6Ihd9mGZgIGju_6QDu8it1HUPVbQ2BEe2grMFFHGs3XhffRAdFsnNmINu4BB6E_6ovPKhRk2cscZ2t',
    featured: true
  },
  {
    id: 'flux-interface',
    title: 'Flux Interface',
    category: 'Fintech Dashboard',
    year: '2022',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlRK01-WhcjZHuXuOztI4-yB58BEsKaQQFkzpObBjUAlRaOjmkX3lABHDpuGqeJSq_oULnLmVGW-HmNspK2wwCoRktn--vQ4-pwwaxUO-kgZ-HAU1cwUYrubCU6RB4r692iIgBY1w3YP_dWvuGyUdQvQUgy3qIGbe3a97nhrw3LFul1WiMIReHLMuDuSBwQncmZxKxSoNAJYkTVmLsNwAMmsCunHdic-ZKy73AfCTuEyqtB_3m2vxQvl5aXd3O9pEU_RotkBpTtmtC',
  }
];

// --- COMPONENTS ---

interface ProjectCardProps {
    project: typeof projects[0];
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

const ServiceCard: React.FC<{title: string, description: string, tags: string[], image: string, icon: React.ReactNode}> = ({ title, description, tags, image, icon }) => (
    <div className="group relative overflow-hidden rounded-xl bg-surface border border-white/5 p-1 transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(19,91,236,0.15)]">
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
  </div>
);

// --- MAIN PAGE COMPONENT ---

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Scale: 7x -> 1x
  const logoScale = useTransform(scrollY, [0, 400], [7, 1]);
  const logoOpacity = useTransform(scrollY, [350, 400], [1, 0]);

  return (
    <main ref={containerRef} className="relative w-full overflow-x-hidden pb-32">
      
      {/* --- FIXED ELEMENTS SPECIFIC TO HERO --- */}
      <motion.div 
            style={{ 
                scale: logoScale,
                opacity: logoOpacity,
                transformOrigin: "top left",
                position: 'fixed',
                top: '2rem',
                left: '1.5rem',
                zIndex: 50
            }}
            className="flex items-center gap-3 mix-blend-difference pointer-events-none"
        >
             <div className="h-2 w-2 bg-primary rounded-full hidden" />
             <span className="text-xl font-bold tracking-tight font-display text-[#e0e0e0] whitespace-nowrap">
                VELOCITY
             </span>
      </motion.div>

      {/* --- SECTION 1: HERO --- */}
      <section id="home" className="relative min-h-screen w-full flex flex-col px-6 md:px-12 pt-8 pb-12 overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Center Image */}
        <div className="absolute inset-0 flex justify-center items-end pointer-events-none z-10">
             <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-background via-background/80 to-transparent z-20"></div>
             
             <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative w-[90%] md:w-[500px] lg:w-[600px] h-[70vh] mt-10 md:mt-20"
             >
                <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop" 
                    alt="Portrait" 
                    className="w-full h-full object-cover object-top"
                    style={{ 
                        maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
                    }}
                />
             </motion.div>
        </div>

        {/* Floating Text: Right */}
        <div className="absolute top-[35%] right-6 md:right-12 z-20 text-right hidden md:block">
            <motion.h2 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-6xl lg:text-8xl font-bold text-white/90 leading-[0.9] font-display tracking-tight mix-blend-overlay"
            >
                Business<br/>
                Analyst.<br/>
                Web<br/>
                Developer.
            </motion.h2>
        </div>

        {/* Description & Scroll Indicator */}
        <div className="mt-auto relative z-30 flex flex-col md:flex-row justify-between items-end w-full">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="max-w-xl"
            >
                <h3 className="text-2xl md:text-3xl text-white font-medium leading-tight tracking-tight">
                   Turning business ideas into<br className="hidden md:block"/>
                   <span className="text-white/40">simple logic and useful experiences.</span>
                </h3>
            </motion.div>

            <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1.2, duration: 1 }}
                 className="hidden md:flex flex-col items-center gap-2 text-white/30 text-xs uppercase tracking-widest"
            >
                <span>Scroll</span>
                <ArrowDown className="animate-bounce w-4 h-4" />
            </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: WORKS --- */}
      <section id="work" className="container mx-auto max-w-[1400px] px-6 sm:px-12 py-24 md:py-32">
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
          <span className="text-sm text-secondary">(03)</span>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* --- SECTION 3: ABOUT (Integrated) --- */}
      <section id="about" className="bg-[#080a0f] py-24 md:py-32 border-t border-white/5">
         <div className="container mx-auto max-w-[1400px] px-6 sm:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                <div>
                     <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">The Narrative</span>
                     <h2 className="text-5xl md:text-7xl font-bold font-display leading-[0.9] mb-8">
                        A Digital <br/> Alchemist.
                     </h2>
                </div>
                <div className="flex flex-col justify-end">
                     <p className="text-xl md:text-2xl text-secondary leading-relaxed font-light">
                        I blur the lines between <span className="text-white font-medium">business requirements</span> and <span className="text-white font-medium">creative engineering</span>. My background spans computer science and visual arts, allowing me to speak both languages fluently.
                     </p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-6">
                 <ServiceCard 
                    title="Creative Development"
                    description="Bringing designs to life with pixel-perfect precision using WebGL, Canvas, and custom shaders."
                    tags={['WebGL', 'Three.js', 'React']}
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuBo1UfCeH9dDV19WVjhOXzWl6hzwnVYbxEZUhtqeOSxK97L6AdrT5-AXem6M8CxOQ-CRLraaNNSlUa0d-vyYIebqBCrmGStS2wXYbj0fO9_llaxX9KVCXcdJMI63BF29NQwq1iVwiVz6joU2XPyZeLfGznLSuQrNJwEM_xxIYaF1GWG375dISx0mA5hKGSX1Ak9fTACHt0iVHTNhU4PzEs-Wj_XoV54M7LoQoXLaXcCmxavdhViei8SYVZOMZoEqOe4DuX-JRFWPhvC"
                    icon={<Code size={32} />}
                  />
                  <ServiceCard 
                    title="Technical Direction"
                    description="Architecting scalable frontend solutions and guiding teams through complex technical challenges."
                    tags={['Architecture', 'Performance', 'Next.js']}
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuAfIwE5zDaZ_A2JElXSGxeB49SjU8X9lcNMLnrdumWj5Q2Ib76NoKMniUfhyBnJpB75ecLogu6bFcXeOux87umn4t75RSKwUBc_ekgYMH9pHfVeCtv0VGE5agC5WE-kOBI_A_rUlOBiujIuFB7ZHulel7qdPfN4JtuIdUXdcAqg5hHOcwktMjRmrGUSfjTs9INqbi9IXUnX4JDhsWyuSweG6L2ErD1-4RGgH-4RMXGtywRo8r_0vSxUQi03vq-HIA4JucZvjILYXKsr"
                    icon={<Cpu size={32} />}
                  />
            </div>
         </div>
      </section>

      {/* --- FOOTER / CONTACT --- */}
      <footer id="contact" className="container mx-auto max-w-[1400px] px-6 sm:px-12 pt-32 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-12 mb-12">
            <div>
                <h2 className="text-6xl md:text-9xl font-bold font-display tracking-tighter text-white mb-8">
                    LET'S TALK
                </h2>
                <a href="mailto:hello@velocity.studio" className="text-2xl md:text-3xl text-secondary hover:text-primary transition-colors flex items-center gap-4">
                    hello@velocity.studio <ArrowUpRight />
                </a>
            </div>
            <div className="mt-12 md:mt-0 flex gap-8">
                <a href="https://www.linkedin.com/in/welli-" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-xs font-bold hover:text-primary transition-colors">LinkedIn</a>
                <a href="https://www.instagram.com/_well07/" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-xs font-bold hover:text-primary transition-colors">Instagram</a>
                <a href="https://github.com/Creastein" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-xs font-bold hover:text-primary transition-colors">GitHub</a>
                <a href="https://www.tiktok.com/@wellibuilds?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="uppercase tracking-widest text-xs font-bold hover:text-primary transition-colors">TikTok</a>
            </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-white/30">
            <p>© 2024 Velocity Studio. All rights reserved.</p>
            <p>Jakarta, Indonesia</p>
        </div>
      </footer>
    </main>
  );
}
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ArrowRight, Layers, Code, Cpu, Box, Palette } from 'lucide-react';

const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Mock data - in real app would fetch based on ID
  const project = {
    title: 'Neon Velocity',
    subtitle: 'Defining the physics of light',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx1m2e6kItoH7E-Ej_k4IUSrYtMHQoNIq3gVa4-NyFz8cm7uDXiNTNWVZ-Jfo__E-p-XA8YKZ-Ayk5eTvWUTyegHvr6D-gTjokDjXrglWow7K_W_PjIIjOWk9zEYb51TIUHgz9mTX1arKNu3B6mN7rLKrQFHrTfi4lULyXB6m1Q1m73hXc9qhrtnuHGRqPBtVnptldoXA00Zo15AY48IVjBC0nXdFVn3mm3IoQKvd7cUrwYFt6C5w3dfC0-DRwXiMyagc9N5VKjqHM',
    role: 'Creative Development',
    client: 'CyberDynamics',
    year: '2023',
    outcome: 'Awwwards SOTD',
    description: "The Challenge: Create a browser-based experience that visualizes high-speed data transfer as a tactile, fluid entity. The client needed a representation of their backend infrastructure that felt alive, not just functional.",
    solution: "We utilized custom GLSL shaders to simulate fluid dynamics in real-time. By mapping mouse velocity to the viscosity parameters of the particle system, we achieved a \"weightless\" feel that responds instantly to user interaction."
  };

  return (
    <main className="bg-background min-h-screen text-white pb-32">
      {/* Top Nav Removed to support Floating Dock Only strategy */}

      {/* Header / Hero */}
      <header className="relative w-full h-[80vh] min-h-[600px] flex flex-col justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={project.image} 
            alt="Background" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="relative z-10 container mx-auto max-w-[1400px]">
          <div className="flex flex-col items-start leading-[0.85]">
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}
                className="text-[12vw] font-bold tracking-tighter uppercase text-white mix-blend-overlay font-display"
              >
                NEON
              </motion.h1>
            </div>
            <div className="overflow-hidden self-end md:mr-24">
              <motion.h1 
                initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                className="text-[12vw] font-bold tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 font-display"
              >
                VELOCITY
              </motion.h1>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 border-t border-white/20 pt-8 backdrop-blur-sm">
            <StatItem label="Role" value={project.role} delay={0.3} />
            <StatItem label="Client" value={project.client} delay={0.4} />
            <StatItem label="Year" value={project.year} delay={0.5} />
            <StatItem label="Outcome" value={project.outcome} delay={0.6} />
          </div>
        </div>
      </header>

      {/* Content Section */}
      <section className="container mx-auto max-w-[1400px] px-6 py-32">
        <div className="flex flex-col md:flex-row gap-20 items-start">
          <div className="md:w-1/3 sticky top-32">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 font-display">{project.subtitle}</h2>
            <a href="#" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors uppercase text-sm font-bold tracking-widest">
              Live Preview <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <div className="md:w-2/3 space-y-12 text-xl text-secondary font-light leading-relaxed">
            <p className="text-white">{project.description}</p>
            <p>{project.solution}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="bg-surface rounded-xl p-8 border border-white/5">
                <Box className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Performance First</h3>
                <p className="text-sm">Optimized for 60fps on mobile devices using instanced mesh rendering.</p>
              </div>
              <div className="bg-surface rounded-xl p-8 border border-white/5">
                <Palette className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Post-Processing</h3>
                <p className="text-sm">Custom bloom and chromatic aberration passes written in raw WebGL.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Horizontal Scroll */}
      <section className="w-full py-32 bg-surface border-y border-white/5 overflow-hidden">
        <div className="container mx-auto max-w-[1400px] px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">The Engine</h2>
            <p className="text-3xl font-medium font-display text-white">Tech Stack & Tools</p>
          </div>
        </div>
        
        <div className="relative w-full overflow-x-auto pb-8 hide-scrollbar">
          <div className="flex gap-6 px-6 container mx-auto max-w-[1400px]">
            <TechCard number="01" title="Three.js" description="Core 3D rendering engine handling the scene graph." icon={<Box size={24}/>} progress={75} />
            <TechCard number="02" title="Custom GLSL" description="Bespoke fragment and vertex shaders for fluid sim." icon={<Code size={24}/>} progress={100} />
            <TechCard number="03" title="React Fiber" description="Declarative scene composition for modular updates." icon={<Cpu size={24}/>} progress={50} />
            <TechCard number="04" title="GSAP" description="Complex timeline management for opening sequences." icon={<Layers size={24}/>} progress={85} />
          </div>
        </div>
      </section>

      {/* Next Project Teaser */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden group cursor-pointer" onClick={() => navigate('/case-study/orbital-systems')}>
        <div className="absolute inset-0 z-0">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCU9re9snk0EDYaNs0JECWEP6SroTWhPtAL8O8KXvj2ns3aJOYS9WJ7Cos4aln13FEYgJbtlpVvdamcFPaDEGDHakBnOVI-m0RTznJAV7NSch8Zz-ukAAfVppLq0PfXdjkDQ3RPZdvZb6F_pIZgW-69JkvzsExsZHwf-p29IZsXt6Ce2j69466Dx_D7UwOJs6Ihd9mGZgIGju_6QDu8it1HUPVbQ2BEe2grMFFHGs3XhffRAdFsnNmINu4BB6E_6ovPKhRk2cscZ2t" alt="Next Project" className="w-full h-full object-cover opacity-30 transition-all duration-700 group-hover:opacity-60 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 text-center">
          <span className="block text-sm text-primary font-bold tracking-[0.5em] mb-4 uppercase">Next Case Study</span>
          <h2 className="text-[8vw] leading-none font-bold uppercase text-white mix-blend-difference group-hover:tracking-wide transition-all duration-500 font-display">
            Orbital Systems
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
              <ArrowRight className="w-8 h-8" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const StatItem: React.FC<{ label: string, value: string, delay: number }> = ({ label, value, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}
  >
    <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">{label}</span>
    <p className="text-lg text-white font-medium">{value}</p>
  </motion.div>
);

const TechCard: React.FC<{ number: string, title: string, description: string, icon: React.ReactNode, progress: number }> = ({ number, title, description, icon, progress }) => (
  <div className="min-w-[300px] bg-surface-light border border-white/10 rounded-2xl p-8 flex flex-col justify-between group hover:border-primary/50 transition-colors duration-500 h-[350px]">
    <div className="flex justify-between items-start">
        <div className="text-5xl font-bold text-white/10 group-hover:text-white/20 transition-colors">{number}</div>
        <div className="text-primary opacity-50 group-hover:opacity-100">{icon}</div>
    </div>
    
    <div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-secondary text-sm leading-relaxed">{description}</p>
    </div>
    
    <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden mt-6">
      <div className="h-full bg-primary" style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

export default CaseStudy;
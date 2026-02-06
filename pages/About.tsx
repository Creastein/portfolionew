import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code, Layers, Cpu } from 'lucide-react';

const About: React.FC = () => {
  return (
    <main className="pt-24 pb-32 px-6 md:px-10 max-w-[1400px] mx-auto flex flex-col gap-24">
      {/* Hero Section */}
      <section className="flex flex-col gap-6 mt-10 md:mt-20">
        <div className="relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-5xl md:text-7xl lg:text-9xl font-bold leading-[0.9] tracking-tighter font-display uppercase"
          >
            A Digital <br/>
            <span className="text-primary">Alchemist</span>
          </motion.h1>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-secondary max-w-2xl leading-relaxed mt-8"
        >
          Blurring the lines between code and creativity. <br/>
          Crafting digital matter from pure logic.
        </motion.p>
      </section>

      {/* Narrative Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-white/10 pt-16">
        <div className="md:col-span-3 text-secondary font-medium uppercase tracking-widest text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          The Narrative
        </div>
        <div className="md:col-span-9 flex flex-col gap-8">
          <p className="text-lg md:text-2xl text-gray-300 leading-relaxed font-light">
            I am a creative developer obsessed with <span className="text-white font-medium underline decoration-primary decoration-2 underline-offset-4">fluid motion</span> and interactive storytelling. I build digital experiences that feel alive, using physics and WebGL to create memorable moments on the web.
          </p>
          <p className="text-lg md:text-2xl text-secondary leading-relaxed font-light">
            My background spans computer science and visual arts, allowing me to speak both languages fluently. I believe the best web experiences are the ones that don't just display information, but invite the user to play with it.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="flex flex-col gap-8 mt-12">
        <div className="flex items-end justify-between border-b border-white/10 pb-4">
          <h2 className="text-3xl font-bold tracking-tight text-white font-display">Services</h2>
          <span className="text-secondary text-sm hidden sm:block">Scroll to explore</span>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <ServiceCard 
            title="Creative Development"
            description="Bringing designs to life with pixel-perfect precision and smooth animations using WebGL, Canvas, and custom shaders."
            tags={['WebGL', 'Three.js', 'GLSL']}
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBo1UfCeH9dDV19WVjhOXzWl6hzwnVYbxEZUhtqeOSxK97L6AdrT5-AXem6M8CxOQ-CRLraaNNSlUa0d-vyYIebqBCrmGStS2wXYbj0fO9_llaxX9KVCXcdJMI63BF29NQwq1iVwiVz6joU2XPyZeLfGznLSuQrNJwEM_xxIYaF1GWG375dISx0mA5hKGSX1Ak9fTACHt0iVHTNhU4PzEs-Wj_XoV54M7LoQoXLaXcCmxavdhViei8SYVZOMZoEqOe4DuX-JRFWPhvC"
            icon={<Code size={32} />}
          />
           <ServiceCard 
            title="Interaction Design"
            description="Designing micro-interactions and gestures that provide intuitive feedback and delight users."
            tags={['Framer Motion', 'GSAP', 'Physics']}
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCUNntdGkgLp32hXogvIE9abRmP6voB_2jhtKQxRyEA58BAMHDDYltErYJulDQ4L5Cl2NQxvN1QSk8vU-izaDIzJXIw-u_lKULGHTP3jiGf8ArLvyey7sbfHregxwiTt2A8R3kbxfG1A4XIHqfP4wO2zjv2XZapuGnZUJmZ4jIGoTDOBwM1s8kARB1j5CmRvuL1B-i1f8xYtYLJSCYuXbPY7sA2K0fMhuYDjclUvWL_JUtJguMjaTdd6JcgP6e4twLndXifCQE_GeK4"
            icon={<Layers size={32} />}
          />
           <ServiceCard 
            title="Technical Direction"
            description="Architecting scalable frontend solutions and guiding teams through complex technical challenges."
            tags={['Architecture', 'Performance', 'Optimization']}
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuAfIwE5zDaZ_A2JElXSGxeB49SjU8X9lcNMLnrdumWj5Q2Ib76NoKMniUfhyBnJpB75ecLogu6bFcXeOux87umn4t75RSKwUBc_ekgYMH9pHfVeCtv0VGE5agC5WE-kOBI_A_rUlOBiujIuFB7ZHulel7qdPfN4JtuIdUXdcAqg5hHOcwktMjRmrGUSfjTs9INqbi9IXUnX4JDhsWyuSweG6L2ErD1-4RGgH-4RMXGtywRo8r_0vSxUQi03vq-HIA4JucZvjILYXKsr"
            icon={<Cpu size={32} />}
          />
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 relative">
        <h2 className="text-3xl font-bold mb-16 font-display">The Journey</h2>
        <div className="absolute left-8 top-32 bottom-0 w-px bg-white/10 hidden md:block"></div>
        
        <div className="flex flex-col gap-16">
            <ExperienceItem 
                role="Senior Creative Developer"
                company="Mono Digital"
                period="2022 — Present"
                description="Spearheading the technical direction for immersive web experiences. Implementing WebGL shaders, fluid physics engines, and advanced interaction models for Tier-1 clients."
            />
            <ExperienceItem 
                role="Frontend Lead"
                company="Flux Studios"
                period="2019 — 2022"
                description="Led a team of 5 developers. Architected the core design system and component library. Reduced site load times by 40% through advanced optimization techniques."
            />
            <ExperienceItem 
                role="Freelance WebGL Developer"
                company="Independent"
                period="2016 — 2019"
                description="Collaborated with design agencies to deliver award-winning promotional microsites. Specialized in Three.js and GLSL custom shaders."
            />
        </div>
      </section>
    </main>
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
      <div className="absolute top-4 right-4 text-gray-600 group-hover:text-primary transition-colors">
        <ArrowUpRight size={24} />
      </div>
    </div>
  </div>
);

const ExperienceItem: React.FC<{role: string, company: string, period: string, description: string}> = ({ role, company, period, description }) => (
    <div className="flex flex-col md:flex-row gap-8 relative group">
        <div className="hidden md:flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-surface border border-white/10 flex items-center justify-center z-10 group-hover:border-primary group-hover:text-primary transition-colors text-secondary">
                <span className="material-symbols-outlined">work</span>
            </div>
        </div>
        <div className="flex-1 bg-surface/50 rounded-2xl p-8 border border-white/5 hover:bg-surface hover:border-white/10 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{role}</h3>
                    <p className="text-primary font-medium">{company}</p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-black/20 text-secondary">{period}</span>
            </div>
            <p className="text-secondary leading-relaxed max-w-2xl">
                {description}
            </p>
        </div>
    </div>
);

export default About;
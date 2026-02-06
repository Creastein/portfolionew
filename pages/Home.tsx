import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import AboutSection from '../components/home/AboutSection';
import SkillsSection from '../components/home/SkillsSection';
import ServicesSection from '../components/home/ServicesSection';
import WorkSection from '../components/home/WorkSection';
import ContactSection from '../components/home/ContactSection';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Logo animation
  const logoScale = useTransform(scrollY, [0, 400], [7, 1]);
  const logoOpacity = useTransform(scrollY, [350, 400], [1, 0]);

  // Hero parallax
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const gradientY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
  const imageY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const floatingTextY = useTransform(heroProgress, [0, 1], ["0%", "-20%"]);

  return (
    <main ref={containerRef} className="relative w-full overflow-x-hidden pb-32 bg-black">

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
        <span className="text-xl font-bold tracking-tight text-[#e0e0e0] whitespace-nowrap" style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}>
          WELLI
        </span>
      </motion.div>

      {/* --- SECTION 1: HERO --- */}
      <section ref={heroRef} id="home" className="sticky top-0 min-h-screen w-full flex flex-col px-6 md:px-12 pt-8 pb-12 overflow-hidden">

        {/* Background Gradients with Parallax */}
        <motion.div
          style={{ y: gradientY }}
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none will-change-transform"
        />
        <motion.div
          style={{ y: gradientY }}
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none will-change-transform"
        />

        {/* Center Image with Parallax */}
        <div className="absolute inset-0 flex justify-center items-end pointer-events-none z-10">
          <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-background via-background/80 to-transparent z-20"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ y: imageY }}
            className="relative w-[90%] md:w-[500px] lg:w-[600px] h-[70vh] mt-10 md:mt-20 will-change-transform"
          >
            <img
              src="/images/hero-potrait.jpg"
              alt="Portrait"
              className="w-full h-full object-cover object-top"
              style={{
                maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
              }}
            />
          </motion.div>
        </div>

        {/* Floating Text: Right with Parallax */}
        <motion.div
          style={{ y: floatingTextY }}
          className="absolute top-[35%] right-6 md:right-12 z-20 text-right hidden md:block will-change-transform"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white/90 leading-[0.9] tracking-tight mix-blend-overlay animate__animated animate__backInRight" style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}>
            Business Analyst<br />
            Web Developer
          </h2>
        </motion.div>

        {/* Description & Scroll Indicator */}
        <div className="mt-auto relative z-30 flex flex-col md:flex-row justify-between items-end w-full">
          <div className="max-w-xl animate__animated animate__bounceInLeft">
            <h3 className="text-2xl md:text-3xl text-white font-medium leading-tight tracking-tight" style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}>
              I help turn business ideas into<br className="hidden md:block" />
              <span className="text-white/40">simple and useful web experiences.</span>
            </h3>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="hidden md:flex flex-col items-center gap-2 text-white/30 text-xs uppercase tracking-widest"
          >
          </motion.div>
        </div>
      </section>

      {/* --- EXTRACTED SECTIONS --- */}
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <WorkSection />
      <ContactSection />
    </main>
  );
}
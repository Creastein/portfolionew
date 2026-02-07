import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import AboutSection from '@/components/home/AboutSection';
import SkillsSection from '@/components/home/SkillsSection';
import ServicesSection from '@/components/home/ServicesSection';
import WorkSection from '@/components/home/WorkSection';
import ContactSection from '@/components/home/ContactSection';

// Staggered animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: 'blur(10px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] // Custom cubic-bezier for smooth ease
    }
  }
};

const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(20px)'
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 100,
    filter: 'blur(10px)'
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
    filter: 'blur(10px)'
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.2
    }
  }
};

const textContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    }
  }
};

const textLineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: 'blur(4px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

interface HomeProps {
  isLoading: boolean;
}

export default function Home({ isLoading }: HomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Hero parallax
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const gradientY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
  const imageY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const floatingTextY = useTransform(heroProgress, [0, 1], ["0%", "-20%"]);

  // Logo animation
  const logoScale = useTransform(heroProgress, [0, 0.2, 0.8, 1], [7, 1, 1, 1.3]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (isLoading) {
        setIsScrolled(false);
        return;
      }
      setIsScrolled(latest > 100);
    });
  }, [scrollY, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setIsScrolled(scrollY.get() > 100);
    }
  }, [isLoading, scrollY]);

  // Preload hero image
  useEffect(() => {
    const img = new Image();
    img.src = "/images/hero-potrait.png";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <main ref={containerRef} className="relative w-full overflow-x-hidden pb-32 bg-black">
      {/* TRANSFORMING LOGO */}
      <motion.div
        style={{
          scale: logoScale,
          transformOrigin: "top left"
        }}
        className="fixed top-32 left-6 md:top-8 md:left-6 z-0 md:z-50 flex items-center gap-3 mix-blend-difference pointer-events-none"
      >
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-xl font-bold tracking-tight text-[#e0e0e0] whitespace-nowrap"
          style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
        >
          WELLI
        </motion.span>
      </motion.div>

      {/* --- SECTION 1: HERO --- */}
      <motion.section
        ref={heroRef}
        id="home"
        className="sticky top-0 min-h-screen w-full flex flex-col px-6 md:px-12 pt-8 pb-12 overflow-hidden"
        initial="hidden"
        animate={isLoading ? 'hidden' : 'visible'}
        variants={containerVariants}
      >
        {/* Background Gradients with Parallax */}


        <motion.div
          style={{ y: gradientY }}
          variants={fadeInVariants}
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none will-change-transform"
        />

        {/* Center Image with Parallax */}
        <div className="absolute inset-0 flex justify-center items-end pointer-events-none z-10">
          <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-background via-background/80 to-transparent z-20"></div>

          <motion.div
            variants={fadeInVariants}
            style={{ y: imageY }}
            className="relative w-[90%] md:w-[500px] lg:w-[600px] h-[70vh] mb-10 md:mb-32 will-change-transform"
          >
            <div className="relative w-full h-full">
              <motion.img
                src="/images/hero-potrait.png"
                alt="WELLI - Business Analyst and Web Developer"
                className="w-full h-full object-cover object-top"
                loading="eager"
                decoding="async"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: imageLoaded ? 1 : 0,
                  scale: imageLoaded ? 1 : 1.1
                }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                  filter: 'contrast(1.1) brightness(0.9)'
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Floating Text: Right with Parallax */}
        <motion.div
          style={{ y: floatingTextY }}
          variants={slideInRightVariants}
          className="absolute top-[35%] right-6 md:right-12 z-20 text-right hidden md:block will-change-transform"
        >
          <motion.div
            animate={{
              opacity: isScrolled ? 0 : 1,
              x: isScrolled ? 100 : 0,
              filter: isScrolled ? 'blur(10px)' : 'blur(0px)'
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.h2
              variants={textContainerVariants}
              initial="hidden"
              animate={isLoading ? 'hidden' : 'visible'}
              className="text-4xl lg:text-6xl font-bold text-white/90 leading-[0.9] tracking-tight mix-blend-overlay"
              style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
            >
              <motion.span variants={textLineVariants} className="block">
                Business Analyst
              </motion.span>
              <motion.span variants={textLineVariants} className="block">
                Web Developer
              </motion.span>
            </motion.h2>
          </motion.div>
        </motion.div>

        {/* Description & Scroll Indicator */}
        <div className="mt-auto relative z-30 flex flex-col md:flex-row justify-between items-end w-full">
          <motion.div
            variants={slideInLeftVariants}
            initial="hidden"
            animate={isLoading || isScrolled ? 'hidden' : 'visible'}
            className="max-w-xl"
          >
            <motion.h3
              variants={textContainerVariants}
              className="text-2xl md:text-3xl text-white font-medium leading-tight tracking-tight"
              style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}
            >
              <motion.span variants={textLineVariants} className="block">
                I help turn business ideas into
              </motion.span>
              <motion.span variants={textLineVariants} className="block text-white/40">
                simple and useful web experiences.
              </motion.span>
            </motion.h3>
          </motion.div>


        </div>
      </motion.section>

      {/* --- EXTRACTED SECTIONS --- */}
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <WorkSection />
      <ContactSection />
    </main>
  );
}

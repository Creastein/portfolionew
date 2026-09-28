import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import WorkSection from '@/components/home/WorkSection';
import ProcessSection from '@/components/home/ProcessSection';
import ContactSection from '@/components/home/ContactSection';
import TrustBar from '@/components/home/TrustBar';
import SEOHead from '@/components/SEOHead';
import HeroSection from '@/components/ui/glassmorphism-trust-hero';

interface HomeProps {
  isLoading: boolean;
}

export default function Home({ isLoading }: HomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  return (
    <main ref={containerRef} className="relative w-full overflow-x-hidden pb-32 bg-black">
      <SEOHead 
        title="WL-STUDIO — Premium Web Development for Hospitality & Villas"
        description="Crafting bespoke websites, immersive interfaces, and seamless booking systems for premium villas, resorts, and hospitality brands in Indonesia."
        canonical="https://welli.my.id"
        keywords="villa website, resort website developer, hospitality web design, jasa pembuatan website villa, hotel website indonesia, WL-STUDIO"
      />
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "WL-STUDIO",
          "url": "https://welli.my.id",
          "logo": "https://welli.my.id/favicon.svg",
          "description": "Premium Web Development for Hospitality & Villas in Indonesia",
          "knowsAbout": [
            "Web Development", "Hospitality Websites", "Villa Website Design",
            "Next.js", "React.js", "Booking Engine Integration", "Tailwind CSS"
          ]
        })}
      </script>

      {/* STATIC LOGO */}
      <div className="fixed top-8 left-6 z-50 pointer-events-none mix-blend-difference">
        <motion.img
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          src="/images/LOGO.png"
          alt="WL-STUDIO"
          className="h-12 md:h-14 w-auto object-contain"
        />
      </div>

      {/* --- SECTION 1: HERO --- */}
      <HeroSection ref={heroRef} isLoading={isLoading} />

      {/* --- TRUST BAR --- */}
      <TrustBar />

      {/* --- CORE SECTIONS --- */}
      <AboutSection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}

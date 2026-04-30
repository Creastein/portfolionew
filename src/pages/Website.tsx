import React from 'react';
import { Helmet } from 'react-helmet-async';
import WebsiteNavbar from '@/components/website/WebsiteNavbar';
import WebsiteHero from '@/components/website/WebsiteHero';
import SocialProofBar from '@/components/website/SocialProofBar';
import ProcessSection from '@/components/website/ProcessSection';
import PortfolioShowcase from '@/components/website/PortfolioShowcase';
import TestimonialSection from '@/components/website/TestimonialSection';
import PricingSection from '@/components/website/PricingSection';
import AddOnsSection from '@/components/website/AddOnsSection';
import FAQSection from '@/components/website/FAQSection';
import BlogPreview from '@/components/website/BlogPreview';
import WebsiteFooterCTA from '@/components/website/WebsiteFooterCTA';
import StickyWhatsApp from '@/components/website/StickyWhatsApp';

const Website: React.FC = () => {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'id' }}>
        <title>WelliBuilds — Jasa Pembuatan Website Profesional untuk UMKM Indonesia</title>
        <meta
          name="description"
          content="Jasa pembuatan website profesional untuk bisnis lokal Indonesia (UMKM). Landing page, website katalog, company profile, dan website villa/resort. Harga terjangkau mulai Rp 1.5 juta."
        />
        <meta name="keywords" content="jasa pembuatan website, web developer Indonesia, website UMKM, landing page murah, website bisnis lokal" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://welli.my.id/website" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://welli.my.id/website" />
        <meta property="og:title" content="WelliBuilds — Website Profesional untuk Bisnis Lokal Indonesia" />
        <meta property="og:description" content="Tampil di Google. Terima booking via WhatsApp. Tanpa ribet. Mulai dari Rp 1.5 juta." />
        <meta property="og:image" content="https://welli.my.id/images/process-step-4.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://welli.my.id/website" />
        <meta name="twitter:title" content="WelliBuilds — Website Profesional untuk Bisnis Lokal Indonesia" />
        <meta name="twitter:description" content="Tampil di Google. Terima booking via WhatsApp. Tanpa ribet. Mulai dari Rp 1.5 juta." />
        <meta name="twitter:image" content="https://welli.my.id/images/process-step-4.png" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Helmet>

      {/* Custom Navbar for this page */}
      <WebsiteNavbar />

      {/* === AIDA + Trust First UX Flow === */}

      {/* 1. ATTENTION — Hero */}
      <WebsiteHero />

      {/* 2. TRUST — Social Proof Numbers */}
      <SocialProofBar />

      {/* 3. INTEREST — How We Work */}
      <ProcessSection />

      {/* 4. DESIRE — Portfolio Showcase */}
      <PortfolioShowcase />

      {/* 5. TRUST — Client Testimonials */}
      <TestimonialSection />

      {/* 6. DECISION — Pricing & Add-ons */}
      <PricingSection />
      <AddOnsSection />

      {/* 7. ACTION — FAQ, Blog, Footer CTA */}
      <FAQSection />
      <BlogPreview />
      <WebsiteFooterCTA />

      {/* Sticky WhatsApp Button */}
      <StickyWhatsApp />
    </>
  );
};

export default Website;

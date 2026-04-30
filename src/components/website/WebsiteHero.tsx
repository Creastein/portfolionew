import React from 'react';
import { motion } from 'framer-motion';

const WHATSAPP_LINK = 'https://wa.me/6285188574908?text=Halo%20Welli%2C%20saya%20ingin%20konsultasi%20tentang%20pembuatan%20website.';

const WebsiteHero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0a0e1a]" />
        {/* Gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#135bec]/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#3b82f6]/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px]"
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content — Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
              <span className="text-sm text-white/70">Website Profesional untuk Bisnis Lokal Indonesia</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
            >
              Bisnis Lokal Kamu{' '}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="relative"
              >
                <span className="relative z-10 bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
                  Layak Punya
                </span>
              </motion.span>
              <br />
              Website Profesional
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}
            >
              Tampil di Google. Terima booking via WhatsApp. Tanpa ribet.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, boxShadow: '0 0 30px rgba(37,211,102,0.2)' }}
                transition={{ duration: 0.3 }}
                className="group relative flex items-center gap-3 px-8 py-4 bg-white/[0.06] backdrop-blur-xl border border-[#25d366]/30 text-white font-semibold text-lg rounded-2xl transition-all duration-300 hover:bg-white/[0.1] hover:border-[#25d366]/60"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#25d366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Konsultasi Gratis via WhatsApp
              </motion.a>

              <motion.button
                onClick={() => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ y: -3, boxShadow: '0 0 20px rgba(255,255,255,0.06)' }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 px-8 py-4 text-white/70 hover:text-white bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300 hover:bg-white/[0.08]"
              >
                Lihat Paket Harga
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
            </motion.div>
          </div>

          {/* Right — Hero Mockup Image */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow behind image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="absolute inset-0 bg-[#3b82f6]/10 rounded-full blur-[80px] scale-75"
            />

            {/* Mockup Image */}
            <div className="relative w-full max-w-lg lg:max-w-xl">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 50% 45%, black 50%, transparent 100%)',
                  maskImage: 'radial-gradient(ellipse 85% 80% at 50% 45%, black 50%, transparent 100%)',
                }}
              >
                <img
                  src="/images/hero-website.png"
                  alt="Contoh website profesional yang dibuat WelliBuilds untuk bisnis lokal Indonesia"
                  className="w-full h-auto drop-shadow-[0_20px_50px_rgba(19,91,236,0.2)]"
                  loading="eager"
                />
              </motion.div>

              {/* Floating badge — Bottom Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.6, type: 'spring', stiffness: 200 }}
                className="hidden md:flex absolute bottom-8 right-16 items-center gap-2 px-4 py-2.5 bg-[#0a0e1a]/80 backdrop-blur-xl border border-white/10 rounded-xl"
                style={{
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05) inset',
                }}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-2xl">⚡</span>
                  <div>
                    <div className="text-sm font-bold text-white">PageSpeed 90+</div>
                    <div className="text-xs text-white/40">Performa Optimal</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating badge — Top Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6, type: 'spring', stiffness: 200 }}
                className="hidden md:flex absolute top-8 left-0 items-center gap-2 px-4 py-2.5 bg-[#0a0e1a]/80 backdrop-blur-xl border border-white/10 rounded-xl"
                style={{
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05) inset',
                }}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-2xl">📱</span>
                  <div>
                    <div className="text-sm font-bold text-white">100% Responsive</div>
                    <div className="text-xs text-white/40">Mobile First</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteHero;

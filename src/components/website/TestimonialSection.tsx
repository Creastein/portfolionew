import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '@/components/data/websitePortfolio';

const TestimonialSection: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[#0a0e1a] overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[#135bec]/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-widest text-[#3b82f6] font-medium mb-4 block">
            Testimoni
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
          >
            Apa Kata Klien Kami
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div
                className="relative p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl hover:border-white/[0.12] transition-all duration-500 h-full"
                style={{
                  boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset, 0 -1px 0 rgba(0,0,0,0.3) inset',
                }}
              >
                {/* Gradient accent */}
                <div
                  className="absolute top-0 left-6 right-6 h-px"
                  style={{
                    background: `linear-gradient(to right, transparent, ${testimonial.accentColor}40, transparent)`,
                  }}
                />

                {/* Quote icon */}
                <div className="mb-6">
                  <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="opacity-20">
                    <path
                      d="M0 32V19.2C0 15.467 0.667 12.133 2 9.2C3.467 6.267 5.467 3.867 8 2C10.533 0.133 13.2 -0.533 16 0.4L14.4 5.6C12.667 5.067 11.067 5.333 9.6 6.4C8.267 7.333 7.2 8.8 6.4 10.8C5.733 12.667 5.6 14.4 6 16H16V32H0ZM24 32V19.2C24 15.467 24.667 12.133 26 9.2C27.467 6.267 29.467 3.867 32 2C34.533 0.133 37.2 -0.533 40 0.4L38.4 5.6C36.667 5.067 35.067 5.333 33.6 6.4C32.267 7.333 31.2 8.8 30.4 10.8C29.733 12.667 29.6 14.4 30 16H40V32H24Z"
                      fill="currentColor"
                      className="text-[#3b82f6]"
                    />
                  </svg>
                </div>

                {/* Text */}
                <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: testimonial.accentColor + '30', color: testimonial.accentColor }}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/40">
                      {testimonial.role} · {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

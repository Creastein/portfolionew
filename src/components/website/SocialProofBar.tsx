import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterProps {
  end: number;
  suffix: string;
  label: string;
}

const Counter: React.FC<CounterProps> = ({ end, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center px-6 py-4">
      <div
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1"
        style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
      >
        {count}{suffix}
      </div>
      <div className="text-sm text-white/50">{label}</div>
    </div>
  );
};

const SocialProofBar: React.FC = () => {
  const stats = [
    { end: 8, suffix: '+', label: 'Website Live' },
    { end: 5, suffix: '+', label: 'Klien Puas' },
    { end: 100, suffix: '%', label: 'Mobile Responsive' },
    { end: 90, suffix: '+', label: 'PageSpeed Score' },
  ];

  return (
    <section className="relative py-12 bg-[#0a0e1a]">
      {/* Glassmorphism container */}
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl border border-white/[0.1] bg-white/[0.04] backdrop-blur-xl overflow-hidden"
          style={{
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset, 0 -1px 0 rgba(0,0,0,0.3) inset',
          }}
        >
          {/* Gradient line top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b82f6]/50 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Counter end={stat.end} suffix={stat.suffix} label={stat.label} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofBar;

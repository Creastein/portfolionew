import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { websitePortfolio } from '@/components/data/websitePortfolio';

const PortfolioShowcase: React.FC = () => {
  return (
    <section id="portfolio" className="relative py-24 md:py-32 bg-[#080c16] overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#3b82f6]/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-widest text-[#3b82f6] font-medium mb-4 block">
            Hasil Karya
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
          >
            Website yang Sudah Live
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Beberapa website yang sudah kami bangun untuk klien di berbagai industri.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {websitePortfolio.map((item, i) => (
            <motion.a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-500"
              style={{
                boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset, 0 -1px 0 rgba(0,0,0,0.3) inset',
              }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0e1a]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.style.background = 'linear-gradient(135deg, rgba(19,91,236,0.15) 0%, rgba(59,130,246,0.05) 100%)';
                    }
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-5">
                  <div className="flex items-center gap-2 text-white text-sm font-medium px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                    Lihat Website <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#3b82f6] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#3b82f6]/70">{item.category}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-[#3b82f6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
                <p className="text-sm text-white/40 leading-relaxed mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-white/50 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioShowcase;

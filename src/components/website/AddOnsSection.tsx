import React from 'react';
import { motion } from 'framer-motion';
import { websiteAddons } from '@/components/data/websiteAddons';

const AddOnsSection: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[#0a0e1a] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-widest text-[#3b82f6] font-medium mb-4 block">
            Tambahan
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
          >
            Lengkapi Website Anda
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Tingkatkan website Anda dengan fitur-fitur tambahan berikut.
          </p>
        </motion.div>

        {/* Add-ons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {websiteAddons.map((addon, i) => (
            <motion.div
              key={addon.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="group relative p-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl hover:border-[#3b82f6]/20 hover:bg-white/[0.05] transition-all duration-500"
              style={{
                boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset, 0 -1px 0 rgba(0,0,0,0.3) inset',
              }}
            >
              {/* Icon */}
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {addon.icon}
              </div>

              {/* Name */}
              <h3 className="text-sm font-medium text-white/80 mb-2 leading-snug">
                {addon.name}
              </h3>

              {/* Price */}
              <div className="text-base font-bold text-[#3b82f6]">
                {addon.price}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddOnsSection;

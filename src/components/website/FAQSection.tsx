import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { websiteFAQ } from '@/components/data/websiteFAQ';

const FAQItem: React.FC<{ item: typeof websiteFAQ[0]; isOpen: boolean; onToggle: () => void }> = ({
  item,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg text-white font-medium group-hover:text-[#3b82f6] transition-colors duration-300">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-white/30 group-hover:text-[#3b82f6] transition-colors duration-300" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm sm:text-base text-white/50 leading-relaxed pb-5 pr-10">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(websiteFAQ[0]?.id || null);

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-[#080c16] overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#135bec]/5 rounded-full blur-[120px]" />

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-widest text-[#3b82f6] font-medium mb-4 block">
            FAQ
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
          >
            Pertanyaan Umum
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Jawaban untuk pertanyaan yang sering ditanyakan klien kami.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8"
          style={{
            boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset, 0 -1px 0 rgba(0,0,0,0.3) inset',
          }}
        >
          {websiteFAQ.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { websitePackages } from '@/components/data/websitePackages';

const WHATSAPP_BASE = 'https://wa.me/6285188574908?text=';

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-[#080c16] overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[400px] bg-[#135bec]/5 rounded-full blur-[120px] -translate-x-1/2" />

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
            Paket & Harga
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
          >
            Pilih Paket Sesuai Kebutuhan
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Semua paket sudah termasuk desain premium, mobile responsive, dan support teknis.
          </p>
        </motion.div>

        {/* Pricing Cards — horizontal scroll on mobile */}
        <div className="relative -mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 md:grid md:grid-cols-4 md:overflow-visible scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {websitePackages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`relative flex-shrink-0 w-[300px] md:w-auto snap-center flex flex-col rounded-2xl border transition-all duration-500 ${
                  pkg.popular
                    ? 'border-[#3b82f6]/50 bg-[#3b82f6]/[0.06] backdrop-blur-xl'
                    : 'border-white/[0.08] bg-white/[0.03] backdrop-blur-xl hover:border-white/[0.12]'
                }`}
                style={{
                  boxShadow: pkg.popular
                    ? '0 8px 40px rgba(59,130,246,0.15), 0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset'
                    : '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset, 0 -1px 0 rgba(0,0,0,0.3) inset',
                }}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1.5 bg-[#3b82f6] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-6 md:p-7 flex flex-col flex-1">
                  {/* Icon & Title */}
                  <div className="text-3xl mb-3">{pkg.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{pkg.title}</h3>

                  {/* Duration badge */}
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/40 mb-4">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {pkg.duration}
                  </span>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-xs text-white/30 block mb-1">Mulai</span>
                    <span
                      className="text-2xl md:text-3xl font-bold text-white"
                      style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
                    >
                      {pkg.price}
                    </span>
                  </div>

                  {/* Target */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {pkg.target.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-white/40 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/5 mb-5" />

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-white/60">
                        <Check className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={`${WHATSAPP_BASE}${encodeURIComponent(pkg.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Pilih Paket
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

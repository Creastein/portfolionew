import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Konsultasi Gratis',
    description:
      'Chat via WhatsApp, ceritakan kebutuhan bisnis Anda. Kami bantu tentukan paket yang cocok.',
    image: '/images/process-step-1.png.png',
    accent: '#25d366',
  },
  {
    number: '02',
    title: 'Kirim Brief & Referensi',
    description:
      'Kirimkan logo, foto, teks, dan referensi desain yang disukai. Kami siapkan wireframe.',
    image: '/images/process-step-2.png.png',
    accent: '#8b5cf6',
  },
  {
    number: '03',
    title: 'Desain & Development',
    description:
      'Tim kami mulai membangun website Anda. Progres diupdate secara berkala via WhatsApp.',
    image: '/images/process-step-3.png.png',
    accent: '#3b82f6',
  },
  {
    number: '04',
    title: 'Review & Revisi',
    description:
      'Anda review hasilnya dan berikan feedback. Revisi dilakukan sampai Anda puas.',
    image: '/images/process-step-4.png.png',
    accent: '#10b981',
  },
  {
    number: '05',
    title: 'Launch & Serah Terima',
    description:
      'Website live! Kami bantu setup domain, hosting, dan beri panduan pengelolaan.',
    image: '/images/process-step-5.png.png',
    accent: '#f59e0b',
  },
];

const ProcessSection = () => {
  return (
    <section id="proses" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#3b82f6]">
            Bagaimana Caranya
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
          >
            Proses Kerja Kami
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            Dari konsultasi sampai launch, semua transparan dan tanpa ribet.
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Connecting Line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

          {/* Steps */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Step number dot on timeline (desktop) */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold text-white border-2 backdrop-blur-xl"
                      style={{
                        borderColor: step.accent,
                        background: `${step.accent}15`,
                        boxShadow: `0 0 30px ${step.accent}20`,
                      }}
                    >
                      {step.number}
                    </div>
                  </motion.div>

                  {/* Content row */}
                  <div
                    className={`flex flex-col ${
                      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } items-center gap-8 lg:gap-16`}
                  >
                    {/* Image side — slides from left or right */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -80 : 80 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                      className="w-full lg:w-[calc(50%-2rem)]"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
                        style={{
                          boxShadow: `0 0 60px ${step.accent}08`,
                        }}
                      >
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-56 sm:h-64 lg:h-72 object-cover"
                          loading="lazy"
                        />
                        {/* Gradient overlay bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/60 via-transparent to-transparent" />
                      </motion.div>
                    </motion.div>

                    {/* Text side — slides from opposite direction */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 80 : -80 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                      className="w-full lg:w-[calc(50%-2rem)]"
                    >
                      <div
                        className={`${
                          isEven ? 'lg:pl-8' : 'lg:pr-8'
                        }`}
                      >
                        {/* Mobile step number */}
                        <div
                          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-xs font-bold text-white border mb-4"
                          style={{
                            borderColor: step.accent,
                            background: `${step.accent}15`,
                          }}
                        >
                          {step.number}
                        </div>

                        <h3
                          className="text-2xl lg:text-3xl font-bold text-white mb-3"
                          style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
                        >
                          {step.title}
                        </h3>
                        <p className="text-base lg:text-lg text-white/50 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Accent line */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: 48 }}
                          viewport={{ once: false, amount: 0.5 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="mt-6 h-1 rounded-full"
                          style={{ background: step.accent }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

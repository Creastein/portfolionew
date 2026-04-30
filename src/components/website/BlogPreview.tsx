import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

const blogPosts = [
  {
    id: 'blog-1',
    title: 'Kenapa Bisnis Lokal Wajib Punya Website di 2025',
    excerpt: 'Di era digital, 80% konsumen mencari bisnis lokal lewat Google sebelum berkunjung. Tanpa website, Anda kehilangan peluang besar.',
    category: 'Tips Bisnis',
    readTime: '5 menit',
    date: 'Coming Soon',
  },
  {
    id: 'blog-2',
    title: 'Website vs Instagram: Mana yang Lebih Efektif?',
    excerpt: 'Media sosial penting, tapi website memberi kontrol penuh atas brand dan konversi. Cari tahu perbandingannya.',
    category: 'Digital Marketing',
    readTime: '4 menit',
    date: 'Coming Soon',
  },
  {
    id: 'blog-3',
    title: '5 Fitur Website yang Wajib Dimiliki UMKM',
    excerpt: 'Dari WhatsApp button hingga Google Maps, ini fitur-fitur esensial yang meningkatkan konversi website bisnis kecil.',
    category: 'Web Development',
    readTime: '6 menit',
    date: 'Coming Soon',
  },
];

const BlogPreview: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[#0a0e1a] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-sm uppercase tracking-widest text-[#3b82f6] font-medium mb-4 block">
              Blog
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
            >
              Artikel & Insight
            </h2>
          </div>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl hover:border-[#3b82f6]/20 transition-all duration-500 cursor-default"
              style={{
                boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset, 0 -1px 0 rgba(0,0,0,0.3) inset',
              }}
            >
              <div className="p-6">
                {/* Category + Read Time */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] font-medium border border-[#3b82f6]/10">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/30">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-[#3b82f6] transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-white/40 leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-white/20">
                  <span className="px-2 py-0.5 bg-white/5 rounded text-xs">{post.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;

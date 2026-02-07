import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { projects } from '@/components/data/projects';

const CaseStudy: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.featured);

  return (
    <main className="bg-background min-h-screen text-white pb-32">
      {/* Header */}
      <header className="relative w-full pt-32 pb-16 px-6 md:px-12 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto max-w-[1400px]">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-secondary hover:text-white transition-colors mb-12"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}>Back to Home</span>
          </motion.button>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
            >
              All Projects
            </h1>
            <p
              className="text-lg md:text-xl text-secondary max-w-2xl"
              style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}
            >
              A collection of web development projects ranging from business analysis to full-stack applications.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4 mt-12"
          >
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-full border transition-all ${filter === 'all'
                  ? 'bg-primary border-primary text-white'
                  : 'border-white/20 text-secondary hover:border-white/40 hover:text-white'
                }`}
              style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-6 py-3 rounded-full border transition-all ${filter === 'featured'
                  ? 'bg-primary border-primary text-white'
                  : 'border-white/20 text-secondary hover:border-white/40 hover:text-white'
                }`}
              style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}
            >
              Featured ({projects.filter(p => p.featured).length})
            </button>
          </motion.div>
        </div>
      </header>

      {/* Projects Grid */}
      <section className="px-6 md:px-12">
        <div className="container mx-auto max-w-[1400px]">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                className="group relative bg-surface rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500"
              >
                {/* Project Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-light">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.style.background = 'linear-gradient(135deg, rgba(19, 91, 236, 0.1) 0%, rgba(19, 91, 236, 0.05) 100%)';
                      }
                    }}
                  />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
                  {/* Title & Category */}
                  <div>
                    <h3
                      className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors"
                      style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-sm text-secondary"
                      style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}
                    >
                      {project.category}
                    </p>
                  </div>

                  {/* Description */}
                  {project.description && (
                    <p
                      className="text-secondary text-sm line-clamp-2"
                      style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}
                    >
                      {project.description}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-secondary">
                    {project.year && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}>{project.year}</span>
                      </div>
                    )}
                    {project.timeline && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}>{project.timeline}</span>
                      </div>
                    )}
                  </div>

                  {/* Services Tags */}
                  {project.services && project.services.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full border border-white/20 text-white"
                          style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* View Project Link */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 text-sm font-medium mt-4"
                    style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 600 }}
                  >
                    View Live Project
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <p
                className="text-secondary text-lg"
                style={{ fontFamily: '"Mohave", sans-serif', fontWeight: 300 }}
              >
                No projects found.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CaseStudy;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard.jsx';
import { Layers } from 'lucide-react';

export default function Projects({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!projects) return null;

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-amber-400 font-semibold text-xs tracking-widest uppercase mb-2">Portfolio</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Featured Projects</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full mt-3" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                    : 'glass-card text-neutral-400 hover:text-white hover:border-amber-500/20'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects Grid with Motion */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

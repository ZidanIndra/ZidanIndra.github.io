import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, BrainCircuit, Terminal, Smartphone } from 'lucide-react';
import TechIcon from './TechIcon.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Skills({ skills }) {
  const { t, lang } = useLanguage();
  if (!skills) return null;

  const categories = Object.keys(skills);
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'Frontend');

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Frontend': return <Code2 className="w-4 h-4" />;
      case 'Backend': return <Server className="w-4 h-4" />;
      case 'Mobile Development':
      case 'Mobile Developer': return <Smartphone className="w-4 h-4" />;
      case 'Machine Learning & AI': return <BrainCircuit className="w-4 h-4" />;
      default: return <Terminal className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-neutral-950/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-amber-400 font-semibold text-xs tracking-widest uppercase mb-2">
            {t('skills.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t('skills.title')}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full mt-3" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 shadow-lg shadow-amber-500/25'
                    : 'glass-card text-neutral-400 hover:text-white hover:border-amber-500/20'
                }`}
              >
                {getCategoryIcon(category)}
                <span>{t(`skills.categories.${category}`) || category}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {skills[activeCategory]?.map((skill, idx) => {
            const levelLabel =
              skill.level === 'Advanced'
                ? lang === 'id' ? 'Mahir' : 'Advanced'
                : lang === 'id' ? 'Menengah' : 'Intermediate';

            return (
              <div
                key={idx}
                className="glass-card p-5 rounded-2xl border border-white/5 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  {/* Technology Brand Icon */}
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 group-hover:scale-110 group-hover:border-amber-500/40 group-hover:bg-amber-500/10 transition-all duration-300 shadow-inner">
                    <TechIcon name={skill.name} className="w-6 h-6" />
                  </div>

                  {/* Level Badge */}
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-neutral-400 group-hover:text-amber-300 group-hover:bg-amber-500/10 transition-colors">
                    {levelLabel}
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-neutral-100 text-sm group-hover:text-amber-400 transition-colors">
                    {skill.name}
                  </h4>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

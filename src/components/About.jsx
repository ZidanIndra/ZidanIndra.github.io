import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function About({ about }) {
  const { t, lang } = useLanguage();
  if (!about) return null;

  const highlights = t('about.highlights') || about.highlights || [];

  const getStatLabel = (stat, idx) => {
    if (idx === 0) return t('about.stats.experience');
    if (idx === 1) return t('about.stats.projects');
    if (idx === 2) return t('about.stats.publications');
    if (idx === 3) return t('about.stats.satisfaction');
    return stat.label;
  };

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-amber-400 font-semibold text-xs tracking-widest uppercase mb-2">
            {t('about.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t('about.title')}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full mt-3" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Summary & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-xl font-bold text-neutral-100 mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-400" />
                <span>{t('about.highlightsTitle')}</span>
              </h3>
              <p className="text-neutral-300 leading-relaxed text-base mb-6">
                {about.summary || t('about.summary')}
              </p>

              {/* Highlights checklist */}
              <div className="space-y-3">
                {Array.isArray(highlights) &&
                  highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-300">{item}</span>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {about.stats?.map((stat, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center justify-center hover:border-amber-500/30 transition-all duration-300 group"
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-amber-400 to-amber-200 mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </span>
                <span className="text-xs text-neutral-400 font-medium tracking-wide">
                  {getStatLabel(stat, idx)}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

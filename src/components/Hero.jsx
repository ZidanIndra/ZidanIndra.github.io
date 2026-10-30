import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons.jsx';
import WireframeLoops from './WireframeLoops.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Hero({ profile }) {
  const { t, lang } = useLanguage();
  if (!profile) return null;

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Greeting, Name, Bio & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Handwritten script style greeting */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-script text-2xl md:text-3xl text-amber-400 transform -rotate-2 inline-block">
              {profile.greeting || t('hero.greeting')}
            </span>
            <span className="text-xl">✨</span>
          </div>

          {/* Large Bold Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {profile.name}
          </h1>

          {/* Subtitle / Role Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{profile.title || t('hero.title')}</span>
          </div>

          {/* Bio paragraph */}
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal">
            {profile.bio || t('hero.bio')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <a
              href={profile.figmaDeckUrl || 'https://shorturl.at/Wz8De'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-semibold text-sm hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/25 transition-all duration-200 active:scale-95 group"
            >
              <span>{t('hero.portfolioDeck')}</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-card text-neutral-200 font-medium text-sm hover:text-amber-300 hover:border-amber-500/30 transition-all duration-200"
            >
              <span>{t('hero.exploreWork')}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-3 pt-2 border-t border-white/5 w-full">
            <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
              {t('hero.connect')}
            </span>
            <div className="flex items-center gap-2">
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg glass-card text-neutral-400 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg glass-card text-neutral-400 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-200"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Profile Cutout Image with Animated Wireframe Loops */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] md:min-h-[460px]"
        >
          {/* Wireframe geometric orbital rings */}
          <WireframeLoops />

          {/* Profile cutout container */}
          <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            <img
              src="./assets/zidanIndra.png"
              alt="Zidan Indra Nugraha"
              onError={(e) => {
                if (profile.avatarPath && e.target.src !== profile.avatarPath) {
                  e.target.src = profile.avatarPath;
                }
              }}
              className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPortfolioData } from './utils/dataStore.js';
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Certificates from './components/Certificates.jsx';
import Activities from './components/Activities.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import AdminCMS from './components/AdminCMS.jsx';

function MainPortfolio({ data }) {
  const { lang } = useLanguage();

  return (
    <div className="relative min-h-screen bg-[#090a0f] text-neutral-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-300 overflow-x-hidden">
      {/* Atmospheric Multi-Point Background Ambient Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Warm Amber / Gold Glow behind Hero & Header */}
        <div
          className="absolute -top-[12%] right-[5%] w-[600px] h-[600px] rounded-full opacity-35 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(229, 169, 59, 0.22) 0%, rgba(217, 119, 6, 0.08) 42%, transparent 70%)',
          }}
        />

        {/* Midnight Blue / Sapphire Glow behind Skills & Projects */}
        <div
          className="absolute top-[35%] -left-[12%] w-[650px] h-[650px] rounded-full opacity-30 blur-[135px]"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(99, 102, 241, 0.07) 45%, transparent 70%)',
          }}
        />

        {/* Subtle Teal / Emerald Glow around Certificates & Activities */}
        <div
          className="absolute top-[65%] -right-[10%] w-[600px] h-[600px] rounded-full opacity-25 blur-[130px]"
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, rgba(6, 95, 70, 0.05) 45%, transparent 70%)',
          }}
        />

        {/* Subtle Warm Amber Glow near Contact */}
        <div
          className="absolute -bottom-[8%] left-[20%] w-[550px] h-[550px] rounded-full opacity-25 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(229, 169, 59, 0.18) 0%, rgba(180, 83, 9, 0.05) 50%, transparent 70%)',
          }}
        />

        {/* Micro Cyber Dot Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
          }}
        />
      </div>

      <Navbar cvPath={data.profile.cvPath} />

      {/* Main Content with smooth animated crossfade when language switches */}
      <AnimatePresence mode="wait">
        <motion.main
          key={lang}
          initial={{ opacity: 0.88, filter: 'blur(3px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0.88, filter: 'blur(3px)' }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="flex-1 relative z-10"
        >
          <Hero profile={data.profile} />
          <About about={data.about} />
          <Skills skills={data.skills} />
          <Projects projects={data.projects} />
          <Certificates certificates={data.certificates} />
          <Activities activities={data.activities} />
          <Contact profile={data.profile} />
        </motion.main>
      </AnimatePresence>

      <Footer profile={data.profile} />
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(() => getPortfolioData());
  const [route, setRoute] = useState(
    typeof window !== 'undefined' ? window.location.hash || '#/' : '#/'
  );

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      setData(getPortfolioData());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (route.startsWith('#/admin')) {
    return (
      <AdminCMS
        onExit={() => {
          window.location.hash = '#/';
          setData(getPortfolioData());
        }}
      />
    );
  }

  return (
    <LanguageProvider>
      <MainPortfolio data={data} />
    </LanguageProvider>
  );
}

import React, { useState, useEffect } from 'react';
import { Download, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Navbar({ cvPath }) {
  const { lang, toggleLang, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'activities', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#home', id: 'home' },
    { name: t('nav.about'), href: '#about', id: 'about' },
    { name: t('nav.skills'), href: '#skills', id: 'skills' },
    { name: t('nav.work'), href: '#projects', id: 'projects' },
    { name: t('nav.certificates'), href: '#certificates', id: 'certificates' },
    { name: t('nav.activities'), href: '#activities', id: 'activities' },
    { name: t('nav.contact'), href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 transition-all duration-300">
      <nav
        className={`w-full max-w-6xl rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-2xl shadow-black/60 border border-amber-500/20'
            : 'bg-neutral-900/50 backdrop-blur-md border border-white/10'
        }`}
      >
        {/* Brand */}
        <a href="#home" className="flex items-center gap-2 group shrink-0">
          <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black font-bold text-sm shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform">
            Z
          </span>
          <span className="font-semibold text-neutral-100 tracking-tight text-sm md:text-base hidden sm:inline">
            Zidan<span className="text-amber-400">.dev</span>
          </span>
        </a>

        {/* Desktop Links (Floating Pill Inner) */}
        <div className="hidden lg:flex items-center gap-1 bg-neutral-950/40 px-3 py-1 rounded-full border border-white/5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right Action Cluster: Language Switcher & CV Button */}
        <div className="flex items-center gap-2">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-neutral-200 hover:text-amber-300 text-xs font-semibold transition-all duration-200"
            title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="tracking-wide uppercase">{lang === 'id' ? 'ID' : 'EN'}</span>
          </button>

          {/* Download CV Button */}
          <a
            href={cvPath || './assets/CV_Zidan_Indra_Nugraha_Fullstack.pdf'}
            download
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-semibold text-xs shadow-md shadow-amber-500/20 transition-all duration-200 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t('nav.downloadCV')}</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full glass-card text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? 'bg-amber-500/20 text-amber-300 font-semibold'
                  : 'text-neutral-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}

          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              onClick={toggleLang}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-neutral-200"
            >
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Bahasa: <strong className="text-amber-400 uppercase">{lang}</strong></span>
            </button>

            <a
              href={cvPath || './assets/CV_Zidan_Indra_Nugraha_Fullstack.pdf'}
              download
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-semibold text-xs shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>{t('nav.downloadCV')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

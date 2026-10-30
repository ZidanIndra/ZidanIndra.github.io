import React, { useState, useEffect } from 'react';
import { Download, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ cvPath }) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'contact'];
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
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 transition-all duration-300">
      <nav
        className={`w-full max-w-5xl rounded-full px-5 py-2.5 flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-2xl shadow-black/60 border border-amber-500/20'
            : 'bg-neutral-900/40 backdrop-blur-md border border-white/10'
        }`}
      >
        {/* Brand */}
        <a href="#home" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black font-bold text-sm shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform">
            Z
          </span>
          <span className="font-semibold text-neutral-100 tracking-tight text-sm md:text-base">
            Zidan<span className="text-amber-400">.dev</span>
          </span>
        </a>

        {/* Desktop Links (Floating Pill Inner) */}
        <div className="hidden md:flex items-center gap-1 bg-neutral-950/40 px-3 py-1 rounded-full border border-white/5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right Action: Download CV */}
        <div className="flex items-center gap-2">
          <a
            href={cvPath || './assets/CV_Zidan_Indra_Nugraha_Fullstack.pdf'}
            download
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 hover:from-amber-400 hover:to-amber-300 transition-all duration-200 shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-4 right-4 glass-panel rounded-2xl p-4 shadow-2xl border border-white/10 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-sm text-neutral-300 hover:text-amber-400 hover:bg-white/5 rounded-xl font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

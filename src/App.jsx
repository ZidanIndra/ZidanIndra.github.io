import React, { useState, useEffect } from 'react';
import { getPortfolioData } from './utils/dataStore.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Certificates from './components/Certificates.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [data, setData] = useState(() => getPortfolioData());
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-neutral-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-300">
      <Navbar cvPath={data.profile.cvPath} />
      <main className="flex-1">
        <Hero profile={data.profile} />
        <About about={data.about} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Certificates certificates={data.certificates} />
        <Contact profile={data.profile} />
      </main>
      <Footer profile={data.profile} />
    </div>
  );
}

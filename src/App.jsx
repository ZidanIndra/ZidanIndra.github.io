import React, { useState, useEffect } from 'react';
import { getPortfolioData } from './utils/dataStore.js';
import { LanguageProvider } from './context/LanguageContext.jsx';
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

export default function App() {
  const [data, setData] = useState(() => getPortfolioData());
  const [route, setRoute] = useState(
    typeof window !== 'undefined' ? window.location.hash || '#/' : '#/'
  );

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      // Refresh data in case admin updated it locally
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
      <div className="min-h-screen bg-[#0b0c10] text-neutral-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-300">
        <Navbar cvPath={data.profile.cvPath} />
        <main className="flex-1">
          <Hero profile={data.profile} />
          <About about={data.about} />
          <Skills skills={data.skills} />
          <Projects projects={data.projects} />
          <Certificates certificates={data.certificates} />
          <Activities activities={data.activities} />
          <Contact profile={data.profile} />
        </main>
        <Footer profile={data.profile} />
      </div>
    </LanguageProvider>
  );
}

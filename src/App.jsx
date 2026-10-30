import React, { useState } from 'react';
import { getPortfolioData } from './utils/dataStore.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';

export default function App() {
  const [data] = useState(() => getPortfolioData());

  return (
    <div className="min-h-screen bg-[#0b0c10] text-neutral-100 flex flex-col">
      <Navbar cvPath={data.profile.cvPath} />
      <main className="flex-1">
        <Hero profile={data.profile} />
      </main>
    </div>
  );
}

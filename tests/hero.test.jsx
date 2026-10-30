import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '../src/components/Hero.jsx';
import Navbar from '../src/components/Navbar.jsx';

describe('Hero and Navbar components', () => {
  const mockProfile = {
    name: 'Zidan Indra Nugraha',
    greeting: "Hello, I'm",
    title: 'Full-Stack Developer & Machine Learning / AI Enthusiast',
    bio: 'Building robust end-to-end web architectures',
    cvPath: './assets/CV_Zidan_Indra_Nugraha_Fullstack.pdf',
    figmaDeckUrl: 'https://shorturl.at/Wz8De',
    github: 'https://github.com/ZidanIndra',
    linkedin: 'https://www.linkedin.com/in/zidan-indra-nugraha',
    avatarPath: './assets/Orange_Retro_Creative_Portfolio_Presentation__1_-removebg-preview.png',
    fallbackAvatarPath: './assets/me.jpg'
  };

  it('Hero renders greeting, name, title, bio and Figma deck button', () => {
    render(<Hero profile={mockProfile} />);
    expect(screen.getByText("Hello, I'm")).toBeDefined();
    expect(screen.getByText('Zidan Indra Nugraha')).toBeDefined();
    expect(screen.getByText(/Full-Stack Developer/i)).toBeDefined();
    const figmaLink = screen.getByRole('link', { name: /Portofolio Deck/i });
    expect(figmaLink.getAttribute('href')).toBe('https://shorturl.at/Wz8De');
  });

  it('Navbar renders brand and CV download button with correct href', () => {
    render(<Navbar cvPath={mockProfile.cvPath} />);
    const cvButton = screen.getByRole('link', { name: /Download CV/i });
    expect(cvButton).toBeDefined();
    expect(cvButton.getAttribute('href')).toBe('./assets/CV_Zidan_Indra_Nugraha_Fullstack.pdf');
  });
});

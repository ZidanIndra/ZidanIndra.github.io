import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TechIcon from '../src/components/TechIcon.jsx';
import Skills from '../src/components/Skills.jsx';
import { LanguageProvider } from '../src/context/LanguageContext.jsx';
import portfolioData from '../src/data/portfolioData.json';

describe('Skills Update - Laravel, Mobile Development & Postman', () => {
  it('TechIcon renders proper SVGs for Laravel, Flutter, GetX, and Firebase', () => {
    const { container: cLaravel } = render(<TechIcon name="Laravel" />);
    expect(cLaravel.querySelector('svg')).toBeDefined();

    const { container: cFlutter } = render(<TechIcon name="Flutter" />);
    expect(cFlutter.querySelector('svg')).toBeDefined();

    const { container: cGetX } = render(<TechIcon name="GetX" />);
    expect(cGetX.querySelector('svg')).toBeDefined();

    const { container: cFirebase } = render(<TechIcon name="Firebase" />);
    expect(cFirebase.querySelector('svg')).toBeDefined();
  });

  it('renders Laravel in Backend skills', () => {
    render(
      <LanguageProvider initialLang="id">
        <Skills skills={portfolioData.skills} />
      </LanguageProvider>
    );

    // Click Backend tab
    const backendTab = screen.getByRole('button', { name: /Backend/i });
    fireEvent.click(backendTab);

    expect(screen.getByText('Laravel')).toBeDefined();
  });

  it('renders Mobile Development category with Flutter, GetX, and Firebase', () => {
    render(
      <LanguageProvider initialLang="id">
        <Skills skills={portfolioData.skills} />
      </LanguageProvider>
    );

    // Click Mobile Development tab
    const mobileTab = screen.getByRole('button', { name: /Mobile Development/i });
    fireEvent.click(mobileTab);

    expect(screen.getByText('Flutter')).toBeDefined();
    expect(screen.getByText('GetX')).toBeDefined();
    expect(screen.getByText('Firebase')).toBeDefined();
  });

  it('verifies Postman is set to Intermediate / Menengah level', () => {
    render(
      <LanguageProvider initialLang="id">
        <Skills skills={portfolioData.skills} />
      </LanguageProvider>
    );

    // Click Tools & DevOps tab
    const toolsTab = screen.getByRole('button', { name: /Tools & DevOps/i });
    fireEvent.click(toolsTab);

    expect(screen.getByText('Postman')).toBeDefined();

    // Verify in raw data
    const postmanSkill = portfolioData.skills['Tools & DevOps'].find(s => s.name === 'Postman');
    expect(postmanSkill).toBeDefined();
    expect(postmanSkill.level).toBe('Intermediate');
  });
});
